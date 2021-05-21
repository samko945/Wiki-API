const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-samuel:Test123@cluster0.lpl8d.mongodb.net/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function (req, res) {
	Article.find({}, function (err, docs) {
		console.log(docs);
	}).catch((err) => console.error(err));
});

app.post("/articles", function (req, res) {
	const newArticle = new Article({
		title: req.body.title,
		content: req.body.content,
	});
	newArticle.save(function (err) {
		if (!err) {
			res.send("Successfully added a new article.");
		} else {
			res.send(err);
		}
	});
});

app.listen(3000, function () {
	console.log(`Server started on port 3000.`);
});
