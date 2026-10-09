import bcrypt from 'bcrypt'
import userRepository from '../repositories/user.repository'


// register the user
async function register(name: string, email: string, password: string) {
    const existingUser = await userRepository.findUserByEmail(email)
    if (existingUser) {
        throw Error("User already exist")
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await userRepository.createUser(name, email, passwordHash)
    return user
}

const authService = {
    register
}

export default authService