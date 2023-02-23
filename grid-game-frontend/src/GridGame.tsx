import React, { ReactElement } from "react";
import Grid from "@mui/material/Grid";
import Board from "./components/Board";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import { KEY_CODES_MAPPER, DIRECTION_TICKS } from "./utilities/constants";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import {
  getStartAndFinish,
  getRandomNumberFromRange,
  isBorder,
} from "./utilities/helpers";
import GameOverModal from "./components/GameOverModal";
import IntroductionModal from "./components/IntroductionModal";

const Cell = styled(Paper)(({ theme, color }) => ({
  backgroundColor: color,
  padding: theme.spacing(1),
}));

function LinearProgressWithLabel(
  props: LinearProgressProps & {
    value: number;
    fullValue: number;
    type: string;
  }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 100 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${props.type}: ${props.fullValue}`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

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
    victorious: false,
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
  if (action.type === "PLAYER_MOVE") {
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
  } else if (action.type === "RESTART_GAME") {
    return getInitialState();
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
        sx={{ backgroundColor: "white", position: "fixed", border: "none" }}
      >
        <IntroductionModal />
        <LinearProgressWithLabel
          color="success"
          value={(state.health / 200) * 100}
          fullValue={state.health}
          type="Health"
        />
        <br />
        <LinearProgressWithLabel
          value={(state.moves / 450) * 100}
          fullValue={state.moves}
          type="Moves"
        />
      </Container>
      <Container sx={{ paddingTop: "120px" }}>
        <Board grids={getGrid(state.grid)} state={state}></Board>
      </Container>
    </Container>
  );
};

export default GridGame;
