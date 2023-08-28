var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var authRouter = require("./src/routes/auth");
var testRouter = require("./src/routes/test");
var usersRouter = require("./src/routes/users");

var app = express();

app.set("trust proxy", 1);
app.enable("trust proxy");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URI],
//   })
// );

app.use("/auth", authRouter);
app.use("/test", testRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
