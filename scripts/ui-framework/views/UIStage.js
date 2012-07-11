define('UIView', function (UIView) {
    'use strict';

    var UIStage = function (c) {
        var draw,
            ctx,
            canvas;

        canvas = c;
        ctx = canvas.getContext('2d');

        draw = function () {

        };

        return {
            draw: draw
        };
    };

    UIStage.prototype = new UIView();

    return UIStage;
});