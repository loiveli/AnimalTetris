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
var leftKey = false
var downKey = false
var upKey = false
var rightKey = false
var timer = 0;
var timeScale = 5
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
blockInit = () => {
  var blocks = [Lblock, Iblock];
  var RNGblock = Object.assign({}, blocks[Math.round(Math.random()*(blocks.length-1))]);
  currentBlock = {
    blocks: RNGblock.blocks,
    type: RNGblock.type,
    pos: { x: Math.round(Math.random() * (columns - 4)), y: 15 }
  };
  console.log(currentBlock);
  draw();
};
keyDownHandler = e => {
  console.log(getBlockPos(currentBlock, currentBlock.pos));
  
  switch(e.code){
    case "ArrowLeft":
    leftKey = true;
    break;
    case "ArrowRight":
    rightKey = true;
    break;
    case "ArrowUp":
    upKey = true;
    break;
    case "ArrowDown":
    downKey = true;
    break;
    case "Space":
    paused = !paused;
    break;
  }
  
  console.log("pressed key: " +e.code);

};
keyUpHandler = e => {
  console.log(getBlockPos(currentBlock, currentBlock.pos));
  
  switch(e.code){
    case "ArrowLeft":
    leftKey = true;
    break;
    case "ArrowRight":
    rightKey = true;
    break;
    case "ArrowUp":
    upKey = true;
    break;
    case "ArrowDown":
    downKey = true;
    break;
    case "Space":
    paused = !paused;
    break;
  }
  
  console.log("pressed key: " +e.code);

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
moveBlock = (block,vector2) => {
  var posBlock = Object.assign({},block) 
  posBlock.pos ={x:posBlock.pos.x+vector2.x,y:posBlock.pos.y+vector2.y}
    return posBlock
};
checkCollision = (block, collision) => {
  var posBlocks = getBlockPos(block, block.pos);
  var collided = false;
  
  var collisionArray =[]
  collision.forEach(element=>{
    collisionArray = collisionArray.concat(getBlockPos(element,element.pos))
  })
  posBlocks.forEach(element =>{
    //console.log(element)
    collisionArray.forEach(e=>{
      if(element.x === e.x&&element.y === e.y){
        console.log("asd")
        collided = true
      }
    })
  })
  if (posBlocks.some(e => e.y === -1)) {
    collided = true;
  }
  if (collided) {
    return true;
  } else {
    return false;
  }
};
ctx.translate(0, canvas.height);
ctx.scale(1, -1);
collision =(block) =>{
  var newBlock = Object.assign({},block)
  allblocks.push(newBlock)
  console.log(allblocks)
}
pysics = () => {
  timer++
  if (!checkCollision(moveBlock(currentBlock,{x:0,y:-1}),allblocks)&&timer >= timeScale) {
   timer =0
    currentBlock = moveBlock(currentBlock,{x:0,y:-1})

  }else if(checkCollision(moveBlock(currentBlock,{x:0,y:-1}),allblocks)){
    collision(currentBlock)
    blockInit()
  }
};
gameLoop = () => {
  if (!paused) {
    pysics();
    draw();
  }
};
draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  drawBlock(currentBlock);
  allblocks.forEach(element => {
    drawBlock(element);
  });
};

blockInit();
setInterval(gameLoop, 100);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
