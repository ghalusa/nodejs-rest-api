var express = require('express')
  , router = express.Router()
  , auth = require('./auth.js')
  , configurations = require('./configurations.js')
  , config = require('../config/configurations.js');

/*
 * Non-authenticated routes.
 */

router.get('/', function(req, res) {
  res.render(
      'index'
    , { title: 'Configurations REST API', google_analytics_key: config.googleAnalyticsKey }
  );
});

router.post('/login', auth.login);

/*
 * Authenticated routes.
 */

router.post('/logout', auth.logout);
router.get('/api/configurations/:sort_field?/:sort_order?/:start_record?/:stop_record?', configurations.getAll);
router.get('/api/configuration/:id', configurations.getOne);
router.post('/api/configuration/', configurations.create);
router.put('/api/configuration/:id', configurations.update);
router.delete('/api/configuration/:id', configurations.delete);

module.exports = router;