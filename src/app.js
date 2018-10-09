const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const accountData = fs.readFileSync(path.join(__dirname, "json", "accounts.json"), "utf8");
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, "json", "users.json"), "utf8");
const users = JSON.parse(userData);

app.get("/", (_req, res) => {
    res.render("index", { title: "Account Summary", accounts});
});
app.get('/savings', (_req, res) => {
    res.render("account", { account: accounts.savings })
});
app.get('/credit', (_req, res) => {
    res.render("account", { account: accounts.credit })
});
app.get('/checking', (_req, res) => {
    res.render("account", { account: accounts.checking })
});
app.get('/profile', (_req, res) => {
    res.render("profile", { user: users[0] })
});


app.listen(3000, () => console.log("Banking Project Server running..."));