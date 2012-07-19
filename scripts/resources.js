define(function () {
    var resources = function () {
        var my = {};

        my.images = {};

        my.loadImages = function (paths, callback) {
            var numLoaded = 0,
                i,
                key;

            for (key in paths) {
                this.images[key] = new Image();

                this.images[key].onload = function () {
                    numLoaded += 1;

                    if (numLoaded == Object.keys(paths).length) {
                        callback();
                    };
                };

                this.images[key].src = paths[key];
            }
        };
        
        return my;
    };

    return resources;
});