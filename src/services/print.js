/**
 * @module
 */
import ngeoBase from './index.js';
import ngeoLayerHelper from './LayerHelper.js';
import ngeoUtils from './utils.js';
import olColor from 'ol/color';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import olGeomGeometryType from 'ol/geom/GeometryType';
import olLayerImage from 'ol/layer/Image';
import olLayerTile from 'ol/layer/Tile';
import olLayerVector from 'ol/layer/Vector';
import olMath from 'ol/math';
import olSize from 'ol/size';
import olSourceImageWMS from 'ol/source/ImageWMS';
import olSourceTileWMS from 'ol/source/TileWMS';
import olSourceVector from 'ol/source/Vector';
import olSourceWMTS from 'ol/source/WMTS';
import olStyleCircle from 'ol/style/Circle';
import olStyleFill from 'ol/style/Fill';
import olStyleImage from 'ol/style/Image';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';
import olStyleText from 'ol/style/Text';
import olStyleRegularShape from 'ol/style/RegularShape';
import olTilegridWMTS from 'ol/tilegrid/WMTS';


/**
 * @typedef {function(string):!ngeo.Print}
 */
ngeoBase.CreatePrint;


/**
 * @enum {string}
 */
ngeoBase.PrintStyleType = {
  LINE_STRING: 'LineString',
  POINT: 'Point',
  POLYGON: 'Polygon'
};


/**
 * @type {Object.<ol.geom.GeometryType, ngeo.PrintStyleType>}
 * @private
 */
ngeoBase.PrintStyleTypes_ = {
  'LineString': ngeoBase.PrintStyleType.LINE_STRING,
  'Point': ngeoBase.PrintStyleType.POINT,
  'Polygon': ngeoBase.PrintStyleType.POLYGON,
  'MultiLineString': ngeoBase.PrintStyleType.LINE_STRING,
  'MultiPoint': ngeoBase.PrintStyleType.POINT,
  'MultiPolygon': ngeoBase.PrintStyleType.POLYGON
};

const exports = function(url, $http, ngeoLayerHelper) {
  /**
   * @type {string}
   * @private
   */
  this.url_ = url;

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;
};


/**
 * @const
 * @private
 */
exports.FEAT_STYLE_PROP_PREFIX_ = '_ngeo_style_';


/**
 * Cancel a report.
 * @param {string} ref Print report reference.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 * @export
 */
exports.prototype.cancel = function(ref, opt_httpConfig) {
  const httpConfig = opt_httpConfig !== undefined ? opt_httpConfig :
    /** @type {angular.$http.Config} */ ({});
  const url = `${this.url_}/cancel/${ref}`;
  // "delete" is a reserved word, so use ['delete']
  return this.$http_['delete'](url, httpConfig);
};


/**
 * Create a report specification.
 * @param {ol.Map} map Map.
 * @param {number} scale Scale.
 * @param {number} dpi DPI.
 * @param {string} layout Layout.
 * @param {string} format Formats.
 * @param {Object.<string, *>} customAttributes Custom attributes.
 * @return {MapFishPrintSpec} The print spec.
 * @export
 */
exports.prototype.createSpec = function(
  map, scale, dpi, layout, format, customAttributes) {

  const specMap = /** @type {MapFishPrintMap} */ ({
    dpi: dpi,
    rotation: /** number */ (customAttributes['rotation'])
  });

  this.encodeMap_(map, scale, specMap);

  const attributes = /** @type {!MapFishPrintAttributes} */ ({
    map: specMap
  });
  ol.obj.assign(attributes, customAttributes);

  const spec = /** @type {MapFishPrintSpec} */ ({
    attributes,
    format,
    layout
  });

  return spec;
};


/**
 * @param {ol.Map} map Map.
 * @param {number} scale Scale.
 * @param {MapFishPrintMap} object Object.
 * @private
 */
