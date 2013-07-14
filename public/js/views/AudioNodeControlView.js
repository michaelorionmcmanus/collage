Collage.AudioNodeControlView = Backbone.Epoxy.View.extend({
  className: 'modal hide fade controls',

  events: {
    'hidden': function() {
      this.remove()
    }
  },

  bindings: {
    "input[name='rolloffFactor']": "value:pannerRolloffFactor"
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