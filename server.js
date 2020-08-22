const express = require('express');
const password_hash = require('password-hash');
const app = express();

var db = [];

app.use(express.urlencoded({extended:false}))

const port = 5000;

app.get('/login', function(req,res){
    res.sendFile('pages/home.html', {root: __dirname});
});

app.get('/signUp', function(req,res){
    res.sendFile('pages/signUp.html', {root: __dirname});
});

app.get('/delete', function(req,res){
    res.sendFile('pages/delete.html', {root: __dirname});
});

app.get('/', function(req,res){
    res.sendFile('pages/home.html', {root: __dirname});
});

app.post('/add', (req,res) => {
    let i = 0;

    let email = req.body.email;

    let password = req.body.password;

    let user = {
        'email' : email,
        'passwors' : password
    };

    console.log(user);

    let flag  = false;

    for(i = 0 ; i < email.length ; i++){
        if(email.charAt(i) == '@'){
            flag = true;
        }
    }

    if(flag == true){
        var hashedPassword = password_hash.generate(password.toString());
        db.push({
            'email' : email,
            'password' : hashedPassword,
        });
    }

    else{
        console.log('Error!');
    }

    console.log(db);

    res.send(`Added user : ${email}`);

});


app.post('/verify', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let i = 0;
    let flag = false;
    for(i = 0 ; i < db.length ; i++){
        console.log(db[i]['email'] + db[i]['password']);
        if((email == db[i]['email']) && (password_hash.verify(password , db[i]['password']))){
            flag = true;
        }
    }
    if(flag == true){
        res.send('User Verified');
    }
    else{
        res.send('User not found');
    }
});

app.listen(port,function (err){
    console.log(`Started on ${port}`);
});