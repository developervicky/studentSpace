const mongoose = require("mongoose");
const { Schema } = mongoose;

const FacultySchema = new Schema({
  fname: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  pwd: { type: String, required: true },
  agreed: { type: Boolean, required: true },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  accType: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  profilePhoto: [String],
  posts: [
    {
      description: { type: String },
      photos: [String],
    },
  ],
  connections: { type: Number },
  bio: { type: String },
  education: [
    {
      uniName: { type: String },
      startedYear: { type: Number },
      endedYear: { type: Number },
    },
  ],
  city: { type: String },
  state: { type: String },
  country: { type: String },
  experiences: [
    {
      compRole: { type: String },
      empType: { type: String },
      compName: { type: String },
      location: { type: String },
      startedYear: { type: String },
      endedYear: { type: String },
      desc: { type: String },
      link: [{ type: String }],
    },
  ],
});

const FacultyModel = mongoose.model("Faculty", FacultySchema);
module.exports = FacultyModel;
