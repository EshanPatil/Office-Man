// Office Man 


var freddy, coin, ground, invisGround, cloud, rocket, obstacle, ob1, ob2, ob3, ob4;
var freddy_running, background_image, cloud_img, rocket_img, gameOverImg, restartImg, yesImg, noImg;
var obstacleGroup, cloudGroup, coinsGroup, rocketsGroup
var pause1, play;
var gameOver, restart; 

var PLAY = 3
var END = 2
var PAUSE = 1
var PLAYED = 0
var gameState = PLAY


// </>
function preload(){
freddy_running = loadAnimation("freddy.png", "freddy2.png", "freddy3.png", "freddy4.png", "freddy5.png", "freddy6.png", "freddy7.png", "freddy8.png");
freddy_collided= loadAnimation("freddyDed.png");
background_image = loadImage("background.png");
coin_animation = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png", "coin6.png", "coin7.png", "coin8.png", "coin9.png");
coin_stop = loadAnimation("coin1.png")

cloud_img = loadImage("cloud.png");
rocket_img = loadImage("rocket2.png");

ob1 = loadImage("obstacle1.png");
ob2 = loadImage("obstacle2.png");
ob3 = loadImage("obstacle3.png");
ob4 = loadImage("obstacle4.png");

gameOverImg = loadImage("gameOver.png")
restartImg = loadImage("resetbutton.png")

pauseImg = loadImage("pause.png")
playImg = loadImage("play.png")
}
// </>


// </> </>
function setup() {
 createCanvas(500, 200)

 freddy = createSprite(50,105,20,20)
 freddy.addAnimation("running", freddy_running)
 freddy.addAnimation("collided", freddy_collided)
 freddy.scale = 0.3


 ground = createSprite(300, 90, 1000, 10)
 ground.addImage(background_image)
 ground.velocityX = -10


invisGround = createSprite(300, 140, 600, 10)
invisGround.visible = false

gameOver = createSprite(250, 50, 10, 10)
gameOver.addImage(gameOverImg)
gameOver.scale= 0.4
restart = createSprite(250, 90, 10, 10)
restart.addImage(restartImg)
restart.scale= 0.2

obstacleGroup = new Group();
cloudGroup = new Group();
coinsGroup = new Group();
rocketsGroup = new Group();

pause1 = createSprite(15, 15, 10, 10)
pause1.addImage(pauseImg);
pause1.scale= 0.1

}
// </> </>


var score = 0
var score1 = 0

// </> </> </>
function draw() {
 background("white");
 text("Score: " + score, 400, 20)
 text("Points: " + score1, 300, 20)
 freddy.collide(invisGround);


 if (mousePressedOver(play)) {
    gameState = PLAYED
} 
 if (gameState === PLAY) {
    ground.velocityX = -10;

    gameOver.visible= false
    restart.visible= false
    
    if (ground.x<200) {
        ground.x=300;
     }

     if (keyDown("space") && freddy.y>=50) {
        freddy.velocityY = -13;
    } 

    freddy.velocityY = freddy.velocityY+1;
    score = score + Math.round(getFrameRate() / 60)

    spawnCoins();
    spawnClouds();
    spawnRockets();
    spawnObstacles();

 if (mousePressedOver(pause1)) {
     gameState = PAUSE
 }  

 if (rocketsGroup.isTouching(freddy)) {
    gameState = END
 }

 if (coinsGroup.isTouching(freddy)) {
    destroyCoin();
 }

 if (obstacleGroup.isTouching(freddy)) {
     gameState = END
 }
 }
 
 else if (gameState === END) {
     ground.velocityX = 0
     obstacleGroup.setLifetimeEach(-200)
     cloudGroup.setLifetimeEach(-349875)
     coinsGroup.setLifetimeEach(-3748)
     rocketsGroup.setLifetimeEach(-1283)

     freddy.changeAnimation("collided", freddy_collided)
     gameOver.visible= true
     restart.visible= true

     obstacleGroup.setVelocityXEach(0);
     cloudGroup.setVelocityXEach(0);
     coinsGroup.setVelocityXEach(0);
     rocketsGroup.setVelocityXEach(0);

     if (mousePressedOver(restart)) {
         reset();
     }
 } 
 
 else if (gameState === PAUSE) {
    ground.velocityX = 0
    obstacleGroup.setLifetimeEach(-200)
    cloudGroup.setLifetimeEach(-349875)
    coinsGroup.setLifetimeEach(-3748)
    rocketsGroup.setLifetimeEach(-1283)

    freddy.changeAnimation("collided", freddy_collided)
    gameOver.visible= false
    restart.visible= false
    
    play = createSprite(45, 15, 10, 10)
    play.addImage(playImg);
    play.scale = 0.1

    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    rocketsGroup.setVelocityXEach(0);

 } 
 
 else if (gameState === PLAYED) {
    gameState= PLAY
    freddy.changeAnimation("running", freddy_running)
    play.destroy();

    obstacleGroup.setVelocityXEach(-10);
    cloudGroup.setVelocityXEach(-10);
    coinsGroup.setVelocityXEach(-10);
    rocketsGroup.setVelocityXEach(-10);
 }

 
  console.log(ground.velocityX)    
 drawSprites();
}
// </> </> </>


