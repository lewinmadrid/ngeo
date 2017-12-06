/**
 * @module
 */
import googAsserts from 'goog/asserts';
import ngeoBase from './index.js';
import olMap from 'ol/Map';

const exports = function($window) {
  const /** @type {number} */ duration = 1000;

  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {
      const attr = 'ngeoResizemap';
      const prop = attrs[attr];
      const map = scope.$eval(prop);
      googAsserts.assertInstanceof(map, olMap);

      const stateExpr = attrs['ngeoResizemapState'];
      googAsserts.assert(stateExpr !== undefined);

      let start;
      let animationDelayKey;

      const animationDelay = () => {
        map.updateSize();
        map.renderSync();

        if (Date.now() - start < duration) {
          animationDelayKey = $window.requestAnimationFrame(animationDelay);
        }
      };

      // Make sure the map is resized when the animation ends.
      // It may help in case the animation didn't start correctly.
      element.on('transitionend', () => {
        map.updateSize();
        map.renderSync();
      });

      scope.$watch(stateExpr, (newVal, oldVal) => {
        if (newVal != oldVal) {
          start = Date.now();
          $window.cancelAnimationFrame(animationDelayKey);
          animationDelayKey = $window.requestAnimationFrame(animationDelay);
        }
      });
    }
  };
};


ngeoBase.module.directive('ngeoResizemap', exports);
export default exports;