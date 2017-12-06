/**
 * @module
 */
import ngeoInteractionMeasure from '../interaction/Measure.js';
import olGeomPolygon from 'ol/geom/Polygon';
import olInteractionDraw from 'ol/interaction/Draw';

const exports = function(format, opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  ngeoInteractionMeasure.call(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg;
  if (options.continueMsg !== undefined) {
    this.continueMsg = options.continueMsg;
  } else {
    this.continueMsg = document.createElement('span');
    this.continueMsg.textContent = 'Click to continue drawing the polygon.';
    const br = document.createElement('br');
    br.textContent = 'Double-click or click starting point to finish.';
    this.continueMsg.appendChild(br);
  }

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.format = format;

};

ol.inherits(exports, ngeoInteractionMeasure);


/**
 * @inheritDoc
 */
exports.prototype.createDrawInteraction = function(style, source) {
  return new olInteractionDraw({
    type: /** @type {ol.geom.GeometryType} */ ('Polygon'),
    source: source,
    style: style
  });
};


/**
 * @inheritDoc
 */
exports.prototype.handleMeasure = function(callback) {
  const geom = goog.asserts.assertInstanceof(this.sketchFeature.getGeometry(), olGeomPolygon);
  const proj = this.getMap().getView().getProjection();
  goog.asserts.assert(proj);
  const output = ngeoInteractionMeasure.getFormattedArea(geom, proj, this.precision, this.format);
  const verticesCount = geom.getCoordinates()[0].length;
  let coord = null;
  if (verticesCount > 3) {
    coord = geom.getInteriorPoint().getCoordinates();
  }
  callback(output, coord);
};
export default exports;