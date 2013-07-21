define([
  'controllers/AudioContextManager'
], function(AudioContextManager) {
  return {
    makeSoundFromBuffer: function(audioBuffer) {
      //Create an object with a sound source and a volume control.
      var sound = {};
      sound.source = AudioContextManager.ctx.createBufferSource();
      sound.volume = AudioContextManager.ctx.createGain();
      // Create a buffer from the response ArrayBuffer.
      var buffer = AudioContextManager.ctx.createBuffer(audioBuffer, false);
      sound.buffer = buffer;
      // Make the sound source use the buffer and start playing it.
      sound.source.buffer = sound.buffer;
      // Connect the sound source to the volume control.
      sound.panner = this.createPanner();
      sound.source.connect(sound.volume);
      sound.volume.connect(sound.panner);
      // And hook up the panner to the main volume.
      sound.panner.connect(AudioContextManager.mainVolume);
      // Make the sound source loop.
      sound.source.loop = true;
      sound.source.start(AudioContextManager.ctx.currentTime);
      return sound;
    },
    createPanner: function() {
      var panner = AudioContextManager.ctx.createPanner();
      panner.distanceModel = 'exponential';
      panner.refDistance = 0.1;
      panner.rolloffFactor = 2.1;
      return panner;
    }
  };
});

