<template>
  <div class="container">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <br />
    <v-card class="w-5/8">
      <v-tabs @change="src=''" background-color="primary" dark v-model="tab" grow>
        <v-tabs-slider></v-tabs-slider>

        <v-tab>File Upload</v-tab>
        <v-tab-item class="mt-4 container">
          <v-row class="mx-12">
            <v-col cols="7">
              <v-file-input
                class="w-65"
                v-on:change="display($event,true)"
                id="file"
                label="File input"
                filled
                prepend-icon="mdi-camera"
                accept="image/*"
              ></v-file-input>
            </v-col>

            <v-col cols="2">
              <v-btn color="secondary" class="m-5" @click="search">search</v-btn>
            </v-col>
          </v-row>
        </v-tab-item>

        <v-tab>URL</v-tab>

        <v-tab-item class="mt-4 container">
          <v-row class="mx-12">
            <v-col cols="7">
              <v-text-field
                @keypress="display"
                @input="display($event,false)"
                v-model="term"
                label="Image URL"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn color="secondary" class="mx-5 mt-2" @click="urlSearch">search</v-btn>
              <v-btn color="secondary" class="mx-5 mt-2" title="Paste" @click="paste">
                <v-icon>mdi-content-paste</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
      <v-row>
        <v-col cols="5">
          <v-card
            color="warning"
            height="500px"
            width="500px"
            class="mx-5 bg-blue-300"
            v-if="imgError"
          >
            <h1 class="text-center">
              <v-icon>mdi-image-broken-variant</v-icon>Choose a valid image
            </h1>
          </v-card>
          <v-img
            @load="load"
            @error="error"
            class="container"
            max-height="500px"
            max-width="500px"
            contain
            v-bind:src="src"
            alt
          ></v-img>
        </v-col>

        <v-col v-if="result" class="container pt-5" cols="5">
          <h1 class="display-2">Results</h1>
          <v-card color="info" v-for="(type,i) in result" :key="type">
            <h3 style="text-transform:capitalize;padding:5px" class="display-1">{{i}}</h3>
            <div v-for="(r,i) in type" :key="r[0]">
              <p class="px-5" :class="{'font-weight-bold':!i}">{{r[0]}} - {{r[1]}}%</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <div v-if="products.Amazon">
      <Products title="Myntra" :products="products.Myntra"></Products>

      <Products title="Flipkart" :products="products.Flipkart"></Products>
      <Products title="Amazon" :products="products.Amazon"></Products>
    </div>
  </div>
</template>

<script>
import Products from "@/components/Products";
export default {
  name: "Search",
  components: { Products },
  data: () => ({
    types: ["Product Type", "Colour", "Gender"],
    src: "",
    image: true,
    term: "",
    tab: null,
    products: {},
    result: "",
    imgError: true,
    loading: false
  }),
  methods: {
    //display image
    display(event, image) {
      if (!image) {
        this.src = this.term;
        return;
      }
      console.log(event);
      if (!event) {
        this.src = "";
        return;
      }
      let fReader = new FileReader();
      fReader.readAsDataURL(event);
      fReader.onloadend = e => {
        this.src = e.target.result;
        document.getElementsByTagName("img").src = e.target.result;
      };
    },

    //image load error
    error() {
      console.log("image not loaded");
      this.imgError = true;
    },
    //image load success
    load() {
      console.log("loaded");
      this.imgError = false;
    },
    //paste button action
    async paste() {
      navigator.permissions
        .query({
          name: "clipboard-read"
        })
        .then(permissionStatus => {
          // Will be 'granted', 'denied' or 'prompt':
          console.log(permissionStatus.state);

          // Listen for changes to the permission state
          permissionStatus.onchange = () => {
            console.log(permissionStatus.state);
          };
        });

      this.term = await window.navigator.clipboard.readText();
      this.src = this.term;
    },
    //search by file upload
    async search() {
      if (this.src === "" && this.term === "") {
        alert("Enter a valid image/URL");
        return;
      }
      this.loading = true;
      let formData = new FormData();
      let imageFile = document.querySelector("#file");
      formData.append("image", imageFile.files[0]);
      const res = await this.$axios.post("image-search", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.table(res.data);
      this.products = res.data.products;
      this.result = res.data.results;
      this.loading = false;
    },
    //search by url
    async urlSearch() {
      if (this.imgError) {
        alert("Invalid Image");
        return;
      }
      this.loading = true;
      const res = await this.$axios.post(
        "image-search-url",
        { url: this.term },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.table(res.data);
      this.products = res.data.products;
      this.result = res.data.results;
      this.loading = false;
    }
  }
};
</script>

<style></style>
