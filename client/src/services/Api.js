import axios from 'axios';

const URL = window.location.protocol + "//" + window.location.host;

const api = axios.create({
	baseURL: `${URL}/api`
});

export default {

	addMovie(request) {
		return api.post('addMovie', request);
	},
	// Gets movies with matching query from DB
	// Example: getMovies({title: 'Batman'}) - gets all movies with title "Batman"
	getMovies: (query) => {
		return api.post('movies', { query: query });
	},

	searchMovies: (query) => {
		return api.post('searchMovies', {query: query});
	},

	getTheatres: (query) => {
		return api.post('movieTheatres', {query: query});
	},

	getMovieSessions: (query) => {
		return api.post('movieSessions', {query: query});
	},

	addMovieSession: (movieSession) => {
		return api.post('addMovieSession', {movieSession: movieSession});
	},

	// Example:
	// registerUser({name: "John Doe", email: "john.doe@test.com", password:"password1234"})
	// should return "user registered" or "email already exist in database"
	registerUser: (user) => {
		return api.post('register', user);
	},

	loginUser: (user) => {
		return api.post('login', user);
	},

	getTickets: (user) => {
		return api.post('getTickets', { user });
	},

	setTickets: (ticket,user) => {
		return api.post('setTickets', {ticket, user });
	},

	uploadImage: (images, uploadHandler) => {
		return api.post('uploadimage', images, uploadHandler)
	},
	url: URL + '/api'
} 