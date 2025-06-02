import { JSX } from 'react';
import clsx from 'clsx';

import { WallOrientation } from '@/containers/board/board';

import styles from './styles.module.scss';

interface WallProps {
  orientation: WallOrientation;
}

const Wall = ({ orientation }: WallProps): JSX.Element => (
  <div
    className={clsx(
      styles.wall,
      { [styles.horizontal]: orientation === WallOrientation.HORIZONTAL },
      { [styles.vertical]: orientation === WallOrientation.VERTICAL },
    )}
  />
);

export { Wall };
