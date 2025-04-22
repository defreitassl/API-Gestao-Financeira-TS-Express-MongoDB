import bcrypt from "bcrypt"

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds: number = 10
    const hashedPassword: string = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isCorrectPassword: boolean = await bcrypt.compare(password, hashedPassword)
    return isCorrectPassword
}


export { hashPassword, comparePassword }