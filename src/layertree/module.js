goog.provide('ngeo.layertree.module');

goog.require('ngeo');
goog.require('ngeo.layertree.component');

/**
 * Also related to the map but not included in the module:
 *  - ngeo.layertree.Controller (already required by ngeo.layertree.component)
 * @type {!angular.Module}
 */
ngeo.layertree.module = angular.module('ngeoLayertreeModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.layertree.component.name
]);
