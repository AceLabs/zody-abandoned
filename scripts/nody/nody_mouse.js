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

   ndFireNode(hitNode, Event.MOUSE_MOVE, x, y);

   if (hitNode != ND_MOUSE.lastNode_mouseMove) {
      if (ND_MOUSE.lastNode_mouseMove)
         ndFireNode(ND_MOUSE.lastNode_mouseMove, Event.MOUSE_EXIT, x, y);

      ndFireNode(hitNode, Event.MOUSE_ENTER, x, y);

      ND_MOUSE.lastNode_mouseMove = hitNode;
   }
}

function MouseListener_onLeftDown(x, y) {
   var mouseNode = ndGetMouseCapturedNode();

   var hitNode = ND_MOUSE.lastNode_mouseLeftDown = mouseNode || ndFindNodeAt(x,y);

   ndFireNode(hitNode, Event.MOUSE_LEFT_DOWN, x, y);
}

function MouseListener_onLeftUp(x, y) {
   var mouseNode = ndGetMouseCapturedNode();
   var hitNode = mouseNode || ndFindNodeAt(x,y);

   ndFireNode(hitNode, Event.MOUSE_LEFT_UP, x, y);

   if (ND_MOUSE.lastNode_mouseLeftDown != null && ND_MOUSE.lastNode_mouseLeftDown.id == hitNode.id) {
      ndFireNode(hitNode, Event.MOUSE_LEFT_CLICK, x, y);
   }

   ND_MOUSE.lastNode_mouseLeftDown = null;
}
