// components/Navbar.tsx
"use client";
import Link from "next/link";
import useAuth from "../hooks/useAuth"; // Ensure this path is correct
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AUTH_ROUTES = [
  "/college",
  "/generator",
  "/teacher",
  "/subjects",
  "/view-routine",
];

const Navbar = () => {
  const { user, logout, isAuthenticatedUser } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const logoutCLick = () => {
    router.push("/");
    logout();
  };

  useEffect(() => {
    if (
      !isAuthenticatedUser &&
      pathname &&
      AUTH_ROUTES.some((route) => pathname.includes(route))
    ) {
      router.push("/");
    }
  }, [isAuthenticatedUser, pathname]);

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
                <a className="text-gray-300 hover:text-white">About</a>
              </Link>
            </li>
            {isAuthenticatedUser ? (
              <>
                <li>
                  <Link legacyBehavior href="/college">
                    <a className="text-gray-300 hover:text-white">College</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/view-routine">
                    <a className="text-gray-300 hover:text-white">View Routine</a>
                  </Link>
                </li>

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
