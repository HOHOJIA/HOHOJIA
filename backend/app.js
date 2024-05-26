// load required package
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const s3Client = require("./utils/s3presign");
const cors = require("cors");
const version = process.env.HOHOJIA_VERSION || "version not found";

let recipeRouter = require("./routes/recipe");
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let likeRouter = require("./routes/like");
let commentRouter = require("./routes/comment");
let searchRouter = require("./routes/search");
let allRecipesRouter = require("./routes/allRecipes");

// default port 3000 (settting in bin folder)
let app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/1.0/users", usersRouter);
app.use("/api/1.0/like", likeRouter);
app.use("/api/1.0/comment", commentRouter);
app.use("/api/1.0/recipe", recipeRouter);
app.use("/api/1.0/search", searchRouter);
app.use("/api/1.0/getAllRecipes", allRecipesRouter);

app.get("/api/generate-presigned-url", async (req, res) => {
  try {
    console.log(req.query.filename);
    const presignedUrl = await s3Client.getSign(req.query.filename);
    res.json({ presignedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating presigned URL");
  }
});
app.get("/api/1.0/test", (req, res) => {
  console.log("Hello~~");
  res.send("Hello, version: " + version);
});

module.exports = app;
