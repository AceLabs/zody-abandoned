include("asserts");
include("bellina");
//include("test/nody_test"); nody_test();

ndBegin('p');
   ndOnMouseEnter(function (x,y) {
   println('Entering ' + this.id);
   });

   ndPos(120,20);
   ndDim(300, 600);
   ndBorderColor(1, 0, 0);
   ndColor(.3, 0, 0);

   ndTextColor(.9, 0, 0);
   ndText('Hello, Bellina!');
   ndTextPos(20, 10);
   ndFontName('courier');
   ndFontStyle('default');
   ndFontSize(40);

   ndOpacity(1);

   ndVar('grab', false);

   ndRegister(Event.MOUSE_ENTER, function (x, y) {
      this.grab = true;
      var screenPos = ndGetPos(this);
      this.diff = [x-screenPos[0], y-screenPos[1]];
      this.origScreen = [x,y];
      this.origScreenN = [this.x,this.y];
   });

   ndRegister(Event.MOUSE_EXIT, function (x, y) {
      this.grab = false;
   });

   ndRegister(Event.MOUSE_MOVE, function (x, y) {
      if (this.grab) {
         var mouseMoved = [x-this.origScreen[0], y-this.origScreen[1]]
         var newN = [mouseMoved[0] + this.origScreenN[0], mouseMoved[1] + this.origScreenN[1]];
         this.x = newN[0];
         this.y = newN[1];
      }
   });

ndBegin('c1');
ndPos(150,100);
ndDim(200, 150);
ndBorderColor(0, 1, 0);
ndColor(0, 0.3, 0);
ndTextColor(0, 0.9, 0);
ndText('Hello, Bellina!');
ndTextPos(20, 10);
ndFontName('courier');
ndFontStyle('default');
ndFontSize(15);
ndOpacity(1);
ndEnd();

ndBegin('c2');
ndPos(150,300);
ndDim(200, 150);
ndBorderColor(0, 1, 0);
ndColor(0, 0.3, 0);
ndTextColor(0, 0.9, 0);
ndText('Wut');
ndTextPos(20, 10);
ndFontName('courier');
ndFontStyle('default');
ndFontSize(15);
ndOpacity(1);
ndEnd();
ndEnd();
