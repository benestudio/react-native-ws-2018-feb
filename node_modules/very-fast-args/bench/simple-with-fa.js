const fastArgs = require('fast-args');

function withVeryFastArgs() {
  return fastArgs(arguments);
}

for(var i = 0; i < 1e6; i++) {
  withVeryFastArgs(1,2,3,4);
}
