/**
 * @module
 */
/**
 * @module ngeo olcs namespace
 */
import Service from '../olcs/Service.js';
import control from '../olcs/controls3d.js';


/**
 * @type {!angular.Module}
 */
const m = angular.module('ngeoOlcsModule', [
  control.name,
  Service.module.name
]);

const exports = m;
export default exports;