define([
  'backbone',
  'backbone.epoxy'
], function(
  Backbone
  ) {
  return Backbone.Epoxy.View.extend({
    className: 'modal hide fade controls',

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

    template: function() {
      var source = $('#AudioNodeControlTemplate').html();
      return Handlebars.compile(source);
    },

    render: function() {
      var markup = this.template();
      this.$el.append(markup());
      this.$('[data-toggle="popover"]').popover();
      this.applyBindings();
      this.$el.modal();
    }
  });
});