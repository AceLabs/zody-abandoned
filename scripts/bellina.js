include('bellina_listeners');
include("bellina_mouse");

function blRender(node, d, parentScreenPos) {
    var screenPos = [node.x + parentScreenPos[0], node.y + parentScreenPos[1]];

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

    if (node['kids'] !== undefined)
        _blDrawKids(node.kids, d, screenPos);

    if (node['borderColor'] !== undefined) {
        d.setColor( node.borderColor[0], node.borderColor[1], node.borderColor[2] );
        d.drawRect(screenPos[0], screenPos[1], node.w, node.h);
    }

    if (popOpacity)
        d.popOpacity();

    d.popClipRegion();
}

function _blDrawKids(kids, d, parentScreenPos) {
    for (var i = 0; i < kids.length; i++)
        blRender(kids[i], d, parentScreenPos);
}

function _blDrawText(node, d, screenPos) {
   if (node['text'] !== undefined) {
        if (node['textColor'] === undefined)
            node.textColor = [1, 1, 1];

        if (node['textX'] === undefined)
            node.textX = 0;

        if (node['textY'] === undefined)
            node.textY = 0;

        if (node['fontname'] === undefined)
            node.fontname = 'courier';

        if (node['fontstyle'] === undefined)
            node.fontstyle = 'default';

        if (node['fontsize'] === undefined)
            node.fontsize = 10;

        d.drawText( screenPos[0] + node.textX, screenPos[1] + node.textY,
                    node.text,
                    node.textColor[0], node.textColor[1], node.textColor[2],
                    node.fontname, node.fontstyle, node.fontsize );
    }
}