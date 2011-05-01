(function(window) {
  
var document = window.document;
var _data;

$(document).ready(function() {
  cldn.initDescriptions();
  cldn.initJPlayer();
  Shadowbox.init();
});

var cldn = {

  initDescriptions: function() {

    $('.contentItem').hover(
      function() {
        $(this).find('.description').fadeIn(500);
      },
      function() {
        $(this).find('.description').fadeOut(400);
      });

    $('.description').click(
      function() {
        var id = $(this).attr('id');
        var pattern = /[0-9]+/g 
        var index = pattern.exec(id);
        var path = _data[index].url;

        console.log(path); 

        //Shadowbox.open({ content: path, player: 'qt' });
        Shadowbox.open({ content: path, player: 'img' });
      }
    );
  },

  initJPlayer: function () {
   $('#player').jPlayer( {
      ready: function() {
        //console.log('ready');
      }
   });
  },

  data: function (d) {
    _data = d;
    console.log('storing data...');
  },

  getData: function() {
    return _data;
  } 

};

window.cldn = cldn;


})(window);
