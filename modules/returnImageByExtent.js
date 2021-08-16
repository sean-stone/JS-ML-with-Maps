// Fetching image from image service.

define([
        "esri/layers/MapImageLayer",
        "dojo/Deferred"
    ],
    function(MapImageLayer, Deferred) {
        let dataImageObject;
        return {
            getimageData: function(url, extent) {
                dataImageObject = new Deferred();

                // Imagery layer (/mapserver)
                // Note, export needs to be enabled on the REST service for this to work.
                const layer = new MapImageLayer({
                    url: url
                });

                const height = "500";
                const width = "500";

                layer.fetchImage(extent, height, width).then(function(data) {
                    dataImageObject.resolve(data);
                });

                return dataImageObject.promise;
            }
        };
    })