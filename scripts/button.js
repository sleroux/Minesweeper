define(['resourceManager'], function (resourceManager) {
    var button = function (spec) {
        var my = {};

        my.draw = function (context) {
            var imageWidth = resourceManager.images.game_button.width,
                imageHeight = resourceManager.images.game_button.height;

            context.drawImage(resourceManager.images.game_button,
                              spec.x,
                              spec.y,
                              imageWidth,
                              imageHeight);
        };

        return my;
    };

    return button;
});