if(window.__karma__) {
  var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return /Spec\.js$/.test(file);
  });
} else {
  var tests = [
    // Controllers
    '../../test/controllers/SoundSpec',
    '../../test/controllers/AudioContextManagerSpec',
    '../../test/controllers/UtilSpec',
    // Views
    '../../test/views/AudioNodeControlViewSpec',
    // Models
    '../../test/models/AudioNodeSpec'
  ];
}

if(!window.__karma__) {
  mocha.setup("bdd");
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: window.__karma__ ? '/base/src/js' : '../src/js',

  paths: {
    'jquery': '../../bower_components/jquery/jquery',
    'underscore': '../../node_modules/underscore/underscore',
    'chai': '../../node_modules/chai/chai',
    'jquery.event.drag-2.2': '../../lib/jquery.event.drag-2.2',
    'backbone': '../../node_modules/backbone/backbone',
    'backbone.epoxy': '../../node_modules/backbone.epoxy/backbone.epoxy',
    'q': '../../bower_components/q/q',
    'two': '../../bower_components/two/build/two',
    'twitter.bootstrap': '../../lib/bootstrap.min',
    'postal': '../../bower_components/postal.js/lib/postal'
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
    }
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: function () {
    require([
      'chai'
    ], function (chai) {
      window.expect = chai.expect;
      if(window.__karma__) {
        window.__karma__.start();
      } else {
        mocha.run();
      }
    });
  }
});