import Map = require("esri/map");
import LocateButton = require("esri/dijit/LocateButton");
import FeatureLayer = require("esri/layers/FeatureLayer");

const URL = "https://services.arcgis.com/OLiydejKCZTGhvWg/arcgis/rest/services/Berlin_Geb%C3%A4udegeschosse/FeatureServer/0";

const map = new Map("map", {
  basemap: "topo",
  center: [13.37892, 52.515484],
  zoom: 16
});

debugger;

const featureLayer = new FeatureLayer(URL);
map.addLayer(featureLayer);

const locateButton = new LocateButton({
  map: map
}, "locateButton");
locateButton.startup(); 

