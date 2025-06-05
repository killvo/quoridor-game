import { Orientation } from '@/enums/orientation.enum';
import { Position } from '@/interfaces/position.interface';
import { Wall } from '@/interfaces/wall.interface';

const WallUtils = {
  create(x: number, y: number, orientation: Orientation): Wall {
    return { x, y, orientation };
  },

  createFromPosition(position: Position, orientation: Orientation): Wall {
    return { x: position.x, y: position.y, orientation };
  },

  fromString(wall: string): Wall {
    if (wall.length !== 3 || isNaN(+wall[0]) || isNaN(+wall[1])) {
      throw new Error(`Invalid wall string: "${wall}"`);
    }

    return { x: +wall[0], y: +wall[1], orientation: wall[2] as Orientation };
  },

  toString({ x, y, orientation }: Wall): string {
    return `${x}${y}${orientation}`;
  },

  equals(a: Wall, b: Wall): boolean {
    return a.x === b.x && a.y === b.y && a.orientation === b.orientation;
  },
};

export { WallUtils };
