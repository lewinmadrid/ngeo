/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoMapQuerent from './MapQuerent.js';
import olEvents from 'ol/events';

const exports = function(ngeoMapQuerent, $injector) {
  return {
    restrict: 'A',
    scope: false,
    link: (scope, elem, attrs) => {
      const map = scope.$eval(attrs['ngeoMapQueryMap']);
      let clickEventKey_ = null;
      let pointerMoveEventKey_ = null;

      /**
       * Called when the map is clicked while this controller is active. Issue
       * a request to the query service using the coordinate that was clicked.
       * @param {ol.MapBrowserEvent} evt The map browser event being fired.
       */
      const handleMapClick_ = function(evt) {
        const coordinate = evt.coordinate;
        ngeoMapQuerent.issue({
          coordinate,
          map
        });
      };

      /**
       * Called when the pointer is moved while this controller is active.
       * Change the mouse pointer when hovering a non-transparent pixel on the
       * map.
       * @param {ol.MapBrowserEvent} evt The map browser event being fired.
       */
      const handlePointerMove_ = function(evt) {
        if (!evt.dragging) {
          const pixel = map.getEventPixel(evt.originalEvent);
          const queryable = function(layer) {
            const visible = layer.get('visible');
            const sourceids = layer.get('querySourceIds');
            return visible && !!sourceids;
          };
          const hit = map.forEachLayerAtPixel(pixel, () => true, undefined, queryable);
          map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        }
      };

      /**
       * Listen to the map events.
       */
      const activate_ = function() {
        clickEventKey_ = olEvents.listen(map, 'click', handleMapClick_);
        const queryOptions = /** @type {ngeox.QueryOptions} */ (
          $injector.has('ngeoQueryOptions') ? $injector.get('ngeoQueryOptions') : {}
        );
        if (queryOptions.cursorHover) {
          pointerMoveEventKey_ = olEvents.listen(map, 'pointermove', handlePointerMove_);
        }
      };

      /**
       * Unlisten the map events.
       */
      const deactivate_ = function() {
        if (clickEventKey_ !== null) {
          olEvents.unlistenByKey(clickEventKey_);
          clickEventKey_ = null;
        }
        if (pointerMoveEventKey_ !== null) {
          olEvents.unlistenByKey(pointerMoveEventKey_);
          pointerMoveEventKey_ = null;
        }
        if (scope.$eval(attrs['ngeoMapQueryAutoclear']) !== false) {
          ngeoMapQuerent.clear();
        }
      };

      // watch 'active' property -> activate/deactivate accordingly
      scope.$watch(attrs['ngeoMapQueryActive'],
        (newVal, oldVal) => {
          if (newVal) {
            activate_();
          } else {
            deactivate_();
          }
        }
      );
    }
  };
};

ngeoBase.module.directive('ngeoMapQuery', exports);
export default exports;