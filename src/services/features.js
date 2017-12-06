/**
 * @module
 */
let exports = {};
import ngeoBase from './index.js';
import olCollection from 'ol/Collection';


ngeoBase.module.value('ngeoFeatures', new olCollection());
export default exports;