function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.leftmenu = Ti.UI.createView({
        backgroundColor: "white",
        width: "250",
        id: "leftmenu"
    });
    $.__views.leftmenu && $.addTopLevelView($.__views.leftmenu);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        text: "I'm Left",
        id: "__alloyId1"
    });
    $.__views.leftmenu.add($.__views.__alloyId1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;