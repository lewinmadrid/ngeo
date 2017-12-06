/**
 * @module
 */
import googAsserts from 'goog/asserts';
import ngeoBase from './index.js';
import ngeoLocation from './Location.js';


ngeoBase.module.value('ngeoUsedKeyRegexp', [new RegExp('.*')]);


const exports = function(ngeoLocation, ngeoUsedKeyRegexp) {

  /**
   * Object representing the application's initial state.
   * @type {!Object.<string, string>}
   */
  this.initialState = {};

  /**
   * @type {!ngeo.Location}
   */
  this.ngeoLocation = ngeoLocation;


  /**
   * @type {!Array.<!RegExp>}
   */
  this.usedKeyRegexp = ngeoUsedKeyRegexp;

  /**
   * @type {boolean}
   */
  this.useLocalStorage = false;

  try {
    if ('localStorage' in window) {
      window.localStorage['test'] = '';
      delete window.localStorage['test'];
    } else {
      this.useLocalStorage = false;
    }
  } catch (err) {
    console.error(err);
    this.useLocalStorage = false;
  }

  // Populate initialState with the application's initial state. The initial
  // state is read from the location URL, or from the local storage if there
  // is no state in the location URL.

  const paramKeys = ngeoLocation.getParamKeys().filter(key => key != 'debug' && key != 'no_redirect');

  if (paramKeys.length === 0) {
    if (this.useLocalStorage) {
      for (const key in window.localStorage) {
        googAsserts.assert(key);

        this.usedKeyRegexp.some((keyRegexp) => {
          if (key.match(keyRegexp)) {
            const value = window.localStorage[key];
            if (value !== undefined || value !== null) {
              this.initialState[key] = value;
            } else {
              this.initialState[key] = '';
            }
            return true;
          }
        });
      }
    }
  } else {
    paramKeys.forEach((key) => {
      this.usedKeyRegexp.some((keyRegexp) => {
        if (key.match(keyRegexp)) {
          const value = this.ngeoLocation.getParam(key);
          if (value !== undefined) {
            this.initialState[key] = value;
            return true;
          }
        }
      });
    });
  }
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {string|undefined} State value.
 */
exports.prototype.getInitialValue = function(key) {
  return this.initialState[key];
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {string|undefined} State value.
 */
exports.prototype.getInitialStringValue = function(key) {
  const value = this.initialState[key];
  if (value === undefined) {
    return undefined;
  }
  return value;
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {number|undefined} State value.
 */
exports.prototype.getInitialNumberValue = function(key) {
  const value = this.initialState[key];
  if (value === undefined) {
    return undefined;
  }
  return parseFloat(value);
};


/**
 * Get the state value for `key`.
 * @param {string} key State key.
 * @return {boolean|undefined} State value.
 */
exports.prototype.getInitialBooleanValue = function(key) {
  const value = this.initialState[key];
  if (value === undefined) {
    return undefined;
  }
  return value === 'true';
};


/**
 * Update the application state with the values in `object`.
 * @param {!Object.<string, string>} object Object.
 */
exports.prototype.updateState = function(object) {
  this.ngeoLocation.updateParams(object);
  if (this.useLocalStorage) {
    for (const key in object) {
      googAsserts.assert(key);
      const value = object[key];
      googAsserts.assert(value !== undefined);
      window.localStorage[key] = value;
    }
  }
};


/**
 * Delete a parameter
 * @param {string} key Key.
 */
exports.prototype.deleteParam = function(key) {
  this.ngeoLocation.deleteParam(key);
  if (this.useLocalStorage) {
    delete window.localStorage[key];
  }
};

ngeoBase.module.service('ngeoStateManager', exports);
export default exports;