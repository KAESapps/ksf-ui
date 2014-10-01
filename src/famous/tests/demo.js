define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Entity = require('famous/core/Entity');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var RenderNode = require('famous/core/RenderNode');
    var FlexibleLayout = require('famous/views/FlexibleLayout');
    var GridLayout = require('famous/views/GridLayout');
    var Modifier = require('famous/core/Modifier');
    var ShortText = require('ksf-ui/widget/input/ShortText');
    var Button = require('ksf-ui/widget/themed/base/Button');
    var KSFVFlexLayout = require('ksf-ui/layout/VFlex');
    var KSFInFamousAdapter = require('../KSFInFamousAdapter');

    Engine.setOptions({
        appMode: false
    });


    var root = document.createElement('div');
    root.classList.add('famous-root');
    root.style.height = "400px";
    root.style.backgroundColor = "#EEE";
    document.body.appendChild(root);

    var mainContext = Engine.createContext(root);


    var layout = new FlexibleLayout({
        direction: FlexibleLayout.DIRECTION_Y,
        ratios: [true, 1]
    });

    mainContext.add(layout);

    
    var BackgroundLayout = function() {
        RenderNode.apply(this, arguments);
    };
    BackgroundLayout.prototype = Object.create(RenderNode.prototype);
    BackgroundLayout.prototype.getSize = function() {
        return this._child[1].getSize();
    };

    var PaddingLayout = function(padding) {
        this._padding = padding;
        this._node = new RenderNode();
        this._entityId = Entity.register(this);
    };
    PaddingLayout.prototype.add = function add() {
        return this._node.add.apply(this._node, arguments);
    };
    PaddingLayout.prototype.getSize = function getSize() {
        var size = this._node.getSize();
        return [size[0] + this._padding.left + this._padding.right, size[1] + this._padding.top + this._padding.bottom];
    };
    PaddingLayout.prototype.render = function() {
        return this._entityId;
    };
    PaddingLayout.prototype.commit = function(context) {
        var padding = this._padding;
        return {
            size: [context.size[0] - padding.left - padding.right, context.size[1] - padding.top - padding.bottom],
            transform: Transform.multiply(Transform.translate(padding.left, padding.top, 0), context.transform),
            target: this._node.render()
        };
    };

    // ========= top bar ===========

    var topBar = new BackgroundLayout();
    var topBarButtons = new FlexibleLayout({
        ratios: [true, 1, true],
        // transition: {
        //     curve: 'easeInOut',
        //     duration: 2000
        // }
    });
    topBar.add(new Surface({
        properties: {
            background: 'black',
        }
    }));
    topBar.add(new Modifier({
        size: [undefined, 60]
    })).add(topBarButtons);

    var logoContent = new Surface({
        size: [true, true],
        content: "KADATA",
        properties: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            zIndex: 1
        }
    });

    var logo = new PaddingLayout({
        left: 20, right: 20,
        top: 0, bottom: 0
    });
    logo.add(new Modifier({
        origin: [0, 0.5],
        align: [0, 0.5],
        transform: Transform.translate(0, 0, 1)
    })).add(logoContent);


    var input = new PaddingLayout({
        left: 0, right: 20,
        top: 0, bottom: 0
    });
    input.add(new Modifier({
        origin: [0, 0.5],
        align: [0, 0.5],
        size: [undefined, 25],
        transform: Transform.translate(0, 0, 1),
    })).add(new KSFInFamousAdapter(new ShortText({
        placeholder: "Nom du projet",
    }), {
        properties: {
            background: 'transparent',
            color: 'white',
            border: 'none',
            borderBottom: '1px solid gray',
            zIndex: 1
        }
    }));
    // })).add(new InputSurface({
    //     placeholder: "Nom du projet",
    //     properties: {
    //         background: 'transparent',
    //         color: 'white',
    //         border: 'none',
    //         borderBottom: '1px solid gray',
    //         padding: '0.5em'
    //     }
    // }));

    var connexionBtn = new PaddingLayout({
        left: 0, right: 20,
        top: 0, bottom: 0
    });
    connexionBtn.add(new Modifier({
        origin: [0, 0.5],
        align: [0, 0.5],
        transform: Transform.translate(0, 0, 1),
    })).add(new KSFInFamousAdapter(new Button("Connexion"), {
        size: [true, true],
        properties: {
            zIndex: 1
        }
    }));


    topBarButtons.sequenceFrom([
        logo,
        input,
        connexionBtn
    ]);
    


          var grid = new GridLayout({
            dimensions: [2, 1]
          });
      
        var content1 = new RenderNode();
        var centerModifier1 = new Modifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
        });
        content1.add(centerModifier1).add(new Surface({
            size: [true, true],
            content: 'content 1',
            properties: {
                padding: '1em',
                background: 'yellow'
            }
        }));

        var content2 = new RenderNode();
        content2.add(new KSFInFamousAdapter(new KSFVFlexLayout().content([
            new Button("Titre"),
            [new Button("Contenu"), { flex: true }]
        ])));
        
        grid.sequenceFrom([content1, content2]);
      
      layout.sequenceFrom([topBar, grid]);
});
