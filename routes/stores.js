const logger = require('../utils/logger');
const express = require('express');
const Store = require('../models/store');
const StoreDecorator = require('../utils/storeDecorator');
const router = express.Router();

router.route('/stores').get(async (req, res) => {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  const query = req.query.q ? JSON.parse(req.query.q) : {};

  if (page <= 0 || isNaN(page)) { page = 1; }
  if (limit < 0 || isNaN(limit)) { limit = 0; }

  const result = await Store.find(query).limit(limit).skip(limit * (page - 1)).exec();
  const count = await Store.countDocuments(query);
  const decoratedResult = [];
  result.map((value) => {
    const dec = new StoreDecorator(value);
    return decoratedResult.push(dec);
  });
  const out = {
    data: decoratedResult,
    page: page,
    limit: limit,
    pages: Math.ceil(count / limit),
    total: count
  };
  if (!isFinite(out.pages) || (out.pages === 0)) { out.pages = 1; }
  res.send(out);
});

router.route('/stores').post(async (req, res) => {
  const data = { ...req.body };
  const needKeys = {
    name: String,
    cuit: String,
    concepts: Array,
    currentBalance: Number,
    active: Boolean,
    lastSale: String
  };
  const invKeys = [];
  const typeKeys = [];
  Object.keys(needKeys).map((value) => {
    if (!(value in data)) {
      return invKeys.push(value);
    }
    if (typeof data[value] !== typeof needKeys[value]) {
      return typeKeys.push(value);
    }
    return value;
  });
  if (invKeys.length > 0) {
    return res.send(`required keys: ${invKeys}`);
  }
  if (typeKeys.length > 0) {
    return res.send(`invalid type: ${typeKeys}`);
  }
  Store.create(data, (err, inst) => {
    if (err) return res.send(err);
    return res.send(inst);
  });
});

module.exports = router;
