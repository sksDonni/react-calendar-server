import express from 'express'
import mongoose from 'mongoose'


const userSchema = mongoose.Schema(
	{
		name:
		{
			type : String,
			required : true
		},
		email:
		{
			type: String,
			required : true,
			unique : true
		},
		password:
		{
			type: String,
			required: true
		},
		dateOfSignUp:
		{
			type: Date,
			default: Date.now()
		},
		posts: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "events"
		}]
	})

const user = mongoose.model("users", userSchema )

export default user