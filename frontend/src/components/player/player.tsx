import { JSX } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface PlayerProps {
  id: number;
}

const Player = ({ id }: PlayerProps): JSX.Element => (
  <div className={clsx(styles.player, { [styles.first]: id === 1 }, { [styles.second]: id === 2 })} />
);

export { Player };
