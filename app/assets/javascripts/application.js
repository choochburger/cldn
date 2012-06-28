//= require jquery
//= require jquery_ujs
//= require ember-latest
//= require shadowbox
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

  rootRoutes = cldn.scaffold(App, 'dev', App.loadView, {
    'Application': {}, 'Sandbox': {}, 'About': {}, 'Contact': {},
    'Dev':   {
      viewOpts: {
        templateName: 'tiles',
        click: function(e) {
          console.log(e);
        }
      },
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

  // kick things off
  App.initialize();
  Shadowbox.init();
});

Handlebars.registerHelper('createBgUrl', function(prop) {
  var path = Ember.getPath(this, prop);
  return 'background-image: url(\''+path+'\');';
});

Handlebars.registerHelper('shadowboxProps', function() {
  var props;
  props  = 'shadowbox;';
  props += 'width='+this.width+'px;';
  props += 'height='+this.height+'px;';
  return props;
});

Handlebars.registerHelper('url', function(prop) {
  var path = Ember.getPath(this, prop);
  return path;
});
