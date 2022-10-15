import mongoose, { Document, Schema } from "mongoose";

export interface IQuote {
	author: string;
	body: string;
}

export interface IQuoteModel extends IQuote, Document {}

const QuoteSchema: Schema = new Schema(
	{
		author: { type: String, required: true },
		body: { type: String, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default mongoose.model<IQuoteModel>("Quote", QuoteSchema);
