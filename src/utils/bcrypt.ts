import bcrypt from "bcrypt"


const hashPassword = async (password: string): Promise<string> => {
    const saltRounds: number = 10
    const hashedPassword: string = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export { hashPassword }