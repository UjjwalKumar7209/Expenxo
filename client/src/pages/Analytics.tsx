import { useEffect, useState } from "react";
import clientApi, { type Category, type Expense } from "../api";
export default function Analytics() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    Promise.all([clientApi.expenses(), clientApi.categories()]).then(
      ([e, c]) => {
        setExpenses(e.returning);
        setCategories(c);
      },
    );
  }, []);
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));
    const key = date.toISOString().slice(0, 7);
    return {
      key,
      label: date.toLocaleDateString("en-IN", { month: "short" }),
      total: expenses
        .filter((e) => e.date.startsWith(key))
        .reduce((sum, e) => sum + e.amount, 0),
    };
  });
  const max = Math.max(...months.map((m) => m.total), 1);
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  return (
    <div className="space-y-8">
      <p className="text-neutral-600">
        Understand your spending using the transactions you have recorded.
      </p>
      <section className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_#171717]">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-bold">Six-month trend</p>
            <p className="mt-2 text-3xl font-black">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>
          <span className="border-2 border-black bg-[#D9F99D] px-3 py-1 text-sm font-black">
            Total recorded
          </span>
        </div>
        <div className="mt-8 flex h-56 items-end gap-2 border-b-2 border-black sm:gap-4">
          {months.map((month) => (
            <div
              key={month.key}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span className="text-xs font-bold">
                ₹{month.total.toLocaleString("en-IN")}
              </span>
              <div
                className="w-full max-w-16 border-2 border-black bg-[#2563EB]"
                style={{
                  height: `${Math.max((month.total / max) * 85, month.total ? 8 : 2)}%`,
                }}
              />
              <span className="text-xs font-black uppercase">
                {month.label}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="border-2 border-black bg-[#FDE047] p-5 shadow-[4px_4px_0_#171717]">
        <h2 className="text-xl font-black">All-time category split</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {categories.map((category) => {
            const amount = expenses
              .filter((e) => e.categoryId === category.id)
              .reduce((sum, e) => sum + e.amount, 0);
            return (
              <div
                key={category.id}
                className="flex justify-between border-2 border-black bg-white p-4 font-black"
              >
                <span>{category.name}</span>
                <span>₹{amount.toLocaleString("en-IN")}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
