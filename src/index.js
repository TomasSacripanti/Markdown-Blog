const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const articlesRouter = require("./routes/articles");
const Article = require('./models/article');
const methodOverride = require('method-override');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("port", 3000);
const port = app.get("port");


app.use(indexRouter)
app.use("/articles", articlesRouter);


app.listen(port, (req, res) => {
  console.log(`Server on port ${port}`);
});
