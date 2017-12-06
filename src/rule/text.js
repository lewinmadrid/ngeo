goog.module('ngeo.rule.Text');

const ngeoRuleRule = goog.require('ngeo.rule.Rule');


exports = class extends ngeoRuleRule {

  /**
   * A text rule, which always compares the value with the LIKE operator, by
   * default.
   *
   * @struct
   * @param {!ngeox.rule.TextOptions} options Options.
   */
  constructor(options) {

    options.operator = options.operator || ngeoRuleRule.OperatorType.LIKE;
    options.type = ngeo.AttributeType.TEXT;

    super(options);

  }
};
