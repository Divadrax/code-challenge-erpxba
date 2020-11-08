import finder from '../finder.js';
import assert from 'assert';
import fs from 'fs';

describe('Finder Tests', function () {
  it('should not find anything in an empty text', function () {
    const sut = finder('');
    const r_actual = sut('');
    const r_expected = [];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should not find a subtext in an empty text', function () {
    const sut = finder('');
    const r_actual = sut('foo');
    const r_expected = [];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should find a text in itself', function () {
    const sut = finder('foo');
    const r_actual = sut('foo');
    const r_expected = [0];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should not find a subtext not occurring in the text', function () {
    const sut = finder('foo');
    const r_actual = sut('bar');
    const r_expected = [];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should not find a subtext longer than the text', function () {
    const sut = finder('foo');
    const r_actual = sut('foo ');
    const r_expected = [];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should find a subtext inside a larger text', function () {
    const sut = finder('foobar');
    const r_actual = sut('oba');
    const r_expected = [2];
    assert.deepStrictEqual(r_actual, r_expected);
  });
  
  it('should find a subtext at the start', function () {
    const sut = finder('Start at the very beginning');
    const r_actual = sut('Start');
    const r_expected = [0];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should find a subtext at the end', function () {
    const sut = finder('The end of the line');
    const r_actual = sut('line');
    const r_expected = [15];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should find a subtext multiple times', function () {
    const sut = finder('the rain in spain falls mainly in the plain');
    const r_actual = sut('ain');
    const r_expected = [5, 14, 25, 40];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should not care about case', function () {
    const sut = finder('The RAiN in Spain falls maINly in the pLAIn');
    const r_actual = sut('aIn');
    const r_expected = [5, 14, 25, 40];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should find every instance in a lot of repetitions', function () {
    const sut = finder('ffffff');
    const r_actual = sut('ff');
    const r_expected = [0, 1, 2, 3, 4];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should treat spaces as any other character', function () {
    const sut = finder('The  end  of   the     road');
    const r_actual = sut('e   ');
    const r_expected = [17];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should find non-ASCII characters', function () {
    const sut = finder('¿Qué me decías?');
    const r_actual = sut('qué');
    const r_expected = [1];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should not match non-ASCII characters with ASCII characters', function () {
    const sut = finder('¿Qué me decías?');
    const r_actual = sut('que');
    const r_expected = [];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should cope with large texts', function () {
    const txt = fs.readFileSync('./test/pp.txt', 'utf8');
    const sut = finder(txt);
    const r_actual = sut('unknowingly');
    const r_expected = [393946];
    assert.deepStrictEqual(r_actual, r_expected);
  });

  it('should cope with large subtexts', function () {
    const txt = fs.readFileSync('./test/pp.txt', 'utf8');
    const sut = finder(txt);
    const r_actual = sut(txt);
    const r_expected = [0];
    assert.deepStrictEqual(r_actual, r_expected);
  });
});
