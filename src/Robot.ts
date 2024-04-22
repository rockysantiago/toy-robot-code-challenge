export enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
}

type Position = { x: number; y: number };

export class Robot {
  private position: Position = { x: 0, y: 0 };
  private direction: Direction = Direction.NORTH;
  private isPlaced: boolean = false;

  private checkIfPlaced(): boolean {
    if (!this.isPlaced) {
      console.log("🛑🤖 Oops! I'm not on the table yet. Please place me first! 🚀🗺️");
      return false;
    }
    return true;
  }

  public place(x: number, y: number, direction: Direction): void {
    if (x < 0 || x > 4 || y < 0 || y > 4 || !Object.values(Direction).includes(direction)) {
      console.log("🛑🤖 Oops! That spot's off-limits for me. Please place me within the table! 🚀🗺️");
      return;
    }

    this.position = { x, y };
    this.direction = direction;
    this.isPlaced = true;
  }

  public move(): void {
    if (!this.checkIfPlaced()) return;

    let { x, y } = this.position;
    let newX = x;
    let newY = y;

    switch (this.direction) {
      case Direction.NORTH:
        newY = Math.min(y + 1, 4);
        break;
      case Direction.EAST:
        newX = Math.min(x + 1, 4);
        break;
      case Direction.SOUTH:
        newY = Math.max(y - 1, 0);
        break;
      case Direction.WEST:
        newX = Math.max(x - 1, 0);
        break;
    }

    if (newX === x && newY === y) {
      console.log("🚨 Oops! I 🤖 can't go there, I'd fall off the table! 🚫🌍");
      return;
    }

    this.position = { x: newX, y: newY };
  }

  public turnLeft(): void {
    if (!this.checkIfPlaced()) return;
    const directions = Object.values(Direction);
    const currentIndex = directions.indexOf(this.direction);
    const newIndex = (currentIndex - 1 + directions.length) % directions.length;
    this.direction = directions[newIndex] as Direction;
  }

  public turnRight(): void {
    if (!this.checkIfPlaced()) return;
    const directions = Object.values(Direction);
    const currentIndex = directions.indexOf(this.direction);
    const newIndex = (currentIndex + 1) % directions.length;
    this.direction = directions[newIndex] as Direction;
  }

  public report() {
    if (!this.checkIfPlaced()) return;
    console.log(`📍🤖 Reporting my position: (${this.position.x}, ${this.position.y}) facing ${this.direction}`);
  };

  public getValues() {
    return { x: this.position.x, y: this.position.y, direction: this.direction };
  }

  public getGridRepresentation(): string {
    let grid: string[][] = new Array(5).fill(null).map(() => new Array(5).fill(' '));
    
    if (this.isPlaced) {
      const directionSymbol = {
        [Direction.NORTH]: '↑',
        [Direction.EAST]: '→',
        [Direction.SOUTH]: '↓',
        [Direction.WEST]: '←'
      }[this.direction];
      grid[this.position.y][this.position.x] = directionSymbol;
    }
    
    const horizontalLine = '+---+---+---+---+---+';
  
    let gridString = horizontalLine + '\n';
    
    grid.reverse().forEach(row => {
      const rowString = '| ' + row.join(' | ') + ' |';
      gridString += rowString + '\n' + horizontalLine + '\n';
    });
  
    return gridString;
  }
  
}
