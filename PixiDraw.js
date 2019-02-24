let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  deer_animal,
  chicken_animal,
  croc_animal,
  fox_animal,
  elephant_animal,
  giraffe_animal,
  panda_animal,
  gameHolder = document.getElementById("gameHolder"),
  renderer = PIXI.autoDetectRenderer(360,720),
  newUIblocks =[]

//Create a Pixi Application
let app = new Application({
  width: 360,
  height: 720,
  antialias: true,
  transparent: false,
  resolution: 1
  
});
let UI = new Application({
  width: 360,
  height: 360,
  antialias: true,
  transparent: false,
  resolution: 1
});
var drawBlocks = [];
gameHolder.appendChild(app.view);
gameHolder.append(UI.view)
let myGraph = new PIXI.Graphics();
myGraph.position.set(0,0)
app.renderer.view.style.position = "absolute"
app.renderer.view.style.left = "33%"
app.renderer.view.style.top = "10%"
UI.renderer.view.style.position = "absolute"
UI.renderer.view.style.left = "55%"
UI.renderer.view.style.top = "10%"
app.stage.position.y = app.renderer.height / app.renderer.resolution;
app.stage.position.x = 0
app.stage.scale.y = -1;

drawPixiGrid = () => {
  myGraph.position.set(0,0)
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      

      // set the line style to have a width of 5 and set the color to red
      myGraph.lineStyle(1, 0x000000);
      myGraph.drawRect(j*xScale, i*yScale, xScale, yScale);
    }
  }
  
  
  
  app.stage.addChild(myGraph);
  
  
};

//load an image and run the `setup` function when it's done
loader.add("images/asset.json").load(setup);

//This `setup` function will run when the image has loaded
function setup() {
  //Create the cat sprite
  let asset = PIXI.loader.resources["images/asset.json"];
  deer_animal = asset.textures["animal_deer.png"];
  giraffe_animal = asset.textures["animal_girafe.png"];
  croc_animal = asset.textures["animal_crocodile.png"]
  chicken_animal=asset.textures["animal_chicken.png"]
  panda_animal = asset.textures["animal_panda.png"]
  fox_animal = asset.textures["animal_fox.png"]
  elephant_animal = asset.textures["animal_elephant.png"]
  //console.log(deer_animal);
  //Add the cat to the stage
  GameInit();
  drawPixiGrid()
  PixiInit()
  UI.renderer.backgroundColor = 0xffffff
  app.renderer.backgroundColor = 0x00ffff
}
var pointText
PixiInit=()=>{
  var text = "Points:"  + points.toString()
  pointText = new PIXI.Text(text)
  UI.stage.addChild(pointText)
}
handleNext=(newB,init)=>{
  var newSprite
  switch (newB.type) {
    case "deerBlock":
      newSprite = new Sprite(deer_animal);
      newSprite.pivot = {x:15,y:15}
      break;
    case "giraffeBlock":
      newSprite = new Sprite(giraffe_animal);
      newSprite.pivot = {x:15,y:45}
      break;
      case "crocBlock":
      newSprite = new Sprite(croc_animal);
      newSprite.pivot = {x:15,y:15}
      break;
      case "elephantBlock":
      newSprite = new Sprite(elephant_animal)
      newSprite.pivot ={x:15,y:45}
      break
      case "foxBlock":
      newSprite = new Sprite(fox_animal)
      newSprite.pivot ={x:15,y:45}
      break
      case "pandaBlock":
      newSprite = new Sprite(panda_animal)
      newSprite.pivot ={x:15,y:45}
      break
      case "chickenBlock":
      newSprite= new Sprite(chicken_animal)
      newSprite.pivot ={x:15,y:15}
      break
  }
  if(!init){
    UI.stage.removeChild(newUIblocks.shift())
  }
  UI.stage.addChild(newSprite)
  newUIblocks.push(newSprite)

 
  for(var i = 0;i<newUIblocks.length;i++){
    
    newUIblocks[i].x = i*60//+newUIblocks[i].pivot.x
    newUIblocks[i].y = 120

  }
}
checkBlocks=()=>{
  var LiveIDS = []
  LiveIDS.push(currentBlock.id)
  allblocks.forEach(e=>{
    LiveIDS.push(e.id)
  })
  for(var i=0;i<drawBlocks.length;i++){
    if(LiveIDS.some(e=> e===drawBlocks[i].id)){
      //console.log(LiveIDS.some(e=> e===drawBlocks[i].id))
    }else{
      app.stage.removeChild(drawBlocks[i].sprite);
      drawBlocks.splice(i,1)
      //console.log("WTF")
      
    }
  }

}
updateBlocks = block => {
  //console.log(drawBlocks);
  var correctBlock = drawBlocks.filter(e => e.id === block.id);
  if (correctBlock.length > 0) {
    correctBlock[0].sprite.x = block.pos.x * xScale +correctBlock[0].pivot.x;
    correctBlock[0].sprite.y = block.pos.y * yScale+correctBlock[0].pivot.y;
    correctBlock[0].sprite.rotation = (block.rotation*-90)*(Math.PI/180)+(-180)*(Math.PI/180)
    correctBlock[0].sprite.scale.x = -1    
      
    //console.log(correctBlock[0].sprite.pivot)
  }
  pointText.text = "Points: " +points
};
removeBlock = block => {
  /*
  var correctBlock = drawBlocks.filter(e => e.id === block.id);
  if (correctBlock.length > 0) {
    drawBlocks.splice(drawBlocks.indexOf(correctBlock[0], 1));
    app.stage.removeChild(correctBlock[0].sprite);
  }*/
};
ShowNext=()=>{

}
AddBlock = block => {
  //console.log();
  var newSprite = null;
  var newObj = { sprite: null, id: block.id,pivot:null };
  var pivot = null
  switch (block.type) {
    case "deerBlock":
      newSprite = new Sprite(deer_animal);
      pivot = {x:15,y:15}
      break;
    case "giraffeBlock":
      newSprite = new Sprite(giraffe_animal);
      pivot = {x:15,y:45}
      break;
      case "crocBlock":
      newSprite = new Sprite(croc_animal);
      pivot = {x:15,y:15}
      break;
      case "elephantBlock":
      newSprite = new Sprite(elephant_animal)
      pivot ={x:15,y:45}
      break
      case "foxBlock":
      newSprite = new Sprite(fox_animal)
      pivot ={x:15,y:45}
      break
      case "pandaBlock":
      newSprite = new Sprite(panda_animal)
      pivot ={x:15,y:45}
      break
      case "chickenBlock":
      newSprite= new Sprite(chicken_animal)
      pivot ={x:15,y:15}
      break
  }
  newObj.sprite = newSprite;
  newObj.sprite.x = (block.pos.x * xScale)+pivot.x;
  newObj.sprite.y = (block.pos.y * yScale)+pivot.y;
  //console.log(newSprite.pivot)
  newObj.pivot = pivot
  newObj.sprite.pivot.set(pivot.x,pivot.y)
  drawBlocks.push(newObj);
  //console.log(newSprite.pivot)
  app.stage.addChild(newObj.sprite);
};
