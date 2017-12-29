const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
var app=express();
//This is used for the logging the commands to the log file.
app.use((req,res,next)=>{
    var date = new Date().toString();
    var log = `${date}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('log.txt',log);
    next(); 
});
//This is used for maintainance.
/*app.use((req,res,next)=>{
    res.render('maintainance.hbs',{
        pageTitle:"Ouch! Men at work!"
    });
    next();
});*/
//This is used to link the help page as static webpage.s
app.use(express.static(__dirname + '/public'));
//This is used to add the home page.
app.get('/',(req,res)=>{
    res.render('help.hbs',{
        pageTitle:'Home Page',
        pageContent:'Welcome to my website.',
        year:new Date().getFullYear()
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        year:new Date().getFullYear()
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : "Meow! Couldnt handle request!"
    });
});
app.get('/projects',(req,res)=>{
   res.render('project.hbs',{
    pageTitle:'Projects'
   });
});
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});