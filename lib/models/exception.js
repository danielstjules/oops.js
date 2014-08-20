/**
 * Exports the Exception model when given a storage object.
 */

module.exports = function(storage) {
  /**
   * The constructor for an Exception object. Consists of an id, an error name,
   * its message, as well as its frames.
   *
   * @constructor
   *
   * @param {int}     id      The exception's unique id
   * @param {string}  type    Original error name
   * @param {string}  message Original error string message
   * @param {Frame[]} frames  Parsed error frames
   */
  function Exception(id, type, message, frames) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.frames = frames;
  }

  /**
   * Accepts an instance of Error, corresponding to a thrown exception. From
   * the error, both its properties and stack trace are parsed to create the
   * corresponding exception and frames to be saved.
   *
   * @param   {Error}   error The thrown error
   * @returns {Promise} A promise passing the resulting exception object
   */
  Exception.parseError = function(error) {

  };

  /**
   * Overrides the default prepareStackTrace handler. Stores a reference to the
   * structured stack trace at error.structuredTrace, and invokes the original
   * behaviour which stores its string representation at error.stack. The
   * structuredTrace array consists of CallSite objects which are documented
   * at: https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
   */
  Exception.setupStackHandler = function() {
    var originalStackHandler = Error.prepareStackTrace;

    Error.prepareStackTrace = function(error, stack) {
      // Only store the last 9 frames
      error.structuredTrace = stack.slice(0, 9);
      originalStackHandler(error, stack);
    };
  };

  Exception.get = function(id) {

  };

  Exception.prototype.createFrames = function(structuredStack) {

  };
};
