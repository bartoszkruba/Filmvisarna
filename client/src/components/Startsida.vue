<template>
  <div class="main">
    <div class="box">
      <b-carousel
        id="carousel1"
        style="text-shadow: 1px 1px 2px #333;"
        controls
        indicators
        background="#ababab"
        :interval="4000"
        img-width="20"
        img-height="480"
        v-model="slide"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid b-carousel-slide" width="1024" height="480"
          src=http://www.gstatic.com/tv/thumb/v22vodart/35903/p35903_v_v8_bb.jpg alt="image slot">
          <ul>
            <li>Popcorn</li>
            <li>Läsk</li>
            <li>Chips</li>
            <li>Godis</li>
            <li>mm</li>
          </ul>

          <b-button>Film</b-button>
          <b-button>Bestäl</b-button>
        </b-carousel-slide>
      </b-carousel>
    </div>

    <b-jumbotron>
      <template slot="header">Senaste nytt</template>
      <h1>Vi har nu Öppnat Välkomna</h1>
      <h2>På plats säljer vi</h2>
      <ul>
        <li>Popcorn</li>
        <li>Läsk</li>
        <li>Chips</li>
        <li>Godis</li>
        <li>mm</li>
      </ul>
      <b-button>Mer information</b-button>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  //Hämta data från server
  data() {
    return {
      Titel: plasholder,
      Description: plasholder,
      Runtime: 125
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
}
h2 {
  text-align: center;
}
li {
  text-align: center;
  list-style-type: none;
}
.box {
  width: 100%;
}
.b-carousel-slide {
  width: 20%;
}
@media only screen and (max-width: 560px) {
  .b-carousel-slide {
  width: 200%;
}
}
</style>