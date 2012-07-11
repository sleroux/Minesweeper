define(function () {
    'use strict';

    var UIView = function () {
        var frame,
            highlighted,
            subviews,

            // Methods
            isWithinFrame,
            addSubview,
            draw;

        isWithinFrame = function (coord) {
            return (coord.x > frame.x &&
                    coord.x < frame.x + frame.width &&
                    coord.y > frame.y &&
                    coord.y < frame.y + frame.height);
        };

        addSubview = function (view) {
            subviews.append(view);
        };

        draw = function (ctx) {
            var idx,
                subview;

            for (idx = 0; idx < subviews.length; idx += 1) {
                subview = subviews[idx];
                subview.draw(ctx);
            }
        };

        return {
            isWithinFrame: isWithinFrame,
            draw: draw,
            addSubview: addSubview
        };
    };

    return UIView;
});