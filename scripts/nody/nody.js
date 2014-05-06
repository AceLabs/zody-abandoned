include('nody/nody_init');
include('nody/nody_plugin');
include('nody/nody_event');
include('nody/nody_event_value');
include('nody/nody_mouse');
include('nody/nody_listeners');
include('nody/nody_private');

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
      , clipped: true
      , nudgeX: 0
      , nudgeY: 0
      , parent: null
      , kids: []
      , clipPadding: 0,

      y: 0,
      w: 0,
      h: 0,
      borderColor: [0, 0, 1],
      color: [0, 0, 0.3],
      textColor: [.9, 0.9, 0.9],
      text: 'This is root',
      textX: 20,
      textY: 20,
      fontName: 'courier',
      fontStyle: 'default',
      fontSize: 20,
      opacity: 1,

      set x(i){
         var orig = this._x;
         var mod = ndFireValue(ValueEvent.ON_X, this, orig, i);

         if (mod === undefined)
            mod = i;

         if (mod != orig)
            this._x = mod;
      },

      get x(){ return this._x; }
   };

   node.parent = parent;

   if (parent != null)
      parent.kids.push(node);

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
    Nody._curNode.clipPadding = padding;
}

function ndClipped(clipped) {
    Nody._curNode.clipped = clipped;
}

function ndNudge(nudgeX, nudgeY) {
    Nody._curNode.nudgeX = nudgeX;
    Nody._curNode.nudgeY = nudgeY;
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

   ndFireNode(newKid.parent, Event.KID_ADD, newKid);
}

function ndFindNodeAt(x,y) {
    // this function will be affected by introduction of the following tags
    //visible
    //clip
    //global pos kids

    var node = ND_NODY.root;
    var screenRegion = [node.x, node.y, node.w, node.h];

    return _ndFindNodeAt(x,y,node,screenRegion);
}

function ndGetParentPos(node) {
   if (node.parent == null)
      return [0,0];

   return ndGetPos(node.parent);
}

function ndGetPos(node) {
   if (node.parent == null)
      return [node.x, node.y];

   var p = ndGetPos(node.parent);

   return [node.x + p[0], node.y + p[1]];
}
