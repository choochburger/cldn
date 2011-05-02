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
        var types = { image:'img', video: 'qt', flash: 'swf', audio: 'jp', link: 'link' };
        var playerType = types[_data[index].type];

        // audio opens in jplayer, links go to new page (for now),  all else is in a shadowbox
        if (playerType == types.audio) {  
          console.log('fade in...');
          $('.jp-audio').fadeIn();
          $('#player').jPlayer("setMedia", {mp3: path}).jPlayer('play');
        } else if (playerType == types.link) {
          window.location = path;
        } else if (playerType == types.flash ||
                   playerType == types.video) {
          var width  = _data[index].width;
          var height = _data[index].height;

          Shadowbox.open({ content: path, player: playerType, width: width, height: height});
        } else {
          Shadowbox.open({ content: path, player: playerType });
        }

        // stop and hide jPlayer if content is video or swf
        if (playerType == types.video ||
            playerType == types.flash) {
            $('#player').jPlayer('stop');
            $('.jp-audio').fadeOut();
        }
      }
    );
  },

  initJPlayer: function () {
   $('#player').jPlayer( {
      ready: function() {
        console.log('player ready');
      },

      play: function() {
        cldn.checkPlayerScroll();
      },

      pause: function() {
        $('.jp-audio').fadeOut();
      },
      
      swfPath: 'javascripts/jplayer',
      solution: 'html, flash',
      
      error: function(e) {
        console.log(e.jPlayer.error);
      }
   });

   // watch for scroll and lock player to the top if player is out of view
   $(window).scroll(function () { 
     cldn.checkPlayerScroll();
   });

  },

  checkPlayerScroll: function () {
     var jpa = $('.jp-audio');
     var scroll = $(window).scrollTop(); 

     // fix player to top of window if start scrolling past it
     // or click a song when the player is out of view
     //
     if (scroll > jpa.height()/3 + jpa.offset().top) {
        jpa.data('origTop', jpa.offset().top);
        jpa.addClass('sticky-player');
      } else if (jpa.hasClass('sticky-player') &&
                 scroll < jpa.data('origTop')) {
        jpa.removeClass('sticky-player');
      }
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
