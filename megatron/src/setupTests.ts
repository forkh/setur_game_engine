// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {dot_product, Vector} from "./Vector";

describe("Some tests", () => {
    it("should give 3", () => {
        const v1: Vector = {
            x: 1,
            y: 3,
            z: -5
        }

        const v2: Vector = {
            x: 4,
            y: -2,
            z: -1
        }

        const dot_product_result: number = dot_product(v1, v2);

        expect(dot_product_result).toBe(3);
    })
})

