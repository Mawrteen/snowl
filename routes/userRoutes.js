var express = require('express');

var routes = function(User){
    var userRouter = express.Router();

    userRouter.route('/')
        .post(function(req,res){
            var user = new User(req.body);

            user.save();
            res.status(201).send(user);

        })
        .get(function(req, res){
            User.find(function(err, users){
                if(err)
                    res.status(500).send(err)
                else
                    res.json(users)
            })
        })

    userRouter.route('/:username')
        .get(function(req, res){

            User.find({ username: req.params.username }, function(err, username){
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.json(username);
                }
            });
        });
    return userRouter;
};

module.exports = routes;