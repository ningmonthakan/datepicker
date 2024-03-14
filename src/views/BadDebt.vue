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
            <h3 style="font-weight: 700">ตัดหนี้สูญ</h3>
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
                <v-btn
                  color="#61C8A3"
                  dark
                  style="width: 150px; font-size: 12px; font-weight: 600; margin-bottom: 5px;"
                  @click="Export_AllFile()"
                  text
                >
                  Export All File
                </v-btn>

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
                      <template v-slot:[`item.invoice_no`]="{ item }">
                        {{ item.invoice_no }}
                      </template>
                      <template v-slot:[`item.amount`]="{ item }">
                        {{ convert(item.amount) }}
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
                      <template v-slot:[`item.so_start_date`]="{ item }">
                        {{ parseDate(item.so_start_date) }}
                      </template>
                      <template v-slot:[`item.so_end_date`]="{ item }">
                        {{ parseDate(item.so_end_date) }}
                      </template>
                      <template v-slot:[`item.memo_date_one`]="{ item }">
                        {{ parseDate(item.memo_date_one) }}
                      </template>
                      <template v-slot:[`item.memo_date_two`]="{ item }">
                        {{ parseDate(item.memo_date_two) }}
                      </template>
                      <template v-slot:[`item.memo_date_three`]="{ item }">
                        {{ parseDate(item.memo_date_three) }}
                      </template>
                      <template v-slot:[`item.baddebt_amount`]="{ item }">
                        {{ convert(item.baddebt_amount) }}
                      </template>
                      <template v-slot:[`item.remain_aging`]="{ item }">
                        {{ convert(item.remain_aging) }}
                      </template>
                      <template v-slot:[`item.sub_status`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.sub_status"
                          @change="update_baddebt(item)"
                        >
                          <option value=""></option>
                          <option value="Notice">Notice</option>
                          <option value="Notice/ใบรับฟ้อง">Notice/ใบรับฟ้อง</option>
                          <option value="Notice/ใบรับฟ้อง/คำพิพากษา">Notice/ใบรับฟ้อง/คำพิพากษา</option>
                          
                        </select>

                      </template>

                      <template v-slot:[`item.remark`]="{ item }">
                        <input
                          type="text"
                          class="style-chooser form-control"
                          v-model="item.remark"
                          @change="update_baddebt(item)"
                        />
                      </template>

                      <template v-slot:[`item.baddebt_memo_no`]="{ item }">
                        <input
                          type="text"
                          class="style-chooser form-control"
                          v-model="item.baddebt_memo_no"
                          @change="update_baddebt(item)"
                        />
                      </template>

                      <template v-slot:[`item.baddebt_round`]="{ item }">
                        <input
                          type="text"
                          class="style-chooser form-control"
                          v-model="item.baddebt_round"
                          @change="update_baddebt(item)"
                        />
                      </template>

                      <template v-slot:[`item.baddebt_remark`]="{ item }">
                        <b-textarea
                          placeholder="remark ตัดหนี้สูญ"
                          v-model="item.baddebt_remark"
                          style="border-radius: 0px;"
                          rows="1"
                          max-rows="1"
                          disabled
                        ></b-textarea>
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
    finish: true,
    search: "",
    datalist: [],
    count_invoice: 1,
    item_per_page: 100,
    page: 1,
    page_total: 1,
    total_count: 0,
    sum_amount: 0,
    search_book1: "",
    headers: [
      {
        text: "Invoice Number",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        class: "invoice1_1",
      },
      {
        text: "Customer Number",
        value: "customer_no",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer Name",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Amount (VAT)",
        value: "amount",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Over Due",
        value: "over_due",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "So Number",
        value: "so_number",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Invoice Date",
        value: "invoice_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Start Date",
        value: "start_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "End Date",
        value: "end_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Due Date",
        value: "due_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันเริ่มสัญญา",
        value: "so_start_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่สิ้นสุดสัญญา",
        value: "so_end_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ออกหนังสือทวงหนี้ 1",
        value: "memo_date_one",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ออกหนังสือทวงหนี้ 1",
        value: "memo_one",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ออกหนังสือทวงหนี้ 2",
        value: "memo_date_two",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ออกหนังสือทวงหนี้ 2",
        value: "memo_two",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ออกหนังสือทวงหนี้อื่น ๆ",
        value: "memo_date_three",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ออกหนังสือทวงหนี้อื่น ๆ",
        value: "memo_three",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mainstatus",
        value: "main_status",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "Status Service",
        value: "service",
        width: "300px",
        sortable: true,
        align: "center",
      },
      {
        text: "Sub-Status",
        value: "sub_status",
        width: "300px",
        sortable: true,
        align: "center",
      },
      {
        text: "ยอดชำระ",
        value: "baddebt_amount",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Aging คงเหลือ",
        value: "remain_aging",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "หมายเหตุ",
        value: "remark",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ memo ตัดหนี้สูญ",
        value: "baddebt_memo_no",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "รอบการตัดหนี้สูญ",
        value: "baddebt_round",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ตัดหนี้สูญ",
        value: "baddebt_no",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Status ตัดหนี้สูญ",
        value: "baddebt_status",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Remark ตัดหนี้สูญ",
        value: "baddebt_remark",
        align: "left",
        width: "300px",
        sortable: true,
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
            "/debt/customer/bad_debt?size=" +
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
    update_baddebt(item){
      this.finish = false;
      var data = {
        sub_status: item.sub_status,
        remark: item.remark,
        baddebt_memo_no: item.baddebt_memo_no,
        baddebt_round: item.baddebt_round
      }
      let headers_update = {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.axios
        .put(
          process.env.VUE_APP_API + "/debt/baddebt?invoice_no=" + item.invoice_no,
          data,
          headers_update
        )
        .then(() => {
          this.finish = true;
        })
        .catch((error) => {
          this.finish = true;
          if (error) {
            Swal.fire({
              icon: "error",
              title: "ข้อมูลไม่ตรงเงื่อนไขในการเปลี่ยนแปลง",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              this.getInvoice();
            });
          }
        });
    },
    Export_AllFile() {
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
        .get(process.env.VUE_APP_API + "/debt/exportbaddebt", headers)
        .then((response) => {
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_baddebt_all.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
      })
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