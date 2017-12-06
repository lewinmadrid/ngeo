/**
 * @module
 */
import olEvents from 'ol/events';
import olFeature from 'ol/Feature';
import olFunctions from 'ol/functions';
import olGeomLineString from 'ol/geom/LineString';
import olGeomPoint from 'ol/geom/Point';
import olGeomSimpleGeometry from 'ol/geom/SimpleGeometry';
import olInteractionDraw from 'ol/interaction/Draw';
import olInteractionInteraction from 'ol/interaction/Interaction';
import olLayerVector from 'ol/layer/Vector';
import olSourceVector from 'ol/source/Vector';


/**
 * @enum {string}
 */
ngeo.interaction.MobileDrawProperty = {
  DIRTY: 'dirty',
  DRAWING: 'drawing',
  VALID: 'valid'
};


const exports = function(options) {

  olInteractionInteraction.call(this, {
    handleEvent: olFunctions.TRUE
  });

  /**
   * The key for view center change event.
   * @type {?ol.EventsKey}
   * @private
   */
  this.changeEventKey_ = null;

  /**
   * Geometry type.
   * @type {ol.geom.GeometryType}
   * @private
   */
  this.type_ = options.type;

  /**
   * The number of points that must be drawn before a polygon ring or line
   * string can be finished.  The default is 3 for polygon rings and 2 for
   * line strings.
   * @type {number}
   * @private
   */
  this.minPoints_ = options.minPoints ?
    options.minPoints :
    (this.type_ === 'Polygon' ? 3 : 2);

  /**
   * Sketch feature.
   * @type {ol.Feature}
   * @private
   */
  this.sketchFeature_ = null;

  /**
   * Previous sketch points, saved to be able to display them on the layer.
   * @type {Array.<ol.Feature>}
   * @private
   */
  this.sketchPoints_ = [];

  /**
   * Current sketch point.
   * @type {ol.Feature}
   * @private
   */
  this.sketchPoint_ = null;

  /**
   * Draw overlay where our sketch features are drawn.
   * @type {ol.layer.Vector}
   * @private
   */
  this.overlay_ = new olLayerVector({
    source: new olSourceVector({
      useSpatialIndex: false,
      wrapX: options.wrapX ? options.wrapX : false
    }),
    style: options.style ? options.style :
      olInteractionDraw.getDefaultStyleFunction(),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  olEvents.listen(this, 'change:active', this.updateState_, this);

  this.set(ngeo.interaction.MobileDrawProperty.DIRTY, false);
  this.set(ngeo.interaction.MobileDrawProperty.DRAWING, false);
  this.set(ngeo.interaction.MobileDrawProperty.VALID, false);

};

ol.inherits(exports, olInteractionInteraction);


/**
 * @inheritDoc
 */
exports.prototype.setMap = function(map) {

  const currentMap = this.getMap();
  if (currentMap) {
    if (this.changeEventKey_) {
      olEvents.unlistenByKey(this.changeEventKey_);
    }
  }

  olInteractionInteraction.prototype.setMap.call(this, map);

  if (map) {
    this.changeEventKey_ = olEvents.listen(map.getView(),
      'change:center',
      this.handleViewCenterChange_, this);
  }

  this.updateState_();
};


// === PUBLIC METHODS - PROPERTY GETTERS ===


/**
 * Return whether the interaction is currently dirty. It is if the sketch
 * feature has its geometry last coordinate set to the center without the
 * use of the `addToDrawing` method.
 * @return {boolean} `true` if the interaction is dirty, `false` otherwise.
 * @observable
 * @export
 */
exports.prototype.getDirty = function() {
  return /** @type {boolean} */ (
    this.get(ngeo.interaction.MobileDrawProperty.DIRTY));
};


/**
 * Return whether the interaction is currently drawing.
 * @return {boolean} `true` if the interaction is drawing, `false` otherwise.
 * @observable
 * @export
 */
exports.prototype.getDrawing = function() {
  return /** @type {boolean} */ (
    this.get(ngeo.interaction.MobileDrawProperty.DRAWING));
};


/**
 * Return whether the interaction as a valid sketch feature, i.e. its geometry
 * is valid.
 * @return {boolean} `true` if the interaction has a valid sketch feature,
 *     `false` otherwise.
 * @observable
 * @export
 */
exports.prototype.getValid = function() {
  return /** @type {boolean} */ (
    this.get(ngeo.interaction.MobileDrawProperty.VALID));
};


/**
 * Returns the current sketch feature.
 * @return {?ol.Feature} The sketch feature, or null if none.
 * @export
 */
exports.prototype.getFeature = function() {
  return this.sketchFeature_;
};


// === PUBLIC METHODS ===


/**
 * Add current sketch point to sketch feature if the latter exists, else create
 * it.
 * @export
 */
exports.prototype.addToDrawing = function() {

  // no need to do anything if interaction is not active, nor drawing
  const active = this.getActive();
  const drawing = this.getDrawing();

  if (!active || !drawing) {
    return;
  }

  let sketchFeatureGeom;
  const sketchPointGeom = this.getSketchPointGeometry_();
  const coordinate = sketchPointGeom.getCoordinates();
  let coordinates;

  // == point ==
  if (this.type_ === 'Point') {
    if (!this.sketchFeature_) {
      this.sketchFeature_ = new olFeature(new olGeomPoint(coordinate));
      this.dispatchEvent(new olInteractionDraw.Event(
        /** @type {ol.interaction.DrawEventType} */ ('drawstart'), this.sketchFeature_));
    }
    sketchFeatureGeom = this.sketchFeature_.getGeometry();
    goog.asserts.assertInstanceof(sketchFeatureGeom, olGeomSimpleGeometry);
    sketchFeatureGeom.setCoordinates(coordinate);
    return;
  }

  // == line string ==
  if (this.type_ === 'LineString') {
    this.sketchPoints_.push(this.sketchPoint_);
    if (!this.sketchFeature_) {
      coordinates = [coordinate.slice(), coordinate.slice()];
      this.sketchFeature_ = new olFeature(new olGeomLineString(coordinates));
      this.dispatchEvent(new olInteractionDraw.Event(
        /** @type {ol.interaction.DrawEventType} */ ('drawstart'), this.sketchFeature_));
    } else {
      sketchFeatureGeom = this.sketchFeature_.getGeometry();
      goog.asserts.assertInstanceof(sketchFeatureGeom, olGeomSimpleGeometry);
      coordinates = sketchFeatureGeom.getCoordinates();
      coordinates.push(coordinate.slice());
      sketchFeatureGeom.setCoordinates(coordinates);
    }
  }

  const dirty = this.getDirty();
  if (dirty) {
    this.set(ngeo.interaction.MobileDrawProperty.DIRTY, false);
  }

  // minPoints validation
  const valid = this.getValid();
  if (this.type_ === 'LineString') {
    if (coordinates.length >= this.minPoints_) {
      if (!valid) {
        this.set(ngeo.interaction.MobileDrawProperty.VALID, true);
      }
    } else {
      if (valid) {
        this.set(ngeo.interaction.MobileDrawProperty.VALID, false);
      }
    }
  }

  // reset sketch point
  this.sketchPoint_ = null;

  // update sketch features
  this.updateSketchFeatures_();
};


/**
 * Clear the drawing
 * @export
 */
exports.prototype.clearDrawing = function() {
  this.setActive(false);
  this.setActive(true);
};


/**
 * Finish drawing. If there's a sketch point, it's added first.
 * @export
 */
exports.prototype.finishDrawing = function() {

  // no need to do anything if interaction is not active, nor drawing
  const active = this.getActive();
  const drawing = this.getDrawing();

  if (!active || !drawing) {
    return;
  }

  if (this.sketchPoint_) {
    this.addToDrawing();
  }

  this.set(ngeo.interaction.MobileDrawProperty.DRAWING, false);

  this.dispatchEvent(new olInteractionDraw.Event(
    /** @type {ol.interaction.DrawEventType} */ ('drawend'), this.sketchFeature_));
};


// === PRIVATE METHODS ===


/**
 * Start drawing by adding the sketch point first.
 * @private
 */
exports.prototype.startDrawing_ = function() {
  this.set(ngeo.interaction.MobileDrawProperty.DRAWING, true);
  this.createOrUpdateSketchPoint_();
  this.updateSketchFeatures_();

  if (this.type_ === 'Point') {
    this.addToDrawing();
  }
};


/**
 * Modify the geometry of the sketch feature to have its last coordinate
 * set to the center of the map.
 * @private
 */
exports.prototype.modifyDrawing_ = function() {
  if (!this.sketchFeature_) {
    return;
  }

  const center = this.getCenter_();

  if (this.type_ === 'LineString') {
    const sketchFeatureGeom = this.sketchFeature_.getGeometry();
    goog.asserts.assertInstanceof(sketchFeatureGeom, olGeomSimpleGeometry);
    const coordinates = sketchFeatureGeom.getCoordinates();
    coordinates.pop();
    coordinates.push(center);
    sketchFeatureGeom.setCoordinates(coordinates);
  }

  const dirty = this.getDirty();
  if (!dirty) {
    this.set(ngeo.interaction.MobileDrawProperty.DIRTY, true);
  }

};


/**
 * Stop drawing without adding the sketch feature to the target layer.
 * @return {?ol.Feature} The sketch feature (or null if none).
 * @private
 */
exports.prototype.abortDrawing_ = function() {
  const sketchFeature = this.sketchFeature_;
  if (sketchFeature || this.sketchPoints_.length > 0) {
    this.sketchFeature_ = null;
    this.sketchPoint_ = null;
    this.overlay_.getSource().clear(true);
  }
  this.sketchPoints_ = [];
  this.set(ngeo.interaction.MobileDrawProperty.DIRTY, false);
  this.set(ngeo.interaction.MobileDrawProperty.DRAWING, false);
  this.set(ngeo.interaction.MobileDrawProperty.VALID, false);
  return sketchFeature;
};


/**
 * @private
 */
exports.prototype.updateState_ = function() {
  const map = this.getMap();
  const active = this.getActive();
  if (!map || !active) {
    this.abortDrawing_();
  } else {
    this.startDrawing_();
  }
  this.overlay_.setMap(active ? map : null);
};


/**
 * @param {ol.Object.Event} evt Event.
 * @private
 */
exports.prototype.handleViewCenterChange_ = function(evt) {
  // no need to do anything if interaction is not active, nor drawing
  const active = this.getActive();
  const drawing = this.getDrawing();

  if (!active || !drawing) {
    return;
  }

  this.createOrUpdateSketchPoint_();

  if (this.type_ === 'Point') {
    this.addToDrawing();
  } else {
    this.modifyDrawing_();
    this.updateSketchFeatures_();
  }
};


/**
 * @private
 */
exports.prototype.createOrUpdateSketchPoint_ = function() {
  const center = this.getCenter_();

  if (this.sketchPoint_) {
    const geometry = this.getSketchPointGeometry_();
    geometry.setCoordinates(center);
  } else {
    this.sketchPoint_ = new olFeature(new olGeomPoint(center));
  }

};


/**
 * Redraw the sketch features.
 * @private
 */
exports.prototype.updateSketchFeatures_ = function() {
  const sketchFeatures = [];
  if (this.sketchFeature_) {
    sketchFeatures.push(this.sketchFeature_);
  }
  if (this.sketchPoint_) {
    sketchFeatures.push(this.sketchPoint_);
  }
  const overlaySource = this.overlay_.getSource();
  overlaySource.clear(true);
  overlaySource.addFeatures(sketchFeatures);
  overlaySource.addFeatures(this.sketchPoints_);
};


/**
 * Returns the geometry of the sketch point feature.
 * @return {ol.geom.Point} Point.
 * @private
 */
exports.prototype.getSketchPointGeometry_ = function() {
  goog.asserts.assert(this.sketchPoint_, 'sketch point should be thruty');
  const geometry = this.sketchPoint_.getGeometry();
  goog.asserts.assertInstanceof(geometry, olGeomPoint);
  return geometry;
};


/**
 * Returns the center of the map view
 * @return {ol.Coordinate} Coordinate.
 * @private
 */
exports.prototype.getCenter_ = function() {
  const center = this.getMap().getView().getCenter();
  goog.asserts.assertArray(center);
  return center;
};
export default exports;