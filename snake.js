let Snake = function (mapCols, mapRows) {

    // phương hướng
    let LEFT = 0, UP = 1, RIGHT = 2, DOWN = 3;
    let direction; // phương hướng di chuyển
    let data; // thân rắn
    let score = 0;
    this.init = function () {
        let x = 3;
        let y = 0;

        data = [
            {x: x, y: y},
            {x: x - 1, y: y},
            {x: x - 2, y: y}
        ];
        direction = RIGHT;
    };
    this.handleKey = function (key) {
        // 37: trái, 38: lên, 39: phải, 40: xuống
        if (key >= 37 && key <= 40) {
            let newdir = key - 37;
            if (Math.abs(direction - newdir) != 2) // không di chuyển theo chiều ngược lại
                direction = newdir;
        }
    };
    this.draw = function (ctx) {
        for (let i = 0; i < data.length; i++)
            ctx.fillRect(data[i].x * CELL_SIZE, data[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    };

    this.update = function (food) {
        let x = data[0].x;
        let y = data[0].y;

        switch (direction) {
            case LEFT:
                x--;
                break;
            case UP:
                y--;
                break;
            case RIGHT:
                x++;
                break;
            case DOWN:
                y++;
                break;
        }

        // eat food: return 1
        if (x == food.x && y == food.y) {
            data.unshift(food);
            score += 1;
            document.getElementById('score').innerHTML = 'Score:'+score;
            return 1;
        }
        // collide: return 2
        if (this.collide(x, y))
            return 2;
        // di chuyển snake
        // bỏ đầu
        data.unshift({x: x, y: y});
        // cắt đuôi
        data.pop();
        // default: return 0
        return 0;
    };
    this.alert = function () {
        return alert('Game Over, your score is: '+ score);
    };
    this.collide = function (x, y) {

        if (x < 0 || x > mapCols - 1) {
            this.alert();
            return true;
        }
        if (y < 0 || y > mapRows - 1) {
            this.alert();
            return true;
        }

        for (let i = 0; i < data.length; i++) {
            if (x == data[i].x && y == data[i].y) {
                this.alert();
                return true;
            }
        }
        return false;
    }
}