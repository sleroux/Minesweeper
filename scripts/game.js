var define,
    document,
    util,
    requestAnimationFrame;

define(['jquery', 'cell', 'resources'], function ($, cell, resources) {
    'use strict';

    var game = function () {
        var $canvas = $('#minesweeper'),
            canvas = document.getElementById('minesweeper'),
            context = canvas.getContext('2d'),
            board = [],
            cellHeight = 60,
            cellWidth = 60,
            boardSize = 10,
            numOfMines = 10,
            highlightedCell,
            resourcesManager,
            my = {};

        my.init = function () {
            // Bind event handlers
            $canvas.on('mousedown', function (e) {
                var pos = util.getPosition(e),
                    row,
                    i,
                    j,
                    cell;

                for (i = 0; i < boardSize; i += 1) {
                    for (j = 0; j < boardSize; j += 1) {
                        cell = board[i][j];

                        if (cell.inBounds(pos)) {
                            cell.highlighted = true;
                            highlightedCell = cell;
                        }
                    }
                }
            });

            $canvas.on('mouseup', function (e) {
                var pos = util.getPosition(e),
                    row,
                    i,
                    j,
                    cell;

                for (i = 0; i < boardSize; i += 1) {
                    for (j = 0; j < boardSize; j += 1) {
                        cell = board[i][j];

                        if (cell.inBounds(pos)) {

                            // Active the cell if it was the one we were highlighting
                            if (cell.highlighted) {
                                cell.highlighted = false;
                                my.activeCell(i, j);
                            };

                            highlightedCell = null;
                        }
                    }
                }
            });

            $canvas.on('mousemove', function (e) {
                var pos = util.getPosition(e);

                if (highlightedCell) {
                    // If we moved out of the highlighted cell, unhighlight it
                    if (!highlightedCell.inBounds(pos)) {
                        highlightedCell.highlighted = false;
                        highlightedCell = null;
                    }
                }
            });

            // Load resource manager and resources
            resourcesManager = resources();
            resourcesManager.loadImages({
                'cell': 'resources/cell.png',
                'cell_0': 'resources/cell_0.png',
                'cell_1': 'resources/cell_1.png',
                'cell_2': 'resources/cell_2.png',
                'cell_3': 'resources/cell_3.png',
                'cell_4': 'resources/cell_4.png',
                'cell_5': 'resources/cell_5.png'
            }, function () {
                // images loaded
                my.start();
            });
        };

        my.activeCell = function (row, col) {
            // Stop if the cell isalready selected or if this cell has a mine
            // count > 0
            if (board[row][col].selected) {
                return;
            } else if (board[row][col].mineCount > 0) {
                board[row][col].selected = true;
                return;
            };

            board[row][col].selected = true;

            if (row - 1 >= 0 && col - 1 >= 0) {
                my.activeCell(row - 1, col - 1);
            };

            if (row - 1 >= 0) {
                my.activeCell(row - 1, col);
            }

            if (row - 1 >= 0 && col + 1 < boardSize) {
                my.activeCell(row - 1, col + 1);
            }

            if (col - 1 >= 0) {
                my.activeCell(row, col - 1);
            };

            if (col + 1 < boardSize) {
                my.activeCell(row, col + 1);
            }

            if (row + 1 < boardSize && col - 1 >= 0) {
                my.activeCell(row + 1, col - 1);
            };

            if (row + 1 < boardSize) {
                my.activeCell(row + 1, col);
            }

            if (row + 1 < boardSize && col + 1 < boardSize) {
                my.activeCell(row + 1, col + 1);
            }
        };

        my.tick = function (time) {
            my.update();
            my.render();
            requestAnimationFrame(my.tick.bind(this));
        };

        my.start = function () {
            my.setupBoard();
            my.tick();
        };

        my.update = function () {
            // Update the states of the cells based on mouse postion
            var i, j;

            for (i = 0; i < boardSize; i += 1) {
                for (j = 0; j < boardSize; j += 1) {

                }
            }
        };

        my.render = function () {
            context.fillStyle = 'grey';
            context.fillRect(0, 0, $canvas.width(), $canvas.height());

            my.drawBoard();
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
                    };
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
                    mineCount = my.getMineCount(i, j);
                    board[i][j].mineCount = mineCount;
                    board[i][j].selectedImage = resourcesManager.images['cell_' + mineCount];
                }
            }
        };

        my.setupBoard = function () {
            var row,
                i,
                j;

            for (i = 0; i < boardSize; i += 1) {
                row = [];

                for (j = 0; j < boardSize; j += 1) {
                    row[j] = cell({
                        x: j * cellWidth,
                        y: i * cellHeight,
                        width: cellWidth,
                        height: cellHeight,
                        image: resourcesManager.images['cell'],
                        highlightedImage: resourcesManager.images['cell_0']
                    });
                }

                board[i] = row;
            }

            for (i = 0; i < numOfMines; i += 1) {
                board[Math.floor(Math.random()*boardSize)][Math.floor(Math.random()*boardSize)].cellType = 'mine';
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