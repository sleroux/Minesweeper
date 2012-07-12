require(['jquery', 'game', 'rAF', 'util'], function ($, Game) {
    $(function () {
        window.Minesweeper = new Game();
        window.Minesweeper.start();
    });
});


