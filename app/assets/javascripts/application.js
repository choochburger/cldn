//= require jquery
//= require jquery_ujs
//= require ember-latest
//= require_self
//= require_tree .

var App;

$(function() {
  App = Em.Application.create({rootElement: '#main'});

  App.Router = Em.Router.extend({
    location: 'hash',
    enableLogging: false,
    root: Em.Route.extend(
      App.scaffold({
        'Application': {}, 'Nav': {}, 'Sandbox': {}, 'About': {}, 'Contact': {},
        'Dev':   {
          templateName: 'tiles',
          context: {'tiles': cldn.data.web}
        },
        'Music': {
          templateName: 'tiles',
          context: {'tiles': cldn.data.music}
        },
      }, 'dev')
    )
  });

  // App.scaffold creates:
  //   * App.NameController for all keys
  //   * App.NameView (using template 'name') for all keys
  //   * Root route to 'name' for all keys
  //
  // App.scaffold returns:
  //   * an object containing all root routes
  //
  App.scaffold = function(views, indexRoute) {
    routes = {
      index: Em.Route.extend({
        route: '/',
        redirectsTo: indexRoute
      })
    };

    $.each(views, function(name, data) {
      var lowerCaseName = name.toLowerCase();

      App[name+'Controller'] = Em.Controller.extend(data.context || {});
      App[name+'View'] = Em.View.extend({
        templateName: data.templateName || lowerCaseName
      });
      routes[lowerCaseName] = Em.Route.extend({
        route: '/'+lowerCaseName,
        connectOutlets: function(router, context) { App.loadView(router, lowerCaseName); }
      });
    });

    return routes;
  }

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
