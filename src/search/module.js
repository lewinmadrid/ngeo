/**
 * @module ngeo search namespace
 */
goog.module('ngeo.search.module');

const ngeoSearchSearchDirective = goog.require('ngeo.search.searchDirective');
const ngeoSearchCreateGeoJSONBloodhound = goog.require('ngeo.search.createGeoJSONBloodhound');
const ngeoSearchCreateLocationSearchBloodhound = goog.require('ngeo.search.createLocationSearchBloodhound');


/**
 * @type {!angular.Module}
 */
exports = angular.module('ngeoSearchModule', [
  ngeoSearchSearchDirective.module.name,
  ngeoSearchCreateGeoJSONBloodhound.module.name,
  ngeoSearchCreateLocationSearchBloodhound.module.name
]);
