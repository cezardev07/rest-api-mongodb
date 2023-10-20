import express from 'express'
import cors from "cors"

import { Express } from "express-serve-static-core"

const middaware: Express = express()

middaware.use(cors())
middaware.use(express.json())

export default middaware