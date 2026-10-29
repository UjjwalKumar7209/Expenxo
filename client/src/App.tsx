import "./index.css"
import { useState } from "react";
import { Link, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <main className="grid min-h-screen place-items-center bg-[#FAF9F6] p-6 text-center">
            <div>
              <h1 className="text-6xl font-black">404</h1>
              <p className="mt-3">This page doesn't exist.</p>
              <Link to="/" className="mt-6 inline-block font-bold underline">
                Return home
              </Link>
            </div>
          </main>
        }
      />
    </Routes>
  );
}
