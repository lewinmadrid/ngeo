/**
 * @module
 */
/*
 * FIXME: a file needing splitting into:
 * - a "virtual" angular module root used to automatically register finely included ngeo dependencies;
 * - a JS namespace for constants and types;
 * - a list of requires (for olx, ol3) to please GCC (using hide_warnings_for GCC parameter might help here);
 * - a GCC entry point with requires on all parts of ngeo to produce the dist/ngeo.js file (badly broken).
 *
 * Also consider renaming the file, see https://github.com/google/closure-compiler/issues/2665.
 */

/**
 * @module ngeo
 */
let exports = {};
import olFormatIGC from 'ol/format/IGC';
import olSourceRaster from 'ol/source/Raster';
import olVectorTile from 'ol/VectorTile';
import olOverlay from 'ol/Overlay';
import olControlScaleLine from 'ol/control/ScaleLine';
import olSourceWMTS from 'ol/source/WMTS';
import olStyleIcon from 'ol/style/Icon';
import olLayerVectorTile from 'ol/layer/VectorTile';
import olMap from 'ol/Map';
import olSourceVector from 'ol/source/Vector';
import olRenderFeature from 'ol/render/Feature';
import olSourceVectorTile from 'ol/source/VectorTile';
import olStyleAtlasManager from 'ol/style/AtlasManager';


/** @type {!angular.Module} */
exports.module = angular.module('ngeo', [
  'gettext', 'ui.date', 'floatThead'
  // src/modules/* were added for producing the dist/ngeo.js file, which is badly broken.
  // removing them as they conflict with the "virtual" angular module root "vocation" of this file.
]);


/**
 * The default template base URL for directive partials, used as-is by the template cache.
 * @type {string}
 */
exports.baseTemplateUrl = 'ngeo';

/**
 * The default template base URL for modules, used as-is by the template cache.
 * @type {string}
 */
exports.baseModuleTemplateUrl = 'ngeomodule';


/**
 * @enum {string}
 * @export
 */
exports.AttributeType = {
  /**
   * @type {string}
   */
  BOOLEAN: 'boolean',
  /**
   * @type {string}
   */
  DATE: 'date',
  /**
   * @type {string}
   */
  DATETIME: 'datetime',
  /**
   * @type {string}
   */
  GEOMETRY: 'geometry',
  /**
   * @type {string}
   */
  NUMBER: 'number',
  /**
   * @type {string}
   */
  SELECT: 'select',
  /**
   * @type {string}
   */
  TEXT: 'text'
};


/**
 * @enum {string}
 * @export
 */
exports.FeatureProperties = {
  /**
   * @type {string}
   * @export
   */
  ANGLE: 'a',
  /**
   * @type {string}
   * @export
   */
  COLOR: 'c',
  /**
   * @type {string}
   * @export
   */
  IS_CIRCLE: 'l',
  /**
   * @type {string}
   * @export
   */
  IS_RECTANGLE: 'r',
  /**
   * @type {string}
   * @export
   */
  IS_TEXT: 't',
  /**
   * @type {string}
   * @export
   */
  NAME: 'n',
  /**
   * @type {string}
   * @export
   */
  OPACITY: 'o',
  /**
   * @type {number}
   * @export
   */
  AZIMUT: 'z',
  /**
   * @type {string}
   * @export
   */
  SHOW_MEASURE: 'm',
  /**
   * @type {string}
   * @export
   */
  SIZE: 's',
  /**
   * @type {string}
   * @export
   */
  STROKE: 'k'
};


/**
 * @enum {string}
 * @export
 */
exports.FilterCondition = {
  /**
   * @type {string}
   * @export
   */
  AND: '&&',
  /**
   * @type {string}
   * @export
   */
  NOT: '!',
  /**
   * @type {string}
   * @export
   */
  OR: '||'
};


/**
 * @enum {string}
 * @export
 */
exports.GeometryType = {
  /**
   * @type {string}
   * @export
   */
  CIRCLE: 'Circle',
  /**
   * @type {string}
   * @export
   */
  LINE_STRING: 'LineString',
  /**
   * @type {string}
   * @export
   */
  MULTI_LINE_STRING: 'MultiLineString',
  /**
   * @type {string}
   * @export
   */
  MULTI_POINT: 'MultiPoint',
  /**
   * @type {string}
   * @export
   */
  MULTI_POLYGON: 'MultiPolygon',
  /**
   * @type {string}
   * @export
   */
  POINT: 'Point',
  /**
   * @type {string}
   * @export
   */
  POLYGON: 'Polygon',
  /**
   * @type {string}
   * @export
   */
  RECTANGLE: 'Rectangle',
  /**
   * @type {string}
   * @export
   */
  TEXT: 'Text'
};


/**
 * @enum {string}
 * @export
 */
exports.NumberType = {
  /**
   * @type {string}
   * @export
   */
  FLOAT: 'float',
  /**
   * @type {string}
   * @export
   */
  INTEGER: 'integer'
};
export default exports;