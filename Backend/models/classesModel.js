// all classes  model here
const mongoose = require("mongoose");

const classesSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    seatTotal: Number,
    seatOccupied: Number,
    price: Number,
    activity: { type: String, required: true },
    venue: { type: String, enum: ["online", "offline"], default: "online" },
    locationOrLink: String,
    duration: String,
    image: String,
    trainerID: { type: String, required: true },
    trainerName: String,
    classDate: String,
    classTime: String,
    clients: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

const ClassesModel = mongoose.model("class", classesSchema);

module.exports = { ClassesModel };
