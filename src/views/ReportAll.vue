<template>
    <div>
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
                          justify-content: space-between;"
                  >
                      <h3 style="font-weight:700">Report All : ภาพรวมตัดหนี้ของ INET/JV</h3>
                  </v-col>
                  <v-col
                      cols="12"
                      style="
                          display: flex;
                          align-items: center;
                          justify-content: center;"
                  >
                      <h3 style="font-weight:700">ภาพรวมตัดหนี้ ณ วันที่ {{parseFirstDayRequest(toDay)}} - {{parseLastDayRequest(toDay)}}</h3>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <div
                      class="mr-6"
                      style="
                        display: flex;
                        align-items: right;
                        justify-content: right;">
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
                                class="text-none"
                                style="
                                  border-radius: 20px;
                                  border: 1px solid #000000;
                                  background-color: #FFFFFF">
                                <v-icon left dark> mdi-calendar-range </v-icon>
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
                              <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="selectDate(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        <v-btn
                          size="x-large"
                          variant="flat"
                          class="text-none ml-1"
                          @click="captureScreenshot"
                          style="
                            border-radius: 20px;
                            border: 1px solid #000000;
                            background-color: #FFFFFF">
                          <v-icon left dark> mdi-chart-bar </v-icon>
                          Export Chart
                        </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" style="justify-content: center;" id="export-chart">
                    <v-container fluid grid-list-md style="width: auto;">
                      <v-layout row wrap>
                        <!-- <v-flex d-flex xs12 sm12 md6> -->
                          <!-- <v-layout row wrap> -->
                            <v-flex d-flex xs12 sm12 md12>
                              <v-card style="width: auto; height:40pc; border-radius: 20px;">
                                <v-card-title class="justify-center" primary-title>ตัดหนี้ เงินโอนเดือนปัจจุบัน และ เดือนอื่นๆ / วัน</v-card-title>
                                <v-row>
                                  <v-col cols="9">
                                    <div>
                                      <canvas ref="lineChart1" height="550"></canvas>
                                    </div>
                                  </v-col>
                                  <v-col cols="3">
                                    <v-row>
                                      <v-col cols="12">
                                        <v-card dark color="#115AB0" class="ma-2">
                                          <div style="height:25px;" class="mb-5">
                                            <v-card-title class="justify-center text-white" style="font-size:18px">เงินโอนปัจจุบัน</v-card-title>
                                          </div>
                                          <v-row>
                                            <v-col cols="6">
                                              <v-card class="ml-1" style="border-radius: 10px;">
                                                <div style="background-color: #6299D9 ; height:40px;">
                                                  <v-card-text class="text-center text-white">INET</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_transfer_inet) }}
                                                  </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                            <v-col cols="6">
                                              <v-card class="mr-1" style="border-radius: 10px;">
                                                <div style="background-color: #6299D9 ; height:40px;">
                                                  <v-card-text class="text-center text-white">JV</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_transfer_jv) }}
                                                  </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                          </v-row>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-card dark color="#DF9733" class="ma-2">
                                          <div style="height:25px;" class="mb-5">
                                            <v-card-title class="justify-center text-white" style="font-size:18px">เงินโอนเดือนอื่น</v-card-title>
                                          </div>
                                          <v-row>
                                            <v-col cols="6">
                                              <v-card class="ml-1" style="border-radius: 10px;">
                                                <div style="background-color: #F6D2AE ; height:40px;">
                                                  <v-card-text class="text-center text-white">INET</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_suspense_inet) }}

                                                  </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                            <v-col cols="6">
                                              <v-card class="mr-1" style="border-radius: 10px;">
                                                <div style="background-color: #F6D2AE ; height:40px;">
                                                  <v-card-text class="text-center text-white">JV</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_suspense_jv) }}
                                                  </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                          </v-row>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-card dark color="#91C089" class="ma-2">
                                          <div style="height:25px;" class="mb-5">
                                            <v-card-title class="justify-center text-white" style="font-size:18px">Total</v-card-title>
                                          </div>
                                          <v-row>
                                            <v-col cols="6">
                                              <v-card class="ml-1" style="border-radius: 10px;">
                                                <div style="background-color: #3B7C20 ; height:40px;">
                                                  <v-card-text class="text-center text-white">ลูกค้า INET/JV</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_customer) }}
                                                    </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                            <v-col cols="6">
                                              <v-card class="mr-1" style="border-radius: 10px;">
                                                <div style="background-color: #3B7C20 ; height:40px;">
                                                  <v-card-text class="text-center text-white">Amount</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_amount) }}
                                                    </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                          </v-row>
                                        </v-card>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-flex>
                            <v-flex d-flex xs12 sm12 md12>
                              <v-card style="width: auto; height:40pc; border-radius: 20px;">
                                <v-card-title class="justify-center" primary-title>ตัดหนี้เงินโอน เช็ค/วัน ที่ชำระเงินภายในเดือน</v-card-title>
                                <v-row>
                                  <v-col cols="9">
                                    <div>
                                      <canvas ref="lineChart2" height="550"></canvas>
                                    </div>
                                  </v-col>
                                  <v-col cols="3">
                                    <v-row>
                                      <v-col cols="12">
                                        <v-card dark color="#115AB0" class="ma-2">
                                          <div style="height:25px;" class="mb-5">
                                            <v-card-title class="justify-center text-white" style="font-size:18px">ยอดรวมเงินโอน</v-card-title>
                                          </div>
                                          <v-row>
                                            <v-col cols="6">
                                              <v-card class="ml-1" style="border-radius: 10px;">
                                                <div style="background-color: #6299D9 ; height:40px;">
                                                  <v-card-text class="text-center text-white">INET</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_transfer_inet) }}
                                                    </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                            <v-col cols="6">
                                              <v-card class="mr-1" style="border-radius: 10px;">
                                                <div style="background-color: #6299D9 ; height:40px;">
                                                  <v-card-text class="text-center text-white">JV</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_transfer_jv) }}
                                                  </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                          </v-row>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-card dark color="#91C089" class="ma-2">
                                          <div style="height:25px;" class="mb-5">
                                            <v-card-title class="justify-center text-white" style="font-size:18px">ยอดรวมเช็ค</v-card-title>
                                          </div>
                                          <v-row>
                                            <v-col cols="6">
                                              <v-card class="ml-1" style="border-radius: 10px;">
                                                <div style="background-color: #3B7C20 ; height:40px;">
                                                  <v-card-text class="text-center text-white">Cheque</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_cheque_inet) }}
                                                    </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                            <v-col cols="6">
                                              <v-card class="mr-1" style="border-radius: 10px;">
                                                <div style="background-color: #3B7C20 ; height:40px;">
                                                  <v-card-text class="text-center text-white">Suspense</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; height:40px;">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_suspense_chq) }}
                                                    </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                          </v-row>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-card dark color="#DF9733" class="ma-2">
                                          <v-row>
                                            <v-col cols="12">
                                              <v-card class="ma-1" style="border-radius: 10px;">
                                                <div style="background-color: #EAB866 ; ">
                                                  <v-card-text class="text-center text-white">ยอดรวมเงินโอน + เช็ค</v-card-text>
                                                </div>
                                                <div style="background-color: #ffffff ; ">
                                                  <v-card-text class="text-center black--text">
                                                    {{ formatNumber(total_all) }}
                                                  </v-card-text>
                                                </div>
                                              </v-card>
                                            </v-col>
                                          </v-row>
                                        </v-card>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-flex>
                          <!-- </v-layout> -->
                        <!-- </v-flex> -->
                        <v-flex d-flex xs12 sm12 md12>
                          <v-card style="width:auto; height:50pc; border-radius: 20px;">
                            <v-card-title class="justify-center" primary-title>ภาพรวมเทียบแผนเงินรับ และตัดหนี้ INET & JV</v-card-title>
                            <v-row>
                              <v-col cols="12">
                                <div class="pa-2">
                                  <canvas ref="chartCanvas" width="350" height="50"></canvas>
                                </div>
                              </v-col>
                              <v-col cols="12" class="mt-5">
                                <div class="pa-2">
                                  <canvas ref="chartCanvas2" height="350"></canvas>
                                </div>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-col>
              </v-row>
          </div>
        </v-container>

    </div>
