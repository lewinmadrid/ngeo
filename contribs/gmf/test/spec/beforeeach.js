/*eslint valid-jsdoc: 0 */

goog.require('gmf.theme.module');

beforeEach(() => {
  const gmfModule = angular.module('gmf');
  gmfModule.constant('angularLocaleScript', 'http://fake');
  gmfModule.constant('gmfLayersUrl', 'https://fake');

  module('gmf', ($provide) => {
    $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
    $provide.value('gmfShortenerCreateUrl', 'http://fake/gmf/short/create');
    $provide.value('authenticationBaseUrl', 'https://fake/gmf/authentication');
    $provide.value('gmfRasterUrl', 'https://fake/gmf/raster');
    $provide.value('gmfContextualdatacontentTemplateUrl', 'contextualdata.html');
    $provide.value('defaultTheme', 'Demo');
  });
});
