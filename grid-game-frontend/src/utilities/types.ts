
export interface Coordinate {
    x: number,
    y: number
}

export interface StateType {
    isGameOver: boolean,
    player: {coordinate: Coordinate},
    health: number,
    moves: number,
    pointB: {coordinate: Coordinate},
    grid: Array<Array<number>>,
    prevState: number,
    victorious: boolean
}

export enum GameActionTypes {
    PLAYER_MOVE = 'PLAYER_MOVE',
    RESTART_GAME = "RESTART_GAME"
}

