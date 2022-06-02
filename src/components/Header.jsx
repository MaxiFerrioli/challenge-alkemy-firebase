// import Buscador from "./Buscador";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <>
      <div className="nav-container">
        <ul className="ul-container">
          <li className="logo">
            <Link to="/">Pelis.com</Link>
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
      </div>
    </>
  );
}
export default Header;
