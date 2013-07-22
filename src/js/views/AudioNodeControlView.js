define([
  'backbone',
  'backbone.epoxy'
], function(
  Backbone
  ) {
  return Backbone.Epoxy.View.extend({
    className: 'modal hide fade controls',
    template: 'AudioNodeControlView',

    events: {
      'hidden': function() {
        this.remove();
      }
    },

    bindings: {
      "input[name='rolloffFactor']": "value:pannerRolloffFactor",
      "input[name='orientationX']": "value:orientationX",
      "input[name='orientationY']": "value:orientationY",
      "input[name='orientationZ']": "value:orientationZ",
      "input[name='coneInnerAngle']": "value:coneInnerAngle",
      "input[name='coneOuterAngle']": "value:coneOuterAngle"
    },

    afterRender: function() {
      this.$('[data-toggle="popover"]').popover();
      this.applyBindings();
      this.$el.modal();
    }

  });
});