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
            <h3 style="font-weight:700">ดอกเบี้ย</h3>
          </v-col>
          <!---------------------------------- dialog ดอกเบี้ย ------------------------------->
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
                    <div style="width: 100px; color: #fffd9e">
                      (ดอกเบี้ย) : 
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
                      (dialog_info1 = false), (search_book1 = ''), getInterest()
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
                        color="primary"
                        @click="(open_interest = true), submit_all('interest')"
                        :disabled="
                          selected_1.length == 0 || role_status == 'admin' || role_status == 'viewer' || check_interest == false || this.selected_1.some(item => item.aging == 0)
                        "
                        style="margin-bottom: 10px"
                      >
                        INTEREST
                        <v-icon dark>mdi-checkbox-marked-circle</v-icon>
                      </v-btn>
                      <!-- || selected_1.some(item => item.status_rpa === 'interest') -->
                      <div style="width: 7px"></div>

                      <v-btn
                        text
                        color="error"
                        @click="(open_un_interest = true), submit_all('uninterest')"
                        :disabled="
                        selected_1.length == 0 ||role_status == 'admin' || role_status == 'viewer' || check_un_interest == false || this.selected_1.some(item => item.status_rpa === 'holdinterest')
                        "
                        style="margin-bottom: 10px"
                      >
                        UNINTEREST
                        <v-icon dark>mdi-close</v-icon>
                      </v-btn>

                      <div style="width: 7px"></div>

                      <v-btn
                        text
                        color="warning"
                        @click="(dialog_hold = true),submit_all('hold'),(status_hold = 'hold')
                        "
                        :disabled="
                          selected_1.length == 0 || role_status == 'admin' || role_status == 'viewer' 
                        "
                        style="margin-bottom: 10px"
                      >
                        HOLD INTEREST
                        <v-icon dark>mdi-alarm</v-icon>
                      </v-btn>

                      <div style="width: 7px"></div>
                      <v-btn
                        text
                        color="warning"
                        @click="
                          (dialog_hold = true),
                            submit_all('hold'),
                            (status_hold = 'unhold')
                        "
                        :disabled="
                          selected_1.length == 0 || role_status == 'admin' || role_status == 'viewer' 
                        "
                        style="margin-bottom: 10px"
                      >
                        UNHOLD INTEREST
                        <v-icon dark>mdi-alarm-off</v-icon>
                      </v-btn>
                      <div style="width: 7px"></div>

                      <v-spacer></v-spacer>
                      <div style="width: 400px">
                        <v-text-field
                          v-model="search_book1"
                          append-icon="mdi-magnify"
                          label="search"
                          single-line
                          hide-details
                          style="margin-bottom: 10px; margin-top: 0px"
                        ></v-text-field>
                      </div>
                    </div>
                    <!-- -----------------------------Hold selected---------------------------------------- -->
                    <v-dialog
                      v-model="dialog_hold"
                      persistent
                      max-width="1200"
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
                            <v-avatar color="warning" outlined size="30">
                              <v-icon v-if="status_hold == 'hold'" dark>
                                mdi-alarm
                              </v-icon>
                              <v-icon v-if="status_hold == 'unhold'" dark>
                                mdi-alarm-off
                              </v-icon>
                            </v-avatar>

                            <div
                              v-if="status_hold == 'hold'"
                              class="font-text"
                              style="color: orange"
                            >
                              Hold ข้อมูลดอกเบี้ย
                            </div>

                            <div
                              v-if="status_hold == 'unhold'"
                              class="font-text"
                              style="color: orange"
                            >
                              Unhold ข้อมูลดอกเบี้ย
                            </div>

                            <div
                              class="d-flex font-text"
                              style="
                                font-size: 18px;
                                padding-top: 10px;
                                padding-bottom: 20px;
                              "
                            >
                              Customer :&nbsp;
                              <div style="color: brown">
                                {{ name_open_dialog }}
                              </div>
                            </div>
                          </div>
                        </v-card-title>
                        <v-card-text>
                          <div class="font-text">
                            <div
                              class="font-text"
                              style="height: 250px; word-break: break-all"
                            >
                              <table id="table_select_modal_hold">
                                <tr style="font-weight: bold">
                                  <th style="width: 300px; padding: 5px">
                                    Invoice No&nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Amount &nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    Interest Start Date &nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    Interest End Date &nbsp;
                                  </th>
                                  <th style="width: 200px; padding: 5px">
                                    Day &nbsp;
                                  </th>
                                  <th style="width: 250px; padding: 5px">
                                    Interest Rate &nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Interest Amount &nbsp;
                                  </th>
                                </tr>

                                <tr
                                  v-for="(item, index) in modal_submit_all_2"
                                  :key="index"
                                  style="border-bottom: 1px solid gainsboro"
                                >
                                  <td style="width: 300px">
                                    {{ item.invoice_no }}
                                  </td>
                                  <td style="width: 300px">
                                    {{ item.aging }}
                                  </td>
                                  <td style="width: 350px">
                                    <div class="d-flex">
                                      {{parseDate(item.interest_start_date)}}
                                    </div>
                                  </td>
                                  <td style="width: 350px">
                                    <div class="d-flex">
                                      {{parseDate(item.interest_end_date)}}
                                     </div>
                                  </td>
                                  <td style="width: 200px">
                                    {{ item.interest_day }}
                                  </td>
                                  <td style="width: 250px">
                                    <div class="d-flex">
                                      {{item.interest_rate}}
                                    </div>
                                  </td>
                                  <td style="width: 300px">
                                    {{ convert(item.interest_amount) }}
                                  </td>
                                </tr>

                                <tr style="font-weight: bold">
                                  <td style="width: 300px; padding: 5px; color: #1143B0">
                                    Total Amount&nbsp;
                                  </td>
                                  <td style="width: 300px; padding: 5px; color: #1143B0">
                                    {{total_amount.toFixed(2)}} &nbsp;
                                  </td>
                                  <td style="width: 350px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 350px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 200px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 250px; padding: 5px; color: #E2304A">
                                    Total Interest &nbsp;
                                  </td>
                                  <td style="width: 300px; padding: 5px; color: #E2304A">
                                    {{total_interest.toFixed(2)}} &nbsp;
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
                            @click="dialog_hold = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            v-if="status_hold == 'hold'"
                            color="warning darken-1"
                            text
                            @click="(dialog_hold = false), hold(status_hold)"
                          >
                            hold interest
                          </v-btn>

                          <v-btn
                            v-if="status_hold == 'unhold'"
                            color="warning darken-1"
                            text
                            @click="(dialog_hold = false), hold(status_hold)"
                          >
                            unhold interest
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------end Hold selected---------------------------------------- -->

                    <!-- ----------------------------------Interest ----------------------------------------------- -->
                    <v-dialog
                      v-model="open_interest"
                      persistent
                      max-width="1300px"
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
                            <v-avatar color="#2F8297" outlined size="30">
                              <v-icon dark> mdi-calculator </v-icon>
                            </v-avatar>

                            <div class="font-text" style="color: #2F8297">
                              ข้อมูลการคิดดอกเบี้ย
                            </div>

                            <div
                              class="d-flex font-text"
                              style="
                                font-size: 18px;
                                padding-top: 10px;
                                padding-bottom: 20px;
                              "
                            >
                              Customer :&nbsp;
                              <div style="color: #313b71">
                                {{ name_open_dialog }}
                              </div>
                            </div>
                          </div>
                        </v-card-title>
                        <v-card-text>
                          <div
                            style="
                              
                              align-items: center;
                              justify-content: center;
                              text-align: center;
                              margin: auto;
                            "
                          ></div>
                        </v-card-text>

                        <v-card-text>
                          <div class="font-text">
                            <div
                              class="font-text"
                              style="height: 280px; word-break: break-all"
                            >
                              <table id="table_select_modal_interest">
                                <tr style="font-weight: bold">
                                  <th style="width: 300px; padding: 5px">
                                    Invoice No&nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Amount &nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    Interest Start Date &nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    Interest End Date &nbsp;
                                  </th>
                                  <th style="width: 200px; padding: 5px">
                                    Day &nbsp;
                                  </th>
                                  <th style="width: 250px; padding: 5px">
                                    Interest Rate &nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Interest Amount &nbsp;
                                  </th>
                                </tr>

                                <tr
                                  v-for="(item, index) in modal_submit_all_2"
                                  :key="index"
                                  style="border-bottom: 1px solid gainsboro"
                                >
                                  <td style="width: 300px">
                                    {{ item.invoice_no }}
                                  </td>
                                  <td style="width: 300px">
                                    <!-- {{ item.aging }} -->
                                    <div class="d-flex">
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="item.aging"
                                        @change="set_date()"
                                      />
                                    </div>
                                  </td>
                                  <td style="width: 350px">
                                    <div class="d-flex">
                                      <input
                                        type="date"
                                        class="form-control"
                                        placeholder="Select Date"
                                        v-model="item.interest_start_date"
                                        @change="set_date()"
                                      />
                                      <button
                                        class="btn"
                                        style="font-size: 18px"
                                        @click="clearDate_update_interest(item , 'start')"
                                      >
                                       <v-icon size="22px" color="#545454"> mdi-close </v-icon>
                                      </button>
                                    </div>
                                  </td>
                                  <td style="width: 350px">
                                    <div class="d-flex">
                                      <input
                                        type="date"
                                        class="form-control"
                                        placeholder="Select Date"
                                        v-model="item.interest_end_date"
                                        :min="item.interest_start_date"
                                        @change="set_date()"
                                      />
                                      <button
                                        class="btn"
                                        style="font-size: 18px"
                                        @click="clearDate_update_interest(item , 'end')"
                                      >
                                        <v-icon size="22px" color="#545454"> mdi-close </v-icon>
                                      </button>
                                    </div>
                                  </td>
                                  <td style="width: 200px">
                                    {{ item.interest_day }}
                                  </td>
                                  <td style="width: 250px">
                                    <div class="d-flex">
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="item.interest_rate"
                                        @change="set_date()"
                                      />
                                      <button
                                        class="btn"
                                        style="font-size: 18px"
                                        @click="clear_interest_rate(item.invoice_no)"
                                      >
                                        <v-icon size="22px" color="#545454"> mdi-close </v-icon>
                                      </button>
                                    </div>
                                  </td>
                                  <td style="width: 300px">
                                    {{ convert(item.interest_amount) }}
                                  </td>
                                </tr>

                                <tr style="font-weight: bold">
                                  <td style="width: 300px; padding: 5px; color: #1143B0">
                                    Total Amount&nbsp;
                                  </td>
                                  <td style="width: 300px; padding: 5px; color: #1143B0">
                                    {{total_amount.toFixed(2)}} &nbsp;
                                  </td>
                                  <td style="width: 350px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 350px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 200px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 250px; padding: 5px; color: #E2304A">
                                    Total Interest &nbsp;
                                  </td>
                                  <td style="width: 300px; padding: 5px; color: #E2304A">
                                    {{total_interest.toFixed(2)}} &nbsp;
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
                            @click="open_interest = false"
                          >
                            CLOSE
                          </v-btn>
                          <v-btn
                            color="#3874CB"
                            text
                            @click="(dialog_interest = false), interest()"
                          >
                            DONE
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------------End Interest--------------------------------------------- -->

                    <!-- ----------------------------------UnInterest ----------------------------------------------- -->
                    <v-dialog
                      v-model="open_un_interest"
                      persistent
                      max-width="1300px"
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
                            <v-avatar color="error" outlined size="30">
                              <v-icon dark> mdi-calculator </v-icon>
                            </v-avatar>

                            <div class="font-text" style="color: #ff3333">
                              ยกเลิกการบันทึกข้อมูลการคิดดอกเบี้ย
                            </div>

                            <div
                              class="d-flex font-text"
                              style="
                                justify-content: space-evenly;
                                font-size: 18px;
                                padding-top: 10px;
                                padding-bottom: 10px;
                              "
                            >
                              Customer :&nbsp;
                              <div style="color: #313b71">
                                {{ name_open_dialog }}
                              </div>
                            </div>
                          </div>
                        </v-card-title>
                        <v-card-text>
                          <div
                            style="
                              
                              align-items: center;
                              justify-content: center;
                              text-align: center;
                              margin: auto;
                            "
                          ></div>
                        </v-card-text>

                        <v-card-text>
                          <div class="font-text">
                            <div
                              class="font-text"
                              style="height: 280px; word-break: break-all"
                            >
                              <table id="table_select_modal_interest">
                                <tr style="font-weight: bold">
                                  <th style="width: 300px; padding: 5px">
                                    Invoice No&nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Amount &nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    Interest Start Date &nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    Interest End Date &nbsp;
                                  </th>
                                  <th style="width: 200px; padding: 5px">
                                    Day &nbsp;
                                  </th>
                                  <th style="width: 250px; padding: 5px">
                                    Interest Rate &nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    Interest Amount &nbsp;
                                  </th>
                                </tr>

                                <tr
                                  v-for="(item, index) in modal_submit_all_2"
                                  :key="index"
                                  style="border-bottom: 1px solid gainsboro"
                                >
                                  <td style="width: 300px">
                                    {{ item.invoice_no }}
                                  </td>
                                  <td style="width: 300px">
                                    {{ item.aging }}
                                  </td>
                                  <td style="width: 350px">
                                    <div class="d-flex">
                                    {{parseDate(item.interest_start_date)}}
                                    </div>
                                  </td>
                                  <td style="width: 350px">
                                    <div class="d-flex">
                                      {{parseDate(item.interest_end_date)}}
                                    </div>
                                  </td>
                                  <td style="width: 200px">
                                    {{ item.interest_day }}
                                  </td>
                                  <td style="width: 250px">
                                    <div class="d-flex">
                                      {{ item.interest_rate }}
                                    </div>
                                  </td>
                                  <td style="width: 300px">
                                    {{ convert(item.interest_amount) }}
                                  </td>
                                </tr>

                                <tr style="font-weight: bold">
                                  <td style="width: 300px; padding: 5px; color: #1143B0">
                                    Total Amount&nbsp;
                                  </td>
                                  <td style="width: 300px; padding: 5px; color: #1143B0">
                                    {{total_amount.toFixed(2)}} &nbsp;
                                  </td>
                                  <td style="width: 350px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 350px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 200px; padding: 5px">
                                    &nbsp;
                                  </td>
                                  <td style="width: 250px; padding: 5px; color: #E2304A">
                                    Total Interest &nbsp;
                                  </td>
                                  <td style="width: 300px; padding: 5px; color: #E2304A">
                                    {{total_interest.toFixed(2)}} &nbsp;
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="#3874CB"
                            text
                            @click="open_un_interest = false"
                          >
                            CLOSE
                          </v-btn>
                          <v-btn
                            color="error darken-1"
                            text
                            @click="(dialog_interest = false), un_interest()"
                          >
                            UNINTEREST
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------------End Interest--------------------------------------------- -->


                    <!-- -------------------------------------- Detail table --------------------------------------------- -->
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
                          <!-- ----------------------------------Filter ------------------------------------------------------ -->

                          <!-- -------------------------------------End Filter------------------------------------------------------------- -->
                          <template v-slot:[`item.invoice_no`]="{ item }">
                            {{ item.invoice_no }}
                          </template>
                          <template v-slot:[`item.aging`]="{ item }">
                            {{ convert(item.aging) }}
                          </template>
                          <!--------------------- New Requirement ----------------------->
                          <template v-slot:[`item.memo_date`]="{ item }">
                            <div class="d-flex">
                              <input
                                v-if="item.memo_date == '0000-00-00' || item.memo_date == '0001-01-01'"
                                type="date"
                                class="form-control"
                                style="border-color: #FF5252;"
                                v-model="item.memo_date"
                                placeholder="Select Date"
                                @change="EditModal(item)"
                                :disabled="
                                  item.status_rpa == 'submitted' ||
                                    (item.remain_day != '' &&
                                      item.status_rpa != 'waiting') ||
                                    role_status == 'admin' || role_status == 'viewer'
                                "
                                @click="set_default(item, 'memo_date')"
                              />
                              <input
                                v-else
                                type="date"
                                class="form-control"
                                v-model="item.memo_date"
                                placeholder="Select Date"
                                @change="EditModal(item)"
                                :disabled="
                                  item.status_rpa == 'submitted' ||
                                    (item.remain_day != '' &&
                                      item.status_rpa != 'waiting') ||
                                    role_status == 'admin' || role_status == 'viewer'
                                "
                                @click="set_default(item, 'memo_date')"
                              />
                              <!-- {{item.memo_date}} -->
                              <button
                                class="btn"
                                style="font-size: 18px"
                                @click="clearDate(item, 'memo_date')"
                                @change="EditModal(item)"
                                :disabled="
                                  item.status_rpa == 'submitted' ||
                                    (item.remain_day != '' &&
                                      item.status_rpa != 'waiting') ||
                                    role_status == 'admin' || role_status == 'viewer'
                                "
                              >
                                x
                              </button>
                            </div>
                          </template>
                          <template v-slot:[`item.memo_no`]="{ item }">
                            {{ item.memo_no }}
                          </template>
                          
                          <template v-slot:[`item.debt_number`]="{ item }">
                            {{ item.debt_number }}
                          </template>

                          <template v-slot:[`item.customer_pay`]="{ item }">
                            {{ item.customer_pay }}
                          </template>
                          <template
                            v-slot:[`item.collection_letter_first_date`]="{
                              item,
                            }"
                          >
                            {{ parseDate(item.collection_letter_first_date) }}
                          </template>
                          <template
                            v-slot:[`item.collection_letter_second_date`]="{
                              item,
                            }"
                          >
                            {{ parseDate(item.collection_letter_second_date) }}
                          </template>
                          <template v-slot:[`item.invoice_date`]="{ item }">
                            {{ parseDate(item.invoice_date) }}
                          </template>
                          <template v-slot:[`item.start_date`]="{ item }">
                            {{ parseDate(item.interest_start_date) }}
                          </template>
                          <template v-slot:[`item.end_date`]="{ item }">
                            {{ parseDate(item.interest_end_date) }}
                          </template>

                          <template v-slot:[`item.due_date`]="{ item }">
                            <div class="d-flex">
                              <input
                                type="date"
                                class="form-control"
                                v-model="item.due_date"
                                placeholder="Select Date"
                                @change="EditModal(item)"
                                :disabled="
                                  item.status_rpa == 'submitted' ||
                                    (item.remain_day != '' &&
                                      item.status_rpa != 'waiting') ||
                                    role_status == 'admin' || role_status == 'viewer'
                                "
                                @click="set_default(item, 'due_date')"
                              />
                              <!-- {{item.memo_date}} -->
                              <button
                                class="btn"
                                style="font-size: 18px"
                                @click="clearDate(item, 'due_date')"
                                @change="EditModal(item)"
                                :disabled="
                                  item.status_rpa == 'submitted' ||
                                    (item.remain_day != '' &&
                                      item.status_rpa != 'waiting') ||
                                    role_status == 'admin' || role_status == 'viewer'
                                "
                              >
                                x
                              </button>
                            </div>
                          </template>
                          <!-- แก้ อันเดิมเป็น customer_email -->
                          <template v-slot:[`item.customer_email`]="{ item }">
                            <b-textarea
                              v-if="item.customer_email != ''"
                              placeholder="Customer Email"
                              v-model="item.customer_email"
                              rows="1"
                              max-rows="900"
                              style="border-radius: 0px;"
                              :disabled="
                                item.status_rpa == 'submitted' ||
                                (item.remain_day != '' &&
                                item.status_rpa != 'waiting') ||
                                role_status == 'admin' || role_status == 'viewer'
                              "
                              @change="EditModal(item)"
                            ></b-textarea>
                            <b-textarea
                              v-else
                              placeholder="Customer Email"
                              v-model="item.customer_email"
                              rows="1"
                              max-rows="900"
                              style="border-radius: 0px; border-color: #FF5252;"
                              :disabled="
                                item.status_rpa == 'submitted' ||
                                (item.remain_day != '' &&
                                item.status_rpa != 'waiting') ||
                                role_status == 'admin' || role_status == 'viewer'
                              "
                              @change="EditModal(item)"
                            ></b-textarea>
                          </template>

                          <template v-slot:[`item.interest_amount`]="{ item }">
                            {{ convert(item.interest_amount) }}
                          </template>

                          <template v-slot:[`item.sale_email`]="{ item }">
                            <b-textarea
                              v-if="item.sale_email != ''"
                              placeholder="Sale Email"
                              v-model="item.sale_email"
                              rows="1"
                              max-rows="900"
                              style="border-radius: 0px;"
                              :disabled="
                                item.status_rpa == 'submitted' ||
                                (item.remain_day != '' &&
                                item.status_rpa != 'waiting') ||
                                role_status == 'admin' || role_status == 'viewer'
                              "
                              @change="EditModal(item)"
                            ></b-textarea>
                            <b-textarea
                              v-else
                              placeholder="Sale Email"
                              v-model="item.sale_email"
                              rows="1"
                              max-rows="900"
                              style="border-radius: 0px; border-color: #FF5252;"
                              :disabled="
                                item.status_rpa == 'submitted' ||
                                (item.remain_day != '' &&
                                item.status_rpa != 'waiting') ||
                                role_status == 'admin' || role_status == 'viewer'
                              "
                              @change="EditModal(item)"
                            ></b-textarea>
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
                              @change="editRemark('REMARK_DETAIL',item)"
                            ></b-textarea>
                          </template>
                          <!-- end remark detail-->
                          <template v-slot:[`item.status_rpa`]="{ item }">
                            <v-btn
                              outlined
                              color="warning"
                              v-if="item.status_rpa === 'waiting interest'"
                              class="disable-events"
                            >
                              waiting interest
                            </v-btn>
                            <v-btn
                              outlined
                              color="#2F8297"
                              v-if="item.status_rpa === 'interest'" 

                              class="disable-events"
                            >
                              interest
                            </v-btn>
                            <v-btn
                              outlined
                              color="warning"
                              v-if="item.status_rpa === 'waiting'"
                              class="disable-events"
                            >
                              WAITING
                            </v-btn>
                            <v-btn
                              outlined
                              color="warning"
                              v-if="item.status_rpa === 'holdinterest'"
                              class="disable-events"
                            >
                              hold
                            </v-btn>
                          </template>
                          
                        </v-data-table>
                      </div>
                    </div>
                    <!-- --------------------------------------end Detail table--------------------------------------------- -->
                  </v-card-text>
                </v-card>
              </v-col>
            </v-card>
          </v-dialog>

          <v-col cols="12">
            <v-card>
              <!-----------------------------Tab Log Interest/Interest ------------------------------------>
              <v-card-text>
                <v-tabs v-model="tab" background-color="transparent">
                  <v-tab v-for="(item, index) in tab_items" :key="index">
                    {{ item }}
                  </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <!-- --------------------------------------table Main INTEREST--------------------------------------------- -->
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_interest()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_interest"
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
                        @click="clearFilter_interest()"
                        class="screen"
                        style="font-size: 12px"
                      >
                        Clear All
                      </v-btn>
                    </v-card-title>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="headers_interest"
                          :items="datalist_interest"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          :single-select="singleSelect"
                          v-model="selected"
                          height="600px"
                          item-key="index"
                          id="invoice_book_2"
                          :items-per-page="datalist_interest.length"
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
                                @change="editRemarkInterest('REMARK_MAIN', item)"
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
                            v-model="item_per_page_table_interest"
                            @change="item_per_page_inc_table_interest()"
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
                            v-model="page_table_interest"
                            :length="page_total_table_interest"
                            :total-visible="10"
                            @input="pageChangeTable_interest()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- --------------------------------------end table Main INTEREST--------------------------------------------- -->
                  </v-tab-item>

                  <v-tab-item>
                    <!-- --------------------------------------table Main LOG INTEREST--------------------------------------------- -->
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_log_interest()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_log_interest"
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
                        @click="clearFilter_log_interest()"
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
                          :headers="headers"
                          :items="datalist_log_interest"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          :single-select="singleSelect"
                          v-model="selected"
                          height="600px"
                          item-key="index"
                          id="invoice_book_1"
                          :items-per-page="datalist_log_interest.length"
                        >
                          <!-- <template v-slot:[`item.invoice_no`]="{ item }">
                            {{ item.invoice_no }}
                          </template> -->

                          <!-- column Amount (VAT)  -->
                          <template  v-slot:[`item.amount`]="{ item }">
                            <p class="mb-0" :class="item.amount">
                              {{ formatNumber(item.amount) }}
                            </p>
                          </template>

                          <!-------column Interest Start Date-------->
                          <template v-slot:[`item.interest_start_date`]="{ item }">
                            <label
                              v-if="parseDate(item.interest_start_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.interest_start_date) }}</label
                            >
                          </template>
                          <!-------column Interest End Date-------->
                          <template v-slot:[`item.interest_end_date`]="{ item }">
                            <label
                              v-if="parseDate(item.interest_end_date) != '01/01/0001'"
                            >
                              {{ parseDate(item.interest_end_date) }}</label
                            >
                          </template>

                          <template #[`item.interest_amount`]="{ item }">
                            <p class="mb-0" :class="item.interest_amount">
                              {{ convert(item.interest_amount) }}
                            </p>
                          </template>
                          <!-------column request_date -------->
                          <template v-slot:[`item.request_date`]="{ item }">
                            <label
                              v-if="parseDate(item.request_date) != '01/01/0001'"
                            >
                              {{ parseDateApprove(item.request_date) }}</label
                            >
                          </template>
                            <template v-slot:[`item.remark`]="{ item }">
                              <b-textarea
                              class="ma-1"
                              placeholder="remark"
                              style="border-radius: 0px;"
                              v-model="item.remark"
                              rows="1"
                              max-rows="1"
                              disabled
                            ></b-textarea>
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
                            v-model="item_per_page_table_log_interest"
                            @change="item_per_page_inc_table_log_interest()"
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
                            v-model="page_table_log_interest"
                            :length="page_total_table_log_interest"
                            :total-visible="10"
                            @input="pageChangeTable_log_interest()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- ------------------------------------End table Main LOG INTEREST--------------------------------------------- -->
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
import Swal from "sweetalert2";

