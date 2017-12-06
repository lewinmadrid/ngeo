/**
 * @module
 */
import olProj from 'ol/proj';
import olProjProj4 from 'ol/proj/proj4';

if (typeof olProjProj4.get() !== 'function' && typeof proj4 === 'function') {
  olProj.setProj4(proj4);
}

if (typeof olProjProj4.get() == 'function') {
  const epsg32631def = [
    '+proj=utm',
    '+zone=31',
    '+ellps=WGS84',
    '+datum=WGS84',
    '+units=m',
    '+no_defs'
  ].join(' ');
  const epsg32631extent = [166021.44, 0.00, 534994.66, 9329005.18];

  olProjProj4.get().defs('EPSG:32631', epsg32631def);
  olProj.get('EPSG:32631').setExtent(epsg32631extent);
}

const exports = 'EPSG:32631';
export default exports;