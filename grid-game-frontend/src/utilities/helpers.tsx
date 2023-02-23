import { ReactElement } from "react";
import { GRID_LENGTH } from "./constants";
import Grid from "@mui/material/Grid";
import { CELL_TYPES, CELL_TYPES_MAPPING } from "./constants";
import { Coordinate } from "./types";

import Cell from "../components/Cell";

const getRandomNumberFromRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const SPAWN_AREAS = [
  { x: 0, y: getRandomNumberFromRange(0, GRID_LENGTH - 1) },
  { x: getRandomNumberFromRange(0, GRID_LENGTH - 1), y: 0 },
  { x: getRandomNumberFromRange(0, GRID_LENGTH - 1), y: GRID_LENGTH - 1 },
  { x: GRID_LENGTH - 1, y: getRandomNumberFromRange(0, GRID_LENGTH - 1) },
];

const getSpawn = () => {
  const idx = getRandomNumberFromRange(0, SPAWN_AREAS.length - 1);
  const save = SPAWN_AREAS[idx];
  SPAWN_AREAS.splice(idx, 1);
  return save;
};

const isBorder = (coordinate: Coordinate) =>
  coordinate.x < 0 ||
  coordinate.y < 0 ||
  coordinate.x === GRID_LENGTH ||
  coordinate.y === GRID_LENGTH;

const getNumberGrid = (board: Array<Array<number>>) => {
  const grid = [] as Array<Array<ReactElement>>;
  for (let i = 0; i < 100; i++) {
    grid[i] = [];
    for (let j = 0; j < 100; j++) {
      const color =
        CELL_TYPES_MAPPING[
          CELL_TYPES[board[i][j]] as keyof typeof CELL_TYPES_MAPPING
        ].backgroundColor;
      grid[i].push(
        <Grid item xs={1}>
          <Cell color={color}></Cell>
        </Grid>
      );
    }
  }
  return grid;
};

const getComponentGrid = (
  player: { coordinate: Coordinate },
  finish: { coordinate: Coordinate }
) => {
  const grid = [] as Array<Array<number>>;
  for (let i = 0; i < 100; i++) {
    grid[i] = [];
    for (let j = 0; j < 100; j++) {
      if (i === player.coordinate.y && j === player.coordinate.x) {
        grid[i].push(4);
      } else if (i === finish.coordinate.y && j === finish.coordinate.x) {
        grid[i].push(5);
      } else {
        const random_number = getRandomNumberFromRange(0, 3);
        grid[i].push(random_number);
      }
    }
  }
  return grid;
};

const getInitialState = () => {
  const initialState = {
    isGameOver: false,

    player: {
      coordinate: getSpawn(),
    },
    health: 200,
    moves: 450,
    pointB: { coordinate: getSpawn() },
    grid: [] as Array<Array<number>>,
    prevState: 0,
    victorious: false,
  };

  initialState.grid = getComponentGrid(
    initialState.player,
    initialState.pointB
  );
  return initialState;
};

export {
  getRandomNumberFromRange,
  isBorder,
  getSpawn,
  getInitialState,
  getComponentGrid,
  getNumberGrid,
};
