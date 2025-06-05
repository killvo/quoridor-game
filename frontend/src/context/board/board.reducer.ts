import { type Position, PositionUtils, type Wall } from 'quoridor-game-shared';

interface BoardState {
  walls: Wall[];
  player1: Position[];
  player2: Position[];
  player1Walls: number;
  player2Walls: number;
  activePlayer: Player | null;
}

const initialBoardState: BoardState = {
  walls: [],
  player1: [PositionUtils.create(4, 0)],
  player2: [PositionUtils.create(4, 8)],
  player1Walls: 10,
  player2Walls: 10,
  activePlayer: null,
};

type Player = 1 | 2;

enum ActionType {
  MOVE_PLAYER = 'MOVE_PLAYER',
  PLACE_WALL = 'PLACE_WALL',
  SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER',
  SET_STATE = 'SET_STATE',
  RESET = 'RESET',
}

type BoardAction =
  | { type: ActionType.MOVE_PLAYER; payload: { player: Player; position: Position } }
  | { type: ActionType.PLACE_WALL; payload: { player: Player; wall: Wall } }
  | { type: ActionType.SET_ACTIVE_PLAYER; payload: Player | null }
  | { type: ActionType.SET_STATE; payload: BoardState }
  | { type: ActionType.RESET };

const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case ActionType.MOVE_PLAYER: {
      const { player, position } = action.payload;

      return {
        ...state,
        ...(player === 1 ? { player1: [...state.player1, position] } : { player2: [...state.player2, position] }),
      };
    }

    case ActionType.PLACE_WALL: {
      const { player, wall } = action.payload;

      const playerWalls =
        player === 1 ? { player1Walls: state.player1Walls - 1 } : { player2Walls: state.player2Walls - 1 };

      return {
        ...state,
        walls: [...state.walls, wall],
        ...playerWalls,
      };
    }

    case ActionType.SET_ACTIVE_PLAYER: {
      return {
        ...state,
        activePlayer: action.payload,
      };
    }

    case ActionType.RESET: {
      return initialBoardState;
    }

    case ActionType.SET_STATE: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export { ActionType, type BoardAction, boardReducer, type BoardState, initialBoardState };
