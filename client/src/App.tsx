import "./index.css";
import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { clientApi, type User } from "./api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";

const navItems: Array<[string, string, string]> = [
  ["/app", "Dashboard", "▦"],
  ["/app/transactions", "Transactions", "↗"],
  ["/app/categories", "Categories", "◈"],
  ["/app/analytics", "Analytics", "▥"],
  ["/app/settings", "Settings", "⚙"],
];

function ProtectedRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    clientApi
      .me()
      .then(({ user: nextUser }) => setUser(nextUser))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <main className="grid min-h-screen place-items-center bg-[#FAF9F6] font-black">
        Loading your workspace...
      </main>
    );
  return user ? <AppShell user={user} /> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    clientApi
      .me()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);
  if (authenticated === null)
    return (
      <main className="grid min-h-screen place-items-center bg-[#FAF9F6] font-black">
        Loading...
      </main>
    );
  return authenticated ? <Navigate to="/app" replace /> : children;
}

function AppShell({ user }: { user: User }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const current = navItems.find(([path]) => path === location.pathname);
  const title = current?.[1] ?? "Dashboard";
  const logout = async () => {
    try {
      await clientApi.logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171717] lg:flex">
      <aside
        className={`${menuOpen ? "block" : "hidden"} fixed inset-0 z-30 bg-[#FDE047] p-6 lg:relative lg:block lg:w-72 lg:shrink-0 lg:border-r-2 lg:border-black lg:p-8`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/app"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <span className="grid h-10 w-10 place-items-center border-2 border-black bg-white text-2xl font-black shadow-[3px_3px_0_#171717]">
              E
            </span>
            <span className="text-2xl font-black">
              ExpenXo<span className="text-[#2563EB]">.</span>
            </span>
          </Link>
          <button
            className="border-2 border-black bg-white px-3 py-2 font-black lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
        </div>
        <p className="mt-14 text-xs font-black tracking-[0.2em]">
          YOUR WORKSPACE
        </p>
        <nav className="mt-4 flex flex-col gap-2">
          {navItems.map(([path, label, icon]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 border-2 border-black px-4 py-3 font-black ${location.pathname === path ? "bg-white shadow-[3px_3px_0_#171717]" : "hover:bg-white/70"}`}
            >
              <span className="w-5 text-center text-lg">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-8 left-6 right-6 border-t-2 border-black pt-5 lg:left-8 lg:right-8">
          <p className="truncate font-black">{user.name}</p>
          <p className="truncate text-sm">{user.email}</p>
          <button
            onClick={logout}
            className="mt-4 font-black text-[#2563EB] underline underline-offset-4"
          >
            Log out ↗
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-black bg-[#FAF9F6] px-5 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="border-2 border-black bg-white px-3 py-2 font-black lg:hidden"
            >
              Menu
            </button>
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-neutral-500">
                EXPENXO / {String(title).toUpperCase()}
              </p>
              <h1 className="text-2xl font-black md:text-3xl">{title}</h1>
            </div>
          </div>
          <Link
            to="/app/settings"
            className="grid h-11 w-11 place-items-center border-2 border-black bg-[#BFDBFE] text-lg font-black"
          >
            {user.name.charAt(0).toUpperCase()}
          </Link>
        </header>
        <main className="mx-auto max-w-7xl p-5 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/app" element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="categories" element={<Categories />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
