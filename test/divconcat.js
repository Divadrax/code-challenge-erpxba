import divConcat from '../divconcat.js';
import assert from 'assert';

describe('DivConcat Tests', function () {
  it('should concatenate the given string to the output', function () {
    const sut = divConcat(1, 'foo');
    const r_actual = sut(2, '');
    const r_expected = 'foo';
    assert.strictEqual(r_actual, r_expected);
  });

  it('should concatenate if the number is divisible by the divisor', function () {
    const sut = divConcat(7, 'bar');
    const r_actual = sut(49, 'foo');
    const r_expected = 'foobar';
    assert.strictEqual(r_actual, r_expected);
  });

  it('should not concatenate if the number is not divisible by the divisor', function () {
    const sut = divConcat(5, 'bar');
    const r_actual = sut(6, 'foo');
    const r_expected = 'foo';
    assert.strictEqual(r_actual, r_expected);
  });
});
