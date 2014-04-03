var sorted = require('../');

var xs = 'abcdefghijklmnop'.split('');
var s = sorted(xs);
console.log(s.range('e', 'j').join(''));
