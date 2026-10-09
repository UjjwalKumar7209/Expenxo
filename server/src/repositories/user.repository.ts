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
    const user = await db.insert(usersTable).values({
        name,
        email,
        password: hashPassword
    }).returning()

    return user[0]
}

const userRepository = {
    findUserByEmail,
    createUser
}

export default userRepository