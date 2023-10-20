import { connect } from "mongoose"
import "dotenv/config"

const handleConnectionMongoDB = async () => {
    try {
      const secretKey: string | undefined = process.env.CONNECT_MONGODB

      if(secretKey){
        await connect(secretKey)
      }

    } catch (error) {
        throw new Error("[ ERRO ] -> " + error)
    }
}

export {
  handleConnectionMongoDB
}