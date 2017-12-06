/**
 * @module
 */
import olEvents from 'ol/events';
import olFeature from 'ol/Feature';
import olFunctions from 'ol/functions';
import olGeomCircle from 'ol/geom/Circle';
import olInteractionDraw from 'ol/interaction/Draw';
import olInteractionInteraction from 'ol/interaction/Interaction';

const exports = function(options) {

  /**
   * @type {number}
   * @private
   */
  this.angle_ = options.angle !== undefined ? options.angle : 0;

  /**
   * @type {number}
   * @private
   */
  this.radius_ = options.radius;

  /**
   * @type {number}
   * @private
   */
  this.sides_ = options.sides !== undefined ? options.sides : 3;

  /**
   * @type {!Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  olInteractionInteraction.call(this, {
    handleEvent: olFunctions.TRUE
  });

};

ol.inherits(
  exports, olInteractionInteraction);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @export
 * @override
 */
exports.prototype.setActive = function(active) {
  olInteractionInteraction.prototype.setActive.call(this, active);

  if (this.getMap()) {
    if (active) {
      this.enable_();
    } else {
      this.disable_();
    }
  }
};


/**
 * @inheritDoc
 */
exports.prototype.setMap = function(map) {

  const active = this.getActive();

  const currentMap = this.getMap();
  if (currentMap && active) {
    this.disable_();
  }

  olInteractionInteraction.prototype.setMap.call(this, map);

  if (map && active) {
    this.enable_();
  }

};


/**
 * Enable the interaction. Called when added to a map AND active.
 * @private
 */
exports.prototype.enable_ = function() {
  const map = this.getMap();
  goog.asserts.assert(map, 'Map should be set.');
  this.listenerKeys_.push(
    olEvents.listen(map, 'click', this.handleMapClick_, this)
  );
};


/**
 * Disable the interaction. Called when removed from a map or deactivated.
 * @private
 */
exports.prototype.disable_ = function() {
  const map = this.getMap();
  goog.asserts.assert(map, 'Map should be set.');
  this.listenerKeys_.forEach(olEvents.unlistenByKey);
  this.listenerKeys_.length = 0;
};


/**
 * Called the the map is clicked. Create a regular polygon at the clicked
 * location using the configuration
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @private
 */
exports.prototype.handleMapClick_ = function(evt) {
  const center = evt.coordinate;
  const geometry = ol.geom.Polygon.fromCircle(
    new olGeomCircle(center), this.sides_
  );

  ol.geom.Polygon.makeRegular(geometry, center, this.radius_, this.angle_);

  this.dispatchEvent(new olInteractionDraw.Event(
    /** @type {ol.interaction.DrawEventType} */ ('drawend'), new olFeature(geometry)));
};
export default exports;