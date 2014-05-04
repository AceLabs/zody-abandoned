function MouseListener_onLeftDown(x, y) {
   var hitNode = Nody.node_mouseLeftDown = ndFindNodeAt(x,y);

   ndFireNode(hitNode, Event.MOUSE_LEFT_DOWN, x, y);
}

function MouseListener_onLeftUp(x, y) {
   var hitNode = ndFindNodeAt(x,y);

   ndFireNode(hitNode, Event.MOUSE_LEFT_UP, x, y);

   if (Nody.node_mouseLeftDown != null && Nody.node_mouseLeftDown.id == hitNode.id) {
      ndFireNode(hitNode, Event.MOUSE_LEFT_CLICK, x, y);
   }

   Nody.node_mouseLeftDown = null;
}

