# sorted

A sorted array data structure

# example

## repl

```
> var sorted = require('sorted')
> var xs = sorted([ 3, 1, 2, 0 ])
> xs
<Sorted [0,1,2,3]>
> xs.push(2.5)
5
> xs
<Sorted [0,1,2,2.5,3]>
```

## neighbors

``` js
var sorted = require('sorted');

var xs = 'abcdefghijklmnop'.split('');
var s = sorted(xs);
var ix = s.findIndex('h');
console.log('current:', s.get(ix));
console.log('prev:', s.get(ix-1));
console.log('next:', s.get(ix+1));
```

## range

``` js
var sorted = require('sorted');

var xs = 'abcdefghijklmnop'.split('');
var s = sorted(xs);
console.log(s.range('e', 'j').join(''));
```

# methods

``` js
var sorted = require('sorted');
```

## var s = sorted(xs, cmp)

Create a new sorted array `s` given an array `xs` which may or may not be sorted
and a comparison function `cmp`. If cmp isn't specified it defaults to:

``` js
function cmp (a, b) {
    if (a == b) return 0
    else if (a > b) return 1
    else if (a < b) return -1
    else throw new RangeError('Unstable comparison: ' + a + ' cmp ' + b)
}
```

`cmp` should return `0` for equality, `< 0` for less than, and `> 0` for greater
than. If `cmp` returns a value for which comparisons fail such as `NaN` it will throw
a RangeError.

## s.isSorted(xs, cmp)

Return whether `xs` is sorted using `cmp`.
`xs` can be an array or a sorted instance, which always return true.

## s.fromSorted(xs, cmp)

Create a new sorted structure from a pre-sorted array or sorted object `xs`
using a comparison `cmp` which falls back to the default if unspecified.

## s.push(x, ...), s.unshift(x, ...)

Insert the element or elements `x, ...` into the data structure, maintaining the
sorted order.

## s.splice(i, len, ...)

Remove `len` elements starting at index `i`.
Any additional arguments will be pushed to the structure maintaining the sorted
order.

## s.findIndex(x, start=0, end=s.length)

Search for the index of the value `x` starting at index `start` and ending at
`end` using a binary search.

If the value lies outside the given range, return either bound depending.

## s.toArray()

Return a copy of the underlying sorted data as an array.

## s.sort(cmp)

Return a new sorted structure using the comparison `cmp`. If the comparison is
the same as `s.compare`, returns a sorted copy.

## s.concat(x, ...)

Return a new sorted which concatenates the items, arrays, and sorteds in the
arguments list.

## s.insert(xs)

Insert the array, element, or sorted `xs` into the structure. If `xs` is a
sorted, this fact will be observed to make the insertion go faster.

## s.get(i)

Get the element at index `i`.

## s.set(i, x)

Set the element at index `i`, preserving the ordering.

## s.slice(i, j)

Return a new sorted containing elements between `i` and `j` using `s.compare`.

## s.map(fn)

Return a new sorted mapping over the elements of `s` with `fn`.

## s.filter(fn)

Return a new sorted filtering over the elements of `s` with `fn`.

## s.shift()

Return and remove the least item in the structure.

## s.pop()

Return and remove the greatest item in the structure.

## s.range(a, b)

Return the range of all elements from `a` through `b`, inclusive.

# attributes

## s.length

Number of elements in the structure

## s.compare

Comparison function being used

## s.elements

The raw elements. If you mess with these directly you risk invalidating the
ordering.

# array methods

These methods work exactly like in a regular array:

* indexOf
* forEach
* reduce
* reduceRight
* every
* some
* join
