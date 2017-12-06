goog.module('ngeo.CustomEvent');
const olEventsEvent = goog.require('ol.events.Event');


/**
 * @constructor
 * @extends {ol.events.Event}
 * @param {string} type Event type.
 * @param {T} detail Event Detail.
 * @template T
 */
exports = function(type, detail = {}) {

  olEventsEvent.call(this, type);

  /**
   * @type {T}
   */
  this.detail = detail;

};
ol.inherits(exports, olEventsEvent);
