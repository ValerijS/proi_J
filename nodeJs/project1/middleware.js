//Server with Middleware
//
//Let’s write our middleware function which will check the type of each HTTP request. If it is GET we will not proceed further. Basically the fundamental use of Middleware is to execute various validation code like Session verification, data verification which is common across all the application separately.
//
//To begin with create new file and name it middleware.js and the following code into it.
//
//middleware.js
//module.exports = function(req,res,next) {
//    if(req.method === 'GET') {
//        res.end('GET method not supported');
//    } else {
//        next();
//    }
//};
//Notice that we are passing request,response and next object in the function which is used to handle the HTTP requests. Now let’s see how to include it in our Server file.
//
//app.js
//var express         =   require('express');
//var requestChecker  =   require('./middleware.js');
//var app             =   express();
//
///* Add the middleware to express app */
//app.use(requestChecker);
//
//// Another middleware, will get executed after above one.
//// Order of middleware is sequential.
//
//app.use(function(req,res) {
//    res.send('Hello there !');
//});
//
//app.listen(3000);
//We just added the file into our app using .use() which is inbuilt middleware of Express.js. Now try running the code and visit localhost:3000.
//var express = require('express');
//var app = express();
//app.engine('html', require('ejs').renderFile);

function check_get_type(req,res,next) {
    if(req.method === 'GET') {
        res.end('GET method not supported');
    } else {
        next('par1');
    }
}
function check_sess(req,res,next) { sess = req.session;
if(sess.email) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
    res.redirect('/admin');
}
else {
    res.render('index.html');
}
}



module.exports ={check_get_type:check_get_type,check_sess:check_sess};
//module.exports =function (req,res,next) {
//    if(req.method === 'GET') {
//        res.end('GET method not supported');
//    } else {
//        next('go to');
//    }
//}