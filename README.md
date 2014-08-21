# oops.js

Better error pages for Node.js. A collection of middleware for better error
handling and reporting with Express 3/4 and Koa. Also compatible with other
connect-style frameworks.

## Overview

The library exposes middleware specific to both Express as well as Koa.

Express middleware:

* `oops.wrapRequests`: Binds all request/response pairs to domains. This
  localizes any uncaught exceptions thrown during a request life-cycle to the
  given request.
* `oops.express`: Installs an error handler and error page

Koa middleware:

* `oops.koa`: Installs an error handler and error page

It also exposes a function for installing an error dashboard:

* `oops.installDashboard`: Install the oops dashboard in an express or koa app

## Express 3.x and 4.x

Basic development setup:

```
var oops = require('oops.js');

if (app.settings.env === 'development') {
  app.use(oops.express());
}
```

Using a redis client to track errors among multiple node instances, as well
as wrapRequests and the dashboard.

```
var redis  = require('redis');
var client = redis.createClient();
var oops = require('oops.js');

app.use(oops.wrapRequests);
if (app.settings.env === 'development') {
  app.use(oops.express());
  oops.installDashboard(app, {redis: client});
}
```
