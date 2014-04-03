var sorted = require('../');

var xs = 'bhdajemfcngiklop'.split('');
var s = sorted(xs);
console.log(s.range('e', 'j').join(''));
