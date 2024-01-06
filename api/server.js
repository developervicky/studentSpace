const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

const Student = require("./model/Student");
const Faculty = require("./model/Faculty");
const University = require("./model/University");
const Token = require("./model/Token");
const sendEmail = require("./utils/sendEmail.js");

require("dotenv").config();
app.use(cookieParser());

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
    const { fname, email, pwd, agreed, accType, userName } = req.body;
    if (!fname || !email || !pwd || !accType || !userName) {
      return res.status(400).send("Fill the Form");
    }

    let StudentUser = await Student.findOne({ userName });
    let FacultyUser = await Faculty.findOne({ userName });
    let UniversityUser = await University.findOne({ userName });
    if (StudentUser || FacultyUser || UniversityUser)
      return res.status(400).send("Username already taken !");

    if (agreed == false) {
      return res.status(400).send("Agree the terms and condition");
    }
    const emailSlice = email.split("@");

    if (emailSlice[1].endsWith("edu.in" || "ac.in")) {
      let dbCreate = Student;
      if (accType == "Faculty") {
        dbCreate = Faculty;
      }
      if (accType == "University") {
        dbCreate = University;
      }

      let StudentUser = await Student.findOne({ email });
      let FacultyUser = await Faculty.findOne({ email });
      let UniversityUser = await University.findOne({ email });
      if (StudentUser || FacultyUser || UniversityUser)
        return res.status(400).send("User already registered.");

      const userData = await dbCreate.create({
        fname,
        userName,
        email,
        agreed,
        accType,
        pwd: bcrypt.hashSync(pwd, bcryptSalt),
      });

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
      res.send("Email Sent - Verify it!");
    } else {
      res.status("400").send("School ID's only!");
    }
  } catch (e) {
    res.status(422);
  }
});

app.post("/signin", async (req, res) => {
  const { userName, pwd } = req.body;

  try {
    let StudentUser = await Student.findOne({ userName });
    let FacultyUser = await Faculty.findOne({ userName });
    let UniversityUser = await University.findOne({ userName });
    const userData = StudentUser || FacultyUser || UniversityUser;
    if (userData) {
      const passOk = bcrypt.compareSync(pwd, userData.pwd);
      if (passOk) {
        if (userData.verified) {
          jwt.sign(
            { email: userData.email, id: userData._id },
            jwtSecret,
            {},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json(userData);
            }
          );
        } else if (!userData.verified) {
          const token = await Token.findOne({
            userId: userData._id,
          });
          if (token) {
            res.status(400).send("Check Your Email and Vaildate the Account");
          } else if (!token) {
            const verifToken = await new Token({
              userId: userData._id,
              token: crypto.randomBytes(32).toString("hex"),
            }).save();
            const url = `${process.env.BASE_URL}users/${userData._id}/verify/${verifToken.token}`;
            await sendEmail(
              userData.email,
              "Verify Email - studentSpace",
              url,
              userData.fname
            );
            res.status(400).send("Email sent again");
          }
        }
      } else {
        res.status(400).send("Password wrong!");
      }
    } else {
      res.status(400).send("Username doesn't exist");
    }
  } catch (err) {
    res.status(422);
  }
});

app.get("/userData", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;
      res.json(userData);
    });
  } else {
    res.json(null);
  }
});

app.get("/api/:id/verify/:token", async (req, res) => {
  try {
    let StudentUser = await Student.findOne({ _id: req.params.id });
    let FacultyUser = await Faculty.findOne({ _id: req.params.id });
    let UniversityUser = await University.findOne({ _id: req.params.id });
    const User = StudentUser || FacultyUser || UniversityUser;
    if (!User) {
      return res.status(400).send("User not Existing");
    }
    const token = await Token.findOne({
      userId: User._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send("Link was Expired/Wrong");
    }

    await Student.updateOne({ _id: token.userId }, { verified: true });
    await Faculty.updateOne({ _id: token.userId }, { verified: true });
    await University.updateOne({ _id: token.userId }, { verified: true });
    console.log(User);
    res.status(200).send("Email verified successfully");
    // token.remove();
  } catch (error) {
    res.send(error);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Succesful Logout");
});

app.post("/infoupdate", async (req, res) => {
  const { bio } = req.body;
  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;
      userData.set({ bio });
      await userData.save();
      // await Student.updateOne({ _id: userData. }, { verified: true });
      // await Faculty.updateOne({ _id: token.userId }, { verified: true });
      // await University.updateOne({ _id: token.userId }, { verified: true });
      res.json("bio updated");
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/educreate", async (req, res) => {
  const { name, degree, startedYear, endedYear, percentage } = req.body;
  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let eduCreate = Student;
      if (userData == FacultyUser) {
        eduCreate = Faculty;
      }
      if (userData == UniversityUser) {
        eduCreate = University;
      }
      await eduCreate.updateOne(
        { _id: tokenData.id },
        {
          $addToSet: {
            education: {
              name,
              degree,
              startedYear,
              endedYear,
              percentage,
            },
          },
        }
      );
      res.json("edu create");
    });
  } catch (error) {
    res.send(error);
  }
});

app.put("/eduupdate", async (req, res) => {
  const { name, degree, startedYear, endedYear, percentage } = req.body;
  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let eduCreate = Student;
      if (userData == FacultyUser) {
        eduCreate = Faculty;
      }
      if (userData == UniversityUser) {
        eduCreate = University;
      }
      await eduCreate.updateOne(
        { _id: tokenData.id },
        {
          $set: {
            "education.$": {
              name,
              degree,
              startedYear,
              endedYear,
              percentage,
            },
          },
        }
      );
      res.json("edu update");
    });
  } catch (error) {
    res.send(error);
  }
});
app.listen(5000);
