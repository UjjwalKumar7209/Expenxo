import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { clientApi, type User } from "../api";
export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    clientApi.me().then(({ user: current }) => setUser(current));
  }, []);
  const logout = async () => {
    await clientApi.logout();
    navigate("/login", { replace: true });
  };
  return (
    <div className="max-w-2xl space-y-7">
      <p className="text-neutral-600">
        Your account details and session controls.
      </p>
      <section className="border-2 border-black bg-white p-6 shadow-[4px_4px_0_#171717]">
        <p className="text-xs font-black tracking-widest text-neutral-500">
          PROFILE
        </p>
        <div className="mt-5 flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center border-2 border-black bg-[#BFDBFE] text-3xl font-black">
            {user?.name.charAt(0).toUpperCase() || "?"}
          </div>
          <div>
            <h2 className="text-2xl font-black">
              {user?.name || "Loading..."}
            </h2>
            <p className="text-neutral-600">{user?.email}</p>
          </div>
        </div>
      </section>
      <section className="border-2 border-black bg-[#FECACA] p-6 shadow-[4px_4px_0_#171717]">
        <h2 className="text-xl font-black">Session</h2>
        <p className="mt-2 text-sm">
          Sign out of this Expenxo session on this device.
        </p>
        <button
          onClick={logout}
          className="mt-5 border-2 border-black bg-white px-5 py-3 font-black hover:bg-black hover:text-white"
        >
          Log out ↗
        </button>
      </section>
    </div>
  );
}
