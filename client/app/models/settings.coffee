module.exports = class Settings extends Backbone.Model
    urlRoot: 'settings'
    sync: (method, model, options) ->
      options.url = 'settings'
      return Backbone.sync method, model, options
