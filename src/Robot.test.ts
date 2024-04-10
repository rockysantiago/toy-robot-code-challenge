import { Robot, Direction } from './Robot';

describe('Robot', () => {
  let robot: Robot;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    robot = new Robot();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should ignore all commands until a valid place is executed', () => {
    robot.move();
    robot.turnLeft();
    robot.turnRight();
    robot.report();
    expect(robot.getValues()).toEqual({ x: 0, y: 0, direction: Direction.NORTH });
    robot.place(1, 1, Direction.EAST);
    expect(robot.getValues()).toEqual({ x: 1, y: 1, direction: Direction.EAST });
  });

  test('should be placed on valid position and direction', () => {
    robot.place(2, 2, Direction.SOUTH);
    expect(robot.getValues()).toEqual({ x: 2, y: 2, direction: Direction.SOUTH });
  });

  test('should ignore placement on invalid position', () => {
    robot.place(-1, 5, Direction.NORTH);
    expect(robot.getValues()).toEqual({ x: 0, y: 0, direction: Direction.NORTH });
  });

  test('should move north when placed facing north', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.move();
    expect(robot.getValues()).toEqual({ x: 0, y: 1, direction: Direction.NORTH });
  });

  test('should move east when placed facing east', () => {
    robot.place(0, 0, Direction.EAST);
    robot.move();
    expect(robot.getValues()).toEqual({ x: 1, y: 0, direction: Direction.EAST });
  });

  test('should move south when placed facing south', () => {
    robot.place(0, 1, Direction.SOUTH);
    robot.move();
    expect(robot.getValues()).toEqual({ x: 0, y: 0, direction: Direction.SOUTH });
  });

  test('should move west when placed facing west', () => {
    robot.place(1, 0, Direction.WEST);
    robot.move();
    expect(robot.getValues()).toEqual({ x: 0, y: 0, direction: Direction.WEST });
  });

  test('should turn left from NORTH to WEST', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.turnLeft();
    expect(robot.getValues()).toEqual({ x: 0, y: 0, direction: Direction.WEST });
  });

  test('should turn right from NORTH to EAST', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.turnRight();
    expect(robot.getValues()).toEqual({ x: 0, y: 0, direction: Direction.EAST });
  });

  test('should not fall off the table when moving to the edge', () => {
    robot.place(0, 4, Direction.NORTH);
    robot.move();
    expect(robot.getValues()).toEqual({ x: 0, y: 4, direction: Direction.NORTH });
  });

  test('should report correct position and direction when placed', () => {
    robot.place(2, 3, Direction.NORTH);
    robot.report();
    expect(consoleSpy).toHaveBeenCalledWith("📍🤖 Reporting my position: (2, 3) facing NORTH");
  });
});
