include("asserts");
include("bellina");
//include("test/nody_test"); nody_test();

//    ndOnMouseMove(function (x,y) {
//        println('mouse move ' + this.id + ', ' + x + ', ' + y);
//    });

    ndOnMouseEnter(function (x,y) {
        println('Entering ' + this.id);
    });
//
    ndOnMouseExit(function (x,y) {
        println('Exiting ' + this.id);
    });

ndBegin('p');
    ndOnMouseEnter(function (x,y) {
        println('Entering ' + this.id);
    });

    ndOnMouseExit(function (x,y) {
        println('Exiting ' + this.id);
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

//    ndRegister(Event.MOUSE_LEFT_DOWN, function (x, y) {
//      println('Plugin ' + this.id + ', ' + x + ':' + y);
//    });

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
