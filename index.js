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

app.route("/articles")
	.get(function (req, res) {
		Article.find({}, function (err, docs) {
			res.send(docs);
		}).catch((err) => console.error(err));
	})
	.post(function (req, res) {
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
	})
	.delete(function (req, res) {
		Article.deleteMany({}, function (err) {
			if (!err) {
				res.send("Successfully deleted all articles.");
			} else {
				res.send(err);
			}
		});
	});

app.route("/articles/:articleTitle")
	.get(function (req, res) {
		Article.findOne({ title: req.params.articleTitle }, function (err, doc) {
			if (!err) {
				res.send(doc);
			} else {
				res.send(err);
			}
		});
	})
	.put(function (req, res) {
		Article.replaceOne({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content }, function (err) {
			if (!err) {
				res.send("Successfully updated document.");
			} else {
				res.send(err);
			}
		});
	})
	.patch(function (req, res) {
		Article.updateOne({ title: req.params.articleTitle }, { content: req.body.content }, function (err) {
			if (!err) {
				res.send("Successfully updated values in the document.");
			} else {
				res.send(err);
			}
		});
	})
	.delete(function (req, res) {
		Article.deleteOne({ title: req.params.articleTitle }, function (err) {
			if (!err) {
				res.send("Successfully deleted the document.");
			} else {
				res.send(err);
			}
		});
	});

app.listen(3000, function () {
	console.log(`Server started on port 3000.`);
});
