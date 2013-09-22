var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var FeedBackSchema = new Schema({
		like: { type: Boolean, required: true},
		created : { type: Date, default: Date.now() }
	});

var RestauarantSchema = new Schema({
	id: ObjectId,
		name: { type: String, required: true,  trim: true },
		location: { type: String, required: true,  trim: true },
		icon: { type: String, trim: true },
		url: { type: String,   trim: true },
		feedBacks: [FeedBackSchema]
		
	});

	

module.exports = mongoose.model('Restaurant', RestauarantSchema);
module.exports = mongoose.model('FeedBack', FeedBackSchema);