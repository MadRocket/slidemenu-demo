function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "com.madrocket.ti.slidemenu/" + s : s.substring(0, index) + "/com.madrocket.ti.slidemenu/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.slideMenu = A$(Ti.UI.createWindow({
        id: "slideMenu"
    }), "Window", null);
    $.addTopLevelView($.__views.slideMenu);
    $.__views.leftDrawer = A$(Ti.UI.createWindow({
        id: "leftDrawer",
        top: "0",
        left: "0",
        zIndex: "1"
    }), "Window", $.__views.slideMenu);
    $.__views.slideMenu.add($.__views.leftDrawer);
    $.__views.content = A$(Ti.UI.createWindow({
        id: "content",
        top: "0",
        left: "0",
        zIndex: "10"
    }), "Window", $.__views.slideMenu);
    $.__views.slideMenu.add($.__views.content);
    $.__views.rightDrawer = A$(Ti.UI.createWindow({
        id: "rightDrawer",
        top: "0",
        left: "0",
        zIndex: "1"
    }), "Window", $.__views.slideMenu);
    $.__views.slideMenu.add($.__views.rightDrawer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drawer = {
        is_opened: !1,
        initialize: function(content) {
            this.setWidth(content.width);
            this.add(content);
        },
        openDrawer: function() {
            this.fireEvent("open");
            $.content.animate(this.getDrawerOpenAnimation());
            this.is_opened = !0;
        },
        closeDrawer: function() {
            this.fireEvent("close");
            $.content.animate(this.getDrawerCloseAnimation());
            this.is_opened = !1;
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
    var touchStartX = 0, touchStarted = !1;
    $.content.addEventListener("touchstart", function(event) {
        touchStartX = parseInt(event.x, 10);
        touchStarted = !0;
    });
    $.content.addEventListener("touchend", function(event) {
        touchStarted = !1;
        var coords = event.source.convertPointToView({
            x: event.x,
            y: event.y
        }, $.slideMenu), touchEndX = parseInt(event.x, 10), delta = touchEndX - touchStartX;
        if (delta == 0) return !1;
        if ($.content.left > 0) {
            delta > 10 ? $.leftDrawer.openDrawer() : $.leftDrawer.closeDrawer();
            delta < -5 ? $.leftDrawer.closeDrawer() : $.leftDrawer.openDrawer();
        } else {
            delta > 5 ? $.rightDrawer.closeDrawer() : $.rightDrawer.openDrawer();
            delta < -10 ? $.rightDrawer.openDrawer() : $.rightDrawer.closeDrawer();
        }
    });
    $.content.addEventListener("touchmove", function(event) {
        var coords = event.source.convertPointToView({
            x: event.x,
            y: event.y
        }, $.slideMenu), _x = parseInt(coords.x, 10), newLeft = _x - touchStartX, swipeToRight = newLeft > 0 ? !0 : !1, swipeToLeft = newLeft < 0 ? !0 : !1;
        if (touchStarted) {
            if (swipeToRight) {
                $.leftDrawer.zIndex = 2;
                $.rightDrawer.zIndex = 1;
            } else {
                $.leftDrawer.zIndex = 1;
                $.rightDrawer.zIndex = 2;
            }
            if (swipeToRight && newLeft <= $.leftDrawer.width || swipeToLeft && newLeft >= -$.rightDrawer.width) $.content.left = newLeft;
        }
        newLeft > 10 && (touchStarted = !0);
    });
    $.leftDrawer.on("open", function() {
        $.rightDrawer.is_opened = !1;
        $.leftDrawer.zIndex = 2;
        $.rightDrawer.zIndex = 1;
        $.trigger("open:[left]");
    });
    $.leftDrawer.on("close", function() {
        $.trigger("close:[left]");
    });
    $.rightDrawer.on("open", function() {
        $.leftDrawer.is_opened = !1;
        $.leftDrawer.zIndex = 1;
        $.rightDrawer.zIndex = 2;
        $.trigger("open:[right]");
    });
    $.rightDrawer.on("close", function() {
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

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;