const express = require("express")
const path = require("path"); // Add this line
const quotesPath = path.join(__dirname, "quotes.json"); // Adjust the path accordingly
const quotes = require(quotesPath);
const app = express()
const PORT = 80

app.listen(
    PORT,
    () => {
        console.log(`🚀 Server Started at port ${PORT}`)
    }
);



app.get("/", (req, res) => {
    // res.json(
    //     {
    //         status: 200,
    //         message: "API is working as expected",
    //         status_code: "ok",
    //     }
    // )

    // res.sendStatus(200)
    res.sendFile(__dirname + "/index.html")
    // res.redirect("https://github.com/mudroljub/programming-quotes-api")
})


app.get("/quotes", (req, res) => {
    res.json(quotes)
})


app.get("/quotes/random", (req, res) => {
    const randomIndex = Math.round(Math.random() * quotes.length) // generate a random index on basis of quotes array length
    const randomQuote = quotes[randomIndex] // get a random quote using a random index
    res.json(randomQuote)
    // res.sendStatus(200)
})

app.get("/quotes/:id", (req, res) => {

    const quoteByID = quotes.filter(item => item.id === req.params.id)[0] || null;
    if(quoteByID) {
        res.json(quoteByID)
    }
    else {
        res.sendStatus(404)
    }
})


app.get("/quotes/author/:authorname", (req, res) => {
    const reqAuthorName = String(req.params.authorname).trim()
    const quotesByAuthor = quotes.filter(item => item.author.toLowerCase() === reqAuthorName.toLowerCase()) || null;
    if(quotesByAuthor.length !== 0) {
        res.json(quotesByAuthor)
    }
    else {
        res.sendStatus(404)
    }

})

