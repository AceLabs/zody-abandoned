include('nody_listeners');
include('nody_mouse');
include('nody_private');

var Nody = {
    node_mouseLeftDown: null,

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

    listenerRegistry: {
        onMouseLeftDown: {} // cb by node id
        , onMouseLeftUp: {} // cb by node id
        , onMouseLeftClick: {} // cb by node id
    },

    _nodeById: {},

    _nextId: 0
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

function ndOnMouseLeftDown(cb) {
    Nody.listenerRegistry.onMouseLeftDown[ Nody._curNode.id ] = cb;
}

function ndOnMouseLeftUp(cb) {
    Nody.listenerRegistry.onMouseLeftUp[ Nody._curNode.id ] = cb;
}

function ndOnMouseLeftClick(cb) {
    Nody.listenerRegistry.onMouseLeftClick[ Nody._curNode.id ] = cb;
}

function ndBegin(id) {
    id = id || ndNextId();

    if (Nody._curNode != null) {
        var newNode = {parent: Nody._curNode};
        Nody._curNode.kids.push(newNode);
        Nody._curNode = newNode;
    }
    else
        Nody._curNode = {};

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
    Nody._nodeStack.pop();
    Nody._curNode = ndPeek();
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

