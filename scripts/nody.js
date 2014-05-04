include('nody_listeners');
include('nody_mouse');

var Nody = {
    mouseLeftDownOnNode: null,
    root: {
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

    _nodeStack: []
};

Nody._curNode = Nody.root;

function ndBegin() {
    if (Nody._curNode != null) {
        var newNode = {parent: Nody._curNode, kids:[]};
        Nody._curNode.kids.push(newNode);
        Nody._curNode = newNode;
    }
    else
        Nody._curNode = {kids:[]};

    Nody._nodeStack.push(Nody._curNode);
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
    delete Nody._nodeStack[Nody._nodeStack.length - 1];

    if (Nody._nodeStack.length > 0)
        Nody._curNode = Nody._nodeStack[Nody._nodeStack.length - 1]
    else
        Nody._curNode = null;
}