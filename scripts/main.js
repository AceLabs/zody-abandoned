include("bellina");

ndBegin();
    ndPos(120,20);
    ndDim(300, 300);
    ndBorderColor(1, 0, 0);
    ndColor(.3, 0, 0);

    ndTextColor(.9, 0, 0);
    ndText('Hello, Bellina!');
    ndTextPos(20, 10);
    ndFontName('courier');
    ndFontStyle('default');
    ndFontSize(40);

    ndOpacity(1);

    ndBegin();
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
ndEnd();