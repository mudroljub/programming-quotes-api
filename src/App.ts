import express from "express";
import dotEnv from "dotenv";
dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

// Parse body as a Json object
app.use((req, res, next) => {
	express.json()(req, res, (err) => {
		if (err) return res.sendStatus(400);
		next();
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.use((_, res) => {
	res.sendStatus(404);
});

export default app;
