/**
 * @module
 */
import 'proj4/dist/proj4-src';
import olProj from 'ol/proj';
import olProjProj4 from 'ol/proj/proj4';

if (typeof olProjProj4.get() !== 'function' && typeof proj4 === 'function') {
  olProj.setProj4(proj4);
}

if (typeof olProjProj4.get() == 'function') {
  const epsg2056def = [
    '+proj=somerc',
    '+lat_0=46.95240555555556',
    '+lon_0=7.439583333333333',
    '+k_0=1',
    '+x_0=2600000',
    '+y_0=1200000',
    '+ellps=bessel',
    '+towgs84=674.374,15.056,405.346,0,0,0,0',
    '+units=m',
    '+no_defs'
  ].join(' ');
  const epsg2056extent = [2420000, 1030000, 2900000, 1350000];

  olProjProj4.get().defs('EPSG:2056', epsg2056def);
  olProj.get('EPSG:2056').setExtent(epsg2056extent);
}

const exports = 'EPSG:2056';
export default exports;
