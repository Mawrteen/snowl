var express = require ('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/snowl');
var User = require('./models/userModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

var userRouter = express.Router();

userRouter.route('/users')
    .post(function(res,req){
        var user = new User(req.body);

        console.log(user);
        res.send(user);

    })
    .get(function(req, res){
        User.find(function(err, users){
            if(err)
                res.status(500).send(err)
            else
                res.json(users)
        })
    })

app.use('/api', userRouter);

app.get('/', function(req, res){
    res.send('Welcome To Snowl started with Gulp!')
})

app.listen(port, function(){
    console.log('Server Started on Port: ' + port)
})