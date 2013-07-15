var stage = $('#stage');
var listener = $('#listener');

// Fire up the audio engine.
Collage.AudiContextManager.init();

stage.on('dblclick', function(event) {
  if(event.target.id === 'stage') {
    var model = new Collage.AudioNodeModel();
    var view = new Collage.AudioNodeView({
      model: model,
      x: event.offsetX,
      y: event.offsetY,
      listener: listener
    });
    view.render();
  }
});
