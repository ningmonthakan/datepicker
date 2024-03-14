<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="6" sm="6" md="3" lg="3" xl="3">
            <v-card color="primary" dark>
              <v-card-title>
                เอกสารทั้งหมด
                <v-spacer></v-spacer>
                <h1>{{amount_totle}}</h1>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3" lg="3" xl="3">
            <v-card color="success" dark>
              <v-card-title>
                สถานะ อนุมัติ
                <v-spacer></v-spacer>
                <h1>{{amount_apporve}}</h1>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3" lg="3" xl="3">
            <v-card color="warning" dark>
              <v-card-title>
                สถานะ รออนุมัติ
                <v-spacer></v-spacer>
                <h1>{{amount_waiting}}</h1>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3" lg="3" xl=3>
            <v-card color="error" dark>
              <v-card-title>
                สถานะ ไม่อนุมัติ
                <v-spacer></v-spacer>
                <h1>{{amount_reject}}</h1>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            MEDICAL
            <v-spacer></v-spacer>
              <v-row justify="end">
                <v-col cols="3">
                  <v-autocomplete
                    v-model="medical_type"
                    label="ประเภทผู้ป่วย"
                    :items="items_medical_type"
                    item-text='text'
                    item-value='value'
                  ></v-autocomplete>
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="status_approve"
                    label="สถานะการตรวจสอบ/ยืนยันหลักฐาน"
                    :items="items_status_approve"
                    item-text='text'
                    item-value='value'
                  ></v-autocomplete>
                </v-col>
            </v-row>
            <v-btn @click="getdata()" color="primary" class="ml-3">
              ค้นหา
              <v-icon
                right
                dark
              >
                mdi-magnify
              </v-icon>
            </v-btn>
            <v-btn @click="open_export_dialog()" color="success" class="ml-3">
              EXPORT
              <v-icon
                right
                dark
              >
                mdi-file-document
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              dense
              :calculate-widths = "true"
              mobile-breakpoint=0
              :headers="headers"
              :items="data"
              :items-per-page="itemsPerPage"
              hide-default-footer
              :loading='loading'
              loading-text="กำลังดึงข้อมูล"
            >

              <template
                v-if="data.length != 0"
                v-slot:body="{ items }"
              >
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="item.medical_no"
                  >
                    <td class="text-left">{{ item.cost_center }}</td>
                    <td class="text-left">{{ item.medical_no }}</td>
                    <td class="text-left">{{ item.medical_type }}</td>
                    <td class="text-center">{{ item.employee_id}}</td>
                    <td class="text-left">{{ item.title }}{{ item.first_name }} {{ item.last_name }}</td>
                    <td class="text-left">{{ item.description_document}} วันที่ {{ changformat(item.schedule_date) }}</td>
                    <td class="text-right">{{ item.reveal_amount | numeral('0,0.00') }}</td>
                    <td class="text-right">{{ item.amount | numeral('0,0.00') }}</td>
                    <td class="text-center"> 
                      <v-btn
                        v-if="item.status === 'approve'"
                        color="success"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                       
                      >
                        อนุมัติ
                      </v-btn>
                      <v-btn
                        v-else-if="item.status === 'waiting'"
                        color="warning"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                        
                      >
                        รออนุมัติ
                      </v-btn>
                      <v-btn
                        v-else-if="item.status === 'reject'"
                        color="error"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                     
                      >
                        ไม่อนุมัติ
                      </v-btn>
                    </td>
                    <td class="text-center"> 
                      <v-btn
                        v-if="item.status_verify === 'approve'"
                        color="success"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                       
                      >
                        ผ่าน
                      </v-btn>
                      <v-btn
                        v-else-if="item.status_verify === 'waiting'"
                        color="warning"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                        
                      >
                        รอตรวจสอบ
                      </v-btn>
                      <v-btn
                        v-else-if="item.status_verify === 'reject'"
                        color="error"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                     
                      >
                        ไม่ผ่าน
                      </v-btn>
                      <v-btn
                        v-else-if="item.status_verify === 'fix'"
                        color="warning"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                     
                      >
                        รอการแก้ไข
                      </v-btn>
                    </td>
                    <td class="text-center"> 
                      <v-btn
                        v-if="item.status_attached === 'approve'"
                        color="success"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                       
                      >
                        ผ่าน
                      </v-btn>
                      <v-btn
                        v-else-if="item.status_attached === 'waiting'"
                        color="warning"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                        
                      >
                        รอตรวจสอบ
                      </v-btn>
                      <v-btn
                        v-else-if="item.status_attached === 'reject'"
                        color="error"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                     
                      >
                        ไม่ผ่าน
                      </v-btn>
                    </td>
                    <td class="text-right">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="open_imgage_dialog(item.certificate_url_attach, 'รูปใบรับรองแพทย์')"
                              >
                                <v-icon>mdi-text-box-plus-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>รูปใบรับรองแพทย์</span>
                          </v-tooltip>

                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="open_imgage_dialog(item.rececipt_url_attach, 'รูปใบเสร็จ')"
                              >
                                <v-icon>mdi-receipt</v-icon>
                              </v-btn>
                            </template>
                            <span>รูปใบเสร็จ</span>
                          </v-tooltip>
                         
                         <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                :disabled = "item.status_verify === 'approve' || item.status_verify === 'reject' || item.status_verify === 'fix'"
                                v-bind="attrs"
                                v-on="on"
                                @click="open_dialog_edit(item)"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                            </template>
                            <span>แก้ไข</span>
                          </v-tooltip>

                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="open_dialog(item)"
                              >
                                <v-icon>mdi-file-search-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>รายละเอียดเพิ่มเติม</span>
                          </v-tooltip>
                          
                        
                    </td>
                    <td class="text-center">
                      <v-btn
                        v-if="item.status_verify !== 'approve' && item.status_verify !== 'reject'"
                        :disabled = "item.status !== 'approve' || item.status_verify == 'fix'"
                        small
                        @click="showAlert('ตรวจสอบการเบิก',item.medical_uid)"
                        class="ma-2"
                        color="primary"
                      > 
                        ตรวจสอบการเบิก
                      </v-btn>
                      <v-btn
                        v-if="item.status_verify === 'approve' || item.status_verify === 'reject'"
                        :color="item.status_verify === 'approve' ? 'success' : 'error'"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                       
                      >
                        {{item.status_verify === 'approve' ? 'ตรวจสอบเรียบร้อย' : 'ไม่อนุมัติตรวจสอบ'}}
                      </v-btn>
                      
                      <v-btn
                        v-if="item.status_attached !== 'approve' && item.status_attached !== 'reject'"
                        :disabled = "item.status_verify !== 'approve'"
                        small
                        @click="showAlert('ยืนยันหลักฐาน',item.medical_uid)"
                        class="ma-2"
                        color="primary"
                      >
                        ยืนยันหลักฐาน
                      </v-btn>
                      <v-btn
                        v-if="item.status_attached === 'approve' || item.status_attached === 'reject'"
                        :color="item.status_attached === 'approve' ? 'success' : 'error'"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                       
                      >
                        {{item.status_attached === 'approve' ? 'ยืนยันเรียบร้อย' : 'ไม่อนุมัติยืนยัน'}}
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
              <template
                v-slot:no-data
              >
                ไม่พบข้อมูล
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                @input="getdata()"
              ></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog width="500" v-model="dialog_edit">
      <v-card>
        <v-card-title class="headline">แก้ไข</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                label="จำนวนเงินที่เบิกได้เดิม"
                disabled
                v-model="edit_item.reveal_amount"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="จำนวนเงินที่แก้ไข"
                v-model="edit_item.new_reveal_amount"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="รายละเอียด"
                v-model="edit_item.fix_desp "
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="put_edit()"
          >
            ยืนยัน
          </v-btn>
          <v-btn
            color="error"
            text
            @click="dialog_edit = !dialog_edit"
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <detail-dialog :dialog='dialog' :item='item' @close_dialog='close_dialog'/>
    <image-dialog :image_dialog='image_dialog' :image_url='image_url' @close_image_dialog='close_image_dialog'/>
    <export-dialog :export_dialog='export_dialog' @close_export_dialog='close_export_dialog'/>
  </v-container>
