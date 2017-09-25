var express         =   require('express');
var requestChecker  =   require('./middleware.js').check_get_type;
var app             =   express();

/* Add the middleware to express app */
//app.use(requestChecker);

// Another middleware, will get executed after above one.
// Order of middleware is sequential.

app.use(requestChecker, function(req,res,next) {
    res.send(next);
});

app.listen(3000);