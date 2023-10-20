import express, { Request, Response } from "express"
import posts_controller from "../posts/controller/posts_controller"

const router_posts = express.Router()

router_posts.get("/:post_id", (request: Request, response: Response) => {
  return posts_controller.get_post(request, response)
})

router_posts.get("/", (request: Request, response: Response) => {
  return posts_controller.get_all_posts(request, response)
})

router_posts.post("/", (request: Request, response: Response) => {
  return posts_controller.create(request, response)
})

router_posts.patch("/:postId", (request: Request, response: Response) => {
  return posts_controller.create_commit_post(request, response)
})

router_posts.patch("/:postId/:commitId", (request: Request, response: Response) => {
  return posts_controller.create_response_commit_post(request, response)
})

router_posts.delete("/:postId", (request: Request, response: Response) => {
  return posts_controller.delete_post(request, response)
})

export default router_posts