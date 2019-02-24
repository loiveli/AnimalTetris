var rightTimer = 0;
var leftTimer = 0;
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
    var newPoint = { x: Math.round(rotatedX), y: Math.round(rotatedY) };
    rotatedPoints.push(newPoint);
  }
  return rotatedPoints;
};

moveBlock = (block, vector2) => {
  var posBlock = Object.assign({}, block);
  posBlock.pos = {
    x: posBlock.pos.x + vector2.x,
    y: posBlock.pos.y + vector2.y
  };
  return posBlock;
};
fallDown = () => {
  for (var i = 0; i < allblocks.length; i++) {
    var e = allblocks[i];
    var downCollision = checkCollision(
      moveBlock(e, { x: 0, y: -1 }),
      allblocks
    );
    if (downCollision === false) {
      allblocks[i] = moveBlock(e, { x: 0, y: -1 });
      //console.log(moveBlock(e, { x: 0, y: -1 }));
    } else if (downCollision === true) {
    } else {
      collision(e, downCollision);
      collision(true, [e]);
    }
  }
  //var downCollision =checkCollision(moveBlock(e,{x:0,y:-1}),allblocks)
};
checkCollision = (block, collision) => {
  var posBlocks = getBlockPos(block, block.pos);
  var collided = false;
  var blockPos = Object.assign({}, block.pos);
  blockPos.y += 1;
  var filteredList = collision.filter(e => e.id !== block.id);

  if (collision.length - filteredList.length > 1) {
  } else if (collision.length - filteredList.length === 1) {
    collision = filteredList;
  }

  var collisionArray = [];
  collision.forEach(element => {
    collisionArray.push({
      pos: getBlockPos(element, element.pos),
      type: element.type
    });
  });
  var type = [];

  posBlocks.forEach(element => {
    collisionArray.forEach(e => {
      var tempType = e;
      e.pos.forEach(e => {
        if (element.x === e.x && element.y === e.y) {
          collided = true;

          type.push(tempType);
        }
      });
    });
  });
  var collisions = [];
  type.forEach(element => {
    if (element && element.type === block.type) {
      collisions.push(collision[collisionArray.indexOf(element)]);
    }
  });

  if (posBlocks.some(e => e.y === -1)) {
    collided = true;
  }
  if (posBlocks.some(e => e.x === -1)) {
    collided = true;
  }
  if (posBlocks.some(e => e.x === 10)) {
    collided = true;
  }
  if (collisions.length > 0) {
    //console.log(collisions);
    return collisions;
  }
  if (collided) {
    return true;
  } else {
    return false;
  }
};
getNewBlock = () => {
  var newB = blockInit();
  nextBlocks.push(newB);
  currentBlock = nextBlocks.shift();
  handleNext(newB)
}
pysics = () => {
  timer++;
  timeScale = 50;
  var rightCollision = checkCollision(
    moveBlock(currentBlock, { x: 1, y: 0 }),
    allblocks
  );
  if (rightKey) {
    rightTimer++;
  } else {
    rightTimer = 0;
  }
  if (leftKey) {
    leftTimer++;
  } else {
    leftTimer = 0;
  }
  if (rightTimer > timeScale / 5 && rightCollision === false) {
    rightTimer = 0;
    currentBlock = moveBlock(currentBlock, { x: 1, y: 0 });
  } else if (!rightKey && rightCollision.length >= 1) {
    collision(currentBlock, rightCollision);
    getNewBlock();
    AddBlock(currentBlock);
  }
  var leftCollision = checkCollision(
    moveBlock(currentBlock, { x: -1, y: 0 }),
    allblocks
  );
  if (leftTimer > timeScale / 5 && leftCollision === false) {
    currentBlock = moveBlock(currentBlock, { x: -1, y: 0 });
    leftTimer = 0;
  } else if (!leftKey && leftCollision.length >= 1) {
    collision(currentBlock, leftCollision);
    getNewBlock();
    AddBlock(currentBlock);
  }
  if (leftCollision.pos) {
    //console.log("asd")
  }
  if (downKey) {
    timeScale = 25;
  }
  if (upKey) {
    var rotatedBlock = Object.assign({}, currentBlock);
    rotatedBlock.blocks = rotateBlock(rotatedBlock, -90);
    if (!checkCollision(rotatedBlock, allblocks)) {
      currentBlock.blocks = rotateBlock(currentBlock, -90);
      currentBlock.rotation += 1;
    }
    upKey = false;
  }
  var downCollision = checkCollision(
    moveBlock(currentBlock, { x: 0, y: -1 }),
    allblocks
  );
  if (downCollision === false && timer >= timeScale) {
    timer = 0;
    currentBlock = moveBlock(currentBlock, { x: 0, y: -1 });
  } else if (downCollision === true) {
    collision(currentBlock);
    getNewBlock();
    AddBlock(currentBlock);
  } else if (downCollision !== false) {
    collision(currentBlock, downCollision);
    getNewBlock();
    AddBlock(currentBlock);
  }
  fallDown();
};
