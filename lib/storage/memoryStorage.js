/**
 * Exports the MemoryStorage constructor, instances of which can be passed
 * to the various models for storage.
 */

var Promise    = require('bluebird');
module.exports = MemoryStorage;

/**
 * The constructor for a MemoryStorage.
 *
 * @constructor
 */
function MemoryStorage() {
  this._store = {};
}

/**
 * Increments the given key, setting it to 0 if not already used. Returns a
 * promise containing the incremented key.
 *
 * @param   {string}  key The key to increment
 * @returns {Promise} A promise with the incremented key
 */
MemoryStorage.prototype.increment = function(key) {
  if (!this._store[key]) {
    this._store[key] = 0;
  }

  return Promise.resolve(++this._store[key]);
};

/**
 * Returns a Promise which is resolved with the given key's value on success,
 * or rejected if the key was not set.
 *
 * @param   {string}  key The key to retrieve
 * @returns {Promise} A promise with its value on success
 */
MemoryStorage.prototype.get = function(key) {
  if (!this._store[key]) {
    return Promise.reject('Key not set');
  }

  return Promise.resolve(this._store[key]);
};

/**
 * Returns a Promise which is resolved after setting the given key to the
 * passed value.
 *
 * @param   {string}  key The key to set
 * @returns {Promise} A resolved promise
 */
MemoryStorage.prototype.set = function(key, value) {
  this._store[key] = value;

  return Promise.resolve();
};
