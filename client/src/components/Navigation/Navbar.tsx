// components/Navbar.tsx
'use client';
import Link from 'next/link';
import useAuth from '../hooks/useAuth'; // Ensure this path is correct

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold">
          <Link legacyBehavior href="/">
            <a>Automatic Routine Generator</a>
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link legacyBehavior href="/about">
                <a className="text-gray-300 hover:text-white">About</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/generator">
                <a className="text-gray-300 hover:text-white">Generator</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/contact">
                <a className="text-gray-300 hover:text-white">Contact</a>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <span className="text-gray-300 hover:text-white">{user.name}</span>
                </li>
                <li>
                  <button onClick={logout} className="text-gray-300 hover:text-white">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
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