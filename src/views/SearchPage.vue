<template>
  <div class="searchPage">
    <v-container>
      <form @submit.prevent="urlSearch" class="mx-5 row">
        <v-col cols="7">
          <v-text-field v-model="term" label=" Search Term " required></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn type="submit" class="mx-5 mt-3">search</v-btn>
        </v-col>
      </form>
    </v-container>

    <v-row align="center" v-if="isLoading">
      <v-row style="width:80%">
        <v-col v-for="i in Array.from({length:20})" :key="i" cols="3">
          <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-row>
    <template v-if="data.Amazon && !isLoading">
      <Products title="Myntra" :products="data.Myntra"></Products>
      <Products title="Flipkart" :products="data.Flipkart"></Products>

      <Products title="Amazon" :products="data.Amazon"></Products>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import Products from "@/components/Products";

export default {
  name: "SearchPage",
  components: { Products },
  data: () => ({
    isLoading: false,
    term: "",
    data: {}
  }),
  methods: {
    // @TODO Error handling
    async urlSearch() {
      this.isLoading = true;
      const res = await this.$axios.get(`/search?term=${this.term}`);
      this.data = res.data.products;
      console.log(this.data);
      this.isLoading = false;
    }
  }
};
</script>
