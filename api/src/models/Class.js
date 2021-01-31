import { Schema, model } from "mongoose";

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    autopopulate: true,
  },
  files: [{ type: String }],
  homework: {
    type: String,
  },
  correction: {
    type: String,
  },
  test: {
    type: String,
  },
});

classSchema.plugin(require("mongoose-autopopulate"));

export default model("Class", classSchema);