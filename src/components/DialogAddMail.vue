<template>
  <v-container>
    <v-dialog
      scrollable
      persistent
      :value="mail_dialog"
      @input="close"
      max-width="820px"
      max-height="270px"
      style="z-index: 1002 !important"
      content-class="vdialognew"
      id="modal_invoice_preview"
    >
      <v-card>
        <v-card-title style="background-color: #035891">
          <span
            class="text-h5"
            style="
                color: white;
                font-family: 'Bai_Jamjuree' !important;
            "
            >Mail</span
          >
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="3"> </v-col>
            <v-col cols="9">
              <div
                class="d-flex pt-4 pl-4"
                style="width:auto; align-content: left;"
              >
                <div
                  class="pt-2"
                  style="width: 65px; font-size: 14px; color:black; font-family:'Bai_Jamjuree'"
                >
                  หลักฐาน :
                </div>
                <v-file-input
                  label="แนบไฟล์"
                  outlined
                  dense
                  multiple
                  v-model="files"
                  style="border-radius: 0px;"
                  @change="getbase64Files(files)"
                  accept="image/*, .pdf, .xlsx, .xls, .csv"
                >
                  <template v-slot:selection="{ index,text }">
                    <v-chip small label color="primary" v-if="index < 1">
                      {{ text }}
                    </v-chip>
                    <span
                      v-else-if="index === 1"
                      class="text-overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 1 }} File(s)
                    </span>
                  </template>
                </v-file-input>

                <!-- <v-file-input
                  label="แนบไฟล์"
                  outlined
                  dense
                  multiple
                  v-model="files"
                  @change="uploadfiles(files,'file')"
                  accept="image/*, .pdf, .xlsx, .xls, .csv"
                >
                  <template v-slot:selection="{ index,text }">
                    <v-chip small label color="primary" v-if="index < 1">
                      {{ text }}
                    </v-chip>
                    <span
                      v-else-if="index === 1"
                      class="text-overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 1 }} File(s)
                    </span>
                  </template>
                </v-file-input> -->
              </div>
            </v-col>
            <v-col cols="3"> </v-col>
            <v-col cols="9">
              <div class="d-flex pl-4" style="width:auto;">
                <div
                  style="width: 25pc; font-size: 14px; color:black; font-family: 'Bai_Jamjuree'; padding-top: 8px"
                >
                  เอกสาร WHT :
                </div>
                    <!--
                    <v-select
                      class="mt-n7 form_select_wht"
                      v-model="select_type_wht"
                      :items="['0', '1']"
                      @change="validateselect(select_type_wht)"
                      required
                    ></v-select>
                    -->
                    <select
                        @change="validateselect(select_type_wht)"
                        required
                        v-model="select_type_wht"
                        style="
                          border: 1px solid gray;
                          border-radius: 0px;
                          width: 38%;
                          height: 42px;
                          padding-left: 10px;
                          cursor: pointer;
                          margin-top: -3px;
                        "
                        >
                        <option></option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        
                      </select>
                      
                    <v-form ref="formfile" class="form_file_wht">
                      <v-file-input
                        :disabled="select_type_wht === '0'"
                        label="แนบไฟล์"
                        outlined
                        multiple
                        dense
                        v-model="files_wht"
                        style="border-radius: 0px;"
                         @change="getbase64FilesWHT(files_wht)"
                        accept="image/*, .pdf, .xlsx, .xls, .csv"
                        :rules="fileRules"
                      >
                        <template v-slot:selection="{ index,text }">
                          <v-chip small label color="primary" v-if="index < 1">
                            {{ text }}
                          </v-chip>
                          <span
                            v-else-if="index === 1"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files_wht.length - 1 }} File(s)
                          </span>
                        </template>
                      </v-file-input>

                       <!-- <v-file-input
                        :disabled="select_type_wht === '0'"
                        label="แนบไฟล์"
                        outlined
                        multiple
                        dense
                        v-model="files_wht"
                         @change="uploadfiles(files_wht,'wht')"
                        accept="image/*, .pdf, .xlsx, .xls, .csv"
                        :rules="fileRules"
                      >
                        <template v-slot:selection="{ index,text }">
                          <v-chip small label color="primary" v-if="index < 1">
                            {{ text }}
                          </v-chip>
                          <span
                            v-else-if="index === 1"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files_wht.length - 1 }} File(s)
                          </span>
                        </template>
                      </v-file-input> -->
                    </v-form>
              </div>
            </v-col>
          </v-row>

          <v-form
            ref="form"
            lazy-validation
          >
            <div class="d-flex mt-n3" style="font-family: 'Bai_Jamjuree';">
              <v-text-field
                style="width: 50px"
                v-model="customer_search.customer_no"
                label="Customer No."
                @change="search_Cus(customer_search.customer_no)"
                :rules="rulesCus"
                required
                :disabled="editedIndex !== -1"
              ></v-text-field>
              <div style="width: 10px"></div>
              <v-text-field
                style="width: 400px"
                v-model="customer_search.customer_name"
                label="Customer Name"
                disabled
              ></v-text-field>
            </div>
          </v-form>
          <v-subheader
            style="
              font-size: 16px;
              background-color: rgb(105, 180, 245);
              justify-content: center;
              color: white;
              font-family: 'Bai_Jamjuree';
            "
            >Detail
          </v-subheader>
          <v-data-table hide-default-footer class="mb-6">
            <template v-slot:body="{}">
              <tbody>
                <tr
                  v-for="(header, index) in headers_detail_table"
                  :key="index"
                >
                  <td class="detail-header">
                    {{ header.text }}
                  </td>
                  <td>
                    <div v-if="header.value == 'payment_type'" class="pa-1">
                      <select
                        v-model="payment_type"
                        style="
                          border: 1px solid #e0e0e0;
                          border-radius: 1px;
                          width: 100%;
                          height: 40px;
                          padding-left: 10px;
                          cursor: pointer;
                        "
                        >
                        <option></option>
                        <option value="Transfer">Transfer</option>
                        <option value="CHQ">CHQ</option>
                      </select>
                    </div>
                    <div v-if="header.value == 'mail_date'" class="pa-1">
                      <input
                        class="form-control"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        v-model="email_date"
                        style="font-size:14px"
                      />
                    </div>
                    <div class="d-flex pa-1" v-if="header.value == 'confirm_date'">
                      <input
                        class="form-control"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        v-model="confirm_date"
                        style="font-size:14px"
                      />
                    </div>
                    <div
                      class="d-flex pa-1"
                      v-if="header.value == 'amount'"
                    >
                      <input
                        type="number"
                        style="text-align: left; font-size:14px"
                        class="form-control"
                        placeholder="กรอกยอดเงิน"
                        v-model="amount"
                      />
                    </div>
                  </td>
                </tr>        
              </tbody>
            </template>
          </v-data-table>
          <v-divider></v-divider>
          <!--
          <template>
            <v-form
              ref="formDetail"
              lazy-validation
              >
              <v-container class="grey lighten-5">
                <v-row 
                  no-gutters 
                  align="center" 
                  >
                  <v-col
                    cols="4"
                  >
                    <v-subheader>
                      ประเภทชำระ
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="8"
                  >
                      <v-select
                        class="form-control"
                        v-model="payment_type"
                        :items="itemsPayment"
                        :rules="[v => !!v || 'กรุณาเลือกประเภทชำระ']"
                        menu-props="auto"
                        placeholder="เลือกประเภทชำระ"
                        style="font-size:14px;"
                        required
                      ></v-select>
                  </v-col>
                  <v-col
                    cols="4"
                  >
                    <v-subheader>
                      วันที่ Mail
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="8"
                  >
                      <v-text-field
                        class="form-control"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        v-model="email_date"
                        style="font-size:14px"
                        :rules="rulesDate"
                        required
                      ></v-text-field>
                  </v-col>
                  <v-col
                    cols="4"
                  >
                    <v-subheader>
                      วันที่ชำระ
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="8"
                  >
                      <v-text-field
                        class="form-control"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        v-model="confirm_date"
                        style="font-size:14px"
                        :rules="rulesDate2"
                        required
                      ></v-text-field>
                  </v-col>
                  <v-col
                    cols="4"
                  >
                    <v-subheader>
                      ยอดชำระ
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="8"
                  >
                      <v-text-field
                        type="number"
                        style="text-align: left; font-size:14px"
                        class="form-control"
                        placeholder="กรอกยอดเงิน"
                        v-model="amount"
                        :rules="rulesAmount"
                        required
                      ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </template>
          <v-divider></v-divider>
          -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="close()">
              Cancle
            </v-btn>
            <v-btn
              color="primary"
              :disabled=" payment_type == '' || amount =='' || email_date == '' || confirm_date ==''"
              @click="saveAddMail()"
            >
              Save
            </v-btn> 
  
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import moment from 'moment';

