import axios from "axios";

export type User = { id: number; name: string; email: string };
export type Category = { id: number; name: string; createdAt?: string };
export type Expense = {
  id: number;
  categoryId: number;
  amount: number;
  description: string | null;
  date: string;
  createdAt?: string;
};

const api = axios.create({ withCredentials: true });

let backendUrl: string | null = null;
let backendUrlRequest: Promise<string> | null = null;

async function getBackendUrl() {
  if (backendUrl) return backendUrl;
  backendUrlRequest ??= axios
    .get<{ BACKEND_URL?: string }>("/config")
    .then(({ data }) => {
      if (!data.BACKEND_URL) throw new Error("Backend URL is not configured.");
      backendUrl = data.BACKEND_URL;
      return data.BACKEND_URL;
    });
  return backendUrlRequest;
}

async function request<T>(
  method: "get" | "post" | "put" | "delete",
  path: string,
  data?: unknown,
) {
  const url = `${await getBackendUrl()}/api/v1${path}`;
  const response = await api.request<T>({ method, url, data });
  return response.data;
}

export const clientApi = {
  login: (data: { email: string; password: string }) =>
    request<{ user: User; token: string }>("post", "/login", data),
  register: (data: { name: string; email: string; password: string }) =>
    request<{ user: User }>("post", "/register", data),
  me: () => request<{ user: User }>("get", "/me"),
  logout: () => request<{ msg: string }>("post", "/logout"),
  expenses: () => request<{ returning: Expense[] }>("get", "/expense"),
  addExpense: (data: {
    categoryId: number;
    amount: number;
    description: string;
    date: string;
  }) => request<{ returning: Expense }>("post", "/expense", data),
  deleteExpense: (expenseId: number) =>
    request<{ returning: Expense }>("delete", "/expense", { expenseId }),
  categories: () => request<Category[]>("get", "/category"),
  addCategory: (category: string) =>
    request<{ msg: string }>("post", "/category", { category }),
  updateCategory: (categoryId: number, updatedCategory: string) =>
    request<{ returning: Category[] }>("put", "/category", {
      categoryId,
      updatedCategory,
    }),
  deleteCategory: (category: string) =>
    request<{ msg: string }>("delete", "/category", { category }),
};

export function apiError(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  if (
    axios.isAxiosError(error) &&
    typeof error.response?.data?.msg === "string"
  )
    return error.response.data.msg;
  return error instanceof Error ? error.message : fallback;
}

export default clientApi;
