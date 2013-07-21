require.config({
  map: {
    'controllers/Sound': {
     'controllers/AudioContextManager': 'AudioContextManagerMock'
    }
  }
});

define('AudioContextManagerMock', function () {
  return {
    ctx: {
      createBufferSource: function() {
        return {
          connect: function() { },
          start: function() {},
          volume: {
            connect: function() {}
          }
        };
      },
      createGain: function() {
        return {connect: function() {}
        }
      },
      createBuffer: function() {return {}
      },
      createPanner: function() {
        return {
          distanceModel: '',
          refDistance: 0,
          rolloffFactor: 0,
          connect: function() {}
        }
      }
    }
  }
});

define(['controllers/Sound'], function (SoundController) {
  describe('Sound Controller', function() {
    describe('#makeSoundFromBuffer', function() {
      it('runs without throwing an exception', function() {
        var result;
        try {
          result = true;
          SoundController.makeSoundFromBuffer();
        } catch(e) {
          result = false;
        }
        expect(result).to.be.ok;
      });
      it('returns an object', function() {
        var sound = SoundController.makeSoundFromBuffer();
        expect(sound).to.be.a('object');
          expect(sound).to.have.property('panner');
          expect(sound).to.have.property('buffer');
          expect(sound).to.have.property('source');
          expect(sound).to.have.property('volume');
      });
    });
  });
});