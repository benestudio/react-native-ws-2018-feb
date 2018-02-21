'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


class StandaloneBuildFlags {} /**
                               *  
                               *
                               *  StandaloneBuildFlags is owned by a StandaloneContext and carries information about
                               *  how to compile native code during the build step.
                               */

StandaloneBuildFlags.createEmpty = () => {
  let flags = new StandaloneBuildFlags();
  flags.configuration = 'Debug';
  return flags;
};

StandaloneBuildFlags.createIos = (configuration, ios) => {
  let flags = new StandaloneBuildFlags();
  flags.configuration = configuration;
  flags.ios = ios;
  return flags;
};

StandaloneBuildFlags.createAndroid = (configuration, android) => {
  let flags = new StandaloneBuildFlags();
  flags.configuration = configuration;
  flags.android = android;
  return flags;
};

exports.default = StandaloneBuildFlags;
//# sourceMappingURL=../__sourcemaps__/detach/StandaloneBuildFlags.js.map
