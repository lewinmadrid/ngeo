/**
 * @module
 */
import olEventsEvent from 'ol/events/Event';

const exports = function(type, detail = {}) {

  olEventsEvent.call(this, type);

  /**
   * @type {T}
   */
  this.detail = detail;

};

ol.inherits(exports, olEventsEvent);
export default exports;