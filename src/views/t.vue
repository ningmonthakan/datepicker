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
              justify-content: space-between;
            "
          >
            <h3 style="font-weight: 700" class="font_style">
              Calendar
            </h3>
            <v-spacer></v-spacer>
          </v-col>

          <v-card>
            <v-card-title>
              <div class="d-flex" style=" align-items: center; width: 180px;">
                <label style="color:black;width:60px">Year :</label>
                  <div class="select-dropdown">
                    <select 
                      style="width: 100px "
                      v-model="currentYear"
                      class="form-control"
                    >
                      <option v-for="year in types_year" :value="year" :key="year">{{ year }}</option>
                    </select>
                </div>
              </div>

              
              <v-col cols="6">
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
                            style="border: 1px solid black; width: 380px; height: 80px; border-radius: 4px;"
                          />
                        </div>
                      </v-card-text>
                    </v-col>
                    <v-col>
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
                    </v-col>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-card-title>

            <v-divider></v-divider>

            <v-row>
              <v-col
                v-for="(month, index) in menuItems"
                :key="index"
                cols="4"
                style="display: flex; justify-content: space-evenly; "
                :position-x="menuX"
                :position-y="menuY"
              >
                <v-menu
                  v-model="month.menuToggle"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                  <template #activator="{ on, attrs }">
                    <v-date-picker
                      v-model="picker"
                      :ref="`menu${index}`"
                      v-on="on"
                      v-bind="attrs"
                      class="datepicker"
                      no-title
                      color="#D55D92"
                      width="450px"
                      event-color="#bcbbc0"
                      :picker-date="getFormattedDate(currentYear, month.month)"
                      :header-date-format="getHeaderDateFormat"
                      :weekday-format="getDay"
                      :allowed-dates="isWeekday"
                      :events="functionEvents"
                      @click:date="openMenu(index, $event, $event)"
                    >
                    </v-date-picker>
                  </template>
                  <div>
                    <v-card-text class="card-text-event">
                      <template v-if="selectedEvents.length > 0">
                        <div
                          v-for="(event, eventIndex) in selectedEvents"
                          :key="eventIndex"
                        >
                          {{ event.detail }}
                        </div>
                      </template>
                      <template v-else>
                        ไม่มีการกำหนดกิจกรรมในวันนี้
                      </template>
                    </v-card-text>
                  </div>
                </v-menu>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    // holiday:"",
    dialog: false,
    menuItems: [
      { month: 1, menuToggle: false },
      { month: 2, menuToggle: false },
      { month: 3, menuToggle: false },
      { month: 4, menuToggle: false },
      { month: 5, menuToggle: false },
      { month: 6, menuToggle: false },
      { month: 7, menuToggle: false },
      { month: 8, menuToggle: false },
      { month: 9, menuToggle: false },
      { month: 10, menuToggle: false },
      { month: 11, menuToggle: false },
      { month: 12, menuToggle: false },
    ],
    cardTextPosition: {
      x: 0,
      y: 0,
    },
    arrayEvents: null,
    menuX: 0,
    menuY: 0,
    types_year: [],
    type_year: new Date().getFullYear(),
    currentYear: new Date().getFullYear(),
    picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    item: {
      holiday: "",
      detail: "",
    },
    finish: false,
    SpacialDay: [],
  }),
  mounted() {
    this.prepareYearOptions();
    this.getdatepicker(this.currentYear);
    this.SpacialDay = [];
  },
  computed: {
    selectedEvents() {
      const selectedDateEvents = this.combinedEvents.filter((event) => {
        const eventDate = new Date(event.holiday).toISOString().substr(0, 10);
        return eventDate === this.picker;
      });

      return selectedDateEvents;
    },
    combinedEvents() {
      if (Array.isArray(this.SpacialDay)) {
        return this.SpacialDay.map((event) => ({
          holiday: event.holiday,
          detail: event.detail,
        }));
      } else {
        return [];
      }
    },
  },
    $event(newEvent) {
      this.combinedEvents = this.SpacialDay.filter((event) => {
        const eventDate = new Date(event.holiday).toISOString().substr(0, 10);
        return eventDate === newEvent;
      });
    },
  },
  methods: {
    functionEvents(date) {
      const [year, month, day] = date.split("-");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}T07:00:00+07:00`;
      const isSpecialDay = this.SpacialDay.some(
        (event) => event.holiday === formattedDate
      );

      if (isSpecialDay) {
        return ["#bcbbc0"];
      }
      return false;
    },
    openMenu(index, e, $event) {
      console.log("event", e);
      console.log("$event", $event);
      const menuPosition = this.$refs[
        `menu${index}`
      ][0].$el.getBoundingClientRect();
      this.menuX = menuPosition.left + window.scrollX;
      this.menuY = menuPosition.top + window.scrollY;
      this.menuItems[index].menuToggle = true;
     
    isWeekday(date) {
      const day = new Date(date).getDay();
      return day !== 0 && day !== 6;
    },
    prepareYearOptions() {
      const currentYear = new Date().getFullYear();
      for (let i = currentYear - 3; i <= currentYear + 3; i++) {
        this.types_year.push(i);
      }
    },
    getFormattedDate(year, month) {
      const formattedMonth = month < 10 ? "0" + month : month;
      return `${year}-${formattedMonth}-01`;
    },
    getHeaderDateFormat(isoDate) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const date = new Date(isoDate);
      const month = months[date.getMonth()];
      return month;
    },
    getDay(date) {
      const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      let i = new Date(date).getDay(date);
      return weekdays[i];
    },
    getaddholiday(item) {
      this.finish = false;
      // 1. กำหนด Headers และ URL
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
      // 2. กำหนดข้อมูลที่จะส่ง
      let data = {
        holiday: item.holiday,
        detail: item.detail,
      };
      // 3. ทำการส่งคำขอ
      this.axios.post(apiUrl, data, headers).then((response) => {
        if (response) {
          this.finish = true;
          window.location.reload();
        } else {
          this.finish = true;
        }
      });
    },
    getdatepicker(year) {
      this.finish = false;
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      this.axios
        .get(
          process.env.VUE_APP_API + `/calendar/getholiday?year=${year}`,
          headers
        )
        .then((response) => {
          if (response && response.status === 200) {
            this.SpacialDay = response.data.data;
            this.arrayEvents = response.data.data;
            console.log("This arrayEvents : ", this.arrayEvents);
            this.finish = true;
          } else {
            this.finish = true;
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>
<style >
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

.font_style {
  font-family: "Bai_Jamjuree" !important;
}
.container {
  /* width: 100% !important; */
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
.invoice_date_billing {
  align-items: center;
  width: 320px;
}
.text {
  color: black;
}

.font-text-alert {
  font-family: "Bai_Jamjuree" !important;
}

.v-pagination {
  justify-content: right !important;
}

.swal2-title {
  position: relative;
  font-family: "Bai_Jamjuree" !important;
  max-width: 100%;
  margin: 0 0 0.4em;
  padding: 0;
  color: #595959;
  font-size: 1.875em;
  font-weight: 600;
  text-align: center;
  text-transform: none;
  word-wrap: break-word;
}
.text-h5 {
  font-family: "Bai_Jamjuree" !important;
}
.font-text {
  font-family: "Bai_Jamjuree" !important;
}
.mdi-arrow-up::before {
  content: none;
}
.card {
  margin: 10px !important;
}
.input[type="checkbox"] {
  margin-top: 12px !important;
}

.field {
  margin-bottom: 10px !important;
}
.v-application .d-flex {
  display: flex !important;
  align-items: flex-end;
}
.date_input {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
}
.custom-v-select {
  height: 40px !important;
  width: 150px !important;
}
.custom-v-select .v-input__control {
  height: 40px !important;
  width: 150px !important;
}
.mdi-chevron-left::before {
  content: none;
}
.mdi-chevron-right::before {
  content: none;
}
.datepicker {
  width: 450px !important;
}
.datepicker .v-picker__body .v-date-picker-header .v-btn {
  display: none !important;
}
.datepicker .v-picker__body .v-date-picker-header button {
  pointer-events: none !important;
}
.v-date-picker-table th {
  font-size: 16px !important;
  font-weight: 400 !important;
}
.theme--light.v-date-picker-header
  .v-date-picker-header__value:not(.v-date-picker-header__value--disabled)
  button:not(:hover):not(:focus) {
  font-size: 22px !important;
  font-weight: 600 !important;
}
.v-date-picker-table .v-btn {
  z-index: auto;
  margin: 0;
  font-size: 16px !important;
}
.v-date-picker-table.v-date-picker-table--date
  > table
  > tbody
  tr
  td:nth-child(1)
  .v-btn__content {
  color: red;
}
.v-date-picker-table.v-date-picker-table--date
  > table
  > tbody
  tr
  td:nth-child(7)
  .v-btn__content {
  color: red;
}
.v-date-picker-table.v-date-picker-table--date
  > table
  > tbody
  tr
  td:nth-child(7)
  .v-btn__content {
  color: red;
}
.v-date-picker-table th:nth-child(7) {
  font-size: 16px !important;
  font-weight: 400 !important;
  color: red !important;
}
.v-date-picker-table th:nth-child(1) {
  font-size: 16px !important;
  font-weight: 400 !important;
  color: red !important;
}
.v-menu__content {
  box-shadow: none !important;
}
.card-text-event {
  display: flex !important;
  justify-content: space-evenly !important;
  align-items: center !important;
  background-color: #d9d9d9 !important;
  box-shadow: none !important;
}
.v-card__text.card-text-event {
  width: 200px !important;
  height: 30px !important;
  border-radius: 10px !important;
  font-size: 12px !important;
}
.v-list--dense .v-list-item .v-list-item__title {
  line-height: 1.5rem !important;
}
.v-list-item__title {
  align-self: center;
  font-size: 12px;
}
.theme--light.v-label {
  color: rgb(0, 0, 0);
  left: 5px !important;
}
input.form-control {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  border-radius: 1px;
}
/* // ======================================loading..==============================================// */
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
  z-index: 10;
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
  font-size: 18px;
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
/* // ======================================End loading..==========================================// */
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
.select-dropdown select:active, .select-dropdown select:focus {
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
</style>
