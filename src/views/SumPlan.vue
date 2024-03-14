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
            <label class="header-text">Sum - Plan</label>
              <v-card-title>
                <v-btn
                  color="primary"
                  style="height: 40px; width: 160px; font-size: 14px"
                  class="font-fam"
                  @click="Export_Sumplan()">
                  Export File
                  <!-- <v-icon dark> mdi-checkbox-marked-circle </v-icon> -->
                </v-btn>
              </v-card-title>
          </v-col>
          <!-- <v-col cols="3">
            <v-card color="cyan" dark style="padding: 10px">
              <v-card-title style="display: block">
                Count Invoive
                <v-spacer></v-spacer>
                <label style="font-size: 1.2vw">{{ count_invoice }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

          <!-- <v-col cols="6">
            <v-card dark color="teal" style="padding: 10px">
              <v-card-title style="display: block">
                Factoring
                <v-spacer></v-spacer>
                <label style="font-size: 1.2vw">-</label>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card color="success" dark style="padding: 10px">
              <v-card-title>
                <div style="display: block">
                  Total
                  <v-spacer></v-spacer>

                  <label style="font-size: 1.2vw">-</label>
                </div>
              </v-card-title>
            </v-card>
          </v-col> -->

            <!-- <v-col cols="6">
              <v-card color="primary" dark style="padding: 10px" class="font-fam">
                <v-card-title style="display: block">
                  Factoring :
                
                  <label style="font-size: 1.5vw;color:#FFFD9E ">{{factoring}}</label>
                </v-card-title>
              </v-card>
            </v-col> -->

              <v-col cols="6">
            <v-card style="padding: 2px;">
              <v-card-title style="display: block">
                <div class="d-flex font-fam" style="align-items: center;justify-content: space-between;"> 
                <v-icon style="font-size: 28px;padding:5px;color:white;background-color:#14a1c0">mdi-file-multiple-outline</v-icon>
                <label style="font-size: 1.2vw;text-align:right">Factoring </label>
                </div>
                <v-spacer></v-spacer>
                <div class="font-fam" style="font-size: 1.2vw;text-align: right;font-weight:700">{{ factoring }}</div>
              </v-card-title>
            </v-card>
          </v-col>

            <!-- <v-col cols="6">
              <v-card dark color="teal" style="padding: 10px" class="font-fam">
                <v-card-title style="display: block">
                  Total Amount :
                
                  <label style="font-size: 1.5vw;color:#FFFD9E">{{total_amount}}</label>
                </v-card-title>
              </v-card>
            </v-col> -->

                <v-col cols="6">
            <v-card style="padding: 2px;">
              <v-card-title style="display: block">
                <div class="d-flex font-fam" style="align-items: center;justify-content: space-between;"> 
                <v-icon style="font-size: 28px;padding:5px;color:white;background-color:#14a1c0">mdi-file-multiple-outline</v-icon>
                <label style="font-size: 1.2vw;text-align:right"> Total Amount </label>
                </div>
                <v-spacer></v-spacer>
                <div class="font-fam" style="font-size: 1.2vw;text-align: right;font-weight:700;">{{ total_amount }}</div>
              </v-card-title>
            </v-card>
          </v-col>
  
          <!-- <v-col cols="4">
            <v-card color="primary" dark style="padding: 10px">
              <v-card-title style="display: block">
                Suspend
                <v-spacer></v-spacer>
                <label style="font-size: 1.2vw">-</label>
              </v-card-title>
            </v-card>
          </v-col> -->
            
          <v-col cols="12">
            <v-card>

    

              <!-- <v-data-table
                :headers="headers"
                :items="desserts"
                class="elevation-1"
              >
                <template v-slot:header="{ props }">
                  <th v-for="headder in props.headers" :key="headder.value">
                    {{ headder.text }}
                    <div v-if="headder.text == 'Dessert (100g serving)'" class="d-flex">
                      <template v-for="sub_header in one_sub" >
                        <div :key="sub_header" style="width:50px">
                        {{ sub_header }}
                        </div>
                      </template>
                    </div>
                  </th></template> 

                <template v-slot:[`item.calories`]="{ item }">
                  <v-chip :color="getColor(item.calories)" dark>
                    {{ item.calories }}
                  </v-chip>
                </template>
              </v-data-table> -->
              <div class="table-sum">
                <v-simple-table class="table_in_sum"
                fixed-header
                height="600px"
                style="border-top:1px solid gray">
                  <thead>
                    <tr
                      v-for="header in pivotHeaders"
                      :key="header.value"
                      class="border-frame"
                    >
                      <th
                        v-for="head in header"
                        :colspan="head.colspan"
                        :key="head.value"
                        style="text-align: center;padding:0"
                        :style="{ 'background-color': head.color }"
                        v-bind:class="[
                          head.value =='เงินเข้าจริง เงินสด (1) ' ||
                          head.value =='เงินเข้าจริง Factoring (2)' || 
                          head.value =='เงินเข้าจริง (1) + (2)' ||
                          head.value =='Diff จาก Plan' ||
                          head.value =='Diff (ไม่ทราบลูกค้า)'  ? 'border-frame' : '']"
                      > 
                        <div style="min-width:170px;height:40px;justify-content: center;align-items: center;
                          display: flex;font-size:14px" 
                        v-bind:style="{ color: head.value == 'Plan' ? 'white' : 'black'}">{{ head.value }}</div>
                        <td  v-for="value in head.sub"
                        :colspan="value.colspan"
                        style="text-align: center;"
                        :key="value.value">
                        <!-- ,
                        height:head.value =='วันที่แพลน' ||
                          head.value =='เงินเข้าจริง เงินสด (1) ' ||
                          head.value =='เงินเข้าจริง Factoring (2)' || 
                          head.value =='เงินเข้าจริง (1) + (2)' ||
                            head.value =='Diff จาก Plan' ||
                              head.value =='Diff (ไม่ทราบลูกค้า)' 

                        ? '100%': '40px' -->
                          <div class="border-frame"
                          style="width:100%; height:40px; text-align: center; margin:auto; align-items: center;
                              display: flex;
                              justify-content: center;"
                              :style="{ 'background-color': value.color }">{{value.value}}</div>
                              <div  class="d-flex">
                                <div   v-for="number in value.number" 
                                :key="number.value"
                                class="border-frame"
                                style="width:170px;height:40px;text-align: center;    align-items: center;
                                  display: flex;
                                  justify-content: center;"
                                  :style="{ 'background-color': 'white' }"
                                >{{number.value}}</div>
                              </div>
                        </td>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item_row in pivotData" :key="item_row.id" class="hover-td">
                      <!-- due_date -->
                      <td  style="padding:0;border-right:1px solid gray">
                        <div  style="width:170px;"> {{date(item_row.due_date)}}</div>
                      
                        </td>
                        <!-- plan current -->
                          <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;"> {{convert_digit(item_row.count_customer_current) }}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.count_invoice_current) }}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.amount_current) }}</div>
                            </div>
                        </td>
                      <!-- plan backlog -->
                      <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;"> {{convert_digit(item_row.count_customer_backLog) }}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.count_invoice_backLog )}}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.amount_backLog )}}</div>
                            </div>
                        </td>

                        <!-- plan เงินสด -->
                          <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;color:red"> {{convert_digit(item_row.amount_fac_no) }}</div>
                            </div>
                        </td>

                          <!-- plan fac -->
                          <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;color:red"> {{convert_digit(item_row.amount_fac_yes )}}</div>
                            </div>
                        </td>


                        <!-- plan รวม -->
                      <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;"> {{convert_digit(item_row.count_customer) }}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.count_invoices )}}</div>
                      <div  style="width:170px;color:red"> {{convert_digit(item_row.sum_amount) }}</div>
                            </div>
                        </td>


                        <!-- actual current -->
                        <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_count_customer_current )}}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_count_invoice_current) }}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_amount_current) }}</div>
                            </div>
                        </td>

                        <!-- actual backlog -->
                          <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_count_customer_backLog )}}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_count_invoice_backLog) }}</div>
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_amount_backLog) }}</div>
                            </div>
                        </td>


                        <!-- เงิดสด 1-->
                          <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_amount_fac_no) }}</div>
                            </div>
                        </td>

                        <!-- factoring 2-->
                          <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_amount_fac_yes) }}</div>
                            </div>
                        </td>

                        <!-- 1+2 -->
                        <td style="padding:0;width:170px;" >
                            <div class="d-flex">
                      <div  style="width:170px;"> {{convert_digit(item_row.actual_sum_amount) }}</div>
                            </div>
                        </td>
                        
                    </tr>
                  </tbody>
                </v-simple-table>

              </div>
              <!-- <v-pagination
              class="page_sum"
            
              v-model="page"
              :length="page_total"
              @input="pageChange()"
            ></v-pagination> -->
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
// import Swal from 'sweetalert2';

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    finish: false,
    page: 1,
    page_total: 1,

    pivotData: [],
    pivotHeaders: [
      [
        { value: "วันที่แพลน", colspan: 1, color: "white !important" },
        {
          value: "Plan",
          colspan: 5,
          color: "#44546A !important",
          sub: [
            {
              value: "Current",
              colspan: 3,
              color: "#DEEAF6",
              id: 4,
              number: [
                { value: "จำนวนลูกค้า", colspan: 1, id: 5 },
                { value: "จำนวน Inv	", colspan: 1, id: 6 },
                { value: "จำนวนเงิน", colspan: 1, id: 7 },
              ],
            },
            {
              value: "Backlog",
              color: "#DEEAF6",
              colspan: 3,
              id: 5,
              number: [
                { value: "จำนวนลูกค้า", colspan: 1, id: 5 },
                { value: "จำนวน Inv	", colspan: 1, id: 6 },
                { value: "จำนวนเงิน", colspan: 1, id: 7 },
              ],
            },
            {
              value: "เงินสด",
              color: "#EAD1DC",
              colspan: 1,
              id: 6,
              number: [{ value: "จำนวนเงิน", colspan: 1, id: 7 }],
            },
            {
              value: "FAC",
              color: "#EAD1DC",
              colspan: 1,
              id: 7,
              number: [{ value: "จำนวนเงิน", colspan: 1, id: 7 }],
            },
            {
              value: "รวม",
              color: "#DEEAF6",
              colspan: 3,
              id: 8,
              number: [
                { value: "จำนวนลูกค้า", colspan: 1, id: 5 },
                { value: "จำนวน Inv	", colspan: 1, id: 6 },
                { value: "จำนวนเงิน", colspan: 1, id: 7 },
              ],
            },
          ],
        },
        {
          value: "Actual",
          color: "#BDD6EE !important",
          colspan: 2,
          sub: [
            {
              value: "Current",
              colspan: 3,
              color: "#DEEAF6",
              id: 4,
              number: [
                { value: "จำนวนลูกค้า", colspan: 1, id: 5 },
                { value: "จำนวน Inv	", colspan: 1, id: 6 },
                { value: "จำนวนเงิน", colspan: 1, id: 7 },
              ],
            },
            {
              value: "Backlog",
              colspan: 3,
              color: "#DEEAF6",
              id: 5,
              number: [
                { value: "จำนวนลูกค้า", colspan: 1, id: 5 },
                { value: "จำนวน Inv	", colspan: 1, id: 6 },
                { value: "จำนวนเงิน", colspan: 1, id: 7 },
              ],
            },
          ],
        },
        {
          value: "เงินเข้าจริง เงินสด (1) ",
          colspan: 1,
          color: "#FFE598 !important",
          sub: [],
          number: [{ value: "จำนวนเงิน", colspan: 1, id: 7 }],
        },
        {
          value: "เงินเข้าจริง Factoring (2)",
          color: "#FFE598 !important",
          colspan: 1,
          sub: [],
          number: [{ value: "จำนวนเงิน", colspan: 1, id: 7 }],
        },
        {
          value: "เงินเข้าจริง (1) + (2)",
          colspan: 1,
          color: "#FFE598 !important",
          sub: [],
          number: [],
        },
        // {
        //   value: "เลือนจากแผน",
        //   colspan: 2,
        //   color: "#FFC000",
        //   sub: [
        //     {
        //       value: "Current",
        //       colspan: 3,
        //       color: "#FEF2CB",
        //       id: 4,
        //       number: [
        //         { value: "จำนวนลูกค้า", colspan: 1, id: 5 },
        //         { value: "จำนวน Inv	", colspan: 1, id: 6 },
        //         { value: "จำนวนเงิน", colspan: 1, id: 7 },
        //       ],
        //     },
        //     {
        //       value: "Backlog",
        //       color: "#FEF2CB",
        //       colspan: 3,
        //       id: 5,
        //       number: [
        //         { value: "จำนวนลูกค้า", colspan: 1, id: 5 },
        //         { value: "จำนวน Inv	", colspan: 1, id: 6 },
        //         { value: "จำนวนเงิน", colspan: 1, id: 7 },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   value: "Diff จาก Plan",
        //   color: "#FFE598",
        //   colspan: 1,
        //   sub: [],
        //   number: [],
        // },
        // {
        //   value: "Diff (ไม่ทราบลูกค้า)",
        //   color: "#FFE598",
        //   colspan: 1,
        //   sub: [],
        //   number: [],
        // },
      ],
    ],
    factoring:'',
    total_amount:'',
    role_status:null
  }),
  created() {
     this.role_status = localStorage.getItem("role");
    if(this.role_status == 'down_service') {
       this.finish = false;
       this.$router.push("/down-service");
    }
    else {
    this.Init();
    }
   
  },
  watch: {},
  computed: {},
  methods: {
    pageChange() {
      this.Init();
    },
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
        .get(process.env.VUE_APP_API + "/plan/summary", headers)
        .then((response) => {
          if (response) {
            this.finish = true;
            // console.log(response);
            this.pivotData = response.data.data;
            this.factoring =response.data.sum_fac.toLocaleString()
            this.total_amount =response.data.total_amount.toLocaleString()
          }
        })
         .catch((error) => {
          if (error) {
            this.finish = true;
            this.$router.push("/invoice");
          }
        });
    },
    date(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    convert_digit(data) {
      var number = Number(data).toLocaleString();
      return number;
    },
    Export_Sumplan(){
      var url =
        process.env.VUE_APP_API +
        "/export/plan/summary?secret=" +
        encodeURIComponent(localStorage.getItem("resource_key"));
      // encodeURIComponent
      window.open(url);
    }
  },
};
</script>
<style lang="scss" >
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
.font-fam{
  font-family: "Bai_Jamjuree" !important;
}
label.header-text{
  font-size: 28px;
  font-family: "Bai_Jamjuree" !important;
  font-weight: 700;
}
.hover-td:hover {
  background-color: #eeeeee !important;
}
h1 {
  font-size: 2.625rem;
  font-weight: 300;
  line-height: 1.199;
  letter-spacing: 0;
}
.v-pagination {
  align-items: center;
  display: inline-flex;
  list-style-type: none;
  justify-content: flex-end !important;
  margin: 0;
  max-width: 100%;
  width: 100%;
}
.table-sum {
  width: 100% !important;
  overflow: auto !important;
  table {
    border-collapse: separate; /* Don't collapse */
    border-spacing: 0;
  }
}
.table_in_sum {
  background-position: center !important;
  background-repeat: no-repeat !important;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
  overflow: auto !important;
  text-align: center;
}
.border-frame {
  border: 1px solid gray;
}
.border-frame-header {
  justify-items: center;
  align-items: center;
  border: 1px solid gray;
}
@media (min-width: 960px) {
  .container {
    max-width: 100%;
    background-color: rgb(250, 250, 250);
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