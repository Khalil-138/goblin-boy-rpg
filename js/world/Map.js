const TILE_SIZE = 32;

const MAP_WIDTH = 40;
const MAP_HEIGHT = 30;

const map = [];

// Cria o mapa vazio
for (let row = 0; row < MAP_HEIGHT; row++) {

    map[row] = [];

    for (let col = 0; col < MAP_WIDTH; col++) {

        // Borda do mapa
        if (
            row === 0 ||
            row === MAP_HEIGHT - 1 ||
            col === 0 ||
            col === MAP_WIDTH - 1
        ) {
            map[row][col] = 1;
        } else {
            map[row][col] = 0;
        }
    }
}

export { map, TILE_SIZE, MAP_WIDTH, MAP_HEIGHT };