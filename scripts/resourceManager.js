define(function () {
    var resourceManager = {
        imagePaths: {},
        fontsPaths: {},
        images: {},

        loadAll: function (callback) {
            this.loadImages(callback);
        },

        loadImages: function (callback) {
            var numLoaded = 0,
                i,
                key;

            var loadFunc = function () {
                numLoaded += 1;

                if (numLoaded == Object.keys(resourceManager.imagePaths).length) {
                    callback();
                }
            };

            for (key in this.imagePaths) {
                this.images[key] = new Image();
                this.images[key].onload = loadFunc;
                this.images[key].src = this.imagePaths[key];
            }
        }  
    };

    return resourceManager;
});