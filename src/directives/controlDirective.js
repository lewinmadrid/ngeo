/**
 * @module
 */
import googAsserts from 'goog/asserts';
import ngeoBase from './index.js';
import olMap from 'ol/Map';
import olControlControl from 'ol/control/Control';

const exports = function() {
  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {

      const control = /** @type {ol.control.Control} */
              (scope.$eval(attrs['ngeoControl']));
      googAsserts.assertInstanceof(control, olControlControl);

      const map = /** @type {ol.Map} */
              (scope.$eval(attrs['ngeoControlMap']));
      googAsserts.assertInstanceof(map, olMap);

      control.setTarget(element[0]);
      map.addControl(control);
    }
  };
};


ngeoBase.module.directive('ngeoControl', exports);
export default exports;