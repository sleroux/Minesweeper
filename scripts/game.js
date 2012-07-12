var define,
    document,
    util,
    requestAnimationFrame;

define(['jquery'], function ($) {
    'use strict';

    var UICanvas,
        UIButton,
        Game;

    UICanvas = function ($canvas) {
        this.subviews = [];

        this.$canvas = $canvas;
        this.canvas = document.getElementById('minesweeper');
        this.context = this.canvas.getContext('2d');

        this.$canvas.bind('mousedown', this.mouseDown.bind(this));
        this.$canvas.bind('mouseup', this.mouseUp.bind(this));
    };

    UICanvas.prototype.addSubview = function (view) {
        this.subviews.push(view);
    };

    UICanvas.prototype.draw = function () {
        var i;
        for (i = 0; i < this.subviews.length; i += 1) {
            this.subviews[i].draw(this.context);
        }
    };

    UICanvas.prototype.mouseDown = function (e) {
        var subview,
            position,
            i;

        // handle event
        // pase event down to subviews
        for (i = 0; i < this.subviews.length; i += 1) {
            subview = this.subviews[i];
            position = util.getPosition(e);

            if (subview.coordWithinBounds(position)) {
                subview.mouseDown(e);
            }
        }
    };

    UICanvas.prototype.mouseUp = function (e) {
        var subview,
            position,
            i;

        // handle event
        // pase event down to subviews
        for (i = 0; i < this.subviews.length; i += 1) {
            subview = this.subviews[i];
            position = util.getPosition(e);

            if (subview.coordWithinBounds(position)) {
                subview.mouseUp(e);
            }
        }
    };

    UICanvas.prototype.mouseMove = function (e) {
        var subview,
            position,
            i;

        // handle event
        // pase event down to subviews
        for (i = 0; i < this.subviews.length; i += 1) {
            subview = this.subviews[i];
            position = util.getPosition(e);

            if (subview.coordWithinBounds(position)) {
                subview.mouseMove(e);
            }
        }
    };

    UIButton = function (properties) {
        this.x = properties.x;
        this.y = properties.y;
        this.width = properties.width;
        this.height = properties.height;
        this.backgroundColor = properties.backgroundColor;
        this.borderWidth = properties.borderWidth;
        this.strokeStyle = properties.strokeStyle;
        this.selectedColor = properties.selectedColor;

        this.selected = false;
    };

    UIButton.prototype.draw = function (context) {
        console.log('drawing button');

        context.clearRect(this.x, this.y, this.width, this.height);

        if (this.selected) {
            context.rect(this.x, this.y, this.width, this.height);
            context.fillStyle = this.selectedColor;
            context.fill();
            context.lineWidth = this.borderWidth;
            context.strokeStyle = this.strokeStyle;
            context.stroke();
        } else {
            // Default state
            context.rect(this.x, this.y, this.width, this.height);
            context.fillStyle = this.backgroundColor;
            context.fill();
            context.lineWidth = this.borderWidth;
            context.strokeStyle = this.strokeStyle;
            context.stroke();
        }
    };

    UIButton.prototype.coordWithinBounds = function (pos) {
        return (this.x < pos.x &&
                this.y < pos.y &&
                this.x + this.width > pos.x &&
                this.y + this.height > pos.y);
    };

    UIButton.prototype.mouseDown = function (e) {
        this.selected = true;
    };

    UIButton.prototype.mouseUp = function (e) {
        this.selected = false;
    };

    Game = function () {
        this.canvas = new UICanvas($('#minesweeper'));

        var startButton = new UIButton({
            x: 10,
            y: 10,
            width: 100,
            height: 50,
            backgroundColor: 'blue',
            borderWidth: 1,
            strokeStyle: 'black',
            selectedColor: 'green'
        });

        this.canvas.addSubview(startButton);
    };

    Game.prototype.update = function () {

    };

    Game.prototype.render = function () {
        this.canvas.draw();
    };

    Game.prototype.tick = function () {
        this.update();
        this.render();

        requestAnimationFrame(this.tick.bind(this));
    };

    Game.prototype.start = function () {
        this.tick();
    };

    return Game;
});