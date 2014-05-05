var Event = {
     TICK:       'TICK'
   , KID_ADD:       'KID_ADD'

   , MOUSE_MOVE:       'MOUSE_MOVE'
   , MOUSE_LEFT_DOWN:  'MOUSE_LEFT_DOWN'
   , MOUSE_LEFT_UP:    'MOUSE_LEFT_UP'

   , MOUSE_ENTER: 'MOUSE_ENTER'
   , MOUSE_EXIT: 'MOUSE_EXIT'
   , MOUSE_LEFT_CLICK: 'MOUSE_LEFT_CLICK'
};

var Registry = {
     TICK:        {} // callbacks by id
   , KID_ADD:        {} // callbacks by id

   , MOUSE_MOVE:        {} // callbacks by id
   , MOUSE_LEFT_DOWN:   {} // callbacks by id
   , MOUSE_LEFT_UP:     {} // callbacks by id

   , MOUSE_ENTER:  {} // callbacks by id
   , MOUSE_EXIT:  {} // callbacks by id
   , MOUSE_LEFT_CLICK:  {} // callbacks by id
};

function ndOnTick(cb) {
    ndRegister(Event.TICK, cb);
}

function ndOnKidAdd(cb) {
    ndRegister(Event.KID_ADD, cb);
}

function ndOnMouseExit(cb) {
    ndRegister(Event.MOUSE_EXIT, cb);
}

function ndOnMouseEnter(cb) {
    ndRegister(Event.MOUSE_ENTER, cb);
}

function ndOnMouseMove(cb) {
    ndRegister(Event.MOUSE_MOVE, cb);
}

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

   if (callbacksByNodeId[node.id] === undefined )
      return;

   var callbacks = callbacksByNodeId[node.id];

   if (callbacks !== undefined) {
      var x = arguments[2];
      var y = arguments[3];

      for (var i = 0; i < callbacks.length; i++) {
         var cb = callbacks[i];
         cb.call(node, x, y);
      }
   }
}

function ndFire(event) {
   var callbacksByNodeId = Registry[event];

   for (var nodeId in callbacksByNodeId) {
      var callbacks = callbacksByNodeId[nodeId];

      for (var i = 0; i < callbacks.length; i++) {
         var cb = callbacks[i];
         cb.call(node);
      }
   }
}
