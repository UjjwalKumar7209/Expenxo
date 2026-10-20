import type { Request, Response } from "express";
import { categoryService } from "../services/category.services";

async function getCategories(req: Request, res: Response) {
    try {
        const categories = await categoryService.getCategories(req.user!.userId)
        // console.log(categories)
        return res.status(200).json(categories)
    } catch (error) {
        console.error("Error fetching categories:", error)
        res.status(500).json({
            msg: "Failed to fetch categories!"
        })
    }
}

async function postCategory(req: Request, res: Response) {
    try {
        const category = req.body.category as string
        await categoryService.postCategory(req.user!.userId, category)
        return res.status(201).json({
            msg: "New Category Uploaded!"
        })
    } catch (error) {
        return res.status(400).json({
            msg: error instanceof Error ? error.message: "Something went wrong"
        })
    }
}

async function deleteCategory(req: Request, res: Response) {
    try {
        const category = req.body.category as string
        const returning = await categoryService.deleteCategory(req.user!.userId, category)
        return res.status(200).json({
            msg: "Category deleted!",
            returning: returning
        })
    } catch (error) {
        return res.status(400).json({
            msg: error instanceof Error ? error.message: "Something went wrong while deleting category"
        })
    }
}

async function updateCategory(req: Request, res: Response) {
    try {
        const category = req.body.category
        const updatedCategory = req.body.updatedCategory
        const returning = await categoryService.updateCategory(req.user!.userId, category, updatedCategory)
        return res.status(200).json({
            msg: "Category updated!",
            returning: returning
        })
    } catch (error) {
        return res.status(400).json({
            msg: error instanceof Error ? error.message: "Something went wrong while updating category name."
        })
    }
}


export const categoryController = {
    getCategories,
    postCategory,
    deleteCategory,
    updateCategory
}