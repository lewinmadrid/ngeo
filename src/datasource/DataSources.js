goog.module('ngeo.datasource.DataSources');

const ngeoBase = goog.require('ngeo');
const olCollection = goog.require('ol.Collection');


ngeoBase.module.value('ngeoDataSources', new olCollection());


/**
 * @typedef {!ol.Collection.<!ngeo.datasource.DataSource>}
 */
exports;
