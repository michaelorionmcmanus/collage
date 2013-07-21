define([
  'backbone',
  'backbone.epoxy',
  'controllers/Sound'
], function(
  Backbone,
  Sound
  ) {
  return Backbone.Epoxy.Model.extend({

    defaults: {
      orientation: [0,0,-1],
      coneOuterAngle: 180,
      coneInnerAngle: 180,
      rolloffFactor: 2.1
    },

    setSound: function(buffer) {
      var sound = Sound.makeSoundFromBuffer(buffer);
      this.set('sound', sound);
    },

    initialize: function() {
      this.bind('change:orientation', function(model, value, options) {
        var sound = this.get('sound');
        if(sound && sound.panner) {
          sound.panner.setOrientation(value[0], value[1], value[2]);
        }
      });

      this.bind('change:coneInnerAngle', function(model, value, options) {
        var sound = this.get('sound');
        if(sound && sound.panner) {
          sound.panner.coneInnerAngle = value;
        }
      });

      this.bind('change:coneOuterAngle', function(model, value, options) {
        var sound = this.get('sound');
        if(sound && sound.panner) {
          sound.panner.coneOuterAngle = value;
        }
      });
    },

    computeds: {
      orientationX: {
        deps: ['orientation'],
        get: function(orientation) {
          return orientation ? orientation[0] : null;
        },
        set: function(value) {
          var orientation = this.get('orientation');
          // If we modify the current array by reference, it will screw up change recoginition
          // deep within Backbone/Epoxy land. So we need a copy. Kind of dumb.
          var newOrientation = orientation.slice(0);
          newOrientation[0] = value;
          return {orientation: newOrientation};
        }
      },
      orientationY: {
        deps: ['orientation'],
        get: function(orientation) {
          return orientation ? orientation[1] : null;
        },
        set: function(value) {
          var orientation = this.get('orientation');
          var newOrientation = orientation.slice(0);
          newOrientation[1] = value;
          return {orientation: newOrientation};
        }
      },
      orientationZ: {
        deps: ['orientation'],
        get: function(orientation) {
          return orientation ? orientation[2] : null;
        },
        set: function(value) {
          var orientation = this.get('orientation');
          var newOrientation = orientation.slice(0);
          newOrientation[2] = value;
          return {orientation: newOrientation};
        }
      },
      pannerRolloffFactor: {
        deps: ['rolloffFactor'],
        get: function(rolloffFactor) {
          return this.get('rolloffFactor');
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
});