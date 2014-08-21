var models        = require('./models');
var storage       = require('./storage');
var utils         = require('./utils');
var MemoryStorage = storage.MemoryStorage;
var RedisStorage  = storage.RedisStorage;
var domain        = require('domain');

var Exception, Frame;

/**
 * Middleware for Express 4 that wraps all requests and responses in a domain
 * for better error handling.
 */
exports.wrapRequests = function(req, res, next) {
  var expressDomain = domain.create();

  expressDomain.add(req);
  expressDomain.add(res);

  expressDomain
    .on('error', next)
    .run(next);
};

/**
 * Oops middleware for Express 4.
 *
 * @param   {object}   opts Options to use
 * @returns {function} Express 4 middleware
 */
exports.express = function(opts) {
  var storage = getStorage(opts);

  return function(err, req, res, next) {
    next();
  };
};

/**
 * Oops middleware for Koa. Requires harmony features to be enabled.
 *
 * @param   {object}   opts Options to use
 * @returns {function} Koa middleware
 */
exports.koa = function(opts) {
  if (['0.11', '0.12'].indexOf(utils.getMinorVersion()) === -1) {
    console.error("You must be running Node > 0.11 to use Koa");
  }

  var storage = getStorage(opts);

  return require('./oopsHarmony').koa(opts, storage);
};

/**
 * Given an options object, as passed to the exported middleware, instantiates
 * and returns a new storage object.
 *
 * @param   {object} opts Options to pass
 * @returns {MemoryStorage|RedisStorage} A storage instance
 */
function getStorage(opts) {
  // Create an instance of RedisStorage if opts.redis is set
  if (opts.redis) {
    return new RedisStorage(opts.redis);
  } else {
    return new MemoryStorage();
  }
}
