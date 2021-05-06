//TODO: https://www.npmjs.com/package/mochawesome // use after(){} in mocha so we don't have to use setTimeout

const testFuncs = {
  door1: () => {
    return describe('tiger blood', function () {
      it('should return the string', function () {
        // eslint-disable-next-line no-undef
        let result = tigerBlood();
        expect(result).to.eql(
          'Will the Conqueror + Fahad the Impressed + Charlie Sheen'
        );
      });
    });
  },
};

export default testFuncs;
