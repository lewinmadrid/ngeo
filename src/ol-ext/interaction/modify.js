goog.module('ngeo.interaction.Modify');

const ngeoInteractionModifyCircle = goog.require('ngeo.interaction.ModifyCircle');
const ngeoInteractionModifyRectangle = goog.require('ngeo.interaction.ModifyRectangle');
const olEvents = goog.require('ol.events');
const olFunctions = goog.require('ol.functions');
const olInteractionInteraction = goog.require('ol.interaction.Interaction');
const olCollection = goog.require('ol.Collection');
const olInteractionModify = goog.require('ol.interaction.Modify');


/**
 * This interaction combines multiple kind of feature modification interactions
 * in order to be able to modify vector features depending on their geometry
 * type. The different kind of interactions supported are:
 *
 * - `ol.interaction.Modify`
 * - `ngeo.interaction.ModifyCircle`
 * - `ngeo.interaction.ModifyRectangle`
 *
 * This interaction receives a collection of features. Its job is to listen
 * to added/removed features to and from it and add them in the proper
 * collection that is uniquely used for each inner interaction. Those inner
 * interactions follow the `active` property of this interaction, i.e. when
 * this interaction is activated, so do the inner interactions. Since they will
 * never share the same feature, they don't collide with one an other.
 *
 * @constructor
 * @struct
 * @extends {ol.interaction.Interaction}
 * @param {olx.interaction.ModifyOptions} options Options.
 * @export
 */
exports = function(options) {

  goog.asserts.assert(options.features);

  /**
   * @type {!ol.Collection.<ol.Feature>}
   * @private
   */
  this.features_ = options.features;

  /**
   * @type {!Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {Array.<ol.interaction.Interaction>}
   * @private
   */
  this.interactions_ = [];

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.otherFeatures_ = new olCollection();

  this.interactions_.push(new olInteractionModify({
    features: this.otherFeatures_,
    pixelTolerance: options.pixelTolerance,
    style: options.style,
    wrapX: options.wrapX
  }));

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.circleFeatures_ = new olCollection();

  this.interactions_.push(new ngeoInteractionModifyCircle({
    features: this.circleFeatures_,
    pixelTolerance: options.pixelTolerance,
    style: options.style,
    wrapX: options.wrapX
  }));

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.rectangleFeatures_ = new olCollection();

  this.interactions_.push(new ngeoInteractionModifyRectangle({
    features: this.rectangleFeatures_,
    pixelTolerance: options.pixelTolerance,
    style: options.style,
    wrapX: options.wrapX
  }));


  olInteractionInteraction.call(this, {
    handleEvent: olFunctions.TRUE
  });

};
ol.inherits(exports, olInteractionInteraction);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @export
 * @override
 */
exports.prototype.setActive = function(active) {
  olInteractionInteraction.prototype.setActive.call(this, active);
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

  const interactions = this.interactions_;

  const currentMap = this.getMap();
  if (currentMap) {
    interactions.forEach((interaction) => {
      currentMap.removeInteraction(interaction);
    }, this);
  }

  olInteractionInteraction.prototype.setMap.call(this, map);

  if (map) {
    interactions.forEach((interaction) => {
      map.addInteraction(interaction);
    }, this);
  }

  this.setState_();
};


/**
 * Toggle interactions.
 * @private
 */
exports.prototype.setState_ = function() {
  const map = this.getMap();
  const active = this.getActive();
  const interactions = this.interactions_;
  const keys = this.listenerKeys_;

  interactions.forEach((interaction) => {
    interaction.setActive(active && !!map);
  }, this);

  if (active && map) {
    this.features_.forEach(this.addFeature_, this);
    keys.push(
      olEvents.listen(this.features_, 'add', this.handleFeaturesAdd_, this),
      olEvents.listen(this.features_, 'remove', this.handleFeaturesRemove_, this)
    );
  } else {
    keys.forEach(olEvents.unlistenByKey);
    keys.length = 0;
    this.features_.forEach(this.removeFeature_, this);
  }
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.prototype.handleFeaturesAdd_ = function(evt) {
  const feature = evt.element;
  goog.asserts.assertInstanceof(feature, ol.Feature,
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
  const collection = this.getFeatureCollection_(feature);
  collection.push(feature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.prototype.removeFeature_ = function(feature) {
  const collection = this.getFeatureCollection_(feature);
  collection.remove(feature);
};


/**
 * @param {ol.Feature} feature Feature.
 * @return {ol.Collection.<ol.Feature>} Collection of features for this feature.
 * @private
 */
exports.prototype.getFeatureCollection_ = function(feature) {
  let features;
  const isCircle = feature.get(ngeo.FeatureProperties.IS_CIRCLE);
  const isRectangle = feature.get(ngeo.FeatureProperties.IS_RECTANGLE);
  if (isCircle === true || isCircle === 'true') {
    features = this.circleFeatures_;
  } else if (isRectangle === true || isRectangle === 'true') {
    features = this.rectangleFeatures_;
  } else {
    features = this.otherFeatures_;
  }
  return features;
};
