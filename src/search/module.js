/**
 * @module ngeo search namespace
 */
import ngeoSearchSearchDirective from '../search/searchDirective.js';
import ngeoSearchCreateGeoJSONBloodhound from '../search/createGeoJSONBloodhound.js';
import ngeoSearchCreateLocationSearchBloodhound from '../search/createLocationSearchBloodhound.js';

const exports = angular.module('ngeoSearchModule', [
  ngeoSearchSearchDirective.module.name,
  ngeoSearchCreateGeoJSONBloodhound.module.name,
  ngeoSearchCreateLocationSearchBloodhound.module.name
]);

export default exports;
