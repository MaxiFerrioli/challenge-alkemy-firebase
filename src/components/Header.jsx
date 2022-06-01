// import Buscador from "./Buscador";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <>
      <header>
        <nav className="nav-container">
          <ul className="ul-container">
            <li>
              <Link to="/">LOGO</Link>
            </li>
            <ul className="ul-links">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/listado">Peliculas</Link>
              </li>
              <li>
                <Link to="/favoritos">
                  <i className="fa-solid fa-heart"></i>
                </Link>
                <span>
                  {props.favorites.length > 0 && <>{props.favorites.length}</>}
                </span>
              </li>
            </ul>
          </ul>
          {/* <Buscador /> */}
        </nav>
      </header>
    </>
  );
}
export default Header;
