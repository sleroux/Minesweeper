define(['cell', 
        'resourceManager', 
        'button', 
        'counter',
        'events'], 
        function (cell, resourceManager, button, counter, events) {

    var game = function () {
        var canvas = document.getElementById('minesweeper'),
            context = canvas.getContext('2d'),
            board = [],
            eventManager = events(canvas),
            gameButton = button({
                x: 240,
                y: 600
            }),
            timeCounter = counter({
                x: 0,
                y: 600
            }),
            flagCounter = counter({
                x: 360,
                y: 600
            }),
            cellHeight = 60,
            cellWidth = 60,
            boardSize = 10,
            numOfMines = 10,
            highlightedCell,
            my = {};


        // Event Handlers
        eventManager.registerHandler('cursorDown', function (e, pos) {
           var row,
               i,
               j,
               cell;

            e.preventDefault();

            for (i = 0; i < boardSize; i += 1) {
                for (j = 0; j < boardSize; j += 1) {
                    cell = board[i][j];

                    if (cell.inBounds(pos)) {
                        if (e.shiftKey) {
                            cell.flagged = true;
                        } else {
                            cell.highlighted = true;
                            highlightedCell = cell;
                        }
                    }
                }
            }
        });

        eventManager.registerHandler('cursorUp', function (e, pos) {
            var row,
                i,
                j,
                cell;

            e.preventDefault();    

            for (i = 0; i < boardSize; i += 1) {
                for (j = 0; j < boardSize; j += 1) {
                    cell = board[i][j];

                    if (cell.inBounds(pos)) {

                        // Active the cell if it was the one we were highlighting
                        if (cell.highlighted) {
                            cell.highlighted = false;
                            my.activateCell(i, j);
                        }

                        highlightedCell = null;
                    }
                }
            }
        });

        eventManager.registerHandler('cursorMove', function (e, pos) {
            e.preventDefault();

            if (highlightedCell) {
                // If we moved out of the highlighted cell, unhighlight it
                if (!highlightedCell.inBounds(pos)) {
                    highlightedCell.highlighted = false;
                    highlightedCell = null;
                }
            }
        });

        my.init = function () {

            // Load resources before starting game
            resourceManager.imagePaths = {
                'counter_background': 'resources/counter_background.png',
                'game_button': 'resources/game_button.png',
                'mine': 'resources/mine.png',
                'cell': 'resources/cell.png',
                'flag': 'resources/flag.png',
                'cell_0': 'resources/cell_0.png',
                'cell_1': 'resources/cell_1.png',
                'cell_2': 'resources/cell_2.png',
                'cell_3': 'resources/cell_3.png',
                'cell_4': 'resources/cell_4.png',
                'cell_5': 'resources/cell_5.png'
            };

            resourceManager.fontPaths = {
                'digital': 'resources/digital_7.ttf'
            };

            resourceManager.loadAll(function () {
                my.start();
            });
        };

        my.activateCell = function (row, col) {
            // Stop if the cell isalready selected or if this cell has a mine
            // count > 0
            if (board[row][col].selected) {
                return;
            } else if (board[row][col].mineCount > 0 ||
                board[row][col].cellType == 'mine') {
                board[row][col].selected = true;
                return;
            }

            board[row][col].selected = true;

            if (row - 1 >= 0 && col - 1 >= 0) {
                my.activateCell(row - 1, col - 1);
            }

            if (row - 1 >= 0) {
                my.activateCell(row - 1, col);
            }

            if (row - 1 >= 0 && col + 1 < boardSize) {
                my.activateCell(row - 1, col + 1);
            }

            if (col - 1 >= 0) {
                my.activateCell(row, col - 1);
            }

            if (col + 1 < boardSize) {
                my.activateCell(row, col + 1);
            }

            if (row + 1 < boardSize && col - 1 >= 0) {
                my.activateCell(row + 1, col - 1);
            }

            if (row + 1 < boardSize) {
                my.activateCell(row + 1, col);
            }

            if (row + 1 < boardSize && col + 1 < boardSize) {
                my.activateCell(row + 1, col + 1);
            }
        };

        my.tick = function (time) {
            my.update();
            my.render();
            requestAnimFrame(my.tick);
        };

        my.start = function () {
            my.setupBoard();
            my.tick();
        };

        my.update = function () {
        };

        my.render = function () {
            context.fillStyle = 'grey';
            context.fillRect(0, 0, canvas.width, canvas.height);

            my.drawBoard();
            gameButton.draw(context);
            timeCounter.draw(context);
            flagCounter.draw(context);
        };

        my.getMineCount = function (row, col) {
            var count = 0,
                r,
                c;

            for (r = row - 1; r <= row + 1; r += 1) {
                for (c = col - 1; c <= col + 1; c += 1) {
                    if (r >= 0 && 
                        c >= 0 &&
                        r < boardSize &&
                        c < boardSize && 
                        !(r == row && c == col) &&
                        board[r][c].cellType == 'mine') {
                        count += 1;
                    }
                }
            }

            return count;
        };

        my.assignMineCounts = function () {
            var i,
                j,
                mineCount;

            for (i = 0; i < boardSize; i += 1) {
                for (j = 0; j < boardSize; j += 1) {
                    if (board[i][j].cellType != 'mine') {
                        mineCount = my.getMineCount(i, j);
                        board[i][j].mineCount = mineCount;
                        board[i][j].selectedImage = resourceManager.images['cell_' + mineCount];
                    }
                }
            }
        };

        my.setupBoard = function () {
            var row,
                i,
                j,
                mineCell;

            for (i = 0; i < boardSize; i += 1) {
                row = [];

                for (j = 0; j < boardSize; j += 1) {
                    row[j] = cell({
                        x: j * cellWidth,
                        y: i * cellHeight,
                        width: cellWidth,
                        height: cellHeight,
                        highlightedImage: resourceManager.images.cell_0
                    });
                }

                board[i] = row;
            }

            // Setup the mines
            for (i = 0; i < numOfMines; i += 1) {
                mineCell = board[Math.floor(Math.random()*boardSize)][Math.floor(Math.random()*boardSize)];
                mineCell.cellType = 'mine';
                mineCell.selectedImage = resourceManager.images.mine;
            }

            my.assignMineCounts();
        };

        my.drawBoard = function () {
            var row,
                i,
                j;

            for (i = 0; i < boardSize; i += 1) {
                row = board[i];

                for (j = 0; j < boardSize; j += 1) {
                    row[j].draw(context);
                }
            }
        };

        return my;
    };

    return game;
});