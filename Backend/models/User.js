import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 7 },
  number: { type: String, required: true, match: /^[0-9]{10}$/ },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
