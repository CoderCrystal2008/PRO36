class Food {
    constructor(fedTime,lastFed){
        //preloads the image of milk
        this.image = loadImage("images/Milk.png");

       
        
    }

    display(){
        var x = 80, y = 300;

        imageMode(CENTER);

        if(foodS!==0){
            for(var i = 0; i< foodS;i++){
                if(i%10 === 0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }


    getFoodStock(){
        var getFoodStockRef = database.ref("Food");
        getFoodStockRef.on("value",function(data){
            foodS = data.val();
        })
    }
    /*updateFoodStock(){
        database.ref("/").update({
            Food:
        }) 
    }*/

    deductFood(){
        database.ref("/").update({
            Food: foodS - 1
        })
    }
    
}