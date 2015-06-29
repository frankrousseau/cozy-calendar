<<<<<<< HEAD
<<<<<<< HEAD
// Generated by CoffeeScript 1.8.0
=======
// Generated by CoffeeScript 1.9.1
>>>>>>> built
=======
// Generated by CoffeeScript 1.9.3
>>>>>>> built
var port, start;

start = function(port, callback) {
  return require('americano').start({
    name: 'Calendar',
    port: port,
    host: process.env.HOST || "0.0.0.0",
    root: __dirname
  }, function(app, server) {
    var Realtimer, User, localization, realtime;
    User = require('./server/models/user');
    localization = require('./server/libs/localization_manager');
    Realtimer = require('cozy-realtime-adapter');
    realtime = Realtimer(server, ['event.*']);
    realtime.on('user.*', function() {
      return User.updateUser();
    });
    return User.updateUser(function(err) {
      return localization.initialize(function() {
        var Alarm, Event;
        Event = require('./server/models/event');
        Alarm = require('./server/models/alarm');
        return Event.migrateAll(function() {
          return Alarm.migrateAll(function() {
            return callback(err, app, server);
          });
        });
      });
    });
  });
};

if (!module.parent) {
  port = process.env.PORT || 9113;
  start(port, function(err) {
    if (err) {
      console.log("Initialization failed, not starting");
      console.log(err.stack);
      return process.exit(1);
    }
  });
} else {
  module.exports = start;
}
