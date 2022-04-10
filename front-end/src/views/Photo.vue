<template>
  <div class="content">
    <div class="image">
      <div class="photoInfo">
        <p class="photoTitle">{{ photo.title }}</p>
        <p class="photoName" v-if="photo.user">
          --{{ photo.user.firstName }} {{ photo.user.lastName }}
        </p>
      </div>
      <p class="photoDate">{{ formatDate(photo.created) }}</p>
      <img :src="photo.path" />
    </div>
    <div class="comments">
      <div v-if="comments.length !== 0">
        <p>Comments</p>
        <div
          class="comment"
          v-for="comment in comments"
          v-bind:key="comment._id"
        >
          <p>
            {{ comment.user.firstName }} {{ comment.user.lastName }}
          </p>
          <p>{{ formatDate(comment.created) }}</p>
          <p>{{ comment.content }}</p>
        </div>
      </div>
      <p v-else>No comments yet</p>
      <div v-if="user">
        <h2>Add a comment</h2>
        <textarea v-model="content" />
        <button type="button" @click="upload" class="pure-button pure-button-primary right">
          Upload
        </button>
      </div>
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
      comments: [],
      id: "",
      content: "",
    };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser();
    this.getPhoto();
    this.getComments();
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getPhoto() {
      try {
        this.response = await axios.get("/api/photos/" + this.id);
        this.photo = this.response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        this.response = await axios.get("/api/comments/" + this.id);
        this.comments = this.response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      try {
        await axios.post('/api/comments/' + this.id, {
          content: this.content
        });
        this.getComments();
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

.image, .comments {
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