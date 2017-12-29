const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
hbs.registerPartials(__dirname + '/views/partials');
var app=express();
app.use((req,res,next)=>{
    var date = new Date().toString();
    var log = `${date}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('log.txt',log);
    next(); 
});
app.use((req,res,next)=>{
    res.render('maintainance.hbs',{
        pageTitle:"Ouch! Men at work!"
    });
});
app.use(express.static(__dirname + '/public'));
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
        pageContent:'Welcome to my website.',
        year:new Date().getFullYear()
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : "Meow! Couldnt handle request!"
    });
});
app.listen(3000,()=>{
    console.log('Server started.');
});