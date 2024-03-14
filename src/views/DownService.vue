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
            <h3 style="font-weight:700">Down Service</h3>
          </v-col>
          <v-col cols="12">
            <v-card>
              <!------------------------dialog_approve_down_all ปิดระบบ--------------------------------->
              <!-- <v-dialog
                v-model="dialog_approve_down_all"
                persistent
                max-width="1000"
                scrollable
              >
                <v-card>
                  <v-card-title class="text-h5">
                    <div
                      style="
                        display: block;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        margin: auto;
                      "
                    >
                      <v-avatar color="success" outlined size="30">
                        <v-icon dark> mdi-check </v-icon>
                      </v-avatar>

                      <div class="font-text" style="color: darkgreen; margin-bottom:10px">
                        Confirm การปิดระบบ
                      </div>
                    </div>
                  </v-card-title>

                  <v-card-text>
                    <div class="font-text">
                      <div
                        class="font-text"
                        style="height: 250px; word-break: break-all"
                      >
                        <table id="table_select_modal">
                          <tr style="font-weight: bold">
                            <th style="width: 180px">Invoice No &nbsp;</th>
                            <th style="width: 180px">Order No &nbsp;</th>
                            <th style="width: 180px">Customer No &nbsp;</th>
                            <th style="width: 180px">Customer Name &nbsp;</th>
                            <th style="width: 180px; text-align: center">
                              เลขที่ MEMO &nbsp;
                            </th>
                            <th style="width: 120px">Status&nbsp;</th>
                          </tr>

                          <tr
                            v-for="item in list_approve_all"
                            :key="item.invoice_no"
                            style="border-bottom: 1px solid gainsboro"
                          >
                            <td style="width: 180px">
                              {{ item.invoice_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.order_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.customer_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.customer_name }}
                            </td>
                            <td style="width: 180px">
                              {{ item.memo_no }}
                            </td>
                            <td style="width: 120px">
                              <label
                                v-if="item.status_down_service == 'waiting'"
                                style="color: orange"
                                >Waiting</label
                              >
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error darken-1"
                      text
                      @click="dialog_approve_down_all = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        (dialog_approve_down_all = false),
                          SubmitAll('STATUS_DOWN_SERVICE')
                      "
                    >
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
              <!---------------------------end dialog_approve_down_all ปิดระบบ------------------------------>

              <!---------------------------dialog_approve_up_all เปิดระบบ------------------------------>
              <!-- <v-dialog
                v-model="dialog_approve_up_all"
                persistent
                max-width="1000"
                scrollable
              >
                <v-card>
                  <v-card-title class="text-h5">
                    <div
                      style="
                        display: block;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        margin: auto;
                      "
                    >
                      <v-avatar color="success" outlined size="30">
                        <v-icon dark> mdi-check </v-icon>
                      </v-avatar>

                      <div class="font-text" style="color: darkgreen; margin-bottom:10px">
                        Confirm การเปิดระบบ
                      </div>
                    </div>
                  </v-card-title>

                  <v-card-text>
                    <div class="font-text">
                      <div
                        class="font-text"
                        style="height: 250px; word-break: break-all"
                      >
                        <table id="table_select_modal">
                          <tr style="font-weight: bold">
                            <th style="width: 180px">Invoice No &nbsp;</th>
                            <th style="width: 180px">Order No &nbsp;</th>
                            <th style="width: 180px">Customer No &nbsp;</th>
                            <th style="width: 180px">Customer Name &nbsp;</th>
                            <th style="width: 180px; text-align: center">
                              เลขที่ MEMO &nbsp;
                            </th>
                            <th style="width: 120px">Status&nbsp;</th>
                          </tr>

                          <tr
                            v-for="item in list_approve_all"
                            :key="item.invoice_no"
                            style="border-bottom: 1px solid gainsboro"
                          >
                            <td style="width: 180px">
                              {{ item.invoice_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.order_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.customer_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.customer_name }}
                            </td>
                            <td style="width: 180px">
                              {{ item.memo_no }}
                            </td>
                            <td style="width: 120px">
                              <label
                                v-if="item.status_down_service == 'waiting_up'"
                                style="color: orange"
                                >Waiting</label
                              >
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error darken-1"
                      text
                      @click="dialog_approve_up_all = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        (dialog_approve_up_all = false),
                          SubmitAll('STATUS_UP_SERVICE')
                      "
                    >
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
              <!---------------------end dialog_approve_up_all เปิดระบบ----------------------------->

              <!---------------------------dialog_request_up_all ยืนยันการ Approve เปิดระบบ------------------------------>
              <!-- <v-dialog
                v-model="dialog_request_up_all"
                persistent
                max-width="1000"
                scrollable
              >
                <v-card>
                  <v-card-title class="text-h5">
                    <div
                      style="
                        display: block;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        margin: auto;
                      "
                    >
                      <v-avatar color="success" outlined size="30">
                        <v-icon dark> mdi-check </v-icon>
                      </v-avatar>

                      <div class="font-text" style="color: darkgreen margin-bottom:10px">
                        ยืนยันการ Request (ขอเปิดระบบ)
                      </div>
                    </div>
                  </v-card-title>

                  <v-card-text>
                    <div class="font-text">
                      <div
                        class="font-text"
                        style="height: 250px; word-break: break-all"
                      >
                        <table id="table_select_modal">
                          <tr style="font-weight: bold">
                            <th style="width: 180px">Invoice No &nbsp;</th>
                            <th style="width: 180px">Order No &nbsp;</th>
                            <th style="width: 180px">Customer No &nbsp;</th>
                            <th style="width: 180px">Customer Name &nbsp;</th>
                            <th style="width: 180px; text-align: center">
                              เลขที่ MEMO &nbsp;
                            </th>
                            <th style="width: 120px">Status&nbsp;</th>
                          </tr>

                          <tr
                            v-for="item in list_approve_all"
                            :key="item.invoice_no"
                            style="border-bottom: 1px solid gainsboro"
                          >
                            <td style="width: 180px">
                              {{ item.invoice_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.order_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.customer_no }}
                            </td>
                            <td style="width: 180px">
                              {{ item.customer_name }}
                            </td>
                            <td style="width: 180px">
                              {{ item.memo_no }}
                            </td>
                            <td style="width: 120px">
                              <label
                                v-if="item.status_down_service == 'approve'"
                              style="color: red"
                                >Down Service</label>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error darken-1"
                      text
                      @click="dialog_request_up_all = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        (dialog_request_up_all = false),
                          SubmitAll('REQUEST_UP_SERVICE')
                      "
                    >
                      Request
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
              <!---------------------end dialog_request_up_all ยืนยันการ Approve เปิดระบบ----------------------------->

              <!---------------------------- dialog รอปิดระบบ ---------------------------------->
              <v-dialog
                v-model="dialog_info1"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card class="font-text">
                  <v-toolbar dark color="indigo">
                    <v-toolbar-title class="font-text">
                      <div class="d-flex">
                        <div style="width: 150px; color: #fffd9e">
                          (รอปิดระบบ) : 
                        </div>
                        {{ name_open_dialog }}
                      </div></v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn
                        icon
                        dark
                        @click="
                          (dialog_info1 = false), (search_book1 = ''), getWaitDownService()
                        "
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                        <div class="d-flex" style="width: 100%">
                          <v-btn
                            text
                            color="#A560C2"
                            @click="(invoice_book_close = true) , submit_all()"
                            :disabled="
                              selected_1.length == 0 || role_status == 'admin' || role_status == 'viewer' 
                              ||(role_status == 'wait_down_service' && wait_role != 'STATUS_FINANCE') || check_approve == true || check_memo_no_last == true
                            "
                            style="margin-bottom: 10px"
                          >
                            DOWN SERVICE
                            <v-icon dark>mdi-block-helper</v-icon>
                          </v-btn>
                          <!-- <v-spacer></v-spacer>
                          <div style="width: 400px">
                            <v-text-field
                              v-model="search_book1"
                              append-icon="mdi-magnify"
                              label="search"
                              single-line
                              hide-details
                              style="margin-bottom: 10px; margin-top: 0px"
                            ></v-text-field>
                          </div> -->
                        </div>

                        <!-- ----------------------------------Invoice Book Close ----------------------------------------------- -->
                        <v-dialog
                          v-model="invoice_book_close"
                          persistent
                          max-width="900px"
                          scrollable
                        >
                          <v-card>
                            <v-card-title class="text-h5">
                              <div
                                style="
                                  display: block;
                                  align-items: center;
                                  justify-content: center;
                                  text-align: center;
                                  margin: auto;
                                "
                              >
                                <v-avatar color="#A560C2" outlined size="30">
                                  <v-icon dark> mdi-block-helper </v-icon>
                                </v-avatar>

                                <div class="font-text" style="color: #A560C2">
                                  ยืนยันข้อมูลการรอปิดระบบ (Approve)
                                </div>

                                <div
                                  class="d-flex font-text"
                                  style="
                                    font-size: 18px;
                                    padding-top: 10px;
                                    padding-bottom: 20px;
                                    align-items: center; 
                                    justify-content: center
                                  "
                                >
                                  Customer :&nbsp;
                                  <div style="color: #313b71">
                                    {{ name_open_dialog }}
                                  </div>
                                </div>
                              </div>

                              <div
                                class="d-flex font-text"
                                style="
                                  font-size: 18px;
                                  padding-top: 10px;
                                  padding-bottom: 10px;
                                  width: 100%;
                                "
                              >
                                <div
                                  class="d-flex"
                                  style="align-items: center; justify-content: center"
                                >
                                  <div style="width: 150px; font-size: 16px">
                                    เลขที่ MEMO :
                                  </div>
                                  <input
                                    class="form-control"
                                    placeholder="เลขที่ MEMO"
                                    disabled
                                    v-model="set_memo.memo_no_last"
                                  />
                                </div>
                              </div>
                            </v-card-title>

                            <v-card-text>
                              <div class="font-text">
                                <div
                                  class="font-text"
                                  style="height: 280px; word-break: break-all"
                                >
                                  <table id="table_select_modal_invoice_book_close">
                                    <tr style="font-weight: bold">
                                      <th style="width: 300px; padding: 5px">
                                        Invoice No.&nbsp;
                                      </th>
                                      <th style="width: 350px; padding: 5px">
                                        Customer No. &nbsp;
                                      </th>
                                      <th style="width: 300px; padding: 5px">
                                        Customer Name &nbsp;
                                      </th>
                                    </tr>

                                    <tr
                                      v-for="item in modal_submit_all"
                                      :key="item.invoice_no"
                                      style="border-bottom: 1px solid gainsboro"
                                    >
                                      <td style="width: 300px">
                                        {{ item.invoice_no }}
                                      </td>
                                      <td style="width: 350px">
                                        {{ item.customer_no }}
                                      </td>
                                      <td style="width: 300px">
                                        {{item.customer_name}}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="#CD4342"
                                text
                                @click="invoice_book_close = false"
                              >
                                CLOSE
                              </v-btn>
                              <v-btn
                                color="#478E37"
                                text
                                @click="invoice_book_close = false , approve_service_book_close()"
                              >
                                APPROVE
                                <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- -----------------------------------End Invoice Book Close--------------------------------------------- -->

                        <!-- --------------------------------------table--------------------------------------------- -->
                        <div class="cover-table">
                          <div class="table-invoice" style="position: relative">
                            <v-data-table
                              :search="search_book1"
                              :headers="headers_customer"
                              :items="customer_invoice_list"
                              class="table_in_book1"
                              fixed-header
                              height="430px"
                              id="invoice_book_1_modal"
                              v-model="selected_1"
                              :single-select="singleSelect"
                              item-key="invoice_no"
                              show-select
                              @input="enterSelect($event)"
                            >
                              <template v-slot:[`item.invoice_no`]="{ item }">
                                {{ item.invoice_no }}
                              </template>
                              <template v-slot:[`item.aging`]="{ item }">
                                {{ convert(item.aging) }}
                              </template>
                              <template v-slot:[`item.invoice_date`]="{ item }">
                                {{ parseDate(item.invoice_date) }}
                              </template>
                              <template v-slot:[`item.start_date`]="{ item }">
                                {{ parseDate(item.start_date) }}
                              </template>
                              <template v-slot:[`item.end_date`]="{ item }">
                                {{ parseDate(item.end_date) }}
                              </template>
                              <template v-slot:[`item.due_date`]="{ item }">
                                {{ parseDate(item.due_date) }}
                              </template>
                              <template v-slot:[`item.memo_date`]="{ item }">
                                {{ parseDate(item.memo_date) }}
                              </template>
                              <!-- col remark detail -->
                              <template v-slot:[`item.remark_detail`]="{ item }">
                                <b-textarea
                                  placeholder="remark"
                                  v-model="item.remark_detail"
                                  rows="1"
                                  max-rows="900"
                                  style="border-radius: 0px;"
                                  :disabled="
                                    role_status == 'admin' || role_status == 'viewer'
                                  "
                                  @change="editRemarkWaitDown('REMARK_DETAIL',item)"
                                ></b-textarea>
                              </template>
                              <template v-slot:[`item.status_finance`]="{ item }">
                                <v-btn
                                  outlined
                                  color="warning"
                                  v-if="item.status_finance === 'waiting'"
                                  class="disable-events"
                                >
                                  WAITING
                                </v-btn>
                                <v-btn
                                  outlined
                                  color="success"
                                  v-if="item.status_finance === 'approve'"
                                  class="disable-events"
                                >
                                  approve
                                </v-btn>

                                <v-btn
                                  outlined
                                  color="primary"
                                  v-if="
                                    item.status_finance !== 'approve' &&
                                      item.status_finance !== 'waiting'
                                  "
                                  class="disable-events"
                                >
                                  {{ item.status_finance }}
                                </v-btn>
                              </template>
                              <template v-slot:[`item.status_finance_head`]="{ item }">
                                <v-btn
                                  outlined
                                  color="warning"
                                  v-if="item.status_finance_head === 'waiting'"
                                  class="disable-events"
                                >
                                  WAITING
                                </v-btn>
                                <v-btn
                                  outlined
                                  color="success"
                                  v-if="item.status_finance_head === 'approve'"
                                  class="disable-events"
                                >
                                  approve
                                </v-btn>

                                <v-btn
                                  outlined
                                  color="error"
                                  v-if="item.status_finance_head === 'reject'"
                                  class="disable-events"
                                >
                                  Reject
                                </v-btn>
                              </template>
                            </v-data-table>
                          </div>
                        </div>
                        <!-- --------------------------------------end table--------------------------------------------- -->
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-card>
              </v-dialog>
              <!---------------------------- end dialog รอปิดระบบ ---------------------------------->

              <!---------------------------- dialog ปิดระบบ ---------------------------------->
              <v-dialog
                v-model="dialog_downservice"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card class="font-text">
                  <v-toolbar dark color="indigo">
                    <v-toolbar-title class="font-text">
                      <div class="d-flex">
                        <div style="width: 120px; color: #fffd9e">
                          (ปิดระบบ) : 
                        </div>
                        {{ name_downservice_dialog }}
                      </div></v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn
                        icon
                        dark
                        @click="
                          (dialog_downservice = false),  getDownService()
                        "
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                        <div class="d-flex" style="width: 100%">
                          <v-btn
                            text
                            color="#A560C2"
                            @click="(down_service_open = true) , submit_donwservice()"
                            :disabled="
                              selected_downservice.length == 0 || role_status == 'admin' || role_status == 'viewer' 
                              || check_approve_down == true
                            "
                            style="margin-bottom: 10px"
                          >
                            DOWN SERVICE
                            <v-icon dark>mdi-block-helper</v-icon>
                          </v-btn>
                          <!-- <v-spacer></v-spacer>
                          <div style="width: 400px">
                            <v-text-field
                              v-model="search_book1"
                              append-icon="mdi-magnify"
                              label="search"
                              single-line
                              hide-details
                              style="margin-bottom: 10px; margin-top: 0px"
                            ></v-text-field>
                          </div> -->
                        </div>

                        <!-- ----------------------------------Down Service ----------------------------------------------- -->
                        <v-dialog
                          v-model="down_service_open"
                          persistent
                          max-width="900px"
                          scrollable
                        >
                          <v-card>
                            <v-card-title class="text-h5">
                              <div
                                style="
                                  display: block;
                                  align-items: center;
                                  justify-content: center;
                                  text-align: center;
                                  margin: auto;
                                "
                              >
                                <v-avatar color="#A560C2" outlined size="30">
                                  <v-icon dark> mdi-block-helper </v-icon>
                                </v-avatar>

                                <div class="font-text" style="color: #A560C2">
                                  ยืนยันข้อมูลการปิดระบบ (CONFIRM)
                                </div>

                                <div
                                  class="d-flex font-text"
                                  style="
                                    font-size: 18px;
                                    padding-top: 10px;
                                    padding-bottom: 20px;
                                    align-items: center; 
                                    justify-content: center
                                  "
                                >
                                  Customer :&nbsp;
                                  <div style="color: #313b71">
                                    {{ name_downservice_dialog }}
                                  </div>
                                </div>
                              </div>

                              <div
                                class="d-flex font-text"
                                style="
                                  font-size: 18px;
                                  padding-top: 10px;
                                  padding-bottom: 10px;
                                  width: 100%;
                                "
                              >
                                <div
                                  class="d-flex"
                                  style="align-items: center; justify-content: center"
                                >
                                  <div style="width: 150px; font-size: 16px">
                                    เลขที่ MEMO :
                                  </div>
                                  <input
                                    class="form-control"
                                    placeholder="เลขที่ MEMO"
                                    disabled
                                    v-model="set_memo_down.memo_no_last"
                                  />
                                </div>
                              </div>
                            </v-card-title>

                            <v-card-text>
                              <div class="font-text">
                                <div
                                  class="font-text"
                                  style="height: 280px; word-break: break-all"
                                >
                                  <table id="table_select_modal_invoice_book_close">
                                    <tr style="font-weight: bold">
                                      <th style="width: 300px; padding: 5px">
                                        Invoice No.&nbsp;
                                      </th>
                                      <th style="width: 350px; padding: 5px">
                                        Customer No. &nbsp;
                                      </th>
                                      <th style="width: 300px; padding: 5px">
                                        Customer Name &nbsp;
                                      </th>
                                    </tr>

                                    <tr
                                      v-for="item in modal_submit_down"
                                      :key="item.invoice_no"
                                      style="border-bottom: 1px solid gainsboro"
                                    >
                                      <td style="width: 300px">
                                        {{ item.invoice_no }}
                                      </td>
                                      <td style="width: 350px">
                                        {{ item.customer_no }}
                                      </td>
                                      <td style="width: 300px">
                                        {{item.customer_name}}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="#CD4342"
                                text
                                @click="down_service_open = false"
                              >
                                CLOSE
                              </v-btn>
                              <v-btn
                                color="#478E37"
                                text
                                @click="down_service_open = false , approve_service_downservice()"
                              >
                                APPROVE
                                <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- -----------------------------------End Down Service--------------------------------------------- -->

                        <!-- --------------------------------------table--------------------------------------------- -->
                        <div class="cover-table">
                          <div class="table-invoice" style="position: relative">
                            <v-data-table
                              :headers="headers_detail_down"
                              :items="customer_downservice_list"
                              class="table_in_book1"
                              fixed-header
                              height="430px"
                              id="invoice_book_1_modal"
                              v-model="selected_downservice"
                              :single-select="singleSelect"
                              item-key="invoice_no"
                              show-select
                              @input="enterSelectDown($event)"
                            >
                              <template v-slot:[`item.invoice_no`]="{ item }">
                                {{ item.invoice_no }}
                              </template>
                              <template v-slot:[`item.aging`]="{ item }">
                                {{ convert(item.aging) }}
                              </template>
                              <template v-slot:[`item.invoice_date`]="{ item }">
                                {{ parseDate(item.invoice_date) }}
                              </template>
                              <template v-slot:[`item.start_date`]="{ item }">
                                {{ parseDate(item.start_date) }}
                              </template>
                              <template v-slot:[`item.end_date`]="{ item }">
                                {{ parseDate(item.end_date) }}
                              </template>
                              <template v-slot:[`item.due_date`]="{ item }">
                                {{ parseDate(item.due_date) }}
                              </template>
                              <template v-slot:[`item.memo_date`]="{ item }">
                                {{ parseDate(item.memo_date) }}
                              </template>
                              <template
                                v-slot:[`item.status_down_service`]="{ item }"
                              >
                                <v-btn
                                  outlined
                                  color="error"
                                  v-if="item.status_down_service === 'approve' || item.status_down_service === 'approve_up' || item.status_down_service === 'waiting_up'"
                                  class="disable-events"
                                >
                                  DOWN SERVICE
                                </v-btn>
                                <v-btn
                                  outlined
                                  color="warning"
                                  v-else-if="item.status_down_service === 'waiting'"
                                  class="disable-events"
                                >
                                  WAITING
                                </v-btn>
                              </template>
                              <template v-slot:[`item.action_date`]="{ item }">
                                {{ parseDate(item.action_date) }}
                              </template>
                              <!-------column Action -------->
                              <!-- <template v-slot:[`item.action`]="{ item }">
                                <v-btn
                                  :disabled="
                                    item.status_down_service !== 'waiting'
                                  "
                                  color="success"
                                  style="font-size: 12px"
                                  @click="
                                    (dialog_approve = true), select_approve(item)
                                  "
                                >
                                  Confirm
                                </v-btn>
                              
                              </template> -->

                            </v-data-table>
                          </div>
                        </div>
                        <!-- --------------------------------------end table--------------------------------------------- -->
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-card>
              </v-dialog>
              <!---------------------------- end dialog ปิดระบบ ---------------------------------->

              <!---------------------------- dialog เปิดระบบ ---------------------------------->
              <v-dialog
                v-model="dialog_upservice"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card class="font-text">
                  <v-toolbar dark color="indigo">
                    <v-toolbar-title class="font-text">
                      <div class="d-flex">
                        <div style="width: 120px; color: #fffd9e">
                          (เปิดระบบ) : 
                        </div>
                        {{ name_upservice_dialog }}
                      </div></v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn
                        icon
                        dark
                        @click="
                          (dialog_upservice = false),  getUpService()
                        "
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                        <div class="d-flex" style="width: 100%">
                          <!-- <v-btn
                            text
                            color="#A560C2"
                            @click="(up_service_open = true) , submit_upservice()"
                            :disabled="
                              selected_upservice.length == 0 || role_status == 'admin' || role_status == 'viewer' 
                              || role_status == 'super_admin'
                            "
                            style="margin-bottom: 10px"
                          >
                            UP SERVICE
                          </v-btn> -->
                          <v-btn
                            text
                            color="#A560C2"
                            @click="(up_service_open = true) , submit_upservice()"
                            :disabled="
                              selected_upservice.length == 0 || role_status == 'admin' || role_status == 'viewer' || check_request_upservice == true
                            "
                            style="margin-bottom: 10px"
                          >
                            REQRUEST
                          </v-btn>
                          <v-btn
                            text
                            color="#A560C2"
                            @click="(up_service_open = true) , submit_upservice()"
                            :disabled="
                              selected_upservice.length == 0 || role_status == 'admin' || role_status == 'viewer'|| check_confirm_upservice == true
                            "
                            style="margin-bottom: 10px"
                          >
                            CONFIRM
                          </v-btn>
                          
                        </div>

                        <!-- ----------------------------------Up Service ----------------------------------------------- -->
                        <v-dialog
                          v-model="up_service_open"
                          persistent
                          max-width="900px"
                          scrollable
                        >
                          <v-card>
                            <v-card-title class="text-h5">
                              <div
                                style="
                                  display: block;
                                  align-items: center;
                                  justify-content: center;
                                  text-align: center;
                                  margin: auto;
                                "
                              >
                                <v-avatar color="#A560C2" outlined size="30">
                                  <v-icon dark> mdi-block-helper </v-icon>
                                </v-avatar>

                                <div v-if="check_request_upservice == false" class="font-text" style="color: #A560C2">
                                  ยืนยันข้อมูลการเปิดระบบ (Request)
                                </div>

                                <div v-else class="font-text" style="color: #A560C2">
                                  ยืนยันข้อมูลการเปิดระบบ (Confirm)
                                </div>

                                <div
                                  class="d-flex font-text"
                                  style="
                                    font-size: 18px;
                                    padding-top: 10px;
                                    padding-bottom: 20px;
                                    align-items: center; 
                                    justify-content: center
                                  "
                                >
                                  Customer :&nbsp;
                                  <div style="color: #313b71">
                                    {{ name_upservice_dialog }}
                                  </div>
                                </div>
                              </div>

                              <div
                                class="d-flex font-text"
                                style="
                                  font-size: 18px;
                                  padding-top: 10px;
                                  padding-bottom: 10px;
                                  width: 100%;
                                "
                              >
                                <div
                                  class="d-flex"
                                  style="align-items: center; justify-content: center"
                                >
                                  <div style="width: 150px; font-size: 16px">
                                    เลขที่ MEMO :
                                  </div>
                                  <input
                                    class="form-control"
                                    placeholder="เลขที่ MEMO"
                                    disabled
                                    v-model="set_memo_up.memo_no_last"
                                  />
                                </div>
                              </div>
                            </v-card-title>

                            <v-card-text>
                              <div class="font-text">
                                <div
                                  class="font-text"
                                  style="height: 280px; word-break: break-all"
                                >
                                  <table id="table_select_modal_invoice_book_close">
                                    <tr style="font-weight: bold">
                                      <th style="width: 300px; padding: 5px">
                                        Invoice No.&nbsp;
                                      </th>
                                      <th style="width: 350px; padding: 5px">
                                        Customer No. &nbsp;
                                      </th>
                                      <th style="width: 300px; padding: 5px">
                                        Customer Name &nbsp;
                                      </th>
                                    </tr>

                                    <tr
                                      v-for="item in modal_submit_up"
                                      :key="item.invoice_no"
                                      style="border-bottom: 1px solid gainsboro"
                                    >
                                      <td style="width: 300px">
                                        {{ item.invoice_no }}
                                      </td>
                                      <td style="width: 350px">
                                        {{ item.customer_no }}
                                      </td>
                                      <td style="width: 300px">
                                        {{item.customer_name}}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="#CD4342"
                                text
                                @click="up_service_open = false"
                              >
                                CLOSE
                              </v-btn>
                              <v-btn
                                v-if="check_request_upservice == false"
                                color="#478E37"
                                text
                                @click="up_service_open = false , approve_service_upservice('request')"
                              >
                                APPROVE
                                <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                              </v-btn>

                              <v-btn
                                v-else
                                color="#478E37"
                                text
                                @click="up_service_open = false , approve_service_upservice('confirm')"
                              >
                                APPROVE
                                <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- -----------------------------------End Up Service--------------------------------------------- -->

                        <!-- --------------------------------------table--------------------------------------------- -->
                        <div class="cover-table">
                          <div class="table-invoice" style="position: relative">
                            <v-data-table
                              :headers="headers_detail_up"
                              :items="customer_upservice_list"
                              class="table_in_book1"
                              fixed-header
                              height="430px"
                              id="invoice_book_1_modal"
                              v-model="selected_upservice"
                              :single-select="singleSelect"
                              item-key="invoice_no"
                              show-select
                              @input="enterSelectUp($event)"
                            >
                              <template v-slot:[`item.invoice_no`]="{ item }">
                                {{ item.invoice_no }}
                              </template>
                              <template v-slot:[`item.aging`]="{ item }">
                                {{ convert(item.aging) }}
                              </template>
                              <template v-slot:[`item.invoice_date`]="{ item }">
                                {{ parseDate(item.invoice_date) }}
                              </template>
                              <template v-slot:[`item.start_date`]="{ item }">
                                {{ parseDate(item.start_date) }}
                              </template>
                              <template v-slot:[`item.end_date`]="{ item }">
                                {{ parseDate(item.end_date) }}
                              </template>
                              <template v-slot:[`item.due_date`]="{ item }">
                                {{ parseDate(item.due_date) }}
                              </template>
                              <template v-slot:[`item.memo_date`]="{ item }">
                                {{ parseDate(item.memo_date) }}
                              </template>
                              <template
                                v-slot:[`item.status_down_service`]="{ item }"
                              >
                                <v-btn
                                  outlined
                                  color="error"
                                  v-if="item.status_down_service === 'approve'"
                                  class="disable-events"
                                >
                                  DOWN SERVICE
                                </v-btn>
                                <v-btn
                                  outlined
                                  color="success"
                                  v-else-if="
                                    item.status_down_service === 'approve_up'
                                  "
                                  class="disable-events"
                                >
                                  UP SERVICE
                                </v-btn>
                                <v-btn
                                  outlined
                                  color="warning"
                                  v-else-if="
                                    item.status_down_service === 'waiting_up'
                                  "
                                  class="disable-events"
                                >
                                  WAITING
                                </v-btn>
                                <v-btn
                                  outlined
                                  color="warning"
                                  v-else-if="
                                    item.status_down_service === 'waiting_request'
                                  "
                                  class="disable-events"
                                >
                                  WAITING
                                </v-btn>
                              </template>
                              <template v-slot:[`item.action_date`]="{ item }">
                                {{ parseDate(item.action_date) }}
                              </template>

                              <!-------column Action -------->
                              <!-- <template v-slot:[`item.action`]="{ item }">
                                <v-btn
                                  :disabled="
                                      (item.status_down_service == 'waiting_up' && item.status_down_service == 'approve_up') || item.status_down_service == 'waiting_request'
                                  "
                                  v-if="
                                    (item.status_down_service == 'approve' || item.status_down_service == 'waiting_request') || 
                                    (employee_id == 20088 && employee_id == 61075 && employee_id == 61437 && employee_id == 64030 && employee_id == 63019 && employee_id == 64272)
                                  "
                                  color="info"
                                  style="font-size: 12px;"
                                  @click="
                                    (dialog_request_up = true), select_approve(item)
                                  "
                                >
                                  Request
                                </v-btn>

                                <v-btn
                                  :disabled="
                                    item.status_down_service !== 'waiting_up'
                                  "
                                  v-else-if="
                                    item.status_down_service == 'waiting_up' ||
                                      item.status_down_service == 'approve_up'
                                  "
                                  color="success"
                                  style="font-size: 12px"
                                  @click="
                                    (dialog_approve_up = true), select_approve(item)
                                  "
                                >
                                  Confirm
                                </v-btn>
                              </template> -->

                            </v-data-table>
                          </div>
                        </div>
                        <!-- --------------------------------------end table--------------------------------------------- -->
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-card>
              </v-dialog>
              <!---------------------------- end dialog เปิดระบบ ---------------------------------->

              <!------------------------ dialog_approve ยืนยันการ Approve ปิดระบบ --------------------------->
              <v-dialog v-model="dialog_approve" persistent max-width="500">
                <v-card>
                  <v-card-title class="text-h5">
                    <div
                      style="
                        display: block;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        margin: auto;"
                    >
                      <v-avatar color="success" outlined size="30">
                        <v-icon dark> mdi-check </v-icon>
                      </v-avatar>

                      <div class="font-text">CONFIRM</div>
                      <div class="font-text">(การปิดระบบ)</div>
                    </div>
                  </v-card-title>
                  <v-card-text style="padding-left: 10%; padding-top: 2%">
                    <div class="font-text">
                      <div
                        class="d-flex font-text"
                        style="width: 50%; height: 36px"
                      >
                        <div style="font-weight: bold">Invoice No :&nbsp;</div>
                        {{ modal_approve.invoice_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">Order No :&nbsp;</div>
                        {{ modal_approve.order_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">Customer No :&nbsp;</div>
                        {{ modal_approve.customer_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold; width: 130px">
                          Customer Name :&nbsp;
                        </div>
                        {{ modal_approve.customer_name }}
                      </div>

                      <div class="d-flex" style="width: 300px; height: 36px">
                        <div style="font-weight: bold">เลขที่ MEMO :&nbsp;</div>
                        {{ modal_approve.memo_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">สถานะ :&nbsp;</div>
                        <div
                          style="color: orange"
                          v-if="modal_approve.status_down_service == 'waiting'"
                        >
                          Waiting
                        </div>
                        <div
                          v-if="modal_approve.status_down_service !== 'waiting'"
                          style="color: green"
                        >
                          {{ modal_approve.status_down_service }}
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error darken-1"
                      text
                      @click="dialog_approve = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        (dialog_approve = false),
                          approve_down_service(
                            modal_approve.invoice_no,
                            'STATUS_DOWN_SERVICE'
                          )
                      "
                    >
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!----------------------- end dialog ยืนยันการ Approve ปิดระบบ ----------------------------->

              <!------------------------ dialog_approve_up ยืนยันการ Approve เปิดระบบ ------------------------------->
              <v-dialog v-model="dialog_approve_up" persistent max-width="500">
                <v-card>
                  <v-card-title class="text-h5">
                    <div
                      style="
                        display: block;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        margin: auto;"
                    >
                      <v-avatar color="success" outlined size="30">
                        <v-icon dark> mdi-check </v-icon>
                      </v-avatar>

                      <div class="font-text">CONFIRM</div>
                      <div class="font-text">(การเปิดระบบ)</div>
                    </div>
                  </v-card-title>
                  <v-card-text style="padding-left: 10%; padding-top: 2%">
                    <div class="font-text">
                      <div
                        class="d-flex font-text"
                        style="width: 50%; height: 36px"
                      >
                        <div style="font-weight: bold">Invoice No :&nbsp;</div>
                        {{ modal_approve.invoice_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">Order No :&nbsp;</div>
                        {{ modal_approve.order_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">Customer No :&nbsp;</div>
                        {{ modal_approve.customer_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold; width: 130px">
                          Customer Name :&nbsp;
                        </div>
                        {{ modal_approve.customer_name }}
                      </div>

                      <div class="d-flex" style="width: 300px; height: 36px">
                        <div style="font-weight: bold">เลขที่ MEMO :&nbsp;</div>
                        {{ modal_approve.memo_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">สถานะ :&nbsp;</div>
                        <div
                          v-if="modal_approve.status_down_service == 'waiting_up'"
                          style="color: orange"
                        >
                          waiting
                        </div>
                        <div
                          v-if="
                            modal_approve.status_down_service !== 'waiting_up'
                          "
                          style="color: green"
                        >
                          {{ modal_approve.status_down_service }}
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error darken-1"
                      text
                      @click="dialog_approve_up = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        (dialog_approve_up = false),
                          approve_service(
                            modal_approve.invoice_no,
                            'STATUS_UP_SERVICE'
                          )
                      "
                    >
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!----------------------- end dialog ยืนยันการ Approve เปิดระบบ ----------------------------->

              <!---------------------- dialog_request_up ยืนยันการ Request เปิดระบบ ------------------------------->
              <v-dialog v-model="dialog_request_up" persistent max-width="500">
                <v-card>
                  <v-card-title class="text-h5">
                    <div
                      style="
                        display: block;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        margin: auto;"
                    >
                      <v-avatar color="success" outlined size="30">
                        <v-icon dark> mdi-check </v-icon>
                      </v-avatar>

                      <div class="font-text">ยืนยันการ Request</div>
                      <div class="font-text">(ขอเปิดระบบใหม่)</div>
                    </div>
                  </v-card-title>
                  <v-card-text style="padding-left: 10%; padding-top: 2%">
                    <div class="font-text">
                      <div
                        class="d-flex font-text"
                        style="width: 50%; height: 36px"
                      >
                        <div style="font-weight: bold">Invoice No :&nbsp;</div>
                        {{ modal_approve.invoice_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">Order No :&nbsp;</div>
                        {{ modal_approve.order_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">Customer No :&nbsp;</div>
                        {{ modal_approve.customer_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold; width: 130px">
                          Customer Name :&nbsp;
                        </div>
                        {{ modal_approve.customer_name }}
                      </div>

                      <div class="d-flex" style="width: 300px; height: 36px">
                        <div style="font-weight: bold">เลขที่ MEMO :&nbsp;</div>
                        {{ modal_approve.memo_no }}
                      </div>

                      <div class="d-flex font-text" style="height: 36px">
                        <div style="font-weight: bold">สถานะ :&nbsp;</div>
                        <div
                          v-if="modal_approve.status_down_service == 'approve'"
                          style="color: red"
                        >
                          down service
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error darken-1"
                      text
                      @click="dialog_request_up = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        (dialog_request_up = false),
                          approve_service(
                            modal_approve.invoice_no,
                            'REQUEST_UP_SERVICE'
                          )
                      "
                    >
                      Request
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!----------------------- end dialog_request_up ยืนยันการ Request เปิดระบบ ----------------------------->

              <!-----------------------------Tab ปิดระบบ/เปิดระบบ ------------------------------------>
              <v-card-text>
                <v-tabs v-model="tab" background-color="transparent">
                  <v-tab v-for="item in tab_items" :key="item">
                    {{ item }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <!-- --------------------------------------table Main รอปิดระบบ--------------------------------------------- -->
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_3()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_3"
                          label="Invoice number, Cus No, Cus Name"
                          single-line
                          hide-details
                          autocomplete="off"
                          style="width: 480px"
                        ></v-text-field>
                        <v-btn
                          color="primary"
                          type="submit"
                          style="font-size: 12px"
                        >
                          Search
                          <v-icon right dark> mdi-magnify </v-icon>
                        </v-btn>
                        <div style="width: 10px"></div>
                      </v-form>
                      <v-btn
                        color="red"
                        dark
                        @click="clearFilter_3()"
                        class="screen"
                        style="font-size: 12px"
                      >
                        Clear All
                      </v-btn>
                    </v-card-title>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="headers_wait_down"
                          :items="datalist_3"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          :single-select="singleSelect"
                          v-model="selected"
                          height="600px"
                          item-key="invoice_no"
                          id="invoice_book_2"
                          :items-per-page="datalist_3.length"
                        >
                          <!-- col remark main-->
                          <template v-slot:[`item.remark_main`]="{ item }">
                              <b-textarea
                                placeholder="remark"
                                v-model="item.remark_main"
                                rows="1"
                                max-rows="900"
                                style="border-radius: 0px;"
                                :disabled="
                                  role_status == 'viewer' || role_status == 'admin'"
                                @change="editRemarkWaitDown('REMARK_MAIN', item)"
                              ></b-textarea>
                            </template>
                          <!-- end remark main-->
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              @click="
                                openInvoice(item),
                                  (dialog_info1 = true),
                                  (search_book1 = '')
                              "
                              class="screen"
                              style="font-size: 12px"
                            >
                              Detail
                              <v-icon right dark>mdi-file-search-outline </v-icon>
                            </v-btn>
                          </template>
                        </v-data-table>
                        <div
                          class="d-flex"
                          style="float: right; margin-top: 20px"
                        >
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
                            v-model="item_per_page_table_3"
                            @change="item_per_page_inc_table_3()"
                          >
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <!-- <option value="1500">1500</option> -->
                          </select>
                          <v-pagination
                            style="justify-content: flex-end"
                            v-model="page_table_3"
                            :length="page_total_table_3"
                            :total-visible="10"
                            @input="pageChangeTable3()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- --------------------------------------end table Main รอปิดระบบ--------------------------------------------- -->
                  </v-tab-item>
                  <v-tab-item>
                    <!-- --------------------------------------table Main ปิดระบบ--------------------------------------------- -->
                    <v-card-title>
                      <!-- <v-btn
                        color="success"
                        style="width: 100px; font-size: 12px; font-weight: 600"
                        text
                        :disabled="
                          role_status == 'super_admin' ||
                            wait_role == 'STATUS_SALE' ||
                            wait_role == 'STATUS_FINANCE' ||
                            check_confirm == true
                        "
                        @click="
                          (dialog_approve_down_all = true), submit_all('confirm_down')
                        "
                      >
                        Confirm
                        <v-icon dark> mdi-cloud-download</v-icon>
                      </v-btn> -->
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_1()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_1"
                          label="Invoice number, Cus No, Cus Name"
                          single-line
                          hide-details
                          autocomplete="off"
                          style="width: 480px"
                        ></v-text-field>
                        <v-btn
                          color="primary"
                          type="submit"
                          style="font-size: 12px"
                        >
                          Search
                          <v-icon right dark> mdi-magnify </v-icon>
                        </v-btn>
                        <div style="width: 10px"></div>
                      </v-form>
                      <v-btn
                        color="red"
                        dark
                        @click="clearFilter_1()"
                        class="screen"
                        style="font-size: 12px"
                      >
                        Clear All
                      </v-btn>
                    </v-card-title>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="headers_downservice"
                          :items="datalist_1"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          :single-select="singleSelect"
                          v-model="selected"
                          height="600px"
                          item-key="invoice_no"
                          id="invoice_book_1"
                          :items-per-page="datalist_1.length"
                        >
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              @click="
                                openDownService(item),
                                  (dialog_downservice = true)
                              "
                              class="screen"
                              style="font-size: 12px"
                            >
                              Detail Invoice
                              <v-icon right dark>mdi-file-search-outline </v-icon>
                            </v-btn>
                          </template>
                        </v-data-table>

                        <div
                          class="d-flex"
                          style="float: right; margin-top: 20px"
                        >
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
                            v-model="item_per_page_table_1"
                            @change="item_per_page_inc_table_1()"
                          >
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <!-- <option value="1500">1500</option> -->
                          </select>
                          <v-pagination
                            style="justify-content: flex-end"
                            v-model="page_table_1"
                            :length="page_total_table_1"
                            :total-visible="10"
                            @input="pageChangeTable1()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- ------------------------------------End table Main ปิดระบบ--------------------------------------------- -->
                  </v-tab-item>
                  <!-- -------------------------------------------แบ่ง down / up -------------------------------------- -->
                  <v-tab-item>
                    <!-- --------------------------------------table Main เปิดระบบ--------------------------------------------- -->
                    <v-card-title>
                      <!-- <v-btn
                        color="error"
                        style="width: 100px; font-size: 12px; font-weight: 600"
                        text
                        :disabled="
                          role_status == 'super_admin' ||
                            wait_role == 'STATUS_DEBT' ||
                            wait_role == 'STATUS_FINANCE' ||
                            check_request == true
                        "
                        @click="
                          (dialog_request_up_all = true), submit_all('request_up')
                        "
                      >
                        Request
                        <v-icon dark> mdi-refresh-circle </v-icon>
                      </v-btn> -->
                      <!-- <v-btn
                        color="success"
                        style="width: 100px; font-size: 12px; font-weight: 600"
                        text
                        :disabled="
                          role_status == 'super_admin' ||
                            wait_role == 'STATUS_SALE' ||
                            wait_role == 'STATUS_FINANCE' ||
                            check_confirm_up == true
                        "
                        @click="
                          (dialog_approve_up_all = true), submit_all('confirm_up')
                        "
                      >
                        Confirm
                        <v-icon dark> mdi-cloud-upload </v-icon>
                      </v-btn> -->
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_2()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_2"
                          label="Invoice number, Cus No, Cus Name"
                          single-line
                          hide-details
                          autocomplete="off"
                          style="width: 480px"
                        ></v-text-field>
                        <v-btn
                          color="primary"
                          type="submit"
                          style="font-size: 12px"
                        >
                          Search
                          <v-icon right dark> mdi-magnify </v-icon>
                        </v-btn>
                        <div style="width: 10px"></div>
                      </v-form>
                      <v-btn
                        color="red"
                        dark
                        @click="clearFilter_2()"
                        class="screen"
                        style="font-size: 12px"
                      >
                        Clear All
                      </v-btn>
                    </v-card-title>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="headers_upservice"
                          :items="datalist_2"
                          :hide-default-footer="true"
                          :single-select="singleSelect"
                          v-model="selected"
                          class="table_in_book1"
                          fixed-header
                          height="600px"
                          item-key="invoice_no"
                          id="invoice_book_1"
                          :items-per-page="datalist_2.length"
                        >
                          <template v-slot:[`item.remark_main`]="{ item }">
                              <b-textarea
                                placeholder="remark"
                                v-model="item.remark_main"
                                rows="1"
                                max-rows="900"
                                style="border-radius: 0px;"
                                :disabled="
                                  role_status == 'viewer' || role_status == 'admin'"
                                @change="editRemarkUpService('REMARK_MAIN', item)"
                              ></b-textarea>
                            </template>
                          <!-- end remark main-->
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              @click="
                                openUpService(item),
                                  (dialog_upservice = true)
                              "
                              class="screen"
                              style="font-size: 12px"
                            >
                              Detail Invoice
                              <v-icon right dark>mdi-file-search-outline </v-icon>
                            </v-btn>
                          </template>
                        </v-data-table>

                        <div
                          class="d-flex"
                          style="float: right; margin-top: 20px"
                        >
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
                            v-model="item_per_page_table_2"
                            @change="item_per_page_inc_table_2()"
                          >
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <!-- <option value="1500">1500</option> -->
                          </select>
                          <v-pagination
                            style="justify-content: flex-end"
                            v-model="page_table_2"
                            :length="page_total_table_2"
                            :total-visible="10"
                            @input="pageChangeTable2()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- ------------------------------------End table Main เปิดระบบ--------------------------------------------- -->
                  </v-tab-item>
                  
                  <v-tab-item>
                    <!-- ------------------------------------table Main log service--------------------------------------------- -->
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_log()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_log"
                          label="Invoice number, Cus No, Cus Name"
                          single-line
                          hide-details
                          autocomplete="off"
                          style="width: 480px"
                        ></v-text-field>
                        <v-btn
                          color="primary"
                          type="submit"
                          style="font-size: 12px"
                        >
                          Search
                          <v-icon right dark> mdi-magnify </v-icon>
                        </v-btn>
                        <div style="width: 10px"></div>
                      </v-form>
                      <v-btn
                        color="red"
                        dark
                        @click="clearFilter_log()"
                        class="screen"
                        style="font-size: 12px"
                      >
                        Clear All
                      </v-btn>
                    </v-card-title>
                    <v-btn
                      color="teal"
                      dark
                      style="width: 150px; font-size: 12px; font-weight: 600"
                      text
                      @click="Export_AllFile()"
                    >
                      Export All File
                    </v-btn>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="headers_log"
                          :items="datalist_log"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          :single-select="singleSelect"
                          v-model="selected"
                          height="600px"
                          item-key="invoice_no"
                          id="invoice_book_1"
                          :items-per-page="datalist_log.length"
                        >
                          <template v-slot:[`item.invoice_no`]="{ item }">
                            {{ item.invoice_no }}
                          </template>
                          <!-------column คงค้างทั้งหมด -------->
                          <template v-slot:[`item.aging`]="{ item }">
                            {{ convert(item.aging) }}
                          </template>
                          <template v-slot:[`item.invoice_date`]="{ item }">
                            {{ parseDate(item.invoice_date) }}
                          </template>
                          <template v-slot:[`item.start_date`]="{ item }">
                            {{ parseDate(item.start_date) }}
                          </template>
                          <template v-slot:[`item.end_date`]="{ item }">
                            {{ parseDate(item.end_date) }}
                          </template>
                          <template v-slot:[`item.due_date`]="{ item }">
                            {{ parseDate(item.due_date) }}
                          </template>
                          <template v-slot:[`item.memo_date`]="{ item }">
                            {{ parseDate(item.memo_date) }}
                          </template>
                          <template v-slot:[`item.created_at`]="{ item }">
                            {{ parseDate(item.created_at) }}
                          </template>
                          <template v-slot:[`item.status`]="{ item }">
                            <v-btn
                              outlined
                              color="error"
                              v-if="item.status === 'STATUS_DOWN_SERVICE'"
                              class="disable-events"
                            >
                              Disconnect
                            </v-btn>
                            <v-btn
                              outlined
                              color="success"
                              v-else-if="item.status === 'STATUS_UP_SERVICE'"
                              class="disable-events"
                            >
                              Connect
                            </v-btn>
                          </template>
                          
                        </v-data-table>

                        <div
                          class="d-flex"
                          style="float: right; margin-top: 20px"
                        >
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
                            v-model="item_per_page_table_log"
                            @change="item_per_page_inc_table_log()"
                          >
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <!-- <option value="1500">1500</option> -->
                          </select>
                          <v-pagination
                            style="justify-content: flex-end"
                            v-model="page_table_log"
                            :length="page_total_table_log"
                            :total-visible="10"
                            @input="pageChangeTableLog()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- ------------------------------------end table Main log service--------------------------------------------- -->
                  </v-tab-item>
                </v-tabs-items>
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
// import 'carbon-components/css/carbon-components.css';
// import { BModal, VBModal } from "bootstrap-vue";
import Swal from "sweetalert2";

// const orders = [
//   {
//     action_by_account_id: "",
//     action_by_name: "",
//     amount: null,
//     aging: null,
//     collection_letter_first_date: null,
//     collection_letter_second_date: null,
//     created_at: null,
//     customer_email: null,
//     customer_name: null,
//     customer_no: null,
//     customer_pay: null,
//     invoice_date: null,
//     debt_number: null,
//     deleted_at: null,
//     due_date: null,
//     end_date: null,
//     finance_id: null,
//     finance_name: null,
//     finance_tel_no: null,
//     invoice_no: null,
//     //
//     order_no: null,
//     //
//     invoice_uid: null,
//     main_status: null,
//     memo_date: null,
//     memo_no: "",
//     recheck: "",
//     remain_day: null,
//     sale_email: null,
//     sale_id: null,
//     sale_name: null,
//     sale_team: null,
//     seq: null,
//     so_number: null,
//     start_date: null,
//     status: null,
//     status_debt: null,
//     status_down_service: null,
//     status_finance: null,
//     status_rpa: null,
//     status_sale: null,
//     uid: null,
//   },
// ];

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    singleSelect: false,
    selected: [],
    selected_list: [],
    list_approve_all: [],
    name_open_dialog: "",
    name_downservice_dialog: "",
    name_upservice_dialog: "",
    check_confirm: true,
    check_confirm_up: true,
    check_request: true,
    check_approve: true,
    check_approve_down: true,
    check_request_upservice: true,
    check_confirm_upservice: true,
    check_memo_no_last: true,
    dialog_approve_down_all: false,
    dialog_approve_up_all: false,
    dialog_request_up_all: false,
    dialog_approve: false,
    dialog_approve_up: false,
    // เพิ่มมาใหม่
    dialog_request_up: false,
    // สิ้นสุด
    finish: true,
    tab: null,
    tab_items: ["รอปิดระบบ", "ปิดระบบ", "เปิดระบบ" , "Log Service"],
    search_1: "",
    search_2: "",
    search_3: "",
    search_log: "",
    item_per_page_table_1: 100,
    page_table_1: 1,
    page_total_table_1: 1,

    item_per_page_table_2: 100,
    page_table_2: 1,
    page_total_table_2: 1,

    item_per_page_table_3: 100,
    page_table_3: 1,
    page_total_table_3: 1,

    item_per_page_table_log: 100,
    page_table_log: 1,
    page_total_table_log: 1,
    // ==========serach====================

    dialog_info1: false,
    dialog_downservice: false,
    dialog_upservice: false,
    selected_1: [],
    selected_downservice: [],
    selected_upservice: [],
    customer_invoice_list: [],
    customer_downservice_list: [],
    customer_upservice_list: [],
    search_book1: "",
    invoice_book_close: false,
    down_service_open: false,
    up_service_open: false,
    modal_submit_all: [],
    modal_submit_down: [],
    modal_submit_up: [],
    set_memo: {
      memo_no_last: "",
      memo_date: "",
    },
    set_memo_down: {
      memo_no_last: "",
      memo_date: "",
    },
    set_memo_up: {
      memo_no_last: "",
      memo_date: "",
    },
    // ==========dialog====================
    headers: [
      {
        text: "Invoice No.",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      // Order
      {
        text: "Order No.",
        value: "order_no",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer Name.",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "คงค้างทั้งหมด",
        value: "aging",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Invoice Date",
        value: "invoice_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "SO Number",
        value: "so_number",
        width: "250px",
        sortable: true,
        align: "left",
      },
      {
        text: "Service",
        value: "service",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Start Invoice Date",
        value: "start_date",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "End Invoice Date",
        value: "end_date",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Due Date",
        value: "due_date",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Sale ID",
        value: "sale_id",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Sale Represent Name",
        value: "sale_name",
        width: "270px",
        sortable: true,
        align: "left",
      },
      {
        text: "Sale Team Lead",
        value: "sale_team",
        width: "230px",
        sortable: true,
        align: "left",
      },
      {
        text: "วันที่ MEMO",
        value: "memo_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ MEMO",
        value: "memo_no",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "จำนวนครั้งที่ทวงหนี้",
        value: "debt_number_last",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "จำนวนวัน เพื่อให้ลูกค้าชำระ",
        value: "customer_pay",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 1",
        value: "collection_letter_first_date",
        width: "300px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 2",
        value: "collection_letter_second_date",
        width: "300px",
        sortable: true,
        align: "center",
      },
      {
        text: "ระยะเวลาคงเหลือ",
        value: "remain_day",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mainstatus",
        value: "main_status",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Recheck",
        value: "recheck",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Email Sale",
        value: "sale_email",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Email ลูกค้า",
        value: "customer_email",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "เจ้าหน้าที่การเงิน",
        value: "finance_name",
        width: "300px",
        sortable: true,
        align: "left",
      },
      // {
      //   text: "เบอร์โทร",
      //   value: "finance_tel_no",
      //   width: "200px",
      //   sortable: true,
      //   align: "left",
      // },
      {
        text: "สถานะ",
        value: "status_down_service",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Action",
        value: "action",
        width: "250px",
        align: "center",
        sortable: false,
      },
      {
        text: "Approve by",
        value: "action_by_name",
        width: "150px",
        align: "center",
        sortable: true,
      },
      {
        text: "วันที่ Approve",
        value: "action_date",
        width: "200px",
        align: "center",
        sortable: true,
      },
      {
        text: "Remark",
        value: "remark_detail",
        width: "300px",
        align: "left",
        sortable: true,
      },
    ],
    headers_wait_down: [
      {
        text: "Customer No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      {
        text: "Customer Name.",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },

      {
        text: "Customer Email",
        value: "customer_email",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "ระยะเวลาคงเหลือ",
        value: "remain_days",
        align: "center",
        width: "170px",
        sortable: true,
      },
      {
        text: "จำนวนที่กดออกทวงหนี้",
        value: "rpa_submit",
        width: "170px",
        sortable: true,
        align: "center",
      },
      {
        text: "Remark",
        value: "remark_main",
        align: "left",
        width: "300px",
        sortable: true,
      },
      {
        text: "Detail Invoice",
        value: "action",
        width: "130px",
        align: "center",
        sortable: false,
      },
    ],
    headers_downservice: [
      {
        text: "Customer No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      {
        text: "Customer Name.",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },

      {
        text: "Customer Email",
        value: "customer_email",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "ระยะเวลาปิดระบบ",
        value: "remain_days",
        align: "center",
        width: "170px",
        sortable: true,
      },
      {
        text: "จำนวนที่กดออกทวงหนี้",
        value: "rpa_submit",
        width: "170px",
        sortable: true,
        align: "center",
      },
      {
        text: "Detail Invoice",
        value: "action",
        width: "130px",
        align: "center",
        sortable: false,
      },
    ],
    headers_upservice: [
      {
        text: "Customer No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      {
        text: "Customer Name.",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },

      {
        text: "Customer Email",
        value: "customer_email",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "ระยะเวลาปิดระบบ",
        value: "remain_days",
        align: "center",
        width: "170px",
        sortable: true,
      },
      {
        text: "จำนวนที่กดออกทวงหนี้",
        value: "rpa_submit",
        width: "170px",
        sortable: true,
        align: "center",
      },
      {
        text: "Detail Invoice",
        value: "action",
        width: "130px",
        align: "center",
        sortable: false,
      },
    ],
    headers_log: [
      {
        text: "Invoice",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      {
        text: "Order No.",
        value: "order_no",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer No.",
        value: "customer_name",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "คงค้างทั้งหมด",
        value: "aging",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "SO Number",
        value: "so_number",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Service",
        value: "service",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Invoice Date",
        value: "invoice_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Start Invoice Date",
        value: "start_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "End Invoice Date",
        value: "end_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Due Date",
        value: "due_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Sale Represent Name",
        value: "sale_name",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Sale Team Lead",
        value: "sale_team",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "วันที่ MEMO",
        value: "memo_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ Memo ครั้งล่าสุด",
        value: "memo_no",
        width: "260px",
        sortable: true,
        align: "center",
      },
      {
        text: "จำนวนครั้งที่ทวงหนี้",
        value: "debt_number",
        width: "170px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mainstatus",
        value: "main_status",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Email Sale",
        value: "sale_email",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Email Customer",
        value: "customer_email",
        width: "400px",
        sortable: true,
        align: "left",
      },
      {
        text: "เจ้าหน้าที่การเงิน ",
        value: "finance_name",
        width: "250px",
        sortable: true,
        align: "left",
      },
      {
        text: "status",
        value: "status",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Approve by",
        value: "action_by_name",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Approve date",
        value: "created_at",
        align: "center",
        width: "150px",
        sortable: true,
      },
    ],
    headers_detail_down: [
      {
        text: "Invoice",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        align: "left",
        class: "invoice1_modal",
      },
      {
        text: "Order No.",
        value: "order_no",
        width: "180px",
        sortable: true,
      },
      {
        text: "customer no.",
        value: "customer_no",
        width: "180px",
        sortable: true,
      },
      {
        text: "customer name",
        value: "customer_name",
        width: "180px",
        sortable: true,
      },
      {
        text: "คงค้างทั้งหมด",
        value: "aging",
        width: "180px",
        sortable: true,
      },
      {
        text: "SO Number",
        value: "so_number",
        width: "200px",
        sortable: true,
      },
      {
        text: "Service",
        value: "service",
        width: "300px",
        sortable: true,
      },
      {
        text: "Invoice Date",
        value: "invoice_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "Start Invoice Date",
        value: "start_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "End Invoice Date",
        value: "end_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "Due Date",
        value: "due_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "Sale Represent Name",
        value: "sale_name",
        width: "300px",
        sortable: true,
      },
      {
        text: "Sale Team Lead",
        value: "sale_team",
        width: "200px",
        sortable: true,
      },
      {
        text: "วันที่ MEMO",
        value: "memo_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "เลขที่ Memo ครั้งล่าสุด",
        value: "memo_no_last",
        width: "260px",
        sortable: true,
      },
      {
        text: "จำนวนครั้งที่ทวงหนี้",
        value: "debt_number_last",
        width: "170px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mainstatus",
        value: "main_status",
        width: "200px",
        sortable: true,
      },
      {
        text: "Email Sale",
        value: "sale_email",
        width: "300px",
        sortable: true,
      },
      {
        text: "Email Customer",
        value: "customer_email",
        width: "400px",
        sortable: true,
      },
      {
        text: "เจ้าหน้าที่การเงิน ",
        value: "finance_name",
        width: "250px",
        sortable: true,
      },
      {
        text: "status",
        value: "status_down_service",
        width: "200px",
        sortable: true,
        align: "center",
      },
      // {
      //   text: "Action",
      //   value: "action",
      //   width: "200px",
      //   sortable: true,
      //   align: "center",
      // },
      {
        text: "Approve by",
        value: "action_by_name",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Approve date",
        value: "action_date",
        align: "center",
        width: "150px",
        sortable: true,
      },
    ],
    headers_detail_up: [
      {
        text: "Invoice",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        align: "left",
        class: "invoice1_modal",
      },
      {
        text: "Order No.",
        value: "order_no",
        width: "180px",
        sortable: true,
      },
      {
        text: "customer no.",
        value: "customer_no",
        width: "180px",
        sortable: true,
      },
      {
        text: "customer name",
        value: "customer_name",
        width: "180px",
        sortable: true,
      },
      {
        text: "คงค้างทั้งหมด",
        value: "aging",
        width: "180px",
        sortable: true,
      },
      {
        text: "SO Number",
        value: "so_number",
        width: "200px",
        sortable: true,
      },
      {
        text: "Service",
        value: "service",
        width: "300px",
        sortable: true,
      },
      {
        text: "Invoice Date",
        value: "invoice_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "Start Invoice Date",
        value: "start_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "End Invoice Date",
        value: "end_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "Due Date",
        value: "due_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "Sale Represent Name",
        value: "sale_name",
        width: "300px",
        sortable: true,
      },
      {
        text: "Sale Team Lead",
        value: "sale_team",
        width: "200px",
        sortable: true,
      },
      {
        text: "วันที่ MEMO",
        value: "memo_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "เลขที่ Memo ครั้งล่าสุด",
        value: "memo_no_last",
        width: "260px",
        sortable: true,
      },
      {
        text: "จำนวนครั้งที่ทวงหนี้",
        value: "debt_number_last",
        width: "170px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mainstatus",
        value: "main_status",
        width: "200px",
        sortable: true,
      },
      {
        text: "Email Sale",
        value: "sale_email",
        width: "300px",
        sortable: true,
      },
      {
        text: "Email Customer",
        value: "customer_email",
        width: "400px",
        sortable: true,
      },
      {
        text: "เจ้าหน้าที่การเงิน ",
        value: "finance_name",
        width: "250px",
        sortable: true,
      },
      {
        text: "status",
        value: "status_down_service",
        width: "200px",
        sortable: true,
        align: "center",
      },
      // {
      //   text: "Action",
      //   value: "action",
      //   width: "200px",
      //   sortable: true,
      //   align: "center",
      // },
      {
        text: "Approve by",
        value: "action_by_name",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Approve date",
        value: "action_date",
        align: "center",
        width: "150px",
        sortable: true,
      },
    ],
    headers_customer: [
      {
        text: "Invoice Number",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        align: "left",
        class: "invoice1_modal",
      },
      {
        text: "คงค้างทั้งหมด",
        value: "aging",
        width: "180px",
        sortable: true,
      },
      {
        text: "Invoice Date",
        value: "invoice_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "SO Number",
        value: "so_number",
        width: "200px",
        sortable: true,
      },
      {
        text: "Service",
        value: "service",
        width: "300px",
        sortable: true,
      },
      {
        text: "Start Invoice Date",
        value: "start_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "End Invoice Date",
        value: "end_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "Due Date",
        value: "due_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "สถานะวางบิล",
        value: "billing_status",
        width: "220px",
        sortable: true,
      },
      {
        text: "Sale Represent",
        value: "sale_id",
        width: "200px",
        sortable: true,
      },
      {
        text: "Sale Represent Name",
        value: "sale_name",
        width: "300px",
        sortable: true,
      },
      {
        text: "Sale Team Lead",
        value: "sale_team",
        width: "200px",
        sortable: true,
      },
      {
        text: "วันที่ MEMO",
        value: "memo_date",
        width: "200px",
        sortable: true,
      },
      {
        text: "เลขที่ MEMO",
        value: "memo_no",
        width: "250px",
        sortable: true,
      },
      {
        text: "จำนวนครั้งที่ทวงหนี้",
        value: "debt_number_last",
        width: "170px",
        sortable: true,
        align: "center",
      },
      {
        text: "จำนวนวันที่ให้ลูกค้าชำระ",
        value: "customer_pay",
        width: "220px",
        sortable: true,
        align: "center",
      },
      {
        text: "เลขที่ Memo หนังสือทวงหนี้ครั้งล่าสุด",
        value: "memo_no_last",
        width: "260px",
        sortable: true,
      },
      {
        text: "ระยะเวลาคงเหลือ",
        value: "remain_day",
        align: "center",
        width: "150px",
        sortable: true,
      },
      {
        text: "Mainstatus",
        value: "main_status",
        width: "200px",
        sortable: true,
      },
      {
        text: "ดอกเบี้ย",
        value: "",
        width: "200px",
        sortable: true,
      },
      {
        text: "Email Sale",
        value: "sale_email",
        width: "300px",
        sortable: true,
      },
      {
        text: "Email Customer",
        value: "customer_email",
        width: "400px",
        sortable: true,
      },
      {
        text: "เจ้าหน้าที่การเงิน ",
        value: "finance_name",
        width: "250px",
        sortable: true,
      },
      {
        text: "Remark",
        value: "remark_detail",
        width: "300px",
        sortable: true,
      },
      {
        text: "Status finance",
        value: "status_finance",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Status finance head",
        value: "status_finance_head",
        width: "200px",
        sortable: true,
        align: "center",
      },
    ],
    // customer_invoice_list: orders,
    datalist_1: [], //ตารางปิดระบบ
    datalist_2: [], //ตารางเปิดระบบ
    datalist_3: [], //ตารางรอปิดระบบ
    datalist_log: [],
    modal_approve: {
      invoice_no: null,
      order_no: null,
      customer_no: null,
      customer_name: null,
      memo_no: null,
      status_down_service: null,
    },
    wait_role: "",
    employee_id: "",
  }),
  created() {
    this.role_status = localStorage.getItem("role");
    this.employee_id = localStorage.getItem("employee_id");
    // this.wait_role = localStorage.getItem("wait_role");
    // console.log("wait_role" +"= "+this.wait_role)
    if (
      this.role_status != "super_admin" &&
      this.role_status != "down_service" &&
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
      this.getWaitDownService();
      this.getDownService();
      this.getUpService();
      this.getLog();
      
    } else {
      this.$router.push("/login");
    }
  },
  watch: {},
  computed: {},

  methods: {
    convert(item) {
      return Number(item).toLocaleString();
    },
    select_approve(item) {
      this.modal_approve = item;
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    parseDateApprove(date) {
      return date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "";
},
    // ฟังก์ชั่นแสดงข้อมูลปิดระบบ
    getDownService() {
      this.finish = false;
      this.datalist_1 = [];
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
            "/debt/customer/down_service?size=" +
            this.item_per_page_table_1 +
            "&page=" +
            this.page_table_1 +
            "&search=" +
            String(this.search_1),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_1 = response.data.data;
            this.page_total_table_1 = response.data.count_pag
            //this.getUpService();
          } else {
            this.finish = true;
            this.page_total_table_1 = 1;
          }
        })
        .catch((error) => {
          // this.$swal.fire({
          //     title: "เกิดข้อผิดพลาด",
          //     icon: 'error',
          //     showConfirmButton: false,
          //     timer: 1500
          // })
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
          // if (error) {
          //   this.finish = true;
          //   this.$router.push("/login");
          // }
        });
    },
    // ฟังก์ชั่นแสดงข้อมูลเปิดระบบ
    getUpService() {
      this.finish = false;
      this.datalist_2 = [];
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
            "/debt/customer/up_service?size=" +
            this.item_per_page_table_2 +
            "&page=" +
            this.page_table_2 +
            "&search=" +
            String(this.search_2),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_2 = response.data.data;
            this.page_total_table_2 = response.data.count_page;
          } else {
            this.finish = true;
            this.page_total_table_2 = 1;
          }
        })
        .catch((error) => {
          // this.$swal.fire({
          //     title: "เกิดข้อผิดพลาด",
          //     icon: 'error',
          //     showConfirmButton: false,
          //     timer: 1500
          // })
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
          // if (error) {
          //   this.finish = true;
          //   this.$router.push("/login");
          // }
        });
    },
    getWaitDownService(){
      this.finish = false;
      this.datalist_3 = [];
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
            "/debt/customer/wait_down_service?size=" +
            this.item_per_page_table_3 +
            "&page=" +
            this.page_table_3 +
            "&search=" +
            String(this.search_3),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_3 = response.data.data;
            this.wait_role = response.data.role;
            //console.log("wait_role" +"= "+this.wait_role)
            this.page_total_table_3 = response.data.count_page;
          } else {
            this.finish = true;
            this.page_total_table_3 = 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    getLog(){
      this.finish = false;
      this.datalist_log = [];
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
            "/debt/log/up-down/service?size=" +
            this.item_per_page_table_log +
            "&page=" +
            this.page_table_log +
            "&search=" +
            String(this.search_log),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_log = response.data.data;
            this.page_total_table_log = response.data.count_page;
          } else {
            this.finish = true;
            this.page_total_table_log = 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    Export_AllFile() {

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
        .get(process.env.VUE_APP_API + "/debt/export/log/up-down/service", headers)
        .then((response) => {
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_log_service.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
      })
    },
    approve_service_book_close(){
      var Invall = [];
      for (let index = 0; index < this.modal_submit_all.length; index++) {
        Invall.push(this.modal_submit_all[index].invoice_no);
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
          .put(
            process.env.VUE_APP_API +
              "/debt/invoice/finance/approve/STATUS_FINANCE",
            {
              invoice_no: Invall,
            },
            headers
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Approve ข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              this.finish = true;
              this.page = 1;
              this.openInvoice(this.selected_1[0]);
              // this.getInvoice();
            });
          })
          .catch(() => {
            this.$swal.fire({
              title: "เกิดข้อผิดพลาด",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
            // if (error.response.status === 401) {
            //   localStorage.clear();
            //   this.$router.push("/login");
            // }
          });
    },
    approve_service_downservice(){
      var Invall = [];
      for (let index = 0; index < this.modal_submit_down.length; index++) {
        Invall.push(this.modal_submit_down[index].invoice_no);
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
          .put(
            process.env.VUE_APP_API +
              "/debt/invoice/approve/STATUS_DOWN_SERVICE",
            {
              invoice_no: Invall,
            },
            headers
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Approve ข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              this.finish = true;
              this.page = 1;
              this.openDownService(this.selected_downservice[0]);
              // this.getInvoice();
            });
          })
          .catch(() => {
            this.$swal.fire({
              title: "เกิดข้อผิดพลาด",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          });

    },
    approve_service_upservice(status){
      var Invall = [];
      for (let index = 0; index < this.modal_submit_up.length; index++) {
        Invall.push(this.modal_submit_up[index].invoice_no);
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
      if(status == 'request'){
        this.axios
          .put(
            process.env.VUE_APP_API +
              "/debt/invoice/approve/REQUEST_UP_SERVICE",
            {
              invoice_no: Invall,
            },
            headers
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Approve ข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              this.finish = true;
              this.page = 1;
              this.openUpService(this.selected_upservice[0]);
              // this.getInvoice();
            });
          })
          .catch(() => {
            this.$swal.fire({
              title: "เกิดข้อผิดพลาด",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }else{
        this.axios
          .put(
            process.env.VUE_APP_API +
              "/debt/invoice/approve/STATUS_UP_SERVICE",
            {
              invoice_no: Invall,
            },
            headers
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Approve ข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              this.finish = true;
              this.page = 1;
              this.openUpService(this.selected_upservice[0]);
              // this.getInvoice();
            });
          })
          .catch(() => {
            this.$swal.fire({
              title: "เกิดข้อผิดพลาด",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }
      

    },
    
    // ส่ง status ไปอัพเดทและส่งเลข Email Oder ให้ Operation ปิดระบบ/เปิดระบบ
    approve_down_service(invoice_no, status){
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
        .put(
          process.env.VUE_APP_API +
            "/debt/invoice/head/" +
            invoice_no +
            "/" +
            status,
          "",
          headers
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Confirm ข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.finish = true;
            this.page = 1;
            this.openDownService(this.selected_downservice[0]);
          });
        })
        .catch((error) => {
          this.$swal.fire({
            title: "เกิดข้อผิดพลาด",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
          
        });

    },
    approve_service(invoice_no, status) {
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      if(status == 'REQUEST_UP_SERVICE'){
        this.axios
        .put(
          process.env.VUE_APP_API +
            "/debt/invoice/head/" +
            invoice_no +
            "/" +
            status,
          "",
          headers
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Request ขอเปิดระบบเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.finish = true;
            this.page = 1;
            this.openUpService(this.selected_upservice[0]);
          });
        })
        .catch((error) => {
          this.$swal.fire({
            title: "เกิดข้อผิดพลาด",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
          
        });
      }else{
        this.axios
        .put(
          process.env.VUE_APP_API +
            "/debt/invoice/head/" +
            invoice_no +
            "/" +
            status,
          "",
          headers
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Confirm ข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.finish = true;
            this.page = 1;
            this.openUpService(this.selected_upservice[0]);
          });
        })
        .catch((error) => {
          this.$swal.fire({
            title: "เกิดข้อผิดพลาด",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
          
        });
      }
      
    },

    // approve all -------------
    // SubmitAll(status) {
    //   var Invall = [];
    //   for (let index = 0; index < this.list_approve_all.length; index++) {
    //     Invall.push(this.list_approve_all[index].invoice_no);
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

    //   if (status == "STATUS_UP_SERVICE") {
    //     this.selected_list = [];
    //     this.selected = [];
    //   } else if(status == "STATUS_DOWN_SERVICE"){
    //     this.selected_list = [];
    //     this.selected = [];
    //   }else {
    //     this.axios
    //       .post(
    //         process.env.VUE_APP_API + "/debt/sendmail/upservice",
    //         {
    //           invoice_no: Invall,
    //         },
    //         headers
    //       )
    //       .then(() => {
    //       Swal.fire({
    //         icon: "success",
    //         title: "Request ข้อมูลเรียบร้อยแล้ว",
    //         showConfirmButton: false,
    //         timer: 3000,
    //       }).then(() => {
    //         this.finish = false;
    //         this.page_table_1 = 1;
    //         this.page_table_2 = 1;
    //         this.selected_list = [];
    //         this.selected = [];
    //         this.getDownService();
    //         this.getUpService();
    //       });
    //     })
    //     .catch((error) => {
    //       this.$swal.fire({
    //         title: "เกิดข้อผิดพลาด",
    //         icon: "error",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       if (error.response.status === 401) {
    //         localStorage.clear();
    //         this.$router.push("/login");
    //       }
    //     });
      
    //   }
    // },
    // select() {
    //   localStorage.setItem("list_invoice", JSON.stringify(this.selected));
    //   this.selected_list = JSON.parse(localStorage.getItem("list_invoice"));
    //   for (let index = 0; index < this.selected_list.length; index++) {
    //     if (this.selected_list[index].status_down_service == "waiting") {
    //       this.check_confirm = false;
    //     } else {
    //       this.check_confirm = true;
    //       break;
    //     }
    //   }
    //   for (let index = 0; index < this.selected_list.length; index++) {
    //     if (this.selected_list[index].status_down_service == "waiting_up") {
    //       this.check_confirm_up = false;
    //     } else {
    //       this.check_confirm_up = true;
    //       break;
    //     }
    //   }
    //   for (let index = 0; index < this.selected_list.length; index++) {
    //     if (this.selected_list[index].status_down_service == "approve") {
    //       this.check_request = false;
    //     } else {
    //       this.check_request = true;
    //       break;
    //     }
    //   }
    //   if (this.selected_list.length == 0) {
    //     this.check_confirm = true;
    //     this.check_confirm_up = true;
    //     this.check_request = true;
    //   }
    // },


    // submit_all(name) {
    //   if (name == "confirm_down") {
    //     this.list_submitted("confirm_down");
    //   }
    //   if (name == "request_up") {
    //     this.list_submitted("request_up");
    //   }
    //   if (name == "confirm_up") {
    //     this.list_submitted("confirm_up");
    //   }
    // },
    // list_submitted(name) {
    //   this.list_approve_all = [];
    //   if (name == "confirm_down") {
    //     for (let index = 0; index < this.selected.length; index++) {
    //       if (this.selected[index].status_down_service == "waiting") {
    //         this.list_approve_all.push(this.selected[index]);
    //       }
    //     }
    //   } else if (name == "request_up") {
    //     for (let index = 0; index < this.selected.length; index++) {
    //       if (this.selected[index].status_down_service == "approve") {
    //         this.list_approve_all.push(this.selected[index]);
    //       }
    //     }
    //   } else if (name == "confirm_up") {
    //     for (let index = 0; index < this.selected.length; index++) {
    //       if (this.selected[index].status_down_service == "waiting_up") {
    //         this.list_approve_all.push(this.selected[index]);
    //       }
    //     }
    //   }
    // },
    // ------end-------
    editRemarkWaitDown(status, data){
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
      if(status == 'REMARK_MAIN'){
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkmain/update",
              {
               customer_no : data.customer_no,
               remark_main : data.remark_main
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.getWaitDownService();
               }
            })
      }else{
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkdetail/update",
              {
                invoice_no : data.invoice_no,
                remark_detail: data.remark_detail
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.openInvoice(data);
               }
            })
      }
      
    },
    editRemarkDownService(status, data){
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
      if(status == 'REMARK_MAIN'){
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkmain/update",
              {
               customer_no : data.customer_no,
               remark_main : data.remark_main
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.getDownService();
               }
            })
      }else{
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkdetail/update",
              {
                invoice_no : data.invoice_no,
                remark_detail: data.remark_detail
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.openDownService(data);
               }
            })
      }
    },
    editRemarkUpService(status, data){
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
      if(status == 'REMARK_MAIN'){
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkmain/update",
              {
               customer_no : data.customer_no,
               remark_main : data.remark_main
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.getDownService();
               }
            })
      }else{
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkdetail/update",
              {
                invoice_no : data.invoice_no,
                remark_detail: data.remark_detail
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.openUpService(data);
               }
            })
      }
    },
    editRemark(data){
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
          .put(
            process.env.VUE_APP_API + "/debt/remarkdetail/update",
              {
                invoice_no : data.invoice_no,
                remark_detail: data.remark_detail
              },
            headers
            )
            .then((response) => {
               if (response) {
                this.finish = true;
                this.getDownService();
                this.getUpService();
               }
            })
    },
    openInvoice(item) {
      this.finish = false;
      this.selected_1 = [];
      this.name_open_dialog = item.customer_no + " - " + item.customer_name;
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
            "/debt/invoice/" +
            item.customer_no +
            "/wait_down_service",
          headers
        )
        .then((response) => {
          var currentDate = new Date();
          var currentMonth = currentDate.getMonth() + 1;
          if (currentMonth < 10) {
            this.finish = true;
            currentMonth = "0" + currentMonth;
          }
          if (response.data) {
            this.finish = true;
            this.customer_invoice_list = response.data.data;
            this.customer_invoice_list.forEach((element) => {
              element.memo_date = moment(element.memo_date).format(
                "YYYY-MM-DD"
              );
              element.due_date = moment(element.due_date).format("YYYY-MM-DD");
            });
          } else {
            this.finish = true;
            this.customer_invoice_list = [];
          }
        });
    },
    openDownService(item){
      this.finish = false;
      this.selected_downservice = [];
      this.name_downservice_dialog = item.customer_no + " - " + item.customer_name;
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
            "/debt/invoice/" +
            item.customer_no +
            "/down_service",
          headers
        )
        .then((response) => {
          var currentDate = new Date();
          var currentMonth = currentDate.getMonth() + 1;
          if (currentMonth < 10) {
            this.finish = true;
            currentMonth = "0" + currentMonth;
          }
          if (response.data) {
            this.finish = true;
            this.customer_downservice_list = response.data.data;
            this.customer_downservice_list.forEach((element) => {
              element.memo_date = moment(element.memo_date).format(
                "YYYY-MM-DD"
              );
              element.due_date = moment(element.due_date).format("YYYY-MM-DD");
            });
          } else {
            this.finish = true;
            this.customer_downservice_list = [];
          }
        });
    },
    openUpService(item){
      this.finish = false;
      this.selected_upservice = [];
      this.name_upservice_dialog = item.customer_no + " - " + item.customer_name;
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
            "/debt/invoice/" +
            item.customer_no +
            "/up_service",
          headers
        )
        .then((response) => {
          var currentDate = new Date();
          var currentMonth = currentDate.getMonth() + 1;
          if (currentMonth < 10) {
            this.finish = true;
            currentMonth = "0" + currentMonth;
          }
          if (response.data) {
            this.finish = true;
            this.customer_upservice_list = response.data.data;
            this.customer_upservice_list.forEach((element) => {
              element.memo_date = moment(element.memo_date).format(
                "YYYY-MM-DD"
              );
              element.due_date = moment(element.due_date).format("YYYY-MM-DD");
            });
          } else {
            this.finish = true;
            this.customer_upservice_list = [];
          }
        });
    },
    enterSelect(){
       for (let index = 0; index < this.selected_1.length; index++) {
        if (
          this.selected_1[index].status_finance == "waiting"
        ) {
          this.check_approve = false;
        } else {
          this.check_approve = true;
          break;
        }  
      }
      for (let i = 0; i < this.selected_1.length; i++) {
        if (
          this.selected_1[i].memo_no_last != ""
        ) {
          this.check_memo_no_last = false;
        } else {
          this.check_memo_no_last = true;
          break;
        }
        
      }
    },
    enterSelectDown(){
       for (let index = 0; index < this.selected_downservice.length; index++) {
        if (
          this.selected_downservice[index].status_down_service !== 'waiting'
        ) {
          this.check_approve_down = true;
          break;
        } else {
          this.check_approve_down = false;
        }  
      }
    },
    enterSelectUp(){
      for (let index = 0; index < this.selected_upservice.length; index++) {
        if ((this.selected_upservice[index].status_down_service == 'waiting_up' && this.selected_upservice[index].status_down_service == 'approve_up') || 
          this.selected_upservice[index].status_down_service == 'waiting_request' || this.selected_upservice[index].status_down_service == 'waiting_up') {
          this.check_request_upservice = true;
           break;
        }else{
          this.check_request_upservice = false;
        }
      }

      for (let index = 0; index < this.selected_upservice.length; index++) {
        if ((this.selected_upservice[index].status_down_service !== 'waiting_up')) {
          this.check_confirm_upservice = true;
           break;
        }else{
          this.check_confirm_upservice = false;
        }
      }

      console.log("confirm="+this.check_confirm_upservice)
      console.log("request="+this.check_request_upservice)

      
    },
    submit_all() {
      this.set_memo.memo_no_last = this.selected_1[0].memo_no_last;
      this.modal_submit_all = this.selected_1;
    },
    submit_donwservice() {
      this.set_memo_down.memo_no_last = this.selected_downservice[0].memo_no_last;
      this.modal_submit_down = this.selected_downservice;
    },
    submit_upservice() {
      this.set_memo_up.memo_no_last = this.selected_upservice[0].memo_no_last;
      this.modal_submit_up = this.selected_upservice;
    },
    item_per_page_inc_table_1() {
      this.getDownService();
    },
    item_per_page_inc_table_2() {
      this.getUpService();
    },
    item_per_page_inc_table_3() {
      this.getWaitDownService();
    },
    item_per_page_inc_table_log() {
      this.getLog();
    },
    pageChangeTable1() {
      this.getDownService();
    },
    pageChangeTable2() {
      this.getUpService();
    },
    pageChangeTable3() {
      this.getWaitDownService();
    },
    pageChangeTableLog() {
      this.getLog();
    },
    searchWord_1() {
      this.page_table_1 = 1;
      this.getDownService();
    },
    clearFilter_1() {
      this.page_table_1 = 1;
      this.search_1 = "";
      this.getDownService();
    },
    searchWord_2() {
      this.page_table_2 = 1;
      this.getUpService();
    },
    clearFilter_2() {
      this.page_table_2 = 1;
      this.search_2 = "";
      this.getUpService();
    },
    searchWord_log() {
      this.page_table_log = 1;
      this.getLog();
    },
    clearFilter_log() {
      this.page_table_log = 1;
      this.search_log = "";
      this.getLog();
    },
    searchWord_3() {
      this.page_table_3 = 1;
      this.getWaitDownService();
    },
    clearFilter_3() {
      this.page_table_3 = 1;
      this.search_3 = "";
      this.getWaitDownService();
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
.vdialognew {
  margin-top: 80px !important;
}

.v-pagination {
  align-items: center;
  display: inline-flex;
  list-style-type: none;
  justify-content: flex-end;
  margin: 0;
  max-width: 100%;
  width: 100%;
}

.font-text-alert {
  font-family: "Bai_Jamjuree" !important;
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
  height: 54px !important;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
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
  vertical-align: middle;
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
}
::v-deep.sticky-header {
  position: sticky;
  top: var(--toolbarHeight);
}

::v-deep.v-data-table__wrapper {
  overflow: unset;
}

th.text-start:first-child {
  position: sticky;
  left: 0;
  z-index: 5 !important;
}

// th.text-start:first-child {
//   position: sticky !important;
//   width: 20px !important;
//   left: 0px !important;
//   z-index: 99 !important;
//   padding-top: 14px;
//   border-right: none !important;
//   background: linear-gradient(
//     90deg,
//     #ececec 99%,
//     rgba(101, 101, 101, 1) 100%
//   ) !important;
// }

th.text-start.invoice1.sortable {
  position: sticky !important;
  left: 0px !important;
  z-index: 5 !important;
  padding-top: 14px;
  background: linear-gradient(
    90deg,
    #ececec 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
}


// th.text-start.invoice1_modal.sortable {
//   position: sticky;
//   left: 0px !important;
//   z-index: 5 !important;
//   padding-top: 14px;
//   // border-right: 1px solid #cccccc;
//   // background-color: rgb(168, 255, 214) !important;
//   background: linear-gradient(
//     90deg,
//     rgb(199, 224, 236) 99%,
//     rgba(101, 101, 101, 1) 100%
//   ) !important;
// }

th.text-left.invoice1_modal.sortable {
  position: sticky;
  left: 56px !important;
  z-index: 10 !important;
  padding-top: 14px;
  // border-right: 1px solid #cccccc;
  // background-color: rgb(168, 255, 214) !important;
  background: linear-gradient(
    90deg,
    #ececec 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
}
#table_select_modal_invoice_book_close {
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #B0B0B0;
    // border-bottom: 1px solid rgb(160, 160, 160);
    height: 30px;
  }
  td {
    height: 40px;
    padding: 5px;
  }
}

#invoice_book_1 {
  tbody {
    td.text-start {
      position: sticky !important;
      left: 0px;
      top: auto;
      z-index: 2 !important;
      // background-color: white;
      background: linear-gradient(90deg, #ffffff 99%, #656565 100%) !important;
    }

    td.text-center.fixed {
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      z-index: 0;
    }

    // td.text-start:first-child {
    //   position: sticky;
    //   width: 20px !important;
    //   left: 0;
    //   z-index: 5 !important;
    //   padding-top: 14px;
    //   border-right: none !important;
    //   background: linear-gradient(
    //     90deg,
    //     rgba(253, 253, 253, 1) 99%,
    //     rgba(101, 101, 101, 1) 100%
    //   ) !important;
    // }
  }
}
#invoice_book_2 {
  th.text-start {
    background-color: #ececec !important;
  }
  th.text-center {
    background-color: #ececec !important;
  }
  th.text-left {
    background-color: #ececec !important;
  }
  tbody {
    td.text-left {
      word-break: break-all;
    }
    td.text-start {
      font-size: 14px;
      position: sticky !important;
      left: 0px !important;
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
      font-size: 14px;
      position: sticky !important;
      left: 0px !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      font-size: 14px;
      z-index: 0;
    }

    td.text-start:first-child {
      font-size: 14px;
      //   position: sticky;
      width: 20px !important;
      left: 0px !important;
      border-right: none !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
  }
}

#invoice_book_1_modal {
  textarea.form-control {
    font-size: 13px !important;
  }
  input.form-control {
    font-size: 13px !important;
  }
  th.text-start.sortable {
    background-color: #ececec !important;
  }
  th.text-start:first-child {
    z-index: 10 !important;
    background-color: #ececec !important;
  }
  th.text-start {
    background-color: #ececec !important;
  }
  th.text-center {
    background-color: #ececec !important;
  }
  th.text-left {
    z-index: 10 !important;
    background-color: #ececec !important;
  }

  tbody {
    td {
      font-size: 13px !important;
    }
    td.text-start:first-child {
      font-size: 14px;
      position: sticky !important;
      left: 0px !important;
      z-index: 5 !important;
      padding-top: 14px;
      // border-right: 1px solid #cccccc;
      // background-color: rgb(168, 255, 214) !important;
      background: linear-gradient(
        90deg,
        #ffffff 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
    td.text-left {
      font-size: 14px;
      position: sticky !important;
      left: 56px !important;
      z-index: 5 !important;
      padding-top: 14px;
      // border-right: 1px solid #cccccc;
      // background-color: rgb(168, 255, 214) !important;
      background: linear-gradient(
        90deg,
        #ffffff 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }

    td.text-start {
      font-size: 14px;
      // position: sticky !important;
      left: 200px;
      top: auto;
      z-index: 2 !important;
      background-color: white;
      // border-right: 1px solid #cccccc;
      // background: linear-gradient(
      //   90deg,
      //   rgba(253, 253, 253, 1) 99%,
      //   rgba(101, 101, 101, 1) 100%
      // ) !important;
    }

    td.text-center.fixed {
      font-size: 14px;
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      font-size: 14px;
      z-index: 0;
    }

    td.text-start:first-child {
      font-size: 14px;
      //   position: sticky;
      width: 20px !important;
      left: 0;
      border-right: none !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
  }
}

#table_select_modal {
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: rgb(236, 236, 236);
    // border-bottom: 1px solid rgb(160, 160, 160);
    height: 30px;
  }
  td {
    height: 40px;
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
h5#modal-center-forecast-date___BV_modal_title_.modal-title {
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
h5#modal-center-postpone_one-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-postpone_two-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-postpone_three-date___BV_modal_title_.modal-title {
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
.v-dialog--fullscreen {
  top: 64px !important;
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
.table_in_book1 {
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Bai_Jamjuree" !important;
  z-index: 10 !important;
}
table {
  position: relative !important;
}
th.text-start {
  background-color: #ececec !important;
}
th.text-center {
  background-color: #ececec !important;
}
th.text-left {
  background-color: #ececec !important;
}
th.text-right {
  background-color: #ececec !important;
}
td.text-center {
  // padding: 0 !important;
  height: 100% !important;
  width: 100% !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.disable-events {
  pointer-events: none;
}
.table-invoice {
  width: 100%;
  overflow: auto;
  word-break: break-all;
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
  font-size: 14px !important;
}
input.form-control {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  border-radius: 1px;
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
.inv_color {
  background-color: rgb(11, 168, 11);
  color: green;
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
</style>
