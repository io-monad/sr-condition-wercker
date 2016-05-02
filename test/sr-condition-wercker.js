var assert = require("power-assert");
var condition = require("../");
var SRError = require('@semantic-release/error');

describe("sr-condition-werker", () => {
  it("only runs on wercker", done => {
    condition({}, { env: {} }, err => {
      assert(err instanceof SRError);
      assert(err.code === "ENOWERCKER");
      done();
    });
  });

  it("only runs on specified branch", done => {
    condition({}, {
      env: {
        WERCKER: "true",
        WERCKER_GIT_BRANCH: "notmaster"
      },
      options: {
        branch: "master"
      }
    }, err => {
      assert(err instanceof SRError);
      assert(err.code === "EBRANCHMISMATCH");
      done();
    });
  });

  it("respects options.branch", done => {
    condition({}, {
      env: {
        WERCKER: "true",
        WERCKER_GIT_BRANCH: "master"
      },
      options: {
        branch: "foo"
      }
    }, err => {
      assert(err instanceof SRError);
      assert(err.code === "EBRANCHMISMATCH");
      done();
    });
  });

  it("does not run if build is failed", done => {
    condition({}, {
      env: {
        WERCKER: "true",
        WERCKER_GIT_BRANCH: "master",
        WERCKER_RESULT: "failed"
      },
      options: {
        branch: "master"
      }
    }, err => {
      assert(err instanceof SRError);
      assert(err.code === "EFAILED");
      done();
    });
  });

  it("runs if build is passed", done => {
    condition({}, {
      env: {
        WERCKER: "true",
        WERCKER_GIT_BRANCH: "master",
        WERCKER_RESULT: "passed"
      },
      options: {
        branch: "master"
      }
    }, err => {
      assert(err === null);
      done();
    });
  });

  it("runs if not in after-steps", done => {
    condition({}, {
      env: {
        WERCKER: "true",
        WERCKER_GIT_BRANCH: "master"
      },
      options: {
        branch: "master"
      }
    }, err => {
      assert(err === null);
      done();
    });
  });
});
