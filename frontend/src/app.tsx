import { JSX } from 'react';

import { BoardProvider } from '@/context/board/board.provider';

import { Board } from './containers/board/board';

const App = (): JSX.Element => (
  <BoardProvider>
    <Board />
  </BoardProvider>
);

export { App };
