const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const articlesRouter = require("./routes/articles");
const Article = require('./models/article');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("port", 3000);
const port = app.get("port");

app.get("/", async (req, res) => {
  const articles = await Article.find();
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articlesRouter);


app.listen(port, (req, res) => {
  console.log(`Server on port ${port}`);
});
