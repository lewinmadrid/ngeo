goog.module('ngeo.interaction.MeasureLengthMobile');

const ngeoInteractionMeasureLength = goog.require('ngeo.interaction.MeasureLength');
const ngeoInteractionMobileDraw = goog.require('ngeo.interaction.MobileDraw');


/**
 * @classdesc
 * Interaction dedicated to measure length on mobile devices.
 *
 * @constructor
 * @struct
 * @extends {ngeo.interaction.MeasureLength}
 * @param {ngeox.unitPrefix} format The format function
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 * @export
 */
exports = function(format, opt_options) {

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
