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
            <h3 style="font-weight: 700">ส่งดำเนินคดี</h3>
          </v-col>
          <v-col cols="6">
            <v-card style="padding: 2px">
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
                      background-color: #14a1c0;
                    "
                    >mdi-file-alert-outline</v-icon
                  >
                  <label style="font-size: 1.2vw; text-align: right"
                    >Count
                  </label>
                </div>
                <v-spacer></v-spacer>
                <div
                  style="font-size: 1.2vw; text-align: right; font-weight: 700"
                >
                  {{ count_invoice }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card style="padding: 2px">
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
                      background-color: #14a1c0;
                    "
                    >mdi-file-multiple-outline</v-icon
                  >
                  <label style="font-size: 1.2vw; text-align: right"
                    >Total
                  </label>
                </div>
                <v-spacer></v-spacer>
                <div
                  style="font-size: 1.2vw; text-align: right; font-weight: 700"
                >
                  {{ total_count }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <!-- --------------------------------------table Main--------------------------------------------- -->
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
                  @click="clearFilter()"
                  class="screen"
                  style="font-size: 12px"
                >
                  Clear All
                </v-btn>
              </v-card-title>

              <v-card-text>
                <label style="font-size: 12px; float: right"
                  >data show : {{ datalist.length }}</label
                >
                <div class="cover-table">
                  <div class="table-invoice" style="position: relative">
                    <v-data-table
                      :headers="headers"
                      :items="datalist"
                      :items-per-page="count_invoice"
                      :hide-default-footer="true"
                      class="table_in_book1"
                      fixed-header
                      height="600px"
                      id="invoice_book_1"
                    >
                    <!-- col remark main-->
                    <template v-slot:[`item.remark_main`]="{ item }">
                        <b-textarea
                          placeholder="remark"
                          v-model="item.remark_main"
                          rows="1"
                          max-rows="900"
                          style="border-radius: 0px;"
                          :disabled="
                            role_status == 'viewer' || role_status == 'admin'"
                          @change="editRemark('REMARK_MAIN', item)"
                        ></b-textarea>
                      </template>
                    <!-- end remark main-->
                      <template v-slot:[`item.action`]="{ item }">
                        <v-btn
                          color="primary"
                          @click="
                            openInvoice(item),
                              (dialog_info1 = true),
                              (search_book1 = '')
                          "
                          class="screen"
                          style="font-size: 12px"
                        >
                          Detail
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
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                        <!-- <option value="1500">1500</option> -->
                      </select>
                      <v-pagination
                        style="justify-content: flex-end"
                        v-model="page"
                        :length="page_total"
                        :total-visible="5"
                        @input="pageChange()"
                      ></v-pagination>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- ------------------------------------End table Main--------------------------------------------- -->

          <!---------------------------- dialog ส่งดำเนินคดี ---------------------------------->
          <v-dialog
            v-model="dialog_info1"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card class="font-text">
              <v-toolbar dark color="indigo">
                <v-toolbar-title class="font-text">
                  <div class="d-flex">
                    <div style="width: 150px; color: #fffd9e">
                      (ส่งดำเนินคดี) :
                    </div>
                    {{ name_open_dialog }}
                  </div></v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn
                    icon
                    dark
                    @click="
                      (dialog_info1 = false), (search_book1 = ''), getInvoice()
                    "
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>

              <v-col cols="12">
                <v-card>
                  <v-card-text>
                    <div class="d-flex" style="width: 100%">
                      <v-btn
                        text
                        color="#478E37"
                        style="margin-bottom: 10px"
                        @click="(prosecut_dialog = true) , submit_all()"
                        :disabled="
                              selected_1.length == 0 || role_status == 'admin' || role_status == 'viewer' || check_approve == true
                            "
                      >
                        APPROVE
                      </v-btn>
                      <div style="width: 7px"></div>
                      <v-btn
                        text
                        color="error"
                        style="margin-bottom: 10px"
                        @click="(dialog_unapprove = true) , submit_all()"
                        :disabled="
                              selected_1.length == 0 || role_status == 'admin' || role_status == 'viewer' || check_unapprove == true
                            "
                      >
                        UNAPPROVE
                      </v-btn>
                      <!-- <v-spacer></v-spacer>
                      <div style="width: 400px">
                        <v-text-field
                          v-model="search_book1"
                          append-icon="mdi-magnify"
                          label="search"
                          single-line
                          hide-details
                          style="margin-bottom: 10px; margin-top: 0px"
                        ></v-text-field>
                      </div> -->
                    </div>

                    <!-- dialog -->
                    <v-dialog
                      v-model="prosecut_dialog"
                      persistent
                      max-width="1200px"
                      scrollable
                    >
                      <v-card>
                        <v-card-title class="text-h5">
                          <div
                            style="
                              display: block;
                              align-items: center;
                              justify-content: center;
                              text-align: center;
                              margin: auto;
                            "
                          >
                            <v-avatar color="#B4A51A" outlined size="30">
                              <v-icon dark> mdi-scale-balance </v-icon>
                            </v-avatar>
                            <div class="font-text" style="color: #B4A51A">
                              ยืนยันข้อมูลการส่งดำเนินคดี (Approve)
                            </div>
                            <div
                              class="d-flex font-text"
                              style="
                                font-size: 18px;
                                padding-top: 10px;
                                padding-bottom: 20px;
                                justify-content: center;
                                text-align: center;
                              "
                            >
                              Customer :&nbsp;
                              <div style="color: #313b71">
                                {{ name_open_dialog }}
                              </div>
                            </div>
                          </div>

                          <div
                            class="d-flex font-text"
                            style="
                              font-size: 18px;
                              padding-top: 10px;
                              padding-bottom: 10px;
                              width: 100%;
                            "
                          >
                          <v-spacer></v-spacer>
                            <div
                              class="d-flex"
                              style="align-items: center; justify-content: center"
                            > 
                              <div style="width: 190px; font-size: 16px">
                                มูลค่าหนี้ทั้งหมด :
                              </div>
                              <input
                                class="form-control"
                                placeholder="เลขที่ MEMO"
                                disabled
                                v-model="total_aging"
                              />
                            </div>
                          </div>
                        </v-card-title>
                        <v-card-text>
                          <div class="font-text">
                            <div
                              class="font-text"
                              style="height: 280px; word-break: break-all"
                            >
                              <table id="table_select_modal_invoice_book_close">
                                <tr style="font-weight: bold">
                                  <th style="width: 300px; padding: 5px">
                                    Invoice No.&nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    Customer No. &nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Customer Name &nbsp;
                                  </th>
                                  <th style="width: 250px; padding: 5px">
                                    Invoice Date &nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Service &nbsp;
                                  </th>
                                </tr>

                                <tr
                                  v-for="item in modal_submit_all"
                                  :key="item.invoice_no"
                                  style="border-bottom: 1px solid gainsboro"
                                >
                                  <td style="width: 300px">
                                    {{ item.invoice_no }}
                                  </td>
                                  <td style="width: 350px">
                                    {{ item.customer_no }}
                                  </td>
                                  <td style="width: 300px">
                                    {{item.customer_name}}
                                  </td>
                                  <td style="width: 250px">
                                    {{parseDate(item.invoice_date)}}
                                  </td>
                                  <td style="width: 300px">
                                    {{item.service}}
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                              <v-btn
                                color="#CD4342"
                                text
                                @click="prosecut_dialog = false"
                              >
                                CLOSE
                              </v-btn>
                              <v-btn
                                color="#478E37"
                                text
                                @click="approve_prosecute()"
                              >
                                APPROVE
                                <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                              </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- end dialog -->

                    <!-- ----------------------------- dialog Unapprove selected---------------------------------------- -->
                    <v-dialog
                      v-model="dialog_unapprove"
                      persistent
                      max-width="1200px"
                      scrollable
                    >
                      <v-card>
                        <v-card-title class="text-h5">
                          <div
                            style="
                              display: block;
                              align-items: center;
                              justify-content: center;
                              text-align: center;
                              margin: auto;
                            "
                          >
                            <v-avatar color="error" outlined size="30">
                              <v-icon dark> mdi-close </v-icon>
                            </v-avatar>

                            <div class="font-text" style="color: darkred">
                              ยกเลิกการบันทึกข้อมูล
                            </div>

                            <div
                              class="d-flex font-text"
                              style="font-size: 18px; padding-top: 10px"
                            >
                              Customer :&nbsp;
                              <div style="color: darkblue">
                                {{ name_open_dialog }}
                              </div>
                            </div>
                          </div>
                        </v-card-title>

                        <v-card-text>
                          <div class="font-text">
                            <div
                              class="font-text"
                              style="height: 250px; word-break: break-all"
                            >
                              <table id="table_select_modal_invoice_book_close">
                                <tr style="font-weight: bold">
                                  <th style="width: 300px; padding: 5px">
                                    Invoice No.&nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    Customer No. &nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Customer Name &nbsp;
                                  </th>
                                  <th style="width: 250px; padding: 5px">
                                    Invoice Date &nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Service &nbsp;
                                  </th>
                                  <!-- <th style="width: 120px; padding: 5px">Status&nbsp;</th> -->
                                </tr>

                                <tr
                                  v-for="item in modal_submit_all"
                                  :key="item.invoice_no"
                                  style="border-bottom: 1px solid gainsboro"
                                >
                                  <td style="width: 300px">
                                    {{ item.invoice_no }}
                                  </td>
                                  <td style="width: 350px">
                                    {{ item.customer_no }}
                                  </td>
                                  <td style="width: 300px">
                                    {{item.customer_name}}
                                  </td>
                                  <td style="width: 250px">
                                    {{parseDate(item.invoice_date)}}
                                  </td>
                                  <td style="width: 300px">
                                    {{item.service}}
                                  </td>
                                  <!-- <td style="width: 120px">
                                    <label
                                      v-if="item.status_rpa == 'submitted'"
                                      style="color: green"
                                      >{{ item.status_rpa }}</label
                                    >
                                    <label
                                      v-if="item.status_rpa != 'submitted'"
                                      style="color: orange"
                                      >{{ item.status_rpa }}</label
                                    >
                                  </td> -->
                                </tr>
                              </table>
                            </div>
                          </div>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary darken-1"
                            text
                            @click="dialog_unapprove = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="error darken-1"
                            text
                            @click="
                              unapprove_prosecute()
                            "
                          >
                            unapprove
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------end Unapprove selected---------------------------------------- -->


                    <!-- --------------------------------------table--------------------------------------------- -->
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :search="search_book1"
                          :headers="headers_customer"
                          :items="customer_invoice_list"
                          class="table_in_book1"
                          fixed-header
                          height="430px"
                          id="invoice_book_1_modal"
                          v-model="selected_1"
                          :single-select="singleSelect"
                          item-key="invoice_no"
                          show-select
                          @input="enterSelect($event)"
                        >
                          <template v-slot:[`item.invoice_no`]="{ item }">
                            {{ item.invoice_no }}
                          </template>
                          <template v-slot:[`item.aging`]="{ item }">
                            {{ convert(item.aging) }}
                          </template>
                          <template v-slot:[`item.invoice_date`]="{ item }">
                            {{ parseDate(item.invoice_date) }}
                          </template>
                          <template v-slot:[`item.start_date`]="{ item }">
                            {{ parseDate(item.start_date) }}
                          </template>
                          <template v-slot:[`item.end_date`]="{ item }">
                            {{ parseDate(item.end_date) }}
                          </template>
                          <template v-slot:[`item.due_date`]="{ item }">
                            {{ parseDate(item.due_date) }}
                          </template>
                          <template v-slot:[`item.status_finance`]="{ item }">
                            <v-btn
                              outlined
                              color="warning"
                              v-if="item.status_finance === 'waiting'"
                              class="disable-events"
                            >
                              WAITING
                            </v-btn>
                            <v-btn
                              outlined
                              color="success"
                              v-if="item.status_finance === 'approve'"
                              class="disable-events"
                            >
                              approve
                            </v-btn>

                            <v-btn
                              outlined
                              color="primary"
                              v-if="
                                item.status_finance !== 'approve' &&
                                  item.status_finance !== 'waiting'
                              "
                                class="disable-events"
                            >
                              {{ item.status_finance }}
                            </v-btn>
                          </template>
                          <template v-slot:[`item.status_memo`]="{ item }">
                            <v-btn
                              outlined
                              color="warning"
                              v-if="item.status_memo === 'waiting'"
                              class="disable-events"
                            >
                              WAITING
                            </v-btn>
                            <v-btn
                              outlined
                              color="success"
                              v-if="item.status_memo === 'approve'"
                              class="disable-events"
                            >
                              approve
                            </v-btn>

                            <v-btn
                              outlined
                              color="error"
                              v-if="item.status_memo === 'reject'"
                              class="disable-events"
                            >
                              Reject
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                    <!-- -------------------------------------- end table--------------------------------------------- -->
                  </v-card-text>
                </v-card>
              </v-col>
            </v-card>
          </v-dialog>
          <!---------------------------- dialog ส่งดำเนินคดี ---------------------------------->
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
import Swal from "sweetalert2";

export default {
  data: () => ({
    singleSelect: false,
    prosecut_dialog: false,
    dialog_unapprove: false,
    finish: true,
    search: "",
    datalist: [],
    count_invoice: 1,
    item_per_page: 100,
    page: 1,
    page_total: 1,
    total_count: 0,
    sum_amount: 0,
    dialog_info1: false,
    search_book1: "",
    name_open_dialog: "",
    selected_1: [],
    check_submitted: true,
    check_unsubmitted: true,
    Type_submitted: null,
    customer_name_eng: "",
    finance_name_eng: "",
    modal_submit_all: [],
    customer_invoice_list: [],
    set_memo: {
      memo_no: "",
      memo_date: "",
    },
    total_aging: 0,
    check_approve: true,
    check_unapprove: true,
    headers: [
      {
        text: "Customer No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        class: "invoice1_1",
      },
      {
        text: "Customer Name.",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },

      {
        text: "Customer Email",
        value: "customer_email",
        width: "400px",
        sortable: true,
        align: "left",
      },
      {
        text: "จำนวนที่ครบกำหนดการชำระเงิน",
        value: "payment_due",
        width: "350px",
        sortable: true,
        align: "center",
      },

      {
        text: "จำนวนที่กดออกทวงหนี้",
        value: "rpa_submit",
        width: "170px",
        sortable: true,
        align: "center",
      },

      // {
      //   text: "ระยะเวลาคงเหลือ",
      //   value: "remain_days",
      //   align: "center",
      //   width: "170px",
      //   sortable: true,
      // },
      {
        text: "Remark",
        value: "remark_main",
        align: "left",
        width: "300px",
        sortable: true,
      },
      {
        text: "Detail Invoice",
        value: "action",
        width: "130px",
        align: "center",
        sortable: false,
      },
    ],
    headers_customer: [
      {
        text: "Invoice Number",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        align: "left",
        class: "invoice1_modal",
      },
      {
        text: "คงค้างทั้งหมด",
        value: "aging",
        width: "180px",
        sortable: true,
      },
      {
        text: "Invoice Date",
        value: "invoice_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "SO Number",
        value: "so_number",
        width: "200px",
        sortable: true,
      },
      {
        text: "Service",
        value: "service",
        width: "300px",
        sortable: true,
      },
      {
        text: "Start Invoice Date",
        value: "start_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "End Invoice Date",
        value: "end_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "Due Date",
        value: "due_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "สถานะวางบิล",
        value: "billing_status",
        width: "220px",
        sortable: true,
      },
      {
        text: "Sale Representative",
        value: "sale_name",
        width: "200px",
        sortable: true,
      },
      {
        text: "SBM",
        value: "sale_sbm",
        width: "200px",
        sortable: true,
      },
      {
        text: "Status finance",
        value: "status_finance",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Status Memo",
        value: "status_memo",
        width: "200px",
        sortable: true,
        align: "center",
      },
    ],
  }),
  created() {
    this.role_status = localStorage.getItem("role");
    if (this.role_status == "down_service") {
      this.finish = false;
      this.$router.push("/down-service");
    } else if (localStorage.getItem("acces_token")) {
      this.finish = false;
      this.getInvoice();
    } else {
      this.$router.push("/login");
    }
  },
  watch: {},
  computed: {},
  methods: {
    convert(item) {
      return Number(item).toLocaleString();
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
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
            "/debt/customer/prosecute?size=" +
            String(this.item_per_page) +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist = response.data.data;
            this.page_total = Number(response.data.count_page);
            this.count_invoice = Number(response.data.count);
            this.total_count = response.data.total.toLocaleString();

          } else if (response.status === 200 && response.data.data == null) {
            this.finish = true;
            this.datalist = [];
            this.count_invoice = 0;
            this.total_count = 0;
            this.sum_amount = 0;
            this.page_total = 1;
          }

          // this.datalist = orders;
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            if (error.response["status"] == 401) {
              localStorage.clear();
              this.$router.push("/login");
            }
          }
        });
    },
    item_per_page_inc() {
      this.getInvoice();
    },
    pageChange() {
      this.getInvoice();
    },
    searchWord() {
      this.page = 1;
      this.getInvoice();
    },
    clearFilter() {
      this.page = 1;
      this.search = "";
      this.getInvoice();
    },
    enterSelect(){
        for (let index = 0; index < this.selected_1.length; index++) {
          if (
            this.selected_1[index].status_finance == "waiting"
          ) {
            this.check_approve = false;
          } else {
            this.check_approve = true;
            break;
          }
        }

        for (let index = 0; index < this.selected_1.length; index++) {
          if (
            this.selected_1[index].status_finance == "approve"
          ) {
            this.check_unapprove = false;
          } else {
            this.check_unapprove = true;
            break;
          }
        }
    },
    editRemark(status, data){
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
      if(status == 'REMARK_MAIN'){
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkmain/update",
              {
               customer_no : data.customer_no,
               remark_main : data.remark_main
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.getInvoice();
               }
            })
      }else{
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkdetail/update",
              {
                invoice_no : data.invoice_no,
                remark_detail: data.remark_detail
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.openInvoice(data);
               }
            })
      }
    },
    approve_prosecute(){
      var invoice_no = [];
      //var service_name = "";
      var service = [];
      //var data = [];

      let total_invoice = this.modal_submit_all.length;
      this.modal_submit_all.forEach((element) => {
        invoice_no.push({
          invoice_no: element.invoice_no,
          invoice_date: new Date(element.invoice_date),
        }),
        service.push(element.service)
      })
      //console.log(invoice_no , total_invoice)

      var Data = {
        total_amount: this.total_aging,
        service_name: service.join(","),
        customer_no: this.modal_submit_all[0].customer_no,
        customer_name: this.modal_submit_all[0].customer_name,
        title_name: this.modal_submit_all[0].title_name,
        total_invoice: total_invoice,
        invoice: invoice_no
      }

      // console.log(Data)
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
        .post(
          process.env.VUE_APP_API + "/debt/prosecute/finance/approve/dwf", Data,headers
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลเรียบร้อย",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.prosecut_dialog = false;
            this.openInvoice(this.selected_1[0]);
          });
        })
        .catch((error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              timer: 3000,
            }).then(() => {
              this.prosecut_dialog = false;
            });
          }
        });

    },
    unapprove_prosecute(){
      var invoice_no = [];

      this.modal_submit_all.forEach((element) => {
        invoice_no.push({
          invoice_no: element.invoice_no,
        })
      })

      var Data = {
        invoice: invoice_no
      }
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
        .post(
          process.env.VUE_APP_API + "/debt/prosecute/finance/unapprove/dwf", Data,headers
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "ยกเลิกการบันทึกข้อมูลเรียบร้อย",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.dialog_unapprove = false;
            this.openInvoice(this.selected_1[0]);
          });
        })
        .catch((error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              timer: 3000,
            }).then(() => {
              this.dialog_unapprove = false;
            });
          }
        });

    },
    openInvoice(item) {
      this.finish = false;
      this.selected_1 = [];
      this.name_open_dialog = item.customer_no + " - " + item.customer_name;
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
            "/debt/invoice/" +
            item.customer_no +
            "/prosecute",
          headers
        )
        .then((response) => {
          var currentDate = new Date();
          var currentMonth = currentDate.getMonth() + 1;
          if (currentMonth < 10) {
            this.finish = true;
            currentMonth = "0" + currentMonth;
          }
          if (response.data) {
            this.finish = true;
            this.customer_invoice_list = response.data.data;
            this.customer_invoice_list.forEach((element) => {
              element.memo_date = moment(element.memo_date).format(
                "YYYY-MM-DD"
              );
              element.due_date = moment(element.due_date).format("YYYY-MM-DD");
            });
          } else {
            this.finish = true;
            this.customer_invoice_list = [];
          }
        });
    },
    submit_all() {
      this.total_aging = 0;
      //let total = '';
      this.selected_1.forEach((element) =>{
        this.total_aging = Number(this.total_aging) + Number(element.aging)
      })
      //this.total_aging = total
      this.set_memo.memo_no = this.selected_1[0].memo_no;
      this.modal_submit_all = this.selected_1;
    },
  }
}
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
div.swal2-popup.swal2-modal.swal2-show {
  height: auto;
  padding: 20px;
}
#table_select_modal_memo {
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: rgb(211, 252, 203);
    // border-bottom: 1px solid rgb(160, 160, 160);
    height: 30px;
  }
  td {
    height: 40px;
    padding: 5px;
  }
}
#table_select_modal_hold {
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: rgb(252, 240, 203);
    // border-bottom: 1px solid rgb(160, 160, 160);
    height: 30px;
  }
  td {
    height: 40px;
  }
}
#table_select_modal {
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: rgb(236, 236, 236);
    // border-bottom: 1px solid rgb(160, 160, 160);
    height: 30px;
  }
  td {
    height: 40px;
  }
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
  height: 54px !important;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
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

