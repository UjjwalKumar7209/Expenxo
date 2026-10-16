import type { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/loginSchema";
import authService from "../services/auth.services";

async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body
        const parsed = registerSchema.safeParse({name, email, password})
        if (!parsed.success) {
            return res.status(404).json({
                msg: "Invalid inputs"
            })
        }
        const user = await authService.register(name, email, password)
        return res.status(201).json({
            msg:"User created!",
            user
        })
    } catch (error) {
        return res.status(409).json({
        msg: error instanceof Error ? error.message : 'Something went wrong'
        })
    }
}

async function login(req: Request, res: Response) {
    try {
        const {email, password} = req.body
        const parsed = loginSchema.safeParse({email, password})
        if (!parsed.success) {
            return res.status(404).json({
                msg: "Invalid inputs"
            })
        }
        const {token, user} = await authService.login(email, password)
        res.cookie('token', token)
        return res.status(202).json({
            msg: "Loggeed in",
            user: {
                id: user.id,
                name: user.email,
                email: user.email,
            },
            token

        })
    } catch (error) {
        return res.status(401).json({
            msg: error instanceof Error ? error.message : 'Something went wrong'
        })
    }
}

async function getMe(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await authService.getMe(req.user!.userId)
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(404).json({
            msg: error instanceof Error ? error.message : 'Something went wrong'
        })
    }
}

const authController =  {
    register,
    login,
    getMe
}

export default authController