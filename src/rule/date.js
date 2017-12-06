/**
 * @module
 */
import ngeoRuleRule from '../rule/Rule.js';

const exports = class extends ngeoRuleRule {

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

export default exports;