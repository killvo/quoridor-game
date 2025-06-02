import { JSX, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Tile } from '@/containers/tile/tile';

import styles from './styles.module.scss';

const columns = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
const rows = ['8', '7', '6', '5', '4', '3', '2', '1', '0'];

export enum WallOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

const Board = (): JSX.Element => {
  const [walls, setWalls] = useState<string[]>([]);
  const [player1, setPlayer1] = useState<string[]>(['40']);
  const [player2, setPlayer2] = useState<string[]>(['48']);
  const [player1Walls, setPlayer1Walls] = useState<number>(10);
  const [player2Walls, setPlayer2Walls] = useState<number>(10);
  const [wallOrientation, setWallOrientation] = useState<string | null>(null);
  const [availableTiles, setAvailableTiles] = useState<string[]>([]);
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

  const handleStartGame = useCallback((): void => {
    setActivePlayer(1);
  }, [setActivePlayer]);

  const handleNextMove = useCallback((): void => {
    if (activePlayer === 1) {
      setActivePlayer(2);
    } else if (activePlayer === 2) {
      setActivePlayer(1);
    }
  }, [activePlayer]);

  const getMoveDirection = useCallback((from: string, to: string): Direction | null => {
    if (from[0] !== to[0] && from[1] === to[1]) {
      return from[0] < to[0] ? Direction.RIGHT : Direction.LEFT;
    }
    if (from[0] === to[0] && from[1] !== to[1]) {
      return from[1] < to[1] ? Direction.UP : Direction.DOWN;
    }
    return null;
  }, []);

  const checkAreWallsPlaced = useCallback(
    (wall1: string | null, wall2: string | null): boolean => {
      const isThereWall1 = wall1 && walls.includes(wall1);
      const isThereWall2 = wall2 && walls.includes(wall2);
      return !!isThereWall1 || !!isThereWall2;
    },
    [walls],
  );

  const canMoveBetweenTiles = useCallback(
    (from: string, to: string): boolean => {
      const direction = getMoveDirection(from, to);
      const [x, y] = [+from[0], +from[1]];

      if (direction === Direction.UP) {
        const potentialWall1 = `${x}${y}h`;
        const potentialWall2 = x > 0 ? `${x - 1}${y}h` : null;
        return !checkAreWallsPlaced(potentialWall1, potentialWall2);
      } else if (direction === Direction.DOWN) {
        const potentialWall1 = y > 0 ? `${x}${y - 1}h` : null;
        const potentialWall2 = x > 0 && y > 0 ? `${x - 1}${y - 1}h` : null;
        return !checkAreWallsPlaced(potentialWall1, potentialWall2);
      } else if (direction === Direction.LEFT) {
        const potentialWall1 = x > 0 ? `${x - 1}${y}v` : null;
        const potentialWall2 = x > 0 && y > 0 ? `${x - 1}${y - 1}v` : null;
        return !checkAreWallsPlaced(potentialWall1, potentialWall2);
      } else if (direction === Direction.RIGHT) {
        const potentialWall1 = `${x}${y}v`;
        const potentialWall2 = y > 0 ? `${x}${y - 1}v` : null;
        return !checkAreWallsPlaced(potentialWall1, potentialWall2);
      }

      return true;
    },
    [checkAreWallsPlaced, getMoveDirection],
  );

  useEffect(() => {
    if (!activePlayer) {
      return;
    }

    const curr = activePlayer === 1 ? player1.at(-1) : player2.at(-1);
    const player2Position = activePlayer === 1 ? player2.at(-1) : player1.at(-1);

    if (!curr || !player2Position) {
      return;
    }

    const [x, y] = [+curr[0], +curr[1]];
    const topTile = y < 8 ? `${x}${y + 1}` : null;
    const bottomTile = y > 0 ? `${x}${y - 1}` : null;
    const leftTile = x > 0 ? `${x - 1}${y}` : null;
    const rightTile = x < 8 ? `${x + 1}${y}` : null;
    const tiles = [];

    const [xP2, yP2] = [+player2Position[0], +player2Position[1]];
    if (topTile && canMoveBetweenTiles(curr, topTile)) {
      if (player2Position === topTile) {
        // check if there's a wall or edge behind player 2
        const tileAbovePlayer2 = `${xP2}${yP2 + 1}`;
        if (yP2 === 8 || !canMoveBetweenTiles(player2Position, tileAbovePlayer2)) {
          // check left tile from player 2
          if (canMoveBetweenTiles(player2Position, `${xP2 - 1}${yP2}`)) {
            tiles.push(`${xP2 - 1}${yP2}`);
          }
          // check right tile from player 2
          if (canMoveBetweenTiles(player2Position, `${xP2 + 1}${yP2}`)) {
            tiles.push(`${xP2 + 1}${yP2}`);
          }
        } else {
          tiles.push(tileAbovePlayer2); // move above player 2
        }
      } else {
        tiles.push(topTile);
      }
    }
    if (bottomTile && canMoveBetweenTiles(curr, bottomTile)) {
      if (player2Position === bottomTile) {
        // check if there's a wall or edge behind player 2
        const tileBelowPlayer2 = `${xP2}${yP2 - 1}`;
        if (yP2 === 0 || !canMoveBetweenTiles(player2Position, tileBelowPlayer2)) {
          // check left tile from player 2
          if (canMoveBetweenTiles(player2Position, `${xP2 - 1}${yP2}`)) {
            tiles.push(`${xP2 - 1}${yP2}`);
          }
          // check right tile from player 2
          if (canMoveBetweenTiles(player2Position, `${xP2 + 1}${yP2}`)) {
            tiles.push(`${xP2 + 1}${yP2}`);
          }
        } else {
          tiles.push(tileBelowPlayer2); // move below player 2
        }
      } else {
        tiles.push(bottomTile);
      }
    }
    if (leftTile && canMoveBetweenTiles(curr, leftTile)) {
      if (player2Position === leftTile) {
        // check if there's a wall or edge behind player 2
        const tileToTheLeftOfPlayer2 = `${xP2 - 1}${yP2}`;
        if (xP2 === 0 || !canMoveBetweenTiles(player2Position, tileToTheLeftOfPlayer2)) {
          // check tile below player 2
          if (canMoveBetweenTiles(player2Position, `${xP2}${yP2 - 1}`)) {
            tiles.push(`${xP2}${yP2 - 1}`);
          }
          // check tile above player 2
          if (canMoveBetweenTiles(player2Position, `${xP2}${yP2 + 1}`)) {
            tiles.push(`${xP2}${yP2 + 1}`);
          }
        } else {
          tiles.push(tileToTheLeftOfPlayer2); // move to the left of player 2
        }
      } else {
        tiles.push(leftTile);
      }
    }
    if (rightTile && canMoveBetweenTiles(curr, rightTile)) {
      if (player2Position === rightTile) {
        // check if there's a wall or edge behind player 2
        const tileToTheRightOfPlayer2 = `${xP2 + 1}${yP2}`;
        if (xP2 === 8 || !canMoveBetweenTiles(player2Position, tileToTheRightOfPlayer2)) {
          // check tile below player 2
          if (canMoveBetweenTiles(player2Position, `${xP2}${yP2 - 1}`)) {
            tiles.push(`${xP2}${yP2 - 1}`);
          }
          // check tile above player 2
          if (canMoveBetweenTiles(player2Position, `${xP2}${yP2 + 1}`)) {
            tiles.push(`${xP2}${yP2 + 1}`);
          }
        } else {
          tiles.push(tileToTheRightOfPlayer2); // move to the right of player 2
        }
      } else {
        tiles.push(rightTile);
      }
    }

    if (tiles.length !== 0) {
      setAvailableTiles(tiles);
    }
  }, [activePlayer, canMoveBetweenTiles, player1, player2]);

  const checkWinner = useCallback(() => {
    const player1Position = player1.at(-1);
    const player2Position = player2.at(-1);

    if (!player1Position || !player2Position) {
      return;
    }

    if (+player1Position[1] === 8) {
      setActivePlayer(null);
      setAvailableTiles([]);
      alert('Player 1 won this game!');
    } else if (+player2Position[1] === 0) {
      setActivePlayer(null);
      setAvailableTiles([]);
      alert('Player 2 won this game!');
    }
  }, [player1, player2]);

  useEffect(() => {
    if (!activePlayer) {
      return;
    }
    checkWinner();
  }, [activePlayer, checkWinner]);

  const handleTileClick = useCallback(
    (tile: string): void => {
      if (!activePlayer) {
        return;
      }

      if (!wallOrientation) {
        if (tile === player1.at(-1) || tile === player2.at(-1)) {
          return;
        }

        if (activePlayer === 1) {
          setPlayer1(prevState => [...prevState, tile]);
        } else {
          setPlayer2(prevState => [...prevState, tile]);
        }
      } else {
        const [x, y] = [+tile[0], +tile[1]];
        if (x === 8 || y === 8) {
          return;
        }
        if (walls.includes(`${tile}h`) || walls.includes(`${tile}v`)) {
          return;
        }
        if (wallOrientation === 'h' && (walls.includes(`${x - 1}${y}h`) || walls.includes(`${x + 1}${y}h`))) {
          return;
        }
        if (wallOrientation === 'v' && (walls.includes(`${x}${y + 1}v`) || walls.includes(`${x}${y - 1}v`))) {
          return;
        }

        setWalls(prevState => [...prevState, tile + wallOrientation]);
        setWallOrientation(null);
        if (activePlayer === 1) {
          setPlayer1Walls(prevState => prevState - 1);
        } else {
          setPlayer2Walls(prevState => prevState - 1);
        }
      }
      handleNextMove();
    },
    [activePlayer, handleNextMove, player1, player2, wallOrientation, walls],
  );

  return (
    <div className={styles.container}>
      <div className={styles.left_block}>Left</div>
      <div className={styles.board}>
        <div className={styles.walls_container}>
          {Array.from({ length: player2Walls }).map((_, i) => (
            <div key={i} className={styles.wall} />
          ))}
        </div>

        <div className={styles.tiles_container}>
          {rows.map(row => (
            <div key={row} className={styles.row}>
              {columns.map(col => (
                <Tile
                  key={col + row}
                  position={col + row}
                  isAvailable={availableTiles.includes(col + row)}
                  onClick={handleTileClick}
                  walls={walls}
                  player1={player1}
                  player2={player2}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.walls_container}>
          {Array.from({ length: player1Walls }).map((_, i) => (
            <div key={i} className={styles.wall} />
          ))}
        </div>
      </div>
      <div className={styles.right_block}>
        <div className={styles.game_control}>
          {activePlayer ? <div>Player {activePlayer} move</div> : <button onClick={handleStartGame}>Start Game</button>}
        </div>
        <div className={styles.wall_picker}>
          <div className={styles.title}>Place wall</div>
          <button
            onClick={() => setWallOrientation('h')}
            className={clsx({ [styles.active]: wallOrientation === 'h' })}
          >
            Horizontal
          </button>
          <button
            onClick={() => setWallOrientation('v')}
            className={clsx({ [styles.active]: wallOrientation === 'v' })}
          >
            Vertical
          </button>
          <button onClick={() => setWallOrientation(null)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export { Board };