const orders = [
  {
    action_by_account_id: "",
    action_by_name: "",
    aging: null,
    cus_criteria: null,
    amount: null,
    collection_letter_first_date: null,
    collection_letter_second_date: null,
    created_at: null,
    // แก้ อันเดิมเป็น customer_email
    customer_email: null,
    //
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
    aging: 0,
    finish : true,
    Type_submitted: null,
    version: false,
    customer_name_eng: "",
    finance_name_eng: "",
    dialog_bill: false,
    dialog_start_date: false,
    dialog_end_date: false,
    dialog_due_date: false,
    dialog_memo_date: false,
    dialog_book_1: false,
    dialog_book_2: false,
    // ========================================================//
    dialog_info1: false,
    dialog_filter: false,
    notifications: false,
    dialog_submit: false,
    sound: true,
    widgets: false,
    search: "",
    singleSelect: false,
    selected_1: [],
    item_per_page: 100,
    page: 1,
    page_total: 1,
    count_invoice: 1,
    total_count: 0,
    sum_amount: 0,
    // ==================serach=====================
    filter_list: [],
    invoice_no: null,
    so_number: null,
    search_book1: "",
    text_start_date: "",
    // =============== end serach====================
    selected: [],
    selected_list: [],
    list_approve_all: [],
    name_open_dialog: "",
    check_confirm: true,
    check_confirm_up: true,
    check_request: true,
    dialog_approve_down_all: false,
    dialog_approve_up_all: false,
    dialog_request_up_all: false,
    dialog_approve: false,
    dialog_approve_up: false,
    // เพิ่มมาใหม่
    dialog_request_up: false,
    // สิ้นสุด
    remark: "",
    //interest
    tab: null,
    tab_items: ["INTEREST", "LOG INTEREST"],
    
    //LOG INTEREST
    search_log_interest: "",
    item_per_page_table_log_interest: 100,
    page_table_log_interest: 1,
    page_total_table_log_interest: 1,

    //INTEREST
    search_interest: "",
    item_per_page_table_interest: 100,
    page_table_interest: 1,
    page_total_table_interest: 1,
    // ==========serach====================
    modal_submit_all: [],
    set_memo: {
      memo_no: "",
      memo_date: "",
    },
    // =============headers_log_interest=================
    headers: [
      {
        text: "Invoice Number",
        value: "invoice_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      {
        text: "Customer Number",
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
        text: "Amount (VAT)",
        value: "amount",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Interest Start Date",
        value: "interest_start_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Interest End Date",
        value: "interest_end_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Day(Interest)",
        value: "interest_day",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Interest Rate",
        value: "interest_rate",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Interest Amount",
        value: "interest_amount",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Request Date",
        value: "request_date",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Status",
        value: "interest_status_rpa",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Invoice Interest No.",
        value: "invoice_interest_no",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Remark",
        value: "remark",
        width: "300px",
        align: "center",
        sortable: true,
      },
      {
        text: "User",
        value: "action_by_name",
        width: "300px",
        align: "center",
        sortable: true,
      },
    ],
    // =============headers_interest=================
    status: "interest",
    headers_interest: [
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
        width: "350px",
        sortable: true,
        align: "left",
      },
      {
        text: "จำนวนที่ออกดอกเบี้ย",
        value: "rpa_submit",
        align: "center",
        width: "170px",
        sortable: true,
      },
      {
        text: "ระยะเวลาที่ออกดอกเบี้ย",
        value: "period",
        width: "180px",
        sortable: true,
        align: "center",
      },
      {
        text: "Remark",
        value: "remark_main",
        align: "center",
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
        value: "interest_amount",
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
        text: "Status",
        value: "status_rpa",
        width: "200px",
        sortable: true,
        align: "center",
      },
    ],
    customer_invoice_list: orders,
    datalist: [],
    modal_submit_all_2: [],
    total_amount: 0,
    total_interest: 0,
    dialog_submit_all: false,
    dialog_un_submit_all: false,
    dialog_hold: false,
    status_hold: "unhold",
    modal_submit: {
      invoice_no: null,
      customer_no: null,
      customer_name: null,
      finance_name: null,
      memo_date: null,
      memo_no: null,
      status_rpa: null,
      sale_email: null,
      customer_email: null,
    },
    open_memo: false,
    open_letter_other: false,
    open_interest: false,
    open_un_interest: false,
    dialog_interest: false,
    invoice_book_close: false,
    open_edit_invoice_modal: {
      memo_no: "",
      memo_date: "",
    },
    memo_date_today: moment(new Date().toJSON()).format("YYYY-MM-DD"),
    date_now: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    set_debt_number: 3,
    list_submitted_all: [],
    check_submitted: true,
    check_submitted2: true,
    check_unsubmitted: true,
    check_down_service: true,
    check_interest: true,
    check_un_interest: true,
    check_hold_interest: true,
    check_unhold_interest: true,
    datalist_log_interest: [], //LOG INTEREST
    datalist_interest: [], //INTEREST
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
    this.wait_role = localStorage.getItem("wait_role");
    this.employee_id = localStorage.getItem("employee_id");
    if (
      this.role_status != "super_admin" &&
      this.role_status != "down_service" &&
      this.role_status != "viewer" &&
      this.role_status != "wait_down_service" &&
      this.role_status != "admin"
    ) {
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
      this.getLogInterest();
      this.getInterest();
      
    } else {
      this.$router.push("/login");
    }
  },
  watch: {},
  computed: {},

  methods: {
    enterSelect() {
      for (let index = 0; index < this.selected_1.length; index++) {
        if ( this.selected_1[index].status_rpa != "waiting") {
          this.check_un_interest = true;
        } else {
          this.check_un_interest = false;
          break;
        }
      }

      for (let index = 0; index < this.selected_1.length; index++) {
        if (this.selected_1[index].status_rpa != "interest") {
          this.check_interest = true;
        } else {
          this.check_interest = false;
          break;
        }
      }

      if (this.selected_1.length == 0) {
        this.check_interest = true;
        this.check_un_interest = true;
      }
    },
    // enterSelect() {
    //   let hasHoldInterest = this.selected_1.some(item => item.status_rpa === 'holdinterest');
    //   for (let index = 0; index < this.selected_1.length; index++) {
    //     if (this.selected_1[index].status_rpa !== "waiting") {
    //       this.check_un_interest = true;
    //     } else {
    //       this.check_un_interest = false;
    //       break;
    //     }
    //   }
    //   for (let index = 0; index < this.selected_1.length; index++) {
    //     if (this.selected_1[index].status_rpa !== "interest") {
    //       this.check_interest = true;
    //     } else {
    //       this.check_interest = false;
    //       break;
    //     }
    //   }
    //   if (hasHoldInterest) {
    //     this.check_un_interest = false;
    //   }
    // },
    set_update_interest(item , status) {
    if(status == 'start'){
      item.interest_start_date = moment(new Date()).format("YYYY-MM-DD");
    }else{
      item.interest_end_date = moment(new Date()).format("YYYY-MM-DD");
    }
    
    },
    clearDate_update_interest(item , status) {
      if(status == 'start'){
      item.interest_start_date = moment(this.date_now).format("YYYY-MM-DD");
      this.set_date();
    }else{
      item.interest_end_date = moment(this.date_now).format("YYYY-MM-DD");
      this.set_date();
    }
    },
    clear_interest_rate(item){
      this.modal_submit_all_2.forEach((element) =>{
        if(element.invoice_no == item){
          element.interest_rate = '1.5%'
          this.set_date();
        }
      })
    },
    set_date(){
      this.total_interest = 0;
      this.total_amount = 0;
      this.modal_submit_all_2.forEach((element) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(element.interest_end_date);
        const secondDate = new Date(element.interest_start_date);
        let day = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        element.interest_day = day + 1

        const xxx = element.interest_rate.split("%")
        const interest_rate = xxx[0]/100
        
        element.interest_amount = ((parseFloat(element.aging) * interest_rate)/30)*(day +1)
        element.interest_amount = parseFloat(element.interest_amount.toFixed(2))
        // element.interest_amount = (((element.amount * 0.015) / 30) * (day +1));
        this.total_interest += element.interest_amount;
        this.total_amount += parseFloat(element.aging);
        
      })
    },
    submit_all(status) {
      this.modal_submit_all_2 = [];
      this.total_amount = 0;
      this.total_interest = 0;
        this.selected_1.forEach((element) =>{
          const oneDay = 24 * 60 * 60 * 1000;
          const firstDate = new Date(element[status === "interest" ? 'start_date' : 'interest_start_date']);
          const secondDate = new Date(element[status === "interest" ? 'end_date' : 'interest_end_date']);
          let interest_day = Math.round(Math.abs((firstDate - secondDate) / oneDay));
          let interest_amount
          if (status === 'interest') {
            interest_amount = ((parseFloat(element.aging) * 0.015) / 30) * (interest_day + 1)
          } else {
            interest_amount = parseFloat(element.aging) * (element.interest_rate / 100) / 30 * (interest_day +1)
          }
          
          this.total_amount += parseFloat(element.aging);
          this.modal_submit_all_2.push({
            invoice_no : element.invoice_no,
            aging : parseFloat(element.aging),
            interest_start_date : moment(element[status === "interest" ? 'start_date' : 'interest_start_date']).format("YYYY-MM-DD"),
            interest_end_date : moment(element[status === "interest" ? 'end_date' : 'interest_end_date']).format("YYYY-MM-DD"),
            interest_day : interest_day + 1,
            interest_rate : status === "interest" ? '1.5%' : element.interest_rate,
            interest_amount : parseFloat(interest_amount.toFixed(2)),
          })
          this.total_interest += interest_amount;
        })
    },
    hold(stattus_hold) {
      var invoice_no = this.modal_submit_all_2.map(element => element.invoice_no);
      const payload = { invoice_no }
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let apiName = 'holdinterest'
      if (stattus_hold === 'hold') {
        apiName = 'holdinterest'
      } else if (stattus_hold === 'unhold') {
        apiName = 'waiting'
      }
      this.axios.put(process.env.VUE_APP_API + `/debt/rpa/interest/${apiName}`, payload, headers).then(() => {
        Swal.fire({
          icon: "success",
          title: "แก้ไข status ข้อมูลเรียบร้อย",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          this.openInvoice(this.selected_1[0]);
        });
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            timer: 3000,
          }).then(() => {});
        }
      });
      this.dialog_hold = false
    },
    // check_number(){
    //   if(this.set_debt_number < 3){
    //     this.set_debt_number = 3;
    //   }
      
    //   if(this.set_debt_number > 100){
    //     this.set_debt_number = 100;
    //   }
    // },
    set_default(item, name) {
      if (name == "due_date") {
        item.due_date = moment(new Date()).format("YYYY-MM-DD");
        this.EditModal(item);
        return item.due_date;
      }
      if (name == "memo_date") {
        item.memo_date = moment(new Date()).format("YYYY-MM-DD");
        this.EditModal(item);
        return item.memo_date;
      }
    },
    clearDate(item, name) {
      if (name == "memo_date") {
        item.memo_date = "0000-00-00";
      } else if (name == "due_date") {
        item.due_date = "0000-00-00";
      }
      this.EditModal(item);
    },

    // submit_modal(item) {
    //   this.modal_submit = item;
    // },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    convert(item) {
      return Number(item).toLocaleString();
    },
    // select_approve(item) {
    //   this.modal_approve = item;
    // },
    parseDate(date) {
      return date ? moment(date).format("DD-MM-YYYY") : "";
    },
    parseDateApprove(date) {
      return date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : "";
    },
    EditModal(item) {
      var bodyEdited = {
        invoice_uid: item.invoice_uid,
        invoice_no: item.invoice_no,
        customer_no: item.customer_no,
        customer_name: item.customer_name,
        customer_email: item.customer_email,
        email: item.customer_email,
        amount: item.amount,
        aging: item.aging,
        so_number: item.so_number,
        invoice_date: item.invoice_date,
        start_date: item.start_date,
        end_date: item.end_date,
        memo_date: new Date(item.memo_date).toJSON(),
        due_date: new Date(item.due_date).toJSON(),
        sale_name: item.sale_name,
        sale_id: item.sale_id,
        sale_team: item.sale_team,
        sale_email: item.sale_email,
        remark_detail: item.remark_detail,
        debt_number: item.debt_number,
        customer_pay: item.customer_pay,
        collection_letter_first_date: item.collection_letter_first_date,
        collection_letter_second_date: item.collection_letter_second_date,
        remain_day: item.remain_day,
        main_status: item.main_status,
        recheck: item.recheck,
        finance_id: item.finance_id,
        finance_name: item.finance_name,
        finance_tel_no: item.finance_tel_no,
        status: item.status,
      };

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
          process.env.VUE_APP_API + "/debt/inv/" + item.uid,
          bodyEdited,
          headers
        )
        .then(() => {
        });

        this.enterSelect()
    },

    un_interest(){
      var invoice_no = this.modal_submit_all_2.map(element => element.invoice_no);
        const payload = {
          invoice_no,
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
        this.axios.post(process.env.VUE_APP_API + "/debt/rpa/uninterest", payload, headers).then(() => {
          Swal.fire({
            icon: "success",
            title: "ยกเลิกข้อมูลเรียบร้อย",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            this.openInvoice(this.selected_1[0]);
          });
        })
        .catch((error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              timer: 3000,
            }).then(() => {});
          }
        });
        this.open_un_interest = false
    },

