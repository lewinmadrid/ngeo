goog.module('ngeo.controlDirective');

const googAsserts = goog.require('goog.asserts');
const ngeoBase = goog.require('ngeo');
const olMap = goog.require('ol.Map');
const olControlControl = goog.require('ol.control.Control');


/**
 * Provides a directive that can be used to add a control to the map
 * using a DOM element.
 *
 * Example:
 *
 *     <div ngeo-control="ctrl.control" ngeo-control-map="ctrl.map"></div>
 *
 * The expression passed to "ngeo-control" should evaluate to a control
 * instance, and the expression passed to "ngeo-control-map" should
 * evaluate to a map instance.
 *
 * See our live example: [../examples/control.html](../examples/control.html)
 *
 * @htmlAttribute {ol.Map} ngeo-control-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoControl
 */
exports = function() {
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
