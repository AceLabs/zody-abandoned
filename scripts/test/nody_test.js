include('test/asserts');
include('test/nody_test_ndGetClippedRegion');

function nody_test() {
   try {
      nody_test_ndGetClippedRegion();
   }
   catch(e) {
      println('There was an ERROR in Test: ' + e);
   }
}