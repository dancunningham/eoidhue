var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var FeedBackSchema = new Schema({
			like: Boolean,
			created : { type: Date, default: Date.now() }
		});




module.exports = mongoose.model("FeedBack",FeedBackSchema);