/**
 * @module
 */
import ngeoBase from './index.js';

const exports = function() {

};


/**
 * Get options regarding the time property of a node;
 *
 * @param {ngeox.TimeProperty} time the time property of a node
 * @return {{
 *  minDate : number,
 *  maxDate : number,
 *  values : (Array<number>|number)
 * }} - Configuration for the UI components
 * @export
 */
exports.prototype.getOptions = function(time) {

  const minDate = new Date(time.minValue);
  const maxDate = new Date(time.maxValue);

  const minDefaultDate = (time.minDefValue) ?
    new Date(time.minDefValue) : minDate;
  const maxDefaultDate = (time.maxDefValue) ?
    new Date(time.maxDefValue) : maxDate;

  const defaultValues = (time.mode === 'range') ?
    [minDefaultDate.getTime(), maxDefaultDate.getTime()] :
    minDefaultDate.getTime();

  return {
    minDate: minDate.getTime(),
    maxDate: maxDate.getTime(),
    values: defaultValues
  };
};


/**
 * Time.prototype.getUTCDate - Get UTC date from a local date object
 *
 * @param  {Object} localDate loacl date object in
 * @return {Object} UTC date
 * @export
 */
exports.prototype.getUTCDate = function(localDate) {
  return new Date(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth(),
    localDate.getUTCDate());
};


ngeoBase.module.service('ngeoTime', exports);
export default exports;