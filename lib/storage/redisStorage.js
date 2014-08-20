/**
 * Exports the RedisStorage constructor, instances of which can be passed
 * to the various models for storage. Values are serialized with JSON to
 * maintain API compatibility with MemoryStorage.
 */

var Promise    = require('bluebird');
module.exports = RedisStorage;

/**
 * The constructor for a RedisStorage. Requires a node_redis client, which
 * is then promisified and stored.
 *
 * @constructor
 *
 * @param {RedisClient} client The node_redis instance to use
 */
function RedisStorage(client) {
  this._client = Promise.promisifyAll(client);
}

/**
 * Increments the given key, setting it to 0 if not already used. Returns a
 * promise containing the incremented key.
 *
 * @param   {string}  key The key to increment
 * @returns {Promise} A promise with the incremented key
 */
RedisStorage.prototype.increment = function(key) {
  return this._client.incrAsync(key);
};

/**
 * Returns a Promise which is resolved with the given key's value on success,
 * or rejected if the key was not set.
 *
 * @param   {string}  key The key to retrieve
 * @returns {Promise} A promise with its value on success
 */
RedisStorage.prototype.get = function(key) {
  return this._client.getAsync(key).then(function(value) {
    return Promise.resolve(JSON.parse(value));
  });
};

/**
 * Returns a Promise which is resolved after setting the given key to the
 * passed value.
 *
 * @param   {string}  key The key to set
 * @returns {Promise} A resolved promise
 */
RedisStorage.prototype.set = function(key, value) {
  return this._client.setAsync(key, JSON.stringify(value));
};
