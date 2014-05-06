var ND_MOUSE = {
   node: null
};

function ndCaptureMouse(node) {
   ND_MOUSE.node = node;
}

function ndReleaseMouse(node) {
   if (node.id === ND_MOUSE.node.id)
      ND_MOUSE.node = null;
}

function ndGetMouseCapturedNode() {
   return ND_MOUSE.node;
}

function MouseListener_onMove(x, y) {
   var mouseNode = ndGetMouseCapturedNode();

   var hitNode = mouseNode || ndFindNodeAt(x,y);

   ndFireNode(hitNode, Event.MOUSE_MOVE, x, y);

   if (hitNode != Nody._node_mouseMove) {
      if (Nody._node_mouseMove)
         ndFireNode(Nody._node_mouseMove, Event.MOUSE_EXIT, x, y);

      ndFireNode(hitNode, Event.MOUSE_ENTER, x, y);

      Nody._node_mouseMove = hitNode;
   }
}

function MouseListener_onLeftDown(x, y) {
   var mouseNode = ndGetMouseCapturedNode();

   var hitNode = Nody._node_mouseLeftDown = mouseNode || ndFindNodeAt(x,y);

   ndFireNode(hitNode, Event.MOUSE_LEFT_DOWN, x, y);
}

function MouseListener_onLeftUp(x, y) {
   var mouseNode = ndGetMouseCapturedNode();
   var hitNode = mouseNode || ndFindNodeAt(x,y);

   ndFireNode(hitNode, Event.MOUSE_LEFT_UP, x, y);

   if (Nody._node_mouseLeftDown != null && Nody._node_mouseLeftDown.id == hitNode.id) {
      ndFireNode(hitNode, Event.MOUSE_LEFT_CLICK, x, y);
   }

   Nody._node_mouseLeftDown = null;
}
