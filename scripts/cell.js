
var define;

define(function () {
    'use strict';

    var cell = function (properties) {
        var my = {};

        my.draw = function (context) {
            if (this.selected) {
                my.drawSelected(context);
            } else if (this.highlighted) {
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
            context.drawImage(this.selectedImage, properties.x, properties.y, properties.width, properties.height);
        };

        my.drawNormal = function (context) {
            context.drawImage(properties.image, properties.x, properties.y, properties.width, properties.height);
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