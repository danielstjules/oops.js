exports.getMinorVersion = function() {
  var version = process.versions.node.split('.');

  return version[0] + '.' + version[1];
};
