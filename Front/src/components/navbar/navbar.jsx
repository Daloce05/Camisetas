
import Cart from "./modalcart"
import AuthButtons from "./AuthButtons"
import UserDropDown from "./UserDropDown"
import { useState } from "react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header>
      <nav className="navbar bg-base-100 shadow-sm lg:rounded-box w-full flex flex-row items-center">
        <div className="navbar-start flex items-center gap-2">
          {/* Hamburger for mobile */}
          <button className="lg:hidden btn btn-square btn-ghost" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a className="btn btn-ghost text-xl" href="/"> CAMISETAS</a>
        </div>

        {/* Desktop buttons */}
        <div className="navbar-end gap-3 hidden lg:flex items-center">
          <a className="btn btn-primary">dashboard</a>
          <Cart />
          <AuthButtons />
          <UserDropDown />
        </div>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden" onClick={() => setMenuOpen(false)}></div>
        )}
        {/* Mobile menu */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg z-50 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 lg:hidden flex flex-col`}>
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-bold">Camisetas</span>
            <button className="btn btn-ghost" onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <a className="btn btn-primary" href="/admin" onClick={() => setMenuOpen(false)}>dashboard</a>
            <Cart />
            <AuthButtons />
            <UserDropDown />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;