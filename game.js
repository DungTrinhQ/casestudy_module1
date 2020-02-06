var CELL_SIZE = 10;
var FPS = 10    ;
var WIDTH = 400;
var HEIGHT = 400;

function Game(canvas_id){
    var pressedKey;
    var cols = WIDTH/CELL_SIZE;
    var rows = HEIGHT/CELL_SIZE;
    var snake = new Snake(cols,rows);

    var canvas = document.getElementById(canvas_id);
    var context = canvas.getContext('2d');
    context.fillStyle = "black";

    var food = {};
    var running = false;
    var timer;

    this.init = function() {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        canvas.onkeydown = function(e) {
            e.preventDefault();
            if(e.keyCode == 13) // Enter key
            {
                if(!running)
                    startGame();
            }
            else if(running)
            {
                pressedKey = e.keyCode;
            }
        };

        // draw the welcome screen
        context.textAlign = "center";
        context.font = "36px Arial";
        context.fillText("Snake",WIDTH/2,HEIGHT/3);
        context.font = "16px Arial";
        context.fillText("Press Enter to Start",WIDTH/2,HEIGHT/2);

    }

    function startGame() {
        pressedKey = null;
        clearInterval(timer);
        snake.init();
        createFood();
        running = true;
        timer = setInterval(update,1000/FPS);

    }

    function update() {
        if(!running)
            return;

        snake.handleKey(pressedKey);
        var ret = snake.update(food);

        if(ret==1)
        {
            createFood();
        }else if(ret==2) {
            // end game
            running = false;
            context.save();
            context.fillStyle = "rgba(0,0,0,0.2)";
            context.fillRect(0,0,WIDTH,HEIGHT);
            context.restore();
            context.fillText("Press Enter to Restart",WIDTH/2,HEIGHT/2);
            return;
        }

        draw();
    }
    function draw(){

        context.beginPath();
        context.clearRect(0,0,WIDTH,HEIGHT);
        context.fill();

        snake.draw(context);
        // draw food
        context.beginPath();
        context.arc((food.x*CELL_SIZE)+CELL_SIZE/2, (food.y*CELL_SIZE)+CELL_SIZE/2, CELL_SIZE/2, 0, Math.PI*2, false);
        context.fill();
    }

    function createFood() {
        var x = Math.floor(Math.random()*cols);
        var y;
        do {
            y = Math.floor(Math.random()*rows);
        } while(snake.collide(x, y));

        food = {x: x, y: y};
    }

}