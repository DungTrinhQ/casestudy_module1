let CELL_SIZE = 10;
let FPS = 10    ;
let WIDTH = 400;
let HEIGHT = 400;

let Game = function(canvas_id){
    let pressedKey;
    let cols = WIDTH/CELL_SIZE;
    let rows = HEIGHT/CELL_SIZE;
    let snake = new Snake(cols,rows);


    let canvas = document.getElementById(canvas_id);
    let context = canvas.getContext('2d');

    let food = {};
    let running = false;
    let timer;

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

        // màn hình bắt đầu game
        context.textAlign = "center";
        context.font = "36px Arial";
        context.fillText("Snake",WIDTH/2,HEIGHT/3);
        context.font = "16px Arial";
        context.fillText("Press Enter to start",WIDTH/2,HEIGHT/2);

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
        let ret = snake.update(food);

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
        let x = Math.floor(Math.random()*cols);
        let y;
        do {
            y = Math.floor(Math.random()*rows);
        } while(snake.collide(x, y));

        food = {x: x, y: y};
    }

}