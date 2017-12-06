goog.module('ngeo.datasource.OGCGroup');

const ngeoBase = goog.require('ngeo');
const ngeoDatasourceGroup = goog.require('ngeo.datasource.Group');


exports = class extends ngeoDatasourceGroup {

  /**
   * A OGCGroup data source combines multiple `ngeo.datasource.OGC` objects.
   *
   * @struct
   * @param {ngeox.datasource.OGCGroupOptions} options Options.
   */
  constructor(options) {

    super(options);

    /**
     * @type {string}
     * @private
     */
    this.url_ = options.url;
  }

  /**
   * @return {string} Url
   * @export
   */
  get url() {
    return this.url_;
  }
};
