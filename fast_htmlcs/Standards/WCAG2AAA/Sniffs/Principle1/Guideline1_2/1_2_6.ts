_global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_6 = {
  /**
   * Determines the elements to register for processing.
   *
   * Each element of the returned array can either be an element name, or "_top"
   * which is the top element of the tested code.
   *
   * @returns {Array} The list of elements.
   */
  register: () => ["object", "embed", "applet", "video"],

  /**
   * Process the registered element.
   *
   * @param {Element} element The element registered.
   * @param {Node} top     The top element of the tested code.
   */
  process: (element, _) =>
    HTMLCS.addMessage(
      HTMLCS.NOTICE,
      element,
      _global.HTMLCS.getTranslation("1_2_6_G54,G81"),
      "G54,G81"
    ),
};
