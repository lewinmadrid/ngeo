goog.module('ngeo.popupDirective');

const ngeoBase = goog.require('ngeo');


ngeoBase.module.value('ngeoPopupTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['ngeoPopupTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeoBase.baseTemplateUrl}/popup.html`;
  });


/**
 * Provides a directive used to show a popup over the page with
 * a title and content.
 *
 *
 * Things to know about this directive:
 *
 * - This directive is intented to be used along with the popup service.
 *
 * - By default the directive uses "popup.html" as its templateUrl. This can be
 *   changed by redefining the "ngeoPopupTemplateUrl" value.
 *
 * - The directive doesn't create any scope but relies on its parent scope.
 *   Properties like 'content', 'title' or 'open' come from the parent scope.
 *
 * @private
 * @param {string} ngeoPopupTemplateUrl URL to popup template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoPopup
 */
exports = function(ngeoPopupTemplateUrl) {
  return {
    restrict: 'A',
    templateUrl: ngeoPopupTemplateUrl,
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {
      element.addClass('popover');

      /**
       * @param {jQuery.Event} evt Event.
       */
      scope.close = function(evt) {
        if (evt) {
          evt.stopPropagation();
          evt.preventDefault();
        }
        element.addClass('hidden');
      };

      // Watch the open property
      scope.$watch('open', (newVal, oldVal) => {
        element.css('display', newVal ? 'block' : 'none');
      });
    }
  };
};

ngeoBase.module.directive('ngeoPopup', exports);
