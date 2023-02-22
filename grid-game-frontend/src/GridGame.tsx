import React, { ReactElement } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import Board from "./components/Board";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { KEY_CODES_MAPPER, DIRECTION_TICKS } from "./utilities/constants";
import {
  getStartAndFinish,
  getRandomNumberFromRange,
  isBorder,
} from "./utilities/helpers";

const Cell = styled(Paper)(({ theme, color }) => ({
  backgroundColor: color,
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const getGrid = (board: Array<Array<number>>) => {
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

const getGrid2 = (
  player: { coordinate: { x: number; y: number } },
  finish: { coordinate: { x: number; y: number } }
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
      coordinate: getStartAndFinish(),
    },
    health: 200,
    moves: 450,
    pointB: { coordinate: getStartAndFinish() },
    grid: [] as Array<Array<number>>,
    prevState: 0,
  };

  initialState.grid = getGrid2(initialState.player, initialState.pointB);
  return initialState;
};

const initialState = getInitialState();

const CELL_TYPES = ["blank", "speeder", "lava", "mud", "player", "finish"];

const CELL_TYPES_MAPPING = {
  blank: { health: 0, moves: 1, backgroundColor: "#fff" },
  speeder: { health: 5, moves: 0, backgroundColor: "#42a5f5" },
  lava: { health: 50, moves: 10, backgroundColor: "#ef5350" },
  mud: { health: 10, moves: 5, backgroundColor: "#ff9800" },
  player: { health: 0, moves: 0, backgroundColor: "#ba68c8" },
  finish: { health: 0, moves: 0, backgroundColor: "black" },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "PLAYER_MOVE":
      const move = DIRECTION_TICKS[
        action.direction as keyof typeof DIRECTION_TICKS
      ](state.player.coordinate.x, state.player.coordinate.y);
      console.log(isBorder(move));

      if (isBorder(move)) {
        return state;
      }
      state.grid[state.player.coordinate.y][state.player.coordinate.x] =
        state.prevState;
      const savedState = state.grid[move.y][move.x];
      console.log(savedState);
      state.health =
        state.health -
        CELL_TYPES_MAPPING[
          CELL_TYPES[savedState] as keyof typeof CELL_TYPES_MAPPING
        ].health;
      state.moves =
        state.moves -
        CELL_TYPES_MAPPING[
          CELL_TYPES[savedState] as keyof typeof CELL_TYPES_MAPPING
        ].moves;

      state.prevState = savedState;
      state.grid[move.y][move.x] = 4;

      console.log(savedState);

      return {
        ...state,
        player: {
          coordinate: move,
        },
      };
    case "GAME_OVER":
      return {
        ...state,
        isGameOver: true,
      };
    default:
      throw new Error();
  }
};

const GridGame: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const controlMove = (event: any) => {
    if (KEY_CODES_MAPPER[event.keyCode as keyof typeof KEY_CODES_MAPPER]) {
      dispatch({
        type: "PLAYER_MOVE",
        direction:
          KEY_CODES_MAPPER[event.keyCode as keyof typeof KEY_CODES_MAPPER],
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener("keyup", controlMove, false);
    return () => window.removeEventListener("keyup", controlMove, false);
  }, []);

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="App">
      <Board grids={getGrid(state.grid)} state={state}></Board>
    </div>
  );
};

export default GridGame;
