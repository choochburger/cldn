$(function() {

  App.DevController = Ember.ObjectController.extend({
    actions: {
      showContent: function(item) {
        var playerTypes = {
          image: 'img',
          video: 'qt',
          flash: 'swf',
          link:  'iframe'
        };

        Shadowbox.open({
          content: item.asset_url,
          title:   item.title,
          width:   item.width,
          height:  item.height,
          player:  playerTypes[item.kind]
        });

        $('#jquery_jplayer_1').jPlayer('stop');
      }
    }
  });

});
