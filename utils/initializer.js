const User = require('../models/user')
const Store = require('../models/store')
const logger = require('../utils/logger')

exports.init = async function () {
  if ((await Store.countDocuments({})) === 0) {
    for (let i = 0; i < 111; i++) {
      const obj = {
        name: `comercio ${i + 1}`,
        cuit: 'cuit',
        concepts: [],
        currentBalance: Math.random() * 20,
        active: (Math.random() > 0.4999),
        lastSale: new Date()
      };
      obj.lastSale.setDate(Math.random() * 25);
      Store.create(obj);
    }
  }

  if (await User.countDocuments({"username": "test@koibanx.com"})) {
    return;
  }

  let user = new User();
  user.username = "test@koibanx.com";
  user.password = "test123";
  await User.create(user);

  logger.info("Test User created")
}
