const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });
require('./utils/initializer').init();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const basicAuth = require('express-basic-auth');
const User = require('./models/user');
const getUnauthorizedResponse = (req) => {
  return req.auth ? ('Credentials rejected') : 'No credentials provided';
};
const Authorizer = async (username, password, cb) => {
  const userMatch = await User.findOne({ username: username }).exec();
  if (userMatch === null) { return cb(null, false); }
  const out = userMatch.verifyPassword(password);
  return cb(null, out);
};
app.use(basicAuth({
  challenge: true,
  authorizer: Authorizer,
  authorizeAsync: true,
  unauthorizedResponse: getUnauthorizedResponse
}));
app.use('/api', require('./routes/stores'));

// Start the server
app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

module.exports = app;
