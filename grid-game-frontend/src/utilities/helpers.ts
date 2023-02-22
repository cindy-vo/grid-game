
import { GRID_LENGTH } from "./constants";


const getRandomNumberFromRange = (min:number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const SPAWN_AREAS = [{x: 0, y: getRandomNumberFromRange(0, GRID_LENGTH - 1)}, {x: getRandomNumberFromRange(0, GRID_LENGTH - 1), y: 0}, {x: getRandomNumberFromRange(0, GRID_LENGTH - 1), y: GRID_LENGTH - 1}, {x: GRID_LENGTH - 1, y: getRandomNumberFromRange(0, GRID_LENGTH - 1)}]

const getStartAndFinish = () => {
  const idx = getRandomNumberFromRange(0, SPAWN_AREAS.length - 1);
  const save = SPAWN_AREAS[idx];
  SPAWN_AREAS.splice(idx, 1);
  return save;
}

const isBorder = (coordinate: {x: number, y: number}) =>
coordinate.x < 0 || coordinate.y < 0 || coordinate.x === GRID_LENGTH || coordinate.y === GRID_LENGTH;

export {getRandomNumberFromRange, isBorder, getStartAndFinish}