/* eslint-disable no-undef */
//TODO: https://www.npmjs.com/package/mochawesome // use after(){} in mocha so we don't have to use setTimeout

import { expect } from 'chai';

const testFuncs = {
  doorTest: () => {
    return describe('firstdoor', function () {
      it('should return the array value U', function () {
        let door = [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          [0, 1, 2, 3, 4, 5, 6, 'L'],
        ];
        let result = door1(door);
        expect(result).to.eql('U');
      });
    });
  },
  //thermalDoor potential solution:
  // locks.forEach((lock, i) => {locks[i] = "U"})
  // return locks
  thermalDoor: () => {
    return describe('thermal', function () {
      it('should return an array of indexs with value U', function () {
        let door = ['L', 'L', 'L', 'L'];
        let result = thermalDoor(door);
        expect(result).to.eql(['U', 'U', 'U', 'U']);
      });
    });
  },
  //dragon boss potential solution:
  //return heat - heat;
  dragonBoss: () => {
    return describe('dragon', function () {
      it('should return 0', function () {
        let heat = 9000;
        let result = heatRegulation(heat);
        expect(result).to.eql(0);
      });
    });
  },
  //happy door potential solution:
  // locks.pop()
  //return locks;
  happyDoor: () => {
    return describe('joy', function () {
      it('return an array missing the last value', function () {
        let arr = ['H', 'a', 'p', 'p', 'i', 'n', 'e', 's', 's', 'L'];
        let result = happyDoor(arr);
        expect(result).to.eql(['H', 'a', 'p', 'p', 'i', 'n', 'e', 's', 's']);
      });
    });
  },
};

export default testFuncs;
