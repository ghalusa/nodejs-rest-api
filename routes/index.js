var express = require('express')
  , router = express.Router()
  , auth = require('./auth.js')
  , configurations = require('./configurations.js');

/*
 * Non-authenticated route.
 */

// curl -i -X POST -H "Content-Type: application/json" -d '{"email":"EMAIL_ADDRESS_PLACEHOLDER", "password":"PASSWORD_PLACEHOLDER"}' http://geekl.in/login
router.post('/login', auth.login);

/*
 * Authenticated routes.
 */

// curl -H "content-type:application/json" -H "x-access-token:ACCESS_TOKEN_PLACEHOLDER" -H "x-key:EMAIL_ADDRESS_PLACEHOLDER" http://geekl.in/api/configurations
router.get('/api/configurations/:sort_field?/:sort_order?/:start_record?/:stop_record?', configurations.getAll);

// curl -H "content-type:application/json" -H "x-access-token:ACCESS_TOKEN_PLACEHOLDER" -H "x-key:EMAIL_ADDRESS_PLACEHOLDER" http://geekl.in/api/configuration/541a405494faef4be2adf4c7
router.get('/api/configuration/:id', configurations.getOne);

// curl -i -X POST -H "Content-Type: application/json" -H "x-access-token:ACCESS_TOKEN_PLACEHOLDER" -H "x-key:EMAIL_ADDRESS_PLACEHOLDER" -d '{"name":"host221122" , "hostname":"nodejs.developer.io" , "port":"2112", "username":"nodejsdev@developer.io"}' http://geekl.in/api/configuration/
router.post('/api/configuration/', configurations.create);

// curl -i -X PUT -H "Content-Type: application/json" -H "x-access-token:ACCESS_TOKEN_PLACEHOLDER" -H "x-key:EMAIL_ADDRESS_PLACEHOLDER" -d '{"name":"host1" , "hostname":"marie_rohan.hermina.org" , "port":"4716", "username":"tommie@kacey.org"}' http://geekl.in/api/configuration/541a405494faef4be2adf538
router.put('/api/configuration/:id', configurations.update);

// curl -i -X DELETE -H "content-type:application/json" -H "x-access-token:ACCESS_TOKEN_PLACEHOLDER" -H "x-key:EMAIL_ADDRESS_PLACEHOLDER" http://geekl.in/api/configuration/54288aca1151d69f12054600
router.delete('/api/configuration/:id', configurations.delete);

module.exports = router;