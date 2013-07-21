define([], function() {
  return {
    // Karma serves files from '/base'
    baseUrl: '/base/src/js',

    paths: {
      'jquery': '../../bower_components/jquery/jquery',
      'underscore': '../../node_modules/underscore/underscore',
      'chai': '../../node_modules/chai/chai',
      'Squire': '../../bower_components/Squire.js/src/Squire'
    },

    shim: {
      'underscore': {
        exports: '_'
      }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: function () {
      require(['chai'], function (chai) {
        window.expect = chai.expect;
        window.__karma__.start();
      });
    }
  }
});