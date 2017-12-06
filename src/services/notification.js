goog.module('ngeo.Notification');

const googAsserts = goog.require('goog.asserts');
const ngeoBase = goog.require('ngeo');
const ngeoMessage = goog.require('ngeo.Message');


/**
 * Provides methods to display any sort of messages, notifications, errors,
 * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
 * properly.
 *
 * @constructor
 * @struct
 * @extends {ngeo.Message}
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @ngdoc service
 * @ngname ngeoNotification
 * @abstract
 * @ngInject
 */
exports = function($timeout) {

  ngeoMessage.call(this);

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  const container = angular.element('<div class="ngeo-notification"></div>');
  angular.element(document.body).append(container);

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.container_ = container;

  /**
   * @type {Object.<number, ngeo.Notification.CacheItem>}
   * @private
   */
  this.cache_ = {};

};
ol.inherits(exports, ngeoMessage);


/**
 * Default delay (in milliseconds) a message should be displayed.
 * @type {number}
 * @private
 */
exports.DEFAULT_DELAY_ = 7000;


// MAIN API METHODS


/**
 * Display the given message string or object or list of message strings or
 * objects.
 * @param {string|Array.<string>|ngeox.Message|Array.<ngeox.Message>}
 *     object A message or list of messages as text or configuration objects.
 * @export
 */
exports.prototype.notify = function(object) {
  this.show(object);
};


/**
 * Clears all messages that are currently being shown.
 * @export
 */
exports.prototype.clear = function() {
  for (const uid in this.cache_) {
    this.clearMessageByCacheItem_(this.cache_[parseInt(uid, 10)]);
  }
};


/**
 * @override
 */
exports.prototype.showMessage = function(message) {
  const type = message.type;
  googAsserts.assertString(type, 'Type should be set.');

  const classNames = ['alert', 'fade'];
  switch (type) {
    case ngeoBase.MessageType.ERROR:
      classNames.push('alert-danger');
      break;
    case ngeoBase.MessageType.INFORMATION:
      classNames.push('alert-info');
      break;
    case ngeoBase.MessageType.SUCCESS:
      classNames.push('alert-success');
      break;
    case ngeoBase.MessageType.WARNING:
      classNames.push('alert-warning');
      break;
    default:
      break;
  }

  const el = angular.element(`<div class="${classNames.join(' ')}"></div>`);
  let container;

  if (message.target) {
    container = angular.element(message.target);
  } else {
    container = this.container_;
  }

  container.append(el);
  el.html(message.msg).addClass('in');

  const delay = message.delay !== undefined ? message.delay :
    exports.DEFAULT_DELAY_;

  const item = /** @type {ngeo.Notification.CacheItem} */ ({
    el
  });

  // Keep a reference to the promise, in case we want to manually cancel it
  // before the delay
  const uid = ol.getUid(el);
  item.promise = this.timeout_(() => {
    el.alert('close');
    delete this.cache_[uid];
  }, delay);

  this.cache_[uid] = item;
};


/**
 * Clear a message using its cache item.
 * @param {ngeo.Notification.CacheItem} item Cache item.
 * @private
 */
exports.prototype.clearMessageByCacheItem_ = function(item) {
  const el = item.el;
  const promise = item.promise;
  const uid = ol.getUid(el);

  // Close the message
  el.alert('close');

  // Cancel timeout in case we want to stop before delay. If called by the
  // timeout itself, then this has no consequence.
  this.timeout_.cancel(promise);

  // Delete the cache item
  delete this.cache_[uid];
};


/**
 * @typedef {{
 *     el: angular.JQLite,
 *     promise: angular.$q.Promise
 * }}
 */
exports.CacheItem;


ngeoBase.module.service('ngeoNotification', exports);
