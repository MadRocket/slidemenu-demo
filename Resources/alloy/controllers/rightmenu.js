function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.rightmenu = Ti.UI.createView({
        backgroundColor: "white",
        width: "250",
        id: "rightmenu"
    });
    $.__views.rightmenu && $.addTopLevelView($.__views.rightmenu);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "I'm Right",
        id: "__alloyId2"
    });
    $.__views.rightmenu.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;