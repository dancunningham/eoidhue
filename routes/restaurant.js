var db = require('../models/restaurant.js'),
	mongoose = require('mongoose'),
	restaurants = mongoose.model('Restaurant'),
	feedBacks = mongoose.model('FeedBack'),
	nodemailer = require("nodemailer");

var Restaurant = {};
module.exports = Restaurant;

var transport = nodemailer.createTransport("SMTP", {
    host: "srv12.thewebhostserver.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "hue@eoid.net",
        pass: "hnp45K2pHY7K"
    }
});

var mailOptionsDislike = {
    from: "hue@eoid.net",
    to: "trigger@ifttt.com",
    subject: "#eoidhue",
    text: "#ff0000"
}

var mailOptionsLike = {
    from: "hue@eoid.net",
    to: "trigger@ifttt.com",
    subject: "#eoidhue",
    text: "#00ff00"
}


Restaurant.index = function(req,res,next){
		
				restaurants.find({},function(err,venues){					
					res.render('list',{title:'Clients test page',restaurants:venues});
				});
	
}

Restaurant.create = function(req,res,next){
	var restaurant = new restaurants({name : req.body.name, location : req.body.location, icon : req.body.icon, url : req.body.url});	
	
	restaurant.save(function(err){
		if(err) throw err;		
		res.send(restaurant._id + "\n");
		//res.redirect('/restaurants/');
	});
	
}

Restaurant.new = function(req,res,next){}

Restaurant.edit = function(req,res,next){}

Restaurant.update = function(req,res,next){
	restaurants.findOne({_id: req.params.id},function(err, restaurant){
		if(restaurant){
			restaurant.name = req.body.name;
			restaurant.location = req.body.location;
			restaurant.icon = req.body.icon;
			restaurant.url = req.body.url;
			restaurant.save(function(err){
				if(err) throw err;		
				res.redirect('/restaurants/'+req.params.id+'/edit');
			});
	}
	});
	
}



Restaurant.delete = function(req,res,next){
	
	
}

Restaurant.addFeedBack = function(req,res,next){
	console.log(req.params);
	restaurants.findOne({_id: req.params.id},function(err, restaurant){
		if(restaurant){
			if (req.params.like == "true") {
				restaurant.feedBacks.push({like:1});
				transport.sendMail(mailOptionsLike, function(err, message){
					if(err) throw err;
				});
			} else {
				restaurant.feedBacks.push({like:-1});
				transport.sendMail(mailOptionsDislike, function(err, message){
					if(err) throw err;
				});
			}
		    restaurant.save(function(err){
				if(err) throw err;
				var mailOptions = {
				    from: "hue@eoid.net",
				    to: "trigger@ifttt.com",
				    subject: "#eoidhue",
				    text: restaurant.hex
				}

				//setTimeout(function(){
					transport.sendMail(mailOptions, function(err, message){
						if(err) throw err;
					});
				//}, 5000);

				res.render('thanks', {restaurant:restaurant, rating:(req.params.like == "true")})
			
			});
			
		}
	});
	
}

