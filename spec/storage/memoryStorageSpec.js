var expect    = require('expect.js');
var Promise   = require('bluebird');

var MemoryStorage = require('../../lib/storage/memoryStorage');
var storage = new MemoryStorage();

describe('MemoryStorage', function() {
  describe('constructor', function() {
    it('assigns an empty object to the _store property', function() {
      var storage = new MemoryStorage();
      expect(storage._store).to.eql({});
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
    it('returns the value at the given key', function(done) {
      var key = 'setKey';
      var value = [1, 2, {test: 'string'}];
      storage._store[key] = value;

      return storage.get(key).then(function(res) {
        expect(res).to.eql(value);
        done();
      }).catch(done);
    });
  });

  describe('set', function() {
    it('sets the key to the specified value', function(done) {
      var key = 'getKey';
      var value = [1, 2, {test: 'string'}];

      storage.set(key, value).then(function() {
        expect(storage._store[key]).to.eql(value);
        done();
      }).catch(done);
    });
  });
});
