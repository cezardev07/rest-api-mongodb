import app from "./app/app"
import "dotenv/config"

import { Express } from "express-serve-static-core"

const serve: Express = app

const PORT = process.env.PORT || 3333

serve.listen(PORT, callback)

function callback(){
  return console.log("Serve is running! PORT -> " + PORT)
}