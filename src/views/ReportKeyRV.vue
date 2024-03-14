<template>
  <div>
    <!-- =================================Loading ======================================================= -->
    <div
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
    </div>
    <!-- =================================Loading ======================================================= -->
    <v-container fluid>
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
            Report Key RV INET/JV
          </h3>
          <v-spacer></v-spacer>
        </v-col>

        <v-row>
          <v-col cols="3">
            <v-card style="padding: 1px; background: #6096b4">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: space-between"
                >
                  <label
                    style="font-size: 21px; text-align: right; color: #ffffff"
                    >INET Count All</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 18px; text-align: right; color: #ffffff">
                  {{ formatNumber(inet_count_all) }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px; background: #6096b4">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: space-between"
                >
                  <label
                    style="font-size: 21px; text-align: right; color: #ffffff"
                    >Transfer INET Amount</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 18px; text-align: right; color: #ffffff">
                  {{ formatNumber(transfer_inet_amount) }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px; background: #6096b4">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: space-between"
                >
                  <label
                    style="font-size: 21px; text-align: right; color: #ffffff"
                    >Suspense INET Amount</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 18px; text-align: right; color: #ffffff">
                  {{ formatNumber(suspense_inet_amount) }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px; background: #df9733">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: space-between"
                >
                  <label
                    style="font-size: 21px; text-align: right; color: #ffffff"
                    >Total Amount All</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 18px; text-align: right; color: #ffffff">
                  {{ formatNumber(total_amount_all) }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px; background: #86c8bc">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: space-between"
                >
                  <label
                    style="font-size: 21px; text-align: right; color: #ffffff"
                    >JV Count All</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 18px; text-align: right; color: #ffffff">
                  {{ formatNumber(jv_count_all) }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px; background: #86c8bc">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: space-between"
                >
                  <label
                    style="font-size: 21px; text-align: right; color: #ffffff"
                    >Transfer JV Amount</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 18px; text-align: right; color: #ffffff">
                  {{ formatNumber(transfer_jv_amount) }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px; background: #86c8bc">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: space-between"
                >
                  <label
                    style="font-size: 21px; text-align: right; color: #ffffff"
                    >Suspense JV Amount</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 18px; text-align: right; color: #ffffff">
                  {{ formatNumber(suspense_jv_amount) }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>

        <template>
          <!-- --------------------------------------btn--------------------------------------------- -->
          <v-row>
            <v-col cols="12">
              <div>
              <v-btn
                class="mr-5"
                elevation="0"
                rounded
                style="
                  border: 1px solid #000000;
                  background-color: #ffffff;
                  width: 200px;
                  height: 35px;
                  font-size: 14px;
                "
                @click="exportFileReportKeyRV()"
              >
                <v-icon style="font-size: 28px; color: #545454"
                  >mdi-table-arrow-right</v-icon
                >
                <v-spacer></v-spacer>
                Export File
              </v-btn>
            <!-- </v-col>

            <v-col cols="12" sm="6" md="4" lg="3"> -->
              
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      size="x-large"
                      variant="flat"
                      elevation="0"
                      rounded
                      style="
                        border: 1px solid #000000;
                        background-color: #ffffff;
                        width: 200px;
                        height: 35px;
                        font-size: 14px;
                        justify-content: space-between;
                      "
                    >
                      <v-icon style="font-size: 28px; color: #545454"
                        >mdi-calendar-month</v-icon
                      >
                      Select Date
                    </v-btn>
                  </template>
                  <v-date-picker
                    v-model="date"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="red" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="selectDate(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
            </v-col>
          </v-row>
          <!-- --------------------------------------End btn--------------------------------------------- -->
        </template>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <!-- --------------------------------------table--------------------------------------------- -->
              <div class="table-report-key-rv">
                <v-data-table
                  :headers="headers_rv"
                  :items="report_key_rv_data"
                  :items-per-page="number_INC()"
                  fixed-header
                  height="580"
                  hide-default-footer
                  id="report-key-rv"
                >
                  <template v-slot:[`item.work_date`]="{ item }">
                    <label
                      v-if="parseDateRequest(item.work_date) != '01/01/0001'"
                    >
                      {{ parseDateRequest(item.work_date) }}</label
                    >
                  </template>

                  <template #[`item.customer_inet`]="{ item }">
                    <p class="mb-0" :class="item.customer_inet">
                      {{ formatNumber(item.customer_inet) }}
                    </p>
                  </template>

                  <template #[`item.transfer_inet`]="{ item }">
                    <p class="mb-0" :class="item.transfer_inet">
                      {{ formatNumber(item.transfer_inet) }}
                    </p>
                  </template>

                  <template #[`item.suspense_inet`]="{ item }">
                    <p class="mb-0" :class="item.suspense_inet">
                      {{ formatNumber(item.suspense_inet) }}
                    </p>
                  </template>

                  <template #[`item.customer_jv`]="{ item }">
                    <p class="mb-0" :class="item.customer_jv">
                      {{ formatNumber(item.customer_jv) }}
                    </p>
                  </template>

                  <template #[`item.transfer_jv`]="{ item }">
                    <p class="mb-0" :class="item.transfer_jv">
                      {{ formatNumber(item.transfer_jv) }}
                    </p>
                  </template>

                  <template #[`item.suspense_jv`]="{ item }">
                    <p class="mb-0" :class="item.customer_jv">
                      {{ formatNumber(item.suspense_jv) }}
                    </p>
                  </template>
                </v-data-table>
              </div>
              <!-- ------------------------------------End tabel --------------------------------------------- -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
import "carbon-components/css/carbon-components.css";

export default {
  data: () => ({
    nowDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    month: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10)
      .split("-")[1],
    year: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10)
      .split("-")[0],
    date: new Date().toISOString(),
    menu: false,
    report_key_rv_data: [],
    item_per_page: 100,
    page: 1,
    page_total: 1,
    search: "",
    headers_rv: [
      {
        text: "Work Date",
        value: "work_date",
        align: "center",
        width: "190px",
        sortable: false,
      },
      {
        text: "Customer INET",
        value: "customer_inet",
        align: "center",
        width: "330px",
        sortable: false,
      },
      {
        text: "Transfer INET",
        value: "transfer_inet",
        align: "center",
        width: "330px",
        sortable: false,
      },
      {
        text: "Suspense INET",
        value: "suspense_inet",
        align: "center",
        width: "330px",
        sortable: false,
      },
      {
        text: "Customer JV",
        value: "customer_jv",
        align: "center",
        width: "330px",
        sortable: false,
      },
      {
        text: "Transfer JV",
        value: "transfer_jv",
        align: "center",
        width: "330px",
        sortable: false,
      },
      {
        text: "Suspense JV",
        value: "suspense_jv",
        align: "center",
        width: "330px",
        sortable: false,
      },
    ],
    inet_count_all: 0,
    transfer_inet_amount: 0,
    suspense_inet_amount: 0,
    total_amount_all: 0,
    jv_count_all: 0,
    transfer_jv_amount: 0,
    suspense_jv_amount: 0,
    finish: false,
  }),
  watch: {},
  created() {
    this.role_status = localStorage.getItem("role");
    if (
      this.role_status !== "super_admin" &&
      this.role_status !== "admin" &&
      this.role_status !== "wait_down_service"
    ) {
      this.$router.push("/invoice");
    } else if (localStorage.getItem("acces_token")) {
      this.finish = false;
      this.getReportKeyRV();
    }
  },
  methods: {
    exportFileReportKeyRV() {
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

      this.axios
        .post(
          process.env.VUE_APP_API +
            `/statement/export/report/key_rv?month=${this.month}&year=${this.year}`,
          null,
          headers
        )
        .then((response) => {
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_ReportKeyRV.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
        });
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async selectDate(date) {
      this.$refs.menu.save(date);
      const nowDate = new Date(date);
      this.toDay = nowDate;
      const year = date.split("-")[0];
      const month = date.split("-")[1];
      this.year = year;
      this.month = month;
      await this.getReportKeyRV(month, year);
      this.finish = false;
    },

    setStatus(header, item) {
      var index = this.report_key_rv_data.findIndex(
        (dessert) => dessert.id === item.id
      );
      if (header.value === "transfer_jv") {
        this.report_key_rv_data[index].statusTransferJv = !this
          .report_key_rv_data[index].statusTransferJv;
      } else {
        this.report_key_rv_data[index].statusSuspenseJv = !this
          .report_key_rv_data[index].statusSuspenseJv;
      }
    },
    number_INC() {
      return Number(this.item_per_page);
    },
    item_per_page_inc() {
      this.getReportOverview();
    },
    pageChange() {
      this.getReportOverview();
    },

    getReportKeyRV(
      month = this.nowDate.split("-")[1],
      year = this.nowDate.split("-")[0]
    ) {
      this.finish = false;
      this.report_key_rv_data = [];
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
          process.env.VUE_APP_API +
            `/statement/dashboard/report/key_rv?month=${month}&year=${year}`,
          headers
        )
        .then((response) => {
          if (response.status === 200) {
            this.finish = true;
            this.report_key_rv_data = response.data.data.map((item, index) => {
              let obj = { ...item };
              obj.id = index + 1;
              obj.statusTransferJv = false;
              obj.statusSuspenseJv = false;
              return obj;
            });

            /*get api card 7*/
            this.inet_count_all = response.data.inet_count_all;
            this.transfer_inet_amount = response.data.transfer_inet_amount;
            this.suspense_inet_amount = response.data.suspense_inet_amount;
            this.total_amount_all = response.data.total_amount_all;
            this.jv_count_all = response.data.jv_count_all;
            this.transfer_jv_amount = response.data.transfer_jv_amount;
            this.suspense_jv_amount = response.data.suspense_jv_amount;
          } else {
            this.finish = true;
            this.report_key_rv_data = [];
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
    },
    parseDateRequest(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
.v-main_wrap >>> .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
  max-width: 100% !important;
}
/* @media (min-width: 2000px) {
  .container {
    max-width: 100%;
    background-color: rgb(250, 250, 250);
  }
} */

/* @media only screen and (max-width: 580px) {
  .search-area {
    display: flex !important;
  }
  .screen {
    display: none !important;
  }
  .mobile {
    display: block !important;
  }
} */
.v-data-table {
  overflow: auto;
  width: auto;
}
.font_style {
  font-family: "Bai_Jamjuree" !important;
}
/* .container {
  width: 100% !important;
  font-family: "Bai_Jamjuree" !important;
  background-color: rgb(250, 250, 250);
} */
.v-card-title {
  font-family: "Bai_Jamjuree" !important;
}

.invoice_date_billing {
  align-items: center;
  width: 320px;
}

.table-report-key-rv {
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
  width: 100% !important;
  overflow: auto !important;
}
#report-key-rv >>> table {
  border-collapse: separate; /* Don't collapse */
  border-spacing: 0;
  position: relative;
  height: 70px;
  border-collapse: collapse;
}
#report-key-rv >>> th:first-child {
  vertical-align: middle;
  background-color: #185362 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 18px !important;
  /* font-weight: 600; */
  border-right: 1px solid #abafab !important;
  border-top-left-radius: 8px !important;
  /* width: 150px !important; */
}
#report-key-rv >>> th:nth-child(2) {
  vertical-align: middle;
  background-color: #2d8881 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 18px !important;
  /* font-weight: 700; */
  /* border-right: 1px solid #2d8881 !important; */
}
#report-key-rv >>> th:nth-child(3) {
  vertical-align: middle;
  background-color: #2d8881 !important;
  color: rgb(255, 255, 255) !important ;
  font-size: 18px !important;
  /* font-weight: 700; */
  /* border-right: 1px solid #2d8881 !important; */
}
#report-key-rv >>> th:nth-child(4) {
  vertical-align: middle;
  background-color: #2d8881 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 18px !important;
  /* font-weight: 700; */
  /* border-right: 1px solid #abafab !important; */
}
#report-key-rv >>> th:nth-child(5) {
  vertical-align: middle;
  background-color: #5faca8 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 18px !important;
  /* font-weight: 700; */
  /* border-right: 1px solid #5faca8 !important; */
}
#report-key-rv >>> th:nth-child(6) {
  vertical-align: middle;
  background-color: #5faca8 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 18px !important;
  /* font-weight: 700; */
  /* border-right: 1px solid #5faca8 !important; */
}
#report-key-rv >>> th:nth-child(7) {
  vertical-align: middle;
  background-color: #5faca8 !important;
  color: rgb(255, 255, 255) !important;
  font-size: 18px !important;
  /* font-weight: 700; */
  /* border-right: 1px solid gray !important; */
  border-top-right-radius: 8px !important;
}
#report-key-rv >>> tr {
  height: 70px !important;
  color: black !important;
}
#report-key-rv >>> td {
  vertical-align: middle;
  background-color: rgb(255, 255, 255) !important;
  font-size: 16px !important;
  height: 70px !important;
}
#report-key-rv >>> td:first-child {
  vertical-align: middle;
  background-color: rgb(255, 255, 255) !important;
  font-size: 16px !important;
  border-right: 1px solid gray !important;
  height: 70px !important;
}
#report-key-rv >>> td:nth-child(2) {
  vertical-align: middle;
  background-color: rgb(255, 255, 255) !important;
  font-size: 16px !important;
  border-right: 0px solid rgba(255, 255, 255, 0) !important;
  height: 70px !important;
}
#report-key-rv >>> td:nth-child(4) {
  vertical-align: middle;
  background-color: rgb(255, 255, 255) !important;
  font-size: 16px !important;
  border-right: 1px solid gray !important;
  height: 70px !important;
}

.font-text-alert {
  font-family: "Bai_Jamjuree" !important;
}

.v-pagination {
  justify-content: right !important;
}
/* .swal2-title {
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
} */
.text-h5 {
  font-family: "Bai_Jamjuree" !important;
}
.font-text {
  font-family: "Bai_Jamjuree" !important;
}
.mdi-arrow-up::before {
  content: none;
}

/* ======================================loading..============================================== */
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
/* ======================================End loading..========================================== */
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
</style>
