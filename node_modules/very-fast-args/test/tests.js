const vfa = require('./..');
const assert = require('assert');

function fixture() {
  return vfa.apply(null, arguments);
}
describe('vfa', function () {
  it('should work for 2', function() {
    const result = fixture(1, 2);
    assert.equal(result.length, 2);
    assert.equal(result[0], 1);
    assert.equal(result[0], 1);
    assert.ok(Array.isArray(result));
  });

  it('should work for 3', function() {
    const result = fixture(1, 2, 3);
    assert.equal(result.length, 3);
    assert.equal(result[0], 1);
    assert.equal(result[1], 2);
    assert.equal(result[2], 3);
  });

  it('should work for 4', function() {
    const result = fixture(1, 2, 3, 4);
    assert.equal(result.length, 4);
    assert.equal(result[0], 1);
    assert.equal(result[1], 2);
    assert.equal(result[2], 3);
    assert.equal(result[3], 4);
  });
});
