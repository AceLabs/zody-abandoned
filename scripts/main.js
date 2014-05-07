include("bellina/bellina");

//include("asserts"); include("test/nody_test"); nody_test();

ndInit();

ndBegin('p');
   ndPos(120,20);
   ndDim(300, 600);
   ndBorderColor(1, 0, 0);
   ndClipPadding(1);
   ndColor(.3, 0, 0);

   ndTextColor(.9, 0, 0);
   ndText('Hello, Bellina!');
   ndTextPos(20, 10);
   ndFontName('courier');
   ndFontStyle('default');
   ndFontSize(40);

//   ndOpacity(1);

   ndPadding(0,0);


   ndPlugin('draggable', 'drag');

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
//      ndOpacity(1);
      ndPlugin('vibrate', 'vibrate');
      ndPlugin('draggable', 'drag');
   ndEnd();

   ndBegin('c2');
      ndClipPadding(1);
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
      ndClipped(false);

      ndPlugin('draggable', 'drag');


      ndBegin('c3');
         ndPos(50,70);
         ndDim(125, 90);
         ndBorderColor(0, 1, 1);
         ndColor(0, 0.3, .3);
         ndTextColor(0, 0.9, 0);
         ndText(':)');
         ndTextPos(2, 2);
         ndFontName('courier');
         ndFontStyle('default');
         ndFontSize(15);
         ndClipped(false);

         ndPlugin('draggable', 'drag');
      ndEnd();

      ndBegin('c4');
         ndPos(120,30);
         ndDim(80, 125);
         ndBorderColor(1, 1, 0);
         ndColor(0.3, 0.3, 0);
         ndTextColor(0, 0.9, 0);
         ndText(':(');
         ndTextPos(2, 2);
         ndFontName('courier');
         ndFontStyle('default');
         ndFontSize(15);

         ndPlugin('draggable', 'drag');
      ndEnd();

   ndEnd();

ndEnd();


