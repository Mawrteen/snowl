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

                res.json(users)
            })
        })

    userRouter.route('/u/:username')
        .get(function(req, res){

            User.findOne({ username: req.params.username }, function(err, username){
                if(err)
                    res.status(500).send(err);

                res.json(username);

            });
        });


    userRouter.use('/:userId', function(req, res, next){
            User.findById(req.params.userId, function(err, user){
                if(err)
                    res.status(500).send(err);
                else if(user) {
                    req.user = user;
                    next();
                }else
                    res.status(404).send('User Doesn\'t Exist');
            })
    })
    userRouter.route('/:userId')
        .get(function(req, res){
            res.json(req.user);
        })
        .put(function(req, res){

            req.user.username = req.body.username;
            req.user.firstname = req.body.firstname;
            req.user.lastname = req.body.lastname;
            req.user.email = req.body.email;
            req.user.role = req.body.role;
            req.user.active = req.body.active;
            req.user.subscription = req.body.subscription;
            req.user.portrait = req.body.portrait;
            req.user.save(function(err){
                if (err)
                    res.status(500).send(err);

                res.json(req.user);
            });

        })
        .patch(function(req, res){
            if(req.body._id)
                delete req.body._id;
            for(u in req.body){
                req.user[u] = req.body[u];
            }
            req.user.save(function(err){
                if (err)
                    res.status(500).send(err);

                res.json(req.user);
            });
        })
        .delete(function(req, res){
            req.user.remove(function(err){
                if(err)
                    res.status(500).send(err);
                res.status(204).send('User Successfully Removed!');
            });
        })
    return userRouter;
};

module.exports = routes;