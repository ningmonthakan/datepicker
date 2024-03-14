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
            <h3 style="font-weight: 700" class="font_style">
                Report : ภาพรวม RV INET/JV
            </h3>
            <v-spacer></v-spacer>
          </v-col>
          <v-row>
            <v-col cols="4">
              <v-card style="padding: 1px; background: #4fa834">
                <v-card-title style="display: block">
                  <div
                    class="d-flex"
                    style="align-items: center; justify-content: space-between"
                  >
                    <label
                      style="font-size: 21px; text-align: right; color: #ffffff"
                      >Cash Plan</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div style="font-size: 18px; text-align: right; color: #ffffff">
                    {{ formatNumber(cash_plan) }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card style="padding: 1px; background: #91c089">
                <v-card-title style="display: block">
                  <div
                    class="d-flex"
                    style="align-items: center; justify-content: space-between"
                  >
                    <label
                      style="font-size: 21px; text-align: right; color: #ffffff"
                      >เงินรับจริง</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div style="font-size: 18px; text-align: right; color: #ffffff">
                    {{ formatNumber(cash) }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card style="padding: 1px; background: #df9733">
                <v-card-title style="display: block">
                  <div
                    class="d-flex"
                    style="align-items: center; justify-content: space-between"
                  >
                    <label
                      style="font-size: 21px; text-align: right; color: #ffffff"
                      >Total RV</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div style="font-size: 18px; text-align: right; color: #ffffff">
                    {{ formatNumber(total_rv) }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card style="padding: 1px; background: #115ab0">
                <v-card-title style="display: block">
                  <div
                    class="d-flex"
                    style="align-items: center; justify-content: space-between"
                  >
                    <label
                      style="font-size: 21px; text-align: right; color: #ffffff"
                      >Transfer INET</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div style="font-size: 18px; text-align: right; color: #ffffff">
                    {{ formatNumber(transfer_inet) }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card style="padding: 1px; background: #86c8bc">
                <v-card-title style="display: block">
                  <div
                    class="d-flex"
                    style="align-items: center; justify-content: space-between"
                  >
                    <label
                      style="font-size: 21px; text-align: right; color: #ffffff"
                      >Transfer JV</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div style="font-size: 18px; text-align: right; color: #ffffff">
                    {{ formatNumber(transfer_jv) }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card style="padding: 1px; background: #e76e51">
                <v-card-title style="display: block">
                  <div
                    class="d-flex"
                    style="align-items: center; justify-content: space-between"
                  >
                    <label
                      style="font-size: 21px; text-align: right; color: #ffffff"
                      >Differs</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div style="font-size: 18px; text-align: right; color: #ffffff">
                    {{ formatNumber(differs) }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
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
                    @click="exportFileReportOverview()"
                  >
                    <v-icon style="font-size: 28px; color: #545454"
                      >mdi-table-arrow-right</v-icon
                    >
                    <v-spacer></v-spacer>
                    Export File
                  </v-btn>  
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
                          hide-default-footer
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
           <!-- --------------------------------------end btn--------------------------------------------- -->
          <v-col cols="12">
            <v-card>           
              <v-card-text >
                <!-- --------------------------------------table--------------------------------------------- -->
                <div class="table-report-overview-rv">
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
                          v-for="(header, index) in pivotHeaders"
                          :key="`${header.text}-${index}`"
                          style="text-align: center; padding: 0; height:100%; font-weight:500px;"
                          :style="{'background-color': header.color,'width':header.width,'border-right': header.value == 'work_date' 
                            || header.value == 'cash_plan' || header.value == 'cash_total' || header.value == 'bill'
                            || header.value == 'diff' || header.value == 'transfer_jv'|| header.value == 'transfer_inet' 
                            || header.value == 'total_transfer' || header.value == 'bill_chq' ? '1px solid' : '0px'}"
                        >
                          <div 
                            style="width:300px; height:100%; 
                            justify-content: center; align-items:center; 
                            display:flex; font-size:18px;
                            padding:0px; color: white;padding-top:10px;"
                            :style="{ 'width':header.width,'border-right':  header.value == 'work_date' 
                            || header.value == 'cash_plan' || header.value == 'cash_total' || header.value == 'bill'
                            || header.value == 'diff' || header.value == 'transfer_jv'|| header.value == 'transfer_inet' 
                            || header.value == 'total_transfer' || header.value == 'bill_chq'  ? '0px' : '1px solid gray'}"
                          >
                            {{ header.text }}
                          </div>
                          <td
                            v-for="value in header.sub"
                            :key="value.text"
                            style="text-align: center;width:100px;"
                          >
                            <div 
                              style="width:100%;height:40px;text-align: center;margin:auto;  
                              align-items: center;
                              display: flex;
                              justify-content: center;
                              border-right:1px solid;
                              border-top:1px solid;
                              border-bottom:1px solid;
                              border-color: gray;
                              color: white;
                              font-weight:400px;
                              font-size:16px;
                              padding: 0px;
                              " 
                              :style="{'background-color': value.color ,'width': value.width}"         
                            >
                              {{value.text}}
                            </div>                          
                          </td>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(item_row) in report_overview_data" :key="item_row.id" class="hover-td">
                         <td style="pagging-left:10px;padding:0;vertical-align: middle; height:75px;">
                            <div class="d-flex"  style="align-items: center; width:190px; padding-left:20px; text-align:left; font-size:16px;">
                              <v-row class="justify-center"> 
                              {{ parseDateRequest(item_row.work_date) }}
                              </v-row>
                            </div>                     
                          </td>

                          <td style="pagging-left:10px; padding:0; vertical-align: middle;">
                            <div class="d-flex" style="align-items:center; width:390px; text-align:left font-size:16px; ">
                              <v-row class="justify-center"  style=" margin-top: -3px;"> 
                                <v-col cols="12"> 
                                  <input         
                                    v-model="item_row.cash_plan"
                                    type="text"
                                    class=" style-transfer mr-1"
                                    :disabled=" !item_row.status_cash_plan "
                                    style="font-size:16px;width:190px;margin:auto"
                                    
                                  />
                                <!-- </v-col> -->
                                <!-- <v-col class="pa-0" cols="6" style="width:60px">  -->
                                  <v-btn
                                    height="45"
                                    elevation="0"
                                    @click="setStatus(item_row, 'cash_plan')"
                                  >
                                    <v-icon style="font-size: 25px; color: #545454">
                                      {{
                                        item_row.status_cash_plan
                                          ? "mdi-check" 
                                          : "mdi-pencil" 
                                      }}
                                    </v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </div>                  
                          </td>

                          <td style="pagging-left:10px;padding:0;vertical-align: middle;">
                            <div class="d-flex"  style="align-items:center; width:350px; padding-left:20px;text-align:left; font-size:16px; ">
                               <v-row class="justify-center"> 
                              {{ formatNumber(item_row.cash_total) }}
                               </v-row>
                            </div>                     
                          </td>

                          <td style="pagging-left:10px;padding:0;vertical-align: middle;">
                            <div class="d-flex"  style="align-items: center;width:350px;padding-left:20px;text-align:left; font-size:16px;">
                              <v-row class="justify-center"> 
                                {{ formatNumber(item_row.bill) }}
                              </v-row>
                            </div>                     
                          </td>

                           <td style="pagging-left:10px;padding:0;vertical-align: middle;">
                            <div class="d-flex"  style="align-items: center;width:350px;padding-left:20px;text-align:left; font-size:16px;">
                              <v-row class="justify-center"> 
                                 <p
                                    class="mb-0" style="text-align: center"
                                    :class="item_row.diff < 0 ? 'red--text' : 'black--text'"
                                  >
                                  {{ formatNumber(item_row.diff) }}
                                 </p>
                              </v-row>
                            </div>                     
                          </td>

                          <td style="pagging-left:10px;padding:0;vertical-align: middle;">
                            <div class="d-flex"  style="align-items: center;width:350px;padding-left:20px;text-align:left; font-size:16px;">
                              <v-row class="justify-center"> 
                              {{ formatNumber(item_row.transfer_jv) }}
                              </v-row>
                            </div>                     
                          </td>

                          <td style="pagging-left:10px;padding:0;vertical-align: middle;">
                            <div class="d-flex"  style="align-items: center;width:350px;padding-left:20px;text-align:left; font-size:16px;">
                              <v-row class="justify-center"> 
                              {{ formatNumber(item_row.transfer_inet) }}
                              </v-row>
                            </div>                     
                          </td>

                          <td style="pagging-left:10px;padding:0;vertical-align: middle;">
                            <div class="d-flex"  style="align-items: center;width:350px;padding-left:20px;text-align:left; font-size:16px;">
                              <v-row class="justify-center"> 
                              {{ formatNumber(item_row.total_transfer) }}
                              </v-row>
                            </div>                     
                          </td>

                          <td style="pagging-left:10px;padding:0;vertical-align: middle;">
                            <div class="d-flex"  style="align-items: center;width:350px;padding-left:20px;text-align:left; font-size:16px;">
                              <v-row class="justify-center"> 
                              {{ formatNumber(item_row.bill_chq) }}
                              </v-row>
                            </div>                     
                          </td>
                          
                          <td class="td_sub_value" style="pagging-left:10px; padding:0; vertical-align: middle;" >
                            <div class="d-flex">
                                <div style="width:350px; border-right: 1px solid gray; text-align: center; height: 75px; font-size:16px;">
                                  <v-row class="justify-center" style=" margin-top: 18px;"> 
                                    <v-col class="pa-0" cols="12"> 
                                      <input                       
                                        type="text"
                                        class=" style-transfer mr-1"
                                        v-model="item_row.cash_inet"
                                        :disabled=" !item_row.status_cash_inet "
                                        style="font-size:16px;width:180px;margin:auto"
                                      /> 
                                    <!-- </v-col>
                                    <v-col class="pa-0" cols="6" style="width:60px">  -->
                                      <v-btn
                                      height="45"
                                      elevation="0"
                                      @click="setStatus(item_row, 'cash_inet')"
                                      >
                                        <v-icon style="font-size: 25px; color: #545454">
                                          {{
                                            item_row.status_cash_inet
                                              ? "mdi-check" 
                                              : "mdi-pencil" 
                                          }}
                                        </v-icon>
                                      </v-btn>
                                    </v-col>
                                  </v-row>
                                </div>

                                <div style="width:350px ">
                                  <v-row class="justify-center" style=" margin-top: 18px; font-size:16px;"> 
                                    <v-col class="pa-0" cols="12"> 
                                      <input                       
                                        type="text"
                                        class="style-transfer mr-1"
                                        v-model="item_row.factoring_inet"
                                        :disabled=" !item_row.status_factoring_inet "
                                        style="font-size:16px;width:180px;margin:auto"
                                      /> 
                                    <!-- </v-col>
                                    <v-col class="pa-0" cols="6" style="width:60px">  -->
                                      <v-btn
                                      height="45"
                                      elevation="0"
                                      @click="setStatus(item_row, 'factoring_inet')"
                                      >
                                        <v-icon style="font-size: 25px; color: #545454">
                                          {{
                                            item_row.status_factoring_inet
                                              ? "mdi-check" 
                                              : "mdi-pencil" 
                                          }}
                                        </v-icon>
                                      </v-btn>
                                    </v-col>
                                  </v-row>                      
                                </div>
                            </div>
                          </td>

                          <td style="pagging-left:10px; padding:0; vertical-align: middle; font-size:16px;">
                            <div class="d-flex">
                                <div style="width:350px; border-right: 1px solid gray; height: 75px; font-size:16px;">
                                    <v-row class="justify-center" style=" margin-top: 18px; font-size:16px;"> 
                                      <v-col class="pa-0" cols="12"> 
                                        <input                       
                                          type="text"
                                          class=" style-transfer mr-1"
                                          v-model="item_row.cash_jv"
                                          :disabled=" !item_row.status_cash_jv "
                                          style="font-size:16px;width:180px;margin:auto"
                                        /> 
                                      <!-- </v-col>
                                      <v-col class="pa-0" cols="6" style="width:60px">  -->
                                        <v-btn
                                        height="45"
                                        elevation="0"
                                         @click="setStatus(item_row, 'cash_jv')"
                                        >
                                          <v-icon style="font-size: 25px; color: #545454">
                                            {{
                                              item_row.status_cash_jv
                                                ? "mdi-check" 
                                                : "mdi-pencil" 
                                            }}
                                          </v-icon>
                                        </v-btn>
                                      </v-col>
                                    </v-row>       
                                </div>
                              <div style="width:350px">
                                <v-row class="justify-center"  style=" margin-top: 18px; font-size:16px;"> 
                                  <v-col class="pa-0" cols="12"> 
                                    <input                       
                                      type="text"
                                      class=" style-transfer mr-1"
                                      v-model="item_row.offset_jv"
                                      :disabled=" !item_row.status_offset_jv "
                                      style="font-size:16px;width:180px;margin:auto"
                                    /> 
                                  <!-- </v-col>
                                  <v-col class="pa-0" cols="6" style="width:60px">  -->
                                    <v-btn
                                    height="45"
                                    elevation="0"
                                    @click="setStatus(item_row, 'offset_jv')"
                                    >
                                      <v-icon style="font-size: 25px; color: #545454">
                                        {{
                                          item_row.status_offset_jv
                                            ? "mdi-check" 
                                            : "mdi-pencil" 
                                        }}
                                      </v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>   
                              </div>
                            </div>
                          </td>
                      </tr>
                    </tbody>
                  </v-simple-table>          
                </div>
                <!-- ------------------------------------End tabel --------------------------------------------- -->
                 <v-col cols="12">
                  <v-card style="padding: 1px" elevation="0">
                    <v-card-title style="display: block">
                      <div
                        class="d-flex"
                        style="
                          align-items: center;
                          justify-content: space-between;
                        "
                      >
                        <label style="font-size:24px; text-align: right">ผลรวม Diff.</label>
                        <div
                          class="mb-0"
                          :class="differs < 0 ? 'red--text' : 'black--text'"
                          style="font-size: 24px; text-align: right"
                        >
                          {{ formatNumber(differs) }}
                        </div>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-col>
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

export default {
  data: () => ({
    menu: false,
    cash: 0,
    cash_plan: 0,
    cash_jv: 0,
    cash_inet: 0,
    factoring_inet: 0,
    offset_jv: 0,
    transfer_jv: 0,
    transfer_inet: 0,
    differs: 0,
    total_rv: 0,
    report_overview_data: [],
    item_per_page: 100,
    page: 1,
    page_total: 1,
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
    pivotHeaders: [
      { text: "Work Date", value: "work_date", colspan: 1, color: "#185362 !important", width: "190px"},
      { text: "แผนเงินรับ", value: "cash_plan", colspan: 1, color: "#4fa834 !important", width: "350px" },
      { text: "เงินรับจริง", value: "cash_total", colspan: 1, color: "#91c089 !important", width: "350px"},
      { text: "ตัดหนี้", value: "bill", colspan: 1, color: "#df9733 !important", width: "350px"},
      { text: "Diff", value: "diff", colspan: 1, color: "#e76e51 !important", width: "350px"},
      { text: "Transfer JV",value: "transfer_jv", colspan: 1, color: "#86c8bc !important", width: "350px"},
      { text: "Transfer INET", value: "transfer_inet", colspan: 1, color: "#115ab0 !important", width: "350px"},
      { text: "Total Transfer", value: "total_transfer", colspan: 1, color: "#6096b4 !important", width: "350px"},
      { text: "ตัดหนี้ CHQ", value: "bill_chq", colspan: 1, color: "#a560c2 !important", width: "350px"},
      {
        text: "INET",
        colspan: 2,
        color: "#115AB0!important",
        width: "700px !important",
        sub: [
          {
            text:"เงินสดจริง",
            value: "cash_inet",
            colspan: 1,
            color: "#82A7D7",
            width: "350px",
            id: 1,
          },
          {
            text: "Offset/FAC",
            value: "factoring_inet",
            color: "#82A7D7",
            colspan: 1,
            width: "350px",
            id: 2,
          },
        ],
      },
      {
        text: "JV",
        colspan: 2,
        color: "#478E37 !important",
        width: "700px",
        sub: [
          {
            text: "เงินสดจริง",
            value: "cash_jv",
            colspan: 1,
            color: "#9AD08F",
            width: "350px",
            id: 3,
          },
          {
            text: "Offset",
            value: "offset_jv",
            color: "#9AD08F",
            width: "350px",
            colspan: 1,
            id: 4,
          },
        ],
      },
    ],
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
      this.getReportOverview();
    }
  },
    methods: {
    exportFileReportOverview() {
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
            `/statement/export/report/overview?month=${this.month}&year=${this.year}`,
          null,
          headers
        )
        .then((response) => {
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_ReportOverview.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
        });
    },
    convertNumber(item) {
      return Number(item).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
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
      await this.getReportOverview(month, year);
      this.finish = false;
    },
    setStatus(item_row, header) {
      var index = this.report_overview_data.findIndex((dessert) => dessert.id === item_row.id);
      const headers = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("acces_token") + "," + localStorage.getItem("secret")
        },
      };
      const work_date = moment(item_row.work_date).format("YYYY-MM-DD")
      const cash_plan = parseFloat(item_row.cash_plan.replace(/,/g, ''));
      const cash_inet = parseFloat(item_row.cash_inet.replace(/,/g, ''));
      const factoring_inet = parseFloat(item_row.factoring_inet.replace(/,/g, ''));
      const cash_jv = parseFloat(item_row.cash_jv.replace(/,/g, ''));
      const offset_jv = parseFloat(item_row.offset_jv.replace(/,/g, ''));

      
     if (header === "cash_plan") {
        this.report_overview_data[index].status_cash_plan = !this.report_overview_data[index].status_cash_plan;
        if (!item_row.status_cash_plan) {
          this.axios.put(
            process.env.VUE_APP_API +
              `/statement/dashboard/report/overview?work_date=${work_date}`,
            {cash_plan, cash_inet, factoring_inet, cash_jv, offset_jv},
            headers
          ).then(() => {
            this.getReportOverview()
          })
        }
      }
      else if (header === "cash_inet") {
      this.report_overview_data[index].status_cash_inet = !this.report_overview_data[index].status_cash_inet;
      if (!item_row.status_cash_inet) {
        this.axios.put(
          process.env.VUE_APP_API +
          `/statement/dashboard/report/overview?work_date=${work_date}`,
          {cash_plan, cash_inet, factoring_inet, cash_jv, offset_jv},
          headers
        ).then(() => {
          this.getReportOverview()
        })
      }
    } else if (header === "factoring_inet") {
      this.report_overview_data[index].status_factoring_inet = !this.report_overview_data[index].status_factoring_inet;
      if (!item_row.status_factoring_inet) {
        this.axios.put(
          process.env.VUE_APP_API +
          `/statement/dashboard/report/overview?work_date=${work_date}`,
          {cash_plan, cash_inet, factoring_inet, cash_jv, offset_jv},
          headers
        ).then(() => {
          this.getReportOverview()
        })
      }
    } else if (header === "cash_jv") {
      this.report_overview_data[index].status_cash_jv = !this.report_overview_data[index].status_cash_jv;
      if (!item_row.status_cash_jv) {
        this.axios.put(
          process.env.VUE_APP_API +
          `/statement/dashboard/report/overview?work_date=${work_date}`,
          {cash_plan, cash_inet, factoring_inet, cash_jv, offset_jv},
          headers
        ).then(() => {
          this.getReportOverview()
        })
      }
    } else if (header === "offset_jv") {
      console.log('offset_jv', offset_jv);
      this.report_overview_data[index].status_offset_jv = !this.report_overview_data[index].status_offset_jv;
      if (!item_row.status_offset_jv) {
        this.axios.put(
          process.env.VUE_APP_API +
          `/statement/dashboard/report/overview?work_date=${work_date}`,
          {cash_plan, cash_inet, factoring_inet, cash_jv, offset_jv},
          headers
        ).then(() => {
          this.getReportOverview()
          console.log('getReportOverview', this.report_overview_data);
        })
      }
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

    getReportOverview(
      month = this.nowDate.split("-")[1],
      year = this.nowDate.split("-")[0]
    ) {
      this.finish = false;
      this.report_overview_data = [];
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
            `/statement/dashboard/report/overview?month=${month}&year=${year}`,
          headers
        )
        .then((response) => {
          //console.log(response.data)
          if (response.status === 200) {
            this.finish = true;
            this.report_overview_data = response.data.data.map(
              (item, index) => {
                let obj = { ...item, 
                    cash_plan: this. formatNumber(item.cash_plan), 
                    cash_inet: this. formatNumber(item.cash_inet), 
                    factoring_inet: this. formatNumber(item.factoring_inet), 
                    cash_jv: this. formatNumber(item.cash_jv), 
                    offset_jv: this. formatNumber(item.offset_jv), 
                };
                obj.id = index + 1;
                obj.status_cash_plan = false;
                obj.status_cash_inet = false;
                obj.status_factoring_inet = false; 
                obj.status_cash_jv = false;
                obj.status_offset_jv = false;
                return obj;
              }
            );

            /*get api card 6*/
            this.cash = response.data.cash;
            this.cash_plan = response.data.cash_plan;
            this.differs = response.data.differs;
            this.transfer_inet = response.data.transfer_inet;
            this.transfer_jv = response.data.transfer_jv;
            this.total_rv = response.data.total_rv;
            // console.log(this.report_overview_data);
          } else {
            this.finish = true;
            this.report_overview_data = [];
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
.table-report-overview-rv {
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
  width: 100% !important;
  overflow: auto !important;
  height: 40% !important;
}

.table_in_sum {
  background-position: center !important;
  background-repeat: no-repeat !important;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
  overflow: auto !important;
  text-align: center;
  height: 40% !important;

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
    font-size: 17px !important;
    width: 151px !important;
    background-color: white !important;
    border-right: 1px solid gray;
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
.item {
  font-size: 22px;
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
.style-transfer {
  border: 1px solid gray;
  margin-bottom: 10px;
  height: 45px;
  width: 160px;
  border-radius: 4px;
  text-align: center !important;
  border-right: 1px solid gray;
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
