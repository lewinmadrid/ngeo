/**
 * @module
 */
import ngeoBase from './index.js';
import olEvents from 'ol/events';
import olInteractionDraw from 'ol/interaction/Draw';
import olGeomPolygon from 'ol/geom/Polygon';

const exports = function() {
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

      const drawRectangle = new olInteractionDraw({
        type: /** @type {ol.geom.GeometryType} */ ('LineString'),
        geometryFunction: (coordinates, geometry) => {
          if (!geometry) {
            geometry = new olGeomPolygon(null);
          }
          const start = coordinates[0];
          const end = coordinates[1];
          geometry.setCoordinates([
            [start, [start[0], end[1]], end, [end[0], start[1]], start]
          ]);
          return geometry;
        },
        maxPoints: 2
      });

      drawFeatureCtrl.registerInteraction(drawRectangle);
      drawFeatureCtrl.drawRectangle = drawRectangle;

      olEvents.listen(
        drawRectangle,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeoBase.GeometryType.RECTANGLE),
        drawFeatureCtrl
      );
      olEvents.listen(
        drawRectangle,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeoBase.module.directive('ngeoDrawrectangle', exports);
export default exports;