var cldn = (function() {
  
$(document).ready(function() {
  initDescriptions();
});

function initDescriptions() {
  /*
  $('.description').each(function(i) {
    $(this).delay(100).fadeOut((i+1) * 75, function() {
      $(this).find('.invisible').removeClass('invisible'); // show text once fade in completes
    });
  });
  */

  $('.contentItem').hover(
    function() {
      $(this).find('.description').fadeIn(500);
    },
    function() {
      $(this).find('.description').fadeOut(400);
    });
}

})();
