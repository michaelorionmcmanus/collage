Collage.Util = {
  MakeSound: function(audioBuffer) {
    //Create an object with a sound source and a volume control.
    var sound = {};
    sound.source = Collage.AudiContextManager.ctx.createBufferSource();
    sound.volume = Collage.AudiContextManager.ctx.createGain();
    // Create a buffer from the response ArrayBuffer.
    var buffer = Collage.AudiContextManager.ctx.createBuffer(audioBuffer, false);
    sound.buffer = buffer;
    // Make the sound source use the buffer and start playing it.
    sound.source.buffer = sound.buffer;
    // Connect the sound source to the volume control.
    sound.panner = Collage.AudiContextManager.ctx.createPanner();
    sound.panner.distanceModel = 'exponential';
    sound.panner.refDistance = 0.1;
    sound.panner.rolloffFactor = 2.1;
    sound.source.connect(sound.volume);
    sound.volume.connect(sound.panner);
    // And hook up the panner to the main volume.
    sound.panner.connect(Collage.AudiContextManager.mainVolume);

    // Make the sound source loop.
    sound.source.loop = true;
    sound.source.start(Collage.AudiContextManager.ctx.currentTime);
    return sound;
  },
  HandleFileSelect: function(evt) {
    var deferred = Q.defer();
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var buffer = e.target.result;
          deferred.resolve(buffer, e);
        }
      })(f);
      // Read in the image file as a data URL.
      reader.readAsArrayBuffer(f);
    }
    return deferred.promise;
  }
}
