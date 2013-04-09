function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.madrocket.ti.slidemenu/" + s : s.substring(0, index) + "/com.madrocket.ti.slidemenu/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("com.madrocket.ti.slidemenu");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.slideMenu = Ti.UI.createWindow({
        id: "slideMenu"
    });
    $.__views.slideMenu && $.addTopLevelView($.__views.slideMenu);
    $.__views.leftDrawer = Ti.UI.createWindow({
        id: "leftDrawer",
        top: "0",
        left: "0",
        zIndex: "1"
    });
    $.__views.slideMenu.add($.__views.leftDrawer);
    $.__views.content = Ti.UI.createWindow({
        id: "content",
        top: "0",
        left: "0",
        zIndex: "10"
    });
    $.__views.slideMenu.add($.__views.content);
    $.__views.rightDrawer = Ti.UI.createWindow({
        id: "rightDrawer",
        top: "0",
        left: "0",
        zIndex: "1"
    });
    $.__views.slideMenu.add($.__views.rightDrawer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drawer = {
        is_opened: false,
        initialize: function(content) {
            this.setWidth(content.width);
            this.add(content);
        },
        openDrawer: function() {
            this.fireEvent("open");
            $.content.animate(this.getDrawerOpenAnimation());
            this.is_opened = true;
        },
        closeDrawer: function() {
            this.fireEvent("close");
            $.content.animate(this.getDrawerCloseAnimation());
            this.is_opened = false;
        },
        toggleDrawer: function() {
            this.is_opened ? this.closeDrawer() : this.openDrawer();
        }
    };
    _.extend($.leftDrawer, drawer, {
        getDrawerOpenAnimation: function() {
            var width = this.width;
            return Ti.UI.createAnimation({
                left: width,
                curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
                duration: 150
            });
        },
        getDrawerCloseAnimation: function() {
            return Ti.UI.createAnimation({
                left: 0,
                curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
                duration: 150
            });
        }
    });
    _.extend($.rightDrawer, drawer, {
        getDrawerOpenAnimation: function() {
            var width = this.width;
            return Ti.UI.createAnimation({
                left: -width,
                curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
                duration: 150
            });
        },
        getDrawerCloseAnimation: function() {
            return Ti.UI.createAnimation({
                left: 0,
                curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
                duration: 150
            });
        }
    });
    var touchStartX = 0;
    var touchStarted = false;
    $.content.addEventListener("touchstart", function(event) {
        touchStartX = parseInt(event.x, 10);
        touchStarted = true;
    });
    $.content.addEventListener("touchend", function(event) {
        touchStarted = false;
        event.source.convertPointToView({
            x: event.x,
            y: event.y
        }, $.slideMenu);
        var touchEndX = parseInt(event.x, 10);
        var delta = touchEndX - touchStartX;
        if (0 == delta) return false;
        if ($.content.left > 0) {
            delta > 10 ? $.leftDrawer.openDrawer() : $.leftDrawer.closeDrawer();
            -5 > delta ? $.leftDrawer.closeDrawer() : $.leftDrawer.openDrawer();
        } else {
            delta > 5 ? $.rightDrawer.closeDrawer() : $.rightDrawer.openDrawer();
            -10 > delta ? $.rightDrawer.openDrawer() : $.rightDrawer.closeDrawer();
        }
    });
    $.content.addEventListener("touchmove", function(event) {
        var coords = event.source.convertPointToView({
            x: event.x,
            y: event.y
        }, $.slideMenu);
        var _x = parseInt(coords.x, 10);
        var newLeft = _x - touchStartX;
        var swipeToRight = newLeft > 0 ? true : false;
        var swipeToLeft = 0 > newLeft ? true : false;
        if (touchStarted) {
            if (swipeToRight) {
                $.leftDrawer.zIndex = 2;
                $.rightDrawer.zIndex = 1;
            } else {
                $.leftDrawer.zIndex = 1;
                $.rightDrawer.zIndex = 2;
            }
            (swipeToRight && $.leftDrawer.width >= newLeft || swipeToLeft && newLeft >= -$.rightDrawer.width) && ($.content.left = newLeft);
        }
        newLeft > 10 && (touchStarted = true);
    });
    $.leftDrawer.addEventListener("open", function() {
        $.rightDrawer.is_opened = false;
        $.leftDrawer.zIndex = 2;
        $.rightDrawer.zIndex = 1;
        $.trigger("open:[left]");
    });
    $.leftDrawer.addEventListener("close", function() {
        $.trigger("close:[left]");
    });
    $.rightDrawer.addEventListener("open", function() {
        $.leftDrawer.is_opened = false;
        $.leftDrawer.zIndex = 1;
        $.rightDrawer.zIndex = 2;
        $.trigger("open:[right]");
    });
    $.rightDrawer.addEventListener("close", function() {
        $.trigger("close:[right]");
    });
    exports.init = function(options) {
        options.hasOwnProperty("leftDrawer") ? $.leftDrawer.initialize(options.leftDrawer) : $.slideMenu.remove($.leftDrawer);
        options.hasOwnProperty("rightDrawer") ? $.rightDrawer.initialize(options.rightDrawer) : $.slideMenu.remove($.rightDrawer);
        $.content.add(options.content);
    };
    exports.toggleRightDrawer = function() {
        $.rightDrawer.toggleDrawer();
    };
    exports.toggleLeftDrawer = function() {
        $.leftDrawer.toggleDrawer();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;