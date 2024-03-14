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
            <h3 style="font-weight:700">รอปิดระบบ</h3>
          </v-col>

          <v-dialog
            v-model="dialog_info1"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card class="font-text">
              <v-toolbar dark color="indigo">
                <!-- <v-btn icon dark @click="dialog_info1 = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn> -->
                <v-toolbar-title class="font-text">
                  <div class="d-flex">
                    <div style="width: 130px; color: #fffd9e">(รอปิดระบบ) :</div>
                    {{ name_open_dialog }}
                  </div></v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn
                    icon
                    dark
                    @click="
                      (dialog_info1 = false), (search_book1 = ''), getInvoice()
                    "
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>

              <v-col cols="12">
                <!-- ----------------------------------------modal Approve confirm --------------------------------- -->
                <v-dialog v-model="dialog_approve" persistent max-width="500">
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

                        <div class="font-text">ยืนยันการ Approve</div>
                        <div class="font-text">(รอปิดระบบ)</div>
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
                          <div style="font-weight: bold">Customer No :&nbsp;</div>
                          {{ modal_approve.customer_no }}
                        </div>

                        <div class="d-flex font-text" style="height: 36px">
                          <div style="font-weight: bold; width: 130px">
                            Customer Name :&nbsp;
                          </div>
                          {{ modal_approve.customer_name }}
                        </div>

                        <div class="d-flex" style="width: 50%; height: 36px">
                          <div style="font-weight: bold">เลขที่ MEMO :&nbsp;</div>
                          {{ modal_approve.memo_no }}
                        </div>

                        <div class="d-flex font-text" style="height: 36px">
                          <div style="font-weight: bold">
                            สถานะ Finance Head :&nbsp;
                          </div>
                          <div
                            style="color: green"
                            v-if="modal_approve.status_finance_head == 'approve'"
                          >
                            Approve
                          </div>
                          <div
                            style="color: orange"
                            v-if="modal_approve.status_finance_head == 'waiting'"
                          >
                            Waiting
                          </div>
                          <!-- reject -->
                          <div
                            style="color: red"
                            v-if="modal_approve.status_finance_head == 'reject'"
                          >
                            Reject
                          </div>
                        </div>

                        <!-- <div class="d-flex font-text" style=" height: 36px">
                          <div style="font-weight: bold">
                            สถานะ Operation:&nbsp;
                          </div>
                          <div
                            style="color: green"
                            v-if="modal_approve.status_debt == 'approve'"
                          >
                            Approve
                          </div>
                          <div
                            style="color: orange"
                            v-if="modal_approve.status_debt == 'waiting'"
                          >
                            Waiting
                          </div>
                        </div> -->

                        <!-- <div class="d-flex font-text" style="height: 36px">
                          <div style="font-weight: bold">สถานะ Sale:&nbsp;</div>
                          <div
                            style="color: green"
                            v-if="modal_approve.status_sale == 'approve'"
                          >
                            Approve
                          </div>
                          <div
                            style="color: orange"
                            v-if="modal_approve.status_sale == 'waiting'"
                          >
                            Waiting
                          </div>
                        </div> -->
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
                            approve_service('APPROVE', modal_approve.invoice_no)
                        "
                      >
                        approve
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- ------------------------------------end modal Approve confirm --------------------------------- -->

                <!------------------------dialog_approve รอปิดระบบ--------------------------------->
                <v-dialog
                  v-model="dialog_approve_all"
                  persistent
                  max-width="1020"
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

                        <div
                          class="font-text"
                          style="color: darkgreen; margin-bottom:10px"
                        >
                          ยืนยัน Approve ปิดระบบ
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
                              <th style="width: 180px; padding-left:10px">
                                Invoice No &nbsp;
                              </th>
                              <th style="width: 180px">Customer No &nbsp;</th>
                              <th style="width: 280px">Customer Name &nbsp;</th>
                              <th style="width: 200px">เลขที่ MEMO &nbsp;</th>
                              <th style="width: 160px; padding-right:10px">
                                Status Finance Head&nbsp;
                              </th>
                            </tr>
                            <tr
                              v-for="item in list_approve_all"
                              :key="item.invoice_no"
                              style="border-bottom: 1px solid gainsboro"
                            >
                              <td style="width: 180px; padding-left:10px">
                                {{ item.invoice_no }}
                              </td>
                              <td style="width: 180px">
                                {{ item.customer_no }}
                              </td>
                              <td style="width: 280px">
                                {{ item.customer_name }}
                              </td>
                              <td style="width: 200px">
                                {{ item.memo_no }}
                              </td>
                              <td style="width: 150px; text-align: center;">
                                <label
                                  v-if="item.status_down_service == 'waiting'"
                                  style="color: orange;"
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
                      <v-btn color="error darken-1" text @click="close_approve()">
                        Close
                      </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="
                          (dialog_approve_all = false),
                            approve_service('APPROVE_ALL')
                        "
                      >
                        Approve
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!---------------------------end dialog_approve รอปิดระบบ------------------------------>
                <v-card>
                  <v-card-text>
                    <div
                      class="d-flex"
                      style="width: 100%;align-items:end;justify-content: space-between;"
                    >
                      <v-btn
                        color="primary"
                        @click="(dialog_approve_all = true), submit_all()"
                        style="margin-bottom: 10px"
                        :disabled="
                          role_status == 'admin' ||
                          (role_status == 'wait_down_service' &&
                            wait_role != 'STATUS_FINANCE') ||
                            check_approve == true
                        "
                      >
                        Approve
                        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                      </v-btn>
                      <div style="width: 7px"></div>

                      <!-- <label style="font-size: 12px;"
                        >data show : {{ datalist.length }}</label
                      > -->
                      <div style="width:400px">
                        <v-text-field
                          v-model="search_book1"
                          append-icon="mdi-magnify"
                          label="search"
                          single-line
                          hide-details
                          style="margin-bottom: 10px;margin-top: 0px;"
                        ></v-text-field>
                      </div>
                    </div>

                    <!-- --------------------------------------table modal--------------------------------------------- -->
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :search="search_book1"
                          :headers="headers_map_modal"
                          :items="datalist"
                          class="table_in_book1"
                          fixed-header
                          height="430px"
                          item-key="invoice_no"
                          id="invoice_book_1_wating"
                          show-select
                          v-model="selected"
                          @input="enterSelect($event)"
                        >
                          <!-- <template id="invoice_modal" v-slot:[`item.invoice_no`]="{ item }">
                              {{ item.invoice_no }}
                          </template> -->

                          <template v-slot:[`item.aging`]="{ item }">
                            {{ convert(item.aging) }}
                          </template>
                          <!--------------------- New Requirement ----------------------->
                          <!--
                          <template v-slot:[`item.cus_criteria`]="{ item }">
                            <div v-if="item.cus_criteria == null">
                              <select
                                disabled
                                class="style-chooser form-control"
                              >
                                  <option value=""></option>
                                  <option value="normal">Normal</option>
                                  <option value="critical">Critical</option>
                              </select>
                            </div>
                          </template>
                          -->
                          <template v-slot:[`item.invoice_date`]="{ item }">
                            <label
                              v-if="parseDate(item.invoice_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.invoice_date) }}</label
                            >
                          </template>

                          <template v-slot:[`item.start_date`]="{ item }">
                            <label
                              v-if="parseDate(item.start_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.start_date) }}</label
                            >
                          </template>

                          <template v-slot:[`item.end_date`]="{ item }">
                            <label
                              v-if="parseDate(item.end_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.end_date) }}</label
                            >
                          </template>

                          <template v-slot:[`item.due_date`]="{ item }">
                            <label
                              v-if="parseDate(item.due_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.due_date) }}</label
                            >
                          </template>

                          <template v-slot:[`item.memo_date`]="{ item }">
                            <label
                              v-if="parseDate(item.memo_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.memo_date) }}</label
                            >
                          </template>

                          <template
                            v-slot:[`item.collection_letter_first_date`]="{
                              item,
                            }"
                          >
                            <label
                              v-if="
                                parseDate(item.collection_letter_first_date) !=
                                  '01/01/0001'
                              "
                            >
                              {{
                                parseDate(item.collection_letter_first_date)
                              }}</label
                            >
                          </template>

                          <template
                            v-slot:[`item.collection_letter_second_date`]="{
                              item,
                            }"
                          >
                            <label
                              v-if="
                                parseDate(item.collection_letter_second_date) !=
                                  '01/01/0001'
                              "
                            >
                              {{
                                parseDate(item.collection_letter_second_date)
                              }}</label
                            >
                          </template>
                          <!-- remark detail -->
                          <template v-slot:[`item.remark_detail`]="{ item }">
                            <b-textarea
                              placeholder="remark"
                              v-model="item.remark_detail"
                              rows="1"
                              max-rows="900"
                              style="border-radius: 0px;"
                              :disabled="
                                role_status == 'viewer' || role_status == 'admin'
                              "
                              @change="editRemark('REMARK_DETAIL', item)"
                            ></b-textarea>
                          </template>
                          <!-- end remark detail -->

                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="success"
                              style="font-size: 12px"
                              @click="
                                (dialog_approve = true), approve_modal(item)
                              "
                              v-if="
                                item.status_finance_head == 'waiting' ||
                                  item.status_finance_head == 'approve'
                              "
                              :disabled="
                                role_status == 'admin' ||
                                (role_status == 'wait_down_service' &&
                                wait_role != 'STATUS_FINANCE')
                              "
                            >
                              Approve
                            </v-btn>
                            <v-btn
                              color="success"
                              style="font-size: 12px"
                              @click="
                                (dialog_approve = true), approve_modal(item)
                              "
                              v-if="item.status_finance_head == 'reject'"
                              :disabled="
                                role_status == 'admin' ||
                                (role_status == 'wait_down_service' &&
                                wait_role != 'STATUS_FINANCE')
                              "
                            >
                              Approve
                            </v-btn>
                          </template>

                          <template v-slot:[`item.action_finance`]="{ item }">
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

                          <template v-slot:[`item.status_finance`]="{ item }">
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

                          <!-- <template v-slot:[`item.status_debt`]="{ item }">
                            <v-btn
                              outlined
                              color="warning"
                              v-if="item.status_debt === 'waiting'"
                              class="disable-events"
                            >
                              WAITING
                            </v-btn>
                            <v-btn
                              outlined
                              color="success"
                              v-if="item.status_debt === 'approve'"
                              class="disable-events"
                            >
                              approve
                            </v-btn>

                            <label
                              v-if="
                                item.status_debt !== 'approve' &&
                                  item.status_debt !== 'waiting'
                              "
                              class="disable-events"
                            >
                              {{ item.status_debt }}
                            </label>
                          </template> -->

                          <!-- <template v-slot:[`item.status_sale`]="{ item }">
                            <v-btn
                              outlined
                              color="warning"
                              v-if="item.status_sale === 'waiting'"
                              class="disable-events"
                            >
                              WAITING
                            </v-btn>
                            <v-btn
                              outlined
                              color="success"
                              v-if="item.status_sale === 'approve'"
                              class="disable-events"
                            >
                              approve
                            </v-btn>

                            <label
                              v-if="
                                item.status_sale !== 'approve' &&
                                  item.status_sale !== 'waiting'
                              "
                              class="disable-events"
                            >
                              {{ item.status_sale }}
                            </label>
                          </template> -->

                          <!-- <template v-slot:[`item.status_owner`]="{ item }">
                            <v-btn
                              outlined
                              color="warning"
                              v-if="item.status_owner === 'waiting'"
                              class="disable-events"
                            >
                              WAITING
                            </v-btn>
                            <v-btn
                              outlined
                              color="success"
                              v-if="item.status_owner === 'approve'"
                              class="disable-events"
                            >
                              approve
                            </v-btn>

                            <label
                              v-if="
                                item.status_owner !== 'approve' &&
                                  item.status_owner !== 'waiting'
                              "
                              class="disable-events"
                            >
                              {{ item.status_owner }}
                            </label>
                          </template> -->
                        </v-data-table>
                      </div>
                    </div>
                    <!-- ------------------------------------end table modal--------------------------------------------- -->
                  </v-card-text>
                </v-card>
              </v-col>
            </v-card>
          </v-dialog>
          <!-- -----------------------------END Approve Modal----------------------------------------------- -->

          <v-col cols="12">
            <!-- ----------------------------------------modal Approve confirm หน้าหลัก--------------------------------- -->
            <!-- <v-dialog v-model="dialog_approve_main" persistent max-width="500">
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

                    <div class="font-text">ยืนยันการ Approve</div>
                    <div class="font-text">(รอปิดระบบ)</div>
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
                      <div style="font-weight: bold">Customer No :&nbsp;</div>
                      {{ modal_approve.customer_no }}
                    </div>

                    <div class="d-flex font-text" style="height: 36px">
                      <div style="font-weight: bold; width: 130px">
                        Customer Name :&nbsp;</div>
                      {{ modal_approve.customer_name }}
                    </div>

                    <div class="d-flex" style="width:300px; height: 36px">
                      <div style="font-weight: bold">เลขที่ MEMO :&nbsp;</div>
                      {{ modal_approve.memo_no }}
                    </div>

                    <div class="d-flex font-text" style="height: 36px">
                      <div style="font-weight: bold">สถานะ :&nbsp;</div>
                      <div
                        style="color: green"
                        v-if="modal_approve.status_owner == 'approve'"
                      >
                        Approve
                      </div>
                      <div
                        style="color: orange"
                        v-if="modal_approve.status_owner == 'waiting'"
                      >
                        Waiting
                      </div>
                    </div>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error darken-1"
                    text
                    @click="dialog_approve_main = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="
                      (dialog_approve_main = false),
                        approve_service(modal_approve.invoice_no)
                    "
                  >
                    approve
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
            <!-- ------------------------------------end modal Approve confirm หน้าหลัก--------------------------------- -->

            <v-card>
              <v-card-title>
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
                  @click="clearFilter()"
                  class="screen"
                  style="font-size: 12px"
                >
                  Clear All</v-btn
                >
              </v-card-title>
              <v-card-text>
                <!-- --------------------------------------table Main--------------------------------------------- -->
                <div class="cover-table">
                  <div class="table-invoice" style="position: relative">
                    <v-data-table
                      :headers="map_headers"
                      :items="datalist_main"
                      :hide-default-footer="true"
                      class="table_in_book1"
                      fixed-header
                      height="600px"
                      item-key="invoice_no"
                      id="invoice_book_1_wating_main"
                      :items-per-page="count_number"
                    >
                      <!-- remark main -->
                      <template v-slot:[`item.remark_main`]="{ item }">
                        <b-textarea
                          placeholder="remark"
                          v-model="item.remark_main"
                          rows="1"
                          max-rows="900"
                          style="border-radius: 0px;"
                          :disabled="
                            role_status == 'viewer' || role_status == 'admin'
                          "
                          @change="editRemark('REMARK_MAIN', item)"
                        ></b-textarea>
                      </template>
                      <!-- end remark main -->

                      <template v-slot:[`item.action_finance`]="{ item }">
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

                      <template v-slot:[`item.status_finance`]="{ item }">
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

                      <!-- <template v-slot:[`item.status_debt`]="{ item }">
                        <v-btn
                          outlined
                          color="warning"
                          v-if="item.status_debt === 'waiting'"
                          class="disable-events"
                        >
                          WAITING
                        </v-btn>
                        <v-btn
                          outlined
                          color="success"
                          v-if="item.status_debt === 'approve'"
                          class="disable-events"
                        >
                          approve
                        </v-btn>

                        <v-btn
                          outlined
                          color="primary"
                          v-if="
                            item.status_debt !== 'approve' &&
                              item.status_debt !== 'waiting'
                          "
                          class="disable-events"
                        >
                          {{ item.status_debt }}
                        </v-btn>
                      </template> -->

                      <!-- <template v-slot:[`item.status_sale`]="{ item }">
                        <v-btn
                          outlined
                          color="warning"
                          v-if="item.status_sale === 'waiting'"
                          class="disable-events"
                        >
                          WAITING
                        </v-btn>
                        <v-btn
                          outlined
                          color="success"
                          v-if="item.status_sale === 'approve'"
                          class="disable-events"
                        >
                          approve
                        </v-btn>

                        <v-btn
                          outlined
                          color="primary"
                          v-if="
                            item.status_sale !== 'approve' &&
                              item.status_sale !== 'waiting'
                          "
                          class="disable-events"
                        >
                          {{ item.status_sale }}
                        </v-btn>
                      </template> -->

                      <!-- <template v-slot:[`item.status_owner`]="{ item }">
                        <v-btn
                          outlined
                          color="warning"
                          v-if="item.status_owner === 'waiting'"
                          class="disable-events"
                        >
                          WAITING
                        </v-btn>
                        <v-btn
                          outlined
                          color="success"
                          v-if="item.status_owner === 'approve'"
                          class="disable-events"
                        >
                          approve
                        </v-btn>

                        <v-btn
                          outlined
                          color="primary"
                          v-if="
                            item.status_owner !== 'approve' &&
                              item.status_owner !== 'waiting'
                          "
                          class="disable-events"
                        >
                          {{ item.status_owner }}
                        </v-btn>
                      </template> -->

                      <template v-slot:[`item.detail`]="{ item }">
                        <v-btn
                          color="primary"
                          @click="
                            open_detail(item),
                              (dialog_info1 = true),
                              (search_book1 = '')
                          "
                          style="font-size: 12px"
                        >
                          Detail
                          <v-icon right dark>mdi-file-search-outline </v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
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
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
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
                <!-- ------------------------------------End table Main--------------------------------------------- -->
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

