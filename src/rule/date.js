goog.module('ngeo.rule.Date');

const ngeoRuleRule = goog.require('ngeo.rule.Rule');


exports = class extends ngeoRuleRule {

  /**
   * A date rule.
   *
   * @struct
   * @param {!ngeox.rule.DateOptions} options Options.
   */
  constructor(options) {

    options.type = options.type || ngeo.AttributeType.DATE;

    super(options);
  }
};
