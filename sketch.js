var bg;
var rocket_img, rocket;
var enemyShip_img, enemyShip,enemyGroup;
var asteroid_img, asteroid, asteroidGroup;
var rewards_img, rewards, rewardGroup;
var score = 0;
var lives = 3;
var rewardsScore = 0;

function preload(){
  bg = loadImage("spaceBackground.jpeg")
  rocket_img = loadImage("rocket.png")
  enemyShip_img = loadImage("enemy.png")
  asteroid_img = loadImage("asteroid.png")
  rewards_img = loadImage("reward.png")
}

function setup() {
  createCanvas(600,690);
  
  rocket = createSprite(300,600,40,50)
  rocket.addImage("rocket",rocket_img)
  rocket.scale = 0.5;

  asteroidGroup = createGroup();
  enemyGroup = createGroup();
  rewardGroup = createGroup();
}

function draw() {
  image(bg,0,0,width,height) 

  rocket.x = mouseX

  if(keyDown("space")){
    shootAsteroid();
  }

  fill("#FFFF");
  textAlign("center");
  textSize(20);
  text("Score: " + score, 500, 80);

  fill("#FFFF");
  textAlign("center");
  textSize(20);
  text("Lives: " + lives, 100, 80);

  fill("#FFFF");
  textAlign("center");
  textSize(20);
  text("Rewards Collected: " + rewardsScore, 300, 60);

  asteroidGroup.overlap(enemyGroup,function(collector,collected){
    score += 1;
    collected.remove();
    collector.remove();
  })

  rocket.overlap(rewardGroup,function(collector,collected){
    rewardsScore += 1;
    collected.remove();
  })

  enemyGroup.overlap(rocket,function(collector,collected){
    lives -= 1;
    collector.remove();
  })

  spawnEnemies();
  spawnRewards();
  drawSprites();
}

function shootAsteroid(){
  asteroid = createSprite(150, 500, 50,20)
  asteroid.x = rocket.x
  asteroid.addImage(asteroid_img)
  asteroid.scale = 0.12
  asteroid.velocityY = -7
  asteroidGroup.add(asteroid)
}

function spawnEnemies(){
  if(frameCount % 140 == 0){
    enemyShip = createSprite(random(50,550),-50,40,50);
    enemyShip.addImage("enemy",enemyShip_img)
    enemyShip.scale = 0.3;
    enemyShip.velocityY = 3;
    enemyGroup.add(enemyShip)
  }
}

function spawnRewards(){
  if(frameCount % 250 == 0){
    rewards = createSprite(random(50,550),-50,40,50);
    rewards.addImage("reward",rewards_img)
    rewards.scale = 0.3;
    rewards.velocityY = 3;
    rewardGroup.add(rewards)
  }
}