exports.prototype.encodeMap_ = function(map, scale, object) {
  const view = map.getView();
  const viewCenter = view.getCenter();
  const viewProjection = view.getProjection();
  const viewResolution = view.getResolution();
  const viewRotation = object.rotation || olMath.toDegrees(view.getRotation());

  goog.asserts.assert(viewCenter !== undefined);
  goog.asserts.assert(viewProjection !== undefined);

  object.center = viewCenter;
  object.projection = viewProjection.getCode();
  object.rotation = viewRotation;
  object.scale = scale;
  object.layers = [];

  const mapLayerGroup = map.getLayerGroup();
  goog.asserts.assert(mapLayerGroup !== null);
  let layers = this.ngeoLayerHelper_.getFlatLayers(mapLayerGroup);
  layers = layers.slice().reverse();

  layers.forEach((layer) => {
    if (layer.getVisible()) {
      goog.asserts.assert(viewResolution !== undefined);
      this.encodeLayer(object.layers, layer, viewResolution);
    }
  });
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Base} layer Layer.
 * @param {number} resolution Resolution.
 */
exports.prototype.encodeLayer = function(arr, layer, resolution) {
  if (layer instanceof olLayerImage) {
    this.encodeImageLayer_(arr, layer);
  } else if (layer instanceof olLayerTile) {
    this.encodeTileLayer_(arr, layer);
  } else if (layer instanceof olLayerVector) {
    this.encodeVectorLayer_(arr, layer, resolution);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer Layer.
 * @private
 */
exports.prototype.encodeImageLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, olLayerImage);
  const source = layer.getSource();
  if (source instanceof olSourceImageWMS) {
    this.encodeImageWmsLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Image} layer Layer.
 * @private
 */
exports.prototype.encodeImageWmsLayer_ = function(arr, layer) {
  const source = layer.getSource();

  goog.asserts.assertInstanceof(layer, olLayerImage);
  goog.asserts.assertInstanceof(source, olSourceImageWMS);

  const url = source.getUrl();
  if (url !== undefined) {
    this.encodeWmsLayer_(
      arr, layer.getOpacity(), url, source.getParams());
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {number} opacity Opacity of the layer.
 * @param {string} url Url of the WMS server.
 * @param {Object} params Url parameters
 * @private
 */
exports.prototype.encodeWmsLayer_ = function(arr, opacity, url, params) {
  if (url.startsWith('//')) {
    url = window.location.protocol  + url;
  }
  const url_url = new URL(url);
  const customParams = {'TRANSPARENT': true};
  if (url_url.searchParams) {
    for (const element of url_url.searchParams) {
      customParams[element[0]] = element[1];
    }
  }
  for (const key in params) {
    const value = params[key];
    // remove empty params
    if (value !== null && value !== undefined) {
      customParams[key] = value;
    }
  }
  delete customParams['LAYERS'];
  delete customParams['FORMAT'];
  delete customParams['SERVERTYPE'];
  delete customParams['VERSION'];

  const object = /** @type {MapFishPrintWmsLayer} */ ({
    baseURL: exports.getAbsoluteUrl_(url_url.origin + url_url.pathname),
    imageFormat: 'FORMAT' in params ? params['FORMAT'] : 'image/png',
    layers: params['LAYERS'].split(','),
    customParams: customParams,
    serverType: params['SERVERTYPE'],
    type: 'wms',
    opacity: opacity,
    version: params['VERSION']
  });
  arr.push(object);
};


/**
 * @param {string} url URL.
 * @return {string} Absolute URL.
 * @private
 */
exports.getAbsoluteUrl_ = function(url) {
  const a = document.createElement('a');
  a.href = encodeURI(url);
  return decodeURI(a.href);
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
exports.prototype.encodeTileLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, olLayerTile);
  const source = layer.getSource();
  if (source instanceof olSourceWMTS) {
    this.encodeTileWmtsLayer_(arr, layer);
  } else if (source instanceof olSourceTileWMS) {
    this.encodeTileWmsLayer_(arr, layer);
  }
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
exports.prototype.encodeTileWmtsLayer_ = function(arr, layer) {
  goog.asserts.assertInstanceof(layer, olLayerTile);
  const source = layer.getSource();
  goog.asserts.assertInstanceof(source, olSourceWMTS);

  const projection = source.getProjection();
  const tileGrid = source.getTileGrid();
  goog.asserts.assertInstanceof(tileGrid, olTilegridWMTS);
  const matrixIds = tileGrid.getMatrixIds();

  /** @type {Array.<MapFishPrintWmtsMatrix>} */
  const matrices = [];

  for (let i = 0, ii = matrixIds.length; i < ii; ++i) {
    const tileRange = tileGrid.getFullTileRange(i);
    matrices.push(/** @type {MapFishPrintWmtsMatrix} */ ({
      identifier: matrixIds[i],
      scaleDenominator: tileGrid.getResolution(i) *
          projection.getMetersPerUnit() / 0.28E-3,
      tileSize: olSize.toSize(tileGrid.getTileSize(i)),
      topLeftCorner: tileGrid.getOrigin(i),
      matrixSize: [
        tileRange.maxX - tileRange.minX,
        tileRange.maxY - tileRange.minY
      ]
    }));
  }

  const dimensions = source.getDimensions();
  const dimensionKeys = Object.keys(dimensions);

  const object = /** @type {MapFishPrintWmtsLayer} */ ({
    baseURL: this.getWmtsUrl_(source),
    dimensions: dimensionKeys,
    dimensionParams: dimensions,
    imageFormat: source.getFormat(),
    layer: source.getLayer(),
    matrices: matrices,
    matrixSet: source.getMatrixSet(),
    opacity: layer.getOpacity(),
    requestEncoding: source.getRequestEncoding(),
    style: source.getStyle(),
    type: 'WMTS',
    version: source.getVersion()
  });

  arr.push(object);
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Tile} layer Layer.
 * @private
 */
exports.prototype.encodeTileWmsLayer_ = function(arr, layer) {
  const source = layer.getSource();

  goog.asserts.assertInstanceof(layer, olLayerTile);
  goog.asserts.assertInstanceof(source, olSourceTileWMS);

  this.encodeWmsLayer_(
    arr, layer.getOpacity(), source.getUrls()[0], source.getParams());
};


/**
 * @param {Array.<MapFishPrintLayer>} arr Array.
 * @param {ol.layer.Vector} layer Layer.
 * @param {number} resolution Resolution.
 * @private
 */
exports.prototype.encodeVectorLayer_ = function(arr, layer, resolution) {
  const source = layer.getSource();
  goog.asserts.assertInstanceof(source, olSourceVector);

  const features = source.getFeatures();

  const geojsonFormat = new olFormatGeoJSON();

  const /** @type {Array.<GeoJSONFeature>} */ geojsonFeatures = [];
  const mapfishStyleObject = /** @type {MapFishPrintVectorStyle} */ ({
    version: 2
  });

  for (let i = 0, ii = features.length; i < ii; ++i) {
    const originalFeature = features[i];

    let styleData = null;
    let styleFunction = originalFeature.getStyleFunction();
    if (styleFunction !== undefined) {
      styleData = styleFunction.call(originalFeature, resolution);
    } else {
      styleFunction = layer.getStyleFunction();
      if (styleFunction !== undefined) {
        styleData = styleFunction.call(layer, originalFeature, resolution);
      }
    }
    const origGeojsonFeature = geojsonFormat.writeFeatureObject(originalFeature);
    /**
     * @type {Array<ol.style.Style>}
     */
    const styles = (styleData !== null && !Array.isArray(styleData)) ?
      [styleData] : styleData;
    goog.asserts.assert(Array.isArray(styles));

    if (styles !== null && styles.length > 0) {
      let isOriginalFeatureAdded = false;
      for (let j = 0, jj = styles.length; j < jj; ++j) {
        const style = styles[j];
        const styleId = ol.getUid(style).toString();
        let geometry = style.getGeometry();
        let geojsonFeature;
        if (!geometry) {
          geojsonFeature = origGeojsonFeature;
          geometry = originalFeature.getGeometry();
          // no need to encode features with no geometry
          if (!geometry) {
            continue;
          }
          if (!isOriginalFeatureAdded) {
            geojsonFeatures.push(geojsonFeature);
            isOriginalFeatureAdded = true;
          }
        } else {
          let styledFeature = originalFeature.clone();
          styledFeature.setGeometry(geometry);
          geojsonFeature = geojsonFormat.writeFeatureObject(styledFeature);
          geometry = styledFeature.getGeometry();
          styledFeature = null;
          geojsonFeatures.push(geojsonFeature);
        }

        const geometryType = geometry.getType();
        if (geojsonFeature.properties === null) {
          geojsonFeature.properties = {};
        }

        const featureStyleProp = exports.FEAT_STYLE_PROP_PREFIX_ + j;
        this.encodeVectorStyle_(
          mapfishStyleObject, geometryType, style, styleId, featureStyleProp);
        geojsonFeature.properties[featureStyleProp] = styleId;
      }
    }
  }

  // MapFish Print fails if there are no style rules, even if there are no
  // features either. To work around this we just ignore the layer if the
  // array of GeoJSON features is empty.
  // See https://github.com/mapfish/mapfish-print/issues/279

  if (geojsonFeatures.length > 0) {
    const geojsonFeatureCollection = /** @type {GeoJSONFeatureCollection} */ ({
      type: 'FeatureCollection',
      features: geojsonFeatures
    });
    const object = /** @type {MapFishPrintVectorLayer} */ ({
      geoJson: geojsonFeatureCollection,
      opacity: layer.getOpacity(),
      style: mapfishStyleObject,
      type: 'geojson'
    });
    arr.push(object);
  }
};


/**
 * @param {MapFishPrintVectorStyle} object MapFish style object.
 * @param {ol.geom.GeometryType} geometryType Type of the GeoJSON geometry
 * @param {ol.style.Style} style Style.
 * @param {string} styleId Style id.
 * @param {string} featureStyleProp Feature style property name.
 * @private
 */
exports.prototype.encodeVectorStyle_ = function(object, geometryType, style, styleId, featureStyleProp) {
  if (!(geometryType in ngeoBase.PrintStyleTypes_)) {
    // unsupported geometry type
    return;
  }
  const styleType = ngeoBase.PrintStyleTypes_[geometryType];
  const key = `[${featureStyleProp} = '${styleId}']`;
  if (key in object) {
    // do nothing if we already have a style object for this CQL rule
    return;
  }
  const styleObject = /** @type {MapFishPrintSymbolizers} */ ({
    symbolizers: []
  });
  object[key] = styleObject;
  const fillStyle = style.getFill();
  const imageStyle = style.getImage();
  const strokeStyle = style.getStroke();
  const textStyle = style.getText();
  if (styleType == ngeoBase.PrintStyleType.POLYGON) {
    if (fillStyle !== null) {
      this.encodeVectorStylePolygon_(
        styleObject.symbolizers, fillStyle, strokeStyle);
    }
  } else if (styleType == ngeoBase.PrintStyleType.LINE_STRING) {
    if (strokeStyle !== null) {
      this.encodeVectorStyleLine_(styleObject.symbolizers, strokeStyle);
    }
  } else if (styleType == ngeoBase.PrintStyleType.POINT) {
    if (imageStyle !== null) {
      this.encodeVectorStylePoint_(styleObject.symbolizers, imageStyle);
    }
  }
  if (textStyle !== null) {
    this.encodeTextStyle_(styleObject.symbolizers, textStyle);
  }
};


/**
 * @param {MapFishPrintSymbolizerPoint|MapFishPrintSymbolizerPolygon} symbolizer MapFish Print symbolizer.
 * @param {!ol.style.Fill} fillStyle Fill style.
 * @private
 */
exports.prototype.encodeVectorStyleFill_ = function(symbolizer, fillStyle) {
  let fillColor = fillStyle.getColor();
  if (fillColor !== null) {
    goog.asserts.assert(typeof fillColor === 'string' || Array.isArray(fillColor));
    fillColor = olColor.asArray(fillColor);
    goog.asserts.assert(Array.isArray(fillColor), 'only supporting fill colors');
    symbolizer.fillColor = ngeoUtils.rgbArrayToHex(fillColor);
    symbolizer.fillOpacity = fillColor[3];
  }
};


/**
 * @param {Array.<MapFishPrintSymbolizer>} symbolizers Array of MapFish Print
 *     symbolizers.
 * @param {!ol.style.Stroke} strokeStyle Stroke style.
 * @private
 */
exports.prototype.encodeVectorStyleLine_ = function(symbolizers, strokeStyle) {
  const symbolizer = /** @type {MapFishPrintSymbolizerLine} */ ({
    type: 'line'
  });
  this.encodeVectorStyleStroke_(symbolizer, strokeStyle);
  symbolizers.push(symbolizer);
};


/**
 * @param {Array.<MapFishPrintSymbolizer>} symbolizers Array of MapFish Print
 *     symbolizers.
 * @param {!ol.style.Image} imageStyle Image style.
 * @private
 */
exports.prototype.encodeVectorStylePoint_ = function(symbolizers, imageStyle) {
  let symbolizer;
  if (imageStyle instanceof olStyleCircle) {
    symbolizer = /** @type {MapFishPrintSymbolizerPoint} */ ({
      type: 'point'
    });
    symbolizer.pointRadius = imageStyle.getRadius();
    const fillStyle = imageStyle.getFill();
    if (fillStyle !== null) {
      this.encodeVectorStyleFill_(symbolizer, fillStyle);
    }
    const strokeStyle = imageStyle.getStroke();
    if (strokeStyle !== null) {
      this.encodeVectorStyleStroke_(symbolizer, strokeStyle);
    }
  } else if (imageStyle instanceof ol.style.Icon) {
    const src = imageStyle.getSrc();
    if (src !== undefined) {
      symbolizer = /** @type {MapFishPrintSymbolizerPoint} */ ({
        type: 'point',
        externalGraphic: src
      });
      const opacity = imageStyle.getOpacity();
      if (opacity !== null) {
        symbolizer.graphicOpacity = opacity;
      }
      const size = imageStyle.getSize();
      if (size !== null) {
        let scale = imageStyle.getScale();
        if (isNaN(scale)) {
          scale = 1;
        }
        symbolizer.graphicWidth = size[0] * scale;
        symbolizer.graphicHeight = size[1] * scale;
      }
      let rotation = imageStyle.getRotation();
      if (isNaN(rotation)) {
        rotation = 0;
      }
      symbolizer.rotation = olMath.toDegrees(rotation);
    }
  } else if (imageStyle instanceof olStyleRegularShape) {
    /**
     * Mapfish Print does not support image defined with ol.style.RegularShape.
     * As a workaround, I try to map the image on a well-known image name.
     */
    const points = /** @type {ol.style.RegularShape} */ (imageStyle).getPoints();
    if (points !== null) {
      symbolizer = /** @type {MapFishPrintSymbolizerPoint} */ ({
        type: 'point'
      });
      if (points === 4) {
        symbolizer.graphicName = 'square';
      } else if (points === 3) {
        symbolizer.graphicName = 'triangle';
      } else if (points === 5) {
        symbolizer.graphicName = 'star';
      } else if (points === 8) {
        symbolizer.graphicName = 'cross';
      }
      const sizeShape = imageStyle.getSize();
      if (sizeShape !== null) {
        symbolizer.graphicWidth = sizeShape[0];
        symbolizer.graphicHeight = sizeShape[1];
      }
      const rotationShape = imageStyle.getRotation();
      if (!isNaN(rotationShape) && rotationShape !== 0) {
        symbolizer.rotation = olMath.toDegrees(rotationShape);
      }
      const opacityShape = imageStyle.getOpacity();
      if (opacityShape !== null) {
        symbolizer.graphicOpacity = opacityShape;
      }
      const strokeShape = imageStyle.getStroke();
      if (strokeShape !== null) {
        this.encodeVectorStyleStroke_(symbolizer, strokeShape);
      }
      const fillShape = imageStyle.getFill();
      if (fillShape !== null) {
        this.encodeVectorStyleFill_(symbolizer, fillShape);
      }
    }
  }
  if (symbolizer !== undefined) {
    symbolizers.push(symbolizer);
  }
};


/**
 * @param {Array.<MapFishPrintSymbolizer>} symbolizers Array of MapFish Print
 *     symbolizers.
 * @param {!ol.style.Fill} fillStyle Fill style.
 * @param {ol.style.Stroke} strokeStyle Stroke style.
 * @private
 */
exports.prototype.encodeVectorStylePolygon_ = function(symbolizers, fillStyle, strokeStyle) {
  const symbolizer = /** @type {MapFishPrintSymbolizerPolygon} */ ({
    type: 'polygon'
  });
  this.encodeVectorStyleFill_(symbolizer, fillStyle);
  if (strokeStyle !== null) {
    this.encodeVectorStyleStroke_(symbolizer, strokeStyle);
  }
  symbolizers.push(symbolizer);
};


/**
 * @param {MapFishPrintSymbolizerPoint|MapFishPrintSymbolizerLine|MapFishPrintSymbolizerPolygon}
 *      symbolizer MapFish Print symbolizer.
 * @param {!ol.style.Stroke} strokeStyle Stroke style.
 * @private
 */
exports.prototype.encodeVectorStyleStroke_ = function(symbolizer, strokeStyle) {
  const strokeColor = strokeStyle.getColor();
  if (strokeColor !== null) {
    goog.asserts.assert(typeof strokeColor === 'string' || Array.isArray(strokeColor));
    const strokeColorRgba = olColor.asArray(strokeColor);
    goog.asserts.assert(Array.isArray(strokeColorRgba), 'only supporting stroke colors');
    symbolizer.strokeColor = ngeoUtils.rgbArrayToHex(strokeColorRgba);
    symbolizer.strokeOpacity = strokeColorRgba[3];
  }
  const strokeDashstyle = strokeStyle.getLineDash();
  if (strokeDashstyle !== null) {
    symbolizer.strokeDashstyle = strokeDashstyle.join(' ');
  }
  const strokeWidth = strokeStyle.getWidth();
  if (strokeWidth !== undefined) {
    symbolizer.strokeWidth = strokeWidth;
  }
};


/**
 * @param {Array.<MapFishPrintSymbolizerText>} symbolizers Array of MapFish Print
 *     symbolizers.
 * @param {!ol.style.Text} textStyle Text style.
 * @private
 */
exports.prototype.encodeTextStyle_ = function(symbolizers, textStyle) {
  const symbolizer = /** @type {MapFishPrintSymbolizerText} */ ({
    type: 'Text'
  });
  const label = textStyle.getText();
  if (label !== undefined) {
    symbolizer.label = label;
    let xAlign = 'c';
    let yAlign = 'm';

    const olTextAlign = textStyle.getTextAlign();
    // 'left', 'right', 'center', 'end' or 'start'.
    if (olTextAlign === 'left' || olTextAlign === 'start') {
      xAlign = 'l';
    } else if (olTextAlign === 'right' || olTextAlign === 'end') {
      xAlign = 'r';
    }

    const olTextBaseline = textStyle.getTextBaseline();
    // 'bottom', 'top', 'middle', 'alphabetic', 'hanging' or 'ideographic'
    if (olTextBaseline === 'bottom') {
      yAlign = 'l';
    } else if (olTextBaseline === 'top') {
      yAlign = 't';
    }
    symbolizer.labelAlign = `${xAlign}${yAlign}`;

    const labelRotation = textStyle.getRotation();
    if (labelRotation !== undefined) {
      // Mapfish Print expects a string, not a number to rotate text
      symbolizer.labelRotation = (labelRotation * 180 / Math.PI).toString();
      // rotate around the vertical/horizontal center
      symbolizer.labelAlign = 'cm';
    }

    const fontStyle = textStyle.getFont();
    if (fontStyle !== undefined) {
      const font = fontStyle.split(' ');
      if (font.length >= 3) {
        symbolizer.fontWeight = font[0];
        symbolizer.fontSize = font[1];
        symbolizer.fontFamily = font.splice(2).join(' ');
      }
    }

    const strokeStyle = textStyle.getStroke();
    if (strokeStyle !== null) {
      const strokeColor = strokeStyle.getColor();
      goog.asserts.assert(typeof strokeColor === 'string' || Array.isArray(strokeColor));
      const strokeColorRgba = olColor.asArray(strokeColor);
      goog.asserts.assert(Array.isArray(strokeColorRgba), 'only supporting stroke colors');
      symbolizer.haloColor = ngeoUtils.rgbArrayToHex(strokeColorRgba);
      symbolizer.haloOpacity = strokeColorRgba[3];
      const width = strokeStyle.getWidth();
      if (width !== undefined) {
        // Width is a stroke, radius a radius, so divide by 2
        symbolizer.haloRadius = width / 2;
      }
    }

    const fillStyle = textStyle.getFill();
    if (fillStyle !== null) {
      const fillColor = fillStyle.getColor();
      goog.asserts.assert(typeof fillColor === 'string' || Array.isArray(fillColor));
      const fillColorRgba = olColor.asArray(fillColor);
      goog.asserts.assert(Array.isArray(fillColorRgba), 'only supporting fill colors');
      symbolizer.fontColor = ngeoUtils.rgbArrayToHex(fillColorRgba);
    }

    // Mapfish Print allows offset only if labelAlign is defined.
    if (symbolizer.labelAlign !== undefined) {
      symbolizer.labelXOffset = textStyle.getOffsetX();
      // Mapfish uses the opposite direction of OpenLayers for y axis, so the
      // minus sign is required for the y offset to be identical.
      symbolizer.labelYOffset = -textStyle.getOffsetY();
    }

    symbolizers.push(symbolizer);
  }
};


/**
 * Return the WMTS URL to use in the print spec.
 * @param {ol.source.WMTS} source The WMTS source.
 * @return {string} URL.
 * @private
 */
exports.prototype.getWmtsUrl_ = function(source) {
  const urls = source.getUrls();
  goog.asserts.assert(urls.length > 0);
  let url = urls[0];
  // Replace {Layer} in the URL
  // See <https://github.com/mapfish/mapfish-print/issues/236>
  const layer = source.getLayer();
  if (url.indexOf('{Layer}') >= 0) {
    url = url.replace('{Layer}', layer);
  }
  return exports.getAbsoluteUrl_(url);
};


/**
 * Send a create report request to the MapFish Print service.
 * @param {MapFishPrintSpec} printSpec Print specification.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 * @export
 */
exports.prototype.createReport = function(printSpec, opt_httpConfig) {
  const format = printSpec.format || 'pdf';
  const url = `${this.url_}/report.${format}`;
  const httpConfig = /** @type {!angular.$http.Config} */ ({
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  ol.obj.assign(httpConfig,
    opt_httpConfig !== undefined ? opt_httpConfig : {});
  return this.$http_.post(url, printSpec, httpConfig);
};


/**
 * Get the status of a report.
 * @param {string} ref Print report reference.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 * @export
 */
exports.prototype.getStatus = function(ref, opt_httpConfig) {
  const httpConfig = opt_httpConfig !== undefined ? opt_httpConfig :
    /** @type {angular.$http.Config} */ ({});
  const url = `${this.url_}/status/${ref}.json`;
  return this.$http_.get(url, httpConfig);
};


/**
 * Get the URL of a report.
 * @param {string} ref Print report reference.
 * @return {string} The report URL for this ref.
 * @export
 */
exports.prototype.getReportUrl = function(ref) {
  return `${this.url_}/report/${ref}`;
};


/**
 * Get the print capabilities from MapFish Print.
 * @param {angular.$http.Config=} opt_httpConfig $http config object.
 * @return {angular.$http.HttpPromise} HTTP promise.
 */
exports.prototype.getCapabilities = function(opt_httpConfig) {
  const httpConfig =
    opt_httpConfig !== undefined ? opt_httpConfig : /** @type {angular.$http.Config} */ ({
      withCredentials: true
    });
  const url = `${this.url_}/capabilities.json`;
  return this.$http_.get(url, httpConfig);
};


/**
 * @param {angular.$http} $http Angular $http service.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @return {ngeo.CreatePrint} The function to create a print service.
 * @ngInject
 * @ngdoc service
 * @ngname ngeoCreatePrint
 */
ngeoBase.createPrintServiceFactory = function($http, ngeoLayerHelper) {
  return (
    /**
         * @param {string} url URL to MapFish print service.
         */
    function(url) {
      return new exports(url, $http, ngeoLayerHelper);
    }
  );
};


ngeoBase.module.factory('ngeoCreatePrint', ngeoBase.createPrintServiceFactory);
export default exports;