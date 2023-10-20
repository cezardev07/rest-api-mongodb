import express from "express"

const app = express()

// routes application
import middawares from "../middlewares/middlewares"
app.use(middawares)

// connection with database
import { 
  handleConnectionMongoDB as connection 
} from "../database/connection";
connection()

// routes application
import routes from "../routes/routes"
app.use("/", routes)

export default app