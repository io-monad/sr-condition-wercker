var SRError = require('@semantic-release/error');

module.exports = function (pluginConfig, config, cb) {
  var env = config.env;
  var options = config.options;

  if (env.WERCKER !== "true") {
    return cb(new SRError(
      "semantic-release didn’t run on wercker and therefore a new version won’t be published.",
      "ENOWERCKER"
    ));
  }

  if (env.WERCKER_GIT_BRANCH !== options.branch) {
    return cb(new SRError(
      "This test run was triggered on the branch " + env.WERCKER_GIT_BRANCH +
      ", while semantic-release is configured to only publish from " + options.branch + ".",
      "EBRANCHMISMATCH"
    ));
  }

  // WERCKER_RESULT is set only for after-steps
  if (env.hasOwnProperty("WERCKER_RESULT") && env.WERCKER_RESULT !== "passed") {
    return cb(new SRError(
      "This test run was not passed and therefore a new version won’t be published.",
      "EFAILED"
    ));
  }

  cb(null);
};
