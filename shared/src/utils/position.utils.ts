import { Position } from '@/interfaces/position.interface';

const PositionUtils = {
  create(x: number, y: number): Position {
    return { x, y };
  },

  fromString(pos: string): Position {
    if (pos.length !== 2 || isNaN(+pos[0]) || isNaN(+pos[1])) {
      throw new Error(`Invalid position string: "${pos}"`);
    }
    return { x: +pos[0], y: +pos[1] };
  },

  toString(pos: Position): string {
    return `${pos.x}${pos.y}`;
  },

  equals(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
  },

  distance(a: Position, b: Position): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  },
};

export { PositionUtils };
