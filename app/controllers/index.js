var content = Alloy.createController('content');
$.menu.init({
  leftDrawer:  Alloy.createController('leftmenu').getView(),
  rightDrawer:  Alloy.createController('rightmenu').getView(),
  content: content.getView()
});

$.menu.content.width = 320;

content.lb.on('singletap', function(){
  $.menu.toggleLeftDrawer();
});
content.rb.on('singletap', function(){
  $.menu.toggleRightDrawer();
});

$.menu.on('open:[left]', function(){});
$.menu.on('close:[left]', function(){});
$.menu.on('open:[right]', function(){});
$.menu.on('close:[right]', function(){});

$.index.open();
