const express = require("express");
const app = express();
const articlesRouter = require("./routes/articles");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("port", 3000);
const port = app.get("port");

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test article",
      createdAt: new Date(),
      description: "Test description",
    },
    {
      title: "Test article 2",
      createdAt: new Date(),
      description: "Test description 2",
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articlesRouter);

app.listen(port, (req, res) => {
  console.log(`Server on port ${port}`);
});
