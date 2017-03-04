var User = require("../models/user"); //. one folder up, .. two folder up
var Blog  = require("../models/blog");

var jwt = require('jsonwebtoken');
var secret = "tsubasa";

module.exports= function(router){
router.post('/usersss', function(req, res){ //by making route in from server.js to here means, we can no longer use app.get, put, post, but router.get
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.password = req.body.password; 
	
	if(req.body.name == null || req.body.name == "" || req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == ""){
		//res.send("it's empty");
		res.json({success: false, message: 'ensure every thing is filled'});
	} else {
		user.save(function(err){
			if(err){
				//res.send("already exist");
				res.json({success: false, message: 'already exist'});
		}
			else{
				//res.send("user created");
				res.json({success: true, message: 'user created'});
		}
	});
	}
});



router.post('/authenticates', function(req, res){
	User.findOne({name: req.body.name}).select('email name password').exec(function(err, user){
		if(err) throw err;

		if(!user){
			res.json({success: false, message:'could not auth'});
		} else if(user){
			if(req.body.password) {
			var validPassword = user.comparePassword(req.body.password);
		} else{
			res.json({success: false, message: "no password"});
		}
		if(!validPassword){
				res.json({success: false, message: 'could not pass'});
		} else {
				var token = jwt.sign({
				  name: user.name, email: user.email, id: user._id
				}, secret, { expiresIn: '24h'});
				res.json({ success: true, message: "work", token: token});
		}

		}
	});
}); 

router.use(function(req, res, next) {


        var token = req.body.token || req.body.query || req.headers['x-access-token']; // Check for token in body, URL, or headers

        // Check if token is valid and not expired  
        if(token){
        if (token) {
            // Function to verify token
            jwt.verify(token, "tsubasa", function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' }); // Token has expired or is invalid
                } else {
                    req.decoded = decoded; // Assign to req. variable to be able to use it in next() route ('/me' route)
                    next(); // Required to leave middleware
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' }); // Return error if no token was provided in the request
        }}
        else {
        	next();
        }
    });

    // Route to get the currently logged in user    
router.post('/mes', function(req, res) {
        res.send(req.decoded); // Return the token acquired from middleware
    });

router.get('/permissions', function(req, res){
	User.findOne({ name: req.decoded.name}, function(err, user){
		if(err) throw err;
		if(!user){
			res.json({ success: false, message: 'no user find'});

		}else {
		 	res.json({success: true, permission: user.permission, message:"holla"})
		 }
	})
});
 router.get('/management', function(req, res) {
        User.find({}, function(err, users) {
            if (err) throw err;
                // Function to send e-mail to myself
             
                User.findOne({ name: req.decoded.name }, function(err, mainUser) {
                    if (err) throw err;
                       
                        
                        if (!mainUser) {
                            res.json({ success: false, message: 'No user found' }); // Return error
                        } else {
                            // Check if user has editing/deleting privileges 
                            if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                                // Check if users were retrieved from database
                                if (!users) {
                                    res.json({ success: false, message: 'Users not found' }); // Return error
                                } else {
                                    res.json({ success: true, users: users, permission: mainUser.permission }); // Return users, along with current user's permission
                                }
                            } else {
                                res.json({ success: false, message: 'Insufficient Permissions' }); // Return access error
                            }
                        }
                    }
                );
            }
        );
    });


router.delete('/management/:name', function(req, res){
	var deleteUser = req.params.name;
	User.findOne({name:req.decoded.name}, function(err, mainUser){
		if(err) throw err;
		if(!mainUser){
			res.json({ success:false, message: 'no such user'})
		} else {
			if(mainUser.permission !== 'admin'){
				res.json( {success: false, message: 'not sufficient privilages'});
			} else {
				User.findOneAndRemove({ name: deleteUser}, function(err, user){
					if(err) throw err;
					res.json({ success: true});
				});
			}
		}
	})
});

router.get('/blogss', function(req, res){
	console.log(res.data);
		Blog.find({}, function(err, blogs) {
	return res.json(blogs);
});
	});


router.post('/blogss', function(req, res){ //by making route in from server.js to here means, we can no longer use app.get, put, post, but router.get
        var token = req.body.token || req.headers['x-access-token']; // Check for token in body, URL, or headers
		var user = jwt.decode(token, secret);

		var blog = new Blog();
		blog.title = req.body.title;
		blog.paragraph = req.body.paragraph;
		blog.usr = user._id;
		blog.author = req.decoded.name
		blog.save(function (err) {
			if(err) throw err;

			res.json({success: true, message:'awesomme'});
		});
  
  // saved!

});



router.delete('/blogss/:_id', function(req, res){
	var deleteBlog = req.params._id;
	Blog.findByIdAndRemove(deleteBlog, function(err, blog){
		if(err) throw err;

		res.json({success:true});

	});

});

return router;
};