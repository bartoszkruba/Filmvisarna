<template>
  <div class="bg">
    <div v-if="this.$store.state.loggedInUser.admin">
      <b-jumbotron class="jumbotron">
        <h1>Admin Sida</h1>
      </b-jumbotron>
      <h2 class="text-center">Add Movie</h2>
      <form class="container mb-5">
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <div class="alert alert-success m-auto" role="alert" v-if="message">{{message}}</div>
            <div class="alert alert-danger m-auto" role="alert" v-if="error">{{error}}</div>
          </div>
          <div class="col-sm-1"></div>
        </div>
        <div class="form-group p-3">
          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <label for="Title">Title:</label>
              <input
                type="text"
                class="form-control"
                id="Title"
                placeholder="Title"
                v-model="title"
              >
            </div>
            <div class="col-sm-5">
              <label for="ProductionYear">Production Year:</label>
              <input
                type="number"
                class="form-control"
                id="ProductionYear"
                placeholder="Year"
                v-model="productionYear"
              >
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <label for="Length">Length (minutes):</label>
              <input
                type="number"
                class="form-control"
                id="Length"
                placeholder="Length"
                v-model="length"
              >
            </div>
            <div class="col-sm-5">
              <label for="Genre">Genre:</label>
              <input
                type="text"
                class="form-control"
                id="Genre"
                placeholder="Genre"
                v-model="genre"
              >
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <label for="Distributor">Distributor:</label>
              <input
                type="text"
                class="form-control"
                id="Distributor"
                placeholder="Distributor"
                v-model="distributor"
              >
            </div>
            <div class="col-sm-5">
              <label for="Language">Language:</label>
              <input
                type="text"
                class="form-control"
                id="Language"
                placeholder="Language"
                v-model="language"
              >
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <label for="Subtitles">Subtitles:</label>
              <input
                type="text"
                class="form-control"
                id="Subtitles"
                placeholder="Subtitles"
                v-model="subtitles"
              >
            </div>
            <div class="col-sm-5">
              <label for="Director">Director:</label>
              <input
                type="text"
                class="form-control"
                id="Director"
                placeholder="Director"
                v-model="director"
              >
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <label for="AgeLimit">Age Limit:</label>
              <input
                type="number"
                class="form-control"
                id="AgeLimit"
                placeholder="Age Limit"
                v-model="ageLimit"
              >
            </div>
            <div class="col-sm-5"></div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <label for="PosterImage">Poster Image</label>
              <input
                type="file"
                class="form-control-file"
                id="PosterImage"
                @change="posterImageChanged"
              >
            </div>
            <div class="col-sm-5">
              <label for="BackgroundImage">Background Image</label>
              <input
                type="file"
                class="form-control-file"
                id="BackgroundImage"
                @change="backgroundImageChanged"
              >
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <label for="Actors">Actors:</label>
              <ul class="list-group mb-3" v-for="actor in actors">
                <li class="list-group-item d-flex justify-content-between pr-1">
                  <span>{{actor}}</span>
                  <button class="btn btn-sm btn-danger" @click="removeActor(actor)">X</button>
                </li>
              </ul>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="Actor"
                  placeholder="Add Actor"
                  v-model="actor"
                >
                <div class="input-group-prepend">
                  <button class="btn btn-outline-danger" @click="addActor">Add</button>
                </div>
              </div>
            </div>
            <div class="col-sm-5">
              <label for="ProductionCountries">Production Countries:</label>
              <ul class="list-group mb-3" v-for="country in productionCountries">
                <li class="list-group-item d-flex justify-content-between pr-1">
                  <span>{{country}}</span>
                  <button class="btn btn-sm btn-danger" @click="removeCountry(country)">X</button>
                </li>
              </ul>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="ProductionCountry"
                  placeholder="Add Country"
                  v-model="country"
                >
                <div class="input-group-prepend">
                  <button class="btn btn-outline-danger" @click="addCountry">Add</button>
                </div>
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-5"></div>
            <div class="col-sm-5">
              <label for="Trailers">Trailers:</label>
              <ul class="list-group mb-3" v-for="id in trailers">
                <li class="list-group-item d-flex justify-content-between pr-1">
                  <span class>{{id}}</span>
                  <button class="btn btn-sm btn-danger" @click="removeTrailer(id)">X</button>
                </li>
              </ul>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="YoutubeID"
                  placeholder="Add Youtube ID"
                  v-model="youtubeID"
                >
                <div class="input-group-prepend">
                  <button class="btn btn-outline-danger" @click="addTrailer">Add</button>
                </div>
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
              <label for="Description">Description:</label>
              <textarea class="form-control" rows="5" id="Description" v-model="description"></textarea>
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
              <label for="Reviews">Reviews:</label>
              <div class="list-group" v-for="review in reviews">
                <a class="list-group-item list-group-item-action flex-column align-items-start">
                  <button
                    class="btn btn-sm btn-danger review-button float-right"
                    @click="removeReview(review)"
                  >X</button>
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{review.source}}</h5>
                  </div>
                  <p class="mb-1 d-flex w-100 justify-content-between">"{{review.quote}}"</p>
                  <small
                    class="d-flex w-100 justify-content-between"
                  >{{review.stars}}/{{review.max}} Stars</small>
                </a>
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <label for="Source">Source:</label>
              <input
                type="text"
                class="form-control"
                id="source"
                placeholder="Source"
                v-model="source"
              >
            </div>
            <div class="col-sm-5">
              <label for="Stars">Stars:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id>Given/Max</span>
                </div>
                <input type="number" class="form-control" v-model="stars">
                <input type="number" class="form-control" v-model="max">
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
              <label for="Quote">Quote:</label>
              <textarea class="form-control" rows="5" id="Quote" v-model="quote"></textarea>
              <button class="btn btn-danger mt-2" @click="addReview">Add Review</button>
            </div>
            <div class="col-sm-1"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <button
              type="submit"
              class="btn btn-danger btn-lg btn-block"
              @click="addMovie"
            >Add Movie</button>
          </div>
          <div class="col-sm-1"></div>
        </div>
      </form>

      <br>
      <hr>
      <h2 class="text-center">Add Movie Session</h2>

      <form class="container mb-5">
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <div
              class="alert alert-success m-auto text-center"
              role="alert"
              v-if="sessionMessage"
            >{{sessionMessage}}</div>
            <div
              class="alert alert-danger m-auto text-center"
              role="alert"
              v-if="sessionError"
            >{{sessionError}}</div>
          </div>
          <div class="col-sm-1"></div>
        </div>
        <div class="form-group p-3">
          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="MovieTheatreSelector">Movie Theatre</label>
                </div>
                <select
                  class="custom-select"
                  id="MovieTheatreSelector"
                  v-model="movieSession.movieTheatreName"
                >
                  <option selected v-for="theatre in movieTheatres">{{theatre.name}}</option>
                </select>
              </div>
            </div>
            <div class="col-sm-5">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="MovieSelector">Movie</label>
                </div>
                <select class="custom-select" id="MovieSelector" v-model="movieSession.movieTitle">
                  <option selected v-for="movie in movies">{{movie.title}}</option>
                </select>
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="Year">Year</label>
                </div>
                <input
                  v-model="movieSession.date.year"
                  type="number"
                  class="form-control"
                  id="Year"
                  min="2019"
                  max="2050"
                >
              </div>
            </div>
            <div class="col-sm-5">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="MonthSelector">Month</label>
                </div>
                <select class="custom-select" id="MonthSelector" v-model="movieSession.date.month">
                  <option selected>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-5">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="Day">Day</label>
                </div>
                <input
                  v-model="movieSession.date.day"
                  type="number"
                  class="form-control"
                  id="Day"
                  min="1"
                  max="31"
                >
              </div>
            </div>
            <div class="col-sm-5">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="Time">Time</label>
                </div>
                <input
                  v-model="movieSession.date.hour"
                  type="number"
                  class="form-control"
                  id="Hour"
                  placeholder="Hour"
                  min="0"
                  max="23"
                >
                <input
                  v-model="movieSession.date.minute"
                  type="number"
                  class="form-control"
                  id="Minute"
                  placeholder="Minute"
                  min="0"
                  max="59"
                >
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
              <button
                type="submit"
                class="btn btn-danger btn-lg btn-block"
                @click="addMovieSession"
              >Add Movie Session</button>
            </div>
            <div class="col-sm-1"></div>
          </div>
        </div>
      </form>
    </div>
    <div v-if="!this.$store.state.loggedInUser.admin">
      <b-jumbotron class="jumbotron">
        <h1>Du måste vara inloggad som administratör
          <br>för att få åtkomst till den här sidan
        </h1>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import api from "@/services/Api.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      error: null,
      message: null,
      title: null,
      productionYear: null,
      length: null,
      genre: null,
      distributor: null,
      language: null,
      subtitles: null,
      director: null,
      ageLimit: null,
      description: null,
      actors: [],
      productionCountries: [],
      trailers: [],
      actor: null,
      country: null,
      imageLink: null,
      youtubeID: null,
      reviews: [],
      source: null,
      quote: null,
      stars: null,
      max: null,

      sessionMessage: null,
      sessionError: null,

      movies: null,
      movieTheatres: null,

      movieSession: {
        date: {
          year: null,
          month: null,
          day: null,
          hour: null,
          minute: null
        },
        movieTitle: null,
        movieTheatreName: null
      },

      posterImage: null,
      backgroundImage: null
    };
  },
  created() {
    this.getMovies();
    this.getMovieTheatres();
  },
  methods: {
    posterImageChanged(event) {
      this.posterImage = event.target.files[0];
    },
    backgroundImageChanged(event) {
      this.backgroundImage = event.target.files[0];
    },
    async getMovies() {
      const response = await api.getMovies();
      this.movies = response.data.movies;
    },
    async getMovieTheatres() {
      const response = await api.getTheatres();
      this.movieTheatres = response.data.movie_theatres;
    },
    addActor() {
      if (
        this.actor &&
        this.actor.trim() !== "" &&
        this.actors.indexOf(this.actor.trim()) === -1
      ) {
        this.actors.push(this.actor.trim());
        this.actor = null;
      }
    },
    removeActor(actor) {
      this.actors.splice(this.actors.indexOf(actor), 1);
    },
    addCountry() {
      if (
        this.country &&
        this.country.trim() !== "" &&
        this.productionCountries.indexOf(this.country.trim()) === -1
      ) {
        this.productionCountries.push(this.country.trim());
        this.country = null;
      }
    },
    removeCountry(country) {
      this.productionCountries.splice(
        this.productionCountries.indexOf(country),
        1
      );
    },
    addImage() {
      if (
        this.imageLink &&
        this.imageLink.trim() !== "" &&
        this.images.indexOf(this.imageLink.trim()) === -1
      ) {
        this.images.push(this.imageLink.trim());
        this.imageLink = null;
      }
    },
    removeImage(image) {
      this.images.splice(this.images.indexOf(image), 1);
    },
    addTrailer() {
      if (
        this.youtubeID &&
        this.youtubeID.trim() !== "" &&
        this.trailers.indexOf(this.youtubeID.trim()) === -1
      ) {
        this.trailers.push(this.youtubeID.trim());
        this.youtubeID = null;
      }
    },
    removeTrailer(id) {
      this.trailers.splice(this.trailers.indexOf(id), 1);
    },
    addReview() {
      if (
        this.source &&
        this.source.trim() !== "" &&
        this.quote &&
        this.quote.trim() !== "" &&
        this.stars &&
        this.max &&
        parseInt(this.stars) <= parseInt(this.max)
      ) {
        const review = {
          source: this.source,
          quote: this.quote,
          stars: parseInt(this.stars),
          max: parseInt(this.max)
        };
        this.reviews.push(review);
        this.source = null;
        this.quote = null;
        this.stars = null;
        this.max = null;
      }
    },
    removeReview(review) {
      this.reviews.splice(this.reviews.indexOf(review), 1);
    },
    async addMovie() {
      if (
        this.title &&
        this.length &&
        this.genre &&
        this.genre.trim() !== "" &&
        this.distributor &&
        this.distributor.trim() !== "" &&
        this.language &&
        this.language.trim() !== "" &&
        this.ageLimit &&
        this.subtitles &&
        this.subtitles.trim() !== "" &&
        this.director &&
        this.director.trim() !== "" &&
        this.description &&
        this.description.trim() !== "" &&
        this.posterImage &&
        this.backgroundImage
      ) {
        const request = new FormData();
        request.append("poster", this.posterImage);
        request.append("background", this.backgroundImage);
        request.append("title", this.title);
        request.append("productionCountries", this.productionCountries);
        request.append("productionYear", parseInt(this.productionYear));
        request.append("length", parseInt(this.length));
        request.append("genre", this.genre);
        request.append("distributor", this.distributor);
        request.append("language", this.language);
        request.append("subtitles", this.subtitles);
        request.append("director", this.director);
        request.append("ageLimit", parseInt(this.ageLimit));
        request.append("actors", this.actors);
        request.append("description", this.description);
        request.append("youtubeTrailers", this.trailers);
        request.append("reviews", JSON.stringify(this.reviews));
        request.append(
          "user",
          JSON.stringify(this.$store.getters.getCredentials)
        );
        try {
          const response = await api.addMovie(request);
          this.message = response.data.message;
          this.error = null;
          window.scrollTo(0, 0);
          this.title = null;
          this.productionYear = null;
          this.length = null;
          this.genre = null;
          this.distributor = null;
          this.language = null;
          this.subtitles = null;
          this.director = null;
          this.description = null;
          this.ageLimit = null;
          this.actors = [];
          this.productionCountries = [];
          this.images = [];
          this.trailers = [];
          this.actor = null;
          this.country = null;
          this.imageLink = null;
          this.youtubeID = null;
          this.reviews = [];
        } catch (error) {
          this.error = error.response.data.message;
          this.message = null;
          window.scrollTo(0, 0);
        }
      } else {
        this.error = "All fields needs to be filled.";
        this.message = null;
        window.scrollTo(0, 0);
      }
    },
    async addMovieSession() {
      if (
        this.movieSession.date.year &&
        this.movieSession.date.month &&
        this.movieSession.date.day &&
        this.movieSession.date.hour &&
        this.movieSession.date.hour.trim() !== "" &&
        this.movieSession.date.minute &&
        this.movieSession.date.minute.trim() !== "" &&
        this.movieTitle &&
        this.movieTheatreName
      ) {
        try {
          const userCredentials = this.$store.getters.getCredentials;
          this.movieSession.movieID = this.movies.filter(m => {
            return m.title === this.movieSession.movieTitle;
          })[0]._id;
          this.movieSession.movieTheatreID = this.movieTheatres.filter(t => {
            return t.name === this.movieSession.movieTheatreName;
          })[0]._id;
          this.movieSession.date.year = parseInt(this.movieSession.date.year);
          this.movieSession.date.month = parseInt(this.movieSession.date.month);
          this.movieSession.date.day = parseInt(this.movieSession.date.day);
          this.movieSession.date.time =
            this.movieSession.date.hour.padStart(2, "0") +
            ":" +
            this.movieSession.date.minute.padStart(2, "0");
          delete this.movieSession.date.hour;
          delete this.movieSession.date.minute;
          const response = await api.addMovieSession(
            this.movieSession,
            userCredentials
          );
          this.sessionMessage = "Session Added";
          this.sessionError = null;
          this.movieSession = {
            date: {
              year: null,
              month: null,
              day: null,
              hour: null,
              minute: null
            },
            movieTitle: null,
            movieTheatreName: null
          };
        } catch (error) {
          this.sessionMessage = null;
          this.sessionError = error.response.data.message
            ? error.response.data.message
            : "Something went wrong";
        }
      } else {
        this.sessionMessage = null;
        this.sessionError = "All fields need to be filled";
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background-color: white;
  height: 100%;
}
.jumbotron {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.16)),
    linear-gradient(#860717, #860717);
  border-radius: 0;
  color: white;
  text-align: center;
}
</style>