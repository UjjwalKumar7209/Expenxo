import bcrypt from 'bcrypt'
import userRepository from '../repositories/user.repository'
import jwt from 'jsonwebtoken'


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

async function login(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email)
    if (!user) {
        throw new Error('Invalid Credentials')
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordCorrect) {
        throw new Error('Invalid Credentials')
    }
    const userId = user.id
    const jwt_secret = process.env.JWT_SECRET as string
    const token = jwt.sign({ userId }, jwt_secret, {
        expiresIn: '7d'
    })

    return {
        token,
        user
    }
}

async function getMe(userId: number) {
  const user = await userRepository.findUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

const authService = {
    register,
    login,
    getMe
}

export default authService