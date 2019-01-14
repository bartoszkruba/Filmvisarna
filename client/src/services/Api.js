import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8081/'
});

export default{

	addMovie(movie){
		return api.post('addMovie', movie);
	},

	}, 
	// Gets movies with matching query from DB
	// Example: getMovies({Title: 'Batman'}) - gets all movies with title "Batman"
	getMovies: (query) => {
		return api.post('movies', {query: query});
	}

} 