// ฟังก์ชั่นคำนวนข้อมูล interest
    interest() {
      const ref_invoice_no = this.modal_submit_all_2.map(item => {
        const obj = {
          invoice_no: item.invoice_no,
          aging: parseFloat(item.aging),
          interest_start_date: moment.utc(item.interest_start_date).format('YYYY-MM-DDTHH:mm:ss[Z]'),
          interest_end_date: moment.utc(item.interest_end_date).format('YYYY-MM-DDTHH:mm:ss[Z]'),
          interest_day: item.interest_day,
          interest_rate: Number(item.interest_rate.split('%')[0]),
          interest_amount: item.interest_amount
        }
        return obj
      })
      const payload = {
        customer_no: this.selected_1[0].customer_no.toString(),
        customer_name: this.selected_1[0].customer_name,
        ref_invoice_no,
        total_interest: this.total_interest.toString(),
        sale_id: this.selected_1[0].sale_id.toString(),
        sale_name: this.selected_1[0].sale_name,
        sale_team: this.selected_1[0].sale_team
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
      this.axios.post(process.env.VUE_APP_API + "/debt/rpa/interest", payload, headers).then(() => {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลเรียบร้อย",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          this.openInvoice(this.selected_1[0]);
        });
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            timer: 3000,
          }).then(() => {});
        }
      });
      this.open_interest = false
    },

    // ฟังก์ชั่นแสดงข้อมูล log interest
    getLogInterest() {
      this.finish = false;
      this.datalist_log_interest = [];
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
            "/debt/customer/log_interest?size=" +
            this.item_per_page_table_log_interest +
            "&page=" +
            this.page_table_log_interest +
            "&search=" +
            String(this.search_log_interest),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_log_interest = response.data.data;
            this.page_total_table_log_interest = response.data.count_page;
          } else {
            this.finish = true;
            this.page_total_table_log_interest = 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    // ฟังก์ชั่นแสดงข้อมูล interest
    getInterest(){
      this.finish = false;
      this.datalist_interest = [];
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
            "/debt/customer/debt_other?status=" +
            String(this.status) +
            "&size=" +
            this.item_per_page_table_interest +
            "&page=" +
            this.page_table_interest +
            "&search=" +
            String(this.search_interest),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_interest = response.data.data;
            this.page_total_table_interest = response.data.count_page;
          } else {
            this.finish = true;
            this.page_total_table_interest = 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    editRemarkInterest(status, data){
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
                this.getInterest();
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
                this.getLogInterest();
               }
            })
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
        .get(process.env.VUE_APP_API + "/debt/export/loginterest", headers)
        .then((response) => {
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_log_interest.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
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
            "/debt_other?rpa=interest",
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
    item_per_page_inc_table_log_interest() {
      this.getLogInterest();
    },
    item_per_page_inc_table_interest() {
      this.getInterest();
    },
    pageChangeTable_log_interest() {
      this.getLogInterest();
    },
    pageChangeTable_interest() {
      this.getInterest();
    },
    searchWord_log_interest() {
      this.page_table_log_interest = 1;
      this.getLogInterest();
    },
    clearFilter_log_interest() {
      this.page_table_log_interest = 1;
      this.search_log_interest = "";
      this.getLogInterest();
    },
    searchWord_interest() {
      this.page_table_interest = 1;
      this.getInterest();
    },
    clearFilter_interest() {
      this.page_table_interest = 1;
      this.search_interest = "";
      this.getInterest();
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

th.text-left.invoice1_modal.sortable {
  position: sticky;
  left: 56px !important;
  z-index: 10 !important;
  padding-top: 14px;
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
#table_select_modal_interest {
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
#table_select_modal_hold {
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: rgb(252, 240, 203);
    // border-bottom: 1px solid rgb(160, 160, 160);
    height: 30px;
  }
  td {
    height: 40px;
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
