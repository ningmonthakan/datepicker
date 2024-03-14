<template>
  <div>
    <!-- =================================Loading ======================================================= -->
    <!-- <div
      style="margin: 0"
      class="loading-waiting"
      v-bind:style="{ display: finish == true ? 'none' : '' }"
    >
      <div>
        <div class="load-4">
          <div class="ring-1"></div>
        </div>
        <div class="load-wrapp">
          <div class="load-6">
            <div class="letter-holder">
              <div class="l-1 letter">l</div>
              <div class="l-2 letter">o</div>
              <div class="l-3 letter">a</div>
              <div class="l-4 letter">d</div>
              <div class="l-5 letter">i</div>
              <div class="l-6 letter">n</div>
              <div class="l-7 letter">g</div>
              <div class="l-8 letter">.</div>
              <div class="l-9 letter">.</div>
              <div class="l-10 letter">.</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- =================================Loading ======================================================= -->
    <v-container fluid>
      <div>
        <v-row>
          <v-col
            cols="12"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;"
          >
            <h3 style="font-weight: 700" class="font_style">Calendar</h3>
            <v-spacer></v-spacer>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div class="d-flex" style=" align-items: center; width: 180px;">
                  <label style="color:black;width:60px">Year :</label>
                  <div class="select-dropdown">
                    <select
                      style="width: 100px "
                      v-model="selectedYear"
                      class="form-control"
                      @change="updateYear"
                    >
                      <option
                        v-for="year in types_year"
                        :value="year"
                        :key="year"
                        >{{ year }}</option
                      >
                    </select>
                  </div>
                </div>

                <div class="text-center">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="#AA4465"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        style="border-radius: 15px;"
                        depressed
                      >
                        Add Event
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title
                        class="text-h5"
                        style="background-color:#FBB1BDC7; display: flex; justify-content: space-between;"
                      >
                        <p
                          style="font-size: 20px;margin-bottom: auto; font-weight: bolder;"
                        >
                          Add Event
                        </p>
                        <v-btn icon dark @click="dialog = false">
                          <v-icon style="font-size: xx-large; color:#545454;"
                            >mdi-close-circle-outline</v-icon
                          >
                        </v-btn>
                      </v-card-title>
                      <v-col cols="12">
                        <v-card-text style="padding: 0px 0px 0px 0px;">
                          <div class="date_input">
                            <p
                              style="font-weight: 500; padding: 12px;font-size: 16px;"
                            >
                              Date &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <div>
                              <input
                                type="date"
                                class="form-control"
                                v-model="item.holiday"
                                placeholder="dd/mm/yyyy"
                                style="width: 150px; border-radius: 4px; border: 1px solid black; height: 40px;"
                              />
                            </div>
                          </div>
                        </v-card-text>
                        <v-card-text style="padding: 0px 0px 0px 0px;">
                          <div class="d-flex">
                            <p
                              style="font-weight: 500; padding: 12px;font-size: 16px;"
                            >
                              Detail &nbsp; &nbsp;&nbsp;
                            </p>
                            <input
                              v-model="item.detail"
                              style="border: 1px solid black; width: 380px; height: 80px; border-radius: 4px;  font-size: 16px; "
                            />
                          </div>
                        </v-card-text>
                      </v-col>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <div
                          style="display: flex; justify-content: space-evenly; "
                        >
                          <v-btn
                            color="#599E52"
                            dark
                            @click="getaddholiday(item)"
                            style="border-radius: 15px; width: 85px; height: 35px;"
                          >
                            Save
                          </v-btn>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <div>
                <v-card>
                  <vc-date-picker
                    color="pink"
                    v-model="dates"
                    :attributes="attributes"
                    :locale="modifiedLocale"
                    :columns="$screens({ default: 1, xl: 3 })"
                    :rows="$screens({ default: 1, xl: 4 })"
                    :is-expanded="$screens({ default: true, xl: false })"
                    :disabled-dates="{ weekdays: [1, 7] }"
                  >
                    <template #day-popover>
                      <div>
                        วันปีใหม่
                      </div>
                    </template>
                    <!-- <template #header>
                      <div>{{ selectedYear }}</div>
                    </template> -->
                  </vc-date-picker>
                </v-card>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
