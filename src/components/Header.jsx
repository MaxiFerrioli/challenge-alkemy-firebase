import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";

// import Buscador from "./Buscador";

function Header(props) {
  const navigate = useNavigate();
  const { logOut, user } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/listado">Listado</Link>
            </li>
            <li>
              <Link to="/favoritos">Favs</Link>
            </li>
            <li>
              <span>
                {props.favorites.length > 0 && (
                  <>Cantidad en favs: {props.favorites.length}</>
                )}
              </span>
            </li>
            <li>
              <span>
                <div>
                  Hello Welcome <br />
                  {user && user.email}
                  <Button variant="primary" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              </span>
            </li>
          </ul>
          {/* <Buscador /> */}
        </nav>
      </header>
    </>
  );
}
export default Header;
