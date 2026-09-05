import { map, TILE_SIZE } from "./world/Map.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

console.log("Goblin Boy iniciado!");
console.log(map);
console.log(TILE_SIZE);

const player = {
    x: 384,
    y: 284,
    width: 32,
    height: 32,
    speed: 4
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

    if (dx !== 0 || dy !== 0) {

        const length = Math.sqrt(dx * dx + dy * dy);

        dx = dx / length;
        dy = dy / length;

        const newX = player.x + dx * player.speed;
        const newY = player.y + dy * player.speed;

        if (canMoveTo(newX, player.y)) {
            player.x = newX;
        }

        if (canMoveTo(player.x, newY)) {
            player.y = newY;
        }
    }

    // Limite esquerdo
    if (player.x < 0) {
        player.x = 0;
    }

    // Limite direito
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Limite superior
    if (player.y < 0) {
        player.y = 0;
    }

    // Limite inferior
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }

}
function drawPlayer() {
    ctx.fillStyle = "purple";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
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
                col * TILE_SIZE,
                row * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();
    drawPlayer();
}

function gameLoop() {
    updatePlayer();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();