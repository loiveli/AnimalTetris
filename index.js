

var rows = 20;
var columns = 10;
var allblocks = [];
var xScale = (app.renderer.width / app.renderer.resolution) / columns;
var yScale = (app.renderer.height / app.renderer.resolution) / rows;
var paused = true;
var leftKey = false;
var downKey = false;
var upKey = false;
var rightKey = false;
var timer = 0;
var timeScale = 50;
var blockID = 0
var frames = 0;
var fallingBlocks = []
var points = 0
var Iblock = {
  blocks: [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 2 }],
  type: "giraffeBlock"
};
var Iblock2 = {
  blocks: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
  type: "crocBlock"
};
var oneBlock = {
  blocks: [{ x: 0, y: 0 }],
  type: "chickenBlock"
};
var Oblock = {
  blocks: [{ x: 0, y: 1 }, { x: 1, y: 1 },{ x: 1, y: 2 },{ x: 0, y: 2 }],
  type: "elephantBlock"
};
var nextBlocks =[]
var Lblock = {
  blocks: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
  type: "deerBlock"
};
var foxblock = {
  blocks: [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }],
  type: "foxBlock"
};
var pandablock = {
  blocks: [{ x: 0, y: 1 },  { x: 0, y: 2 }],
  type: "pandaBlock"
};
var currentBlock = {
  blocks: null,
  pos: null,
  id:null,
  rotation:0
};

blockInit = () => {
  var blocks = [Lblock, Iblock,Iblock2,oneBlock,Oblock,foxblock,pandablock];
  
  var RNGblock = Object.assign(
    {},
    blocks[Math.round(Math.random() * (blocks.length - 1))]
  );
  newBlock = {
    blocks: RNGblock.blocks,
    type: RNGblock.type,
    pos: { x: 2, y: 15 },
    id:blockID,
    rotation:0
  };
  blockID++
  
  return newBlock;
};


collision = (block, connection) => {
  if (!connection) {
    var newBlock = Object.assign({}, block);
    allblocks.push(newBlock);
    //console.log(allblocks);
  }else{
    points +=10
    connection.forEach(element => {
      if(allblocks.indexOf(element)>=0){
        if(block !== element){
          //console.log("deleted at index: " +allblocks.indexOf(element) )
          removeBlock(element)
          removeBlock(block)
          
          allblocks.splice(allblocks.indexOf(element),1)
        }
        
      }  
    });
    
  }
};

gameLoop = () => {
  if (!paused) {
    pysics();
    draw();
    checkBlocks()
  }
};

GameInit=()=>{
  for(var i = 0;i<4;i++){
    newB = blockInit()
    nextBlocks.push(newB)
    
  }
  
  currentBlock = nextBlocks.shift()
  AddBlock(currentBlock)
  nextBlocks.forEach(e=>{
    handleNext(e,true)
  })
  setInterval(gameLoop, 10);
  paused = false
}
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