import "carbon-components/css/carbon-components.css";

export default {
  data() {
    const todos = [
      {
        isComplete: false,
        dates: { days: 1 }, // Every ตัว Every
      },
    ];
    return {
      date: null,
      month: null,
      todos,
      holiday: "",
      detail: "",
      dialog: false,
      types_year: [],
      // dates: new Date(),
      // monthYear: { month: 1, year: 2024 }, // ตัวนี้สามารถกำหนดปีและเดือนได้
      incId: todos.length,
      item: { holiday: "", detail: "" },
      // types_year: [2022, 2023, 2024], // Example years
      // selectedYear: new Date(), // Initial selected year
      dates: new Date(), // Example date
    };
  },
  mounted() {
    this.prepareYearOptions();
    this.getaddholiday();
    // this.getdatepicker(this.currentYear);
  },
  watch: {},
  computed: {
    computedPicker() {
      const newDate = new Date(this.picker);
      newDate.setFullYear(this.currentYear);
      return newDate;
    },
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map((todo) => ({
          dates: todo.dates,
          dot: {
            // color: todo.color,
            // class: todo.isComplete ? 'opacity-75' : '',
            style: {
              backgroundColor: "grey",
            },
          },
          key: "today",
          highlight: {
            backgroundColor: "#ff8080",
          },
          popover: {
            label: todo.description,
            visibility: "click",
          },
          customData: todo,
        })),
      ];
    },
    modifiedLocale() {
      return {
        id: "EN",
        firstDayOfWeek: 1,
        masks: { weekdays: "WWW", },
        //title: "MMMM" 
      };
    },
  },
  methods: {
    // updateYear() {
    //   this.dates = new Date(this.selectedYear, 0, 1);
    // },
    prepareYearOptions() {
      const monthYear = new Date().getFullYear();
      for (let i = monthYear - 3; i <= monthYear + 3; i++) {
        this.types_year.push(i);
      }
    },
    getaddholiday(item) {
      this.finish = false;
      let headers = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
        responseType: "blob",
      };
      let apiUrl = process.env.VUE_APP_API + "/calendar/addholiday";
      let data = {
        holiday: item.holiday,
        detail: item.detail,
      };
      this.axios.post(apiUrl, data, headers).then((response) => {
        if (response) {
          this.finish = true;
          window.location.reload();
        } else {
          this.finish = true;
        }
      });
    },
    // ยังไม่ได้เชื่อมเส้น api เอาโค้ดเก่ามา
    //  getdatepicker(year) {
    //   this.finish = false;
    //   let headers = {
    //     headers: {
    //       Authorization:
    //         "Bearer " +
    //         localStorage.getItem("acces_token") +
    //         "," +
    //         localStorage.getItem("secret"),
    //     },
    //   };
    //   this.axios
    //     .get(
    //       process.env.VUE_APP_API + `/calendar/getholiday?year=${year}`,
    //       headers
    //     )
    //     .then((response) => {
    //       if (response && response.status === 200) {
    //         this.SpacialDay = response.data.data;
    //         this.arrayEvents = response.data.data;
    //         console.log("This arrayEvents : ", this.arrayEvents);
    //         this.finish = true;
    //       } else {
    //         this.finish = true;
    //       }
    //     })
    //     .catch((error) => {
    //       if (error.response && error.response.status == 401) {
    //         this.finish = true;
    //         this.$router.push("/login");
    //       }
    //     });
    // },
  },
};
</script>
<style lang="scss">
@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Medium.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
.container {
  font-family: "Bai_Jamjuree" !important;
  background-color: rgb(250, 250, 250);
}
.v-card-title {
  font-family: "Bai_Jamjuree" !important;
}

