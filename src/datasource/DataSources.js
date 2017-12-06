/**
 * @module
 */
let exports = {};
import ngeoBase from '../index.js';
import olCollection from 'ol/Collection';


ngeoBase.module.value('ngeoDataSources', new olCollection());


/**
 * @typedef {!ol.Collection.<!ngeo.datasource.DataSource>}
 */
exports;
export default exports;