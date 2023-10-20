import mongoose, { Schema } from "mongoose"

const posts_Schema = new Schema(
  {
    id_user:{
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },

    //comentarios do post
    commits: {
      type: [
        {
          id_user: {
            type: String,
            required: true
          },
          username:{
            type: String,
            required: true
          },
          commit:{
            type: String,
            required: true
          },

          //comentarios do "comentario"
          commits: [
            //comentario
            {
              id: mongoose.Schema.Types.ObjectId,
              id_user: {
                type: String,
                required: true
              },
              username:{
                type: String,
                required: true
              },
              commit:{
                type: String,
                required: true
              },
            }
          ]
        }
      ],

    }
  },
  {timestamps: true}
)

const post_model = mongoose.model("post", posts_Schema)

export {
  post_model
}