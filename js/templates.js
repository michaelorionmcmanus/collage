this["JST"] = this["JST"] || {};

this["JST"]["templates/AudioNodeControlView.htm"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-header">\n  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n  <h3 id="myModalLabel">Audio Node Settings</h3>\n</div>\n<div class="modal-body">\n  <form class="form-horizontal">\n    <div class="control-group">\n      <label class="control-label" for="rolloffFactor">Rolloff Factor</label>\n      <div class="controls">\n        <div class="input-append">\n          <input type="number" id="rollofFactor" name="rolloffFactor">\n          <button type="button" class="btn btn-primary" data-toggle="popover" data-placement="left" data-content="Describes how quickly the volume is reduced as source moves away from listener." title="" data-original-title="Rolloff Factor"><i class=" icon-info-sign icon-white"/></button>\n        </div>\n      </div>\n    </div>\n    <div class="control-group">\n      <label class="control-label" >Orientation</label>\n      <div class="controls">\n        X: <input type="number" class="input-mini" name="orientationX"/> Y: <input type="number" class="input-mini" name="orientationY"/> Z: <input type="number" class="input-mini" name="orientationZ"/>\n      </div>\n    </div>\n    <div class="control-group">\n      <label class="control-label" >Cones</label>\n      <div class="controls">\n        Inner: <input type="number" class="input-mini" name="coneInnerAngle"/> Outer: <input type="number" class="input-mini" name="coneOuterAngle"/>\n      </div>\n    </div>\n  </form>\n</div>\n<div class="modal-footer">\n  <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Close</button>\n</div>';

}
return __p
};

this["JST"]["templates/Stage.htm"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="stage">\n  <div id="listener"></div>\n</div>';

}
return __p
};