(function ($) {
  /**
   * Iterates over the selection performs the foloowing: First, it generates an
   * ID for each of the element in the selection and applies it to the elemen.
   * Second it creates an anchor element containing either a FontAwesome icon or
   * an element specified by the user. This anchor is then given the ID of the
   * element as the 'href' attribute.
   * @param  {Object} options Extra options. Please look at $.fn.bookmarkit.defaults
   * @return {jQuery}         A jQuery object.
   */
  $.fn.bookmarkit = function(options) {
    var opts = $.extend(true, {}, $.fn.bookmarkit.defaults, options );
    var $link_icon;
    if (opts.useFontAwesome) { // Use Font Awesome title
      $link_icon = $('<i></i>').addClass('fa')
                               .addClass(opts.fontAwesomeIcon);
    } else { // Use custom element
      $link_icon = $(opts.anchorIcon);
    }
    var $anchor = $('<a></a>').attr(opts.anchorAttrs)
                              .css(opts.anchorCSS)
                              .append($link_icon);
    this.each(function() {
      var $el = $(this);
      // Generate the ID
      var id = $.fn.bookmarkit.getID.call(this)
      $el.attr('id', id);
      var $my_anchor = $anchor.clone().attr('href', '#' + id);
      // Add anchor to element
      if (opts.appendAnchor) {
        $el.append($my_anchor);
      } else {
        $el.prepend($my_anchor);
      }
    });
    return this;
  }

  $.fn.bookmarkit.defaults = {
    // Set to true to use a font awesome icon as link icon. 
    // If false please specify 'anchorIcon'.
    useFontAwesome: true,
    // The font awesome icon to be used the link icon.
    fontAwesomeIcon: 'fa-link',
    // Link icon to be used if 'useFontAwesome' is set to false.
    anchorIcon: null,
    // Set to true to append the anchor. Set to false to prepend the anchor
    appendAnchor: true,
    // Attributes to be applied to the link element.
    anchorAttrs: {},
    // CSS styling to be applied to the link element.
    anchorCSS: {}
  };

  /**
   * Gets the ID to be applied to the element. This same ID will also be used
   * as the href for the link. This function is executed in the context of the
   * element being handled.
   * @return {String} The ID to be applied to the element
   */
  $.fn.bookmarkit.getID = function() {
    var $el = $(this);
    return $el.html().split(' ').join('_').toLowerCase();
  };
}(jQuery));