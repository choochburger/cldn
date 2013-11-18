$(function() {

  App.Router.map(function() {
    this.route('dev');
    this.route('music');
    this.route('about');
    this.route('contact');
  });

  App.DevRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model', cldn.data.dev);
    },
  });

  App.MusicRoute = Ember.Route.extend({
    setupController: function(controller) {
      controller.set('model', cldn.data.music);
    }
  });

});
