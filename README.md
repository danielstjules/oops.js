# oops.js

Better error pages for Node.js. A collection of middleware for better error
handling with Express and Koa.

## Express 3.x and 4.x

Basic development setup:

```
var oops = require('oops.js')();

app.use(oops.wrapRequests);
app.configure('development', function() {
  app.use(oops.express);
});
```

Using a redis client to track errors among multiple node instances:

```
var redis  = require('redis');
var client = redis.createClient();
var oops = require('oops.js');

app.use(oops.wrapRequests);
app.configure('development', function() {
  var opts = {redis: client};
  app.use(oops.express(opts));
});
```
