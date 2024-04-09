import { main } from ".";

test('returns the correct greeting', () => {
  expect(main()).toBe("Hello World");
});
