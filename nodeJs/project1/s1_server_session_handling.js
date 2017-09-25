////var express = require('express');
////var session = require('express-session');
////var app = express();
////app.use(session({secret: 'ssshhhhh'}));
////var sess;
////app.get('/',function(req,res){
////    sess=req.session;
////    /*
////    * Here we have assign the 'session' to 'sess'.
////    * Now we can create any number of session variable we want.
////    * in PHP we do as $_SESSION['var name'].
////    * Here we do like this.
////    */
////    sess.email; // equivalent to $_SESSION['email'] in PHP.
////    sess.username; // equivalent to $_SESSION['username'] in PHP.
////});
//https://codeforgeek.com/2014/09/manage-session-using-node-js-express-4/
//Session handling in any web application is very important and must have thing, without it we won’t be able to track user and it’s activity. In my previous article i have explained Session handling in PHP.
//
//In this article i am going to explain how to handle Session in ExpressJS 4 and above. Express 3 deprecate many dependencies like ‘bodyParser‘ , ‘logger‘ etc. Our code is written by taking consideration of latest Express JS framework.
//YOUTUBE DEMO DOWNLOAD
//
// 
//At the time of writing article, latest version of Express is 4.8.7.
//
//To demonstrate Session handling in Node, i have developed small Log-in and log-out System. In this User can log-in by providing their email, and that email will be used for further Session tracking. Once User log-out, Session will be destroyed and User will be redirected to home page.
//
//Important !
//
//If you are familiar with Express and using its in built body-parser and session, then it’s no more and you have to now install those dependencies separately.  Following are the dependencies which we have used for this System.
//
//express-session
//body-parser
//ejs
//package.json
//{
//    "name": "Node-Express4-Session",
//    "version": "0.0.1",
//    "main": "server.js",
//    "dependencies": {
//        "body-parser": "^1.7.0",
//        "ejs": "^1.0.0",
//        "express": "^4.8.7",
//        "express-session": "^1.7.6"
//    }
//}
//Run
//
//npm install
//to install dependencies for the project.
//
//How to use Express Session ?
//
//Before heading to actual code, i want to put few words about express-session module. to use this module, you must have to include express in your project. Like for all packages, we have to first include it.
//
//server.js
//var express = require('express');
//var session = require('express-session');
//var app = express();
//After this, we have to initialize the session and we can do this by using following.
//
//app.use(session({secret: 'ssshhhhh'}));
//Here ‘secret‘ is used for cookie handling etc but we have to put some secret for managing Session in Express.
//
//Now using ‘request‘ variable you can assign session to any variable. Just like we do in PHP using $_SESSION variable. for e.g
//
//var sess;
//app.get('/',function(req,res){
//    sess=req.session;
//    /*
//    * Here we have assign the 'session' to 'sess'.
//    * Now we can create any number of session variable we want.
//    * in PHP we do as $_SESSION['var name'].
//    * Here we do like this.
//    */
//    sess.email; // equivalent to $_SESSION['email'] in PHP.
//    sess.username; // equivalent to $_SESSION['username'] in PHP.
//});
//After creating Session variables like sess.email , we can check whether this variable is set or not in other routers and can track the Session easily.
//
//Project Directory Structure :
//
//session directory
//
//server.js
//var express = require('express');
//var session = require('express-session');
//var bodyParser = require('body-parser');
//var app = express();
//
//app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
//
//app.use(session({secret: 'ssshhhhh'}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//
//var sess;
//
//app.get('/',function(req,res){
//sess = req.session;
////Session set when user Request our app via URL
//if(sess.email) {
///*
//* This line check Session existence.
//* If it existed will do some action.
//*/
//    res.redirect('/admin');
//}
//else {
//    res.render('index.html');
//}
//});
//
//app.post('/login',function(req,res){
//  sess = req.session;
////In this we are assigning email to sess.email variable.
////email comes from HTML page.
//  sess.email=req.body.email;
//  res.end('done');
//});
//
//app.get('/admin',function(req,res){
//  sess = req.session;
//if(sess.email) {
//res.write('
//<h1>Hello '+sess.email+'</h1>
//');
//res.end('<a href="+">Logout</a>');
//} else {
//    res.write('
//     <h1>Please login first.</h1>
//    ');
//    res.end('<a href="+">Login</a>');
//}
//});
//
//app.get('/logout',function(req,res){
//req.session.destroy(function(err) {
//  if(err) {
//    console.log(err);
//  } else {
//    res.redirect('/');
//  }
//});
//
//});
//app.listen(3000,function(){
//console.log("App Started on PORT 3000");
//});
//In code there are three routers. First which render the home page, second router is use for admin area where user can only go if he/she is log-in and third is to perform session destruction and logging out the user.
//
//Each router checks whether the sess.email variable is set or not and that could be set only by logging in through front-end. Here is my HTML code which resides in views directory.
//
//views/index.html
//<html>
//<head>
//<title>Session Management in NodeJS using Express4.2</title>
//<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> 
//<script>
//$(document).ready(function(){
//    var email,pass;
//    $("#submit").click(function(){
//        email=$("#email").val();
//        pass=$("#password").val();
//        /*
//        * Perform some validation here.
//        */
//        $.post("http://localhost:3000/login",{email:email,pass:pass},function(data){        
//            if(data==='done')           
//            {
//                window.location.href="/admin";
//            }
//        });
//    });
//});
//</script>
//</head>
//<body>
//<input type="text" size="40" placeholder="Type your email" id="email"><br />
//<input type="password" size="40" placeholder="Type your password" id="password"><br />
//<input type="button" value="Submit" id="submit">
//</body>
//</html>
//In jQuery code, we are calling our Router ‘/login’ and redirecting it to the ‘admin‘ if log-in is successful, you can add validation to fields as per your requirement, for demo purpose i have not added any.
//
//How to run example code:
//
//Download code and extract the zip file. Open your command prompt or Terminal and switch to directory. Install dependency first by using.
//
//npm install
//Then run code using
//
//node server.js
//Visit localhost:3000 to view the app.
//
//Conclusion:
//
//Like i mentioned session is very important for any web application. Node.js allows us to create HTTP server and HTTP is stateless protocol. It stores no information about previous visit and Express solves this problem very beautifully.

   


var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;
var Check_sess  =   require('./middleware.js').check_sess;
app.get('/', Check_sess);
//app.get('/',function(req,res){
//sess = req.session;
////Session set when user Request our app via URL
//if(sess.email) {
///*
//* This line check Session existence.
//* If it existed will do some action.
//*/
//    res.redirect('/admin');
//}
//else {
//    res.render('index.html');
//}
//});

app.post('/login',function(req,res){
  sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.email=req.body.email;
  res.end('done');
});

app.get('/admin',function(req,res){
  sess = req.session;
if(sess.email) {
res.write('<h1>Hello '+sess.email+'</h1>');
res.end('<a href="/logout">Logout</a>');
} else {
    res.write('<h1>Please login first.</h1> ');
    res.end('<a href="/">Login</a>');
}
});

app.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});

});
app.listen(3000,function(){
console.log("App Started on PORT 3000");
});