require.config({
  paths: {
    'jquery': '../../bower_components/jquery/jquery',
    'jquery.event.drag-2.2': '../../lib/jquery.event.drag-2.2',
    'underscore': '../../node_modules/underscore/underscore',
    'backbone': '../../node_modules/backbone/backbone',
    'backbone.epoxy': '../../node_modules/backbone.epoxy/backbone.epoxy',
    'q': '../../bower_components/q/q',
    'two': '../../bower_components/two/build/two',
    'handlebars': '../../bower_components/handlebars/handlebars',
    'twitter.bootstrap': '../../lib/bootstrap.min'
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone':{
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.epoxy': {
      deps: ['backbone']
    },
    'jquery.event.drag-2.2': {
      deps: ['jquery']
    },
    'two': {
      exports: 'Two'
    },
    'twitter.bootstrap': {
      deps: ['jquery']
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});