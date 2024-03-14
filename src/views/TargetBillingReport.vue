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
          <h3 style="font-weight: 700" class="font_style">Target Billing Report</h3>
          <v-spacer></v-spacer>
        </v-col>

         <template>
          <!-- <v-col cols="6">
            <v-card color="primary" dark style="padding: 10px">
              <v-card-title style="display: block">
                Count User :
                
                <label style="font-size: 1.5vw">{{ count_user }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

            <!-- <v-col cols="6">
          <v-card style="padding: 1px;">
            <v-card-title style="display: block">
              <div class="d-flex" style="align-items: center;justify-content: space-between;"> 
               <v-icon style="font-size: 28px;padding:5px;color:white;background-color:#3BB8C6">mdi-account</v-icon>
              <label style="font-size: 1.2vw;text-align:right">Count Customer</label>
              </div>
              <v-spacer></v-spacer>
              <div style="font-size: 1.2vw;text-align: right;font-weight:700">{{ count }}</div>
            </v-card-title>
          </v-card>
        </v-col> -->

          <!-- <v-col cols="6">
            <v-card dark color="teal" style="padding: 10px">
              <v-card-title style="display: block">
                Total User :
               
                <label style="font-size: 1.5vw">{{ total_user }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

           <!-- <v-col cols="6">
          <v-card style="padding: 1px;">
            <v-card-title style="display: block">
              <div class="d-flex" style="align-items: center;justify-content: space-between;"> 
               <v-icon style="font-size: 28px;padding:5px;color:white;background-color:#3BB8C6">mdi-account-supervisor</v-icon>
              <label style="font-size: 1.2vw;text-align:right">Total Customer</label>
              </div>
              <v-spacer></v-spacer>
              <div style="font-size: 1.2vw;text-align: right;font-weight:700">{{ convert_digit(total_page)}}</div>
            </v-card-title>
          </v-card>
        </v-col> -->

        </template>

        <v-col cols="12">
          <v-card>
            <v-card-title>
              <!-- <div>
                <button
                  class="btn refresh-btn font_style"
                  color="primary"
                  @click="refreshData()"
                >
                  Refresh:
                  <v-icon black>mdi-refresh</v-icon>
                </button>
              </div> -->
              <div class="d-flex" style="justify-content: space-between;align-items: center;width: 100%;">
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
                  <v-spacer></v-spacer>
              
              <div style="display: flex; justify-content: space-between;margin-right:5px;color:gray">
                 <div>
                <v-form
                style="display: flex; align-items: center"
                class="search-area font_style"
                @submit.prevent="searchWord()"
              >
                <v-text-field
                  v-model="search"
                  label="search"
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
               </div>
               
              </div>
              </div>


              <v-spacer></v-spacer>
            
            </v-card-title>

            <v-card-text id="customer-manage" >

                  <!-- <v-btn
                    color="teal"
                    dark
                    style="width: 150px; font-size: 12px; font-weight: 600"
                    @click="Export_AllFile()"
                    text
                  >
                    Export All File
                  </v-btn> -->
              
                 <label style="font-size: 12px; float: right;padding-top:15px"
                  >page : {{ page}}</label
                >
              
              <!-- --------------------------------------table--------------------------------------------- -->
              <div class="table-sum-cus">
                  <div style="text-align: center;
    font-size: 16px;
    padding-bottom: 10px;">
                    เป้าหมาย : แผนวางบิลตามรอบของลูกค้า Oct  (3227) INET 
                  </div>
                <v-simple-table
                  class="table_in_sum_customer"
                  fixed-header
                  height="600px"
                  style="border-top: 1px solid gray">
                  <thead>
                    <tr>
                      
                      <th
                        v-for="header in pivotHeaders"
                        :key="header.value"
                        style="text-align: center; padding: 0;height:80px;font-weight:700;z-index:1"
                        :style="{ 'background-color': header.color , 
                          'border-right': header.value == '' ? '0px' : '1px solid' }"

                      >
                        <div style="height:40px;align-items: center;
                        display: flex;font-size:14px;padding:0px;"
                         v-bind:style="{ 'border-right':header.value == 'วางบิล' || header.value == 'รับเงิน' ? '1px solid' : '0px' ,
                         'width':header.value == 'วันที่' ? '200px' : '',
                        'justify-content':header.value == 'Cus No.'? 'left' : 'center' }"
                         >       
                        {{ header.value }}</div>
                      <td  v-for="value in header.sub"
                      :colspan="value.colspan"
                      style="text-align: center;width:360px"
                      :key="value.value"
                      >
                        <div 
                         style="width:auto;height:60px;text-align: center;margin:auto;  
                           align-items: center;
                          display: flex;
                          justify-content: center;
                          border-right:1px solid;
                          border-top:1px solid;
                          border-bottom:1px solid;
                          "
                           :style="{ 'background-color': value.color,
                           'width': value.value == 'วันที่'
                           || value.value == 'ติดต่อการชำระ'? '350px' : '240px'}" 
                          
                          >
                         {{value.value}}
                           </div>
                           
                      </td>
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr v-for="item_row in datalist" :key="item_row.id">

                       <td  style="padding-left:10px;padding:0;vertical-align: middle;">
                         <div>{{new Date()}}</div>
                       </td>

                        <td style="padding-left:10px;padding:0;vertical-align: middle;border-right:1px solid gray">
                          <div class="d-flex" style="width:100%" >
                              <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                         <div style="width:240px;">test</div>

                          </div>
                       
                       </td>

                        <td style="display:flex;padding:0;vertical-align: middle;border-right:1px solid gray">
                         
                           <div class="d-flex" style="width:100%" >
                              <div style="width:240px;">actual</div>

                         <div style="width:240px;">actual</div>

                         <div style="width:240px;">actual</div>
                         
                           <div style="width:240px;">actual</div>

                          <div style="width:240px;">actual</div>

                          <div style="width:240px;">actual</div>

                          <div style="width:240px;">actual</div>

                         <div style="width:240px;">actual</div>
                             
                          <div style="width:240px;">actual</div>

                           <div style="width:240px;">actual</div>

                          </div>
                       </td>

                        <td style="padding:0;vertical-align: middle;border-right:1px solid gray">                         
                         <div class="d-flex" style="width:100%" >
                          <div style="width:240px;">PO</div>
                          <div style="width:240px;">PO</div>
                          </div>
                       </td>
                       <td style="padding:0;vertical-align: middle;border-right:1px solid gray">                         
                         <div class="d-flex" style="width:100%" >
                          <div style="width:240px;">แก้ไข</div>
                          <div style="width:240px;">แก้ไข</div>
                          </div>
                       </td>
                       <td style="padding:0;vertical-align: middle;border-right:1px solid gray">                        
                         <div class="d-flex" style="width:100%" >
                          <div style="width:240px;">report</div>
                          <div style="width:240px;">report</div>
                          </div>
                       </td>
                       <td style="padding:0;vertical-align: middle;border-right:1px solid gray">                         
                         <div class="d-flex" style="width:100%" >
                          <div style="width:240px;">สัญญา</div>
                          <div style="width:240px;">สัญญา</div>
                          </div>
                       </td>
                       <td style="padding:0;vertical-align: middle;border-right:1px solid gray">                        
                         <div class="d-flex" style="width:100%" >
                          <div style="width:240px;">ลดหนี้</div>
                          <div style="width:240px;">ลดหนี้</div>
                          </div>
                       </td>
                       <td style="padding:0;vertical-align: middle;border-right:1px solid gray">                         
                         <div class="d-flex" style="width:100%" >
                          <div style="width:240px;">วางบิลไม่ได้</div>
                          <div style="width:240px;">วางบิลไม่ได้</div>
                          </div>
                       </td>
                         <td style="padding:0;vertical-align: middle;border-right:1px solid gray">                         
                         <div class="d-flex" style="width:100%" >
                          <div style="width:240px;">วางบิลหลังใช้</div>
                          <div style="width:240px;">วางบิลหลังใช้</div>
                          </div>
                       </td>
                       <td style="padding:0;vertical-align: middle;border-right:1px solid gray">                        
                         <div class="d-flex" style="width:100%" >
                          <div style="width:240px;">ติดวางบิลไม่ได้</div>

                          <div style="width:240px;">ติดวางบิลไม่ได้</div>
                          </div>
                       </td>                  
                    </tr>               
                  </tbody>
                </v-simple-table>              
                  <div class="d-flex" style=" justify-content:end;margin-top: 20px">
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        margin-right: 10px;
                      ">
                      Items per page:
                    </div>
                     <select
                      style="width: 80px; margin-right: 20px"
                      class="style-chooser"
                      v-model="item_per_page_count"
                      @change="item_per_page()"                      
                    >
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="300">300</option>
                      <option value="500">500</option>
                    </select>
                  <v-pagination
                    v-model="page"
                    :length="count_page"
                    :total-visible="7"
                    @input="pageChange()"
                  ></v-pagination>
                  </div>
              </div>
              <!-- ------------------------------------End tabel --------------------------------------------- -->
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
import "carbon-components/css/carbon-components.css";
// import { BModal, VBModal } from "bootstrap-vue";
// import Swal from "sweetalert2";

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    page: 1,
    count: 50,
    count_page: 1,
    total_page: 100,
    datalist: [],
    archive_list: ["PO", "สัญญา", "QT", "Report", "อื่นๆ"],
    search: "",
    pivotHeaders: [
      { value: "  วันที่", colspan: 1, color: "#E9EBEF !important" },

      {
        value: "แผนการวางบิล",
        colspan: 2,
        color: "#A2B7E1 !important",
        sub: [
          {
            value: "จำนวน INV (Back log )",
            colspan: 1,
            color: "#FFFF00",
            id: 1,
          },
          {
            value: "จำนวนเงิน / บาท  (Back log)",
            color: "#FFFF00",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวน INV (วางทุกวัน) Backlog",
            color: "#FFFF00",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวนเงิน / บาท (วางทุกวัน)Backlog",
            color: "#FFFF00",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวน INV (ตามรอบวางบิล) บิลปัจจุบัน",
            color: "#FFFFFF",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวนเงิน / บาท (ตามรอบวางบิล) บิลปัจจุบัน",
            color: "#FFFFFF",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวน INV (วางทุกวัน) บิลปัจจุบัน",
            color: "#FFFFFF",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวนเงิน / บาท (วางทุกวัน) บิลปัจจุบัน",
            color: "#FFFFFF",
            colspan: 1,
            id: 2,
          },
          {
            value: "รวม / ใบ เดือน 10",
            color: "#FFE598",
            colspan: 1,
            id: 2,
          },
          {
            value: "รวม / ใบ (Back log )",
            color: "#DEEAF6",
            colspan: 1,
            id: 2,
          },
        ],
      },
      {
        value: "Actual",
        colspan: 2,
        color: "#A8D08D !important",
        sub: [
          {
            value: "จำนวน INV (Back log )",
            colspan: 1,
            color: "#FFFF00",
            id: 1,
          },
          {
            value: "จำนวนเงิน / บาท  (Back log)",
            color: "#FFFF00",
            colspan: 1,
            id: 2,
          },

          {
            value: "จำนวน INV (ตามรอบวางบิล)",
            color: "#FFFFFF",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวนเงิน (ตามรอบวางบิล)",
            color: "#FFFFFF",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวน INV รอบวางบิลวันอื่นที่วางในวันนี้",
            color: "#FEF2CB",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวนเงิน รอบวางบิลวันอื่นที่วางในวันนี้",
            color: "#FEF2CB",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวน INV (วางทุกวัน)",
            color: "#FFFFFF",
            colspan: 1,
            id: 2,
          },
          {
            value: "จำนวนเงิน (วางทุกวัน)",
            color: "#FFFFFF",
            colspan: 1,
            id: 2,
          },
          {
            value: "รวม / ใบ เดือน 10",
            color: "#FFE598",
            colspan: 1,
            id: 2,
          },
          {
            value: "รวม / ใบ (Back log )",
            color: "#DEEAF6",
            colspan: 1,
            id: 2,
          },
        ],
      },
      {
        value: "PO",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
          },
          {
            value: "จำนวนเงิน",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
          },
        ],
      },
      {
        value: "แก้ไขรายละเอียด",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
          },
          {
            value: "จำนวนเงิน",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
          },
        ],
      },
      {
        value: "Report ",
        colspan: 2,
        color: "#FFFF00 !important",
        sub: [
          {
            value: "จำนวน INV",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
          },
          {
            value: "จำนวนเงิน",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
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
            color: "#FFFFFF",
            id: 1,
          },
          {
            value: "จำนวนเงิน",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
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
            color: "#FFFFFF",
            id: 1,
          },
          {
            value: "จำนวนเงิน",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
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
            color: "#FFFFFF",
            id: 1,
          },
          {
            value: "จำนวนเงิน",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
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
            color: "#FFFFFF",
            id: 1,
          },
          {
            value: "จำนวนเงิน",
            colspan: 1,
            color: "#FFFFFF",
            id: 1,
          },
        ],
      },
      {
        value: "ติดวางบิลไม่ได้",
        colspan: 2,
        color: "#A2B7E1 !important",
        sub: [
          {
            value: "รวม / ใบ",
            colspan: 1,
            color: "#DEEAF6",
            id: 1,
          },
          {
            value: "รวม / บาท",
            colspan: 1,
            color: "#DEEAF6",
            id: 1,
          },
        ],
      },
    ],
    finish: false,
    item_per_page_count: 50,
    selected: false,
    enabled: false,
  }),
  created() {
    this.Init();
  },
  watch: {},
  computed: {},
  methods: {
    Export_AllFile() {
      this.finish = true;
      // var headers = {
      //   headers: {
      //     Authorization:
      //       "Bearer " +
      //       localStorage.getItem("acces_token") +
      //       "," +
      //       localStorage.getItem("secret"),
      //   },
      // };
      // this.axios
      //   .get(
      //     process.env.VUE_APP_API + "/getinvoicestatus/exportcustomer",
      //     headers
      //   )
      //   .then((response) => {
      //     if (response) {
      //       this.finish = true;
      //     }
      //   });
      // this.AllFile = "ALL";
      var url =
        process.env.VUE_APP_API +
        "/getinvoicestatus/exportcustomer?secret=" +
        encodeURIComponent(localStorage.getItem("resource_key"));
      // encodeURIComponent
      window.open(url);
    },
    allcheck() {
      if (this.selected == true) {
        for (let index = 0; index < this.datalist.length; index++) {
          this.datalist[index].check = true;
        }
      } else {
        for (let index = 0; index < this.datalist.length; index++) {
          this.datalist[index].check = false;
        }
      }
    },
    item_per_page() {
      this.finish = false;
      this.count = this.item_per_page_count;
      this.page = 1;
      this.Init();
    },
    pageChange() {
      this.finish = false;
      if (
        this.page == this.count_page &&
        this.total_page < this.item_per_page_count
      ) {
        this.page = 1;
        this.Init();
      } else {

        if (this.page != this.count_page) {
          this.count = this.item_per_page_count;
        }
        this.Init();
      }
    },
    searchWord() {
      this.finish = false;
      // if (this.count_page <= 1) {
      //   this.item_per_page_count = 50;
      // } else {
      // this.count = this.item_per_page_count;
      // }
      this.count = this.item_per_page_count;
      this.Init();
    },
    refreshData_0() {
      this.page = 1;
      if (this.total_page < 50) {
        this.count = 50;
        this.item_per_page_count = 50;
      } else {
        this.count = this.item_per_page_count;
      }
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
            "/getinvoicestatus/getcustomerinfo?size=" +
            this.count +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          this.finish = true;
          this.datalist = response.data.data;
          this.count = response.data.count;
          this.item_per_page_count = response.data.count;
          this.count_page = response.data.count_page;
          this.total_page = response.data.total;
          // for (let t = 0; t < this.datalist.length; t++) {
          //   this.datalist[t].billing_due = moment(
          //     this.datalist[t].billing_due
          //   ).format("YYYY-MM-DD");
          //   this.datalist[t].payment_due = moment(
          //     this.datalist[t].payment_due
          //   ).format("YYYY-MM-DD");
          // }
          for (let index = 0; index < this.datalist.length; index++) {
            this.datalist[index]["check"] = false;
            this.datalist[index]["other"] = true;
            this.datalist[index]["remark"] = "";
          }

          if (this.page == response.data.count_page) {
            if (this.datalist.length > 0 && this.datalist.length < 50) {
              this.item_per_page_count = 50;
            } else if (
              this.datalist.length > 50 &&
              this.datalist.length < 100
            ) {
              this.item_per_page_count = 100;
            } else if (
              this.datalist.length > 100 &&
              this.datalist.length < 300
            ) {
              this.item_per_page_count = 300;
            } else if (
              this.datalist.length > 300 &&
              this.datalist.length < 500
            ) {
              this.item_per_page_count = 500;
            }
          }
          if (this.total_page == 0) {
            this.item_per_page_count = 50;
          }
        });
    },

    Init() {
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
            "/getinvoicestatus/getcustomerinfo?size=" +
            this.count +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          this.finish = true;
          this.datalist = response.data.data;
          this.count = response.data.count;
          // this.item_per_page_count = response.data.count;
          this.count_page = response.data.count_page;
          this.total_page = response.data.total;
          // for (let t = 0; t < this.datalist.length; t++) {
          //   this.datalist[t].billing_due = moment(
          //     this.datalist[t].billing_due
          //   ).format("YYYY-MM-DD");
          //   this.datalist[t].payment_due = moment(
          //     this.datalist[t].payment_due
          //   ).format("YYYY-MM-DD");
          // }
          this.datalist.forEach((element) => {
            element["other"] = "close";
            element["remark"] = "";
          });
          for (let index = 0; index < this.datalist.length; index++) {
            for (
              let h = 0;
              h < this.datalist[index].billing_document.length;
              h++
            ) {
              var add_remark = this.datalist[index].billing_document[h];
              if (
                add_remark != "PO" &&
                add_remark != "สัญญา" &&
                add_remark != "QT" &&
                add_remark != "Report" &&
                add_remark != "อื่นๆ"
              ) {
                this.datalist[index].other = "open";

                this.datalist[index].remark = add_remark;
              }

              // var other_init =
              //   this.datalist[index].billing_document.includes("อื่นๆ");
              // if (other_init == true &&  this.datalist[index].remark == "") {
              //   var find_remark_8 =
              //     this.datalist[index].billing_document.indexOf("อื่นๆ");
              //   this.datalist[index].billing_document.splice(find_remark_8, 1);
              // }
            }
          }

          // if (
          //   this.page != response.data.count_page &&
          //   response.data.count_page <= 1
          // ) {
          //   this.item_per_page_count = 50;
          // }
          // if (this.page == response.data.count_page) {
          //   if (this.datalist.length > 0 && this.datalist.length < 50) {
          //     this.item_per_page_count = 50;
          //   } else if (
          //     this.datalist.length > 50 &&
          //     this.datalist.length < 100
          //   ) {
          //     this.item_per_page_count = 100;
          //   } else if (
          //     this.datalist.length > 100 &&
          //     this.datalist.length < 300
          //   ) {
          //     this.item_per_page_count = 300;
          //   } else if (
          //     this.datalist.length > 300 &&
          //     this.datalist.length < 500
          //   ) {
          //     this.item_per_page_count = 500;
          //   }
          // }
          if (response.data.count == 0) {
            this.refreshData_0();
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
    },
    refreshData() {
      this.finish = false;
      this.Init();
    },
    set_default(item, name) {
      if (name == "billing_due") {
        item.billing_due = moment(new Date()).format("YYYY-MM-DD");
        this.updateCustomer(item);
        return item.billing_due;
      } else if (name == "payment_due") {
        item.payment_due = moment(new Date()).format("YYYY-MM-DD");
        this.updateCustomer(item);
        return item.payment_due;
      }
    },
    convert_digit(data) {
      var number = Number(data).toLocaleString();
      return number;
    },
    online_payment(payment) {
      if (payment == true) {
        return "Yes";
      } else {
        return "No";
      }
    },
    updateCustomer_document(item) {
      // var disabled = false
      var sortt = this.archive_list;
      item.billing_document.sort(function (a, b) {
        return sortt.indexOf(a) - sortt.indexOf(b);
      });
      //  item.billing_document = []
      var find_other = false;

      if (item.billing_document == null) {
        item.billing_document = [];
      }
      find_other = item.billing_document.includes("อื่นๆ");

      if (find_other == false) {
        item.other = "close";
        item.remark = "";
        this.updateCustomer(item);
      } else if (find_other == true && item.remark == "") {
        alert("กรุณาระบุข้อมูล อื่นๆ");
        item.other = "open";
        // this.updateCustomer(item);
        // if(item.billing_document.length !=1){
        //      var index_other = item.billing_document.indexOf('อื่นๆ')
        // item.billing_document.splice(index_other,1)
        // }
      } else {
        this.updateCustomer(item);
      }
    },
    remark_text(item) {
      if (item.other == "close") {
        // item.other = false;
        item.remark = "";
        // archive_list: ["PO", "สัญญา", "QT", "Report", "อื่นๆ"],
        // var find_index = item.billing_document.indexOf("อื่นๆ");
        for (let index = 0; index < item.billing_document.length; index++) {
          var check_item = item.billing_document[index];
          if (
            check_item != "PO" &&
            check_item != "สัญญา" &&
            check_item != "QT" &&
            check_item != "Report"
          ) {
            item.billing_document.splice(index, 1);
          }
        }
        this.updateCustomer(item);
      } else {
        // var find_index =  item.billing_document.indexOf("อื่นๆ");
        if (item.remark != "") {
          item.billing_document.push(item.remark);
          this.updateCustomer(item);
        } else {
          var find_remark = item.billing_document.indexOf("");
          item.billing_document.splice(find_remark, 1);
          this.updateCustomer(item);
        }
      }
    },
    updateCustomer(item) {
      this.finish = false;
      var find_other = false;
      if (item.billing_document == null) {
        item.billing_document = [];
      }
      find_other = item.billing_document.includes("อื่นๆ");

      if (item.billing_document.length > 0 && find_other == false) {
        item.other = "close";
        item.remark = "";
        for (let index = 0; index < item.billing_document.length; index++) {
          var check_item = item.billing_document[index];
          if (
            check_item != "PO" &&
            check_item != "สัญญา" &&
            check_item != "QT" &&
            check_item != "Report"
          ) {
            item.billing_document.splice(index, 1);
          }
        }
      } else if (find_other == true && item.remark == "") {
        var find_index = item.billing_document.indexOf("อื่นๆ");
        item.billing_document.splice(find_index, 1);
        item.other = "close";
        for (let index = 0; index < item.billing_document.length; index++) {
          var check_item_1 = item.billing_document[index];
          if (
            check_item_1 != "PO" &&
            check_item_1 != "สัญญา" &&
            check_item_1 != "QT" &&
            check_item_1 != "Report"
          ) {
            item.billing_document.splice(index, 1);
          }
        }
      }

      var count = {};
      item.billing_document.forEach(function (i) {
        count[i] = (count[i] || 0) + 1;
      });
      if (count["อื่นๆ"] > 1) {
        var find_index_2 = item.billing_document.indexOf("อื่นๆ");
        item.billing_document.splice(find_index_2, 1);

        if (item.remark == "") {
          item.other = "close";
          for (let index = 0; index < item.billing_document.length; index++) {
            var check_remark_2 = item.billing_document[index];
            if (
              check_remark_2 != "PO" &&
              check_remark_2 != "สัญญา" &&
              check_remark_2 != "QT" &&
              check_remark_2 != "Report" &&
              check_remark_2 != "อื่นๆ"
            ) {
              item.billing_document.splice(index, 1);
            }
          }
        }
      }
      var update = {
        active: item.active,
        billing_contact: item.billing_contact,
        billing_document: item.billing_document,
        billing_due: item.billing_due,
        billing_type: item.billing_type,
        billing_checking: item.billing_checking,
        billing_after_checking: item.billing_after_checking,
        credit_name: item.credit_name,
        customer_name: item.customer_name,
        customer_no: item.customer_no,
        email: item.email,
        financial_name: item.financial_name,
        online_payment: String(item.online_payment),
        payment_contact: item.payment_contact,
        payment_due: item.payment_due,
        payment_type: item.payment_type,
        status_customer: item.status_customer,
        uid: item.uid,
      };
      // this.finish = true;
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
        .put(
          process.env.VUE_APP_API + "/getinvoicestatus/editcustomer",
          update,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = true;
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
          }
        });
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
.v-autocomplete input {
  font-size: 12px !important;
}
.v-select__selection {
  font-size: 12px !important;
}
.v-list-item__title {
  align-self: center;
  font-size: 12px;
}

