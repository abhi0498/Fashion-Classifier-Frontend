<template>
  <div>
    <button class="button bg-aqua border-2 m-10" @click="image = !image">Toggle</button>
    <br />
    <input v-if="image" v-on:change="display" id="file" type="file" />
    <input
      @keypress="display"
      @input="display"
      v-model="term"
      class="border-aqua border-2"
      v-else
      type="text"
    />

    <button @click="search">search</button>
    <img v-bind:src="src" alt />
  </div>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    src: "hello",
    image: true,
    term: ""
  }),
  methods: {
    display(event) {
      if (!this.image) {
        this.src = this.term;
        return;
      }
      let fReader = new FileReader();
      fReader.readAsDataURL(event.target.files[0]);
      fReader.onloadend = e => {
        console.log(this.src);

        this.src = e.target.result;
        document.getElementsByTagName("img").src = e.target.result;
      };
    },
    async search() {
      if (this.src === "hello" && this.term === "") {
        alert("Enter a valid image/URL");
        return;
      }
      let formData = new FormData();
      let imageFile = document.querySelector("#file");
      formData.append("image", imageFile.files[0]);
      const res = await this.$axios.post("image-search", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res);
    }
  }
};
</script>

<style></style>
