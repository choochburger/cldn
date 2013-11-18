$(function() {

  App.Router.map(function() {
    this.route('dev');
    this.route('music');
    this.route('about');
    this.route('contact');
  });

  App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo('dev');
    }
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
