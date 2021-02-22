// @refresh reset
import { useLocation, Link } from "react-router-dom"

function Header() {

  const location= useLocation()

  return (
    <nav className="navbar">
      <h1>
        <Link to="/books" className="navbar__brand">
          Book Store
        </Link>
      </h1>
      <ul className="nav__links">
        {location.pathname !== "/create" && (
          <li className="nav__item">
            <Link to="/create" className="nav__link">
              Add Book
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Header
