var content = Alloy.createController('content');
$.menu.init({
  leftDrawer:  Alloy.createController('leftmenu').getView(),
  rightDrawer:  Alloy.createController('rightmenu').getView(),
  content: content.getView()
});

$.menu.content.width = 320;

content.lb.addEventListener('singletap', function(){
  $.menu.toggleLeftDrawer();
});
content.rb.addEventListener('singletap', function(){
  $.menu.toggleRightDrawer();
});

$.menu.on('open:[left]', function(){
    console.log('left');
});
$.menu.on('close:[left]', function(){
    console.log('left');
});
$.menu.on('open:[right]', function(){
    console.log('left');
});
$.menu.on('close:[right]', function(){
    console.log('left');
});

$.index.open();
