<template>
  <div>
    <h1>Admin Page</h1>

    <br>
    <hr>
    <h2>Add Movie</h2>
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
            <input type="text" class="form-control" id="Title" placeholder="Title" v-model="title">
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
            <input type="text" class="form-control" id="Genre" placeholder="Genre" v-model="genre">
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
                placeholder="Actor"
                v-model="actor"
              >
              <div class="input-group-prepend">
                <button class="btn btn-outline-primary" @click="addActor">Add</button>
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
                placeholder="Country"
                v-model="country"
              >
              <div class="input-group-prepend">
                <button class="btn btn-outline-primary" @click="addCountry">Add</button>
              </div>
            </div>
          </div>
          <div class="col-sm-1"></div>
        </div>

        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-5">
            <label for="Images">Images:</label>
            <ul class="list-group mb-3" v-for="url in images">
              <li class="list-group-item d-flex justify-content-between">
                <span>{{url}}</span>
                <button class="btn btn-sm btn-danger" @click="removeImage(url)">X</button>
              </li>
            </ul>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="ImageLink"
                placeholder="Link"
                v-model="imageLink"
              >
              <div class="input-group-prepend">
                <button class="btn btn-outline-primary" @click="addImage">Add</button>
              </div>
            </div>
          </div>
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
                placeholder="Youtube ID"
                v-model="youtubeID"
              >
              <div class="input-group-prepend">
                <button class="btn btn-outline-primary" @click="addTrailer">Add</button>
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
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary btn-lg btn-block" @click="addMovie">Add Movie</button>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </form>
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
      description: null,
      actors: [],
      productionCountries: [],
      images: [],
      trailers: [],
      actor: null,
      country: null,
      imageLink: null,
      youtubeID: null
    };
  },
  methods: {
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
    async addMovie() {
      if (
        this.title &&
        this.title.trim() !== "" &&
        this.productionCountries.length > 0 &&
        this.productionYear > 1900 &&
        this.productionYear <= 2019 &&
        this.length &&
        this.genre &&
        this.genre.trim() !== "" &&
        this.distributor &&
        this.distributor.trim() !== "" &&
        this.language &&
        this.language.trim() !== "" &&
        this.subtitles &&
        this.subtitles.trim() !== "" &&
        this.director &&
        this.director.trim() !== "" &&
        this.description &&
        this.description.trim() !== "" &&
        this.actors.length > 0 &&
        this.images.length > 0 &&
        this.trailers.length > 0
      ) {
        const movie = {
          title: this.title,
          productionCountries: this.productionCountries,
          productionYear: parseInt(this.productionYear),
          length: parseInt(this.length),
          genre: this.genre,
          distributor: this.distributor,
          language: this.language,
          subtitles: this.subtitles,
          director: this.director,
          actors: this.actors,
          description: this.description,
          images: this.images,
          youtubeTrailers: this.trailers
        };
        try {
          const response = await api.addMovie({ movie });
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
          this.actors = [];
          this.productionCountries = [];
          this.images = [];
          this.trailers = [];
          this.actor = null;
          this.country = null;
          this.imageLink = null;
          this.youtubeID = null;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>