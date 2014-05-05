function assert(actual, expected, msg) {
   if (typeof actual.push != 'undefined') {
      _assertArray(actual, expected, msg);
   }
   else if (expected !== actual) {
      throw 'expected ' + expected + ', but got ' + actual + (msg || '');
   }
}

function _assertArray(actual, expected, msg) {
   var eq = true;

   if (actual.length != expected.length)
      eq = false;
   else {
      for (var i = 0; i < actual.length; i++) {
         if (actual[i] != expected[i]) {
            eq = false;
            break;
         }
      }
   }

   if (!eq) {
      throw 'expected ' + JSON.stringify(expected) + ', but got ' + JSON.stringify(actual) + (msg || '');
   }
}