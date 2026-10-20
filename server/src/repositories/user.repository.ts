import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);


async function findUserByEmail(email: string) {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
    return user[0] ?? null
}

async function createUser(name: string, email: string, hashPassword: string) {
    const alreadyExistUser = await findUserByEmail(email)
    if (alreadyExistUser !== null) {
        throw new Error("User aready exists!")
    }
    const user = await db.insert(usersTable).values({
        name,
        email,
        passwordHash: hashPassword
    }).returning()

    return user[0]
}

async function findUserById(id: number) {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id))
  return user[0] ?? null
}

const userRepository = {
    findUserByEmail,
    createUser,
    findUserById
}

export default userRepository