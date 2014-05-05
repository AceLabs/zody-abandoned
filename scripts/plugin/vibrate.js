function vibrate_init() {
   var varname = arguments[1];
   var space = {};
   ndVar(varname, space);

   var node = ndThis();
   var x = node.x;
   var y = node.y;

   ndRegister(Event.TICK, function () {
      node.x = x + Math.random() * 5;
      node.y = y + Math.random() * 5;
   });
}