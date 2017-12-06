/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoMapQuerent from './MapQuerent.js';
import olInteractionDragBox from 'ol/interaction/DragBox';

const exports = function(ngeoMapQuerent) {
  return {
    restrict: 'A',
    scope: false,
    link: (scope, elem, attrs) => {
      /**
       * @type {ol.Map}
       */
      const map = scope.$eval(attrs['ngeoBboxQueryMap']);

      const interaction = new olInteractionDragBox({
        condition: ol.events.condition.platformModifierKeyOnly
      });

      /**
       * Called when a bbox is drawn while this controller is active. Issue
       * a request to the query service using the extent that was drawn.
       * @param {ol.interaction.DragBox.Event} evt Event.
       */
      const handleBoxEnd = function(evt) {
        const extent = interaction.getGeometry().getExtent();
        ngeoMapQuerent.issue({
          limit: scope.$eval(attrs['ngeoBboxQueryLimit']),
          extent: extent,
          map: map
        });
      };
      interaction.on('boxend', handleBoxEnd);

      // watch 'active' property -> activate/deactivate accordingly
      scope.$watch(attrs['ngeoBboxQueryActive'],
        (newVal, oldVal) => {
          if (newVal) {
            // activate
            map.addInteraction(interaction);
          } else {
            // deactivate
            map.removeInteraction(interaction);
            if (scope.$eval(attrs['ngeoBboxQueryAutoclear']) !== false) {
              ngeoMapQuerent.clear();
            }
          }
        }
      );
    }
  };
};

ngeoBase.module.directive('ngeoBboxQuery', exports);
export default exports;