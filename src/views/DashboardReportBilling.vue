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
            <h3 style="font-weight: 700" class="font_style">Dashboard Report Billing</h3>
            <v-spacer></v-spacer>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title style="padding-bottom:2px;">
                <div id="invoice_billing" class="d-flex" style="padding-left:10px;padding-right:0px;padding-top:2px;padding-bottom:2px;">
                    <div class="d-flex invoice_date_billing">
                      <label style="color:black">วันที่ใบแจ้งหนี้ : &nbsp; </label>
                      <div> 
                      <input
                          class="form-control"
                          type="text"
                          v-model="text_invoice_bill_date"
                          placeholder="วันที่ใบแจ้งหนี้ "
                          v-b-modal.modal-center-invoice-bill-date
                          data-backdrop="static"
                          data-keyboard="false"
                          @change="input_invoice_bill()"
                      />                  
                          <b-modal
                            class="dialog_date"
                            ref="my-modal-invoice-bill-date"
                            data-backdrop="static"
                            no-close-on-backdrop
                            id="modal-center-invoice-bill-date"
                            centered
                            hide-footer
                            title="วันที่ใบแจ้งหนี้"
                          >
                              <cv-date-picker
                                placeholder="dd/mm/yyyy"
                                light
                                kind="range"
                                :date-end-label="dateEndLabel"
                                :cal-options="calOptions"
                                v-model="invoice_bill_date_range"
                                @change="
                                actionChange(invoice_bill_date_range, 'invoice_bill_date')"
                              >
                              </cv-date-picker>
                              <div
                                style="
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  margin-top: 10px;"
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="invoice_bill('blank')"
                                  >
                                    Clear
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="invoice_bill('cancel')"
                                      >Cancel
                                    </b-button>
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="invoice_bill('ok')"
                                      >OK
                                    </b-button>
                                  </div>
                              </div>
                          </b-modal>                        
                      </div>
                    </div>
                      <div class="d-flex" style=" align-items: center;width: 150px;">
                        <label style="color:black;width:80px">Type :</label>
                          <select
                            v-model="type_billing"
                            class="form-control"
                            style="cursor: pointer"
                            @change="select_type()"
                          >
                              <option value="INET" selected>INET</option>
                              <option value="JV">JV</option>
                          </select>
                      </div>                 
                </div>  
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>                     
                      <v-text-field
                          v-model="filter"
                          label="search"
                          single-line
                          hide-details
                          autocomplete="off"
                          class="search_billing_report"
                          type="search" 
                          append-icon="mdi-magnify"
                          id="jetsSearch"
                      ></v-text-field>
              </v-card-title>            
              <v-card-text >
                <div style="display: flex; justify-content: space-between;align-items: center;padding-top:0">               
                  <div >
                  <a
                    class="btn refresh-btn font_style"
                    color="primary"
                    @click="refreshData()"
                    style="font-size:13px"
                  >
                    Refresh:
                    <v-icon black style="font-size:14px">mdi-refresh</v-icon>
                  </a>               
                </div>
                  <label style="font-size: 12px; float: right"
                    >data : {{ datalist.length }}
                  </label>
                </div>

                <!-- --------------------------------------table--------------------------------------------- -->
                <div class="table-sum">
                  <v-simple-table
                    class="table_in_sum"
                    fixed-header
                    height="600px"
                    style="border-top: 1px solid gray"
                    id="dashboard-report-billing"
                  >
                    <thead>
                      <tr>
                        <th
                          v-for="header in pivotHeaders"
                          :key="header.value"
                          style="text-align: center; padding: 0;height:80px;font-weight:700"
                          :style="{ 'background-color': header.color , 
                            'border-right': header.value == 'ชื่อการเงิน' || header.value == 'Total จำนวน inv' ||
                          header.value == 'Total ยอดเงิน' ? '1px solid' : '0px' }"
                        >
                            <div style="width:301px;height:40px;justify-content: center;align-items:center;
                            display: flex;font-size:14px;padding:0px"
                            v-bind:style="{ 'border-right': header.value == 'Total จำนวน inv' ||
                            header.value == 'Total ยอดเงิน'  ? '0px' : '1px solid gray'}"
                            >{{ header.value }}
                            </div>
                          <td v-for="value in header.sub"
                            :colspan="value.colspan"
                            style="text-align: center;width:100px;"
                            :key="value.value">          
                          <div 
                          style="width:100%;height:40px;text-align: center;margin:auto;  
                            align-items: center;
                            display: flex;
                            justify-content: center;
                            border-right:1px solid;
                            border-top:1px solid;
                            border-bottom:1px solid;
                            background-color:#D9E2F3;
                            "                      
                            >
                            {{value.value}}
                            </div>                          
                          </td>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                    <tr v-for="item_row in datalist" :key="item_row.id" class="hover-td" v-show="filtered(item_row)">
                          <td  style="padding:0;border-right:none;vertical-align: middle;">
                            <div  style="width:300px;padding-left:20px;text-align:left">{{item_row.finance_name}}</div>                   
                          </td>
                          <td class="td_sub_value" style="padding: 0;border-left:none !important;" >
                            <div class="d-flex">
                              <div  style="width:149px;"> {{item_row.PO}}</div>
                              <div  style="width:149px;">{{convert_digit(item_row.PO_amount)}}</div>
                            </div>
                          </td>
                          <td class="td_sub_value" style="padding: 0;" >
                            <div class="d-flex">
                              <div  style="width:149px;"> {{item_row.credit_note}}</div>
                              <div  style="width:149px;"> {{convert_digit(item_row.credit_note_amount)}}</div>
                            </div>
                          </td>
                          <td class="td_sub_value" style="padding: 0;" >
                            <div class="d-flex">
                              <div style="width:149px;"> {{item_row.cantbill}}</div>
                              <div style="width:149px;"> {{convert_digit(item_row.cantbill_amount)}}</div>                  
                            </div>
                          </td>
                          <td class="td_sub_value" style="padding: 0;" >
                            <div class="d-flex">
                              <div style="width:149px;"> {{item_row.canbill}}</div>
                              <div style="width:149px;"> {{convert_digit(item_row.canbill_amount)}}</div>
                            </div>
                          </td>
                          <td class="td_sub_value" style="padding: 0;" >
                            <div class="d-flex">
                              <div style="width:149px;"> {{item_row.billafter}}</div>
                              <div style="width:149px;"> {{convert_digit(item_row.billafter_amount)}}</div>
                            </div>
                          </td>
                          <td class="td_sub_value" style="padding: 0;" >
                            <div class="d-flex">
                              <div style="width:149px;"> {{item_row.billafter}}</div>
                              <div style="width:149px;"> {{convert_digit(item_row.billafter_amount)}}</div>
                            </div>
                          </td>
                          <td class="td_sub_value" style="padding: 0;" >
                            <div class="d-flex">
                              <div style="width:149px;"> {{item_row.report}}</div>
                              <div style="width:149px;"> {{convert_digit(item_row.report_amount)}}</div>
                            </div>
                          </td>
                          <td class="td_sub_value" style="padding: 0;" >
                            <div class="d-flex">
                              <div style="width:149px;"> {{item_row.blank}}</div>
                              <div style="width:149px;"> {{convert_digit(item_row.blank_amount)}}</div>
                            </div>
                          </td>
                          <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                            <div style="width:300px;">{{convert_digit(item_row.total)}}</div>                    
                          </td>
                          <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                            <div style="width:300px;">{{convert_digit(item_row.total_amount)}}</div>                    
                          </td>
                    </tr>
                    </tbody>
                  </v-simple-table>          
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
import { BModal, VBModal } from "bootstrap-vue";
// import Swal from "sweetalert2";

