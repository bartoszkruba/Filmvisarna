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
	}
} 
