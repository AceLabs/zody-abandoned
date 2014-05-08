var ND_MOUSE = {
   node: null,
   lastNode_mouseLeftDown: null,
   lastNode_mouseMove: null
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

   ndFireAtNode(Event.MOUSE_MOVE, hitNode, x, y);

   if (hitNode != ND_MOUSE.lastNode_mouseMove) {
      if (ND_MOUSE.lastNode_mouseMove)
         ndFireAtNode(Event.MOUSE_EXIT, ND_MOUSE.lastNode_mouseMove, x, y);

      ndFireAtNode(Event.MOUSE_ENTER, hitNode, x, y);

      ND_MOUSE.lastNode_mouseMove = hitNode;
   }
}

function MouseListener_onLeftDown(x, y) {
   var mouseNode = ndGetMouseCapturedNode();

   var hitNode = ND_MOUSE.lastNode_mouseLeftDown = mouseNode || ndFindNodeAt(x,y);

   ndFireAtNode(Event.MOUSE_LEFT_DOWN, hitNode, x, y);
}

function MouseListener_onLeftUp(x, y) {
   var mouseNode = ndGetMouseCapturedNode();
   var hitNode = mouseNode || ndFindNodeAt(x,y);

   ndFireAtNode(Event.MOUSE_LEFT_UP, hitNode, x, y);

   if (ND_MOUSE.lastNode_mouseLeftDown != null && ND_MOUSE.lastNode_mouseLeftDown.id == hitNode.id) {
      ndFireAtNode( Event.MOUSE_LEFT_CLICK, hitNode, x, y);
   }

   ND_MOUSE.lastNode_mouseLeftDown = null;
}
