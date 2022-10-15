import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Quote from "../domain/models/Quote";

const createQuote = async (req: Request, res: Response, next: NextFunction) => {
	const { author, body } = req.body;
	const quote = new Quote({
		_id: new mongoose.Types.ObjectId(),
		author,
		body,
	});

	try {
		await quote.save();
		res.status(201).json(quote);
	} catch (err) {
		res.status(500).json(err);
	}
};

const readQuote = async (req: Request, res: Response, next: NextFunction) => {
	const quoteId = req.params.quoteId;

	try {
		const result = await Quote.findById(quoteId);
		if (result) return res.json({ result });
		else return res.status(404).json({ message: "Not found" });
	} catch (err) {
		res.status(500).json(err);
	}
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const quotes = await Quote.find();
		return res.json({ quotes });
	} catch (err) {
		return res.status(500).json(err);
	}
};

const updateQuote = async (req: Request, res: Response, next: NextFunction) => {
	const quoteId = req.params.quoteId;

	try {
		const quote = await Quote.findById(quoteId);
		if (!quote) {
			/** Quote does not exist */
			return res.status(404).json({ message: "Not found" });
		}
		/** Quote exists */
		quote.set(req.body);
		await quote.save();
		return res.status(204).json({ quote });
	} catch (err) {
		res.status(500).json(err);
	}
};

const deleteQuote = async (req: Request, res: Response, next: NextFunction) => {
	const quoteId = req.params.quoteId;

	try {
		const _res = await Quote.findByIdAndDelete(quoteId);
		if (_res) return res.json({ message: "Deleted" });
		else return res.status(404).json({ message: "Not found" });
	} catch (err) {
		return res.status(500).json(err);
	}
};

export default {
	createQuote,
	readQuote,
	readAll,
	updateQuote,
	deleteQuote,
};
