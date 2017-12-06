goog.module('ngeo.BackgroundLayerMgr');

const googAsserts = goog.require('goog.asserts');
const ngeoBase = goog.require('ngeo');
const ngeoCustomEvent = goog.require('ngeo.CustomEvent');
const olObservable = goog.require('ol.Observable');
const olSourceImageWMS = goog.require('ol.source.ImageWMS');
const olSourceTileWMS = goog.require('ol.source.TileWMS');
const olSourceWMTS = goog.require('ol.source.WMTS');


/**
 * Provides a service for setting/unsetting background layers
 * in maps.
 *
 * The notion of background/base layers doesn't exist in OpenLayers. This
 * service adds that notion.
 *
 * Setting a background layer to map is done with the `set` function:
 *
 *     ngeoBackgroundLayerMgr.set(map, layer);
 *
 * To unset the background layer pass `null` as the `layer` argument:
 *
 *     ngeoBackgroundLayerMgr.set(map, null);
 *
 * The `get` function returns the current background layer of the map passed
 * as an argument. `null` is returned if the map doesn't have a background
 * layer.
 *
 * The background layer is always added at index 0 in the map's layers
 * collection. When a background layer is set it is inserted (at index 0)
 * if the map does not already have a background layer, otherwise the
 * new background layer replaces the previous one at index 0.
 *
 * Users can subscribe to a 'change' event to get notified when the background
 * layer changes:
 *
 *     ngeoBackgroundLayerMgr.on('change', function(e) {
 *       // do something with the layer
 *       let layer = ngeoBackgroundLayerMgr.get();
 *       // know which layer was used before
 *       let previous = e.previous
 *     });
 *
 * See our live examples:
 * [../examples/backgroundlayer.html](../examples/backgroundlayer.html)
 * [../examples/backgroundlayerdropdown.html](../examples/backgroundlayerdropdown.html)
 *
 * @extends {ol.Observable}
 * @constructor
 * @struct
 * @ngdoc service
 * @ngname ngeoBackgroundLayerMgr
 */
exports = function() {

  olObservable.call(this);

  /**
   * Object used to track if maps have background layers.
   * @type {Object.<string, boolean>}
   * @private
   */
  this.mapUids_ = {};
};
ol.inherits(exports, olObservable);


/**
 * Return the current background layer of a given map. `null` is returned if
 * the map does not have a background layer.
 * @param {ol.Map} map Map.
 * @return {ol.layer.Base} layer The background layer.
 * @export
 */
exports.prototype.get = function(map) {
  const mapUid = ol.getUid(map).toString();
  return mapUid in this.mapUids_ ? map.getLayers().item(0) : null;
};


/**
 * Set the background layer of a map. If `layer` is `null` the background layer
 * is removed.
 * @param {ol.Map} map The map.
 * @param {ol.layer.Base} layer The new background layer.
 * @return {ol.layer.Base} The previous background layer.
 * @export
 */
exports.prototype.set = function(map, layer) {
  const mapUid = ol.getUid(map).toString();
  const previous = this.get(map);
  if (previous !== null) {
    googAsserts.assert(mapUid in this.mapUids_);
    if (layer !== null) {
      map.getLayers().setAt(0, layer);
    } else {
      map.getLayers().removeAt(0);
      delete this.mapUids_[mapUid];
    }
  } else if (layer !== null) {
    map.getLayers().insertAt(0, layer);
    this.mapUids_[mapUid] = true;
  }
  /** @type {ngeox.BackgroundEvent} */
  const event = new ngeoCustomEvent('change', {
    current: layer,
    previous: previous
  });
  this.dispatchEvent(event);

  return previous;
};

/**
 * @param {ol.Map} map The map.
 * @param {Object.<string, string>} dimensions The global dimensions object.
 * @export
 */
exports.prototype.updateDimensions = function(map, dimensions) {
  const baseBgLayer = this.get(map);
  if (baseBgLayer) {
    let layers = [baseBgLayer];
    if (baseBgLayer instanceof ol.layer.Group) {
      // Handle the first level of layers of the base background layer.
      layers = baseBgLayer.getLayers().getArray();
    }

    layers.forEach((layer) => {
      googAsserts.assertInstanceof(layer, ol.layer.Layer);
      if (layer) {
        let hasUpdates = false;
        const updatedDimensions = {};
        for (const key in layer.get('dimensions')) {
          const value = dimensions[key];
          if (value !== undefined) {
            updatedDimensions[key] = value;
            hasUpdates = true;
          }
        }
        if (hasUpdates) {
          const source = layer.getSource();
          if (source instanceof olSourceWMTS) {
            source.updateDimensions(updatedDimensions);
            source.refresh();
          } else if (source instanceof olSourceTileWMS || source instanceof olSourceImageWMS) {
            source.updateParams(updatedDimensions);
            source.refresh();
          }
        }
      }
    });
  }
};

ngeoBase.module.service('ngeoBackgroundLayerMgr', exports);
