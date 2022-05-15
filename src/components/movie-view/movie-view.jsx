import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { Link, Image } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };

    this.addFav = this.addFav.bind(this);
    this.removeFav = this.removeFav.bind(this);

  }

  getUser(token) {
    let user = localStorage.getItem("user");

    axios.get(`https://my-flix-movie-app.herokuapp.com/users/${user}`,{
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        birthday: response.data.birthday,
        favoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch((e) => {
      console.log(e)
    });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  //add favorite
  addFav() {
    {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const id = this.props.movie._id;

      //prevent adding duplicate movies
      let userFavorites = this.state.favoriteMovies;
      let isFav = userFavorites.includes(id);

      if (!isFav) {
     
        axios.post(`https://my-flix-movie-app.herokuapp.com/users/${user}/movies/${id}`, 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          console.log(response);
          debugger;
          this.setState({
            favoriteMovies: response.data.FavoriteMovies
          });
        })
        .catch((e) => {
          console.log(e)
        });
        
      } else if (isFav) {
        alert(
          `${this.props.movie.Title} is already in your list of favorite movies!`
        );
      }
    }
  }

  removeFav() {
    {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const id = this.props.movie._id;

      axios.delete(`https://my-flix-movie-app.herokuapp.com/users/${user}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        console.log(response);
        this.setState({
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch((e) => {
        console.log(e)
      });
    }
  }
  
  render() {
    const { movie, onBackClick } = this.props;
    const { favoriteMovies, username, password, email, birthday } = this.state;
    let movieId = this.props.movie._id;
    let userFav = this.state.favoriteMovies;
    let isFav = userFav.includes(movieId);
    
    return (
      <Container>
        <Row className='movie-view-container'>
          <Col className='movie-view-poster-container'>
          
              <img
                className="movie-view-poster"
                src={movie.ImagePath}
                crossOrigin="anonymous"
              />
          </Col>

          <Col md={8} className='movie-view-text-container'>
              <div className='movie-title'>
                  <span className="label"><h1>{movie.Title}</h1></span>
                  <Button  variant='outline' type="button"
                        onClick={isFav? this.removeFav: this.addFav}
                      >
                        {isFav? <h2><StarFill  /></h2> : <h2><Star  /></h2>}
                  </Button>
              </div>
              <hr></hr>
              <div className='movie-description'>
                <div>
                  <span className="label">Description: </span>
                  <br></br>
                  <span className="value">{movie.Description}</span>
                  <br></br>
                  <span className="label">Genre: </span>
                  <Link className="value-link" to={`/genre/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
                  <br></br>
                  <span className="label">Director: </span>
                  <Link className="value-link" to={`/director/${movie.Director.Name}`} >{movie.Director.Name}</Link>
                </div>
                <div>
                  <Button
                    style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '2'
                      
                    }}
                    className="btn-primary"
                    variant="primary"
                    onClick={() => {
                      onBackClick();
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
          </Col>
        </Row>  
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,

    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,

    Featured: PropTypes.bool,

    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }),
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};