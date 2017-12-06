/**
 * @module
 */
import ngeoBase from './index.js';


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


const exports = function(ngeoPopupTemplateUrl) {
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
export default exports;