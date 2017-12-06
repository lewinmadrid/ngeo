/**
 * @module
 */
import olFeature from 'ol/Feature';
import olEvents from 'ol/events';
import olGeomLineString from 'ol/geom/LineString';
import olGeomPoint from 'ol/geom/Point';
import olGeomPolygon from 'ol/geom/Polygon';
import olInteractionTranslate from 'ol/interaction/Translate';
import olLayerVector from 'ol/layer/Vector';
import olSourceVector from 'ol/source/Vector';

const exports = function(options) {

  /**
   * @type {!Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {!Object.<number, ol.EventsKey>}
   * @private
   */
  this.featureListenerKeys_ = {};

  /**
   * @type {?ol.EventsKey}
   * @private
   */
  this.keyPressListenerKey_ = null;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.myFeatures_ = options.features !== undefined ? options.features : null;

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.vectorSource_ = new olSourceVector({
    useSpatialIndex: false
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = new olLayerVector({
    source: this.vectorSource_,
    style: options.style,
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  /**
   * @type {!Object.<number, ol.Feature>}
   * @private
   */
  this.centerFeatures_ = {};

  olInteractionTranslate.call(
    this, /** @type {olx.interaction.TranslateOptions} */ (options));
};

ol.inherits(exports, olInteractionTranslate);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @export
 * @override
 */
exports.prototype.setActive = function(active) {

  if (this.keyPressListenerKey_) {
    olEvents.unlistenByKey(this.keyPressListenerKey_);
    this.keyPressListenerKey_ = null;
  }

  olInteractionTranslate.prototype.setActive.call(this, active);

  if (active) {
    this.keyPressListenerKey_ = olEvents.listen(
      document,
      'keyup',
      this.handleKeyUp_,
      this
    );
  }

  this.setState_();
};


/**
 * Remove the interaction from its current map and attach it to the new map.
 * Subclasses may set up event handlers to get notified about changes to
 * the map here.
 * @param {ol.PluggableMap} map Map.
 * @override
 */
exports.prototype.setMap = function(map) {

  const currentMap = this.getMap();
  if (currentMap) {
    this.vectorLayer_.setMap(null);
  }

  olInteractionTranslate.prototype.setMap.call(this, map);

  if (map) {
    this.vectorLayer_.setMap(map);
  }

  this.setState_();
};


/**
 * @private
 */
exports.prototype.setState_ = function() {
  const map = this.getMap();
  const active = this.getActive();
  const features = this.myFeatures_;
  const keys = this.listenerKeys_;

  if (map && active && features) {
    features.forEach(this.addFeature_, this);
    keys.push(
      olEvents.listen(features, 'add', this.handleFeaturesAdd_, this),
      olEvents.listen(features, 'remove', this.handleFeaturesRemove_, this)
    );
  } else {

    if (map) {
      const elem = map.getTargetElement();
      elem.style.cursor = 'default';
    }

    keys.forEach(olEvents.unlistenByKey);
    keys.length = 0;
    features.forEach(this.removeFeature_, this);
  }
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.prototype.handleFeaturesAdd_ = function(evt) {
  const feature = evt.element;
  goog.asserts.assertInstanceof(feature, olFeature,
    'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.prototype.handleFeaturesRemove_ = function(evt) {
  const feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.prototype.addFeature_ = function(feature) {
  const uid = ol.getUid(feature);
  const geometry = feature.getGeometry();
  goog.asserts.assertInstanceof(geometry, ol.geom.Geometry);

  this.featureListenerKeys_[uid] = olEvents.listen(
    geometry,
    'change',
    this.handleGeometryChange_.bind(this, feature),
    this
  );

  const point = this.getGeometryCenterPoint_(geometry);
  const centerFeature = new olFeature(point);
  this.centerFeatures_[uid] = centerFeature;
  this.vectorSource_.addFeature(centerFeature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.prototype.removeFeature_ = function(feature) {
  const uid = ol.getUid(feature);
  if (this.featureListenerKeys_[uid]) {
    olEvents.unlistenByKey(this.featureListenerKeys_[uid]);
    delete this.featureListenerKeys_[uid];

    this.vectorSource_.removeFeature(this.centerFeatures_[uid]);
    delete this.centerFeatures_[uid];
  }
};


/**
 * @param {ol.Feature} feature Feature being moved.
 * @param {ol.events.Event} evt Event.
 * @private
 */
exports.prototype.handleGeometryChange_ = function(feature,
  evt) {
  const geometry = evt.target;
  goog.asserts.assertInstanceof(geometry, ol.geom.Geometry);

  const point = this.getGeometryCenterPoint_(geometry);
  const uid = ol.getUid(feature);
  this.centerFeatures_[uid].setGeometry(point);
};


/**
 * @param {ol.geom.Geometry} geometry Geometry.
 * @return {ol.geom.Point} The center point of the geometry.
 * @private
 */
exports.prototype.getGeometryCenterPoint_ = function(
  geometry) {

  let center;
  let point;

  if (geometry instanceof olGeomPolygon) {
    point = geometry.getInteriorPoint();
  } else if (geometry instanceof olGeomLineString) {
    center = geometry.getCoordinateAt(0.5);
  } else {
    const extent = geometry.getExtent();
    center = ol.extent.getCenter(extent);
  }

  if (!point && center) {
    point = new olGeomPoint(center);
  }

  goog.asserts.assert(point, 'Point should be thruthy');

  return point;
};


/**
 * Deactivate this interaction if the ESC key is pressed.
 * @param {KeyboardEvent} evt Event.
 * @private
 */
exports.prototype.handleKeyUp_ = function(evt) {
  // 27 == ESC key
  if (evt.keyCode === 27) {
    this.setActive(false);
  }
};
export default exports;