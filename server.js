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

app.get('/update', function(req,res){
    res.sendFile('pages/update.html', {root: __dirname});
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
        //console.log('Verifying data');
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
        res.send(`Added user : ${email}`);
    }

    else{
        console.log('Error!');
        res.send('Error!');
    }

    console.log(db);

    

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
            break;
        }
    }
    if(flag == true){
        res.send('User Verified');
    }
    else{
        res.send('User not found');
    }
});

app.post('/delete', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    let i = 0;
    let n = 0;
    let flag = false;
    for(i = 0 ; i < db.length ; i++){
        console.log(db[i]['email'] + db[i]['password']);
        if((email == db[i]['email']) && (password_hash.verify(password , db[i]['password']))){
            flag = true;
            n = i;
            break;
        }
    }

    if(flag == true){
        db.splice(n, 1);
        console.log(db);
        res.send('User Deleted');
    }



});


app.post('/update', (req,res) => {
    let email = req.body.email;
    console.log(email);
    let password = req.body.password;
    console.log(req.body.password);
    let newEmail = req.body.emailNew;
    console.log(req.body.emaiNew);
    let newPassword = req.body.passwordNew;
    console.log(req.body.passwordNew);
    let i = 0;
    let n = 0;
    let flag = false;
    for(i = 0 ; i < db.length ; i++){
        console.log(db[i]['email'] + db[i]['password']);
        if((email == db[i]['email']) && (password_hash.verify(password , db[i]['password']))){
            console.log('Found');
            flag = true;
            n = i;
            break;
        }
    }
    
    if(flag==true){
        let newHashPassword = password_hash.generate(newPassword);
        db.splice(n , 1 , {
            'email' : newEmail,
            'password' : newHashPassword,            
        });
        console.log(db);
        res.send('Updated User');
    }
    else{
        res.send('User not found');
    }
});

app.listen(port,function (err){
    console.log(`Started on ${port}`);
});