/**
 * @module
 */
import googAsserts from 'goog/asserts';
import olEvents from 'ol/events';
import ngeoBase from './index.js';
import ngeoProfile from './profile.js';
import ngeoDebounce from './Debounce.js';

const exports = function(ngeoDebounce) {
  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {

      const optionsAttr = attrs['ngeoProfileOptions'];
      googAsserts.assert(optionsAttr !== undefined);

      const selection = d3.select(element[0]);
      let profile, elevationData, poiData;

      scope.$watchCollection(optionsAttr, (newVal) => {

        const options = /** @type {ngeox.profile.ProfileOptions} */
                (ol.obj.assign({}, newVal));

        if (options !== undefined) {

          // proxy the hoverCallback and outCallbackin order to be able to
          // call $applyAsync
          //
          // We're using $applyAsync here because the callback may be
          // called inside the Angular context. For example, it's the case
          // when the user hover's the line geometry on the map and the
          // profileHighlight property is changed.
          //
          // For that reason we use $applyAsync instead of $apply here.
          if (options.hoverCallback !== undefined) {
            const origHoverCallback = options.hoverCallback;
            options.hoverCallback = function(...args) {
              origHoverCallback(...args);
              scope.$applyAsync();
            };
          }

          if (options.outCallback !== undefined) {
            const origOutCallback = options.outCallback;
            options.outCallback = function() {
              origOutCallback();
              scope.$applyAsync();
            };
          }

          profile = ngeoProfile(options);
          refreshData();
        }
      });

      scope.$watch(attrs['ngeoProfile'], (newVal, oldVal) => {
        elevationData = newVal;
        refreshData();
      });

      scope.$watch(attrs['ngeoProfilePois'], (newVal, oldVal) => {
        poiData = newVal;
        refreshData();
      });

      scope.$watch(attrs['ngeoProfileHighlight'],
        (newVal, oldVal) => {
          if (newVal === undefined) {
            return;
          }
          if (newVal > 0) {
            profile.highlight(newVal);
          } else {
            profile.clearHighlight();
          }
        });

      olEvents.listen(window, 'resize', ngeoDebounce(refreshData, 50, true));

      function refreshData() {
        if (profile !== undefined) {
          selection.datum(elevationData).call(profile);
          if (elevationData !== undefined) {
            profile.showPois(poiData);
          }
        }
      }
    }
  };
};

ngeoBase.module.directive('ngeoProfile', exports);
export default exports;