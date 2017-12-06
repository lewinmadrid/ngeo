/**
 * @module
 */
import googAsserts from 'goog/asserts';
import ngeoBase from './index.js';
import ngeoCustomEvent from './CustomEvent.js';
import olObservable from 'ol/Observable';
import olSourceImageWMS from 'ol/source/ImageWMS';
import olSourceTileWMS from 'ol/source/TileWMS';
import olSourceWMTS from 'ol/source/WMTS';

const exports = function() {

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
export default exports;