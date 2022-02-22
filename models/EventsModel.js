import mongoose from 'mongoose'
const Schema = mongoose.Schema

const events = new Schema({
	eventName: {
		type: String
	},

	dateSelected: {
		type: String
	},

	userId: {
		type: String
	}
})

export default mongoose.model('events', events);