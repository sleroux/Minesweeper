require(['lib/jquery', 'game'], function ($, Game) {
    $(function () {
        window.Minesweeper = new Game();
        window.Minesweeper.start();
    });
});


