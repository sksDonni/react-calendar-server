import express from 'express'
import mongoose from 'mongoose'
import EventModel from '../models/EventsModel.js'

export const getEventById = (req, res) => {
	const {id} = req.params
	try{
		const event = EventModel.findOneById(id)
		res.status(200).json(event);
	}catch(err)
	{
		console.log(err);
		res.status(404).json({message: err.message});
	}
}

export const addEvent = async (req, res) => {
	const event = req.body;
	console.log(event);
	const newEvent = new EventModel(event);
	try{
		await newEvent.save()
		res.status(201).json(newEvent);
	}catch(err)
	{
		res.status(409).json({message: err.message});
	}
}

export const getEventsByDate = async (req, res) => {
	const {date} = req.params;
	const userId = req.userId
	console.log(req.params);
	console.log(userId);
	const data = await EventModel.find({'dateSelected': date, 'userId':userId})
	.then((data) => {
		console.log(data)
		res.status(201).json({data})
	})
	.catch(err => 
        res.status(406).json({message: err.message})
    )
}

export const deleteEvent = async (req, res) => {
	const {id} = req.params;
	console.log(id);
	const data = await EventModel.findOneAndRemove({'_id': id})
	.then((data) => res.status(201).json({data}))
	.catch((err) => 
		res.status(406).json({message: err.message}));

}