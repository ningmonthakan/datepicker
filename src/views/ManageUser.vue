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
            <label class="header-text">Manage User</label>
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

            <v-col cols="6">
              <v-card style="padding: 1px">
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
                        background-color: #3bb8c6;
                      "
                      >mdi-account</v-icon
                    >
                    <label style="font-size: 1.2vw; text-align: right"
                      >Count User</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div
                    style="font-size: 1.2vw; text-align: right; font-weight: 700"
                  >
                    {{ count_user }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>

            <!-- <v-col cols="6">
              <v-card dark color="teal" style="padding: 10px">
                <v-card-title style="display: block">
                  Total User :
                
                  <label style="font-size: 1.5vw">{{ total_user }}</label>
                </v-card-title>
              </v-card>
            </v-col> -->

            <v-col cols="6">
              <v-card style="padding: 1px">
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
                        background-color: #3bb8c6;
                      "
                      >mdi-account-supervisor</v-icon
                    >
                    <label style="font-size: 1.2vw; text-align: right"
                      >Total User</label
                    >
                  </div>
                  <v-spacer></v-spacer>
                  <div
                    style="font-size: 1.2vw; text-align: right; font-weight: 700"
                  >
                    {{ total_user }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
          </template>

          <v-col cols="12">
            <div class="cover-table">
              <div class="table-invoice">
                <v-data-table
                  :headers="headers"
                  :items="datatable"
                  class="table_in"
                  :items-per-page="50"
                  fixed-header
                  height="560px"
                  id="manage-user"
                  hide-default-footer
                >
                  <!-- :items-per-page="20" -->
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>
                        <div class="d-flex">
                          <!-- <v-text-field
                            style="width: 500px"
                            label="search"
                          ></v-text-field> -->

                          <v-form
                            @submit.prevent="searchWord()"
                            style="display: flex; align-items: center"
                            class="search-area"
                          >
                            <v-text-field
                              style="width: 400px"
                              v-model="search"
                              append-icon="mdi-magnify"
                              label="Search"
                              single-line
                              hide-details
                            ></v-text-field>

                            <div style="width: 10px"></div>
                            <v-btn
                              style="padding: 2px; width: 100px"
                              class="btn primary"
                              color="primary"
                              dark
                              type="submit"
                              >search</v-btn
                            >
                          </v-form>
                        </div>
                      </v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>

                      <v-spacer></v-spacer>
                      <!-- ---------------------------------------Add User------------------------------------ -->

                      <v-dialog
                        scrollable
                        v-model="dialog"
                        max-width="800px"
                        max-height="500px"
                        style="z-index: 1002 !important"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="editedIndex = -1"
                            v-if="role_status == 'super_admin'"
                          >
                            Add New User
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title style="background-color: #035891">
                            <span
                              class="text-h5"
                              style="
                                color: white;
                                font-family: 'Bai_Jamjuree' !important;
                              "
                              >{{ formTitle }}</span
                            >
                          </v-card-title>

                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="4">
                                  <v-text-field
                                    v-model="editedItem.employee_id"
                                    label="รหัสพนักงาน"
                                    @change="searchAddID(editedItem.employee_id)"
                                    :rules="rules"
                                    required
                                    :disabled="editedIndex !== -1"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="4"
                                  ><v-select
                                    item-text="name"
                                    item-value="value"
                                    v-model="editedItem.role"
                                    type="text"
                                    @change="selectRole()"
                                    label="select role"
                                    :items="role_select"
                                    style="border: none"
                                    :rules="rules_select.select"
                                    class="mt-1"
                                    :disabled="checkAR !== 1"
                                  >
                                  </v-select>
                                </v-col>
                                <v-col
                                  cols="4"
                                  v-if="editedItem.role != 'wait_down_service'"
                                >
                                </v-col>
                                <v-col
                                  cols="4"
                                  v-if="editedItem.role == 'wait_down_service'"
                                >
                                  <v-select
                                    item-text="name"
                                    item-value="value"
                                    v-model="editedItem.sub_role"
                                    type="text"
                                    @change="select_SubRole()"
                                    label="select status"
                                    :items="sub_role_select"
                                    style="border: none"
                                  >
                                  </v-select>
                                </v-col>
                                <v-col cols="2">
                                  <v-text-field
                                    v-model="editedItem.title_th"
                                    label="คำนำหน้า"
                                    disabled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="5">
                                  <v-text-field
                                    v-model="editedItem.first_name_th"
                                    label="ชื่อ"
                                    disabled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="5">
                                  <v-text-field
                                    v-model="editedItem.last_name_th"
                                    label="นามสกุล"
                                    disabled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                  <v-text-field
                                    v-model="editedItem.nick_name_th"
                                    label="ชื่อเล่น"
                                    disabled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="editedItem.company_name"
                                    label="บริษัท"
                                    disabled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.department_name"
                                    label="ส่วนงาน"
                                    disabled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.email"
                                    label="email"
                                    disabled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="5">
                                  <v-text-field
                                    v-model="editedItem.one_email"
                                    label="One email"
                                    required
                                    disabled
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                  <v-text-field
                                    v-model="editedItem.telephone"
                                    label="เบอร์โทร"
                                    disabled
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <label style="font-size: 16px"
                                >ข้อมูลลูกค้า (Customer Information)</label
                              >
                              <div
                                style="
                                  width: 100%;
                                  border: 1px solid gray;
                                  border-radius: 7px;
                                  padding: 10px;
                                "
                              >
                                <div
                                  class="d-flex"
                                  style="
                                    justify-content: center;
                                    align-items: baseline;
                                  "
                                >
                                  <v-col cols="4">
                                    <v-text-field
                                      :disabled="disable_add == true"
                                      v-model="customer_search.customer_no"
                                      label="Cus No"
                                      :rules="rules"
                                      required
                                      @change="
                                        search_Cus(customer_search.customer_no)
                                      "
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="7">
                                    <b-input
                                      rows="1"
                                      max-rows="5"
                                      class="form-control"
                                      style="
                                        border: 1px solid #efefef;
                                        overflow: hidden;
                                      "
                                      v-model="customer_search.customer_name"
                                      placeholder="Cus Name"
                                      disabled
                                    />
                                    <label style="color: red">
                                      {{ text_alert }}</label
                                    >
                                  </v-col>

                                  <v-btn
                                    :disabled="disable_add == true"
                                    depressed
                                    color="primary"
                                    @click="add_customer(customer_search)"
                                    >เพิ่ม</v-btn
                                  >
                                </div>
                                <v-data-table
                                  :headers="headers_cus"
                                  :items="customer_list"
                                  class="table_in"
                                  fixed-header
                                  :items-per-page="5"
                                  height="300px"
                                  id="modal-customer"
                                >
                                  <template v-slot:[`item.action`]="{ item }">
                                    <v-icon medium @click="delete_customer(item)"
                                      >mdi-minus</v-icon
                                    >
                                  </template>
                                </v-data-table>
                              </div>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="blue darken-1" text @click="close">
                              Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <!-- ---------------------------------------End Add User------------------------------------ -->
                      <!-- ------------------------------Delete-------------------------------------- -->
                      <v-dialog v-model="dialogDelete" max-width="500px" style="z-index: 1002 !important">
                        <v-card>
                          <v-card-title
                            class="text-h5"
                            style="
                              justify-content: center;
                              font-family: 'Bai_Jamjuree' !important;
                              color: #012591;
                            "
                            >คุณต้องการที่จะลบผู้ใช้รายชื่อนี้ใช่หรือไม่?</v-card-title
                          >
                          <div style="width: 100%; height: 20px"></div>
                          <div
                            style="
                              width: 100%;
                              display: block;
                              margin: auto;
                              font-family: 'Bai_Jamjuree' !important;
                            "
                          >
                            <div style="text-align: center">
                              <B>รหัสพนักงาน: </B
                              >{{ delete_Employee.employee_id }}
                            </div>
                            <div style="width: 100%; height: 20px"></div>
                            <div
                              class="d-flex"
                              style="
                                text-align: center;
                                justify-content: center;
                                font-family: 'Bai_Jamjuree' !important;
                              "
                            >
                              <B>ชื่อ: </B>
                              <div style="width: 2px"></div>
                              {{ delete_Employee.title_th
                              }}{{ delete_Employee.first_name_th }}
                              <div style="width: 5px"></div>
                              {{ delete_Employee.last_name_th }}
                            </div>
                            <div style="width: 100%; height: 20px"></div>
                            <div style="text-align: center">
                              <B>สถานะสิทธิ์: </B>
                              <!-- {{ delete_Employee.role }} -->
                              <label
                                class="color_user"
                                v-if="delete_Employee.role == 'super_admin'"
                                >Super Admin</label
                              >
                              <label
                                class="color_user"
                                v-if="delete_Employee.role == 'admin'"
                                >Admin</label
                              >
                              <!-- <label
                                class="color_user"
                                v-if="delete_Employee.role == 'user'"
                                >User</label
                              > -->
                              <label
                                class="color_user"
                                v-if="delete_Employee.role == 'viewer'"
                                >Viewer</label
                              >
                              <label
                                class="color_user"
                                v-if="delete_Employee.role == 'wait_down_service'"
                                >เร่งรัดหนี้สิน</label
                              >
                              <label
                                class="color_user"
                                v-if="delete_Employee.role == 'down_service'"
                                >ปิดระบบ</label
                              >
                              <!-- <label
                                class="color_user"
                                v-if="delete_Employee.role == 'up_service'"
                                >เปิดระบบ</label
                              > -->
                              <label
                                class="color_user"
                                v-if="delete_Employee.role == 'wait_down_service'"
                              >
                                &nbsp;({{
                                  select_Show_subrole(delete_Employee.sub_role)
                                }})</label
                              >
                            </div>
                          </div>
                          <div style="width: 100%; height: 20px"></div>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="
                                deleteItemConfirm(delete_Employee.employee_id)
                              "
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <!-- -------------------------end Delete-------------------------------------- -->

                      <!-- ----------------------------------open------------------------------------ -->
                      <v-dialog
                        v-model="dialog_open"
                        max-width="660"
                        style="overflow:hidding !important; z-index: 1002 !important"
                      >
                        <v-card>
                          <div
                            id="info_user"
                            class="d-flex"
                            style="
                              margin: auto;
                              padding: 24px;
                              padding-bottom: 0px;
                              font-size: 16px;
                              font-family: 'Bai_Jamjuree' !important;
                            "
                          >
                            <div style="width: 50%">
                              <div>
                                รหัสพนักงาน :
                                <label class="color_user">{{
                                  show_info_user.employee_id
                                }}</label>
                              </div>
                              <div>
                                ชื่อ :
                                <label class="color_user"
                                  >{{ show_info_user.title_th }}
                                  {{ show_info_user.first_name_th }}
                                  {{ show_info_user.last_name_th }}</label
                                >
                              </div>
                              <div>
                                สถานะสิทธิ์ :
                                <!-- <label class="color_user">{{
                                  show_info_user.role
                                }}</label> -->
                                <label
                                  class="color_user"
                                  v-if="show_info_user.role == 'super_admin'"
                                  >Super Admin</label
                                >
                                <label
                                  class="color_user"
                                  v-if="show_info_user.role == 'admin'"
                                  >Admin</label
                                >
                                <!-- <label
                                  class="color_user"
                                  v-if="show_info_user.role == 'user'"
                                  >User</label
                                > -->
                                <label
                                  class="color_user"
                                  v-if="show_info_user.role == 'viewer'"
                                  >Viewer</label
                                >
                                <label
                                  class="color_user"
                                  v-if="
                                    show_info_user.role == 'wait_down_service'
                                  "
                                  >เร่งรัดหนี้สิน</label
                                >
                                <label
                                  class="color_user"
                                  v-if="show_info_user.role == 'down_service'"
                                  >ปิดระบบ</label
                                >
                                <!-- <label
                                  class="color_user"
                                  v-if="show_info_user.role == 'up_service'"
                                  >เปิดระบบ</label
                                > -->
                                <label
                                  class="color_user"
                                  v-if="show_info_user.sub_role !== ''"
                                >
                                  &nbsp;({{
                                    select_Show_subrole(show_info_user.sub_role)
                                  }})</label
                                >
                              </div>
                            </div>
                            <div style="width: 50%">
                              <div>
                                Email :
                                <label class="color_user">{{
                                  show_info_user.email
                                }}</label>
                              </div>
                              <div>
                                One mail :
                                <label class="color_user">{{
                                  show_info_user.one_email
                                }}</label>
                              </div>
                            </div>
                          </div>
                          <v-card-title class="text-h5" style="color: darkblue">
                            <label style="font-family: 'Bai_Jamjuree' !important">
                              Customer</label
                            >
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-text-field
                              v-model="search_view"
                              append-icon="mdi-magnify"
                              label="Search"
                              single-line
                              hide-details
                              style="font-family: 'Bai_Jamjuree' !important"
                            ></v-text-field>
                          </v-card-title>

                          <v-card-text>
                            <v-data-table
                              :headers="customer_header"
                              :items="show_data_customer"
                              class="table_in"
                              fixed-header
                              height="250"
                              id="open-customer"
                              :search="search_view"
                              :items-per-page="10"
                            ></v-data-table>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <!-- <v-btn
                            color="green darken-1"
                            text
                            @click="dialog_open = false"
                          >
                            Disagree
                          </v-btn> -->

                            <v-btn
                              color="green darken-1"
                              text
                              @click="dialog_open = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <!-- ------------------------------------end open---------------------------------- -->
                    </v-toolbar>
                    <div
                      class="d-flex"
                      style="justify-content: space-between; font-size: 13px"
                    >
                      <button
                        class="refresh-btn"
                        color="primary"
                        @click="refreshData()"
                      >
                        Refresh:<v-icon black style="font-size: 15px"
                          >mdi-refresh</v-icon
                        >
                      </button>
                      <div style="color: gray; font-size: 12px">
                        data show: {{ datatable.length }}
                      </div>
                    </div>
                  </template>
                  <template v-slot:[`item.role`]="{ item }">
                    <v-chip
                      label
                      style="z-index: 1; width: 110px; display: inline-block"
                      :color="getColor(item.role)"
                      dark
                    >
                      <label v-if="item.role == 'super_admin'">Super Admin</label>
                      <label v-if="item.role == 'admin'">Admin</label>
                      <!-- <label v-if="item.role == 'user'">User</label> -->
                      <label v-if="item.role == 'viewer'">Viewer</label>
                      <label v-if="item.role == 'wait_down_service'"
                        >เร่งรัดหนี้สิน</label
                      >
                      <label v-if="item.role == 'down_service'">ปิดระบบ</label>
                      <!-- <label v-if="item.role == 'up_service'">เปิดระบบ</label> -->
                    </v-chip>
                  </template>
                  <template v-slot:[`item.customer`]="{ item }">
                    <button
                      class="btn btn-link"
                      @click="openCustomer(item), (search_view = '')"
                    >
                      detail
                    </button>
                  </template>
                  <template
                    v-slot:[`item.actions`]="{ item }"
                    v-if="role_status == 'super_admin'"
                  >
                    <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                  </template>
                  <template v-slot:no-data> </template>
                </v-data-table>
              </div>
            </div>

            <v-pagination
              v-model="page"
              :length="page_total"
              @input="pageChange()"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
    </v-container>
    
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  components: {},
  data: () => ({
    search: "",
    datalist: [],
    test_value: "test",
    finish: true,
    dialog: false,
    dialogDelete: false,
    page: 1,
    page_total: 1,
    customer: "",
    dialog_open: false,
    role_select: [
      {
        name: "Super Admin",
        value: "super_admin",
      },
      {
        name: "Admin",
        value: "admin",
      },
      // {
      //   name: "User",
      //   value: "user",
      // },
      {
        name: "Viewer",
        value: "viewer",
      },
      {
        name: "เร่งรัดหนี้สิน",
        value: "wait_down_service",
      },
      {
        name: "ปิดระบบ",
        value: "down_service",
      },
      // {
      //   name: "เปิดระบบ",
      //   value: "up_service",
      // }
    ],

    sub_role_select: [
      {
        name: "Sale",
        value: "STATUS_SALE",
      },
      {
        name: "Operation",
        value: "STATUS_DEBT",
      },
      {
        name: "Finance",
        value: "STATUS_FINANCE",
      },
    ],
    headers_cus: [
      {
        text: "Cus No.",
        value: "customer_no",
        width: "100px",
        sortable: false,
      },
      {
        text: "Cus Name.",
        value: "customer_name",
        width: "200px",
        sortable: false,
      },
      { text: "ลบ", value: "action", width: "100px", sortable: false },
    ],
    customer_header: [
      {
        text: "Cus No.",
        value: "customer_no",
        width: "100px",
        sortable: false,
      },
      {
        text: "Cus Name.",
        value: "customer_name",
        width: "200px",
        sortable: false,
      },
    ],
    show_data_customer: [
      {
        customer_no: "null",
        customer_name: "null",
      },
    ],
    search_view: "",
    show_info_user: {
      employee_id: "",
      account_id: "",
      first_name_th: "",
      last_name_th: "",
      title_th: "",
      nick_name_th: "",
      company_name: "",
      one_email: "",
      email: "",
      department_name: "",
      telephone: "",
      tax_id: "",
      role: "",
    },
    dataCustomer: [],
    customer_search: {
      customer_name: null,
      customer_no: null,
      deleted_at: null,
      seq: null,
      uid: null,
    },
    customer_list: [],
    customer_list_id: [],
    headers: [
      {
        text: "รหัสพนักงาน",
        align: "start",
        sortable: true,
        value: "employee_id",
        width: "200px",
        class: "manage",
      },
      { text: "คำนำหน้า", value: "title_th", width: "100px" },
      { text: "ชื่อ", value: "first_name_th", width: "200px" },
      { text: "นามสกุล", value: "last_name_th", width: "200px" },
      {
        text: "สถานะสิทธิ์ (Role)",
        value: "role",
        width: "180px",
        align: "center",
      },
      { text: "Level", value: "level", width: "100px", align: "center" },
      { text: "Email", value: "email", width: "250px" },
      { text: "One Email", value: "one_email", width: "250px" },
      { text: "Customer", value: "customer", sortable: false, width: "100px" },
      { text: "", value: "actions", sortable: false, width: "80px" },
    ],
    datatable: [],

    count_user: 0,
    total_user: 0,
    editedIndex: -1,
    checkAR: -1,
    editedItem: {
      employee_id: "",
      account_id: "",
      first_name_th: "",
      last_name_th: "",
      title_th: "",
      nick_name_th: "",
      company_name: "",
      one_email: "",
      email: "",
      department_name: "",
      telephone: "",
      tax_id: "",
      role: "",
      sub_role: "",
    },
    defaultItem: {
      name: "",
      expire: 0,
    },
    delete_Employee: {
      employee_id: "",
      title_th: "",
      first_name_th: "",
      last_name_th: "",
      role: "",
    },
    text_alert: "",
    log_data: [],
    list_employee_detail: [],
    disable_add: false,
    rules: [
      (value) => !!value || "Required.",
      (value) => value !== "" || "ไม่พบรหัสพนักงาน",
    ],
    rules_select: {
      select: [(v) => !!v || "select is required"],
    },
    // sub_rules_select: {
    //   select_sub: [(val) => !!val || "status is required"],
    // },
    rules_cus: [
      (value) => !!value || "Required.",
      (value) => value !== "" || "ไม่พบรหัส Cus No.",
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New User" : "Edit User";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },

    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    // this.role_status = localStorage.getItem("role");
    // var decode_1 = atob(localStorage.getItem("role"));
    // var decode_2 = decode_1.split("").reverse().join("");
    // var decode_3 = atob(decode_2);
    // this.role_status = decode_3;
    /*
    if (localStorage.getItem("acces_token")) {
      if (localStorage.getItem("role") == "super_admin") {
        this.role_status = localStorage.getItem("role");
        this.initialize();
      }else {
        Swal.fire({
          icon: "error",
          title: "สิทธิ์ของคุณไม่สามารถเข้าใช้งานได้",
          showConfirmButton: false,
          timer: 1800,
        }).then(() => {
          this.finish = false;
          this.$router.push("/invoice");
        });
      }
    }
    */
    this.role_status = localStorage.getItem("role");
    if (
      this.role_status != "super_admin" &&
      this.role_status != "viewer" &&
      this.role_status != "wait_down_service" &&
      this.role_status != "admin"
    ) {
      // this.finish = false;
      // this.$router.push("/invoice");
      Swal.fire({
        icon: "error",
        title: "สิทธิ์ของคุณไม่สามารถเข้าใช้งานได้",
        showConfirmButton: false,
        timer: 1800,
      }).then(() => {
        this.finish = false;
        this.$router.push("/invoice");
      });
    } else if (localStorage.getItem("acces_token")) {
      this.finish = false;
      // this.getUpService();
      this.initialize();
      
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    add_customer(data) {
      var check_includes = false;
      for (let index = 0; index < this.customer_list.length; index++) {
        if (data.customer_no == this.customer_list[index].customer_no) {
          check_includes = true;
          break;
        }
      }
      if (
        check_includes == false &&
        this.customer_search.customer_name !== null &&
        this.text_alert !== "ไม่พบข้อมูลลูกค้า"
      ) {
        this.customer_list.push(data);
        this.customer_list_id.push(data.customer_no);
        this.customer_search = {
          customer_name: null,
          customer_no: null,
          deleted_at: null,
          seq: null,
          uid: null,
        };
        this.text_alert = "";
      } else if (check_includes == true) {
        this.text_alert = "ข้อมูลนี้มีในตารางแล้ว";
        setTimeout(() => {
          this.text_alert = "";
        }, 2000);
      } else {
        this.text_alert = "ไม่พบข้อมูลลูกค้า";
        setTimeout(() => {
          this.text_alert = "";
        }, 2000);
      }
    },
    delete_customer(data) {

      for (let index = 0; index < this.customer_list.length; index++) {
        if (data.customer_no == this.customer_list[index].customer_no) {
          this.customer_list.splice(index, 1);
          this.customer_list_id.splice(index, 1);
        }
      }
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
            this.text_alert = "";
          }
        })
        .catch((error) => {
          if (error) {
            this.customer_search.customer_name = null;
            this.text_alert = "ไม่พบข้อมูลลูกค้า";

            setTimeout(() => {
              this.text_alert = "";
            }, 2000);
          }
        });
    },
    openCustomer(item) {
      this.show_info_user = item;
      for (let k = 0; k < this.log_data.length; k++) {
        if (item.employee_id == this.log_data[k].account.employee_id) {
          // this.show_info_user = this.log_data[k].account;
          if (this.log_data[k].customers !== null) {
            this.show_data_customer = this.log_data[k].customers;
          } else {
            this.show_data_customer = [];
          }
        }
      }
      this.dialog_open = true;
    },
    pageChange() {
      this.initialize();
    },
    // Color roles
    getColor(data) {
      if (data == "super_admin") {
        return "#095291";
      } else if (data == "admin") {
        return "#0e7bdb";
      // } else if (data == "user") {
      //   return "#69b4f5";
      } else if (data == "wait_down_service") {
        return "warning";
      } else if (data == "down_service") {
        return "error";
      // } else if (data == "up_service") {
      //   return "success";
      } else {
        return "#9f0251";
      }
    },
    refreshData() {
      this.page = 1;
      this.search = "";
      this.initialize();
    },
    initialize() {
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
            "/user?size=20&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then(
          (response) => {
            if (response.status == 200) {
              if (response.data !== null) {
                this.datatable = [];
                // this.search = "";
                this.log_data = response.data.data;
                response.data.data.forEach((element) => {
                  this.datatable.push(element.account);
                });
                // this.datatable = response.data.data;
                this.count_user = response.data.count;
                this.total_user = response.data.total;
                this.page_total = response.data.count_page;
                this.customer_list = [];
                for (let k = 0; k < this.log_data.length; k++) {
                  if (
                    this.editedItem.employee_id ==
                    this.log_data[k].account.employee_id
                  ) {
                    if (this.log_data[k].customers !== null) {
                      this.customer_list = this.log_data[k].customers;
                    }
                  }
                }
                this.customer_list_id = [];
                if (this.customer_list.length > 0) {
                  for (
                    let index = 0;
                    index < this.customer_list.length;
                    index++
                  ) {
                    this.customer_list_id.push(
                      this.customer_list[index].customer_no
                    );
                  }
                }

                this.finish = true;
              } else {
                this.datatable = [];
                this.count_user = 0;
                this.total_user = 0;
                this.customer_list_id = [];
                this.customer_list = [];
                this.finish = true;
              }
            } else if (response.status == 401) {
              this.$router.push("/login");
            } else {
              this.finish = true;
            }
            //   this.axios.get(  process.env.VUE_APP_API +
            //   "/customer",headers).then( (customer)=>{
            // })
          },
          (error) => {
            if (error) {
              this.finish = true;
              this.$router.push("/login");
            }
          }
        )
        .catch((error) => {
          if (error) {
            this.finish = true;
            this.$router.push("/invoice");
          }
        });
    },
    searchWord() {
      this.page = 1;
      this.initialize();
    },
    // searchAddID(employee_id) {
    //   let headers = {
    //     headers: {
    //       Authorization:
    //         "Bearer " +
    //         localStorage.getItem("acces_token") +
    //         "," +
    //         localStorage.getItem("secret"),
    //     },
    //   };
    //   this.axios
    //     .get(
    //       process.env.VUE_APP_API + "/user/employee/" + String(employee_id),
    //       headers
    //     )
    //     .then(
    //       (response) => {
    //         if (response.status == 200) {
    //           console.log(response.data)
    //           this.rules = [
    //             (value) => !!value || "Required.",
    //             (value) => value !== "" || "ไม่พบรหัสพนักงาน",
    //           ];

    //           this.list_employee_detail = response.data.account_data.employee_detail;

    //           if (
    //             response.data.employee_data.employee_id ==
    //               localStorage.getItem("employee_id") &&
    //             (this.role_status == "super_admin" ||
    //               this.role_status == "admin" ||
    //               this.role_status == "wait_down_service" ||
    //               this.role_status == "down_service")
    //           ) {
    //             this.disable_add = true;
    //             this.customer_list = [];
    //             this.customer_list_id = [];
    //           }
    //           this.checkAR = 1;
    //           this.editedItem = {
    //             employee_id: response.data.employee_data.employee_id,
    //             account_id: response.data.employee_data.account_id,
    //             first_name_th: response.data.account_data.first_name_th,
    //             last_name_th: response.data.account_data.last_name_th,
    //             title_th: response.data.account_data.title_th,
    //             one_email: response.data.account_data.one_email,
    //             email: response.data.employee_data.email,
    //             tax_id: response.data.employee_data.company_tax_no,
    //             nick_name_th: response.data.account_data.nick_name_th,
    //             company_name: response.data.employee_data.company_name,
    //             department_name: response.data.employee_data.department_name,
    //             telephone: response.data.employee_data.telephone,
    //             role: this.editedItem.role,
    //             sub_role: this.editedItem.sub_role,
    //           };

    //           for(let i = 0 ; i < this.list_employee_detail.length ; i++){
    //             if(this.list_employee_detail[i].department == 'ฝ่าย Organization Development' && 
    //             (this.list_employee_detail[i].position == 'Senior Organization Developer' || this.list_employee_detail[i].position == 'Organization Developer' 
    //             || this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ')){
    //               this.editedItem.role = 'super_admin';
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: this.editedItem.role,
    //                 sub_role: this.editedItem.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ฝ่าย Digital Operation Dashboard' && 
    //             (this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ')){
    //               this.editedItem.role = 'super_admin';
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: this.editedItem.role,
    //                 sub_role: this.editedItem.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงานการเงิน AR' && 
    //             (this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงินอาวุโส' || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงิน (Lead)' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงิน')){
    //               this.editedItem.role = 'admin';
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: this.editedItem.role,
    //                 sub_role: this.editedItem.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงานบัญชี' && 
    //             (this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่บัญชีอาวุโส ' || this.list_employee_detail[i].position == 'เจ้าหน้าที่บัญชี' 
    //             || this.list_employee_detail[i].position == 'Accounting Trainee')){
    //               this.editedItem.role = 'admin';
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: this.editedItem.role,
    //                 sub_role: this.editedItem.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ฝ่ายสนับสนุนการขาย' && 
    //             (this.list_employee_detail[i].position == 'เจ้าหน้าที่ประสานงานอาวุโส' || this.list_employee_detail[i].position == 'เจ้าหน้าที่ประสานงาน')){
    //               this.editedItem.role = 'viewer';
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: this.editedItem.role,
    //                 sub_role: this.editedItem.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงานบริหารต้นทุน' && 
    //             (this.list_employee_detail[i].position == 'รองผู้จัดการ' || this.list_employee_detail[i].position == 'เจ้าหน้าที่บริหารต้นทุนอาวุโส' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่บริหารต้นทุน')){
    //               this.editedItem.role = 'viewer';
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: this.editedItem.role,
    //                 sub_role: this.editedItem.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงานการเงิน AP' && 
    //             (this.list_employee_detail[i].position == 'ผู้อำนวยการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงินอาวุโส' || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงิน' )){
    //               this.editedItem.role = 'admin';
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: this.editedItem.role,
    //                 sub_role: this.editedItem.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if((this.list_employee_detail[i].department == 'Base Sales 1 Mint' || this.list_employee_detail[i].department == 'Base Sales 16 Mim' ||
    //               this.list_employee_detail[i].department == 'Base Sales 17 Kik' || this.list_employee_detail[i].department == 'Base Sales 19 Pang' ||
    //               this.list_employee_detail[i].department == 'Base Sales 2 Pond' || this.list_employee_detail[i].department == 'Base Sales 3 Zank' ||
    //               this.list_employee_detail[i].department == 'Base Sales 5 Yim' || this.list_employee_detail[i].department == 'Base sales 4 Mint Wa' ||
    //               this.list_employee_detail[i].department == 'Base Sales Fai' || this.list_employee_detail[i].department == 'Base Sales Hang' ||
    //               this.list_employee_detail[i].department == 'Base Sales Ning' || this.list_employee_detail[i].department == 'Recovery' ||
    //               this.list_employee_detail[i].department == 'Goverment Platform' || this.list_employee_detail[i].department == 'Retention' || 
    //               this.list_employee_detail[i].department == 'Key Account Policy' || this.list_employee_detail[i].department == 'Sale JV' ||
    //               this.list_employee_detail[i].department == 'SCG' || this.list_employee_detail[i].department == 'SI / Software') 
    //               && (this.list_employee_detail[i].position == 'Senior Business Manager' || this.list_employee_detail[i].position == 'Business Manager')){
    //                 this.editedItem.role = 'viewer';
    //                 this.editedItem = {
    //                   employee_id: response.data.employee_data.employee_id,
    //                   account_id: response.data.employee_data.account_id,
    //                   first_name_th: response.data.account_data.first_name_th,
    //                   last_name_th: response.data.account_data.last_name_th,
    //                   title_th: response.data.account_data.title_th,
    //                   one_email: response.data.account_data.one_email,
    //                   email: response.data.employee_data.email,
    //                   tax_id: response.data.employee_data.company_tax_no,
    //                   nick_name_th: response.data.account_data.nick_name_th,
    //                   company_name: response.data.employee_data.company_name,
    //                   department_name: this.list_employee_detail[i].department,
    //                   telephone: response.data.employee_data.telephone,
    //                   role: this.editedItem.role,
    //                   sub_role: this.editedItem.sub_role,
    //                 };
    //                 this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงาน BD Outsource' && this.list_employee_detail[i].position == 'Operation Support'){
    //                 this.editedItem.role = 'down_service';
    //                 this.editedItem = {
    //                   employee_id: response.data.employee_data.employee_id,
    //                   account_id: response.data.employee_data.account_id,
    //                   first_name_th: response.data.account_data.first_name_th,
    //                   last_name_th: response.data.account_data.last_name_th,
    //                   title_th: response.data.account_data.title_th,
    //                   one_email: response.data.account_data.one_email,
    //                   email: response.data.employee_data.email,
    //                   tax_id: response.data.employee_data.company_tax_no,
    //                   nick_name_th: response.data.account_data.nick_name_th,
    //                   company_name: response.data.employee_data.company_name,
    //                   department_name: this.list_employee_detail[i].department,
    //                   telephone: response.data.employee_data.telephone,
    //                   role: this.editedItem.role,
    //                   sub_role: this.editedItem.sub_role,
    //                 };
    //                 this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'Support JV' && this.list_employee_detail[i].position == 'JV Support'){
    //                 this.editedItem.role = 'admin';
    //                 this.editedItem = {
    //                   employee_id: response.data.employee_data.employee_id,
    //                   account_id: response.data.employee_data.account_id,
    //                   first_name_th: response.data.account_data.first_name_th,
    //                   last_name_th: response.data.account_data.last_name_th,
    //                   title_th: response.data.account_data.title_th,
    //                   one_email: response.data.account_data.one_email,
    //                   email: response.data.employee_data.email,
    //                   tax_id: response.data.employee_data.company_tax_no,
    //                   nick_name_th: response.data.account_data.nick_name_th,
    //                   company_name: response.data.employee_data.company_name,
    //                   department_name: this.list_employee_detail[i].department,
    //                   telephone: response.data.employee_data.telephone,
    //                   role: this.editedItem.role,
    //                   sub_role: this.editedItem.sub_role,
    //                 };
    //                 this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงาน Business Operation Consulting' && 
    //             (this.list_employee_detail[i].position == 'ผู้ช่วยผู้อำนวยการ' || this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ')){
    //                 this.editedItem.role = 'admin';
    //                 this.editedItem = {
    //                   employee_id: response.data.employee_data.employee_id,
    //                   account_id: response.data.employee_data.account_id,
    //                   first_name_th: response.data.account_data.first_name_th,
    //                   last_name_th: response.data.account_data.last_name_th,
    //                   title_th: response.data.account_data.title_th,
    //                   one_email: response.data.account_data.one_email,
    //                   email: response.data.employee_data.email,
    //                   tax_id: response.data.employee_data.company_tax_no,
    //                   nick_name_th: response.data.account_data.nick_name_th,
    //                   company_name: response.data.employee_data.company_name,
    //                   department_name: this.list_employee_detail[i].department,
    //                   telephone: response.data.employee_data.telephone,
    //                   role: this.editedItem.role,
    //                   sub_role: this.editedItem.sub_role,
    //                 };
    //                 this.checkAR = -1;
    //             }
                
    //           }
    //         } else {
    //           this.rules = [
    //             (value) => !!value || "Required.",
    //             (value) => value == "" || "ไม่พบรหัสพนักงาน",
    //           ];
    //         }
    //       },
    //       (error) => {
    //         if (error) {
    //           this.rules = [
    //             (value) => value.employee_id == "" || "ไม่พบรหัสพนักงาน",
    //           ];
    //         }
    //         this.checkAR = -1;
    //         this.editedItem = {
    //           employee_id: "",
    //           account_id: "",
    //           first_name_th: "",
    //           last_name_th: "",
    //           title_th: "",
    //           nick_name_th: "",
    //           company_name: "",
    //           one_email: "",
    //           email: "",
    //           department_name: "",
    //           telephone: "",
    //           tax_id: "",
    //           role: "",
    //           sub_role: "",
    //         };
    //       }
    //     );
    // },
    searchAddID(employee_id) {
      let employeeid = "";
      let account_id = "";
      let first_name_th = "";
      let last_name_th = "";
      let title_th = "";
      let one_email = "";
      let email = "";
      let tax_id = "";
      let nick_name_th = "";
      let company_name = "";
      let department = "";
      let telephone = "";
      let position = "";

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
          process.env.VUE_APP_API + "/user/employee/" + String(employee_id),
          headers
        )
        .then(
          (response) => {
            if (response.status == 200) {
              this.rules = [
                (value) => !!value || "Required.",
                (value) => value !== "" || "ไม่พบรหัสพนักงาน",
              ];

              //this.list_employee_detail = response.data.account_data.employee_detail;

              if (
                response.data.employee_data.data.employee_id ==
                  localStorage.getItem("employee_id") &&
                (this.role_status == "super_admin" ||
                  this.role_status == "admin" ||
                  this.role_status == "wait_down_service" ||
                  this.role_status == "down_service")
              ) {
                this.disable_add = true;
                this.customer_list = [];
                this.customer_list_id = [];
              }

              employeeid = response.data.employee_data.data.employee_id;
              account_id = response.data.employee_data.data.account_id;
              first_name_th = response.data.employee_data.data.has_account_detail.first_name_th;
              last_name_th = response.data.employee_data.data.has_account_detail.last_name_th;
              title_th = response.data.employee_data.data.has_account_detail.account_title_th;
              one_email = response.data.employee_data.data.has_account_detail.thai_email;
              email = response.data.employee_data.data.email;
              tax_id = response.data.employee_data.data.biz_id;
              nick_name_th = response.data.employee_data.data.nick_name;
              company_name = "บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน)";
              department = response.data.employee_department.data.has_role[0].department.dept_name;
              telephone = response.data.employee_data.data.mobile_no;
              position = response.data.employee_department.data.has_role[0].role.role_name;

              this.checkAR = 1;
              this.editedItem = {
                employee_id: employeeid,
                account_id: account_id,
                first_name_th: first_name_th,
                last_name_th: last_name_th,
                title_th: title_th,
                one_email: one_email,
                email: email,
                tax_id: tax_id,
                nick_name_th: nick_name_th,
                company_name: company_name,
                department_name: department,
                telephone: telephone,
                role: this.editedItem.role,
                sub_role: this.editedItem.sub_role,
              };

                if(department == 'ฝ่าย Organization Development' && 
                (position == 'Senior Organization Developer' || position == 'Organization Developer' 
                || position == 'ผู้จัดการ' || position == 'รองผู้จัดการ')){
                  this.editedItem.role = 'super_admin';
                  this.checkAR = -1;
                }
                else if(department == 'ฝ่าย Digital Operation Dashboard' && 
                (position == 'ผู้จัดการ' || position == 'รองผู้จัดการ' || position == 'DOD Officer')){
                  this.editedItem.role = 'super_admin';
                  this.checkAR = -1;
                }
                else if(department == 'ส่วนงานการเงิน AR' && 
                (position == 'ผู้จัดการ' || position == 'รองผู้จัดการ' 
                || position == 'เจ้าหน้าที่การเงินอาวุโส' || position == 'เจ้าหน้าที่การเงิน (Lead)' 
                || position == 'เจ้าหน้าที่การเงิน')){
                  this.editedItem.role = 'admin';
                  this.checkAR = -1;
                }
                else if(department == 'ส่วนงานบัญชี' && 
                (position == 'ผู้จัดการ' || position == 'รองผู้จัดการ' 
                || position == 'เจ้าหน้าที่บัญชีอาวุโส ' || position == 'เจ้าหน้าที่บัญชี' 
                || position == 'Accounting Trainee')){
                  this.editedItem.role = 'admin';
                  this.checkAR = -1;
                }
                else if(department == 'ฝ่ายสนับสนุนการขาย' && 
                (position == 'เจ้าหน้าที่ประสานงานอาวุโส' || position == 'เจ้าหน้าที่ประสานงาน')){
                  this.editedItem.role = 'viewer';
                  this.checkAR = -1;
                }
                else if(department == 'ส่วนงานบริหารต้นทุน' && 
                (position == 'รองผู้จัดการ' || position == 'เจ้าหน้าที่บริหารต้นทุนอาวุโส' 
                || position == 'เจ้าหน้าที่บริหารต้นทุน')){
                  this.editedItem.role = 'viewer';
                  this.checkAR = -1;
                }
                else if(department == 'ส่วนงานการเงิน AP' && 
                (position == 'ผู้อำนวยการ' || position == 'รองผู้จัดการ' 
                || position == 'เจ้าหน้าที่การเงินอาวุโส' || position == 'เจ้าหน้าที่การเงิน' )){
                  this.editedItem.role = 'admin';
                  this.checkAR = -1;
                }
                else if((department == 'Base Sales 1 Mint' || department == 'Base Sales 16 Mim' ||
                  department == 'Base Sales 17 Kik' || department == 'Base Sales 19 Pang' ||
                  department == 'Base Sales 2 Pond' || department == 'Base Sales 3 Zank' ||
                  department == 'Base Sales 5 Yim' || department == 'Base sales 4 Mint Wa' ||
                  department == 'Base Sales Fai' || department == 'Base Sales Hang' ||
                  department == 'Base Sales Ning' || department == 'Recovery' ||
                  department == 'Goverment Platform' || department == 'Retention' || 
                  department == 'Key Account Policy' || department == 'Sale JV' ||
                  department == 'SCG' || department == 'SI / Software') 
                  && (position == 'Senior Business Manager' || position == 'Business Manager')){
                    this.editedItem.role = 'viewer';
                    this.checkAR = -1;
                }
                else if(department == 'ส่วนงาน BD Outsource' && position == 'Operation Support'){
                    this.editedItem.role = 'down_service';
                    this.checkAR = -1;
                }
                else if(department == 'Support JV' && position == 'JV Support'){
                    this.editedItem.role = 'admin';
                    this.checkAR = -1;
                }
                else if(department == 'ส่วนงาน Business Operation Consulting' && 
                (position == 'ผู้ช่วยผู้อำนวยการ' || position == 'ผู้จัดการ' || position == 'รองผู้จัดการ')){
                    this.editedItem.role = 'admin';
                    this.checkAR = -1;
                }
                
              //console.log(this.editedItem)

            } else {
              this.rules = [
                (value) => !!value || "Required.",
                (value) => value == "" || "ไม่พบรหัสพนักงาน",
              ];
            }
          },
          (error) => {
            if (error) {
              this.rules = [
                (value) => value.employee_id == "" || "ไม่พบรหัสพนักงาน",
              ];
            }
            this.checkAR = -1;
            this.editedItem = {
              employee_id: "",
              account_id: "",
              first_name_th: "",
              last_name_th: "",
              title_th: "",
              nick_name_th: "",
              company_name: "",
              one_email: "",
              email: "",
              department_name: "",
              telephone: "",
              tax_id: "",
              role: "",
              sub_role: "",
            };
          }
        );
    },
    select_SubRole() {
    },
    select_Show_subrole(subrole) {
      for (let index = 0; index < this.sub_role_select.length; index++) {
        if (subrole == this.sub_role_select[index].value) {
          return this.sub_role_select[index].name;
        }
      }
    },
    selectRole() {
      if (this.editedItem.role != "wait_down_service") {
        this.editedItem.sub_role = "";
      }
      if (
        this.editedItem.role == "super_admin" ||
        this.editedItem.role == "admin" ||
        this.editedItem.role == "wait_down_service" ||
        this.editedItem.role == "down_service"
        // this.editedItem.role == "down_service"||
        // this.editedItem.role == "up_service"
      ) {
        this.disable_add = true;
        this.customer_list = [];
        this.customer_list_id = [];
        this.editedItem.customer_no = [];
      } else {
        this.disable_add = false;
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
              "/user?size=20&page=" +
              this.page +
              "&search=" +
              String(this.search),
            headers
          )
          .then((response) => {
            if (response.status == 200) {
              if (response.data !== null) {
                this.log_data = response.data.data;
                this.customer_list = [];
                for (let k = 0; k < this.log_data.length; k++) {
                  if (
                    this.editedItem.employee_id ==
                    this.log_data[k].account.employee_id
                  ) {
                    if (this.log_data[k].customers !== null) {
                      this.customer_list = this.log_data[k].customers;
                    }
                  }
                }
                this.customer_list_id = [];
                if (this.customer_list.length > 0) {
                  for (
                    let index = 0;
                    index < this.customer_list.length;
                    index++
                  ) {
                    this.customer_list_id.push(
                      this.customer_list[index].customer_no
                    );
                  }
                }
              }
            }
          });
      }
    },
    deleteItem(item) {
      this.delete_Employee = {
        employee_id: item.employee_id,
        title_th: item.title_th,
        first_name_th: item.first_name_th,
        last_name_th: item.last_name_th,
        role: item.role,
        sub_role: item.sub_role,
      };
      // this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    // editItem(item) {
    //   this.editedIndex = 1;
    //   if (
    //     item.role == "super_admin" ||
    //     item.role == "admin" ||
    //     item.role == "wait_down_service" ||
    //     item.role == "down_service"
    //   ) {
    //     this.disable_add = true;
    //   } else {
    //     this.disable_add = false;
    //   }
    //   let headers = {
    //     headers: {
    //       Authorization:
    //         "Bearer " +
    //         localStorage.getItem("acces_token") +
    //         "," +
    //         localStorage.getItem("secret"),
    //     },
    //   };
    //   this.axios
    //     .get(
    //       process.env.VUE_APP_API +
    //         "/user/employee/" +
    //         String(item.employee_id),
    //       headers
    //     )
    //     .then((response) => {

    //       this.list_employee_detail = response.data.account_data.employee_detail;
    //       this.checkAR = 1;
    //       this.editedItem = {
    //         employee_id: response.data.employee_data.employee_id,
    //         account_id: response.data.employee_data.account_id,
    //         first_name_th: response.data.account_data.first_name_th,
    //         last_name_th: response.data.account_data.last_name_th,
    //         title_th: response.data.account_data.title_th,
    //         one_email: response.data.account_data.one_email,
    //         email: response.data.employee_data.email,
    //         tax_id: response.data.employee_data.company_tax_no,
    //         nick_name_th: response.data.account_data.nick_name_th,
    //         company_name: response.data.employee_data.company_name,
    //         department_name: response.data.employee_data.department_name,
    //         telephone: response.data.employee_data.telephone,
    //         role: item.role,
    //         sub_role: item.sub_role,
    //       };

    //       for(let i = 0 ; i < this.list_employee_detail.length ; i++){
    //             if(this.list_employee_detail[i].department == 'ฝ่าย Organization Development' && 
    //             (this.list_employee_detail[i].position == 'Senior Organization Developer' || this.list_employee_detail[i].position == 'Organization Developer' 
    //             || this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ')){
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: item.role,
    //                 sub_role: item.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ฝ่าย Digital Operation Dashboard' && 
    //             (this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ')){
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: item.role,
    //                 sub_role: item.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงานการเงิน AR' && 
    //             (this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงินอาวุโส' || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงิน (Lead)' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงิน')){
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: item.role,
    //                 sub_role: item.sub_role,
    //               };
    //               this.checkAR = 1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงานบัญชี' && 
    //             (this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่บัญชีอาวุโส ' || this.list_employee_detail[i].position == 'เจ้าหน้าที่บัญชี' 
    //             || this.list_employee_detail[i].position == 'Accounting Trainee')){
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: item.role,
    //                 sub_role: item.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ฝ่ายสนับสนุนการขาย' && 
    //             (this.list_employee_detail[i].position == 'เจ้าหน้าที่ประสานงานอาวุโส' || this.list_employee_detail[i].position == 'เจ้าหน้าที่ประสานงาน')){
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: item.role,
    //                 sub_role: item.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงานบริหารต้นทุน' && 
    //             (this.list_employee_detail[i].position == 'รองผู้จัดการ' || this.list_employee_detail[i].position == 'เจ้าหน้าที่บริหารต้นทุนอาวุโส' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่บริหารต้นทุน')){
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: item.role,
    //                 sub_role: item.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงานการเงิน AP' && 
    //             (this.list_employee_detail[i].position == 'ผู้อำนวยการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ' 
    //             || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงินอาวุโส' || this.list_employee_detail[i].position == 'เจ้าหน้าที่การเงิน' )){
    //               this.editedItem = {
    //                 employee_id: response.data.employee_data.employee_id,
    //                 account_id: response.data.employee_data.account_id,
    //                 first_name_th: response.data.account_data.first_name_th,
    //                 last_name_th: response.data.account_data.last_name_th,
    //                 title_th: response.data.account_data.title_th,
    //                 one_email: response.data.account_data.one_email,
    //                 email: response.data.employee_data.email,
    //                 tax_id: response.data.employee_data.company_tax_no,
    //                 nick_name_th: response.data.account_data.nick_name_th,
    //                 company_name: response.data.employee_data.company_name,
    //                 department_name: this.list_employee_detail[i].department,
    //                 telephone: response.data.employee_data.telephone,
    //                 role: item.role,
    //                 sub_role: item.sub_role,
    //               };
    //               this.checkAR = -1;
    //             }
    //             else if((this.list_employee_detail[i].department == 'Base Sales 1 Mint' || this.list_employee_detail[i].department == 'Base Sales 16 Mim' ||
    //               this.list_employee_detail[i].department == 'Base Sales 17 Kik' || this.list_employee_detail[i].department == 'Base Sales 19 Pang' ||
    //               this.list_employee_detail[i].department == 'Base Sales 2 Pond' || this.list_employee_detail[i].department == 'Base Sales 3 Zank' ||
    //               this.list_employee_detail[i].department == 'Base Sales 5 Yim' || this.list_employee_detail[i].department == 'Base sales 4 Mint Wa' ||
    //               this.list_employee_detail[i].department == 'Base Sales Fai' || this.list_employee_detail[i].department == 'Base Sales Hang' ||
    //               this.list_employee_detail[i].department == 'Base Sales Ning' || this.list_employee_detail[i].department == 'Recovery' ||
    //               this.list_employee_detail[i].department == 'Goverment Platform' || this.list_employee_detail[i].department == 'Retention' || 
    //               this.list_employee_detail[i].department == 'Key Account Policy' || this.list_employee_detail[i].department == 'Sale JV' ||
    //               this.list_employee_detail[i].department == 'SCG' || this.list_employee_detail[i].department == 'SI / Software') 
    //               && (this.list_employee_detail[i].position == 'Senior Business Manager' || this.list_employee_detail[i].position == 'Business Manager')){
    //                 this.editedItem = {
    //                   employee_id: response.data.employee_data.employee_id,
    //                   account_id: response.data.employee_data.account_id,
    //                   first_name_th: response.data.account_data.first_name_th,
    //                   last_name_th: response.data.account_data.last_name_th,
    //                   title_th: response.data.account_data.title_th,
    //                   one_email: response.data.account_data.one_email,
    //                   email: response.data.employee_data.email,
    //                   tax_id: response.data.employee_data.company_tax_no,
    //                   nick_name_th: response.data.account_data.nick_name_th,
    //                   company_name: response.data.employee_data.company_name,
    //                   department_name: this.list_employee_detail[i].department,
    //                   telephone: response.data.employee_data.telephone,
    //                   role: item.role,
    //                   sub_role: item.sub_role,
    //                 };
    //                 this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงาน BD Outsource' && this.list_employee_detail[i].position == 'Operation Support'){
    //                 this.editedItem = {
    //                   employee_id: response.data.employee_data.employee_id,
    //                   account_id: response.data.employee_data.account_id,
    //                   first_name_th: response.data.account_data.first_name_th,
    //                   last_name_th: response.data.account_data.last_name_th,
    //                   title_th: response.data.account_data.title_th,
    //                   one_email: response.data.account_data.one_email,
    //                   email: response.data.employee_data.email,
    //                   tax_id: response.data.employee_data.company_tax_no,
    //                   nick_name_th: response.data.account_data.nick_name_th,
    //                   company_name: response.data.employee_data.company_name,
    //                   department_name: this.list_employee_detail[i].department,
    //                   telephone: response.data.employee_data.telephone,
    //                   role: item.role,
    //                   sub_role: item.sub_role,
    //                 };
    //                 this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'Support JV' && this.list_employee_detail[i].position == 'JV Support'){
    //                 this.editedItem = {
    //                   employee_id: response.data.employee_data.employee_id,
    //                   account_id: response.data.employee_data.account_id,
    //                   first_name_th: response.data.account_data.first_name_th,
    //                   last_name_th: response.data.account_data.last_name_th,
    //                   title_th: response.data.account_data.title_th,
    //                   one_email: response.data.account_data.one_email,
    //                   email: response.data.employee_data.email,
    //                   tax_id: response.data.employee_data.company_tax_no,
    //                   nick_name_th: response.data.account_data.nick_name_th,
    //                   company_name: response.data.employee_data.company_name,
    //                   department_name: this.list_employee_detail[i].department,
    //                   telephone: response.data.employee_data.telephone,
    //                   role: item.role,
    //                   sub_role: item.sub_role,
    //                 };
    //                 this.checkAR = -1;
    //             }
    //             else if(this.list_employee_detail[i].department == 'ส่วนงาน Business Operation Consulting' && 
    //             (this.list_employee_detail[i].position == 'ผู้ช่วยผู้อำนวยการ' || this.list_employee_detail[i].position == 'ผู้จัดการ' || this.list_employee_detail[i].position == 'รองผู้จัดการ')){
    //                 this.editedItem = {
    //                   employee_id: response.data.employee_data.employee_id,
    //                   account_id: response.data.employee_data.account_id,
    //                   first_name_th: response.data.account_data.first_name_th,
    //                   last_name_th: response.data.account_data.last_name_th,
    //                   title_th: response.data.account_data.title_th,
    //                   one_email: response.data.account_data.one_email,
    //                   email: response.data.employee_data.email,
    //                   tax_id: response.data.employee_data.company_tax_no,
    //                   nick_name_th: response.data.account_data.nick_name_th,
    //                   company_name: response.data.employee_data.company_name,
    //                   department_name: this.list_employee_detail[i].department,
    //                   telephone: response.data.employee_data.telephone,
    //                   role: item.role,
    //                   sub_role: item.sub_role,
    //                 };
    //                 this.checkAR = 1;
    //             }
                
    //           }
    //     });
    //   this.dialog = true;

    //   this.axios
    //     .get(
    //       process.env.VUE_APP_API +
    //         "/user?size=20&page=" +
    //         this.page +
    //         "&search=" +
    //         String(this.search),
    //       headers
    //     )
    //     .then((response) => {
    //       if (response.status == 200) {
    //         if (response.data !== null) {
    //           this.log_data = response.data.data;
    //           this.customer_list = [];
    //           for (let k = 0; k < this.log_data.length; k++) {
    //             if (item.employee_id == this.log_data[k].account.employee_id) {
    //               if (this.log_data[k].customers !== null) {
    //                 this.customer_list = this.log_data[k].customers;
    //               }
    //             }
    //           }
    //           this.customer_list_id = [];
    //           if (this.customer_list.length > 0) {
    //             for (
    //               let index = 0;
    //               index < this.customer_list.length;
    //               index++
    //             ) {
    //               this.customer_list_id.push(
    //                 this.customer_list[index].customer_no
    //               );
    //             }
    //           }
    //         }
    //       }
    //     });
    // },
    editItem(item) {
      let employeeid = "";
      let account_id = "";
      let first_name_th = "";
      let last_name_th = "";
      let title_th = "";
      let one_email = "";
      let email = "";
      let tax_id = "";
      let nick_name_th = "";
      let company_name = "";
      let department = "";
      let telephone = "";
      let position = "";

      this.editedIndex = 1;
      if (
        item.role == "super_admin" ||
        item.role == "admin" ||
        item.role == "wait_down_service" ||
        item.role == "down_service"
      ) {
        this.disable_add = true;
      } else {
        this.disable_add = false;
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
        .get(
          process.env.VUE_APP_API +
            "/user/employee/" +
            String(item.employee_id),
          headers
        )
        .then((response) => {

          //this.list_employee_detail = response.data.account_data.employee_detail;
          employeeid = response.data.employee_data.data.employee_id;
          account_id = response.data.employee_data.data.account_id;
          first_name_th = response.data.employee_data.data.has_account_detail.first_name_th;
          last_name_th = response.data.employee_data.data.has_account_detail.last_name_th;
          title_th = response.data.employee_data.data.has_account_detail.account_title_th;
          one_email = response.data.employee_data.data.has_account_detail.thai_email;
          email = response.data.employee_data.data.email;
          tax_id = response.data.employee_data.data.biz_id;
          nick_name_th = response.data.employee_data.data.nick_name;
          company_name = "บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน)";
          department = response.data.employee_department.data.has_role[0].department.dept_name;
          telephone = response.data.employee_data.data.mobile_no;
          position = response.data.employee_department.data.has_role[0].role.role_name;

          this.checkAR = 1;
          this.editedItem = {
            employee_id: employeeid,
            account_id: account_id,
            first_name_th: first_name_th,
            last_name_th: last_name_th,
            title_th: title_th,
            one_email: one_email,
            email: email,
            tax_id: tax_id,
            nick_name_th: nick_name_th,
            company_name: company_name,
            department_name: department,
            telephone: telephone,
            role: item.role,
            sub_role: item.sub_role,
          };

                if(department == 'ฝ่าย Organization Development' && 
                (position == 'Senior Organization Developer' || position == 'Organization Developer' 
                || position == 'ผู้จัดการ' || position == 'รองผู้จัดการ')){
                  this.checkAR = -1;
                }
                else if(department == 'ฝ่าย Digital Operation Dashboard' && 
                (position == 'ผู้จัดการ' || position == 'รองผู้จัดการ' || position == 'DOD Officer')){
                  this.checkAR = -1;
                }
                else if(department == 'ส่วนงานการเงิน AR' && 
                (position == 'ผู้จัดการ' || position == 'รองผู้จัดการ' 
                || position == 'เจ้าหน้าที่การเงินอาวุโส' || position == 'เจ้าหน้าที่การเงิน (Lead)' 
                || position == 'เจ้าหน้าที่การเงิน')){
                  this.checkAR = 1;
                }
                else if(department == 'ส่วนงานบัญชี' && 
                (position == 'ผู้จัดการ' || position == 'รองผู้จัดการ' 
                || position == 'เจ้าหน้าที่บัญชีอาวุโส ' || position == 'เจ้าหน้าที่บัญชี' 
                || position == 'Accounting Trainee')){
                  this.checkAR = -1;
                }
                else if(department == 'ฝ่ายสนับสนุนการขาย' && 
                (position == 'เจ้าหน้าที่ประสานงานอาวุโส' || position == 'เจ้าหน้าที่ประสานงาน')){
                  this.checkAR = -1;
                }
                else if(department == 'ส่วนงานบริหารต้นทุน' && 
                (position == 'รองผู้จัดการ' || position == 'เจ้าหน้าที่บริหารต้นทุนอาวุโส' 
                || position == 'เจ้าหน้าที่บริหารต้นทุน')){
                  this.checkAR = -1;
                }
                else if(department == 'ส่วนงานการเงิน AP' && 
                (position == 'ผู้อำนวยการ' || position == 'รองผู้จัดการ' 
                || position == 'เจ้าหน้าที่การเงินอาวุโส' || position == 'เจ้าหน้าที่การเงิน' )){
                  this.checkAR = -1;
                }
                else if((department == 'Base Sales 1 Mint' || department == 'Base Sales 16 Mim' ||
                  department == 'Base Sales 17 Kik' || department == 'Base Sales 19 Pang' ||
                  department == 'Base Sales 2 Pond' || department == 'Base Sales 3 Zank' ||
                  department == 'Base Sales 5 Yim' || department == 'Base sales 4 Mint Wa' ||
                  department == 'Base Sales Fai' || department == 'Base Sales Hang' ||
                  department == 'Base Sales Ning' || department == 'Recovery' ||
                  department == 'Goverment Platform' || department == 'Retention' || 
                  department == 'Key Account Policy' || department == 'Sale JV' ||
                  department == 'SCG' || department == 'SI / Software') 
                  && (position == 'Senior Business Manager' || position == 'Business Manager')){
                    this.checkAR = -1;
                }
                else if(department == 'ส่วนงาน BD Outsource' && position == 'Operation Support'){
                    this.checkAR = -1;
                }
                else if(department == 'Support JV' && position == 'JV Support'){
                    this.checkAR = -1;
                }
                else if(department == 'ส่วนงาน Business Operation Consulting' && 
                (position == 'ผู้ช่วยผู้อำนวยการ' || position == 'ผู้จัดการ' || position == 'รองผู้จัดการ')){
                    this.checkAR = 1;
                }
                
              //console.log(this.editedItem)

        });
      this.dialog = true;

      this.axios
        .get(
          process.env.VUE_APP_API +
            "/user?size=20&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data !== null) {
              this.log_data = response.data.data;
              this.customer_list = [];
              for (let k = 0; k < this.log_data.length; k++) {
                if (item.employee_id == this.log_data[k].account.employee_id) {
                  if (this.log_data[k].customers !== null) {
                    this.customer_list = this.log_data[k].customers;
                  }
                }
              }
              this.customer_list_id = [];
              if (this.customer_list.length > 0) {
                for (
                  let index = 0;
                  index < this.customer_list.length;
                  index++
                ) {
                  this.customer_list_id.push(
                    this.customer_list[index].customer_no
                  );
                }
              }
            }
          }
        });
    },

    deleteItemConfirm(employee_id) {
      var uid = null;
      for (let index = 0; index < this.datatable.length; index++) {
        if (employee_id == this.datatable[index].employee_id) {
          uid = this.datatable[index].uid;
        }
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
      this.axios.delete(process.env.VUE_APP_API + "/user/" + uid, headers)
      .then(() => {
          Swal.fire({
            icon: "success",
            title: "ลบข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeDelete();
          this.initialize();
        },
        (error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลได้",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
    },

    close() {
      this.dialog = false;
      // });
      this.list_employee_detail = [];
      this.checkAR = -1;
      this.editedItem = {
        employee_id: null,
        account_id: "",
        first_name_th: "",
        last_name_th: "",
        title_th: "",
        nick_name_th: "",
        company_name: "",
        one_email: "",
        email: "",
        department_name: "",
        telephone: "",
        tax_id: "",
        role: "",
        sub_role: "",
        customer_no: [],
      };
      this.customer_list_id = [];
      this.customer_list = [];
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      if (this.editedIndex > -1) {
        var edit_user = {
          account_id: this.editedItem.account_id,
          role: this.editedItem.role,
          customer_no: this.customer_list_id,
          sub_role: this.editedItem.sub_role,
        };
        this.axios
          .put(process.env.VUE_APP_API + "/user", edit_user, headers)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.close();
              this.initialize();
            });
          })
          .catch((error) => {
            if (error) {
              alert("ไม่สามารถแก้ไขข้อมูลได้ กรุณาลองใหม่");
            }
          });
      } else {
        var checkAdd = false;
        for (let index = 0; index < this.datatable.length; index++) {
          if (
            this.editedItem.employee_id == this.datatable[index].employee_id
          ) {
            checkAdd = true;
          }
        }
        if (checkAdd == true) {
          alert("ไม่สามารถเพิ่มได้เนื่องจากมีข้อมูลในระบบแล้ว");
        } else {
          if (this.editedItem.role == "" || this.editedItem.role == undefined) {
            alert("กรุณากรอกข้อมูลให้ครบ");
          } else {
            var create_user = {
              employee_id: this.editedItem.employee_id,
              account_id: this.editedItem.account_id,
              first_name_th: this.editedItem.first_name_th,
              last_name_th: this.editedItem.last_name_th,
              title_th: this.editedItem.title_th,
              one_email: this.editedItem.one_email,
              nick_name_th: this.editedItem.nick_name_th,
              email: this.editedItem.email,
              tax_id: this.editedItem.tax_id,
              role: this.editedItem.role,
              sub_role: this.editedItem.sub_role,
              customer_no: this.customer_list_id,
            };

            this.axios
              .post(process.env.VUE_APP_API + "/user", create_user, headers)
              .then(() => {
                // if (response) {
                Swal.fire({
                  icon: "success",
                  title: "บันทึกข้อมูลเรียบร้อยแล้ว",
                  showConfirmButton: false,
                  timer: 1500,
                });
                // }
                this.close();
                this.initialize();
              })
              .catch((error) => {
                if (error) {
                  //this.$router.push("/invoice");
                  Swal.fire({
                    icon: "error",
                    title: "ไม่สามารถเพิ่มได้เนื่องจากมีข้อมูลในระบบแล้ว",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          }
        }
        // this.datatable.push(this.editedItem);
      }
    },
  },
};
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
#info_user {
  label.color_user {
    color: rgb(94, 94, 94);
    font-family: "Bai_Jamjuree" !important;
    font-size: 13px;
  }
}
label.header-text {
  font-size: 28px;
  font-family: "Bai_Jamjuree" !important;
  font-weight: 700;
}
#open-customer {
  th.text-start {
    // font-size: 13px;
    z-index: 5 !important;
    font-family: "Bai_Jamjuree" !important;
    background-color: rgb(193, 232, 255) !important;
    padding-top: 5px !important;
  }
  td.text-start {
    font-size: 13px;
    font-family: "Bai_Jamjuree" !important;
    padding-top: 5px !important;
    background-color: white !important;
    background: linear-gradient(
      90deg,
      rgba(253, 253, 253, 1) 99%,
      rgb(255, 255, 255) 100%
    ) !important;
  }
}
#modal-customer {
  th.text-start {
    font-family: "Bai_Jamjuree" !important;
    background-color: rgb(193, 232, 255) !important;
    padding-top: 5px !important;
    z-index: 5;
  }
  td.text-start {
    font-size: 12px;
    font-family: "Bai_Jamjuree" !important;
    padding-top: 5px !important;
    background-color: white !important;
    background: linear-gradient(
      90deg,
      rgba(253, 253, 253, 1) 99%,
      rgb(255, 255, 255) 100%
    ) !important;
  }
}

// .v-dialog {
//   margin-top: 25px !important;
// }
.v-dialog:not(.v-dialog--fullscreen) {
  margin-top: 10px;
  max-height: 80% !important;
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
.v-pagination {
  align-items: center;
  display: inline-flex;
  list-style-type: none;
  justify-content: flex-end !important;
  margin: 0;
  max-width: 100%;
  width: 100%;
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

::v-deep.sticky-header {
  position: sticky;
  top: var(--toolbarHeight);
}

::v-deep.v-data-table__wrapper {
  overflow: unset;
}
.fixed {
  position: sticky !important;
  left: 56px !important;
  top: auto !important;
  z-index: 1 !important;
  background-color: white !important;
  // border-right: 1px solid #cccccc;
  background: linear-gradient(
    90deg,
    rgba(253, 253, 253, 1) 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
}
fieldset {
  border: none;
}
.text-h5 {
  font-family: "Bai_Jamjuree" !important;
}
#manage-user {
  .cover-table {
    width: 100% !important;
    overflow: auto !important;
    font-family: "Bai_Jamjuree" !important;
  }
  .table-invoice {
    width: 100% !important;
    overflow: auto !important;
  }
  .table_in {
    background-position: center !important;
    background-repeat: no-repeat !important;
    font-family: "Bai_Jamjuree" !important;
    z-index: 10 !important;
    overflow: auto !important;
  }
  th.text-start {
    position: sticky !important;
    background-color: #ececec !important;
    z-index: 5 !important;
    padding-top: 10px !important;
    // padding-top: 20px;
  }
  th.text-start.sortable {
    position: sticky !important;
    left: 200px !important;
    z-index: 5 !important;
    // padding-top: 20px;
    padding-top: 10px !important;
    // padding-top: 20px;
  }
  th.text-center.sortable {
    background-color: #ececec !important;
    position: sticky !important;
    left: 200px !important;
    z-index: 5 !important;
  }
  th.text-start.manage.sortable {
    position: sticky !important;
    left: 0px !important;
    z-index: 6 !important;
    padding-top: 10px !important;
    // border-right: 1px solid #cccccc;
    // background-color: rgb(168, 255, 214) !important;
    background: linear-gradient(
      90deg,
      #ececec 99%,
      rgba(101, 101, 101, 1) 100%
    ) !important;
  }
  tbody {
    td {
      min-height: 48px;
    }
    td.text-start {
      position: relative !important;
      left: 0;
      top: auto;
      font-size: 13px;
      background-color: white;
      // border-right: 1px solid #cccccc;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgb(255, 255, 255) 100%
      ) !important;
    }
    td.text-center {
      font-size: 13px;
      position: relative !important;
      left: 0;
      top: auto;
      background-color: white;
      // border-right: 1px solid #cccccc;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgb(255, 255, 255) 100%
      ) !important;
    }
    td.text-start:first-child {
      font-size: 13px;
      position: sticky !important;
      width: 200px !important;
      left: 0 !important;
      z-index: 5 !important;
      // border-right: none !important;
      // border-right: 1px solid rgb(190, 190, 190);
      background: linear-gradient(
        90deg,
        #ffffff 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
  }
}

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
}
.v-card-title {
  font-family: "Bai_Jamjuree" !important;
}

@media (min-width: 960px) {
  .container {
    max-width: 100%;
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
    color: rgb(37, 37, 37) !important;
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
  .container {
    width: 100% !important;
    margin: 0;
    font-family: "Bai_Jamjuree" !important;
    background-color: rgb(250, 250, 250);
  }
  @media (min-width: 768px) {
    .container-md,
    .container-sm,
    .container {
      width: 100% !important;
      background-color: rgb(250, 250, 250);
    }
  }

  @media (min-width: 960px) {
    .container {
      max-width: 100%;
    }
  }
  @media only screen and (min-width: 401px) {
    .search-area {
      display: flex !important;
      width: 100% !important;
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
