var Event = {
   MOUSE_LEFT_DOWN:  'MOUSE_LEFT_DOWN',
   MOUSE_LEFT_UP:    'MOUSE_LEFT_UP',
   MOUSE_LEFT_CLICK: 'MOUSE_LEFT_CLICK'
};

var Registry = {
   MOUSE_LEFT_DOWN: {} // callbacks by id
   , MOUSE_LEFT_UP: {} // callbacks by id
   , MOUSE_LEFT_CLICK: {} // callbacks by id
};

function ndOnMouseLeftDown(cb) {

    ndRegister(Event.MOUSE_LEFT_DOWN, cb);
}

function ndOnMouseLeftUp(cb) {
    ndRegister(Event.MOUSE_LEFT_UP, cb);
}

function ndOnMouseLeftClick(cb) {
    ndRegister(Event.MOUSE_LEFT_CLICK, cb);
}

function ndRegister(event, cb) {
   node = ndThis();

   if (Registry[event][node.id] === undefined)
      Registry[event][node.id] = [];

   Registry[event][node.id].push(cb);
}

function ndFireNode(node, event) {
   var callbacksByNodeId = Registry[event];
   var callbacks = callbacksByNodeId[node.id];

   if (callbacks!== undefined) {
      var x = arguments[2];
      var y = arguments[3];

      for (var i = 0; i < callbacks.length; i++) {
         var cb = callbacks[i];
         cb.call(node, x, y);
      }
   }
}
