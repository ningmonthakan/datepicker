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
            class="font-style"
          >
            <h3 style="font-weight: 700">ประวัติการชำระ</h3>
            <v-spacer></v-spacer>
        
          </v-col>
    
                <template>

            <v-col cols="6">
              <v-card style="padding: 1px">
                <v-card-title style="display: block">
                  <div
                    class="d-flex"
                    style="align-items: center; justify-content: space-between"
                  >
                    <v-icon
                      style="
                        font-size: 28px;
                        padding: 5px;
                        color: white;
                        background-color: #3bb8c6;
                      "
                      >mdi-account</v-icon
                    >
                    <label style="font-size: 1.2vw; text-align: right"
                      >Count</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div
                    style="font-size: 1.2vw; text-align: right; font-weight: 700"
                  >
                    {{ datalist.length }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card style="padding: 1px">
                <v-card-title style="display: block">
                  <div
                    class="d-flex"
                    style="align-items: center; justify-content: space-between"
                  >
                    <v-icon
                      style="
                        font-size: 28px;
                        padding: 5px;
                        color: white;
                        background-color: #3bb8c6;
                      "
                      >mdi-account-supervisor</v-icon
                    >
                    <label style="font-size: 1.2vw; text-align: right"
                      >Total</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div
                    style="font-size: 1.2vw; text-align: right; font-weight: 700"
                  >
                    {{ total }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
          </template>

          <v-col cols="12">
            <v-card>
              <v-card-title>
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

                <v-spacer></v-spacer>
                <v-form
                  @submit.prevent="searchWord()"
                  style="display: flex; align-items: center"
                  class="search-area"
                >
                  <v-text-field
                    v-model="search"
                    label="Cus No,Invoice Number"
                    single-line
                    hide-details
                    autocomplete="off"
                    style="width: 400px"
                  ></v-text-field>
                  <v-btn color="primary" type="submit" style="font-size: 12px">
                    Search
                    <v-icon right dark> mdi-magnify </v-icon>
                  </v-btn>
                </v-form>
              </v-card-title>

              <v-card-text>
                <label style="font-size: 12px; float: right"
                  >data : {{ datalist.length }}</label
                >
                <div class="table-log-cus">
                  <v-data-table
                    :headers="headers_main"
                    :items="datalist"
                    fixed-header
                    height="550px"
                    :items-per-page="item_per_page"
                    :hide-default-footer="true"
                    id="log-billing-table"
                  >
                    <template v-slot:[`item.invoice_no`]="{ item }" class="fixed">
                      {{ item.invoice_no }}
                    </template>

                    <template v-slot:[`item.amount_after_vat`]="{ item }">
                      <v-chip :color="getColor(item.amount_after_vat)" dark>
                        {{ covert_digit(item.amount_after_vat) }}
                      </v-chip>
                    </template>

                    <template v-slot:[`item.date_bill`]="{ item }">
                      {{ covert_date(item.date_bill) }}
                    </template>

                    <template v-slot:[`item.rv_receipt_date`]="{ item }">
                      {{ covert_date(item.rv_receipt_date) }}
                    </template>
                  </v-data-table>

                  <div class="d-flex" style="float: right; margin-top: 20px">
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        margin-right: 10px;
                      "
                    >
                      Items per page:
                    </div>

                    <select
                      style="width: 80px; margin-right: 20px"
                      class="style-chooser"
                      v-model="item_per_page"
                      @change="item_per_page_inc()"
                    >
                    
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                      <!-- <option value="1500">1500</option> -->
                    </select>
                    <v-pagination
                      style="justify-content: flex-end"
                      v-model="page"
                      :length="page_total"
                      :total-visible="10"
                      @input="pageChange()"
                    ></v-pagination>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
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
// import { BModal, VBModal } from "bootstrap-vue";
// import Swal from "sweetalert2";

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    search: "",
    finish: false,
    datalist: [],
    headers_main: [
      {
        text: "Cus No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        class: "fixed-log",
      },
      {
        text: "Cus Name.",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Invoice number",
        sortable: true,
        value: "invoice_no",
        width: "250px",
      },
      {
        text: "Total Amout",
        value: "amount_after_vat",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ใบเสร็จ",
        value: "date_bill",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ใบเสร็จ",
        value: "receipt_number",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ตัดหนี้",
        value: "rv_receipt_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ตัดหนี้",
        value: "rv_number",
        width: "200px",
        sortable: true,
        align: "center",
      },
    ],
    item_per_page: 100,
    page: 1,
    page_total: 1,
    total : 0,
    count:0,
  }),
  created() {
    this.Init();
  },
  watch: {},
  computed: {},
  methods: {
    Init() {
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
            "/getinvoicestatus/paymenthistory?size=" +
            this.item_per_page +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          if (response.data) {
            this.datalist = response.data.data;
            this.page_total = response.data.count_page;
            this.item_per_page = response.data.count;
            // this.count = response.data.count;
            this.total = response.data.total.toLocaleString();
            if(response.data.count < 100) {
              this.item_per_page = 100
            }
            this.finish = true;
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
          }
        });
    },
    item_per_page_inc() {
      this.finish = false;
      this.Init();
    },
    pageChange() {
      this.finish = false;
      this.Init();
    },
    covert_date(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    covert_digit(number) {
      return number.toLocaleString();
    },
    getColor(data) {
      if (data) {
        return "#16A7BC";
      }
    },
    refreshData() {
      this.finish = false;
      this.search = "";
     this.page = 1,
      this.Init();
    },
    searchWord() {
      this.finish = false;
      if(this.search == '' || this.search == null) {
        this.page = 1
      }
      this.Init();
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
.font-style {
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
  .style-chooser {
    border: 1px solid rgb(224, 224, 224);
    border-radius: 1px;
    width: 100%;
    height: 48px;
    padding-left: 7px;
    cursor: pointer;
  }
  .table-log-cus {
    background-position: center;
    background-repeat: no-repeat;
    font-family: "Bai_Jamjuree" !important;
    z-index: 10 !important;
    width: 100% !important;
    overflow: auto !important;
    #log-billing-table {
      th {
        font-family: "Bai_Jamjuree";
        font-size: 14px;
        vertical-align: middle;
        height: 48px;
        font-weight: 600;
      }
      th.text-start:first-child {
        position: sticky;
        left: 0;
        z-index: 5 !important;
      }
      th.text-start.fixed-log.sortable {
        font-weight: 600;
        position: sticky;
        z-index: 5 !important;
        // border-right: 1px solid #cccccc;
        // background-color: rgb(168, 255, 214) !important;
        background: linear-gradient(
          90deg,
          #ececec 99%,
          rgba(101, 101, 101, 1) 100%
        ) !important;
      }

      th.text-start {
        background-color: #ececec !important;
      }
      th.text-center {
        background-color: #ececec !important;
      }
      th.text-left {
        background-color: #ececec !important;
      }
      textarea.form-control {
        resize: auto !important;
        overflow: hidden !important;
        max-height: 100000px !important;
      }

      .theme--light.v-data-table
        > .v-data-table__wrapper
        > table
        > tbody
        > tr:not(:last-child)
        > td:not(.v-data-table__mobile-row),
      .theme--light.v-data-table
        > .v-data-table__wrapper
        > table
        > tbody
        > tr:not(:last-child)
        > th:not(.v-data-table__mobile-row) {
        // border-bottom: thin solid rgba(0, 0, 0, 0.12);
        /* padding-top: 7px; */
        vertical-align: middle;
      }

      ::v-deep.sticky-header {
        position: sticky;
        top: var(--toolbarHeight);
      }

      ::v-deep.v-data-table__wrapper {
        overflow: unset;
      }
      .fixed {
        position: sticky !important;
        top: auto !important;
        z-index: 1 !important;
        background-color: white;
        // border-right: 1px solid #cccccc;
        background: linear-gradient(
          90deg,
          rgba(253, 253, 253, 1) 99%,
          rgba(101, 101, 101, 1) 100%
        ) !important;
      }
      tbody {
        td {
          background-color: white !important;
          font-size: 12px !important;
        }

        td.text-start:first-child {
          font-size: 12px !important;
          font-family: "Bai_Jamjuree" !important;
          position: sticky !important;
          width: 200px !important;
          left: 0 !important;
          z-index: 1 !important;
          // border-right: none !important;
          // border-right: 1px solid rgb(190, 190, 190);
          background: linear-gradient(
            90deg,
            #ffffff 99%,
            rgba(101, 101, 101, 1) 100%
          ) !important;
        }
        td.text-start {
          font-size: 12px !important;
        }
      }
    }
  }
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
  z-index: 1000;
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
  animation-delay: 0.84s;
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