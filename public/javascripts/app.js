var App;

$(function() {
  App = Ember.Application.create({
    rootElement: '#main'
  });

  App.Router.map(function() {
    this.route('dev');
    this.route('music');
    this.route('about');
    this.route('contact');
  });

  App.NavView = Ember.View.extend({
    templateName: 'nav'
  });

  App.DevView = Ember.View.extend({
    templateName: 'tiles'
  });

  App.DevRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model', cldn.data.dev);
    },
  });

  App.DevController = Ember.ObjectController.extend({
    actions: {
      showContent: function(item) {
        var playerTypes = {
          image: 'img',
          video: 'qt',
          flash: 'swf',
          link:  'iframe'
        };

        Shadowbox.open({
          content: item.asset_url,
          title:   item.title,
          width:   item.width,
          height:  item.height,
          player:  playerTypes[item.kind]
        });

        $('#jquery_jplayer_1').jPlayer('stop');
      }
    }
  });

  App.MusicView = Ember.View.extend({
    templateName: 'tiles'
  });

  App.MusicRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model', cldn.data.music);
    }
  });

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

  App.TileView = Ember.View.extend({
    templateName: 'tile'
  });

  // jplayer
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

  Shadowbox.init({
    skipSetup: true,
    overlayOpacity: 0.8
  });
});
