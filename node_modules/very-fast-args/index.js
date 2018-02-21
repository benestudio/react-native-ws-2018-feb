function vfa() {
  switch(arguments.length) {
    case 1:
      return [ arguments[0] ];
    case 2:
      return [ arguments[0], arguments[1] ];
    case 3:
      return [ arguments[0], arguments[1], arguments[2] ];
    case 4:
      return [ arguments[0], arguments[1], arguments[2] , arguments[3] ];
    case 5:
      return [ arguments[0], arguments[1], arguments[2] , arguments[3], arguments[4] ];
    case 6:
      return [ arguments[0], arguments[1], arguments[2] , arguments[3], arguments[4], arguments[5] ];
    default:
      return Array.apply(null, arguments);
  }
}

try{
  module.exports = Function('return function fargs(...rest){ return rest; }')();
} catch(err) {
  module.exports = vfa;
}
