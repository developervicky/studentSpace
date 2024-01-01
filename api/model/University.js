const mongoose = require("mongoose");
const { Schema } = mongoose;

const UniversitySchema = new Schema({
  fname: { type: String, required: true },
  email: { type: String, required: true },
  pwd: { type: String, required: true },
  agreed: { type: Boolean, required: true },
  accType: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  posts: [
    {
      description: { type: String },
      photos: [String],
    },
  ],
});

const UniversityModel = mongoose.model("University", UniversitySchema);
module.exports = UniversityModel;
