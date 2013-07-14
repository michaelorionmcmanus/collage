Collage.AudioNodeModel = Backbone.Epoxy.Model.extend({
  setSound: function(buffer) {
    var sound = Collage.Util.MakeSound(buffer);
    this.set('sound', sound);
  },

  computeds: {
    pannerRolloffFactor: {
      deps: ['rolloffFactor'],
      get: function(sound) {
        var sound = this.get('sound');
        return sound && sound.panner ? sound.panner.rolloffFactor : null;
      },
      set: function( value ) {
        var sound = this.get('sound');
        if(sound && sound.panner) {
          sound.panner.rolloffFactor = value;
        }
        return {rolloffFactor: value};
      }
    }
  }
});