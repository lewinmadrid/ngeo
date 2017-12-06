/**
 * @module
 */
import googAsserts from 'goog/asserts';
import ngeoBase from 'ngeo/index.js';
import ngeoDatasourceSyncDataSourcesMap from 'ngeo/datasource/SyncDataSourcesMap.js';
import olEvents from 'ol/events';
import olMap from 'ol/Map';

const exports = function($window, ngeoSyncDataSourcesMap) {
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
export default exports;