// </> </> </> </>
function spawnCoins() {
    if (frameCount % 440===0) {
        coin = createSprite(450, 100, 10, 10);
        coin.velocityX = -5;
        coin.addAnimation("coin", coin_animation);
        coin.addAnimation("stop", coin_stop)
        coin.scale = 0.1;
        coin.lifetime = 250;
        coinsGroup.add(coin);
    }
}


function spawnObstacles() {
if (frameCount % 100 === 0) {
    obstacle = createSprite(550, 115, 10, 10);
    obstacle.velocityX = -10;

    var diffImg = Math.round(random(1, 3));

    switch (diffImg) {
        case 1: obstacle.addImage(ob1);
             break
        case 2: obstacle.addImage(ob2);
             break
        case 3: obstacle.addImage(ob3);
              break
    default:break
    }

    obstacle.scale = 0.4 ;
    obstacle.lifetime = 250;
    obstacle.setCollider("rectangle", 6, 0, 100, 100)
    obstacle.debug = false
    obstacleGroup.add(obstacle);
}
}


function spawnClouds() {
if (frameCount % 100===0) {
    cloud = createSprite(450, 100, 10, 10);
    cloud.addImage(cloud_img);
    cloud.velocityX = -2;
    cloud.scale = 0.4;
    cloud.lifetime = 230;
    cloud.y = Math.round(random(20, 80));
    cloud.depth = freddy.depth;
    freddy.depth = freddy.depth + 1;
    cloudGroup.add(cloud);
}
}


function spawnRockets() {
if (frameCount % 530===0) {
    rocket = createSprite(450, 100, 10, 10);
    rocket.y = Math.round(random(90, 130));
    rocket.velocityX = -10;
    rocket.addImage(rocket_img);
    rocket.scale = 0.2;
    rocketsGroup.add(rocket);
}
}

function destroyCoin() {
    score1 = score1 + 1
    coinsGroup.destroyEach();
    obstacleGroup.setVelocityXEach(-14)
    ground.setVelocity(-14,0)
    cloudGroup.setVelocityXEach(-14)
    rocketsGroup.setVelocityXEach(-14)
}

function reset() {
    gameState= PLAY
    frameCount = 0
    score=0
    score1=0
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    coinsGroup.destroyEach();
    rocketsGroup.destroyEach();
    freddy.changeAnimation("running", freddy_running)
}

function pause() {
    ground.velocityX = 0
    obstacleGroup.setLifetimeEach(-200)
    cloudGroup.setLifetimeEach(-349875)
    coinsGroup.setLifetimeEach(-3748)
    rocketsGroup.setLifetimeEach(-1283)

    freddy.changeAnimation("collided", freddy_collided)
    gameOver.visible= false
    restart.visible= false

    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    rocketsGroup.setVelocityXEach(0);;
}
// </> </> </> </>