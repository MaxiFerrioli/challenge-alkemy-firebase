import { Link, Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function Favoritos(props) {
  // let token = sessionStorage.getItem("token");
  const { user } = useUserAuth();

  return (
    <>
      {!user && <Navigate to="/" />}
      <h2>Tus favoritos</h2>
      {!props.favorites.length && (
        <div className="text-danger col-12">
          El almacenamiento de favoritos esta vacio!
        </div>
      )}
      <div className="row">
        {props.favorites.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card">
                <img
                  src={oneMovie.imgURL}
                  className="card-img-top"
                  alt="Imagen"
                />
                <button
                  className="btn-fav"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  💔
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

export default Favoritos;