</template>
<script>
import moment from "moment";
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default {
    data: ()=>({
        nowDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        finish: false,
        role_status: "",
        date: new Date().toISOString(),
        menu: false,
        toDay: new Date(),
        month: "01",
        year: "2023",

        total_transfer_inet:0,
        total_transfer_jv:0,
        total_suspense_inet: 0,
        total_suspense_jv: 0,
        total_customer: 0,
        total_amount: 0,

        total_cheque_inet: 0,
        total_suspense_chq: 0,
        total_all: 0,

        chart1Obj: null,
        chart1: {
          labels: [],
          data: [],
          transfer: [],
          suspense:[]
        },
        chart2Obj: null,
        chart2:{
          labels: [],
          data: [],
          transfers: [],
          cheque: [],
        },
        chart3Obj: null,
        chart3: {
          labels: [],
          data: [],
          cash_plan: [],
          cash: [],
          bill: []
        },
        chart4Obj: null,
        chart4: {
          labels: [],
          data: [],
          cash_plan: [],
          cash: [],
          bill: []
        }
    }),
    created() {
        this.role_status = localStorage.getItem("role");
        if (this.role_status !== "super_admin" && this.role_status !== "admin" && this.role_status !== "wait_down_service") {
            this.$router.push("/invoice");
        } else if (localStorage.getItem("acces_token")) {
            this.finish = true;
        }
    },
    async mounted() {
      await this.fetchData();
      this.renderChart1();
      this.renderChart2();
      this.renderChart3();
      this.renderChart4();
    },
    watch: {},
    computed: {},
    methods: {
        formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        parseFirstDayRequest(date) {
          var toDay = new Date(date.getFullYear(), date.getMonth(), 1);
          return toDay ? moment(toDay).format("DD/MM/YYYY") : "";
        },
        parseLastDayRequest(date) {
          var toDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          return toDay ? moment(toDay).format("DD/MM/YYYY") : "";
        },
        formatDate(date) {
          return moment(date).format('ll').split(",")[0].split(" ")[1];
        },
        async fetchData(month = this.nowDate.split("-")[1], year = this.nowDate.split("-")[0]){
          this.finish = false
          let headers = {
            headers: {
              Authorization:
                "Bearer " +
                localStorage.getItem("acces_token") +
                "," +
                localStorage.getItem("secret"),
            },
          };
          await this.axios
            .get(process.env.VUE_APP_API + `/statement/chart/report?month=${month}&year=${year}`, headers)
            .then((response) => {
              const million = 1000000
              if (response.status === 200) {
                
                //chart1
                this.chart1.labels = (response.data.Chart1.data).map(item => this.formatDate(item.work_date))
                this.chart1.transfer = (response.data.Chart1.data).map(item => (item.transfer / million) > 0 ? (item.transfer / million).toFixed(2) : (item.transfer / million))
                this.chart1.suspense = (response.data.Chart1.data).map(item => (item.suspense / million) > 0 ? (item.suspense / million).toFixed(2) : (item.suspense / million))
                this.total_transfer_inet = response.data.Chart1.total_transfer_inet;
                this.total_transfer_jv = response.data.Chart1.total_transfer_jv;
                this.total_suspense_inet = response.data.Chart1.total_suspense_inet;
                this.total_suspense_jv = response.data.Chart1.total_suspense_jv;
                this.total_amount = response.data.Chart1.total_amount;
                this.total_customer = response.data.Chart1.total_customer;

                //chart2
                this.chart2.labels = (response.data.Chart2.data).map(item => this.formatDate(item.work_date))
                this.chart2.transfers = (response.data.Chart2.data).map(item => (item.transfers / million) > 0 ? (item.transfers / million).toFixed(2) : (item.transfers / million))
                this.chart2.cheque = (response.data.Chart2.data).map(item => (item.cheque / million) > 0 ? (item.cheque / million).toFixed(2) : (item.cheque / million))
                this.total_cheque_inet = response.data.Chart2.total_cheque_inet;
                this.total_suspense_chq = response.data.Chart2.total_suspense_chq;
                this.total_all = response.data.Chart2.total_all;

                //chart3
                this.chart3.total_bill_chq = (response.data.Chart3.total_bill_chq / million).toFixed(2);
                this.chart3.total_bill_tr = (response.data.Chart3.total_bill_tr / million).toFixed(2);
                this.chart3.total_cash = (response.data.Chart3.total_cash / million).toFixed(2);
                this.chart3.total_cashplan = (response.data.Chart3.total_cashplan / million).toFixed(2);

                //chart4
                this.chart4.labels = (response.data.Chart3.data).map(item => this.formatDate(item.work_date))
                this.chart4.cash_plan = (response.data.Chart3.data).map(item =>(item.cash_plan / million)> 0 ? (item.cash_plan / million).toFixed(2) : (item.cash_plan / million))
                this.chart4.cash = (response.data.Chart3.data).map(item => (item.cash / million)> 0 ? (item.cash / million).toFixed(2) : (item.cash / million))
                this.chart4.bill = (response.data.Chart3.data).map(item => (item.bill / million)> 0 ? (item.bill / million).toFixed(2) : (item.bill / million))
                this.finish = true;
            } else {
              this.finish = true;
            }
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.finish = true;
              this.$router.push("/login");
            }
          });
        },
        async selectDate(date){
          this.$refs.menu.save(date);
          const nowDate = new Date(date);
          this.toDay = nowDate;
          const year = date.split("-")[0];
          const month = date.split("-")[1];
          await this.fetchData(month, year)
          if (this.chart1Obj || this.chart2Obj || this.chart3Obj || this.chart4Obj ) {
            this.chart1Obj.destroy();
            this.chart2Obj.destroy();
            this.chart3Obj.destroy();
            this.chart4Obj.destroy();
          }
          this.renderChart1();
          this.renderChart2();
          this.renderChart3();
          this.renderChart4();
        },
        renderChart1() {
          const ctx = this.$refs.lineChart1.getContext('2d');
          this.chart1Obj = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.chart1.labels,
              datasets: [
                {
                  label: 'เดือนปัจจุบัน',
                  borderColor: '#115AB0',
                  backgroundColor: '#115AB0',
                  datalabels: { align: 'end', anchor: 'start' },
                  data: this.chart1.transfer,
                },
                {
                  label: 'เดือนอื่น',
                  data: this.chart1.suspense,
                  borderColor: '#DF9733',
                  backgroundColor: '#DF9733',
                  datalabels: {
                    align: 'end',
                    anchor: 'start'
                  }
                },
              ],
            },
            plugins: [ChartDataLabels],
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'ยอดเงิน/วัน (หน่วย : ล้านบาท)'
                  }
                }
              }
            }
          });
        },
        renderChart2() {
          const ctx = this.$refs.lineChart2.getContext('2d');
          this.chart2Obj = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.chart2.labels,
              datasets: [
                {
                  label: 'เงินโอน',
                  data:this.chart2.transfers,
                  borderColor: '#6096B4',
                  backgroundColor: '#6096B4',
                  datalabels: {
                    align: 'end',
                    anchor: 'start'
                  },
                  fill: false,
                },
                {
                  label: 'เช็ค',
                  data:this.chart2.cheque,
                  borderColor: '#A560C2',
                  backgroundColor: '#A560C2',
                  datalabels: {
                    align: 'end',
                    anchor: 'start'
                  },
                  fill: false,
                },
              ],
            },
            plugins: [ChartDataLabels],
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'ยอดเงิน/วัน (หน่วย : ล้านบาท)'
                  }
                }
              }
            },
          });
        },
        renderChart3(){
          const ctx = this.$refs.chartCanvas.getContext('2d');
          this.chart3Obj = new Chart(ctx, {
            type: 'bar',
            data: {
              // labels: [" "],
              // datasets: [
              //   {
              //     label: 'เงินรับจริง',
              //     data: [this.chart3.total_cash],
              //     backgroundColor: '#478E37',
              //     datalabels: {
              //       anchor: 'end',
              //       align: 'start',
              //       color: 'white',
              //       font: {
              //         weight: 'bold'
              //       },
              //     }
              //   },
              //   {
              //     label: 'ตัดหนี้เงินโอน',
              //     data: [this.chart3.total_bill_tr],
              //     backgroundColor: '#6096B4',
              //     datalabels: {
              //       anchor: 'end',
              //       align: 'start',
              //       color: 'white',
              //       font: {
              //         weight: 'bold'
              //       },
              //     }
              //   },
              //   {
              //     label: 'ตัดหนี้เช็ค',
              //     data: [this.chart3.total_bill_chq],
              //     backgroundColor: '#A560C2',
              //     datalabels: {
              //       anchor: 'end',
              //       align: 'start',
              //       color: 'white',
              //       font: {
              //         weight: 'bold'
              //       },
              //     }
              //   },
              //   {
              //     label: 'แผนเงินรับ',
              //     data: [this.chart3.total_cashplan],
              //     backgroundColor: '#ABAFAB',
              //     datalabels: {
              //       anchor: 'end',
              //       align: 'start',
              //       color: 'white',
              //       font: {
              //         weight: 'bold'
              //       },
              //     }
              //   },
              // ],
              labels: ['','',''],
                datasets: [{
                    label: 'เงินรับจริง',
                    data: [this.chart3.total_cash,'',''],
                    backgroundColor: "#478E37",
                    datalabels: {
                    anchor: 'end',
                    align: 'start',
                    color: 'white',
                    font: {
                      weight: 'bold'
                    },
                    
                  } 
                }, 
                {
                    label: 'ตัดหนี้เงินโอน',
                    data: ['', this.chart3.total_bill_tr,'',],
                    backgroundColor: "#6096B4",
                    datalabels: {
                    anchor: 'end',
                    align: 'start',
                    color: 'white',
                    font: {
                      weight: 'bold'
                    }, 
                  }
                }, {
                    label: 'ตัดหนี้เช็ค',
                    data: ['', this.chart3.total_bill_chq,''],
                    backgroundColor: "#A560C2",
                    datalabels: {
                    anchor: 'end',
                    align: 'start',
                    color: 'white',
                    font: {
                      weight: 'bold'
                    },
                    
                  }
                },{
                    label: 'แผนเงินรับ',
                    data: ['', '',this.chart3.total_cashplan],
                    backgroundColor: "#ABAFAB",
                    datalabels: {
                    anchor: 'end',
                    align: 'start',
                    color: 'white',
                    font: {
                      weight: 'bold'
                    },
                  }
                }
                ],
            },
            plugins: [ChartDataLabels],
            options: {
              displayColors: true,
                  callbacks: {
                      mode: 'x',
                  },
              responsive: true,
              
              indexAxis: 'y',
              scales: {
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: 'ยอดเงิน (หน่วย : ล้านบาท)'
                  },
                },
                y: {
                  stacked: true,
                },
              },
            },
          });
        },
        renderChart4(){
          const ctx = this.$refs.chartCanvas2.getContext('2d');
          this.chart4Obj = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.chart4.labels,
              datasets: [
                {
                  label: 'เงินรับจริง',
                  data: this.chart4.cash,
                  borderColor: '#478E37',
                  backgroundColor: '#478E37',
                  fill: false,
                  datalabels: {
                  align: 'end',
                  anchor: 'start'
                  },
                  type: 'line',
                },
                {
                  label: 'ตัดหนี้เงินโอน + เช็ค',
                  data: this.chart4.bill,
                  borderColor: '#DF9733',
                  backgroundColor: '#DF9733',
                  fill: false,
                  datalabels: {
                  align: 'end',
                  anchor: 'start'
                  },
                  type: 'line',
                },
                {
                  label: 'แผนเงินรับ',
                  data: this.chart4.cash_plan,
                  borderColor: '#ABAFAB',
                  backgroundColor: '#ABAFAB',
                  
                  fill: false,
                },
              ],
            },
            plugins: [ChartDataLabels],
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'ยอดเงิน/วัน (หน่วย : ล้านบาท)'
                  }
                }
              }
            },
          });
        },
        captureScreenshot() {
          const element = document.getElementById('export-chart');

          html2canvas(element).then(canvas => {
            const screenshot = canvas.toDataURL('image/png');
            this.downloadScreenshot(screenshot);
          });
        },
        downloadScreenshot(screenshot) {
          const link = document.createElement('a');
          link.href = screenshot;
          link.download = 'chart.png';
          link.click();
        }
    },

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

.disable-events {
  pointer-events: none;
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
