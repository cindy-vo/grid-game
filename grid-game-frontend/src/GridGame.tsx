import React, { ReactElement } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import Board from "./components/Board";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  KEY_CODES_MAPPER,
  DIRECTIONS,
  DIRECTION_TICKS,
} from "./utilities/constants";
import {
  getRandomCoordinate,
  getRandomNumberFromRange,
  isBorder,
} from "./utilities/helpers";

const Cell = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const getInitialState = () => {
  const initialState = {
    playground: {
      direction: DIRECTIONS.RIGHT,
      isGameOver: false,
    },
    player: {
      coordinate: getRandomCoordinate(true),
    },
    health: 200,
    moves: 450,
    pointB: getRandomCoordinate(false),
    grid: [] as Array<Array<number>>,
    prevState: 0,
  };
  initialState.grid = getGrid2(initialState.player);
  return initialState;
};

const initialState = () => getInitialState;

const CELL_TYPES = ["blank", "speeder", "lava", "mud"];

const CELL_TYPES_MAPPING = {
  blank: { health: 0, moves: -1 },
  speeder: { health: -5, moves: 0 },
  lava: { health: -50, moves: -10 },
  mud: { health: -10, moves: -5 },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "PLAYER_MOVE":
      const move = DIRECTION_TICKS[
        state.playground.direction as keyof typeof DIRECTION_TICKS
      ](state.player.x, state.player.y);

      if (isBorder(move)) {
        return state;
      }

      state.grid[state.player.x][state.player.y] = state.prevState;
      const savedState = state.grid[state.move.x][state.move.y];
      state.grid[state.move.x][state.move.y] = 4;

      return {
        ...state,
        player: {
          coordinate: move,
        },
        health:
          state.health -
          CELL_TYPES_MAPPING[
            CELL_TYPES[
              state.grid[move.x][move.y]
            ] as keyof typeof CELL_TYPES_MAPPING
          ].health,
        moves:
          state.moves -
          CELL_TYPES_MAPPING[
            CELL_TYPES[
              state.grid[move.x][move.y]
            ] as keyof typeof CELL_TYPES_MAPPING
          ].moves,
        prevState: savedState,
      };
    case "GAME_OVER":
      return {
        ...state,
        playground: {
          ...state.playground,
          isGameOver: true,
        },
      };
    default:
      throw new Error();
  }
};

const getGrid = (player: any) => {
  const grid = [] as Array<Array<ReactElement>>;
  for (let i = 0; i < 100; i++) {
    grid[i] = [];
    for (let j = 0; j < 100; j++) {
      const random_number = getRandomNumberFromRange(0, 3);
      grid[i].push(
        <Grid item xs={1}>
          <Cell
            className={
              i !== player.coordinates.x && j !== player.coordinates.y
                ? CELL_TYPES[random_number]
                : ""
            }
          ></Cell>
        </Grid>
      );
    }
  }
  return grid;
};

const getGrid2 = (player: any) => {
  const grid = [] as Array<Array<number>>;
  for (let i = 0; i < 100; i++) {
    grid[i] = [];
    for (let j = 0; j < 100; j++) {
      if (i === player.coordinates.x && j === player.coordinates.y) {
        grid[i].push(4);
      } else {
        const random_number = getRandomNumberFromRange(0, 3);
        grid[i].push(random_number);
      }
    }
  }
  return grid;
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

  return (
    <div className="App">
      <Board
        grids={() => {
          getGrid(state.player);
        }}
        state={state}
      ></Board>
    </div>
  );
};

export default GridGame;
