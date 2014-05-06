function draggable_init() {
   var varname = arguments[1];
   var space = {grab:false};

   ndVar(varname, space);

   ndRegister(Event.MOUSE_LEFT_DOWN, function (x, y) {
      space.grab = true;
      var screenPos = ndGetPos(this);
      space.diff = [x-screenPos[0], y-screenPos[1]];
      space.origScreen = [x,y];
      space.origScreenN = [this.x,this.y];
      ndCaptureMouse(this);
   });

   ndRegister(Event.MOUSE_LEFT_UP, function (x, y) {
      if (space.grab) {
         space.grab = false;
         ndReleaseMouse(this);
      }
   });

   ndRegister(Event.MOUSE_MOVE, function (x, y) {
      if (space.grab) {
         var mouseMoved = [x-space.origScreen[0], y-space.origScreen[1]]
         var newN = [mouseMoved[0] + space.origScreenN[0], mouseMoved[1] + space.origScreenN[1]];
         this.x = newN[0];
         this.y = newN[1];
      }
   });
}