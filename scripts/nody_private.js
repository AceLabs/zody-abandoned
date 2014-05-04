function _ndFindNodeAt(x,y,node,screenRegion) {
   for (var i = 0; i < node.kids.length; i++) {
        var kid = node.kids[i];
        var kidScreenRegion = _ndGetClippedRegion(screenRegion, kid);

        if (_ndIsHit(x, y, kidScreenRegion)) {
            return _ndFindNodeAt(x,y,kid,kidScreenRegion);
        }
    }

    return node;
}

function _ndNodeDim(node) {
   return {x:node.x, y:node.y, w:node.w, h:node.h};
}
function _ndIsHit(x, y, screenRegion) {
    var ishit =  x >= screenRegion[0] && y >= screenRegion[1] && x < screenRegion[0] + screenRegion[2] && y < screenRegion[1] + screenRegion[3];

    return ishit;
}

function _ndGetClippedRegion(screenRegion, kid) {
   var regionEndX = screenRegion[0] + screenRegion[2] - 1;
   var regionEndY = screenRegion[1] + screenRegion[3] - 1;

   var kidScreenX = screenRegion[0] + kid.x;


   if (kidScreenX > regionEndX)
      return [-1,-1,0,0];

   var kidScreenY = screenRegion[1] + kid.y;

   if (kidScreenY > regionEndY)
      return [-1,-1,0,0];

   var kidScreenEndX = kidScreenX + kid.w - 1;

   if (kidScreenEndX < screenRegion[0])
      return [-1,-1,0,0];

   var kidScreenEndY = kidScreenY + kid.h - 1;

   if (kidScreenEndY < screenRegion[1])
      return [-1,-1,0,0];

   if (kidScreenEndX > regionEndX)
      kidScreenEndX = regionEndX;

   if (kidScreenEndY > regionEndY)
      kidScreenEndY = regionEndY;

   var kidW = kidScreenEndX - kidScreenX + 1;
   var kidH = kidScreenEndY - kidScreenY + 1;

   var ret = [kidScreenX, kidScreenY, kidW, kidH];

   return ret;
}