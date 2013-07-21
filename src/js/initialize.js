require([
  'underscore',
  'jquery',
  'jquery.event.drag-2.2',
  'backbone',
  'backbone.epoxy',
  'two',
  'twitter.bootstrap',
  'handlebars'
], function() {
  require(['app'], function(app) {
    app.init();
  })
});