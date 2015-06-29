<<<<<<< HEAD
<<<<<<< HEAD
// Generated by CoffeeScript 1.8.0
=======
// Generated by CoffeeScript 1.9.1
>>>>>>> built
=======
// Generated by CoffeeScript 1.9.3
>>>>>>> built
var LOCALE_PATH, LocalizationManager, Polyglot, cozydb, fs, jade, path;

jade = require('jade');

fs = require('fs');

Polyglot = require('node-polyglot');

cozydb = require('cozydb');

path = require('path');

LOCALE_PATH = path.resolve(__dirname, '../../client/app/locales/');

LocalizationManager = (function() {
  function LocalizationManager() {}

  LocalizationManager.prototype.polyglot = null;

  LocalizationManager.prototype.templateCache = {};

  LocalizationManager.prototype.initialize = function(callback) {
    if (callback == null) {
      callback = function() {};
    }
    return this.retrieveLocale((function(_this) {
      return function(err, locale) {
        if (err != null) {
          _this.polyglot = _this.getPolyglotByLocale(null);
        } else {
          _this.polyglot = _this.getPolyglotByLocale(locale);
          _this.prepareEmailsTemplate();
        }
        return callback(null, _this.polyglot);
      };
    })(this));
  };

  LocalizationManager.prototype.retrieveLocale = function(callback) {
    return cozydb.api.getCozyLocale(function(err, locale) {
      if ((err != null) || !locale) {
        locale = 'en';
      }
      return callback(err, locale);
    });
  };

  LocalizationManager.prototype.getPolyglotByLocale = function(locale) {
    var err, phrases;
    try {
      phrases = require("" + LOCALE_PATH + "/" + locale);
    } catch (_error) {
      err = _error;
      phrases = require("" + LOCALE_PATH + "/en");
    }
    return new Polyglot({
      locale: locale,
      phrases: phrases
    });
  };

  LocalizationManager.prototype.prepareEmailsTemplate = function() {
    var cacheKey, i, len, locale, name, ref, results;
    locale = this.getLocale();
<<<<<<< HEAD
    _ref = ['mail_invitation', 'mail_update', 'mail_delete'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      cacheKey = "" + name + "_" + locale;
      _results.push(this.templateCache[cacheKey] = this.buildEmailTemplate(name));
=======
    ref = ['mail_invitation', 'mail_update', 'mail_delete'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      name = ref[i];
      cacheKey = name + "_" + locale;
      results.push(this.templateCache[cacheKey] = this.buildEmailTemplate(name));
>>>>>>> built
    }
    return results;
  };

  LocalizationManager.prototype.t = function(key, params) {
    var ref;
    if (params == null) {
      params = {};
    }
    return (ref = this.polyglot) != null ? ref.t(key, params) : void 0;
  };

  LocalizationManager.prototype.buildEmailTemplate = function(name) {
    var filePath, templatefile;
    filePath = "../mails/" + this.polyglot.currentLocale + "/" + name + ".jade";
    templatefile = require('path').join(__dirname, filePath);
    return jade.compile(fs.readFileSync(templatefile, 'utf8'));
  };

  LocalizationManager.prototype.getEmailTemplate = function(name) {
    var cacheKey;
    cacheKey = "" + name + "_" + (this.getLocale());
    if (this.templateCache[cacheKey] == null) {
      this.templateCache[cacheKey] = this.buildEmailTemplate(name);
    }
    return this.templateCache[cacheKey];
  };

  LocalizationManager.prototype.getLocale = function() {
    return this.polyglot.currentLocale;
  };

  LocalizationManager.prototype.getPolyglot = function() {
    return this.polyglot;
  };

  return LocalizationManager;

})();

module.exports = new LocalizationManager();
