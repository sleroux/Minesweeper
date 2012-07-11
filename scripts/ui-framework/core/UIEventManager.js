define(['views/UIStage',
        'core/UIEventType',
        'core/UIEvent'], 

        function (UIStage, UIEventType, UIEvent) {
    
    'use strict';

    var UIEventManager = function (stage) {
        eventQueue = [];

        canvas.onmousemove = function (e) {
            // Wrap event in a UIEvent object
            var eventProps = {
                type: UIEventType.MOUSE_MOVE,
                e: e
            };

            eventQueue.append(new UIEvent(eventProps));
        };

        canvas.onmousedown = function (e) {
            // Wrap event in a UIEvent object
            var eventProps = {
                type: UIEventType.MOUSE_DOWN,
                e: e
            };

            eventQueue.append(new UIEvent(eventProps));
        };

        canvas.onmouseup = function (e) {
            // Wrap event in a UIEvent object
            var eventProps = {
                type: UIEventType.MOUSE_UP,
                e: e
            };

            eventQueue.append(new UIEvent(eventProps));
        };

        window.requestAnimationFrame(function (time) {
            // Empty out the event queue
            var idx,
                uiEvent;

            for (idx = 0; idx < eventQueue.length; idx += 1) {
                uiEvent = eventQueue[idx];

                // Do something with it
            }

            // Last step: re-render
        });
    };

    return UIEventManager;
});