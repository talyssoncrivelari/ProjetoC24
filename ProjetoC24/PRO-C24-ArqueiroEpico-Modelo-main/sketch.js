const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;
let canvas;
let palyer, playerBase, playerArcher;
let playerArrows = [];


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  let options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();

    for (let i = 0; i < playerArrows.length; i++) {
      if (playerArrows[i] !== undefined) {
        playerArrows[i].display();
      }
   }

  // Título
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("ARQUEIRO ÉPICO", width / 2, 100);
}

 function keyPressed() {
   if (keyCode === 32) {
      let posX = playerArcher.body.position.x;
      let posY = playerArcher.body.position.y;
      let angle = playerArcher.body.angle;
      let arrow = new PlayerArrow(posX, posY, 100, 10, angle);
      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
    }
  }

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      let angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}
