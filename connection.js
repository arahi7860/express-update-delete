import mongoose from "mongoose";

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/rest')

export default mongoose
