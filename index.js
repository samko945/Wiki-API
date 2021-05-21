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



app.listen(3000, function () {
	console.log(`Server started on port 3000.`);
});