const orders = [
  {
    action_by_account_id: "",
    action_by_name: "",
    amount: null,
    aging: null,
    cus_criteria: null,
    collection_letter_first_date: null,
    collection_letter_second_date: null,
    created_at: null,
    customer_email: null,
    customer_name: null,
    customer_no: null,
    customer_pay: null,
    invoice_date: null,
    debt_number: null,
    deleted_at: null,
    due_date: null,
    end_date: null,
    finance_id: null,
    finance_name: null,
    finance_tel_no: null,
    invoice_no: null,
    invoice_uid: null,
    main_status: null,
    memo_date: null,
    memo_no: "",
    recheck: "",
    remain_day: null,
    sale_email: null,
    sale_id: null,
    sale_name: null,
    sale_team: null,
    seq: null,
    so_number: null,
    start_date: null,
    status: null,
    status_debt: null,
    status_down_service: null,
    status_finance: null,
    status_rpa: null,
    status_sale: null,
    uid: null,
  },
];

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    search_book1: "",
    dialog_info1: false,
    finish: true,
    item_per_page: 100,
    page: 1,
    page_total: 1,
    count_number: 1,
    role: "",
    wait_role: "",
    employee_id: "",
    first_name_th: "",
    search: "",
    map_headers: [],
    headers: [
      // {
      //   text: "Invoice No.",
      //   value: "invoice_no",
      //   width: "200px",
      //   sortable: true,
      //   class: "invoice1_waiting",
      // },
      {
        text: "Customer No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        class: "invoice1_waiting",
      },
      {
        text: "Customer Name.",
        value: "customer_name",
        width: "300px",
        sortable: true,
      },
      {
        text: "ระยะเวลาคงเหลือ",
        value: "remain_days",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Remark",
        value: "remark_main",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Status Finance",
        value: "action_finance",
        width: "150px",
        sortable: true,
        align: "center",
      },
    ],
    headers_modal: [
      {
        text: "Invoice No.",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        class: "invoice1_waiting",
      },
      {
        text: "คงค้างทั้งหมด",
        value: "aging",
        width: "200px",
        sortable: true,
      },
      {
        text: "Customer Criteria",
        value: "cus_criteria",
        width: "200px",
        sortable: true,
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
        width: "200px",
        sortable: true,
        align: "center",
      },
      // เพิ่ม service
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
        text: "Sale ID",
        value: "sale_id",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Sale Represent Name",
        value: "sale_name",
        width: "250px",
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
        text: "เลขที่ MEMO",
        value: "memo_no",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "จำนวนครั้งที่ทวงหนี้",
        value: "debt_number",
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
        width: "260px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 2",
        value: "collection_letter_second_date",
        width: "260px",
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
        width: "320px",
        sortable: true,
        align: "left",
      },
      {
        text: "เจ้าหน้าที่การเงิน",
        value: "finance_name",
        width: "250px",
        sortable: true,
        align: "left",
      },
      {
        text: "Remark",
        value: "remark_detail",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "Finance",
        value: "action",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Status Finance",
        value: "action_finance",
        width: "150px",
        sortable: true,
        align: "center",
      },
    ],

    // อยากให้อธิบายเพิ่ม
    status_finance: {
      text: "Status Finance Head",
      value: "status_finance",
      width: "180px",
      align: "center",
      sortable: false,
    },
    status_debt: {
      text: "Status Operation",
      value: "status_debt",
      width: "180px",
      align: "center",
      sortable: false,
    },
    status_sale: {
      text: "Status Sale",
      value: "status_sale",
      width: "180px",
      align: "center",
      sortable: false,
    },
    status_owner: {
      text: "Status Owner",
      value: "status_owner",
      width: "180px",
      align: "center",
      sortable: false,
    },
    // action: {
    //   text: "Action Finance",
    //   value: "action",
    //   width: "150px",
    //   align: "center",
    //   sortable: false,
    // },
    detail: {
      text: "Detail",
      value: "detail",
      width: "150px",
      align: "center",
      sortable: false,
    },
    customer_invoice_list: orders,
    datalist: [],
    datalist_main: [],
    name_open_dialog: null,
    headers_map_modal: [],
    list_approve_all: [],
    selected: [],
    selected_list: [],
    dialog_approve_all: false,
    check_approve: true,
    dialog_approve: false,
    dialog_approve_main: false,
    modal_approve: {
      wait_role: null,
      role: null,
      invoice_no: null,
      customer_no: null,
      customer_name: null,
      memo_no: null,
      status_sale: null,
      status_finance: null,
      status_debt: null,
      status_down_service: null,
    },
    detail_customer: "",
  }),
  created() {
    this.role_status = localStorage.getItem("role");
    this.wait_role = localStorage.getItem("wait_role");
    this.employee_id = localStorage.getItem("employee_id");
    this.first_name_th = localStorage.getItem("first_name_th");
    if (
      this.role_status != "super_admin" &&
      this.role_status != "wait_down_service" &&
      this.role_status != "viewer" &&
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
      this.getInvoice();
    } else {
      this.$router.push("/invoice");
    }
  },
  watch: {},
  computed: {},

  methods: {
    submit_all() {
      this.list_approve_all = [];
      for (let index = 0; index < this.selected.length; index++) {
        if (
          this.selected[index].status_finance == "waiting" ||
          this.selected[index].status_finance_head == "reject"
        ) {
          this.list_approve_all.push(this.selected[index]);
        }
      }
    },
    enterSelect() {
      localStorage.setItem("list_invoice", JSON.stringify(this.selected));
      this.selected_list = JSON.parse(localStorage.getItem("list_invoice"));
      for (let index = 0; index < this.selected_list.length; index++) {
        if (
          this.selected_list[index].status_finance == "waiting" ||
          this.selected[index].status_finance_head == "reject"
        ) {
          this.check_approve = false;
        } else {
          this.check_approve = true;
          break;
        }
      }
      if (this.selected_list.length == 0) {
        this.check_approve = true;
      }
    },
    close_approve() {
      this.list_approve_all = [];
      this.dialog_approve_all = false;
    },
    approve_service(key, invoice) {
      var Invall = [];
      for (let index = 0; index < this.list_approve_all.length; index++) {
        Invall.push(this.list_approve_all[index].invoice_no);
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
      if (key == "APPROVE_ALL") {
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
              this.open_detail(this.detail_customer);
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
      } else {
        this.axios
          .put(
            process.env.VUE_APP_API +
              "/debt/invoice/finance/approve/STATUS_FINANCE",
            {
              invoice_no: [invoice],
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
              this.open_detail(this.detail_customer);
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
      }
    },
    approve_modal(item) {
      this.modal_approve = item;
      this.modal_approve.role = localStorage.getItem("wait_role");
    },
    convert(item) {
      return Number(item).toLocaleString();
    },
    editRemark(status, data) {
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
      if (status == "REMARK_MAIN") {
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkmain/update",
            {
              customer_no: data.customer_no,
              remark_main: data.remark_main,
            },
            headers
          )
          .then((response) => {
            if (response) {
              this.finish = true;
              this.getInvoice();
            }
          });
      } else {
        this.axios
          .put(
            process.env.VUE_APP_API + "/debt/remarkdetail/update",
            {
              invoice_no: data.invoice_no,
              remark_detail: data.remark_detail,
            },
            headers
          )
          .then((response) => {
            if (response) {
              this.finish = true;
              this.open_detail(data);
            }
          });
      }
    },
    open_detail(item) {
      this.selected = [];
      this.selected_list = [];
      this.role_status = localStorage.getItem("role");
      this.wait_role = localStorage.getItem("wait_role");
      this.employee_id = localStorage.getItem("employee_id");
      this.name_open_dialog = item.customer_no + " - " + item.customer_name;
      this.detail_customer = item;
      this.map_headers = [...this.headers];
      this.finish = false;
      // this.page = 1;
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
          var header_modal = [];
          this.headers_map_modal = [];
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.role = response.data.role;
            // header_modal.push(this.action);

            // if (this.role !== "STATUS_SALE") {
            //   this.map_headers.push(this.status_sale);
            //   header_modal.push(this.status_sale);
            // }
            if (this.role !== "STATUS_FIANANCE") {
              this.map_headers.push(this.status_finance);
              header_modal.push(this.status_finance);
            }
            // if (this.role !== "STATUS_DEBT") {
            //   this.map_headers.push(this.status_debt);
            //   header_modal.push(this.status_debt);
            // }
            // this.map_headers.push(this.status_owner);
            this.map_headers.push(this.detail);
            // this.map_headers.push(this.action);

            // header_modal.push(this.status_owner);

            for (let i = 0; i < this.headers_modal.length; i++) {
              this.headers_map_modal.push(this.headers_modal[i]);
            }

            for (let index = 0; index < header_modal.length; index++) {
              this.headers_map_modal.push(header_modal[index]);
            }
            this.datalist = response.data.data;
          } else {
            this.finish = true;
            this.datalist = [];
          }
          // this.datalist = orders;
        });
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    getInvoice() {
      this.map_headers = [...this.headers];
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
            "/debt/customer/wait_down_service?size=" +
            this.item_per_page +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          var header_modal = [];
          this.headers_map_modal = [];
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.role = response.data.role;
            this.count_number = response.data.count;
            this.page_total = response.data.count_page;

            localStorage.setItem("wait_role", this.role);
            // header_modal.push(this.action);
            // if (this.role == "STATUS_SALE") {
            //   this.map_headers.push(this.status_sale);
            //   header_modal.push(this.status_sale);
            // }
            // if (this.role !== "STATUS_SALE") {
            //   this.map_headers.push(this.status_sale);
            //   header_modal.push(this.status_sale);
            // }
            if (this.role == "STATUS_FIANANCE") {
              this.map_headers.push(this.status_finance);
              header_modal.push(this.status_finance);
            }
            if (this.role !== "STATUS_FIANANCE") {
              this.map_headers.push(this.status_finance);
              header_modal.push(this.status_finance);
            }

            // if (this.role !== "STATUS_DEBT") {
            //   this.map_headers.push(this.status_debt);
            //   header_modal.push(this.status_debt);
            // }

            // if (this.role_status != "super_admin") {
            //   this.map_headers.push(this.status_owner);
            // }

            this.map_headers.push(this.detail);
            // this.map_headers.push(this.action);

            // header_modal.push(this.status_owner);

            for (let i = 0; i < this.headers_modal.length; i++) {
              this.headers_map_modal.push(this.headers_modal[i]);
            }

            for (let index = 0; index < header_modal.length; index++) {
              this.headers_map_modal.push(header_modal[index]);
            }
            var item_close = []
            response.data.data.forEach(x => {
              item_close.push(x)
            })
            const unique = [...new Map(item_close.slice().reverse().map(v => [v.customer_no, v])).values()].reverse()
            this.datalist_main = unique;
            // this.datalist_main = response.data.data;
          } else {
            this.finish = true;
            this.datalist_main = [];
          }
          // this.datalist = orders;
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

    item_per_page_inc() {
      this.getInvoice();
    },
    pageChange() {
      this.getInvoice();
    },
    searchWord() {
      this.page = 1;
      this.getInvoice();
    },
    clearFilter() {
      this.page = 1;
      this.search = "";
      this.getInvoice();
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
  height: 56px !important;
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
  // border-bottom: thin solid rgba(0, 0, 0, 0.12);
  /* padding-top: 7px; */
  vertical-align: middle;
}

th.text-start:first-child {
  position: sticky !important;
  width: 20px !important;
  left: 0px !important;
  z-index: 99 !important;
  padding-top: 14px;
  border-right: none !important;
  background: linear-gradient(
    90deg,
    #ececec 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
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

.fixed-invoice-book1 {
  position: sticky !important;
  left: 0px !important;
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
#invoice_book_1_wating_main {
  th.text-start.invoice1_waiting.sortable {
    position: sticky;
    left: 0px !important;
    z-index: 99 !important;
    padding-top: 14px;
    background: linear-gradient(
      90deg,
      #ececec 99%,
      rgba(101, 101, 101, 1) 100%
    ) !important;
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
  tbody {
    td.text-start {
      word-break: break-all;
      // position: sticky !important;
      left: 0px;
      top: auto;
      z-index: 2 !important;
      background-color: white;
    }

    td.text-center.fixed {
      word-break: break-all;
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      word-break: break-all;
      z-index: 0;
    }
    // ฟิกหลัก
    td.text-start:first-child {
      position: sticky;
      width: 20px !important;
      left: 0;
      z-index: 5 !important;
      padding-top: 14px;
      border-right: none !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
  }
}
#invoice_book_1_wating {
  th.text-start.invoice1_waiting.sortable {
    position: sticky;
    left: 55px !important;
    z-index: 5 !important;
    padding-top: 14px;
    background: linear-gradient(
      90deg,
      #ececec 99%,
      rgba(101, 101, 101, 1) 100%
    ) !important;
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
  tbody {
    td.text-start:nth-child(2) {
      word-break: break-all;
      position: sticky !important;
      left: 55px !important;
      top: auto;
      z-index: 2 !important;
      background-color: white;
      background: linear-gradient(90deg, #ffffff 99%, #656565 100%) !important;
    }

    td.text-center.fixed {
      word-break: break-all;
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      word-break: break-all;
      z-index: 0;
    }
    // ฟิกหลัก
    td.text-start:first-child {
      position: sticky !important;
      width: 20px !important;
      left: 0px !important;
      z-index: 5 !important;
      padding-top: 14px;
      border-right: none !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
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
