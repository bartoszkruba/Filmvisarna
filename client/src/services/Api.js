import axios from 'axios';

const URL = window.location.protocol + "//" + window.location.host;

const api = axios.create({
	baseURL: `${URL}/api`
});

export default {

	addMovie(movie) {
		return api.post('addMovie', movie);
	},
	// Gets movies with matching query from DB
	// Example: getMovies({Title: 'Batman'}) - gets all movies with title "Batman"
	getMovies: (query) => {
		return api.post('movies', { query: query });

	}
}

