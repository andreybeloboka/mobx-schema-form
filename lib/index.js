if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
  module.exports = require('./MobxSchemaForm.min.js');
} else {
  module.exports = require('./MobxSchemaForm.js');
}