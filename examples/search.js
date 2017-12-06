/**
 * @module
 */
let exports = {};

import './search.css';
import 'jquery/dist/jquery.js';
import 'angular/angular.js';
import 'angular-gettext/dist/angular-gettext.js';
import 'angular-ui-date/dist/date.js';
import 'angular-float-thead/angular-floatThead.js';
import 'floatthead/dist/jquery.floatThead.min.js';
import 'corejs-typeahead/dist/typeahead.bundle.js';
import 'proj4/dist/proj4.js';
import '../utils/watchwatchers.js';

import ngeoProjEPSG21781 from 'ngeo/proj/epsg21781.js';
import ngeoMapDirective from 'ngeo/directives/mapDirective.js';
import ngeoBase from 'ngeo/index.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olProj from 'ol/proj.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import googAsserts from 'goog/asserts';
import ngeoSearchModule from 'ngeo/search/module.js';


/** @type {!angular.Module} **/
const module = angular.module('app', [
  ngeoBase.module.name,
  ngeoSearchModule.name
]);


/**
 * @type {!angular.Component}
 */
const searchComponent = {
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


module.component('appSearch', searchComponent);


/**
 * @constructor
 * @param {angular.JQLite} $element Element.
 * @param {angular.Scope} $rootScope Angular root scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {ngeo.search.createGeoJSONBloodhound.Function} ngeoSearchCreateGeoJSONBloodhound The ngeo
 *     create GeoJSON Bloodhound service.
 * @ngInject
 */
const SearchController = function($element, $rootScope, $compile, ngeoSearchCreateGeoJSONBloodhound) {
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
    select: SearchController.select_.bind(this)
  });
};


/**
 * @export
 */
SearchController.prototype.$onInit = function() {
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
SearchController.prototype.createVectorLayer_ = function() {
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
SearchController.prototype.createAndInitBloodhound_ = function(ngeoSearchCreateGeoJSONBloodhound) {
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
 * @this {SearchController}
 * @private
 */
SearchController.select_ = function(event, suggestion, dataset) {
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


module.controller('AppSearchController', SearchController);


/**
 * @constructor
 * @ngInject
 */
const MainController = function() {
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


module.controller('MainController', MainController);

export default exports;
