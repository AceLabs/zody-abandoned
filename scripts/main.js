include("bellina");

var sys_nody_root =
{
    x: 10,
    y: 10,
    w: 400,
    h: 300,
    borderColor: [1, 0, 0],
    color: [.3, 0, 0],
    textColor: [.9, 0, 0],
    text: 'Hello, Bellina!',
    textX: 20,
    textY: 10,
    fontname: 'courier',
    fontstyle: 'default',
    fontsize: 20,
    opacity:1,

    kids: [
        {
            x: 250,
            y: 100,
            w: 200,
            h: 150,
            borderColor: [0, 1, 0],
            color: [0, 0.3, 0],
            textColor: [0, 0.9, 0],
//                text: 'Hello, Bellina!',
            textX: 20,
            textY: 10,
            fontname: 'courier',
            fontstyle: 'default',
            fontsize: 15,
            opacity:1,

            kids: [
            ]
        }
    ]
};


