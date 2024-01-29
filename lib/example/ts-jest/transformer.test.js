"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var add_1 = require("./add");
describe('test transformer', function () {
    it('c should be 1', function () {
        expect(add_1.c).toBe(1);
    });
    it('add(1, 1) should be 2', function () {
        expect(add_1.add(1, 1)).toBe(2);
    });
});
