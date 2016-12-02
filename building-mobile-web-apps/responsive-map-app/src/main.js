define(["dojo/_base/declare",
        "dojo/query",
        "dojo/on",
        "dojo/dom-class",

        "esri/WebMap",
        "esri/views/MapView",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/layers/FeatureLayer",
        "esri/tasks/support/Query",
        "esri/tasks/QueryTask"
    ],
    function (declare,
        query,
        on,
        domClass,

        WebMap,
        MapView,
        SimpleFillSymbol,
        SimpleRenderer,
        FeatureLayer,
        Query,
        QueryTask) {
        return declare(null, {
            //properties
            inMobileMode: window.innerWidth < 768,
            
			handlers: [],
            
			items: [{ id: 'btnA', part: 'firstPart'}, 
            { id: 'btnB', part: 'secondPart' }, 
            { id: 'btnC', part: 'thirdPart'}],

            load: function () {
                this.switchMobileMode();

                this.setupHandlers();

                this.createMapPart();
            },

            createMapPart: function () {
                // Webmap
                var webmap = new WebMap({
                    portalItem: {
                        id: "4a250f5511a54e3ab2bee67923bbde3b"
                    }
                });
                
                // View
                var view = new MapView({
                    map: webmap,
                    container: "mapViewDiv"
                });
            },

            setupHandlers: function () {
                on(window, 'resize', function (e) {
                    var previousMobileMode = this.inMobileMode;

                    this.inMobileMode = window.innerWidth < 768;

                    if (previousMobileMode !== this.inMobileMode) {
                        this.switchMobileMode();
                    }
                }.bind(this));
            },

            connectMobileHandlers: function () {
                this.connectButtonHandlers();

                this.items.forEach(function (innerItem, index) {
                    if (index === 0) {
                        domClass.replace(innerItem.part, 'show', 'hidden');
                    } else {
                        domClass.replace(innerItem.part, 'hidden', 'show');
                    }
                });
            },

            disconnectMobileHandlers: function () {
                this.handlers.forEach(function (handler) {
                    handler.remove();
                });
                this.handlers.length = 0;

                this.items.forEach(function (innerItem) {
                    domClass.replace(innerItem.part, 'show', 'hidden');
                });
            },

            connectButtonHandlers: function () {
                this.items.forEach(function (item) {
                    var handler = on(document.getElementById(item.id), 'click', function (evt) {
                        this.items.forEach(function (innerItem) {
                            if (innerItem.id === item.id) {
                                domClass.replace(innerItem.part, 'show', 'hidden');
                            } else {
                                domClass.replace(innerItem.part, 'hidden', 'show');
                            }
                        });
                    }.bind(this));
                    this.handlers.push(handler);
                }.bind(this));
            },

            switchMobileMode: function () {
                if (this.inMobileMode) {
                    this.connectMobileHandlers();
                } else {
                    this.disconnectMobileHandlers();
                }
            }
        });
    });