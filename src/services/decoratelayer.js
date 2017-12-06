/**
 * @module
 */
let exports = {};
import googAsserts from 'goog/asserts';
import ngeoBase from './index.js';


/**
 * Provides a function that adds properties (using
 * `Object.defineProperty`) to the layer, making it possible to control layer
 * properties with ngModel.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="layer.visible" />
 *
 * See our live examples:
 * [../examples/layeropacity.html](../examples/layeropacity.html)
 * [../examples/layervisibility.html](../examples/layervisibility.html)
 *
 * @typedef {function(ol.layer.Base)}
 * @ngdoc service
 * @ngname ngeoDecorateLayer
 */
exports;


/**
 * @param {ol.layer.Base} layer Layer to decorate.
 */
ngeoBase.decorateLayer = function(layer) {
  googAsserts.assertInstanceof(layer, ol.layer.Base);

  Object.defineProperty(layer, 'visible', {
    configurable: true,
    /**
     * @return {boolean} Visible.
     */
    get: () => layer.getVisible(),
    /**
     * @param {boolean} val Visible.
     */
    set: (val) => {
      layer.setVisible(val);
    }
  });

  Object.defineProperty(layer, 'opacity', {
    configurable: true,
    /**
     * @return {number} Opacity.
     */
    get: () => layer.getOpacity(),
    /**
     * @param {number} val Opacity.
     */
    set: (val) => {
      layer.setOpacity(val);
    }
  });
};


ngeoBase.module.value('ngeoDecorateLayer', ngeoBase.decorateLayer);
export default exports;