</template>
<script>
import DetailDialog from '../components/MedicDetailDialog.vue'
import ImageDetailDialog from '../components/MedicImageDialog.vue'
import ExportDialog from '../components/ExportDialog.vue'

  export default {
    components: {
      'detail-dialog': DetailDialog,
      'image-dialog': ImageDetailDialog,
      'export-dialog': ExportDialog
    },
    data: () => ({
      dialog_edit: false,
      edit_item: {
        uid: '',
        reveal_amount: '',
        new_reveal_amount: '',
        fix_desp: ''
      },
      loading: false,
      search: '',
      amount_totle: 0,
      amount_apporve: 0,
      amount_waiting: 0,
      amount_reject: 0,
      dialog: false,
      image_dialog: false,
      download_dialog: false,
      export_dialog: false,
      image_url: '',
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      item: {},
      item_download:[],
      headers: [
        {
          text: 'หมวดตัดงบ',
          align: 'start',
          sortable: false,
          width:100
        },
        {
          text: 'เลขเอกสาร',
          align: 'start',
          sortable: false,
          width:150
        },
        {
          text: 'ประเภทผู้ป่วย',
          align: 'start',
          sortable: false,
          width:150
        },
        { text: 'รหัสพนักงาน',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'ชื่อ-นามสกุล', 
          align: 'start',
          sortable: false,
          width:200
        },
        { text: 'รายละเอียด',
          align: 'start',
          sortable: false,
          width:400
        },
        { text: 'วงเงินที่เบิกได้',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'จำนวนเงินที่เบิก',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'สถานะเอกสาร',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'สถานะการตรวจสอบ',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'สถานะยืนยันหลักฐาน',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'รายละเอียดเพิ่มเติม/ไฟล์แนบ/แก้ไข',
          align: 'center',
          sortable: false, 
          width:240
        },
        { text: 'ตรวจสอบการเบิก/ยื่นยันหลักฐาน',
          align: 'center',
          sortable: false, 
          width:400
        }
      ],
      data: [],
      acces_token: '',
      account_id: '',
      secret: '',
      role: [],
      medical_type: 'all',
      status_approve: 'all',
      items_medical_type: [
        {
          value: 'all',
          text: 'ทั้งหมด'
        },
        {
          value: 'ผู้ป่วยใน',
          text: 'ผู้ป่วยใน'
        },
        {
          value: 'ผู้ป่วยนอก',
          text: 'ผู้ป่วยนอก'
        },
        {
          value: 'ค่าทันตกรรม',
          text: 'ค่าทันตกรรม'
        },
        {
          value: 'ค่าวัคซีน',
          text: 'ค่าวัคซีน'
        },
      ],
      items_status_approve: [
        {
          value: 'all',
          text: 'ทั้งหมด'
        },
        {
          value: 'รอตรวจสอบการเบิก',
          text: 'รอตรวจสอบการเบิก'
        },
        {
          value: 'รอยืนยันหลักฐาน',
          text: 'รอยืนยันหลักฐาน'
        },
        {
          value: 'รอการแก้ไข',
          text: 'รอการแก้ไข'
        },
        {
          value: 'เอกสารสมบูรณ์',
          text: 'เอกสารสมบูรณ์'
        }
      ],
    }),
    created() {
      this.acces_token = localStorage.getItem('acces_token')
      this.account_id = localStorage.getItem('account_id')
      this.secret = localStorage.getItem('secret')
      this.role = JSON.parse(localStorage.getItem('role'))
      if (this.role.includes('ALL')||this.role.includes('MEDICAL')) {
        this.getdata ()
        this.getdata_amount ()
      }else {
        this.$router.push('/login')
      }
    },
    methods:{
      getdata_amount () {
        let headers = {
          headers: {
            Authorization: "Bearer " + this.acces_token + "," + this.secret
          }
        }
        this.axios.get(process.env.VUE_APP_API_2 + '/dashboard/medical/count/' + this.account_id, headers).then((response) => {
          let data = response.data.data
          this.amount_totle = data.total
          this.amount_apporve = data.apporve
          this.amount_waiting = data.waiting
          this.amount_reject = data.reject
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.clear() 
            this.$router.push('/login').catch(()=>{})
          }
        })
      },
      getdata () {
        this.data = []
        this.loading = true
        let headers = {
          headers: {
            Authorization: "Bearer " + this.acces_token + "," + this.secret
          }
        }
        this.axios.get(process.env.VUE_APP_API_2 + '/dashboard/medical/' + this.account_id  + '?medical_type=' + this.medical_type + '&status_approve=' + this.status_approve + '&page=' + this.page , headers).then((response) => {
          this.loading = false
          let data = response.data
          this.pageCount = data.count_page
          if(data.data){
            this.data = data.data
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.clear() 
            this.$router.push('/login').catch(()=>{})
          }
        })
      },
      changformat (date) {
        let item_date = new Date(date)
        let day = ( '0' + item_date.getDate()).slice(-2)
        let month = ( '0' + (item_date.getMonth() + 1)).slice(-2)
        let year = item_date.getFullYear()
        return day + '/' + month + '/' + year
      },
      open_dialog (data) {
        this.item = data
        this.dialog = true
      },
      open_imgage_dialog (item, type) {
        this.image_url = { 
          type: type,
          url: item
        }
        this.image_dialog = true
      },
      open_download_dialog (data) {
        this.item_download = data
        this.download_dialog = true
      },
      open_export_dialog () {
        this.export_dialog = true
      },
      close_dialog () {
        this.dialog = false
      },
      close_image_dialog () {
        this.image_dialog = false
      },
      close_export_dialog () {
        this.export_dialog = false
      },
      showAlert (title, uid) {
         this.$swal.fire({
            title: title,
            icon: 'info',
            showDenyButton: true,
            focusConfirm: false,
            confirmButtonText: 'อนุมัติ',
            denyButtonText: 'ไม่อนุมัติ',
            cancelButtonText: 'แก้ไข'
         }).then((result) => {
          if (result.isConfirmed) {
            if (title === 'ตรวจสอบการเบิก') {
              this.put_verify('approve', '', uid)
            }
            else {
              this.$swal.fire({
                title: "อนุมัติ",
                icon: 'info',
                text: 'หมายเหตุ',
                input: 'text',
                confirmButtonText: 'ยืนยัน',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.put_attached('approve', result.value, uid)
                }
              })
            }
          }
          else if (result.isDenied) {
            this.$swal.fire({
              title: "ไม่อนุมัติ",
              icon: 'info',
              text: 'หมายเหตุ',
              input: 'text',
              confirmButtonText: 'ยืนยัน',
            }).then((result) => {
              if (result.isConfirmed) {
                if (title === 'ตรวจสอบการเบิก') {
                  this.put_verify('reject', result.value, uid)
                }
                else {
                  this.put_attached('reject', result.value, uid)
                }
              }
            })
          }
        })    
      },
      put_verify (status,remark,uid) {
        this.$swal.fire({
          title: 'กำลังโหลด',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            this.$swal.showLoading()
          }
        })
        let data = {
          status: status,
          remark: remark,
          account_id: this.account_id
        }
        let headers = {
          headers: {
            Authorization: "Bearer " + this.acces_token + "," + this.secret
          }
        }
        this.axios.put(process.env.VUE_APP_API_2 + '/dashboard/medical/verify/' + uid, data, headers).then((response) => {
          console.log(response.data)
          this.$swal.fire({
              title: "สำเร็จ",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
          })
          this.getdata ()
          this.getdata_amount ()
        }).catch(error => {
          this.$swal.fire({
              title: "ไม่สำเร็จ",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
          })
          if (error.response.status === 401) {
            localStorage.clear() 
            this.$router.push('/login')
          }
        })
      },
      put_attached (status,remark,uid) {
        this.$swal.fire({
          title: 'กำลังโหลด',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            this.$swal.showLoading()
          }
        })
        let data = {
            status: status,
            remark: remark,
            account_id: this.account_id
        }
        let headers = {
          headers: {
            Authorization: "Bearer " + this.acces_token + "," + this.secret
          }
        }
        this.axios.put(process.env.VUE_APP_API_2 + '/dashboard/medical/attach/' + uid, data, headers).then((response) => {
          console.log(response.data)
          this.$swal.fire({
              title: "สำเร็จ",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
          })
          this.getdata ()
          this.getdata_amount ()
        }).catch(error => {
          this.$swal.fire({
              title: "ไม่สำเร็จ",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
          })
          if (error.response.status === 401) {
            localStorage.clear() 
            this.$router.push('/login')
          }
        })
      },
      open_dialog_edit (item) {
        this.edit_item = {
          uid: item.medical_uid,
          reveal_amount: item.amount,
          new_reveal_amount: item.amount,
          fix_desp: ''
        }
        this.dialog_edit = true
      },
      put_edit () {
        let data = {
          account_id: this.account_id,
          new_reveal_amount: this.edit_item.new_reveal_amount.toString(),
          fix_desp: this.edit_item.fix_desp
        }
        let headers = {
          headers: {
            Authorization: "Bearer " + this.acces_token + "," + this.secret
          }
        }
        this.axios.put(process.env.VUE_APP_API_2 + '/dashboard/medical/verify/check/' + this.edit_item.uid, data, headers).then((response) => {
          console.log(response.data)
          this.$swal.fire({
              title: "สำเร็จ",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
          })
          this.dialog_edit = false
          this.getdata ()
          this.getdata_amount ()
        }).catch(error => {
          this.dialog_edit = false
          this.$swal.fire({
              title: "ไม่สำเร็จ",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
          })
          if (error.response.status === 401) {
            localStorage.clear() 
            this.$router.push('/login')
          }
        })
      }
      
    } 
  }
</script>

<style>
.disable-events {
  pointer-events: none
}
</style>