import { Direction, Robot } from "./Robot";

function isValidDirection(direction: string): direction is Direction {
  return Object.values(Direction).includes(direction as Direction);
}

export function parseCommand(robot: Robot, command: string): void {
  const parts = command.split(' ');
  const instruction = parts[0].toUpperCase();
  switch (instruction) {
    case 'PLACE': {
      const args = parts.slice(1).join('').split(',');
      if (args.length !== 3 || !isValidDirection(args[2])) {
        console.log("🚫🤖 Oops! That's an invalid PLACE command. Let's give it another go! 🔄");
        return;
      }
      const [xStr, yStr, directionStr] = args;
      const x = parseInt(xStr, 10);
      const y = parseInt(yStr, 10);
      const direction = directionStr as Direction;
      robot.place(x, y, direction);
      break;
    }
    case 'MOVE':
      robot.move();
      break;
    case 'LEFT':
      robot.turnLeft();
      break;
    case 'RIGHT':
      robot.turnRight();
      break;
    case 'REPORT':
      robot.report();
      break;
    default:
      console.log("🚫🤖 Oops! That's an invalid command. Let's try that again! 🔄");
  }
}