define([
  'jquery',
  'controllers/AudioContextManager',
  'models/AudioNode',
  'views/AudioNode',
  'views/AudioNodeControlView',
  'postal',
  'backbone'
], function(
  $,
  AudioContextManager,
  AudioNodeModel,
  AudioNodeView,
  AudioNodeControlView,
  postal,
  Backbone) {
  return {
    init: function() {
      // Let's make a layout!
      var layout = new Backbone.Layout({
        el: false,
        template  : 'Stage'
      });

      layout.render().done(function(layout) {
        $('body').append(layout.$el);
        // Get some handlers.
        var stage = $('#stage');
        var listener = $('#listener');
        // Fire up the audio engine.
        AudioContextManager.init();

        stage.on('dblclick', function(event) {
          if(event.target.id === 'stage') {
            var model = new AudioNodeModel();
            var view = new AudioNodeView({
              model: model,
              x: event.offsetX,
              y: event.offsetY,
              listener: listener
            });

            layout.insertView(view);
            view.render();
          }
        });
      });

      postal.subscribe({
        channel  : "AudioNode",
        topic    : "controls.show",
        callback : function(data, envelope) {
          var controlView = new AudioNodeControlView({
            model: data.model
          });
          layout.insertView(controlView);
          controlView.render();
        }
      });
    }
  };
});