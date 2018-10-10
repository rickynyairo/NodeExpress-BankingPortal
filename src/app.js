const path = require("path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const { accounts, users } = require('./data.js');

const accountRoutes = require('./routes/accounts.js');

const servicesRoutes = require('./routes/services.js');


app.get("/", (_req, res) => {
    res.render("index", { title: "Account Summary", accounts});
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/profile', (_req, res) => {
    res.render("profile", { user: users[0] })
});


app.listen(3000, () => console.log("Banking Project Server running..."));