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
            <h3 style="font-weight: 700">Invoice Dashboard</h3>
          </v-col>
          <v-col cols="3">
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
                      background-color: #14a1c0;
                    "
                    >mdi-file-alert-outline</v-icon
                  >
                  <label style="font-size: 1.2vw; text-align: right"
                    >Count Invoice</label
                  >
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
          <v-col cols="3">
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
                      background-color: #14a1c0;
                    "
                    >mdi-file-multiple-outline</v-icon
                  >
                  <label style="font-size: 1.2vw; text-align: right"
                    >Total Invoice</label
                  >
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

          <v-col cols="3">
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
                      background-color: #22cba1;
                    "
                    >mdi-file-table-box-outline</v-icon
                  >
                  <label style="font-size: 1.2vw; text-align: right"
                    >Amount</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div
                  style="font-size: 1.2vw; text-align: right; font-weight: 700"
                >
                  {{ sum_amount }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="3">
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
                      background-color: #22cba1;
                    "
                    >mdi-file-table-box-multiple-outline</v-icon
                  >
                  <label style="font-size: 1.2vw; text-align: right"
                    >Total Amount</label
                  >
                </div>
                <v-spacer></v-spacer>
                <div
                  style="font-size: 1.2vw; text-align: right; font-weight: 700"
                >
                  {{ total_amount }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title>
                <v-btn
                  outlined
                  color="indigo"
                  v-b-modal.modal-scrollable
                  style="font-size: 12px"
                >
                  <v-icon>mdi-format-list-bulleted-square</v-icon>
                  column
                </v-btn>
                <button
                  class="btn refresh-btn"
                  color="primary"
                  @click="refreshData()"
                  style="font-size: 12px"
                >
                  Refresh:<v-icon black style="font-size: 16px"
                    >mdi-refresh</v-icon
                  >
                </button>

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
                  @click="clearFilter"
                  class="screen"
                  style="font-size: 12px"
                >
                  Clear All</v-btn
                >
              </v-card-title>

              <v-card-text>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 7px;
                  "
                >
                  <div style="display: flex">
                    <v-dialog
                      v-model="dialog_select_list"
                      width="800"
                      style="z-index: 1002 !important"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          :disabled="selected_list.length == 0"
                          class="ma-1 ml-1 font-text"
                          color="primary"
                          outlined
                          v-bind="attrs"
                          v-on="on"
                          @click="search_selected_list = ''"
                        >
                          {{ selected_list.length }}
                          <v-icon right> mdi-checkbox-marked-circle </v-icon>
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="text-h5 gray lighten-2">
                          <div class="font-text">
                            Selected Data ({{ selected_list.length }})
                          </div>
                        </v-card-title>

                        <v-card-text style="padding: 0 24px 0px">
                          <v-text-field
                            v-model="search_selected_list"
                            append-icon="mdi-magnify"
                            label="search"
                            single-line
                            hide-details
                          ></v-text-field>

                          <v-data-table
                            class="mt-2 mb-1 font-text"
                            :headers="headers_selected"
                            :search="search_selected_list"
                            :items="selected_list"
                            :items-per-page="5"
                            id="selected_list_table"
                            height="280"
                            fixed-header
                            item-key="invoice_no"
                          >
                            <template v-slot:[`item.action`]="{ item }">
                              <v-icon medium @click="delete_selected_list(item)"
                                >mdi-close</v-icon
                              >
                            </template>
                          </v-data-table>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="
                              (dialog_select_list = false),
                                (search_selected_list = '')
                            "
                          >
                            close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-btn
                      color="primary"
                      @click="Export_Excel()"
                      style="width: 100px; font-size: 12px; font-weight: 600"
                      :disabled="selected.length == 0"
                      text
                    >
                      Export File
                      <!-- <v-icon dark> mdi-checkbox-marked-circle </v-icon> -->
                    </v-btn>
                    <div style="width: 10px"></div>
                    <v-btn
                      color="teal"
                      dark
                      style="width: 150px; font-size: 12px; font-weight: 600"
                      @click="Export_AllFile()"
                      text
                    >
                      <!-- @click="Export_AllFile()" -->
                      Export All File
                    </v-btn>
                    <div style="width: 10px"></div>
                    <v-dialog
                      v-model="dialog_export"
                      width="800"
                      persistent
                      style="z-index: 1002 !important"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="indigo"
                          v-bind="attrs"
                          v-on="on"
                          style="width: 170px; font-size: 12px; font-weight: 600"
                          text
                          @click="check_list('customer')"
                        >
                          Export by Customer
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="text-h5 indigo dark">
                          <div class="font-text-alert" style="color: white">
                            Invoice - Export File (by Customer)
                          </div>
                        </v-card-title>

                        <v-card-text>
                          <div>
                            <div
                              class="d-flex"
                              style="
                                justify-content: center;
                                align-items: baseline;
                              "
                            >
                              <v-col cols="4">
                                <v-text-field
                                  v-model="customer_search.customer_no"
                                  label="Cus No"
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
                                <div class="font-text-alert" style="color: red">
                                  {{ text_alert }}
                                </div>
                              </v-col>

                              <v-btn
                                class="font-text-alert"
                                depressed
                                color="primary"
                                @click="add_customer(customer_search)"
                                outlined
                                >เพิ่ม</v-btn
                              >
                            </div>
                            <v-data-table
                              :headers="headers_cus"
                              :items="customer_list"
                              class="table_in"
                              fixed-header
                              :items-per-page="5"
                              height="260px"
                              id="modal-customer"
                            >
                              <template v-slot:[`item.action`]="{ item }">
                                <v-icon medium @click="delete_customer(item)"
                                  >mdi-minus</v-icon
                                >
                              </template>
                            </v-data-table>
                          </div>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="error" text @click="close_export_cus()">
                            cancel
                          </v-btn>
                          <v-btn
                            color="primary"
                            text
                            @click="EXport_cus()"
                            :disabled="customer_list_id.length == 0"
                          >
                            Export
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <div style="width: 10px"></div>
                    <v-dialog
                      scrollable
                      v-model="dialog_edit_cus_no"
                      max-width="800px"
                      max-height="250px"
                      style="z-index: 1002 !important"
                      content-class="vdialognew"
                      persistent
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          :disabled="role_status == 'viewer' || role_status == 'down_service'"
                          color="primary"
                          dark
                          text
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                          @click="editedIndex = -1"
                          v-if="
                            role_status == 'super_admin' ||
                              role_status == 'admin' ||
                              role_status == 'wait_down_service'
                          "
                          style="width: 170px; font-size: 12px; font-weight: 600"
                        >
                          Edit by Customer No.
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
                            >Edit (by Customer No.)</span
                          >
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <div class="d-flex">
                                <v-text-field
                                  style="width: 50px"
                                  v-model="editedItem.customer_no"
                                  label="Customer No."
                                  @change="searchAddID(editedItem.customer_no)"
                                  :rules="rules"
                                  required
                                  :disabled="editedIndex !== -1"
                                ></v-text-field>
                                <div style="width: 10px"></div>
                                <v-text-field
                                  style="width: 400px"
                                  v-model="editedItem.customer_name"
                                  label="Customer Name"
                                  disabled
                                ></v-text-field>
                              </div>
                              <div style="width: 100%">
                                <!-- <v-btn
                                  color="red darken-1"
                                  dark 
                                  @click="add_column_edit()"
                                  :disabled="editedItem.customer_name == ''">
                                  Add column
                                </v-btn> -->

                                <v-autocomplete
                                  :disabled="editedItem.customer_name == ''"
                                  style="height: auto !important"
                                  clearable
                                  hide-selected
                                  v-model="searchInput"
                                  type="text"
                                  :items="list_customer_column"
                                  item-text="name"
                                  item-value="column"
                                  label="Column Edit"
                                  @change="customListCustomer()"
                                ></v-autocomplete>
                              </div>

                              <v-col cols="12">
                                <v-data-table
                                  :headers="headers_customer"
                                  :items="customer_edit"
                                  fixed-header
                                  height="200"
                                  hide-default-footer
                                  :items-per-page="50"
                                  style="overflow: auto"
                                  id="customer_edit_table"
                                >
                                  <template v-slot:[`item.value`]="{ item }">
                                    <div v-if="item.column == 'Cus Email'">
                                      <textarea-autosize
                                        class="form-control"
                                        placeholder="value"
                                        v-model="item.value"
                                        :min-height="48"
                                        :max-height="500000"
                                        :max-width="100"
                                        @blur.native="save_edit_cus_no()"
                                      />
                                    </div>

                                    <!-- <div v-if="item.column == 'Customer Criteria'">
                                      <select
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="save_edit_cus_no()"
                                      >
                                        <option value=""></option>
                                        <option value="01 - Normal">01 - Normal</option>
                                        <option value="02 - Critical">02 - Critical</option>
                                      </select>
                                    </div> -->

                                    <div v-if="item.column == 'ห้ามติดต่อ'">
                                      <select
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="select_edit_cus($event)"
                                      >
                                        <!-- ||
                            role_status !== 'user' -->
                                        <option value=""></option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'factoring'">
                                      <select
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="select_edit_cus($event)"
                                      >
                                        <option value=""></option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'Online Payment'">
                                      <select
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="save_edit_cus_no()"
                                      >
                                        <option value=""></option>
                                        <option value="Online Billing - Online Payment">Online Billing - Online Payment</option>
                                        <option value="Online Billing - Offline Payment">Online Billing - Offline Payment</option>
                                        <option value="Offline Billing - Online Payment">Offline Billing - Online Payment</option>
                                        <option value="Offline Billing - Offline Payment">Offline Billing - Offline Payment</option>
                                      </select>
                                    </div>

                                    <div
                                      v-if="
                                        item.column == 'ข้อมูลลูกค้า' ||
                                          item.column == 'หมายเหตุการวางบิล' ||
                                          item.column == 'หมายเหตุ Warroom'
                                      "
                                    >
                                      <textarea-autosize
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        class="form-control"
                                        placeholder="value"
                                        v-model="item.value"
                                        :min-height="48"
                                        :max-height="500000"
                                        :max-width="100"
                                        @blur.native="save_edit_cus_no()"
                                      />
                                    </div>

                                    <div
                                      v-if="
                                        item.column == 'วันที่วางบิล' ||
                                          item.column == 'กำหนดชำระ' ||
                                          item.column == 'วันที่ confirm' ||
                                          item.column == 'วันที่ดำเนินการ'
                                      "
                                      class="d-flex"
                                    >
                                      <input
                                        type="date"
                                        class="form-control"
                                        v-model="item.value"
                                        placeholder="Select Date"
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        @change="save_edit_cus_no()"
                                      />
                                      <button
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        v-bind:style="{
                                          display:
                                            role_status == 'viewer' ||
                                            role_status == 'down_service'
                                              ? 'none'
                                              : '',
                                        }"
                                        class="btn"
                                        style="font-size: 18px"
                                        @click="set_clear(item)"
                                      >
                                        x
                                      </button>
                                    </div>

                                    <div
                                      v-if="
                                        item.column == 'วันที่เงินเข้า'
                                      "
                                      class="d-flex"
                                    >
                                      <input
                                        type="date"
                                        class="form-control"
                                        v-model="item.value"
                                        placeholder="Select Date"
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service' ||
                                            role_status == 'admin' ||
                                            role_status == 'wait_down_service'
                                        "
                                        @change="save_edit_cus_no()"
                                      />
                                      <button
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service' ||
                                            role_status == 'admin' ||
                                            role_status == 'wait_down_service'
                                        "
                                        v-bind:style="{
                                          display:
                                            role_status == 'viewer' ||
                                            role_status == 'down_service' ||
                                            role_status == 'admin' ||
                                            role_status == 'wait_down_service'
                                              ? 'none'
                                              : '',
                                        }"
                                        class="btn"
                                        style="font-size: 18px"
                                        @click="set_clear(item)"
                                      >
                                        x
                                      </button>
                                    </div>

                                    <div v-if="item.column == 'วิธีวางบิล'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        @change="save_edit_cus_no()"
                                      >
                                        <option value=""></option>
                                        <option value="Messenger">
                                          Messenger
                                        </option>
                                        <option value="Mail+ปณ.">Mail+ปณ.</option>
                                        <option value="ปณ.">ปณ.</option>
                                        <option value="Mail">Mail</option>
                                        <option value="Sale">Sale</option>
                                        <option value="online payment"
                                          >online payment</option
                                        >
                                      </select>
                                    </div>
                                    <!-- คอลัมสถานะวางบิล -->
                                    <div v-if="item.column == 'สถานะวางบิล'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_cus_no()"
                                      >
                                        <option value=""></option>
                                        <option value="วางบิลแล้ว">
                                          วางบิลแล้ว
                                        </option>
                                        <option value="วางบิลไม่ได้">
                                          วางบิลไม่ได้
                                        </option>
                                      </select>
                                    </div>
                                    <!-- end -->
                                    <!-- คอลัมหมายเหตุสถานะวางบิล -->
                                    <div v-if="item.column == 'หมายเหตุสถานะวางบิล'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_cus_no()"
                                      >
                                        <option value=""></option>
                                        <option value="วางบิลหลังใช้">
                                          วางบิลหลังใช้
                                        </option>
                                        <option value="สัญญา">สัญญา</option>
                                        <option value="PO">PO</option>
                                        <option value="ส่งมอบงาน+Report">
                                          ส่งมอบงาน+Report
                                        </option>
                                        <option value="ลดหนี้เต็มจำนวน">ลดหนี้เต็มจำนวน</option>
                                        <option value="ลดหนี้บางส่วน">ลดหนี้บางส่วน</option>
                                        <option value="รอตรวจสอบการลดหนี้">รอตรวจสอบการลดหนี้</option>
                                        <option value="แก้ไขรายละเอียด">
                                          แก้ไขรายละเอียด
                                        </option>
                                        <option value="ออกหลังรอบวางบิล">ออกหลังรอบวางบิล</option>
                                        <option value="อื่นๆ">อื่นๆ</option>
                                      </select>
                                    </div>
                                    <!-- end -->
                                    <div
                                      v-if="item.column == 'วางบิลพร้อมใบเสร็จ'"
                                    >
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        @change="save_edit_cus_no()"
                                      >
                                        <option value=""></option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                      </select>
                                    </div>

                                    <div
                                      v-if="item.column == 'ช่องทางการชำระเงิน'"
                                    >
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_cus_no()"
                                      >
                                        <option value=""></option>
                                        <option value="BBL205">BBL205</option>
                                        <option value="BBL785">BBL785</option>
                                        <option value="BBL156">BBL156</option>
                                        <option value="BBL522">BBL522</option>
                                        <option value="BAY993">BAY993</option>
                                        <option value="BAY778">BAY778</option>
                                        <option value="BAY601">BAY601</option>
                                        <option value="BAY973">BAY973</option>
                                        <option value="BAY684">BAY684</option>
                                        <option value="CIMB854">CIMB854</option>
                                        <option value="CIMB745">CIMB745</option>
                                        <option value="Bill Payment - SCB">
                                          Bill Payment - SCB
                                        </option>
                                        <option value="Bill Payment - KBANK">
                                          Bill Payment - KBANK
                                        </option>
                                        <option value="Bill Payment - BBL">
                                          Bill Payment - BBL
                                        </option>
                                        <option value="CHQ">CHQ</option>
                                        <option value="FACTORING">
                                          FACTORING
                                        </option>
                                        <option value="GSB505">GSB505</option>
                                        <option value="GSB491">GSB491</option>
                                        <option value="KKP412">KKP412</option>
                                        <option value="KKP756">KKP756</option>
                                        <option value="KBANK579">KBANK579</option>
                                        <option value="KBANK861">KBANK861</option>
                                        <option value="KTB395">KTB395</option>
                                        <option value="KTB926">KTB926</option>
                                        <option value="KTB569">KTB569</option>
                                        <option value="KTB694">KTB694</option>
                                        <option value="KTB034">KTB034</option>
                                        <option value="KTB184">KTB184</option>
                                        <option value="KTB728">KTB728</option>
                                        <option value="KBANK035">KBANK035</option>
                                        <option value="KBANK199">KBANK199</option>
                                        <option value="KTB856">KTB856</option>
                                        <option value="QR CODE">QR CODE</option>
                                        <option value="SCB376">SCB376</option>
                                        <option value="SCB750">SCB750</option>
                                        <option value="SCB540">SCB540</option>
                                        <option value="SCB009">SCB009</option>
                                        <option value="TMB958">TMB958</option>
                                        <option value="TTB174">TTB174</option>
                                        <option value="TTB958">TTB958</option>
                                        <option value="TTB907">TTB907</option>
                                        <option value="TTB553">TTB553</option>
                                        <option value="TBANK064">TBANK064</option>
                                        <option value="Offset">Offset</option>
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'สถานะเก็บเงิน'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_cus_no()"
                                      >
                                        <option value=""></option>
                                        <option value="สัญญา">สัญญา</option>
                                        <option value="PO">PO</option>
                                        <option value="ส่งมอบงาน+Report">
                                          ส่งมอบงาน+Report
                                        </option>
                                        <option value="ลดหนี้">ลดหนี้</option>
                                        <option value="ชำระได้">ชำระได้</option>
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'Mainstatus'">
                                      <select
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_cus_no()"
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                      >
                                        <!-- <datalist id="browsers_column"> -->
                                        <option value=""></option>
                                        <option value="เลื่อนครั้งที่ 1">เลื่อนครั้งที่ 1</option>
                                        <option value="รอออกหนังสือทวงหนี้ครั้งที่ 1">รอออกหนังสือทวงหนี้ครั้งที่ 1</option>
                                        <option value="รอออกหนังสือทวงหนี้ครั้งที่ 2">รอออกหนังสือทวงหนี้ครั้งที่ 2</option>
                                        <option disabled value="หนังสือทวงหนี้ครั้งที่ 1">หนังสือทวงหนี้ครั้งที่ 1</option>
                                        <option disabled value="หนังสือทวงหนี้ครั้งที่ 2">หนังสือทวงหนี้ครั้งที่ 2</option>
                                        <option value="หนังสือทวงหนี้อื่นๆ">หนังสือทวงหนี้อื่นๆ</option>
                                        <option disabled value="ปิดระบบ">ปิดระบบ</option>
                                        <option disabled value="รอปิดระบบ">รอปิดระบบ</option>
                                        <option value="ผ่อนชำระ">ผ่อนชำระ</option>
                                        <option disabled value="เตรียมส่งดำเนินคดี">เตรียมส่งดำเนินคดี</option>
                                        <option value="ส่งดำเนินคดี">ส่งดำเนินคดี</option>
                                        <option value="เตรียมตัดหนี้สูญ">เตรียมตัดหนี้สูญ</option>
                                        <option value="ตัดหนี้สูญ">ตัดหนี้สูญ</option>
                                        <option value="ระงับการส่งดำเนินคดีชั่วคราว">ระงับการส่งดำเนินคดีชั่วคราว</option>
                                        <!-- </datalist> -->
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'Recheck'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                      @change="save_edit_cus_no()"
                                        :disabled="
                                          item.invoice_no == 'BOI-64-10015479' ||
                                            role_status == 'down_service' ||
                                            role_status == 'viewer'
                                        "
                                      >
                                        <option value=""></option>
                                        <option :disabled="role_status == 'admin'" value="ไม่เข้าจริง">ไม่เข้าจริง</option>
                                        <option :disabled="role_status == 'admin'" value="เข้าจริง">เข้าจริง</option>
                                        <option value="Confirm CHQ">Confirm CHQ</option>
                                      </select>                                
                                    </div>

                                    <div v-if="item.column == 'สถานะการชำระเงิน'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                      @change="save_edit_cus_no()"
                                        :disabled="
                                          item.invoice_no == 'BOI-64-10015479' ||
                                            role_status == 'down_service' ||
                                            role_status == 'viewer'
                                        "
                                      >
                                        <option value=""></option>
                                        <option :disabled="role_status == 'admin'" value="Paid">Paid</option>
                                        <option :disabled="role_status == 'admin'" value="Partial">Partial</option>
                                        <option :disabled="role_status == 'admin'" value="ลดหนี้เต็มจำนวน">ลดหนี้เต็มจำนวน</option>
                                        <option :disabled="role_status == 'admin'" value="ลดหนี้บางส่วน">ลดหนี้บางส่วน</option>
                                      </select>                                
                                    </div>

                                  </template>
                                </v-data-table>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="close_edit_cus_no()"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="save_confirm_api()"
                            :disabled="send_edit == null"
                          >
                            <!-- :disabled="
                              editedItem.customer_name == '' ||
                              this.searchInput == null
                            " -->
                            save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <div style="width: 10px"></div>
                    <v-dialog
                      scrollable
                      v-model="dialog_edit_invoice_no"
                      max-width="800px"
                      max-height="250px"
                      style="z-index: 1002 !important"
                      content-class="vdialognew"
                      persistent
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          :disabled="
                            role_status == 'viewer' || role_status == 'down_service' || selected_list.length == 0
                          "
                          color="purple"
                          text
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                          @click="(editedIndex = -1), open_edit_by_invoice()"
                          v-if="
                            role_status == 'super_admin' ||
                              role_status == 'admin' ||
                              role_status == 'wait_down_service'
                          "
                          style="width: 170px; font-size: 12px; font-weight: 600"
                        >
                          Edit by Invoice No.
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
                            >Edit (by Invoice No.)</span
                          >
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <!-- <div class="d-flex">
                                <v-text-field
                                  style="width: 50px"
                                  v-model="editedItem.customer_no"
                                  label="Customer No."
                                  @change="searchAddID(editedItem.customer_no)"
                                  :rules="rules"
                                  required
                                  :disabled="editedIndex !== -1"
                                ></v-text-field>
                                <div style="width: 10px"></div>
                                <v-text-field
                                  style="width: 400px"
                                  v-model="editedItem.customer_name"
                                  label="Customer Name"
                                  disabled
                                ></v-text-field>
                              </div> -->
                              <div style="width: 100%">
                                <!-- <v-btn
                                  color="red darken-1"
                                  dark 
                                  @click="add_column_edit()"
                                  :disabled="editedItem.customer_name == ''">
                                  Add column
                                </v-btn> -->

                                <v-autocomplete
                                  :disabled="selected_list.length == 0"
                                  style="height: auto !important"
                                  clearable
                                  hide-selected
                                  v-model="searchInput_invoice_no"
                                  type="text"
                                  :items="list_customer_column"
                                  item-text="name"
                                  item-value="column"
                                  label="Column Edit"
                                  @change="customListCustomer_invoice()"
                                ></v-autocomplete>
                              </div>

                              <v-col cols="12">
                                <v-data-table
                                  :headers="headers_customer"
                                  :items="customer_edit_invoice"
                                  fixed-header
                                  height="200"
                                  hide-default-footer
                                  :items-per-page="50"
                                  style="overflow: auto"
                                  id="customer_edit_table"
                                >
                                  <template v-slot:[`item.value`]="{ item }">
                                    <div v-if="item.column == 'Cus Email'">
                                      <textarea-autosize
                                        class="form-control"
                                        placeholder="value"
                                        v-model="item.value"
                                        :min-height="48"
                                        :max-height="500000"
                                        :max-width="100"
                                        @blur.native="save_edit_invoice_no()"
                                      />
                                    </div>

                                    <!-- <div v-if="item.column == 'Customer Criteria'">
                                      <select
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="save_edit_invoice_no()"
                                      >
                                        <option value=""></option>
                                        <option value="01 - Normal">01 - Normal</option>
                                        <option value="02 - Critical">02 - Critical</option>
                                      </select>
                                    </div> -->

                                    <div v-if="item.column == 'ห้ามติดต่อ'">
                                      <select
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="select_edit_invoice($event)"
                                      >
                                        <!-- ||
                            role_status !== 'user' -->
                                        <option value=""></option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'factoring'">
                                      <select
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="select_edit_invoice($event)"
                                      >
                                        <option value=""></option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'Online Payment'">
                                      <select
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="save_edit_invoice_no()"
                                      >
                                        <option value=""></option>
                                        <option value="Online Billing - Online Payment">Online Billing - Online Payment</option>
                                        <option value="Online Billing - Offline Payment">Online Billing - Offline Payment</option>
                                        <option value="Offline Billing - Online Payment">Offline Billing - Online Payment</option>
                                        <option value="Offline Billing - Offline Payment">Offline Billing - Offline Payment</option>
                                      </select>
                                    </div>

                                    <div
                                      v-if="
                                        item.column == 'ข้อมูลลูกค้า' ||
                                          item.column == 'หมายเหตุการวางบิล' ||
                                          item.column == 'หมายเหตุ Warroom'
                                      "
                                    >
                                      <textarea-autosize
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        class="form-control"
                                        placeholder="value"
                                        v-model="item.value"
                                        :min-height="48"
                                        :max-height="500000"
                                        :max-width="100"
                                        @blur.native="save_edit_invoice_no()"
                                      />
                                    </div>

                                    <div
                                      v-if="
                                        item.column == 'วันที่วางบิล' ||
                                          item.column == 'กำหนดชำระ' ||
                                          item.column == 'วันที่ confirm' ||
                                          item.column == 'วันที่ดำเนินการ'
                                      "
                                      class="d-flex"
                                    >
                                      <input
                                        type="date"
                                        class="form-control"
                                        v-model="item.value"
                                        placeholder="Select Date"
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        @change="save_edit_invoice_no()"
                                      />
                                      <button
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        v-bind:style="{
                                          display:
                                            role_status == 'viewer' ||
                                            role_status == 'down_service'
                                              ? 'none'
                                              : '',
                                        }"
                                        class="btn"
                                        style="font-size: 18px"
                                        @click="set_clear_invoice(item)"
                                      >
                                        x
                                      </button>
                                    </div>

                                    <div
                                      v-if="
                                        item.column == 'วันที่เงินเข้า'
                                      "
                                      class="d-flex"
                                    >
                                      <input
                                        type="date"
                                        class="form-control"
                                        v-model="item.value"
                                        placeholder="Select Date"
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service' ||
                                            role_status == 'admin' ||
                                            role_status == 'wait_down_service'
                                        "
                                        @change="save_edit_invoice_no()"
                                      />
                                      <button
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service' ||
                                            role_status == 'admin' ||
                                            role_status == 'wait_down_service'
                                        "
                                        v-bind:style="{
                                          display:
                                            role_status == 'viewer' ||
                                            role_status == 'down_service' ||
                                            role_status == 'admin' ||
                                            role_status == 'wait_down_service'
                                              ? 'none'
                                              : '',
                                        }"
                                        class="btn"
                                        style="font-size: 18px"
                                        @click="set_clear_invoice(item)"
                                      >
                                        x
                                      </button>
                                    </div>

                                    <div v-if="item.column == 'วิธีวางบิล'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        @change="save_edit_invoice_no()"
                                      >
                                        <option value=""></option>
                                        <option value="Messenger">
                                          Messenger
                                        </option>
                                        <option value="Mail+ปณ.">Mail+ปณ.</option>
                                        <option value="ปณ.">ปณ.</option>
                                        <option value="Mail">Mail</option>
                                        <option value="Sale">Sale</option>
                                        <option value="online payment"
                                          >online payment</option
                                        >
                                      </select>
                                    </div>
                                    <!-- คอลัมสถานะวางบิล -->
                                    <div v-if="item.column == 'สถานะวางบิล'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_invoice_no()"
                                      >
                                        <option value=""></option>
                                        <option value="วางบิลแล้ว">
                                          วางบิลแล้ว
                                        </option>
                                        <option value="วางบิลไม่ได้">
                                          วางบิลไม่ได้
                                        </option>
                                      </select>
                                    </div>
                                    <!-- end -->
                                    <!-- คอลัมหมายเหตุสถานะวางบิล -->
                                    <div v-if="item.column == 'หมายเหตุสถานะวางบิล'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_invoice_no()"
                                      >
                                        <option value=""></option>
                                        <option value="วางบิลหลังใช้">
                                          วางบิลหลังใช้
                                        </option>
                                        <option value="สัญญา">สัญญา</option>
                                        <option value="PO">PO</option>
                                        <option value="ส่งมอบงาน+Report">
                                          ส่งมอบงาน+Report
                                        </option>
                                        <option value="ลดหนี้เต็มจำนวน">ลดหนี้เต็มจำนวน</option>
                                        <option value="ลดหนี้บางส่วน">ลดหนี้บางส่วน</option>
                                        <option value="รอตรวจสอบการลดหนี้">รอตรวจสอบการลดหนี้</option>
                                        <option value="แก้ไขรายละเอียด">
                                          แก้ไขรายละเอียด
                                        </option>
                                        <option value="ออกหลังรอบวางบิล">ออกหลังรอบวางบิล</option>
                                        <option value="อื่นๆ">อื่นๆ</option>
                                      </select>
                                    </div>
                                    <!-- end -->
                                    <div v-if="item.column == 'สถานะเก็บเงิน'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_invoice_no()"
                                      >
                                        <option value=""></option>
                                        <option value="สัญญา">สัญญา</option>
                                        <option value="PO">PO</option>
                                        <option value="ส่งมอบงาน+Report">
                                          ส่งมอบงาน+Report
                                        </option>
                                        <option value="ลดหนี้">ลดหนี้</option>
                                        <option value="ชำระได้">ชำระได้</option>
                                      </select>
                                    </div>

                                    <div
                                      v-if="item.column == 'วางบิลพร้อมใบเสร็จ'"
                                    >
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="
                                          role_status == 'viewer' ||
                                            role_status == 'down_service'
                                        "
                                        @change="save_edit_invoice_no()"
                                      >
                                        <option value=""></option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                      </select>
                                    </div>

                                    <div
                                      v-if="item.column == 'ช่องทางการชำระเงิน'"
                                    >
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_invoice_no()"
                                      >
                                        <option value=""></option>
                                        <option value="BBL205">BBL205</option>
                                        <option value="BBL785">BBL785</option>
                                        <option value="BBL156">BBL156</option>
                                        <option value="BBL522">BBL522</option>
                                        <option value="BAY993">BAY993</option>
                                        <option value="BAY778">BAY778</option>
                                        <option value="BAY601">BAY601</option>
                                        <option value="BAY973">BAY973</option>
                                        <option value="BAY684">BAY684</option>
                                        <option value="CIMB854">CIMB854</option>
                                        <option value="CIMB745">CIMB745</option>
                                        <option value="Bill Payment - SCB">
                                          Bill Payment - SCB
                                        </option>
                                        <option value="Bill Payment - KBANK">
                                          Bill Payment - KBANK
                                        </option>
                                        <option value="Bill Payment - BBL">
                                          Bill Payment - BBL
                                        </option>
                                        <option value="CHQ">CHQ</option>
                                        <option value="FACTORING">
                                          FACTORING
                                        </option>
                                        <option value="GSB505">GSB505</option>
                                        <option value="GSB491">GSB491</option>
                                        <option value="KKP412">KKP412</option>
                                        <option value="KKP756">KKP756</option>
                                        <option value="KBANK579">KBANK579</option>
                                        <option value="KBANK861">KBANK861</option>
                                        <option value="KTB395">KTB395</option>
                                        <option value="KTB926">KTB926</option>
                                        <option value="KTB569">KTB569</option>
                                        <option value="KTB694">KTB694</option>
                                        <option value="KTB034">KTB034</option>
                                        <option value="KTB184">KTB184</option>
                                        <option value="KTB728">KTB728</option>
                                        <option value="KBANK035">KBANK035</option>
                                        <option value="KBANK199">KBANK199</option>
                                        <option value="KTB856">KTB856</option>
                                        <option value="QR CODE">QR CODE</option>
                                        <option value="SCB376">SCB376</option>
                                        <option value="SCB750">SCB750</option>
                                        <option value="SCB540">SCB540</option>
                                        <option value="SCB009">SCB009</option>
                                        <option value="TMB958">TMB958</option>
                                        <option value="TTB174">TTB174</option>
                                        <option value="TTB958">TTB958</option>
                                        <option value="TTB907">TTB907</option>
                                        <option value="TTB553">TTB553</option>
                                        <option value="TBANK064">TBANK064</option>
                                        <option value="Offset">Offset</option>
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'Mainstatus'">
                                      <select
                                        :disabled="role_status == 'viewer' || role_status == 'down_service'"
                                        @change="save_edit_invoice_no()"
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                      >
                                        <option value=""></option>
                                        <option value="เลื่อนครั้งที่ 1">เลื่อนครั้งที่ 1</option>
                                        <option value="รอออกหนังสือทวงหนี้ครั้งที่ 1">รอออกหนังสือทวงหนี้ครั้งที่ 1</option>
                                        <option value="รอออกหนังสือทวงหนี้ครั้งที่ 2">รอออกหนังสือทวงหนี้ครั้งที่ 2</option>
                                        <option disabled value="หนังสือทวงหนี้ครั้งที่ 1">หนังสือทวงหนี้ครั้งที่ 1</option>
                                        <option disabled value="หนังสือทวงหนี้ครั้งที่ 2">หนังสือทวงหนี้ครั้งที่ 2</option>
                                        <option value="หนังสือทวงหนี้อื่นๆ">หนังสือทวงหนี้อื่นๆ</option>
                                        <option disabled value="ปิดระบบ">ปิดระบบ</option>
                                        <option disabled value="รอปิดระบบ">รอปิดระบบ</option>
                                        <option value="ผ่อนชำระ">ผ่อนชำระ</option>
                                        <option value="เตรียมส่งดำเนินคดี">เตรียมส่งดำเนินคดี</option>
                                        <option value="ส่งดำเนินคดี">ส่งดำเนินคดี</option>
                                        <option value="เตรียมตัดหนี้สูญ">เตรียมตัดหนี้สูญ</option>
                                        <option value="ตัดหนี้สูญ">ตัดหนี้สูญ</option>
                                        <option value="ระงับการส่งดำเนินคดีชั่วคราว">ระงับการส่งดำเนินคดีชั่วคราว</option>
                                      </select>
                                    </div>

                                    <div v-if="item.column == 'Recheck'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="save_edit_invoice_no()"
                                        :disabled="
                                          item.invoice_no == 'BOI-64-10015479' ||
                                            role_status == 'down_service' ||
                                            role_status == 'viewer'
                                        "
                                      >
                                        <option value=""></option>
                                        <option :disabled="role_status == 'admin'" value="ไม่เข้าจริง">ไม่เข้าจริง</option>
                                        <option :disabled="role_status == 'admin'" value="เข้าจริง">เข้าจริง</option>
                                        <option value="Confirm CHQ">Confirm CHQ</option>
                                      </select>                                   
                                    </div>

                                    <div v-if="item.column == 'สถานะการชำระเงิน'">
                                      <select
                                        class="style-chooser form-control"
                                        v-model="item.value"
                                        @change="save_edit_invoice_no()"
                                        :disabled="
                                          item.invoice_no == 'BOI-64-10015479' ||
                                            role_status == 'down_service' ||
                                            role_status == 'viewer'
                                        "
                                      >
                                        <option value=""></option>
                                        <option :disabled="role_status == 'admin'" value="Paid">Paid</option>
                                        <option :disabled="role_status == 'admin'" value="Partial">Partial</option>
                                        <option :disabled="role_status == 'admin'" value="ลดหนี้เต็มจำนวน">ลดหนี้เต็มจำนวน</option>
                                        <option :disabled="role_status == 'admin'" value="ลดหนี้บางส่วน">ลดหนี้บางส่วน</option>
                                      </select>                                   
                                    </div>
                                  </template>
                                </v-data-table>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            color="blue darken-1"
                            text
                            @click="close_edit_invoice_no()"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="save_confirm_api_invoice()"
                            :disabled="send_edit == null"
                          >
                            save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog
                      scrollable
                      v-model="dialog_send"
                      max-width="800px"
                      max-height="270px"
                      style="z-index: 1002 !important"
                      content-class="vdialognew"
                      id="modal_invoice_preview"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          :disabled="
                            role_status == 'viewer' || role_status == 'down_service' || selected_list.length == 0
                          "
                          color="primary"
                          text
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                          @click="editedIndex = -1"
                          v-if="
                            role_status == 'super_admin' ||
                              role_status == 'admin' ||
                              role_status == 'wait_down_service'
                          "
                          style="width: 140px; font-size: 12px; font-weight: 600"
                        >
                          Send Request
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title
                          class="text-h5 gray lighten-2"
                          style="padding-bottom: 0px"
                        >
                          <div
                            style="
                              width: 100%;
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                            class="font-text"
                          >
                            <div>Request Data ({{ selected_list.length }})</div>

                            <div
                              class="d-flex"
                              style="
                                padding-left: 15px;
                                align-items: center;
                                justify-content: center;
                                width: 400;
                              "
                            >
                              <div style="width: 160px; font-size: 14px">
                                เลือกเอกสาร :
                              </div>
                              <select
                                class="style-chooser form-control"
                                v-model="select_type_send"
                              >
                                <option value=""></option>
                                <option value="ใบแจ้งหนี้">ใบแจ้งหนี้</option>
                                <option value="ใบเสร็จ">ใบเสร็จ</option>
                                <option value="แจ้งเตือนติดตามการชำระ"
                                  >แจ้งเตือนติดตามการชำระ</option
                                >
                                <option value="เอกสาร WHT">เอกสาร WHT</option>
                              </select>
                            </div>
                          </div>
                        </v-card-title>

                        <v-card-text style="padding: 0 24px 0px">
                          <v-text-field
                            v-model="search_selected_list"
                            append-icon="mdi-magnify"
                            label="search"
                            single-line
                            hide-details
                          ></v-text-field>

                          <v-data-table
                            v-if="select_type_send != 'ใบเสร็จ'"
                            class="mt-2 mb-1 font-text"
                            :headers="headers_request"
                            :search="search_selected_list"
                            :items="selected_list"
                            :items-per-page="5"
                            id="selected_list_table_r"
                            height="270"
                            fixed-header
                            item-key="invoice_no"
                          >
                            <template v-slot:[`item.action`]="{ item }">
                              <v-btn
                                color="primary"
                                text
                                class="mb-2"
                                @click="preview_data(item)"
                              >
                                Preview
                              </v-btn>
                            </template>
                          </v-data-table>

                          <v-data-table
                            v-else
                            class="mt-2 mb-1 font-text"
                            :headers="headers_request2"
                            :search="search_selected_list"
                            :items="selected_list_rv"
                            :items-per-page="5"
                            id="selected_list_table_r"
                            height="270"
                            fixed-header
                            item-key="invoice_no"
                          >
                            <template v-slot:[`item.sendreceipt`]="{ item }">
                              <div id="filter_rv">
                                <v-autocomplete
                                  v-if="item.list != ''"
                                  v-model="item.sendreceipt"
                                  type="text"
                                  label="เลขที่ใบเสร็จ"
                                  :items="item.list"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </div>
                            </template>

                            <template v-slot:[`item.sendreceipt_action`]="{ item }">
                              <label v-if="item.sendreceipt == 'เลขที่ใบเสร็จ'">{{item.receipt_number}}</label>
                              <label v-if="item.sendreceipt == 'เลขที่ตัดหนี้'">{{item.rv_number}}</label>
                            </template>

                            <template v-slot:[`item.action`]="{ item }">
                              <v-btn
                                color="primary"
                                text
                                class="mb-2"
                                @click="preview_data(item)"
                              >
                                Preview
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="
                              (dialog_send = false),
                                (search_selected_list = ''),
                                (select_type_send = '')
                            "
                          >
                            close
                          </v-btn>
                          <v-btn
                            color="primary"
                            @click="send_request()"
                            :disabled="select_type_send == ''"
                          >
                            send request
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <div style="width: 10px"></div>
                    <v-btn
                      color="primary"
                      @click="bank_statement(selected_list)"
                      style="width: 140px; font-size: 12px; font-weight: 600"
                      text
                      :disabled="role_status == 'viewer' || role_status == 'down_service' || selected_list.length == 0 || check_bank_statement == false"
                      v-if="
                          role_status == 'super_admin' ||
                          role_status == 'admin' ||
                          role_status == 'wait_down_service'
                      "

                    >
                      Bank Statement
                    </v-btn>

                    <v-dialog
                      v-model="dialog_preview"
                      fullscreen
                      hide-overlay
                      transition="dialog-bottom-transition"
                    >
                      <v-card>
                        <v-toolbar dark color="primary">
                          <v-toolbar-title class="font-text">
                            <div
                              class="d-flex"
                              style="font-family: 'Bai_Jamjuree' !important"
                            >
                              <div>PREVIEW - Invoice No : &nbsp;</div>
                              <div style="color: #f8eb82">
                                {{ send_invoice_no.invoice_no }}
                              </div>
                            </div></v-toolbar-title
                          >
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                            <v-btn
                              icon
                              dark
                              @click="
                                (dialog_preview = false),
                                  (send_invoice_no = ''),
                                  (pdf = '')
                              "
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-toolbar-items>
                        </v-toolbar>

                        <v-card-text v-if="role_status == 'viewer'">
                          <vue-pdf-app
                            v-bind:style="{
                              display: pdf == '' ? 'none' : '',
                            }"
                            style="height: 100vh"
                            :pdf="pdf"
                            :file-name="send_invoice_no.invoice_no"
                            :config="config2"
                          ></vue-pdf-app>
                        </v-card-text>
                        <v-card-text v-else>
                          <vue-pdf-app
                            v-bind:style="{
                              display: pdf == '' ? 'none' : '',
                            }"
                            style="height: 100vh"
                            :pdf="pdf"
                            :file-name="send_invoice_no.invoice_no"
                            :config="config"
                          ></vue-pdf-app>
                        </v-card-text>

                        <!-- <Preview preview="123"></Preview> -->
                      </v-card>
                    </v-dialog>
                  </div>
                  <!-- -------------------------------------column---------------------------------------- -->
                  <b-modal
                    class="modal_column font-text-alert"
                    id="modal-scrollable"
                    title="Set Column"
                    style="width: 500px; !important"
                    @ok="Add_column()"
                    @cancel="cancel_colunm()"
                    data-backdrop="static"
                    no-close-on-backdrop
                  >
                    <div>
                      <v-data-table
                        :headers="headers_modal"
                        :items="column_name"
                        fixed-header
                        height="480"
                        hide-default-footer
                        :items-per-page="50"
                        style="overflow: auto"
                      >
                        <template v-slot:[`item.show`]="{ item }">
                          <v-simple-checkbox
                            :disabled="
                              item.name == 'Invoice Number' ||
                                item.name == 'Aging' ||
                                item.name == 'Preview' ||
                                item.name == 'Detail'
                            "
                            :ripple="false"
                            v-model="item.show"
                            @input="select_column($event, item)"
                          ></v-simple-checkbox>
                        </template>
                        <!-- <template v-slot:[`item.fixed`]="{ item }">
                          <v-simple-checkbox
                            :disabled="item.name == 'Invoice Number'"
                            :ripple="false"
                            v-model="item.fixed"
                          ></v-simple-checkbox>
                        </template> -->
                      </v-data-table>
                    </div>
                    <!-- <div class="d-flex" style="width: 100%">
                      <b-button variant="outline-secondary" @click="cancel_colunm()"> Reset </b-button>
                      <div style="width: 10px"></div>
                      <b-button variant="success" @click="Add_column()"> OK </b-button>
                    </div> -->
                  </b-modal>
                  <!-- ---------------------------------end column---------------------------------------- -->

                  <!-- <div
                    id="invoice-select-debt"
                    class="d-flex"
                    style="align-items: center"
                  >
                    <div
                      style="width: 240px; align-items: center"
                      class="d-flex"
                    ></div>
                    <div style="width: 100px">
                      <label style="font-size: 12px; float: right"
                        >data show : {{ datalist.length }}</label
                      >
                    </div>
                  </div> -->
                </div>
                <!-- --------------------------------------table--------------------------------------------- -->
                <div class="cover-table">
                  <div class="table-invoice" style="position: relative">
                    <v-data-table
                      :headers="column_select"
                      :items="datalist"
                      :items-per-page="number_INC()"
                      :hide-default-footer="true"
                      show-select
                      :single-select="singleSelect"
                      v-model="selected"
                      class="table_in"
                      fixed-header
                      height="600px"
                      item-key="invoice_no"
                      id="invoice_table_1_main"
                      @input="select($event)"
                    >
                      <!-- ----------------------------------Filter ------------------------------------------------------ -->
                      <template v-slot:[`body.prepend`]>
                        <tr id="filter">
                          <td class="blank"></td>
                          <td class="fixed-invoice">
                            <v-autocomplete
                              clearable
                              dense
                              multiple
                              v-model="invoice_no"
                              type="text"
                              :items="invoice_list"
                              label="invoice number"
                              @change="filter(invoice_no, String('invoice_no'))"
                            ></v-autocomplete>
                            <!-- :items="listfilter_data(datalist, 'invoice_no')" -->
                          </td>
                          <td v-if="column_name[1].show == true">
                            <!-- <v-autocomplete
                              clearable
                              dense
                              multiple
                              v-model="customer_no"
                              type="text"
                              label="Cus no."
                              :items="listfilter_data(datalist, 'customer_no')"
                              @change="filter(customer_no, String('customer_no'))"
                            ></v-autocomplete> -->
                            <input
                              v-model="customer_no"
                              class="form-control"
                              @change="filter(customer_no, String('customer_no'))"
                              placeholder="Cus no."
                              :disabled="customer_no_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('customer_no')"
                                v-model="customer_no_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td>
                          <td v-if="column_name[2].show == true">
                            <v-autocomplete
                              multiple
                              clearable
                              dense
                              :search-input.sync="search_customer_name"
                              v-model="customer_name"
                              type="text"
                              label="Cus Name"
                              :items="customer_name_list"
                              @change="
                                filter(customer_name, String('customer_name'))
                              "
                            ></v-autocomplete>
                          
                          </td>

                          <td v-if="column_name[3].show == true">
                            <v-autocomplete
                              clearable
                              multiple
                              v-model="customer_criteria"
                              type="text"
                              label="Customer Criteria"
                              :items="customer_criteria_list"
                              @change="filter(customer_criteria, String('customer_criteria'))"
                              auto-select-first
                              dense
                              item-text="name"
                            ></v-autocomplete>
                          </td>

                          <td v-if="column_name[4].show == true">
                            <v-autocomplete
                              clearable
                              multiple
                              v-model="no_contact"
                              type="text"
                              label="no_contact"
                              :items="no_contact_list"
                              @change="filter(no_contact, String('no_contact'))"
                              auto-select-first
                              dense
                              item-text="name"
                            ></v-autocomplete>
                          </td>
                        
                          <td v-if="column_name[5].show == true">
                            <v-autocomplete
                              v-model="factoring"
                              type="text"
                              label="factoring"
                              :items="factoring_filter"
                              @change="filter(factoring, String('factoring'))"
                              auto-select-first
                              dense
                              item-text="name"
                              multiple
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[6].show == true">
                            <v-autocomplete
                              v-model="online_payment"
                              type="text"
                              label="Online Payment"
                              :items="online_filter"
                              @change="
                                filter(online_payment, String('online_payment'))
                              "
                              auto-select-first
                              dense
                              item-text="name"
                              multiple
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[7].show == true">
                            <!-- <v-text-field
                              v-model="so_number"
                              type="text"
                              label="so_number"
                              @change="filter(so_number, String('so_number'))"
                            ></v-text-field> -->
                            <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              multiple
                              v-model="so_number"
                              type="text"
                              label="So number"
                              :items="so_number_list"
                              @change="filter(so_number, String('so_number'))"
                            ></v-autocomplete>
                          </td>

                          <!-- -------------------- end Modal end_date-------------------------------------- -->
                          <td v-if="column_name[8].show == true">
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_invoice_date"
                              label="invoice_date"
                              placeholder="Invoice Date"
                              v-b-modal.modal-center-invoice-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @click="dialog_invoice_date = true" -->
                            <!-- @change="
                                filter(invoice_date, String('invoice_date'))
                              " -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-invoice_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-invoice-date"
                                centered
                                hide-footer
                                title="Invoice Date"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(
                                      invoice_date_range,
                                      'invoice_date'
                                    )
                                  "
                                  v-model="invoice_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('invoice_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('invoice_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('invoice_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                            <!-- ==============================invoice dialog===================================== -->

                            <!-- ==============================end invoice dialog===================================== -->
                          </td>

                          <td v-if="column_name[9].show == true">
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_start_date"
                              placeholder="วันที่เริ่มรอบใบแจ้งหนี้ "
                              v-b-modal.modal-center-start-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @click="dialog = true" -->
                            <!-- --------------------Modal Start_Date-------------------------------------- -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-start_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-start-date"
                                centered
                                hide-footer
                                title="วันที่เริ่มรอบใบแจ้งหนี้ "
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(start_date_range, 'start_date')
                                  "
                                  v-model="start_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('start_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('start_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('start_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                            <!-- --------------------end Modal Start_Date-------------------------------------- -->
                          </td>
                          <td v-if="column_name[10].show == true">
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_end_date"
                              label="end_date"
                              placeholder="วันสิ้นสุดรอบใบแจ้งหนี้ "
                              v-b-modal.modal-center-end-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @click="dialog_end = true" -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-end_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-end-date"
                                centered
                                hide-footer
                                title="วันสิ้นสุดรอบใบแจ้งหนี้ "
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(end_date_range, 'end_date')
                                  "
                                  v-model="end_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('end_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('end_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('end_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                          </td>
                          <!-- --------------------Modal end_date-------------------------------------- -->

                          <td v-if="column_name[11].show == true">
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_so_end_date"
                              placeholder="วันที่สิ้นสุดสัญญา "
                              v-b-modal.modal-center-so-end-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @click="dialog = true" -->
                            <!-- --------------------Modal So_end_Date-------------------------------------- -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-so_end_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-so-end-date"
                                centered
                                hide-footer
                                title="วันที่สิ้นสุดสัญญา "
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(so_end_date_range, 'so_end_date')
                                  "
                                  v-model="so_end_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('so_end_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('so_end_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('so_end_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                            <!-- --------------------end Modal So_end_Date-------------------------------------- -->
                          </td>

                          <td v-if="column_name[12].show == true">
                            <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              v-model="finance_name"
                              type="text"
                              multiple
                              label="ชื่อการเงิน"
                              :items="emptyFinance"
                              @change="
                                filter(finance_name, String('finance_name'))
                              "
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[13].show == true">
                            <!-- <v-text-field
                              v-model="over_due"
                              type="text"
                              label="over due"
                              @change="filter(over_due, String('over_due'))"
                            ></v-text-field> -->
                            <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              v-model="over_due"
                              type="text"
                              multiple
                              label="over due"
                              :items="over_due_list"
                              @change="filter(over_due, String('over_due'))"
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[14].show == true">
                            <input
                              class="form-control"
                              v-model="amount_after_vat"
                              type="number"
                              min="0"
                              placeholder="Amount"
                              @change="
                                filter(
                                  amount_after_vat,
                                  String('amount_after_vat')
                                )
                              "
                              :disabled="amount_after_vat_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('amount_after_vat')"
                                v-model="amount_after_vat_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td>
                          <td v-if="column_name[15].show == true">
                            <v-autocomplete
                              auto-select-first
                              multiple
                              dense
                              v-model="aging_1"
                              type="text"
                              label="Aging"
                              :items="aging_list"
                              @change="filter(aging_1, String('aging'))"
                              item-text="name"
                            ></v-autocomplete>
                          </td>

                          <!-- ปิดคอลัม Sales Representative -->
                          <!-- <td v-if="column_name[18].show == true"> -->
                          <!--// <v-text-field 
                              v-model="sale_name"
                              type="text"
                              label="sale Representative"
                              @change="filter(sale_name, String('sale_name'))"
                            ></v-text-field> //-->
                          <!-- <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              multiple
                              v-model="sale_name"
                              type="text"
                              label="sale Representative"
                              :items="sale_name_list"
                              @change="filter(sale_name, String('sale_name'))"
                            ></v-autocomplete>
                          </td> -->
                          <!-- สิ้นสุด -->

                          <!-- ปิดคอลัม Sale Team -->
                          <!-- <td v-if="column_name[19].show == true"> -->
                          <!--// <v-text-field
                              v-model="sale_team"
                              type="text"
                              label="sale team"
                              @change="filter(sale_team, String('sale_team'))"
                            ></v-text-field> //-->
                          <!-- <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              v-model="sale_team"
                              type="text"
                              multiple
                              label="Sale team"
                              :items="sale_team_list"
                              @change="filter(sale_team, String('sale_team'))"
                            ></v-autocomplete>
                          </td> -->
                          <!-- สิ้นสุด -->

                          <!-- ปิดคอลัม ข้อมูลลูกค้า -->
                          <!-- <td v-if="column_name[20].show == true">
                            <input
                              v-model="customer_info"
                              class="form-control"
                              @change="
                                filter(customer_info, String('customer_info'))
                              "
                              placeholder="ข้อมูลลูกค้า"
                              :disabled="customer_info_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('customer_info')"
                                v-model="customer_info_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td> -->
                          <!-- สิ้นสุด -->

                          <td v-if="column_name[16].show == true">
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_date_bill"
                              label="date_bill"
                              placeholder="วันที่วางบิล"
                              v-b-modal.modal-center-date-bill
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @click="dialog_date_bill = true" -->
                            <!-- ==============================date_bill dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-date_bill"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-date-bill"
                                centered
                                hide-footer
                                title="วันที่วางบิล"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(date_bill_range, 'date_bill')
                                  "
                                  v-model="date_bill_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('date_bill')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('date_bill')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('date_bill')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>

                            <!-- ==============================end date_bill dialog===================================== -->
                          </td>
                          <td v-if="column_name[17].show == true">
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="billing_type_detail"
                              type="text"
                              label="วิธีวางบิล"
                              :items="[
                                '[blank]',
                                'Messenger',
                                'Mail+ปณ.',
                                'ปณ.',
                                'Mail',
                                'Sale',
                                'online payment',
                              ]"
                              @change="
                                filter(
                                  billing_type_detail,
                                  String('billing_type_detail')
                                )
                              "
                            ></v-autocomplete>
                          </td>
                          <!-- filter สถานะวางบิล -->
                          <td v-if="column_name[18].show == true">
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="billing_status"
                              type="text"
                              label="สถานะวางบิล"
                              :items="billing_status_select"
                              @change="
                                filter(billing_status, String('billing_status'))
                              "
                            ></v-autocomplete>
                          </td>
                          <!-- filter หมายเหตุสถานะวางบิล -->
                          <td v-if="column_name[19].show == true">
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="billing_status_remark"
                              type="text"
                              label="หมายเหตุสถานะวางบิล"
                              :items="billing_status_remark_select"
                              @change="
                                filter(billing_status_remark, String('billing_status_remark'))
                              "
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[20].show == true">
                          <!-- <td v-if="column_name[18].show == true"> -->
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="billing_checking"
                              type="text"
                              label="วางบิลพร้อมใบเสร็จ"
                              item-text="name"
                              :items="billing_after_checking_list"
                              @change="
                                filter(
                                  billing_checking,
                                  String('billing_checking')
                                )
                              "
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[21].show == true">
                          <!-- <td v-if="column_name[19].show == true"> -->
                            <input
                              class="form-control"
                              v-model="billing_remark"
                              type="text"
                              placeholder="หมายเหตุการวางบิล"
                              @change="
                                filter(billing_remark, String('billing_remark'))
                              "
                              :disabled="billing_remark_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('billing_remark')"
                                v-model="billing_remark_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td>
                          <td v-if="column_name[22].show == true">
                          <!-- <td v-if="column_name[20].show == true"> -->
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="status_payment"
                              type="text"
                              label="สถานะเก็บเงิน"
                              :items="[
                                '[blank]',
                                'สัญญา',
                                'PO',
                                'ส่งมอบงาน+Report',
                                'ลดหนี้',
                                'ชำระได้',
                              ]"
                              @change="
                                filter(status_payment, String('status_payment'))
                              "
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[23].show == true">
                          <!-- <td v-if="column_name[21].show == true"> -->
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_estimate_date"
                              label="estimate_date"
                              placeholder="กำหนดชำระ"
                              v-b-modal.modal-center-estimate-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @click="dialog_estimate_date = true" -->
                            <!-- @change="
                                filter(estimate_date, String('estimate_date'))
                              " -->
                            <!-- ==============================estimate_date dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-estimate_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-estimate-date"
                                centered
                                hide-footer
                                title="กำหนดชำระ"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(
                                      estimate_date_range,
                                      'estimate_date'
                                    )
                                  "
                                  v-model="estimate_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('estimate_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('estimate_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('estimate_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>

                            <!-- ==============================end estimate_date dialog===================================== -->
                          </td>
                          <td v-if="column_name[24].show == true">
                          <!-- <td v-if="column_name[23].show == true"> -->
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_confirm_date"
                              label="confirm_date"
                              placeholder="วันที่ confirm"
                              v-b-modal.modal-center-confirm-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @click="dialog_confirm_date = true" -->
                            <!-- ==============================confirm_date dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-confirm_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-confirm-date"
                                centered
                                hide-footer
                                title="วันที่ confirm"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(
                                      confirm_date_range,
                                      'confirm_date'
                                    )
                                  "
                                  v-model="confirm_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('confirm_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('confirm_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('confirm_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>

                            <!-- ==============================end confirm_date dialog===================================== -->
                          </td>
                          <td v-if="column_name[25].show == true">
                          <!-- <td v-if="column_name[22].show == true"> -->
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_incoming_paid_date"
                              label="incoming_paid_date"
                              placeholder="วันที่เงินเข้า"
                              v-b-modal.modal-center-incoming-paid-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @click="dialog_confirm_date = true" -->
                            <!-- ==============================incoming_paid_date dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-incoming_paid_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-incoming-paid-date"
                                centered
                                hide-footer
                                title="วันที่เงินเข้า"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(
                                      incoming_paid_date_range,
                                      'incoming_paid_date'
                                    )
                                  "
                                  v-model="incoming_paid_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('incoming_paid_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('incoming_paid_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('incoming_paid_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>

                            <!-- ==============================end incoming_paid_date dialog===================================== -->
                          </td>
                          <td v-if="column_name[26].show == true">
                          <!-- <td v-if="column_name[24].show == true"> -->
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="payment_type"
                              type="text"
                              label="ช่องทางการชำระเงิน"
                              :items="payment_select"
                              @change="
                                filter(payment_type, String('payment_type'))
                              "
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[27].show == true">
                          <!-- <td v-if="column_name[25].show == true"> -->
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="paid"
                              type="text"
                              label="Mainstatus"
                              :items="paid_mainstatus"
                              @change="filter(paid, String('paid'))"
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[28].show == true">
                          <!-- <td v-if="column_name[26].show == true"> -->
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="recheck"
                              type="text"
                              label="Recheck"
                              :items="recheck_list"
                              @change="filter(recheck, String('recheck'))"
                            ></v-autocomplete>
                          </td>
                          
                          <td v-if="column_name[29].show == true">
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="status_recheck"
                              type="text"
                              label="สถานะการชำระเงิน"
                              :items="status_recheck_list"
                              @change="filter(status_recheck, String('status_recheck'))"
                            ></v-autocomplete>
                          </td>
                          
                          <!-- add column ส่งตัดหนี้ -->
                          <td v-if="column_name[30].show == true">
                          <!-- <td v-if="column_name[27].show == true"> -->
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="cut_debt"
                              type="text"
                              label="ส่งตัดหนี้"
                              :items="write_off_debt_list"
                              @change="filter(cut_debt, String('cut_debt'))"
                            ></v-autocomplete>
                          </td>
                          <!-- end -->
                          <!-- add column Status Cash Collection -->
                          <!-- <td v-if="column_name[31].show == true">
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="base_adjust"
                              type="text"
                              label="Status Cash Collection"
                              :items="status_cash_collection_list"
                              @change="filter(base_adjust, String('base_adjust'))"
                            ></v-autocomplete>
                          </td> -->
                          <!-- end -->
                          <!-- add column Aging Cash Collection -->
                          <!-- <td v-if="column_name[32].show == true">
                            <v-autocomplete
                              auto-select-first
                              dense
                              multiple
                              v-model="aging_cash"
                              type="text"
                              label="Aging Cash Collection"
                              :items="aging_cash_collection_list"
                              @change="filter(aging_cash, String('aging_cash'))"
                            ></v-autocomplete>
                          </td> -->
                          <!-- end -->
                          <!-- <td v-if="column_name[33].show == true">
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_paid_date"
                              label="Mainstatus date"
                              placeholder="Mainstatus date"
                              v-b-modal.modal-center-paid-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />

                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-paid_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-paid-date"
                                centered
                                hide-footer
                                title="Mainstatus date"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(paid_date_range, 'paid_date')
                                  "
                                  v-model="paid_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('paid_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('paid_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('paid_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                          </td> -->

                          <td v-if="column_name[31].show == true">
                          <!-- <td v-if="column_name[31].show == true"> -->
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_asking_payment_date"
                              label="asking_payment_date"
                              placeholder="วันที่ดำเนินการ"
                              v-b-modal.modal-center-asking_payment-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- ==============================asking_payment_date dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-asking_payment_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-asking_payment-date"
                                centered
                                hide-footer
                                title="วันที่ดำเนินการ"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(
                                      asking_payment_date_range,
                                      'asking_payment_date'
                                    )
                                  "
                                  v-model="asking_payment_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('asking_payment_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('asking_payment_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="
                                        OkFilterModal('asking_payment_date')
                                      "
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                            <!-- ==============================end asking_payment_date dialog===================================== -->
                          </td>
                          <td v-if="column_name[32].show == true">
                          <!-- <td v-if="column_name[32].show == true"> -->
                            <input
                              class="form-control"
                              v-model="remain_day"
                              type="text"
                              placeholder="ระยะเวลาคงเหลือ"
                              @change="filter(remain_day, String('remain_day'))"
                              :disabled="remain_day_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('remain_day')"
                                v-model="remain_day_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td>
                          <td v-if="column_name[33].show == true">
                          <!-- <td v-if="column_name[33].show == true"> -->
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_memo_date_one"
                              label="memo_date_one"
                              placeholder="MEMO Date ครั้งที่ 1"
                              v-b-modal.modal-center-memo_date_one-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- @change="
                                filter(memo_date_one, String('memo_date_one'))
                              " -->
                            <!-- ==============================memo_date_one dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-memo_date_one"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-memo_date_one-date"
                                centered
                                hide-footer
                                title="MEMO Date ครั้งที่ 1"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(
                                      memo_date_one_range,
                                      'memo_date_one'
                                    )
                                  "
                                  v-model="memo_date_one_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('memo_date_one')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('memo_date_one')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('memo_date_one')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                            <!-- ==============================end memo_date_one dialog===================================== -->
                          </td>
                          <td v-if="column_name[34].show == true">
                          <!-- <td v-if="column_name[34].show == true"> -->
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_memo_date_two"
                              label="memo_date_two"
                              placeholder="MEMO Date ครั้งที่ 2"
                              v-b-modal.modal-center-memo_date_two-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- ==============================memo_date_two dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-memo_date_two"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-memo_date_two-date"
                                centered
                                hide-footer
                                title="MEMO Date ครั้งที่ 2"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(
                                      memo_date_two_range,
                                      'memo_date_two'
                                    )
                                  "
                                  v-model="memo_date_two_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('memo_date_two')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('memo_date_two')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('memo_date_two')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                            <!-- ==============================end memo_date_two dialog===================================== -->
                          </td>
                          <td v-if="column_name[35].show == true">
                          <!-- <td v-if="column_name[35].show == true"> -->
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_memo_date_three"
                              label="memo_date_three"
                              placeholder="MEMO Date ครั้งที่ 3"
                              v-b-modal.modal-center-memo_date_three-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- ==============================memo_date_three dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-memo_date_three"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-memo_date_three-date"
                                centered
                                hide-footer
                                title="MEMO Date ครั้งที่ 3"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(
                                      memo_date_three_range,
                                      'memo_date_three'
                                    )
                                  "
                                  v-model="memo_date_three_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('memo_date_three')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('memo_date_three')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('memo_date_three')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                            <!-- ==============================end memo_date_three dialog===================================== -->
                          </td>
                          <td v-if="column_name[36].show == true">
                          <!-- <td v-if="column_name[36].show == true"> -->
                            <input
                              v-model="debt_reduction_docno"
                              class="form-control"
                              @change="filter(debt_reduction_docno, String('debt_reduction_docno'))"
                              placeholder="เลขที่เอกสารลดหนี้"
                              :disabled="debt_reduction_docno_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('debt_reduction_docno')"
                                v-model="debt_reduction_docno_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td>

                          <td v-if="column_name[37].show == true">
                          <!-- <td v-if="column_name[36].show == true"> -->
                            <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              v-model="reissue_status"
                              type="text"
                              multiple
                              label="สถานะออกใหม่"
                              :items="reissue_status_list"
                              @change="filter(reissue_status, String('reissue_status'))"
                            ></v-autocomplete>
                            <!-- <input
                              v-model="reissue_status"
                              class="form-control"
                              @change="filter(reissue_status, String('reissue_status'))"
                              placeholder="สถานะออกใหม่"
                              :disabled="reissue_status_blank == true"
                            /> -->
                            <!-- <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('reissue_status')"
                                v-model="reissue_status_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div> -->
                          </td>

                          <td v-if="column_name[38].show == true">
                          <!-- <td v-if="column_name[36].show == true"> -->
                            <input
                              v-model="cn_number"
                              class="form-control"
                              @change="filter(cn_number, String('cn_number'))"
                              placeholder="เลขที่ลดหนี้"
                              :disabled="cn_number_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('cn_number')"
                                v-model="cn_number_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td>
                          <!-- filter CN10 -->
                          <!-- <td v-if="column_name[38].show == true"> -->
                          <!-- <td v-if="column_name[37].show == true">
                            <input
                              v-model="cn_ten"
                              class="form-control"
                              @change="filter(cn_ten, String('cn_ten'))"
                              placeholder="CN10"
                              :disabled="cn_ten_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('cn_ten')"
                                v-model="cn_ten_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td> -->
                          <!-- end -->
                          <!-- <td v-if="column_name[37].show == true"> -->
                          <td v-if="column_name[39].show == true">                        
                            <input
                              v-model="rv_number"
                              class="form-control"
                              @change="filter(rv_number, String('rv_number'))"
                              placeholder="เลขที่ตัดหนี้"
                              :disabled="rv_number_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('rv_number')"
                                v-model="rv_number_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td>
                          <!-- <td v-if="column_name[38].show == true"> -->
                          <td v-if="column_name[40].show == true">
                            <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              v-model="receipt_number"
                              type="text"
                              multiple
                              label="เลขที่ใบเสร็จ"
                              :items="receipt_number_list"
                              @change="
                                filter(receipt_number, String('receipt_number'))
                              "
                            ></v-autocomplete>
                          </td>
                          <td v-if="column_name[41].show == true">
                            <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              v-model="incoming_status"
                              type="text"
                              multiple
                              label="สถานะใบเสร็จ"
                              :items="incoming_status_list"
                              @change="
                                filter(incoming_status, String('incoming_status'))
                              "
                            ></v-autocomplete>
                          </td>
                          <!-- <td v-if="column_name[39].show == true"> -->
                          <td v-if="column_name[42].show == true">
                            <input
                              class="form-control"
                              v-model="remark_warroom"
                              type="text"
                              placeholder="หมายเหตุ warroom"
                              @change="
                                filter(remark_warroom, String('remark_warroom'))
                              "
                              :disabled="remark_warroom_blank == true"
                            />
                            <div class="d-flex">
                              <input
                                type="checkbox"
                                @change="blank_checkbox('remark_warroom')"
                                v-model="remark_warroom_blank"
                              />
                              <div style="font-size: 10px">[blank]</div>
                            </div>
                          </td>
                          <!-- <td v-if="column_name[40].show == true"> -->
                          <td v-if="column_name[43].show == true">
                            <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              v-model="user_name"
                              type="text"
                              multiple
                              label="User"
                              :items="user_name_list"
                              @change="filter(user_name, String('user_name'))"
                            ></v-autocomplete>
                          </td>
                          <!-- <td v-if="column_name[41].show == true"> -->
                          <td v-if="column_name[44].show == true">
                            <input
                              class="form-control"
                              type="text"
                              v-model="text_remark_date"
                              label="remark_date"
                              placeholder="วันที่หมายเหตุ"
                              v-b-modal.modal-center-remark-date
                              data-backdrop="static"
                              data-keyboard="false"
                            />
                            <!-- ==============================remark_date dialog===================================== -->
                            <div>
                              <b-modal
                                class="dialog_date"
                                ref="my-modal-remark_date"
                                data-backdrop="static"
                                no-close-on-backdrop
                                id="modal-center-remark-date"
                                centered
                                hide-footer
                                title="วันที่หมายเหตุ"
                              >
                                <cv-date-picker
                                  placeholder="dd/mm/yyyy"
                                  light
                                  kind="range"
                                  :date-end-label="dateEndLabel"
                                  :cal-options="calOptions"
                                  @change="
                                    actionChange(remark_date_range, 'remark_date')
                                  "
                                  v-model="remark_date_range"
                                >
                                </cv-date-picker>

                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-link"
                                    style="margin-top: 14px"
                                    @click="blankModal('remark_date')"
                                  >
                                    [Blank]
                                  </button>
                                  <div style="width: 160px"></div>
                                  <div class="d-flex">
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-danger"
                                      @click="hideModal('remark_date')"
                                      >Cancel</b-button
                                    >
                                    <div style="width: 10px"></div>
                                    <b-button
                                      data-dismiss="modal"
                                      class="mt-3"
                                      variant="outline-primary"
                                      @click="OkFilterModal('remark_date')"
                                      >OK</b-button
                                    >
                                  </div>
                                </div>
                              </b-modal>
                            </div>
                            <!-- ==============================end remark_date dialog===================================== -->
                          </td>
                          <!-- <td v-if="column_name[42].show == true"></td> -->
                          <td v-if="column_name[45].show == true"></td>
                          <td v-if="column_name[46].show == true && role_status != 'viewer'"></td>
                          <!-- <td v-if="column_name[45].show == true"></td> -->
                        </tr>
                      </template>
                      <!-- class="fixed" -->
                      <!-- -------------------------------------End Filter------------------------------------------------------------- -->

                      <!-- <template v-slot:[`item.data-table-select`]="{ item }">
                        <v-checkbox 
                        v-model="selected"
                        :value="item.uid"
                      :ripple="false"
                        @change="select_list_invoice($event)"
                        ></v-checkbox>
                        </template> -->

                      <template
                        v-slot:[`item.invoice_no`]="{ item }"
                        class="fixed"
                      >
                        {{ item.invoice_no }}
                      </template>
                      <template v-slot:[`item.status_inv`]="{ item }">
                        <v-chip dark>
                          {{ item.status_inv }}
                        </v-chip>
                      </template>
                      <template v-slot:[`item.factoring`]="{ item }">
                        <select
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                          class="style-chooser form-control"
                          v-model="item.factoring"
                          @change="factoringChange($event, item)"
                          style="text-align: center"
                        >
                          <!-- ||
                            role_status !== 'user' -->
                          <option value=""></option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </template>

                      <template v-slot:[`item.online_payment`]="{ item }">
                        <select
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                          class="style-chooser form-control"
                          v-model="item.online_payment"
                          @change="select_1($event, item)"
                          style="text-align: center"
                        >
                          <option value=""></option>
                          <option value="Online Billing - Online Payment">Online Billing - Online Payment</option>
                          <option value="Online Billing - Offline Payment">Online Billing - Offline Payment</option>
                          <option value="Offline Billing - Online Payment">Offline Billing - Online Payment</option>
                          <option value="Offline Billing - Offline Payment">Offline Billing - Offline Payment</option>
                        </select>
                      </template>
                      <!-- <template v-slot:[`item.customer_criteria`]="{ item }">
                        <select
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                          class="style-chooser form-control"
                          v-model="item.customer_criteria"
                          @change="select_1($event, item)"
                          style="text-align: center"
                        >
                          <option value=""></option>
                          <option value="01 - Normal">01 - Normal</option>
                          <option value="02 - Critical">02 - Critical</option>
                        </select>
                      </template> -->
                      <template v-slot:[`item.customer_email`]="{ item }">
                        <textarea-autosize
                          class="form-control"
                          placeholder="Customer Email"
                          v-model="item.customer_email"
                          :min-height="48"
                          :max-height="500000"
                          :max-width="100"
                          style="
                            width: 100%;
                            margin-top: 10px;
                            padding: 5px;
                            border: 1px solid rgb(224, 224, 224);
                            border-radius: 1px;
                          "
                          @blur.native="select_1($event, item)"
                        />
                      </template>
                      <template v-slot:[`item.no_contact`]="{ item }">
                        <select
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                          class="style-chooser form-control"
                          v-model="item.no_contact"
                          @change="no_contact_Change($event, item)"
                        >
                          <!-- ||
                            role_status !== 'user' -->
                          <option value=""></option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </template>
                      <template v-slot:[`item.so_end_date`]="{ item }">                   
                        <label v-if="parseDate(item.so_end_date) != '0001/01/01'">
                          {{ parseDate(item.so_end_date) }}</label
                        >
                      </template>
                      <template v-slot:[`item.start_date`]="{ item }">                 
                        <label v-if="parseDate(item.start_date) != '0001/01/01'">
                          {{ parseDate(item.start_date) }}</label
                        >
                      </template>
                      <template v-slot:[`item.end_date`]="{ item }">
                        {{ parseDate(item.end_date) }}
                      </template>
                      <template v-slot:[`item.invoice_date`]="{ item }">
                        {{ parseDate(item.invoice_date) }}
                      </template>
                      <template v-slot:[`item.amount_after_vat`]="{ item }">
                        <v-chip
                          style="z-index: 1"
                          :color="getColor(item.amount_after_vat)"
                          dark
                        >
                          {{ calculateAmount(item.amount_after_vat) }}
                        </v-chip>
                      </template>
                      <template v-slot:[`item.aging`]="{ item }">
                        <v-chip
                          style="z-index: 1"
                          color="green"
                          text-color="white"
                        >
                          {{ aging(item) }}
                        </v-chip>
                      </template>
                      <template v-slot:[`item.customer_info`]="{ item }">
                        <textarea-autosize
                          class="form-control"
                          placeholder="ข้อมูลลูกค้า"
                          v-model="item.customer_info"
                          :min-height="48"
                          :max-height="500000"
                          :max-width="100"
                          style="
                            width: 100%;
                            margin-top: 10px;
                            padding: 5px;
                            border: 1px solid rgb(224, 224, 224);
                            border-radius: 1px;
                          "
                          @blur.native="select_1($event, item)"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                        />
                      </template>
                      <template v-slot:[`item.date_bill`]="{ item }">
                        <div class="d-flex">
                          <input
                            @click="opendatebill(item)"
                            type="text"
                            class="form-control"
                            :value="return_confirm_date(item.date_bill)"
                            placeholder="Select Date"
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'viewer' ||
                                role_status == 'down_service'
                            "
                          />
                          <button
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'viewer' ||
                                role_status == 'down_service'
                            "
                            v-bind:style="{
                              display:
                                role_status == 'viewer' || role_status == 'down_service'
                                  ? 'none'
                                  : '',
                            }"
                            class="btn"
                            style="font-size: 18px"
                            @click="clearDate('date_bill', item)"
                          >
                            x
                          </button>
                        </div>

                        <!-- {{ item.date_bill }} -->
                      </template>

                      <template v-slot:[`item.billing_type_detail`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.billing_type_detail"
                          @change="select_1($event, item)"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                        >
                          <option value=""></option>
                          <option value="Messenger">Messenger</option>
                          <option value="Mail+ปณ.">Mail+ปณ.</option>
                          <option value="ปณ.">ปณ.</option>
                          <option value="Mail">Mail</option>
                          <option value="Sale">Sale</option>
                          <option value="online payment">online payment</option>
                        </select>
                      </template>
                      <!-- แบบใหม่ -->
                      <template v-slot:[`item.billing_status`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.billing_status"
                          @change="select_2($event, item)"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                        >
                          <option value=""></option>
                          <option value="วางบิลแล้ว">
                            วางบิลแล้ว
                          </option>
                          <option value="วางบิลไม่ได้">
                            วางบิลไม่ได้
                          </option>
                        </select>
                      </template>
                      <!-- end -->
                      <!-- เพิ่มคอลัมน์หมายเหตุสถานะวางบิล  -->
                      <template v-slot:[`item.billing_status_remark`]="{ item }">
                        <div v-if="item.billing_status == 'วางบิลไม่ได้' && item.billing_status_remark == ''">
                          <select
                            style="border-color: #FF5252;"
                            class="style-chooser form-control"
                            v-model="item.billing_status_remark"
                            @change="select_1($event, item)"
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'viewer' ||
                                role_status == 'down_service'
                            "
                          >
                            <option value=""></option>
                            <option value="วางบิลหลังใช้">
                              วางบิลหลังใช้
                            </option>
                            <option value="สัญญา">สัญญา</option>
                            <option value="PO">PO</option>
                            <option value="ส่งมอบงาน+Report">
                              ส่งมอบงาน+Report
                            </option>
                            <option value="ลดหนี้เต็มจำนวน">ลดหนี้เต็มจำนวน</option>
                            <option value="ลดหนี้บางส่วน">ลดหนี้บางส่วน</option>
                            <option value="รอตรวจสอบการลดหนี้">รอตรวจสอบการลดหนี้</option>
                            <option value="แก้ไขรายละเอียด">
                              แก้ไขรายละเอียด
                            </option>
                            <option value="ออกหลังรอบวางบิล">ออกหลังรอบวางบิล</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                          </select>
                        </div>
                        <div v-else>
                          <select
                            class="style-chooser form-control"
                            v-model="item.billing_status_remark"
                            @change="select_1($event, item)"
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'viewer' ||
                                role_status == 'down_service'
                            "
                          >
                            <option value=""></option>
                            <option value="วางบิลหลังใช้">
                              วางบิลหลังใช้
                            </option>
                            <option value="สัญญา">สัญญา</option>
                            <option value="PO">PO</option>
                            <option value="ส่งมอบงาน+Report">
                              ส่งมอบงาน+Report
                            </option>
                            <option value="ลดหนี้เต็มจำนวน">ลดหนี้เต็มจำนวน</option>
                            <option value="ลดหนี้บางส่วน">ลดหนี้บางส่วน</option>
                            <option value="รอตรวจสอบการลดหนี้">รอตรวจสอบการลดหนี้</option>
                            <option value="แก้ไขรายละเอียด">
                              แก้ไขรายละเอียด
                            </option>
                            <option value="ออกหลังรอบวางบิล">ออกหลังรอบวางบิล</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                          </select>
                        </div>
                      </template>
                      <!-- end -->
                      <template v-slot:[`item.billing_checking`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.billing_checking"
                          @change="select_1($event, item)"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                        >
                          <option value=""></option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </template>

                      <template v-slot:[`item.billing_remark`]="{ item }">
                        <b-textarea
                          placeholder="หมายเหตุการวางบิล"
                          v-model="item.billing_remark"
                          rows="2"
                          max-rows="5"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                          @change="select_1($event, item)"
                        ></b-textarea>
                      </template>

                      <!-- <template v-slot:[`item.estimate_date`]="{ item }">
                        <div class="d-flex">
                          <input
                            @click="set_default(item, 'estimate_date')"
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'user'
                            "
                            type="date"
                            class="form-control"
                            placeholder="dd/mm/yyyy"
                            v-model="item.estimate_date"
                            @change="select_1($event, item)"
                          />
                          <button
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'user'
                            "
                            v-bind:style="{
                              display:
                                role_status == 'viewer' || role_status == 'user'
                                  ? 'none'
                                  : '',
                            }"
                            class="btn"
                            style="font-size: 18px"
                            @click="clearDate('estimate_date', item)"
                          >
                            x
                          </button>
                        </div>
                      </template> -->

                      <template v-slot:[`item.estimate_date`]="{ item }">
                        <div class="d-flex">
                          <input
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'viewer' ||
                                role_status == 'down_service'
                            "
                            type="text"
                            class="form-control"
                            :value="return_confirm_date(item.estimate_date)"
                            placeholder="Select Date"
                            @change="select_1($event, item)"
                            @click="openestimatedate(item)"
                          />
                          <button
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'down_service' ||
                                role_status == 'viewer'
                            "
                            v-bind:style="{
                              display:
                                role_status == 'down_service' || role_status == 'viewer'
                                  ? 'none'
                                  : '',
                            }"
                            class="btn"
                            style="font-size: 18px"
                            @click="clearDate('estimate_date', item)"
                          >
                            x
                          </button>
                        </div>
                      </template>

                      <template v-slot:[`item.confirm_date`]="{ item }">
                        <div class="d-flex">
                          <!-- @click="set_default(item, 'confirm_date')" -->
                          <input
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'down_service' ||
                                role_status == 'viewer' || 
                                (item.paid == 'ผ่อนชำระ' &&
                                  role_status !== 'super_admin' && role_status !== 'admin' && role_status !== 'wait_down_service')
                            "
                            type="text"
                            class="form-control"
                            :value="return_confirm_date(item.confirm_date)"
                            placeholder="Select Date"
                            @change="select_1($event, item)"
                            @click="openconfirm(item)"
                          />
                          <button
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'down_service' ||
                                role_status == 'viewer' ||
                                (item.paid == 'ผ่อนชำระ' &&
                                  role_status !== 'super_admin')
                            "
                            v-bind:style="{
                              display:
                                role_status == 'down_service' || role_status == 'viewer'
                                  ? 'none'
                                  : '',
                            }"
                            class="btn"
                            style="font-size: 18px"
                            @click="clearDate('confirm_date', item)"
                          >
                            x
                          </button>
                        </div>
                      </template>

                      <!--
                      <template v-slot:[`item.incoming_paid_date`]="{ item }">
                        <div class="d-flex">
                          <input
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'down_service' ||
                                role_status == 'viewer' || 
                                (item.paid == 'ผ่อนชำระ' &&
                                  role_status !== 'super_admin' && role_status !== 'admin' && role_status !== 'wait_down_service')
                            "
                            @click="set_default(item, 'incoming_paid_date')"
                            type="date"
                            class="form-control"
                            v-model="item.incoming_paid_date"
                            placeholder="dd/mm/yyyy"
                            @change="select_1($event, item)"
                          />
                          <button
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'down_service' ||
                                role_status == 'viewer' ||
                                (item.paid == 'ผ่อนชำระ' &&
                                  role_status !== 'super_admin')
                            "
                            v-bind:style="{
                              display:
                                role_status == 'down_service' || role_status == 'viewer'
                                  ? 'none'
                                  : '',
                            }"
                            class="btn"
                            style="font-size: 18px"
                            @click="clearDate('incoming_paid_date', item)"
                          >
                            x
                          </button>
                        </div>
                      </template>
                      -->

                      <template v-slot:[`item.incoming_paid_date`]="{ item }">
                        <div class="d-flex">
                          <input
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'down_service' ||
                                role_status == 'viewer' ||
                                role_status == 'admin' ||
                                role_status == 'wait_down_service' || 
                                (item.paid == 'ผ่อนชำระ' &&
                                  role_status !== 'super_admin')
                            "
                            type="text"
                            class="form-control"
                            :value="return_confirm_date(item.incoming_paid_date)"
                            placeholder="Select Date"
                            @change="select_1($event, item)"
                            @click="openforecast(item)"
                          />
                          <button
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                                role_status == 'down_service' ||
                                role_status == 'viewer' ||
                                role_status == 'admin' ||
                                role_status == 'wait_down_service' ||
                                (item.paid == 'ผ่อนชำระ' &&
                                  role_status !== 'super_admin')
                            "
                            v-bind:style="{
                              display:
                                role_status == 'down_service' || role_status == 'viewer'
                                  ? 'none'
                                  : '',
                            }"
                            class="btn"
                            style="font-size: 18px"
                            @click="clearDate('incoming_paid_date', item)"
                          >
                            x
                          </button>
                        </div>
                      </template>
                      <template v-slot:top>
                        <!-- ---------------------------------- estimate_date(กำหนดชำระ) ------------------------------------ -->
                        <v-dialog
                          v-model="dialog_estimate_date"
                          max-width="380"
                          persistent
                        >
                          <v-card>
                            <div
                              class="font-text"
                              style="
                                color: darkblue;
                                padding: 15px;
                                font-size: 20px;
                              "
                            >
                              กำหนดชำระ
                            </div>
                            <div
                              class="font-text"
                              style="text-align: center; font-size: 16px"
                            >
                              <B>Invoice no</B> :
                              {{ estimate_date_dialog.invoice_no }}
                            </div>
                            <div style="height: 10px"></div>
                            <input
                              type="date"
                              class="form-control"
                              v-model="estimate_date_dialog.estimate_date"
                              placeholder="Select Date"
                              style="width: 50%; margin: auto"
                              @click="
                                set_default(estimate_date_dialog, 'estimate_date')
                              "
                            />

                            <!-- @change="select_1($event, item)" -->
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="red darken-1"
                                text
                                @click="close_estimate_date()"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="ok_estimate_date()"
                              >
                                Confirm
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- ------------------------------------end estimate_date---------------------------------- -->

                        <!-- ---------------------------------- วันที่ดำเนินการ ------------------------------------ -->
                        <v-dialog
                          v-model="dialog_asking_payment_date"
                          max-width="380"
                          persistent
                        >
                          <v-card>
                            <div
                              class="font-text"
                              style="
                                color: darkblue;
                                padding: 15px;
                                font-size: 20px;
                              "
                            >
                              วันที่ดำเนินการ
                            </div>
                            <div
                              class="font-text"
                              style="text-align: center; font-size: 16px"
                            >
                              <B>Invoice no</B> :
                              {{ asking_payment_date_dialog.invoice_no }}
                            </div>
                            <div style="height: 10px"></div>
                            <input
                              type="date"
                              class="form-control"
                              v-model="
                                asking_payment_date_dialog.asking_payment_date
                              "
                              placeholder="Select Date"
                              style="width: 50%; margin: auto"
                              @click="
                                set_default(
                                  asking_payment_date_dialog,
                                  'asking_payment_date'
                                )
                              "
                            />
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="red darken-1"
                                text
                                @click="close_asking_payment_date()"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="ok_asking_payment_date()"
                              >
                                Confirm
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- ------------------------------------ end วันที่ดำเนินการ ---------------------------------- -->

                        <!-- ----------------------------------open------------------------------------ -->
                        <v-dialog
                          v-model="dialog_open"
                          max-width="380"
                          persistent
                        >
                          <v-card>
                            <div
                              class="font-text"
                              style="
                                color: darkblue;
                                padding: 15px;
                                font-size: 20px;
                              "
                            >
                              วันที่ confirm
                            </div>
                            <div
                              class="font-text"
                              style="text-align: center; font-size: 16px"
                            >
                              <B>Invoice no</B> :
                              {{ confirm_date_dialog.invoice_no }}
                            </div>
                            <div style="height: 10px"></div>
                            <input
                              type="date"
                              class="form-control"
                              v-model="confirm_date_dialog.confirm_date"
                              placeholder="Select Date"
                              style="width: 50%; margin: auto"
                              @click="
                                set_default(confirm_date_dialog, 'confirm_date')
                              "
                            />

                            <!-- @change="select_1($event, item)" -->
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="red darken-1"
                                text
                                @click="close_confirm()"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="ok_confirm_date()"
                              >
                                Confirm
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- ------------------------------------end open---------------------------------- -->

                        <!-- ---------------------------------- วันที่เงินเข้า ------------------------------------ -->
                        <v-dialog
                          v-model="dialog_incoming_paid_date"
                          max-width="380"
                          persistent
                        >
                          <v-card>
                            <div
                              class="font-text"
                              style="
                                color: darkblue;
                                padding: 15px;
                                font-size: 20px;
                              "
                            >
                              วันที่เงินเข้า
                            </div>
                            <div
                              class="font-text"
                              style="text-align: center; font-size: 16px"
                            >
                              <B>Invoice no</B> :
                              {{ incoming_paid_date_dialog.invoice_no }}
                            </div>
                            <div style="height: 10px"></div>
                            <input
                              type="date"
                              class="form-control"
                              v-model="incoming_paid_date_dialog.incoming_paid_date"
                              placeholder="Select Date"
                              style="width: 50%; margin: auto"
                              @click="
                                set_default(incoming_paid_date_dialog, 'incoming_paid_date')
                              "
                            />

                            <!-- @change="select_1($event, item)" -->
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="red darken-1"
                                text
                                @click="close_incoming_paid_date()"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="ok_incoming_paid_date()"
                              >
                                Confirm
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- ------------------------------------end วันที่เงินเข้า---------------------------------- -->

                        <!-- ----------------------------------open date-bill------------------------------------ -->
                        <v-dialog
                          v-model="dialog_date_bill_modal"
                          max-width="380"
                          persistent
                        >
                          <v-card>
                            <div
                              class="font-text"
                              style="
                                color: darkblue;
                                padding: 15px;
                                font-size: 20px;
                              "
                            >
                              วันที่วางบิล
                            </div>
                            <div
                              class="font-text"
                              style="text-align: center; font-size: 16px"
                            >
                              <B>Invoice no</B> :
                              {{ date_bill_dialog.invoice_no }}
                            </div>
                            <div style="height: 10px"></div>
                            <input
                              type="date"
                              class="form-control"
                              v-model="date_bill_dialog.date_bill"
                              placeholder="Select Date"
                              style="width: 50%; margin: auto"
                              @click="set_default(date_bill_dialog, 'date_bill')"
                            />

                            <!-- @change="select_1($event, item)" -->
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="red darken-1"
                                text
                                @click="close_date_bill()"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="ok_date_bill()"
                              >
                                Confirm
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- ------------------------------------end date-bill---------------------------------- -->
                      </template>

                      <template v-slot:[`item.payment_type`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.payment_type"
                          @change="select_1($event, item)"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              role_status == 'down_service'
                          "
                        >
                          <option value=""></option>
                          <option value="BBL205">BBL205</option>
                          <option value="BBL785">BBL785</option>
                          <option value="BBL156">BBL156</option>
                          <option value="BBL522">BBL522</option>
                          <option value="BAY993">BAY993</option>
                          <option value="BAY778">BAY778</option>
                          <option value="BAY601">BAY601</option>
                          <option value="BAY973">BAY973</option>
                          <option value="BAY684">BAY684</option>
                          <option value="CIMB854">CIMB854</option>
                          <option value="CIMB745">CIMB745</option>
                          <option value="Bill Payment - SCB">
                            Bill Payment - SCB
                          </option>
                          <option value="Bill Payment - KBANK">
                            Bill Payment - KBANK
                          </option>
                          <option value="Bill Payment - BBL">
                            Bill Payment - BBL
                          </option>
                          <option value="CHQ">CHQ</option>
                          <option value="FACTORING">
                            FACTORING
                          </option>
                          <option value="GSB505">GSB505</option>
                          <option value="GSB491">GSB491</option>
                          <option value="KKP412">KKP412</option>
                          <option value="KKP756">KKP756</option>
                          <option value="KBANK579">KBANK579</option>
                          <option value="KBANK861">KBANK861</option>
                          <option value="KTB395">KTB395</option>
                          <option value="KTB926">KTB926</option>
                          <option value="KTB569">KTB569</option>
                          <option value="KTB694">KTB694</option>
                          <option value="KTB034">KTB034</option>
                          <option value="KTB184">KTB184</option>
                          <option value="KTB728">KTB728</option>
                          <option value="KBANK035">KBANK035</option>
                          <option value="KBANK199">KBANK199</option>
                          <option value="KTB856">KTB856</option>
                          <option value="QR CODE">QR CODE</option>
                          <option value="SCB376">SCB376</option>
                          <option value="SCB750">SCB750</option>
                          <option value="SCB540">SCB540</option>
                          <option value="SCB009">SCB009</option>
                          <option value="TMB958">TMB958</option>
                          <option value="TTB174">TTB174</option>
                          <option value="TTB958">TTB958</option>
                          <option value="TTB907">TTB907</option>
                          <option value="TTB553">TTB553</option>
                          <option value="TBANK064">TBANK064</option>
                          <option value="Offset">Offset</option>
                        </select>
                      </template>

                      <template v-slot:[`item.status_payment`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.status_payment"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                            role_status == 'viewer' ||
                            role_status == 'down_service'
                          "
                          @change="select_1($event, item)"
                        >
                          <option value=""></option>
                          <option value="สัญญา">สัญญา</option>
                          <option value="PO">PO</option>
                          <option value="ส่งมอบงาน+Report">
                            ส่งมอบงาน+Report
                          </option>
                          <option value="ลดหนี้">ลดหนี้</option>
                          <option value="ชำระได้">ชำระได้</option>
                        </select>
                      </template>
                      <template v-slot:[`item.paid`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.paid"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                            role_status == 'viewer' ||
                            role_status == 'down_service'
                          "
                          @change="select_1($event, item)"
                        >
                          <option value=""></option>
                          <option value="เลื่อนครั้งที่ 1"
                            >เลื่อนครั้งที่ 1</option
                          >
                          <option value="รอออกหนังสือทวงหนี้ครั้งที่ 1"
                            >รอออกหนังสือทวงหนี้ครั้งที่ 1</option
                          >
                          <option value="รอออกหนังสือทวงหนี้ครั้งที่ 2"
                            >รอออกหนังสือทวงหนี้ครั้งที่ 2</option
                          >
                          <option disabled value="หนังสือทวงหนี้ครั้งที่ 1"
                            >หนังสือทวงหนี้ครั้งที่ 1</option
                          >
                          <option disabled value="หนังสือทวงหนี้ครั้งที่ 2"
                            >หนังสือทวงหนี้ครั้งที่ 2</option
                          >
                          <option value="หนังสือทวงหนี้อื่นๆ"
                            >หนังสือทวงหนี้อื่นๆ</option
                          >
                          <option disabled value="ปิดระบบ">ปิดระบบ</option>
                          <option disabled value="รอปิดระบบ">รอปิดระบบ</option>
                          <option value="ผ่อนชำระ">ผ่อนชำระ</option>
                          <option value="เตรียมส่งดำเนินคดี">เตรียมส่งดำเนินคดี</option>
                          <option value="ส่งดำเนินคดี">ส่งดำเนินคดี</option>
                          <option value="เตรียมตัดหนี้สูญ">เตรียมตัดหนี้สูญ</option>
                          <option value="ตัดหนี้สูญ">ตัดหนี้สูญ</option>
                          <option value="ระงับการส่งดำเนินคดีชั่วคราว">ระงับการส่งดำเนินคดีชั่วคราว</option>
                        </select>
                      </template>

                      <template v-slot:[`item.recheck`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.recheck"
                          @change="select_1($event, item)"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'down_service' ||
                              role_status == 'viewer'
                          "
                        >
                          <option value=""></option>
                          <option :disabled="role_status == 'admin'" value="ไม่เข้าจริง">ไม่เข้าจริง</option>
                          <option :disabled="role_status == 'admin'" value="เข้าจริง">เข้าจริง</option>
                          <option value="Confirm CHQ">Confirm CHQ</option>
                        </select>                                      
                      </template>
                      
                      <template v-slot:[`item.status_recheck`]="{ item }">
                        <select
                          class="style-chooser form-control"
                          v-model="item.status_recheck"
                          @change="select_1($event, item)"
                          :disabled="
                            item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'down_service' ||
                              role_status == 'viewer'
                          "
                        >
                          <option value=""></option>
                          <option :disabled="role_status == 'admin'" value="Paid">Paid</option>
                          <option :disabled="role_status == 'admin'" value="Partial">Partial</option>
                          <option :disabled="role_status == 'admin'" value="ลดหนี้เต็มจำนวน">ลดหนี้เต็มจำนวน</option>
                          <option :disabled="role_status == 'admin'" value="ลดหนี้บางส่วน">ลดหนี้บางส่วน</option>
                        </select>                                    
                      </template>
                      
                      <!-- add ส่งตัดหนี้ -->
                      <template v-slot:[`item.cut_debt`]="{ item }">
                        {{ item.cut_debt  }}
                      </template>
                      <!-- end -->
                      <!-- add status cash collection -->
                      <!-- <template v-slot:[`item.base_adjust`]="{ item }">
                        {{ item.base_adjust }}
                      </template> -->
                      <!-- end -->
                      <!-- add aging cash collection -->
                      <!-- <template v-slot:[`item.aging_cash`]="{ item }">
                        {{ item.aging_cash }}
                      </template> -->
                      <!-- end -->
                      <!-- <template v-slot:[`item.paid_date`]="{ item }">
                        {{ parseDate(item.paid_date) }}
                      </template> -->

                      <template v-slot:[`item.asking_payment_date`]="{ item }">
                        <div class="d-flex">
                          <input
                            @click="set_default(item, 'asking_payment_date')"
                            type="date"
                            class="form-control"
                            v-model="item.asking_payment_date"
                            placeholder="dd/mm/yyyy"
                            @change="select_1($event, item)"
                            :disabled="
                              (item.check_step_one == false &&
                                role_status == 'down_service') ||
                                role_status == 'viewer' ||
                                item.invoice_no == 'BOI-64-10015479'
                            "
                          />
                          <button
                            :disabled="
                              (item.check_step_one == false &&
                                role_status == 'down_service') ||
                                role_status == 'viewer' ||
                                item.invoice_no == 'BOI-64-10015479'
                            "
                            class="btn"
                            style="font-size: 18px"
                            @click="clearDate('asking_payment_date', item)"
                            v-bind:style="{
                              display: role_status == 'viewer' ? 'none' : '',
                            }"
                          >
                            x
                          </button>
                        </div>
                      </template>

                      <!-- <template v-slot:[`item.asking_payment_date`]="{ item }">
                        <div class="d-flex">
                          <input
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'viewer' ||
                              (item.paid == 'ผ่อนชำระ' &&
                                role_status !== 'super_admin')
                            "
                            type="text"
                            class="form-control"
                            :value="return_confirm_date(item.asking_payment_date)"
                            placeholder="dd/mm/yyyy"
                            pattern="dd/mm/yyyy"
                            @change="select_1($event, item)"
                            @click="openasking(item)"
                          />
                          <button
                            :disabled="
                              item.invoice_no == 'BOI-64-10015479' ||
                              role_status == 'user' ||
                              role_status == 'viewer' ||
                              (item.paid == 'ผ่อนชำระ' &&
                                role_status !== 'super_admin')
                            "
                            v-bind:style="{
                              display:
                                role_status == 'user' || role_status == 'viewer'
                                  ? 'none'
                                  : '',
                            }"
                            class="btn"
                            style="font-size: 18px"
                            @click="clearDate('asking_payment_date', item)"
                          >
                            x
                          </button>
                        </div>
                      </template> -->

                      <template v-slot:[`item.memo_date_one`]="{ item }">
                        {{ parseDate(item.memo_date_one) }}
                      </template>
                      <template v-slot:[`item.memo_date_two`]="{ item }">
                        {{ parseDate(item.memo_date_two) }}
                      </template>
                      <template v-slot:[`item.memo_date_three`]="{ item }">
                        {{ parseDate(item.memo_date_three) }}
                      </template>

                      <template v-slot:[`item.remark_warroom`]="{ item }">
                        <!-- <textarea-autosize
                          class="form-control"
                          placeholder="หมายเหตุ warroom"
                          v-model="item.remark_warroom"
                          :min-height="40"
                          style="
                            height: 48px;
                            width: 100%;
                          
                            padding: 5px;
                            border: 1px solid rgb(224, 224, 224);
                            border-radius: 1px;
                          "
                          @blur.native="select_1($event, item)"
                          :disabled="
                            item.check_step_three == false ||
                            item.invoice_no == 'BOI-64-10015479'
                          "
                        /> -->
                        <b-textarea
                          placeholder="หมายเหตุ warroom"
                          v-model="item.remark_warroom"
                          rows="2"
                          max-rows="900"
                          :disabled="
                            (item.check_step_three == false &&
                              role_status == 'down_service') ||
                              role_status == 'viewer' ||
                              item.invoice_no == 'BOI-64-10015479'
                          "
                          @change="select_1($event, item)"
                        ></b-textarea>
                      </template>
                      <template v-slot:[`item.user_name`]="{ item }">
                        <label
                          :disabled="
                            item.check_step_three == false ||
                              item.invoice_no == 'BOI-64-10015479'
                          "
                          >{{ item.user_name }}</label
                        >
                      </template>
                      <template v-slot:[`item.remark_date`]="{ item }">
                        {{ parseDate(item.remark_date) }}
                      </template>

                      <template v-slot:[`item.preview`]="{ item }">
                        <v-btn
                          color="primary"
                          class="mb-2"
                          outlined
                          @click="open_preview(item)"
                        >
                          Preview
                          <v-icon right dark>mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:[`item.detail`]="{ item }">
                        <v-btn
                          color="primary"
                          class="mb-2"
                          @click="editItem(item)"
                        >
                          Detail
                          <v-icon right dark>mdi-chevron-double-right</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>

                    <!----------------------------- เพิ่ม popup detail ----------------------------------->
                    <v-dialog
                      v-model="dialog_popup"
                      max-width="800"
                      max-height="500px"
                      style="z-index: 1002 !important"
                      persistent
                    >
                      <v-card>
                        <v-card-title style="background-color: #035891">
                          <span
                            class="text-h5"
                            style="color: white; font-family: 'Bai_Jamjuree' !important;"
                            >Details</span
                          >
                        </v-card-title>

                        <v-card-text>
                          <v-container fluid >
                            <v-row>
                              <v-col cols="12" md="6" class="mb-n4">
                                <v-textarea
                                  rows="1"
                                  auto-grow
                                  disabled
                                  v-model="editedItem.service"
                                  label="Service"
                                ></v-textarea>
                              </v-col>
                              <v-col cols="12" md="6" class="mb-n4">
                                <v-text-field
                                  disabled
                                  v-model="editedItem.quotation"
                                  label="Quotation No"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6" class="mb-n4">
                                <v-text-field
                                  disabled
                                  v-model="editedItem.customer_description"
                                  label="Customer Description"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6" class="mb-n4">
                                <v-text-field
                                  disabled
                                  v-model="editedItem.customer_type"
                                  label="Customer Type"
                                ></v-text-field>
                              </v-col>
                              <!--
                                :disabled="role_status == 'user' || role_status == 'viewer'"
                              -->
                              <!-- <v-col cols="12" md="12" class="mb-n4" id="select-cus">
                                <v-select
                                  class="mt-n4"
                                  v-model="editedItem.customer_criteria"
                                  label="Customer Criteria"
                                  :items="['','01 - Normal', '02 - Critical']"
                                  disabled
                                ></v-select>
                              </v-col> -->
                              <v-col cols="12" md="12" class="mb-n4">
                                <v-textarea
                                  label="Customer Email"
                                  rows="1"
                                  auto-grow
                                  disabled
                                  v-model="editedItem.customer_email"
                                ></v-textarea>
                              </v-col>
                              <v-col cols="12" md="6" class="mb-n4">
                                <v-text-field
                                  disabled
                                  v-model="editedItem.sale_name"
                                  label="Sales Representative"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6" class="mb-n4">
                                <v-text-field
                                  disabled
                                  v-model="editedItem.sale_team"
                                  label="Sale Team Lead"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="12" class="mb-n4">
                                <v-textarea
                                  rows="1"
                                  auto-grow
                                  v-model="editedItem.customer_info"
                                  label="ข้อมูลลูกค้า"
                                  :disabled="role_status == 'down_service' || role_status == 'viewer'"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions class="mt-n5">
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog_popup = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            v-if="
                              role_status != 'viewer'&&
                              role_status != 'down_service'"
                            text
                            @click="save(editedItem)"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-----------------------------สิ้นสุดเพิ่ม popup detail ----------------------------------->

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
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                        <!-- <option value="1500">1500</option> -->
                      </select>
                      <v-pagination
                        style="justify-content: flex-end"
                        v-model="page"
                        :length="page_total"
                        :total-visible="10"
                        @input="pageChange()"
                      ></v-pagination>
                    </div>
                  </div>
                </div>
                <!-- --------------------------------------table--------------------------------------------- -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <bank-dialog
      :item_bank="item_bank"
    />
  </div>
</template>

<script>
import moment from "moment";
import eventBus from "../event-bus";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
// import 'carbon-components/css/carbon-components.css';
import { BModal, VBModal } from "bootstrap-vue";
import Swal from "sweetalert2";
// import Preview from "./Preview.vue";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import BankStatementDialog from "../components/DialogBankStatement.vue";

const orders = [
  {
    invoice_no: "",
    invoice_status: "",
    factoring: true,
    online_payment: false,
    so_nomber: "",
    so_end_date: null,
    start_date: null,
    end_date: null,
    invoice_date: null,
    customer_no: "",
    customer_name: "",
    customer_description: "",
    customer_criteria: "",
    customer_email: "",
    no_contact: "",
    customer_type: "",
    finance_id: "",
    finance_name: "",
    finance_tel_no: "",
    over_due: "",
    amount_after_vat: 0,
    amount_before_vat: 0,
    sale_name: "",
    sale_id: "",
    sale_team: "",
    customer_info: "",
    date_bill: null,
    billing_type_detail: "",
    billing_status: "",
    billing_checking: "",
    billing_remark: "",
    estimate_date: null,
    confirm_date: null,
    incoming_paid_date: null,
    payment_type: "",
    paid: "",
    // paid_date: null,
    asking_payment: "",
    asking_payment_date: "",
    remain_day: "",
    memo_date_one: null,
    memo_date_two: null,
    memo_date_three: "",
    debt_reduction_docno: "",
    reissue_status: "",
    cn_number: "",
    // cn_ten: "", //คอลัมน์CN10
    rv_number: "",
    receipt_number: "",
    incoming_status: "",
    remark_warroom: "",
    user_name: "",
    remark_date: null,
    // เพิ่มมาใหม่
    service: "",
    quotation: "",
    // สิ้นสุด
  },
];

export default {
  components: {
    BModal,
    VuePdfApp,
    "bank-dialog": BankStatementDialog,

  },
  // 'preview': Preview
  directives: { "b-modal": VBModal },
  data: () => ({
    emptyFinance: [],
    item_per_page: 50,
    confirm_date_dialog: orders,
    estimate_date_dialog: orders,
    incoming_paid_date_dialog: orders,
    asking_payment_date_dialog: orders,
    date_bill_dialog: orders,
    dialog_open: false,
    dialog_estimate_date: false,
    dialog_incoming_paid_date: false,
    dialog_date_bill_modal: false,
    dialog_asking_payment_date: false,
    dialog_export: false,
    dialog_edit_cus_no: false,
    dialog_edit_invoice_no: false,

    customer_search: {
      customer_name: null,
      customer_no: null,
      deleted_at: null,
      seq: null,
      uid: null,
    },
    type_debt: "debt_first",
    text_alert_cus: "",
    log_data: [],
    disable_add: false,
    rules: [
      (value) => !!value || "Required.",
      (value) => value !== "" || "ไม่พบข้อมูล",
    ],
    rules_select: {
      select: [(v) => !!v || "select is required"],
    },
    rules_cus: [
      (value) => !!value || "Required.",
      (value) => value !== "" || "ไม่พบรหัส Cus No.",
    ],
    editedIndex: -1,
    editedItem: {
      customer_no: "",
      customer_name: "",
      role: "",
      // ข้อมูลแสดงใน popup
      service: "",
      quotation: "",
      customer_description: "",
      //customer_criteria: "",
      customer_email: "",
      customer_type: "",
      sale_name: "",
      sale_team: "",
      customer_info: "",
      // สิ้นสุด
    },

    role_status: "",
    dateEndLabel: "End date",
    calOptions: {
      dateFormat: "d/m/Y",
    },
    start_date_range: {
      startDate: null,
      endDate: null,
    },
    end_date_range: {
      startDate: null,
      endDate: null,
    },
    invoice_date_range: {
      startDate: null,
      endDate: null,
    },
    date_bill_range: {
      startDate: null,
      endDate: null,
    },
    estimate_date_range: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range: {
      startDate: null,
      endDate: null,
    },
    incoming_paid_date_range: {
      startDate: null,
      endDate: null,
    },
    // paid_date_range: {
    //   startDate: null,
    //   endDate: null,
    // },
    asking_payment_date_range: {
      startDate: null,
      endDate: null,
    },
    memo_date_one_range: {
      startDate: null,
      endDate: null,
    },
    memo_date_two_range: {
      startDate: null,
      endDate: null,
    },
    memo_date_three_range: {
      startDate: null,
      endDate: null,
    },
    remark_date_range: {
      startDate: null,
      endDate: null,
    },

    so_end_date_range: {
      startDate: null,
      endDate: null,
    },

    factoring_filter: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
    aging_list: [
      {
        name: "0",
        value: "0",
      },
      {
        name: "มากกว่า 0",
        value: "1",
      },
    ],
    online_filter: [
      // {
      //   name: "Yes",
      //   value: "true",
      // },
      // {
      //   name: "No",
      //   value: "false",
      // },
      // {
      //   name: "Pending",
      //   value: "Pending",
      // },
      "[blank]",
      "Online Billing - Online Payment",
      "Online Billing - Offline Payment",
      "Offline Billing - Online Payment",
      "Offline Billing - Offline Payment",
    ],
    customer_criteria_list: [
      "[blank]",
      "01 - Normal",
      "02 - Critical",
    ],
    no_contact_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
    billing_after_checking_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
    count_invoice: 0,
    sum_amount: 0,
    datalist: orders,
    Alldata: [],
    // pageSizes: [10, 20, 50, 100, 500],
    currentFilter: null,
    showFilterRow: true,
    showHeaderFilter: true,
    dataGridRefName: "dataGrid",
    dialog_send: false,
    billing_status_select: [
      "[blank]",
      "วางบิลแล้ว",
      "วางบิลไม่ได้",
    ],
    // filter หมายเหตุสถานะวางบิล
    billing_status_remark_select: [
      "[blank]",
      "วางบิลหลังใช้",
      "สัญญา",
      "PO",
      "ส่งมอบงาน+Report",
      "ลดหนี้เต็มจำนวน",
      "ลดหนี้บางส่วน",
      "รอตรวจสอบการลดหนี้",
      "แก้ไขรายละเอียด",
      "ออกหลังรอบวางบิล",
      "อื่นๆ",
    ],
    // end
    payment_select: [
      "[blank]",
      "BBL205",
      "BBL785",
      "BBL156",
      "BBL522",
      "BAY993",
      "BAY778",
      "BAY601",
      "BAY973",
      "BAY684",
      "CIMB854",
      "CIMB745",
      "Bill Payment - SCB",
      "Bill Payment - KBANK",
      "Bill Payment - BBL",
      "CHQ",
      "FACTORING",
      "GSB505",
      "GSB491",
      "KKP412",
      "KKP756",
      "KBANK579",
      "KBANK861",
      "KTB395",
      "KTB184",
      "KTB926",
      "KTB569",
      "KTB694",
      "KTB034",
      "KTB728",
      "KBANK035",
      "KBANK199",
      "KTB856",
      "QR CODE",
      "SCB376",
      "SCB009",
      "SCB750",
      "SCB540",
      "TMB958",
      "TTB174",
      "TTB958",
      "TTB907",
      "TTB553",
      "TBANK064",
      "Offset"
    ],
    paid_mainstatus: [
      "[blank]",
      "เลื่อนครั้งที่ 1",
      "รอออกหนังสือทวงหนี้ครั้งที่ 1",
      "รอออกหนังสือทวงหนี้ครั้งที่ 2",
      "หนังสือทวงหนี้ครั้งที่ 1",
      "หนังสือทวงหนี้ครั้งที่ 2",
      "หนังสือทวงหนี้อื่นๆ",
      "ปิดระบบ",
      "รอปิดระบบ",
      "ผ่อนชำระ",
      "เตรียมส่งดำเนินคดี",
      "ส่งดำเนินคดี",
      "เตรียมตัดหนี้สูญ",
      "ตัดหนี้สูญ",
      "ระงับการส่งดำเนินคดีชั่วคราว"
    ],
    recheck_list: [
      "[blank]",
      "ไม่เข้าจริง",
      "เข้าจริง",
      "Confirm CHQ",
    ],
    status_recheck_list: [
      "[blank]",
      "Paid",
      "Partial",
      "ลดหนี้เต็มจำนวน",
      "ลดหนี้บางส่วน"
    ],
    write_off_debt_list:[
    "[blank]",
    "On Process",
    "Matching",
    "Matched",
    "Rejected",
    "Reversed",
    "Clear"
    ],
    status_cash_collection_list: [
      "[blank]",
      "ปรับฐาน",
      "ตัดหนี้สูญ",
      "ดำเนินคดี",
      "ระงับService",
      "อื่นๆหมายเหตุ"
    ],
    // aging_cash_collection_list: [
    //   "[blank]",
    //   "Aging CC"
    // ],
    events: [],
    loading: false,
    search: "",
    finish: false,
    total_count: 0,
    total_amount: 0,
    editing: false,
    stepOne: [],
    stepTwo: [],
    stepThree: [],
    singleSelect: false,
    selected: [],
    dialog_preview: false,
    // ===================================date==============================//
    dialog: false,
    dialog_popup: false,
    dialog_end: false,
    dialog_invoice_date: false,
    dialog_date_bill: false,
    dialog_confirm_date: false,
    // dialog_paid_date: false,
    dialog_memo_date_one: false,
    dialog_memo_date_two: false,
    dialog_memo_date_three: false,
    dialog_remark_date: false,
    dialog_so_end_date: false,

    text_start_date: null,
    text_end_date: null,
    text_invoice_date: null,
    text_date_bill: null,
    text_estimate_date: null,
    text_confirm_date: null,
    text_incoming_paid_date: null,
    // text_paid_date: null,
    text_asking_payment_date: null,
    text_memo_date_one: null,
    text_memo_date_two: null,
    text_memo_date_three: null,
    text_remark_date: null,
    text_so_end_date: null,

    // =====================================================================//
    // =====search===================
    search_customer_name: null,
    // ================
    invoice_no: "",
    invoice_status: "",
    factoring: "",
    online_payment: "",
    so_number: "",
    so_end_date: [null, null],
    start_date: [null, null],
    end_date: [null, null],
    invoice_date: [null, null],
    customer_no: "",
    customer_name: "",
    customer_description: "",
    customer_criteria: "",
    customer_email: "",
    no_contact: "",
    customer_type: "",
    finance_id: "",
    finance_name: "",
    finance_tel_no: "",
    over_due: "",
    amount_after_vat: "",
    amount_before_vat: "",
    aging_1: "",
    sale_name: "",
    sale_id: "",
    sale_team: "",
    customer_info: "",
    date_bill: [null, null],
    billing_type_detail: "",
    billing_status: "",
    billing_status_remark: "", //คอลัมน์หมายเหตุสถานะวางบิล
    billing_checking: "",
    billing_remark: "",
    estimate_date: [null, null],
    confirm_date: [null, null],
    incoming_paid_date: [null, null],
    payment_type: "",
    paid: "",
    recheck: "",
    status_recheck: "",
    // add status cash collection and aging cash collection
    cut_debt : "",
    // base_adjust:"",
    // aging_cash: "",
    // end
    // paid_date: [null, null],
    asking_payment: "",
    asking_payment_date: [null, null],
    remain_day: "",
    memo_date_one: "",
    memo_date_two: "",
    memo_date_three: "",
    debt_reduction_docno: "",
    reissue_status: "",
    cn_number: "",
    // cn_ten: "", //คอลัมน์CN10
    rv_number: "",
    receipt_number: "",
    incoming_status: "",
    remark_warroom: "",
    user_name: "",
    remark_date: [null, null],
    status_payment: "",
    excel_file: "",
    filterlist: [],
    AllFile: "",
    customer_edit: [],
    customer_edit_invoice: [],
    dialog_select_list: false,
    config: {
      toolbar: {
        toolbarViewerLeft: {
          findbar: false,
        },
        toolbarViewerRight: {
          presentationMode: false,
          openFile: false,
          print: true,
          download: true,
          viewBookmark: false,
        },
      },
    },
    config2: {
      toolbar: {
        toolbarViewerLeft: {
          findbar: false,
        },
        toolbarViewerRight: {
          presentationMode: false,
          openFile: false,
          print: false,
          download: false,
          viewBookmark: false,
        },
      },
    },
    pdf: "",

    headers_customer: [
      {
        text: "Column Name",
        align: "start",
        sortable: false,
        value: "column",
        width: "180px",
      },
      {
        text: "Value",
        align: "start",
        value: "value",
        sortable: false,
        width: "300px",
      },
    ],
    search_selected_list: "",
    headers_selected: [
      {
        text: "invoice No",
        align: "start",
        sortable: false,
        value: "invoice_no",
        width: "200px",
      },
      {
        text: "Customer No",
        align: "start",
        value: "customer_no",
        sortable: false,
        width: "150px",
      },
      {
        text: "Customer Name",
        align: "start",
        value: "customer_name",
        sortable: false,
        width: "250px",
      },
      {
        text: "Deselect",
        align: "center",
        value: "action",
        sortable: false,
        width: "100px",
      },
    ],
    headers_request: [
      {
        text: "Invoice No",
        align: "start",
        sortable: false,
        value: "invoice_no",
        width: "200px",
      },
      {
        text: "Customer No",
        align: "start",
        value: "customer_no",
        sortable: false,
        width: "150px",
      },
      {
        text: "Customer Name",
        align: "start",
        value: "customer_name",
        sortable: false,
        width: "250px",
      },
      {
        text: "Preview",
        align: "center",
        value: "action",
        sortable: false,
        width: "100px",
      },
      // {
      //   text: "Detail",
      //   align: "center",
      //   value: "action",
      //   sortable: false,
      //   width: "100px",
      // },
    ],
    headers_request2: [
      {
        text: "Invoice No",
        align: "start",
        sortable: false,
        value: "invoice_no",
        width: "200px",
      },
      {
        text: "Customer No",
        align: "start",
        value: "customer_no",
        sortable: false,
        width: "150px",
      },
      {
        text: "Customer Name",
        align: "start",
        value: "customer_name",
        sortable: false,
        width: "250px",
      },
      {
        text: "ประเภทเลขที่ใบเสร็จ/ตัดหนี้",
        align: "center",
        value: "sendreceipt",
        sortable: false,
        width: "250px",
      },
      {
        text: "เลขที่ใบเสร็จ/ตัดหนี้",
        align: "center",
        value: "sendreceipt_action",
        sortable: false,
        width: "200px",
      },
      {
        text: "Preview",
        align: "center",
        value: "action",
        sortable: false,
        width: "100px",
      },
      // {
      //   text: "Detail",
      //   align: "center",
      //   value: "action",
      //   sortable: false,
      //   width: "100px",
      // },
    ],
    headers_bank_statement: [
      {
        text: "Invoice No",
        align: "start",
        sortable: false,
        value: "invoice_no",
        width: "200px",
      },
      {
        text: "Customer No",
        align: "start",
        value: "customer_no",
        sortable: false,
        width: "150px",
      },
      {
        text: "Customer Name",
        align: "start",
        value: "customer_name",
        sortable: false,
        width: "250px",
      },
      {
        text: "Receipt No",
        align: "center",
        value: "receipt_number",
        sortable: false,
        width: "150px",
      },
    ],
    headers_modal: [
      {
        text: "Column Name",
        align: "start",
        sortable: false,
        value: "name",
        width: "100px",
      },
      {
        text: "Show",
        align: "start",
        value: "show",
        sortable: false,
        width: "50px",
      },
      // {
      //   text: "Fixed",
      //   align: "start",
      //   value: "fixed",
      //   sortable: false,
      //   width: "50px",
      // },
    ],
    show_column: [],
    column_name: [
      {
        name: "Invoice Number",
        show: true,
        fixed: true,
        value: "invoice_no",
      },
      {
        name: "Cus No.",
        show: true,
        fixed: false,
        value: "customer_no",
      },
      {
        name: "Cus Name.",
        show: true,
        fixed: false,
        value: "customer_name",
      },
      {
        name: "Customer Criteria",
        show: true,
        fixed: false,
        value: "customer_criteria",
      },
      {
        name: "ห้ามติดต่อ",
        show: true,
        fixed: false,
        value: "no_contact",
      },
      {
        name: "factoring",
        show: true,
        fixed: false,
        value: "factoring",
      },
      {
        name: "Online Payment",
        show: true,
        fixed: false,
        value: "online_payment",
      },
      {
        name: "SO number",
        show: true,
        fixed: false,
        value: "so_number",
      },
      {
        name: "Invoice Date",
        show: true,
        fixed: false,
        value: "invoice_date",
      },
      {
        name: "วันเริ่มรอบใบแจ้งหนี้ ",
        show: true,
        fixed: false,
        value: "start_date",
      },
      {
        name: "วันสิ้นสุดรอบใบแจ้งหนี้ ",
        show: true,
        fixed: false,
        value: "end_date",
      },
      {
        name: "วันที่สิ้นสุดสัญญา ",
        show: true,
        fixed: false,
        value: "so_end_date",
      },
      {
        name: "ชื่อการเงิน",
        show: true,
        fixed: false,
        value: "finance_name",
      },
      {
        name: "Overdue",
        show: true,
        fixed: false,
        value: "over_due",
      },
      {
        name: "Amount (Inc. VAT)",
        show: true,
        fixed: false,
        value: "amount",
      },
      {
        name: "Aging",
        show: true,
        fixed: true,
        value: "aging",
      },
      {
        name: "วันที่วางบิล",
        show: true,
        fixed: false,
        value: "bill_date",
      },
      {
        name: "วิธีวางบิล",
        show: true,
        fixed: false,
        value: "billing_type_detail",
      },
      {
        name: "สถานะวางบิล",
        show: true,
        fixed: false,
        value: "billing_status",
      },
      // คอลัมน์หมายเหตุสถานะวางบิล
      {
        name: "หมายเหตุสถานะวางบิล",
        show: true,
        fixed: false,
        value: "billing_status_remark",
      },
      // end
      {
        name: "วางบิลพร้อมใบเสร็จ",
        show: true,
        fixed: false,
        value: "billing_checking",
      },
      {
        name: "หมายเหตุการวางบิล",
        show: true,
        fixed: false,
        value: "billing_remark",
      },
      {
        name: "สถานะเก็บเงิน",
        show: true,
        fixed: false,
        value: "status_payment",
      },
      {
        name: "กำหนดชำระ",
        show: true,
        fixed: false,
        value: "estimate_date",
      },
      {
        name: "วันที่ confirm",
        show: true,
        fixed: false,
        value: "confirm_date",
      },
      {
        name: "วันที่เงินเข้า",
        show: true,
        fixed: false,
        value: "incoming_paid_date",
      },
      {
        name: "ช่องทางการชำระเงิน",
        show: true,
        fixed: false,
        value: "payment_type",
      },
      {
        name: "Mainstatus",
        show: true,
        fixed: false,
        value: "paid",
      },
      {
        name: "Recheck",
        show: true,
        fixed: false,
        value: "recheck",
      },
      {
        name: "สถานะการชำระเงิน",
        show: true,
        fixed: false,
        value: "status_recheck",
      },
      // add status cash collection and aging cash collection
      {
        name: "ส่งตัดหนี้",
        show: true,
        fixed: false,
        value: "cut_debt",
      },
      // {
      //   name: "Status Cash Collection",
      //   show: true,
      //   fixed: false,
      //   value: "base_adjust",
      // },
      // {
      //   name: "Aging Cash Collection",
      //   show: true,
      //   fixed: false,
      //   value: "aging_cash",
      // },
      // end
      // {
      //   name: "Mainstatus date",
      //   show: true,
      //   fixed: false,
      //   value: "paid_date",
      // },
      {
        name: "วันที่ดำเนินการ",
        show: true,
        fixed: false,
        value: "asking_payment_date",
      },
      {
        name: "ระยะเวลาคงเหลือ",
        show: true,
        fixed: false,
        value: "remain_day",
      },
      {
        name: "MEMO Date ครั้งที่ 1",
        show: true,
        fixed: false,
        value: "memo_date_one",
      },
      {
        name: "MEMO Date ครั้งที่ 2",
        show: true,
        fixed: false,
        value: "memo_date_two",
      },
      {
        name: "MEMO Date ครั้งที่ 3",
        show: true,
        fixed: false,
        value: "memo_date_three",
      },
      {
        name: "เลขที่เอกสารลดหนี้",
        show: true,
        fixed: false,
        value: "debt_reduction_docno",
      },
      {
        name: "สถานะออกใหม่",
        show: true,
        fixed: false,
        value: "reissue_status",
      },
      {
        name: "เลขที่ลดหนี้",
        show: true,
        fixed: false,
        value: "cn_number",
      },
      // คอลัมน์CN10
      // {
      //   name: "CN10",
      //   show: true,
      //   fixed: false,
      //   value: "cn_ten",
      // },
      // end
      {
        name: "เลขที่ตัดหนี้",
        show: true,
        fixed: false,
        value: "rv_number",
      },
      {
        name: "เลขที่ใบเสร็จ",
        show: true,
        fixed: false,
        value: "receipt_number",
      },
      {
        name: "สถานะใบเสร็จ",
        show: true,
        fixed: false,
        value: "incoming_status",
      },
      {
        name: "หมายเหตุ Warroom",
        show: true,
        fixed: false,
        value: "remark_warroom",
      },
      {
        name: "User",
        show: true,
        fixed: false,
        value: "user_name",
      },
      {
        name: "วันที่หมายเหตุ",
        show: true,
        fixed: false,
        value: "remark_date",
      },
      // เพิ่มมาใหม่
      // {
      //   name: "Services",
      //   show: true,
      //   fixed: true,
      //   value: "service",
      // },
      // {
      //   name: "Quotation No",
      //   show: true,
      //   fixed: true,
      //   value: "quotation",
      // },
      // สิ้นสุด
      {
        name: "Preview",
        show: true,
        fixed: true,
        value: "preview",
      },
      {
        name: "Detail",
        show: true,
        fixed: true,
        value: "detail",
      },
    ],
    // ==========serach====================
    headers: [
      {
        text: "Invoice number",
        sortable: true,
        value: "invoice_no",
        width: "220px",
        class: "invoice",
      },
      {
        text: "Cus No.",
        value: "customer_no",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Cus Name.",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer Criteria",
        value: "customer_criteria",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "ห้ามติดต่อ",
        value: "no_contact",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "factoring",
        value: "factoring",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "Online Payment",
        value: "online_payment",
        width: "300px",
        sortable: true,
        align: "center",
      },
      {
        text: "SO number",
        value: "so_number",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Invoice Date",
        value: "invoice_date",
        width: "250px",
        sortable: true,
        align: "center",
        type: "date",
      },
      {
        text: "วันเริ่มรอบใบแจ้งหนี้ ",
        value: "start_date",
        width: "250px",
        sortable: true,
        align: "center",
        type: "date",
      },
      {
        text: "วันสิ้นสุดรอบใบแจ้งหนี้ ",
        value: "end_date",
        width: "250px",
        sortable: true,
        align: "center",
        type: "date",
      },
      {
        text: "วันที่สิ้นสุดสัญญา",
        value: "so_end_date",
        width: "250px",
        sortable: true,
        align: "center",
        type: "date",
      },
      {
        text: "ชื่อการเงิน",
        value: "finance_name",
        width: "240px",
        sortable: true,
        align: "left",
      },
      {
        text: "Overdue",
        value: "over_due",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Amount (Inc. VAT)",
        value: "amount_after_vat",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Aging",
        value: "aging",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่วางบิล",
        value: "date_bill",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "วิธีวางบิล",
        value: "billing_type_detail",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "สถานะวางบิล",
        value: "billing_status",
        width: "250px",
        sortable: true,
        align: "center",
      },
      // คอลัมน์หมายเหตุสถานะวางบิล
      {
        text: "หมายเหตุสถานะวางบิล",
        value: "billing_status_remark",
        width: "250px",
        sortable: true,
        align: "center",
      },
      // end
      {
        text: "วางบิลพร้อมใบเสร็จ",
        value: "billing_checking",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "หมายเหตุการวางบิล",
        value: "billing_remark",
        width: "400px",
        sortable: true,
        align: "center",
      },
      {
        text: "สถานะเก็บเงิน",
        value: "status_payment",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "กำหนดชำระ",
        value: "estimate_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ confirm",
        value: "confirm_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่เงินเข้า",
        value: "incoming_paid_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "ช่องทางการชำระเงิน",
        value: "payment_type",
        width: "240px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mainstatus",
        value: "paid",
        width: "240px",
        sortable: true,
        align: "center",
      },
      {
        text: "Recheck",
        value: "recheck",
        width: "240px",
        sortable: true,
        align: "center",
      },
      
      {
        text: "สถานะการชำระเงิน",
        value: "status_recheck",
        width: "240px",
        sortable: true,
        align: "center",
      },
      // add column Status Cash Collection and Aging Cash Collection
      {
        text: "ส่งตัดหนี้",
        value: "cut_debt",
        width: "240px",
        sortable: true,
        align: "center",
      },
      // {
      //   text: "Status Cash Collection",
      //   value: "base_adjust",
      //   width: "240px",
      //   sortable: true,
      //   align: "center",
      // },
      // {
      //   text: "Aging Cash Collection",
      //   value: "aging_cash",
      //   width: "240px",
      //   sortable: true,
      //   align: "center",
      // },
      // end
      // {
      //   text: "Mainstatus date",
      //   value: "paid_date",
      //   width: "250px",
      //   sortable: true,
      //   align: "center",
      // },
      {
        text: "วันที่ดำเนินการ",
        value: "asking_payment_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "ระยะเวลาคงเหลือ",
        value: "remain_day",
        width: "170px",
        sortable: true,
        align: "center",
      },
      {
        text: "MEMO Date ครั้งที่ 1",
        value: "memo_date_one",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "MEMO Date ครั้งที่ 2",
        value: "memo_date_two",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "MEMO Date ครั้งที่ 3",
        value: "memo_date_three",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่เอกสารลดหนี้",
        value: "debt_reduction_docno",
        width: "300px",
        sortable: true,
        align: "center",
      },
      {
        text: "สถานะออกใหม่",
        value: "reissue_status",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ลดหนี้",
        value: "cn_number",
        width: "300px",
        sortable: true,
        align: "center",
      },
      // คอลัมน์CN10
      // {
      //   text: "CN10",
      //   value: "cn_ten",
      //   width: "200px",
      //   sortable: true,
      //   align: "center",
      // },
      // end
      {
        text: "เลขที่ตัดหนี้",
        value: "rv_number",
        width: "300px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ใบเสร็จ",
        value: "receipt_number",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "สถานะใบเสร็จ",
        value: "incoming_status",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "หมายเหตุ Warroom",
        value: "remark_warroom",
        width: "400px",
        sortable: true,
        align: "center",
      },
      {
        text: "User",
        value: "user_name",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่หมายเหตุ",
        value: "remark_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      // เพิ่มมาใหม่
      // {
      //   text: "Services",
      //   value: "service",
      //   width: "250px",
      //   sortable: true,
      //   align: "center",
      // },
      // {
      //   text: "Quotation No",
      //   value: "quotation",
      //   width: "250px",
      //   sortable: true,
      //   align: "center",
      // },
      // สิ้นสุด
      {
        text: "Preview",
        value: "preview",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Detail",
        value: "detail",
        width: "200px",
        sortable: true,
        align: "center",
      },
    ],
    column_select: [],
    test: [],
    list_customer: {
      data: [],
    },
    list_column: [],
    page: 1,
    page_total: 1,
    // ---------------------------------test------------------------------------//
    invoice_list: [],
    customer_name_list: [],
    customer_no_list: [],
    so_number_list: [],
    finance_name_list: [],
    over_due_list: [
      "[blank]",
      "overdue 1-30 วัน",
      "overdue 31-60 วัน",
      "overdue 61-90 วัน",
      "overdue 91-180 วัน",
      "overdue 181-360 วัน",
      "overdue เกิน 360 วัน",
      "ยังไม่ครบกำหนด",
    ],
    sale_name_list: [],
    sale_team_list: [],
    cn_number_list: [],
    cn_ten_list: [],//คอลัมน์CN10
    rv_number_list: [],
    receipt_number_list: [],
    incoming_status_list: [
      "[blank]",
      "Post",
      "Park",
    ],
    user_name_list: [],

    // --------------------------------//
    rv_number_blank: false,
    debt_reduction_docno_blank: false,
    reissue_status_blank: false,
    cn_number_blank: false,
    cn_ten_blank: false, //คอลัมน์ CN10
    customer_no_blank: false,
    customer_description_blank: false,
    customer_email_blank: false,
    amount_after_vat_blank: false,
    customer_info_blank: false,
    billing_remark_blank: false,
    remain_day_blank: false,
    remark_warroom_blank: false,

    customer_list: [],
    customer_list_id: [],
    item_bank:[],
    bank_dialog: false,
    text_alert: "",
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
    column_customer: "",
    list_customer_column: [],
    searchInput: null,
    searchInput_invoice_no: null,
    send_edit: null,
    selected_list: [],
    selected_list_rv: [],
    send_invoice_no: "",
    select_type_send: "",
    check_bank_statement: true,
     // เพิ่มมาใหม่
    reissue_status_list: [
      "[blank]",
      "ออกใบใหม่",
      "ไม่ออกใบใหม่",
    ],
     // end
  }),
  created() {
    this.role_status = localStorage.getItem("role");
    /*if (this.role_status == "wait_down_service") {
      this.finish = false;
      this.$router.push("/invoice-book-close");
    } else if (this.role_status == "down_service") {
      this.finish = false;
      this.$router.push("/down-service");
    } */
    if (localStorage.getItem("acces_token")) {
      this.finish = false;
      localStorage.setItem("list_invoice", JSON.stringify([]));
      this.setting_column();
      this.getInvoice();
      // this.getTotalAmount();
      this.getFinance();
    } else {
      this.$router.push("/login");
    }
  },
  watch: {},
  mounted() {
    eventBus.$on("closeMatchingDialog", this.closeMatching);
  },
  beforeDestroy() {
    eventBus.$off("closeMatchingDialog");
    // bus.$off()
  },
  computed: {},

  methods: {
    save(data) {
      var updateData = {
        seq: Number(data.seq),
        aging: Number(data.aging),
        uid: data.uid,
        invoice_summary: null,
        invoice_no: data.invoice_no,
        invoice_status: data.invoice_status,
        factoring: data.factoring,
        online_payment: data.online_payment,
        so_number: data.so_number,
        customer_criteria: data.customer_criteria,
        customer_description: data.customer_description,
        customer_email: data.customer_email,
        no_contact: Boolean(data.no_contact),
        start_date: new Date(data.start_date).toJSON(),
        end_date: new Date(data.end_date).toJSON(),
        invoice_date: new Date(data.invoice_date).toJSON(),
        customer_no: data.customer_no,
        customer_name: data.customer_name,
        inet_jv: data.customer_type,
        finance_id: data.finance_id,
        finance_name: data.finance_name,
        finance_tel_no: data.finance_tel_no,
        over_due: data.over_due,
        amount_after_vat: Number(data.amount_after_vat),
        amount_before_vat: Number(data.amount_before_vat),
        sale_name: data.sale_name,
        sale_id: data.sale_id,
        sale_team: data.sale_team,
        customer_info: data.customer_info,
        date_bill: data.date_bill,
        billing_type_detail: data.billing_type_detail,
        billing_status: data.billing_status,
        billing_status_remark: data.billing_status_remark, //หมายเหตุสถานะวางบิล
        // base_adjust: data.base_adjust,
        // aging_cash: data.aging_cash,
        billing_checking: data.billing_checking,
        billing_remark: data.billing_remark,
        estimate_date: new Date(data.estimate_date).toJSON(),
        confirm_date: new Date(data.confirm_date).toJSON(),
        incoming_paid_date: new Date(data.incoming_paid_date).toJSON(),
        payment_type: data.payment_type,
        paid: data.paid,
        status_payment: data.status_payment,
        // paid_date: new Date(data.paid_date).toJSON(),
        asking_payment: data.asking_payment,
        asking_payment_date: new Date(data.asking_payment_date).toJSON(),
        remain_day: data.remain_day,
        memo_date_one: new Date(data.memo_date_one).toJSON(),
        memo_date_two: new Date(data.memo_date_two).toJSON(),
        memo_date_three: new Date(data.memo_date_three).toJSON(),
        debt_reduction_docno: data.debt_reduction_docno,
        reissue_status: data.reissue_status,
        cn_number: data.cn_number,
        // cn_ten: data.cn_ten, //คอลัมน์CN10
        rv_number: data.rv_number,
        receipt_number: data.receipt_number,
        incoming_status: data.incoming_status,
        action_by: localStorage.getItem("account_id"),
        remark_warroom: data.remark_warroom,
        user_name: data.user_name,
        remark_date: new Date(data.remark_date).toJSON(),
        service: data.service,
        quotation: data.quotation,
      };
      this.Update(updateData);
      this.dialog_popup = false;
    },
    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.dialog_popup = true;
    },
    getFinance() {
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
        .get(process.env.VUE_APP_API + "/getinvoicestatus/customer", headers)
        .then((response) => {
          for (let index = 0; index < response.data.length; index++) {
            this.emptyFinance.push(response.data[index].financial_name);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    send_request() {
      var list = [];
      var list_receipt = [];
      var emptyEmail = [];
      let email = {};
      for (let index = 0; index < this.selected_list.length; index++) {
        list.push(this.selected_list[index].invoice_no);
                if (this.selected_list[index].customer_email === "") {
          emptyEmail.push(this.selected_list[index].invoice_no);
        }
        email[this.selected_list[index].invoice_no] = this.selected_list[
          index
        ].customer_email;
      }

      for (let i = 0; i < this.selected_list_rv.length; i++){
        if(this.selected_list_rv[i].sendreceipt == "เลขที่ตัดหนี้"){
          list_receipt.push({invoice_no : this.selected_list_rv[i].invoice_no , receipt_number : this.selected_list_rv[i].rv_number});
        }else if(this.selected_list_rv[i].sendreceipt == "เลขที่ใบเสร็จ"){
          list_receipt.push({invoice_no : this.selected_list_rv[i].invoice_no , receipt_number : this.selected_list_rv[i].receipt_number});
        }else{
          list_receipt.push({invoice_no : this.selected_list_rv[i].invoice_no , receipt_number : ""});
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

      if (this.select_type_send == "ใบเสร็จ") {
        if (emptyEmail.length > 0) {
          Swal.fire({
            icon: "error",
            title: "<h4>ไม่สามารถส่ง Request ได้</h4>",
            html:
              "เนื่องจาก <strong>Invoice No :</strong> " +
              emptyEmail.join(", ") +
              " ไม่มี E-mail ลูกค้า",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.dialog_send = false;
            this.dialog_preview = false;
            this.select_type_send = "";
            this.selected_list = [];
            this.selected = [];
          });
        }else{
        this.axios
          .post(
            process.env.VUE_APP_API + "/getinvoicestatus/receipt",list_receipt,headers
          )
          .then((response) => {
            if (response.data.message == "Success") {
              this.dialog_send = false;
              Swal.fire({
                  icon: "success",
                  title: "<h4>ส่ง request ใบเสร็จเรียบร้อย</h4>",
                  html: list
                    .map(
                      (invoice) =>
                        "<strong>Invoice No : </strong>" +
                        invoice +
                        "<br>ส่งไปที่ E-mail : " +
                        email[invoice]
                    )
                    .join("<br>"),
                  showConfirmButton: false,
                  timer: 3000,
                }).then(() => {
                this.select_type_send = "";
                this.dialog_preview = false;
                this.selected_list = [];
                this.selected = [];
              });
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                icon: "error",
                title: "<h4>ไม่สามารถส่ง request ได้</h4>",
                showConfirmButton: false,
                timer: 3000,
              }).then(() => {
                //  this.select_type_send = ''
                //      this.dialog_send = false;
                //  this.dialog_preview = false;
              });
            }
          });
        }
      } else if (this.select_type_send == "ใบแจ้งหนี้") {
        if (emptyEmail.length > 0) {
          Swal.fire({
            icon: "error",
            title: "<h4>ไม่สามารถส่ง Request ได้</h4>",
            html:
              "เนื่องจาก <strong>Invoice No :</strong> " +
              emptyEmail.join(", ") +
              " ไม่มี E-mail ลูกค้า",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.dialog_send = false;
            this.dialog_preview = false;
            this.select_type_send = "";
            this.selected_list = [];
            this.selected = [];
          });
        }else{
        this.axios
          .post(
            process.env.VUE_APP_API + "/getinvoicestatus/billing",
            {
              invoice_no: list,
            },
            headers
          )
          .then((response) => {
            if (response.data.message == "Success") {
              Swal.fire({
                  icon: "success",
                  title: "<h4>ส่ง request ใบแจ้งหนี้เรียบร้อย</h4>",
                  html: list
                    .map(
                      (invoice) =>
                        "<strong>Invoice No : </strong>" +
                        invoice +
                        "<br>ส่งไปที่ E-mail : " +
                        email[invoice]
                    )
                    .join("<br>"),
                  showConfirmButton: false,
                  timer: 3000,
                }).then(() => {
                this.dialog_send = false;
                this.dialog_preview = false;
                this.select_type_send = "";
                this.selected_list = [];
                this.selected = [];
              });
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                icon: "error",
                title: "<h4>ไม่สามารถส่ง request ได้</h4>",
                showConfirmButton: false,
                timer: 3000,
              })
            }
          });
        }
      } else if (this.select_type_send == "แจ้งเตือนติดตามการชำระ") {
        if (emptyEmail.length > 0) {
          Swal.fire({
            icon: "error",
            title: "<h4>ไม่สามารถส่ง Request ได้</h4>",
            html:
              "เนื่องจาก <strong>Invoice No :</strong> " +
              emptyEmail.join(", ") +
              " ไม่มี E-mail ลูกค้า",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.dialog_send = false;
            this.dialog_preview = false;
            this.select_type_send = "";
            this.selected_list = [];
            this.selected = [];
          });
        } else {
          this.axios
            .post(
              process.env.VUE_APP_API +
                "/getinvoicestatus/sendmailbeforinvoice",
              {
                invoice_no: list,
              },
              headers
            )
            .then((response) => {
              if (response.data.msg == "Success") {
                Swal.fire({
                  icon: "success",
                  title: "<h4>ส่ง request แจ้งเตือนติดตามการชำระเรียบร้อย</h4>",
                  html: list
                    .map(
                      (invoice) =>
                        "<strong>Invoice No : </strong>" +
                        invoice +
                        "<br>ส่งไปที่ E-mail : " +
                        email[invoice]
                    )
                    .join("<br>"),
                  showConfirmButton: false,
                  timer: 3000,
                }).then(() => {
                  this.dialog_send = false;
                  this.dialog_preview = false;
                  this.select_type_send = "";
                  this.selected_list = [];
                  this.selected = [];
                });
              }
            })
            .catch((error) => {
              if (error) {
                Swal.fire({
                  icon: "error",
                  title: "<h4>ไม่สามารถส่ง request ได้</h4>",
                  showConfirmButton: false,
                  timer: 3000,
                })
              }
            });
        }
      } else if (this.select_type_send == "เอกสาร WHT") {
        if (emptyEmail.length > 0) {
          Swal.fire({
            icon: "error",
            title: "<h4>ไม่สามารถส่ง Request ได้</h4>",
            html:
              "เนื่องจาก <strong>Invoice No :</strong> " +
              emptyEmail.join(", ") +
              " ไม่มี E-mail ลูกค้า",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.dialog_send = false;
            this.dialog_preview = false;
            this.select_type_send = "";
            this.selected_list = [];
            this.selected = [];
          });
        }else{
        this.axios
          .post(
            process.env.VUE_APP_API + "/getinvoicestatus/sendsrwstatement",
            {
              invoice_no: list,
            },
            headers
          )
          .then((response) => {
            if (response.data.msg == "Success") {
              Swal.fire({
                  icon: "success",
                  title: "<h4>ส่ง request เอกสาร WHT</h4>",
                  html: list
                    .map(
                      (invoice) =>
                        "<strong>Invoice No : </strong>" +
                        invoice +
                        "<br>ส่งไปที่ E-mail : " +
                        email[invoice]
                    )
                    .join("<br>"),
                  showConfirmButton: false,
                  timer: 3000,
                }).then(() => {
                this.dialog_send = false;
                this.dialog_preview = false;
                this.select_type_send = "";
                this.selected_list = [];
                this.selected = [];
              });
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                icon: "error",
                title: "<h4>ไม่สามารถส่ง request ได้</h4>",
                showConfirmButton: false,
                timer: 3000,
              })
            }
          });
        }
      }
    },
    // dialog bank statement
    bank_statement(data){
      this.item_bank = data
      // this.bank_dialog = true
      eventBus.$emit('openBankDialog')
    },
    // end
    select() {
      // this.selected_list = []
      this.selected_list_rv = []
      localStorage.setItem("list_invoice", JSON.stringify(this.selected));
      this.selected_list = JSON.parse(localStorage.getItem("list_invoice"));

      if(this.selected_list.length != 0){
        for(let i = 0; i < this.selected_list.length ; i++){
          // if((this.selected_list[i].cut_debt == "Matching" || this.selected_list[i].cut_debt == "Matched" || 
          //   this.selected_list[i].cut_debt == "On Process") && (this.selected_list[i].status_recheck != "Partial" && this.selected_list[i].status_recheck != "" 
          //   && this.selected_list[i].status_recheck != "ลดหนี้บางส่วน")){
          //   this.check_bank_statement = false;
          //   break
          // }
          if((this.selected_list[i].cut_debt == "Matching" || this.selected_list[i].cut_debt == "Matched") && (this.selected_list[i].status_recheck != "Partial" && 
            this.selected_list[i].status_recheck != "" && this.selected_list[i].status_recheck != "ลดหนี้บางส่วน")){
            this.check_bank_statement = false;
            break
          }else if(this.selected_list[0].customer_no != this.selected_list[i].customer_no){
            this.check_bank_statement = false;
            break
          }else if(this.selected_list[0].aging == "0"){
            this.check_bank_statement = false;
            break
          }
          /*
          else if(this.selected_list[i].status_recheck != "Partial"){
            this.check_bank_statement = false;
            break
          }
          */
          else{
            this.check_bank_statement = true;
          }
        }

        this.selected_list.forEach((data) =>{
          let list = [];
          if(data.rv_number != "" && data.receipt_number != ""){
            list.push("" , "เลขที่ตัดหนี้" , "เลขที่ใบเสร็จ")
          }else if(data.rv_number != "" && data.receipt_number == ""){
            list.push("" , "เลขที่ตัดหนี้")
          }else if(data.rv_number == "" && data.receipt_number != ""){
            list.push("" , "เลขที่ใบเสร็จ")
          }
          
          this.selected_list_rv.push({
            invoice_no : data.invoice_no,
            customer_no : data.customer_no,
            customer_name : data.customer_name,
            rv_number : data.rv_number,
            receipt_number : data.receipt_number,
            sendreceipt : "",
            list : list
          })
        })

      }else{
        this.check_bank_statement = true;
      }
      
        
    },
    aging(item) {
      return Number(item.aging).toLocaleString();
    },
    preview_data(item) {
      this.dialog_preview = true;
      this.finish = false;
      this.send_invoice_no = item;
      this.file_preview();
    },
    open_preview(item) {
      this.send_invoice_no = item;
      this.dialog_preview = true;
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
        .post(
          process.env.VUE_APP_API + "/invoice/preview",
          {
            invoice: item.invoice_no,
          },
          headers
        )
        .then((response) => {
          if (response.data.File == "") {
            Swal.fire({
              icon: "error",
              title: "<h4>ไม่พบ File ข้อมูล</h4>",
              showConfirmButton: false,
              timer: 2000,
            });
            this.pdf = "";
          } else {
            var file = response.data["File"];

            this.pdf = this.getPdf(file);
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
          }
        });
    },
    file_preview() {
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
        .post(
          process.env.VUE_APP_API + "/invoice/preview",
          {
            invoice: this.send_invoice_no.invoice_no,
          },
          headers
        )
        .then((response) => {
          if (response.data.File == "") {
            Swal.fire({
              icon: "error",
              title: "<h4>ไม่พบ File ข้อมูล</h4>",
              showConfirmButton: false,
              timer: 2000,
            });
            this.pdf = "";
          } else {
            var file = response.data["File"];

            this.pdf = this.getPdf(file);
          }
        });

      // var f = event.target.files[0];
    },
    getPdf(base64) {
      const pdf = base64;
      return this.base64ToArrayBuffer(pdf);
    },
    base64ToArrayBuffer(base64) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      this.finish = true;
      return bytes.buffer;
    },

    select_type() {
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
          process.env.VUE_APP_API + "/debt/customer/" + this.type_debt,
          headers
        )
        .then(() => {});
    },
    customListCustomer() {
      if (this.searchInput) {
        for (let index = 0; index < this.column_name.length; index++) {
          if (this.searchInput == this.column_name[index].value) {
            this.customer_edit = [
              {
                column: this.column_name[index].name,
                value: "",
              },
            ];
          }
        }
      } else {
        this.customer_edit = [];
      }
    },
    customListCustomer_invoice() {
      if (this.searchInput_invoice_no) {
        for (let index = 0; index < this.column_name.length; index++) {
          if (this.searchInput_invoice_no == this.column_name[index].value) {
            this.customer_edit_invoice = [
              {
                column: this.column_name[index].name,
                value: "",
              },
            ];
          }
        }
      } else {
        this.customer_edit_invoice = [];
      }
    },
    delete_customer_edit(item) {
      this.customer_edit.splice(item.index, 1);
    },
    // edit_column_col(column) {
    //   var edit = {
    //     key: column,
    //     value: "",
    //   };
    // },
    add_column_edit() {
      this.customer_edit.push({
        column: "",
        value: "",
      });
    },

    searchAddID(customer_no) {
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      this.list_customer_column = [];
      this.axios
        .get(process.env.VUE_APP_API + "/customer/" + customer_no, headers)
        .then(
          (response) => {
            (this.rules = [
              (value) => !!value || "Required.",
              (value) => value !== "" || "ไม่พบข้อมูล",
            ]),
              (this.editedItem.customer_name =
                response.data.data.customer_name);
            for (let index = 0; index < this.column_name.length; index++) {
              if (this.role_status == "super_admin") {
                if (
                  this.column_name[index].name == "Cus Email" ||
                  //this.column_name[index].name == "Customer Criteria" ||
                  this.column_name[index].name == "ห้ามติดต่อ" ||
                  this.column_name[index].name == "factoring" ||
                  this.column_name[index].name == "Online Payment" ||
                  this.column_name[index].name == "ข้อมูลลูกค้า" ||
                  this.column_name[index].name == "วันที่วางบิล" ||
                  this.column_name[index].name == "วิธีวางบิล" ||
                  this.column_name[index].name == "สถานะวางบิล" ||
                  this.column_name[index].name == "หมายเหตุสถานะวางบิล" ||
                  this.column_name[index].name == "วางบิลพร้อมใบเสร็จ" ||
                  this.column_name[index].name == "หมายเหตุการวางบิล" ||
                  this.column_name[index].name == "สถานะเก็บเงิน" ||
                  this.column_name[index].name == "กำหนดชำระ" ||
                  this.column_name[index].name == "วันที่ confirm" ||
                  this.column_name[index].name == "วันที่เงินเข้า" ||
                  this.column_name[index].name == "วันที่ดำเนินการ" ||
                  this.column_name[index].name == "ช่องทางการชำระเงิน" ||
                  this.column_name[index].name == "Mainstatus" ||
                  this.column_name[index].name == "Recheck" ||
                  this.column_name[index].name == "สถานะการชำระเงิน" ||
                  this.column_name[index].name == "หมายเหตุ Warroom"
                ) {
                  this.list_customer_column.push({
                    name: this.column_name[index].name,
                    column: this.column_name[index].value,
                  });
                }
              } else if (this.role_status == "admin") {
                if (
                  this.column_name[index].name == "Cus Email" ||
                  //this.column_name[index].name == "Customer Criteria" ||
                  this.column_name[index].name == "ห้ามติดต่อ" ||
                  this.column_name[index].name == "factoring" ||
                  this.column_name[index].name == "Online Payment" ||
                  this.column_name[index].name == "ข้อมูลลูกค้า" ||
                  this.column_name[index].name == "วันที่วางบิล" ||
                  this.column_name[index].name == "วิธีวางบิล" ||
                  this.column_name[index].name == "สถานะวางบิล" ||
                  this.column_name[index].name == "หมายเหตุสถานะวางบิล" ||
                  this.column_name[index].name == "วางบิลพร้อมใบเสร็จ" ||
                  this.column_name[index].name == "หมายเหตุการวางบิล" ||
                  this.column_name[index].name == "สถานะเก็บเงิน" ||
                  this.column_name[index].name == "กำหนดชำระ" ||
                  this.column_name[index].name == "วันที่ confirm" ||
                  this.column_name[index].name == "วันที่ดำเนินการ" ||
                  this.column_name[index].name == "ช่องทางการชำระเงิน" ||
                  this.column_name[index].name == "Recheck" ||
                  this.column_name[index].name == "สถานะการชำระเงิน" ||
                  this.column_name[index].name == "หมายเหตุ Warroom"
                ) {
                  this.list_customer_column.push({
                    name: this.column_name[index].name,
                    column: this.column_name[index].value,
                  });
                }
              } else if (this.role_status == "wait_down_service") {
                if (
                  this.column_name[index].name == "Cus Email" ||
                  //this.column_name[index].name == "Customer Criteria" ||
                  this.column_name[index].name == "ห้ามติดต่อ" ||
                  this.column_name[index].name == "factoring" ||
                  this.column_name[index].name == "Online Payment" ||
                  this.column_name[index].name == "ข้อมูลลูกค้า" ||
                  this.column_name[index].name == "วันที่วางบิล" ||
                  this.column_name[index].name == "วิธีวางบิล" ||
                  this.column_name[index].name == "สถานะวางบิล" ||
                  this.column_name[index].name == "หมายเหตุสถานะวางบิล" ||
                  this.column_name[index].name == "วางบิลพร้อมใบเสร็จ" ||
                  this.column_name[index].name == "หมายเหตุการวางบิล" ||
                  this.column_name[index].name == "สถานะเก็บเงิน" ||
                  this.column_name[index].name == "กำหนดชำระ" ||
                  this.column_name[index].name == "วันที่ confirm" ||
                  this.column_name[index].name == "วันที่ดำเนินการ" ||
                  this.column_name[index].name == "ช่องทางการชำระเงิน" ||
                  this.column_name[index].name == "Recheck" ||
                  this.column_name[index].name == "สถานะการชำระเงิน" ||
                  this.column_name[index].name == "หมายเหตุ Warroom"
                ) {
                  this.list_customer_column.push({
                    name: this.column_name[index].name,
                    column: this.column_name[index].value,
                  });
                }
              }
            }
          },
          (error) => {
            if (error) {
              this.rules = [
                (value) => value.customer_no == "" || "ไม่พบข้อมูล",
              ];
              this.editedItem.customer_name = "";
              this.list_customer_column = [];
            }
          }
        );
    },
    set_clear(item) {
      item.value = "0001-01-01";
      this.save_edit_cus_no();
    },
    set_clear_invoice(item) {
      item.value = "0001-01-01";
      this.save_edit_invoice_no();
    },
    select_edit_cus(e) {
      let b = null;
      if (e.target.value == "true") {
        b = "true";
      } else if (e.target.value == "false") {
        b = "false";
      } else {
        b = "";
      }
      var edited = {
        key: null,
        value: b,
      };
      //  edited.value = this.customer_edit[0].value
      for (let index = 0; index < this.column_name.length; index++) {
        if (this.customer_edit[0].column == this.column_name[index].name) {
          edited.key = this.column_name[index].value;
        }
      }
      // edited.value = Boolean(e.target.value)
      this.send_edit = edited;
    },
    save_edit_cus_no() {
      // this.dialog_edit_cus_no = false;
      var edited = {
        key: null,
        value: "",
      };
      edited.value = this.customer_edit[0].value;
      for (let index = 0; index < this.column_name.length; index++) {
        if (this.customer_edit[0].column == this.column_name[index].name) {
          edited.key = this.column_name[index].value;
        }
      }

      if (
        this.customer_edit[0].column == "ห้ามติดต่อ" ||
        this.customer_edit[0].column == "factoring" 
        // this.customer_edit[0].column == "Online Payment"
      ) {
        edited.value = Boolean(this.customer_edit[0].value);
      }

      if (
        this.customer_edit[0].column == "กำหนดชำระ" ||
        this.customer_edit[0].column == "วันที่ confirm" ||
        this.customer_edit[0].column == "วันที่เงินเข้า" ||
        this.customer_edit[0].column == "วันที่ดำเนินการ"
      ) {
        edited.value = String(
          (new Date(this.customer_edit[0].value).getTime() / 1000).toFixed(0)
        );
      }

      if (this.customer_edit[0].column == "วันที่วางบิล") {
        edited.key = "date_bill";
        edited.value = String(
          (new Date(this.customer_edit[0].value).getTime() / 1000).toFixed(0)
        );
      }
      this.send_edit = edited;
    },
    select_edit_invoice(e) {
      let b = null;
      if (e.target.value == "true") {
        b = "true";
      } else if (e.target.value == "false") {
        b = "false";
      } else {
        b = "";
      }
      var edited = {
        key: null,
        value: b,
      };
      //  edited.value = this.customer_edit[0].value
      for (let index = 0; index < this.column_name.length; index++) {
        if (
          this.customer_edit_invoice[0].column == this.column_name[index].name
        ) {
          edited.key = this.column_name[index].value;
        }
      }
      // edited.value = Boolean(e.target.value)
      this.send_edit = edited;
    },
    save_edit_invoice_no() {
      // this.dialog_edit_cus_no = false;
      var edited = {
        key: null,
        value: "",
      };
      edited.value = this.customer_edit_invoice[0].value;
      for (let index = 0; index < this.column_name.length; index++) {
        if (
          this.customer_edit_invoice[0].column == this.column_name[index].name
        ) {
          edited.key = this.column_name[index].value;
        }
      }

      if (
        this.customer_edit_invoice[0].column == "ห้ามติดต่อ" ||
        this.customer_edit_invoice[0].column == "factoring" 
        // this.customer_edit_invoice[0].column == "Online Payment"
      ) {
        edited.value = Boolean(this.customer_edit_invoice[0].value);
      }

      if (
        this.customer_edit_invoice[0].column == "กำหนดชำระ" ||
        this.customer_edit_invoice[0].column == "วันที่ confirm" ||
        this.customer_edit_invoice[0].column == "วันที่เงินเข้า" ||
        this.customer_edit_invoice[0].column == "วันที่ดำเนินการ"
      ) {
        edited.value = String(
          (
            new Date(this.customer_edit_invoice[0].value).getTime() / 1000
          ).toFixed(0)
        );
      }

      if (this.customer_edit_invoice[0].column == "วันที่วางบิล") {
        edited.key = "date_bill";
        edited.value = String(
          (
            new Date(this.customer_edit_invoice[0].value).getTime() / 1000
          ).toFixed(0)
        );
      }
      this.send_edit = edited;
    },
    save_confirm_api() {
      var edited = {
        key: null,
        value: "",
      };
      if (this.send_edit == null) {
        for (let index = 0; index < this.column_name.length; index++) {
          if (this.customer_edit[0].column == this.column_name[index].name) {
            edited.key = this.column_name[index].value;
          }
        }
        if (this.customer_edit[0].column == "วันที่วางบิล") {
          (edited.key = "date_bill"),
            (edited.value = this.customer_edit[0].value);
          // edited.value = String((new Date(this.customer_edit[0].value).getTime() / 1000).toFixed(0))
        }
        this.send_edit = edited;
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
      this.finish = false;
      this.axios
        .put(
          process.env.VUE_APP_API +
            "/invoice/customer/" +
            this.editedItem.customer_no,
          this.send_edit,
          headers
        )
        .then(
          () => {
            // this.close_edit_cus_no()
            this.finish = true;
            Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              this.close_edit_cus_no();
              this.getInvoice();
              // this.refresh_filter();
              // this.searchWord();
            });
          },
          (error) => {
            this.finish = true;
            if (error) {
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถแก้ไขข้อมูลได้",
                showConfirmButton: false,
                timer: 3000,
              });
            }
          }
        );
    },
    save_confirm_api_invoice() {
      var edited = {
        key: null,
        value: "",
      };
      if (this.send_edit == null) {
        for (let index = 0; index < this.column_name.length; index++) {
          if (
            this.customer_edit_invoice[0].column == this.column_name[index].name
          ) {
            edited.key = this.column_name[index].value;
          }
        }
        if (this.customer_edit_invoice[0].column == "วันที่วางบิล") {
          (edited.key = "date_bill"),
            (edited.value = this.customer_edit_invoice[0].value);
          // edited.value = String((new Date(this.customer_edit[0].value).getTime() / 1000).toFixed(0))
        }
        this.send_edit = edited;
      }

      var body_invoice_no = {
        invoice_no: [],
        key: this.send_edit.key,
        value: this.send_edit.value,
      };
      for (let i = 0; i < this.selected_list.length; i++) {
        body_invoice_no.invoice_no.push(this.selected_list[i].invoice_no);
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
      // this.finish = false;
      this.axios
        .put(process.env.VUE_APP_API + "/invoice", body_invoice_no, headers)
        .then(
          () => {
            // this.close_edit_cus_no()
            this.finish = true;
            Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              this.close_edit_invoice_no();
              this.getInvoice();
              // this.searchWord();
              // this.refresh_filter();
            });
          },
          (error) => {
            this.finish = true;
            if (error) {
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถแก้ไขข้อมูลได้",
                showConfirmButton: false,
                timer: 3000,
              });
            }
          }
        );
    },
    delete_selected_list(item) {
      for (let index = 0; index < this.selected_list.length; index++) {
        if (item == this.selected_list[index]) {
          this.selected_list.splice(index, 1);
          //  this.selected.splice(index , 1)
        }
      }

      for (let u = 0; u < this.selected.length; u++) {
        if (item.invoice_no == this.selected[u].invoice_no) {
          this.selected.splice(u, 1);
          //  this.selected.splice(index , 1)
        }
      }
      //  localStorage.setItem("list_invoice", JSON.stringify(this.selected_list));
    },
    close_edit_cus_no() {
      this.editedItem.customer_no = "";
      this.editedItem.customer_name = "";
      this.list_customer_column = [];
      this.customer_edit = [];
      this.searchInput = null;
      this.dialog_edit_cus_no = false;
    },
    close_edit_invoice_no() {
      this.list_customer_column = [];
      this.customer_edit_invoice = [];
      this.searchInput_invoice_no = null;
      this.dialog_edit_invoice_no = false;
      this.send_edit = null;
    },
    open_edit_by_invoice() {
      for (let index = 0; index < this.column_name.length; index++) {
        if (this.role_status == "super_admin") {
          if (
            this.column_name[index].name == "Cus Email" ||
            //this.column_name[index].name == "Customer Criteria" ||
            this.column_name[index].name == "ห้ามติดต่อ" ||
            this.column_name[index].name == "factoring" ||
            this.column_name[index].name == "Online Payment" ||
            this.column_name[index].name == "ข้อมูลลูกค้า" ||
            this.column_name[index].name == "วันที่วางบิล" ||
            this.column_name[index].name == "วิธีวางบิล" ||
            this.column_name[index].name == "สถานะวางบิล" ||
            this.column_name[index].name == "หมายเหตุสถานะวางบิล" ||
            this.column_name[index].name == "วางบิลพร้อมใบเสร็จ" ||
            this.column_name[index].name == "หมายเหตุการวางบิล" ||
            this.column_name[index].name == "สถานะเก็บเงิน" ||
            this.column_name[index].name == "กำหนดชำระ" ||
            this.column_name[index].name == "วันที่ confirm" ||
            this.column_name[index].name == "วันที่เงินเข้า" ||
            this.column_name[index].name == "วันที่ดำเนินการ" ||
            this.column_name[index].name == "ช่องทางการชำระเงิน" ||
            this.column_name[index].name == "Mainstatus" ||
            this.column_name[index].name == "Recheck" ||
            this.column_name[index].name == "สถานะการชำระเงิน" ||
            this.column_name[index].name == "หมายเหตุ Warroom"
          ) {
            this.list_customer_column.push({
              name: this.column_name[index].name,
              column: this.column_name[index].value,
            });
          }
        } else if (this.role_status == "admin") {
          if (
            this.column_name[index].name == "Cus Email" ||
            //this.column_name[index].name == "Customer Criteria" ||
            this.column_name[index].name == "ห้ามติดต่อ" ||
            this.column_name[index].name == "factoring" ||
            this.column_name[index].name == "Online Payment" ||
            this.column_name[index].name == "ข้อมูลลูกค้า" ||
            this.column_name[index].name == "วันที่วางบิล" ||
            this.column_name[index].name == "วิธีวางบิล" ||
            this.column_name[index].name == "สถานะวางบิล" ||
            this.column_name[index].name == "หมายเหตุสถานะวางบิล" ||
            this.column_name[index].name == "วางบิลพร้อมใบเสร็จ" ||
            this.column_name[index].name == "หมายเหตุการวางบิล" ||
            this.column_name[index].name == "สถานะเก็บเงิน" ||
            this.column_name[index].name == "กำหนดชำระ" ||
            this.column_name[index].name == "วันที่ confirm" ||
            this.column_name[index].name == "วันที่ดำเนินการ" ||
            this.column_name[index].name == "ช่องทางการชำระเงิน" ||
            this.column_name[index].name == "Recheck" ||
            this.column_name[index].name == "สถานะการชำระเงิน" ||
            this.column_name[index].name == "หมายเหตุ Warroom"
          ) {
            this.list_customer_column.push({
              name: this.column_name[index].name,
              column: this.column_name[index].value,
            });
          }
        } else if (this.role_status == "wait_down_service") {
          if (
            this.column_name[index].name == "Cus Email" ||
            //this.column_name[index].name == "Customer Criteria" ||
            this.column_name[index].name == "ห้ามติดต่อ" ||
            this.column_name[index].name == "factoring" ||
            this.column_name[index].name == "Online Payment" ||
            this.column_name[index].name == "ข้อมูลลูกค้า" ||
            this.column_name[index].name == "วันที่วางบิล" ||
            this.column_name[index].name == "วิธีวางบิล" ||
            this.column_name[index].name == "สถานะวางบิล" ||
            this.column_name[index].name == "หมายเหตุสถานะวางบิล" ||
            this.column_name[index].name == "วางบิลพร้อมใบเสร็จ" ||
            this.column_name[index].name == "หมายเหตุการวางบิล" ||
            this.column_name[index].name == "สถานะเก็บเงิน" ||
            this.column_name[index].name == "กำหนดชำระ" ||
            this.column_name[index].name == "วันที่ confirm" ||
            this.column_name[index].name == "วันที่ดำเนินการ" ||
            this.column_name[index].name == "ช่องทางการชำระเงิน" ||
            this.column_name[index].name == "Mainstatus" ||
            this.column_name[index].name == "Recheck" ||
            this.column_name[index].name == "สถานะการชำระเงิน" ||
            this.column_name[index].name == "หมายเหตุ Warroom"
          ) {
            this.list_customer_column.push({
              name: this.column_name[index].name,
              column: this.column_name[index].value,
            });
          }
        }
      }
    },
    setting_column() {
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.show_column = [];
      this.column_select = [];
      this.list_column = [];
      for (let i = 0; i < this.headers.length; i++) {
        // สำหรับตัวที่ต้องการ fixed คอลัมให้มีตลอด ไม่ได้เพิ่มตามคอลัมที่ api ส่งมาให้
        if (this.headers[i].value == "invoice_no") {
          this.show_column.push(this.headers[i]);
          this.column_select.push(this.headers[i]);
          this.list_column.push(this.headers[i]);
        }
        if (this.headers[i].value == "aging") {
          this.column_select.push(this.headers[i]);
        }
        if (this.headers[i].value == "preview" && this.role_status != "viewer") {
          this.column_select.push(this.headers[i]);
        }
        // คอลัม detail
        if (this.headers[i].value == "detail") {
          this.column_select.push(this.headers[i]);
        }
      }

      this.axios
        .get(process.env.VUE_APP_API + "/setting/columns/invoice", headers)
        .then((response) => {
          for (let index = 0; index < this.column_name.length; index++) {
            //----------------------เพิ่มตัวตาม column -----------------------------//
            if (this.column_name[index].value == "amount") {
              this.column_name[index].show = response.data.amount;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "amount_after_vat" &&
                  response.data.amount == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            if (this.column_name[index].value == "asking_payment_date") {
              this.column_name[index].show = response.data.asking_payment_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "asking_payment_date" &&
                  response.data.asking_payment_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "bill_date") {
              this.column_name[index].show = response.data.bill_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "date_bill" &&
                  response.data.bill_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "billing_checking") {
              this.column_name[index].show = response.data.billing_checking;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "billing_checking" &&
                  response.data.billing_checking == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "billing_remark") {
              this.column_name[index].show = response.data.billing_remark;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "billing_remark" &&
                  response.data.billing_remark == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "billing_status") {
              this.column_name[index].show = response.data.billing_status;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "billing_status" &&
                  response.data.billing_status == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            // คอลัมน์หมายเหตุสถานะวางบิล
            if (this.column_name[index].value == "billing_status_remark") {
              this.column_name[index].show = response.data.billing_status_remark;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "billing_status_remark" &&
                  response.data.billing_status_remark == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            // end
            if (this.column_name[index].value == "billing_type_detail") {
              this.column_name[index].show = response.data.billing_type_detail;

              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "billing_type_detail" &&
                  response.data.billing_type_detail == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "debt_reduction_docno") {
              this.column_name[index].show = response.data.debt_reduction_docno;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "debt_reduction_docno" &&
                  response.data.debt_reduction_docno == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "reissue_status") {
              this.column_name[index].show = response.data.reissue_status;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "reissue_status" &&
                  response.data.reissue_status == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "cn_number") {
              this.column_name[index].show = response.data.cn_number;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "cn_number" &&
                  response.data.cn_number == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            // คอลัมน์CN10
            // if (this.column_name[index].value == "cn_ten") {
            //   this.column_name[index].show = response.data.cn_ten;
            //   for (let k = 0; k < this.headers.length; k++) {
            //     if (
            //       this.headers[k].value == "cn_ten" &&
            //       response.data.cn_ten == true
            //     ) {
            //       this.show_column.push(this.headers[k]);
            //       this.column_select.push(this.headers[k]);
            //       this.list_column.push(this.headers[k]);
            //     }
            //   }
            // }
            // end
            if (this.column_name[index].value == "confirm_date") {
              this.column_name[index].show = response.data.confirm_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "confirm_date" &&
                  response.data.confirm_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "customer_name") {
              this.column_name[index].show = response.data.customer_name;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "customer_name" &&
                  response.data.customer_name == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "customer_no") {
              this.column_name[index].show = response.data.customer_no;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "customer_no" &&
                  response.data.customer_no == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "end_date") {
              this.column_name[index].show = response.data.end_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "end_date" &&
                  response.data.end_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "estimate_date") {
              this.column_name[index].show = response.data.estimate_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "estimate_date" &&
                  response.data.estimate_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "factoring") {
              this.column_name[index].show = response.data.factoring;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "factoring" &&
                  response.data.factoring == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "finance_name") {
              this.column_name[index].show = response.data.finance_name;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "finance_name" &&
                  response.data.finance_name == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "incoming_paid_date") {
              this.column_name[index].show = response.data.incoming_paid_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "incoming_paid_date" &&
                  response.data.incoming_paid_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "invoice_date") {
              this.column_name[index].show = response.data.invoice_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "invoice_date" &&
                  response.data.invoice_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "customer_criteria") {
              this.column_name[index].show = response.data.customer_criteria;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "customer_criteria" &&
                  response.data.customer_criteria == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "no_contact") {
              this.column_name[index].show = response.data.no_contact;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "no_contact" &&
                  response.data.no_contact == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "online_payment") {
              this.column_name[index].show = response.data.online_payment;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "online_payment" &&
                  response.data.online_payment == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "over_due") {
              this.column_name[index].show = response.data.over_due;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "over_due" &&
                  response.data.over_due == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "paid") {
              this.column_name[index].show = response.data.paid;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "paid" &&
                  response.data.paid == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            // if (this.column_name[index].value == "paid_date") {
            //   this.column_name[index].show = response.data.paid_date;
            //   for (let k = 0; k < this.headers.length; k++) {
            //     if (
            //       this.headers[k].value == "paid_date" &&
            //       response.data.paid_date == true
            //     ) {
            //       this.show_column.push(this.headers[k]);
            //       this.column_select.push(this.headers[k]);
            //       this.list_column.push(this.headers[k]);
            //     }
            //   }
            // }

            if (this.column_name[index].value == "payment_type") {
              this.column_name[index].show = response.data.payment_type;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "payment_type" &&
                  response.data.payment_type == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "memo_date_one") {
              this.column_name[index].show = response.data.memo_date_one;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "memo_date_one" &&
                  response.data.memo_date_one == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "memo_date_three") {
              this.column_name[index].show = response.data.memo_date_three;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "memo_date_three" &&
                  response.data.memo_date_three == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "memo_date_two") {
              this.column_name[index].show = response.data.memo_date_two;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "memo_date_two" &&
                  response.data.memo_date_two == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "receipt_number") {
              this.column_name[index].show = response.data.receipt_number;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "receipt_number" &&
                  response.data.receipt_number == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "incoming_status") {
              this.column_name[index].show = response.data.incoming_status;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "incoming_status" &&
                  response.data.incoming_status == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "recheck") {
              this.column_name[index].show = response.data.recheck;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "recheck" &&
                  response.data.recheck == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            
            if (this.column_name[index].value == "status_recheck") {
              this.column_name[index].show = response.data.status_recheck;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "status_recheck" &&
                  response.data.status_recheck == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "cut_debt") {
              this.column_name[index].show = response.data.cut_debt;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "cut_debt" &&
                  response.data.cut_debt == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            // if (this.column_name[index].value == "base_adjust") {
            //   this.column_name[index].show = response.data.base_adjust;
            //   for (let k = 0; k < this.headers.length; k++) {
            //     if (
            //       this.headers[k].value == "base_adjust" &&
            //       response.data.base_adjust == true
            //     ) {
            //       this.show_column.push(this.headers[k]);
            //       this.column_select.push(this.headers[k]);
            //       this.list_column.push(this.headers[k]);
            //     }
            //   }
            // }

            // if (this.column_name[index].value == "aging_cash") {
            //   this.column_name[index].show = response.data.aging_cash;
            //   for (let k = 0; k < this.headers.length; k++) {
            //     if (
            //       this.headers[k].value == "aging_cash" &&
            //       response.data.aging_cash == true
            //     ) {
            //       this.show_column.push(this.headers[k]);
            //       this.column_select.push(this.headers[k]);
            //       this.list_column.push(this.headers[k]);
            //     }
            //   }
            // }
            
            if (this.column_name[index].value == "remain_day") {
              this.column_name[index].show = response.data.remain_day;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "remain_day" &&
                  response.data.remain_day == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "remark_date") {
              this.column_name[index].show = response.data.remark_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "remark_date" &&
                  response.data.remark_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "remark_warroom") {
              this.column_name[index].show = response.data.remark_warroom;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "remark_warroom" &&
                  response.data.remark_warroom == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "rv_number") {
              this.column_name[index].show = response.data.rv_number;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "rv_number" &&
                  response.data.rv_number == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            // ปิดคอลัม Sales Representative
            // if (this.column_name[index].value == "sales_representative") {
            //   this.column_name[index].show = response.data.sales_representative;
            //   for (let k = 0; k < this.headers.length; k++) {
            //     if (
            //       this.headers[k].value == "sale_name" &&
            //       response.data.sales_representative == true
            //     ) {
            //       this.show_column.push(this.headers[k]);
            //       this.column_select.push(this.headers[k]);
            //       this.list_column.push(this.headers[k]);
            //     }
            //   }
            // }

            // ปิดคอลัม Sale Team
            // if (this.column_name[index].value == "sales_team") {
            //   this.column_name[index].show = response.data.sales_team;
            //   for (let k = 0; k < this.headers.length; k++) {
            //     if (
            //       this.headers[k].value == "sale_team" &&
            //       response.data.sales_team == true
            //     ) {
            //       this.show_column.push(this.headers[k]);
            //       this.column_select.push(this.headers[k]);
            //       this.list_column.push(this.headers[k]);
            //     }
            //   }
            // }

            if (this.column_name[index].value == "so_number") {
              this.column_name[index].show = response.data.so_number;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "so_number" &&
                  response.data.so_number == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "so_end_date") {
              this.column_name[index].show = response.data.so_end_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "so_end_date" &&
                  response.data.so_end_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "start_date") {
              this.column_name[index].show = response.data.start_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "start_date" &&
                  response.data.start_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "status_payment") {
              this.column_name[index].show = response.data.status_payment;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "status_payment" &&
                  response.data.status_payment == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            if (this.column_name[index].value == "user_name") {
              this.column_name[index].show = response.data.user_name;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "user_name" &&
                  response.data.user_name == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            // เพิ่มมาใหม่
            // if (this.column_name[index].value == "service") {
            //   this.column_name[index].show = response.data.service;
            //   for (let k = 0; k < this.headers.length; k++) {
            //     if (
            //       this.headers[k].value == "service" &&
            //       response.data.service == true
            //     ) {
            //       this.show_column.push(this.headers[k]);
            //       this.column_select.push(this.headers[k]);
            //       this.list_column.push(this.headers[k]);
            //     }
            //   }
            // }
            // if (this.column_name[index].value == "quotation") {
            //   this.column_name[index].show = response.data.quotation;
            //   for (let k = 0; k < this.headers.length; k++) {
            //     if (
            //       this.headers[k].value == "quotation" &&
            //       response.data.quotation == true
            //     ) {
            //       this.show_column.push(this.headers[k]);
            //       this.column_select.push(this.headers[k]);
            //       this.list_column.push(this.headers[k]);
            //     }
            //   }
            // }
            // สิ้นสุด
          }

          var sortt = this.headers;
          this.show_column.sort(function(a, b) {
            return sortt.indexOf(a) - sortt.indexOf(b);
          });
          this.column_select.sort(function(a, b) {
            return sortt.indexOf(a) - sortt.indexOf(b);
          });
          this.list_column.sort(function(a, b) {
            return sortt.indexOf(a) - sortt.indexOf(b);
          });
          // this.finish = true
        })
        .catch((error) => {
          if (error) {
            var settingColumns = {
              amount: true,
              asking_payment_date: true,
              bill_date: true,
              billing_checking: true,
              billing_remark: true,
              billing_status: true,
              billing_status_remark: true, //หมายเหตุสถานะวางบิล
              billing_type_detail: true,
              debt_reduction_docno: true,
              reissue_status: true,
              cn_number: true,
              // cn_ten: true, //คอลัมน์CN10
              confirm_date: true,
              customer_description: true,
              customer_email: true,
              customer_info: true,
              customer_name: true,
              customer_no: true,
              customer_type: true,
              end_date: true,
              estimate_date: true,
              factoring: true,
              finance_name: true,
              incoming_paid_date: true,
              invoice_date: true,
              customer_criteria: true,
              no_contact: true,
              online_payment: true,
              over_due: true,
              paid: true,
              // paid_date: true,
              payment_type: true,
              memo_date_one: true,
              memo_date_three: true,
              memo_date_two: true,
              receipt_number: true,
              incoming_status: true,
              recheck: true,
              status_recheck: true,
              // add status cash collection and aging cash collection
              cut_debt: true,
              // base_adjust: true,
              // aging_cash: true,
              // end
              remain_day: true,
              remark_date: true,
              remark_warroom: true,
              rv_number: true,
              sales_representative: true,
              sales_team: true,
              so_number: true,
              so_end_date: true,
              start_date: true,
              status_payment: true,
              user_name: true,
            };
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
              .post(
                process.env.VUE_APP_API + "/setting/columns/invoice",
                settingColumns,
                headers
              )
              .then((response) => {
                if (response) {
                  // this.finish = false
                  this.setting_column();
                  // this.getInvoice()
                }
              });
          }
        });
    },
    return_confirm_date(item) {
      return moment(item).format("DD/MM/YYYY");
    },
    openestimatedate(item) {
      this.dialog_estimate_date = true;
      this.estimate_date_dialog = item;
    },
    openforecast(item) {
      this.dialog_incoming_paid_date = true;
      this.incoming_paid_date_dialog = item;
    },
    openasking(item) {
      this.dialog_asking_payment_date = true;
      this.asking_payment_date_dialog = item;
    },
    openconfirm(item) {
      this.dialog_open = true;
      this.confirm_date_dialog = item;
    },
    opendatebill(item) {
      this.dialog_date_bill_modal = true;
      this.date_bill_dialog = item;
    },
    ok_confirm_date() {
      this.dialog_open = false;
      this.select_1("", this.confirm_date_dialog);
    },
    ok_estimate_date() {
      this.dialog_estimate_date = false;
      this.select_1("", this.estimate_date_dialog);
    },
    ok_incoming_paid_date() {
      this.dialog_incoming_paid_date = false;
      this.select_1("", this.incoming_paid_date_dialog);
    },
    ok_asking_payment_date() {
      this.dialog_asking_payment_date = false;
      this.select_1("", this.asking_payment_date_dialog);
    },
    ok_date_bill() {
      this.dialog_date_bill_modal = false;
      this.select_1("", this.date_bill_dialog);
      //  return moment(this.confirm_date_dialog.confirm_date).format("YYYY-MM-DD")
    },
    close_estimate_date() {
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          if (response.status === 200) {
            this.dialog_estimate_date = false;
            for (let index = 0; index < response.data.data.length; index++) {
              if (
                this.estimate_date_dialog.invoice_no ==
                response.data.data[index].invoice_no
              ) {
                this.estimate_date_dialog.estimate_date = moment(
                  response.data.data[index].estimate_date
                ).format("YYYY-MM-DD");
              }
            }
          }
        });
    },
    close_incoming_paid_date() {
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          if (response.status === 200) {
            this.dialog_incoming_paid_date = false;
            for (let index = 0; index < response.data.data.length; index++) {
              if (
                this.incoming_paid_date_dialog.invoice_no ==
                response.data.data[index].invoice_no
              ) {
                this.incoming_paid_date_dialog.incoming_paid_date = moment(
                  response.data.data[index].incoming_paid_date
                ).format("YYYY-MM-DD");
              }
            }
          }
        });
    },
    close_asking_payment_date() {
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          if (response.status === 200) {
            this.dialog_asking_payment_date = false;
            for (let index = 0; index < response.data.data.length; index++) {
              if (
                this.asking_payment_date_dialog.invoice_no ==
                response.data.data[index].invoice_no
              ) {
                this.asking_payment_date_dialog.asking_payment_date = moment(
                  response.data.data[index].asking_payment_date
                ).format("YYYY-MM-DD");
              }
            }
          }
        });
    },
    close_confirm() {
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          if (response.status === 200) {
            this.dialog_open = false;
            for (let index = 0; index < response.data.data.length; index++) {
              if (
                this.confirm_date_dialog.invoice_no ==
                response.data.data[index].invoice_no
              ) {
                this.confirm_date_dialog.confirm_date = moment(
                  response.data.data[index].confirm_date
                ).format("YYYY-MM-DD");
              }
            }
          }
        });
    },
    close_date_bill() {
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          if (response.status === 200) {
            this.dialog_date_bill_modal = false;
            for (let index = 0; index < response.data.data.length; index++) {
              if (
                this.date_bill_dialog.invoice_no ==
                response.data.data[index].invoice_no
              ) {
                this.date_bill_dialog.date_bill = moment(
                  response.data.data[index].date_bill
                ).format("YYYY-MM-DD");
              }
            }
          }
        });
    },
    check_list(name) {
      if (name == "customer") {
        this.selected_list.forEach((val) => {
          if (this.customer_list_id.includes(val.customer_no)) {
            console.log("found!");
          } else {
            this.customer_list.push(val);
            this.customer_list_id.push(val.customer_no);
          }
        });
      }
    },
    close_export_cus() {
      this.dialog_export = false;
      this.customer_list = [];
      this.customer_list_id = [];
      this.customer_search.customer_name = null;
      this.customer_search.customer_no = null;
    },
    EXport_cus() {
      // /export/invoice/customer
      var body = {
        customer_no: this.customer_list_id,
      };
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
          process.env.VUE_APP_API + "/export/invoice/customer",
          body,
          headers
        )
        .then((response) => {
          if (response) {
            this.dialog_export = false;
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_by_customer.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
            setTimeout(() => {
              this.customer_list = [];
              this.customer_list_id = [];
            }, 1000);
          }
        })
        .catch((error) => {
          if (error) {
            this.dialog_export = false;
          }
        });
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
    number_INC() {
      return Number(this.item_per_page);
    },
    item_per_page_inc() {
      this.getInvoice();
    },
    change_page_filter() {
      this.finish = false;
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          if (response.status === 200) {
            this.finish = true;
            this.datalist = response.data.data;
            this.Alldata = response.data.data;
            this.selected = JSON.parse(localStorage.getItem("list_invoice"));
            this.selected_list = JSON.parse(
              localStorage.getItem("list_invoice")
            );
            if (this.datalist == undefined || this.datalist == null) {
              this.finish = true;
              this.total_count = 0;
              this.count_invoice = 0;
              this.sum_amount = 0;
              this.datalist = [];
            } else {
              this.finish = true;
              this.total_count = response.data.total.toLocaleString();
              this.count_invoice = response.data.count.toLocaleString();
              this.sum_amount = response.data.sum_amount.toLocaleString();
              this.page_total = response.data.count_page;

              if (this.datalist !== null) {
                this.datalist.forEach((element) => {
                  element.date_bill = moment(element.date_bill).format(
                    "YYYY-MM-DD"
                  );
                  element.estimate_date = moment(element.estimate_date).format(
                    "YYYY-MM-DD"
                  );
                  element.incoming_paid_date = moment(element.incoming_paid_date).format(
                    "YYYY-MM-DD"
                  );

                  element.confirm_date = moment(element.confirm_date).format(
                    "YYYY-MM-DD"
                  );
                  // element.paid_date = moment(element.paid_date).format(
                  //   "YYYY-MM-DD"
                  // );
                  if (element.asking_payment_date) {
                    element.asking_payment_date = moment(
                      element.asking_payment_date
                    ).format("YYYY-MM-DD");
                  }
                  element.memo_date_one = moment(element.memo_date_one).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_two = moment(element.memo_date_two).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_three = moment(
                    element.memo_date_three
                  ).format("YYYY-MM-DD");
                  element.remark_date = moment(element.remark_date).format(
                    "YYYY-MM-DD"
                  );
                  if(element.payment_type == "Bill Payment - SCB" || element.payment_type == "Bill_Payment_SCB"){
                      element.payment_type = "Bill Payment - SCB";
                  }else if (element.payment_type == "Bill Payment - KBANK" || element.payment_type == "Bill_Payment_KBANK"){
                      element.payment_type = "Bill Payment - KBANK";
                  }else if (element.payment_type == "Bill Payment - BBL" || element.payment_type == "Bill_Payment_BBL"){
                      element.payment_type = "Bill Payment - BBL";
                  }
                  this.invoice_list = [];
                  this.customer_name_list = [];
                  this.customer_no_list = [];
                  this.so_number_list = [];
                  this.finance_name_list = [];
                  this.sale_name_list = [];
                  this.sale_team_list = [];
                  this.cn_number_list = [];
                  // this.cn_ten_list = []; //คอลัมน์CN10
                  this.rv_number_list = [];
                  this.receipt_number_list = [];
                  this.user_name_list = [];
                  this.listfilter_data("", "invoice_no");
                  this.listfilter_data("", "invoice_name");
                  this.listfilter_data("", "customer_name");
                  this.listfilter_data("", "so_number");
                  this.listfilter_data("", "finance_name");
                  this.listfilter_data("", "sale_name");
                  this.listfilter_data("", "sale_team");
                  this.listfilter_data("", "cn_number");
                  // this.listfilter_data("", "cn_ten"); //คอลัมน์CN10
                  this.listfilter_data("", "rv_number");
                  this.listfilter_data("", "receipt_number");
                  this.listfilter_data("", "incoming_status");
                  this.listfilter_data("", "user_name");
                });
                this.finish = true;
              }
            }

            // if (response.data.data) {
            // this.getTotalAmount()
            // }
          } else {
            this.finish = true;
            this.datalist = [];
          }
          if (this.filterlist.length == 0) {
            this.finish = true;
            this.getData_afterClearAll();
          }
        });
    },
    pageChange() {
      this.change_page_filter();
    },
    blank_checkbox(name) {
      if (name == "customer_no") {
        if (this.customer_no_blank == true) {
          this.customer_no = "[blank]";
          this.filter("blank_string", "customer_no");
        } else {
          this.customer_no = "";
          this.filter("", "customer_no");
        }
      }
      if (name == "customer_description") {
        if (this.customer_description_blank == true) {
          this.customer_description = "[blank]";
          this.filter("blank_string", "customer_description");
        } else {
          this.customer_description = "";
          this.filter("", "customer_description");
        }
      }
      if (name == "customer_email") {
        if (this.customer_email_blank == true) {
          this.customer_email = "[blank]";
          this.filter("blank_string", "customer_email");
        } else {
          this.customer_email = "";
          this.filter("", "customer_email");
        }
      }

      if (name == "amount_after_vat") {
        if (this.amount_after_vat_blank == true) {
          this.amount_after_vat = "[blank]";
          this.filter("blank_string", "amount_after_vat");
        } else {
          this.amount_after_vat = "";
          this.filter("", "amount_after_vat");
        }
      }

      if (name == "customer_info") {
        if (this.customer_info_blank == true) {
          this.customer_info = "[blank]";
          this.filter("blank_string", "customer_info");
        } else {
          this.customer_info = "";
          this.filter("", "customer_info");
        }
      }

      if (name == "billing_remark") {
        if (this.billing_remark_blank == true) {
          this.billing_remark = "[blank]";
          this.filter("blank_string", "billing_remark");
        } else {
          this.billing_remark = "";
          this.filter("", "billing_remark");
        }
      }

      if (name == "remain_day") {
        if (this.remain_day_blank == true) {
          this.remain_day = "[blank]";
          this.filter("blank_string", "remain_day");
        } else {
          this.remain_day = "";
          this.filter("", "remain_day");
        }
      }

      if (name == "remark_warroom") {
        if (this.remark_warroom_blank == true) {
          this.remark_warroom = "[blank]";
          this.filter("blank_string", "remark_warroom");
        } else {
          this.remark_warroom = "";
          this.filter("", "remark_warroom");
        }
      }

      if (name == "rv_number") {
        if (this.rv_number_blank == true) {
          this.rv_number = "[blank]";
          this.filter("blank_string", "rv_number");
        } else {
          this.rv_number = "";
          this.filter("", "rv_number");
        }
      }
      if (name == "debt_reduction_docno") {
        if (this.debt_reduction_docno_blank == true) {
          this.debt_reduction_docno = "[blank]";
          this.filter("blank_string", "debt_reduction_docno");
        } else {
          this.debt_reduction_docno = "";
          this.filter("", "debt_reduction_docno");
        }
      }
      if (name == "reissue_status") {
        if (this.reissue_status_blank == true) {
          this.reissue_status = "[blank]";
          this.filter("blank_string", "reissue_status");
        } else {
          this.reissue_status = "";
          this.filter("", "reissue_status");
        }
      }
      if (name == "cn_number") {
        if (this.cn_number_blank == true) {
          this.cn_number = "[blank]";
          this.filter("blank_string", "cn_number");
        } else {
          this.cn_number = "";
          this.filter("", "cn_number");
        }
      }
      // คอลัมน์CN10
      // if (name == "cn_ten") {
      //   if (this.cn_ten_blank == true) {
      //     this.cn_ten = "[blank]";
      //     this.filter("blank_string", "cn_ten");
      //   } else {
      //     this.cn_ten = "";
      //     this.filter("", "cn_ten");
      //   }
      // }
      // end
    },

    Add_column() {
      this.column_select = this.list_column;
      var settingColumns = {
        amount: false,
        asking_payment_date: false,
        bill_date: false,
        billing_checking: false,
        billing_remark: false,
        billing_status: false,
        billing_status_remark: false, //หมายเหตุสถานะวางบิล
        billing_type_detail: false,
        debt_reduction_docno: false,
        reissue_status: false,
        cn_number: false,
        // cn_ten: false, //คอลัมน์CN10
        confirm_date: false,
        customer_description: false,
        customer_email: false,
        customer_info: false,
        customer_name: false,
        customer_no: false,
        customer_type: false,
        end_date: false,
        estimate_date: false,
        factoring: false,
        finance_name: false,
        incoming_paid_date: false,
        invoice_date: false,
        customer_criteria: false,
        no_contact: false,
        online_payment: false,
        over_due: false,
        paid: false,
        // paid_date: false,
        payment_type: false,
        memo_date_one: false,
        memo_date_three: false,
        memo_date_two: false,
        receipt_number: false,
        incoming_status: false,
        recheck: false,
        status_recheck: false,
        // add status cash collection and aging cash collection
        cut_debt: false,
        // base_adjust: false,
        // aging_cash: false,
        // end
        remain_day: false,
        remark_date: false,
        remark_warroom: false,
        rv_number: false,
        sales_representative: false,
        status_payment: false,
        sales_team: false,
        so_number: false,
        start_date: false,
        user_name: false,
        // เพิ่มเข้ามา
        service: false,
        quotation: false,
        // สิ้นสุด
      };

      for (let index = 0; index < this.column_name.length; index++) {
        if (this.column_name[index].value == "amount") {
          settingColumns.amount = this.column_name[index].show;
        }
        if (this.column_name[index].value == "customer_name") {
          settingColumns.customer_name = this.column_name[index].show;
        }
        if (this.column_name[index].value == "customer_criteria") {
          settingColumns.customer_criteria = this.column_name[index].show;
        }
        if (this.column_name[index].value == "no_contact") {
          settingColumns.no_contact = this.column_name[index].show;
        }
        if (this.column_name[index].value == "customer_no") {
          settingColumns.customer_no = this.column_name[index].show;
        }

        if (this.column_name[index].value == "factoring") {
          settingColumns.factoring = this.column_name[index].show;
        }

        if (this.column_name[index].value == "online_payment") {
          settingColumns.online_payment = this.column_name[index].show;
        }

        if (this.column_name[index].value == "so_number") {
          settingColumns.so_number = this.column_name[index].show;
        }
        if (this.column_name[index].value == "so_end_date") {
          settingColumns.so_end_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "start_date") {
          settingColumns.start_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "end_date") {
          settingColumns.end_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "invoice_date") {
          settingColumns.invoice_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "finance_name") {
          settingColumns.finance_name = this.column_name[index].show;
        }

        if (this.column_name[index].value == "over_due") {
          settingColumns.over_due = this.column_name[index].show;
        }

        if (this.column_name[index].value == "bill_date") {
          settingColumns.bill_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "billing_type_detail") {
          settingColumns.billing_type_detail = this.column_name[index].show;
        }

        if (this.column_name[index].value == "billing_status") {
          settingColumns.billing_status = this.column_name[index].show;
        }
        // คอลัมน์หมายเหตุสถานะวางบิล
        if (this.column_name[index].value == "billing_status_remark") {
          settingColumns.billing_status_remark = this.column_name[index].show;
        }
        // end
        if (this.column_name[index].value == "billing_checking") {
          settingColumns.billing_checking = this.column_name[index].show;
        }

        if (this.column_name[index].value == "billing_remark") {
          settingColumns.billing_remark = this.column_name[index].show;
        }
        if (this.column_name[index].value == "status_payment") {
          settingColumns.status_payment = this.column_name[index].show;
        }

        if (this.column_name[index].value == "estimate_date") {
          settingColumns.estimate_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "incoming_paid_date") {
          settingColumns.incoming_paid_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "confirm_date") {
          settingColumns.confirm_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "payment_type") {
          settingColumns.payment_type = this.column_name[index].show;
        }

        if (this.column_name[index].value == "paid") {
          settingColumns.paid = this.column_name[index].show;
        }

        if (this.column_name[index].value == "recheck") {
          settingColumns.recheck = this.column_name[index].show;
        }
        
        if (this.column_name[index].value == "status_recheck") {
          settingColumns.status_recheck = this.column_name[index].show;
        }
        
        // add column status cash collection and aging cash collection
        if (this.column_name[index].value == "cut_debt") {
          settingColumns.cut_debt = this.column_name[index].show;
        }
        // if (this.column_name[index].value == "base_adjust") {
        //   settingColumns.base_adjust = this.column_name[index].show;
        // }
        // if (this.column_name[index].value == "aging_cash") {
        //   settingColumns.aging_cash = this.column_name[index].show;
        // }
        // end
        // if (this.column_name[index].value == "paid_date") {
        //   settingColumns.paid_date = this.column_name[index].show;
        // }

        if (this.column_name[index].value == "asking_payment_date") {
          settingColumns.asking_payment_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "remain_day") {
          settingColumns.remain_day = this.column_name[index].show;
        }

        if (this.column_name[index].value == "memo_date_one") {
          settingColumns.memo_date_one = this.column_name[index].show;
        }

        if (this.column_name[index].value == "memo_date_two") {
          settingColumns.memo_date_two = this.column_name[index].show;
        }

        if (this.column_name[index].value == "memo_date_three") {
          settingColumns.memo_date_three = this.column_name[index].show;
        }

        if (this.column_name[index].value == "debt_reduction_docno") {
          settingColumns.debt_reduction_docno = this.column_name[index].show;
        }
        if (this.column_name[index].value == "reissue_status") {
          settingColumns.reissue_status = this.column_name[index].show;
        }
        if (this.column_name[index].value == "cn_number") {
          settingColumns.cn_number = this.column_name[index].show;
        }
        // คอลัมน์CN10
        // if (this.column_name[index].value == "cn_ten") {
        //   settingColumns.cn_ten = this.column_name[index].show;
        // }
        // end
        if (this.column_name[index].value == "rv_number") {
          settingColumns.rv_number = this.column_name[index].show;
        }

        if (this.column_name[index].value == "receipt_number") {
          settingColumns.receipt_number = this.column_name[index].show;
        }

        if (this.column_name[index].value == "incoming_status") {
          settingColumns.incoming_status = this.column_name[index].show;
        }

        if (this.column_name[index].value == "remark_date") {
          settingColumns.remark_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "remark_warroom") {
          settingColumns.remark_warroom = this.column_name[index].show;
        }

        if (this.column_name[index].value == "user_name") {
          settingColumns.user_name = this.column_name[index].show;
        }
        // เพิ่มมาใหม่
        // if (this.column_name[index].value == "service") {
        //   settingColumns.service = this.column_name[index].show;
        // }
        // if (this.column_name[index].value == "quotation") {
        //   settingColumns.quotation = this.column_name[index].show;
        // }
        // สิ้นสุด
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
        .post(
          process.env.VUE_APP_API + "/setting/columns/invoice",
          settingColumns,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = false;
            this.setting_column();
            setTimeout(() => {
              this.finish = true;
            }, 1500);
          }
        });
    },
    cancel_colunm() {
      this.setting_column();
    },

    select_column(column, item) {
      if (column == false) {
        for (let index = 0; index < this.show_column.length; index++) {
          if (item.name == this.show_column[index].text) {
            this.show_column.splice(index, 1);
          }
        }
      } else if (column == true) {
        for (let index = 0; index < this.headers.length; index++) {
          if (item.name == this.headers[index].text) {
            this.show_column.splice(index, 0, this.headers[index]);
          }
        }
      }

      this.list_column = [];

      for (let j = 0; j < this.headers.length; j++) {
        for (let g = 0; g < this.show_column.length; g++) {
          if (this.headers[j].text == this.show_column[g].text) {
            this.list_column.push(this.headers[j]);
          }
        }
      }
    },

    clearDate(name, item) {
      if (name == "date_bill") {
        item.date_bill = "0001-01-01";
      }
      if (name == "estimate_date") {
        item.estimate_date = "0001-01-01";
      }
      if (name == "incoming_paid_date") {
        item.incoming_paid_date = "0001-01-01";
      }
      if (name == "confirm_date") {
        item.confirm_date = "0001-01-01";
      }
      if (name == "asking_payment_date") {
        item.asking_payment_date = "0001-01-01";
      }

      if (name == "remark_date") {
        item.remark_date = "0001-01-01";
      }

      this.select_1("", item);
    },
    actionChange(date, name) {
      if (name == "so_end_date") {
        this.so_end_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.so_end_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "start_date") {
        this.start_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.start_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "end_date") {
        this.end_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.end_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "invoice_date") {
        this.invoice_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.invoice_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "date_bill") {
        this.date_bill[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.date_bill[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "estimate_date") {
        this.estimate_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.estimate_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "incoming_paid_date") {
        this.incoming_paid_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.incoming_paid_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "confirm_date") {
        this.confirm_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.confirm_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      // } else if (name == "paid_date") {
      //   this.paid_date[0] = date.startDate
      //     .split("/")
      //     .reverse()
      //     .join("-");
      //   this.paid_date[1] = date.endDate
      //     .split("/")
      //     .reverse()
      //     .join("-");
      } else if (name == "asking_payment_date") {
        this.asking_payment_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.asking_payment_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "memo_date_one") {
        this.memo_date_one[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.memo_date_one[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "memo_date_two") {
        this.memo_date_two[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.memo_date_two[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "memo_date_three") {
        this.memo_date_three[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.memo_date_three[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "remark_date") {
        this.remark_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.remark_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      }
    },
    hideModal(name) {
      if (name == "so_end_date") {
        this.$refs["my-modal-so_end_date"].hide();
        this.text_so_end_date = null;
        this.so_end_date_range.startDate = null;
        this.so_end_date_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "start_date") {
        this.$refs["my-modal-start_date"].hide();
        this.text_start_date = null;
        this.start_date_range.startDate = null;
        this.start_date_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "end_date") {
        this.$refs["my-modal-end_date"].hide();
        this.text_end_date = null;
        this.end_date_range.startDate = null;
        this.end_date_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "invoice_date") {
        this.$refs["my-modal-invoice_date"].hide();
        this.text_invoice_date = null;
        this.invoice_date_range.startDate = null;
        this.invoice_date_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "date_bill") {
        this.$refs["my-modal-date_bill"].hide();
        this.text_date_bill = null;
        this.date_bill_range.startDate = null;
        this.date_bill_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "estimate_date") {
        this.$refs["my-modal-estimate_date"].hide();
        this.text_estimate_date = null;
        this.estimate_date_range.startDate = null;
        this.estimate_date_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "incoming_paid_date") {
        this.$refs["my-modal-incoming_paid_date"].hide();
        this.text_incoming_paid_date = null;
        this.incoming_paid_date_range.startDate = null;
        this.incoming_paid_date_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "confirm_date") {
        this.$refs["my-modal-confirm_date"].hide();
        this.text_confirm_date = null;
        this.confirm_date_range.startDate = null;
        this.confirm_date_range.endDate = null;
        this.close_dialog(name);
      // } else if (name == "paid_date") {
      //   this.$refs["my-modal-paid_date"].hide();
      //   this.text_paid_date = null;
      //   this.paid_date_range.startDate = null;
      //   this.paid_date_range.endDate = null;
      //   this.close_dialog(name);
      } else if (name == "asking_payment_date") {
        this.$refs["my-modal-asking_payment_date"].hide();
        this.text_asking_payment_date = null;
        this.asking_payment_date_range.startDate = null;
        this.asking_payment_date_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "memo_date_one") {
        this.$refs["my-modal-memo_date_one"].hide();
        this.text_memo_date_one = null;
        this.memo_date_one_range.startDate = null;
        this.memo_date_one_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "memo_date_two") {
        this.$refs["my-modal-memo_date_two"].hide();
        this.text_memo_date_two = null;
        this.memo_date_two_range.startDate = null;
        this.memo_date_two_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "memo_date_three") {
        this.$refs["my-modal-memo_date_three"].hide();
        this.text_memo_date_three = null;
        this.memo_date_three_range.startDate = null;
        this.memo_date_three_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "remark_date") {
        this.$refs["my-modal-remark_date"].hide();
        this.text_remark_date = null;
        this.remark_date_range.startDate = null;
        this.remark_date_range.endDate = null;
        this.close_dialog(name);
      }
    },
    OkFilterModal(name) {
      if (name == "so_end_date") {
        if (
          this.so_end_date[0] == "" ||
          (this.so_end_date[0] == null && this.so_end_date[1] == "") ||
          this.so_end_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-so_end_date"].hide();
          this.text_so_end_date =
            this.so_end_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.so_end_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.so_end_date, name);
        }
      }
      if (name == "start_date") {
        if (
          this.start_date[0] == "" ||
          (this.start_date[0] == null && this.start_date[1] == "") ||
          this.start_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-start_date"].hide();
          this.text_start_date =
            this.start_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.start_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.start_date, name);
        }
      }
      if (name == "end_date") {
        if (
          this.end_date[0] == "" ||
          (this.end_date[0] == null && this.end_date[1] == "") ||
          this.end_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-end_date"].hide();
          this.text_end_date =
            this.end_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.end_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.end_date, name);
        }
      }
      if (name == "invoice_date") {
        if (
          this.invoice_date[0] == "" ||
          (this.invoice_date[0] == null && this.invoice_date[1] == "") ||
          this.invoice_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-invoice_date"].hide();
          this.text_invoice_date =
            this.invoice_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.invoice_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.invoice_date, name);
        }
      }
      if (name == "date_bill") {
        if (
          this.date_bill[0] == "" ||
          (this.date_bill[0] == null && this.date_bill[1] == "") ||
          this.date_bill[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-date_bill"].hide();
          this.text_date_bill =
            this.date_bill[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.date_bill[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.date_bill, name);
        }
      }
      if (name == "estimate_date") {
        if (
          this.estimate_date[0] == "" ||
          (this.estimate_date[0] == null && this.estimate_date[1] == "") ||
          this.estimate_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-estimate_date"].hide();
          this.text_estimate_date =
            this.estimate_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.estimate_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.estimate_date, name);
        }
      }
      if (name == "incoming_paid_date") {
        if (
          this.incoming_paid_date[0] == "" ||
          (this.incoming_paid_date[0] == null && this.estimate_date[1] == "") ||
          this.incoming_paid_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-incoming_paid_date"].hide();
          this.text_incoming_paid_date =
            this.incoming_paid_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.incoming_paid_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.incoming_paid_date, name);
        }
      }
      if (name == "confirm_date") {
        if (
          this.confirm_date[0] == "" ||
          (this.confirm_date[0] == null && this.confirm_date[1] == "") ||
          this.confirm_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-confirm_date"].hide();
          this.text_confirm_date =
            this.confirm_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.confirm_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.confirm_date, name);
        }
      }

      // if (name == "paid_date") {
      //   if (
      //     this.paid_date[0] == "" ||
      //     (this.paid_date[0] == null && this.paid_date[1] == "") ||
      //     this.paid_date[1] == null
      //   ) {
      //     alert("กรุณาเลือกช่วงวันที่ให้ครบ");
      //   } else {
      //     this.$refs["my-modal-paid_date"].hide();
      //     this.text_paid_date =
      //       this.paid_date[0]
      //         .split("-")
      //         .reverse()
      //         .join("/") +
      //       " - " +
      //       this.paid_date[1]
      //         .split("-")
      //         .reverse()
      //         .join("/");
      //     this.filter(this.paid_date, name);
      //   }
      // }

      if (name == "asking_payment_date") {
        if (
          this.asking_payment_date[0] == "" ||
          (this.asking_payment_date[0] == null &&
            this.asking_payment_date[1] == "") ||
          this.asking_payment_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-asking_payment_date"].hide();
          this.text_asking_payment_date =
            this.asking_payment_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.asking_payment_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.asking_payment_date, name);
        }
      }

      if (name == "memo_date_one") {
        if (
          this.memo_date_one[0] == "" ||
          (this.memo_date_one[0] == null && this.memo_date_one[1] == "") ||
          this.memo_date_one[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-memo_date_one"].hide();
          this.text_memo_date_one =
            this.memo_date_one[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.memo_date_one[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.memo_date_one, name);
        }
      }

      if (name == "memo_date_two") {
        if (
          this.memo_date_two[0] == "" ||
          (this.memo_date_two[0] == null && this.memo_date_two[1] == "") ||
          this.memo_date_two[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-memo_date_two"].hide();
          this.text_memo_date_two =
            this.memo_date_two[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.memo_date_two[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.memo_date_two, name);
        }
      }
      if (name == "memo_date_three") {
        if (
          this.memo_date_three[0] == "" ||
          (this.memo_date_three[0] == null && this.memo_date_three[1] == "") ||
          this.memo_date_three[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-memo_date_three"].hide();
          this.text_memo_date_three =
            this.memo_date_three[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.memo_date_three[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.memo_date_three, name);
        }
      }
      if (name == "remark_date") {
        if (
          this.remark_date[0] == "" ||
          (this.remark_date[0] == null && this.remark_date[1] == "") ||
          this.remark_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-remark_date"].hide();
          this.text_remark_date =
            this.remark_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.remark_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.remark_date, name);
        }
      }
    },
    blankModal(name) {
      if (name == "so_end_date") {
        this.$refs["my-modal-so_end_date"].hide();
        this.so_end_date = ["0000-00-00"];
        this.text_so_end_date = "[blank]";
        this.filter(this.so_end_date, name);
        this.so_end_date_range.startDate = null;
        this.so_end_date_range.endDate = null;
      }
      if (name == "start_date") {
        this.$refs["my-modal-start_date"].hide();
        this.start_date = ["0000-00-00"];
        this.text_start_date = "[blank]";
        this.filter(this.start_date, name);
        this.start_date_range.startDate = null;
        this.start_date_range.endDate = null;
      }
      if (name == "end_date") {
        this.$refs["my-modal-end_date"].hide();
        this.end_date = ["0000-00-00"];
        this.text_end_date = "[blank]";
        this.filter(this.end_date, name);
        this.end_date_range.startDate = null;
        this.end_date_range.endDate = null;
      }
      if (name == "invoice_date") {
        this.$refs["my-modal-invoice_date"].hide();
        this.invoice_date = ["0000-00-00"];
        this.text_invoice_date = "[blank]";
        this.filter(this.invoice_date, name);
        this.invoice_date_range.startDate = null;
        this.invoice_date_range.endDate = null;
      }
      if (name == "date_bill") {
        this.$refs["my-modal-date_bill"].hide();
        this.date_bill = ["0000-00-00"];
        this.text_date_bill = "[blank]";
        this.filter(this.date_bill, name);
        this.date_bill_range.startDate = null;
        this.date_bill_range.endDate = null;
      }
      if (name == "estimate_date") {
        this.$refs["my-modal-estimate_date"].hide();
        this.estimate_date = ["0000-00-00"];
        this.text_estimate_date = "[blank]";
        this.filter(this.estimate_date, name);
        this.estimate_date_range.startDate = null;
        this.estimate_date_range.endDate = null;
      }
      if (name == "incoming_paid_date") {
        this.$refs["my-modal-incoming_paid_date"].hide();
        this.incoming_paid_date = ["0000-00-00"];
        this.text_incoming_paid_date = "[blank]";
        this.filter(this.incoming_paid_date, name);
        this.incoming_paid_date_range.startDate = null;
        this.incoming_paid_date_range.endDate = null;
      }

      if (name == "confirm_date") {
        this.$refs["my-modal-confirm_date"].hide();
        this.confirm_date = ["0000-00-00"];
        this.text_confirm_date = "[blank]";
        this.filter(this.confirm_date, name);
        this.confirm_date_range.startDate = null;
        this.confirm_date_range.endDate = null;
      }

      // if (name == "paid_date") {
      //   this.$refs["my-modal-paid_date"].hide();
      //   this.paid_date = ["0000-00-00"];
      //   this.text_paid_date = "[blank]";
      //   this.filter(this.paid_date, name);
      //   this.paid_date_range.startDate = null;
      //   this.paid_date_range.endDate = null;
      // }

      if (name == "asking_payment_date") {
        this.$refs["my-modal-asking_payment_date"].hide();
        this.asking_payment_date = ["0000-00-00"];
        this.text_asking_payment_date = "[blank]";
        this.filter(this.asking_payment_date, name);
        this.asking_payment_date_range.startDate = null;
        this.asking_payment_date_range.endDate = null;
      }

      if (name == "memo_date_one") {
        this.$refs["my-modal-memo_date_one"].hide();
        this.memo_date_one = ["0000-00-00"];
        this.text_memo_date_one = "[blank]";
        this.filter(this.memo_date_one, name);
        this.memo_date_one_range.startDate = null;
        this.memo_date_one_range.endDate = null;
      }
      if (name == "memo_date_two") {
        this.$refs["my-modal-memo_date_two"].hide();
        this.memo_date_two = ["0000-00-00"];
        this.text_memo_date_two = "[blank]";
        this.filter(this.memo_date_two, name);
        this.memo_date_two_range.startDate = null;
        this.memo_date_two_range.endDate = null;
      }
      if (name == "memo_date_three") {
        this.$refs["my-modal-memo_date_three"].hide();
        this.memo_date_three = ["0000-00-00"];
        this.text_memo_date_three = "[blank]";
        this.filter(this.memo_date_three, name);
        this.memo_date_three_range.startDate = null;
        this.memo_date_three_range.endDate = null;
      }
      if (name == "remark_date") {
        this.$refs["my-modal-remark_date"].hide();
        this.remark_date = ["0000-00-00"];
        this.text_remark_date = "[blank]";
        this.filter(this.remark_date, name);
        this.remark_date_range.startDate = null;
        this.remark_date_range.endDate = null;
      }
    },
    set_default(item, name) {
      if (name == "date_bill") {
        item.date_bill = moment(new Date()).format("YYYY-MM-DD");
        // this.select_1("", item);
        return item.date_bill;
      }
      if (name == "estimate_date") {
        // item.estimate_date = moment(new Date()).format("YYYY-MM-DD");
        // this.select_1("", item);
        // return item.estimate_date;
        this.estimate_date_dialog.estimate_date = moment(new Date()).format(
          "YYYY-MM-DD"
        );
        // this.select_1("", item);
        return this.estimate_date_dialog.estimate_date;
      }
      if (name == "incoming_paid_date") {
        item.incoming_paid_date = moment(new Date()).format("YYYY-MM-DD");
        //this.select_1("", item);
        return item.incoming_paid_date;
      }
      if (name == "confirm_date") {
        this.confirm_date_dialog.confirm_date = moment(new Date()).format(
          "YYYY-MM-DD"
        );
        // this.select_1("", item);
        return this.confirm_date_dialog.confirm_date;
      }
      if (name == "asking_payment_date") {
        item.asking_payment_date = moment(new Date()).format("YYYY-MM-DD");
        this.select_1("", item);
        return item.asking_payment_date;
      }
      if (name == "remark_date") {
        item.remark_date = moment(new Date()).format("YYYY-MM-DD");
        this.select_1("", item);
        return item.remark_date;
      }
    },
    close_dialog(close) {
      for (let index = 0; index < this.filterlist.length; index++) {
        if (close == this.filterlist[index].key) {
          this.filterlist.splice(index, 1);
        }
      }
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          this.finish = false;
          if (response.status === 200) {
            this.finish = true;
            // this.selected = [];
            this.datalist = response.data.data;
            this.selected = JSON.parse(localStorage.getItem("list_invoice"));
            this.selected_list = JSON.parse(
              localStorage.getItem("list_invoice")
            );
            if (this.datalist == undefined || this.datalist == null) {
              this.finish = true;
              this.total_count = 0;
              this.count_invoice = 0;
              this.sum_amount = 0;
              this.datalist = [];
            } else {
              this.finish = true;
              this.total_count = response.data.total.toLocaleString();
              this.count_invoice = response.data.count.toLocaleString();
              this.sum_amount = response.data.sum_amount.toLocaleString();
              this.page_total = response.data.count_page;
              if (this.datalist !== null) {
                this.datalist.forEach((element) => {
                  element.date_bill = moment(element.date_bill).format(
                    "YYYY-MM-DD"
                  );
                  element.estimate_date = moment(element.estimate_date).format(
                    "YYYY-MM-DD"
                  );
                  element.incoming_paid_date = moment(element.incoming_paid_date).format(
                    "YYYY-MM-DD"
                  );

                  element.confirm_date = moment(element.confirm_date).format(
                    "YYYY-MM-DD"
                  );
                  // element.paid_date = moment(element.paid_date).format(
                  //   "YYYY-MM-DD"
                  // );
                  if (element.asking_payment_date) {
                    element.asking_payment_date = moment(
                      element.asking_payment_date
                    ).format("YYYY-MM-DD");
                  }
                  element.memo_date_one = moment(element.memo_date_one).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_two = moment(element.memo_date_two).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_three = moment(
                    element.memo_date_three
                  ).format("YYYY-MM-DD");
                  element.remark_date = moment(element.remark_date).format(
                    "YYYY-MM-DD"
                  );
                  if(element.payment_type == "Bill Payment - SCB" || element.payment_type == "Bill_Payment_SCB"){
                      element.payment_type = "Bill Payment - SCB";
                  }else if (element.payment_type == "Bill Payment - KBANK" || element.payment_type == "Bill_Payment_KBANK"){
                      element.payment_type = "Bill Payment - KBANK";
                  }else if (element.payment_type == "Bill Payment - BBL" || element.payment_type == "Bill_Payment_BBL"){
                      element.payment_type = "Bill Payment - BBL";
                  }
                });
              }
            }

            // if (response.data.data) {
            //     this.getTotalAmount()
            // }
          } else {
            this.finish = true;
            this.datalist = [];

            // this.datalist = this.orders;
          }
          if (this.filterlist.length == 0) {
            // this.getInvoice();
            this.getData_afterClearAll();
          }
        });
    },

    Export_AllFile() {
      this.AllFile = "ALL";
      var url =
        process.env.VUE_APP_API +
        "/export/invoice/all?secret=" +
        encodeURIComponent(localStorage.getItem("resource_key"));
      // encodeURIComponent
      window.open(url);
    },

    Export_Excel() {
      var list = Object.keys(this.selected);
      var exportlist = [];
      for (let index = 0; index < list.length; index++) {
        exportlist.push(this.selected[index].invoice_no);
      }
      // if (this.AllFile == "ALL") {
      //   exportlist = ["ALL"];
      // }
      let headers_export = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          // "content-type": "application/octet-stream",
          // Accept:
          //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
        responseType: "blob",
      };
      var body = {
        invoice_no: exportlist,
      };
      this.finish = false;
      this.axios
        .post(process.env.VUE_APP_API + "/export/invoice", body, headers_export)
        .then((response) => {
          if (response.data) {
            this.finish = true;
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "invoice.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
        });
    },
    getColor(data) {
      if (data) {
        return "#16A7BC";
      }
    },
    clearFilter() {
      // this.$refs[this.dataGridRefName].instance.clearFilter();
      // this.$refs[this.dataGridRefName].instance.clearSorting();
      // ------------------search ----------------------------------------------//
      this.invoice_no = "";
      this.invoice_status = "";
      this.factoring = "";
      this.so_number = "";
      this.so_end_date = ["", ""];
      this.start_date = ["", ""];
      this.end_date = ["", ""];
      this.invoice_date = ["", ""];
      this.customer_no = "";
      this.customer_name = "";
      this.customer_type = "";
      this.customer_description = "";
      this.customer_criteria = "";
      this.customer_email = "";
      this.online_payment = "";
      this.no_contact = "";
      this.finance_id = "";
      this.finance_name = null;
      this.finance_tel_no = "";
      this.over_due = null;
      this.amount_after_vat = "";
      this.amount_before_vat = "";
      (this.aging_1 = ""), (this.sale_name = "");
      this.sale_id = "";
      this.sale_team = "";
      (this.status_payment = ""), (this.customer_info = "");
      this.date_bill = [null, null];
      this.billing_type_detail = "";
      this.billing_status = "";
      this.billing_status_remark = ""; //คอลัมน์หมายเหตุสถานะวางบิล
      this.billing_checking = "";
      this.billing_remark = "";
      this.estimate_date = [null, null];
      this.confirm_date = [null, null];
      this.payment_type = "";
      this.paid = "";
      this.recheck = "";
      this.status_recheck = "";
      // add status cash collection and aging cash collection 
      this.cut_debt = "";
      // this.base_adjust = "";
      // this.aging_cash = "";
      // end
      // this.paid_date = [null, null];
      this.asking_payment = "";
      this.asking_payment_date = [null, null];
      this.remain_day = "";
      this.memo_date_one = [null, null];
      this.memo_date_two = [null, null];
      this.memo_date_three = [null, null];
      this.debt_reduction_docno = "";
      this.reissue_status = "";
      this.cn_number = "";
      // this.cn_ten = ""; //คอลัมน์CN10
      this.rv_number = "";
      this.receipt_number = "";
      this.incoming_status = "";
      this.remark_warroom = "";
      this.user_name = "";
      this.remark_date = [null, null];
      this.excel_file = "";
      this.filterlist = [];
      // this.selected = [];
      this.text_start_date = null;
      this.text_end_date = null;
      this.text_invoice_date = null;
      this.text_date_bill = null;
      this.text_estimate_date = null;
      this.text_confirm_date = null;
      // this.text_paid_date = null;
      this.text_asking_payment_date = null;
      this.text_memo_date_one = null;
      this.text_memo_date_two = null;
      this.text_memo_date_three = null;
      this.text_remark_date = null;
      this.text_so_end_date = null;

      this.start_date_range.startDate = null;
      this.start_date_range.endDate = null;

      this.end_date_range.startDate = null;
      this.end_date_range.endDate = null;

      this.invoice_date_range.startDate = null;
      this.invoice_date_range.endDate = null;

      this.date_bill_range.startDate = null;
      this.date_bill_range.endDate = null;

      this.estimate_date_range.startDate = null;
      this.estimate_date_range.endDate = null;

      this.confirm_date_range.startDate = null;
      this.confirm_date_range.endDate = null;

      this.incoming_paid_date_range.startDate = null;
      this.incoming_paid_date_range.endDate = null;

      // this.paid_date_range.startDate = null;
      // this.paid_date_range.endDate = null;

      this.asking_payment_date_range.startDate = null;
      this.asking_payment_date_range.endDate = null;

      this.memo_date_one_range.startDate = null;
      this.memo_date_one_range.endDate = null;

      this.memo_date_two_range.startDate = null;
      this.memo_date_two_range.endDate = null;

      this.memo_date_three_range.startDate = null;
      this.memo_date_three_range.endDate = null;

      this.remark_date_range.startDate = null;
      this.remark_date_range.endDate = null;

      this.so_end_date_range.startDate = null;
      this.so_end_date_range.endDate = null;

      (this.rv_number_blank = false),
      (this.debt_reduction_docno_blank = false),
      (this.reissue_status_blank = false),
      (this.cn_number_blank = false),
      (this.cn_ten_blank = false), //คอลัมน์CN10
      (this.customer_no_blank = false),
      (this.amount_after_vat_blank = false),
      (this.customer_info_blank = false),
      (this.billing_remark_blank = false),
      (this.remain_day_blank = false);
      this.remark_warroom_blank = false;
      this.customer_description_blank = false;
      this.customer_email_blank = false;
      this.search = "";
      this.finish = false;
      this.getData_afterClearAll();
      // -------------------------------end ----------------------------------------//
    },

    getData_afterClearAll() {
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
            "/invoice?size=" +
            this.item_per_page +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          if (response.status === 200) {
            // this.finish = true;
            this.datalist = response.data.data;
            this.Alldata = response.data.data;

            if (this.datalist == undefined || this.datalist == null) {
              this.finish = true;
              this.total_count = 0;
              this.count_invoice = 0;
              this.sum_amount = 0;
              this.datalist = [];
            } else {
              this.finish = true;
              this.total_count = response.data.total.toLocaleString();
              this.count_invoice = response.data.count.toLocaleString();
              this.sum_amount = response.data.sum_amount.toLocaleString();
              this.page_total = response.data.count_page;
              if (this.datalist !== null) {
                this.datalist.forEach((element) => {
                  element.date_bill = moment(element.date_bill).format(
                    "YYYY-MM-DD"
                  );
                  element.estimate_date = moment(element.estimate_date).format(
                    "YYYY-MM-DD"
                  );
                  element.incoming_paid_date = moment(element.incoming_paid_date).format(
                    "YYYY-MM-DD"
                  );
                  element.confirm_date = moment(element.confirm_date).format(
                    "YYYY-MM-DD"
                  );
                  // element.paid_date = moment(element.paid_date).format(
                  //   "YYYY-MM-DD"
                  // );
                  if (element.asking_payment_date) {
                    element.asking_payment_date = moment(
                      element.asking_payment_date
                    ).format("YYYY-MM-DD");
                  }
                  element.memo_date_one = moment(element.memo_date_one).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_two = moment(element.memo_date_two).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_three = moment(
                    element.memo_date_three
                  ).format("YYYY-MM-DD");
                  element.remark_date = moment(element.remark_date).format(
                    "YYYY-MM-DD"
                  );
                  if(element.payment_type == "Bill Payment - SCB" || element.payment_type == "Bill_Payment_SCB"){
                      element.payment_type = "Bill Payment - SCB";
                  }else if (element.payment_type == "Bill Payment - KBANK" || element.payment_type == "Bill_Payment_KBANK"){
                      element.payment_type = "Bill Payment - KBANK";
                  }else if (element.payment_type == "Bill Payment - BBL" || element.payment_type == "Bill_Payment_BBL"){
                      element.payment_type = "Bill Payment - BBL";
                  }
                  this.invoice_list = [];
                  this.customer_name_list = [];
                  this.customer_no_list = [];
                  this.so_number_list = [];
                  this.finance_name_list = [];
                  this.sale_name_list = [];
                  this.sale_team_list = [];
                  this.cn_number_list = [];
                  // this.cn_ten_list = []; //คอลัมน์CN10
                  this.rv_number_list = [];
                  this.receipt_number_list = [];
                  this.user_name_list = [];
                  this.listfilter_data("", "invoice_no");
                  this.listfilter_data("", "invoice_name");
                  this.listfilter_data("", "customer_name");
                  this.listfilter_data("", "so_number");
                  this.listfilter_data("", "finance_name");
                  this.listfilter_data("", "sale_name");
                  this.listfilter_data("", "sale_team");
                  this.listfilter_data("", "cn_number");
                  // this.listfilter_data("", "cn_ten"); //คอลัมน์CN10
                  this.listfilter_data("", "rv_number");
                  this.listfilter_data("", "receipt_number");
                  this.listfilter_data("", "incoming_status");
                  this.listfilter_data("", "user_name");
                });
              }
            }
            // if (response.data.data) {
            //     this.getTotalAmount()
            // }
          } else {
            this.finish = true;
            this.datalist = [];
            // this.datalist = this.orders;
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            if (error.response.status == 401) {
              localStorage.clear();
              this.$router.push("/login");
            }
          }
        });
    },
    getCustomer() {
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
        .get(process.env.VUE_APP_API + "/customer", headers)
        .then((customer) => {
          if (customer) {
            this.finish = true;
            this.list_customer = customer.data;
          }
        });
    },
    getInvoice() {
      this.finish = false;
      this.page = 1;

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
            "/invoice?size=" +
            this.item_per_page +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          // if(JSON.parse(localStorage.getItem('list_invoice')) == null) {
          //     this.selected = []
          // }
          // else {
          //    this.selected = JSON.parse(localStorage.getItem('list_invoice'))
          // }
          this.selected = JSON.parse(localStorage.getItem("list_invoice"));
          this.total_count = 0;
          // this.total_amount = 0;
          this.editing = false;
          this.AllFile = "";
          // ------------------search ----------------------------------------------//
          this.invoice_no = "";
          this.invoice_status = "";
          this.factoring = "";
          this.so_number = "";
          this.so_end_date = ["", ""];
          this.start_date = ["", ""];
          this.end_date = ["", ""];
          this.invoice_date = ["", ""];
          this.customer_no = "";
          this.customer_name = "";
          this.customer_type = "";
          this.customer_criteria = "";
          this.customer_description = "";
          this.online_payment = "";
          this.customer_email = "";
          this.no_contact = "";
          this.finance_id = "";
          this.finance_name = null;
          this.finance_tel_no = "";
          this.over_due = null;
          this.amount_after_vat = "";
          this.amount_before_vat = "";
          this.aging_1 = "";
          this.sale_name = null;
          this.sale_id = "";
          this.sale_team = "";
          (this.status_payment = ""), (this.customer_info = "");
          this.date_bill = [null, null];
          this.billing_type_detail = "";
          this.billing_status = "";
          this.billing_status_remark = ""; //คอลัมน์หมายเหตุสถานะวางบิล
          this.billing_checking = "";
          this.billing_remark = "";
          this.estimate_date = [null, null];
          this.confirm_date = [null, null];
          this.payment_type = "";
          this.paid = "";
          this.recheck = "";
          this.status_recheck = "";
          // add status cash collection and aging cash collection
          this.cut_debt = "";
          // this.base_adjust = "";
          // this.aging_cash = "";
          // end
          // this.paid_date = [null, null];
          this.asking_payment = "";
          this.asking_payment_date = [null, null];
          this.remain_day = "";
          this.memo_date_one = [null, null];
          this.memo_date_two = [null, null];
          this.memo_date_three = [null, null];
          this.debt_reduction_docno = "";
          this.reissue_status = "";
          this.cn_number = "";
          // this.cn_ten = ""; //คอลัมน์CN10
          this.rv_number = "";
          this.receipt_number = "";
          this.incoming_status = "";
          this.remark_warroom = "";
          this.user_name = "";
          this.remark_date = [null, null];
          this.excel_file = "";
          this.filterlist = [];
          // this.selected = [];

          this.text_start_date = null;
          this.text_end_date = null;
          this.text_invoice_date = null;
          this.text_date_bill = null;
          this.text_estimate_date = null;
          this.text_confirm_date = null;
          // this.text_paid_date = null;
          this.text_asking_payment_date = null;
          this.text_memo_date_one = null;
          this.text_memo_date_two = null;
          this.text_memo_date_three = null;
          this.text_remark_date = null;
          this.text_so_end_date = null;

          this.start_date_range.startDate = null;
          this.start_date_range.endDate = null;

          this.end_date_range.startDate = null;
          this.end_date_range.endDate = null;

          this.invoice_date_range.startDate = null;
          this.invoice_date_range.endDate = null;

          this.date_bill_range.startDate = null;
          this.date_bill_range.endDate = null;

          this.estimate_date_range.startDate = null;
          this.estimate_date_range.endDate = null;

          this.confirm_date_range.startDate = null;
          this.confirm_date_range.endDate = null;

          this.incoming_paid_date_range.startDate = null;
          this.incoming_paid_date_range.endDate = null;

          // this.paid_date_range.startDate = null;
          // this.paid_date_range.endDate = null;

          this.asking_payment_date_range.startDate = null;
          this.asking_payment_date_range.endDate = null;

          this.memo_date_one_range.startDate = null;
          this.memo_date_one_range.endDate = null;

          this.memo_date_two_range.startDate = null;
          this.memo_date_two_range.endDate = null;

          this.memo_date_three_range.startDate = null;
          this.memo_date_three_range.endDate = null;

          this.remark_date_range.startDate = null;
          this.remark_date_range.endDate = null;

          this.so_end_date_range.startDate = null;
          this.so_end_date_range.endDate = null;
          // -------------------------------end ----------------------------------------//

          this.rv_number_blank = false;
          this.debt_reduction_docno_blank = false;
          this.reissue_status_blank = false;
          this.cn_number_blank = false;
          this.cn_ten_blank = false; //คอลัมน์CN10
          this.customer_no_blank = false;
          this.amount_after_vat_blank = false;
          this.customer_info_blank = false;
          this.billing_remark_blank = false;
          this.remain_day_blank = false;
          this.remark_warroom_blank = false;
          this.customer_description_blank = false;
          this.customer_email_blank = false;

          if (response.status === 200) {
            this.finish = true;
            this.datalist = response.data.data;
            this.Alldata = response.data.data;
            if (this.datalist == undefined || this.datalist == null) {
              this.finish = true;
              this.total_count = 0;
              this.count_invoice = 0;
              this.sum_amount = 0;
              this.datalist = [];
              this.page_total = 1;
              this.page = 1;
            } else {
              this.finish = true;
              this.total_count = response.data.total.toLocaleString();
              this.count_invoice = response.data.count.toLocaleString();
              this.sum_amount = response.data.sum_amount.toLocaleString();
              this.page_total = response.data.count_page;
              if (this.datalist !== null) {
                this.datalist.forEach((element) => {
                  element.date_bill = moment(element.date_bill).format(
                    "YYYY-MM-DD"
                  );
                  element.estimate_date = moment(element.estimate_date).format(
                    "YYYY-MM-DD"
                  );
                  element.incoming_paid_date = moment(element.incoming_paid_date).format(
                    "YYYY-MM-DD"
                  );

                  element.confirm_date = moment(element.confirm_date).format(
                    "YYYY-MM-DD"
                  );
                  // element.paid_date = moment(element.paid_date).format(
                  //   "YYYY-MM-DD"
                  // );
                  if (element.asking_payment_date) {
                    element.asking_payment_date = moment(
                      element.asking_payment_date
                    ).format("YYYY-MM-DD");
                  }
                  element.memo_date_one = moment(element.memo_date_one).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_two = moment(element.memo_date_two).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_three = moment(
                    element.memo_date_three
                  ).format("YYYY-MM-DD");
                  element.remark_date = moment(element.remark_date).format(
                    "YYYY-MM-DD"
                  );
                  if (
                    element.billing_type_detail == "Mail + ปณ" ||
                    element.billing_type_detail == "Mail + ปณ." ||
                    element.billing_type_detail == "Mail+ปณ" ||
                    element.billing_type_detail == "Mail+ปณ."
                  ) {
                    element.billing_type_detail = "Mail+ปณ.";
                  } else if (
                    element.billing_type_detail == "ปณ" ||
                    element.billing_type_detail == "ปณ."
                  ) {
                    element.billing_type_detail = "ปณ.";
                  }
                  if (element.billing_checking == "No") {
                    element.billing_checking = "false";
                  } else if (element.billing_checking == "Yes") {
                    element.billing_checking = "true";
                  }
                  if(element.payment_type == "Bill Payment - SCB" || element.payment_type == "Bill_Payment_SCB"){
                      element.payment_type = "Bill Payment - SCB";
                  }else if (element.payment_type == "Bill Payment - KBANK" || element.payment_type == "Bill_Payment_KBANK"){
                      element.payment_type = "Bill Payment - KBANK";
                  }else if (element.payment_type == "Bill Payment - BBL" || element.payment_type == "Bill_Payment_BBL"){
                      element.payment_type = "Bill Payment - BBL";
                  }

                });

                this.invoice_list = [];
                this.customer_name_list = [];
                this.customer_no_list = [];
                this.so_number_list = [];
                this.finance_name_list = [];
                this.sale_name_list = [];
                this.sale_team_list = [];
                this.cn_number_list = [];
                // this.cn_ten_list = []; //คอลัมน์CN10
                this.rv_number_list = [];
                this.receipt_number_list = [];
                this.user_name_list = [];
                this.listfilter_data("", "invoice_no");
                this.listfilter_data("", "invoice_name");
                this.listfilter_data("", "customer_name");
                this.listfilter_data("", "so_number");
                this.listfilter_data("", "finance_name");
                this.listfilter_data("", "sale_name");
                this.listfilter_data("", "sale_team");
                this.listfilter_data("", "cn_number");
                // this.listfilter_data("", "cn_ten"); //คอลัมน์CN10
                this.listfilter_data("", "rv_number");
                this.listfilter_data("", "receipt_number");
                this.listfilter_data("", "incoming_status");
                this.listfilter_data("", "user_name");
              }
            }
            if (this.datalist !== null) {
              this.getTotalAmount();
            }
          } else {
            this.finish = true;
            this.datalist = [];
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            if (error.response.status == 401) {
              localStorage.clear();
              this.$router.push("/login");
            }
          }
        });
    },
    closeMatching() {
      this.role_status = localStorage.getItem("role");
      /*if (this.role_status == "wait_down_service") {
        this.finish = false;
        this.$router.push("/invoice-book-close");
      } else if (this.role_status == "down_service") {
        this.finish = false;
        this.$router.push("/down-service");
      }*/ 
      if (localStorage.getItem("acces_token")) {
        this.finish = false;
        localStorage.setItem("list_invoice", JSON.stringify([]));
        this.setting_column();
        this.getInvoice();
        // this.getTotalAmount();
        this.getFinance();
      } else {
        this.$router.push("/login");
      }
    },
    getTotalAmount() {
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
        .get(process.env.VUE_APP_API + "/invoice/amount", headers)
        .then((amount) => {
          this.finish = true;
          this.total_amount = amount.data.total_amount.toLocaleString();
        });
    },
    calculateAmount(data) {
      return data.toLocaleString();
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    searchWord() {
      this.finish = false;
      this.getInvoice();
    },
    filter(filter, key) {
      // ส่ง filter = ข้อมูล มีแบบ object และ string
      // key = =ชื่อของคอลัม
      this.AllFile = ""; // ใช้สำหรับเวลาส่งไฟล์ทั้งหมด
      this.blank = [];

      var check_key = false;
      // ---------------เช็คว่าใน filterlist มีข้อมูลนี้หรือยัง-------------------------//
      if (filter !== undefined) {
        for (let index = 0; index < this.filterlist.length; index++) {
          if (key == this.filterlist[index].key) {
            check_key = true;
          }
        }
        // ---------------มีใน filterlist -------------------------//
        if (check_key) {
          if (typeof filter == "object") {
            for (let index = 0; index < this.filterlist.length; index++) {
              if (key == this.filterlist[index].key) {
                this.filterlist[index].value = filter;
              }
            }
          } else {
            for (let index = 0; index < this.filterlist.length; index++) {
              if (key == this.filterlist[index].key) {
                this.filterlist[index].value = [filter];
              }
            }
          }
        }
        // ---------------ยังไม่มีใน filterlist -------------------------//
        else {
          if (typeof filter == "object") {
            this.filterlist.push({
              key: key,
              value: filter,
            });
          } else {
            this.filterlist.push({
              key: key,
              value: [filter],
            });
          }
        }
      }
      //------------------ถ้า เป็น undifined ให้ลบทิ้ง----------------------//
      else {
        for (let index = 0; index < this.filterlist.length; index++) {
          if (key == this.filterlist[index].key) {
            this.filterlist.splice(index, 1);
          }
        }
      }
      //------------------เช็คดูว่าใน listfilter มี value ที่เป็น [] หรือไม่ ถ้ามีให้ลบทิ้ง---------------------//
      for (let index = 0; index < this.filterlist.length; index++) {
        if (this.filterlist[index].value.length == 0) {
          this.filterlist.splice(index, 1);
        }
      }
      //------------------เช็คดูว่าใน listfilter มี value ที่เป็นค่าว่าง ค่า null หรือไม่ ถ้ามีให้ลบทิ้ง---------------------//
      if (this.filterlist.length == 1) {
        if (
          this.filterlist[0].value == "" ||
          this.filterlist[0].value == undefined ||
          this.filterlist[0].value == null
          // this.filterlist[0].value == 0
        )
          this.filterlist.splice(0, 1);
      }
      //------------------แปลงค่าที่ส่งจาก filter (Yes/No) เป็น True/False ---------------------//
      //------------------กรณีนี้คือ ต้องส่งค่า boolean เป็น string ไปแทนเพราะ backend รับเป็น string---------------------//
      for (let index = 0; index < this.filterlist.length; index++) {
        if (this.filterlist[index].key == "factoring") {
          for (let f = 0; f < this.filterlist[index].value.length; f++) {
            if (this.filterlist[index].value[f] == "Yes") {
              this.filterlist[index].value[f] = "true";
            }
            if (this.filterlist[index].value[f] == "No") {
              this.filterlist[index].value[f] = "false";
            }
          }
        }
        if (this.filterlist[index].key == "no_contact") {
          for (let f = 0; f < this.filterlist[index].value.length; f++) {
            if (this.filterlist[index].value[f] == "Yes") {
              this.filterlist[index].value[f] = "true";
            }
            if (this.filterlist[index].value[f] == "No") {
              this.filterlist[index].value[f] = "false";
            }
          }
        }
        //------------------กรณีนี้คือ ต้องส่งค่า 0,1 เป็นไปแทนเพราะ backend รับเป็น 0,1---------------------//
        if (this.filterlist[index].key == "aging") {
          for (let f = 0; f < this.filterlist[index].value.length; f++) {
            if (this.filterlist[index].value[f] == "0") {
              this.filterlist[index].value[f] = "0";
            }
            if (this.filterlist[index].value[f] == "มากกว่า 0") {
              this.filterlist[index].value[f] = "1";
            }
          }
        }
      }

      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          this.finish = false;
          if (response.status === 200) {
            this.finish = true;
            // this.selected = [];
            this.datalist = response.data.data;
            if (this.datalist == undefined || this.datalist == null) {
              this.finish = true;
              this.total_count = 0;
              this.count_invoice = 0;
              this.sum_amount = 0;
              this.datalist = [];
            } else {
              this.finish = true;
              this.total_count = response.data.total.toLocaleString();
              this.count_invoice = response.data.count.toLocaleString();
              this.sum_amount = response.data.sum_amount.toLocaleString();
              this.page_total = response.data.count_page;
              if (this.datalist !== null) {
                this.datalist.forEach((element) => {
                  element.date_bill = moment(element.date_bill).format(
                    "YYYY-MM-DD"
                  );
                  element.estimate_date = moment(element.estimate_date).format(
                    "YYYY-MM-DD"
                  );
                  element.incoming_paid_date = moment(element.incoming_paid_date).format(
                    "YYYY-MM-DD"
                  );

                  element.confirm_date = moment(element.confirm_date).format(
                    "YYYY-MM-DD"
                  );
                  // element.paid_date = moment(element.paid_date).format(
                  //   "YYYY-MM-DD"
                  // );
                  if (element.asking_payment_date) {
                    element.asking_payment_date = moment(
                      element.asking_payment_date
                    ).format("YYYY-MM-DD");
                  }
                  element.memo_date_one = moment(element.memo_date_one).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_two = moment(element.memo_date_two).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_three = moment(
                    element.memo_date_three
                  ).format("YYYY-MM-DD");
                  element.remark_date = moment(element.remark_date).format(
                    "YYYY-MM-DD"
                  );
                  if(element.payment_type == "Bill Payment - SCB" || element.payment_type == "Bill_Payment_SCB"){
                    element.payment_type = "Bill Payment - SCB";
                  }else if (element.payment_type == "Bill Payment - KBANK" || element.payment_type == "Bill_Payment_KBANK"){
                    element.payment_type = "Bill Payment - KBANK";
                  }else if (element.payment_type == "Bill Payment - BBL" || element.payment_type == "Bill_Payment_BBL"){
                    element.payment_type = "Bill Payment - BBL";
                  }

                  this.invoice_list = [];
                  this.customer_name_list = [];
                  this.customer_no_list = [];
                  this.so_number_list = [];
                  this.finance_name_list = [];
                  this.sale_name_list = [];
                  this.sale_team_list = [];
                  this.cn_number_list = [];
                  // this.cn_ten_list = []; //คอลัมน์CN10
                  this.rv_number_list = [];
                  this.receipt_number_list = [];
                  this.user_name_list = [];
                  this.listfilter_data("", "invoice_no");
                  this.listfilter_data("", "invoice_name");
                  this.listfilter_data("", "customer_name");
                  this.listfilter_data("", "so_number");
                  this.listfilter_data("", "finance_name");
                  this.listfilter_data("", "sale_name");
                  this.listfilter_data("", "sale_team");
                  this.listfilter_data("", "cn_number");
                  // this.listfilter_data("", "cn_ten"); //คอลัมน์CN10
                  this.listfilter_data("", "rv_number");
                  this.listfilter_data("", "receipt_number");
                  this.listfilter_data("", "incoming_status");
                  this.listfilter_data("", "user_name");
                });
              }
            }
            // if (response.data.data) {
            //   this.getTotalAmount()
            // }
          } else {
            this.finish = true;
            this.datalist = [];

            // this.datalist = this.orders;
          }
          if (this.filterlist.length == 0) {
            // this.getInvoice();
            this.getData_afterClearAll();
          }
        });
    },

    listfilter_data(data, name) {
      // ----------------------เป็นการเก็บข้อมูล filter เพื่อส่งให้้ filter ที่เป็นการ checkbox--------------------------//
      //------------------------ส่วนใหญ่จะเป็น autocomplete ------------------------------//
      if (this.Alldata !== null) {
        if (name == "invoice_no") {
          var invoice_no = [];
          if (invoice_no.includes(["blank"]) == false) {
            invoice_no.push("[blank]");
          }
          this.Alldata.forEach((element) => {
            if (element.invoice_no !== "" || element.invoice_no !== undefined) {
              invoice_no.push(element.invoice_no);
            }
          });
          this.invoice_list = invoice_no;
          return invoice_no;
        }
        if (name == "customer_name") {
          var customer_name = [];
          if (customer_name.includes(["blank"]) == false) {
            customer_name.push("[blank]");
          }
          this.Alldata.forEach((element) => {
            if (
              element.customer_name !== "" ||
              element.customer_name !== undefined
            ) {
              customer_name.push(element.customer_name);
            }
          });
          this.customer_name_list = customer_name;
          return customer_name;
        }
        if (name == "customer_no") {
          var customer_no = [];
          if (customer_no.includes(["blank"]) == false) {
            customer_no.push("[blank]");
          }
          this.Alldata.forEach((element) => {
            if (
              element.customer_no !== "" ||
              element.customer_no !== undefined
            ) {
              customer_no.push(element.customer_no);
            }
          });
          this.customer_no_list = customer_no;
          return customer_no;
        }

        if (name == "so_number") {
          var so_number = [];

          if (so_number.includes("[blank]") == false) {
            so_number.push("[blank]");
          }
          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].so_number !== "" &&
              this.Alldata[index].so_number !== undefined &&
              so_number.includes(this.Alldata[index].so_number) == false
            ) {
              so_number.push(this.Alldata[index].so_number);
            }
            //  else if (
            //   this.Alldata[index].so_number == "" &&
            //   so_number.includes(this.Alldata[index].so_number) == false
            // ) {
            //   so_number.push("[blank]");
            // }
          }
          this.so_number_list = so_number;
          return so_number;
        }
        if (name == "finance_name") {
          var finance_name = [];
          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].finance_name !== "" &&
              this.Alldata[index].finance_name !== undefined &&
              finance_name.includes(this.Alldata[index].finance_name) == false
            ) {
              finance_name.push(this.Alldata[index].finance_name);
            } else if (
              this.Alldata[index].finance_name == "" &&
              finance_name.includes(this.Alldata[index].finance_name) == false
            ) {
              finance_name.push("[blank]");
            }
          }
          // this.finance_name_list = finance_name.sort();
          return finance_name.sort();
        }
        if (name == "over_due") {
          var over_due = [
            "overdue 1-30 วัน",
            "overdue 31-60 วัน",
            "overdue 61-90 วัน",
            "overdue 91-180 วัน",
            "overdue 181-360 วัน",
            "overdue เกิน 360 วัน",
            "ยังไม่ครบกำหนด",
          ];

          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].over_due == ""
              // this.Alldata[index].over_due !== undefined &&
              // over_due.includes(this.Alldata[index].over_due) == false
            ) {
              over_due.push("[blank]");
            }
            // else if (
            //   this.over_due[index].over_due == '' &&
            //   over_due.includes(this.Alldata[index].over_due) == false
            // ) {
            //   over_due.push("[blank]");
            // }
          }
          return over_due.sort();
        }
        if (name == "sale_name") {
          var sale_name = [];
          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].sale_name == "" &&
              this.Alldata[index].sale_name !== undefined &&
              sale_name.includes(this.Alldata[index].sale_name) == false
            ) {
              sale_name.push("[blank]");
            }
          }
          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].sale_name !== "" &&
              this.Alldata[index].sale_name !== undefined &&
              sale_name.includes(this.Alldata[index].sale_name) == false
            ) {
              sale_name.push(this.Alldata[index].sale_name);
            }
            // else if (
            //   this.Alldata[index].sale_name == '' &&
            //   sale_name.includes(this.Alldata[index].sale_name) == false
            // ) {
            //   sale_name.push("[blank]");
            //   // this.Alldata.splice(index,1)
            // }
          }
          this.sale_name_list = sale_name;
          return sale_name;
        }

        if (name == "sale_team") {
          var sale_team = [];

          if (sale_team.includes("[blank]") == false) {
            sale_team.push("[blank]");
          }

          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].sale_team !== "" &&
              this.Alldata[index].sale_team !== undefined &&
              sale_team.includes(this.Alldata[index].sale_team) == false
            ) {
              sale_team.push(this.Alldata[index].sale_team);
            }
            // else if (
            //   this.Alldata[index].sale_name == '' &&
            //   sale_name.includes(this.Alldata[index].sale_name) == false
            // ) {
            //   sale_name.push("[blank]");
            //   // this.Alldata.splice(index,1)
            // }
          }
          this.sale_team_list = sale_team;
          return sale_team;
        }
        if (name == "cn_number") {
          var cn_number = [];
          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].cn_number !== "" &&
              this.Alldata[index].cn_number !== undefined &&
              cn_number.includes(this.Alldata[index].cn_number) == false
            ) {
              cn_number.push(this.Alldata[index].cn_number);
            } else if (
              this.Alldata[index].cn_number == "" &&
              cn_number.includes(this.Alldata[index].cn_number) == false
            ) {
              cn_number.push("[blank]");
            }
          }
          this.cn_number_list = cn_number;
          return cn_number;
        }
        // คอลัมน์CN10
        // if (name == "cn_ten") {
        //   var cn_ten = [];
        //   for (let index = 0; index < this.Alldata.length; index++) {
        //     if (
        //       this.Alldata[index].cn_ten !== "" &&
        //       this.Alldata[index].cn_ten !== undefined &&
        //       cn_ten.includes(this.Alldata[index].cn_ten) == false
        //     ) {
        //       cn_ten.push(this.Alldata[index].cn_ten);
        //     } else if (
        //       this.Alldata[index].cn_ten == "" &&
        //       cn_ten.includes(this.Alldata[index].cn_ten) == false
        //     ) {
        //       cn_ten.push("[blank]");
        //     }
        //   }
        //   this.cn_ten_list = cn_ten;
        //   return cn_ten;
        // }
        // end
        if (name == "rv_number") {
          var rv_number = [];

          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].rv_number !== "" &&
              this.Alldata[index].rv_number !== undefined &&
              rv_number.includes(this.Alldata[index].rv_number) == false
            ) {
              rv_number.push(this.Alldata[index].rv_number);
            } else if (
              this.Alldata[index].rv_number == "" &&
              rv_number.includes(this.Alldata[index].rv_number) == false
            ) {
              rv_number.push("[blank]");
            }
          }
          this.rv_number_list = rv_number;
          return rv_number;
        }
        if (name == "receipt_number") {
          var receipt_number = [];
          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].receipt_number !== "" &&
              this.Alldata[index].receipt_number !== undefined &&
              receipt_number.includes(this.Alldata[index].receipt_number) ==
                false
            ) {
              receipt_number.push(this.Alldata[index].receipt_number);
            } else if (
              this.Alldata[index].receipt_number == "" &&
              receipt_number.includes(this.Alldata[index].receipt_number) ==
                false
            ) {
              receipt_number.push("[blank]");
            }
          }
          this.receipt_number_list = receipt_number;
          return receipt_number;
        }
        if (name == "user_name") {
          var user_name = [];
          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].user_name !== "" &&
              this.Alldata[index].user_name !== undefined &&
              user_name.includes(this.Alldata[index].user_name) == false
            ) {
              user_name.push(this.Alldata[index].user_name);
            } else if (
              this.Alldata[index].user_name == "" &&
              user_name.includes(this.Alldata[index].user_name) == false
            ) {
              user_name.push("[blank]");
            }
          }
          this.user_name_list = user_name.sort();
          return user_name.sort();
        }
      }
    },
    // ---------------------ทั้งหมดนี้คือการ update ค่าข้อมูล ---------------------------------//
    no_contact_Change(event, data) {
      let b = null;
      if (event.target.value == "true") {
        b = true;
      } else if (event.target.value == "false") {
        b = false;
      } else {
        b = "";
      }
      var updateData = {
        seq: Number(data.seq),
        uid: data.uid,
        aging: Number(data.aging),
        invoice_summary: null,
        invoice_no: data.invoice_no,
        invoice_status: data.invoice_status,
        factoring: data.factoring,
        online_payment: data.online_payment,
        customer_description: data.customer_description,
        customer_criteria: data.customer_criteria,
        customer_email: data.customer_email,
        no_contact: b,
        so_number: data.so_number,
        start_date: new Date(data.start_date).toJSON(),
        end_date: new Date(data.end_date).toJSON(),
        invoice_date: new Date(data.invoice_date).toJSON(),
        customer_no: data.customer_no,
        customer_name: data.customer_name,
        inet_jv: data.customer_type,
        finance_id: data.finance_id,
        finance_name: data.finance_name,
        finance_tel_no: data.finance_tel_no,
        over_due: data.over_due,
        amount_after_vat: Number(data.amount_after_vat),
        amount_before_vat: Number(data.amount_before_vat),
        sale_name: data.sale_name,
        sale_id: data.sale_id,
        sale_team: data.sale_team,
        customer_info: data.customer_info,
        date_bill: data.date_bill,
        billing_type_detail: data.billing_type_detail,
        billing_status: data.billing_status,
        billing_status_remark : data.billing_status_remark, //คอลัมน์หมายเหตุสถานะวางบิล
        billing_checking: data.billing_checking,
        billing_remark: data.billing_remark,
        estimate_date: new Date(data.estimate_date).toJSON(),
        confirm_date: new Date(data.confirm_date).toJSON(),
        incoming_paid_date: new Date(data.incoming_paid_date).toJSON(),
        payment_type: data.payment_type,
        recheck: data.recheck,
        status_recheck: data.status_recheck,
        // add column status cash collection and aging cash collection
        cut_debt: data.cut_debt,
        // base_adjust: data.base_adjust,
        // aging_cash: data.aging_cash,
        paid: data.paid,
        status_payment: data.status_payment,
        // paid_date: new Date(data.paid_date).toJSON(),
        asking_payment: data.asking_payment,
        asking_payment_date: new Date(data.asking_payment_date).toJSON(),
        remain_day: data.remain_day,
        memo_date_one: new Date(data.memo_date_one).toJSON(),
        memo_date_two: new Date(data.memo_date_two).toJSON(),
        memo_date_three: new Date(data.memo_date_three).toJSON(),
        debt_reduction_docno: data.debt_reduction_docno,
        reissue_status: data.reissue_status,
        cn_number: data.cn_number,
        // cn_ten: data.cn_ten,//คอลัมน์CN10
        rv_number: data.rv_number,
        receipt_number: data.receipt_number,
        incoming_status: data.incoming_status,
        action_by: localStorage.getItem("account_id"),
        remark_warroom: data.remark_warroom,
        user_name: data.user_name,
        remark_date: new Date(data.remark_date).toJSON(),
        service: data.service,
        quotation: data.quotation,
      };
      this.Update(updateData);
    },
    factoringChange(event, data) {
      let b = null;
      if (event.target.value == "true") {
        b = true;
      } else if (event.target.value == "false") {
        b = false;
      } else {
        b = "";
      }
      var updateData = {
        seq: Number(data.seq),
        uid: data.uid,
        aging: Number(data.aging),
        invoice_summary: null,
        invoice_no: data.invoice_no,
        invoice_status: data.invoice_status,
        factoring: b,
        online_payment: data.online_payment,
        customer_description: data.customer_description,
        customer_criteria: data.customer_criteria,
        customer_email: data.customer_email,
        no_contact: Boolean(data.no_contact),
        so_number: data.so_number,
        start_date: new Date(data.start_date).toJSON(),
        end_date: new Date(data.end_date).toJSON(),
        invoice_date: new Date(data.invoice_date).toJSON(),
        customer_no: data.customer_no,
        customer_name: data.customer_name,
        inet_jv: data.customer_type,
        finance_id: data.finance_id,
        finance_name: data.finance_name,
        finance_tel_no: data.finance_tel_no,
        over_due: data.over_due,
        amount_after_vat: Number(data.amount_after_vat),
        amount_before_vat: Number(data.amount_before_vat),
        sale_name: data.sale_name,
        sale_id: data.sale_id,
        sale_team: data.sale_team,
        customer_info: data.customer_info,
        date_bill: data.date_bill,
        billing_type_detail: data.billing_type_detail,
        billing_status: data.billing_status,
        billing_status_remark : data.billing_status_remark, //คอลัมน์หมายเหตุสถานะวางบิล
        billing_checking: data.billing_checking,
        billing_remark: data.billing_remark,
        estimate_date: new Date(data.estimate_date).toJSON(),
        confirm_date: new Date(data.confirm_date).toJSON(),
        incoming_paid_date: new Date(data.incoming_paid_date).toJSON(),
        payment_type: data.payment_type,
        recheck: data.recheck,
        status_recheck: data.status_recheck,
        // add column status cash collection and aging cash collection
        cut_debt: data.cut_debt,
        // base_adjust: data.base_adjust,
        // aging_cash: data.aging_cash,
        paid: data.paid,
        status_payment: data.status_payment,
        // paid_date: new Date(data.paid_date).toJSON(),
        asking_payment: data.asking_payment,
        asking_payment_date: new Date(data.asking_payment_date).toJSON(),
        remain_day: data.remain_day,
        memo_date_one: new Date(data.memo_date_one).toJSON(),
        memo_date_two: new Date(data.memo_date_two).toJSON(),
        memo_date_three: new Date(data.memo_date_three).toJSON(),
        debt_reduction_docno: data.debt_reduction_docno,
        reissue_status: data.reissue_status,
        cn_number: data.cn_number,
        // cn_ten: data.cn_ten, //คอลัมน์CN10
        rv_number: data.rv_number,
        receipt_number: data.receipt_number,
        incoming_status: data.incoming_status,
        action_by: localStorage.getItem("account_id"),
        remark_warroom: data.remark_warroom,
        user_name: data.user_name,
        remark_date: new Date(data.remark_date).toJSON(),
        service: data.service,
        quotation: data.quotation,
      };
      this.Update(updateData);
    },
    select_1(e, data) {
      var updateData = {
        seq: Number(data.seq),
        uid: data.uid,
        aging: Number(data.aging),
        invoice_summary: null,
        invoice_no: data.invoice_no,
        invoice_status: data.invoice_status,
        factoring: Boolean(data.factoring),
        online_payment: data.online_payment,
        so_number: data.so_number,
        start_date: new Date(data.start_date).toJSON(),
        end_date: new Date(data.end_date).toJSON(),
        invoice_date: new Date(data.invoice_date).toJSON(),
        customer_no: data.customer_no,
        customer_name: data.customer_name,
        customer_description: data.customer_description,
        customer_criteria: data.customer_criteria,
        customer_email: data.customer_email,
        no_contact: Boolean(data.no_contact),
        inet_jv: data.customer_type,
        finance_id: data.finance_id,
        finance_name: data.finance_name,
        finance_tel_no: data.finance_tel_no,
        over_due: data.over_due,
        amount_after_vat: Number(data.amount_after_vat),
        amount_before_vat: Number(data.amount_before_vat),
        sale_name: data.sale_name,
        sale_id: data.sale_id,
        sale_team: data.sale_team,
        status_payment: data.status_payment,
        customer_info: data.customer_info,
        date_bill: data.date_bill,
        billing_type_detail: data.billing_type_detail,
        billing_status: data.billing_status,
        billing_status_remark : data.billing_status_remark, //คอลัมน์หมายเหตุสถานะวางบิล
        billing_checking: data.billing_checking,
        billing_remark: data.billing_remark,
        estimate_date: new Date(data.estimate_date).toJSON(),
        confirm_date: new Date(data.confirm_date).toJSON(),
        incoming_paid_date: new Date(data.incoming_paid_date).toJSON(),
        payment_type: data.payment_type,
        paid: data.paid,
        recheck: data.recheck,
        status_recheck: data.status_recheck,
        // add column status cash collection and aging cash collection
        cut_debt: data.cut_debt,
        // base_adjust: data.base_adjust,
        // aging_cash: data.aging_cash,
        // end
        // paid_date: new Date(data.paid_date).toJSON(),
        asking_payment: data.asking_payment,
        asking_payment_date: new Date(data.asking_payment_date).toJSON(),
        remain_day: data.remain_day,
        memo_date_one: new Date(data.memo_date_one).toJSON(),
        memo_date_two: new Date(data.memo_date_two).toJSON(),
        memo_date_three: new Date(data.memo_date_three).toJSON(),
        debt_reduction_docno: data.debt_reduction_docno,
        reissue_status: data.reissue_status,
        cn_number: data.cn_number,
        // cn_ten: data.cn_ten, //คอลัมน์CN10
        rv_number: data.rv_number,
        receipt_number: data.receipt_number,
        incoming_status: data.incoming_status,
        action_by: localStorage.getItem("account_id"),
        remark_warroom: data.remark_warroom,
        user_name: data.user_name,
        remark_date: new Date(data.remark_date).toJSON(),
        check_step_one: data.check_step_one,
        check_step_two: data.check_step_two,
        check_step_three: data.check_step_three,
        service: data.service,
        quotation: data.quotation,
      };
      this.Update(updateData);
    },
    Update(data) {
      this.editing = true;
      this.finish = false;
      var updateData = {
        seq: Number(data.seq),
        uid: data.uid,
        aging: Number(data.aging),
        invoice_summary: null,
        invoice_no: data.invoice_no,
        invoice_status: data.invoice_status,
        factoring: Boolean(data.factoring),
        online_payment: data.online_payment,
        so_number: data.so_number,
        start_date: new Date(data.start_date).toJSON(),
        end_date: new Date(data.end_date).toJSON(),
        invoice_date: new Date(data.invoice_date).toJSON(),
        customer_no: data.customer_no,
        customer_name: data.customer_name,
        customer_criteria: data.customer_criteria,
        customer_description: data.customer_description,
        customer_email: data.customer_email,
        no_contact: Boolean(data.no_contact),
        inet_jv: data.inet_jv,
        finance_id: data.finance_id,
        finance_name: data.finance_name,
        finance_tel_no: data.finance_tel_no,
        over_due: data.over_due,
        amount_after_vat: Number(data.amount_after_vat),
        amount_before_vat: Number(data.amount_before_vat),
        sale_name: data.sale_name,
        sale_id: data.sale_id,
        sale_team: data.sale_team,
        customer_info: data.customer_info,
        date_bill: new Date(data.date_bill).toJSON(),
        billing_type_detail: data.billing_type_detail,
        billing_status: data.billing_status,
        billing_status_remark : data.billing_status_remark, //คอลัมน์หมายเหตุสถานะวางบิล
        billing_checking: data.billing_checking,
        billing_remark: data.billing_remark,
        estimate_date: data.estimate_date,
        confirm_date: new Date(data.confirm_date).toJSON(),
        incoming_paid_date: new Date(data.incoming_paid_date).toJSON(),
        payment_type: data.payment_type,
        paid: data.paid,
        recheck: data.recheck,
        status_recheck: data.status_recheck,
        // add status cash collection and aging cash collection
        cut_debt: data.cut_debt,
        // base_adjust: data.base_adjust,
        // aging_cash: data.aging_cash,
        // end
        // paid_date: new Date(data.paid_date).toJSON(),
        asking_payment: data.asking_payment,
        status_payment: data.status_payment,
        asking_payment_date: new Date(data.asking_payment_date).toJSON(),
        remain_day: data.remain_day,
        memo_date_one: new Date(data.memo_date_one).toJSON(),
        memo_date_two: new Date(data.memo_date_two).toJSON(),
        memo_date_three: new Date(data.memo_date_three).toJSON(),
        debt_reduction_docno: data.debt_reduction_docno,
        reissue_status: data.reissue_status,
        cn_number: data.cn_number,
        // cn_ten: data.cn_ten, //คอลัมน์CN10
        rv_number: data.rv_number,
        receipt_number: data.receipt_number,
        incoming_status: data.incoming_status,
        action_by: localStorage.getItem("account_id"),
        remark_warroom: data.remark_warroom,
        user_name: data.user_name,
        remark_date: new Date(data.remark_date).toJSON(),
        check_step_one: data.check_step_one,
        check_step_two: data.check_step_two,
        check_step_three: data.check_step_three,
        service: data.service,
        quotation: data.quotation,
      };
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
          process.env.VUE_APP_API + "/invoice/" + updateData.uid,
          updateData,
          headers_update
        )
        .then(() => {
          this.finish = true;
          // this.getInvoice();
          // this.getData_afterClearAll();
          // this.dialog_popup= false
          this.refresh_filter();
          // this.dialog_popup= false
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
              // this.close_edit_cus_no();
              // this.change_page_filter()
              this.getInvoice();
            });
          }
        });
    },
    select_2(e, data) {
      var updateData = {
        seq: Number(data.seq),
        uid: data.uid,
        aging: Number(data.aging),
        invoice_summary: null,
        invoice_no: data.invoice_no,
        invoice_status: data.invoice_status,
        factoring: Boolean(data.factoring),
        online_payment: data.online_payment,
        so_number: data.so_number,
        start_date: new Date(data.start_date).toJSON(),
        end_date: new Date(data.end_date).toJSON(),
        invoice_date: new Date(data.invoice_date).toJSON(),
        customer_no: data.customer_no,
        customer_name: data.customer_name,
        customer_description: data.customer_description,
        customer_criteria: data.customer_criteria,
        customer_email: data.customer_email,
        no_contact: Boolean(data.no_contact),
        inet_jv: data.customer_type,
        finance_id: data.finance_id,
        finance_name: data.finance_name,
        finance_tel_no: data.finance_tel_no,
        over_due: data.over_due,
        amount_after_vat: Number(data.amount_after_vat),
        amount_before_vat: Number(data.amount_before_vat),
        sale_name: data.sale_name,
        sale_id: data.sale_id,
        sale_team: data.sale_team,
        status_payment: data.status_payment,
        customer_info: data.customer_info,
        date_bill: data.date_bill,
        billing_type_detail: data.billing_type_detail,
        billing_status: data.billing_status,
        billing_status_remark : data.billing_status_remark, //คอลัมน์หมายเหตุสถานะวางบิล
        billing_checking: data.billing_checking,
        billing_remark: data.billing_remark,
        estimate_date: new Date(data.estimate_date).toJSON(),
        confirm_date: new Date(data.confirm_date).toJSON(),
        incoming_paid_date: new Date(data.incoming_paid_date).toJSON(),
        payment_type: data.payment_type,
        paid: data.paid,
        recheck: data.recheck,
        status_recheck: data.status_recheck,
        // add column status cash collection and aging cash collection
        cut_debt: data.cut_debt,
        // base_adjust: data.base_adjust,
        // aging_cash: data.aging_cash,
        // end
        // paid_date: new Date(data.paid_date).toJSON(),
        asking_payment: data.asking_payment,
        asking_payment_date: new Date(data.asking_payment_date).toJSON(),
        remain_day: data.remain_day,
        memo_date_one: new Date(data.memo_date_one).toJSON(),
        memo_date_two: new Date(data.memo_date_two).toJSON(),
        memo_date_three: new Date(data.memo_date_three).toJSON(),
        debt_reduction_docno: data.debt_reduction_docno,
        reissue_status: data.reissue_status,
        cn_number: data.cn_number,
        // cn_ten: data.cn_ten, //คอลัมน์CN10
        rv_number: data.rv_number,
        receipt_number: data.receipt_number,
        incoming_status: data.incoming_status,
        action_by: localStorage.getItem("account_id"),
        remark_warroom: data.remark_warroom,
        user_name: data.user_name,
        remark_date: new Date(data.remark_date).toJSON(),
        check_step_one: data.check_step_one,
        check_step_two: data.check_step_two,
        check_step_three: data.check_step_three,
        service: data.service,
        quotation: data.quotation,
      };
      this.Update_billing(updateData);
    },
    Update_billing(data) {
      this.editing = true;
      this.finish = false;
      var updateData = {
        seq: Number(data.seq),
        uid: data.uid,
        aging: Number(data.aging),
        invoice_summary: null,
        invoice_no: data.invoice_no,
        invoice_status: data.invoice_status,
        factoring: Boolean(data.factoring),
        online_payment: data.online_payment,
        so_number: data.so_number,
        start_date: new Date(data.start_date).toJSON(),
        end_date: new Date(data.end_date).toJSON(),
        invoice_date: new Date(data.invoice_date).toJSON(),
        customer_no: data.customer_no,
        customer_name: data.customer_name,
        customer_criteria: data.customer_criteria,
        customer_description: data.customer_description,
        customer_email: data.customer_email,
        no_contact: Boolean(data.no_contact),
        inet_jv: data.inet_jv,
        finance_id: data.finance_id,
        finance_name: data.finance_name,
        finance_tel_no: data.finance_tel_no,
        over_due: data.over_due,
        amount_after_vat: Number(data.amount_after_vat),
        amount_before_vat: Number(data.amount_before_vat),
        sale_name: data.sale_name,
        sale_id: data.sale_id,
        sale_team: data.sale_team,
        customer_info: data.customer_info,
        date_bill: new Date(data.date_bill).toJSON(),
        billing_type_detail: data.billing_type_detail,
        billing_status: data.billing_status,
        billing_status_remark : data.billing_status_remark, //คอลัมน์หมายเหตุสถานะวางบิล
        billing_checking: data.billing_checking,
        billing_remark: data.billing_remark,
        estimate_date: data.estimate_date,
        confirm_date: new Date(data.confirm_date).toJSON(),
        incoming_paid_date: new Date(data.incoming_paid_date).toJSON(),
        payment_type: data.payment_type,
        paid: data.paid,
        recheck: data.recheck,
        status_recheck: data.status_recheck,
        // add status cash collection and aging cash collection
        cut_debt: data.cut_debt,
        // base_adjust: data.base_adjust,
        // aging_cash: data.aging_cash,
        // end
        // paid_date: new Date(data.paid_date).toJSON(),
        asking_payment: data.asking_payment,
        status_payment: data.status_payment,
        asking_payment_date: new Date(data.asking_payment_date).toJSON(),
        remain_day: data.remain_day,
        memo_date_one: new Date(data.memo_date_one).toJSON(),
        memo_date_two: new Date(data.memo_date_two).toJSON(),
        memo_date_three: new Date(data.memo_date_three).toJSON(),
        debt_reduction_docno: data.debt_reduction_docno,
        reissue_status: data.reissue_status,
        cn_number: data.cn_number,
        // cn_ten: data.cn_ten, //คอลัมน์CN10
        rv_number: data.rv_number,
        receipt_number: data.receipt_number,
        incoming_status: data.incoming_status,
        action_by: localStorage.getItem("account_id"),
        remark_warroom: data.remark_warroom,
        user_name: data.user_name,
        remark_date: new Date(data.remark_date).toJSON(),
        check_step_one: data.check_step_one,
        check_step_two: data.check_step_two,
        check_step_three: data.check_step_three,
        service: data.service,
        quotation: data.quotation,
      };
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
          process.env.VUE_APP_API + "/invoice/" + updateData.uid,
          updateData,
          headers_update
        )
        .then(() => {
          //this.finish = true;
          // this.getInvoice();
          // this.getData_afterClearAll();
          // this.dialog_popup= false
          if(updateData.billing_status == "วางบิลไม่ได้" && updateData.billing_status_remark == "" ){
            Swal.fire({
              icon: "info",
              title: "กรุณาระบุหมายเหตุสถานะวางบิล",
              //text: 'หมายเหตุสถานะวางบิล',
              showConfirmButton: false,
              timer: 3500,
            });
          }
          this.refresh_filter();
          // this.dialog_popup= false
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
              // this.close_edit_cus_no();
              // this.change_page_filter()
              this.getInvoice();
            });
          }
        });
    },

    // ---------------------เป็นการ refresh แบบยังคงค่า search และ filter ไว้อยู่ ---------------------------------//
    refresh_filter() {
      this.finish = false;
      // if (this.search != "" && this.filterlist.length == 0) {
      //   this.getInvoice();
      // } else if (this.filterlist.length != 0) {
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          if (response.status === 200) {
            
            this.finish = true;
            // this.selected = [];

            // this.selectcheck()
            // this.selected = []
            this.datalist = response.data.data;
            this.Alldata = response.data.data;
            this.selected = JSON.parse(localStorage.getItem("list_invoice"));
            this.selected_list = JSON.parse(
              localStorage.getItem("list_invoice")
            );
            // this.selected = JSON.parse(localStorage.getItem('list_invoice'))
            // console.log('pagechange:',this.selected);
            if (this.datalist == undefined || this.datalist == null) {
              this.finish = true;
              this.total_count = 0;
              this.count_invoice = 0;
              this.sum_amount = 0;
              this.datalist = [];
            } else {
              this.finish = true;
              this.total_count = response.data.total.toLocaleString();
              this.count_invoice = response.data.count.toLocaleString();
              this.sum_amount = response.data.sum_amount.toLocaleString();
              this.page_total = response.data.count_page;

              if (this.datalist !== null) {
                this.datalist.forEach((element) => {
                  element.date_bill = moment(element.date_bill).format(
                    "YYYY-MM-DD"
                  );
                  element.estimate_date = moment(element.estimate_date).format(
                    "YYYY-MM-DD"
                  );
                  element.incoming_paid_date = moment(element.incoming_paid_date).format(
                    "YYYY-MM-DD"
                  );

                  element.confirm_date = moment(element.confirm_date).format(
                    "YYYY-MM-DD"
                  );
                  // element.paid_date = moment(element.paid_date).format(
                  //   "YYYY-MM-DD"
                  // );
                  element.asking_payment_date = moment(
                    element.asking_payment_date
                  ).format("YYYY-MM-DD");
                  element.memo_date_one = moment(element.memo_date_one).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_two = moment(element.memo_date_two).format(
                    "YYYY-MM-DD"
                  );
                  element.memo_date_three = moment(
                    element.memo_date_three
                  ).format("YYYY-MM-DD");
                  element.remark_date = moment(element.remark_date).format(
                    "YYYY-MM-DD"
                  );
                  if(element.payment_type == "Bill Payment - SCB" || element.payment_type == "Bill_Payment_SCB"){
                    element.payment_type = "Bill Payment - SCB";
                  }else if (element.payment_type == "Bill Payment - KBANK" || element.payment_type == "Bill_Payment_KBANK"){
                    element.payment_type = "Bill Payment - KBANK";
                  }else if (element.payment_type == "Bill Payment - BBL" || element.payment_type == "Bill_Payment_BBL"){
                    element.payment_type = "Bill Payment - BBL";
                  }
                  // this.invoice_list = [];
                  // this.customer_name_list = [];
                  // this.customer_no_list = [];
                  // this.so_number_list = [];
                  // this.finance_name_list = [];
                  // this.sale_name_list = [];
                  // this.sale_team_list = [];
                  // this.cn_number_list = [];
                  // this.rv_number_list = [];
                  // this.receipt_number_list = [];
                  // this.user_name_list = [];
                  this.listfilter_data("", "invoice_no");
                  this.listfilter_data("", "invoice_name");
                  this.listfilter_data("", "customer_name");
                  this.listfilter_data("", "so_number");
                  this.listfilter_data("", "finance_name");
                  this.listfilter_data("", "sale_name");
                  this.listfilter_data("", "sale_team");
                  this.listfilter_data("", "cn_number");
                  // this.listfilter_data("", "cn_ten"); //คอลัมน์CN10
                  this.listfilter_data("", "rv_number");
                  this.listfilter_data("", "receipt_number");
                  this.listfilter_data("", "incoming_status");
                  this.listfilter_data("", "user_name");
                });
                this.finish = true;
                // console.log(response);
              }
            }      
          } else {
            this.finish = true;
            this.datalist = [];

            
            // this.datalist = this.orders;
          }
          if (this.filterlist.length == 0) {
            this.finish = true;
            // this.getInvoice();
            this.getData_afterClearAll();
          }
        });
    // }
    },
    refreshData() {
      // this.search = "";
      this.refresh_filter();
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

// @font-face {
//   font-family: "Bai_Jamjuree";
//   src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Thin.ttf") format("truetype");
//   font-weight: 300;
//   font-style: normal;
// }
@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Medium.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
#selected_list_table {
  th {
    background-color: #ececec !important;
  }
  th.text-start {
    font-family: "Bai_Jamjuree" !important;
    padding-top: 10px !important;
  }
}
#selected_list_table_r {
  th {
    background-color: #ececec !important;
  }
  th.text-start {
    font-family: "Bai_Jamjuree" !important;
    padding-top: 10px !important;
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
// #modal_invoice_preview {
// .v-dialog--fullscreen {
//   margin-top: 60px !important;
// }
// }
.v-dialog--fullscreen {
  top: 64px !important;
}

#customer_edit_table {
  th {
    background-color: #ececec !important;
  }
  td.text-start {
    font-family: "Bai_Jamjuree" !important;
    padding-top: 5px !important;
  }
}
#modal-customer {
  th.text-start {
    font-family: "Bai_Jamjuree" !important;
    background-color: #ececec !important;
    padding-top: 5px !important;
    z-index: 5;
  }
  td.text-start {
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
// .v-pagination {
//   align-items: center;
//   display: inline-flex;
//   list-style-type: none;
//   justify-content: flex-end;
//   margin: 0;
//   max-width: 100%;
//   width: 100%;
// }
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
  font-size: 13px !important;
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

th.text-start.invoice.sortable {
  font-weight: 600;
  position: sticky;
  left: 56px !important;
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

.fixed-invoice {
  position: sticky !important;
  left: 56px !important;
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
#invoice_table_1_main {
  th.text-start {
    background-color: #ececec !important;
    font-weight: 600;
  }
  th.text-center {
    background-color: #ececec !important;
    font-weight: 600;
  }
  th.text-left {
    background-color: #ececec !important;
    font-weight: 600;
  }
  tbody {
    td.text-start {
      font-size: 13px;
      position: sticky !important;
      left: 56px;
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
      font-size: 13px;
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      font-size: 13px;
      z-index: 0;
    }

    td.text-start:first-child {
      font-size: 13px;
      //   position: sticky;
      width: 20px !important;
      left: 0;
      border-right: none !important;
      // background: linear-gradient(
      //   90deg,
      //   rgba(253, 253, 253, 1) 100%,
      //   rgba(253, 253, 253, 1) 100%
      // ) !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
      // border-right: 1px solid white !important;
      //  background-color: white;
      //   top: auto;
      //   z-index: 1;
      //   width: 10px;
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
h5#modal-center-incoming-paid-date___BV_modal_title_.modal-title {
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
h5#modal-center-memo_date_one-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-memo_date_two-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-memo_date_three-date___BV_modal_title_.modal-title {
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
.verticalToolbarSeparator.hiddenSmallView {
  display: none;
}
button#secondaryToolbarToggle {
  display: none;
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
    background-color: #dffaff !important;
    color: rgb(37, 37, 37);
    font-family: "Bai_Jamjuree";
    font-size: 13px;
    height: 50px;
  }
  .dx-datagrid .dx-datagrid-headers .dx-header-row > td {
    outline: 0;
    vertical-align: middle;
  }
  .dx-datagrid-rowsview .dx-row {
    height: 48px !important;
    font-family: "Bai_Jamjuree";
    font-size: 13px !important;
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
.table_in {
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
  font-size: 13px;
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
  font-size: 13px !important;
}
input.form-control {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  border-radius: 1px;
  font-size: 13px !important;
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
#filter{
  .v-select__slot {
    position: relative;
    align-items: center;
    display: flex;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    border: 1px solid #cecece;
    min-height: 48px !important;
    height: 100% !important;
    margin-top: 10px;
  }
}
#filter_rv{
  .v-select__slot {
    position: relative;
    align-items: center;
    display: flex;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    border: 1px solid #cecece;
    min-height: 48px !important;
    height: 100% !important;
    margin-top: 10px;
  }
  .v-select__slot {
    position: relative;
    align-items: center;
    display: flex;
    max-width: 100%;
    min-width: 0%;
    width: 100%;
    min-height: 48px !important;
    height: 100% !important;
    border-radius: 0px !important;
    margin-top: 10px;
    padding-inline: 10px;
    padding-bottom: 8px;
    font-size: 13px !important;
  }
}
.v-select__slot{
  position: relative;
  align-items: center;
  display: flex;
  max-width: 100%;
  min-width: 0%;
  width: 100%;
  min-height: 48px !important;
  height: 100% !important;
  border-radius: 0px !important;
  margin-top: 10px;
  font-size: 13px !important;
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
