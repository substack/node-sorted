var test = require('tape');
var sorted = require('../');

test('isSorted', function (assert) {
    assert.ok(sorted.isSorted([5,6,7]));
    assert.ok(sorted.isSorted([0,2,4,6]));
    assert.ok(sorted.isSorted([0,3,3,3]));
    assert.ok(sorted.isSorted([]));
    assert.ok(sorted.isSorted([1]));
    assert.ok(sorted.isSorted([1,1]));
    assert.ok(sorted.isSorted([1,8,8]));
    assert.ok(sorted.isSorted([NaN]));
    
    assert.ok(sorted.isSorted([3,2,1], function (a, b) {
        if (a < b) return 1
        else if (a > b) return -1
        else return 0
    }));
    
    assert.ok(sorted.isSorted(['a','b','c']));
    
    assert.ok(!sorted.isSorted([8,7]));
    assert.ok(!sorted.isSorted([3,1,2]));
    assert.ok(!sorted.isSorted([0,1,2,NaN]));
    assert.ok(!sorted.isSorted([NaN,0,1,2]));
    assert.end();
});

test('random', function (assert) {
    for (var i = 0; i < 100; i++) {
        var xs = sorted();
        for (var j = 0; j < 10; j++) {
            xs.push(Math.floor(Math.random() * (j + 1)));
            xs.unshift(Math.floor(Math.random() * (j + 1)));
        }
        assert.ok(sorted.isSorted(xs));
        assert.ok(sorted.isSorted(xs.toArray()));
    }
    assert.end();
});

test('concat', function (assert) {
    assert.deepEqual(
        sorted([4,5,6]).concat(
            [2,3,4,5], 6, sorted([5,7,8,9]), sorted([21,22])
        ).toArray(),
        [ 2, 3, 4, 4, 5, 5, 5, 6, 6, 7, 8, 9, 21, 22 ]
    );
    assert.end();
});

test('insertArray', function (assert) {
    var s0 = sorted([ 2, 5, 5, 9, 10, 13, 13, 15 ]);
    var s1 = sorted([]);
    var s2 = sorted([ 3 ]);
    var s3 = sorted([ 7, 8, 8, 9, 10, 11, 13, 13, 14 ]);
    
    for (var i = 0; i < 30; i++) {
        var xs = [];
        var end = Math.floor(Math.random() * 20);
        for (var j = 0; j < end; j++) {
            xs.push(Math.floor(Math.random() * (j + 1)));
        }
        
        s0.insert(xs);
        assert.ok(sorted.isSorted(s0.toArray()), s0.toArray());
        
        s1.insert(xs);
        assert.ok(sorted.isSorted(s1.toArray()), s1.toArray());
        
        s2.insert(xs);
        assert.ok(sorted.isSorted(s2.toArray()), s2.toArray());
        
        s3.insert(xs);
        assert.ok(sorted.isSorted(s3.toArray()), s3.toArray());
    }
    assert.end();
});

test('getSet', function (assert) {
    var s = sorted([ 2, 5, 5, 9, 10, 13, 13, 15 ]);
    assert.equal(s.get(0), 2);
    assert.equal(s.get(1), 5);
    assert.equal(s.get(2), 5);
    assert.equal(s.get(3), 9);
    
    s.set(2, 6);
    assert.equal(s.get(2), 6);
    assert.equal(s.get(3), 9);
    
    s.set(2, 10);
    assert.equal(s.get(2), 9);
    assert.equal(s.get(3), 10);
    assert.end();
});

test('slice', function (assert) {
    var xs = [ 1, 1, 2, 3, 5, 8, 13 ];
    var s = sorted(xs);
    
    for (var i = 0; i < xs.length; i++) {
        for (var j = i; j < xs.length; j++) {
            var sliced = s.slice(i,j).toArray();
            assert.ok(sorted.isSorted(sliced));
            assert.deepEqual(sliced, xs.slice(i,j));
        }
    }
    assert.end();
});

test('map', function (assert) {
    var xs = [ 1, 1, 2, 3, 5, 8, 13 ];
    var s = sorted(xs);
    var s_ = s.map(function (x) { return 15 - x });
    assert.ok(sorted.isSorted(s_.toArray()));
    
    assert.deepEqual(xs, [ 1, 1, 2, 3, 5, 8, 13 ], 'xs was modified');
    assert.deepEqual(s.toArray(), xs, '.map() modified the elements');
    assert.deepEqual(
        s_.toArray(),
        xs.slice().reverse().map(function (x) { return 15 - x })
    );
    assert.end();
});

test('filter', function (assert) {
    var xs = [ 1, 1, 2, 3, 5, 8, 13 ];
    var s = sorted(xs);
    var s_ = s.filter(function (x) { return x % 2 === 0 });
    assert.ok(sorted.isSorted(s_.toArray()));
    
    assert.deepEqual(xs, [ 1, 1, 2, 3, 5, 8, 13 ], 'xs was modified');
    assert.deepEqual(s.toArray(), xs, '.filter() modified the elements');
    assert.deepEqual(s_.toArray(), [ 2, 8 ]);
    assert.end();
});

test('shiftPop', function (assert) {
    var xs = [ 1, 1, 2, 3, 5, 8, 13 ];
    var s = sorted(xs);
    assert.equal(s.shift(), 1);
    assert.equal(s.shift(), 1);
    assert.equal(s.shift(), 2);
    assert.deepEqual(s.toArray(), [ 3, 5, 8, 13 ]);
    assert.equal(s.pop(), 13);
    assert.equal(s.pop(), 8);
    assert.deepEqual(s.toArray(), [ 3, 5 ]);
    assert.equal(s.shift(), 3);
    assert.deepEqual(s.toArray(), [ 5 ]);
    assert.equal(s.pop(), 5);
    assert.deepEqual(s.toArray(), []);
    assert.ok(s.shift() === undefined);
    assert.deepEqual(s.toArray(), []);
    assert.ok(s.pop() === undefined);
    assert.deepEqual(s.toArray(), []);
    assert.end();
});
