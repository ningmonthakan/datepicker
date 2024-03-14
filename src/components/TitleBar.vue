<template>
  <div style="z-index: 1000">
    <v-app-bar class="app-bar-color" clipped-left app dark>
      <v-app-bar-nav-icon @click="onClick"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>Dashboard</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-menu offset-y style="z-index: 1001">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            dark
            v-bind="attrs"
            v-on="on"
            style="font-size: 5vh; cursor: pointer"
            >mdi-account-circle</v-icon
          >
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            style="font-size: 2vh; cursor: pointer"
            @click="logout()"
          >
            <v-list-item-title>
              <v-icon>mdi-logout</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <div style="width:2px"></div>

      <div class="text_d" style="display: block">
        {{ employee_id }}
        <div style="width: 10px"></div>
        {{ role_name }}
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import eventBus from "../event-bus";
export default {
  data() {
    return {
      employee_id: "",
      role_name: "",
      test: 0,

      items: [
        {
          title: "LOGOUT",
          // link: "/",
          show: true,
        },
      ],
    };
  },
  created() {
    this.employee_id = localStorage.getItem("employee_id");
    this.role_name =
      localStorage.getItem("first_name_th") +
      " " +
      localStorage.getItem("last_name_th");
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    onClick() {
      eventBus.$emit("click");
      // this.test += 1;
      // if(this.test % 2 == 0){
      //   this.test = true
      // }else {
      //   this.test = false
      // }
      // console.log(this.test);
      // localStorage.setItem('test', JSON.stringify({
      //       cilck: this.test,
      // }))
    },
  },
};
</script>

<style lang="scss">
// @font-face {
//   font-family: "Bai_Jamjuree";
//   src: url("~@/assets/Bai_Jamjuree/Bai_Jamjuree-Regular.ttf") format("truetype");
//   font-weight: 400;
//   font-style: normal;
// }

// @font-face {
//   font-family: "Bai_Jamjuree";
//   src: url("~@/assets/Bai_Jamjuree/Bai_Jamjuree-Thin.ttf") format("truetype");
//   font-weight: 300;
//   font-style: normal;
// }
@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  line-height: 2rem;
}
.text_d {
  font-family: "Bai_Jamjuree" !important;
  font-size: 13px;
}
.app-bar-color {
  background: #ffffff !important; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #47a6e0,
    #25d599
  ) !important; /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #47a6e0, #25d599) !important;
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>
