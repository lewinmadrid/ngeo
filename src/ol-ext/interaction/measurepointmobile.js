/**
 * @module
 */
import ngeoInteractionMeasure from '../interaction/Measure.js';
import ngeoInteractionMobileDraw from '../interaction/MobileDraw.js';
import olGeomPoint from 'ol/geom/Point';

const exports = function(format, opt_options) {

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
export default exports;