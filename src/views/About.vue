<template>
  <div class="container">
    <h1 class="display-2 my-5">About</h1>
    <h1 class="display-1 my-5">Team Members</h1>

    <v-simple-table style="width:40%" class="my-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left title">Name</th>
            <th class="text-left title">USN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.name">
            <td class="sub-title">{{ student.name }}</td>
            <td>{{ student.usn }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <h1 class="display-1">Technologies Used</h1>

    <v-row>
      <v-img
        cols="5"
        height="10%"
        width="50%"
        src="https://raw.githubusercontent.com/tanrax/workshop-flask-with-vuejs/master/flaskyvuejs.jpg"
      ></v-img>
      <v-img
        cols="5"
        height="10%"
        width="50%"
        src="https://cdn-images-1.medium.com/max/1200/0*a6XSwHsfvz_oWSSJ.jpg"
      ></v-img>
    </v-row>
  </div>
</template>

<style scoped>
img {
  border: 2px solid gray;
}
</style>

<script>
export default {
  data: () => ({
    students: [
      { name: "Abhishek V", usn: "1DB16CS005" },
      { name: "Anjan M", usn: "1DB16CS021" },
      { name: "C Balamanikantan", usn: "1DB16CS041" },
      { name: "Dheeraj", usn: "1DB16CS051" }
    ]
  })
};
</script>
