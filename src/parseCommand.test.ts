import { Robot, Direction } from './Robot';
import { parseCommand } from './parseCommand'

describe('parseCommand', () => {
  let robot: Robot;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    robot = new Robot();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('correctly handles PLACE command', () => {
    parseCommand(robot, 'PLACE 1,2,NORTH');
    const state = robot.getValues();
    expect(state).toEqual({ x: 1, y: 2, direction: Direction.NORTH });
  });

  test('ignores all commands when not placed', () => {
    parseCommand(robot, 'MOVE');
    parseCommand(robot, 'LEFT');
    parseCommand(robot, 'RIGHT');
    parseCommand(robot, 'REPORT');
    const state = robot.getValues();
    expect(state).toEqual({ x: 0, y: 0, direction: Direction.NORTH });
  });

  test('executes MOVE command after being placed', () => {
    parseCommand(robot, 'PLACE 0,0,NORTH');
    parseCommand(robot, 'MOVE');
    const state = robot.getValues();
    expect(state).toEqual({ x: 0, y: 1, direction: Direction.NORTH });
  });

  test('handles turning LEFT', () => {
    parseCommand(robot, 'PLACE 0,0,NORTH');
    parseCommand(robot, 'LEFT');
    const state = robot.getValues();
    expect(state.direction).toBe(Direction.WEST);
  });

  test('handles turning RIGHT', () => {
    parseCommand(robot, 'PLACE 0,0,NORTH');
    parseCommand(robot, 'RIGHT');
    const state = robot.getValues();
    expect(state.direction).toBe(Direction.EAST);
  });

  test('rejects invalid PLACE command', () => {
    parseCommand(robot, 'PLACE 5,5,UP');
    const state = robot.getValues();
    expect(state).toEqual({ x: 0, y: 0, direction: Direction.NORTH });
    expect(consoleSpy).toHaveBeenCalledWith("🚫🤖 Oops! That's an invalid PLACE command. Let's give it another go! 🔄");
  });

  test('logs error on invalid command', () => {
    parseCommand(robot, 'FLY');
    expect(consoleSpy).toHaveBeenCalledWith("🚫🤖 Oops! That's an invalid command. Let's try that again! 🔄");
  });

  test('should report correct position and direction when placed', () => {
    parseCommand(robot, 'PLACE 0,0,NORTH');
    parseCommand(robot, 'REPORT');
    expect(consoleSpy).toHaveBeenCalledWith("📍🤖 Reporting my position: (0, 0) facing NORTH");
  });
});
