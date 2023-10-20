import express from "express"
import router_users from "./users"

import router_posts from "./posts"

const routes = express()

routes.use("/", router_users)
routes.use("/", router_posts)

export default routes