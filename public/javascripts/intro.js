(function(window) {

var document = window.document;

$(document).ready(function() {
  cldn.init();
});

var cldn = {

  init: function() {
    this.$musicSkull = $('#music-skull');
    this.$webSkull   = $('#web-skull');

    //this.preloadImages([this.$musicSkull, this.$webSkull]);
    this.onAllLoaded();
  },

  preloadImages: function(els) {
    var numToLoad = els.length,
        _this = this;

    $(els).each(function() {
      var path = $(this).css('background-image')
                        .replace(/\"|\'|\)|\(|url/g,'');

      var img = new Image();
      img.src = path;
      img.onload = function() {
        if (--numToLoad === 0) _this.onAllLoaded();
      }
    });
  },

  onAllLoaded: function() {
    this.showSkull(this.$musicSkull);
    this.showSkull(this.$webSkull, 320);
  },

  showSkull: function(el, dly) {
    $(el).delay(dly).animate({top: '20%'}, 1000, function() {
      $(this).effect('bounce', {top: '15%'}, 400);
    });

    $(el).mouseover(function() {
      $(this).find('.bubble').show();
    }).mouseout(function() {
      $(this).find('.bubble').hide();
    });
  }
};

})(window);
