import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validateRegistrationInput from '../validators/registerValidator.js'
import loginValidator from '../validators/loginValidator.js'
import User from '../models/UserModel.js'

const keys = 'secret'


export const registerUser = (req, res) => {
	console.log(req.body);
	const { errors, isValid } = validateRegistrationInput(req.body)
	if(!isValid)
	{
		return res.status(400).json(errors)
	}

	User.findOne({email : req.body.email}).then(user => {
		if(user)
		{
			return res.status(400).json({email : "Email already exists"})
		}
		else
		{
			const newUser = new User({
				name : req.body.name,
				email : req.body.email,
				password : req.body.password
			})

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err)
					{
						throw err
					}
					newUser.password = hash
					console.log(newUser);
					newUser.save().then(user => res.json(user))
							.catch(err => console.log(err))
				})
			})
		}
	}) 
}

export const loginUser = async (req, res) => {
	const secret = keys
	const { errors, isValid } = loginValidator(req.body)
	if(!isValid)
	{
		return res.status(400).json(errors)
	}
	
	try
	{
		const user = await User.findOne({email : req.body.email})
		console.log(user);
		if(!user){
			return res.status(404).json({message: 'Invalid credentials'})
		}

		const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
		console.log(isPasswordCorrect);
		if(!isPasswordCorrect)
		{
			return res.status(404).json({message: 'the password is incorrect'})
		}

		try
		{
			const token = jwt.sign({email: user.email, id: user._id}, secret, {expiresIn: 3600})
			console.log(token);	
			return res.status(200).json({result: user, token})
		}catch(err)
		{
			console.log(err);
			return res.status(404).json({message: 'could not sign token'});
		}
		
	}
	catch(err)
	{
		console.log(err);
		res.status(404).json({message: 'Something went wrong'})
	}
}
