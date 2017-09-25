/*
ExpressJS allows you to develop custom web server according to your need. You don’t need to install multiple packages to handle HTML files. If you have Node.js installed, you are good to go.
In this short tutorial i am going to explain how to render HTML files in ExpressJS.


About sendFile() function.
ExpressJS provides sendFile() function which will basically send HTML files to browser which then automatically interpreted by browser. All we need to do is in every route deliver appropriate HTML file.
For.eg :
When user hit main URL deliver index.html :
//assuming app is express Object.
app.get('/',function(req,res){
       
     res.sendFile('index.html');

});
This code is for example purpose. It will cause directory resolution error. 

Our project : 
I am going to develop simple website consist of 3 pages i.e Home page, about page, site link page. I will use Bootstrap for designing and jQuery for event handling.
Directory structure : 
----- node_modules
     |--+express
---+ index.html
---+ about.html
---+ index.html
--- Server.js
----package.json
package.json
{
  "name": "express-html",
  "version": "0.0.1",
  "dependencies": {
    "express": "^4.11.0"
  }
}
Install dependencies using
npm install
and run project using
node Server.js
Here is our express Server. 
Server.js
*/
var express = require("express");
var app     = express();
var path    = require("path");


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

app.listen(3000);

console.log("Running at Port 3000");
/*
Here is our HTML files. I am going to show index.html only.
index.html
<html>
<head>
  <title>Express HTML</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
</head>
<body>
  <div style="margin:100px;">
    <nav class="navbar navbar-inverse navbar-static-top">
  <div class="container">
    <a class="navbar-brand" href="/">Express HTML</a>
    <ul class="nav navbar-nav">
      <li class="active">
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/sitemap">Sitemap</a>
      </li>
    </ul>
  </div>
</nav>
    <div class="jumbotron"  style="padding:40px;">
      <h1>Hello, world!</h1>
      <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
    </div>
  </div>
</body>
</html>
Here is the output.


Final words:
Right now we are resolving path in each router. You can optimize this little bit. Express have configuration variable which let’s you define static file path so that you don’t need to resolve path in every routes. Here is how to do so.
*/
//var express = require("express");
//var app     = express();
//app.use(express.static(__dirname + '/View'));
////Store all HTML files in view folder.
//app.use(express.static(__dirname + '/Script'));
////Store all JS and CSS in Scripts folder.
//
//app.get('/',function(req,res){
//  res.sendFile('index.html');
//  //It will find and locate index.html from View or Scripts
//});
//
//app.get('/about',function(req,res){
//  res.sendFile('/about.html');
//});
//
//app.get('/sitemap',function(req,res){
//  res.sendFile('/sitemap.html');
//});
//
//app.listen(3000);
//
//console.log("Running at Port 3000");
//This code will work in similar way as above one. 
//
//Conclusion: 
//There are scenarios where you need to develop web server which delivers HTML files like how your apache do. However this is not the optimal use of Node.js but you can use such feature to achieve custom web server for your own application.