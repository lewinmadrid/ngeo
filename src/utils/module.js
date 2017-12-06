/**
 * @module
 */
let exports = {};
import fileService from '../utils/File.js';

exports.module = angular.module('ngeo.utils', [
  fileService.module.name
]);
export default exports;