(function ($) {
  $.fn.bookmarkit = function(options) {
    this.each(function() {
      var $el = $(this);
      $el.append("yay!");
    });
    return this;
  }
  $.fn.bookmarkit.defaults = {};
}(jQuery));