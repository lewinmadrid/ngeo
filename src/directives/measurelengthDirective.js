/**
 * @module
 */
import ngeoBase from './index.js';
import olEvents from 'ol/events';
import ngeoFilters from './filters.js';
import ngeoInteractionMeasureLength from './interaction/MeasureLength.js';
import olStyleStyle from 'ol/style/Style';

const exports = function($compile, gettextCatalog, $filter, $injector) {
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

      const helpMsg = gettextCatalog.getString('Click to start drawing line');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br/>' +
          'Double-click or click last point to finish');

      const measureLength = new ngeoInteractionMeasureLength($filter('ngeoUnitPrefix'), {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined
      });

      drawFeatureCtrl.registerInteraction(measureLength);
      drawFeatureCtrl.measureLength = measureLength;

      olEvents.listen(
        measureLength,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeoBase.GeometryType.LINE_STRING),
        drawFeatureCtrl
      );
      olEvents.listen(
        measureLength,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeoBase.module.directive('ngeoMeasurelength', exports);
export default exports;