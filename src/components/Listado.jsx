import axios from "axios";
import swal from "sweetalert";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function Listado(props) {
  const { user, logOut } = useUserAuth();
  const [moviesList, setMoviesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=e79dfe9fcb65825a15e344de030f4422&language=es-ES$page=1";
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setMoviesList(apiData.results);
      })
      .catch(() => swal(<h2>Hubo errores, intenta mas tarde.</h2>));
  }, [setMoviesList]);

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
      {!user && <Navigate to="/listado" />}

      <div>
        <span>
          {user && user.email}
          <Button variant="primary" onClick={handleLogout}>
            Salir
          </Button>
        </span>
      </div>

      <div className="row">
        {moviesList.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="Imagen"
                />
                <button
                  className="btn-fav"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  ❤️
                </button>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">{oneMovie.overview}</p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Listado;
