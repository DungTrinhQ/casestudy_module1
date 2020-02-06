function Snake(mapCols,mapRows){

    // phương hướng
    var LEFT = 0, UP = 1, RIGHT = 2, DOWN = 3;

    var direction; // phương hướng di chuyển
    var data; // thân rắn
    this.init = function(){
        var x = 3;
        var y = 0;
        data = [
            {x: x, y: y},
            {x: x-1, y: y},
            {x: x-2, y: y}
        ];
        direction = RIGHT;
    };
    this.handleKey = function(key){
        // 37: trái, 38: lên, 39: phải, 40: xuống
        if(key >= 37 && key <=40)
        {
            var newdir = key - 37;
            if(Math.abs(direction-newdir)!=2) // khoong
                direction = newdir;
        }
    };
    this.draw = function(ctx) {
        for(var i = 0;i < data.length; i++)
            ctx.fillRect(data[i].x*CELL_SIZE, data[i].y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
    };

    this.update = function(food){
        var x = data[0].x;
        var y = data[0].y;

        switch(direction) {
            case LEFT:
                x--; break;
            case UP:
                y--; break;
            case RIGHT:
                x++; break;
            case DOWN:
                y++; break;
        }

        // eat food: return 1
        if(x == food.x && y == food.y)
        {
            data.unshift(food);
            return 1;
        }
        // collide: return 2
        if(this.collide(x,y))
            return 2;
        // snake move by
        // adding the head
        data.unshift({x:x, y:y});
        // and cutting the tail
        data.pop();
        // default: return 0
        return 0;
    };
    this.alert = function () {
        return alert('Game Over');
    };
    this.collide = function(x, y) {

        if(x < 0 || x > mapCols-1) {
            this.alert();
            return true;
        }
        if(y < 0 || y > mapRows-1){
            this.alert();
            return true;
            }

        for(let i = 0; i<data.length; i++) {
            if(x == data[i].x && y == data[i].y){
                this.alert();
                return true;
                }
        }
        return false;
    }
}