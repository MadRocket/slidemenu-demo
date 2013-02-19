function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.leftmenu = A$(Ti.UI.createView({
        backgroundColor: "white",
        width: "250",
        id: "leftmenu"
    }), "View", null);
    $.addTopLevelView($.__views.leftmenu);
    $.__views.__alloyId1 = A$(Ti.UI.createLabel({
        text: "I'm Left",
        id: "__alloyId1"
    }), "Label", $.__views.leftmenu);
    $.__views.leftmenu.add($.__views.__alloyId1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;