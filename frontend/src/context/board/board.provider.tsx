import { createContext, Dispatch, JSX, useContext, useReducer } from 'react';

import { type BoardAction, boardReducer, type BoardState, initialBoardState } from '@/context/board/board.reducer';

interface BoardProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface BoardContextState {
  state: BoardState;
  dispatch: Dispatch<BoardAction>;
}

const BoardContext = createContext<BoardContextState | null>(null);

const BoardProvider = ({ children }: BoardProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);

  return <BoardContext.Provider value={{ state, dispatch }}>{children}</BoardContext.Provider>;
};

const useBoardContext = (): BoardContextState => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within BoardProvider');
  }
  return context;
};

export { BoardProvider, useBoardContext };
