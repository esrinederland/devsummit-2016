define(["dojo/_base/declare",
        "dojo/query",

        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Locate",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/layers/FeatureLayer",
        "esri/tasks/support/Query",
        "esri/tasks/QueryTask"
    ],
    function (declare,
        query,

        Map,
        MapView,
        Locate,
        SimpleFillSymbol,
        SimpleRenderer,
        FeatureLayer,
        Query,
        QueryTask) {
        return declare(null, {
            //properties
            map: null,
            view: null,

            load: function () {
                this.createMapView();
            },

            createMapView: function () {
                this.map = new Map({
                    basemap: "topo"
                });

                this.view = new MapView({
                    container: "viewDiv",
                    map: this.map,
                    zoom: 7,
                    center: [5.46, 52.17]
                });

                var locateBtn = new Locate({
                    view: this.view
                });
                locateBtn.startup();

                // Add the locate widget to the top left corner of the view
                this.view.ui.add(locateBtn, {
                    position: "top-left",
                    index: 0
                });

                return this.view;
            }
        });
    });