th.text-start.invoice1_1.sortable {
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

th.text-left.invoice1_modal.sortable {
  position: sticky;
  left: 56px !important;
  z-index: 10 !important;
  padding-top: 14px;
  // border-right: 1px solid #cccccc;
  // background-color: rgb(168, 255, 214) !important;
  background: linear-gradient(
    90deg,
    #ececec 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
}
#invoice_book_1_modal {
  textarea.form-control {
    font-size: 13px !important;
  }
  input.form-control {
    font-size: 13px !important;
  }
  th.text-start.sortable {
    background-color: #ececec !important;
  }
  th.text-start:first-child {
    z-index: 10 !important;
    background-color: #ececec !important;
  }
  th.text-start {
    background-color: #ececec !important;
  }
  th.text-center {
    background-color: #ececec !important;
  }
  th.text-left {
    z-index: 10 !important;
    background-color: #ececec !important;
  }

  tbody {
    td {
      font-size: 13px !important;
    }
    td.text-start:first-child {
      font-size: 14px;
      position: sticky !important;
      left: 0px !important;
      z-index: 5 !important;
      padding-top: 14px;
      // border-right: 1px solid #cccccc;
      // background-color: rgb(168, 255, 214) !important;
      background: linear-gradient(
        90deg,
        #ffffff 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
    td.text-left {
      font-size: 14px;
      position: sticky !important;
      left: 56px !important;
      z-index: 5 !important;
      padding-top: 14px;
      // border-right: 1px solid #cccccc;
      // background-color: rgb(168, 255, 214) !important;
      background: linear-gradient(
        90deg,
        #ffffff 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }

    td.text-start {
      font-size: 14px;
      // position: sticky !important;
      left: 200px;
      top: auto;
      z-index: 2 !important;
      background-color: white;
      // border-right: 1px solid #cccccc;
      // background: linear-gradient(
      //   90deg,
      //   rgba(253, 253, 253, 1) 99%,
      //   rgba(101, 101, 101, 1) 100%
      // ) !important;
    }

    td.text-center.fixed {
      font-size: 14px;
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      font-size: 14px;
      z-index: 0;
    }

    td.text-start:first-child {
      font-size: 14px;
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
  th.text-start {
    background-color: #ececec !important;
  }
  th.text-center {
    background-color: #ececec !important;
  }
  th.text-left {
    background-color: #ececec !important;
  }
  tbody {
    td.text-left {
      word-break: break-all;
    }
    td.text-start {
      font-size: 14px;
      position: sticky !important;
      left: 0px !important;
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
      font-size: 14px;
      position: sticky !important;
      left: 0px !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      font-size: 14px;
      z-index: 0;
    }

    td.text-start:first-child {
      font-size: 14px;
      //   position: sticky;
      width: 20px !important;
      left: 0px !important;
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

.v-dialog--fullscreen {
  top: 64px !important;
}
#data-grid-demo {
  .container {
    background-color: rgb(250, 250, 250);
    width: 100% !important;
    font-family: "Bai_Jamjuree" !important;
  }
  .dx-data-row .amount {
    font-weight: bold;
    font-weight: 900;
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
      background-color: rgb(250, 250, 250);
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

#table_select_modal_invoice_book_close {
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #B0B0B0;
    // border-bottom: 1px solid rgb(160, 160, 160);
    height: 30px;
  }
  td {
    height: 40px;
    padding: 5px;
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
  border-radius: 0px;
}
#filter_modal {
  input.form-control {
    font-family: "Bai_Jamjuree" !important;
    padding-left: 10px;
    border: 1px solid rgb(221, 221, 221);
    height: 48px;
    // border-radius: 1px;
    margin-top: 25px !important;
  }
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