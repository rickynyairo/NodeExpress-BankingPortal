const express = require('express');

const router = express.Router();

const { accounts } = require('../data.js');

router.get('/savings', (_req, res) => {
    res.render("account", { account: accounts.savings });
});
router.get('/credit', (_req, res) => {
    res.render("account", { account: accounts.credit });
});
router.get('/checking', (_req, res) => {
    res.render("account", { account: accounts.checking });
});

module.exports = router;