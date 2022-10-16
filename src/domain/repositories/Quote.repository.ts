import Quote, {IQuoteModel} from "../models/Quote";
import mongoose from "mongoose";

export default class QuoteRepository {
    async saveQuote(quote: IQuoteModel) {
        return await quote.save()
    }

    async updateQuote(quoteId: string, quote: IQuoteModel) {
        return Quote.findByIdAndUpdate(quoteId, quote);
    }

    async deleteQuote(quoteId: string) {
        return Quote.findByIdAndDelete(quoteId);
    }

    async findQuoteById(quoteId: string) {
        return Quote.findById(quoteId);
    }

    async findQuote(searchQuery: mongoose.FilterQuery<IQuoteModel>) {
        return Quote.findOne(searchQuery)
    }

    async getAllQuotes() {
        return Quote.find()
    }
}