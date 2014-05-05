var ValueEvent = {
     ON_X: 'ON_X'
};

var ValueRegistry = {
     ON_X:  {} // targetNode.x : [ {callback, listenerNode} ]
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
