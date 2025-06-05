import React, { JSX, useCallback } from 'react';
import clsx from 'clsx';

import { Orientation, type Position, PositionUtils, WallUtils } from 'quoridor-game-shared';

import { Player } from '@/components/player/player';
import { Wall } from '@/components/wall/wall';
import { useBoardContext } from '@/context/board/board.provider';

import styles from './styles.module.scss';

interface TileProps {
  position: Position;
  isAvailable: boolean;
  onClick: (position: Position) => void;
}

const Tile = ({ position, isAvailable, onClick }: TileProps): JSX.Element => {
  const { state } = useBoardContext();
  const { player1, player2, walls } = state;

  const p1 = player1.at(-1);
  const p2 = player2.at(-1);

  const handleTileClick = useCallback(() => {
    onClick(position);
  }, [onClick, position]);

  return (
    <div
      key={PositionUtils.toString(position)}
      className={clsx(styles.tile, { [styles.available_tile]: isAvailable })}
      onClick={handleTileClick}
    >
      {p1 && PositionUtils.equals(p1, position) ? <Player id={1} /> : ''}
      {p2 && PositionUtils.equals(p2, position) ? <Player id={2} /> : ''}
      {walls.some(w => WallUtils.equals(w, WallUtils.createFromPosition(position, Orientation.HORIZONTAL))) && (
        <Wall orientation={Orientation.HORIZONTAL} />
      )}
      {walls.some(w => WallUtils.equals(w, WallUtils.createFromPosition(position, Orientation.VERTICAL))) && (
        <Wall orientation={Orientation.VERTICAL} />
      )}
    </div>
  );
};

export { Tile };
