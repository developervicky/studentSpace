const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const Student = require("./model/Student");
const Faculty = require("./model/Faculty");
const University = require("./model/University");
const Token = require("./model/Token");
const Blog = require("./model/Blog");
const sendEmail = require("./utils/sendEmail.js");

require("dotenv").config();
app.use(cookieParser());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "gbfuiejwsdhujhsrkbdhuikdf";
const bucket = "studentspace-app";

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);
// C4Ge4SYq4YtYxNn1 developervicky6

async function uploadToS3(path, originalName, mimeType) {
  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalName.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimeType,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/api/signup", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

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

app.post("/api/signin", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

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

app.get("/api/userData", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  console.log("hey connected to mongoose");

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
  mongoose.connect(process.env.MONGO_URL);

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

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json("Succesful Logout");
});

app.post("/api/infoUpdate", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

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

app.post("/api/eduCreate", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

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

app.put("/api/eduUpdate/:subid", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { name, degree, startedYear, endedYear, percentage } = req.body;
  const { token } = req.cookies;
  const { subid } = req.params;
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
        {
          education: {
            $elemMatch: {
              _id: subid,
            },
          },
        },
        {
          $set: {
            "education.$.name": name,
            "education.$.degree": degree,
            "education.$.startedYear": startedYear,
            "education.$.endedYear": endedYear,
            "education.$.percentage": percentage,
          },
        }
      );
      res.json("edu update");
    });
  } catch (error) {
    res.send(error);
  }
});

app.delete("/api/eduDelete/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { token } = req.cookies;
  const { subid } = req.params;

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
        { _id: userData._id },
        {
          $pull: {
            education: {
              _id: subid,
            },
          },
        }
      );
      res.json("edu delete");
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/projectCreate", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { name, startedYear, endedYear, desc } = req.body.project;
  const link = req.body.link;
  // console.log(
  //   link.map((each) => {
  //     return {
  //       link: each.link,
  //       linkName: each.linkName,
  //     };
  //   })
  // );

  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let projectCreate = Student;
      if (userData == FacultyUser) {
        projectCreate = Faculty;
      }
      if (userData == UniversityUser) {
        projectCreate = University;
      }
      await projectCreate.updateOne(
        { _id: tokenData.id },
        {
          $addToSet: {
            projects: {
              name,
              startedYear,
              endedYear,
              desc,
              links: link.map((each) => {
                return {
                  link: each.link,
                  linkName: each.linkName,
                };
              }),
            },
          },
        }
      );
      res.json("project create");
    });
  } catch (error) {
    res.send(error);
  }
});

app.put("/api/projectUpdate/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { name, startedYear, endedYear, desc } = req.body.project;
  const link = req.body.link;
  const { token } = req.cookies;
  const { subid } = req.params;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let projectUpdate = Student;
      if (userData == FacultyUser) {
        projectUpdate = Faculty;
      }
      if (userData == UniversityUser) {
        projectUpdate = University;
      }
      await projectUpdate.updateOne(
        {
          projects: {
            $elemMatch: {
              _id: subid,
            },
          },
        },
        {
          $set: {
            "projects.$.name": name,
            "projects.$.desc": desc,
            "projects.$.startedYear": startedYear,
            "projects.$.endedYear": endedYear,
            "projects.$.links": link.map((each) => {
              return {
                link: each.link,
                linkName: each.linkName,
              };
            }),
          },
        }
      );
      res.json("project update");
    });
  } catch (error) {
    res.send(error);
  }
});

app.delete("/api/projectDelete/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { token } = req.cookies;
  const { subid } = req.params;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let projectDelete = Student;
      if (userData == FacultyUser) {
        projectDelete = Faculty;
      }
      if (userData == UniversityUser) {
        projectDelete = University;
      }
      await projectDelete.updateOne(
        { _id: userData._id },
        {
          $pull: {
            projects: {
              _id: subid,
            },
          },
        }
      );
      res.json("edu delete");
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/achCreate", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { name, organization, year, desc } = req.body.ach;
  const links = req.body.links;
  console.log(links);

  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let achCreate = Student;
      if (userData == FacultyUser) {
        achCreate = Faculty;
      }
      if (userData == UniversityUser) {
        achCreate = University;
      }
      await achCreate.updateOne(
        { _id: tokenData.id },
        {
          $addToSet: {
            awards: {
              name,
              organization,
              year,
              desc,
              links: links.map((each) => {
                return {
                  link: each.link,
                  linkName: each.linkName,
                };
              }),
            },
          },
        }
      );
      res.json("ach create");
    });
  } catch (error) {
    res.send(error);
  }
});

