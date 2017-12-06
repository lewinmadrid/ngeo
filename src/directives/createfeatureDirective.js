/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoEventHelper from './EventHelper.js';
import ngeoFilters from './filters.js';
import ngeoInteractionMeasureArea from './interaction/MeasureArea.js';
import ngeoInteractionMeasureLength from './interaction/MeasureLength.js';
import ngeoUtils from './utils.js';
import olEvents from 'ol/events';
import olFeature from 'ol/Feature';
import olInteractionDraw from 'ol/interaction/Draw';
import olStyleStyle from 'ol/style/Style';

const exports = function() {
  return {
    controller: ngeoBase.CreatefeatureController,
    bindToController: true,
    scope: {
      'active': '=ngeoCreatefeatureActive',
      'features': '=ngeoCreatefeatureFeatures',
      'geomType': '=ngeoCreatefeatureGeomType',
      'map': '=ngeoCreatefeatureMap'
    }
  };
};

ngeoBase.module.directive('ngeoCreatefeature', exports);


/**
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {!angular.$compile} $compile Angular compile service.
 * @param {!angular.$filter} $filter Angular filter
 * @param {!angular.Scope} $scope Scope.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!ngeo.EventHelper} ngeoEventHelper Ngeo event helper service
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoCreatefeatureController
 */
ngeoBase.CreatefeatureController = function(gettextCatalog, $compile, $filter, $scope,
  $timeout, ngeoEventHelper) {

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  /**
   * @type {ol.Collection.<!ol.Feature>|!ol.source.Vector}
   * @export
   */
  this.features;

  /**
   * @type {string}
   * @export
   */
  this.geomType;

  /**
   * @type {!ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {!angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {!angular.$compile}
   * @private
   */
  this.compile_ = $compile;

  /**
   * @type {!angular.$filter}
   * @private
   */
  this.filter_ = $filter;

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {!angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {!ngeo.EventHelper}
   * @private
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  /**
   * The draw or measure interaction responsible of drawing the vector feature.
   * The actual type depends on the geometry type.
   * @type {ol.interaction.Interaction}
   * @private
   */
  this.interaction_;


  // == Event listeners ==
  $scope.$watch(
    () => this.active,
    (newVal) => {
      this.interaction_.setActive(newVal);
    }
  );
};


/**
 * Initialize the directive.
 */
ngeoBase.CreatefeatureController.prototype.$onInit = function() {
  this.active = this.active === true;
  const gettextCatalog = this.gettextCatalog_;

  // Create the draw or measure interaction depending on the geometry type
  let interaction;
  if (this.geomType === ngeoBase.GeometryType.POINT ||
      this.geomType === ngeoBase.GeometryType.MULTI_POINT
  ) {
    interaction = new olInteractionDraw({
      type: /** @type {ol.geom.GeometryType} */ ('Point')
    });
  } else if (this.geomType === ngeoBase.GeometryType.LINE_STRING ||
      this.geomType === ngeoBase.GeometryType.MULTI_LINE_STRING
  ) {
    const helpMsg = gettextCatalog.getString('Click to start drawing length');
    const contMsg = gettextCatalog.getString(
      'Click to continue drawing<br/>' +
      'Double-click or click last point to finish'
    );

    interaction = new ngeoInteractionMeasureLength(
      this.filter_('ngeoUnitPrefix'),
      {
        style: new olStyleStyle(),
        startMsg: this.compile_(`<div translate>${helpMsg}</div>`)(this.scope_)[0],
        continueMsg: this.compile_(`<div translate>${contMsg}</div>`)(this.scope_)[0]
      }
    );
  } else if (this.geomType === ngeoBase.GeometryType.POLYGON ||
      this.geomType === ngeoBase.GeometryType.MULTI_POLYGON
  ) {
    const helpMsg = gettextCatalog.getString('Click to start drawing area');
    const contMsg = gettextCatalog.getString(
      'Click to continue drawing<br/>' +
      'Double-click or click starting point to finish'
    );

    interaction = new ngeoInteractionMeasureArea(
      this.filter_('ngeoUnitPrefix'),
      {
        style: new olStyleStyle(),
        startMsg: this.compile_(`<div translate>${helpMsg}</div>`)(this.scope_)[0],
        continueMsg: this.compile_(`<div translate>${contMsg}</div>`)(this.scope_)[0]
      }
    );
  }

  goog.asserts.assert(interaction);

  interaction.setActive(this.active);
  this.interaction_ = interaction;
  this.map.addInteraction(interaction);

  const uid = ol.getUid(this);
  if (interaction instanceof olInteractionDraw) {
    this.ngeoEventHelper_.addListenerKey(
      uid,
      olEvents.listen(
        interaction,
        'drawend',
        this.handleDrawEnd_,
        this
      )
    );
  } else if (interaction instanceof ngeoInteractionMeasureLength ||
     interaction instanceof ngeoInteractionMeasureArea) {
    this.ngeoEventHelper_.addListenerKey(
      uid,
      olEvents.listen(
        interaction,
        'measureend',
        this.handleDrawEnd_,
        this
      )
    );
  }
};


/**
 * Called when a feature is finished being drawn. Add the feature to the
 * collection.
 * @param {ol.interaction.Draw.Event|ngeox.MeasureEvent} event Event.
 * @export
 */
ngeoBase.CreatefeatureController.prototype.handleDrawEnd_ = function(event) {
  let sketch;
  if (event.feature) {
    // ol.interaction.Draw.Event
    sketch = event.feature;
  } else {
    // ngeox.MeasureEvent
    sketch = event.detail.feature;
  }
  goog.asserts.assert(sketch);

  // convert to multi if geomType is multi and feature is not
  let geometry = sketch.getGeometry();
  const type = geometry.getType();
  if (this.geomType.indexOf('Multi') != type.indexOf('Multi')) {
    geometry = ngeoUtils.toMulti(geometry);
  }
  const feature = new olFeature(geometry);
  if (this.features instanceof ol.Collection) {
    this.features.push(feature);
  } else {
    this.features.addFeature(feature);
  }
};


/**
 * Cleanup event listeners and remove the interaction from the map.
 */
ngeoBase.CreatefeatureController.prototype.$onDestroy = function() {
  this.timeout_(() => {
    const uid = ol.getUid(this);
    this.ngeoEventHelper_.clearListenerKey(uid);
    this.interaction_.setActive(false);
    this.map.removeInteraction(this.interaction_);
  }, 0);
};
export default exports;