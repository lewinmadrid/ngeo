/**
 * @module
 */
import ngeoBase from './index.js';
import olArray from 'ol/array';
import olEvents from 'ol/events';
import olMap from 'ol/Map';
import olObject from 'ol/Object';
import olEvents from 'ol/events';


ngeoBase.module.value('ngeoScaleselectorTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['ngeoScaleselectorTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeoBase.baseTemplateUrl}/scaleselector.html`;
  });


const exports = function(ngeoScaleselectorTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoScaleselectorController',
    templateUrl: ngeoScaleselectorTemplateUrl
  };
};


ngeoBase.module.directive('ngeoScaleselector', exports);


/**
 * @constructor
 * @private
 * @struct
 * @param {angular.Scope} $scope Directive scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoScaleselectorController
 */
ngeoBase.ScaleselectorController = function($scope, $element, $attrs) {

  const scalesExpr = $attrs['ngeoScaleselector'];

  /**
   * The zoom level/scale map object.
   * @type {!Array.<number>}
   * @export
   */
  this.scales = /** @type {!Array.<number>} */
    ($scope.$eval(scalesExpr));
  goog.asserts.assert(this.scales !== undefined);

  /**
   * @type {Array.<number>}
   * @export
   */
  this.zoomLevels;

  $scope.$watch(() => Object.keys(this.scales).length, (newLength) => {
    this.zoomLevels = Object.keys(this.scales).map(Number);
    this.zoomLevels.sort(olArray.numberSafeCompareFunction);
  });

  const mapExpr = $attrs['ngeoScaleselectorMap'];

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = /** @type {ol.Map} */ ($scope.$eval(mapExpr));
  goog.asserts.assertInstanceof(this.map_, olMap);

  const optionsExpr = $attrs['ngeoScaleselectorOptions'];
  const options = $scope.$eval(optionsExpr);

  /**
   * @type {!ngeox.ScaleselectorOptions}
   * @export
   */
  this.options = ngeoBase.ScaleselectorController.getOptions_(options);

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {?ol.EventsKey}
   * @private
   */
  this.resolutionChangeKey_ = null;

  /**
   * @type {number|undefined}
   * @export
   */
  this.currentScale = undefined;

  const view = this.map_.getView();
  if (view !== null) {
    const currentZoom = this.map_.getView().getZoom();
    if (currentZoom !== undefined) {
      this.currentScale = this.getScale(currentZoom);
    }
  }

  olEvents.listen(this.map_, 'change:view', this.handleViewChange_, this);

  this.registerResolutionChangeListener_();

  $scope['scaleselectorCtrl'] = this;

};


/**
 * @param {?} options Options after expression evaluation.
 * @return {!ngeox.ScaleselectorOptions} Options object.
 * @private
 */
ngeoBase.ScaleselectorController.getOptions_ = function(options) {
  let dropup = false;
  if (options !== undefined) {
    dropup = options['dropup'] == true;
  }
  return /** @type {ngeox.ScaleselectorOptions} */ ({
    dropup: dropup
  });
};


/**
 * @param {number} zoom Zoom level.
 * @return {number} Scale.
 * @export
 */
ngeoBase.ScaleselectorController.prototype.getScale = function(zoom) {
  return this.scales[zoom];
};


/**
 * @param {number} zoom Zoom level.
 * @export
 */
ngeoBase.ScaleselectorController.prototype.changeZoom = function(zoom) {
  this.map_.getView().setZoom(zoom);
};


/**
 * @param {ol.Object.Event} e OpenLayers object event.
 * @private
 */
ngeoBase.ScaleselectorController.prototype.handleResolutionChange_ = function(e) {
  const view = this.map_.getView();
  const currentScale = this.scales[/** @type {number} */ (view.getZoom())];

  // handleResolutionChange_ is a change:resolution listener. The listener
  // may be executed outside the Angular context, for example when the user
  // double-clicks to zoom on the map.
  //
  // But it may also be executed inside the Angular context, when a function
  // in Angular context calls setZoom or setResolution on the view, which
  // is for example what happens when this controller's changeZoom function
  // is called.
  //
  // For that reason we use $applyAsync instead of $apply here.

  if (currentScale !== undefined) {
    this.$scope_.$applyAsync(() => {
      this.currentScale = currentScale;
    });
  }
};


/**
 * @param {ol.Object.Event} e OpenLayers object event.
 * @private
 */
ngeoBase.ScaleselectorController.prototype.handleViewChange_ = function(e) {
  this.registerResolutionChangeListener_();
  this.handleResolutionChange_(null);
};


/**
 * @private
 */
ngeoBase.ScaleselectorController.prototype.registerResolutionChangeListener_ = function() {
  if (this.resolutionChangeKey_ !== null) {
    olEvents.unlistenByKey(this.resolutionChangeKey_);
  }
  const view = this.map_.getView();
  this.resolutionChangeKey_ = olEvents.listen(view,
    'change:resolution', this.handleResolutionChange_,
    this);
};


ngeoBase.module.controller('NgeoScaleselectorController',
  ngeoBase.ScaleselectorController);
export default exports;