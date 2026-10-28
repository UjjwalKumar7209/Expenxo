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
    const data = await categoryRepository.getCategoryByUserIdAndName(userId, category)
    // console.log(data)
    if (!data) {
        throw new Error("Category doesnot exists!")
    }
    return await categoryRepository.deleteCategoryByName(userId, category)
}

async function updateCategory(userId: number, categoryId: number, updatedCategory: string) {
    const checkCategory = await categoryRepository.getCategoryByUserIdAndCategoryId(userId, categoryId)
    if (!checkCategory) {
        throw new Error("Category not found to update")
    }
    return await categoryRepository.updateCategory(userId, categoryId, updatedCategory)
}


export const categoryService = {
    getCategories,
    postCategory,
    deleteCategory,
    updateCategory
}