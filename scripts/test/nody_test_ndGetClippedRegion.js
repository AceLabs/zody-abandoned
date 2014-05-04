function nody_test_ndGetClippedRegion() {
   test_ndGetClippedRegion_0();
   test_ndGetClippedRegion_1();
   test_ndGetClippedRegion_2();
}

function test_ndGetClippedRegion_2() {
   var testId = 'test_ndGetClippedRegion_1';
   var r = _ndGetClippedRegion([0,0,10,10], {x:8,y:8,w:4,h:5});

   assert(r, [8,8,2,2], testId);
//   println(JSON.stringify(r));
}

function test_ndGetClippedRegion_1() {
   var testId = 'test_ndGetClippedRegion_1';
   var r = _ndGetClippedRegion([10,10,10,10], {x:-8,y:-7,w:4,h:5});

   assert(r, [-1,-1,0,0], testId);
//   println(JSON.stringify(r));
}

function test_ndGetClippedRegion_0() {
   var testId = 'test_ndGetClippedRegion_0';
   var r = _ndGetClippedRegion([0,0,10,10], {x:2,y:3,w:4,h:5});

   assert(r, [2,3,4,5], testId);
//   println(JSON.stringify(r));
}