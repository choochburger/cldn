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

(function() {
  // @param  {Object} app  A reference to the ember app to attach to
  // @param  {String} indexRoute
  // @param  {Object} views  An object containing view names as keys with optional templateName and context params tacked on
  // @return {Object} Returns an object containing all root routes
  //
  // cldn.scaffold creates:
  //   * App.NameController for all keys
  //   * App.NameView (using template 'name') for all keys
  //   * Root route to 'name' for all keys
  //
  cldn.scaffold = function(app, indexRoute, views) {
    routes = {
      index: Em.Route.extend({
        route: '/',
        redirectsTo: indexRoute
      })
    };

    $.each(views, function(name, data) {
      var lowerCaseName = name.toLowerCase();

      app[name+'Controller'] = Em.Controller.extend(data.context || {});
      app[name+'View'] = Em.View.extend({
        templateName: data.templateName || lowerCaseName
      });
      routes[lowerCaseName] = Em.Route.extend({
        route: '/'+lowerCaseName,
        connectOutlets: function(router, context) { app.loadView(router, lowerCaseName); }
      });
    });

    return routes;
  };

})();
