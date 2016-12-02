define(["dojo/_base/declare",
        "esri/views/MapView",
        "esri/WebMap",
        "esri/widgets/Legend",
        "dojo/query",
    ],
    function (declare,
        MapView,
        WebMap,
        Legend,
        query) {
        return declare(null, {
            load: function () {
                // Webmap
                var webmap = new WebMap({
                    portalItem: {
                        id: "4a250f5511a54e3ab2bee67923bbde3b"
                    }
                });

                // View
                view = new MapView({
                    map: webmap,
                    container: "mapViewDiv",
                    padding: {
                        top: 50
                    }
                });

                // Legend
                view.then(function (result) {
                    var legend = new Legend({
                        view: view,
                        layerInfos: [{
                            layer: view.map.layers.items[0],
                            title: ""
                        }]
                    });
                    view.ui.add(legend, "top-right");
                    query("#" + legend.id).addClass("collapse in");
                });
            }
        });
    });