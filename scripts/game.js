var define,
    document,
    util,
    requestAnimationFrame;

define(['cell', 'resources'], function (cell, resources) {
    'use strict';

    var game = function () {
        var canvas = document.getElementById('minesweeper'),
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
            canvas.addEventListener('mousedown', function (e) {
                var pos,
                    row,
                    i,
                    j,
                    cell;

                if (!e) var e = event;

                pos = {
                    x: e.pageX - canvas.offsetLeft,
                    y: e.pageY - canvas.offsetTop
                };

                for (i = 0; i < boardSize; i += 1) {
                    for (j = 0; j < boardSize; j += 1) {
                        cell = board[i][j];

                        if (cell.inBounds(pos)) {
                            if (e.shiftKey) {
                                cell.flagged = true;
                                cell.flaggedImage = resourcesManager.images['flag'];
                            } else {
                                cell.highlighted = true;
                                highlightedCell = cell;
                            }
                        }
                    }
                }
            }, false);

            canvas.addEventListener('mouseup', function (e) {
                var pos,
                    row,
                    i,
                    j,
                    cell;

                pos = {
                    x: e.pageX - canvas.offsetLeft,
                    y: e.pageY - canvas.offsetTop
                };

                for (i = 0; i < boardSize; i += 1) {
                    for (j = 0; j < boardSize; j += 1) {
                        cell = board[i][j];

                        if (cell.inBounds(pos)) {

                            // Active the cell if it was the one we were highlighting
                            if (cell.highlighted) {
                                cell.highlighted = false;
                                my.activateCell(i, j);
                            };

                            highlightedCell = null;
                        }
                    }
                }
            }, false);

            canvas.addEventListener('mousemove', function (e) {
                var pos = {
                    x: e.pageX - canvas.offsetLeft,
                    y: e.pageY - canvas.offsetTop
                };

                if (highlightedCell) {
                    // If we moved out of the highlighted cell, unhighlight it
                    if (!highlightedCell.inBounds(pos)) {
                        highlightedCell.highlighted = false;
                        highlightedCell = null;
                    }
                }
            }, false);

            // Load resource manager and resources
            resourcesManager = resources();
            resourcesManager.loadImages({
                'mine': 'resources/mine.png',
                'cell': 'resources/cell.png',
                'flag': 'resources/flag.png',
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

        my.activateCell = function (row, col) {
            // Stop if the cell isalready selected or if this cell has a mine
            // count > 0
            if (board[row][col].selected) {
                return;
            } else if (board[row][col].mineCount > 0 ||
                       board[row][col].cellType == 'mine') {
                board[row][col].selected = true;
                return;
            };

            board[row][col].selected = true;

            if (row - 1 >= 0 && col - 1 >= 0) {
                my.activateCell(row - 1, col - 1);
            };

            if (row - 1 >= 0) {
                my.activateCell(row - 1, col);
            }

            if (row - 1 >= 0 && col + 1 < boardSize) {
                my.activateCell(row - 1, col + 1);
            }

            if (col - 1 >= 0) {
                my.activateCell(row, col - 1);
            };

            if (col + 1 < boardSize) {
                my.activateCell(row, col + 1);
            }

            if (row + 1 < boardSize && col - 1 >= 0) {
                my.activateCell(row + 1, col - 1);
            };

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
            requestAnimationFrame(my.tick.bind(this));
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
                    if (board[i][j].cellType != 'mine') {
                        mineCount = my.getMineCount(i, j);
                        board[i][j].mineCount = mineCount;
                        board[i][j].selectedImage = resourcesManager.images['cell_' + mineCount];
                    };
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
                        image: resourcesManager.images['cell'],
                        highlightedImage: resourcesManager.images['cell_0']
                    });
                }

                board[i] = row;
            }

            // Setup the mines
            for (i = 0; i < numOfMines; i += 1) {
                mineCell = board[Math.floor(Math.random()*boardSize)][Math.floor(Math.random()*boardSize)];
                mineCell.cellType = 'mine';
                mineCell.selectedImage = resourcesManager.images['mine'];
                
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