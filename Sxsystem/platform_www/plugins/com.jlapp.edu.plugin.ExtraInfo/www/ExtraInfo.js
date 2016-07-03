cordova.define("com.jlapp.edu.plugin.ExtraInfo.ExtraInfo", function(require, exports, module) {
var exec = require('cordova/exec');

exports.getExtra = function(datas,success, error) {
    exec(success, error, "ExtraInfo", "getExtra", datas);
};showAliPay
});
