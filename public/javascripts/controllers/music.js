$(function() {

  App.MusicController = Ember.ObjectController.extend({
    actions: {
      showContent: function(item) {
        var $player = $('#jquery_jplayer_1');

        $player.jPlayer('clearMedia');
        $player.jPlayer('setMedia', {
          mp3: item.asset_url
        });
        $player.jPlayer('play');

        $('#jp_container_1').animate({ bottom: '0px' }, 750);
        $('#song_title').text(item.title);
      }
    }
  });

  (function initJPlayer() {
    // Ideally, this will be it's own view capable
    // of listening to/triggering events
    $('#jquery_jplayer_1')
      .jPlayer({
        autoHide: {
          fadeIn: 500,
          fadeOut: 800
        },
        cssSelectorAncestor: '#jp_container_1',
        swfPath: 'javascripts/lib',
        supplied: 'mp3',
        ready: function(e) {
          $('.flash-warning').hide();
        }
      })
      .on($.jPlayer.event.error, function(e) {
        var error = e.jPlayer.error;
        if (error.type === 'e_flash') {
          $('.flash-warning').show();
        }
      });
  })();

});
