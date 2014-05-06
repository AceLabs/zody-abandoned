include('nody/nody');
include('bellina/bellina_private');

function blRender(node, d, parentScreenPos) {
   var screenPos = [node.x + node.nudgeX + parentScreenPos[0], node.y + node.nudgeY + parentScreenPos[1]];

   d.pushClipRegion( screenPos[0], screenPos[1], node.w, node.h );

   var popOpacity = false;

   if (node['opacity'] !== undefined) {
      d.pushOpacity( node.opacity );
      popOpacity = true;
   }

   if (node['color'] !== undefined ) {
      d.setColor( node.color[0], node.color[1], node.color[2] );
      d.fillRect(screenPos[0], screenPos[1], node.w, node.h);
   }

   _blDrawText(node, d, screenPos);

   _blDrawKids(node.kids, d, screenPos);

   if (node['borderColor'] !== undefined) {
      d.setColor( node.borderColor[0], node.borderColor[1], node.borderColor[2] );
      d.drawRect(screenPos[0], screenPos[1], node.w, node.h);
   }

   if (popOpacity)
      d.popOpacity();

   d.popClipRegion();
}

