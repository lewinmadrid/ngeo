/**
 * @module
 */
let exports = {};
import ngeoBase from './index.js';

/* eslint-disable valid-jsdoc */
// FIXME: eslint can't detect that the function returns a function

/**
 * Provides a debounce service. That service is a function
 * used to debounce calls to a user-provided function.
 *
 * See our live example: [../examples/permalink.html](../examples/permalink.html)
 *
 * @typedef {function(function(?), number, boolean):function()}
 * @ngdoc service
 * @ngname ngeoDebounce
 */
exports;


/**
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @return {ngeo.Debounce} The debounce function.
 * @ngInject
 */
ngeoBase.debounceServiceFactory = function($timeout) {
  return (
  /**
       * @param {function(?)} func The function to debounce.
       * @param {number} wait The wait time in ms.
       * @param {boolean} invokeApply Whether the call to `func` is wrapped
       *    into an `$apply` call.
       * @return {function()} The wrapper function.
       */
    function(func, wait, invokeApply) {
      /**
         * @type {?angular.$q.Promise}
         */
      let timeout = null;
      return (
        function(...args) {
          const context = this;
          const later = function() {
            timeout = null;
            func.apply(context, args);
          };
          if (timeout !== null) {
            $timeout.cancel(timeout);
          }
          timeout = $timeout(later, wait, invokeApply);
        });
    });
};


ngeoBase.module.factory('ngeoDebounce', ngeoBase.debounceServiceFactory);
export default exports;