function ndInit() {
   ND_NODY.root = {
      id: 'root',
      x: 0,
      y: 0,
      w: 1024,
      h: 775,
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
      kids: [],
      nudgeX: 0,
      nudgeY: 0,
      clipped: true,
      clipPadding: 0,
      parent: null
   };

   ND_NODY._nodeStack.push(ND_NODY.root);
   ND_NODY._curNode = ndPeek();
}