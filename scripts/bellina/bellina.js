include('nody/nody');
include('bellina/bellina_private');

function blRender(node, d, parentScreenPos) {
   if (!node.clipped)
      d.pushInfiniteClipRegion();

   var screenPos = [node.x + node.nudgeX + parentScreenPos[0], node.y + node.nudgeY + parentScreenPos[1]];

   if (node.clipPadding > 0)
      _blRender_clip_padding(node, d, screenPos);
   else
      _blRender_no_clip_padding(node, d, screenPos);

   if (!node.clipped)
      d.popClipRegion();
}

function _blRender_clip_padding(node, d, screenPos) {
   d.pushClipRegion( screenPos[0] + node.clipPadding, screenPos[1] + node.clipPadding, node.w - node.clipPadding - node.clipPadding, node.h - node.clipPadding - node.clipPadding);

   var popOpacity = false;

   if (node['opacity'] !== undefined) {
      d.pushOpacity( node.opacity );
      popOpacity = true;
   }

   if (node['color'] !== undefined ) {
      d.setColor( node.color[0], node.color[1], node.color[2] );
      d.fillRect(screenPos[0], screenPos[1], node.w, node.h);
   }

   if (node['borderColor'] !== undefined) {
      d.popClipRegion();
      d.pushClipRegion( screenPos[0], screenPos[1], node.w, node.h);
         d.setColor( node.borderColor[0], node.borderColor[1], node.borderColor[2] );
         d.drawRect(screenPos[0], screenPos[1], node.w, node.h);
      d.popClipRegion();
      d.pushClipRegion( screenPos[0] + node.clipPadding, screenPos[1] + node.clipPadding, node.w - node.clipPadding - node.clipPadding, node.h - node.clipPadding - node.clipPadding);
   }

   _blDrawText(node, d, screenPos);

   if (node['kids'] !== undefined)
      _blDrawKids(node.kids, d, screenPos);

   d.popClipRegion();

   if (popOpacity)
      d.popOpacity();
}

function _blRender_no_clip_padding(node, d, screenPos) {
   d.pushClipRegion( screenPos[0], screenPos[1], node.w, node.h);

   var popOpacity = false;

   if (node['opacity'] !== undefined) {
      d.pushOpacity( node.opacity );
      popOpacity = true;
   }

   if (node['color'] !== undefined ) {
      d.setColor( node.color[0], node.color[1], node.color[2] );
      d.fillRect(screenPos[0], screenPos[1], node.w, node.h);
   }

   if (node['borderColor'] !== undefined) {
      d.setColor( node.borderColor[0], node.borderColor[1], node.borderColor[2] );
      d.drawRect(screenPos[0], screenPos[1], node.w, node.h);
   }

   _blDrawText(node, d, screenPos);

   if (node['kids'] !== undefined)
      _blDrawKids(node.kids, d, screenPos);

   if (popOpacity)
      d.popOpacity();

   d.popClipRegion();
}
