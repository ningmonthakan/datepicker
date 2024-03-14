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
            <h3 style="font-weight: 700">หนังสือทวงหนี้ 1</h3>
          </v-col>

          <!-- <v-col cols="6">
            <v-card color="cyan" dark style="padding: 10px">
              <v-card-title style="display: block">
                Count
                <v-spacer></v-spacer>
                <label style="font-size: 1.2vw">{{ count_invoice }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

          <v-col cols="6">
            <v-card style="padding: 2px">
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
                    >Count
                  </label>
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
          <!-- 
          <v-col cols="6">
            <v-card color="primary" dark style="padding: 10px">
              <v-card-title style="display: block">
                Total
                <v-spacer></v-spacer>
                <label style="font-size: 1.2vw">{{ total_count }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

          <v-col cols="6">
            <v-card style="padding: 2px">
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
                    >Total
                  </label>
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

          <!-- <v-col cols="4">
            <v-card dark color="teal" style="padding: 10px">
              <v-card-title style="display: block">
                Amount
                <v-spacer></v-spacer>
                <label style="font-size: 1.2vw">{{ sum_amount }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

          <!---------------------------- dialog หนังสือทวงหนี้ ---------------------------------->
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
                    <div style="width: 180px; color: #fffd9e">
                      (หนังสือทวงหนี้ 1) :
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
                      (dialog_info1 = false), (search_book1 = ''), getInvoice()
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
                        @click="
                          (dialog_submit_all = true),
                            submit_all('submit'),
                            (Type_submitted = null)
                        "
                        :disabled="
                          check_submitted == true || role_status == 'admin' || role_status == 'viewer' || check_submitted2 == true
                        "
                        style="margin-bottom: 10px"
                      >
                        Submit
                        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                      </v-btn>
                      <div style="width: 7px"></div>
                      <v-btn
                        text
                        color="error"
                        @click="
                          (dialog_un_submit_all = true), submit_all('unsubmit')
                        "
                        :disabled="
                          check_unsubmitted == true || role_status == 'admin' || role_status == 'viewer'
                        "
                        style="margin-bottom: 10px"
                      >
                        Unsubmit
                        <v-icon dark> mdi-close</v-icon>
                      </v-btn>
                      <div style="width: 7px"></div>
                      <v-btn
                        text
                        color="warning"
                        @click="
                          (dialog_hold = true),
                            submit_all('hold'),
                            (status_hold = 'hold')
                        "
                        :disabled="
                          selected_1.length == 0 || role_status == 'admin' || role_status == 'viewer'
                        "
                        style="margin-bottom: 10px"
                      >
                        Hold
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
                        UnHold
                        <v-icon dark>mdi-alarm-off</v-icon>
                      </v-btn>
                      <div style="width: 7px"></div>
                      <v-btn
                        text
                        color="success"
                        @click="(open_memo = true), submit_all('memo')"
                        :disabled="
                          selected_1.length == 0 || role_status == 'admin' || role_status == 'viewer'
                        "
                        style="margin-bottom: 10px"
                      >
                        MEMO
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                      <!-- <div style="width: 7px"></div>
                      <v-btn
                        color="teal"
                        dark
                        style="margin-bottom: 10px"
                        @click="dialog_filter = !dialog_filter"
                      >
                        <v-icon dark> mdi-format-list-bulleted-square </v-icon>
                        <div style="width: 5px"></div>
                        Filter
                        <div style="width: 5px"></div>
                        <v-avatar right class="teal darken-4" size="25">
                          {{ filter_list.length }}
                        </v-avatar>
                      </v-btn>
                      <div style="width: 7px"></div>
                      <v-btn color="error" style="margin-bottom: 10px">
                        Clear Filter
                      </v-btn> -->
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

                    <!-- -------------------------------------Filter Modal----------------------------------- -->
                    <v-dialog
                      v-model="dialog_filter"
                      persistent
                      max-width="1400px"
                      scrollable
                    >
                      <v-card style="height: 550px">
                        <v-card-title>
                          <span
                            class="text-h5"
                            style="font-family: 'Bai_Jamjuree' !important"
                            >ค้นหาข้อมูลเพิ่มเติม</span
                          >
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row id="filter_modal">
                              <v-col cols="3">
                                Invoice Number
                                <v-autocomplete
                                  clearable
                                  label="Invoice Number"
                                  multiple
                                  :items="[
                                    '0',
                                    '1',
                                    '2',
                                    '3',
                                    '4',
                                    '5',
                                    '6',
                                    '7',
                                    '8',
                                    '9',
                                  ]"
                                  v-model="invoice_no"
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="3">
                                คงค้างทั้งหมด
                                <input
                                  class="form-control"
                                  label="คงค้างทั้งหมด"
                                  placeholder="คงค้างทั้งหมด"
                                  style="margin-top: 11px"
                                />
                              </v-col>
                              <v-col cols="3">
                                <v-dialog v-model="dialog_bill" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    วันที่เปิดบิล
                                    <input
                                      v-bind="attrs"
                                      v-on="on"
                                      class="form-control"
                                      label="วันที่เปิดบิล"
                                      placeholder="วันที่เปิดบิล"
                                      style="margin-top: 11px"
                                    />
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                      วันที่เปิดบิล
                                    </v-card-title>

                                    <v-card-text>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna aliqua.
                                      Ut enim ad minim veniam, quis nostrud
                                      exercitation ullamco laboris nisi ut aliquip
                                      ex ea commodo consequat. Duis aute irure
                                      dolor in reprehenderit in voluptate velit
                                      esse cillum dolore eu fugiat nulla pariatur.
                                      Excepteur sint occaecat cupidatat non
                                      proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog_bill = false"
                                      >
                                        I accept
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-col>
                              <v-col cols="3">
                                So Number
                                <v-autocomplete
                                  clearable
                                  label="So Number"
                                  multiple
                                  :items="[
                                    '00',
                                    '11',
                                    '22',
                                    '33',
                                    '44',
                                    '55',
                                    '66',
                                    '77',
                                    '88',
                                    '99',
                                  ]"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                <v-dialog v-model="dialog_start_date" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    Start Invoice Date
                                    <input
                                      v-bind="attrs"
                                      v-on="on"
                                      class="form-control"
                                      label="Start Invoice Date"
                                      placeholder="Start Invoice Date"
                                      style="margin-top: 11px"
                                    />
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                      Start Invoice Date
                                    </v-card-title>

                                    <v-card-text>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna aliqua.
                                      Ut enim ad minim veniam, quis nostrud
                                      exercitation ullamco laboris nisi ut aliquip
                                      ex ea commodo consequat. Duis aute irure
                                      dolor in reprehenderit in voluptate velit
                                      esse cillum dolore eu fugiat nulla pariatur.
                                      Excepteur sint occaecat cupidatat non
                                      proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog_start_date = false"
                                      >
                                        I accept
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-col>
                              <v-col cols="3">
                                <v-dialog v-model="dialog_end_date" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    Start End Date
                                    <input
                                      v-bind="attrs"
                                      v-on="on"
                                      class="form-control"
                                      label=" Start End Date"
                                      placeholder=" Start End Date"
                                      style="margin-top: 11px"
                                    />
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                      Start End Date
                                    </v-card-title>

                                    <v-card-text>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna aliqua.
                                      Ut enim ad minim veniam, quis nostrud
                                      exercitation ullamco laboris nisi ut aliquip
                                      ex ea commodo consequat. Duis aute irure
                                      dolor in reprehenderit in voluptate velit
                                      esse cillum dolore eu fugiat nulla pariatur.
                                      Excepteur sint occaecat cupidatat non
                                      proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog_end_date = false"
                                      >
                                        I accept
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-col>

                              <v-col cols="3">
                                <v-dialog v-model="dialog_due_date" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    Due Date
                                    <input
                                      style="margin-top: 11px"
                                      v-bind="attrs"
                                      v-on="on"
                                      class="form-control"
                                      label=" Start End Date"
                                      placeholder=" Start End Date"
                                    />
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                      Due Date
                                    </v-card-title>

                                    <v-card-text>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna aliqua.
                                      Ut enim ad minim veniam, quis nostrud
                                      exercitation ullamco laboris nisi ut aliquip
                                      ex ea commodo consequat. Duis aute irure
                                      dolor in reprehenderit in voluptate velit
                                      esse cillum dolore eu fugiat nulla pariatur.
                                      Excepteur sint occaecat cupidatat non
                                      proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog_due_date = false"
                                      >
                                        I accept
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-col>

                              <v-col cols="3">
                                วันที่รายการผ่าน
                                <v-autocomplete
                                  clearable
                                  label="วันที่รายการผ่าน"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                วันที่รายการผ่าน
                                <v-autocomplete
                                  clearable
                                  label="วันที่รายการผ่าน"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                วันที่รายการผ่าน
                                <v-autocomplete
                                  clearable
                                  label="วันที่รายการผ่าน"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                วันที่รายการผ่าน
                                <v-autocomplete
                                  clearable
                                  label="วันที่รายการผ่าน"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                <v-dialog v-model="dialog_memo_date" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    Memo Date
                                    <input
                                      v-bind="attrs"
                                      v-on="on"
                                      class="form-control"
                                      label=" Start Memo Date"
                                      placeholder=" Start Memo Date"
                                      style="margin-top: 11px"
                                    />
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                      Memo Date
                                    </v-card-title>

                                    <v-card-text>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna aliqua.
                                      Ut enim ad minim veniam, quis nostrud
                                      exercitation ullamco laboris nisi ut aliquip
                                      ex ea commodo consequat. Duis aute irure
                                      dolor in reprehenderit in voluptate velit
                                      esse cillum dolore eu fugiat nulla pariatur.
                                      Excepteur sint occaecat cupidatat non
                                      proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog_memo_date = false"
                                      >
                                        I accept
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-col>

                              <v-col cols="3">
                                เลขที่ MEMO
                                <input
                                  class="form-control"
                                  label="เลขที่ MEMO"
                                  placeholder="เลขที่ MEMO"
                                  style="margin-top: 11px"
                                />
                              </v-col>

                              <v-col cols="3">
                                จำนวนครั้ง
                                <input
                                  class="form-control"
                                  label="จำนวนครั้ง"
                                  placeholder="จำนวนครั้ง"
                                  style="margin-top: 11px"
                                />
                              </v-col>

                              <v-col cols="3">
                                จำนวนวัน
                                <input
                                  class="form-control"
                                  label="จำนวนวัน"
                                  placeholder="จำนวนวัน"
                                  style="margin-top: 11px"
                                />
                              </v-col>

                              <v-col cols="3">
                                <v-dialog v-model="dialog_book_1" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 1
                                    <input
                                      v-bind="attrs"
                                      v-on="on"
                                      class="form-control"
                                      label="วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 1"
                                      placeholder="วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 1"
                                      style="margin-top: 11px"
                                    />
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                      วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 1
                                    </v-card-title>

                                    <v-card-text>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna aliqua.
                                      Ut enim ad minim veniam, quis nostrud
                                      exercitation ullamco laboris nisi ut aliquip
                                      ex ea commodo consequat. Duis aute irure
                                      dolor in reprehenderit in voluptate velit
                                      esse cillum dolore eu fugiat nulla pariatur.
                                      Excepteur sint occaecat cupidatat non
                                      proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog_book_1 = false"
                                      >
                                        I accept
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-col>

                              <v-col cols="3">
                                <v-dialog v-model="dialog_book_2" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 2
                                    <input
                                      v-bind="attrs"
                                      v-on="on"
                                      class="form-control"
                                      label="วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 2"
                                      placeholder="วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 2"
                                      style="margin-top: 11px"
                                    />
                                  </template>

                                  <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                      วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 2
                                    </v-card-title>

                                    <v-card-text>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna aliqua.
                                      Ut enim ad minim veniam, quis nostrud
                                      exercitation ullamco laboris nisi ut aliquip
                                      ex ea commodo consequat. Duis aute irure
                                      dolor in reprehenderit in voluptate velit
                                      esse cillum dolore eu fugiat nulla pariatur.
                                      Excepteur sint occaecat cupidatat non
                                      proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog_book_2 = false"
                                      >
                                        I accept
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-col>

                              <v-col cols="3">
                                ระยะเวลาคงเหลือ
                                <input
                                  class="form-control"
                                  label="ระยะเวลาคงเหลือ"
                                  placeholder="ระยะเวลาคงเหลือ"
                                  style="margin-top: 11px"
                                />
                              </v-col>

                              <v-col cols="3">
                                Mainstatus
                                <v-autocomplete
                                  clearable
                                  label="Mainstatus"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                Recheck
                                <v-autocomplete
                                  clearable
                                  label="Recheck"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                Sale Name
                                <v-autocomplete
                                  clearable
                                  label="Sale Name"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                Team Sale 
                                <v-autocomplete
                                  clearable
                                  label="Team Sale"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>


                              <v-col cols="3">
                                Email Sale
                                <input
                                  class="form-control"
                                  label=" Email Sale"
                                  placeholder=" Email Sale"
                                  style="margin-top: 11px"
                                />
                              </v-col>

                              <v-col cols="3">
                                Email ลูกค้า
                                <input
                                  class="form-control"
                                  label="Email ลูกค้า"
                                  placeholder="Email ลูกค้า"
                                  style="margin-top: 11px"
                                />
                              </v-col>

                              <v-col cols="3">
                                เจ้าหน้าที่การเงิน
                                <v-autocomplete
                                  clearable
                                  label="เจ้าหน้าที่การเงิน"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>

                              <v-col cols="3">
                                Status
                                <v-autocomplete
                                  clearable
                                  label="Status"
                                  multiple
                                  :items="['00', '11', '22', '33']"
                                  v-model="so_number"
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-container>
                          <!-- <small></small> -->
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog_filter = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog_filter = false"
                          >
                            Search
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- ----------------------------------End Filter Modal----------------------------------- -->
                    <!-- ----------------------------- dialog ปุ่ม submit ในตาราง ---------------------------------------- -->
                    <v-dialog
                      v-model="dialog_submit"
                      scrollable
                      persistent
                      max-width="650"
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

                            <div class="font-text">ยืนยันการบันทึกข้อมูล</div>
                          </div>
                        </v-card-title>
                        <v-card-text
                          style="padding-left: 7%; padding-top: 2%; height: 430px"
                        >
                          <div class="font-text">
                            <div
                              class="d-flex font-text"
                              style="width: 100%; height: 36px"
                            >
                              <div style="width: 100%; display: flex">
                                <div style="font-weight: bold">
                                  Invoice No :&nbsp;
                                </div>
                                {{ modal_submit.invoice_no }}
                              </div>
                              <!-- <div div style="width: 50%;display: flex;">
                                <div style="font-weight: bold">
                                  Customer No :&nbsp;
                                </div>
                                {{ modal_submit.customer_no }}
                              </div> -->
                            </div>

                            <div class="d-flex font-text" style="height: 36px">
                              <div style="font-weight: bold">
                                Customer No :&nbsp;
                              </div>
                              {{ modal_submit.customer_no }}
                            </div>

                            <div
                              style="
                                display: flex;
                                align-items: center;
                                height: 36px;
                                margin-bottom: 10px;
                              "
                            >
                              <div style="font-weight: bold">Version :&nbsp;</div>
                              Thai &nbsp;&nbsp;

                              <v-switch
                                v-model="Type_submitted"
                                color="success"
                                value="ENG"
                                hide-details
                                style="width: 45px; margin: 0"
                                @change="type_change()"
                              ></v-switch>
                              &nbsp;&nbsp;English
                            </div>

                            <div class="d-flex font-text" style="height: 36px">
                              <div style="font-weight: bold; width: 125px">
                                Customer Name :&nbsp;
                              </div>
                              {{ modal_submit.customer_name }}
                            </div>

                            <div class="font-text">
                              <div
                                style="font-weight: bold"
                                v-bind:style="{
                                  display: Type_submitted == 'ENG' ? '' : 'none',
                                }"
                              >
                                Customer Name(English) :&nbsp;
                              </div>
                              <!-- 
                              <input
                                style="width: 100%"
                                placeholder="Customer Name(English)"
                                v-bind:style="{
                                  display: Type_submitted == 'ENG' ? '' : 'none',
                                }"
                                class="form-control"
                                v-model="customer_name_eng"
                              /> -->
                              <b-textarea
                                rows="2"
                                max-rows="100"
                                style="width: 100%; border-radius: 0px;"
                                placeholder="Customer Name(English)"
                                v-bind:style="{
                                  display: Type_submitted == 'ENG' ? '' : 'none',
                                }"
                                class="form-control"
                                v-model="customer_name_eng"
                              ></b-textarea>
                            </div>

                            <div class="d-flex font-text" style="height: 36px">
                              <div style="font-weight: bold">
                                Finance Name :&nbsp;
                              </div>
                              {{ modal_submit.finance_name }}
                            </div>

                            <div class="-text">
                              <div
                                style="font-weight: bold"
                                v-bind:style="{
                                  display: Type_submitted == 'ENG' ? '' : 'none',
                                }"
                              >
                                Finance Name(English) :&nbsp;
                              </div>
                              <!-- <input
                                style="width: 100%"
                                placeholder="Finance Name(English)"
                                v-bind:style="{
                                  display: Type_submitted == 'ENG' ? '' : 'none',
                                }"
                                class="form-control"
                                v-model="finance_name_eng"
                              /> -->

                              <b-textarea
                                rows="2"
                                max-rows="100"
                                style="width: 100%; border-radius: 0px;"
                                placeholder="Finance Name(English)"
                                v-bind:style="{
                                  display: Type_submitted == 'ENG' ? '' : 'none',
                                }"
                                class="form-control"
                                v-model="finance_name_eng"
                              ></b-textarea>
                            </div>

                            <div
                              class="d-flex"
                              style="margin-top: 5px; width: 100%; height: 36px"
                            >
                              <div style="width: 100%; display: flex">
                                <div style="font-weight: bold">
                                  เลขที่ MEMO :&nbsp;
                                </div>
                                {{ modal_submit.memo_no }}
                              </div>
                            </div>

                            <div
                              class="d-flex"
                              style="width: 250px; height: 36px"
                            >
                              <div style="font-weight: bold">
                                วันที่ MEMO :&nbsp;
                              </div>
                              {{ parseDate(modal_submit.memo_date) }}
                            </div>

                            <div class="d-flex" style="width: auto; height: 36px">
                              <!-- แก้ อันเดิมเป็น customer_email-->
                              <div style="font-weight: bold;">
                                Customer Email :&nbsp;
                              </div>
                              {{ modal_submit.customer_email }}
                            </div>

                            <div
                              class="d-flex"
                              style="width: 250px; height: 36px"
                            >
                              <div style="font-weight: bold">
                                Sale Email :&nbsp;
                              </div>
                              {{ modal_submit.sale_email }}
                            </div>

                            <div class="d-flex font-text" style="height: 36px">
                              <div style="font-weight: bold">สถานะ :&nbsp;</div>
                              <div
                                style="color: orange"
                                v-if="modal_submit.status_rpa !== 'submitted'"
                              >
                                {{ modal_submit.status_rpa }}
                              </div>
                              <div
                                style="color: green"
                                v-if="modal_submit.status_rpa == 'submitted'"
                              >
                                {{ modal_submit.status_rpa }}
                              </div>
                            </div>

                            <div
                              style="
                                display: flex;
                                align-items: center;
                                margin-top: 10px;
                              "
                            ></div>
                          </div>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="error darken-1"
                            text
                            @click="dialog_submit = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="
                              (dialog_submit = false), SubmitInvoice(modal_submit)
                            "
                            :disabled="
                              Type_submitted == 'ENG' &&
                                (customer_name_eng == '' ||
                                  finance_name_eng == '')
                            "
                          >
                            submit
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------end submitted---------------------------------------- -->

                    <!-- ----------------------------- dialog ปุ่ม submit ข้างบนตาราง---------------------------------------- -->
                    <v-dialog
                      v-model="dialog_submit_all"
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
                            <v-avatar color="success" outlined size="30">
                              <v-icon dark> mdi-check </v-icon>
                            </v-avatar>

                            <div class="font-text" style="color: darkgreen">
                              ยืนยันการบันทึกข้อมูล
                            </div>

                            <div
                              class="d-flex font-text"
                              style="font-size: 18px; padding-top: 10px"
                            >
                              Customer :&nbsp;
                              <div style="color: darkblue">
                                {{ name_open_dialog }}
                              </div>
                            </div>
                          </div>
                          <div style="width: 100%">
                            <div
                              style="
                                display: flex;
                                align-items: center;
                                font-size: 14px;
                                justify-content: center;
                              "
                              class="font-text"
                            >
                              <div style="font-weight: bold">Version :&nbsp;</div>
                              Thai &nbsp;&nbsp;

                              <v-switch
                                v-model="Type_submitted"
                                color="success"
                                value="ENG"
                                hide-details
                                style="width: 45px; margin: 0"
                                @change="type_change()"
                              ></v-switch>
                              &nbsp;&nbsp;English
                            </div>
                          </div>
                          <div
                            class="font-text"
                            v-bind:style="{
                              display: Type_submitted == 'ENG' ? '' : 'none',
                            }"
                            style="width: 100%"
                          >
                            <!-- <input
                                style="width: 48%"
                                placeholder="Customer Name(English)"
                                v-bind:style="{
                                  display: Type_submitted == 'ENG' ? '' : 'none',
                                }"
                                class="form-control"
                                v-model="customer_name_eng"
                              /> -->
                            <div
                              class="d-flex"
                              style="
                                width: 100%;
                                height: auto;
                                justify-content: space-between;
                              "
                            >
                              <div style="width: 100%">
                                <label style="font-size: 13px; font-weight: bold"
                                  >Customer Name (English) :</label
                                >
                                <b-textarea
                                  placeholder="Customer Name(English)"
                                  v-model="customer_name_eng"
                                  rows="2"
                                  max-rows="100"
                                  style="width: 99%; font-size: 13px; border-radius: 0px;"
                                ></b-textarea>
                              </div>
                              <div style="width: 100%">
                                <label style="font-size: 13px; font-weight: bold"
                                  >Finanace Name (English) :</label
                                >
                                <b-textarea
                                  placeholder="Finance Name(English)"
                                  v-model="finance_name_eng"
                                  rows="2"
                                  max-rows="100"
                                  style="width: 99%; font-size: 13px; border-radius: 0px;"
                                ></b-textarea>
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
                              <table id="table_select_modal">
                                <tr style="font-weight: bold">
                                  <th style="width: 180px">Invoice No&nbsp;</th>
                                  <th style="width: 180px">เลขที่ MEMO &nbsp;</th>
                                  <th style="width: 180px">วันที่ MEMO&nbsp;</th>
                                  <th style="width: 180px; text-align: center">
                                    จำนวนครั้งที่ทวงหนี้&nbsp;
                                  </th>
                                  <!-- <th style="width: 180px; text-align: center">
                                    ระยะเวลาคงเหลือ&nbsp;
                                  </th> -->
                                  <th style="width: 250px; text-align: center">
                                    เจ้าหน้าที่การเงิน&nbsp;
                                  </th>
                                  <th style="width: 250px">Email ลูกค้า&nbsp;</th>

                                  <th style="width: 120px">Status&nbsp;</th>
                                </tr>

                                <tr
                                  v-for="item in list_submitted_all"
                                  :key="item.invoice_no"
                                  style="border-bottom: 1px solid gainsboro"
                                >
                                  <td style="width: 180px">
                                    {{ item.invoice_no }}
                                  </td>
                                  <td style="width: 180px">
                                    {{ item.memo_no }}
                                  </td>
                                  <td style="width: 180px">
                                    {{ parseDate(item.memo_date) }}
                                  </td>
                                  <td style="width: 180px; text-align: center">
                                    {{ item.debt_number }}
                                  </td>
                                  <!-- <td style="width: 150px; text-align: center">
                                    {{ item.remain_day }}
                                    
                                  </td> -->
                                  <td style="width: 250px; text-align: center">
                                    {{ item.finance_name }}
                                  </td>
                                  <td style="width: 200px; padding-right: 10px">
                                    {{ item.customer_email }}
                                  </td>

                                  <td style="width: 120px">
                                    <label
                                      v-if="item.status_rpa == 'submitted'"
                                      style="color: green"
                                      >{{ item.status_rpa }}</label
                                    >
                                    <label
                                      v-if="item.status_rpa != 'submitted'"
                                      style="color: orange"
                                      >{{ item.status_rpa }}</label
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
                            @click="dialog_submit_all = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            :disabled="
                              Type_submitted == 'ENG' &&
                                (customer_name_eng == '' ||
                                  finance_name_eng == '')
                            "
                            color="green darken-1"
                            text
                            @click="
                              (dialog_submit_all = false),
                                SubmitInvoiceMain('submitted')
                            "
                          >
                            submit
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------end dialog ปุ่ม submit ข้างบนตาราง ---------------------------------------- -->

                    <!-- ----------------------------- dialog Un - submitted selected---------------------------------------- -->
                    <v-dialog
                      v-model="dialog_un_submit_all"
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
                            <v-avatar color="error" outlined size="30">
                              <v-icon dark> mdi-close </v-icon>
                            </v-avatar>

                            <div class="font-text" style="color: darkred">
                              ยกเลิกการบันทึกข้อมูล
                            </div>

                            <div
                              class="d-flex font-text"
                              style="font-size: 18px; padding-top: 10px"
                            >
                              Customer :&nbsp;
                              <div style="color: darkblue">
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
                              <table id="table_select_modal">
                                <tr style="font-weight: bold">
                                  <th style="width: 180px">Invoice No&nbsp;</th>
                                  <th style="width: 180px">เลขที่ MEMO &nbsp;</th>
                                  <th style="width: 180px">วันที่ MEMO&nbsp;</th>
                                  <!-- <th style="width: 180px; text-align: center">
                                    จำนวนครั้งที่ทวงหนี้&nbsp;
                                  </th> -->
                                  <th style="width: 180px; text-align: center">
                                    ระยะเวลาคงเหลือ&nbsp;
                                  </th>
                                  <th style="width: 250px; text-align: center">
                                    เจ้าหน้าที่การเงิน&nbsp;
                                  </th>
                                  <th style="width: 250px">Email ลูกค้า&nbsp;</th>

                                  <th style="width: 120px">Status&nbsp;</th>
                                </tr>

                                <tr
                                  v-for="item in list_submitted_all"
                                  :key="item.invoice_no"
                                  style="border-bottom: 1px solid gainsboro"
                                >
                                  <td style="width: 180px">
                                    {{ item.invoice_no }}
                                  </td>
                                  <td style="width: 180px">
                                    {{ item.memo_no }}
                                  </td>
                                  <td style="width: 180px">
                                    {{ parseDate(item.memo_date) }}
                                  </td>
                                  <!-- <td style="width: 180px; text-align: center">
                                    {{ item.debt_number }}
                                  </td> -->
                                  <td style="width: 180px; text-align: center">
                                    {{ item.remain_day }}
                                  </td>
                                  <td style="width: 250px; text-align: center">
                                    {{ item.finance_name }}
                                  </td>
                                  <td style="width: 200px; padding-right: 10px">
                                    {{ item.customer_email }}
                                  </td>

                                  <td style="width: 120px">
                                    <label
                                      v-if="item.status_rpa == 'submitted'"
                                      style="color: green"
                                      >{{ item.status_rpa }}</label
                                    >
                                    <label
                                      v-if="item.status_rpa != 'submitted'"
                                      style="color: orange"
                                      >{{ item.status_rpa }}</label
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
                            color="primary darken-1"
                            text
                            @click="dialog_un_submit_all = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="error darken-1"
                            text
                            @click="
                              (dialog_un_submit_all = false),
                                SubmitInvoiceMain('unsubmitted')
                            "
                          >
                            unsubmit
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------end UN-submitted selected---------------------------------------- -->

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
                              Holding ข้อมูล
                            </div>

                            <div
                              v-if="status_hold == 'unhold'"
                              class="font-text"
                              style="color: orange"
                            >
                              Unhold ข้อมูล
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
                                  <th style="width: 180px">Invoice No&nbsp;</th>
                                  <th style="width: 180px">เลขที่ MEMO &nbsp;</th>
                                  <th style="width: 180px">วันที่ MEMO&nbsp;</th>
                                  <!-- <th style="width: 180px; text-align: center">
                                    จำนวนครั้งที่ทวงหนี้&nbsp;
                                  </th> -->
                                  <th style="width: 180px; text-align: center">
                                    ระยะเวลาคงเหลือ&nbsp;
                                  </th>
                                  <th style="width: 250px">
                                    เจ้าหน้าที่การเงิน&nbsp;
                                  </th>
                                  <th style="width: 250px">Email ลูกค้า&nbsp;</th>

                                  <th style="width: 120px">Status&nbsp;</th>
                                </tr>

                                <tr
                                  v-for="item in modal_submit_all"
                                  :key="item.invoice_no"
                                  style="border-bottom: 1px solid gainsboro"
                                >
                                  <td style="width: 180px">
                                    {{ item.invoice_no }}
                                  </td>
                                  <td style="width: 180px">
                                    {{ item.memo_no }}
                                  </td>
                                  <td style="width: 180px">
                                    {{ parseDate(item.memo_date) }}
                                  </td>
                                  <!-- <td style="width: 180px; text-align: center">
                                    {{ item.debt_number }}
                                  </td> -->
                                  <td style="width: 180px; text-align: center">
                                    {{ item.remain_day }}
                                  </td>
                                  <td style="width: 200px; padding-right: 10px">
                                    {{ item.finance_name }}
                                  </td>

                                  <td style="width: 200px; padding-right: 10px">
                                    {{ item.customer_email }}
                                  </td>

                                  <td style="width: 120px">
                                    <label
                                      v-if="item.status_rpa == 'submitted'"
                                      style="color: green"
                                      >{{ item.status_rpa }}</label
                                    >
                                    <label
                                      v-if="item.status_rpa != 'submitted'"
                                      style="color: orange"
                                      >{{ item.status_rpa }}</label
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
                            @click="dialog_hold = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            v-if="status_hold == 'hold'"
                            color="warning darken-1"
                            text
                            @click="(dialog_hold = false), holding(status_hold)"
                          >
                            hold
                          </v-btn>

                          <v-btn
                            v-if="status_hold == 'unhold'"
                            color="warning darken-1"
                            text
                            @click="(dialog_hold = false), holding(status_hold)"
                          >
                            unhold
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------end Hold selected---------------------------------------- -->

                    <!-- ----------------------------------MEMO ----------------------------------------------- -->
                    <v-dialog
                      v-model="open_memo"
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
                            <v-avatar color="success" outlined size="30">
                              <v-icon dark> mdi-pencil </v-icon>
                            </v-avatar>

                            <div class="font-text" style="color: green">
                              แก้ไขข้อมูล MEMO
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
                                v-model="set_memo.memo_no"
                              />
                            </div>
                            <div style="width: 10px"></div>
                            <div
                              class="d-flex"
                              style="align-items: center; justify-content: center"
                            >
                              <div style="width: 100px; font-size: 16px">
                                วันที่ MEMO :
                              </div>

                              <div class="d-flex">
                                <input
                                  style="width: 230px"
                                  type="date"
                                  class="form-control"
                                  placeholder="Select Date"
                                  v-model="set_memo.memo_date"
                                  @click="set_update_memo(set_memo)"
                                />
                                <!-- {{item.memo_date}} -->
                                <button
                                  class="btn"
                                  style="font-size: 18px"
                                  @click="clearDate_update_memo(set_memo)"
                                >
                                  x
                                </button>
                              </div>
                            </div>
                            <div style="width: 20px"></div>
                            <div style="width: 10px">
                              <v-btn
                                style="height: 48px; width: 100px"
                                color="primary"
                                @click="edit_memo_modal()"
                                outlined
                              >
                                Save
                                <v-icon dark> mdi-pencil </v-icon>
                              </v-btn>
                            </div>
                          </div>
                        </v-card-title>

                        <v-card-text>
                          <div class="font-text">
                            <div
                              class="font-text"
                              style="height: 280px; word-break: break-all"
                            >
                              <table id="table_select_modal_memo">
                                <tr style="font-weight: bold">
                                  <th style="width: 300px; padding: 5px">
                                    Invoice No&nbsp;
                                  </th>
                                  <th style="width: 350px; padding: 5px">
                                    เลขที่ MEMO &nbsp;
                                  </th>
                                  <th style="width: 300px; padding: 5px">
                                    วันที่ MEMO &nbsp;
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
                                    {{ item.memo_no }}
                                    <!-- <input
                                      class="form-control"
                                      v-model="item.memo_no"
                                      placeholder="เลขที่ MEMO"
                                      :disabled="
                                        item.status_rpa == 'submitted' ||
                                          item.remain_day != '' ||
                                          role_status == 'viewer'
                                      "
                                      @change="EditModal(item)"
                                    /> -->
                                  </td>
                                  <td style="width: 300px">
                                    {{item.memo_date}}
                                    <!-- <div class="d-flex">
                                      <input
                                        type="date"
                                        class="form-control"
                                        v-model="item.memo_date"
                                        placeholder="Select Date"
                                        :disabled="
                                          item.status_rpa == 'submitted' ||
                                            item.remain_day != '' ||
                                            role_status == 'viewer'
                                        "
                                        @click="
                                          set_default_memo(item, 'memo_date')
                                        "
                                        @change="EditModal(item)"
                                      />
                                      
                                      <button
                                        class="btn"
                                        style="font-size: 18px"
                                        @click="clearDate_memo(item, 'memo_date')"
                                        :disabled="
                                          item.status_rpa == 'submitted' ||
                                            item.remain_day != '' ||
                                            role_status == 'viewer'
                                        "
                                      >
                                        x
                                      </button>
                                    </div> -->
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
                            @click="close_memo()"
                          >
                            Close
                          </v-btn>
                          <!-- <v-btn
                            color="success darken-1"
                            text
                            @click="ok_memo()"
                          >
                            save
                          </v-btn> -->
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- -----------------------------------End MEMO--------------------------------------------- -->

                    <!-- --------------------------------------table--------------------------------------------- -->
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <!-- :items="enrichedDesserts" -->
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
                          <!--
                          <template v-slot:[`item.cus_criteria`]="{ item }">
                            <div v-if="item.cus_criteria == null">
                              <select
                                class="style-chooser form-control"
                              >
                                  <option value=""></option>
                                  <option value="normal">Normal</option>
                                  <option value="critical">Critical</option>
                              </select>
                            </div>
                          </template>
                          -->
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
                          <!-- <template v-slot:[`item.memo_no`]="{ item }">
                            <textarea-autosize
                              class="form-control"
                              placeholder="เลขที่ MEMO"
                              v-model="item.memo_no"
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
                              :disabled="
                                item.status_rpa == 'submitted' ||
                                (item.remain_day != '' &&
                                  item.status_rpa != 'waiting') ||
                                role_status == 'viewer'
                              "
                              @blur.native="EditModal(item)"
                            />
                          </template> -->
                          <!-- <template v-slot:[`item.debt_number`]="{ item }">
                            <input
                              class="form-control"
                              placeholder="จำนวนครั้ง"
                              v-model="item.debt_number"
                              type="number"
                              min="0"
                              style="
                                width: 100%;
                                margin-top: 10px;
                                padding: 5px;
                                border: 1px solid rgb(224, 224, 224);
                                border-radius: 1px;
                              "
                              :disabled="
                                item.status_rpa == 'submitted' ||
                                  (item.remain_day != '' &&
                                    item.status_rpa != 'waiting') ||
                                  role_status == 'admin' || role_status == 'viewer'
                              "
                              @change="EditModal(item)"
                            />
                          </template> -->
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
                            {{ parseDate(item.start_date) }}
                          </template>
                          <template v-slot:[`item.end_date`]="{ item }">
                            {{ parseDate(item.end_date) }}
                          </template>
                          <!-- <template v-slot:[`item.due_date`]="{ item }">
                            {{ parseDate(item.due_date) }}
                          </template> -->
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
                            <!-- <textarea-autosize
                              class="form-control"
                              placeholder="Customer Email"
                              v-model="item.email"
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
                              :disabled="
                                item.status_rpa == 'submitted' ||
                                  (item.remain_day != '' &&
                                    item.status_rpa != 'waiting') ||
                                  role_status == 'viewer'
                              "
                              @blur.native="EditModal(item)"
                            /> -->
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

                          <template v-slot:[`item.sale_email`]="{ item }">
                            <!-- <textarea-autosize
                              class="form-control"
                              placeholder="Sale Email"
                              v-model="item.sale_email"
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
                              :disabled="
                                item.status_rpa == 'submitted' ||
                                  (item.remain_day != '' &&
                                    item.status_rpa != 'waiting') ||
                                  role_status == 'viewer'
                              "
                              @blur.native="EditModal(item)"
                            /> -->
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
                            <!-- <v-chip
                              style="z-index: 1"
                              :color="getColor(item.status_rpa)"
                              dark
                            >
                              {{ item.status_rpa }}
                            </v-chip> -->
                            <v-btn
                              outlined
                              color="success"
                              v-if="item.status_rpa === 'submitted'"
                              class="disable-events"
                            >
                              submitted
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
                              v-if="item.status_rpa === 'hold'"
                              class="disable-events"
                            >
                              hold
                            </v-btn>
                          </template>
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              @click="
                                (dialog_submit = true),
                                  submit_modal(item),
                                  (Type_submitted = null)
                              "
                              class="screen"
                              style="font-size: 12px"
                              :disabled="
                                role_status == 'viewer' || role_status == 'admin' || (item.remain_day != '' &&item.status_rpa != 'waiting') 
                                || item.sale_email == '' || item.customer_email == '' || item.memo_date == '0000-00-00' || item.memo_date == '0001-01-01'
                              "
                            >
                              Submit</v-btn
                            >
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

          <v-col cols="12">
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
                  Clear All
                </v-btn>
              </v-card-title>

              <v-card-text>
                <label style="font-size: 12px; float: right"
                  >data show : {{ datalist.length }}</label
                >
                <!-- --------------------------------------table Main--------------------------------------------- -->
                <div class="cover-table">
                  <div class="table-invoice" style="position: relative">
                    <v-data-table
                      :headers="headers"
                      :items="datalist"
                      :items-per-page="count_invoice"
                      :hide-default-footer="true"
                      class="table_in_book1"
                      fixed-header
                      height="600px"
                      id="invoice_book_1"
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
                          @change="editRemark('REMARK_MAIN', item)"
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
                        <option value="300">300</option>
                        <option value="500">500</option>
                        <!-- <option value="1500">1500</option> -->
                      </select>
                      <v-pagination
                        style="justify-content: flex-end"
                        v-model="page"
                        :length="page_total"
                        :total-visible="5"
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
    // memonew: "",
    finish : true,
    Type_submitted: null,
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
    // ===============end serach====================
    headers: [
      {
        text: "Customer No.",
        value: "customer_no",
        width: "200px",
        sortable: true,
        class: "invoice1_1",
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
        width: "400px",
        sortable: true,
        align: "left",
      },
      {
        text: "จำนวนที่ครบกำหนดการชำระเงิน",
        value: "payment_due",
        width: "350px",
        sortable: true,
        align: "center",
      },

      {
        text: "จำนวนที่กดออกทวงหนี้",
        value: "rpa_submit",
        width: "170px",
        sortable: true,
        align: "center",
      },

      {
        text: "ระยะเวลาคงเหลือ",
        value: "remain_days",
        align: "center",
        width: "170px",
        sortable: true,
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
      /*
      {
        text: "Customer Criteria",
        value: "cus_criteria",
        width: "200px",
        sortable: true,
      },
      */
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
      // {
      //   text: "วันที่รายการผ่าน",
      //   value: "",
      //   width: "200px",
      //   sortable: true,
      // },
      {
        text: "Sale Represent",
        value: "sale_id",
        width: "200px",
        sortable: true,
      },
      // {
      //   text: "Sale Represent Name",
      //   value: "sale_name",
      //   width: "300px",
      //   sortable: true,
      // },
      // {
      //   text: "Sale Team Lead",
      //   value: "sale_team",
      //   width: "200px",
      //   sortable: true,
      // },
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
        text: "จำนวนวัน เพื่อให้ลูกค้าชำระ",
        value: "customer_pay",
        width: "220px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 1",
        value: "collection_letter_first_date",
        width: "220px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ครบกำหนดหนังสือทวงหนี้ครั้งที่ 2",
        value: "collection_letter_second_date",
        width: "220px",
        sortable: true,
        align: "center",
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
        text: "Recheck",
        value: "recheck",
        width: "200px",
        sortable: true,
      },
      {
        text: "Sale Name",
        value: "sale_name",
        width: "200px",
        sortable: true,
      },
      {
        text: "SBM",
        value: "sale_sbm",
        width: "200px",
        sortable: true,
      },
      {
        text: "Email Sale",
        value: "sale_email",
        width: "300px",
        sortable: true,
      },
      // แก้ อันเดิมเป็น customer_email
      {
        text: "Email ลูกค้า",
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

      {
        text: "Sumbit",
        value: "action",
        width: "100px",
        align: "center",
        sortable: false,
      },
    ],

    customer_invoice_list: orders,
    name_open_dialog: "",
    datalist: [],
    modal_submit_all: [],
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
      // แก้ อันเดิมเป็น customer_email
      customer_email: null,
    },
    open_memo: false,
    open_edit_invoice_modal: {
      memo_no: "",
      memo_date: "",
    },
    set_memo: {
      memo_no: "",
      memo_date: "",
    },
    list_submitted_all: [],
    check_submitted: true,
    check_submitted2: true,
    check_unsubmitted: true,
  }),
  created() {
    this.role_status = localStorage.getItem("role");
    if (this.role_status == "down_service") {
      this.finish = false;
      this.$router.push("/down-service");
    } else if (localStorage.getItem("acces_token")) {
      this.finish = false;
      // this.setting_column();
      //  this.All_customer_no()
      this.getInvoice();
    } else {
      this.$router.push("/login");
    }
  },
  watch: {},
  computed: {
    // enrichedDesserts() {
    //   return this.customer_invoice_list.map((x) => ({
    //     ...x,
    //     isSelectable: x.status_rpa != "submitted",
    //   }));
    // },
  },

  methods: {
    
    enterSelect() {
      for (let index = 0; index < this.selected_1.length; index++) {
        if (
          this.selected_1[index].remain_day != "" &&
          this.selected_1[index].status_rpa != "waiting"
        ) {
          this.check_submitted = true;
        } else {
          this.check_submitted = false;
          break;
        }
      }

      for (let index = 0; index < this.selected_1.length; index++) {
        if (this.selected_1[index].remain_day == "") {
          this.check_unsubmitted = true;
        } else {
          this.check_unsubmitted = false;
          break;
        }
      }
      
      for (let index = 0; index < this.selected_1.length; index++){
        if (this.selected_1[index].customer_email == "" || this.selected_1[index].sale_email == '' 
        || this.selected_1[index].memo_date == "0000-00-00" || this.selected_1[index].memo_date == "0001-01-01") {
          this.check_submitted2 = true;
          break;
        } else {
          this.check_submitted2 = false;
        }
      }

      if (this.selected_1.length == 0) {
        this.check_submitted = true;
        this.check_submitted2 = true;
        this.check_unsubmitted = true;
      }
    },
    edit_memo_modal() {
      if (
        this.set_memo.memo_date == "" ||
        this.set_memo.memo_date == "0000-00-00"
      ) {
        this.set_memo.memo_date = "0000-00-00";
      }

      var memo_list = {
        uid: [],
        memo_date: String(new Date(this.set_memo.memo_date).getTime() / 1000),
        memo_no: this.set_memo.memo_no,
      };
      for (let index = 0; index < this.modal_submit_all.length; index++) {
        if (this.modal_submit_all[index].remain_day == "") {
          //  this.modal_submit_all[index].memo_date = this.set_memo.memo_date
          //   this.modal_submit_all[index].memo_no = this.set_memo.memo_no
          memo_list.uid.push(this.modal_submit_all[index].uid);
        } else if (this.modal_submit_all[index].remain_day !== "") {
          memo_list.uid.push(this.modal_submit_all[index].uid);
        }
      }
      if (memo_list.memo_date == "NaN") {
        memo_list.memo_date = "";
      }

      Swal.fire({
        title: "<h3>ยืนยันการแก้ไขข้อมูล MEMO ทั้งหมด</h3>",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Save",
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
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
            .put(process.env.VUE_APP_API + "/debt/invoices", memo_list, headers)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "แก้ไขข้อมูลเรียบร้อย",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.name_open_dialog =
                  this.modal_submit_all[0].customer_no +
                  " - " +
                  this.modal_submit_all[0].customer_name;
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
                      this.modal_submit_all[0].customer_no +
                      "/debt_first",
                    headers
                  )
                  .then((response) => {
                    if (response.data) {
                      this.customer_invoice_list = response.data.data;
                      this.customer_invoice_list.forEach((element) => {
                        element.memo_date = moment(element.memo_date).format(
                          "YYYY-MM-DD"
                        );
                        element.due_date = moment(element.due_date).format(
                          "YYYY-MM-DD"
                        );
                      });
                      for (
                        let index = 0;
                        index < this.customer_invoice_list.length;
                        index++
                      ) {
                        for (let i = 0; i < this.modal_submit_all.length; i++) {
                          if (
                            this.modal_submit_all[i].uid ==
                            this.customer_invoice_list[index].uid
                          ) {
                            this.modal_submit_all[
                              i
                            ].memo_no = this.customer_invoice_list[
                              index
                            ].memo_no;
                            this.modal_submit_all[
                              i
                            ].memo_date = this.customer_invoice_list[
                              index
                            ].memo_date;
                          }
                        }
                      }
                    } else {
                      this.customer_invoice_list = [];
                    }
                  });
              });
            })
            .catch((error) => {
              if (error) {
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถแก้ไขได้",
                  timer: 1500,
                  showConfirmButton: false,
                }).then(() => {});
              }
            });
        } else if (result.isDenied) {
          // console.log("close:");
        }
      });
    },

    set_update_memo(item) {
      item.memo_date = moment(new Date()).format("YYYY-MM-DD");
    },
    clearDate_update_memo(item) {
      item.memo_date = "0000-00-00";
    },
    convert(item) {
      return Number(item).toLocaleString();
    },
    list_submitted(name) {
      this.list_submitted_all = [];

      if (name == "submit") {
        for (let index = 0; index < this.modal_submit_all.length; index++) {
          if (
            this.modal_submit_all[index].remain_day == "" ||
            this.modal_submit_all[index].status_rpa == "waiting"
          ) {
            this.list_submitted_all.push(this.modal_submit_all[index]);
          }
        }
      } else if (name == "unsubmit") {
        for (let index = 0; index < this.modal_submit_all.length; index++) {
          if (
            this.modal_submit_all[index].status_rpa == "submitted" ||
            this.modal_submit_all[index].remain_day != ""
          ) {
            this.list_submitted_all.push(this.modal_submit_all[index]);
          }
        }
      }
    },
    submit_all(name) {
    
      // this.datamemo = this.selected_1[0].memo_no
      this.set_memo.memo_no = this.selected_1[0].memo_no;
      this.modal_submit_all = this.selected_1;

      if (name == "submit") {
        this.list_submitted("submit");
      }
      if (name == "unsubmit") {
        this.list_submitted("unsubmit");
      }
    },
    submit_modal(item) {
      this.modal_submit = item;
    },
    holding(stattus_hold) {
    
      var holding = [];
      for (let index = 0; index < this.selected_1.length; index++) {
        holding.push(this.selected_1[index].uid);
      }

      if (stattus_hold == "unhold") {
        this.status_hold = "waiting";
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
          process.env.VUE_APP_API + "/debt/holds/" + this.status_hold,
          {
            uid: holding,
          },
          headers
        )
        .then(() => {
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
    },

    // ฟังก์ชันนี้ไม่ได้ใช้
    ok_memo() {
      this.open_memo = false;
      for (let index = 0; index < this.modal_submit_all.length; index++) {
        this.EditModal(this.modal_submit_all[index]);
        if (index == this.modal_submit_all.length) {
          Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },
    close_memo() {
      this.open_memo = false;
      // this.openInvoice();
      this.set_memo = {
        memo_no: "",
        memo_date: "",
      };
      //  this.openInvoice(this.modal_submit_all[0])
      this.name_open_dialog =
        this.modal_submit_all[0].customer_no +
        " - " +
        this.modal_submit_all[0].customer_name;
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
            this.modal_submit_all[0].customer_no +
            "/debt_first",
          headers
        )
        .then((response) => {
          if (response.data) {
            this.customer_invoice_list = response.data.data;
            this.customer_invoice_list.forEach((element) => {
              element.memo_date = moment(element.memo_date).format(
                "YYYY-MM-DD"
              );
              element.due_date = moment(element.due_date).format("YYYY-MM-DD");
            });
          } else {
            this.customer_invoice_list = [];
          }
        });
    },
    set_default_memo(item, name) {
      if (name == "memo_date") {
        item.memo_date = moment(new Date()).format("YYYY-MM-DD");
        return item.memo_date;
      }
    },
    clearDate_memo(item, name) {
      if (name == "memo_date") {
        item.memo_date = "0000-00-00";
      }
      this.EditModal(item);
    },
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

    // ปุ่ม submit ข้างบนตาราง
    SubmitInvoiceMain(name) {
      if (!this.Type_submitted) {
        this.Type_submitted = "THA";
      }
      var submitted = [];
      var data_list = {
        uid: submitted,
        memo_date: "",
        memo_no: "",
      };
      for (let index = 0; index < this.list_submitted_all.length; index++) {
        submitted.push(this.list_submitted_all[index].uid);
        data_list.memo_date = String(new Date(this.modal_submit_all[index].memo_date).getTime() / 1000);
        data_list.memo_no = this.modal_submit_all[index].memo_no;
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
      if (name == "unsubmitted") {
        this.axios
          .post(
            process.env.VUE_APP_API + "/debt/rpa/unsub",
            {
              uid: submitted,
            },
            headers
          )
          .then((response) => {
            if (response) {
              Swal.fire({
                icon: "success",
                title: "ยกเลิกข้อมูลเรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 3000,
              }).then(() => {
                this.openInvoice(this.selected_1[0]);
              });
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: error.response.data.msg,
                timer: 3000,
              }).then(() => {});
            }
          });
      } else {
        // console.log(submitted)
        this.axios
          .put(process.env.VUE_APP_API + "/debt/invoices", data_list, headers)
          .then(() => {
            this.axios
              .post(
                process.env.VUE_APP_API + "/debt/rpa",
                {
                  uid: submitted,
                  customer_name: this.customer_name_eng,
                  finance_name: this.finance_name_eng,
                  type: this.Type_submitted,
                },
                headers
              )
              .then((response) => {
                if (response) {
                  Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลเรียบร้อยแล้ว",
                    showConfirmButton: false,
                    timer: 3000,
                  }).then(() => {
                    this.openInvoice(this.selected_1[0]);
                  });
                }
              })
              .catch((error) => {
                if (error) {
                  Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: error.response.data.msg,
                    timer: 3000,
                  }).then(() => {});
                }
              });
          })
      }
    },
    // ปุ่ม submit ในตาราง
    SubmitInvoice(item) {
      var bodyEdited = {
        invoice_uid: item.invoice_uid,
        invoice_no: item.invoice_no,
        customer_no: item.customer_no,
        customer_name: item.customer_name,
        customer_email: item.customer_email,
        // แก้ อันเดิมเป็น customer_email
        email: item.customer_email,
        //
        amount: item.amount,
        aging: item.aging,
        so_number: item.so_number,
        invoice_date: item.invoice_date,
        start_date: item.start_date,
        end_date: item.end_date,
        due_date: new Date(item.due_date).toJSON(),
        sale_name: item.sale_name,
        sale_id: item.sale_id,
        sale_team: item.sale_team,
        sale_email: item.sale_email,
        memo_date: new Date(item.memo_date).toJSON(),
        memo_no: item.memo_no,
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
        remark_detail:item.remark_detail
      };
      if(item.finance_name == ""){
        Swal.fire({
            icon: "error",
            title: "ไม่สามารถส่งข้อมูลได้",
            text: "เนื่องจากไม่มีข้อมูลเจ้าหน้าที่การเงิน",
            timer: 3000
        })
      }else {
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
          if (!this.Type_submitted) {
            this.Type_submitted = "THA";
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
            .post(
              process.env.VUE_APP_API + "/debt/rpa",
              {
                uid: [item.uid],
                customer_name: this.customer_name_eng,
                finance_name: this.finance_name_eng,
                type: this.Type_submitted,
              },
              headers
            )
            .then((response) => {
              if (response) {
                Swal.fire({
                  icon: "success",
                  title: "บันทึกข้อมูลเรียบร้อยแล้ว",
                  showConfirmButton: false,
                  timer: 3000,
                }).then(() => {
                  this.openInvoice(item);
                });
              }
            })
            .catch((error) => {
              if (error) {
                Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาด",
                  text: error.response.data.msg,
                  timer: 3000,
                }).then(() => {});
              }
            });
        });
      }
    },
    parseDate(date) {
      if (date == "0000-00-00") {
        // console.log("date", date);
      }

      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    openInvoice(item) {
      
      this.finish = false;
      this.selected_1 = [];
      this.check_submitted = true;
      this.check_unsubmitted = true;
      (this.Type_submitted = null), (this.customer_name_eng = "");
      this.finance_name_eng = "";
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
            "/debt_first",
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
    type_change() {
      if (this.Type_submitted == "ENG") {
        this.finance_name_eng = "";
        this.customer_name_eng = "";
      } else if (this.Type_submitted == null) {
        this.finance_name_eng = "";
        this.customer_name_eng = "";
        this.Type_submitted = "THA";
      }
    },

    // ดึงข้อมูลมาแสดงตาราง
    getInvoice() {
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
            "/debt/customer/debt_first?size=" +
            String(this.item_per_page) +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist = response.data.data;
            this.page_total = Number(response.data.count_page);
            this.count_invoice = Number(response.data.count);
            this.total_count = response.data.total.toLocaleString();
            // this.sum_amount = response.data.sum_amount.toLocaleString();
          } else if (response.status === 200 && response.data.data == null) {
            this.finish = true;
            this.datalist = [];
            this.count_invoice = 0;
            this.total_count = 0;
            this.sum_amount = 0;
            this.page_total = 1;
          }

          // this.datalist = orders;
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            if (error.response["status"] == 401) {
              localStorage.clear();
              this.$router.push("/login");
            }
          }
        });
    },
    getColor(data) {
      if (data == "submitted") {
        return "green";
      } else if (data == "waiting") {
        return "#FFA017";
      } else {
        return "#176DFF";
      }
    },
    editRemark(status, data){
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
                this.getInvoice();
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
div.swal2-popup.swal2-modal.swal2-show {
  height: auto;
  padding: 20px;
}
#table_select_modal_memo {
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: rgb(211, 252, 203);
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

th.text-start.invoice1_1.sortable {
  position: sticky;
  left: 0px !important;
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
#invoice_book_1 {
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

.v-dialog--fullscreen {
  top: 64px !important;
}
#data-grid-demo {
  .container {
    background-color: rgb(250, 250, 250);
    width: 100% !important;
    font-family: "Bai_Jamjuree" !important;
  }
  .dx-data-row .amount {
    font-weight: bold;
    font-weight: 900;
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
      background-color: rgb(250, 250, 250);
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
  border-radius: 0px;
}
#filter_modal {
  input.form-control {
    font-family: "Bai_Jamjuree" !important;
    padding-left: 10px;
    border: 1px solid rgb(221, 221, 221);
    height: 48px;
    // border-radius: 1px;
    margin-top: 25px !important;
  }
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
