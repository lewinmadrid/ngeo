goog.module('ngeo.measureareaDirective');

const ngeoBase = goog.require('ngeo');
const olEvents = goog.require('ol.events');
const ngeoFilters = goog.require('ngeo.filters');
const ngeoInteractionMeasureArea = goog.require('ngeo.interaction.MeasureArea');
const olStyleStyle = goog.require('ol.style.Style');


/**
 * @param {!angular.$compile} $compile Angular compile service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {!angular.$filter} $filter Angular filter
 * @param {!angular.$injector} $injector Main injector.
 * @return {!angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
exports = function($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.Scope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.DrawfeatureController} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const helpMsg = gettextCatalog.getString('Click to start drawing polygon');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br/>' +
          'Double-click or click starting point to finish');

      const measureArea = new ngeoInteractionMeasureArea($filter('ngeoUnitPrefix'), {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined
      });

      drawFeatureCtrl.registerInteraction(measureArea);
      drawFeatureCtrl.measureArea = measureArea;

      olEvents.listen(
        measureArea,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeoBase.GeometryType.POLYGON),
        drawFeatureCtrl
      );
      olEvents.listen(
        measureArea,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeoBase.module.directive('ngeoMeasurearea', exports);
