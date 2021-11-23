const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const bodyParser = require('body-parser')

const app = express();
const PORT = 4000;

const myusername = 'user';
const mypassword = 'password';

const oneDay = 1000 * 60 * 60 * 24;
const oneMin = 1000 * 60;

var session = null;


// parsing the incoming data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serving public file
app.use(express.static(__dirname));


//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneMin },
    resave: false
}));

app.use(cookieParser());


app.post('/user',(req,res) => {
   
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        session.visit = 0;
        console.log(req.session)
        res.redirect('/admin');
    }
    else{
        res.sendFile('error.html',{root:__dirname})
    }
})

app.get('/',(req,res) => {
    session=req.session;
    console.log("--------------------")
        console.log(session.visit)
        console.log("---------------------")
    if(session.userid){
        res.sendFile('user.html',{root:__dirname})
    }else
    res.sendFile('index.html',{root:__dirname})
});

app.get('/user',(req,res) => {
    console.log(req.session);
    if(req.session.userid != undefined){
        session.visit++
        console.log("--------------------")
        console.log(session.visit)
        console.log("---------------------")
        res.sendFile('user.html',{root:__dirname})
    }else{
        res.redirect('/');
    }   
})

app.get('/logout',(req,res) => {
    console.log("--------------------")
    console.log(req.session)  
    req.session.destroy(); 
    console.log(req.sessiuon)
    session = null;
    res.redirect('/');  
});

app.get('/admin', (req,res) =>{   
   if(req.session.userid != undefined){
       console.log(req.headers)
       res.header('module','SecureApplicationProgramming');
       res.sendFile('admin.html',{root:__dirname})
   }else{
       res.redirect('/');
   }
})

// JSON WEB TOKEN
//const dotenv = require('dotenv');
// get config vars
//dotenv.config();

const jwt = require('jsonwebtoken');

// generate a secret token
TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');
console.log(TOKEN_SECRET);

function generateAccessToken(user) {
    console.log("generate token")
    return jwt.sign(user, TOKEN_SECRET, { expiresIn: '1800s' });
}



//middleware to check token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(403)

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403)
    req.user = user
    console.log(user)
    console.log("-l-l-l")
    next()
  })
}

// http://localhost:4000/api/createNewUser

// http:/localhost:4000/api/userOrders

app.post('/api/createNewUser', (req, res) => {
    const token = generateAccessToken({ username: myusername, password: mypassword });    
    res.json(token);  
});

app.get('/api/userOrders', authenticateToken, (req, res) => {
    console.log("json web token ok")
    
    console.log(req.user)
    res.json({msg:"all good", user:req.user, name:req.user.username})
})

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
