goog.module('ngeo.geom');

const ngeoCoordinate = goog.require('ngeo.coordinate');
const olGeomLineString = goog.require('ol.geom.LineString');
const olGeomMultiLineString = goog.require('ol.geom.MultiLineString');
const olGeomMultiPoint = goog.require('ol.geom.MultiPoint');
const olGeomMultiPolygon = goog.require('ol.geom.MultiPolygon');
const olGeomPoint = goog.require('ol.geom.Point');
const olGeomPolygon = goog.require('ol.geom.Polygon');
const olGeomSimpleGeometry = goog.require('ol.geom.SimpleGeometry');


/**
 * Determines whether a given geometry is empty or not. A null or undefined
 * value can be given for convenience, i.e. when using methods than can
 * return a geometry or not, for example:
 * `ngeo.geom.isEmpty(feature.getGeometry())`.
 *
 * @param {?ol.geom.Geometry|undefined} geom Geometry.
 * @return {boolean} Whether the given geometry is empty or not. A null or
 *     undefined geometry is considered empty.
 */
exports.isEmpty = function(geom) {
  let isEmpty = true;
  if (geom && geom instanceof olGeomSimpleGeometry) {
    isEmpty = geom.getFlatCoordinates().length === 0;
  }
  return isEmpty;
};


/**
 * Convert all coordinates within a geometry object to XY, i.e. remove any
 * extra dimension other than X and Y to the coordinates of a geometry.
 *
 * @param {ol.geom.Geometry} geom Geometry
 */
exports.toXY = function(geom) {
  if (geom instanceof olGeomPoint) {
    geom.setCoordinates(
      ngeoCoordinate.toXY(geom.getCoordinates(), 0)
    );
  } else if (geom instanceof olGeomMultiPoint ||
             geom instanceof olGeomLineString
  ) {
    geom.setCoordinates(
      ngeoCoordinate.toXY(geom.getCoordinates(), 1)
    );
  } else if (geom instanceof olGeomMultiLineString ||
             geom instanceof olGeomPolygon
  ) {
    geom.setCoordinates(
      ngeoCoordinate.toXY(geom.getCoordinates(), 2)
    );
  } else if (geom instanceof olGeomMultiPolygon) {
    geom.setCoordinates(
      ngeoCoordinate.toXY(geom.getCoordinates(), 3)
    );
  } else {
    throw 'ngeo.geom.toXY - unsupported geometry type';
  }
};
