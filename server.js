const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.static("public"));

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const indexRouter = require("./routers");
app.use("/", indexRouter);

app.get("/test", function (req, res) {
  res.send({
    code: 0,
    data: "hello react test",
  });
});

// connect mongodb
mongoose
  .connect("mongodb://localhost/backoffice", { useNewUrlParser: true })
  .then(() => {
    console.log("connection with db success!");
    // only after connection with db, be able to set sever running.
    app.listen("3000", () => {
      console.log("server running: http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("connection with db failed!", error);
  });
