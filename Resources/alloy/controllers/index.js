function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.menu = Alloy.createWidget("com.madrocket.ti.slidemenu", "widget", {
        id: "menu",
        __parentSymbol: $.__views.index
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
    content.lb.addEventListener("singletap", function() {
        $.menu.toggleLeftDrawer();
    });
    content.rb.addEventListener("singletap", function() {
        $.menu.toggleRightDrawer();
    });
    $.menu.on("open:[left]", function() {
        console.log("left");
    });
    $.menu.on("close:[left]", function() {
        console.log("left");
    });
    $.menu.on("open:[right]", function() {
        console.log("left");
    });
    $.menu.on("close:[right]", function() {
        console.log("left");
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;