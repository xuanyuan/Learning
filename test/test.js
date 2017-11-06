/**
 * Created by zhangdianjun on 17-11-1
 */

const assert = require('assert');
const fill   = require('../lodash/fill');
const arrayEq = require('../lodash/arrayEq')

describe('#fill.js', function () {
    describe('#fill()', function () {
        it('新建数组填充内容', function () {
            assert.equal(true, arrayEq([1,1,1,1], fill(new Array(4), 1)));
        });

        it('新建数组 start end', function () {
            assert.equal(true, arrayEq([ , ,1,undefined], fill(new Array(4), 1, 2, 3)));

        });

        it('数组包含undefined', function () {
            assert.equal(true, arrayEq([1,1,1,1], fill([3,3,,3], 1, undefined)));
        });

        it('start and end is undefined', function () {
            assert.equal(true, arrayEq([1,1,1,1], fill([3,3,,3], 1, undefined, undefined)));
        });

        it('start === end', function () {
            assert.equal(true,arrayEq([3,3,3], fill([3,3,3], 1, 3, 3)));
        });
        it('更新最后一个', function () {
            assert.equal(true,arrayEq([3,3,1], fill([3,3,3], 1, 2, 3)));
        });
        it('更新最后两个', function () {
            assert.equal(true,arrayEq([3,1,1], fill([3,3,3], 1, 1, 3)));
        });
    });
});

describe('#arrayEq.js', function () {
    describe('#array.equals()', function () {
        it('should return true', function () {
            assert.strictEqual(true, arrayEq([1,1,1,1], [1,1,1,1]));
        });

        it('should return false', function () {
            assert.strictEqual(false, arrayEq([1,1,1,'1'], [1,1,1,1]));
        });

        it('包含非数组内容', function () {
            assert.strictEqual(false, arrayEq(undefined, null));
        });

        it('两个数组都为[]', function () {
            assert.strictEqual(true, arrayEq([], []));
        });

        it('数组不规范', function () {
            assert.strictEqual(false, arrayEq([1,1,1,], [1,1,1,1]));
        });

        it('数组长度不相等', function () {
            assert.strictEqual(false, arrayEq([1,1,1], [1,1,1,1]));
        });

        it ('[ , , 1, 1 ] !== [, , 1, ]', function () {
            assert.strictEqual(false, arrayEq([ , ,1, 1], [ , ,1, ]));
        })

        it ('[ , , 1, ] === [, , 1, ]', function () {
            assert.strictEqual(true, arrayEq([ , ,1, ], [ , ,1, ]));
        })
    });
});

