define(function () {
    var resourceManager = {
        images: {},
        
        loadImages: function (paths, callback) {
            var numLoaded = 0,
                i,
                key;

            var loadFunc = function () {
                numLoaded += 1;

                if (numLoaded == Object.keys(paths).length) {
                    callback();
                }
            };

            for (key in paths) {
                this.images[key] = new Image();
                this.images[key].onload = loadFunc;
                this.images[key].src = paths[key];
            }
        }        
    };

    return resourceManager;
});