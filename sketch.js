//creates the database
var database;

//creates the variable for the dog
var dog, happyDog;

//creates the food supply
var foodStock, foodS;

//creates the variables for the dog images
var dogImg, happyDogImg;

//creates the last fed variable
var lastFed;

//creates the changingGameState and readingGameState variables
var changingGameState, readingGameState;

//creates the image variables
var bedroomImg, gardenImg, washroomImg;

function preload(){
  //loads the dog images
  dogImg = loadAnimation("images/dogImg.png");
  happyDogImg = loadAnimation("images/dogImg1.png");

  //loads the bedroom image
  bedroomImg = loadImage("virtualPetImages/BedRoom.png")

  //loads the garden image
  gardenImg = loadImage("virtualPetImages/Garden.png");

  //loads the washroom image
  washroomImg = loadImage("virtualPetImages/WashRoom.png");

  //loads the dead dog image
  sadDog = loadImage("virtualPetImages/deadDog.png");
}

	


function setup() {
  createCanvas(500, 500);

  //assigns firebase database to the variable database
  database = firebase.database();
  foodObj=new Food();
  //fetches food from database
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  //creates the dog and adds the animation
  dog = createSprite(250,250,50,50);
  dog.addAnimation("dogImg",dogImg);
  dog.addAnimation("happyDogImg",happyDogImg);
  dog.scale = 0.2;

   //creates the buttons
   feed = createButton("Feed the dog");
   feed.position(600,95);
   feed.mousePressed(feedDog);
  
   addFoods = createButton("Add more Food");
   addFoods.position(700,95);
   addFoods.mousePressed(addFoods);

   //reads the game state from the database
   readingGameState = database.ref("gameState");
   readingGameState.on("value",function(data){
     gameState = data.val();
   });
}


function draw() {  
  background(46,139,87);
  foodObj.display();
  fill(0);
  text("Press the UP ARROW to feed the dog!",150,100);
  text("Remaining food:"+foodS,150,150);

  //reads last fed time
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  
  drawSprites();
  //add styles here

  //to show last feed time
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12+ "PM",350,30);
  }else if (lastFed===0){
    text("Last Feed: 12 AM", 350,30);
  }else {
    text("Last feed:"+lastFed+ "AM",350,30);
  }

  //shows the game states
  /*currentTime = hour();
  if(currentTime === (lastFed+1)){
    update("Playing");
    food.garden();
  } else if(currentTime === (lastFed+2)){
    update("Sleeping");
    food.bedroom();
  } else if(currentTime>(lastFed+2)&& currentTime<=(lastFEd+4)){
    update("Bathing");
    food.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }*/

  //checks whether the game state is "Hungry" or not
  /*if(gameState !== "Hungry"){
    feed.hide();
    addFoodss.hide();
    dog.remove();
  }else{
    feed.show();
    addFoodss.show();
    dog.addImage(sadDog);
  }

  lastFed = 0;*/

}

//this function reads the value from the database
function readStock(data){
  foodS = data.val();
}

//this function writes the value from the database
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}


function feedDog(){
 foodS = foodS - 1;
 dog.changeAnimation("happyDogImg",happyDogImg);
 //foodObj.x = 240;
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}


async function hour(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var responseJSON = await response.json();
}

/*function update(state){
  database.ref("/").update({
    gameState : state
  })
}*/






