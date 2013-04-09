function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.content = Ti.UI.createView({
        backgroundColor: "red",
        layout: "vertical",
        id: "content"
    });
    $.__views.content && $.addTopLevelView($.__views.content);
    $.__views.lb = Ti.UI.createButton({
        title: "Hello, Left",
        width: "100%",
        id: "lb"
    });
    $.__views.content.add($.__views.lb);
    $.__views.rb = Ti.UI.createButton({
        title: "Hello, Right",
        width: "100%",
        id: "rb"
    });
    $.__views.content.add($.__views.rb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;