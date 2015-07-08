var express = require ('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/snowl');
var User = require('./models/userModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

userRouter = require('./routes/userRoutes')(User);



app.use('/api/users', userRouter);

app.get('/', function(req, res){
    res.send('Snowl REST Services 0.0.1')
})

app.listen(port, function(){
    console.log('Server Started on Port: ' + port)
})