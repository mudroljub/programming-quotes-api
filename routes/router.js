const router = require("express").Router();
const { model } = require("mongoose");
const QuotesSchema = require("../models/QuoteSchema");
const quotesRouter = require("./quotes/");
const authRouter = require("./auth");

for (const collection of ["quotes", "svetemisli"]) {
  router.use(
    `/${collection}`,
    (req, res, next) => {
      res.locals.Quote = model("Quote", QuotesSchema, collection); // dynamically asign collection
      next();
    },
    quotesRouter
  );
}

router.use("/auth", authRouter);

module.exports = router;
