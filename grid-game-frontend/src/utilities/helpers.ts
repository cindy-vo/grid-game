
import { GRID_LENGTH } from "./constants";

const getRandomNumberFromRange = (min:number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomCoordinate = (isA: boolean) => ({
  x: isA ? 1: GRID_LENGTH - 1,
  y: getRandomNumberFromRange(1, GRID_LENGTH - 1),
});

const isBorder = (coordinate: {x: number, y: number}) =>
coordinate.x === 0 || coordinate.y === 0 || coordinate.x === GRID_LENGTH || coordinate.y === GRID_LENGTH;

const isPosition = (x: number, y: number, diffX: number, diffY: number) => x === diffX && y === diffY;

export {getRandomNumberFromRange, getRandomCoordinate, isBorder}