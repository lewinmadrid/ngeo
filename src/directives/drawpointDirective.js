goog.module('ngeo.drawpointDirective');

const ngeoBase = goog.require('ngeo');
const olEvents = goog.require('ol.events');
const olInteractionDraw = goog.require('ol.interaction.Draw');


/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
exports = function() {
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

      const drawPoint = new olInteractionDraw({
        type: /** @type {ol.geom.GeometryType} */ ('Point')
      });

      drawFeatureCtrl.registerInteraction(drawPoint);
      drawFeatureCtrl.drawPoint = drawPoint;

      olEvents.listen(
        drawPoint,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeoBase.GeometryType.POINT),
        drawFeatureCtrl
      );
      olEvents.listen(
        drawPoint,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeoBase.module.directive('ngeoDrawpoint', exports);
