// Tensorflow.js code!

define([],
    function() {
        return {
            getPredictions: function(imageElement) {
                async function init() {
                    let model = await tmImage.load("./models/model.json", "./models/metadata.json");
                    const prediction = await model.predict(imageElement);
                    console.table(prediction); // returns predictions as a table.
                };

                init();
            }
        };
    })