export default {
  props: ["mail_dialog"],
  data: () => ({
    files: [],
    files_wht: [],
    select_type_wht: "",
    selected_list: [],
    editedIndex: -1,
    customer_search: {
      customer_no: "",
      customer_name: "",
    },
    headers_detail_table: [
      {
        text: "ประเภทชำระ",
        align: "center",
        sortable: false,
        value: "payment_type",
        width: "100px",
      },
      {
        text: "วันที่ Mail",
        align: "center",
        sortable: false,
        value: "mail_date",
        width: "100px",
      },
      {
        text: "วันที่ชำระ",
        align: "center",
        sortable: false,
        value: "confirm_date",
        width: "100px",
      },
      {
        text: "ยอดชำระ",
        align: "center",
        sortable: false,
        value: "amount",
        width: "100px",
      },
    ],
    itemsPayment: [
        'Transfer',
        'CHQ',
        'Suspense',
      ],
    email_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
    confirm_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
    sale_email: "",
    amount: "",
    payment_type: "", //ประเภทชำระ
    // mail_date: "",
    rulesCus: [
      (value) => !!value || "กรุณากรอก Cus No.",
      (value) => value !== "" || "Cus No. ไม่ถูกต้อง",
    ],
    fileRules: [
      (v) => !!v || "โปรดเลือกไฟล์",
      (v) => (v && v.length > 0) || "โปรดเลือกไฟล์",
    ],
    rulesDate: [
      (value) => !!value || "กรุณาเลือกวันที่",
    ],
    rulesDate2: [
      (value) => !!value || "กรุณาเลือกวันที่",
    ],
    rulesAmount: [
      (value) => !!value || "กรุณากรอกวันที่ชำระ",
    ],
    data_file: [],
    data_file_wht: [],
    status_file: "",
    status_file_wht: "",
    new_data_files : [],
    new_data_wht : []
  }),
  created() {

  },
  methods: {
    // convert file to base64
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    // file blob
    // toBlob(data,key){
    //   if(key == 'files'){
    //     for (let i = 0; i < data.length; i++) {
    //     var blob_file = new Blob([data[i].data_base64], { type: data[i].type })
    //     this.new_data_files.push({
    //       name: data[i].name,
    //       data_blob: blob_file
    //     })
    //   }
    //   console.log('file : ',this.new_data_files)
    //   }else{
    //     for (let i = 0; i < data.length; i++) {
    //     var blob_wht = new Blob([data[i].data_base64], { type: data[i].type })
    //     this.new_data_wht.push({
    //       name: data[i].name,
    //       data_blob: blob_wht
    //     })
    //   }
    //   console.log('wht : ',this.new_data_wht)
    //   }  
    // },

    async getbase64Files(file) {
      this.data_file = [];
      for (let i = 0; i < file.length; i++) {
        const new_files = file[i];
        this.data_file.push({
          name: new_files.name,
          type: new_files.type,
          data_base64: await this.toBase64(new_files),
        });
      }
    },
    async getbase64FilesWHT(file) {
      this.data_file_wht = [];
      for (let i = 0; i < file.length; i++) {
        const new_files_wht = file[i];
        this.data_file_wht.push({
          name: new_files_wht.name,
          type: new_files_wht.type, 
          data_base64: await this.toBase64(new_files_wht),
        });
      }
    },
    // end

    // uploadfiles(event,key){
    //   var arr_file = []
    //   var arr_wht = []
    //   if(event){
    //     if(key == 'file'){
    //       let formData = new FormData();
    //       event.forEach(element => {
    //        console.log(element)
    //         formData.append("filename",element.name);
    //         formData.append("type", element.type);
    //         formData.append("resultDocument", element);
    //         // console.log(formData.getAll('resultDocument')); 
    //         arr_file.push({
    //           formData
    //         })
    //       });
          
    //     }else{
    //       let formDataWHT = new FormData();
    //       event.forEach(element => {
    //         formDataWHT.append("filename", element.name);
    //         formDataWHT.append("type", element.type);
    //         formDataWHT.append("resultDocument", element);
    //         arr_wht.push({
    //           formDataWHT
    //         })
    //       });
    //       console.log(arr_wht)
    //     }
    //   }
    // },

     validateselect(type) {
      // if(this.checkall_wht || this.checkbox_wht){
      if (type != 1) {
        this.$refs.formfile.reset();
      } else {
        this.$refs.formfile.validate();
        // }
      }
    },
    async saveAddMail() {
      if (this.data_file.length > 0) {
        this.status_file = true;
      } else {
        this.status_file = false;
      }
      if (this.data_file_wht.length > 0) {
        this.status_file_wht = true;
      } else {
        this.status_file_wht = false;
      }

      if (this.customer_search.customer_no == ""){
        this.$refs.form.validate();
      }else if(this.select_type_wht == 1 && this.data_file_wht.length <= 0){
        this.$refs.formfile.validate();
      }else{
      let headers = {
        headers: {
           Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
      },
      };
      var data = {
        file: this.data_file,
        file_wht: this.data_file_wht,
        type_wht: this.select_type_wht,
        status_file: this.status_file, //ค่า true false เวลามีการเลือกไฟล์หลักฐาน
        status_file_wht: this.status_file_wht, //ค่า true false เวลามีการเลือกไฟล์ wht
        customer_no: this.customer_search.customer_no,    
        customer_name: this.customer_search.customer_name,
        customer_email: this.customer_search.email,
        sale_email: this.sale_email,
        finance_name: this.customer_search.financial_name,
        sum_amounts: Number(this.amount),//ยอดชำระ
        confirm_date: new Date(this.confirm_date).toJSON(),
        email_date: new Date(this.email_date).toJSON(),
        type: this.payment_type//ประเภทชำระ
      }
      console.log(data)
      await this.axios
        .post(process.env.VUE_APP_API + "/statement/addpendingmaill", data, headers)
        .then((response) => {
          if(response.status == 200){
            Swal.fire({
              icon: "success",
              title: "เพิ่มข้อมูล Mail เรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 1500,
            });
          } 
        })
        .catch((error) => {
          if(error){
            Swal.fire({
                icon: "error",
                title: "ไม่สามารถบันทึกข้อมูลได้",
                showConfirmButton: false,
                timer: 1500,
            });
          }
        });
      this.$emit("close_mail_dialog");
      this.$emit("save_mail_dialog");
      this.customer_search.customer_no = "";
      this.customer_search.customer_name = "";
      this.data_file_wht = [];
      this.data_file = [];
      this.files = [];
      this.files_wht = [];
      this.amount = "";
      this.confirm_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.email_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.sale_email = "";
      this.payment_type = "";
      this.$refs.formfile.reset();
      this.$refs.form.reset();
      this.select_type_wht = ""

      }
    },
    close() {
      this.customer_search.customer_no = "";
      this.customer_search.customer_name = "";
      this.data_file_wht = [];
      this.data_file = [];
       this.files = [];
      this.files_wht = [];
      this.payment_type = "";
      this.amount = "";
      this.confirm_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.sale_email = "";
      this.email_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.$refs.formfile.reset();
      this.$refs.form.reset();
      (this.select_type_wht = ""), 
      this.$emit("close_mail_dialog");
    },
    search_Cus(customer) {
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
        .get(process.env.VUE_APP_API + "/customer/" + String(customer), headers)
        .then((response) => {
          if (response.data.data !== null) {
            this.customer_search = response.data.data;
            this.axios
            .get(
              process.env.VUE_APP_API + "/customer/filterinvoices/CusNo="+customer,
              headers
            ).then((response) => {
              this.sale_email = response.data.data[0].sale_email
            })
          }
        })
        .catch((error) => {
          if (error) {
            this.rules = [
                (value) => value.customer_no == "" || "Cus No. ไม่ถูกต้อง",
              ];
            this.customer_search.customer_name = null;
          }
        });
    },
  },
};
</script>

<style scoped>
.v-dialog--scrollable {
  display: inline-table !important;
}
.row.no-gutters {
  width: 100%;
  margin-left: 0px;
}
td.detail-header {
  font-size: 16px;
  font-family: "Bai_Jamjuree";
}
form.v-form.form_file_wht {
  min-width: 24pc !important;
}
.form_select_wht {
  width: 200px !important;
}
</style>
