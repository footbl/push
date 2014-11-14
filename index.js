var async, request;
async = require('async');
request = require('request');

module.exports = function (token, opts, next) {
  async.waterfall([function (next) {
    request.post('https://api.zeropush.com/register', {'form' : {
      'auth_token'   : token,
      'device_token' : opts.device
    }}, next);
  }, function () {
    request.post('https://api.zeropush.com/notify', {'form' : {
      'auth_token'      : token,
      'device_tokens[]' : opts.device,
      'alert'           : JSON.stringify(opts.alert),
      'sound'           : opts.sound
    }}, next);
  }], next);
};