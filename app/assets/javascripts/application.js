//= require jquery
//= require jquery_ujs
//= require ember-latest
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
      var $links = $('#nav a'),
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

  rootRoutes = cldn.scaffold(App, 'dev', {
    'Application': {}, 'Sandbox': {}, 'About': {}, 'Contact': {},
    'Dev':   {
      viewOpts: {templateName: 'tiles'},
      controllerOpts: {'tiles': cldn.data.dev}
    },
    'Music': {
      viewOpts: {templateName: 'tiles'},
      controllerOpts: {'tiles': cldn.data.music}
    }
  });

  App.Router = Em.Router.extend({
    location: 'hash',
    enableLogging: false,
    root: Em.Route.extend(rootRoutes)
  });

  App.loadView = function(router, name) {
    var $el = $('#content'),
        appController = router.get('applicationController');

    $el.fadeOut(300, function() {
      appController.connectOutlet(name);
      $el.fadeIn(400);
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
