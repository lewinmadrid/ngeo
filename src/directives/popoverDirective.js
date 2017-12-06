/**
 * @module
 */
import ngeoBase from './index.js';

const exports = function() {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoPopoverController as popoverCtrl',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.anchorElm.on('hidden.bs.popover', () => {
        /**
         * @type {{inState : Object}}
         */
        const popover = ngeoPopoverCtrl.anchorElm.data('bs.popover');
        popover['inState'].click = false;
      });

      ngeoPopoverCtrl.anchorElm.on('inserted.bs.popover', () => {
        ngeoPopoverCtrl.bodyElm.show();
        ngeoPopoverCtrl.shown = true;
      });

      ngeoPopoverCtrl.anchorElm.popover({
        container: 'body',
        html: true,
        content: ngeoPopoverCtrl.bodyElm,
        placement: attrs['ngeoPopoverPlacement'] || 'right'
      });

      if (attrs['ngeoPopoverDismiss']) {
        $(attrs['ngeoPopoverDismiss']).on('scroll', () => {
          ngeoPopoverCtrl.dismissPopover();
        });
      }

      scope.$on('$destroy', () => {
        ngeoPopoverCtrl.anchorElm.popover('destroy');
        ngeoPopoverCtrl.anchorElm.unbind('inserted.bs.popover');
        ngeoPopoverCtrl.anchorElm.unbind('hidden.bs.popover');
      });
    }
  };
};

/**
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopoverAnchor
 * @return {angular.Directive} The Directive Definition Object
 */
ngeoBase.popoverAnchorDirective = function() {
  return {
    restrict: 'A',
    require: '^^ngeoPopover',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.anchorElm = elem;
    }
  };
};

/**
 * @ngdoc directive
 * @ngInject
 * @ngname ngeoPopoverContent
 * @return {angular.Directive} The Directive Definition Object
 */
ngeoBase.popoverContentDirective = function() {
  return {
    restrict: 'A',
    require: '^^ngeoPopover',
    link: (scope, elem, attrs, ngeoPopoverCtrl) => {
      ngeoPopoverCtrl.bodyElm = elem;
      elem.hide();
    }
  };
};

/**
 * The controller for the 'popover' directive.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoPopoverController
 * @param {angular.Scope} $scope Scope.
 */
ngeoBase.PopoverController = function($scope) {
  /**
   * The state of the popover (displayed or not)
   * @type {boolean}
   * @export
   */
  this.shown = false;

  /**
   * @type {angular.JQLite|undefined}
   * @export
   */
  this.anchorElm = undefined;

  /**
   * @type {angular.JQLite|undefined}
   * @export
   */
  this.bodyElm = undefined;

  function onMouseDown(clickEvent) {
    if (this.anchorElm[0] !== clickEvent.target &&
      this.bodyElm.parent()[0] !== clickEvent.target &
      this.bodyElm.parent().find(clickEvent.target).length === 0 && this.shown) {
      this.dismissPopover();
    }
  }

  angular.element('body').on('mousedown', onMouseDown.bind(this));

  $scope.$on('$destroy', () => {
    angular.element('body').off('mousedown', onMouseDown);
  });
};


/**
 * Dissmiss popover function
 * @export
 */
ngeoBase.PopoverController.prototype.dismissPopover = function() {
  this.shown = false;
  this.anchorElm.popover('hide');
};

ngeoBase.module.controller('NgeoPopoverController', ngeoBase.PopoverController);
ngeoBase.module.directive('ngeoPopover', exports);
ngeoBase.module.directive('ngeoPopoverAnchor', ngeoBase.popoverAnchorDirective);
ngeoBase.module.directive('ngeoPopoverContent', ngeoBase.popoverContentDirective);
export default exports;