import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: "#607d8b",
        secondary: "#ffc107",
        accent: "#673ab7",
        error: "#f44336",
        warning: "#2196f3",
        info: "#03a9f4",
        success: "#4caf50",
      },
    },
  },
});
