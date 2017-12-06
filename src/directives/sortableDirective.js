/**
 * @module
 */
import googFxDragListDirection from 'goog/fx/DragListDirection';
import googFxDragListGroup from 'goog/fx/DragListGroup';
import ngeoBase from './index.js';

const exports = function($timeout) {
  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {

      const sortable = /** @type {Array} */
              (scope.$eval(attrs['ngeoSortable'])) || [];
      goog.asserts.assert(Array.isArray(sortable));

      const optionsObject = scope.$eval(attrs['ngeoSortableOptions']);
      const options = getOptions(optionsObject);

      const callbackFn = scope.$eval(attrs['ngeoSortableCallback']);
      const callbackCtx = scope.$eval(attrs['ngeoSortableCallbackCtx']);

      /**
       * @type {goog.fx.DragListGroup}
       */
      let dragListGroup = null;

      scope.$watchCollection(() => sortable, () => {
        sortable.length && $timeout(resetUpDragDrop, 0);
      });

      /**
       * This function resets drag&drop for the list. It is called each
       * time the sortable array changes (see $watchCollection above).
       */
      function resetUpDragDrop() {
        // Save the current nodes in order to restore the state if the node
        // is dropped at the same place
        // In this case the comments and element nodes are messed up
        const savedNodes = element.contents();

        const children = element.children();
        for (let i = 0; i < children.length; ++i) {
          angular.element(children[i]).data('idx', i);
        }

        if (dragListGroup !== null) {
          dragListGroup.dispose();
        }

        dragListGroup = new googFxDragListGroup();
        dragListGroup.addDragList(element[0], googFxDragListDirection.DOWN);
        dragListGroup.setFunctionToGetHandleForDragItem(
          /**
           * @param {Element} dragItem Drag item.
           * @return {Element} The handle.
           */
          (dragItem) => {
            const className = options['handleClassName'];
            return dragItem.getElementsByClassName(className)[0];
          });

        if (options['draggerClassName'] !== undefined) {
          dragListGroup.setDraggerElClass(options['draggerClassName']);
        }

        if (options['currDragItemClassName'] !== undefined) {
          dragListGroup.setCurrDragItemClass(options['currDragItemClassName']);
        }

        /** @type {number} */
        let hoverNextItemIdx = -1;

        /** @type {Element} */
        let hoverList = null;

        goog.events.listen(dragListGroup, 'dragstart', (e) => {
          hoverNextItemIdx = -1;
          hoverList = null;
          /**
           * Adding dynamically the width of the draggerEl to fit the currDragItem width.
           * - > the draggerEl is clipped to the body with an absolute position.
           */
          angular.element(e.draggerEl).css('width', e.currDragItem.offsetWidth);
        });

        goog.events.listen(dragListGroup, 'dragmove', (e) => {
          const next = e.hoverNextItem;
          hoverNextItemIdx = next === null ? -1 : /** @type {number} */ (angular.element(next).data('idx'));
          hoverList = e.hoverList;
        });

        goog.events.listen(dragListGroup, 'dragend', (e) => {
          const li = e.currDragItem;
          const idx = /** @type {number} */ (angular.element(li).data('idx'));
          if (hoverList === null ||
                  hoverNextItemIdx == idx + 1 ||
                  (hoverNextItemIdx == -1 &&
                   idx == element.children().length - 1)) {
            // element dropped out of the list container
            // or
            // element dropped at the same location
            // -> restore initial nodes list
            element.append(savedNodes);
          } else if (hoverNextItemIdx != -1) {
            // there's a next item, so insert
            if (hoverNextItemIdx != idx) {
              if (hoverNextItemIdx > idx) {
                hoverNextItemIdx--;
              }
              scope.$apply(() => {
                sortable.splice(hoverNextItemIdx, 0, sortable.splice(idx, 1)[0]);
              });
            }
          } else {
            // there's no next item, so push
            scope.$apply(() => {
              sortable.push(sortable.splice(idx, 1)[0]);
            });
          }
          // Call the callback function if it exists.
          if (callbackFn instanceof Function) {
            callbackFn.apply(callbackCtx, [element, sortable]);
          }
        });

        dragListGroup.init();
      }

      /**
       * @param {?} options Options after expression evaluation.
       * @return {!ngeox.SortableOptions} Options object.
       * @private
       */
      function getOptions(options) {
        let ret;
        const defaultHandleClassName = 'ngeo-sortable-handle';
        if (options === undefined) {
          ret = {'handleClassName': defaultHandleClassName};
        } else {
          if (options['handleClassName'] === undefined) {
            options['handleClassName'] = defaultHandleClassName;
          }
          ret = /** @type {ngeox.SortableOptions} */ (options);
        }
        return ret;
      }

    }
  };
};

ngeoBase.module.directive('ngeoSortable', exports);
export default exports;