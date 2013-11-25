$(function() {
  var $player = $('#jquery_jplayer'),
      containerSelector = '#jp_container',
      $playerContainer = $(containerSelector);

  App.MusicController = Ember.ObjectController.extend({
    actions: {
      showContent: function(item) {
        $player.jPlayer('clearMedia');
        $player.jPlayer('setMedia', {
          mp3: item.asset_url
        });
        $player.jPlayer('play');

        $playerContainer.animate({ bottom: '0px' }, 750);
        $('#song_title').text(item.title);
      }
    }
  });

  (function initJPlayer() {
    var $warning = $('.flash-warning');
    // Ideally, this will be it's own view capable
    // of listening to/triggering events
    $player
      .jPlayer({
        autoHide: {
          fadeIn: 500,
          fadeOut: 800
        },
        cssSelectorAncestor: containerSelector,
        swfPath: 'javascripts/lib',
        supplied: 'mp3',
        ready: function(e) {
          $warning.hide();
        }
      })
      .on($.jPlayer.event.error, function(e) {
        var error = e.jPlayer.error;
        if (error.type === 'e_flash') {
          $warning.show();
        }
      });
  })();

});
