goog.module('ngeo.Features');
const ngeoBase = goog.require('ngeo');
const olCollection = goog.require('ol.Collection');


ngeoBase.module.value('ngeoFeatures', new olCollection());
