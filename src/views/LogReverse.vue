<template>
  <div>
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
                      justify-content: space-between;"
              >
                  <h3 style="font-weight:700">Log Reverse</h3>
              </v-col>
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
                          label="Document No, Cus No, Cus Name, Invoice No"
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
                      >Clear All</v-btn>
                    </v-card-title>
                    <v-card-text>
                      <div>
                        <v-btn
                          color="teal"
                          dark
                          style="width: 150px; font-size: 12px; font-weight: 600"
                          text
                          class="mb-2"
                          v-b-modal.modal-center-export-date
                        >
                          Export File Log
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          class="mb-2"
                          style="width: 150px; font-size: 12px; font-weight: 600"
                          text
                          @click="exportAll()"
                        >
                          Export All File
                        </v-btn>
                        <v-btn
                          :disabled="filterlist.length == 0"
                          color="purple"
                          class="mb-2"
                          style="width: 150px; font-size: 12px; font-weight: 600"
                          text
                          @click="exportByFilter()"
                        >
                          Export By Filter
                        </v-btn>
                        <b-modal
                          class="dialog_date"
                          data-backdrop="static"
                          no-close-on-backdrop
                          ref="my-modal-export_date"
                          id="modal-center-export-date"
                          centered
                          hide-footer
                          title="Export File"
                        >
                          <cv-date-picker
                            placeholder="dd/mm/yyyy"
                            light
                            kind="range"
                            :date-end-label="dateEndLabel"
                            :cal-options="calOptions"
                            @change="
                              actionChange(export_date_range)
                            "
                            v-model="export_date_range"
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
                            <div style="width: 160px"></div>
                            <div class="d-flex">
                              <b-button
                                data-dismiss="modal"
                                class="mt-3"
                                variant="outline-danger"
                                @click="hideModal()"
                              >Cancel</b-button>
                              <div style="width: 10px"></div>
                              <b-button
                                data-dismiss="modal"
                                class="mt-3"
                                variant="outline-primary"
                                @click="OkExportModal()"
                              >OK</b-button>
                            </div>
                          </div>
                        </b-modal>
                        <v-btn
                          class="ma-4"
                          color="success"
                          @click="add_reverse()"
                          style="font-size: 12px; font-weight: 600"
                        >
                          Add
                          <v-icon right dark> mdi-plus-circle </v-icon>
                        </v-btn>
                      </div>
                      <!-- --------------------------------------table--------------------------------------------- -->
                      <div class="cover-table">
                        <div class="table-invoice" style="position: relative">
                          <v-data-table
                            :headers="headers"
                            :items="reverse_data"
                            :items-per-page="number_INC()"
                            class="elevation-3"
                            fixed-header
                            hide-default-footer
                            height="600px"
                            id="log-invoice-table"
                          >
                          <!------------------------------- filter ---------------------------------->
                          <template v-slot:[`body.prepend`]>
                            <tr id="filter">
                              <!------------- filter Document No.--------------->
                              <td class="fixed-invoice-new">
                                <input
                                  v-model="document_no"
                                  class="form-control"
                                  @change="filter(document_no, String('document_no'))"
                                  placeholder="Document No"
                                  :disabled="document_no_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('document_no')"
                                    v-model="document_no_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter date -->
                              <td v-if="filter_column[1].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_date"
                                  label="date"
                                  placeholder="Date"
                                  style="font-size:14px"
                                  v-b-modal.modal-center-date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_date"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-center-date"
                                    centered
                                    hide-footer
                                    title="Date"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabelFilter"
                                      :cal-options="calOptionsFilter"
                                      @change="actionChangeFilter(date_range, 'date')"
                                      v-model="date_range"
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
                                        @click="blankModalFilter('date')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModalFilter('date')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('date')"
                                        >OK</b-button
                                      >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter customer no -->
                              <td v-if="filter_column[2].show == true">
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
                              <!-- filter customer name -->
                              <td v-if="filter_column[3].show == true">
                                <v-autocomplete
                                  multiple
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
                              <!-- filter invoice no -->
                              <td v-if="filter_column[4].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_invoice_no"
                                  v-model="invoice_no"
                                  type="text"
                                  label="Invoice Number"
                                  :items="invoice_no_list"
                                  @change="
                                    filter(invoice_no, String('invoice_no'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter Invoice Amount -->
                              <td v-if="filter_column[5].show == true"></td>
                              <!-- filter Company Type -->
                              <td v-if="filter_column[6].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_company_type"
                                  v-model="company_type"
                                  type="text"
                                  label="Company Type"
                                  :items="company_type_list"
                                  @change="
                                    filter(company_type, String('company_type'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter Statement No -->
                              <td v-if="filter_column[7].show == true">
                                <input
                                  v-model="statement_no"
                                  class="form-control"
                                  @change="filter(statement_no, String('statement_no'))"
                                  placeholder="Statement no."
                                  :disabled="statement_no_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('statement_no')"
                                    v-model="statement_no_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter เอกสาร WHT -->
                              <td v-if="filter_column[8].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="type_wht"
                                  type="text"
                                  style="font-size:14px"
                                  label="เอกสาร WHT"
                                  :items="type_wht_list"
                                  @change="
                                    filter(type_wht, String('type_wht'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter คนกลับรายการ -->
                              <td v-if="filter_column[9].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_user"
                                  v-model="user"
                                  type="text"
                                  label="คนกลับรายการ"
                                  :items="user_list"
                                  @change="
                                    filter(user, String('user'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter Remark -->
                              <td v-if="filter_column[10].show == true">
                                <input
                                  v-model="remark"
                                  class="form-control"
                                  @change="filter(remark, String('remark'))"
                                  placeholder="Remark"
                                  :disabled="remark_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('remark')"
                                    v-model="remark_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter Aging -->
                              <td v-if="filter_column[11].show == true"></td>
                              <!-- filter Credit Note -->
                              <td v-if="filter_column[12].show == true">
                                <input
                                  v-model="cn_number"
                                  class="form-control"
                                  @change="filter(cn_number, String('cn_number'))"
                                  placeholder="Credit Note"
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
                              <!-- filter รายการบวกมือ -->
                              <td v-if="filter_column[12].show == true">
                                <input
                                  v-model="hand_list"
                                  class="form-control"
                                  @change="filter(hand_list, String('hand_list'))"
                                  placeholder="รายการบวกมือ"
                                  :disabled="hand_list_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('hand_list')"
                                    v-model="hand_list_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter Receipt No -->
                              <td v-if="filter_column[13].show == true">
                                <input
                                  v-model="receipt_no"
                                  class="form-control"
                                  @change="filter(receipt_no, String('receipt_no'))"
                                  placeholder="Receipt No"
                                  :disabled="receipt_no_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('receipt_no')"
                                    v-model="receipt_no_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter เลขที่ตัดหนี้เดิม -->
                              <td v-if="filter_column[14].show == true">
                                <input
                                  v-model="rv_number"
                                  class="form-control"
                                  @change="filter(rv_number, String('rv_number'))"
                                  placeholder="เลขที่ตัดหนี้เดิม"
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
                              <!-- filter เลขที่กลับรายการ -->
                              <td v-if="filter_column[15].show == true">
                                <input
                                  v-model="reverse_number"
                                  class="form-control"
                                  @change="filter(reverse_number, String('reverse_number'))"
                                  placeholder="เลขที่กลับรายการ"
                                  :disabled="reverse_number_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('reverse_number')"
                                    v-model="reverse_number_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter เลขที่ตัดหนี้ใหม่ -->
                              <td v-if="filter_column[16].show == true">
                                <input
                                  v-model="new_rv_number"
                                  class="form-control"
                                  @change="filter(new_rv_number, String('new_rv_number'))"
                                  placeholder="เลขที่ตัดหนี้ใหม่"
                                  :disabled="new_rv_number_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('new_rv_number')"
                                    v-model="new_rv_number_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter Reverse Status -->
                              <td v-if="filter_column[17].show == true">
                                <input
                                  v-model="reverse_status"
                                  class="form-control"
                                  @change="filter(reverse_status, String('reverse_status'))"
                                  placeholder="Reverse Status"
                                  :disabled="reverse_status_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('reverse_status')"
                                    v-model="reverse_status_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter Reverse Status Remark -->
                              <td v-if="filter_column[18].show == true">
                                <input
                                  v-model="reverse_status_remark"
                                  class="form-control"
                                  @change="filter(reverse_status_remark, String('reverse_status_remark'))"
                                  placeholder="Reverse Status Remark"
                                  :disabled="reverse_status_remark_blank == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('reverse_status_remark')"
                                    v-model="reverse_status_remark_blank"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter Status -->
                              <td v-if="filter_column[19].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_status"
                                  v-model="status"
                                  type="text"
                                  label="Status"
                                  :items="status_list"
                                  @change="
                                    filter(status, String('status'))
                                  "
                                ></v-autocomplete>
                              </td>
                            </tr>
                          </template>
                          <!------------------------------- end filter ---------------------------------->
                            <template v-slot:[`item.date`]="{ item }">
                              <label
                                v-if="parseDateRequest(item.date) != '01/01/0001'"
                              >
                                {{ parseDateRequest(item.date) }}</label
                              >
                            </template>

                            <template v-slot:[`item.remark`]="{ item }">
                              <b-textarea
                                placeholder="remark"
                                v-model="item.remark"
                                style="border-radius: 0px;"
                                rows="1"
                                max-rows="1"
                                disabled
                              ></b-textarea>
                            </template>

                            <template v-slot:[`item.reverse_status_remark`]="{ item }">
                              <b-textarea
                                placeholder="reverse status remark"
                                v-model="item.reverse_status_remark"
                                style="border-radius: 0px;"
                                rows="1"
                                max-rows="1"
                                disabled
                              ></b-textarea>
                            </template>
                            <template v-slot:[`item.status`]="{ item }">
                              <select
                                class="style-chooser form-control"
                                v-model="item.status"
                                @change="editStatus(item)"
                              >
                                <option value=""></option>
                                <option value="ลดหนี้">ลดหนี้</option>
                                <option value="ลดหนี้ใบเสร็จ">ลดหนี้ใบเสร็จ</option>
                                <option value="ลดหนี้ใบเสร็จบางส่วน">ลดหนี้ใบเสร็จบางส่วน</option>
                                <option value="ยังไม่ชำระ">ยังไม่ชำระ</option>
                                <option value="ตัดหนี้ใหม่">ตัดหนี้ใหม่</option>
                                <option value="วางบิลใหม่">วางบิลใหม่</option>
                                <option value="กลับรายการ">กลับรายการ</option>
                                <option value="ออกทวงหนี้">ออกทวงหนี้</option>
                              </select>
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
                    </v-card-text>
                  </v-card>
              <v-col cols="12"></v-col>
          </v-row>
      </div>
    </v-container>
    
    <v-dialog v-model="modal_add_reversed" width="80%" persistent>
      <v-card>
        <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #25578D"
        >
          Add Reverse
          <v-spacer></v-spacer>
          <v-btn icon dark @click="close_add_reverse()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container class="bg-surface-variant">
          <v-row no-gutters class="ml-2 mr-2">
            <v-col cols="3" class="pa-1" style="font-size: 16px; font-family: Bai_Jamjuree;">
              <v-text-field
                v-model="customer_search.customer_no"
                label="Customer No."
                @change="search_Cus(customer_search.customer_no)"
                :rules="rulesCus"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="5" class="pa-1" style="font-size: 16px; font-family: Bai_Jamjuree;">
              <v-text-field
                v-model="customer_search.customer_name"
                label="Customer Name"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="pa-2">
            <v-col
              cols="6"
              sm="6"
              md="6"
              id="scroll-target"
              style="max-height: 360px;
                width: 50%;
                background: #FBF9F9;
                border: 1px dashed #000000;
                border-radius: 5px;"
              class="overflow-y-auto"
            >
              <v-container
                class="reverse_table_detail"
                v-scroll:#scroll-target="onScroll"
                style="height: 100%;"
              >
                <table style="width: 100%">
                  <tr style="vertical-align: middle; text-align: center;">
                    <th class="invoice-header" style="width: 30%">Invoice</th>
                    <th class="invoice-header" style="width: 26%">Amount</th>
                    <th class="invoice-header" style="width: 30%">Status</th>
                    <th class="invoice-header" style="width: 14%"></th>
                  </tr>
                  <tr
                    class="frist-new"
                    v-for="(item, index) in invoice_detail"
                    :key="index"
                  >
                    <td>
                      <div id="invoice-list">
                        <v-autocomplete
                          class="align-center-input ml-1 mr-1"
                          dense
                          v-model="item.invoice_no"
                          style="font-size:10px;"
                          @change="invoice(item.invoice_no, index)"
                          :items="new_invoice_list"
                          :rules="[(v) => (check_invoice == true) || 'กรุณาเลือก Invoice No. ใหม่',
                                    (v) => !!v || 'กรุณาเลือก Invoice No.']"
                          :error="item.invoice_no == ''"
                          item-text="inv"
                          item-value="inv"
                          required
                          hide-selected
                          :disabled="customer_search.customer_name == ''"
                        ></v-autocomplete>
                      </div>
                    </td>
                    <td class="invoice-header-data">
                      <div style="text-align: center;">
                        {{ covertNumber(item.amount_after_vat) }}
                      </div>
                    </td>
                    <td>
                      <div id="invoice-list">
                        <v-autocomplete
                          class="align-center-input ml-1 mr-1"
                          dense
                          v-model="item.status"
                          style="font-size:10px;"
                          :items="invoice_status_list"
                          :disabled="customer_search.customer_name == ''"
                        ></v-autocomplete>
                      </div>
                    </td>
                    <td style="width:auto;">
                      <div class="text-center">
                        <v-btn
                          v-if="invoice_detail.length > 1"
                          x-small
                          dark
                          fab
                          outlined
                          color="rgb(103, 194, 93)"
                          @click="deleteRowInvoice(item.invoice_no , index)"
                          :disabled="check_invoice == false"
                        >
                          <v-icon dark> mdi-minus </v-icon>
                        </v-btn>
                        <v-btn
                          x-small
                          dark
                          fab
                          color="rgb(103, 194, 93)"
                          @click="addRowInvoice(item.invoice_no)"
                          v-if="index == invoice_detail.length - 1 && customer_search.customer_name != ''"
                          :hidden="check_invoice == false"
                        >
                          <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                        <v-btn
                          x-small
                          fab
                          color="rgb(103, 194, 93)"
                          v-if="index == invoice_detail.length - 1 && customer_search.customer_name == ''"
                          :hidden="check_invoice == false"
                          disabled
                        >
                          <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </table>
              </v-container>
            </v-col>
            <v-col
              cols="6"
              sm="6"
              md="6"
              id="scroll-target"
              style="max-height: 360px;
                width: 49%;
                background: #FBF9F9;
                border: 1px dashed #000000;
                border-radius: 5px;"
              class="overflow-y-auto ml-1"
            >
              <v-container
                class="reverse_table_detail"
                v-scroll:#scroll-target="onScroll"
                style="height: 100%"
              >
                <v-data-table
                  hide-default-footer
                  style="width: 100%;"
                >
                  <template v-slot:body="{}">
                    <tbody>
                      <tr
                        v-for="(header, index_detail) in headers_detail_table"
                        :key="index_detail"
                      >
                        <td>
                          {{ header.text }}
                        </td>
                        <td>
                          <div v-if="header.value == 'statement_no'" class="pa-1 mt-2 mb-2">
                            <input
                              style="text-align: left; border: 1px solid #000000; border-radius: 5px;"
                              type="text"
                              class="form-control"
                              v-model="add_statement"
                            />
                          </div>
                          <div v-if="header.value == 'rrv'" class="pa-1 mt-2 mb-2">
                            <input
                              style="text-align: left; border: 1px solid #000000; border-radius: 5px;"
                              type="text"
                              class="form-control"
                              v-model="add_reverse_rrv"
                            />
                          </div>
                          <!-- <div v-if="header.value == 'status'" class="pa-1 mt-2 mb-2">
                            <select
                              class="style-chooser form-control"
                              style="width: 100%; border: 1px solid #000000; border-radius: 5px;"
                              v-model="add_reverse_status"
                            >
                              <option value=""></option>
                              <option value="ลดหนี้">ลดหนี้</option>
                              <option value="ลดหนี้ใบเสร็จ">ลดหนี้ใบเสร็จ</option>
                              <option value="ลดหนี้ใบเสร็จบางส่วน">ลดหนี้ใบเสร็จบางส่วน</option>
                              <option value="ยังไม่ชำระ">ยังไม่ชำระ</option>
                              <option value="ตัดหนี้ใหม่">ตัดหนี้ใหม่</option>
                              <option value="วางบิลใหม่">วางบิลใหม่</option>
                              <option value="กลับรายการ">กลับรายการ</option>
                              <option value="ออกทวงหนี้">ออกทวงหนี้</option>
                            </select>
                          </div> -->
                          <div v-if="header.value == 'remark'" class="pa-1 mt-2">
                            <v-textarea
                              style="border-radius: 5px;"
                              rows="5"
                              outlined
                              dense
                              v-model="add_reverse_remark"
                            ></v-textarea>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="close_add_reverse()" class="mb-2">Cancel</v-btn>
          <v-btn
            color="primary"
            class="mb-2"
            :disabled="add_reverse_rrv == '' || check_invoice == false || customer_search.customer_name == '' || select_status == false || add_statement == ''"
            @click="save_add_reverse()"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
import JsonCSV from "vue-json-csv";
Vue.component("downloadCsv", JsonCSV);
export default {
    data: () => ({
        finish: false,
        role_status: "",
        search: "",
        reverse_data: [],
        Alldata: [],
        item_per_page: 100,
        page: 1,
        page_total: 1,
        //add reverse
        modal_add_reversed: false,
        sale_email: "",
        customer_search: {
          customer_no: "",
          customer_name: "",
        },
        rulesCus: [],
        add_reverse_rrv: "",
        add_statement: "",
        add_reverse_status: "",
        add_reverse_remark: "",
        invoice_detail: [
          {
            invoice_no: "",
            status: "",
            amount_after_vat: "",
          },
        ],
        check_invoice: true,
        select_status: false,
        new_invoice_list: [],
        data_customer: [],
        select_invoice: [],
        //export
        export_date_range: {
          startDate: null,
          endDate: null,
        },
        export_date: [null, null],
        dataExportFilter: [],
        dateEndLabel: "End date",
        calOptions: {
          dateFormat: "d/m/Y",
        },
        headers: [
            {
                text: "Document No.",
                sortable: true,
                value: "document_no",
                width: "200px",
                class: "log-invoice",
            },
            {
                text: "Date",
                value: "date",
                width: "180px",
                sortable: true,
                align: "center",
            },
            {
                text: "Customer No",
                value: "customer_no",
                width: "200px",
                sortable: true,
                align: "center",
            },
            {
                text: "Customer Name",
                value: "customer_name",
                width: "300px",
                sortable: true,
                align: "left",
            },
            {
                text: "Invoice No.",
                value: "invoice_no",
                width: "200px",
                sortable: true,
                align: "center",
            },
            {
                text: "Invoice Amount",
                value: "amount_after_vat",
                width: "200px",
                sortable: true,
                align: "center",
            },
            {
                text: "Company Type",
                value: "company_type",
                width: "200px",
                sortable: true,
                align: "center",
            },
            {
                text: "Statement No.",
                value: "statement_no",
                width: "300px",
                sortable: true,
                align: "center",
            },
            {
                text: "เอกสาร WHT",
                value: "type_wht",
                width: "150px",
                sortable: true,
                align: "center",
            },
            {
                text: "คนกลับรายการ",
                value: "user",
                width: "200px",
                sortable: true,
                align: "center",
            },
            {
                text: "Remark",
                value: "remark",
                width: "300px",
                sortable: true,
                align: "center",
            },
            {
                text: "Aging",
                value: "invoice_aging",
                width: "200px",
                sortable: true,
                align: "center",
            },
            {
                text: "Credit Note",
                value: "cn_number",
                width: "200px",
                sortable: true,
                align: "center",
            },
            {
                text: "รายการบวกมือ",
                value: "hand_list",
                width: "200px",
                sortable: true,
                align: "center",
            },
            {
                text: "Receipt No.",
                value: "receipt_no",
                width: "250px",
                sortable: true,
                align: "center",
            },
            {
                text: "เลขที่ตัดหนี้เดิม",
                value: "rv_number",
                width: "250px",
                sortable: true,
                align: "center",
            },
            {
                text: "เลขที่กลับรายการ",
                value: "reverse_number",
                width: "250px",
                sortable: true,
                align: "center",
            },
            {
                text: "เลขที่ตัดหนี้ใหม่",
                value: "new_rv_number",
                width: "250px",
                sortable: true,
                align: "center",
            },
            {
                text: "Reverse Status",
                value: "reverse_status",
                width: "250px",
                sortable: true,
                align: "center",
            },
            {
                text: "Reverse Status Remark",
                value: "reverse_status_remark",
                width: "300px",
                sortable: true,
                align: "center",
            },
            {
                text: "Status",
                value: "status",
                width: "200px",
                sortable: true,
                align: "center",
            },
        ],
        headers_detail_table: [
          {
            text: "Statement No.",
            align: "center",
            sortable: false,
            value: "statement_no",
          },
          {
            text: "RRV",
            align: "center",
            sortable: false,
            value: "rrv",
          },
          // {
          //   text: "Status",
          //   align: "center",
          //   sortable: false,
          //   value: "status",
          // },
          {
            text: "Remark",
            align: "center",
            sortable: false,
            value: "remark",
          },
        ],
        //filter
        filter_column: [
          {
            text: "Date",
            value: "date",
            show: true,
            fixed: false,
          },
          {
            text: "Customer No",
            value: "customer_no",
            show: true,
            fixed: false,
          },
          {
            text: "Customer Name",
            value: "customer_name",
            show: true,
            fixed: false,
          },
          {
            text: "Invoice No.",
            value: "invoice_no",
            show: true,
            fixed: false,
          },
          {
            text: "Invoice Amount",
            value: "amount_after_vat",
            show: true,
            fixed: false,
          },
          {
            text: "Company Type",
            value: "company_type",
            show: true,
            fixed: false,
          },
          {
            text: "Statement No.",
            value: "statement_no",
            show: true,
            fixed: false,
          },
          {
            text: "เอกสาร WHT",
            value: "type_wht",
            show: true,
            fixed: false,
          },
          {
            text: "คนกลับรายการ",
            value: "user",
            show: true,
            fixed: false,
          },
          {
            text: "Remark",
            value: "remark",
            show: true,
            fixed: false,
          },
          {
            text: "Aging",
            value: "invoice_aging",
            show: true,
            fixed: false,
          },
          {
            text: "Credit Note",
            value: "cn_number",
            show: true,
            fixed: false,
          },
          {
            text: "รายการบวกมือ",
            value: "hand_list",
            show: true,
            fixed: false,
          },
          {
            text: "Receipt No.",
            value: "receipt_no",
            show: true,
            fixed: false,
          },
          {
            text: "เลขที่ตัดหนี้เดิม",
            value: "rv_number",
            show: true,
            fixed: false,
          },
          {
            text: "เลขที่กลับรายการ",
            value: "reverse_number",
            show: true,
            fixed: false,
          },
          {
            text: "เลขที่ตัดหนี้ใหม่",
            value: "new_rv_number",
            show: true,
            fixed: false,
          },
          {
            text: "Reverse Status",
            value: "reverse_status",
            show: true,
            fixed: false,
          },
          {
            text: "Reverse Status Remark",
            value: "reverse_status_remark",
            show: true,
            fixed: false,
          },
          {
            text: "Status",
            value: "status",
            show: true,
            fixed: false,
          },
        ],
        filterlist: [],
        dateEndLabelFilter: "End date",
        calOptionsFilter: {
          dateFormat: "d/m/Y",
        },
        //filter document no
        document_no: "",
        document_no_blank: false,
        //filter date
        text_date: null,
        date: [null, null],
        date_range: {
          startDate: null,
          endDate: null,
        },
        //filter customer no
        customer_no: "",
        customer_no_blank: false,
        //filter customer name
        search_customer_name: null,
        customer_name: "",
        customer_name_list: [],
        //filter invoice no
        search_invoice_no: null,
        invoice_no: "",
        invoice_no_list: [],
        //filter Company Type
        search_company_type: null,
        company_type: "",
        company_type_list: [
          "[blank]",
          "INET",
          "JV",
        ],
        //filter Statement No
        statement_no: "",
        statement_no_blank: false,
        //filter เอกสาร WHT
        type_wht: "",
        type_wht_list: [
          "[blank]",
          "0",
          "1"
        ],
        //filter คนกลับรายการ
        search_user: null,
        user: "",
        user_list: [],
        //filter Remark
        remark: "",
        remark_blank: false,
        //filter Credit Note
        cn_number: "",
        cn_number_blank: false,
        //filter รายการบวกมือ
        hand_list: "",
        hand_list_blank: false,
        //filter Receipt No
        receipt_no: "",
        receipt_no_blank: false,
        //filter เลขที่ตัดหนี้เดิม
        rv_number: "",
        rv_number_blank: false,
        //filter เลขที่กลับรายการ
        reverse_number: "",
        reverse_number_blank: false,
        //filter เลขที่ตัดหนี้ใหม่
        new_rv_number: "",
        new_rv_number_blank: false,
        //filter Reverse Status
        reverse_status: "",
        reverse_status_blank: false,
        //filter Reverse Status Remark
        reverse_status_remark: "",
        reverse_status_remark_blank: false,
        //filter Status
        search_status: null,
        status: "",
        invoice_status_list: [
          "",
          "ลดหนี้",
          "ลดหนี้ใบเสร็จ",
          "ลดหนี้ใบเสร็จบางส่วน",
          "ยังไม่ชำระ",
          "ตัดหนี้ใหม่",
          "วางบิลใหม่",
          "กลับรายการ",
          "ออกทวงหนี้"
        ],
        status_list: [
          "[blank]",
          "ลดหนี้",
          "ลดหนี้ใบเสร็จ",
          "ลดหนี้ใบเสร็จบางส่วน",
          "ยังไม่ชำระ",
          "ตัดหนี้ใหม่",
          "วางบิลใหม่",
          "กลับรายการ",
          "ออกทวงหนี้"
        ],
    }),
    created() {
        this.role_status = localStorage.getItem("role");
        if (this.role_status !== "super_admin" && this.role_status !== "admin" && this.role_status !== "wait_down_service") {
            this.$router.push("/invoice");
        } else if (localStorage.getItem("acces_token")) {
            this.finish = false;
            this.getLogReverse();
        }
    },
    watch: {},
    computed: {},
    methods: {
        onScroll(e) {
          this.offsetTop = e.target.scrollTop;
        },
        getLogReverse(){
            this.finish = false;
            this.reverse_data = [];
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
                "/statement/log/reverse?size=" +
                this.item_per_page +
                "&page=" +
                this.page +
                "&search=" +
                String(this.search),
              headers
            )
            .then((response) => {
              //console.log(response.data)
              if (response.status === 200 && response.data.data !== null) {
                this.finish = true;
                this.reverse_data = response.data.data;
                this.Alldata = response.data.data;
                this.page_total = response.data.count_page;
                this.listfilter_data("customer_name");
                this.listfilter_data("invoice_no");
                this.listfilter_data("user");
              }else {
                this.finish = true;
                this.reverse_data = [];
                this.page_total = 1;
              }

            })
            .catch((error) => {
              if (error.response.status == 401) {
                this.finish = true;
                this.$router.push("/login");
              }
            });
        },
        add_reverse(){
          this.modal_add_reversed = true;
        },
        close_add_reverse(){
          this.modal_add_reversed = false;
          this.sale_email = "";
          this.customer_search = {
            customer_no: "",
            customer_name: "",
          };
          this.rulesCus = [];
          this.add_reverse_rrv = "";
          this.add_statement = "";
          this.add_reverse_status = "";
          this.add_reverse_remark = "";
          this.invoice_detail = [
          {
            invoice_no: "",
            status: "",
            amount_after_vat: "",
          },
          ];
          this.check_invoice = true;
          this.new_invoice_list = [];
          this.data_customer = [];
          this.select_invoice = [];
          this.select_status = false;
        },
        async save_add_reverse(){
          let inv_no = []
          this.invoice_detail.forEach((element) =>{
            inv_no.push({
              invoice_no : element.invoice_no,
              status : element.status,
              amount : Number(element.amount_after_vat),
            })
          })

          let headers = {
              headers: {
                Authorization:
                  "Bearer " +
                  localStorage.getItem("acces_token") +
                  "," +
                  localStorage.getItem("secret"),
              },
          };

          var DatasReversed = {
            customer_no: this.customer_search.customer_no,
            customer_name: this.customer_search.customer_name,
            rrv: this.add_reverse_rrv,
            statement_no: this.add_statement,
            remark: this.add_reverse_remark,
            invoice: inv_no
          }
          //console.log(DatasReversed)

          await this.axios
            .post(process.env.VUE_APP_API + "/statement/log/add/logreverse", DatasReversed, headers)
            .then((response) => {
              if(response.status == 200){
              this.finish = true;
              Swal.fire({
                icon: "success",
                title: "ข้อมูลถูก Reversed เรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              this.modal_add_reversed = false;
              }
            })
            .catch((error) => {
              if(error){
                this.finish = true;
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถ Reversed ข้อมูลได้",
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.modal_add_reversed = false;
              }
            });

          this.sale_email = "";
          this.customer_search = {
            customer_no: "",
            customer_name: "",
          };
          this.rulesCus = [];
          this.add_reverse_rrv = "";
          this.add_statement = "";
          this.add_reverse_status = "";
          this.add_reverse_remark = "";
          this.invoice_detail = [
          {
            invoice_no: "",
            status: "",
            amount_after_vat: "",
          },
          ];
          this.check_invoice = true;
          this.new_invoice_list = [];
          this.data_customer = [];
          this.select_invoice = [];
          this.select_status = false;
          
          this.finish = false;
          this.getLogReverse();
        },
        search_Cus(customer) {
          this.sale_email = "";
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
                this.rulesCus = [];
                this.axios
                .get(
                  process.env.VUE_APP_API + "/customer/filterinvoices/CusNo="+customer,
                  headers
                ).then((response) => {
                  this.new_invoice_list = [];
                  this.data_customer = [];
                  this.sale_email = response.data.data[0].sale_email
                  this.data_customer = response.data.data;
                  this.data_customer.forEach((element) => {
                    this.new_invoice_list.push(
                      element.invoice_no
                    )
                  })
                  //console.log(this.new_invoice_list)
                })
              }
            })
            .catch((error) => {
              if (error) {
                this.rulesCus = [
                    (value) => value.customer_no == "" || "Cus No. ไม่ถูกต้อง",
                  ];
                this.customer_search.customer_name = "";
              }
            });
        },
        deleteRowInvoice(invoice_no ,index){
          let select_invoice_list = [];
          this.select_invoice.forEach((data) =>{
            if(data == invoice_no){
              select_invoice_list = this.select_invoice.filter(item => item !== invoice_no)
              this.select_invoice = select_invoice_list
            }
          });
          this.invoice_detail.splice(index, 1);
          this.invoice_detail.forEach((element) =>{
            if(element.invoice_no == ""){
              this.select_status = false;
            }
          })
        },
        addRowInvoice(invoice_no){
          this.select_invoice.push(invoice_no);
          var newItem = {
            invoice_no: "",
            status: "",
            amount_after_vat: "",
          };
          this.select_status = false;
          this.invoice_detail.push(newItem);
        },
        invoice(invoice_no,index){
          this.data_customer.forEach((data) => {
            if(data.invoice_no == invoice_no){
              for( let i = 0; i < this.invoice_detail.length; i++){
                if(index == i){
                  this.invoice_detail[index].amount_after_vat = Number(
                    data.amount_after_vat
                  ).toFixed(2);
                }
              }
            }

            for(let i = 0; i < this.invoice_detail.length; i++){
              if(this.invoice_detail[i].invoice_no == ""){
                this.select_status = false;
                break;
              }else{
                this.select_status = true;
              }
            }
          });

          if(this.select_invoice.length > 0){
            for(let k = 0; k < this.select_invoice.length ;  k++ ){
              if(this.select_invoice[k] == invoice_no){
                this.check_invoice = false;
                break
              }else{
                this.check_invoice = true;
              }
            }
          }
          
          for(let i = 0; i < this.select_invoice.length; i++){
            if(i == index){
              this.select_invoice[i] = invoice_no;
            }
          }
        },
        // convert number
        covertNumber(item) {
          return Number(item).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
        listfilter_data(name){
          if (this.Alldata !== null){
            if (name == "customer_name"){
              var customer_name = [];
              if (customer_name.includes(["blank"]) == false) {
                customer_name.push("[blank]");
              }
              this.Alldata.forEach((element) => {
                if (element.customer_name !== "" || element.customer_name !== undefined) {
                  customer_name.push(element.customer_name);
                }
              });
              this.customer_name_list = customer_name;
            }else if(name == "invoice_no"){
              var invoice_no = [];
              if (invoice_no.includes(["blank"]) == false) {
                invoice_no.push("[blank]");
              }
              this.Alldata.forEach((element) => {
                if (element.invoice_no !== "" || element.invoice_no !== undefined) {
                  invoice_no.push(element.invoice_no);
                }
              });
              this.invoice_no_list = invoice_no;
            }else if(name == "user"){
              var user = [];
              if (user.includes(["blank"]) == false) {
                user.push("[blank]");
              }
              this.Alldata.forEach((element) => {
                if (element.user !== "" || element.user !== undefined) {
                  user.push(element.user);
                }
              });
              this.user_list = user;
            }
          }
        },
        editStatus(item){
          this.finish = false;
          //console.log(item)
          var updateData = {
            invoice_no: item.invoice_no,
            status: item.status
          }
          console.log(updateData)
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
            .post(
              process.env.VUE_APP_API + "/statement/log/reverse",
              updateData,
              headers_update
            )
            .then(() => {
              this.finish = true;
              this.getLogReverse();
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
                  this.getLogReverse();
                });
              }
            });
        },
        parseDateRequest(date) {
          return date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "";
        },
        searchWord() {
          this.page = 1;
          this.finish = false;
          this.getLogReverse();
        },
        clearFilter() {
          this.search = "";
          this.page = 1;
          this.finish = false;
          this.getLogReverse();
        },
        number_INC() {
          return Number(this.item_per_page);
        },
        item_per_page_inc() {
          this.getLogReverse();
        },
        pageChange() {
          this.getLogReverse();
        },
        filter(filter,key){
          // ส่ง filter = ข้อมูล มีแบบ object และ string
          // key = =ชื่อของคอลัม

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
            )
              this.filterlist.splice(0, 1);
          }
          //------------------แปลงค่าที่ส่งจาก filter (Yes/No) เป็น True/False ---------------------//
          //------------------กรณีนี้คือ ต้องส่งค่า boolean เป็น string ไปแทนเพราะ backend รับเป็น string---------------------//
          

          //------------------กรณีนี้คือ ต้องส่งค่า 0,1 เป็นไปแทนเพราะ backend รับเป็น 0,1---------------------//


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
            .post(process.env.VUE_APP_API + "/statement/log/reversefilter", body, headers_filter)
            .then((response) => {
              this.finish = false;
              if (response.status === 200) {
                this.finish = true;
                if (response.status === 200 && response.data.data !== null) {
                  this.finish = true;
                  this.reverse_data = response.data.data;
                  this.dataExportFilter = response.data.export;
                  this.page_total = response.data.count_page;
                }else {
                  this.finish = true;
                  this.reverse_data = [];
                  this.dataExportFilter = [];
                  this.page_total = 1;
                }
              } else {
                this.finish = true;
                this.reverse_data = [];
                this.dataExportFilter = [];
              }
              if (this.filterlist.length == 0) {
                this.getLogReverse();
              }
          });

        },
        blank_checkbox(name){
          if (name == "document_no"){
            if (this.document_no_blank == true) {
              this.document_no = "[blank]";
              this.filter("blank_string", "document_no");
            } else {
              this.document_no = "";
              this.filter("", "document_no");
            }
          }else if (name == "customer_no"){
            if (this.customer_no_blank == true) {
              this.customer_no = "[blank]";
              this.filter("blank_string", "customer_no");
            } else {
              this.customer_no = "";
              this.filter("", "customer_no");
            }
          }else if (name == "statement_no"){
            if (this.statement_no_blank == true){
              this.statement_no = "[blank]";
              this.filter("blank_string", "statement_no");
            } else {
              this.statement_no = "";
              this.filter("", "statement_no");
            }
          }else if (name == "remark"){
            if (this.remark_blank == true){
              this.remark = "[blank]";
              this.filter("blank_string", "remark");
            } else {
              this.remark = "";
              this.filter("", "remark");
            }
          }else if (name == "cn_number"){
            if (this.cn_number_blank == true){
              this.cn_number = "[blank]";
              this.filter("blank_string", "cn_number");
            } else {
              this.cn_number = "";
              this.filter("", "cn_number");
            }
          }else if (name == "hand_list"){
            if (this.hand_list_blank == true){
              this.hand_list = "[blank]";
              this.filter("blank_string", "hand_list");
            } else {
              this.hand_list = "";
              this.filter("", "hand_list");
            }
          }else if (name == "receipt_no"){
            if (this.receipt_no_blank == true){
              this.receipt_no = "[blank]";
              this.filter("blank_string", "receipt_no");
            } else {
              this.receipt_no = "";
              this.filter("", "receipt_no");
            }
          }else if (name == "rv_number"){
            if (this.rv_number_blank == true){
              this.rv_number = "[blank]";
              this.filter("blank_string", "rv_number");
            } else {
              this.rv_number = "";
              this.filter("", "rv_number");
            }
          }else if (name == "reverse_number"){
            if (this.reverse_number_blank == true){
              this.reverse_number = "[blank]";
              this.filter("blank_string", "reverse_number");
            } else {
              this.reverse_number = "";
              this.filter("", "reverse_number");
            }
          }else if (name == "new_rv_number"){
            if (this.new_rv_number_blank == true){
              this.new_rv_number = "[blank]";
              this.filter("blank_string", "new_rv_number");
            } else {
              this.new_rv_number = "";
              this.filter("", "new_rv_number");
            }
          }else if (name == "reverse_status"){
            if (this.reverse_status_blank == true){
              this.reverse_status = "[blank]";
              this.filter("blank_string", "reverse_status");
            } else {
              this.reverse_status = "";
              this.filter("", "reverse_status");
            }
          }else if (name == "reverse_status_remark"){
            if (this.reverse_status_remark_blank == true){
              this.reverse_status_remark = "[blank]";
              this.filter("blank_string", "reverse_status_remark");
            } else {
              this.reverse_status_remark = "";
              this.filter("", "reverse_status_remark");
            }
          }
        },
        actionChangeFilter(date,name){
          if (name == "date"){
            this.date[0] = date.startDate
              .split("/")
              .reverse()
              .join("-");
            this.date[1] = date.endDate
              .split("/")
              .reverse()
              .join("-");
          }
        },
        blankModalFilter(name) {
          if(name == "date"){
            this.$refs["my-modal_date"].hide();
            this.date = ["0000-00-00"];
            this.text_date = "[blank]";
            this.filter(this.date, name);
            this.date_range.startDate = null;
            this.date_range.endDate = null;
          }
        },
        hideModalFilter(name){
          if(name == "date"){
            this.$refs["my-modal_date"].hide();
            this.text_date = null;
            this.date_range.startDate = null;
            this.date_range.endDate = null;
            this.close_dialog(name);
          }
        },
        OkFilterModal(name){
          if (name == "date"){
            if (
              this.date[0] == "" ||
              (this.date[0] == null && this.date[1] == "") ||
              this.date[1] == null
            ) {
              alert("กรุณาเลือกช่วงวันที่ให้ครบ");
            } else {
              this.$refs["my-modal_date"].hide();
              this.text_date =
                this.date[0]
                  .split("-")
                  .reverse()
                  .join("/") +
                " - " +
                this.date[1]
                  .split("-")
                  .reverse()
                  .join("/");
              this.filter(this.date, name);
            }
          }
        },
        exportAll(){
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
            .get(process.env.VUE_APP_API + "/statement/export/log/reverse_all",headers)
            .then((response) => {
                if(response.status == 200) {
                  const fileURL = window.URL.createObjectURL(response.data);
                  const fileLink = document.createElement("a");
                  fileLink.href = fileURL;
                  fileLink.setAttribute("download", "export_log_reverse_all.csv");
                  document.body.appendChild(fileLink);
                  fileLink.click();
                }
            }).catch((error) => {
              if(error){
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถ export ได้",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });

        },
        exportByFilter(){
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
          let body = this.dataExportFilter
          this.axios
            .post(process.env.VUE_APP_API + "/statement/export/log/reverse/filter",body,headers)
            .then((response) => {
                if(response.status == 200) {
                  const fileURL = window.URL.createObjectURL(response.data);
                  const fileLink = document.createElement("a");
                  fileLink.href = fileURL;
                  fileLink.setAttribute("download", "export_log_reverse_filter.csv");
                  document.body.appendChild(fileLink);
                  fileLink.click();
                }
            }).catch((error) => {
              if(error){
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถ export ได้",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });
        },
        actionChange(date){
          this.export_date[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.export_date[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        },
        hideModal(){
          this.$refs["my-modal-export_date"].hide();
          this.export_date_range.startDate = null;
          this.export_date_range.endDate = null;
          this.export_date[0] = null;
          this.export_date[1] = null;
        },
        OkExportModal(){
          if (
            this.export_date[0] == "" ||
            (this.export_date[0] == null && this.export_date[1] == "") ||
            this.export_date[1] == null
          ) {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          }else{
            this.$refs["my-modal-export_date"].hide();
            this.export_file(this.export_date);
          }
        },
        export_file(date) {
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
          var Datas = {
            start_date: date[0],
            end_date: date[1]
          }
          //console.log(Datas)
          this.axios
            .post(process.env.VUE_APP_API + "/statement/export/log/reverse",Datas,headers)
            .then((response) => {
                if(response.status == 200) {
                  const fileURL = window.URL.createObjectURL(response.data);
                  const fileLink = document.createElement("a");
                  fileLink.href = fileURL;
                  fileLink.setAttribute("download", "export_log_reverse.csv");
                  document.body.appendChild(fileLink);
                  fileLink.click();
                }
            }).catch((error) => {
              if(error){
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถ export ได้",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });

          this.export_date_range.startDate = null;
          this.export_date_range.endDate = null;
          this.export_date[0] = null;
          this.export_date[1] = null;
        },
    }

}
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

#log-invoice-table {
  th.text-start {
    background-color: #ececec !important;
  }
  th.text-center {
    background-color: #ececec !important;
  }
  th.text-left {
    background-color: #ececec !important;
  }
  textarea.form-control {
    resize: auto !important;
    overflow: hidden !important;
    max-height: 100000px !important;
  }

  th.text-start.log-invoice {
    position: sticky;
    z-index: 5 !important;
    left: 0px !important;
    padding-top: 14px;
    // border-right: 1px solid #cccccc;
    // background-color: rgb(168, 255, 214) !important;
    background: linear-gradient(
      90deg,
      #ececec 99%,
      rgba(101, 101, 101, 1) 100%
    ) !important;
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
    background-color: #ececec !important;
    position: sticky;
    left: 0;
    z-index: 4 !important;
  }
  .blank {
    position: sticky;
    left: 0;
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
  .fixed {
    position: sticky !important;
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
  tbody {
    td.text-start {
      font-family: "Bai_Jamjuree" !important;
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
    td.text-center {
      font-family: "Bai_Jamjuree" !important;
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
      font-family: "Bai_Jamjuree" !important;
      position: sticky !important;
      width: 200px !important;
      left: 0 !important;
      z-index: 1 !important;
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
  z-index: 1100;
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
.container.reverse_table_detail {
  padding: 0px;
  // background: #FBF9F9;
  // border: 1px dashed #000000;
  // border-radius: 5px;
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
.v-dialog--fullscreen {
  top: 64px !important;
}
.invoice-header {
  border: 1px solid white;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: rgb(103, 194, 93);
  font-size: 16px !important;
  color: white;
  text-align: center;
}
.invoice-header-data {
  border: 1px solid white;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
#invoice-list {
  .v-select__slot {
    position: relative;
    align-items: center;
    display: flex;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    border: 1px solid #cecece !important;
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
  .v-select__slot {
    position: relative;
    align-items: center;
    display: flex;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    border: 1px solid #cecece;
    border-radius: 0px;
  }
}
.fixed-invoice-new {
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
</style>