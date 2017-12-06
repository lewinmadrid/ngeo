/**
 * @module
 */
import ngeoInteractionMeasureLength from '../interaction/MeasureLength.js';
import ngeoInteractionMobileDraw from '../interaction/MobileDraw.js';

const exports = function(format, opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  ol.obj.assign(options, {displayHelpTooltip: false});

  ngeoInteractionMeasureLength.call(this, format, options);

};

ol.inherits(
  exports, ngeoInteractionMeasureLength);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new ngeoInteractionMobileDraw({
    type: /** @type {ol.geom.GeometryType} */ ('LineString'),
    style: style,
    source: source
  });
};
export default exports;