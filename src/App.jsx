//Libraries
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

//Components
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Login from "./components/Login";
import Listado from "./components/Listado";
import Detalle from "./components/Detalle";
import Favoritos from "./components/Favoritos";

//Styles
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    // console.log(favsInLocal);
    if (favsInLocal != null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  const favMovies = localStorage.getItem("favs");
  let tempMoviesInFavs;
  if (favMovies === null) {
    tempMoviesInFavs = [];
  } else {
    tempMoviesInFavs = JSON.parse(favMovies);
  }

  console.log(tempMoviesInFavs);

  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId,
    };
    let movieIsInArray = tempMoviesInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log("Se agrego la peli");
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });

      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log("Se elimino la peli");
    }
  };

  return (
    <UserAuthContextProvider>
      <Header favorites={favorites} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/favoritos"
          element={
            <Favoritos
              favorites={favorites}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />
          }
        />
        <Route path="/detalle" element={<Detalle />} />

        <Route
          path="/listado"
          element={
            <ProtectedRoute>
              <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />
            </ProtectedRoute>
          }
        />
        {/* <Route
                path="/resultados"
                element={
                  <Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} />
                }
              /> */}
      </Routes>
      <Footer />
    </UserAuthContextProvider>
  );
}

export default App;
