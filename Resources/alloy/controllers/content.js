function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.content = A$(Ti.UI.createView({
        backgroundColor: "red",
        layout: "vertical",
        id: "content"
    }), "View", null);
    $.addTopLevelView($.__views.content);
    $.__views.lb = A$(Ti.UI.createButton({
        title: "Hello, Left",
        width: "100%",
        id: "lb"
    }), "Button", $.__views.content);
    $.__views.content.add($.__views.lb);
    $.__views.rb = A$(Ti.UI.createButton({
        title: "Hello, Right",
        width: "100%",
        id: "rb"
    }), "Button", $.__views.content);
    $.__views.content.add($.__views.rb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;