goog.module('ngeo.DecorateLayerLoading');

const googAsserts = goog.require('goog.asserts');
const ngeoBase = goog.require('ngeo');


/**
 * Provides a function that adds a 'loading 'property (using
 * `Object.defineProperty`) to an ol.layer.Group or a layer with
 * an ol.source.Tile or an ol.source.Image source.
 * This property is true when the layer is loading and false otherwise.
 *
 * Example:
 *
 *      <span ng-if="layer.loading">please wait</span>
 *
 * @typedef {function(ol.layer.Base, angular.Scope)}
 * @ngdoc service
 * @ngname ngeoDecorateLayerLoading
 */
exports;


/**
 * @param {ol.layer.Base} layer Layer to decorate.
 * @param {angular.Scope} $scope Scope.
 */
ngeoBase.decorateLayerLoading = function(layer, $scope) {

  let source;

  /**
   * @type {Array<string>|null}
   */
  let incrementEvents = null;

  /**
   * @type {Array<string>|null}
   */
  let decrementEvents = null;

  /**
   * @function
   * @private
   */
  const incrementLoadCount_ = increment_;

  /**
   * @function
   * @private
   */
  const decrementLoadCount_ = decrement_;

  layer.set('load_count', 0, true);

  if (layer instanceof ol.layer.Group) {
    layer.getLayers().on('add', (olEvent) => {
      const newLayer = olEvent.element;
      newLayer.set('parent_group', layer);
    });
  }

  if (layer instanceof ol.layer.Layer) {
    source = layer.getSource();
    if (source === null) {
      return;
    } else if (source instanceof ol.source.Tile) {
      incrementEvents = ['tileloadstart'];
      decrementEvents = ['tileloadend', 'tileloaderror'];
    } else if (source instanceof ol.source.Image) {
      incrementEvents = ['imageloadstart'];
      decrementEvents = ['imageloadend', 'imageloaderror'];
    } else {
      googAsserts.fail('unsupported source type');
    }

    source.on(incrementEvents, () => {
      incrementLoadCount_(layer);
      $scope.$applyAsync();
    });

    source.on(decrementEvents, () => {
      decrementLoadCount_(layer);
      $scope.$applyAsync();
    });
  }

  Object.defineProperty(layer, 'loading', {
    configurable: true,
    get: () => /** @type {number} */ (layer.get('load_count')) > 0
  });

  /**
   * @function
   * @param {ol.layer.Base} layer Layer
   * @private
   */
  function increment_(layer) {
    let load_count = /** @type {number} */ (layer.get('load_count'));
    const parent = /** @type {ol.layer.Base} */ (layer.get('parent_group'));
    layer.set('load_count', ++load_count, true);
    if (parent) {
      increment_(parent);
    }
  }

  /**
   * @function
   * @param {ol.layer.Base} layer Layer
   * @private
   */
  function decrement_(layer) {
    let load_count = /** @type {number} */ (layer.get('load_count'));
    const parent = /** @type {ol.layer.Base} */ (layer.get('parent_group'));
    layer.set('load_count', --load_count, true);
    if (parent) {
      decrement_(parent);
    }
  }

};


ngeoBase.module.value('ngeoDecorateLayerLoading', ngeoBase.decorateLayerLoading);
