const express = require("express");
const app = express();
const expressEjsLayouts = require("express-ejs-layouts");
const StudentRouter = require("./Routes/StudentRouter");
const connectDB = require("./database/config");
const { flash } = require("express-flash-message");
const methodOverride = require("method-override");
const session = require("express-session");

connectDB();

require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


//les fichiers statiques : css, js, images
app.use(express.static("public"));

//session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semaine
    },
  })
);

//flash
// app.use(flash({ sessionKeyName: "flashMessage" }));

//moteur de templates
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout", "./layouts/main");

// les routes
app.use("/", StudentRouter);

app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`);
});
