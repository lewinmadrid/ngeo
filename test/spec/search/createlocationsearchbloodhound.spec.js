/* global geoAdminLocationSearch */

import geoAdminLocationSearch from '../data/geoAdminLocationSearch';
import ngeoSearchModule from 'ngeo/search/module';
import ngeoCreateLocationSearchBloodhound from 'ngeo/search/createLocationSearchBloodhound'; 
import ngeoBase from 'ngeo/index.js';
import olProj from 'ol/proj';

ngeoBase.module.requires.push(ngeoSearchModule.name);
angular.module('myTest', [ngeoBase.module.name]);

describe('ngeo.search.createLocationSearchBloodhound', () => {

  let ngeoCreateLocationSearchBloodhound_;

  beforeEach(angular.mock.module('myTest'));

  beforeEach(() => {
    inject((ngeoCreateLocationSearchBloodhound) => {
      ngeoCreateLocationSearchBloodhound_ = ngeoCreateLocationSearchBloodhound;
    });
  });

  it('Parses the features correctly', () => {
    const bloodhound = ngeoCreateLocationSearchBloodhound_({
      targetProjection: olProj.get('EPSG:3857'),
      limit: 5
    });
    const transform = bloodhound.remote.transform;

    const features = transform(geoAdminLocationSearch);
    expect(features.length).toBe(5);

    const feature = features[0];
    expect(feature.getId(), '5586');
    expect(feature.get('label')).toBe('<i>Populated Place</i> <b>Lausanne</b> (VD) - Lausanne');
    expect(feature.get('label_no_html')).toBe('Populated Place Lausanne (VD) - Lausanne');
    expect(feature.get('label_simple')).toBe('Lausanne');

    expect(feature.getGeometry().getCoordinates()).arrayToBeCloseTo(
      [745348.9689, 5869543.2550]);
    expect(feature.get('bbox')).arrayToBeCloseTo(
      [732811.7205, 5861483.7511, 748269.0879, 5877508.3355]);
  });
});
