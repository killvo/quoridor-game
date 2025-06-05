import { JSX, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import {
  Direction,
  getMoveDirection,
  Orientation,
  type Position,
  PositionUtils,
  type Wall,
  WallUtils,
} from 'quoridor-game-shared';

import { Tile } from '@/containers/tile/tile';
import { useBoardContext } from '@/context/board/board.provider';
import { ActionType } from '@/context/board/board.reducer';

import styles from './styles.module.scss';

const COLUMN_INDEXES = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
const ROW_INDEXES = ['8', '7', '6', '5', '4', '3', '2', '1', '0'];

const directionDiffs = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

const Board = (): JSX.Element => {
  const { state, dispatch } = useBoardContext();

  const [wallOrientation, setWallOrientation] = useState<Orientation | null>(null);
  const [availableTiles, setAvailableTiles] = useState<Set<string>>(new Set());

  const handleStartGame = useCallback((): void => {
    dispatch({ type: ActionType.SET_ACTIVE_PLAYER, payload: 1 });
  }, [dispatch]);

  const handleNextMove = useCallback((): void => {
    const nextPlayer = state.activePlayer === 1 ? 2 : 1;
    dispatch({ type: ActionType.SET_ACTIVE_PLAYER, payload: nextPlayer });
  }, [dispatch, state.activePlayer]);

  const checkAreWallsPlaced = useCallback(
    (...walls: (Wall | null)[]): boolean => walls.some(wall => state.walls.some(w => WallUtils.equals(w, wall))),
    [state.walls],
  );

  const canMoveBetweenTiles = useCallback(
    (from: Position, to: Position): boolean => {
      const direction = getMoveDirection(from, to);

      if (!direction) {
        return false;
      }

      const { x, y } = from;

      const wallChecks: Record<Direction, () => (Wall | null)[]> = {
        [Direction.UP]: () => [
          WallUtils.create(x, y, Orientation.HORIZONTAL),
          x > 0 ? WallUtils.create(x - 1, y, Orientation.HORIZONTAL) : null,
        ],
        [Direction.DOWN]: () => [
          y > 0 ? WallUtils.create(x, y - 1, Orientation.HORIZONTAL) : null,
          x > 0 && y > 0 ? WallUtils.create(x - 1, y - 1, Orientation.HORIZONTAL) : null,
        ],
        [Direction.LEFT]: () => [
          x > 0 ? WallUtils.create(x - 1, y, Orientation.VERTICAL) : null,
          x > 0 && y > 0 ? WallUtils.create(x - 1, y - 1, Orientation.VERTICAL) : null,
        ],
        [Direction.RIGHT]: () => [
          WallUtils.create(x, y, Orientation.VERTICAL),
          y > 0 ? WallUtils.create(x, y - 1, Orientation.VERTICAL) : null,
        ],
      };

      const walls = wallChecks[direction]?.() ?? [];
      return !checkAreWallsPlaced(...walls);
    },
    [checkAreWallsPlaced],
  );

  const getTilesAvailableForMoveOrJump = useCallback(
    (p1: Position, p2: Position, dx: number, dy: number): Position[] => {
      const target = PositionUtils.create(p1.x + dx, p1.y + dy);
      const tiles = new Set<string>();

      if (!canMoveBetweenTiles(p1, target)) {
        return [];
      }

      if (!PositionUtils.equals(p2, target)) {
        tiles.add(target);
        return tiles;
      }

      const behind = PositionUtils.create(p2.x + dx, p2.y + dy);
      const sideways = [PositionUtils.create(p2.x + dy, p2.y + dx), PositionUtils.create(p2.x - dx, p2.y - dy)];

      const atEdge = behind.x < 0 || behind.x > 8 || behind.y < 0 || behind.y > 8;
      const canJumpBehind = !atEdge && canMoveBetweenTiles(p2, behind);

      if (canJumpBehind) {
        tiles.add(behind);
      } else {
        sideways.forEach(side => {
          if (canMoveBetweenTiles(p2, side)) {
            tiles.add(side);
          }
        });
      }

      return tiles;
    },
    [canMoveBetweenTiles],
  );

  useEffect(() => {
    if (!state.activePlayer) {
      return;
    }

    const activePlayerPosition = state.activePlayer === 1 ? state.player1.at(-1) : state.player2.at(-1);
    const player2Position = state.activePlayer === 1 ? state.player2.at(-1) : state.player1.at(-1);

    if (!activePlayerPosition || !player2Position) {
      return;
    }

    let tiles = new Set<Position>();
    directionDiffs.forEach(({ x, y }) => {
      tiles = new Set([...tiles, ...getTilesAvailableForMoveOrJump(activePlayerPosition, player2Position, x, y)]);
    });

    if (tiles.size !== 0) {
      setAvailableTiles(tiles);
    }
  }, [canMoveBetweenTiles, getTilesAvailableForMoveOrJump, state.activePlayer, state.player1, state.player2]);

  const checkWinner = useCallback(() => {
    const player1Position = state.player1.at(-1);
    const player2Position = state.player2.at(-1);

    if (!player1Position || !player2Position) {
      return;
    }

    if (player1Position.y === 8) {
      dispatch({ type: ActionType.SET_ACTIVE_PLAYER, payload: null });
      setAvailableTiles(new Set());
      alert('Player 1 won this game!');
    } else if (player2Position.y === 0) {
      dispatch({ type: ActionType.SET_ACTIVE_PLAYER, payload: null });
      setAvailableTiles(new Set());
      alert('Player 2 won this game!');
    }
  }, [dispatch, state.player1, state.player2]);

  useEffect(() => {
    if (!state.activePlayer) {
      return;
    }
    checkWinner();
  }, [checkWinner, state.activePlayer]);

  const handleTileClick = useCallback(
    (tilePosition: Position): void => {
      if (!state.activePlayer) {
        return;
      }

      if (!wallOrientation) {
        const player1Position = state.player1.at(-1) as Position;
        const player2Position = state.player2.at(-1) as Position;
        if (
          PositionUtils.equals(tilePosition, player1Position) ||
          PositionUtils.equals(tilePosition, player2Position)
        ) {
          return;
        }

        dispatch({ type: ActionType.MOVE_PLAYER, payload: { player: state.activePlayer, position: tilePosition } });
      } else {
        const { x, y } = tilePosition;

        if (x === 8 || y === 8) {
          return;
        }

        const isWallExists = [Orientation.HORIZONTAL, Orientation.VERTICAL].some(orientation =>
          state.walls.some(w => WallUtils.equals(w, WallUtils.createFromPosition(tilePosition, orientation))),
        );
        if (isWallExists) {
          return;
        }

        if (
          wallOrientation === Orientation.HORIZONTAL &&
          (state.walls.find(w => WallUtils.equals(w, WallUtils.create(x - 1, y, Orientation.HORIZONTAL))) ||
            state.walls.find(w => WallUtils.equals(w, WallUtils.create(x + 1, y, Orientation.HORIZONTAL))))
        ) {
          return;
        }
        if (
          wallOrientation === Orientation.VERTICAL &&
          (state.walls.find(w => WallUtils.equals(w, WallUtils.create(x, y + 1, Orientation.VERTICAL))) ||
            state.walls.find(w => WallUtils.equals(w, WallUtils.create(x, y - 1, Orientation.VERTICAL))))
        ) {
          return;
        }

        dispatch({
          type: ActionType.PLACE_WALL,
          payload: { player: state.activePlayer, wall: WallUtils.createFromPosition(tilePosition, wallOrientation) },
        });
        setWallOrientation(null);
      }
      handleNextMove();
    },
    [dispatch, handleNextMove, state.activePlayer, state.player1, state.player2, state.walls, wallOrientation],
  );

  return (
    <div className={styles.container}>
      <div className={styles.left_block}>Left</div>
      <div className={styles.board}>
        <div className={styles.walls_container}>
          {Array.from({ length: state.player2Walls }).map((_, i) => (
            <div key={i} className={styles.wall} />
          ))}
        </div>

        <div className={styles.tiles_container}>
          {ROW_INDEXES.map(row => (
            <div key={row} className={styles.row}>
              {COLUMN_INDEXES.map(col => (
                <Tile
                  key={col + row}
                  position={PositionUtils.fromString(col + row)}
                  isAvailable={availableTiles.has(col + row)}
                  onClick={handleTileClick}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.walls_container}>
          {Array.from({ length: state.player1Walls }).map((_, i) => (
            <div key={i} className={styles.wall} />
          ))}
        </div>
      </div>
      <div className={styles.right_block}>
        <div className={styles.game_control}>
          {state.activePlayer ? (
            <div>Player {state.activePlayer} move</div>
          ) : (
            <button onClick={handleStartGame}>Start Game</button>
          )}
        </div>
        <div className={styles.wall_picker}>
          <div className={styles.title}>Place wall</div>
          <button
            onClick={() => setWallOrientation(Orientation.HORIZONTAL)}
            className={clsx({ [styles.active]: wallOrientation === Orientation.HORIZONTAL })}
          >
            Horizontal
          </button>
          <button
            onClick={() => setWallOrientation(Orientation.VERTICAL)}
            className={clsx({ [styles.active]: wallOrientation === Orientation.VERTICAL })}
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
