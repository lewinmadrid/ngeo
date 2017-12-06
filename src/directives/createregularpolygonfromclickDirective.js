/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoInteractionDrawRegularPolygonFromClick from './interaction/DrawRegularPolygonFromClick.js';
import olEvents from 'ol/events';
import olFeature from 'ol/Feature';

const exports = function() {
  return {
    controller: ngeoBase.CreateregularpolygonfromclickController,
    bindToController: true,
    scope: {
      'active': '=ngeoCreateregularpolygonfromclickActive',
      'angle': '<?ngeoCreateregularpolygonfromclickAngle',
      'features': '=ngeoCreateregularpolygonfromclickFeatures',
      'map': '=ngeoCreateregularpolygonfromclickMap',
      'radius': '<ngeoCreateregularpolygonfromclickRadius',
      'sides': '<?ngeoCreateregularpolygonfromclickSides'
    }
  };
};

ngeoBase.module.directive(
  'ngeoCreateregularpolygonfromclick',
  exports);


/**
 * @param {!angular.Scope} $scope Scope.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoCreateregularpolygonfromclickController
 */
ngeoBase.CreateregularpolygonfromclickController = function($scope) {

  // == Scope properties ==

  /**
   * @type {boolean}
   * @export
   */
  this.active = false;

  $scope.$watch(
    () => this.active,
    (newVal) => {
      this.interaction_.setActive(newVal);
    }
  );

  /**
   * @type {number|undefined}
   * @export
   */
  this.angle;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {number}
   * @export
   */
  this.radius;

  /**
   * @type {number|undefined}
   * @export
   */
  this.sides;


  // == Other properties ==

  /**
   * @type {ngeo.interaction.DrawRegularPolygonFromClick}
   * @private
   */
  this.interaction_;

  /**
   * @type {ol.EventsKey}
   * @private
   */
  this.interactionListenerKey_;

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
};


/**
 * Initialize the directive.
 */
ngeoBase.CreateregularpolygonfromclickController.prototype.$onInit = function() {

  this.interaction_ = new ngeoInteractionDrawRegularPolygonFromClick({
    angle: this.angle,
    radius: this.radius,
    sides: this.sides
  });
  this.interaction_.setActive(this.active);

  this.interactionListenerKey_ = olEvents.listen(
    this.interaction_,
    'drawend',
    this.handleDrawEnd_,
    this
  );

  this.map.addInteraction(this.interaction_);
};


/**
 * Called when a feature is finished being drawn. Add the feature to the
 * collection.
 * @param {ol.interaction.Draw.Event} evt Event.
 * @private
 */
ngeoBase.CreateregularpolygonfromclickController.prototype.handleDrawEnd_ = function(evt) {
  const feature = new olFeature(evt.feature.getGeometry());
  this.features.push(feature);
};


/**
 * Cleanup event listeners and remove the interaction from the map.
 * @private
 */
ngeoBase.CreateregularpolygonfromclickController.prototype.handleDestroy_ = function() {
  olEvents.unlistenByKey(this.interactionListenerKey_);
  this.interaction_.setActive(false);
  this.map.removeInteraction(this.interaction_);
};
export default exports;