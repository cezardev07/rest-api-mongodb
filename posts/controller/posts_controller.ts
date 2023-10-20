import { Request, Response } from "express";

import { post_model } from "../model/posts_model";

const posts_controller = {
  async get_post(request: Request, response: Response){
    try {   
      const post_id = request.params.post_id

      const post = await post_model.findById(post_id)

      if(!post){
        return response.status(404).json({
          status: 404,
          mensage: "post não encontrado!",
        })
      }

      return response.status(200).json({
        status: 200,
        mensage: "post encontrado com sucesso!",
        data: post
      })

    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    }
  }, 

  async get_all_posts(_request: Request, response: Response){
    try {   
      const posts = await post_model.find()

      return response.status(200).json({
        status: 200,
        mensage: "lista de todos os post",
        data: posts
      })

    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    }
  }, 

  async create(request: Request, response: Response){
    try {
      const {id_user, username, title, text} = request.body
      
      const post = await post_model.create(
        {
          id_user, 
          username, 
          title, 
          text
        }
      )

      return response.status(200).json({
        status: 200,
        mensage: "post criado com sucesso!",
        data: post
      })

    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    }
  },  

  async create_commit_post(request: Request, response: Response){
    try {
      const postId = request.params.postId;
      const { id_user, username, commit } = request.body;

      const newComment = {
        id_user,
        username,
        commit,
        commits: []
      }

      const post = await post_model.findById(postId);

      if (!post) {
        return response.status(404).json({ error: 'Post não encontrado' });
      }

      post.commits.push(newComment);
      const updatedPost = await post.save();

      return response.status(200).json({
        status: 200,
        mensage: "comentario criado com sucesso!",
        updatedPost
      })

    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    }
  },

  async create_response_commit_post(request: Request, response: Response){
    try {

      const postId = request.params.postId;
      const commitId = request.params.commitId;

      const { id_user, username, commit } = request.body;

      const newComment = {
        id_user,
        username,
        commit,
      }

      const post = await post_model.findById(postId);

      if (!post) {
        return response.status(404).json({ error: 'Post não encontrado' });
      }
      
      if(!post?.commits.find(
          ({id}: any) => id === commitId
      )){
        return response.status(404).json({
          mensage: "bad resquest! commit não encontrado"
        })
      }

      post?.commits
        .find(
          ({id}: any) => id === commitId
        )?.commits
        .push(newComment)
      
      const updatedCommit = await post.save();

      return response.status(200).json({
        status: 200,
        mensage: "comentario criado com sucesso!",
        updatedCommit
      })

    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    }
  },

  async delete_post(request: Request, response: Response){
    try {
      const postId = request.params.postId
      
      if(!postId){
        return response.status(404).json({
          status: 404,
          mensage: "bad request! post não encontrado!",
        })
      }

      await post_model.findByIdAndDelete(postId)

      return response.status(200).json({
        status: 200,
        mensage: "post deletado com sucesso!",
      })

    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    }
  }, 
}

export default posts_controller