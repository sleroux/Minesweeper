require(['jquery', 
         'game', 
         'vendor/rAF', 
         'vendor/modernizr', 
         'util'], function ($, game) {
    $(function () {
        // Load images
        window.Minesweeper = game();
        window.Minesweeper.init();
    });
});


