define([
  'jquery',
  'controllers/AudioContextManager',
  'models/AudioNode',
  'views/AudioNode'
], function(
  $,
  AudioContextManager,
  AudioNodeModel,
  AudioNodeView) {
  return {
    init: function() {
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
          view.render();
        }
      });
    }
  }
});