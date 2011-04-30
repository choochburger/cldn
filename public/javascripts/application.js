var cldn = (function() {
  
$(document).ready(function() {
  initDescriptions();
  initJPlayer();
});

function initDescriptions() {

  $('.contentItem').hover(
    function() {
      $(this).find('.description').fadeIn(500);
    },
    function() {
      $(this).find('.description').fadeOut(400);
    });
}

function initJPlayer() {
 $('#player').jPlayer( {
    ready: function() {
      $(this).jPlayer('setMedia', {
        mp3: 'http://www.chrislyons.net/music/brothers_banded.mp3'
      });
      
      console.log('ready');
    }
 });
}




})();
