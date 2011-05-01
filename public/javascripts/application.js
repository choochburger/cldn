(function(window) {
  
var document = window.document;
var _data;

$(document).ready(function() {
  cldn.initDescriptions();
  cldn.initJPlayer();
  Shadowbox.init();
});

var cldn = {

  initDescriptions: function() {

    $('.contentItem').hover(
      function() {
        $(this).find('.description').fadeIn(500);
      },
      function() {
        $(this).find('.description').fadeOut(400);
      });

    $('.description').click(
      function() {
        var id = $(this).attr('id');
        var pattern = /[0-9]+/g 
        var index = pattern.exec(id);
        var path = _data[index].url;
        var types = { image:'img', video: 'qt', flash: 'swf', audio: 'jp' };
        var playerType = types[_data[index].type];

        // audio opens in jplayer, all else is in a shadowbox
        if (playerType == types.audio) {  
          console.log('fade in...');
          $('.jp-audio').fadeIn();
          $('#player').jPlayer("setMedia", {mp3: path}).jPlayer('play');
        } else if (playerType == types.flash) {
          var width  = _data[index].width;
          var height = _data[index].height;

          Shadowbox.open({ content: path, player: playerType, width: width, height: height});
        } else {
          Shadowbox.open({ content: path, player: playerType });
        }
      }
    );
  },

  initJPlayer: function () {
   $('#player').jPlayer( {
      ready: function() {
        console.log('player ready');

      },
      
      swfPath: 'javascripts/jplayer',
      solution: 'html, flash',

      error: function(e) {
        console.log(e.jPlayer.error);
      }
   });
  },

  data: function (d) {
    _data = d;
    console.log('storing data...');
  },

  getData: function() {
    return _data;
  } 

};

window.cldn = cldn;


})(window);
