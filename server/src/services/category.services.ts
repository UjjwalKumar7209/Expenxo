import { categoryRepository } from "../repositories/category.repository"

async function getCategories(userId: number) {
    const categories = await categoryRepository.getCategoryByUserId(userId)
    return categories

}

async function postCategory(userId: number, category: string) {
    const data = await categoryRepository.getCategoryByUserIdAndName(userId, category)
    // console.log(data)
    if (data) {
        throw new Error("Category already exists!")
    }
    return await categoryRepository.postCategory(userId, category)
}

async function deleteCategory(userId: number, category: string) {
    const data = await categoryRepository.getCategoryByUserId(userId)
    if (data[0]) {
        throw new Error("Category already exists!")
    }
    return await categoryRepository.deleteCategoryByName(userId, category)
}

async function updateCategory(userId: number, category: string, updatedCategory: string) {
    return await categoryRepository.updateCategory(userId, category, updatedCategory)
}


export const categoryService = {
    getCategories,
    postCategory,
    deleteCategory,
    updateCategory
}