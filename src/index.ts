import readline from 'readline'
import { parseCommand } from './parseCommand';
import { Robot } from './Robot';

function main(): void {
  const robot = new Robot();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("🤖✨ Welcome to the Robot Command Line Interface! ✨🤖");
  console.log("📝 Enter a command: 'PLACE X,Y,F (NORTH, EAST, SOUTH, WEST)', 'MOVE', 'LEFT', 'RIGHT', 'REPORT', or type 'QUIT' or 'Q' to wave goodbye! 👋");

  rl.on('line', (line: string) => {
    const command = line.trim().toUpperCase();
    if (command === 'QUIT' || command === 'Q') {
      rl.close();
      console.log("👋🤖 Exiting Robot CLI. Goodbye and see you later!");
    } else {
      parseCommand(robot, command);
    }
  });
}

main();