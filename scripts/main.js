require(['jquery', 'game', 'vendor/rAF', 'util'], function ($, game) {
    $(function () {
        // Load images
        window.Minesweeper = game();
        window.Minesweeper.init();
    });
});


