function withRest(...rest) {
  rest.push(1);
  return rest;
}

for(var i = 0; i < 1e6; i++) {
  withRest(1,2,3,4);
}
