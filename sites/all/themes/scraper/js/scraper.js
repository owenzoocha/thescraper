(function ($) {

  var scraper = {

    init: function(context) {
    }

  }

  Drupal.behaviors.scraper = {
    attach: function(context) {
      $('body', context).once(function () {
        scraper.init();
      });
    }
  };

})(jQuery);
