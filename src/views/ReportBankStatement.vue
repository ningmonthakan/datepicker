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
                          justify-content: space-between;
                      "
                  >
                      <h3 style="font-weight:700">Report Bank Statement</h3>
                  </v-col>

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
                              >
                                  Clear All</v-btn>
                          </v-card-title>
                          <v-card-text>
                            <!--
                              <download-csv :data="debt_data" name="export_report_bank_statement.csv"
                                  ><v-btn
                                      color="teal"
                                      dark
                                      style="width: 150px; font-size: 12px; font-weight: 600"
                                      text
                                  >
                                      Export All File
                                  </v-btn>
                              </download-csv>
                            -->
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
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkExportModal()"
                                          >OK</b-button
                                        >
                                    </div>
                                  </div>
                                </b-modal>

                            </div>

                              <!-- --------------------------------------table--------------------------------------------- -->
                            <div class="cover-table">
                              <div class="table-invoice" style="position: relative">
                                <v-data-table
                                  :headers="headers"
                                  :items="datalist"
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
                                    <!-- filter Customer No -->
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
                                    <!-- filter Customer Name -->
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
                                    <!-- filter Invoice no -->
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
                                    <!-- filter Receipt Amount -->
                                    <td v-if="filter_column[6].show == true"></td>
                                    <!-- filter Aging -->
                                    <td v-if="filter_column[7].show == true"></td>
                                    <!-- filter ยอดชำระ -->
                                    <td v-if="filter_column[8].show == true"></td>
                                    <!-- filter WHT -->
                                    <td v-if="filter_column[9].show == true">
                                      <v-autocomplete
                                        auto-select-first
                                        dense
                                        multiple
                                        v-model="tax_code"
                                        type="text"
                                        style="font-size:14px"
                                        label="WHT"
                                        :items="tax_code_list"
                                        @change="
                                          filter(tax_code, String('tax_code'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter Fee -->
                                    <td v-if="filter_column[10].show == true"></td>
                                    <!-- filter เงินขาด/เงินเกิน -->
                                    <td v-if="filter_column[11].show == true"></td>
                                    <!-- filter รหัสพิเศษ -->
                                    <td v-if="filter_column[12].show == true">
                                      <v-autocomplete
                                        auto-select-first
                                        dense
                                        multiple
                                        v-model="special_code"
                                        type="text"
                                        style="font-size:14px"
                                        label="รหัสพิเศษ"
                                        :items="special_code_list"
                                        @change="
                                          filter(special_code, String('special_code'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter Statement No -->
                                    <td v-if="filter_column[13].show == true">
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
                                    <!-- filter คนตัดหนี้ -->
                                    <td v-if="filter_column[14].show == true">
                                      <v-autocomplete
                                        multiple
                                        dense
                                        :search-input.sync="search_user_matching"
                                        v-model="user_matching"
                                        type="text"
                                        label="คนตัดหนี้"
                                        :items="user_matching_list"
                                        @change="
                                          filter(user_matching, String('user_matching'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter Type-->
                                    <td v-if="filter_column[15].show == true">
                                      <v-autocomplete
                                        auto-select-first
                                        dense
                                        multiple
                                        v-model="type"
                                        type="text"
                                        style="font-size:14px"
                                        label="type"
                                        :items="type_list"
                                        @change="
                                          filter(type, String('type'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter ช่องทางการแจ้งหลักฐาน -->
                                    <td v-if="filter_column[16].show == true">
                                      <v-autocomplete
                                        auto-select-first
                                        dense
                                        multiple
                                        v-model="evidence_reporting"
                                        type="text"
                                        style="font-size:14px"
                                        label="ช่องทางการแจ้งหลักฐาน"
                                        :items="evidence_reporting_list"
                                        @change="
                                          filter(evidence_reporting, String('evidence_reporting'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter วันที่ชำระ -->
                                    <td v-if="filter_column[17].show == true">
                                      <input
                                        class="form-control"
                                        type="text"
                                        v-model="text_confirm_date"
                                        label="date"
                                        placeholder="วันที่ชำระ"
                                        style="font-size:14px"
                                        v-b-modal.modal-center-confirm-date
                                        data-backdrop="static"
                                        data-keyboard="false"
                                      />
                                      <div>
                                        <b-modal
                                          class="dialog_date"
                                          ref="my-modal_confirm_date"
                                          data-backdrop="static"
                                          no-close-on-backdrop
                                          id="modal-center-confirm-date"
                                          centered
                                          hide-footer
                                          title="วันที่ชำระ"
                                        >
                                          <cv-date-picker
                                            placeholder="dd/mm/yyyy"
                                            light
                                            kind="range"
                                            :date-end-label="dateEndLabelFilter"
                                            :cal-options="calOptionsFilter"
                                            @change="actionChangeFilter(confirm_date_range, 'confirm_date')"
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
                                              @click="blankModalFilter('confirm_date')"
                                            >
                                              [Blank]
                                            </button>
                                            <div style="width: 160px"></div>
                                            <div class="d-flex">
                                              <b-button
                                                data-dismiss="modal"
                                                class="mt-3"
                                                variant="outline-danger"
                                                @click="hideModalFilter('confirm_date')"
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
                                    </td>
                                    <!-- filter ส่งเมลติดตาม WHT -->
                                    <td v-if="filter_column[18].show == true">
                                      <input
                                        v-model="send_mail_wht"
                                        class="form-control"
                                        @change="filter(send_mail_wht, String('send_mail_wht'))"
                                        placeholder="ส่งเมลติดตาม WHT"
                                        :disabled="send_mail_wht_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('send_mail_wht')"
                                          v-model="send_mail_wht_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter ส่งเมลใบเสร็จ -->
                                    <td v-if="filter_column[19].show == true">
                                      <input
                                        v-model="send_mail_receipt"
                                        class="form-control"
                                        @change="filter(send_mail_receipt, String('send_mail_receipt'))"
                                        placeholder="ส่งเมลใบเสร็จ"
                                        :disabled="send_mail_receipt_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('send_mail_receipt')"
                                          v-model="send_mail_receipt_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter วันที่ตัดหนี้ -->
                                    <td v-if="filter_column[20].show == true">
                                      <input
                                        class="form-control"
                                        type="text"
                                        v-model="text_rv_date"
                                        label="date"
                                        placeholder="วันที่ตัดหนี้"
                                        style="font-size:14px"
                                        v-b-modal.modal-center-rv-date
                                        data-backdrop="static"
                                        data-keyboard="false"
                                      />
                                      <div>
                                        <b-modal
                                          class="dialog_date"
                                          ref="my-modal_rv_date"
                                          data-backdrop="static"
                                          no-close-on-backdrop
                                          id="modal-center-rv-date"
                                          centered
                                          hide-footer
                                          title="วันที่ตัดหนี้"
                                        >
                                          <cv-date-picker
                                            placeholder="dd/mm/yyyy"
                                            light
                                            kind="range"
                                            :date-end-label="dateEndLabelFilter"
                                            :cal-options="calOptionsFilter"
                                            @change="actionChangeFilter(rv_date_range, 'rv_date')"
                                            v-model="rv_date_range"
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
                                              @click="blankModalFilter('rv_date')"
                                            >
                                              [Blank]
                                            </button>
                                            <div style="width: 160px"></div>
                                            <div class="d-flex">
                                              <b-button
                                                data-dismiss="modal"
                                                class="mt-3"
                                                variant="outline-danger"
                                                @click="hideModalFilter('rv_date')"
                                                >Cancel</b-button
                                              >
                                              <div style="width: 10px"></div>
                                              <b-button
                                                data-dismiss="modal"
                                                class="mt-3"
                                                variant="outline-primary"
                                                @click="OkFilterModal('rv_date')"
                                                >OK</b-button
                                              >
                                            </div>
                                          </div>
                                        </b-modal>
                                      </div>
                                    </td>
                                    <!-- filter เอกสาร WHT -->
                                    <td v-if="filter_column[21].show == true">
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
                                    <!-- filter Remark -->
                                    <td v-if="filter_column[22].show == true">
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
                                    <!-- filter รายการพิเศษ -->
                                    <td v-if="filter_column[23].show == true">
                                      <v-autocomplete
                                        auto-select-first
                                        dense
                                        multiple
                                        v-model="spacial_list"
                                        type="text"
                                        style="font-size:14px"
                                        label="รายการพิเศษ"
                                        :items="spacial_list_list"
                                        @change="
                                          filter(spacial_list, String('spacial_list'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter Status ยกเลิก INV -->
                                    <td v-if="filter_column[24].show == true">
                                      <input
                                        v-model="status_cancel_invoice"
                                        class="form-control"
                                        @change="filter(status_cancel_invoice, String('status_cancel_invoice'))"
                                        placeholder="Status ยกเลิก INV"
                                        :disabled="status_cancel_invoice_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('status_cancel_invoice')"
                                          v-model="status_cancel_invoice_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter Status ยกเลิก BS -->
                                    <td v-if="filter_column[25].show == true">
                                      <input
                                        v-model="status_cancel_bs"
                                        class="form-control"
                                        @change="filter(status_cancel_bs, String('status_cancel_bs'))"
                                        placeholder="Status ยกเลิก BS"
                                        :disabled="status_cancel_bs_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('status_cancel_bs')"
                                          v-model="status_cancel_bs_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter ยอด WHT -->
                                    <td v-if="filter_column[26].show == true"></td>
                                    <!-- filter ชื่อการเงิน -->
                                    <td v-if="filter_column[27].show == true">
                                      <v-autocomplete
                                        multiple
                                        dense
                                        :search-input.sync="search_finance_name"
                                        v-model="finance_name"
                                        type="text"
                                        label="ชื่อการเงิน"
                                        :items="finance_name_list"
                                        @change="
                                          filter(finance_name, String('finance_name'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter Adjust JV -->
                                    <td v-if="filter_column[28].show == true">
                                      <input
                                        v-model="adjust_jv"
                                        class="form-control"
                                        @change="filter(adjust_jv, String('adjust_jv'))"
                                        placeholder="Adjust JV"
                                        :disabled="adjust_jv_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('adjust_jv')"
                                          v-model="adjust_jv_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter Status WHT -->
                                    <td v-if="filter_column[29].show == true">
                                      <input
                                        v-model="status_wht"
                                        class="form-control"
                                        @change="filter(status_wht, String('status_wht'))"
                                        placeholder="Status WHT"
                                        :disabled="status_wht_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('status_wht')"
                                          v-model="status_wht_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter bank -->
                                    <td v-if="filter_column[30].show == true">
                                      <v-autocomplete
                                        auto-select-first
                                        dense
                                        multiple
                                        v-model="payment_type_bank"
                                        type="text"
                                        style="font-size:14px"
                                        label="bank"
                                        :items="payment_type_list"
                                        @change="
                                          filter(payment_type_bank, String('payment_type_bank'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter User -->
                                    <td v-if="filter_column[31].show == true">
                                      <v-autocomplete
                                        multiple
                                        dense
                                        :search-input.sync="search_action_by_name"
                                        v-model="action_by_name"
                                        type="text"
                                        label="User"
                                        :items="action_by_name_list"
                                        @change="
                                          filter(action_by_name, String('action_by_name'))
                                        "
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter Status -->
                                    <td v-if="filter_column[32].show == true">
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
                                    <!-- filter Mail WHT -->
                                    <td v-if="filter_column[33].show == true">
                                      <v-autocomplete
                                        multiple
                                        v-model="check_mail_wht"
                                        type="text"
                                        style="font-size:14px"
                                        label="Mail WHT"
                                        :items="pay_list"
                                        @change="filter(check_mail_wht, String('check_mail_wht'))"
                                        auto-select-first
                                        dense
                                        item-text="name"
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter Mail Confirm Invoice -->
                                    <td v-if="filter_column[34].show == true">
                                      <v-autocomplete
                                        multiple
                                        v-model="check_mail_invoice"
                                        type="text"
                                        style="font-size:14px"
                                        label="Mail Confirm Invoice"
                                        :items="pay_list"
                                        @change="filter(check_mail_invoice, String('check_mail_invoice'))"
                                        auto-select-first
                                        dense
                                        item-text="name"
                                      ></v-autocomplete>
                                    </td>
                                    <!-- filter Receipt No -->
                                    <td v-if="filter_column[35].show == true">
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
                                    <!-- filter Receipt Status-->
                                    <td v-if="filter_column[36].show == true">
                                      <input
                                        v-model="receipt_status"
                                        class="form-control"
                                        @change="filter(receipt_status, String('receipt_status'))"
                                        placeholder="Receipt Status"
                                        :disabled="receipt_status_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('receipt_status')"
                                          v-model="receipt_status_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter Ramark Receipt -->
                                    <td v-if="filter_column[37].show == true">
                                      <input
                                        v-model="receipt_remark"
                                        class="form-control"
                                        @change="filter(receipt_remark, String('receipt_remark'))"
                                        placeholder="Ramark Receipt"
                                        :disabled="receipt_remark_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('receipt_remark')"
                                          v-model="receipt_remark_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter เลขที่ตัดหนี้ -->
                                    <td v-if="filter_column[38].show == true">
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
                                    <!-- filter Status เลขที่ตัดหนี้ -->
                                    <td v-if="filter_column[39].show == true">
                                      <input
                                        v-model="status_rvnumber"
                                        class="form-control"
                                        @change="filter(status_rvnumber, String('status_rvnumber'))"
                                        placeholder="Status เลขที่ตัดหนี้"
                                        :disabled="status_rvnumber_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('status_rvnumber')"
                                          v-model="status_rvnumber_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter Remark ตัดหนี้ -->
                                    <td v-if="filter_column[40].show == true">
                                      <input
                                        v-model="remark_rv"
                                        class="form-control"
                                        @change="filter(remark_rv, String('remark_rv'))"
                                        placeholder="Remark ตัดหนี้"
                                        :disabled="remark_rv_blank == true"
                                      />
                                      <div class="d-flex">
                                        <input
                                          type="checkbox"
                                          @change="blank_checkbox('remark_rv')"
                                          v-model="remark_rv_blank"
                                        />
                                        <div style="font-size: 10px">[blank]</div>
                                      </div>
                                    </td>
                                    <!-- filter  -->
                                    <td v-if="filter_column[41].show == true"></td>
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

                                <template v-slot:[`item.rv_date`]="{ item }">
                                  <label
                                    v-if="parseDate(item.rv_date) != '01/01/0001'"
                                  >
                                    {{ parseDate(item.rv_date) }}</label
                                  >
                                </template>

                                <template v-slot:[`item.confirm_date`]="{ item }">
                                  <label>{{ formatDate(item.confirm_date) }}</label
                                  >
                                </template>

                                <template v-slot:[`item.check_mail_wht`]="{ item }">
                                  <div class="d-flex justify-center mb-6 bg-surface-variant">
                                    <v-checkbox v-model="item.check_mail_wht" disabled></v-checkbox>
                                  </div>
                                </template>

                                <template v-slot:[`item.check_mail_invoice`]="{ item }">
                                  <div class="d-flex justify-center mb-6 bg-surface-variant">
                                    <v-checkbox v-model="item.check_mail_invoice" disabled></v-checkbox>
                                  </div>
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

                                <template v-slot:[`item.receipt_remark`]="{ item }">
                                  <b-textarea
                                    placeholder="remark receipt"
                                    v-model="item.receipt_remark"
                                    style="border-radius: 0px;"
                                    rows="1"
                                    max-rows="1"
                                    disabled
                                  ></b-textarea>
                                </template>

                                <template v-slot:[`item.remark_rv`]="{ item }">
                                  <b-textarea
                                    placeholder="remark ตัดหนี้"
                                    v-model="item.remark_rv"
                                    style="border-radius: 0px;"
                                    rows="1"
                                    max-rows="1"
                                    disabled
                                  ></b-textarea>
                                </template>

                                <template v-slot:[`item.spacial_list`]="{ item }">
                                  <select
                                    class="style-chooser form-control"
                                    v-model="item.spacial_list"
                                    @change="select_1(item)"
                                  >
                                    <option value=""></option>
                                    <option value="Reverse">Reverse</option>
                                    <option value="Suspense ขาด">Suspense ขาด</option>
                                    <option value="Suspense เกิน">Suspense เกิน</option>
                                    <option value="ลดหนี้">ลดหนี้</option>
                                    <option value="แทนลดหนี้">แทนลดหนี้</option>
                                    <option value="บวกมือ">บวกมือ</option>
                                    <option value="แทนบวกมือ">แทนบวกมือ</option>
                                  </select>
                                </template>

                                <template v-slot:[`item.status_cancel_invoice`]="{ item }">
                                  <input
                                    type="text"
                                    class="style-chooser form-control"
                                    v-model="item.status_cancel_invoice"
                                    @change="select_1(item)"
                                  />
                                </template>

                                <template v-slot:[`item.status_cancel_bs`]="{ item }">
                                  <input
                                    type="text"
                                    class="style-chooser form-control"
                                    v-model="item.status_cancel_bs"
                                    @change="select_1(item)"
                                  />
                                </template>

                                <template v-slot:[`item.adjust_jv`]="{ item }">
                                  <input
                                    type="text"
                                    class="style-chooser form-control"
                                    v-model="item.adjust_jv"
                                    @change="select_1(item)"
                                  />
                                </template>

                                <template v-slot:[`item.status_wht`]="{ item }">
                                  <input
                                    type="text"
                                    class="style-chooser form-control"
                                    v-model="item.status_wht"
                                    @change="select_1(item)"
                                  />
                                </template>
                                
                                <template v-slot:[`item.detail`]="{ item }">
                                  <v-btn
                                    color="primary"
                                    class="mb-2"
                                    @click="open_detail_dialog(item.invoice_no)"
                                  >
                                    Detail
                                    <v-icon right dark>mdi-chevron-double-right</v-icon>
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
                  </v-col>
                  <!---------------------------------------Dialog Detail-------------------------------------------->
                  <v-dialog
                    v-model="detail_dialog"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>Detail</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn icon dark @click="close_detail_dialog()">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-toolbar-items>
                      </v-toolbar>

                      <div style="padding: 20px">
                        <v-card>
                          <v-card-text>
                            <div class="cover-table">
                              <div class="table-invoice" style="position: relative">
                                <v-data-table
                                  :headers="headers_detail"
                                  :items="log_data_list"
                                  :items-per-page="-1"
                                  class="elevation-3"
                                  fixed-header
                                  height="650px"
                                  hide-default-footer
                                  id="log-invoice-table"
                                >
                                <template v-slot:[`item.date`]="{ item }">
                                  <label
                                    v-if="parseDateRequest(item.date) != '01/01/0001'"
                                  >
                                    {{ parseDateRequest(item.date) }}</label
                                  >
                                </template>

                                <template v-slot:[`item.rv_date`]="{ item }">
                                  <label
                                    v-if="parseDate(item.rv_date) != '01/01/0001'"
                                  >
                                    {{ parseDate(item.rv_date) }}</label
                                  >
                                </template>

                                <template v-slot:[`item.confirm_date`]="{ item }">
                                  <label>{{ formatDate(item.confirm_date) }}</label
                                  >
                                </template>

                                <template v-slot:[`item.check_mail_wht`]="{ item }">
                                  <div class="d-flex justify-center mb-6 bg-surface-variant">
                                    <v-checkbox v-model="item.check_mail_wht" disabled></v-checkbox>
                                  </div>
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

                                <template v-slot:[`item.receipt_remark`]="{ item }">
                                  <b-textarea
                                    placeholder="remark receipt"
                                    v-model="item.receipt_remark"
                                    style="border-radius: 0px;"
                                    rows="1"
                                    max-rows="1"
                                    disabled
                                  ></b-textarea>
                                </template>

                                <template v-slot:[`item.remark_rv`]="{ item }">
                                  <b-textarea
                                    placeholder="remark ตัดหนี้"
                                    v-model="item.remark_rv"
                                    style="border-radius: 0px;"
                                    rows="1"
                                    max-rows="1"
                                    disabled
                                  ></b-textarea>
                                </template>

                                <template v-slot:[`item.check_mail_invoice`]="{ item }">
                                  <div class="d-flex justify-center mb-6 bg-surface-variant">
                                    <v-checkbox v-model="item.check_mail_invoice" disabled></v-checkbox>
                                  </div>
                                </template>
                                </v-data-table>
                              </div>
                            </div>
                          </v-card-text>
                        </v-card>
                      </div>
                    </v-card>
                  </v-dialog>
              </v-row>
          </div>
        </v-container>
        
    </div>
  
</template>

<script>
import moment from "moment";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
import Swal from "sweetalert2";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
import JsonCSV from "vue-json-csv";
Vue.component("downloadCsv", JsonCSV);
export default {
    data: () => ({
        finish: false,
        detail_dialog: false,
        debt_data: [],
        log_data_list: [],
        item_per_page: 100,
        page: 1,
        page_total: 1,
        search: "",
        datalist: [],
        dataExportFilter: [],
        export_date_range: {
          startDate: null,
          endDate: null,
        },
        export_date: [null, null],
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
            text: "Receipt Amount",
            value: "aging",
            width: "200px",
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
            text: "ยอดชำระ",
            value: "sum_amounts",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "WHT",
            value: "tax_code",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Fee",
            value: "fee",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "เงินขาด/เงินเกิน",
            value: "money",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "รหัสพิเศษ",
            value: "special_code",
            width: "150px",
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
            text: "คนตัดหนี้",
            value: "user_matching",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Type",
            value: "type",
            width: "180px",
            sortable: true,
            align: "center",
          },
          {
            text: "ช่องทางการแจ้งหลักฐาน",
            value: "evidence_reporting",
            width: "250px",
            sortable: true,
            align: "center",
          },
          {
            text: "วันที่ชำระ",
            value: "confirm_date",
            width: "180px",
            sortable: true,
            align: "center",
          },
          {
            text: "ส่งเมลติดตาม WHT",
            value: "send_mail_wht",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "ส่งเมลใบเสร็จ",
            value: "send_mail_receipt",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "วันที่ตัดหนี้",
            value: "rv_date",
            width: "180px",
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
            text: "Remark",
            value: "remark",
            width: "300px",
            sortable: true,
            align: "center",
          },
          {
            text: "รายการพิเศษ",
            value: "spacial_list",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Status ยกเลิก INV",
            value: "status_cancel_invoice",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Status ยกเลิก BS",
            value: "status_cancel_bs",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "ยอด WHT",
            value: "sum_wht",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "ชื่อการเงิน",
            value: "finance_name",
            width: "250px",
            sortable: true,
            align: "center",
          },
          {
            text: "Adjust JV",
            value: "adjust_jv",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Status WHT",
            value: "status_wht",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Bank",
            value: "payment_type_bank",
            width: "180px",
            sortable: true,
            align: "center",
          },
          {
            text: "User",
            value: "action_by_name",
            width: "200px",
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
          {
            text: "Mail WHT",
            value: "check_mail_wht",
            width: "180px",
            sortable: true,
            align: "center",
          },
          {
            text: "Mail Confirm Invoice",
            value: "check_mail_invoice",
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
            text: "Receipt Status",
            value: "receipt_status",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Ramark Receipt",
            value: "receipt_remark",
            width: "300px",
            sortable: true,
            align: "center",
          },
          {
            text: "เลขที่ตัดหนี้",
            value: "rv_number",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Status เลขที่ตัดหนี้",
            value: "status_rvnumber",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Remark ตัดหนี้",
            value: "remark_rv",
            width: "300px",
            sortable: true,
            align: "center",
          },
          {
            text: "Detail",
            value: "detail",
            width: "200px",
            sortable: true,
            align: "center",
          }
        ],
        headers_detail: [
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
            text: "Receipt Amount",
            value: "aging",
            width: "200px",
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
            text: "ยอดชำระ",
            value: "sum_amounts",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "WHT",
            value: "tax_code",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Fee",
            value: "fee",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "เงินขาด/เงินเกิน",
            value: "money",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "รหัสพิเศษ",
            value: "special_code",
            width: "150px",
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
            text: "คนตัดหนี้",
            value: "user_matching",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Type",
            value: "type",
            width: "180px",
            sortable: true,
            align: "center",
          },
          {
            text: "ช่องทางการแจ้งหลักฐาน",
            value: "evidence_reporting",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "วันที่ชำระ",
            value: "confirm_date",
            width: "180px",
            sortable: true,
            align: "center",
          },
          {
            text: "ส่งเมลติดตาม WHT",
            value: "send_mail_wht",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "ส่งเมลใบเสร็จ",
            value: "send_mail_receipt",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "วันที่ตัดหนี้",
            value: "rv_date",
            width: "180px",
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
            text: "Remark",
            value: "remark",
            width: "300px",
            sortable: true,
            align: "center",
          },
          {
            text: "รายการพิเศษ",
            value: "spacial_list",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Status ยกเลิก INV",
            value: "status_cancel_invoice",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Status ยกเลิก BS",
            value: "status_cancel_bs",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "ยอด WHT",
            value: "sum_wht",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "ชื่อการเงิน",
            value: "finance_name",
            width: "250px",
            sortable: true,
            align: "center",
          },
          {
            text: "Adjust JV",
            value: "adjust_jv",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Status WHT",
            value: "status_wht",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Bank",
            value: "payment_type_bank",
            width: "180px",
            sortable: true,
            align: "center",
          },
          {
            text: "User",
            value: "action_by_name",
            width: "200px",
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
          {
            text: "Mail WHT",
            value: "check_mail_wht",
            width: "180px",
            sortable: true,
            align: "center",
          },
          {
            text: "Mail Confirm Invoice",
            value: "check_mail_invoice",
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
            text: "Receipt Status",
            value: "receipt_status",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Ramark Receipt",
            value: "receipt_remark",
            width: "300px",
            sortable: true,
            align: "center",
          },
          {
            text: "เลขที่ตัดหนี้",
            value: "rv_number",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Status เลขที่ตัดหนี้",
            value: "status_rvnumber",
            width: "200px",
            sortable: true,
            align: "center",
          },
          {
            text: "Remark ตัดหนี้",
            value: "remark_rv",
            width: "300px",
            sortable: true,
            align: "center",
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
            text: "Receipt Amount",
            value: "aging",
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
            text: "ยอดชำระ",
            value: "sum_amounts",
            show: true,
            fixed: false,
          },
          {
            text: "WHT",
            value: "tax_code",
            show: true,
            fixed: false,
          },
          {
            text: "Fee",
            value: "fee",
            show: true,
            fixed: false,
          },
          {
            text: "เงินขาด/เงินเกิน",
            value: "money",
            show: true,
            fixed: false,
          },
          {
            text: "รหัสพิเศษ",
            value: "special_code",
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
            text: "คนตัดหนี้",
            value: "user_matching",
            show: true,
            fixed: false,
          },
          {
            text: "Type",
            value: "type",
            show: true,
            fixed: false,
          },
          {
            text: "ช่องทางการแจ้งหลักฐาน",
            value: "evidence_reporting",
            show: true,
            fixed: false,
          },
          {
            text: "วันที่ชำระ",
            value: "confirm_date",
            show: true,
            fixed: false,
          },
          {
            text: "ส่งเมลติดตาม WHT",
            value: "send_mail_wht",
            show: true,
            fixed: false,
          },
          {
            text: "ส่งเมลใบเสร็จ",
            value: "send_mail_receipt",
            show: true,
            fixed: false,
          },
          {
            text: "วันที่ตัดหนี้",
            value: "rv_date",
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
            text: "Remark",
            value: "remark",
            show: true,
            fixed: false,
          },
          {
            text: "รายการพิเศษ",
            value: "spacial_list",
            show: true,
            fixed: false,
          },
          {
            text: "Status ยกเลิก INV",
            value: "status_cancel_invoice",
            show: true,
            fixed: false,
          },
          {
            text: "Status ยกเลิก BS",
            value: "status_cancel_bs",
            show: true,
            fixed: false,
          },
          {
            text: "ยอด WHT",
            value: "sum_wht",
            show: true,
            fixed: false,
          },
          {
            text: "ชื่อการเงิน",
            value: "finance_name",
            show: true,
            fixed: false,
          },
          {
            text: "Adjust JV",
            value: "adjust_jv",
            show: true,
            fixed: false,
          },
          {
            text: "Status WHT",
            value: "status_wht",
            show: true,
            fixed: false,
          },
          {
            text: "Bank",
            value: "payment_type_bank",
            show: true,
            fixed: false,
          },
          {
            text: "User",
            value: "action_by_name",
            show: true,
            fixed: false,
          },
          {
            text: "Status",
            value: "status",
            show: true,
            fixed: false,
          },
          {
            text: "Mail WHT",
            value: "check_mail_wht",
            show: true,
            fixed: false,
          },
          {
            text: "Mail Confirm Invoice",
            value: "check_mail_invoice",
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
            text: "Receipt Status",
            value: "receipt_status",
            show: true,
            fixed: false,
          },
          {
            text: "Ramark Receipt",
            value: "receipt_remark",
            show: true,
            fixed: false,
          },
          {
            text: "เลขที่ตัดหนี้",
            value: "rv_number",
            show: true,
            fixed: false,
          },
          {
            text: "Status เลขที่ตัดหนี้",
            value: "status_rvnumber",
            show: true,
            fixed: false,
          },
          {
            text: "Remark ตัดหนี้",
            value: "remark_rv",
            show: true,
            fixed: false,
          },
          {
            text: "",
            value: "",
            show: true,
            fixed: false,
          },
          {
            text: "",
            value: "",
            show: true,
            fixed: false,
          }
        ],
        Alldata: [],
        //filter document no
        document_no: "",
        document_no_blank: false,
        //filter email date
        text_email_date: null,
        email_date: [null, null],
        email_date_range: {
          startDate: null,
          endDate: null,
        },
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
        //filter WHT
        tax_code: "",
        tax_code_list: [
          "[blank]",
          "R53-01 ค่าบริการ 1%",
          "R53-04 ค่าบริการ 1.5%",
          "R53-06 ค่าบริการ 2%",
          "R53-02 ค่าบริการ 3%",
          "R53-03 ค่าเช่า 5%"
        ],
        //filter รหัสพิเศษ
        special_code: "",
        special_code_list: [
          "[blank]",
          "01",
          "02",
          "03",
        ],
        //filter bank
        payment_type_bank: "",
        payment_type_list: [
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
        ],
        //filter Statement No
        statement_no: "",
        statement_no_blank: false,
        //filter Type
        type: "",
        type_blank: false,
        type_list: [
          "[blank]",
          "Saved",
          "Transfer",
          "CHQ",
          "Reject",
          "Reversed",
          "Clear"
        ],
        //filter ช่องทางการแจ้งหลักฐาน
        evidence_reporting: "",
        evidence_reporting_blank: false,
        evidence_reporting_list: [
          "[blank]",
          "Mail",
          "Mail-Confirm",
          "QR-Code",
          "Statement",
          "Suspense",
          "Online",
          "Urgent",
          "Waroom",
          "BPM",
          "CHQ",
          "เงินสด",
        ],
        //filter รายการพิเศษ
        spacial_list: "",
        spacial_list_list: [
          "[blank]",
          "Reverse",
          "Suspense ขาด",
          "Suspense เกิน",
          "ลดหนี้",
          "แทนลดหนี้",
          "บวกมือ",
          "แทนบวกมือ",
        ],
        //filter วันที่ชำระ
        text_confirm_date: null,
        confirm_date: [null, null],
        confirm_date_range: {
          startDate: null,
          endDate: null,
        },
        //filter วันที่ตัดหนี้
        text_rv_date: null,
        rv_date: [null, null],
        rv_date_range: {
          startDate: null,
          endDate: null,
        },
        //filter เอกสาร WHT
        type_wht: "",
        type_wht_list: [
          "[blank]",
          "0",
          "1"
        ],
        //filter Remark
        remark: "",
        remark_blank: false,
        //filter ส่งเมลติดตาม WHT
        send_mail_wht: "",
        send_mail_wht_blank: false,
        //filter ส่งเมลใบเสร็จ
        send_mail_receipt: "",
        send_mail_receipt_blank: false,
        //filter Status ยกเลิก INV
        status_cancel_invoice: "",
        status_cancel_invoice_blank: false,
        //filter Status ยกเลิก BS
        status_cancel_bs: "",
        status_cancel_bs_blank: false,
        //filter Adjust JV
        adjust_jv: "",
        adjust_jv_blank: false,
        //filter Status WHT
        status_wht: "",
        status_wht_blank: false,
        //filter คนตัดหนี้
        search_user_matching: null,
        user_matching: "",
        user_matching_list: [],
        //filter ชื่อการเงิน
        search_finance_name: null,
        finance_name: "",
        finance_name_list: [],
        //filter User
        search_action_by_name: null,
        action_by_name: "",
        action_by_name_list: [],
        //filter Status
        search_status: null,
        status: "",
        status_list: [],
        //filter Mail WHT
        check_mail_wht: "",
        //filter Mail Confirm Invoice
        check_mail_invoice: "",
        //filter Receipt No
        receipt_no: "",
        receipt_no_blank: false,
        //filter Receipt Status
        receipt_status: "",
        receipt_status_blank: false,
        //filter Ramark Receipt
        receipt_remark: "",
        receipt_remark_blank: false,
        //filter เลขที่ตัดหนี้
        rv_number: "",
        rv_number_blank: false,
        //filter Status เลขที่ตัดหนี้
        status_rvnumber: "",
        status_rvnumber_blank: false,
        //filter Remark ตัดหนี้
        remark_rv: "",
        remark_rv_blank: false,
        dateEndLabelFilter: "End date",
        calOptionsFilter: {
          dateFormat: "d/m/Y",
        },
        pay_list: [
          {
            name: "True",
            value: "true",
          },
          {
            name: "False",
            value: "false",
          },
        ],
        filterlist: [],
        role_status: "",
    }),
    created() {
        this.role_status = localStorage.getItem("role");
        if (this.role_status !== "super_admin" && this.role_status !== "admin" && this.role_status !== "wait_down_service") {
            this.$router.push("/invoice");
        } else if (localStorage.getItem("acces_token")) {
            this.finish = false;
            this.getReport();
        }
    },
    watch: {},
    computed: {},
    methods: {
        getReport(){
          this.finish = false;
          this.datalist = [];
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
              "/statement/log/statement?size=" +
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
              this.datalist = response.data.data;
              this.Alldata = response.data.data;
              this.page_total = response.data.count_page;
              this.customer_name_list = [];
              this.listfilter_data("customer_name");
              this.listfilter_data("invoice_no");
              this.listfilter_data("user_matching");
              this.listfilter_data("finance_name");
              this.listfilter_data("action_by_name");
              this.listfilter_data("status");
            }else {
              this.finish = true;
              this.datalist = [];
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
        formatDate(item){
          let sum = "";
          let new_date = "";
          if(item){
            let con_date = item.split(",");
            if(con_date.length > 1){
              con_date.forEach((element) => {
                new_date += this.parseDate(element) + ",\n";
                sum = new_date.slice(0, -2) + '';
              });
            }else{
              sum = this.parseDate(item)
            }
            return sum;
          }
        },
        fomatEmail(item) {
          let sum = "";
          if (item) {
            let email = item.split(";");
            email.forEach((element) => {
              sum += element + "\n";
            });
            return sum;
          }
        },
        searchWord() {
          this.page = 1;
          this.finish = false;
          this.getReport();
        },
        clearFilter() {
          this.search = "";
          this.page = 1;
          this.finish = false;
          this.getReport();
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
            }else if(name == "user_matching"){
              var user_matching = [];
              if (user_matching.includes(["blank"]) == false) {
                user_matching.push("[blank]");
              }
              this.Alldata.forEach((element) => {
                if (element.user_matching !== "") {
                  user_matching.push(element.user_matching);
                }
              });
              this.user_matching_list = user_matching;
            }else if(name == "finance_name"){
              var finance_name = [];
              if (finance_name.includes(["blank"]) == false) {
                finance_name.push("[blank]");
              }
              this.Alldata.forEach((element) => {
                if (element.finance_name !== "") {
                  finance_name.push(element.finance_name);
                }
              });
              this.finance_name_list = finance_name;
            }else if(name == "action_by_name"){
              var action_by_name = [];
              if (action_by_name.includes(["blank"]) == false) {
                action_by_name.push("[blank]");
              }
              this.Alldata.forEach((element) => {
                if (element.action_by_name !== "" || element.action_by_name !== undefined) {
                  action_by_name.push(element.action_by_name);
                }
              });
              this.action_by_name_list = action_by_name;
            }else if(name == "status"){
              var status = [];
              if (status.includes(["blank"]) == false) {
                status.push("[blank]");
              }
              this.Alldata.forEach((element) => {
                if (element.status !== "" || element.status !== undefined) {
                  status.push(element.status);
                }
              });
              this.status_list = status;
            }
          }
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
            .post(process.env.VUE_APP_API + "/statement/log/statementfilter", body, headers_filter)
            .then((response) => {
              this.finish = false;
              if (response.status === 200) {
                this.finish = true;
                if (response.status === 200 && response.data.data !== null) {
                  this.finish = true;
                  this.datalist = response.data.data;
                  this.dataExportFilter = response.data.export;
                  this.page_total = response.data.count_page;
                }else {
                  this.finish = true;
                  this.datalist = [];
                  this.dataExportFilter = [];
                  this.page_total = 1;
                }
              } else {
                this.finish = true;
                this.datalist = [];
                this.dataExportFilter = [];
              }
              if (this.filterlist.length == 0) {
                this.getReport();
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
          }else if (name == "type"){
            if (this.type_blank == true){
              this.type = "[blank]";
              this.filter("blank_string", "type");
            } else {
              this.type = "";
              this.filter("", "type");
            }
          }else if (name == "send_mail_wht"){
            if (this.send_mail_wht_blank == true){
              this.send_mail_wht = "[blank]";
              this.filter("blank_string", "send_mail_wht");
            } else {
              this.send_mail_wht = "";
              this.filter("", "send_mail_wht");
            }
          }else if (name == "send_mail_receipt"){
            if (this.send_mail_receipt_blank == true){
              this.send_mail_receipt = "[blank]";
              this.filter("blank_string", "send_mail_receipt");
            } else {
              this.send_mail_receipt = "";
              this.filter("", "send_mail_receipt");
            }
          }else if (name == "status_cancel_invoice"){
            if (this.status_cancel_invoice_blank == true){
              this.status_cancel_invoice = "[blank]";
              this.filter("blank_string", "status_cancel_invoice");
            } else {
              this.status_cancel_invoice = "";
              this.filter("", "status_cancel_invoice");
            }
          }else if (name == "status_cancel_bs"){
            if (this.status_cancel_bs_blank == true){
              this.status_cancel_bs = "[blank]";
              this.filter("blank_string", "status_cancel_bs");
            } else {
              this.status_cancel_bs = "";
              this.filter("", "status_cancel_bs");
            }
          }else if (name == "adjust_jv"){
            if (this.adjust_jv_blank == true){
              this.adjust_jv = "[blank]";
              this.filter("blank_string", "adjust_jv");
            } else {
              this.adjust_jv = "";
              this.filter("", "adjust_jv");
            }
          }else if (name == "status_wht"){
            if (this.status_wht_blank == true){
              this.status_wht = "[blank]";
              this.filter("blank_string", "status_wht");
            } else {
              this.status_wht = "";
              this.filter("", "status_wht");
            }
          }else if (name == "remark"){
            if (this.remark_blank == true){
              this.remark = "[blank]";
              this.filter("blank_string", "remark");
            } else {
              this.remark = "";
              this.filter("", "remark");
            }
          }else if (name == "receipt_no"){
            if (this.receipt_no_blank == true){
              this.receipt_no = "[blank]";
              this.filter("blank_string", "receipt_no");
            } else {
              this.receipt_no = "";
              this.filter("", "receipt_no");
            }
          }else if (name == "receipt_status"){
            if (this.receipt_status_blank == true){
              this.receipt_status = "[blank]";
              this.filter("blank_string", "receipt_status");
            } else {
              this.receipt_status = "";
              this.filter("", "receipt_status");
            }
          }else if (name == "receipt_remark"){
            if (this.receipt_remark_blank == true){
              this.receipt_remark = "[blank]";
              this.filter("blank_string", "receipt_remark");
            } else {
              this.receipt_remark = "";
              this.filter("", "receipt_remark");
            }
          }else if (name == "rv_number"){
            if (this.rv_number_blank == true){
              this.rv_number = "[blank]";
              this.filter("blank_string", "rv_number");
            } else {
              this.rv_number = "";
              this.filter("", "rv_number");
            }
          }else if (name == "status_rvnumber"){
            if (this.status_rvnumber_blank == true){
              this.status_rvnumber = "[blank]";
              this.filter("blank_string", "status_rvnumber");
            } else {
              this.status_rvnumber = "";
              this.filter("", "status_rvnumber");
            }
          }else if (name == "remark_rv"){
            if (this.remark_rv_blank == true){
              this.remark_rv = "[blank]";
              this.filter("blank_string", "remark_rv");
            } else {
              this.remark_rv = "";
              this.filter("", "remark_rv");
            }
          }
        },
        blankModalFilter(name) {
          if (name == "email_date"){
            this.$refs["my-modal_email_date"].hide();
            this.email_date = ["0000-00-00"];
            this.text_email_date = "[blank]";
            this.filter(this.email_date, name);
            this.email_date_range.startDate = null;
            this.email_date_range.endDate = null;
          }else if(name == "date"){
            this.$refs["my-modal_date"].hide();
            this.date = ["0000-00-00"];
            this.text_date = "[blank]";
            this.filter(this.date, name);
            this.date_range.startDate = null;
            this.date_range.endDate = null;
          }else if(name == "confirm_date"){
            this.$refs["my-modal_confirm_date"].hide();
            this.confirm_date = ["0000-00-00"];
            this.text_confirm_date = "[blank]";
            this.filter(this.confirm_date, name);
            this.confirm_date_range.startDate = null;
            this.confirm_date_range.endDate = null;
          }else if(name == "rv_date"){
            this.$refs["my-modal_rv_date"].hide();
            this.rv_date = ["0000-00-00"];
            this.text_rv_date = "[blank]";
            this.filter(this.rv_date, name);
            this.rv_date_range.startDate = null;
            this.rv_date_range.endDate = null;
          }
        },
        actionChangeFilter(date,name){
          if (name == "email_date"){
            this.email_date[0] = date.startDate
              .split("/")
              .reverse()
              .join("-");
            this.email_date[1] = date.endDate
              .split("/")
              .reverse()
              .join("-");
          }else if (name == "date"){
            this.date[0] = date.startDate
              .split("/")
              .reverse()
              .join("-");
            this.date[1] = date.endDate
              .split("/")
              .reverse()
              .join("-");
          }else if (name == "confirm_date"){
            this.confirm_date[0] = date.startDate
              .split("/")
              .reverse()
              .join("-");
            this.confirm_date[1] = date.endDate
              .split("/")
              .reverse()
              .join("-");
          }else if (name == "rv_date"){
            this.rv_date[0] = date.startDate
              .split("/")
              .reverse()
              .join("-");
            this.rv_date[1] = date.endDate
              .split("/")
              .reverse()
              .join("-");
          }
        },
        hideModalFilter(name){
          if (name == "email_date"){
            this.$refs["my-modal_email_date"].hide();
            this.text_email_date = null;
            this.email_date_range.startDate = null;
            this.email_date_range.endDate = null;
            this.close_dialog(name);
          }else if(name == "date"){
            this.$refs["my-modal_date"].hide();
            this.text_date = null;
            this.date_range.startDate = null;
            this.date_range.endDate = null;
            this.close_dialog(name);
          }else if(name == "confirm_date"){
            this.$refs["my-modal_confirm_date"].hide();
            this.text_confirm_date = null;
            this.confirm_date_range.startDate = null;
            this.confirm_date_range.endDate = null;
            this.close_dialog(name);
          }else if(name == "rv_date"){
            this.$refs["my-modal_rv_date"].hide();
            this.text_rv_date = null;
            this.rv_date_range.startDate = null;
            this.rv_date_range.endDate = null;
            this.close_dialog(name);
          }
        },
        OkFilterModal(name){
          if (name == "email_date"){
            if (
              this.email_date[0] == "" ||
              (this.email_date[0] == null && this.email_date[1] == "") ||
              this.email_date[1] == null
            ) {
              alert("กรุณาเลือกช่วงวันที่ให้ครบ");
            } else {
              this.$refs["my-modal_email_date"].hide();
              this.text_email_date =
                this.email_date[0]
                  .split("-")
                  .reverse()
                  .join("/") +
                " - " +
                this.email_date[1]
                  .split("-")
                  .reverse()
                  .join("/");
              this.filter(this.email_date, name);
            }
          }else if (name == "date"){
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
          }else if (name == "confirm_date"){
            if (
              this.confirm_date[0] == "" ||
              (this.confirm_date[0] == null && this.confirm_date[1] == "") ||
              this.confirm_date[1] == null
            ) {
              alert("กรุณาเลือกช่วงวันที่ให้ครบ");
            } else {
              this.$refs["my-modal_confirm_date"].hide();
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
          }else if (name == "rv_date"){
            if (
              this.rv_date[0] == "" ||
              (this.rv_date[0] == null && this.rv_date[1] == "") ||
              this.rv_date[1] == null
            ) {
              alert("กรุณาเลือกช่วงวันที่ให้ครบ");
            } else {
              this.$refs["my-modal_rv_date"].hide();
              this.text_rv_date =
                this.rv_date[0]
                  .split("-")
                  .reverse()
                  .join("/") +
                " - " +
                this.rv_date[1]
                  .split("-")
                  .reverse()
                  .join("/");
              this.filter(this.rv_date, name);
            }
          }
        },
        close_dialog(name){
          for (let index = 0; index < this.filterlist.length; index++) {
            if (name == this.filterlist[index].key) {
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
            .post(process.env.VUE_APP_API + "/statement/log/statementfilter", body, headers_filter)
            .then((response) => {
              this.finish = false;
              if (response.status === 200) {
                this.finish = true;
                if (response.status === 200 && response.data.data !== null) {
                  this.finish = true;
                  this.datalist = response.data.data;
                  this.page_total = response.data.count_page;
                }else {
                  this.finish = true;
                  this.datalist = [];
                  this.page_total = 1;
                }
              } else {
                this.finish = true;
                this.datalist = [];
              }
              if (this.filterlist.length == 0) {
                this.getReport();
              }
          });
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
            .post(process.env.VUE_APP_API + "/statement/export/log/statement",Datas,headers)
            .then((response) => {
                if(response.status == 200) {
                  const fileURL = window.URL.createObjectURL(response.data);
                  const fileLink = document.createElement("a");
                  fileLink.href = fileURL;
                  fileLink.setAttribute("download", "export_bank_statement.csv");
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
            .get(process.env.VUE_APP_API + "/statement/export/log/statementall",headers)
            .then((response) => {
                if(response.status == 200) {
                  const fileURL = window.URL.createObjectURL(response.data);
                  const fileLink = document.createElement("a");
                  fileLink.href = fileURL;
                  fileLink.setAttribute("download", "export_bank_statement_all.csv");
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
            .post(process.env.VUE_APP_API + "/statement/export/log/statement/filter",body,headers)
            .then((response) => {
                if(response.status == 200) {
                  const fileURL = window.URL.createObjectURL(response.data);
                  const fileLink = document.createElement("a");
                  fileLink.href = fileURL;
                  fileLink.setAttribute("download", "export_bank_statement_filter.csv");
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
        select_1(item){
          var Datas = {
            invoice_no: item.invoice_no,
            send_mail_wht: item.send_mail_wht,
            send_mail_receipt: item.send_mail_receipt,
            spacial_list: item.spacial_list,
            status_cancel_invoice: item.status_cancel_invoice,
            status_cancel_bs: item.status_cancel_bs,
            adjust_jv: item.adjust_jv,
            status_wht: item.status_wht
          }
          console.log(Datas)
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
            .post(process.env.VUE_APP_API + "/statement/log/updatestatement", Datas, headers)
            .then(() => {
              this.finish = true;
              this.getReport();
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
                  this.getReport();
                });
              }
            });
        },
        number_INC() {
          return Number(this.item_per_page);
        },
        pageChange() {
          this.getReport();
        },
        item_per_page_inc() {
          this.getReport();
        },
        parseDate(date) {
          return date ? moment(date).format("DD/MM/YYYY") : "";
        },
        parseDateRequest(date) {
          return date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "";
        },
        open_detail_dialog(invoice_no){
          this.detail_dialog = true;
          this.log_data_list = [];
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
            .get(process.env.VUE_APP_API + "/statement/log/statement/detail/invoicenumber="+ invoice_no, headers)
            .then((response) => {
              if (response.data.data) {
                this.log_data_list = response.data.data;
              }
              this.finish = true;
            })
            .catch((error) => {
              if (error) {
                this.finish = true;
                if(error.response.status == 401){
                  localStorage.clear();
                  this.$router.push("/login");
                }
              }
            });
        },
        close_detail_dialog() {
          this.detail_dialog = false;
          this.log_data_list = [];
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
