goog.module('app.search');

import './search.css'
import 'jquery/dist/jquery.js'
import 'angular/angular.js'
import 'angular-gettext/dist/angular-gettext.js'
import 'angular-ui-date/dist/date.js'
import 'angular-float-thead/angular-floatThead.js'
import 'floatthead/dist/jquery.floatThead.min.js'
import 'corejs-typeahead/dist/typeahead.bundle.js'
import 'proj4/dist/proj4.js'
import '../utils/watchwatchers.js'

const ngeoProjEPSG21781 = goog.require('ngeo.proj.EPSG21781');
const ngeoMapDirective = goog.require('ngeo.mapDirective');
const ngeoBase = goog.require('ngeo');
const olMap = goog.require('ol.Map');
const olView = goog.require('ol.View');
const olLayerTile = goog.require('ol.layer.Tile');
const olLayerVector = goog.require('ol.layer.Vector');
const olProj = goog.require('ol.proj');
const olSourceOSM = goog.require('ol.source.OSM');
const olSourceVector = goog.require('ol.source.Vector');
const googAsserts = goog.require('goog.asserts');
const ngeoSearchModule = goog.require('ngeo.search.module');


/** @type {!angular.Module} **/
app.module = angular.module('app', [
  ngeoBase.module.name,
  ngeoSearchModule.name
]);


/**
 * @type {!angular.Component}
 */
app.searchComponent = {
  bndings: {
    'map': '=appSearchMap'
  },
  controller: 'AppSearchController',
  controllerAs: 'ctrl',
  template:
      '<input type="text" placeholder="search…" ' +
      'ngeo-search="ctrl.options" ' +
      'ngeo-search-datasets="ctrl.datasets" ' +
      'ngeo-search-listeners="ctrl.listeners">'
};


app.module.component('appSearch', app.searchComponent);


/**
 * @constructor
 * @param {angular.JQLite} $element Element.
 * @param {angular.Scope} $rootScope Angular root scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {ngeo.search.createGeoJSONBloodhound.Function} ngeoSearchCreateGeoJSONBloodhound The ngeo
 *     create GeoJSON Bloodhound service.
 * @ngInject
 */
app.SearchController = function($element, $rootScope, $compile, ngeoSearchCreateGeoJSONBloodhound) {
  /**
   * @private
   * @type {angular.JQLite}
   */
  this.$element = $element;


  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = this.createVectorLayer_();

  /** @type {Bloodhound} */
  const bloodhoundEngine = this.createAndInitBloodhound_(
    ngeoSearchCreateGeoJSONBloodhound);

  /**
   * @type {TypeaheadOptions}
   * @export
   */
  this.options = /** @type {TypeaheadOptions} */ ({
    highlight: true,
    hint: undefined,
    minLength: undefined
  });

  /**
   * @type {Array.<TypeaheadDataset>}
   * @export
   */
  this.datasets = [{
    source: bloodhoundEngine.ttAdapter(),
    display: (suggestion) => {
      const feature = /** @type {ol.Feature} */ (suggestion);
      return feature.get('label');
    },
    templates: {
      header: () => '<div class="ngeo-header">Addresses</div>',
      suggestion: (suggestion) => {
        const feature = /** @type {ol.Feature} */ (suggestion);

        // A scope for the ng-click on the suggestion's « i » button.
        const scope = $rootScope.$new(true);
        scope['feature'] = feature;
        scope['click'] = function(event) {
          window.alert(feature.get('label'));
          event.stopPropagation();
        };

        const html = `<p>${feature.get('label')
        }<button ng-click="click($event)">i</button></p>`;
        return $compile(html)(scope);
      }
    }
  }];

  /**
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {ngeox.SearchDirectiveListeners} */ ({
    select: app.SearchController.select_.bind(this)
  });
};


/**
 * @export
 */
app.SearchController.prototype.$onInit = function() {
  // Empty the search field on focus and blur.
  const input = this.$element.find('input');
  input.on('focus blur', () => {
    input.val('');
  });
};


/**
 * @return {ol.layer.Vector} The vector layer.
 * @private
 */
app.SearchController.prototype.createVectorLayer_ = function() {
  const vectorLayer = new olLayerVector({
    source: new olSourceVector()
  });
  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(this.map);
  return vectorLayer;
};


/**
 * @param {ngeo.search.createGeoJSONBloodhound.Function} ngeoSearchCreateGeoJSONBloodhound The ngeo
 *     create GeoJSON Bloodhound service.
 * @return {Bloodhound} The bloodhound engine.
 * @private
 */
app.SearchController.prototype.createAndInitBloodhound_ = function(ngeoSearchCreateGeoJSONBloodhound) {
  const url = 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/fulltextsearch?query=%QUERY';
  const bloodhound = ngeoSearchCreateGeoJSONBloodhound(
    url, undefined, olProj.get('EPSG:3857'), olProj.get('EPSG:21781'));
  bloodhound.initialize();
  return bloodhound;
};


/**
 * @param {jQuery.Event} event Event.
 * @param {Object} suggestion Suggestion.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {app.SearchController}
 * @private
 */
app.SearchController.select_ = function(event, suggestion, dataset) {
  const feature = /** @type {ol.Feature} */ (suggestion);
  const featureGeometry = /** @type {ol.geom.SimpleGeometry} */
      (feature.getGeometry());
  const size = this.map.getSize();
  googAsserts.assert(size !== undefined);
  const source = this.vectorLayer_.getSource();
  source.clear(true);
  source.addFeature(feature);
  this.map.getView().fit(featureGeometry, {
    size: size,
    maxZoom: 16
  });
};


app.module.controller('AppSearchController', app.SearchController);


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {
  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [0, 0],
      zoom: 4
    })
  });

};


app.module.controller('MainController', app.MainController);
