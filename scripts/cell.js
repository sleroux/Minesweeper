define(['resourceManager'], function (resourceManager) {
    var cell = function (spec) {
        var my = {};

        // Private Helper Methods
        function drawHighlighted (context) {
            context.drawImage(spec.highlightedImage, 
                              spec.x, 
                              spec.y, 
                              spec.highlightedImage.width, 
                              spec.highlightedImage.height);
        }

        function drawSelected (context) {
            context.drawImage(my.selectedImage, 
                              spec.x, 
                              spec.y, 
                              my.selectedImage.width, 
                              my.selectedImage.height);
        }

        function drawNormal (context) {
            context.drawImage(resourceManager.images.cell, 
                              spec.x, 
                              spec.y, 
                              resourceManager.images.cell.width, 
                              resourceManager.images.cell.height);
        }

        function drawFlagged (context) {
            context.drawImage(resourceManager.images.flag, 
                              spec.x, 
                              spec.y, 
                              resourceManager.images.flag.width, 
                              resourceManager.images.flag.height);
        }

        // Public Methods
        my.draw = function (context) {
            if (my.selected) {
                drawSelected(context);
            } else if (my.flagged) {
                drawFlagged(context);
            } else if (my.highlighted) {
                drawHighlighted(context);
            } else {
                drawNormal(context);
            }
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