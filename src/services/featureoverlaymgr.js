/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoFeatureOverlay from './FeatureOverlay.js';
import olBase from 'ol';
import olFeature from 'ol/Feature';
import olLayerVector from 'ol/layer/Vector';
import olObj from 'ol/obj';
import olSourceVector from 'ol/source/Vector';
import olStyleStyle from 'ol/style/Style';
import googAsserts from 'goog/asserts';


/**
 * @typedef {{
 *  styleFunction: ol.StyleFunction,
 *  features: Object.<string, ol.Feature>
 * }}
 */
ngeoBase.FeatureOverlayGroup;


const exports = function() {

  /**
   * @type {Object.<string, number>}
   * @private
   */
  this.featureUidToGroupIndex_ = {};

  /**
   * @type {Array.<ngeo.FeatureOverlayGroup>}
   * @private
   */
  this.groups_ = [];

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.source_ = new olSourceVector({
    useSpatialIndex: false
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.layer_ = new olLayerVector({
    source: this.source_,
    style: this.styleFunction_.bind(this),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

};


/**
 * @param {ol.Feature} feature The feature to add.
 * @param {number} groupIndex The group groupIndex.
 * @export
 */
exports.prototype.addFeature = function(feature, groupIndex) {
  googAsserts.assert(groupIndex >= 0);
  googAsserts.assert(groupIndex < this.groups_.length);
  const featureUid = olBase.getUid(feature).toString();
  this.featureUidToGroupIndex_[featureUid] = groupIndex;
  this.groups_[groupIndex].features[featureUid] = feature;
  this.source_.addFeature(feature);
};


/**
 * @param {ol.Feature} feature The feature to add.
 * @param {number} groupIndex The group groupIndex.
 * @export
 */
exports.prototype.removeFeature = function(feature, groupIndex) {
  googAsserts.assert(groupIndex >= 0);
  googAsserts.assert(groupIndex < this.groups_.length);
  const featureUid = olBase.getUid(feature).toString();
  delete this.featureUidToGroupIndex_[featureUid];
  delete this.groups_[groupIndex].features[featureUid];
  this.source_.removeFeature(feature);
};


/**
 * @param {number} groupIndex The group groupIndex.
 * @export
 */
exports.prototype.clear = function(groupIndex) {
  googAsserts.assert(groupIndex >= 0);
  googAsserts.assert(groupIndex < this.groups_.length);
  const group = this.groups_[groupIndex];
  for (const featureUid in group.features) {
    this.removeFeature(group.features[featureUid], groupIndex);
  }
  googAsserts.assert(olObj.isEmpty(group.features));
};


/**
 * @return {ol.layer.Vector} The vector layer used internally.
 * @export
 */
exports.prototype.getLayer = function() {
  return this.layer_;
};


/**
 * @return {ngeo.FeatureOverlay} Feature overlay.
 * @export
 */
exports.prototype.getFeatureOverlay = function() {
  const groupIndex = this.groups_.length;
  this.groups_.push({
    styleFunction: olStyleStyle.defaultFunction,
    features: {}
  });
  return new ngeoFeatureOverlay(this, groupIndex);
};


/**
 * @param {ol.Map} map Map.
 * @export
 */
exports.prototype.init = function(map) {
  this.layer_.setMap(map);
};


/**
 * @param {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction} style
 * Style.
 * @param {number} groupIndex Group index.
 * @export
 */
exports.prototype.setStyle = function(style, groupIndex) {
  googAsserts.assert(groupIndex >= 0);
  googAsserts.assert(groupIndex < this.groups_.length);
  this.groups_[groupIndex].styleFunction = style === null ?
    olStyleStyle.defaultFunction : olStyleStyle.createFunction(style);
};


/**
 * @param {ol.Feature|ol.render.Feature} feature Feature.
 * @param {number} resolution Resolution.
 * @return {Array.<ol.style.Style>|ol.style.Style} Styles.
 * @private
 */
exports.prototype.styleFunction_ = function(feature, resolution) {
  const featureUid = olBase.getUid(feature).toString();
  googAsserts.assert(featureUid in this.featureUidToGroupIndex_);
  const groupIndex = this.featureUidToGroupIndex_[featureUid];
  const group = this.groups_[groupIndex];
  return group.styleFunction(feature, resolution);
};


ngeoBase.module.service('ngeoFeatureOverlayMgr', exports);
export default exports;