//= require jquery
//= require jquery_ujs
//= require ember-latest
//= require_self
//= require_tree .

var App;

$(function() {
  App = Em.Application.create({
    rootElement: '#main'
  });

  App.ApplicationController = Em.Controller.extend();
  App.ApplicationView       = Em.View.extend({templateName: 'application'});
  App.NavController         = Em.Controller.extend();
  App.NavView               = Em.View.extend({templateName: 'nav'});
  App.DevController         = Em.Controller.extend({tiles: cldn.data.web});
  App.DevView               = Em.View.extend({templateName: 'tiles'});
  App.MusicController       = Em.Controller.extend({tiles: cldn.data.music});
  App.MusicView             = Em.View.extend({templateName: 'tiles'});

  App.Router = Em.Router.extend({
    location: 'hash',
    enableLogging: false,

    root: Em.Route.extend({
      index: Em.Route.extend({
        route: '/',
        redirectsTo: 'dev'
      }),
      dev: Em.Route.extend({
        route: '/dev',
        connectOutlets: function(router, context) {
          App.loadView(router, 'dev');
        }
      }),
      music: Em.Route.extend({
        route: '/music',
        connectOutlets: function(router, context) {
          App.loadView(router, 'music');
        }
      })
    })
  });

  App.loadView = function(router, name) {
    var $el = $('#content'),
        appController = router.get('applicationController');

    $el.fadeOut(500, function() {
      appController.connectOutlet(name);
      $el.slideDown(900);
    });

    // on initial load, just add the view
    if ($el.length === 0) appController.connectOutlet(name);
  };

  App.initialize();

});

Handlebars.registerHelper('createBgUrl', function(prop) {
  var path = Ember.getPath(this, prop);
  return 'background-image: url(\''+path+'\');';
});
