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
          <h3 style="font-weight:700">Log Request</h3>
        </v-col>
        <v-col cols="12">
          <v-card>
            <!-----------------------------Tab ------------------------------------>
            <v-card-text>
              <v-tabs v-model="tab" background-color="transparent">
                <v-tab v-for="item in tab_items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <!-- --------------------------------------table Main ใบแจ้งหนี้--------------------------------------------- -->
                <v-tab-item>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-form
                      @submit.prevent="searchWord_1()"
                      style="display: flex; align-items: center"
                      class="search-area"
                    >
                      <v-text-field
                        v-model="search_1"
                        label="Invoice number, Cus No, Cus Name"
                        single-line
                        hide-details
                        autocomplete="off"
                        style="width: 480px"
                      ></v-text-field>
                      <v-btn
                        color="primary"
                        type="submit"
                        style="font-size: 12px"
                      >
                        Search
                        <v-icon right dark> mdi-magnify </v-icon>
                      </v-btn>
                      <div style="width: 10px"></div>
                    </v-form>
                    <v-btn
                      color="red"
                      dark
                      @click="clearFilter_1()"
                      class="screen"
                      style="font-size: 12px"
                    >
                      Clear All
                    </v-btn>
                  </v-card-title>
                  <div class="cover-table">
                    <div class="table-invoice" style="position: relative">
                      <v-data-table
                        :headers="headers"
                        :items="datalist_1"
                        :hide-default-footer="true"
                        class="table_in_book1"
                        fixed-header
                        height="600px"
                        id="invoice_book_1"
                        :items-per-page="datalist_1.length"
                      >
                        <template v-slot:[`item.amount_after_vat`]="{ item }">
                          <label>
                            {{ item.amount_after_vat.toLocaleString() }}
                          </label>
                        </template>
                      
                        <template v-slot:[`item.created_at`]="{ item }">
                          <label
                            v-if="parseDate(item.created_at) != '01/01/0001'"
                          >
                            {{ parseDate(item.created_at) }}</label
                          >
                        </template>
                      </v-data-table>

                      <div
                        class="d-flex"
                        style="float: right; margin-top: 20px"
                      >
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
                          v-model="item_per_page_table_1"
                          @change="item_per_page_inc_table_1()"
                        >
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="300">300</option>
                          <option value="500">500</option>
                          <option value="1000">1000</option>
                        </select>
                        <v-pagination
                          style="justify-content: flex-end"
                          v-model="page_table_1"
                          :length="page_total_table_1"
                          :total-visible="10"
                          @input="pageChangeTable1()"
                        ></v-pagination>
                      </div>
                    </div>
                  </div>
                  <!-- ------------------------------------End table Main ใบแจ้งหนี้--------------------------------------------- -->
                </v-tab-item>
                <!-- --------------------------------------table Main ใบเสร็จ--------------------------------------------- -->
                <v-tab-item>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-form
                      @submit.prevent="searchWord_2()"
                      style="display: flex; align-items: center"
                      class="search-area"
                    >
                      <v-text-field
                        v-model="search_2"
                        label="Invoice number, Cus No, Cus Name, INET/JV"
                        single-line
                        hide-details
                        autocomplete="off"
                        style="width: 480px"
                      ></v-text-field>
                      <v-btn
                        color="primary"
                        type="submit"
                        style="font-size: 12px"
                      >
                        Search
                        <v-icon right dark> mdi-magnify </v-icon>
                      </v-btn>
                      <div style="width: 10px"></div>
                    </v-form>
                    <v-btn
                      color="red"
                      dark
                      @click="clearFilter_2()"
                      class="screen"
                      style="font-size: 12px"
                    >
                      Clear All
                    </v-btn>
                  </v-card-title>
                  <div class="cover-table">
                    <div class="table-invoice" style="position: relative">
                      <v-data-table
                        :headers="headers"
                        :items="datalist_2"
                        :hide-default-footer="true"
                        class="table_in_book1"
                        fixed-header
                        height="600px"
                        id="invoice_book_1"
                        :items-per-page="datalist_2.length"
                      >
                        <template v-slot:[`item.amount_after_vat`]="{ item }">
                          <label>
                            {{ item.amount_after_vat.toLocaleString() }}
                          </label>
                        </template>

                        <template v-slot:[`item.created_at`]="{ item }">
                          <label
                            v-if="parseDate(item.created_at) != '01/01/0001'"
                          >
                            {{ parseDate(item.created_at) }}</label
                          >
                        </template>
                      </v-data-table>

                      <div
                        class="d-flex"
                        style="float: right; margin-top: 20px"
                      >
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
                          v-model="item_per_page_table_2"
                          @change="item_per_page_inc_table_2()"
                        >
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="300">300</option>
                          <option value="500">500</option>
                          <option value="1000">1000</option>
                        </select>
                        <v-pagination
                          style="justify-content: flex-end"
                          v-model="page_table_2"
                          :length="page_total_table_2"
                          :total-visible="10"
                          @input="pageChangeTable2()"
                        ></v-pagination>
                      </div>
                    </div>
                  </div>
                  <!-- ------------------------------------End table Main ใบเสร็จ--------------------------------------------- -->
                </v-tab-item>
                <!-- --------------------------------------table Main ติดตามการชำระ --------------------------------------------- -->
                 <v-tab-item>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-form
                      @submit.prevent="searchWord_3()"
                      style="display: flex; align-items: center"
                      class="search-area"
                    >
                      <v-text-field
                        v-model="search_3"
                        label="Invoice number, Cus No, Cus Name, INET/JV"
                        single-line
                        hide-details
                        autocomplete="off"
                        style="width: 480px"
                      ></v-text-field>
                      <v-btn
                        color="primary"
                        type="submit"
                        style="font-size: 12px"
                      >
                        Search
                        <v-icon right dark> mdi-magnify </v-icon>
                      </v-btn>
                      <div style="width: 10px"></div>
                    </v-form>
                    <v-btn
                      color="red"
                      dark
                      @click="clearFilter_3()"
                      class="screen"
                      style="font-size: 12px"
                    >
                      Clear All
                    </v-btn>
                  </v-card-title>
                  <div class="cover-table">
                    <div class="table-invoice" style="position: relative">
                      <v-data-table
                        :headers="headers"
                        :items="datalist_3"
                        :hide-default-footer="true"
                        class="table_in_book1"
                        fixed-header
                        height="600px"
                        id="invoice_book_1"
                        :items-per-page="datalist_3.length"
                      >
                        <template v-slot:[`item.amount_after_vat`]="{ item }">
                          <label>
                            {{ item.amount_after_vat.toLocaleString() }}
                          </label>
                        </template>

                        <template v-slot:[`item.created_at`]="{ item }">
                          <label
                            v-if="parseDate(item.created_at) != '01/01/0001'"
                          >
                            {{ parseDate(item.created_at) }}</label
                          >
                        </template> 
                      </v-data-table>

                      <div
                        class="d-flex"
                        style="float: right; margin-top: 20px"
                      >
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
                          v-model="item_per_page_table_3"
                          @change="item_per_page_inc_table_3()"
                        >
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="300">300</option>
                          <option value="500">500</option>
                          <option value="1000">1000</option>
                        </select>
                        <v-pagination
                          style="justify-content: flex-end"
                          v-model="page_table_3"
                          :length="page_total_table_3"
                          :total-visible="10"
                          @input="pageChangeTable3()"
                        ></v-pagination>
                      </div>
                    </div>
                  </div>
                  <!-- ------------------------------------End table Main ติดตามการชำระ--------------------------------------------- -->
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";

