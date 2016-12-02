define(["require", "exports", "esri/map", "esri/tasks/query", "esri/tasks/QueryTask", "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer", "esri/Color", "esri/layers/GraphicsLayer"], function (require, exports, Map, Query, QueryTask, SimpleFillSymbol, SimpleRenderer, Color, GraphicsLayer) {
    var url = "https://services.arcgis.com/OLiydejKCZTGhvWg/arcgis/rest/services/Berlin_Geb%C3%A4udegeschosse/FeatureServer/0";
    var map = new Map("map", {
        basemap: "topo",
        center: [13.37892, 52.515484],
        zoom: 16
    });
    var queryTask = new QueryTask(url);
    var query = new Query();
    query.where = "geschoss > 15";
    query.returnGeometry = true;
    queryTask.execute(query)
        .then(function (result) {
        var renderer = new SimpleRenderer(new SimpleFillSymbol("solid", null, new Color([255, 0, 255, 0.75])));
        var graphicsLayer = new GraphicsLayer();
        graphicsLayer.setRenderer(renderer);
        result.features.forEach(function (feature) {
            graphicsLayer.add(feature);
        });
        map.addLayer(graphicsLayer);
    });
});
//# sourceMappingURL=main.js.map