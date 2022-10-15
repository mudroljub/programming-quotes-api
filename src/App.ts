import express, { application, urlencoded } from "express";
import mongoose from "mongoose";

import { Config } from "./config/Config";
import quotesRoute from "./route/Quote.route";

start();

async function start() {
	/** Connect to MongoDB */
	try {
		await mongoose.connect(Config.mongo.url, {
			retryWrites: true,
			w: "majority",
		});
		console.log("Connected to MongoDB.");
		StartServer();
	} catch (err) {
		console.error("Failed to connect to MongoDB.");
		console.error(err);
	}
}

function StartServer() {
	const app = express();

	app.use(urlencoded({ extended: true }));
	app.use(express.json());

	/** Server Calls */
	app.use((req, res, next) => {
		/** Log request */
		console.info(
			`Incoming -> ${req.method}${req.url} from ${req.socket.remoteAddress}`
		);

		res.on("finish", () => {
			console.info(
				`Outgoing -> ${req.method}${req.url} from ${req.socket.remoteAddress} -> ${res.statusCode}`
			);
		});

		next();
	});

	/** Routes */
	app.use("/quotes", quotesRoute);

	/** Health-check */
	app.get("/ping", (req, res, next) =>
		res.status(200).json({ message: "Pong!" })
	);

	/** Error handling */
	app.use((req, res, next) => {
		return res.status(404).json({ message: "Not Found" });
	});

	// TODO: Use HTTP to host server
	app.listen(Config.server.port, () =>
		console.log(`Server online on port ${Config.server.port}.`)
	);
}
