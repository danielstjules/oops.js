var expect    = require('expect.js');
var fakeredis = require('fakeredis');
var Promise   = require('bluebird');
var client    = fakeredis.createClient(6379, '0.0.0.0', {fast: true});

var RedisStorage = require('../../lib/storage/redisStorage');
var storage = new RedisStorage(client);

describe('RedisStorage', function() {
  beforeEach(function(done) {
    client.flushdb(done);
  });

  describe('constructor', function() {
    it('stores the passed client in _client', function() {
      expect(storage._client).to.be(client);
    });

    it('promisifies the redis client', function() {
      var requiredMethods = ['incrAsync', 'getAsync', 'setAsync'];
      expect(storage._client).to.have.keys(requiredMethods);
    });
  });

  describe('increment', function() {
    it('sets an undefined key to 0 before incrementing', function(done) {
      storage.increment('incrUndefined').then(function(value) {
        expect(value).to.be(1);
        done();
      });
    });

    it('increments the given key', function(done) {
      var key = 'incrementKey';
      storage.increment(key).then(function() {
        return storage.increment(key);
      }).then(function(value) {
        expect(value).to.be(2);
        done();
      }).catch(done);
    });
  });

  describe('get', function() {
    it('returns the JSON parsed value at the given key', function(done) {
      var key = 'setKey';
      var value = [1, 2, {test: 'string'}];

      client.setAsync(key, JSON.stringify(value)).then(function() {
        return storage.get(key);
      }).then(function(res) {
        expect(res).to.eql(value);
        done();
      }).catch(done);
    });
  });

  describe('set', function() {
    it('stores the JSON serialized value at the key', function(done) {
      var key = 'getKey';
      var value = [1, 2, {test: 'string'}];

      storage.set(key, value).then(function() {
        return client.getAsync(key);
      }).then(function(res) {
        expect(res).to.eql(JSON.stringify(value));
        done();
      }).catch(done);
    });
  });
});