export default {
  components: { BModal },
  directives: { "b-modal": VBModal },
  data: () => ({
    filter: "",
    page: 1,
    dialog_invoice_bill_date: false,
    text_invoice_bill_date: "",
    dateEndLabel: "End date",
    calOptions: {
      dateFormat: "d/m/Y",
    },
    invoice_bill_date_range: {
      startDate: null,
      endDate: null,
    },
    invoice_bill_date: ["", ""],
    type_billing: "INET",
    datalist: [],
    search: "",
    pivotHeaders: [
      {
        value: "ชื่อการเงิน",
        colspan: 1,
        color: "#D9E2F3 !important",
        width: "200px",
        fixed: true,
      },
      {
        value: "PO",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#DEEAF6",
            id: 1,
          },
          {
            value: "ยอดเงิน",
            color: "#DEEAF6",
            colspan: 1,
            id: 2,
          },
        ],
      },
      {
        value: "ลดหนี้",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#DEEAF6",
            id: 3,
          },
          {
            value: "ยอดเงิน",
            color: "#DEEAF6",
            colspan: 1,
            id: 4,
          },
        ],
      },
      {
        value: "วางบิลไม่ได้",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#DEEAF6",
            id: 5,
          },
          {
            value: "ยอดเงิน",
            color: "#DEEAF6",
            colspan: 1,
            id: 6,
          },
        ],
      },
      {
        value: "วางบิลแล้ว",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#DEEAF6",
            id: 7,
          },
          {
            value: "ยอดเงิน",
            color: "#DEEAF6",
            colspan: 1,
            id: 8,
          },
        ],
      },
      {
        value: "วางบิลหลังใช้",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#DEEAF6",
            id: 9,
          },
          {
            value: "ยอดเงิน",
            color: "#DEEAF6",
            colspan: 1,
            id: 10,
          },
        ],
      },
      {
        value: "ส่งมอบงาน+Report",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#DEEAF6",
            id: 11,
          },
          {
            value: "ยอดเงิน",
            color: "#DEEAF6",
            colspan: 1,
            id: 12,
          },
        ],
      },
      {
        value: "สัญญา",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#DEEAF6",
            id: 13,
          },
          {
            value: "ยอดเงิน",
            color: "#DEEAF6",
            colspan: 1,
            id: 14,
          },
        ],
      },
      {
        value: "[Blank]",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#DEEAF6",
            id: 15,
          },
          {
            value: "ยอดเงิน",
            color: "#DEEAF6",
            colspan: 1,
            id: 16,
          },
        ],
      },
      { value: "Total จำนวน inv", colspan: 1, color: "#D9E2F3 !important" },
      { value: "Total ยอดเงิน", colspan: 1, color: "#D9E2F3 !important" },
    ],
    finish: false,
  }),
  created() {
    // this.finish = true;

    this.getDataReport();
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
    select_type() {
      this.finish = false;
      this.getDataReport();
    },
    // ดึงข้อมูลมาแสดง
    getDataReport() {
      var headers = {
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
            "/getinvoicestatus/allinvoice?customertypecheck=" +
            this.type_billing +
            "&startdate=" +
            this.invoice_bill_date[0] +
            "&enddate=" +
            this.invoice_bill_date[1],
          headers
        )
        .then((response) => {
          this.finish = true;
          if (response.data != null) {
            this.datalist = response.data;
            this.filter = "";
          }
        });
    },
    refreshData() {
      this.finish = false;
      this.text_invoice_bill_date = "";
      this.invoice_bill_date_range = {
        startDate: null,
        endDate: null,
      };
      this.invoice_bill_date = [];
      this.type_billing = "INET";
       this.invoice_bill_date[0] = ''
        this.invoice_bill_date[1] = ''
      this.getDataReport();
    },
    convert_digit(data) {
      if (data != 0 && data !='' && data != null) {
        var number = Number(data).toLocaleString();
        return number;
      } else if (data == 0) {
        return 0;
      } else {
        return number;
      }
    },
    input_invoice_bill() {
      if (this.text_invoice_bill_date == "") {
        this.text_invoice_bill_date = null;
        this.invoice_bill_date_range.startDate = null;
        this.invoice_bill_date_range.endDate = null;
        this.invoice_bill_date = [];
      }
    },
    actionChange(date, name) {
      if (name == "invoice_bill_date") {
        this.invoice_bill_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.invoice_bill_date[1] = date.endDate.split("/").reverse().join("-");
      }
    },
    invoice_bill(codename) {
      if (codename == "cancel") {
        this.$refs["my-modal-invoice-bill-date"].hide();
        // this.text_invoice_bill_date = null;
        // this.invoice_bill_date_range.startDate = null;
        // this.invoice_bill_date_range.endDate = null;
        // this.invoice_bill_date = []
      } else if (codename == "ok") {
        if (
          this.invoice_bill_date == [] ||
          this.invoice_bill_date[0] == "" ||
          (this.invoice_bill_date[0] == null &&
            this.invoice_bill_date[1] == "") ||
          this.invoice_bill_date[1] == null ||
          this.invoice_bill_date[1] == "" ||
          this.invoice_bill_date[0] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-invoice-bill-date"].hide();
          this.text_invoice_bill_date =
            this.invoice_bill_date[0].split("-").reverse().join("/") +
            " - " +
            this.invoice_bill_date[1].split("-").reverse().join("/");
        }
        this.finish = false;
        this.getDataReport();
      } else if (codename == "blank") {
        this.$refs["my-modal-invoice-bill-date"].hide();
        this.invoice_bill_date = ["", ""];
        this.text_invoice_bill_date = "";
        this.invoice_bill_date_range.startDate = null;
        this.invoice_bill_date_range.endDate = null;
        this.finish = false;
        this.getDataReport();
      }
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
.table-sum {
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
  width: 100% !important;
  overflow: auto !important;
  table {
    // border-collapse: separate; /* Don't collapse */
    border-spacing: 0;
    position: relative;
    border-collapse: collapse;
  }
  thead th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
  }

  thead th:first-child {
    left: 0;
    z-index: 100 !important;
    border-right: none !important;
    background: linear-gradient(
      90deg,
      #d9e2f3 99.3%,
      rgb(121, 121, 121) 100%
    ) !important;
  }
  tbody td:first-child {
    left: 0;
    border-right: none;
    z-index: 90 !important;
    background: linear-gradient(
      90deg,
      rgba(253, 253, 253, 1) 99.3%,
      rgb(121, 121, 121) 100%
    ) !important;
  }
  tbody td {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    left: 0;
    background: #fff;
  }
  tbody th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    left: 0;
  }
}

