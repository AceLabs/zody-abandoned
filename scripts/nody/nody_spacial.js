function _ndFindNodeAt(x,y,parent,parentScreenRegion, rootScreenRegion) {
   for (var i = 0; i < parent.kids.length; i++) {
      var kid = parent.kids[i];

      if (kid.clipped) {
         kidScreenRegion = _ndGetClippedRegion(parentScreenRegion, kid, parentScreenRegion);
      }
      else {
         kidScreenRegion = _ndGetClippedRegion(parentScreenRegion, kid, rootScreenRegion);
      }

      if (_ndIsHit(x, y, kidScreenRegion)) {
         return _ndFindNodeAt(x,y,kid,kidScreenRegion, rootScreenRegion) || kid;
      }
      else if (_ndHasGlobalKid(kid) ) {
         var hitNode = _ndFindNodeAt(x,y,kid,kidScreenRegion, rootScreenRegion);

         if (hitNode != null)
            return hitNode;
      }
   }

   return null;
}

function _ndFindGlobalNodeAt(x,y,parent,parentScreenRegion,rootScreenRegion) {
   for (var i = 0; i < parent.kids.length; i++) {
      var kid = parent.kids[i];

      if (!kid.clipped) {
         var kidScreenRegion;

         if (kid.clipped) {
            kidScreenRegion = _ndGetClippedRegion(parentScreenRegion, kid, rootScreenRegion);
         }
         else {
            kidScreenRegion = _ndGetClippedRegion(parentScreenRegion, kid, rootScreenRegion);
         }

   //      if (kid.id == 'c2') {
   //            println('----------------------');
   //         println(JSON.stringify(kidScreenRegion));
   //         println(JSON.stringify([x,y]));
   //         println('is hit ' + _ndIsHit(x, y, kidScreenRegion));
   //      }


         if (_ndIsHit(x, y, kidScreenRegion))
            return _ndFindNodeAt(x,y,kid,kidScreenRegion,rootScreenRegion);
      }
   }

   return null;
}

function _ndGetClippedRegion(parentScreenRegion, kid, clipScreenRegion) {
   var regionEndX = clipScreenRegion[0] + clipScreenRegion[2] - 1;
   var regionEndY = clipScreenRegion[1] + clipScreenRegion[3] - 1;

   var kidScreenX = parentScreenRegion[0] + kid.x + (kid.parent != null ? kid.parent.paddingX : 0);

   if (kidScreenX > regionEndX)
      return [-1,-1,0,0];

   var kidScreenY = parentScreenRegion[1] + kid.y + (kid.parent != null ? kid.parent.paddingY : 0)

   if (kidScreenY > regionEndY)
      return [-1,-1,0,0];

   var kidScreenEndX = kidScreenX + kid.w - 1;

   if (kidScreenEndX < clipScreenRegion[0])
      return [-1,-1,0,0];

   var kidScreenEndY = kidScreenY + kid.h - 1;

   if (kidScreenEndY < clipScreenRegion[1])
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