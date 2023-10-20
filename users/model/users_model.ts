import mongoose, { Schema } from "mongoose"

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  {timestamps: true}
)

const usersModel = mongoose.model("user", usersSchema)

export {
  usersModel
}