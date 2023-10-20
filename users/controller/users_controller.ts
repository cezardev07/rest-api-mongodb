import { Request, Response } from "express";

import { usersModel } from "../model/users_model";

import encryptPassword from "../../services/bcrypt/hash";
import comparePassword from "../../services/bcrypt/compare";
import { post_model } from "../../posts/model/posts_model";


const user_controller = {
  async create(request: Request, response: Response){
    try {

      const ifNotExistUser = await usersModel.findOne({
        name: request.body.name
      })
  
      if(ifNotExistUser){
        return response.status(401).json({
          mensage: "o usuario jã existe!",
        })
      }
  
      const password = await encryptPassword(request.body.password) 

      const user = {
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${request.body.name[0]}`,
        name: request.body.name,
        username: request.body.username,
        password: password,
      }

      const creatingNewUser = await usersModel.create(user)

      return response.status(200).json({
        status: 200,
        mensage: "usuario criado com sucesso!",
        data: creatingNewUser
      })

    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    }
  },
  
  async login(request: Request, response: Response){
    try {
      const auth: string | undefined = request.headers.authorization

      if(auth){
        const decode = Buffer
          .from(auth.split(" ")[1], 'base64')
          .toString('utf8')
          .split(":")
          
          const user = await usersModel.findOne({
            name: decode[0]
          })
      
          if(!user){
            return response.status(404).json({
              status: 404,
              mensage: "usuario não encontrado!",
            })
          }
  
          const compare = await comparePassword(decode[1], user.password)

          if(!compare){
            return response.status(401).json({
              status: 401,
              mensage: "senha incorreta"
            }) 
          }

          return response.status(200).json({
            status: 200,
            mensage: "bem vindo!",
            data: user
          })
      }
    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    } 
  },

  async deleteUser(request: Request, response: Response){
    try {
      const id = request.params.id
      
      const user = await usersModel.findById(id)

      if(!user){
        return response.status(200).json({
          status: 200,
          mensage: `usuario não encotrado`,
        })
      }

      const posts = await post_model.find({id_user: id})
  
      await post_model.deleteMany({ id_user: id })

      await usersModel.findByIdAndDelete(id)

      return response.status(200).json({
        status: 200,
        mensage: `O usuario ${user.name} foi deletado e todos os seus ${posts.length} posts também foram deletados, está ação não pode ser desfeita!`,
      })

    } catch (error) {
      throw new Error("[ ERRO ] -> " + error)
    } 
  }
}

export default user_controller