app.put("/api/achUpdate/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { name, year, organization, desc } = req.body.ach;
  const links = req.body.links;
  const { token } = req.cookies;
  const { subid } = req.params;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let achUpdate = Student;
      if (userData == FacultyUser) {
        achUpdate = Faculty;
      }
      if (userData == UniversityUser) {
        achUpdate = University;
      }
      await achUpdate.updateOne(
        {
          awards: {
            $elemMatch: {
              _id: subid,
            },
          },
        },
        {
          $set: {
            "awards.$.name": name,
            "awards.$.desc": desc,
            "awards.$.year": year,
            "awards.$.organization": organization,
            "awards.$.links": links.map((each) => {
              return {
                link: each.link,
                linkName: each.linkName,
              };
            }),
          },
        }
      );
      res.json("awards update");
    });
  } catch (error) {
    res.send(error);
  }
});

app.delete("/api/achDelete/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { token } = req.cookies;
  const { subid } = req.params;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let achDelete = Student;
      if (userData == FacultyUser) {
        achDelete = Faculty;
      }
      if (userData == UniversityUser) {
        achDelete = University;
      }
      await achDelete.updateOne(
        { _id: userData._id },
        {
          $pull: {
            awards: {
              _id: subid,
            },
          },
        }
      );
      res.json("ach delete");
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/addCourse", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { courseName, degName, desc, duration, tuitionFee } = req.body.course;
  const { token } = req.cookies;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;

      await University.updateOne(
        { _id: tokenData.id },
        {
          $addToSet: {
            courses: {
              courseName,
              degName,
              desc,
              duration,
              tuitionFee,
            },
          },
        }
      );
      res.json("course created");
    });
  } catch (error) {
    res.send(error);
  }
});
app.put("/api/editCourse/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { courseName, degName, desc, duration, tuitionFee } = req.body.course;
  const { token } = req.cookies;
  const { subid } = req.params;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;

      await University.updateOne(
        {
          courses: {
            $elemMatch: {
              _id: subid,
            },
          },
        },
        {
          $set: {
            "courses.$.courseName": courseName,
            "courses.$.degName": degName,
            "courses.$.desc": desc,
            "courses.$.duration": duration,
            "courses.$.tuitionFee": tuitionFee,
          },
        }
      );
      res.json("course updated");
    });
  } catch (error) {
    res.send(error);
  }
});

app.delete("/api/courseDelete/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { token } = req.cookies;
  const { subid } = req.params;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;

      await University.updateOne(
        { _id: tokenData.id },
        {
          $pull: {
            courses: {
              _id: subid,
            },
          },
        }
      );
      res.json("course deleted");
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/addExp", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const {
    compRole,
    empType,
    compName,
    location,
    startedYear,
    endedYear,
    desc,
  } = req.body.exp;
  const { token } = req.cookies;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;

      await Faculty.updateOne(
        { _id: tokenData.id },
        {
          $addToSet: {
            experiences: {
              compRole,
              empType,
              compName,
              location,
              startedYear,
              endedYear,
              desc,
            },
          },
        }
      );
      res.json("exp created");
    });
  } catch (error) {
    res.send(error);
  }
});

app.put("/api/editExp/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const {
    compRole,
    empType,
    compName,
    location,
    startedYear,
    endedYear,
    desc,
  } = req.body.exp;
  const { token } = req.cookies;
  const { subid } = req.params;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;

      await Faculty.updateOne(
        {
          experiences: {
            $elemMatch: {
              _id: subid,
            },
          },
        },
        {
          $set: {
            "experiences.$.compRole": compRole,
            "experiences.$.empType": empType,
            "experiences.$.compName": compName,
            "experiences.$.location": location,
            "experiences.$.startedYear": startedYear,
            "experiences.$.endedYear": endedYear,
            "experiences.$.desc": desc,
          },
        }
      );
      res.json("experiences updated");
    });
  } catch (error) {
    res.send(error);
  }
});

app.delete("/api/expDelete/:subid", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { token } = req.cookies;
  const { subid } = req.params;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;

      await Faculty.updateOne(
        { _id: tokenData.id },
        {
          $pull: {
            experiences: {
              _id: subid,
            },
          },
        }
      );
      res.json("exp deleted");
    });
  } catch (error) {
    res.send(error);
  }
});

const photoMiddleware = multer({ dest: "/tmp" });
app.post(
  "/api/upload/profilepic",
  photoMiddleware.single("profilePhoto"),
  async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);

    const uploadedFiles = [];
    const { token } = req.cookies;

    const { path, originalname, mimetype } = req.file;
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);

    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let dpUpdate = Student;
      if (userData == FacultyUser) {
        dpUpdate = Faculty;
      }
      if (userData == UniversityUser) {
        dpUpdate = University;
      }
      await dpUpdate.updateOne(
        { _id: userData._id },
        {
          $push: {
            profilePhoto: url,
          },
        }
      );
    });
    res.send(uploadedFiles);
  }
);

