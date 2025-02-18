import mongoose from "mongoose";
// const { Users } = await import("../models/Users.js");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },

    publishedYear: {
      type: Number,
      required: [true, "Published year is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

export { Book };
