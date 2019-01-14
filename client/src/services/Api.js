import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8081/'
});

export default{
	getMovies: () => {
		return api.get('movies')
	},
	addMovie(movie){
		return api.post('addMovie', movie);
	},
	// Example:
	// registerUser({name: "John Doe", email: "john.doe@test.com", password:"password1234"})
	// should return "user registered" or "email already exist in database"
	registerUser: (user) => {
		return api.post('register', user);
	},

	loginUser: (user) => {
		return api.post('login', user);
	}
} 