function vibrate_init() {
   var varname = arguments[1];
   var space = {};
   ndVar(varname, space);

   var node = ndThis();

   ndRegister(Event.TICK, function () {
      node.nudgeX = Math.random() * 5;
      node.nudgeY = Math.random() * 5;
   });
}