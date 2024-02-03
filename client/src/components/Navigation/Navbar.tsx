// components/Navbar.tsx
"use client";
import Link from "next/link";
import useAuth from "../hooks/useAuth"; // Ensure this path is correct
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout, isAuthenticatedUser } = useAuth();

  console.log({ isAuthenticatedUser });

  const router = useRouter();

  const logoutCLick = () => {
    router.push("/");
    logout();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold">
          <Link legacyBehavior href="/">
            Automatic Routine Generator
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link legacyBehavior href="/about">
                About
              </Link>
            </li>
            {isAuthenticatedUser ? (
              <>
                <li>
                  <Link legacyBehavior href="/generator">
                    <a className="text-gray-300 hover:text-white">Generator</a>
                  </Link>
                </li>

                <li>
                  <Link legacyBehavior href="/teachers">
                    <a className="text-gray-300 hover:text-white">Teachers</a>
                  </Link>
                </li>

                <li>
                  <Link legacyBehavior href="/subjects">
                    <a className="text-gray-300 hover:text-white">Subjects</a>
                  </Link>
                </li>

                <li>
                  <button
                    onClick={logoutCLick}
                    className="text-gray-300 hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link legacyBehavior href="/contact">
                    <a className="text-gray-300 hover:text-white">Contact</a>
                  </Link>
                </li>

                <li>
                  <Link legacyBehavior href="/login">
                    <a className="text-gray-300 hover:text-white">Login</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/register">
                    <a className="text-gray-300 hover:text-white">Register</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
