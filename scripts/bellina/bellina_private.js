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

        if (node['fontName'] === undefined)
            node.fontName = 'courier';

        if (node['fontStyle'] === undefined)
            node.fontStyle = 'default';

        if (node['fontSize'] === undefined)
            node.fontSize = 10;

        d.drawText( screenPos[0] + node.textX, screenPos[1] + node.textY,
                    node.text,
                    node.textColor[0], node.textColor[1], node.textColor[2],
                    node.fontName, node.fontStyle, node.fontSize );
    }
}