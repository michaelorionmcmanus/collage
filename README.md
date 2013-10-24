Collage

A Backbone based app that allows users to plot and listen to sounds in "3D" space.

This is a fun little project that I developed in order to play with the Web Audio API and experiment with Backbone libraries and plugins.

A running example lives at: http://code.michaelmcman.us/collage/

To use:

* Double click anywhere on the stage to drop a "node".
* Double click the node's big orange middle area to open a file dialog, which can be used to select an audio file.
* The file will load and start running on a loop. 
* Drag the node around the "listener" (the big blue dot in the middle) to produce spatial effects.

Use headphone for best results.

=======
Sound in Space
## Quick Start
1. `npm install --save-dev`
1. `bower update && bower install`
1. `grunt sass`
1. `grunt connect`
1. Browser to `http://localhost:9001/public`

### Dependencies
1. grunt-cli
1. bower
1. Ruby sass gem
