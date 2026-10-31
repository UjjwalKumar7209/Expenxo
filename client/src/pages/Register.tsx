import { useState, useCallback } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Notification from "../components/Notification";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);

    try {
      const config = await axios.get("/config");

      const response = await axios.post(
        `${config.data.BACKEND_URL}/api/v1/register`,
        data,
        { withCredentials: true }
      );

      console.log(response.data);

      sessionStorage.setItem(
        "auth-notification",
        JSON.stringify({
          type: "success",
          message: "Your account has been created. Please log in.",
        })
      );

      navigate("/login");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.msg
        : undefined;

      setNotification({
        type: "error",
        message:
          typeof message === "string"
            ? message
            : "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#171717]">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={dismissNotification}
        />
      )}

      <nav className="sticky top-0 z-10 border-b-2 border-black bg-[#FAF9F6] px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center border-2 border-black bg-[#FDE047] text-2xl font-black shadow-[3px_3px_0_#171717]">
              E
            </span>
            <span className="text-2xl font-black tracking-tight">
              ExpenXo<span className="text-[#2563EB]">.</span>
            </span>
          </Link>

          <Link
            to="/login"
            className="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-[#FDE047]"
          >
            Log in
          </Link>
        </div>
      </nav>

      <section className="flex min-h-[calc(100vh-81px)] items-center justify-center px-5 py-14">
        <div className="relative w-full max-w-md">
          <div className="absolute -right-3 -top-3 h-full w-full border-2 border-black bg-[#D9F99D]" />

          <div className="relative border-2 border-black bg-white p-7 shadow-[5px_5px_0_#171717] sm:p-10">
            <div className="mb-8">
              <span className="inline-block border-2 border-black bg-[#FDE047] px-3 py-1 text-xs font-black tracking-widest">
                GET STARTED FREE
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                Take control of
                <br />
                your money<span className="text-[#2563EB]">.</span>
              </h1>

              <p className="mt-3 leading-7 text-neutral-600">
                Create your account and start understanding where your money
                goes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block font-bold">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  required
                  value={data.name}
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  }
                  className="w-full border-2 border-black bg-[#FAF9F6] px-4 py-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block font-bold">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                  className="w-full border-2 border-black bg-[#FAF9F6] px-4 py-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block font-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  required
                  minLength={8}
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full border-2 border-black bg-[#FAF9F6] px-4 py-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#2563EB]"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  Use at least 8 characters.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 border-2 border-black bg-[#FDE047] px-5 py-3.5 font-black shadow-[4px_4px_0_#171717] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create my account ↗"}
              </button>
            </form>

            <div className="my-7 border-t-2 border-dashed border-neutral-300" />

            <p className="text-center text-sm font-medium text-neutral-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-black text-[#2563EB] underline underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}