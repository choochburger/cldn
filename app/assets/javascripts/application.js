//= require jquery
//= require jquery_ujs
//= require ember-0.9.8.1.min
//= require_self
//= require_tree .

var App;

$(function() {
  App = Em.Application.create();

  App.Router = Ember.Router.extend({
    root: Ember.State.extend({
      index: Ember.State.extend({
        route: '/',
        redirectsTo: 'web'
      }),
      web: Ember.State.extend({
        route: '/web'
      }),
      music: Ember.State.extend({
        route: '/music'
      })
    })
  });

  // add some tiles. temp for styling
  var tilesView = Ember.View.create({
    templateName: 'tiles',
    tiles: cldn.data.web
  });
  tilesView.appendTo('#main');

});

Handlebars.registerHelper('createBgUrl', function(prop) {
  var path = Ember.getPath(this, prop);
  return 'background-image: url(\''+path+'\');';
});
