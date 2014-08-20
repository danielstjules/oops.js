/**
 * Exports the various storages to be used. Each storage type offers the
 * following methods: incr, get, set.
 */

module.exports = {
  MemoryStorage: require('./memoryStorage'),
  RedisStorage: require('./redisStorage')
};
