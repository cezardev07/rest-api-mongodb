import bcrypt from "bcrypt";

async function encrypt(password: string){
  const saltRounds = 10;  
  const hashPassword = await bcrypt.hash(password, saltRounds)

  return hashPassword
}

export default encrypt