goog.module('ngeo.mapDirective');

const googAsserts = goog.require('goog.asserts');
const ngeoBase = goog.require('ngeo');
const ngeoDatasourceSyncDataSourcesMap = goog.require('ngeo.datasource.SyncDataSourcesMap');
const olEvents = goog.require('ol.events');
const olMap = goog.require('ol.Map');


/**
 * Provides a directive used to insert a user-defined OpenLayers
 * map in the DOM. The directive does not create an isolate scope.
 *
 * Examples:
 *
 *   Simple:
 *
 *      <div ngeo-map="ctrl.map"></div>
 *
 *   Manage window resizing:
 *
 *      <div
 *        ngeo-map="ctrl.map"
 *        ngeo-map-manage-resize="ctrl.manageResize"
 *        ngeo-map-resize-transition="ctrl.resizeTransition">
 *      </div>
 *
 * See our live examples:
 * [../examples/permalink.html](../examples/permalink.html)
 * [../examples/simple.html](../examples/simple.html)
 *
 * @htmlAttribute {ol.Map} ngeo-map The map.
 * @param {angular.$window} $window The Angular $window service.
 * @param {ngeo.datasource.SyncDataSourcesMap} ngeoSyncDataSourcesMap Ngeo sync
 *     data sources map service.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMap
 */
exports = function($window, ngeoSyncDataSourcesMap) {
  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {
      // Get the 'ol.Map' object from attributes and manage it accordingly
      const attr = 'ngeoMap';
      const prop = attrs[attr];

      const map = scope.$eval(prop);
      googAsserts.assertInstanceof(map, olMap);

      map.setTarget(element[0]);

      ngeoSyncDataSourcesMap.map = map;


      // Get the 'window resize' attributes, which are optionnal. If defined,
      // the browser window 'resize' event is listened to update the size of
      // the map when fired. A transition option is also available to let any
      // animation that may occur on the div of the map to smootly resize the
      // map while in progress.
      const manageResizeAttr = 'ngeoMapManageResize';
      const manageResizeProp = attrs[manageResizeAttr];
      const manageResize = scope.$eval(manageResizeProp);

      if (manageResize) {
        const resizeTransitionAttr = 'ngeoMapResizeTransition';
        const resizeTransitionProp = attrs[resizeTransitionAttr];

        const resizeTransition = /** @type {number|undefined} */ (
          scope.$eval(resizeTransitionProp));

        olEvents.listen(
          $window,
          'resize',
          () => {
            if (resizeTransition) {
              // Resize with transition
              const start = Date.now();
              let loop = true;
              const adjustSize = function() {
                map.updateSize();
                map.renderSync();
                if (loop) {
                  $window.requestAnimationFrame(adjustSize);
                }
                if (Date.now() - start > resizeTransition) {
                  loop = false;
                }
              };
              adjustSize();
            } else {
              // A single plain resize
              map.updateSize();
            }
          }
        );
      }
    }
  };
};

ngeoBase.module.directive('ngeoMap', exports);
