import React, { JSX, useCallback } from 'react';
import clsx from 'clsx';

import { Player } from '@/components/player/player';
import { Wall } from '@/components/wall/wall';
import { WallOrientation } from '@/containers/board/board';

import styles from './styles.module.scss';

interface TileProps {
  position: string;
  isAvailable: boolean;
  onClick: (position: string) => void;
  player1: string[];
  player2: string[];
  walls: string[];
}

const Tile = ({ position, isAvailable, onClick, player1, player2, walls }: TileProps): JSX.Element => {
  const handleTileClick = useCallback(() => {
    onClick(position);
  }, [onClick, position]);

  return (
    <div
      key={position}
      className={clsx(styles.tile, { [styles.available_tile]: isAvailable })}
      onClick={handleTileClick}
    >
      {player1.at(-1) === position ? <Player id={1} /> : ''}
      {player2.at(-1) === position ? <Player id={2} /> : ''}
      {walls.includes(position + 'h') ? <Wall orientation={WallOrientation.HORIZONTAL} /> : ''}
      {walls.includes(position + 'v') ? <Wall orientation={WallOrientation.VERTICAL} /> : ''}
    </div>
  );
};

export { Tile };
