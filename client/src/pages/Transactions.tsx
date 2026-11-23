import { useEffect, useMemo, useRef, useState } from "react";
import clientApi, { apiError, type Category, type Expense } from "../api";
import { Transaction } from "./Dashboard";
const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
export default function Transactions() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("date");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const isAddingRef = useRef(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    categoryId: "",
    amount: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const load = () => {
    setLoading(true);
    Promise.all([clientApi.expenses(), clientApi.categories()])
      .then(([e, c]) => {
        setExpenses(e.returning);
        setCategories(c);
        setForm((current) => ({
          ...current,
          categoryId: current.categoryId || String(c[0]?.id ?? ""),
        }));
      })
      .catch((e) => setError(apiError(e)))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  const filtered = useMemo(
    () =>
      expenses
        .filter((e) => category === "all" || String(e.categoryId) === category)
        .sort((a, b) =>
          sort === "amount"
            ? b.amount - a.amount
            : b.date.localeCompare(a.date),
        ),
    [expenses, category, sort],
  );
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isAddingRef.current) return;
    isAddingRef.current = true;
    setIsAdding(true);
    setError("");
    try {
      await clientApi.addExpense({
        categoryId: Number(form.categoryId),
        amount: Number(form.amount),
        description: form.description,
        date: form.date,
      });
      setForm((current) => ({ ...current, amount: "", description: "" }));
      load();
    } catch (e) {
      setError(apiError(e));
    } finally {
      isAddingRef.current = false;
      setIsAdding(false);
    }
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await clientApi.deleteExpense(id);
      setExpenses((current) => current.filter((e) => e.id !== id));
    } catch (e) {
      setError(apiError(e));
    }
  };
  return (
    <div className="space-y-7">
      <p className="max-w-2xl text-neutral-600">
        Record and review every expense. The backend currently supports adding,
        viewing, and deleting expenses.
      </p>
      <div className="grid gap-7 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <form
          onSubmit={submit}
          className="h-fit border-2 border-black bg-[#FDE047] p-5 shadow-[4px_4px_0_#171717]"
        >
          <h2 className="text-xl font-black">Add expense</h2>
          <div className="mt-5 space-y-4">
            <Field label="Amount (₹)">
              <input
                disabled={isAdding}
                required
                min="1"
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="850"
              />
            </Field>
            <Field label="Category">
              <select
                disabled={isAdding}
                required
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
              >
                <option value="">Choose a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Date">
              <input
                disabled={isAdding}
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
            <Field label="Description">
              <input
                disabled={isAdding}
                maxLength={500}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="What was it for?"
              />
            </Field>
            <button
              type="submit"
              disabled={!categories.length || isAdding}
              className="w-full border-2 border-black bg-white px-4 py-3 font-black shadow-[3px_3px_0_#171717] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAdding ? "Adding expense..." : "Save expense ↗"}
            </button>
          </div>
        </form>
        <section className="min-w-0 border-2 border-black bg-white p-5 shadow-[4px_4px_0_#171717]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-black">
              All transactions{" "}
              <span className="text-neutral-400">({filtered.length})</span>
            </h2>
            <div className="flex gap-2">
              <select
                aria-label="Filter by category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                aria-label="Sort transactions"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="date">Newest</option>
                <option value="amount">Highest amount</option>
              </select>
            </div>
          </div>
          {error && (
            <p className="mt-4 border-2 border-black bg-[#FECACA] p-3 font-bold">
              {error}
            </p>
          )}
          {loading ? (
            <p className="py-12 text-center font-bold">Loading expenses...</p>
          ) : filtered.length ? (
            <div className="mt-3 divide-y-2 divide-neutral-200">
              {filtered.map((expense) => (
                <div key={expense.id} className="flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <Transaction
                      expense={expense}
                      category={
                        categories.find((c) => c.id === expense.categoryId)
                          ?.name ?? "Uncategorized"
                      }
                    />
                  </div>
                  <button
                    onClick={() => remove(expense.id)}
                    className="border-2 border-black px-2 py-1 text-sm font-black hover:bg-[#FECACA]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-neutral-600">
              No matching expenses yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-bold">{label}</span>
      {children}
    </label>
  );
}
