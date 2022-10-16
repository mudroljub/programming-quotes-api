import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import Quote from "../domain/models/Quote";
import QuoteRepository from "../domain/repositories/Quote.repository";

const repository = new QuoteRepository()

const createQuote = async (req: Request, res: Response, next: NextFunction) => {
    const {author, body} = req.body;
    const quote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        author,
        body,
    });

    try {
        await repository.saveQuote(quote);
        res.status(201).json(quote);
    } catch (err) {
        return res.status(500).json({err: (err as Error).message});
    }
};

const readQuote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await repository.findQuoteById(req.params.quoteId)
        if (result) return res.json({result});
        return res.status(404).json({message: "Not found"});
    } catch (err) {
        return res.status(500).json({err: (err as Error).message});
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quotes = await repository.getAllQuotes();
        return res.json({quotes});
    } catch (err) {
        return res.status(500).json({err: (err as Error).message});
    }
};

const updateQuote = async (req: Request, res: Response, next: NextFunction) => {
    const {author, body} = req.body
    try {
        const _res = await repository.updateQuote(req.params.quoteId, new Quote({
            _id: new mongoose.Types.ObjectId(),
            author,
            body,
        }))
        if (_res) return res.status(204).json({_res});
        return res.status(404).json({message: "Quote not found."})
    } catch (err) {
        return res.status(500).json({err: (err as Error).message});
    }
};

const deleteQuote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _res = await repository.deleteQuote(req.params.quoteId);
        if (_res) return res.json({message: "Deleted"});
        else return res.status(404).json({message: "Not found"});
    } catch (err) {
        return res.status(500).json({err: (err as Error).message});
    }
};

// const backupLocal = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const quotes = (req.body as any)["quotes"] as Array<IQuoteModel>;
//         for (const quote of quotes) {
//             await new Quote({
//                 _id: quote._id,
//                 author: quote.author,
//                 body: quote.body,
//             }).save();
//         }
// 		return res.status(204).json({quotes: jsonQuotes});
//     } catch (err) {
//         return res.status(500).json({err: (err as Error).message});
//     }
// };

export default {
    createQuote,
    readQuote,
    readAll,
    updateQuote,
    deleteQuote,
//     backupLocal,
};
