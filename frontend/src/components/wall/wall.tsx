import { JSX } from 'react';
import clsx from 'clsx';

import { Orientation } from 'quoridor-game-shared';

import styles from './styles.module.scss';

interface WallProps {
  orientation: Orientation;
}

const Wall = ({ orientation }: WallProps): JSX.Element => (
  <div
    className={clsx(
      styles.wall,
      { [styles.horizontal]: orientation === Orientation.HORIZONTAL },
      { [styles.vertical]: orientation === Orientation.VERTICAL },
    )}
  />
);

export { Wall };
