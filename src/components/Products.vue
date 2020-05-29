<template>
  <div>
    <h1>{{title}}</h1>
    <v-row class="container justify-center">
      <v-col v-for="i in products" :key="i.url" cols="auto">
        <v-card target="_blank" :href="i.url">
          <v-img max-height="300px" :src="i.img"></v-img>
          <v-card-title>{{i.name.split()[0]}}</v-card-title>
          <v-card-subtitle>@TODO Add price here</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Products",
  props: ["products", "title"]
};
</script>

<style>
</style>