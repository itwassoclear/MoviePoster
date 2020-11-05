import React, { useState, useEffect } from "react";
import "../../theme/init.css";
import { getStyles } from "../../helpers";
import { api } from "../../API";

export const Kinoafisha = () => {
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  const [movies, setMovies] = useState([]);

  const _updateMoviesByFilter = (event) => {
    const nextFilter = event.currentTarget.dataset.name;
    // const nextFilter = event.currentTarget.dataset.eng;
    setSelectedFilter(nextFilter);
  };
  const _getMoviesByFilter = async (nextFilter) => {
    const newMovies = await api.getMovies(nextFilter);
    setMovies(newMovies);
  };

  useEffect(() => {
    _getMoviesByFilter(selectedFilter);
  }, [selectedFilter]);

  const styles = getStyles({
    selectedFilter,
  });

  //   console.log(movies);

  const moviesJSX = movies.map((movie, index) => {
    return (
      <div className="movie" key={index}>
        <div className="poster">
          <span className="genre">{movie.genre}</span>
          <img alt={movie.title} src={movie.poster} />
          <span className="raiting">{movie.raiting}</span>
        </div>
        <span className="title">{movie.title}</span>
      </div>
    );
  });

  return (
    <>
      <div className="header">
        <div className="logo"></div>
        <div className="filters">
          <div
            className={styles.latestFilter}
            data-name="latest"
            data-lang="eng"
            onClick={_updateMoviesByFilter}
          >
            <span>Новинки {new Date().getFullYear()}</span>
          </div>
          <div
            className={styles.upcomingFilter}
            data-name="upcoming"
            data-lang="eng"
            onClick={_updateMoviesByFilter}
          >
            <span>Скоро в кинотеатрах</span>
          </div>
          <div
            className={styles.popularFilter}
            data-name="popular"
            data-lang="eng"
            onClick={_updateMoviesByFilter}
          >
            <span>В топ-чартах</span>
          </div>
        </div>
      </div>
      <div className="content">{moviesJSX}</div>
    </>
  );
};
