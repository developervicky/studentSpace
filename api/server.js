const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Student = require("./model/Student");
const Faculty = require("./model/Faculty");
const University = require("./model/University");
const Token = require("./model/Token");
const sendEmail = require("./utils/sendEmail.js");

require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "gbfuiejwsdhujhsrkbdhuikdf";

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);
// C4Ge4SYq4YtYxNn1 developervicky6

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/signup", async (req, res) => {
  try {
    const { fname, email, pwd, agreed, accType } = req.body;
    if (agreed == false) {
      return res.status(400).send("Agree the terms and condition");
    }
    if (!fname || !email || !pwd || !accType) {
      return res.status(400).send("Fill the Form");
    }

    let dbCreate = Student;
    if (accType == "Faculty") {
      dbCreate = Faculty;
    }
    if (accType == "University") {
      dbCreate = University;
    }

    let user = await dbCreate.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    const userData = await dbCreate.create({
      fname,
      email,
      agreed,
      accType,
      pwd: bcrypt.hashSync(pwd, bcryptSalt),
    });

    jwt.sign(
      { id: userData._id, fname: userData.fname, email: userData.email },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
      }
    );

    const verifToken = await new Token({
      userId: userData._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}users/${userData._id}/verify/${verifToken.token}`;
    // console.log(userData.email, url);
    await sendEmail(
      userData.email,
      "Verify Email - studentSpace",
      url,
      userData.fname
    );
    res.json({ message: "Verify the Email" });
  } catch (e) {
    res.status(422);
  }

  // res.send(" signup success");
});

app.listen(5000);
