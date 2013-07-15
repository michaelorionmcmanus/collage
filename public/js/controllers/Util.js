Collage.Util = {
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
