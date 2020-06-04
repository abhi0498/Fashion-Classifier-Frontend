<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title color="secondary">
        <router-link style="color:white;text-decoration:none;" to="/">Fashion</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn to="/search" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-switch class="mt-5" color="secondary" v-model="dark" @change="mode"></v-switch>
    </v-app-bar>

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import Search from "./components/Search";

export default {
  name: "App",
  mounted() {
    this.$vuetify.theme.dark = this.dark;
  },
  // components: {
  //   Search
  // },

  data: () => ({
    dark: true
    //
  }),

  methods: {
    mode() {
      console.log("object");
      this.$vuetify.theme.dark = this.dark;
    }
  }
};
</script>
