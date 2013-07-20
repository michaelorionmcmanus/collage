define([
  'views/AudioNodeControlView',
  'controllers/Util'
], function(
  AudioNodeControlView,
  Util
  ) {
  return Backbone.View.extend({
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

      this.orientation = $('<div/>').addClass('orientation');
      this.$el.append(this.orientation);
      this.orientAudio();
    },

    buildSound: function() {
      var self = this;
      // Make a shadow input to open a file dialog.
      $('<input type="file" style="display: none;" id="sound-input-' + this.model.get('shape').id + '"/>')
        .on('change', function(event) {
          Util.HandleFileSelect(event).then(function(buffer, fileEvent) {
            self.model.setSound(buffer);
            self.positionAudio();
          });
        }).click();
    },

    handleDrag: function(ev, dd) {
      this.position(dd.offsetX, dd.offsetY);
      this.positionAudio();
      this.orientAudio();
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
      var listenerPosition = this.getListernerPosition();
      var nodePosition = this.getNodePosition();

      var offsetX = nodePosition.x - listenerPosition.x;
      var offsetY = listenerPosition.y - nodePosition.y;

      var sound = this.model.get('sound');

      var x = (Math.ceil((offsetX/10)) / 50);
      var y = (Math.ceil((offsetY/10)) / 50);
      if(sound && sound.panner) {
        sound.panner.setPosition(x * 0.5, y * 0.5, 0);
      }
    },

    getListernerPosition: function() {
      var listenerPosition = this.options.listener.position();
      var listenerWidth = this.options.listener.outerWidth();
      var listenerHeight = this.options.listener.outerHeight();
      var listenerX = listenerPosition.left + listenerWidth / 2;
      var listenerY = listenerPosition.top + listenerHeight / 2;
      return {x: listenerX, y: listenerY};
    },

    getNodePosition: function() {
      var nodePosition = this.$el.position();
      var nodeWidth = this.$el.outerWidth();
      var nodeHeight = this.$el.outerHeight();
      var nodeX = nodePosition.left + nodeWidth / 2;
      var nodeY = nodePosition.top + nodeHeight / 2;
      return {x: nodeX, y: nodeY};
    },

    orientAudio: function() {
      var p1 = this.getListernerPosition();
      var p2 = this.getNodePosition();
      var distance = -25;

      var p = Util.getArcPoint(p1, p2, distance);

      var offsetY = p.y - this.orientation.outerHeight()/2;
      var offsetX = p.x - this.orientation.outerWidth()/2 ;

      var offsetEl = this.$el;
      this.orientation.css({
        top: -( (p2.y - offsetY) - offsetEl.outerHeight()/2),
        left: -( (p2.x - offsetX) - offsetEl.outerWidth()/2)
      });

      var orientationX = (p.x - p1.x)/10;
      var orientationY = -(p.y - p1.y)/10;

      this.model.set('orientationX', orientationX);
      this.model.set('orientationY', orientationY);
    },

    renderControls: function() {
      var controlView = new AudioNodeControlView({
        model: this.model
      });
      controlView.render();
    }
  });
});