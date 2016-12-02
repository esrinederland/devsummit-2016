import Map = require("esri/map");
import Query = require("esri/tasks/query");
import QueryTask = require("esri/tasks/QueryTask");
import FeatureSet = require("esri/tasks/FeatureSet");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import Color = require("esri/Color");
import GraphicsLayer = require("esri/layers/GraphicsLayer");

const url = "https://services.arcgis.com/OLiydejKCZTGhvWg/arcgis/rest/services/Berlin_Geb%C3%A4udegeschosse/FeatureServer/0";

const map = new Map("map", {
  basemap: "topo",
  center: [13.37892, 52.515484],
  zoom: 16
});

const queryTask = new QueryTask(url);

const query = new Query();
query.where = "geschoss > 15";
query.returnGeometry = true;

queryTask.execute(query)
  .then((result: FeatureSet) => {
    const renderer = new SimpleRenderer(new SimpleFillSymbol("solid", null, new Color([255, 0, 255, 0.75])));

    const graphicsLayer = new GraphicsLayer();
    graphicsLayer.setRenderer(renderer);
    result.features.forEach((feature) => {
      graphicsLayer.add(feature);
    });

    map.addLayer(graphicsLayer);
  });



