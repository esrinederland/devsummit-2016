define(["require", "exports", "esri/map", "esri/dijit/LocateButton", "esri/layers/FeatureLayer"], function (require, exports, Map, LocateButton, FeatureLayer) {
    var URL = "https://services.arcgis.com/OLiydejKCZTGhvWg/arcgis/rest/services/Berlin_Geb%C3%A4udegeschosse/FeatureServer/0";
    var map = new Map("map", {
        basemap: "topo",
        center: [13.37892, 52.515484],
        zoom: 16
    });
    debugger;
    var featureLayer = new FeatureLayer(URL);
    map.addLayer(featureLayer);
    var locateButton = new LocateButton({
        map: map
    }, "locateButton");
    locateButton.startup();
});
//# sourceMappingURL=main.js.map