import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters long"],
    },

    isEnabled: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true
  }
);

const Users = mongoose.model("Users", UsersSchema);

export { Users };
