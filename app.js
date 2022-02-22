
import express from 'express'
import cookieParser from "cookie-parser"
import logger from "morgan"
import mongoose from "mongoose"
import eventsRouter from "./routes/EventsRoutes.js"
import authRouter from "./routes/AuthRoutes.js"
import bodyparser from "body-parser"

const MONGO_URL = 'mongodb+srv://suchiKrish:May181996@cluster0.q4jbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const secret = '839476SuchithkrishnaTopSecretHEHEHUSH_HUSH'

const app = express();
import cors from "cors"
//const storage = require("./fileUpload/upload");
//require('./auth/auth')
// view engine setup
// app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/events", eventsRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
const CONNECTION_URL = MONGO_URL
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err.message));

app.listen(8000, () => {
    console.log("listening")
});
