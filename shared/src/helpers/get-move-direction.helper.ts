import { Direction } from '@/enums/direction.enum';
import { type Position } from '@/interfaces/position.interface';

const getMoveDirection = (from: Position, to: Position): Direction | null => {
  if (from.x !== to.x && from.y === to.y) {
    return from.x < to.x ? Direction.RIGHT : Direction.LEFT;
  }

  if (from.x === to.x && from.y !== to.y) {
    return from.y < to.y ? Direction.UP : Direction.DOWN;
  }

  return null;
};

export { getMoveDirection };
