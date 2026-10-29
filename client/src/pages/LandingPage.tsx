import { useState } from "react";
import { Link } from "react-router";

const features = [
  {
    number: "01",
    icon: "↗",
    title: "Track every expense",
    description:
      "Record your daily spending and know exactly where your money goes.",
    color: "bg-[#D9F99D]",
  },
  {
    number: "02",
    icon: "◎",
    title: "Set your budgets",
    description:
      "Set monthly limits for different categories and keep your spending in check.",
    color: "bg-[#BFDBFE]",
  },
  {
    number: "03",
    icon: "▥",
    title: "Understand your money",
    description:
      "See your spending patterns through simple summaries and clear reports.",
    color: "bg-[#FDE68A]",
  },
];

const transactions = [
  { name: "Groceries", category: "Food", amount: "-₹850", icon: "🛒" },
  { name: "Metro card", category: "Transport", amount: "-₹300", icon: "🚇" },
  { name: "Coffee", category: "Food & drink", amount: "-₹180", icon: "☕" },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#171717]">
      {/* Navigation */}
      <header className="border-b-2 border-black sticky top-0 z-10 bg-[#FAF9F6]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center border-2 border-black bg-[#FDE047] text-2xl font-black shadow-[3px_3px_0_#171717]">
              E
            </span>
            <span className="text-2xl font-black tracking-tight">
              ExpenXo<span className="text-[#2563EB]">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 font-semibold md:flex">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#how-it-works" className="hover:underline">How it works</a>
            <a href="#about" className="hover:underline">About</a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="border-2 border-black px-5 py-2.5 font-bold hover:bg-black hover:text-white"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="border-2 border-black bg-[#FDE047] px-5 py-2.5 font-bold shadow-[4px_4px_0_#171717] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Sign up free ↗
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="border-2 border-black px-3 py-2 font-bold md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>

        {menuOpen && (
          <div className="flex flex-col gap-4 border-t-2 border-black p-5 font-bold md:hidden">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="border-2 border-black bg-[#FDE047] p-3"
            >
              Sign up free ↗
            </Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-sm font-bold shadow-[3px_3px_0_#171717]">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            YOUR MONEY, YOUR RULES
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Know where your{" "}
            <span className="inline-block bg-[#FDE047] px-2">money</span>{" "}
            goes.
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-8 text-neutral-700">
            A simpler way to track expenses, manage budgets, and understand
            your spending. No messy spreadsheets. No unnecessary complexity.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="border-2 border-black bg-[#FDE047] px-6 py-4 font-extrabold shadow-[5px_5px_0_#171717] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Get started for free ↗
            </Link>
            <a
              href="#features"
              className="border-2 border-black bg-white px-6 py-4 font-bold hover:bg-neutral-100"
            >
              Explore features ↓
            </a>
          </div>

          <p className="mt-6 text-sm font-medium text-neutral-600">
            Free to get started. Built for everyday life.
          </p>
        </div>

        {/* Dashboard preview */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-3 -top-3 h-full w-full border-2 border-black bg-[#BFDBFE]" />

          <div className="relative border-2 border-black bg-white p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-neutral-500">YOUR OVERVIEW</p>
                <h2 className="mt-1 text-2xl font-black">Monthly snapshot</h2>
              </div>
              <span className="border-2 border-black bg-[#D9F99D] px-3 py-1 text-sm font-bold">
                Preview
              </span>
            </div>

            <div className="mt-7 border-2 border-black bg-[#FAF9F6] p-5">
              <p className="font-semibold text-neutral-600">Total expenses</p>
              <p className="mt-2 text-4xl font-black">₹18,450</p>
              <p className="mt-2 text-sm text-neutral-600">
                Sample data · Not your actual expenses
              </p>

              <div className="mt-6 flex h-28 items-end gap-3">
                {[42, 65, 48, 82, 58, 95, 68, 76, 45, 62, 85, 55].map(
                  (height, i) => (
                    <div
                      key={i}
                      className={`flex-1 border-2 border-black ${
                        i === 5 ? "bg-[#FDE047]" : "bg-[#93C5FD]"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>

              <div className="mt-2 flex justify-between text-xs font-bold text-neutral-500">
                <span>JAN</span>
                <span>DEC</span>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <h3 className="text-lg font-black">Recent expenses</h3>
              <span className="text-sm font-bold text-neutral-500">DEMO</span>
            </div>

            <div className="mt-3 divide-y-2 divide-neutral-200">
              {transactions.map((transaction) => (
                <div
                  key={transaction.name}
                  className="flex items-center justify-between gap-3 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center border-2 border-black bg-[#FAF9F6] text-xl">
                      {transaction.icon}
                    </span>
                    <div>
                      <p className="font-bold">{transaction.name}</p>
                      <p className="text-sm text-neutral-500">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <p className="font-extrabold">{transaction.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-6 border-y-2 border-black bg-[#FDE047]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-black uppercase tracking-widest">The essentials</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Less guessing. More clarity.
              </h2>
            </div>
            <p className="max-w-md leading-7">
              Your finances don't need another complicated tool. Just the
              features that help you stay on top of things.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_#171717] transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className={`grid h-14 w-14 place-items-center border-2 border-black text-3xl font-black ${feature.color}`}>
                    {feature.icon}
                  </span>
                  <span className="text-sm font-black">{feature.number}</span>
                </div>
                <h3 className="mt-7 text-2xl font-black">{feature.title}</h3>
                <p className="mt-3 leading-7 text-neutral-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-6 mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-24">
        <p className="font-black uppercase tracking-widest">Getting started</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
          Your money routine, made simpler.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            ["01", "Create your account", "Sign up and get your personal expense space ready."],
            ["02", "Add your expenses", "Record what you spend and organize it by category."],
            ["03", "Review your month", "Check your totals and make more informed decisions."],
          ].map(([number, title, description]) => (
            <div key={number} className="border-l-4 border-black pl-5">
              <p className="text-4xl font-black text-[#2563EB]">{number}</p>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-2 leading-7 text-neutral-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-6 border-y-2 border-black bg-[#BFDBFE]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-2 md:items-center md:px-10 md:py-20">
          <div>
            <p className="font-black uppercase tracking-widest">About ExpenXo</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Built for real life, not spreadsheets.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8">
              ExpenXo is a personal expense tracker focused on making everyday
              money management easier. Keep your expenses organized, understand
              your habits, and build a clearer picture of your finances.
            </p>
            <Link
              to="/register"
              className="mt-7 inline-block border-2 border-black bg-[#FDE047] px-6 py-4 font-extrabold shadow-[5px_5px_0_#171717] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Start tracking your expenses ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <Link to="/" className="text-xl font-black">
          ExpenXo<span className="text-[#2563EB]">.</span>
        </Link>
        <p className="text-sm text-neutral-600">
          A little more clarity, one expense at a time.
        </p>
        <p className="text-sm font-semibold">© {new Date().getFullYear()} ExpenXo</p>
      </footer>
    </main>
  );
}