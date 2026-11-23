import { useEffect, useState } from "react";
import { Link } from "react-router";
import clientApi, { apiError, type Category, type Expense } from "../api";

const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([clientApi.expenses(), clientApi.categories()])
      .then(([e, c]) => {
        setExpenses(e.returning);
        setCategories(c);
      })
      .catch((e) => setError(apiError(e)));
  }, []);
  const month = new Date().toISOString().slice(0, 7);
  const monthly = expenses.filter((e) => e.date.startsWith(month));
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthTotal = monthly.reduce((sum, e) => sum + e.amount, 0);
  const byCategory = categories
    .map((category) => ({
      ...category,
      total: monthly
        .filter((e) => e.categoryId === category.id)
        .reduce((sum, e) => sum + e.amount, 0),
    }))
    .filter((category) => category.total > 0)
    .sort((a, b) => b.total - a.total);
  const max = byCategory[0]?.total ?? 1;
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-black uppercase tracking-widest text-[#2563EB]">
            {new Date().toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight">
            Your money, clearly.
          </h2>
          <p className="mt-2 text-neutral-600">
            A real-time view of what you have recorded.
          </p>
        </div>
        <Link
          to="/app/transactions"
          className="border-2 border-black bg-[#FDE047] px-5 py-3 text-center font-black shadow-[4px_4px_0_#171717] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          + Add expense
        </Link>
      </div>
      {error && (
        <div className="border-2 border-black bg-[#FECACA] p-4 font-bold">
          {error}
        </div>
      )}
      <section className="grid gap-5 sm:grid-cols-3">
        <Stat label="All expenses" value={money(total)} color="bg-[#BFDBFE]" />
        <Stat
          label="This month"
          value={money(monthTotal)}
          color="bg-[#D9F99D]"
        />
        <Stat
          label="Transactions"
          value={String(expenses.length)}
          color="bg-[#FDE68A]"
        />
      </section>
      {expenses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_#171717]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black">Recent transactions</h3>
              <Link
                to="/app/transactions"
                className="font-bold text-[#2563EB] underline"
              >
                View all
              </Link>
            </div>
            <div className="mt-4 divide-y-2 divide-neutral-200">
              {expenses
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 5)
                .map((expense) => (
                  <Transaction
                    key={expense.id}
                    expense={expense}
                    category={
                      categories.find((c) => c.id === expense.categoryId)
                        ?.name ?? "Uncategorized"
                    }
                  />
                ))}
            </div>
          </section>
          <section className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_#171717]">
            <h3 className="text-xl font-black">Monthly breakdown</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Where this month's spending went.
            </p>
            <div className="mt-6 space-y-5">
              {byCategory.length ? (
                byCategory.map((category) => (
                  <div key={category.id}>
                    <div className="flex justify-between gap-3 font-bold">
                      <span>{category.name}</span>
                      <span>{money(category.total)}</span>
                    </div>
                    <div className="mt-2 h-4 border-2 border-black bg-[#FAF9F6]">
                      <div
                        className="h-full bg-[#2563EB]"
                        style={{ width: `${(category.total / max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-10 text-neutral-600">
                  No expenses recorded this month.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className={`border-2 border-black ${color} p-5 shadow-[4px_4px_0_#171717]`}
    >
      <p className="font-bold">{label}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
    </div>
  );
}
export function Transaction({
  expense,
  category,
}: {
  expense: Expense;
  category: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="font-black">{expense.description || "Expense"}</p>
        <p className="text-sm text-neutral-500">
          {category} ·{" "}
          {new Date(`${expense.date}T00:00:00`).toLocaleDateString("en-IN")}
        </p>
      </div>
      <p className="font-black">-{money(expense.amount)}</p>
    </div>
  );
}
function EmptyState() {
  return (
    <div className="border-2 border-black bg-white p-10 text-center shadow-[4px_4px_0_#171717]">
      <p className="text-5xl">◎</p>
      <h3 className="mt-4 text-2xl font-black">
        Your first expense starts here.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-neutral-600">
        Add a transaction to see your spending patterns and monthly summary come
        to life.
      </p>
      <Link
        to="/app/transactions"
        className="mt-6 inline-block border-2 border-black bg-[#FDE047] px-5 py-3 font-black"
      >
        Add your first expense ↗
      </Link>
    </div>
  );
}
