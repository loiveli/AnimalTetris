var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var Lblock = { blocks: [0, 1, 2, 12] };
var currentBlock = { block: Lblock, pos: { x: 5, y: 15 } };
var rows = 20;
var columns = 10;
var allblocks = [];
var xScale = canvas.width / columns;
var yScale = canvas.height / rows;
var paused = false;

var timeScale = 500;
var frames = 0;
var Iblock = {
  blocks: [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
  type: "Iblock"
};
var Lblock = {
  blocks: [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
  type: "Lblock"
};
var currentBlock = {
  blocks: null,
  pos: null
};
gameInit = ()=>{
    var blocks = [Lblock,Iblock]
    var RNGblock = Object.assign({},blocks[1])
    currentBlock ={
        blocks: RNGblock,
        pos:{ x: Math.round(Math.random() * (columns - 4)), y: 15 }
    }
    console.log(currentBlock)
    draw()
}
keyDownHandler = e => {
  console.log(getBlockPos(currentBlock, currentBlock.pos));
  paused = !paused;
  console.log("pressed key");
};
drawGrid = () => {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      ctx.beginPath();
      ctx.rect(j * xScale, i * yScale, xScale, yScale);
      ctx.stroke();
      ctx.closePath();
    }
  }
};
getBlockPos = (block, pos) => {
  correctPos = [];
  block.blocks.forEach(element => {
    var newX = element.x + pos.x;
    var newY = element.y + pos.y;
    correctPos.push({ x: newX, y: newY });
  });
  return correctPos;
};
rotateBlock = (block, angle) => {
  a = angle * (Math.PI / 180); // Convert to radians
  var rotatedPoints = [block.blocks[0]];
  for (var i = 1; i < block.blocks.length; i++) {
    var rotatedX =
      Math.cos(a) * (block.blocks[i].x - block.blocks[0].x) -
      Math.sin(a) * (block.blocks[i].y - block.blocks[0].y) +
      block.blocks[0].x;
    var rotatedY =
      Math.sin(a) * (block.blocks[i].x - block.blocks[0].x) -
      Math.cos(a) * (block.blocks[i].y - block.blocks[0].y) +
      block.blocks[0].y;
    var newPoint = { x: rotatedX, y: rotatedY };
    rotatedPoints.push(newPoint);
  }
  return rotatedPoints;
};
drawBlock = block => {
  ctx.beginPath();
  getBlockPos(block, block.pos).map((val, idx) => {
    return ctx.rect(val.x * xScale, val.y * yScale, xScale, yScale);
  });
  ctx.fill();
  ctx.closePath();
};
checkCollision = (block, collision) => {
  var posBlocks = getBlockPos(block, block.pos);
  var collided = false;
  if (posBlocks.some(e => e.y === 0)) {
    collided = true;
  }
  var correctBlocks = [];
  collision.forEach(element => {
    correctBlocks = correctBlocks.concat(getBlockPos(element, element.pos));
  });

  if (collided) {
    return true;
  } else {
    return false;
  }
};
ctx.translate(0, canvas.height);
ctx.scale(1, -1);
draw = () => {
  if (!paused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    drawBlock(currentBlock);
    allblocks.forEach(element => {
      drawBlock(element);
    });
  }
};

gameInit()
setInterval(draw, timeScale);

document.addEventListener("keydown", keyDownHandler, false);
