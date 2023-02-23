const GRID_LENGTH = 100
const DIRECTIONS = {
    UP: 'UP',
    BOTTOM: 'BOTTOM',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
};

const DIRECTION_TICKS = {
    UP: (x: number, y: number) => ({ x, y: y - 1 }),
    BOTTOM: (x: number, y: number) => ({ x, y: y + 1 }),
    RIGHT: (x: number, y: number) => ({ x: x + 1, y }),
    LEFT: (x: number, y: number) => ({ x: x - 1, y }),
  };

  const KEY_CODES_MAPPER = {
    38: DIRECTIONS.UP,
    39: DIRECTIONS.RIGHT,
    37: DIRECTIONS.LEFT,
    40: DIRECTIONS.BOTTOM,
  };

  const CELL_TYPES = ["blank", "speeder", "lava", "mud", "player", "finish"];

const CELL_TYPES_MAPPING = {
  blank: { health: 0, moves: 1, backgroundColor: "#fff" },
  speeder: { health: 5, moves: 0, backgroundColor: "#42a5f5" },
  lava: { health: 50, moves: 10, backgroundColor: "#ef5350" },
  mud: { health: 10, moves: 5, backgroundColor: "#ff9800" },
  player: { health: 0, moves: 0, backgroundColor: "#1B1B1B" },
  finish: { health: 0, moves: 0, backgroundColor: "#FF00CC" },
};

export { DIRECTIONS, DIRECTION_TICKS, KEY_CODES_MAPPER, GRID_LENGTH, CELL_TYPES, CELL_TYPES_MAPPING }