/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoLayertreeController from './LayertreeController.js';


ngeoBase.module.value('ngeoLayertreeTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['ngeoLayertreeTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeoBase.baseTemplateUrl}/layertree.html`;
  });


const exports = function($compile, ngeoLayertreeTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: ngeoLayertreeTemplateUrl,
    controller: ngeoLayertreeController
  };
};


ngeoBase.module.directive('ngeoLayertree', exports);
export default exports;