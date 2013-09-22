var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var FeedBackSchema = new Schema({
		like: { type: Number, required: true},
		created : { type: Date, default: Date.now() }
	});

var RestaurantSchema = new Schema({
	id: ObjectId,
		name: { type: String, required: true,  trim: true },
		location: { type: String, required: true,  trim: true },
		icon: { type: String, trim: true },
		url: { type: String,   trim: true },
		feedBacks: [FeedBackSchema]
		
	});

	RestaurantSchema.virtual('likes').get(function() {
		// DC: I know this is silly
		// Wanted to do something neat like:
	    //return this.feedBacks.find({like: 1}).count();
		positive = 0;
		negative = 0;
		total = 0;
		this.feedBacks.forEach(function(feedback){
			if (feedback.like == 1)
				positive++;
			else
				negative++;
			total++;
		});
		return positive;
	});

	RestaurantSchema.virtual('unlikes').get(function() {
		// DC: I know this is silly
		positive = 0;
		negative = 0;
		total = 0;
		this.feedBacks.forEach(function(feedback){
			if (feedback.like == 1)
				positive++;
			else
				negative++;
			total++;
		});
		return negative;
	});

	RestaurantSchema.virtual('total').get(function() {
		// DC: I know this is silly
		positive = 0;
		negative = 0;
		total = 0;
		this.feedBacks.forEach(function(feedback){
			if (feedback.like == 1)
				positive++;
			else
				negative++;
			total++;
		});
		return total;
	});

	RestaurantSchema.virtual('avg').get(function() {
		// DC: I know this is silly
		positive = 0;
		negative = 0;
		total = 0;
		this.feedBacks.forEach(function(feedback){
			if (feedback.like == 1)
				positive++;
			else
				negative++;
			total++;
		});
		if (total == 0) return 0;
		return (positive-negative)/total;
	});

	RestaurantSchema.virtual('rgb').get(function() {
		var r, g, b = 0;
		a = this.avg;
		b = 0;
		if (a == 0) {
			r = 255;
			g = 255;
		} else if (a > 0) {
			r = (1-a) * 255;
			g = 255;
		} else if (a < 0) {
			r = 255;
			g = (1+a) * 255;
		}
		rgb = "(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ")";
		return rgb;
	});

	RestaurantSchema.virtual('hex').get(function() {
		var r, g, b = 0;
		a = this.avg;
		b = 0;
		if (a == 0) {
			r = 255;
			g = 255;
		} else if (a > 0) {
			r = (1-a) * 255;
			g = 255;
		} else if (a < 0) {
			r = 255;
			g = (1+a) * 255;
		}
		hex_r = (r < 16 ? "0" : "") + Math.floor(r).toString(16);
		hex_g = (g < 16 ? "0" : "") + Math.floor(g).toString(16);
		hex_b = (b < 16 ? "0" : "") + Math.floor(b).toString(16);
		hex = "#" + hex_r + hex_g + hex_b;
		return hex;
	});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
module.exports = mongoose.model('FeedBack', FeedBackSchema);