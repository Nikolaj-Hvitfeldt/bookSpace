import { Link, NavLink, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          Address Book
        </Link>
        <nav className="main-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
