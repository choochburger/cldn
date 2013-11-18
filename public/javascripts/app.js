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
    templateName: 'nav',
    didInsertElement: function() {
      //var $el = $(this.get('element')),
      //var $links = $('#nav a[target!="_blank"]'),
          //stateName;

      //$links.click(function() {
        //$links.removeClass('selected');
        //$(this).addClass('selected');
      //});

      //// set initial page
      //stateName = App.stateManager.get('currentState').name;
      //$('#nav a[href=#'+stateName+']').addClass('selected');
    }
  });

  App.DevView = Ember.View.extend({
    templateName: 'tiles'
  });

  App.DevRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model', cldn.data.dev);
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

  App.TileView = Ember.View.extend({
    templateName: 'tile'
  });

  //App.loadView = function(router, name) {
    //var $el = $('#content'),
        //appController = router.get('applicationController');

    //$el.fadeOut(300, function() {
      //appController.connectOutlet(name);
      //$el.fadeIn(400);
    //});

    //$('#jp_container_1').animate({
      //bottom: '-100px'
    //}, 500);
    //$('#jquery_jplayer_1').jPlayer('stop');

    //// on initial load, just add the view
    //if ($el.length === 0) appController.connectOutlet(name);
  //};

  //rootRoutes = cldn.scaffold(App, 'dev', App.loadView, {
    //'Application': {}, 'Sandbox': {}, 'About': {}, 'Contact': {},
    //'Dev':   {
      //viewOpts: {
        //templateName: 'tiles',
        //showContent: function(e) {
          //var thumb = e.context,
              //playerTypes = { image: 'img', video: 'qt', flash: 'swf', link: 'iframe' };

          //e.preventDefault();

          //Shadowbox.open({
            //content: thumb.asset_url,
            //title:   thumb.title,
            //width:   thumb.width,
            //height:  thumb.height,
            //player:  playerTypes[thumb.kind]
          //});
        //}
      //},
      //controllerOpts: {'tiles': cldn.data.dev}
    //},
    //'Music': {
      //viewOpts: {
        //templateName: 'tiles',
        //showContent: function(e) {
          //var thumb   = e.context,
              //$player = $('#jquery_jplayer_1');

          //e.preventDefault();

          //$player.jPlayer('clearMedia');
          //$player.jPlayer('setMedia', {
            //mp3: thumb.asset_url
          //});

          //$player.jPlayer('play');
          //$('#jp_container_1').animate({
            //bottom: '0px'
          //}, 750);

          //$('#song_title').text(thumb.title);
        //}
      //},
      //controllerOpts: {'tiles': cldn.data.music}
    //}
  //});

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
