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
  require([
    'app',
    'backbone.layoutmanager'
  ], function(
    app,
    LayoutManager ) {
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
          if(path) {
            path = prefix + path;
          }
        }

        // To bypass fetching a template altogether if one is not needed, a
        // view can specify false or an empty string as the path
        if (!path) {
          return '';
        }

        var done = this.async();

        $.get(path + ".htm", function(contents) {
          done(Handlebars.compile(contents));
        });
      }

//      partial: function($root, $el, rentManager, manager) {
//        // If selector is specified, attempt to find it.
//        if (manager.selector) {
//          $root = $root[rentManager.noel ? "filter" : "find"]('[data-view-target=' + manager.selector + ']');
//        }
//
//        // Use the insert method if insert argument is true.
//        if (manager.insert) {
//          this.insert($root, $el);
//        } else if (!!this.renderInPlace) {
//          // Do nothing. Re-render the view in-place.
//        } else {
//          this.html($root, $el);
//        }
//      }
    });

    app.init();
  });
});