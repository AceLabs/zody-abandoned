function _ndHasGlobalKid(node) {
   for (var i = 0; i < node.kids.length; i++ ) {
      var kid = node.kids[i];

      if (kid.clipped == false || _ndHasGlobalKid(kid))
         return true;
   }

   return false;
}

function _ndNodeDim(node) {
   return {x:node.x, y:node.y, w:node.w, h:node.h};
}

function _ndIsHit(x, y, screenRegion) {
    return  x >= screenRegion[0] && y >= screenRegion[1] && x < screenRegion[0] + screenRegion[2] && y < screenRegion[1] + screenRegion[3];
}

