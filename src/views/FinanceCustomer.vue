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
            <h3 style="font-weight: 700" class="font_style">Finance</h3>
            <v-spacer></v-spacer>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title style="padding-bottom: 2px">
                สรุปลูกค้าตามเจ้าหน้าที่การเงิน
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <v-card-text>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 0;
                  "
                >
                  <div>
                    <a
                      class="btn refresh-btn font_style"
                      color="primary"
                      @click="refreshData()"
                      style="font-size: 13px"
                    >
                      Refresh:
                      <v-icon black style="font-size: 14px">mdi-refresh</v-icon>
                    </a>
                  </div>

                  <label style="font-size: 12px; float: right"
                    >data : {{ datalist.length }}</label
                  >
                </div>

                <!-- --------------------------------------table--------------------------------------------- -->
                <div class="table-finance-cus">
                  <v-data-table
                    :headers="headers"
                    :items="datalist"
                    :search="search"
                    fixed-header
                    height="480"
                    id="finance-customer"
                  ></v-data-table>
                </div>
                <!-- ------------------------------------End tabel --------------------------------------------- -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    
  </div>
</template>

<script>
// import moment from "moment";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
import "carbon-components/css/carbon-components.css";
// import 'carbon-components/css/carbon-components.css';
// import { BModal, VBModal } from "bootstrap-vue";
// import Swal from "sweetalert2";

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    filter: "",
    page: 1,
    datalist: [],
    search: "",
    headers: [
      {
        text: "ชื่อเจ้าหน้าที่การเงิน",
        align: "start",
        value: "financial_name",
        fixed: true,
        width: "250px",
      },
      {
        text: "จำนวนลูกค้าที่ดูแล",
        value: "customer",
        align: "center",
        width: "180px",
      },
      {
        text: "Online Payment",
        value: "online_payment",
        align: "center",
        width: "180px",
      },
      { text: "CHQ", value: "chq", align: "center", width: "180px" },
      { text: "TR", value: "tr", align: "center", width: "180px" },
    ],
    desserts_1: {
      finance_name: "นารี (ไม้โท) 063-197-5317",
      customer_care: "200",
      online_payment: 10,
      chq: 80,
      tr: 110,
    },
    desserts_2: {
      finance_name: "กนกวรรณ(ฝน) 065 725 7379",
      customer_care: "100",
      online_payment: 7,
      chq: 120,
      tr: 50,
    },

    finish: false,
  }),
  created() {
    // this.finish = true;

    this.getDataFinance();
  },
  watch: {},
  computed: {},
  methods: {
    filtered(item) {
      let show = true;

      if (this.filter.length) {
        show = false;

        let filterKeyword = this.filter.toLowerCase();

        Object.keys(item).map(function (key) {
          if (typeof item[key] === "string") {
            let value = item[key].toString().toLowerCase();

            if (value.includes(filterKeyword)) {
              show = true;
            }
          } else if (typeof item[key] === "number") {
            let value = item[key].toString().toLowerCase();

            if (value.includes(filterKeyword)) {
              show = true;
            }
          }
        });
      }

      return show;
    },
    getDataFinance() {
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
        .get(process.env.VUE_APP_API + "/getinvoicestatus/customer", headers)
        .then((response) => {
          if (response.data) {
            this.datalist = response.data;
            this.finish = true;
          }
        });
    },
    refreshData() {
      this.finish = false;
      this.search = "";
      this.datalist = [];
      this.getDataFinance();
    },
  },
};
</script>
<style lang="scss" >
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
  // width: 100% !important;
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

.table-finance-cus {
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
  width: 100% !important;
  overflow: auto !important;
  #finance-customer {
    table {
      border-collapse: separate; /* Don't collapse */
      border-spacing: 0;
      position: relative;
      // border-collapse: collapse;
    }
    th:first-child {
      vertical-align: middle;
      background-color: #a7e1a2;
      font-size: 12px;
      font-weight: 700;
      border-right: 1px solid gray;
    }
    th {
      vertical-align: middle;
      background-color: #a7e1a2;
      font-size: 12px;
      font-weight: 700;
      border-right: 1px solid gray;
    }
    td {
      vertical-align: middle;
      background-color: white;
      font-size: 12px;
      border-right: 1px solid gray;
    }
  }
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