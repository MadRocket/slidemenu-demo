function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.rightmenu = A$(Ti.UI.createView({
        backgroundColor: "white",
        width: "250",
        id: "rightmenu"
    }), "View", null);
    $.addTopLevelView($.__views.rightmenu);
    $.__views.__alloyId2 = A$(Ti.UI.createLabel({
        text: "I'm Right",
        id: "__alloyId2"
    }), "Label", $.__views.rightmenu);
    $.__views.rightmenu.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;