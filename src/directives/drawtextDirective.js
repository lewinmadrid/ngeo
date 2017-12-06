goog.module('ngeo.drawtextDirective');

const ngeoBase = goog.require('ngeo');
const olEvents = goog.require('ol.events');
const olInteractionDraw = goog.require('ol.interaction.Draw');


/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawtext
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

      const drawText = new olInteractionDraw({
        type: /** @type {ol.geom.GeometryType} */ ('Point')
      });

      drawFeatureCtrl.registerInteraction(drawText);
      drawFeatureCtrl.drawText = drawText;

      olEvents.listen(
        drawText,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeoBase.GeometryType.TEXT),
        drawFeatureCtrl
      );
      olEvents.listen(
        drawText,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeoBase.module.directive('ngeoDrawtext', exports);
