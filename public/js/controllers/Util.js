Collage.Util = {
  // Find a point between two points, the distance from point 2.
  getArcPoint: function(p1, p2, distance) {
    var vx = p2.x - p1.x;
    var vy = p2.y - p1.y;
    var mag = Math.sqrt(vx*vx + vy*vy);
    vx /= mag;
    vy /= mag;

    var px = p1.x + vx * (mag + distance);
    var py = p1.y + vy * (mag + distance);

    return {x: px, y: py};
  },
  HandleFileSelect: function(evt) {
    var deferred = Q.defer();
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var buffer = e.target.result;
          deferred.resolve(buffer, e);
        }
      })(f);
      // Read in the image file as a data URL.
      reader.readAsArrayBuffer(f);
    }
    return deferred.promise;
  }
}
