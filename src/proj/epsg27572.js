/**
 * @module
 */
import 'proj4/dist/proj4-src';
import olProj from 'ol/proj';
import olProjProj4 from 'ol/proj/proj4';

if (typeof olProjProj4.get() !== 'function' && typeof proj4 === 'function') {
  olProj.setProj4(proj4);
}

if (typeof proj4 == 'function') {
  const epsg27572def = [
    '+proj=lcc',
    '+lat_0=46.8',
    '+lon_0=0',
    '+lat_1=46.8',
    '+k_0=0.99987742',
    '+x_0=600000',
    '+y_0=2200000',
    '+ellps=GRS80',
    '+a=6378249.2',
    '+b=6356515',
    '+towgs84=-168,-60,320,0,0,0,0',
    '+pm=paris',
    '+units=m',
    '+no_defs'
  ].join(' ');
  const epsg27572extent = [5168.43, 1730142.53, 1013247.20, 2698564.20];

  olProjProj4.defs('EPSG:27572', epsg27572def);
  olProj.get('EPSG:27572').setExtent(epsg27572extent);
}

const exports = 'EPSG:27572';
export default exports;
