/** 
 * @desc    坦克
 * @author  unofficial
 * @param   hero;   英雄
 * @param   npc;    行尸
 */
var Tank = (function() {

    // 方向
    var direction = ['up', 'right', 'down', 'left'];
    // 坦克尺寸
    var tankSize = {
        'width': 32,
        'height': 32
    }
    // 全局变量 地图，坦克数据，关卡数据
    var map, impact, tankInfo, level;
    // 随机范围内整数
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    function Tank() {
        var args = [].slice.call(arguments);
        // tank的属性
        this.roleName = args[0];
        this.size = tankSize;
        map = args[1]['map'];
        impact = args[1]['impact'];
        tankInfo = args[1]['dataInfo']['tankInfo'];
        level = args[1]['dataInfo']['level'];
        allObj = args[1]['allObj'] || [];
        
        this.draw();
        // 初始状态为1
        this.position = 1;
        // hero
        if(this.roleName === 'hero') {
            // 英雄坦克固定位置，正向居中在地图上，等待命令
            var x = (map.mapEle.clientWidth - this.tanker.clientWidth) / 2;
            var y = (map.mapEle.clientHeight - this.tanker.clientHeight) / 2;
            this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';

            // 控制移动
            this.data = {
                direction: direction[randomIntFromInterval(0, 3)], // 随机方向
                speed: 1,
                src: {
                    x: x,
                    y: y
                }
            };

        } else if(this.roleName === 'npc') {
            // npc坦克随机位置
            var x, y;
            this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';

            // 控制移动
            this.data = {
                direction: direction[randomIntFromInterval(0, 3)],
                speed: 1,
                src: {
                    x: randomIntFromInterval(0, map.mapEle.clientWidth - tankSize.width),
                    y: randomIntFromInterval(0, map.mapEle.clientHeight - tankSize.height)
                }
            };

            // 自由移动
            this.move();

        }
    }

    // 往地图中画坦克
    function draw() {
        var divEle = document.createElement('div');
        divEle.className = 'tank ' + this.roleName;

        map.mapEle.appendChild(divEle);
        this.tanker = divEle;
    }

    // 上移动
    function moveUp() {
        // 保持原来的X方向不变，Y方向正向移动
        this.data.src.y--;
        var isImpact = impact.border(this, allObj);
        var x = this.data.src.x;
        var y = isImpact ? ++this.data.src.y : ++this.data.src.y - this.data.speed * 2;

        this.data.src = {
            x: x,
            y: y
        }
        this.data.direction = direction[0];
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
        // 移动过程中切换状态
        this.changeStatus();
    }
    

    // 右移动
    function moveRight() {
        // 保持原来的X方向不变，Y方向正向移动
        this.data.src.x++;
        var isImpact = impact.border(this, allObj);
        var x = isImpact ? --this.data.src.x : --this.data.src.x + this.data.speed * 2;
        var y = this.data.src.y;

        this.data.src = {
            x: x,
            y: y
        }
        this.data.direction = direction[1];
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
        // 移动过程中切换状态
        this.changeStatus();

    }

    // 下移动
    function moveDown() {
        // 保持原来的X方向不变，Y方向正向移动
        this.data.src.y++;
        var isImpact = impact.border(this, allObj);
        var x = this.data.src.x;
        var y = isImpact ? --this.data.src.y : --this.data.src.y + this.data.speed * 2;

        this.data.src = {
            x: x,
            y: y
        }
        this.data.direction = direction[2];
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
        // 移动过程中切换状态
        this.changeStatus();
    }

    // 左移动
    function moveLeft() {
        // 保持原来的X方向不变，Y方向正向移动
        this.data.src.x--;
        var isImpact = impact.border(this, allObj);
        var x = isImpact ? ++this.data.src.x : this.data.src.x - this.data.speed * 2;
        var y = this.data.src.y;

        this.data.src = {
            x: x,
            y: y
        }
        this.data.direction = direction[3];
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
        // 移动过程中切换状态
        this.changeStatus();
    }

    // 自由移动操作
    // 从A移动到B
    // tanker direction up
    // eg: 50, 50 -> 10, 10
    // up: 50 -> 10, left: 50 -> 10
    // test
    function move() {
        var src = this.data.src;
        var x = src.x, y = src.y;

        // 检测位置碰撞情况
        // 碰撞地图边缘
        var isImpact = impact.border(this, allObj);
        if(isImpact) {
            switch(this.data.direction) {
                case 'up':
                    this.data.direction = direction[2];
                    break;
                case 'right':
                    this.data.direction = direction[3];
                    break;
                case 'down':
                    this.data.direction = direction[0];
                    break;
                case 'left':
                    this.data.direction = direction[1];
                    break;
            }
        }

        // 根据方向判断移动位置
        switch(this.data.direction) {
            case 'up':
                y -= this.data.speed;
                break;
            case 'right':
                x += this.data.speed;
                break;
            case 'down':
                y += this.data.speed;
                break;
            case 'left':
                x -= this.data.speed;
                break;
        }

        this.data.src = {
            x: x,
            y: y
        }
        
        // 保持原来的X方向不变，Y方向正向移动
        var x = this.data.src.x;
        var y = this.data.src.y;
        this.tanker.style.transform = 'translate3d('+ x + 'px,' + y + 'px, 0)';
        // 移动过程中切换坦克链条状态
        this.changeStatus();

        // 射击
        // this.fire();
        // 自动更换方向
        if(this.moveId % 360 === 1 && this.moveId !== 1) {
            
            // 全部坦克对象随机更换方向
            for(var t in allObj) {
                (allObj[t].roleName == 'npc') && (allObj[t].data.direction = direction[randomIntFromInterval(0, 3)]);
            }

        }
        
        this.moveId = requestAnimationFrame(this.move.bind(this));

    }

    // 切换坦克链条状态
    function changeStatus() {
        this.tanker.style.backgroundPosition = this.position === 1 ? tankInfo[this.roleName][0].position2[this.data.direction] : tankInfo[this.roleName][0].position1[this.data.direction];
        // 更改状态值
        this.position = this.position === 1 ? 2 : (this.position === 2 ? 1 : 2);
    }

    // 射击
    function fire() {
        if(!this.bulletStatus) {
            this.bullet = new Bullet(this.data.direction, this.data.speed, this.data.src, tankSize, map, impact);
            this.bulletStatus = this.bullet.status;
        } else {
            this.bullet.move();
            this.bulletStatus = this.bullet.status;
        }
    }


    Tank.prototype = {
        draw: draw,
        move: move,
        moveUp: moveUp,
        moveRight: moveRight,
        moveDown: moveDown,
        moveLeft: moveLeft,
        changeStatus: changeStatus,
        fire: fire
    }

    return Tank;
})()