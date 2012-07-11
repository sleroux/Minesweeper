define(['jquery', 
        'ui-framework/views/UIStage', 
        'ui-framework/core/UIRenderer',
        'ui-framework/core/UIEventManager'], 

        function ($, UIStage, UIRenderer, UIEventManager) {

    var Game = function () {
        var renderer,
            gameLoop,
            start,
            stage,
            canvas;

        canvas = $('#stage');
        stage = new UIStage(canvas);
        renderer = new UIRenderer(stage);

        start = function () {
            console.log('starting game');
        };

        gameLoop = function () {

        };

        return {
            start: start
        };
    };

    return Game;
});