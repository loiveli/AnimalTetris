keyDownHandler = e => {
    e.preventDefault()
    
    switch(e.code){
      case "ArrowLeft":
      leftKey = true;
      leftTimer = timeScale/5+1
      break;
      case "ArrowRight":
      rightKey = true;
      rightTimer = timeScale/5+1
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
    
    ;
  
  };
  keyUpHandler = e => {
   e.preventDefault()
    
    switch(e.code){
      case "ArrowLeft":
      leftKey = false;
      break;
      case "ArrowRight":
      rightKey = false;
      break;
      
      case "ArrowDown":
      downKey = false
      break;
      
    }
    
    
  
  };