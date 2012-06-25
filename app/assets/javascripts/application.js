//= require jquery
//= require jquery_ujs
//= require ember-latest
//= require_self
//= require_tree .

var App;

$(function() {
  var rootRoutes;

  App = Em.Application.create({rootElement: '#main'});

  rootRoutes = cldn.scaffold(App, 'dev', {
    'Application': {}, 'Nav': {}, 'Sandbox': {}, 'About': {}, 'Contact': {},
    'Dev':   {
      templateName: 'tiles',
      context: {'tiles': cldn.data.dev}
    },
    'Music': {
      templateName: 'tiles',
      context: {'tiles': cldn.data.music}
    },
  });

  App.Router = Em.Router.extend({
    location: 'hash',
    enableLogging: false,
    root: Em.Route.extend(rootRoutes)
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


  // kick things off
  App.initialize();

});

Handlebars.registerHelper('createBgUrl', function(prop) {
  var path = Ember.getPath(this, prop);
  return 'background-image: url(\''+path+'\');';
});
