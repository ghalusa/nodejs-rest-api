# A RESTful API Using Node.js #

### Overview ###

* Lets an authenticated user insert and delete configurations
* Allows for the listing of configurations with more than 100,000 entries
* Allows for sorting the listing by name, hostname, port, or username

### How do I get set up? ###

* Clone the repository
* Duplicate "config/database_sample.js" and rename it to "database.js"
* You can use the connection settings sent to you
* Or, you can create an account on Modulus (https://modulus.io/), with up to 64MB of free storage
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

### Support ###

* Goran Halusa
* [ghalusa@gmail.com](mailto:ghalusa@gmail.com)
* Issue Tracker
* [https://bitbucket.org/ghalusa/node.js-rest-api/issues](https://bitbucket.org/ghalusa/node.js-rest-api/issues)