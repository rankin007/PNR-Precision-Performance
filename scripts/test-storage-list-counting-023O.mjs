import assert from "node:assert/strict";

const countStorageListResult = (value) => {
  if (value === null || value === undefined) return 0;
  if (Array.isArray(value)) return value.length;
  return 1;
};

assert.equal(countStorageListResult(null), 0);
assert.equal(countStorageListResult(undefined), 0);
assert.equal(countStorageListResult([]), 0);
assert.equal(countStorageListResult([{}]), 1);
assert.equal(countStorageListResult([{}, {}]), 2);
assert.equal(countStorageListResult({}), 1);

console.log("023O Storage list null/array/object count regression proof passed.");
