import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload
        }
    }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized"
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET as string)

        req.user = payload
        return next()
    } catch (error) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }
}