const mongoose = require("mongoose");
const { Schema } = mongoose;

const UniversitySchema = new Schema({
  fname: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  pwd: { type: String, required: true },
  agreed: { type: Boolean, required: true },
  accType: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  verified: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now() },
  profilePhoto: [String],
  posts: [
    {
      description: { type: String },
      photos: [String],
    },
  ],
  courses: [
    {
      degName: { type: String },
      courseName: { type: String },
      duration: { type: Number },
      tuitionFee: { type: Number },
      desc: { type: String },
      reviews: [{ type: String }],
    },
  ],
  connections: { type: Number },
  bio: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

const UniversityModel = mongoose.model("University", UniversitySchema);
module.exports = UniversityModel;
