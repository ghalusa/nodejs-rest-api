# A RESTful API Using Node.js #

### Overview ###

* Lets an authenticated user insert and delete server configurations
* Allows for the listing of server configurations with more than 100,000 entries
* Allows for sorting the listing by name, hostname, port, or username

### How do I get set up? ###

**Note: I will be providing schemas, or ODM (Object Data Mapping), shortly... via Mongoose.**

* Clone the repository
* Duplicate "config/database_sample.js" and rename it to "database.js"
* You can create an account on Modulus (https://modulus.io/), with up to 64MB of free storage
* Or, of course, you can run your own MongoDB instance
* Duplicate "config/secret_sample.js" and rename it to "secret.js"
* Modify the default "secret" to something different

#### Next ####

```
#!bash

npm install
```

#### Run It ####

```
#!bash

node server.js
```
or using forever

```
#!bash

forever start server.js
```

#### Go! ####
[http://localhost:3000/](http://localhost:3000/)

* * *

### Screenshot ###

A screenshot of the web interface for performing tests, kinda like a watered-down [Postman](https://www.getpostman.com/).

![alt text](http://halusanation.com/wp-content/uploads/2015/01/nodejs_rest_api_screenshot.png "Node.js REST API screenshot")

* * *

### Sample REST Calls ###

#### POST Login

#### /login

##### JSON

```json
{
  "email":"youremail@gmail.com",
  "password":"yourpassword"
}
```

##### cURL

```bash
curl -i -X POST -H "Content-Type: application/json" -d '{"email":"youremail@gmail.com", "password":"yourpassword"}' http://localhost:3000/login
```

* * *

#### POST Logout

#### /logout

##### cURL

```bash
curl -i -X POST -H "Content-Type: application/json" -H "x-access-token:YOUR_AUTH_TOKEN" -H "x-key:youremail@gmail.com" http://localhost:3000/logout
```

* * *

#### GET Configurations

sort field / order / skip / max

#### /api/configurations/port/asc/0/50

##### cURL

```bash
curl -i -X GET -H "content-type:application/json" -H "x-access-token:YOUR_AUTH_TOKEN" -H "x-key:youremail@gmail.com" http://localhost:3000/api/configurations/port/asc/0/50
```

* * *

#### GET Configuration

#### /api/configuration/541a405494faef4be2adf4d1

##### cURL

```bash
curl -i -X GET -H "content-type:application/json" -H "x-access-token:YOUR_AUTH_TOKEN" -H "x-key:youremail@gmail.com" http://localhost:3000/api/configuration/541a405494faef4be2adf4d1
```

* * *

#### POST Configuration

#### /api/configuration/

##### JSON

```json
{
  "name":"host221122",
  "hostname":"nodejs.developer.io",
  "port":"2112",
  "username":"nodejsdev@developer.io"
}
```

##### cURL

```bash
curl -i -X POST -H "content-type:application/json" -H "x-access-token:YOUR_AUTH_TOKEN" -H "x-key:youremail@gmail.com" -d '{"name":"host221122" , "hostname":"nodejs.developer.io" , "port":"2112", "username":"nodejsdev@developer.io"}' http://localhost:3000/api/configuration/
```

* * *

#### PUT Configuration

#### /api/configuration/541a405494faef4be2adf4d1

##### JSON

```json
{
  "name": "host104", 
  "hostname": "zzzzzz.georgianna.biz", 
  "port": 2179, 
  "username": "zzzzzz@karelle.org"
}
```

##### cURL

```bash
curl -i -X PUT -H "content-type:application/json" -H "x-access-token:YOUR_AUTH_TOKEN" -H "x-key:youremail@gmail.com" -d '{ "name": "host104", "hostname": "zzzzzz.georgianna.biz", "port": 2179, "username": "zzzzzz@karelle.org" }' http://localhost:3000/api/configuration/541a405494faef4be2adf4d1
```

* * *

#### DELETE Configuration

#### /api/configuration/541a405494faef4be2adf4d1

##### cURL

```bash
curl -i -X DELETE -H "content-type:application/json" -H "x-access-token:YOUR_AUTH_TOKEN" -H "x-key:youremail@gmail.com" http://localhost:3000/api/configuration/541a405494faef4be2adf4d1
```

* * * 

### Support ###

* Goran Halusa
* [gor@webcraftr.com](mailto:gor@webcraftr.com)
* Issue Tracker
* [https://github.com/ghalusa/nodejs-rest-api/issues](https://github.com/ghalusa/nodejs-rest-api/issues)