app.delete("/api/deletedp", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
    if (err) throw err;
    let StudentUser = await Student.findOne({ email: tokenData.email });
    let FacultyUser = await Faculty.findOne({ email: tokenData.email });
    let UniversityUser = await University.findOne({ email: tokenData.email });
    const userData = StudentUser || FacultyUser || UniversityUser;

    let dpDelete = Student;
    if (userData == FacultyUser) {
      dpDelete = Faculty;
    }
    if (userData == UniversityUser) {
      dpDelete = University;
    }
    await dpDelete.updateOne(
      { _id: userData._id },
      {
        $set: {
          profilePhoto: [],
        },
      }
    );
  });
  res.json("dp deleted");
});

app.put("/api/updateData", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { fname, userName, city, state, country } = req.body;
  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ email: tokenData.email });
      let FacultyUser = await Faculty.findOne({ email: tokenData.email });
      let UniversityUser = await University.findOne({ email: tokenData.email });
      const userData = StudentUser || FacultyUser || UniversityUser;

      let userUpdate = Student;
      if (userData == FacultyUser) {
        userUpdate = Faculty;
      }
      if (userData == UniversityUser) {
        userUpdate = University;
      }
      await userUpdate.updateOne(
        {
          _id: userData._id,
        },

        {
          $set: {
            fname,
            userName,
            city,
            state,
            country,
          },
        }
      );
      res.json("user updated");
    });
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/search", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { q } = req.query;
  // const keys = [fname, city, state, country];
  let Studentusers = [];
  let Facultyusers = [];
  let Univusers = [];
  const studentUsers = await Student.find({
    fname: { $regex: q, $options: "i" },
  });
  const universityUsers = await University.find({
    fname: { $regex: q, $options: "i" },
  });
  const facultyUsers = await Faculty.find({
    fname: { $regex: q, $options: "i" },
  });

  const eachStudent = studentUsers.map((student) => {
    const { fname, city, state, country, accType, profilePhoto, _id } = student;
    Studentusers.push({
      fname,
      city,
      state,
      country,
      accType,
      profilePhoto,
      _id,
    });
  });
  const eachUniversity = universityUsers.map((univ) => {
    const { fname, city, state, country, accType, profilePhoto, _id } = univ;
    Univusers.push({ fname, city, state, country, accType, profilePhoto, _id });
  });
  const eachFaculty = facultyUsers.map((faculty) => {
    const { fname, city, state, country, accType, profilePhoto, _id } = faculty;
    Facultyusers.push({
      fname,
      city,
      state,
      country,
      accType,
      profilePhoto,
      _id,
    });
  });
  // console.log(eachStudent);
  res.json({ Studentusers, Univusers, Facultyusers });
});

app.get("/api/profileData/:id", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { id } = req.params;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      let StudentUser = await Student.findOne({ _id: id });
      let FacultyUser = await Faculty.findOne({ _id: id });
      let UniversityUser = await University.findOne({ _id: id });
      const userData = StudentUser || FacultyUser || UniversityUser;
      res.json(userData);
    });
  } catch (error) {
    res.send(error);
  }
});
app.listen(5000);

app.get("/api/universitiesData", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const uniData = await University.find();
  res.json(uniData);
});
app.get("/api/univ/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  const uniData = await University.findOne({ _id: id });
  res.json(uniData);
});

app.post("/api/addblog", photoMiddleware.single("cover"), async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { title, summary, content, author, ownerID } = req.body;

  const uploadedFiles = [];

  const { path, originalname, mimetype } = req.file;
  const url = await uploadToS3(path, originalname, mimetype);
  uploadedFiles.push(url);

  await Blog.create({
    title,
    summary,
    content,
    author,
    cover: url,
    ownerID,
  });

  res.json("Blog Created");
});

app.get("/api/blogsData", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const blogsData = await Blog.find();
  res.json(blogsData);
});

app.get("/api/blog/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  const blogsData = await Blog.findOne({ _id: id });
  res.json(blogsData);
});

app.put(
  "/api/editblog/:id",
  photoMiddleware.single("cover"),
  async (req, res) => {
    const { id } = req.params;
    const { title, summary, content, author, ownerID } = req.body;

    const uploadedFiles = [];

    const { path, originalname, mimetype } = req.file;
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);

    await Blog.updateOne(
      { _id: id },
      {
        title,
        summary,
        content,
        author,
        cover: url,
        ownerID,
      }
    );

    res.json("Blog updated");
  }
);

app.delete("/api/deleteblog/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete({ _id: id });
  res.json("Blog Deleted");
});
