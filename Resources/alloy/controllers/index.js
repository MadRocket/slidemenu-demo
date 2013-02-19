function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.menu = Alloy.createWidget("com.madrocket.ti.slidemenu", "widget", {
        id: "menu"
    });
    $.__views.menu.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var content = Alloy.createController("content");
    $.menu.init({
        leftDrawer: Alloy.createController("leftmenu").getView(),
        rightDrawer: Alloy.createController("rightmenu").getView(),
        content: content.getView()
    });
    $.menu.content.width = 320;
    content.lb.on("singletap", function() {
        $.menu.toggleLeftDrawer();
    });
    content.rb.on("singletap", function() {
        $.menu.toggleRightDrawer();
    });
    $.menu.on("open:[left]", function() {});
    $.menu.on("close:[left]", function() {});
    $.menu.on("open:[right]", function() {});
    $.menu.on("close:[right]", function() {});
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;