/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoFeatureOverlay from './FeatureOverlay.js';
import ngeoFeatureOverlayMgr from './FeatureOverlayMgr.js';
import ngeoNotification from './Notification.js';
import olEvents from 'ol/events';
import olFeature from 'ol/Feature';
import olGeolocation from 'ol/Geolocation';
import olMap from 'ol/Map';
import olGeomPoint from 'ol/geom/Point';


/**
 * @enum {string}
 */
ngeoBase.DesktopGeolocationEventType = {
  /**
   * Triggered when an error occurs.
   */
  ERROR: 'desktop-geolocation-error'
};


const exports = function() {
  return {
    restrict: 'A',
    scope: {
      'getDesktopMapFn': '&ngeoDesktopGeolocationMap',
      'getDesktopGeolocationOptionsFn': '&ngeoDesktopGeolocationOptions'
    },
    controller: ngeoBase.DesktopGeolocationController
  };
};


ngeoBase.module.directive('ngeoDesktopGeolocation',
  exports);


/**
 * @constructor
 * @private
 * @struct
 * @param {angular.Scope} $scope The directive's scope.
 * @param {angular.JQLite} $element Element.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoDesktopGeolocationController
 */
ngeoBase.DesktopGeolocationController = function($scope, $element,
  ngeoFeatureOverlayMgr, ngeoNotification) {

  $element.on('click', this.toggle.bind(this));

  const map = $scope['getDesktopMapFn']();
  goog.asserts.assertInstanceof(map, olMap);

  /**
   * @type {!ol.Map}
   * @private
   */
  this.map_ = map;

  const options = $scope['getDesktopGeolocationOptionsFn']() || {};
  goog.asserts.assertObject(options);

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {ngeo.Notification}
   * @private
   */
  this.notification_ = ngeoNotification;

  /**
   * @type {ngeo.FeatureOverlay}
   * @private
   */
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();

  /**
   * @type {ol.Geolocation}
   * @private
   */
  this.geolocation_ = new olGeolocation({
    projection: map.getView().getProjection()
  });

  // handle geolocation error.
  this.geolocation_.on('error', function(error) {
    this.deactivate_();
    this.notification_.error(error.message);
    $scope.$emit(ngeoBase.DesktopGeolocationEventType.ERROR, error);
  }, this);

  /**
   * @type {ol.Feature}
   * @private
   */
  this.positionFeature_ = new olFeature();

  if (options.positionFeatureStyle) {
    this.positionFeature_.setStyle(options.positionFeatureStyle);
  }

  /**
   * @type {ol.Feature}
   * @private
   */
  this.accuracyFeature_ = new olFeature();

  if (options.accuracyFeatureStyle) {
    this.accuracyFeature_.setStyle(options.accuracyFeatureStyle);
  }

  /**
   * @type {number|undefined}
   * @private
   */
  this.zoom_ = options.zoom;

  /**
   * @type {boolean}
   * @private
   */
  this.active_ = false;

  olEvents.listen(this.geolocation_, 'change:accuracyGeometry', () => {
    this.accuracyFeature_.setGeometry(this.geolocation_.getAccuracyGeometry());
  });

  olEvents.listen(this.geolocation_, 'change:position', (event) => {
    this.setPosition_(event);
  });

};


/**
 * @export
 */
ngeoBase.DesktopGeolocationController.prototype.toggle = function() {
  if (this.active_) {
    this.deactivate_();
  } else {
    this.activate_();
  }
};


/**
 * @private
 */
ngeoBase.DesktopGeolocationController.prototype.activate_ = function() {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.geolocation_.setTracking(true);
  this.active_ = true;
};


/**
 * @private
 */
ngeoBase.DesktopGeolocationController.prototype.deactivate_ = function() {
  this.featureOverlay_.clear();
  this.active_ = false;
  this.notification_.clear();
};


/**
 * @param {ol.Object.Event} event Event.
 * @private
 */
ngeoBase.DesktopGeolocationController.prototype.setPosition_ = function(event) {
  const position = /** @type {ol.Coordinate} */ (this.geolocation_.getPosition());
  const point = new olGeomPoint(position);

  this.positionFeature_.setGeometry(point);
  this.map_.getView().setCenter(position);

  if (this.zoom_ !== undefined) {
    this.map_.getView().setZoom(this.zoom_);
  }

  this.geolocation_.setTracking(false);
};
export default exports;