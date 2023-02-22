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

export { DIRECTIONS, DIRECTION_TICKS, KEY_CODES_MAPPER, GRID_LENGTH }