const orders = [
  {
    action_by_account_id: "",
    action_by_name: "",
    amount_after_vat: null,
    collection_letter_first_date: null,
    collection_letter_second_date: null,
    created_at: null,
    customer_email: null,
    customer_name: null,
    customer_no: null,
    customer_pay: null,
    invoice_date: null,
    debt_number: null,
    deleted_at: null,
    due_date: null,
    end_date: null,
    finance_id: null,
    finance_name: null,
    finance_tel_no: null,
    invoice_no: null,
    invoice_uid: null,
    main_status: null,
    memo_date: null,
    memo_no: "",
    receipt_number:"",
    recheck: "",
    remain_day: null,
    sale_email: null,
    sale_id: null,
    sale_name: null,
    sale_team: null,
    seq: null,
    so_number: null,
    start_date: null,
    status: null,
    status_debt: null,
    status_down_service: null,
    status_finance: null,
    status_rpa: null,
    status_sale: null,
    uid: null,
    user_name: ""
  },
];

export default {
  data: () => ({
    finish: true,
    tab: null,
    tab_items: ["ใบแจ้งหนี้", "ใบเสร็จรับเงิน", "แจ้งเตือนติดตามการชำระ" ],
    search_1: "",
    search_2: "",
    search_3: "",
    item_per_page_table_1: 100,
    page_table_1: 1,
    page_total_table_1: 1,

    item_per_page_table_2: 100,
    page_table_2: 1,
    page_total_table_2: 1,

    item_per_page_table_3: 100,
    page_table_3: 1,
    page_total_table_3: 1,
    // ==========serach====================
    headers: [
      {
        text: "Invoice No.",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      {
        text: "Customer Number.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer Name.",
        value: "customer_name",
        width: "250px",
        sortable: true,
        align: "left",
      },
      {
        text: "Amount (Inc. VAT)",
        value: "amount_after_vat",
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
        text: "Customer Email",
        value: "customer_email",
        width: "350px",
        sortable: true,
        align: "left",
      },
      {
        text: "Request Date",
        value: "created_at",
        width: "180px",
        sortable: true,
        align: "left",
      },
      {
        text: "User",
        value: "user_name",
        width: "200px",
        sortable: true,
        align: "left",
      },
    ],
    customer_invoice_list: orders,
    datalist_1: [], //ตารางใบแจ้งหนี้
    datalist_2: [], //ตารางใบเสร็จ
    datalist_3: [], //ตารางติดตามการชำระ

  }),
  created() { 
      this.finish = false;
      this.getLogBilling();
      this.getLogReceipt();
      this.getLogSendMail()
  },
  watch: {},
  computed: {},

  methods: {
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    // ฟังก์ชั่นแสดงข้อมูลใบแจ้งหนี้
    getLogBilling() {
      this.finish = false;
      this.datalist_1 = [];
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
            "/getinvoicestatus/searchlogbilling?size=" +
            this.item_per_page_table_1 +
            "&page=" +
            this.page_table_1 +
            "&search=" +
            String(this.search_1),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_1 = response.data.data;
            this.page_total_table_1 = response.data.count_page;
          } else {
            this.finish = true;
            this.page_total_table_1 = 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    // ฟังก์ชั่นแสดงข้อมูลใบเสร็จ
    getLogReceipt() {
      this.finish = false;
      this.datalist_2 = [];
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
            "/getinvoicestatus/searchlogreceipt?size=" +
            this.item_per_page_table_2 +
            "&page=" +
            this.page_table_2 +
            "&search=" +
            String(this.search_2),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_2 = response.data.data;
            this.page_total_table_2 = response.data.count_page;
          } else {
            this.finish = true;
            this.page_total_table_2 = 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    getLogSendMail() {
      this.finish = false;
      this.datalist_3 = [];
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
            "/getinvoicestatus/searchlogsendmail?size=" +
            this.item_per_page_table_3 +
            "&page=" +
            this.page_table_3 +
            "&search=" +
            String(this.search_3),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_3 = response.data.data;
            this.page_total_table_3 = response.data.count_page;
          } else {
            this.finish = true;
            this.page_total_table_3 = 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
        
    item_per_page_inc_table_1() {
      this.getLogBilling();
    },
    item_per_page_inc_table_2() {
      this.getLogReceipt();
    },
    item_per_page_inc_table_3() {
      this.getLogSendMail();
    },
    pageChangeTable1() {
      this.getLogBilling();
    },
    pageChangeTable2() {
      this.getLogReceipt();
    },
    pageChangeTable3() {
      this.getLogSendMail();
    },
    searchWord_1() {
      this.page_table_1 = 1;
      this.getLogBilling();
    },
    clearFilter_1() {
      this.page_table_1 = 1;
      this.search_1 = "";
      this.getLogBilling();
    },
    searchWord_2() {
      this.page_table_2 = 1;
      this.getLogReceipt();
    },
    clearFilter_2() {
      this.page_table_2 = 1;
      this.search_2 = "";
      this.getLogReceipt();
    },
    searchWord_3() {
      this.page_table_3 = 1;
      this.getLogSendMail();
    },
    clearFilter_3() {
      this.page_table_3 = 1;
      this.search_3 = "";
      this.getLogSendMail();
    },
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
.vdialognew {
  margin-top: 80px !important;
}

.font-text-alert {
  font-family: "Bai_Jamjuree" !important;
}
#modal-scrollable {
  .modal-content {
    width: 500px !important;
    margin: auto;
  }
  .modal_column {
    font-family: "Bai_Jamjuree" !important;
  }
  td.text-start {
    font-family: "Bai_Jamjuree" !important;
    background-color: white !important;
    border-right: none !important;
    border-left: none !important;
  }
  th.text-start {
    z-index: 5 !important;
    position: sticky;
    padding-top: 12px;
    background-color: rgb(163, 218, 255) !important;
    font-family: "Bai_Jamjuree" !important;
  }
  button.close {
    display: none;
  }
}
// ==================modal================================================//
.modal-content {
  width: 380px;
  margin: auto;
}
.bx--date-picker {
  display: flex;
  align-items: center;
  width: 100%;
  margin: auto;
  justify-content: space-around;
}

button.close {
  font-size: 24px;
}

// =======================end model=======================================//
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

th.text-start:first-child {
  position: sticky;
  left: 0;
  z-index: 5 !important;
}
.blank {
  background: linear-gradient(
    90deg,
    rgba(253, 253, 253, 1) 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
  position: sticky;
  width: 5em;
  left: 0;
  top: auto;
  z-index: 1 !important;
  background-color: white;
  // border-right: 1px solid #cccccc;
}
::v-deep.sticky-header {
  position: sticky;
  top: var(--toolbarHeight);
}

::v-deep.v-data-table__wrapper {
  overflow: unset;
}

th.text-start.invoice1.sortable {
  position: sticky;
  left: 0px !important;
  z-index: 5 !important;
  padding-top: 14px;
  // border-right: 1px solid #cccccc;
  // background-color: rgb(168, 255, 214) !important;
  background: linear-gradient(
    90deg,
    #ececec 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
}

.fixed-invoice-book1 {
  position: sticky !important;
  left: 0px !important;
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

th.text-start.invoice1_modal.sortable {
  position: sticky;
  left: 0px !important;
  z-index: 5 !important;
  padding-top: 14px;
  // border-right: 1px solid #cccccc;
  // background-color: rgb(168, 255, 214) !important;
  background: linear-gradient(
    90deg,
    rgb(199, 224, 236) 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
}
#invoice_book_1_modal {
  th.text-start {
    background-color: rgb(199, 224, 236) !important;
  }
  th.text-center {
    background-color: rgb(199, 224, 236) !important;
  }
  th.text-left {
    background-color: rgb(199, 224, 236) !important;
  }

  tbody {
    td.text-start:first-child {
      position: sticky !important;
      left: 0px !important;
      z-index: 5 !important;
      padding-top: 14px;
      // border-right: 1px solid #cccccc;
      // background-color: rgb(168, 255, 214) !important;
      background: linear-gradient(
        90deg,
        #cbecc7 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }

    td.text-start {
      left: 200px;
      top: auto;
      z-index: 2 !important;
      background-color: white;
     
    }

    td.text-center.fixed {
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      z-index: 0;
    }

    td.text-start:first-child {
      //   position: sticky;
      width: 20px !important;
      left: 0;
      border-right: none !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
  }
}
#invoice_book_1 {
  tbody {
    td.text-start {
      position: sticky !important;
      left: 0px;
      top: auto;
      z-index: 2 !important;
      background-color: white;
      // border-right: 1px solid #cccccc;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }

    td.text-center.fixed {
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      z-index: 0;
    }

    td.text-start:first-child {
      //   position: sticky;
      width: 20px !important;
      left: 0;
      border-right: none !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;

    }
  }
}
h5#modal-center-so-end-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-start-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-end-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-invoice-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}

h5#modal-center-date-bill___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-estimate-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-forecast-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-confirm-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-paid-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-asking_payment-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-postpone_one-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-postpone_two-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-postpone_three-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-remark-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}

.dialog_date {
  font-family: "Bai_Jamjuree" !important;
}
// =========================================
.dx-list-item-content {
  font-family: "Bai_Jamjuree" !important;
}
.dx-editor-cell .dx-texteditor .dx-texteditor-input {
  font-family: "Bai_Jamjuree" !important;
}
.dx-scrollable-scroll-content {
  display: none;
}
.dx-scrollable-scrollbar
  .dx-widget
  .dx-scrollbar-horizontal
  .dx-scrollbar-hoverable
  .dx-scrollable-scroll-content {
  display: none !important;
}
.dx-scrollable-scroll.dx-state-invisible {
  display: none !important;
}
.cover-table {
  width: 100%;
  overflow: auto;
  font-family: "Bai_Jamjuree" !important;
}
#gridContainer {
  height: auto;
}
.container {
  // width: 100% !important;
  font-family: "Bai_Jamjuree" !important;
}
.v-card-title {
  font-family: "Bai_Jamjuree" !important;
}

@media (min-width: 960px) {
  .container {
    max-width: 100%;
  }
}
button.refresh-btn {
  // border: 1px solid #02a9db;
  // background-color: #02a9db;
  border-radius: 7px;
  color: rgb(53, 53, 53);
  font-family: "Bai_Jamjuree";
}
.dx-scrollable-container {
  overflow: auto;
}
.dx-datagrid-headers {
  padding: 0px !important;
}
.mobile {
  display: none;
}
.v-dialog--fullscreen {
  top: 64px !important;
}
#data-grid-demo {
  .container {
    width: 100% !important;
    font-family: "Bai_Jamjuree" !important;
  }
  .dx-data-row .amount {
    // color: rgb(43, 43, 43) !important;
    // font: 20px;
    font-weight: bold;
    font-weight: 900;
    // td:nth-child(even) {
    //   background-color: gray;
    // }
    // border-bottom: 1px solid gray;
  }
  tr:nth-child(even) {
    background-color: rgb(247, 247, 247);

    // border: 1px solid rgb(218, 218, 218);
  }
  tr.dx-row.dx-column-lines.dx-header-row {
    background-color: rgb(168, 255, 214) !important;
    color: rgb(37, 37, 37);
    font-family: "Bai_Jamjuree";
    font-size: 14px;
    height: 50px;
  }
  .dx-datagrid .dx-datagrid-headers .dx-header-row > td {
    outline: 0;
    vertical-align: middle;
  }
  .dx-datagrid-rowsview .dx-row {
    height: 48px !important;
    font-family: "Bai_Jamjuree";
  }
  .remark {
    .dx-texteditor-input {
      text-align: left !important;
    }
  }
  td {
    word-wrap: break-word;
  }
  .search-area {
    display: flex;
  }
  .screen {
    display: flex !important;
  }

  @media (min-width: 960px) {
    .container {
      max-width: 100%;
    }
  }
  @media only screen and (min-width: 401px) {
    .search-area {
      display: flex !important;
      width: 100%;
    }
  }
}
@media only screen and (max-width: 580px) {
  .search-area {
    display: flex !important;
  }
  .screen {
    display: none !important;
  }
  .mobile {
    display: block !important;
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
  z-index: 100000 !important;
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
revo-grid {
  height: 100%;
}
table:not(v-date-picker) {
  position: relative !important;
  // background-color: palegreen;
  //table style here excep Datepiker
}
.table_in_book1 {
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
}
table {
  position: relative !important;
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
th.text-right {
  background-color: #ececec !important;
}
td.text-center {
  // padding: 0 !important;
  height: 100% !important;
  width: 100% !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.disable-events {
  pointer-events: none;
}
.table-invoice {
  width: 100%;
  overflow: auto;
  word-break: break-all;
}
.v-data-table {
  overflow: auto;
  width: auto;
}
.v-data-table th {
  background-color: rgb(203, 236, 199);
}
tr {
  background-color: white !important;
}
th {
  font-size: 14px !important;
}
input.form-control {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  border-radius: 1px;
}
input::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
.style-chooser {
  border: 1px solid rgb(224, 224, 224);
  border-radius: 1px;
  width: 100%;
  height: 48px;
  padding-left: 7px;
  cursor: pointer;
}
.v-select__selections {
  align-items: center;
  display: flex;
  flex: 1 1;
  flex-wrap: wrap;
  line-height: 18px;
  max-width: 100%;
  min-width: 0;
  padding-left: 10px;
}
.inv_color {
  background-color: rgb(11, 168, 11);
  color: green;
}
.vdp-datepicker__calendar {
  // position: absolute !important;
  z-index: 1000000000 !important;
  background: #fff;
  width: 300px;
  border: 1px solid #ccc;
}
.theme--light.v-label {
  color: rgba(0, 0, 0, 0.6);
  left: 5px !important;
}
</style>
