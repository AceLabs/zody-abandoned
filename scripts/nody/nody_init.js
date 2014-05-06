function ndInit() {
   ndBegin('root');
      ndPos(0,0);
      ndDim(1024,775);
      ndBorderColor(0, 0, 1);
      ndColor(0, 0, 0.3);
      ndTextColor(.9, 0.9, 0.9);
      ndText('This is root');
      ndTextPos(20,20);
      ndFontName('courier');
      ndFontStyle('default');
      ndFontSize(20);
      ndOpacity(1);

      ND_NODY.root = ndThis();
      // Do not put ndEnd() here!!
}