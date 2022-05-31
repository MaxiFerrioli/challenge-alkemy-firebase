// import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Detalle() {
  // let token = sessionStorage.getItem("token");
  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=e79dfe9fcb65825a15e344de030f4422&language=es-ES`;
    axios //con axios al ir al detalle veo la info de cada pelicula que elijo.
      .get(endPoint)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => console.log(error));
  }, [movieID]);

  return (
    <>
      {/* {!token && <Navigate to="/" />} */}
      {!movie && <p>Cargando...</p>}
      {movie && (
        <>
          <div className="row">
            <div className="col-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="card-img-top"
                alt="Movie poster"
              />
            </div>
            <div className="col-8">
              <h2>Titulo: {movie.title}</h2>
              <h5>Resumen:</h5>
              <p>{movie.overview}</p>
              <h5>fecha de estreno: {movie.release_date}</h5>
              <h5>Rating: {movie.vote_average}</h5>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detalle;
