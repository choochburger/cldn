$(function() {
  window.App = Ember.Application.create({
    rootElement: '#main'
  });

  Shadowbox.init({
    skipSetup: true,
    overlayOpacity: 0.8
  });
});
