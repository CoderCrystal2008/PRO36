class Food {
    constructor(foodStock,lastFed){

    }

    
    preload(){
        //preloads the image of milk
        var milkImg = loadImage("images/Milk.png");
    }

    getFoodStock(){
        var getFoodStockRef = database.ref("Food");
        getFoodStockRef.on("value",function(data){
            food = food
        })
    }
    updateFoodStock(){
        database.ref("/").update({
            foodS = foodS
        })
            
        
    }
    
}