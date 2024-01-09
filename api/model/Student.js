const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  fname: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  pwd: { type: String, required: true },
  agreed: { type: Boolean, required: true },
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
      name: { type: String },
      degree: { type: String },
      startedYear: { type: Number },
      endedYear: { type: Number },
      percentage: { type: Number },
    },
  ],
  city: { type: String },
  state: { type: String },
  country: { type: String },
  projects: [
    {
      name: { type: String },
      startedYear: { type: String },
      endedYear: { type: String },
      desc: { type: String },
      links: [
        {
          link: { type: String },
          linkName: { type: String },
        },
      ],
    },
  ],
  awards: [
    {
      name: { type: String },
      organization: { type: String },
      year: { type: String },
      desc: { type: String },
      links: [
        {
          link: { type: String },
          linkName: { type: String },
        },
      ],
    },
  ],
});

const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = StudentModel;
