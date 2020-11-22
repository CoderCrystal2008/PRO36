//creates the database
var database;
var foodP;
//creates the variable for the dog
var dog, happyDog;

//creates the food supply
var foodStock, foodS;

//creates the variables for the dog images
var dogImg, happyDogImg;

//creates the last fed variable
var lastFed;

//creates the image variables
var bedroomImg, gardenImg, washroomImg;

var feed, addFoods;

var gameState = 0;

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
  
  //makes bg
  bg = createSprite(250,250,500,500);
  bg.addImage("gardenImg",gardenImg);

  bg.addImage("bedroomImg",bedroomImg);
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
   addFoods.mousePressed(addFood);

   //reads the game state from the database
   readingGameState = database.ref("gameState");
   readingGameState.on("value",function(data){
     gameState = data.val();
   });


}


function draw() {  
  background(46,139,87);
  
  fill(0);
  text("Press the UP ARROW to feed the dog!",150,100);
  text("Remaining food:"+foodS,150,150);

  //reads last fed time
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  //shows the game states
  if(hour()=== lastFed){
    writeGameState("Playing");
    bg.changeImage("bedroomImg",bedroomImg);
  } else if(hour() === (lastFed+2)){
    writeGameState("Sleeping");
    foodObj.bedroom();
  } else if(hour()>(lastFed+2)&& hour()<=(lastFed+4)){
    writeGameState("Bathing");
    foodObj.washroom();
  }else{
    writeGameState("Hungry");
    foodObj.display();
  }
  
  drawSprites();
  foodObj.display();
  //add styles here

  //to show last feed time
  fill(255,255,254);
  textSize(15);
  currentTime = hour();
  text("Last Feed:"+currentTime, 350,30);
  
    
 console.log(gameState);
readGameState();

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
 dog.changeAnimation("happyDogImg",happyDogImg);
 foodStock = database.ref("Food");
 foodObj.getFoodStock(deductFood());
 database.ref("/").update({
   FeedTime : hour()
 })
}

function addFood(){
  foodS++;
  writeStock(foodS);
}

function readGameState(){
  database.ref("gameState").on("value",function(data){
    gameState = data.val();
  })
}

function writeGameState(y){
  database.ref("/").update({
    gameState:y
  })
}











