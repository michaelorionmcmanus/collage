Collage.AudiContextManager = {
  init: function() {
    window.AudioContext = (
    window.AudioContext ||
    window.webkitAudioContext ||
    null
    );

    if (!AudioContext) {
    throw new Error("AudioContext not supported!");
    }

    // Create a new audio context.
    this.ctx = new AudioContext();

    // Create a AudioGainNode to control the main volume.
    this.mainVolume = this.ctx.createGain();
    // // Connect the main volume node to the context destination.
    this.mainVolume.connect(this.ctx.destination);
  }
}