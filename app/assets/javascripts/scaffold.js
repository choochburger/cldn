(function() {
  /**
   * @param  {Object} app  A reference to the ember app to attach to
   * @param  {String} indexRoute
   * @param  {Object} views  An object containing view names as keys with optional templateName and context params tacked on
   * @return {Object} Returns an object containing all root routes
   **/
  cldn.scaffold = function(app, indexRoute, views) {
    routes = {
      index: Em.Route.extend({
        route: '/',
        redirectsTo: indexRoute
      })
    };

    $.each(views, function(name, opts) {
      var lowerCaseName = name.toLowerCase();

      // create app.NameController
      app[name+'Controller'] = Em.Controller.extend(opts.controllerOpts || {});
      // create app.ViewController
      app[name+'View'] = Em.View.extend($.extend({
        // add templateName, if provided. Otherwise, default to lowercase name
        templateName: opts.viewOpts ? opts.viewOpts.templateName : lowerCaseName
      }, opts.viewOpts));
      // create a root route
      routes[lowerCaseName] = Em.Route.extend({
        route: '/'+lowerCaseName,
        connectOutlets: function(router, context) { app.loadView(router, lowerCaseName); }
      });
    });

    return routes;
  };

})();
