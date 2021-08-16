// Main Mapping Application.

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/layers/GraphicsLayer",

    // image recognition (tensorflow)
    "./modules/imageRecognition.js",

    // url, extentObject
    "./modules/returnImageByExtent.js"
], function(
    Map,
    MapView,
    SketchViewModel,
    GraphicsLayer,
    imageRecognition,
    returnImageByExtent
) {

    var worldImageService = ""; // add your image service here!
    // Note: https://tiledbasemaps.arcgis.com/arcgis/rest/services/World_Imagery/MapServer requires Developer, or AGOL Subscription.

    var tempGraphicsLayer = new GraphicsLayer();

    var map = new Map({
        basemap: "satellite",
        layers: [tempGraphicsLayer]
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 14,
        center: [-118.2176276, 33.7445614]
    });

    // Drawing toolbar
    var sketchVM = new SketchViewModel({
        layer: tempGraphicsLayer,
        view: view
    });

    // On "draw box"
    sketchVM.on("create", function(event) {
        if (event.state === "complete") {

            // Get image by extent defined.
            var image = returnImageByExtent.getimageData(worldImageService, event.graphic.geometry.extent);

            // Once image returned, get predictions.
            image.then(function(results) {
                imageRecognition.getPredictions(results);
            });
        };
    });

    document.getElementById("draw-button").addEventListener("click", function() {
        tempGraphicsLayer.removeAll();
        sketchVM.create("rectangle", {
            mode: "freehand"
        });
    })
});