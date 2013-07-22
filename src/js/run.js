define(function(require, exports, module) {
  var _ = require('underscore');
  var app = require('app');
  var LayoutManager = require('backbone.layoutmanager');
  var Backbone = require("backbone");

  var makeTemplate = function(contents) {
    var out;
    if (contents){
      out = _.template(contents);
    } else {
      out = '';
    }
    return out;
  };

  // Mange views with the excellent layout manager.
  LayoutManager.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    // Indicate where templates are stored.
    prefix: "templates/",
    // Fetch templates via AJAX
    fetch: function(path) {
      var prefix = Backbone.Layout.prototype.options.prefix;
      // If path is an object that has a property called getter and it's a function. Call it.
      if(_.isFunction(path.getter)) {
        path = path.getter();
        // If it comes back with a value, prepend the path prefix.
        if(path && path !== prefix) {
          path = prefix + path;
        }
      }

      // To bypass fetching a template altogether if one is not needed, a
      // view can specify false or an empty string as the path
      if (!path || path == prefix) {
        return '';
      }

      var fullPath = path + ".htm";

      if (window.JST && window.JST[fullPath]) {
        return makeTemplate(window.JST[fullPath]());
      }

      var done = this.async();

      $.get(fullPath, function(contents) {
        done(makeTemplate(contents));
      }, "text");
    }
  });

  app.init();
});