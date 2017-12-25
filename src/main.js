var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;


/**
 * 生成随机数
 * @param {*} min 随机数下边界
 * @param {*} max 随机数上边界
 */
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

/**
 * 球
 * @param {number} x 小球在屏幕上开始的x坐标
 * @param {number} y 小球在屏幕上开始的y坐标
 * @param {number} velX 小球水平运动速度
 * @param {number} velY 小球垂直运动速度
 * @param {string} color 小球颜色
 * @param {number} size 小球半径
 */
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}
/**
 * 绘制小球
 */
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
/**
 * 根据小球与四个边界的关系，更新小球位置
 */
Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
/**
 * 检测其他小球与当前运动小球的距离
 * 相撞则变红色
 */
Ball.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++){
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var sumSize = this.size + balls[j].size;
      if (distance < sumSize) {
        balls[j].color = this.color = 'red';
      }
    }
  }
}
//小球实例
var balls = [];
//最多25个球
var ballNums = 25;
//最大速度和尺寸
var maxVel = 10;
var maxSize = 30;
var minSize = 0;
/**
 * 利用requestAnimationFrame()方法循环开始动画
 * 
 */
function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < ballNums) {
    var ball = new Ball(
      random(0, width),
      random(0, height),
      random(-maxVel, maxVel),
      random(-maxVel,maxVel),
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      random(minSize, maxSize)
    );

    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}
loop();