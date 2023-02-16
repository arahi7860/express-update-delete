import mongoose from "../connection.js";

const listSchema = new mongoose.Schema({
  name: String,
  items: [{
    title: String,
    status: Boolean,
    deadline: Date,
  }]
})

export default mongoose.model('List', listSchema)
