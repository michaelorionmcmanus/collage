Collage.AudioNodeView = Backbone.View.extend({
  moving: false,
  className: 'circle',

  events: {
    'drag': function(event, dd) {
      this.handleDrag(event, dd);
    },
    'dblclick': 'buildSound',
    'click .control': 'renderControls'
  },

  initialize: function() {
    _.bindAll(this, 'buildSound', 'handleDrag');
  },

  render: function() {
    $('#stage').append(this.$el);
    var y = this.options.y - this.$el.outerHeight() / 2;
    var x = this.options.x - this.$el.outerWidth() / 2;
    this.position(x,y);
    // Because SVG shapes are nicer looking.
    this.makeShape();
    this.$el.append($('<div/>').addClass('control'));
  },

  buildSound: function() {
    var self = this;
    // Make a shadow input to open a file dialog.
    $('<input type="file" style="display: none;" id="sound-input-' + this.model.get('shape').id + '"/>')
    .on('change', function(event) {
      Collage.Util.HandleFileSelect(event).then(function(buffer, fileEvent) {
        self.model.setSound(buffer);
        self.positionAudio();
      });
    }).click();
  },

  handleDrag: function(ev, dd) {
    this.position(dd.offsetX, dd.offsetY);
    this.positionAudio();
  },

  position: function(x,y) {
    this.$el.css({
      top: y,
      left: x
    });
  },

  makeShape: function() {
        // // Make an instance of two and place it on the page.
    var params = { width: '100%', height: '100%' };
    var two = new Two(params).appendTo(this.el);

    var circle = two.makeCircle(25, 25, 20);
    circle.fill = '#FF8000';
    circle.stroke = 'orangered'; // Accepts all valid css color
    circle.linewidth = 5;
    this.model.set('shape', circle);
    two.update();
  },

  positionAudio: function() {
    var listenerPosition = this.options.listener.position();
    var listenerWidth = this.options.listener.outerWidth();
    var listenerHeight = this.options.listener.outerHeight();
    var listenerX = listenerPosition.left + listenerWidth / 2;
    var listenerY = listenerPosition.top + listenerHeight / 2;

    var nodePosition = this.$el.position();
    var nodeWidth = this.$el.outerWidth();
    var nodeHeight = this.$el.outerHeight();
    var nodeX = nodePosition.left + nodeWidth / 2;
    var nodeY = nodePosition.top + nodeHeight / 2;

    var offsetX = nodeX - listenerX;
    var offsetY = listenerY - nodeY;
    
    var sound = this.model.get('sound');

    var x = (Math.ceil((offsetX/10)) / 50);
    var y = (Math.ceil((offsetY/10)) / 50);
    if(sound && sound.panner) {
      sound.panner.setPosition(x * 0.5, y * 0.5, 0);
    }
  },

  renderControls: function() {
    var controlView = new Collage.AudioNodeControlView({
      model: this.model
    });
    controlView.render();
  }
});