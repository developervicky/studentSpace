const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.get("/signup", (req, res) => {
  res.send("signin");
});

app.listen(5000);
