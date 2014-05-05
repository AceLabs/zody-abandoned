function vertical_init() {
   var varname = arguments[1];
   var space = {};
   ndVar(varname, space);

   ndRegister(Event.KID_ADD, function (kid) {
      var curY = 5;
      var parent = kid.parent;

      for (var i = 0; i < parent.kids.length; i++) {
         var k = parent.kids[i];

         k.y = curY;

         curY += k.h + 5;
      }
   });
}