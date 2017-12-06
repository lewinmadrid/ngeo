/**
 * @module
 */
import ngeoBase from './index.js';

const exports = function() {
  return {
    restrict: 'A',
    link: ($scope, $element, $attrs) => {
      const mapExpr = $attrs['ngeoRecenterMap'];
      const map = /** @type {ol.Map} */ ($scope.$eval(mapExpr));

      function recenter(element) {
        const extent = element.attr('ngeo-extent');
        if (extent !== undefined) {
          const size = /** @type {ol.Size} */ (map.getSize());
          map.getView().fit($scope.$eval(extent), {size});
        }
        const zoom = element.attr('ngeo-zoom');
        if (zoom !== undefined) {
          map.getView().setZoom($scope.$eval(zoom));
        }
      }

      // if the children is a link or button
      $element.on('click', '*', function(event) {
        recenter(angular.element($(this)));
      });

      // if the children is an option inside a select
      $element.on('change', (event) => {
        const selected = event.target.options[event.target.selectedIndex];
        recenter(angular.element(selected));
      });

    }
  };
};

ngeoBase.module.directive('ngeoRecenter', exports);
export default exports;