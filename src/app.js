const path = require("path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const { accounts, users, writeJSON } = require('./data.js');

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

app.get('/transfer', (_req, res) => res.render('transfer'));

app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
    writeJSON();
    res.render('transfer', { message: "Transfer Completed" });
});

app.get('/payment', (_req, res) => res.render('payment', { account: accounts.credit }));

app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);
    writeJSON();
    res.render('payment', { message: "Payment Succesfull", account: accounts.credit });
});

app.get('/profile', (_req, res) => {
    res.render("profile", { user: users[0] })
});


app.listen(3000, () => console.log("Banking Project Server running..."));