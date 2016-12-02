define(["dojo/_base/declare",
        "dojo/query",

        "esri/Map",
        "esri/views/MapView",
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
                this.createMapView()
                    .then(this.setupHandlers.bind(this));
            },

            setupHandlers: function () {
                query("#btnQueryFeaturesWithLargeOffset").on("click", this.queryFeatures.bind(this, true, 1000));
                
                query("#btnQueryFeaturesWithOffset").on("click", this.queryFeatures.bind(this, true, 100));
                
                query("#btnQueryFeaturesWithoutOffset").on("click", this.queryFeatures.bind(this, false));
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

                return this.view;
            },

            queryFeatures: function (setOffset, offSetValue) {
                this.map.layers.removeAll();

                var municipalitiesUrl = "http://services.arcgis.com/nSZVuSZjHpEZZbRo/arcgis/rest/services/Bestuurlijke_Grenzen_2015_Gemeenten/FeatureServer/0";

                var queryTask = new QueryTask({
                    url: municipalitiesUrl
                });

                var query = new Query();
                query.outFields = ["OBJECTID"];
                query.geometry = this.view.extent;
                query.returnGeometry = true;
                
                // set the max allowable offset based on the given arguments
                if(setOffset) {
                    query.maxAllowableOffset = offSetValue;
                }

                queryTask.execute(query)
                    .then(this.displayResultOnMap.bind(this));
            },

            displayResultOnMap: function (result) {
                var municipalitiesRenderer = new SimpleRenderer({
                    symbol: new SimpleFillSymbol({
                        color: [51, 51, 204, 0.9],
                        style: "solid",
                        outline: { // autocasts as esri/symbols/SimpleLineSymbol
                            color: "white",
                            width: 1
                        }
                    })
                });

                var featureLayer = new FeatureLayer({
                    fields: result.fields,
                    objectIdField: result.objectIdFieldName,
                    geometryType: result.geometryType,
                    spatialReference: {
                        wkid: 102100
                    },
                    source: result.features,
                    renderer: municipalitiesRenderer
                });

                this.map.add(featureLayer);
            }

        });
    });