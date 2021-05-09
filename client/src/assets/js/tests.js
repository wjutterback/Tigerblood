/* eslint-disable no-undef */
//TODO: https://www.npmjs.com/package/mochawesome // use after(){} in mocha so we don't have to use setTimeout

const testFuncs = {
  doorTest: (testArray) => {
    return describe('Locked Door', function () {
      it('should return the array value U', function () {
        let tileMap = [
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
        let result = door1(tileMap);
        expect(result).to.eql('U');
      });
    });
  },
};

export default testFuncs;
