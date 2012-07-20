define(['resourceManager'], function (resourceManager) {
    var cell = function (spec) {
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
            context.drawImage(spec.highlightedImage, 
                              spec.x, 
                              spec.y, 
                              spec.highlightedImage.width, 
                              spec.highlightedImage.height);
        };

        my.drawSelected = function (context) {
            context.drawImage(my.selectedImage, 
                              spec.x, 
                              spec.y, 
                              my.selectedImage.width, 
                              my.selectedImage.height);
        };

        my.drawNormal = function (context) {
            context.drawImage(resourceManager.images.cell, 
                              spec.x, 
                              spec.y, 
                              resourceManager.images.cell.width, 
                              resourceManager.images.cell.height);
        };

        my.drawFlagged = function (context) {
            context.drawImage(resourceManager.images.flag, 
                              spec.x, 
                              spec.y, 
                              resourceManager.images.flag.width, 
                              resourceManager.images.flag.height);
        };

        my.inBounds = function (pos) {
            return (pos.x > spec.x && pos.y > spec.y &&
                    pos.x < (spec.x + spec.width) &&
                    pos.y < (spec.y + spec.height));
        };

        return my;
    };

    return cell;
});