.font_style {
  font-family: "Bai_Jamjuree" !important;
}
#customer-manage {
  .v-application--is-ltr .v-text-field .v-label {
    transform-origin: top left;
    font-size: 12px !important;
  }
  .v-input--selection-controls .v-input__slot > .v-label,
  .v-input--selection-controls .v-radio > .v-label {
    font-size: 14px;
  }
  .v-chip .v-chip__content {
    align-items: center;
    display: inline-flex;
    height: 100%;
    max-width: 100%;
    margin: auto;
  }
  .table-sum-cus {
    width: 100% !important;
    overflow: auto !important;
    table {
      border-spacing: 0;
      position: relative;
      border-collapse: collapse;
    }

    thead th:first-child {
      left: 0;
      min-width: 150px;
      padding-left: 20px !important;
      z-index: 100 !important;
      border-right: none !important;
      background: linear-gradient(
        90deg,
        #e9ebef 99.3%,
        rgb(121, 121, 121) 100%
      ) !important;
    }
    tbody td:first-child {
      left: 0;
      // border-right: none;
      z-index: 99 !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99.3%,
        rgb(121, 121, 121) 100%
      ) !important;
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
    b-textarea {
      resize: none;
      overflow: hidden !important;
      font-size: 13px;
      height: auto;
      border-radius: 0px;
      width: 98%;
    }
    textarea {
      overflow: hidden !important;
      width: 98%;
      margin: auto;
      border-radius: 0px;
    }
  }

  .table_in_sum_customer {
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
      width: 340px;
      vertical-align: middle;
    }
    td {
      font-size: 12px !important;
      background-color: white !important;
    }
  }
}

.v-autocomplete__content .v-list__tile {
  height: auto;
}
.border-frame {
  border: 1px solid gray;
}
.border-frame-header {
  justify-items: center;
  align-items: center;
  border: 1px solid gray;
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
.style-chooser {
  border: 1px solid rgb(224, 224, 224);
  border-radius: 1px;
  width: 100%;
  height: 45px;
  padding-left: 7px;
  cursor: pointer;
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
  z-index: 101;
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