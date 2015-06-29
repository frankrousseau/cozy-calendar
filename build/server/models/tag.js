<<<<<<< HEAD
<<<<<<< HEAD
// Generated by CoffeeScript 1.8.0
=======
// Generated by CoffeeScript 1.9.1
>>>>>>> built
=======
// Generated by CoffeeScript 1.9.3
>>>>>>> built
var Tag, cozydb, log;

cozydb = require('cozydb');

log = require('printit')({
  prefix: 'tag:model'
});

module.exports = Tag = cozydb.getModel('Tag', {
  name: {
    type: String
  },
  color: {
    type: String
  }
});

Tag.byName = function(name, callback) {
  return Tag.request('all', {
    key: name
  }, callback);
};

Tag.getOrCreate = function(data, callback) {
  return Tag.byName(data.name, function(err, tags) {
    if (err) {
      log.error(err);
      return Tag.create(data, callback);
    } else if (tags.length === 0) {
      return Tag.create(data, callback);
    } else {
      return callback(null, tags[0]);
    }
  });
};
