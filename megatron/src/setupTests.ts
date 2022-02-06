// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {Sprite} from "./Sprite";

describe("Sprite test", () => {
  test("should try to render sprites to canvas.", async () => {
      let sprite: Sprite = new Sprite("somePath");
    expect(sprite).toHaveFormValues({
        sprite: "somePath"
    });
  });
});