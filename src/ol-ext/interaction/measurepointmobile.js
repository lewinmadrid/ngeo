goog.module('ngeo.interaction.MeasurePointMobile');

const ngeoInteractionMeasure = goog.require('ngeo.interaction.Measure');
const ngeoInteractionMobileDraw = goog.require('ngeo.interaction.MobileDraw');
const olGeomPoint = goog.require('ol.geom.Point');


/**
 * @classdesc
 * Interaction dedicated to measure by coordinate (point) on mobile devices.
 *
 * @constructor
 * @struct
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.numberCoordinates} format the Formatter
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 * @export
 */
exports = function(format, opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  ol.obj.assign(options, {displayHelpTooltip: false});

  ngeoInteractionMeasure.call(this, options);

  /**
   * @type {ngeox.numberCoordinates}
   */
  this.format_ = format;

};
ol.inherits(exports, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new ngeoInteractionMobileDraw({
    type: /** @type {ol.geom.GeometryType} */ ('Point'),
    style: style,
    source: source
  });
};


/**
 * @inheritDoc
 */
exports.prototype.handleMeasure = function(callback) {
  const geom = goog.asserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomPoint);
  const dec = this.decimals;
  const output = ngeoInteractionMeasure.getFormattedPoint(geom, dec, this.format_);
  const coord = geom.getLastCoordinate();
  callback(output, coord);
};
