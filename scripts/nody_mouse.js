// future, more than one click handler?
function MouseListener_onLeftDown(x, y) {
   var hitNode = Nody.node_mouseLeftDown = ndFindNodeAt(x,y);
   var reg = Nody.listenerRegistry.onMouseLeftDown;

   _callRegisteredNodes(reg, hitNode, x, y);
}

function MouseListener_onLeftUp(x, y) {
   var hitNode = ndFindNodeAt(x,y);
   var reg = Nody.listenerRegistry.onMouseLeftUp;

   _callRegisteredNodes(reg, hitNode, x, y);

   if (Nody.node_mouseLeftDown != null && Nody.node_mouseLeftDown.id == hitNode.id) {
      // we registered a click
      reg = Nody.listenerRegistry.onMouseLeftClick;
      _callRegisteredNodes(reg, hitNode, x, y);
   }

   Nody.node_mouseLeftDown = null;
}

function _callRegisteredNodes(reg, node, x, y) {
   for ( var nodeId in reg) {
      if (nodeId == node.id) {
         var cb = reg[nodeId];

         cb.call(node, x, y);
         break;
      }
   }
}
