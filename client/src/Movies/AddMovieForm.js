import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const AddMovieForm = props => {
    
    console.log(props);

  const [movie, setMovie] = useState(initialMovie);

  const { movies } = props;


  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'metascore') {
      value = parseInt(value, 10);
    }
    if (e.target.name === 'stars') {
        value = value.split(",");
    }

    setMovie({
      ...movie,
      id:movies.length,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(movie);
    console.log(props);
    
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then(res => {
        props.updateMovies(res.data);
        console.log(res.data)
        console.log(props);
        props.history.push(`/`);
        setMovie(initialMovie);
      })
      .catch(err => console.log(err.response));
  };

  return (
      <form onSubmit={handleSubmit}>
       <h2>Add Movie</h2> 
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Actor 1, Actor 2, ..."
          value={movie.stars}
        />
        <div className="baseline" />

        <button>Update</button>
      </form>
  );
};

export default AddMovieForm;
