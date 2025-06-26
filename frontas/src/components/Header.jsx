import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

function Header() {
  const { logout, isAuthenticated, user } = useAuth();

  const isAdmin =
    user?.roles?.some((role) => role?.name === "ROLE_ADMIN") || false;

  const getNavLinkClass = (isActive) =>
    isActive ? "underline font-semibold" : "hover:underline";

  return (
    <header className="p-4 bg-orange-300 flex items-center">
      {isAuthenticated && (
        <nav className="flex-1 flex justify-center gap-6">
          <NavLink
            to="/services"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Servisai
          </NavLink>
          <NavLink
            to="/mechanics"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Mechanikai
          </NavLink>

          {user && isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              Admin
            </NavLink>
          )}
        </nav>
      )}

      <div className="flex-shrink-0">
        <button
          onClick={logout}
          className="text-red-500 cursor-pointer hover:text-red-300"
        >
          Atsijungti
        </button>
      </div>
    </header>
  );
}
export default Header;
