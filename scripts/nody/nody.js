include('nody/nody_init');
include('nody/nody_plugin');
include('nody/nody_event');
include('nody/nody_event_value');
include('nody/nody_mouse');
include('nody/nody_listeners');
include('nody/nody_private');
include('nody/nody_spacial');

var ND_NODY = {
   root: null,

   _nodeStack: [],
   _curNode: null,
   _nodeById: {},

   _nextId: 0
};

function ndNextId() {
    if ( ND_NODY._nextId > 65000 ) {
        print('Next ID is too large!! See nody.js');
        throw 'Next ID is too large!! See nody.js';
    }

    return ND_NODY._nextId++;
}

function ndPeek() {
    return ND_NODY._nodeStack[ ND_NODY._nodeStack.length - 1 ];
}

function ndThis() {
   return ND_NODY._curNode;
}

function ndVar(name, value) {
   ND_NODY._curNode[name] = value;
}

function ndNew(parent, id) {
   var node = {
        id: id

      , active: true

      , nudgeX: 0
      , nudgeY: 0

      , paddingX: 0
      , paddingY: 0

      , clipped: true
      , parent: null
      , kids: []
      , clipPadding: 0

      , _x: 0
      , _y: 0
      , _w: 0
      , _h: 0

      , borderColor: [1, 1, 1]
      , color: [1, 1, 1]

      , text: null
      , textColor: [1, 1, 1]
      , textX: 0
      , textY: 0
      , fontName: 'courier'
      , fontStyle: 'default'
      , fontSize: 10

      // opacity: 1 for performance reasons, it is better to leave it undefined that '1' (for fully visible)

      // x
      , set x(newValue){
         this._set('_x', ValueEvent.ON_X, newValue);
      }

      , get x(){ return this._x; }

      // y
      , set y(newValue){
         this._set('_y', ValueEvent.ON_Y, newValue);
      }

      , get y(){ return this._y; }

      // w
      , set w(newValue){
         this._set('_w', ValueEvent.ON_W, newValue);
      }

      , get w(){ return this._w; }

      // h
      , set h(newValue){
         this._set('_h', ValueEvent.ON_H, newValue);
      }

      , get h(){ return this._h; }

      // active
      , set active(newValue){
         this._set('_active', ValueEvent.ON_ACTIVE, newValue);
      }

      , get active(){ return this._active; }

      // -------------------------------------------------

      , _set: function(varname, event, newValue) {
            var oldValue = this[varname];
            var mod = ndFireValue(event, this, oldValue, newValue);

            if (mod === undefined)
               mod = newValue;

            if (mod != oldValue)
               this[varname] = mod;
      }
   };

   node.parent = parent;

   if (parent != null) {
      parent.kids.push(node);

      ndFireValue(ValueEvent.ON_KID_ADD, parent, node);
   }

   return node;
}

function ndBegin(id) {
   id = id || ndNextId();

   ND_NODY._curNode = ndNew(ND_NODY._curNode, id);

   ND_NODY._nodeStack.push(ND_NODY._curNode);

   ND_NODY._nodeById[id] = ND_NODY._curNode;
}

function ndById(id) {
    return ND_NODY._nodeById[id];
}

function ndClipPadding(padding) {
    ND_NODY._curNode.clipPadding = padding;
}

function ndClipped(clipped) {
    ND_NODY._curNode.clipped = clipped;
}

function ndNudge(nudgeX, nudgeY) {
    ND_NODY._curNode.nudgeX = nudgeX;
    ND_NODY._curNode.nudgeY = nudgeY;
}

function ndPadding(paddingX, paddingY) {
    ND_NODY._curNode.paddingX = paddingX;
    ND_NODY._curNode.paddingY = paddingY;
}

function ndPos(x, y) {
    ND_NODY._curNode.x = x;
    ND_NODY._curNode.y = y;
}

function ndDim(w, h) {
    ND_NODY._curNode.w = w;
    ND_NODY._curNode.h = h;
}

function ndBorderColor(r,g,b) {
    ND_NODY._curNode.borderColor = [r, g, b];
}

function ndColor(r,g,b) {
    ND_NODY._curNode.color = [r, g, b];
}

function ndTextColor(r,g,b) {
    ND_NODY._curNode.textColor = [r, g, b];
}

function ndText(text) {
    ND_NODY._curNode.text = text;
}

function ndFontName(name) {
    ND_NODY._curNode.fontName = name;
}

function ndFontStyle(style) {
    ND_NODY._curNode.fontStyle = style;
}

function ndFontSize(size) {
    ND_NODY._curNode.fontSize = size;
}

function ndOpacity(opacity) {
    ND_NODY._curNode.opacity = opacity;
}

function ndTextPos(x, y) {
    ND_NODY._curNode.textX = x;
    ND_NODY._curNode.textY = y;
}

function ndEnd() {
   var newKid = ND_NODY._curNode;

   ND_NODY._nodeStack.pop();
   ND_NODY._curNode = ndPeek();

//   ndFireValue(Event.KID_ADD, newKid.parent, newKid);
}

function ndFindNodeAt(x,y) {
    // this function will be affected by introduction of the following tags
    //visible
    //clip
    //global pos kids

    var root = ND_NODY.root;
    var screenRegion = [root.x, root.y, root.w, root.h];

    return _ndFindNodeAt(x,y,root,screenRegion,screenRegion) || root;
}

function ndGetParentPos(node) {
   if (node.parent == null)
      return [0,0];

   return ndGetPos(node.parent);
}

function ndGetPos(node) {
   var parent = node.parent;

   if (parent == null)
      return [node.x, node.y];

   var parentPos = ndGetPos(parent);

   return [node.x + parentPos[0] + parent.paddingX, node.y + parentPos[1] +  + parent.paddingY];
}
