goog.module('ngeo.jstsExports');

const olGeomGeometry = goog.require('ol.geom.Geometry');
const olGeomGeometryCollection = goog.require('ol.geom.GeometryCollection');
const olGeomLineString = goog.require('ol.geom.LineString');
const olGeomLinearRing = goog.require('ol.geom.LinearRing');
const olGeomMultiLineString = goog.require('ol.geom.MultiLineString');
const olGeomMultiPoint = goog.require('ol.geom.MultiPoint');
const olGeomMultiPolygon = goog.require('ol.geom.MultiPolygon');
const olGeomPoint = goog.require('ol.geom.Point');
const olGeomPolygon = goog.require('ol.geom.Polygon');


goog.exportSymbol(
  'ol.geom.Geometry',
  olGeomGeometry);

goog.exportSymbol(
  'ol.geom.GeometryCollection',
  olGeomGeometryCollection);

goog.exportProperty(
  olGeomGeometryCollection.prototype,
  'getGeometries',
  olGeomGeometryCollection.prototype.getGeometries);

goog.exportSymbol(
  'ol.geom.LineString',
  olGeomLineString);

goog.exportProperty(
  olGeomLineString.prototype,
  'getCoordinates',
  olGeomLineString.prototype.getCoordinates);

goog.exportSymbol(
  'ol.geom.LinearRing',
  olGeomLinearRing);

goog.exportProperty(
  olGeomLinearRing.prototype,
  'getCoordinates',
  olGeomLinearRing.prototype.getCoordinates);

goog.exportSymbol(
  'ol.geom.MultiLineString',
  olGeomMultiLineString);

goog.exportProperty(
  olGeomMultiLineString.prototype,
  'getCoordinates',
  olGeomMultiLineString.prototype.getCoordinates);

goog.exportProperty(
  olGeomMultiLineString.prototype,
  'getLineStrings',
  olGeomMultiLineString.prototype.getLineStrings);

goog.exportSymbol(
  'ol.geom.MultiPoint',
  olGeomMultiPoint);

goog.exportProperty(
  olGeomMultiPoint.prototype,
  'getCoordinates',
  olGeomMultiPoint.prototype.getCoordinates);

goog.exportProperty(
  olGeomMultiPoint.prototype,
  'getPoints',
  olGeomMultiPoint.prototype.getPoints);

goog.exportSymbol(
  'ol.geom.MultiPolygon',
  olGeomMultiPolygon);

goog.exportProperty(
  olGeomMultiPolygon.prototype,
  'getCoordinates',
  olGeomMultiPolygon.prototype.getCoordinates);

goog.exportProperty(
  olGeomMultiPolygon.prototype,
  'getPolygons',
  olGeomMultiPolygon.prototype.getPolygons);

goog.exportSymbol(
  'ol.geom.Point',
  olGeomPoint);

goog.exportProperty(
  olGeomPoint.prototype,
  'getCoordinates',
  olGeomPoint.prototype.getCoordinates);

goog.exportSymbol(
  'ol.geom.Polygon',
  olGeomPolygon);

goog.exportProperty(
  olGeomPolygon.prototype,
  'getLinearRings',
  olGeomPolygon.prototype.getLinearRings);

goog.exportProperty(
  olGeomPolygon.prototype,
  'getCoordinates',
  olGeomPolygon.prototype.getCoordinates);