@media (min-width: 960px) {
  .container {
    max-width: 100%;
    background-color: rgb(250, 250, 250);
  }
}
// select
.select-dropdown,
.select-dropdown * {
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
}
.select-dropdown {
  position: relative;
  /* background-color: #E6E6E6; */
  border-radius: 4px;
  border: 1px solid #000000;
}
.select-dropdown select {
  font-size: 1rem;
  font-weight: normal;
  max-width: 100%;
  padding: 8px 24px 8px 10px;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.select-dropdown select:active,
.select-dropdown select:focus {
  outline: none;
  box-shadow: none;
}
.select-dropdown:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 8px;
  width: 0;
  height: 0;
  margin-top: -2px;
  border-top: 5px solid #aaa;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}
//input
.date_input {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
}
//card__actions
.v-card__actions {
  align-items: center;
  display: flex;
  padding: 8px;
  justify-content: space-evenly;
}
//vc-day
.vc-day-popover-container {
  color: #000;
  background-color: #d1d1d1;
  border: 1px solid;
  border-color: #d1d1d1;
  border-radius: var(--rounded);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  padding: 4px 8px;
  box-shadow: var(--shadow);
  font-family: "Bai_Jamjuree" !important;
}
//vc-title
.vc-title[data-v-74ad501d] {
  font-size: 19px !important;
  color: #000;
  font-weight: var(--font-semibold);
  line-height: 28px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  font-family: "Bai_Jamjuree" !important;
}
//vc-weekday
.vc-weekday[data-v-74ad501d] {
  text-align: center;
  color: #6e7781;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 16px;
  padding-top: 4px;
  padding-bottom: 8px;
  cursor: default;
  -webkit-user-select: none;
  user-select: none;
  font-family: "Bai_Jamjuree" !important;
  text-transform: uppercase !important;
}
//vc-day
.vc-day-content[data-v-4420d078] {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: var(--rounded-full);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  font-family: "Bai_Jamjuree" !important;
}
.vc-dot[data-v-4420d078] {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  transition: all var(--day-content-transition-time);
}
.vc-container {
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 600;
  --text-xs: 12px;
  --text-sm: 17px;
  --text-base: 16px;
  --text-lg: 19px;
  --leading-snug: 1.375;
  --rounded: 0.25rem;
  --rounded-lg: 0.5rem;
  --rounded-full: 9999px;
  --shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --slide-translate: 22px;
  --slide-duration: 0.15s;
  --slide-timing: ease;
  --day-content-transition-time: 0.13s ease-in;
  --weeknumber-offset: -34px;
  position: relative;
  display: contents;
  width: max-content;
  height: max-content;
  font-family: "Bai_Jamjuree" !important;
  color: var(--gray-900);
  background-color: var(--white);
  border: 1px solid;
  border-color: var(--gray-400);
  border-radius: var(--rounded-lg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    inset 0px 0px 0px 0px rgba(0, 0, 0, 0.14),
    0px 0px 0px 0px rgba(0, 0, 0, 0.12) !important;
}
.vc-weekday[data-v-74ad501d]:nth-child(7),
.vc-weekday[data-v-74ad501d]:nth-child(1) {
  color: #ff3226 !important;
}
.vc-svg-icon {
  display: none !important;
}
.vc-day-content.is-disabled {
  color: #ff3226 !important;
}
.day-popover-weekday {
  text-transform: uppercase;
}
// ======================================loading..==============================================//
.loading-waiting {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #ecf5ff62;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
}

.load-4 .ring-1 {
  animation: loadingD 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
}

@keyframes loadingD {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.ring-1 {
  width: 70px;
  height: 70px;
  margin: 0 auto;
  padding: 7px;
  border: 8px dashed #4b9cdb;
  border-radius: 100%;
}

.load-6 .letter {
  animation-name: loadingF;
  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-direction: linear;
}

.letter-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b9cdb;
  font-size: 20px;
}

.l-1 {
  animation-delay: 0.48s;
}

.l-2 {
  animation-delay: 0.6s;
}

.l-3 {
  animation-delay: 0.72s;
}

.l-4 {
  animation-delay: 0.1s;
}

.l-5 {
  animation-delay: 0.96s;
}

.l-6 {
  animation-delay: 1.08s;
}

.l-7 {
  animation-delay: 1.2s;
}

.l-8 {
  animation-delay: 1.32s;
}

.l-9 {
  animation-delay: 1.44s;
}

.l-10 {
  animation-delay: 1.56s;
}

@keyframes loadingF {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
// ======================================End loading..==========================================//
</style>
