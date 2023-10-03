//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const db = require('./databaseMySql/registrationform');
const {encrypt,decrypt} = require('./encryption');
const md5 = require('md5');
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get(['/home', '/'], (req, res) =>{
   res.render('home');
});
app.get('/login',async (req, res) =>{
        res.render('login');
});
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const query = 'SELECT * FROM user_registertion WHERE email = ?';
    
    try {
        const [data] = await db.query(query, [username]);
        
        if (data) {
            const user = data[0];
          
            const hasdcode = md5(req.body.password);
            if (user.password === hasdcode) {
                res.render('secrets');
            } else {
                throw new Error('Invalid password');
            }
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(401).send('Authentication failed');
    }
});
app.get('/register', (req, res) =>{
    res.render('register');
});

app.post('/register',async (req, res,) =>{
    const hashpassword = md5(req.body.password);
    const login = [
         req.body.username,
         hashpassword
    ]
    try {
        const query = `insert into user_registertion 
                    values(?)`;
        await db.query(query,[login]);
        
    } catch (error) {
        console.log(error);
        throw  error;
    }
        
    console.log( await db.query(`select * from user_registertion`));
    res.render('secrets');
   
});

app.listen(port,() => {
    console.log("listening on port");
});
