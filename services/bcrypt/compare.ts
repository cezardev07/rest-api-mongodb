import bcrypt from "bcrypt";

async function compare (comparePassword: string, hash: string){
  const decrypted = await bcrypt.compare(comparePassword, hash)

  return decrypted
}

export default compare