/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoFilters from './filters.js';
import ngeoInteractionMeasureAzimut from './interaction/MeasureAzimut.js';
import olEvents from 'ol/events';
import olFeature from 'ol/Feature';
import olGeomPolygon from 'ol/geom/Polygon';
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

      const helpMsg = gettextCatalog.getString('Click to start drawing circle');
      const contMsg = gettextCatalog.getString('Click to finish');

      const measureAzimut = new ngeoInteractionMeasureAzimut(
        $filter('ngeoUnitPrefix'), $filter('number'), {
          style: new olStyleStyle(),
          startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
          continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
          precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined,
          decimals: $injector.has('ngeoMeasureDecimals') ? $injector.get('ngeoMeasureDecimals') : undefined
        });

      drawFeatureCtrl.registerInteraction(measureAzimut);
      drawFeatureCtrl.measureAzimut = measureAzimut;

      olEvents.listen(
        measureAzimut,
        'measureend',
        /**
         * @param {ngeox.MeasureEvent} event Event.
         */
        (event) => {
          // In the case of azimut measure interaction, the feature's
          // geometry is actually a collection (line + circle)
          // For our purpose here, we only need the circle, which gets
          // transformed into a polygon with 64 sides.
          const geometry = /** @type {ol.geom.GeometryCollection} */
                (event.detail.feature.getGeometry());
          const circle = /** @type {ol.geom.Circle} */ (
            geometry.getGeometries()[1]);
          const polygon = olGeomPolygon.fromCircle(circle, 64);
          event.feature = new olFeature(polygon);
          const azimut = ngeoInteractionMeasureAzimut.getAzimut(
            /** @type {ol.geom.LineString} */ (geometry.getGeometries()[0])
          );
          event.detail.feature.set('azimut', azimut);

          drawFeatureCtrl.handleDrawEnd(ngeoBase.GeometryType.CIRCLE, event);
        },
        drawFeatureCtrl
      );

      olEvents.listen(
        measureAzimut,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeoBase.module.directive('ngeoMeasureazimut', exports);
export default exports;