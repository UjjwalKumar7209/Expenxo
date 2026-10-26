import type { Request, Response } from "express";
import { expenseService } from "../services/expense.services";

async function postExpense(req: Request, res: Response) {
    try {
        const { categoryId, category, amount, description } = req.body
        const date = new Date(req.body.date);
        const userId = req.user!.userId
        const returning = await expenseService.postExpense(userId, category, categoryId, amount, description, date)
        return res.status(200).json({
            msg: "Expense added",
            returning: returning
        })
    } catch (error) {
        return res.status(500).json({
            msg: error instanceof Error? error.message: "Something went wrong while posting your expense"
        })
    }
}

async function getExpense(req: Request, res: Response) {
    try {
        const userId = req.user!.userId
        const expenses = await expenseService.getExpense(userId);
        return res.status(200).json({
            returning: expenses
        })
    } catch (error) {
        return res.status(500).json({
            msg: error instanceof Error? error.message: "Something went wrong while getting expense"
        })
    }
}

export const expenseController = {
    postExpense,
    getExpense
}