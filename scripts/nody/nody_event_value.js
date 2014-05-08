var ValueEvent = {
     ON_X: 'ON_X'
   , ON_Y: 'ON_Y'
   , ON_W: 'ON_W'
   , ON_H: 'ON_H'

   , ON_ACTIVE: 'ON_ACTIVE'

   , ON_KID_ADD:     'ON_KID_ADD'
   , ON_KID_REMOVE:  'ON_KID_REMOVE'
};

var ValueRegistry = {
     ON_X:           {} // targetNode.x : [ {callback, listenerNode} ]
   , ON_Y:           {}
   , ON_W:           {}
   , ON_H:           {}

   , ON_ACTIVE:           {}
   
   , ON_KID_ADD:     {}
   , ON_KID_REMOVE:  {}
};

function ndRegisterValue(event, targetNode, cb) {
   if (ValueRegistry[event][targetNode.id] === undefined)   
      ValueRegistry[event][targetNode.id] = [];

   var obj = {cb:cb, listenerNode:ndThis()};

   ValueRegistry[event][targetNode.id].push(obj);
}

function ndFireValue(event, targetNode, oldValue, newValue) {
   var callbacksByTargetNodeId = ValueRegistry[event];

   if (targetNode.id in callbacksByTargetNodeId) {
      var list = callbacksByTargetNodeId[targetNode.id];

      for (var i = 0; i < list.length; i++) {
         var elem = list[i]; // {cb, listenerNode}

         return elem.cb.call(elem.listenerNode, targetNode, oldValue, newValue);
      }
   }
}
