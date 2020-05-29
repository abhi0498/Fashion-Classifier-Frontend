<template>
  <div class="container">
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
              <v-btn class="m-5" @click="search">search</v-btn>
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
              <v-btn class="m-5" @click="urlSearch">search</v-btn>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
      <v-img max-height="500px" max-width="500px" contain v-bind:src="src" alt></v-img>
    </v-card>
    <div v-if="products.Amazon">
      <Products title="Amazon" :products="products.Amazon"></Products>

      <Products title="Flipkart" :products="products.Flipkart"></Products>

      <Products title="Myntra" :products="products.Myntra"></Products>
    </div>
  </div>
</template>

<script>
import Products from "@/components/Products";
export default {
  name: "Search",
  components: { Products },
  data: () => ({
    src: "",
    image: true,
    term: "",
    tab: null,
    products: {},
    result: ""
  }),
  methods: {
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
    async search() {
      if (this.src === "" && this.term === "") {
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
      this.products = res.data.products;
      this.result = res.data.results;
    },
    async urlSearch() {
      const res = await this.$axios.post(
        "image-search-url",
        { url: this.term },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(res);
      this.products = res.data.products;
      this.result = res.data.results;
    }
  }
};
</script>

<style></style>
