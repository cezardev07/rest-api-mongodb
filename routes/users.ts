import express, { Request, Response } from "express"
import user_controller from "../users/controller/users_controller"

const router_users = express.Router()

router_users.post("/registe", (request: Request, response: Response) => {
  return user_controller.create(request, response)
})

router_users.post("/login", (request: Request, response: Response) => {
  return user_controller.login(request, response)
})

router_users.delete("/delete-user/:id", (request: Request, response: Response) => {
  return user_controller.deleteUser(request, response)
})

export default router_users