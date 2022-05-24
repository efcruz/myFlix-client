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

import { setUser, updateUser } from "../../actions/actions";

import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            favoriteMovies: []
        };
        this.removeFav = this.removeFav.bind(this);
        this.getUser = this.getUser.bind(this);  
    }

    getUser(token) {
        let user = localStorage.getItem("user");
        axios.get(`https://my-flix-movie-app.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
            this.props.setUser({
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
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
           
            this.props.updateUser({
                username: response.data.Username,
                password: response.data.Password,
                email: response.data.Email,
                birthday: response.data.Birthday,
            });
            localStorage.setItem("user", response.data.username);
            alert("Profile updadted sucessfully");
        })
        .catch((e) => {
            console.log(e)
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
            window.open('/', '_self');
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
        const { movies } = this.props;
        const { favoriteMovies, name, password, email, birthday } = this.props.user || [];
      

        if (!username) {
            return null;
        }
        return (
            <Container>
                <Row className='profile-view-container'>

                    <Col xs={12}> <span className="label"><h1>Profile</h1></span></Col>
                    <hr></hr>
                    
                    <Col className="details-box">
                        <div>
                           <p><span className="label">Username:</span> {this.state.username}</p>
                            <p><span className="label">Email:</span> {this.state.email}</p>
                        </div>
                        <div>
                        <Button
                              style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '2'
                                  
                                }}
                        >
                            Back
                        </Button>
                        </div>
                    </Col>
                    <Col className="form-box">
                    <Form>
                        <p className="label">Update your profile</p>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label> Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    
                                    required
                                    
                                    onChange={(e) => this.setUsername(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                   
                                   
                                    onChange={(e) => this.setPassword(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                 
                                    
                                    onChange={(e) => this.setEmail(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                  
                                   
                                    onChange={(e) => this.setBirthday(e.target.value)}
                                />
                        </Form.Group>
                        </Form>
                     
                            <Button
                            
                                className="btn-primary"
                                variant="primary"
                                type="submit"
                                onClick={this.editProfile}
                            >
                                Update
                            </Button>
                  
                        
                       
                        </Col>
                        <Col className="delete-button-box">
                        <Button
                        style={{
                            position: 'absolute',
                            to: '0',
                            right: '0'
                              
                            }}
                       
                                className="btn-danger"
                                variant="danger"
                                type="submit"
                                onClick={this.deleteProfile}
                            >
                                Delete Profile
                            </Button>
                            </Col>
                        
                </Row>
                <br></br>
                <br></br>
                <p className="label" >Your favorite movies</p>
               
                <Card className="favorites-container">
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
                        <Row className="favorites-cards-container">
                        {favoriteMovies.length > 0 &&
                            movies.map((movie) => {
                            if (
                                movie._id ===
                                favoriteMovies.find((fav) => fav === movie._id)
                            ) {
                                return (
                                
                                <Card className="profile-favorite-card" key={movie._id}>
                                    <Card.Img 
                                        className="favorite-card-poster"
                                        variant="top" 
                                        src={movie.ImagePath} 
                                        crossOrigin="anonymous"
                                    />
                                    
                                    <Card.Body className="favorites-card-body">
                                        <Card.Title>
                                            {movie.Title}
                                        </Card.Title>
                                        <Button
                                            variant="primary"
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