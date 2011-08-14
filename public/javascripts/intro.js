(function(window) {

var document = window.document;

$(document).ready(function() {
  cldn.init();
});

var cldn = {

  init: function() {
    this.showSkull($('#music-skull'));
    this.showSkull($('#web-skull'), 320);
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
