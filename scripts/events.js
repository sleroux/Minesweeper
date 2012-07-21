define(function () {
    var events = function (canvas) {
        var eventMap = {},
            my = {};

        function touchStart (e) {
            var pos = {
                x: e.changedTouches[0].pageX - canvas.offsetLeft,
                y: e.changedTouches[0].pageY - canvas.offsetTop
            };

            my.trigger('cursorDown', e, pos);
        }
 
        function touchEnd (e) {
            var pos = {
                x: e.changedTouches[0].pageX - canvas.offsetLeft,
                y: e.changedTouches[0].pageY - canvas.offsetTop
            };

            my.trigger('cursorUp', e, pos);
        }

        function touchMove (e) {
            var pos = {
                x: e.changedTouches[0].pageX - canvas.offsetLeft,
                y: e.changedTouches[0].pageY - canvas.offsetTop
            };

            my.trigger('cursorMove', e, pos);
        }

        function mouseDown (e) {
            var pos = {
                x: e.pageX - canvas.offsetLeft,
                y: e.pageY - canvas.offsetTop
            };

            my.trigger('cursorDown', e, pos);
        }

        function mouseUp (e) {
            var pos = {
                x: e.pageX - canvas.offsetLeft,
                y: e.pageY - canvas.offsetTop
            };

            my.trigger('cursorUp', e, pos);
        }

        function mouseMove (e) {
            var pos = {
                x: e.pageX - canvas.offsetLeft,
                y: e.pageY - canvas.offsetTop
            };

            my.trigger('cursorMove', e, pos);
        }

        // Attach the event handlers to the canvas
        if (Modernizr.touch) {
            canvas.addEventListener('touchstart', touchStart, false);
            canvas.addEventListener('touchend', touchEnd, false);
            canvas.addEventListener('touchmove', touchMove, false);
        } else {
            canvas.addEventListener('mousedown', mouseDown, false);
            canvas.addEventListener('mouseup', mouseUp, false);
            canvas.addEventListener('mousemove', mouseMove, false);
        }

        my.registerHandler = function (eventName, func) {
            if (!eventMap.hasOwnProperty(eventName)) {
                eventMap[eventName] = [];
            }

            eventMap[eventName].push(func);
        };

        my.trigger = function (eventName) {
            var i,
                func,
                args = Array.prototype.slice.call(arguments, 1);

            if (eventMap.hasOwnProperty(eventName)) {
                for (i = 0; i < eventMap[eventName].length; i += 1) {
                    eventMap[eventName][i].apply(null, args);
                }
            }
        };

        return my;
    };

    return events;
});