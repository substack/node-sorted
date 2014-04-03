var test = require('tape');
var sorted = require('../');

test('neighbors', function (t) {
    var xs = 'bhdajemfcngiklop'.split('');
    var s = sorted(xs);
    var ix = s.findIndex('h');
    t.equal(s.get(ix-1), 'g', 'prev neighbor');
    t.equal(s.get(ix+1), 'i', 'next neighbor');
    t.end();
});

test('range', function (t) {
    var xs = 'bhdajemfcngiklop'.split('');
    var s = sorted(xs);
    t.deepEqual(s.range('e', 'j').join(''), 'efghij');
    t.end();
});
