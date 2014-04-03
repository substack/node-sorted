var sorted = require('../');

var xs = 'abcdefghijklmnop'.split('');
var s = sorted(xs);
var ix = s.findIndex('h');
console.log('current:', s.get(ix));
console.log('prev:', s.get(ix-1));
console.log('next:', s.get(ix+1));