.table_in_sum {
  background-position: center !important;
  background-repeat: no-repeat !important;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
  overflow: auto !important;
  text-align: center;

  .v-data-table--fixed-header
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    border-bottom: 1px solid !important;
  }

  td.td_sub_value {
    padding: 0;
    border-right: 1px solid gray;
    width: 151px !important;
    vertical-align: middle;
  }
  td {
    font-size: 12px !important;
    width: 151px !important;
    background-color: white !important;
  }
}
.border-frame {
  border: 1px solid gray;
}
.border-frame-header {
  justify-items: center;
  align-items: center;
  border: 1px solid gray;
}
.v-select__slot {
  position: relative;
  align-items: center;
  display: flex;
  max-width: 100%;
  min-width: 0;
  width: 100%;
  min-height: 48px !important;
  height: 100% !important;
  border-radius: 0px !important;
  margin-top: 10px;
}
.font-text-alert {
  font-family: "Bai_Jamjuree" !important;
}

h5#modal-center-invoice-bill-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
.dialog_date {
  font-family: "Bai_Jamjuree" !important;
}
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
#invoice_billing {
  input.form-control {
    font-family: "Bai_Jamjuree" !important;
    padding-left: 10px;
    border: 1px solid rgb(221, 221, 221);
    height: 40px;
    border-radius: 5px;
    font-size: 14px !important;
  }
  label {
    font-size: 14px;
  }
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