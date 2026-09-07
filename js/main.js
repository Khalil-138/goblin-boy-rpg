import { map, TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "./world/Map.js";
import { Player } from "./entities/Player.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

console.log("Goblin Boy iniciado!");
console.log(map);
console.log(TILE_SIZE);

const player = new Player(384, 284);

const camera = {
  x: 0,
  y: 0,
};
const keys = {};

window.addEventListener("keydown", (event) => {
  keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
});

function isWall(x, y) {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);

  return map[row][col] === 1;
}
function canMoveTo(x, y) {
  const left = x;
  const right = x + player.width - 1;
  const top = y;
  const bottom = y + player.height - 1;

  if (isWall(left, top)) return false;
  if (isWall(right, top)) return false;
  if (isWall(left, bottom)) return false;
  if (isWall(right, bottom)) return false;

  return true;
}

function updatePlayer() {
  let dx = 0;
  let dy = 0;

  if (keys["w"]) {
    dy -= 1;
  }

  if (keys["s"]) {
    dy += 1;
  }

  if (keys["a"]) {
    dx -= 1;
  }

  if (keys["d"]) {
    dx += 1;
  }

  player.setDirection(dx, dy);

  if (dx !== 0 || dy !== 0) {
    const direction = player.getNormalizedDirection();

    player.move(
      direction.dx,
      direction.dy,
      canMoveTo
    );
  }

  // Limite esquerdo
  if (player.x < 0) {
    player.x = 0;
  }

  // Limite direito
  if (player.x + player.width > MAP_WIDTH * TILE_SIZE) {
    player.x = MAP_WIDTH * TILE_SIZE - player.width;
  }

  // Limite superior
  if (player.y < 0) {
    player.y = 0;
  }

  // Limite inferior
  if (player.y + player.height > MAP_HEIGHT * TILE_SIZE) {
    player.y = MAP_HEIGHT * TILE_SIZE - player.height;
  }
}

function drawPlayer() {
  player.draw(ctx, camera);
}

function drawMap() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tile = map[row][col];

      if (tile === 0) {
        ctx.fillStyle = "green";
      }

      if (tile === 1) {
        ctx.fillStyle = "saddlebrown";
      }

      ctx.fillRect(
        col * TILE_SIZE - camera.x,
        row * TILE_SIZE - camera.y,
        TILE_SIZE,
        TILE_SIZE,
      );
    }
  }
}

function updateCamera() {
  camera.x = player.x - canvas.width / 2 + player.width / 2;
  camera.y = player.y - canvas.height / 2 + player.height / 2;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMap();
  drawPlayer();
}

function gameLoop() {
  updatePlayer();
  updateCamera();
  draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();
