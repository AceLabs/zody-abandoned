include('nody/nody_plugin');
include('nody/nody_event');
include('nody/nody_event_value');
include('nody/nody_listeners');
include('nody/nody_mouse');
include('nody/nody_private');

var Nody = {
   root: {
      id: 'root',
      x: 0, y: 0,
      w: 1024, h: 775,
      borderColor: [0, 0, 1],
      color: [0, 0, 0.3],
      textColor: [.9, 0.9, 0.9],
      text: 'This is root',
      textX: 20,
      textY: 20,
      fontname: 'courier',
      fontstyle: 'default',
      fontsize: 20,
      opacity: 1,
      kids: []
   },

   _nodeStack: [],
   _nodeById: {},

   _nextId: 0,

   _node_mouseLeftDown: null,
   _node_mouseMove: null
};

function ndNextId() {
    if ( Nody._nextId > 65000 ) {
        print('Next ID is too large!! See nody.js');
        throw 'Next ID is too large!! See nody.js';
    }

    return Nody._nextId++;
}

function ndPeek() {
    return Nody._nodeStack[ Nody._nodeStack.length - 1 ];
}

Nody._nodeStack.push(Nody.root);
Nody._curNode = ndPeek();

function ndThis() {
   return Nody._curNode;
}

function ndVar(name, value) {
   Nody._curNode[name] = value;
}

function ndNew() {
   return {
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
}

function ndBegin(id) {
    id = id || ndNextId();

    if (Nody._curNode != null) {
        var newNode = ndNew();
        newNode.parent = Nody._curNode;
        Nody._curNode.kids.push(newNode);
        Nody._curNode = newNode;
    }
    else
        Nody._curNode = ndNew();

    Nody._nodeStack.push(Nody._curNode);

    Nody._curNode.id = id;
    Nody._curNode.kids = [];

    Nody._nodeById[id] = Nody._curNode;
}

function ndById(id) {
    return Nody._nodeById[id];
}

function ndPos(x, y) {
    Nody._curNode.x = x;
    Nody._curNode.y = y;
}

function ndDim(w, h) {
    Nody._curNode.w = w;
    Nody._curNode.h = h;
}

function ndBorderColor(r,g,b) {
    Nody._curNode.borderColor = [r, g, b];
}

function ndColor(r,g,b) {
    Nody._curNode.color = [r, g, b];
}

function ndTextColor(r,g,b) {
    Nody._curNode.textColor = [r, g, b];
}

function ndText(text) {
    Nody._curNode.text = text;
}

function ndFontName(name) {
    Nody._curNode.fontName = name;
}

function ndFontStyle(style) {
    Nody._curNode.fontStyle = style;
}

function ndFontSize(size) {
    Nody._curNode.fontSize = size;
}

function ndOpacity(opacity) {
    Nody._curNode.opacity = opacity;
}

function ndTextPos(x, y) {
    Nody._curNode.textX = x;
    Nody._curNode.textY = y;
}

function ndEnd() {
   var newKid = Nody._curNode;

   Nody._nodeStack.pop();
   Nody._curNode = ndPeek();

   ndFireNode(newKid.parent, Event.KID_ADD, newKid);
}

function ndFindNodeAt(x,y) {
    // this function will be affected by introduction of the following tags
    //visible
    //clip
    //global pos kids

    var node = Nody.root;
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
