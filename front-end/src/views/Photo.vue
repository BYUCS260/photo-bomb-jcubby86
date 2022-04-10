<template>
  <div class = "content">
    <div class="image">
      <div class="photoInfo">
        <p class="photoTitle">{{ photo.title }}</p>
        <p class="photoName"  v-if="photo.user">
          --{{ photo.user.firstName }} {{ photo.user.lastName }}
        </p>
      </div>
      <p class="photoDate">{{ formatDate(photo.created) }}</p>
      <img :src="photo.path"/>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "Photo",
  data() {
    return {
      photo: {},
      id: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPhoto();
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async getPhoto() {
      try {
        this.response = await axios.get("/api/photos/" + this.id);
        this.photo = this.response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 1em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  max-width: 800px;
  margin: auto;
}

.image img {
  width: 100%;
}

.content {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>