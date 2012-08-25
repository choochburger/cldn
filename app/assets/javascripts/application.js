//= require jquery
//= require jquery_ujs
//= require_tree ../../../vendor/assets/javascripts/.
//= require_self
//= require_tree .

var App;

$(function() {
  var rootRoutes;

  App = Em.Application.create({
    rootElement: '#main'
  });

  // top navbar
  App.NavView = Em.View.extend({
    templateName: 'nav',
    didInsertElement: function() {
      var $links = $('#nav a[target!="_blank"]'),
          stateName;

      $links.click(function() {
        $links.removeClass('selected');
        $(this).addClass('selected');
      });

      // set initial page
      stateName = App.stateManager.get('currentState').name;
      $('#nav a[href=#'+stateName+']').addClass('selected');
    }
  });

  App.loadView = function(router, name) {
    var $el = $('#content'),
        appController = router.get('applicationController');

    $el.fadeOut(300, function() {
      appController.connectOutlet(name);
      $el.fadeIn(400);
    });

    $('#jp_container_1').animate({
      bottom: '-100px'
    }, 500);
    $('#jquery_jplayer_1').jPlayer('stop');

    // on initial load, just add the view
    if ($el.length === 0) appController.connectOutlet(name);
  };

  rootRoutes = cldn.scaffold(App, 'dev', App.loadView, {
    'Application': {}, 'Sandbox': {}, 'About': {}, 'Contact': {},
    'Dev':   {
      viewOpts: {
        templateName: 'tiles',
        showContent: function(e) {
          var thumb = e.context,
              playerTypes = { image:'img', video: 'qt', flash: 'swf', link: 'iframe' };

          e.preventDefault();

          Shadowbox.open({
            content: thumb.asset_url,
            title:   thumb.title,
            width:   thumb.width,
            height:  thumb.height,
            player:  playerTypes[thumb.kind]
          });
        }
      },
      controllerOpts: {'tiles': cldn.data.dev}
    },
    'Music': {
      viewOpts: {
        templateName: 'tiles',
        showContent: function(e) {
          var thumb   = e.context,
              $player = $('#jquery_jplayer_1');

          e.preventDefault();

          $player.jPlayer('clearMedia');
          $player.jPlayer('setMedia', {
            mp3: thumb.asset_url
          });

          $player.jPlayer('play');
          $('#jp_container_1').animate({
            bottom: '0px'
          }, 750);

          $('#song_title').text(thumb.title);
        }
      },
      controllerOpts: {'tiles': cldn.data.music}
    }
  });

  App.Router = Em.Router.extend({
    location: 'hash',
    enableLogging: false,
    root: Em.Route.extend(rootRoutes)
  });

  // jplayer
	$("#jquery_jplayer_1").jPlayer({
    autoHide: {
      fadeIn: 500,
      fadeOut: 800
    },
    cssSelectorAncestor: '#jp_container_1',
		swfPath: "assets",
		supplied: "mp3",
	});


  // kick things off
  App.initialize();
  Shadowbox.init({
    skipSetup: true,
    overlayOpacity: 1.0
  });
});

Handlebars.registerHelper('createBgUrl', function(prop) {
  var path = Ember.getPath(this, prop);
  return 'background-image: url(\''+path+'\');';
});

Handlebars.registerHelper('url', function(prop) {
  var path = Ember.getPath(this, prop);
  return path;
});
