goog.module('ngeo.DecorateInteraction');

const googAsserts = goog.require('goog.asserts');
const ngeoBase = goog.require('ngeo');


/**
 * Provides a function that adds an "active" property (using
 * `Object.defineProperty`) to an interaction, making it possible to use ngModel
 * to activate/deactivate interactions.
 *
 * Example:
 *
 *      <input type="checkbox" ngModel="interaction.active" />
 *
 * See our live example: [../examples/interactiontoggle.html](../examples/interactiontoggle.html)
 *
 * @typedef {function(ol.interaction.Interaction)}
 * @ngdoc service
 * @ngname ngeoDecorateInteraction
 */
exports;


/**
 * @param {ol.interaction.Interaction} interaction Interaction to decorate.
 */
ngeoBase.decorateInteraction = function(interaction) {
  googAsserts.assertInstanceof(interaction, ol.interaction.Interaction);

  Object.defineProperty(interaction, 'active', {
    get: () => interaction.getActive(),
    set: (val) => {
      interaction.setActive(val);
    }
  });
};


ngeoBase.module.value('ngeoDecorateInteraction', ngeoBase.decorateInteraction);
