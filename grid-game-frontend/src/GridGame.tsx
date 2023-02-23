import React from "react";
import Board from "./components/Board";
import { Container } from "@mui/system";
import {
  KEY_CODES_MAPPER,
  DIRECTION_TICKS,
  CELL_TYPES,
  CELL_TYPES_MAPPING,
} from "./utilities/constants";
import { isBorder, getInitialState, getNumberGrid } from "./utilities/helpers";
import GameOverModal from "./components/GameOverModal";
import IntroductionModal from "./components/IntroductionModal";
import ProgressBarWithLabel from "./components/ProgressBarWithLabel";
import { StateType, GameActionTypes } from "./utilities/types";

const initialState = getInitialState();

const reducer = (
  state: StateType,
  action: { type: string; direction?: string }
): StateType => {
  if (action.type === GameActionTypes.PLAYER_MOVE) {
    const move = DIRECTION_TICKS[
      action.direction as keyof typeof DIRECTION_TICKS
    ](state.player.coordinate.x, state.player.coordinate.y);

    if (isBorder(move) || state.isGameOver) {
      return state;
    }
    state.grid[state.player.coordinate.y][state.player.coordinate.x] =
      state.prevState;
    const savedState = state.grid[move.y][move.x];
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

    if (
      state.health <= 0 ||
      state.moves <= 0 ||
      (state.player.coordinate.x === state.pointB.coordinate.x &&
        state.player.coordinate.y === state.pointB.coordinate.y)
    ) {
      return {
        ...state,
        player: {
          coordinate: move,
        },
        isGameOver: true,
        victorious:
          state.player.coordinate.x === state.pointB.coordinate.x &&
          state.player.coordinate.y === state.pointB.coordinate.y,
      };
    }

    return {
      ...state,
      player: {
        coordinate: move,
      },
    };
  } else if (action.type === GameActionTypes.RESTART_GAME) {
    return initialState;
  } else {
    return state;
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

  const removeScrolling = (event: any) => {
    if (KEY_CODES_MAPPER[event.keyCode as keyof typeof KEY_CODES_MAPPER]) {
      event.preventDefault();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", removeScrolling, false);
    window.addEventListener("keyup", controlMove, false);
    return () => window.removeEventListener("keyup", controlMove, false);
  }, []);

  React.useEffect(() => {}, [state]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <GameOverModal
        state={state}
        initialState={initialState}
        dispatch={dispatch}
      />
      <Container
        sx={{
          backgroundColor: "white",
          position: "fixed",
          border: "none",
          display: "flex",
        }}
      >
        <IntroductionModal />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          <ProgressBarWithLabel
            color="success"
            value={(state.health / 200) * 100}
            fullValue={state.health}
            type="Health"
          />
          <br />
          <ProgressBarWithLabel
            value={(state.moves / 450) * 100}
            fullValue={state.moves}
            type="Moves"
          />
        </Container>
      </Container>
      <Container sx={{ paddingTop: "100px" }}>
        <Board grids={getNumberGrid(state.grid)} state={state}></Board>
      </Container>
    </Container>
  );
};

export default GridGame;
