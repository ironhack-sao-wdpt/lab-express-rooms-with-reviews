import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          IronRooms
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={(isActive) => `nav-link ${isActive ? "active" : ""}`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) => `nav-link ${isActive ? "active" : ""}`}
                to="/room-create"
              >
                New Room
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) => `nav-link ${isActive ? "active" : ""}`}
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) => `nav-link ${isActive ? "active" : ""}`}
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
