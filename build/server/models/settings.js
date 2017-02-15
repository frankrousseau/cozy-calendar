// Generated by CoffeeScript 1.10.0
var Settings, cozydb, log;

cozydb = require('cozydb');

log = require('printit')({
  prefix: 'tag:settings'
});

module.exports = Settings = cozydb.getModel('Settings', {
  app: String,
  defaultCalendar: String
});

Settings.getCalAppSettings = function(callback) {
  return Settings.request('all', function(err, allSettings) {
    var calendarSettings;
    if (err) {
      return callback(err);
    }
    allSettings = allSettings.filter(function(settings) {
      return settings.app === 'calendar';
    });
    if (allSettings.length === 0) {
      calendarSettings = {
        app: 'calendar',
        defaultCalendar: ''
      };
      return Settings.create(calendarSettings, function(err, calendarSettings) {
        if (err) {
          return callback(err);
        }
        return callback(null, calendarSettings);
      });
    } else {
      return callback(null, allSettings[0]);
    }
  });
};

Settings.updateCalAppSettings = function(data, callback) {
  var newSettings;
  newSettings = {
    defaultCalendar: data.defaultCalendar
  };
  return Settings.getCalAppSettings(function(err, calendarSettings) {
    if (err) {
      return callback(err);
    }
    return calendarSettings.updateAttributes(newSettings, function(err, calendarSettings) {
      if (err) {
        return callback(err);
      }
      return callback(null, calendarSettings);
    });
  });
};
