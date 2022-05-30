import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function Listado(props) {
  // useEffect(() => {
  //   if (token === null) {
  //     return navigate("/");
  //   }
  // or
  //   {
  //     !token && navigate("/");
  //   }
  // }, []);
  // let token = sessionStorage.getItem("token");
  const [moviesList, setMoviesList] = useState([]);
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

  return (
    <>
      {/* {!token && <Navigate to="/" />} */}

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
