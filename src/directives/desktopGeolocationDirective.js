goog.module('ngeo.desktopGeolocationDirective');

const ngeoBase = goog.require('ngeo');
const ngeoFeatureOverlay = goog.require('ngeo.FeatureOverlay');
const ngeoFeatureOverlayMgr = goog.require('ngeo.FeatureOverlayMgr');
const ngeoNotification = goog.require('ngeo.Notification');
const olEvents = goog.require('ol.events');
const olFeature = goog.require('ol.Feature');
const olGeolocation = goog.require('ol.Geolocation');
const olMap = goog.require('ol.Map');
const olGeomPoint = goog.require('ol.geom.Point');


/**
 * @enum {string}
 */
ngeoBase.DesktopGeolocationEventType = {
  /**
   * Triggered when an error occurs.
   */
  ERROR: 'desktop-geolocation-error'
};


/**
 * Provide a "desktop geolocation" directive.
 *
 * Example:
 *
 *      <button ngeo-desktop-geolocation=""
 *        ngeo-desktop-geolocation-map="ctrl.map"
 *        ngeo-desktop-geolocation-options="ctrl.desktopGeolocationOptions">
 *      </button>
 *
 * See our live example: [../examples/desktopgeolocation.html](../examples/desktopgeolocation.html)
 *
 * @htmlAttribute {ol.Map} gmf-geolocation-map The map.
 * @htmlAttribute {ngeox.DesktopGeolocationDirectiveOptions} gmf-geolocation-options The options.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDesktopGeolocation
 */
exports = function() {
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
