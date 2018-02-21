const vfa = require('./..');

function withVeryFastArgs() {
  return vfa.apply(null, arguments);
}

for(var i = 0; i < 1e6; i++) {
  withVeryFastArgs(1,2,3,4);
}
