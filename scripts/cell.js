
var define;

define(function () {
    'use strict';

    var cell = function (properties) {
        var my = {};

        my.draw = function (context) {
            if (my.selected) {
                my.drawSelected(context);
            } else if (my.flagged) {
                my.drawFlagged(context);
            } else if (my.highlighted) {
                my.drawHighlighted(context);
            } else {
                my.drawNormal(context);
            }
        };

        my.drawHighlighted = function (context) {
            context.drawImage(properties.highlightedImage, 
                              properties.x, 
                              properties.y, 
                              properties.width, 
                              properties.height);
        };

        my.drawSelected = function (context) {
            context.drawImage(my.selectedImage, properties.x, properties.y, properties.width, properties.height);
        };

        my.drawNormal = function (context) {
            context.drawImage(properties.image, properties.x, properties.y, properties.width, properties.height);
        };

        my.drawFlagged = function (context) {
            context.drawImage(my.flaggedImage, properties.x, properties.y, properties.width, properties.height);
        };

        my.inBounds = function (pos) {
            return (pos.x > properties.x && pos.y > properties.y &&
                    pos.x < (properties.x + properties.width) &&
                    pos.y < (properties.y + properties.height));
        };

        return my;
    };

    return cell;
});