var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var sessionss= require('express-session');
var session;


// app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyparser());
app.use(sessionss({
    secret: 'ffdd$$123'
}));

app.get('/',function(req,res){ 
    session=req.session;
    if(session.userid){
        res.send("Welcome admin <a href=\'/logout'>Click To Logout</a>");
    }
    else
    res.sendFile('login.html',{root:__dirname});
});

app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});
app.post('/login',function(req,res){
    
    if(req.body.username=='admin' && req.body.password=='admin'){
        session=req.session;
        session.userid=req.body.username;
        res.send("Welcome admin <a href=\'/logout'>Click To Logout</a>");  //res.end("Welcome Admin <a href=\'/logout'>Click To Logout</a>"); //<a href=\'/logout'>click to logout</a>
    }
    else{ 
        res.end('Invalid username or pass');
    }
});

app.listen(8080, function(){
    console.log('wow, It is working');
})