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
            <h3 style="font-weight:700">Log Invoice Dashboard</h3>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center;justify-content: space-between;"
                >
                  <v-icon
                    style="font-size: 28px;padding:5px;color:white;background-color:#14a1c0"
                    >mdi-file-alert-outline</v-icon
                  >
                  <label style="font-size: 1.2vw;text-align:right"
                    >Count Invoive</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">
                  {{ count_invoice }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center;justify-content: space-between;"
                >
                  <v-icon
                    style="font-size: 28px;padding:5px;color:white;background-color:#14a1c0"
                    >mdi-file-multiple-outline</v-icon
                  >
                  <label style="font-size: 1.2vw;text-align:right"
                    >Total Invoice</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">
                  {{ total_count }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center;justify-content: space-between;"
                >
                  <v-icon
                    style="font-size: 28px;padding:5px;color:white;background-color:#22cba1"
                    >mdi-file-table-box-outline</v-icon
                  >
                  <label style="font-size: 1.2vw;text-align:right">Amount</label>
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">
                  {{ sum_amount }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center;justify-content: space-between;"
                >
                  <v-icon
                    style="font-size: 28px;padding:5px;color:white;background-color:#22cba1"
                    >mdi-file-table-box-multiple-outline</v-icon
                  >
                  <label style="font-size: 1.2vw;text-align:right"
                    >Total Amount</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">
                  {{ total_amount }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-form
                  @submit.prevent="searchWord()"
                  style="display: flex; align-items: center"
                  class="search-area"
                >
                  <v-text-field
                    v-model="search"
                    label="Invoice number, Cus No, Cus Name, INET/JV"
                    single-line
                    hide-details
                    autocomplete="off"
                    style="width: 480px"
                  ></v-text-field>
                  <v-btn color="primary" type="submit" style="font-size: 12px">
                    Search
                    <v-icon right dark> mdi-magnify </v-icon>
                  </v-btn>
                  <div style="width: 10px"></div>
                </v-form>
                <v-btn
                  color="red"
                  dark
                  @click="clearFilter"
                  class="screen"
                  style="font-size: 12px"
                >
                  Clear All</v-btn
                >
              </v-card-title>

              <v-card-text>
                <!-- <download-csv :data="debt_data" name="export_log_invoice_all.csv"
                  ><v-btn
                    color="teal"
                    dark
                    style="width: 150px; font-size: 12px; font-weight: 600"
                    text
                  >
                    Export All File
                  </v-btn>
                </download-csv> -->
                <!-- --------------------------------------table--------------------------------------------- -->
                <div class="cover-table">
                  <div class="table-invoice" style="position: relative">
                    <v-data-table
                      :headers="headers"
                      :items="datalist"
                      :items-per-page="number_INC()"
                      class="elevation-3"
                      fixed-header
                      hide-default-footer
                      height="600px"
                      id="log-invoice-table"
                    >
                      <!-- <template v-slot:[`item.date_bill`]="{ item }">
                        <label v-if="parseDate(item.date_bill) != '01/01/0001'">
                          {{ parseDate(item.date_bill) }}</label
                        >
                      </template> -->

                      <!-- <template v-slot:[`item.confirm_date`]="{ item }">
                        <label
                          v-if="parseDate(item.confirm_date) != '01/01/0001'"
                        >
                          {{ parseDate(item.confirm_date) }}</label
                        >
                      </template> -->

                      <template v-slot:[`item.detail`]="{ item }">
                        <v-btn
                          color="success"
                          style="font-size: 12px"
                          @click="open_detail_dialog(item.uid)"
                        >
                          detail
                          <v-icon right dark>mdi-file-search-outline </v-icon>
                        </v-btn>
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
                </div>
                <!-- --------------------------------------table--------------------------------------------- -->
              </v-card-text>
            </v-card>
          </v-col>
          <v-dialog
            v-model="detail_dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Detail</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn icon dark @click="close_detail_dialog()">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <div style="padding: 20px">
                <v-card>
                  <v-card-text>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="log_headers"
                          :items="log_data_list"
                          :items-per-page="number_detail()"
                          class="elevation-3"
                          fixed-header
                          height="650px"
                          hide-default-footer
                          id="log-invoice-table"
                        >
                          <template v-slot:[`item.updated_at`]="{ item }">
                            <label v-if="parseDate(item.updated_at) != '01/01/0001'">
                              {{ parseDate(item.updated_at) }}</label
                            >
                          </template>
                          
                          <template v-slot:[`item.date_bill`]="{ item }">
                            <label v-if="parseDate(item.date_bill) != '01/01/0001'">
                              {{ parseDate(item.date_bill) }}</label
                            >
                          </template>

                          <template v-slot:[`item.estimate_date`]="{ item }">
                            <label
                              v-if="parseDate(item.estimate_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.estimate_date) }}</label
                            >
                          </template>

                          <template v-slot:[`item.confirm_date`]="{ item }">
                            <label
                              v-if="parseDate(item.confirm_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.confirm_date) }}</label
                            >
                          </template>

                          <template v-slot:[`item.incoming_paid_date`]="{ item }">
                            <label
                              v-if="parseDate(item.incoming_paid_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.incoming_paid_date) }}</label
                            >
                          </template>

                          <template v-slot:[`item.asking_payment_date`]="{ item }">
                            <label
                              v-if="
                                parseDate(item.asking_payment_date) != '01/01/0001'
                              "
                            >
                              {{ parseDate(item.asking_payment_date) }}</label
                            >
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
                            Rows per page:
                          </div>

                          <select
                            style="width: 80px; margin-right: 20px"
                            class="style-chooser"
                            v-model="row_per_page"
                            @change="row_per_page_inc()"
                          >
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <!-- <option value="1500">1500</option> -->
                          </select>
                          <v-pagination
                            style="justify-content: flex-end"
                            v-model="row"
                            :length="row_total"
                            :total-visible="5"
                            @input="pageRowChange()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-card>
          </v-dialog>
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
import JsonCSV from "vue-json-csv";
Vue.component("downloadCsv", JsonCSV);

const orders = [
  {
    amount_after_vat: "",
    confirm_date: "",
    created_at: "",
    customer_name: "",
    customer_no: "",
    customer_type: "",
    date_bill: "",
    deleted_at: "",
    invoice_no: "",
    invoice_status: "",
    paid: "",
    recheck: "",
    seq: "",
    uid: "",
    updated_at: "",
  },
];

const log_data = [
  {
    action_by_account_id: "",
    action_by_name: "",
    asking_payment: "",
    asking_payment_date: "",
    billing_checking: "",
    billing_remark: "",
    billing_status: "",
    billing_type_detail: "",
    cn_number: "",
    confirm_date: "",
    created_at: "",
    customer_description: "",
    customer_email: "",
    customer_info: "",
    date_bill: "",
    deleted_at: "",
    estimate_date: "",
    factoring: "",
    forecast_date: "",
    invoice_no: "",
    invoice_uid: "",
    no_contact: "",
    online_payment: "",
    over_due: "",
    paid: "",
    paid_date: "",
    payment_type: "",
    postpone_one: "",
    postpone_three: "",
    postpone_two: "",
    receipt_number: "",
    recheck: "",
    remain_day: "",
    remark_date: "",
    remark_warroom: "",
    rv_number: "",
    seq: "",
    status_payment: "",
    uid: "",
    updated_at: "",
    user_name: "",
  },
];

export default {
  data: () => ({
    detail_dialog: false,
    page: 1,
    page_total: 1,
    row: 1,
    row_total: 1,
    item_per_page: 100,
    row_per_page: 20,
    count_invoice: 0,
    sum_amount: 0,
    datalist: orders,
    log_data_list: log_data,
    search: "",
    finish: false,
    total_count: 0,
    total_amount: 0,
    debt_data: [],
    detail_uid: "",
    headers: [
      {
        text: "Invoice Number",
        sortable: true,
        value: "invoice_no",
        width: "250px",
        class: "log-invoice",
      },
      {
        text: "Cus No.",
        value: "customer_no",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Cus Name.",
        value: "customer_name",
        width: "250px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer Type",
        value: "customer_type",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Amount (Inc. VAT)",
        value: "amount_after_vat",
        width: "250px",
        sortable: true,
        align: "center",
      },
      // {
      //   text: "วันที่วางบิล",
      //   value: "date_bill",
      //   width: "180px",
      //   sortable: true,
      //   align: "center",
      // },
      // {
      //   text: "วันที่ confirm",
      //   value: "confirm_date",
      //   width: "180px",
      //   sortable: true,
      //   align: "center",
      // },
      // {
      //   text: "Mainstatus",
      //   value: "paid",
      //   width: "240px",
      //   sortable: true,
      //   align: "center",
      // },
      // {
      //   text: "Recheck",
      //   value: "recheck",
      //   width: "240px",
      //   sortable: true,
      //   align: "center",
      // },
      {
        text: "detail",
        value: "detail",
        width: "200px",
        sortable: false,
        align: "center",
      },
    ],
    log_headers: [
      {
        text: "Action By Name",
        sortable: true,
        value: "action_by_name",
        width: "250px",
        class: "log-invoice",
      },
      {
        text: "Date",
        value: "updated_at",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "No Contact",
        value: "no_contact",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "Factoring",
        value: "factoring",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "Online Payment",
        value: "online_payment",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่วางบิล",
        value: "date_bill",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "ประเภทวางบิล",
        value: "billing_type_detail",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "สถานะวางบิล",
        value: "billing_status",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "หมายเหตุสถานะวางบิล",
        value: "billing_status_remark",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "วางบิลพร้อมใบเสร็จ",
        value: "billing_checking",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "หมายเหตุการวางบิล",
        value: "billing_remark",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "สถานะเก็บเงิน",
        value: "status_payment",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "กำหนดชำระ",
        value: "estimate_date",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "Confirm Date",
        value: "confirm_date",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่เงินเข้า",
        value: "incoming_paid_date",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "ช่องทางการชำระเงิน",
        value: "payment_type",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mainstatus",
        value: "paid",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "Recheck",
        value: "recheck",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "สถานะการชำระ",
        value: "status_recheck",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ดำเนินการ",
        value: "asking_payment_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "หมายเหตุ Warroom",
        value: "remark_warroom",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Customer Info",
        value: "customer_info",
        width: "150px",
        sortable: true,
        align: "center",
      }, 
    ],
  }),
  created() {
    this.role_status = localStorage.getItem("role");
    if (this.role_status !== "super_admin" && this.role_status !== "admin" && this.role_status !== "wait_down_service") {
      this.$router.push("/invoice");
    } else if (localStorage.getItem("acces_token")) {
      this.finish = false;
      this.getInvoice();
      this.getTotalAmount()
      // this.Export_AllFile();
    }
    // else {
    //   this.$router.push("/login");
    // }
  },
  watch: {},
  computed: {},

  methods: {
    // export invoice
    // Export_AllFile() {
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
    //     .get(process.env.VUE_APP_API + "/", headers)
    //     .then((response) => {
    //       this.debt_data = response.data.data;
    //       if (this.debt_data !== null) {
    //             this.debt_data.forEach((element) => {
    //               element.DateBill = moment(element.DateBill).format("DD/MM/YYYY");
    //               element.DueDate = moment(element.DueDate).format("DD/MM/YYYY");
    //               element.EndDate = moment(element.EndDate).format("DD/MM/YYYY");
    //               element.MemoDate = moment(element.MemoDate).format("DD/MM/YYYY");
    //               element.RequestDate = moment(element.RequestDate).format("DD/MM/YYYY");
    //               element.StartDate = moment(element.StartDate).format("DD/MM/YYYY");
    //               element.Amount = element.Amount.toLocaleString()
    //             })
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    getInvoice() {
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
          process.env.VUE_APP_API +
            "/log/invoice?size=" +
            this.item_per_page +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          if (response.status === 200) {
            this.finish = true;
            this.datalist = response.data.data;
            if (this.datalist == undefined || this.datalist == null) {
              this.finish = true;
              this.total_count = 0;
              this.count_invoice = 0;
              this.sum_amount = 0;
              this.datalist = [];
              this.page_total = 1;
            }else{
              this.finish = true;
              this.total_count = response.data.total.toLocaleString();
              this.count_invoice = response.data.count.toLocaleString();
              this.sum_amount = response.data.sum_amount.toLocaleString();
              this.page_total = response.data.count_page;
            }
          }else {
            this.finish = true;
            this.datalist = [];
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            this.$router.push("/invoice");
            // console.log(error);
          }
        });
    },
    getTotalAmount() {
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
        .get(process.env.VUE_APP_API + "/invoice/amount", headers)
        .then((amount) => {
          // this.finish = true;
          this.total_amount = amount.data.total_amount.toLocaleString();
        });
    },
    searchWord() {
      this.page = 1;
      this.finish = false;
      this.getInvoice();
    },
    clearFilter() {
      this.search = "";
      this.page = 1;
      this.finish = false;
      this.getInvoice();
    },
    pageChange() {
      this.getInvoice();
    },
    item_per_page_inc() {
      this.getInvoice();
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    number_INC() {
      return Number(this.item_per_page);
    },
    number_detail() {
      return Number(this.row_per_page);
    },
    pageRowChange() {
      this.open_detail_dialog(this.detail_uid);
    },
    row_per_page_inc() {
      this.open_detail_dialog(this.detail_uid);
    },
    open_detail_dialog(uid) {
      this.detail_uid = uid;
      this.detail_dialog = true;
      this.log_data_list = [];
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
        .get(process.env.VUE_APP_API + "/log/invoice/detail/"+ uid + "?size=" + this.row_per_page + "&page=" +
            this.row  , headers)
        .then((response) => {
          if (response.data.data) {
            this.log_data_list = response.data.data;
            this.row_total = response.data.count_page;
          }
          this.finish = true;
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            if(error.response.status == 401){
              localStorage.clear();
              this.$router.push("/login");
            }
          }
        });
    },
    close_detail_dialog() {
      this.detail_dialog = false;
      this.log_data_list = [];
      this.row_per_page = 20;
      this.row = 1;
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
}

@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Medium.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
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

#log-invoice-table {
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

  th.text-start.log-invoice {
    position: sticky;
    z-index: 5 !important;
    left: 0px !important;
    padding-top: 14px;
    // border-right: 1px solid #cccccc;
    // background-color: rgb(168, 255, 214) !important;
    background: linear-gradient(
      90deg,
      #ececec 99%,
      rgba(101, 101, 101, 1) 100%
    ) !important;
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
    background-color: #ececec !important;
    position: sticky;
    left: 0;
    z-index: 4 !important;
  }
  .blank {
    position: sticky;
    left: 0;
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
    td.text-start {
      font-family: "Bai_Jamjuree" !important;
      position: relative !important;
      left: 0;
      top: auto;
      background-color: white;
      // border-right: 1px solid #cccccc;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgb(255, 255, 255) 100%
      ) !important;
    }
    td.text-center {
      font-family: "Bai_Jamjuree" !important;
      position: relative !important;
      left: 0;
      top: auto;
      background-color: white;
      // border-right: 1px solid #cccccc;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgb(255, 255, 255) 100%
      ) !important;
    }
    td.text-start:first-child {
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
  }
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
  z-index: 1100;
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
.table_in {
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
}
table {
  position: relative !important;
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
.v-dialog--fullscreen {
  top: 64px !important;
}
</style>
