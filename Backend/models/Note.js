import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: String,
      required: [true, "Please provide topic"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
      trim: true,
    },
    link: {
      type: String,
      default: "",
    },
    statement: {
      type: String,
      default: "",
    },
    approach: {
      brute: { type: String, default: "" },
      optimized: { type: String, default: "" },
      notes: { type: String, default: "" },
    },
    summary: {
      takeaways: { type: String, default: "" },
      tricks: { type: String, default: "" },
      mistakes: { type: String, default: "" },
    },
    complexity: {
      time: { type: String, default: "" },
      space: { type: String, default: "" },
      explanation: { type: String, default: "" },
    },
    codeBlocks: [
      {
        tag: { type: String, default: "" },
        language: { type: String, default: "cpp" },
        code: { type: String, default: "" },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
