/**
 * Modules exported here are experimental and COULD break in the future. Make sure you keep your app
 * up do date if you plan to use any of these.
 */

module.exports = {
  get Lottie() {
    return require('lottie-react-native');
  },
  get Branch() {
    return require('react-native-branch').default;
  },
  get GestureHandler() {
    return require('react-native-gesture-handler');
  },
  get Payments() {
    return require('./Payments');
  },
  get DeviceMotion() {
    return require('./sensor/DeviceMotion').default;
  },
};
