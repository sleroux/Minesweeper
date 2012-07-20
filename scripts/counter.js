define(['resourceManager'], function (resourceManager) {
    var counter = function (spec) {
        var my = {},
            count;

        my.draw = function (context) {
            context.drawImage(resourceManager.images.counter_background,
                              spec.x,
                              spec.y,
                              resourceManager.images.counter_background.width,
                              resourceManager.images.counter_background.height);
        };

        return my;
    };

    return counter;
});