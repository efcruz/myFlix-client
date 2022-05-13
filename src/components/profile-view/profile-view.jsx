import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Card,
  Form,
  FormGroup,
  Col,
  Row,
  Container,
  FormControl,
  Button,
} from "react-bootstrap";

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: []
        };
        this.removeFav = this.removeFav.bind(this);   
    }

    getUser(token) {
        let user = localStorage.getItem("user");
        axios.get(`https://my-flix-movie-app.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
            this.setState({
                username: response.data.Username,
                password: response.data.Password,
                email: response.data.Email,
                birthday: response.data.Birthday,
                favoriteMovies: response.data.FavoriteMovies,
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

    editProfile = (e) => {
        e.preventDefault();
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.put(`https://my-flix-movie-app.herokuapp.com/users/${user}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
                birthday: response.data.birthday,
            });
            localStorage.setItem("user", this.state.username);
            alert("Profile updadted sucessfully");
            window.open("/profile", "_self");
        });
    }

    deleteProfile() {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.delete(`https://my-flix-movie-app.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
            console.log(response);
            alert('Profile deleted');
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        })
        .catch((e) => {
            console.log(e)
        });
    }

    setUsername(value) {
        this.setState({
          username: value,
        });
    }
    setPassword(value) {
        this.setState({
          password: value,
        });
    }
    setEmail(value) {
        this.setState({
          email: value,
        });
    }
    setBirthday(value) {
        this.setState({
          birthday: value,
        });
    }

    removeFav(movie) {
        this.removeRemoteMovie(movie)
    }

    updateLocalMovies(movies) {
        this.setState({
            favoriteMovies: movies   
        })
    }

    removeRemoteMovie(movie) {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        axios.delete(`https://my-flix-movie-app.herokuapp.com/users/${user}/movies/${movie._id}`,
        
        { headers: { Authorization: `Bearer ${token}` } }
        )
        .then ((response) => {
            console.log(response);
            this.updateLocalMovies(response.data.FavoriteMovies)
        })
        .catch((e) => {
            console.log(e)
        });
    }
        
    render() {
        const { movies, onBackClick } = this.props;
        const { favoriteMovies, username, password, email, birthday } = this.state;
      

        if (!username) {
            return null;
        }
        return (
            <Container>
                <Row>
                    <Col>Profile</Col>
                    <Col>
                    <p>Username: {this.state.username}</p>
                    <p>Email: {this.state.email}</p>
                    </Col>
                    <Form>
                        <p>Update your prfile</p>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label> Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    
                                    required
                                    
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                   
                                   
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                 
                                    
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                  
                                   
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                        </Form.Group>

                        <Button
                            className="btn-primary"
                            variant="primary"
                            type="submit"
                            onClick={this.editProfile}
                        >
                            Update Profile
                        </Button>
                        <Button
                            className="btn-primary"
                            variant="primary"
                            type="submit"
                            onClick={this.deleteProfile}
                        >
                            Delete Profile
                        </Button>
                        <Button
                            style={{
                                marginLeft: '0px',
                                marginBottom: '0px',
                                marginTop: '30px',
                            }}
                            className="btn-primary"
                            variant="primary"
                            onClick={() => {
                                onBackClick();
                            }}
                        >
                            Back
                        </Button>
                        </Form>
                </Row>
               
                <Card>
                    <Card.Body>
                        {favoriteMovies.length === 0 && (
                        <div className="titles h1 text-center">
                            <h1>There's no movies in your list of favorites!</h1>
                            <p className="h5">
                            Head over to the{" "}
                            <Link to={`/`}>
                                <Button className="custom-btn" type="submit">
                                List of movies
                                </Button>
                            </Link>{" "}
                            to add some
                            </p>
                        </div>
                        )}
                        <Row className="favorite-movies d-flex justify-content-around">
                        {favoriteMovies.length > 0 &&
                            movies.map((movie) => {
                            if (
                                movie._id ===
                                favoriteMovies.find((fav) => fav === movie._id)
                            ) {
                                return (
                                <Card className="favorite-movie m-2" key={movie._id}>
                                    <Card.Img src={movie.ImagePath} crossOrigin="anonymous"/>
                                    <Card.Body>
                                    <Card.Title className="h1 titles">
                                        {movie.Title}
                                    </Card.Title>
                                    <Button
                                        className="custom-btn"
                                        onClick={()=>this.removeFav(movie)}
                                    >
                                        Remove from List
                                    </Button>
                                    </Card.Body>
                                </Card>
                                );
                            }
                            })}
                        </Row>
                    </Card.Body>
                </Card>
                
            </Container>
        )
    }
}