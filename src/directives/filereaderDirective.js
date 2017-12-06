/**
 * @module
 */
import ngeoBase from './index.js';

const exports = function($window) {
  return {
    restrict: 'A',
    scope: {
      'fileContent': '=ngeoFilereader',
      'supported': '=?ngeoFilereaderSupported'
    },
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {
      const supported = 'FileReader' in $window;
      scope['supported'] = supported;
      if (!supported) {
        return;
      }
      element.on('change', (changeEvent) => {
        /** @type {!FileReader} */
        const fileReader = new $window.FileReader();
        fileReader.onload = (
          /**
                 * @param {!ProgressEvent} evt Event.
                 */
          function(evt) {
            scope.$apply(() => {
              scope['fileContent'] = evt.target.result;
            });
          });
        fileReader.readAsText(changeEvent.target.files[0]);
      });
    }
  };
};


ngeoBase.module.directive('ngeoFilereader', exports);
export default exports;