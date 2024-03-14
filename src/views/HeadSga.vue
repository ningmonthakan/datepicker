<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="6" sm="6" md="3" lg="3" xl="3">
            <v-card color="primary" dark @click="chang_status('')">
              <v-card-title>
                เอกสารทั้งหมด
                <v-spacer></v-spacer>
                <h1>{{amount_totle}}</h1>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3" lg="3" xl="3">
            <v-card color="success" dark @click="chang_status('approve')">
              <v-card-title>
                สถานะ อนุมัติ
                <v-spacer></v-spacer>
                <h1>{{amount_apporve}}</h1>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3" lg="3" xl="3">
            <v-card color="warning" dark @click="chang_status('waiting')">
              <v-card-title>
                สถานะ รออนุมัติ
                <v-spacer></v-spacer>
                <h1>{{amount_waiting}}</h1>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6" md="3" lg="3" xl=3>
            <v-card color="error" dark @click="chang_status('reject')">
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
          <v-form @submit.prevent="getdata()">
          <v-card-title>
            HEAD SG&A
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              label="ค้นหา"
              single-line
              hide-details
            ></v-text-field>
            <v-btn type="submit" color="primary">
              ค้นหา
              <v-icon
                right
                dark
              >
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-card-title>
          </v-form>
          <v-card-text>
            <v-data-table
              dense
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
                    :key="item.doc_no"
                  >
                    <td class="text-left">{{ item.cost_center }}</td>
                    <td class="text-left">{{ item.doc_no }}</td>
                    <td class="text-center">{{ item.employee_id}}</td>
                    <td class="text-left">{{ item.title }}{{ item.first_name }} {{ item.last_name }}</td>
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
                        v-if="item.status_cost === 'approve'"
                        color="success"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                       
                      >
                        อนุมัติ
                      </v-btn>
                      <v-btn
                        v-else-if="item.status_cost === 'waiting'"
                        color="warning"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                        
                      >
                        รออนุมัติ
                      </v-btn>
                      <v-btn
                        v-else-if="item.status_cost === 'reject'"
                        color="error"
                        outlined
                        small
                        min-width='100'
                        class="disable-events ma-2"
                     
                      >
                        ไม่อนุมัติ
                      </v-btn>
                    </td>
                    <td class="text-right">
                      
                          <v-tooltip top v-if="item.document_ocr === true">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="open_imgage_dialog(item.document_uid)"
                              >
                                <v-icon>mdi-image</v-icon>
                              </v-btn>
                            </template>
                            <span>รูปแนบ</span>
                          </v-tooltip>

                          <v-tooltip top v-if="item.attached_file.length > 0 ">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="open_download_dialog(item.attached_file)"
                              >
                                <v-icon>mdi-cloud-download</v-icon>
                              </v-btn>
                            </template>
                            <span>ดาวน์โหลด</span>
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
                        :disabled = "!item.check_approvement"
                        small
                        @click="showAlert('ตรวจสอบการเบิก',item.document_uid)"
                        class="ma-2"
                        color="primary"
                      > 
                        ตรวจสอบการเบิก
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
    <detail-dialog :dialog='dialog' :item='item' @close_dialog='close_dialog'/>
    <image-dialog :image_dialog='image_dialog' :image_url='image_url' @close_image_dialog='close_image_dialog'/>
    <download-dialog :download_dialog='download_dialog' :item_download='item_download' @close_download_dialog='close_download_dialog'/>
  </v-container>
</template>
<script>
import DetailDialog from '../components/DetailDialog.vue'
import ImageDetailDialog from '../components/ImageDialog.vue'
import DownloadDialog from '../components/DownloadDialog.vue'

  export default {
    components: {
      'detail-dialog': DetailDialog,
      'image-dialog': ImageDetailDialog,
      'download-dialog': DownloadDialog
    },
    data: () => ({
      loading: false,
      search: '',
      status: '',
      amount_totle: 0,
      amount_apporve: 0,
      amount_waiting: 0,
      amount_reject: 0,
      dialog: false,
      image_dialog: false,
      download_dialog: false,
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
        { text: 'จำนวนเงิน',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'สถานะเอกสาร',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'สถานะตัดงบ',
          align: 'center',
          sortable: false,
          width:150
        },
        { text: 'รายละเอียดเพิ่มเติม/ไฟล์แนบ',
          align: 'center',
          sortable: false,
          width:200
        },
        { text: 'ตรวจสอบการเบิก',
          align: 'center',
          sortable: false,
          width:150
        }
      ],
      data: [],
      acces_token: '',
      account_id: '',
      secret: '',
      role: []
    }),
    created() {
      this.acces_token = localStorage.getItem('acces_token')
      this.account_id = localStorage.getItem('account_id')
      this.secret = localStorage.getItem('secret')
      this.role = JSON.parse(localStorage.getItem('role'))
      if (this.role.includes('ALL') ||this.role.includes('HEAD_SG&A')) {
        this.getdata ()
        this.getdata_amount ()
      }else {
        this.$router.push('/login')
      }
    },
    methods:{
      chang_status (status) {
        this.page = 1
        this.search = ''
        this.status = status
        this.getdata()
      },
      getdata_amount () {
        let headers = {
          headers: {
            Authorization: "Bearer " + this.acces_token + "," + this.secret
          }
        }
        this.axios.get(process.env.VUE_APP_API + '/dashboard/document/amount/sga', headers).then((response) => {
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
        this.axios.get(process.env.VUE_APP_API + '/dashboard/document/head/sga?page=' + this.page + '&status=' + this.status + '&search=' + this.search, headers).then((response) => {
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
      open_imgage_dialog (image_url) {
        this.image_url = image_url
        this.image_dialog = true
      },
      open_download_dialog (data) {
        this.item_download = data
        this.download_dialog = true
      },
      close_dialog () {
        this.dialog = false
      },
      close_image_dialog () {
        this.image_dialog = false
      },
      close_download_dialog () {
        this.download_dialog = false
      },
      showAlert (title, uid) {
         this.$swal.fire({
            title: title,
            icon: 'info',
            showDenyButton: true,
            focusConfirm: false,
            confirmButtonText: 'อนุมัติ',
            denyButtonText: 'ไม่อนุมัติ',
         }).then((result) => {
          if (result.isConfirmed) {
            this.put_status('approve', '', uid)
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
                this.put_status('reject', result.value, uid)
              }
            })
          }
        })    
      },
      put_status (status,remark,uid) {
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
        this.axios.put(process.env.VUE_APP_API + '/dashboard/document/head/status/' + uid, data, headers).then((response) => {
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
      }
    } 
  }
</script>

<style>
.disable-events {
  pointer-events: none
}
</style>