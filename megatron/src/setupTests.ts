// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {Position} from "./Position";

describe("Position test", () => {
  test("should be 1, 1, 13", async () => {
      let position: Position = new Position(1, 1, 13);
    expect(position).toEqual({
        x: 1,
        y: 1,
        rotation: 13
    })
  });
});