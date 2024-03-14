MD
<template>
  <div class="text-center">
    <v-dialog
      width="110%"
      scrollable
      :value="matching_dialog"
      persistent
      style="z-index:1009"
    >
    <!-- =================================Loading ======================================================= -->
    <div
      style="margin: 0"
      class="loading-waiting"
      v-bind:style="{ display: finish == false ? 'none' : '' }"
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
      <v-card>
        <v-card-title
          class="text-h5 tab-tilte-dialog"
          style="background-color: #035891"
        >
          <span
            class="text-h5"
            style="
                color: white;
                font-family: 'Bai_Jamjuree' !important;
            "
            >Matching</span
          >
          <v-spacer></v-spacer>
          <v-btn icon dark @click="modal_close_dialog = true">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" sm="6" md="6" style="font-size: 16px">
                <span class="font-weight-bold">ประเภทการชำระ: </span
                >{{ payment_type }}<br /><br />
                <span class="font-weight-bold"> Customer No. : </span>
                {{ customer_no }} <br />
                <br />
                <span class="font-weight-bold"> Customer Name : </span>
                {{ customer_name }}
              </v-col>
              <v-col cols="3" sm="3" md="3">
                <div
                  class="d-flex pt-2 pb-5"
                  style="width:auto; align-content: left;"
                >
                  <div
                    style="width: 25%; font-size: 14px; color:black; font-family:'Bai_Jamjuree'; margin-top:8px"
                  >
                    หลักฐาน :
                  </div>

                  <v-btn
                    v-if="files == ''"
                    color="#FF5252"
                    outlined
                    class="justify-start"
                    @click="upload_File_Dialog = true"
                    style="
                      width: 75%; 
                      font-size: 14px; 
                      font-weight: 600; 
                      border-radius: 0px;
                      min-height: 48px !important;
                      height: 100% !important;"
                  >
                    แนบไฟล์
                    <v-icon right dark> mdi-file-download-outline </v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    class="justify-start"
                    color="rgb(103, 194, 93)"
                    outlined
                    @click="upload_File_Dialog = true"
                    style="
                      width: 75%; 
                      font-size: 14px; 
                      font-weight: 600; 
                      border-radius: 0px;
                      min-height: 48px !important;
                      height: 100% !important;"
                  >
                    {{files.length}} ไฟล์
                    <v-icon right dark> mdi-file-download-outline </v-icon>
                  </v-btn>
                </div>
                <div
                  class="d-flex"
                  id="matching"
                  style="width:auto; align-content: left;"
                >
                  <div
                    style="width: 25%; font-size: 14px; color:black; font-family: 'Bai_Jamjuree'; padding-top: 10px"
                  >
                    เอกสาร WHT :
                  </div>
                  <div style="width: 15%;">
                    <v-form ref="form">
                      <v-select
                        class="mt-n6"
                        :disabled="check_wht == false"
                        v-model="WHT_list"
                        :items="['0', '1']"
                        :rules="selectRules"
                        @change="validateselect(WHT_list)"
                        required
                      ></v-select>
                    </v-form>
                  </div>
                  <div style="width: 5%;"></div>
                  <v-btn
                    v-if="files_wht == ''"
                    color="#FF5252"
                    outlined
                    class="justify-start"
                    @click="upload_File_WHT_Dialog = true"
                    style="
                      width: 55%;
                      font-size: 14px; 
                      font-weight: 600; 
                      border-radius: 0px;
                      min-height: 47px !important;
                      height: 100% !important;"
                    :disabled="WHT_list !== '1'"
                  >
                    แนบไฟล์ WHT
                    <v-icon right dark> mdi-file-download-outline </v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    color="rgb(103, 194, 93)"
                    outlined
                    class="justify-start"
                    @click="upload_File_WHT_Dialog = true"
                    style="
                      width: 55%; 
                      font-size: 14px; 
                      font-weight: 600; 
                      border-radius: 0px;
                      min-height: 47px !important;
                      height: 100% !important;"
                  >
                    {{files_wht.length}} ไฟล์
                    <v-icon right dark> mdi-file-download-outline </v-icon>
                  </v-btn>
                  
                </div>
              </v-col>
              <v-col cols="3" sm="3" md="3">
                <v-list
                  dense
                  style="text-align: center;background-color: #EBF1E9;"
                >
                  <v-subheader
                    style="
                      font-size: 16px;
                      background-color: rgb(103, 194, 93);
                      justify-content: center;
                      color: white;
                      margin-top:-7px;
                    "
                    >Request Mail</v-subheader
                  >
                  <!--
                  <v-list-item-group color="rgb(103, 194, 93)">
                    <v-list-item>
                      <v-list-item-content
                        @click="
                          (modal_request_mail = true), requestMail('Mail')
                        "
                      >
                        <v-list-item-title>Mail ยืนยันยอด</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content
                        @click="
                          (modal_request_mail_wht = true),
                            requestMail('MailWHT')
                        "
                      >
                        <v-list-item-title>Mail ติดตาม WHT</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content
                        @click="
                          (modal_request_mail_and_wht = true),
                            requestMail('Mail_WHT')
                        "
                      >
                        <v-list-item-title
                          >Mail ยืนยันยอด + ติดตาม WHT</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                  -->
                  <!--------------- Mail ยืนยันใบแจ้งหนี้ ---------------->
                  <v-list-item
                    v-if="customer_email == '' && check_code != true"
                    color="gray"
                    disabled
                  >
                    <v-list-item-title>Mail ยืนยันใบแจ้งหนี้</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="status_mail_wht == true && check_req_mail_WHT == true"
                    color="gray"
                    disabled
                  >
                    <v-list-item-title>Mail ยืนยันใบแจ้งหนี้</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="check_code == true"
                    color="gray"
                    disabled
                  >
                    <v-list-item-title>Mail ยืนยันใบแจ้งหนี้</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="status_mail_wht == true && check_req_mail_WHT == true"
                    color="rgb(103, 194, 93)"
                    disabled
                  >
                    <v-list-item-title>Mail ติดตาม WHT</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="status_mail_invoice == false && customer_email != '' && check_req_mail_WHT !== true && check_code != true"
                    color="rgb(103, 194, 93)"
                    @click="modal_request_mail = true"
                  >
                    <v-list-item-title>Mail ยืนยันใบแจ้งหนี้</v-list-item-title>
                  </v-list-item>

                  <!--------------- Mail ติดตาม WHT ---------------->
                  <v-list-item
                    v-if="customer_email == '' && check_code != true"
                    color="gray"
                    disabled
                  >
                    <v-list-item-title>Mail ติดตาม WHT</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="status_mail_invoice == true && check_req_mail == true"
                    color="rgb(103, 194, 93)"
                    disabled
                  >
                    <v-list-item-title>Mail ยืนยันใบแจ้งหนี้</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="status_mail_invoice == true && check_req_mail == true"
                    color="gray"
                    disabled
                  >
                    <v-list-item-title>Mail ติดตาม WHT</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="check_code == true"
                    color="gray"
                    disabled
                  >
                    <v-list-item-title>Mail ติดตาม WHT</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="status_mail_wht == false && customer_email != '' && check_req_mail !== true && check_code != true"
                    color="gray"
                    @click="modal_request_mail_wht = true"
                    :disabled ="WHT_list == '1'"
                  >
                    <v-list-item-title>Mail ติดตาม WHT</v-list-item-title>
                  </v-list-item>

                  <!-- <v-list-item
                        v-if="(status_mail_total == true || customer_email == '')"
                        color="gray"
                        disabled
                       >
                        <v-list-item-title
                          >Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT</v-list-item-title
                        >
                    </v-list-item>
                    <v-list-item
                        v-if="(status_mail_total == false && customer_email != '')"
                        color="rgb(103, 194, 93)"
                        @click="modal_request_mail_and_wht = true"
                        >
                        <v-list-item-title
                          >Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT</v-list-item-title
                        >
                    </v-list-item> -->

                  <!-- แบบใหม่ -->
                  <!-- <v-list-item
                        :disabled="customer_email == ''"
                        color="rgb(103, 194, 93)"
                        @click="modal_request_mail = true"
                        >
                        <v-list-item-title>Mail ยืนยันใบแจ้งหนี้</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      :disabled="customer_email == ''"
                      color="rgb(103, 194, 93)"
                      @click="modal_request_mail_wht = true"
                      >
                      <v-list-item-title>Mail ติดตาม WHT</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        :disabled="customer_email == ''"
                        color="rgb(103, 194, 93)"
                        @click="modal_request_mail_and_wht = true"
                        >
                        <v-list-item-title
                          >Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT</v-list-item-title
                        >
                    </v-list-item> -->
                </v-list>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="7"
                sm="7"
                md="7"
                id="scroll-target"
                style="max-height: 500px"
                class="overflow-y-auto"
              >
                <v-container
                  class="table_detail"
                  v-scroll:#scroll-target="onScroll"
                  style="height: 1000px"
                >
                  <table style="width: 100%">
                    <tr style="vertical-align: middle; text-align: center;">
                      <!-- <th
                      v-for="(item, index) in headers_matching_detail"
                      :key="index"
                      class="invoice-header pa-2"
                    >
                      {{ item.text }}
                    </th> -->

                      <th class="invoice-header" style="width: 80px">
                        <v-checkbox
                          id="mail-wht"
                          class="shrink ma-0"
                          v-model="checkall_mail"
                          :disabled="customer_email == ''"
                          dense
                          dark
                          @change="checkAll('mail', checkall_mail)"
                        >
                          <template v-slot:label>
                            <span id="checkboxLabel">Email</span>
                          </template>
                        </v-checkbox>
                      </th>
                      <th class="invoice-header" style="width: 80px">
                        <v-checkbox
                          class="shrink ma-0"
                          id="mail-wht"
                          dark
                          v-model="checkall_wht"
                          dense
                          @click="validate()"
                          @change="checkAll('wht', checkall_wht)"
                        >
                          <template v-slot:label>
                            <span id="checkboxLabel">WHT</span>
                          </template>
                        </v-checkbox>
                      </th>
                      <th class="invoice-header pa-2">Invoice No.</th>
                      <th class="invoice-header pa-2">Invoice Date.</th>
                      <th class="invoice-header pa-2">Receipt No.</th>
                      <th class="invoice-header pa-2" style="width:12%">
                        Amount
                      </th>
                      <th class="invoice-header pa-2">ยอดที่ต้องการตัดหนี้</th>
                      <th class="invoice-header pa-2"></th>
                    </tr>
                    <tr
                      class="frist-new"
                      v-for="(item, index) in customer_detail"
                      :key="index"
                    >
                      <!-- checkbox email -->
                      <td class="invoice-header-data">
                        <v-checkbox
                          :disabled="customer_email == ''"
                          class="ml-2"
                          v-model="item.checkbox_mail"
                          @change="checkMail(item, item.checkbox_mail)"
                        ></v-checkbox>
                      </td>
                      <!-- checkbox wht -->
                      <td class="invoice-header-data">
                        <v-checkbox
                          class="ml-2"
                          @click="validate()"
                          @change="calTypeWht(item, item.checkbox_wht)"
                          v-model="item.checkbox_wht"
                        ></v-checkbox>
                      </td>
                      <td v-if="item.temp_id" style="width: %;">
                        <div id="invoice-list">
                          <v-autocomplete
                            class="align-center-input ml-1 mr-1"
                            dense
                            v-model="item.invoice_no"
                            style="font-size:10px;"
                            @change="invoice(item.invoice_no, index)"
                            :items="new_invoice_list"
                            :rules="[(v) => !!v || 'กรุณาเลือก Invoice No.', 
                                    (v) => (check_invoice == true) || 'กรุณาเลือก Invoice No. ใหม่']"
                            :error="item.invoice_no == ''"
                            item-text="inv"
                            item-value="inv"
                            required
                            hide-selected
                          ></v-autocomplete>
                        </div>
                      </td>
                      <td
                        v-else
                        class="invoice-header-data"
                        style="width: 17%; text-align: center;"
                      >
                        {{ item.invoice_no }}
                      </td>
                      <td
                        class="invoice-header-data"
                        style="width: 12%; text-align: center;"
                      >
                        {{ parseDate(item.invoice_date) }}
                      </td>
                      <td v-if="item.temp_id" class="invoice-header-data">
                        <div v-if="check_receipt == false">
                          <input
                            @change="checkReceipt()"
                            type="text"
                            class="table-invoice-input-error "
                            v-model="item.receipt_number"
                            style="text-align: center; height: 48px; border-radius: 0px;"
                          />
                        </div>
                        <div v-else>
                          <input
                            @change="checkReceipt()"
                            type="text"
                            class="table-invoice-input "
                            v-model="item.receipt_number"
                            style="text-align: center; height: 48px; border-radius: 0px;"
                          />
                        </div>
                      </td>
                      <td v-else class="invoice-header-data">
                        <div v-if="check_receipt == false">
                          <input
                            @change="checkReceipt()"
                            type="text"
                            class="table-invoice-input-error "
                            v-model="item.receipt_number"
                            style="text-align: center; height: 48px; border-radius: 0px;"
                          />
                        </div>
                        <div v-else>
                          <input
                            @change="checkReceipt()"
                            type="text"
                            class="table-invoice-input "
                            v-model="item.receipt_number"
                            style="text-align: center; height: 48px; border-radius: 0px;"
                          />
                        </div>
                      </td>
                      <td v-if="item.temp_id" style="width:12%">
                        <input
                          type="text"
                          class="table-invoice-input"
                          v-model="item.amount_after_vat"
                          style="text-align: right; height: 48px; padding-right: 10px; border-radius: 0px;"
                          :onkeypress="
                            onchangeAddAmount(item.amount_after_vat, 'Amount')
                          "
                        />
                      </td>
                      <td v-else class="invoice-header-data" style="width:12% ">
                        <div style="text-align: right;">
                          {{ covertNumber(item.amount_after_vat) }}
                        </div>
                      </td>
                      <td v-if="item.temp_id" class="invoice-header-data">
                        <input
                          type="text"
                          class="table-invoice-input-2"
                          style="text-align: right; height: 48px; padding-right: 10px; border-radius: 0px;"
                          v-model="item.aging"
                          :onkeypress="onchangeAddAmount(item.aging, 'Aging')"
                        />
                      </td>
                      <td
                        style="width:155px"
                        v-else
                        class="invoice-header-data"
                      >
                        <input
                          type="text"
                          :onkeypress="onchangeAddAmount(item.aging, 'Aging')"
                          style="text-align: right; height: 48px; padding-right: 10px; border-radius: 0px;"
                          v-model="item.aging"
                          class="table-invoice-input-2"
                        />
                      </td>
                      <td style="width:auto;">
                        <v-btn
                          v-if="customer_detail.length > 1"
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
                          v-if="index == customer_detail.length - 1"
                          :hidden="check_invoice == false"
                        >
                          <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td class="pl-2" style="text-align: center;">
                        <strong>Total</strong>
                      </td>
                      <td></td>
                      <td></td>
                      <td style="text-align: right;">
                        <strong>{{
                          covertNumber(sum_amount_after_vat)
                        }}</strong>
                      </td>
                      <td style="text-align: right;">
                        <strong>{{ covertNumber(sum_aging) }}</strong>
                      </td>
                    </tr>
                  </table>
                </v-container>
              </v-col>
              <v-col
                cols="5"
                sm="5"
                md="5"
                id="scroll-target"
                style="max-height: 500px"
                class="overflow-y-auto"
              >
                <v-container
                  class="table_detail"
                  v-scroll:#scroll-target="onScroll"
                  style="height: 1000px"
                >
                  <!----------------- Table Detail ----------------->
                  <v-subheader
                    style="
                    font-size: 16px;
                    background-color: rgb(105, 180, 245);
                    justify-content: center;
                    color: white;
                    font-family: 'Bai_Jamjuree';
                  "
                    >Detail</v-subheader
                  >
                  <v-data-table
                    :items="customer_detail"
                    hide-default-footer
                    class="mb-6"
                    style="width: 100%"
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
                            <div
                              v-if="header.value == 'evidence_reporting'"
                              class="mt-n1 mb-n1"
                              id="special-code-list"
                            >
                              <v-autocomplete
                                dense
                                type="text"
                                v-model="evidence_reporting"
                                :items="evidence_reporting_list"
                                item-text="text"
                                class="align-right-input"
                                :rules="[(v) => !!v || 'กรุณาเลือกช่องทางการแจ้งหลักฐาน']"
                                :error="evidence_reporting == '' && payment_type != 'CHQ'"
                              >
                              </v-autocomplete>
                            </div>
                            <div
                              v-if="header.value == 'special_code'"
                              class="mt-n1 mb-n1"
                              id="special-code-list"
                            >
                              <!--
                              <select
                                class="style-chooser form-control"
                                style="
                                border: 1px solid #e0e0e0;
                                border-radius: 1px;
                                width: 105%;
                                height: 40px;
                                padding-left: 7px;
                                cursor: pointer;
                                font-size:14px;
                              "
                                v-model="select_special_code"
                              >
                                <option value=""></option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                              </select>
                              -->
                              <v-autocomplete
                                dense
                                type="text"
                                v-model="select_special_code"
                                :items="special_code_list"
                                item-text="text"
                                class="align-right-input"
                                @change="checkSpecialCode(),check_receipt_code()"
                                :rules="[(v) => !!v || 'กรุณาเลือกรหัสพิเศษ']"
                                :error="select_special_code == ''"
                              >
                              </v-autocomplete>
                            </div>
                            <div v-if="header.value == 'rv_date'" class="pa-1 mt-1">
                              <input
                                style="text-align: right;"
                                class="form-control-statement-2"
                                type="date"
                                placeholder="dd/mm/yyyy"
                                v-model="rv_date"
                                @change="checkInvoiceDate(),linkDate(rv_date , 'rv_date')"
                                required
                              />
                              <div>
                                <span style="color: #FF5252; font-size: 12px; font-family: 'Bai_Jamjuree' !important;" v-if="msg">{{msg}}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-data-table>
                  <!----------------- End ----------------->
                  <!----------------- Table Statement Transfer/Suspense----------------->
                  <v-subheader
                    style="
                    font-size: 16px;
                    background-color: #FFC000;
                    justify-content: center;
                    color: white;
                    font-family: 'Bai_Jamjuree';
                  "
                    >Statement</v-subheader
                  >
                  <!-- <v-row
                    v-for="(items, index) in transfer_suspense"
                    :key="'ts' + index"
                  > -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class="pa-0"
                    v-for="(items, index) in transfer_suspense"
                    :key="'ts' + index"
                    id="tablestatement"
                  >
                    <v-data-table
                      class="mb-0"
                      style="width: 100%;"
                      v-if="
                        payment_type == 'Transfer' || payment_type == 'Suspense'
                      "
                      hide-default-footer
                    >
                      <template v-slot:body="{}">
                        <tbody>
                          <tr>
                            <td rowspan="7" class="sequence-trc">
                              {{ index + 1 }}
                            </td>
                            <td class="coltitle">ประเภทการตัดหนี้</td>
                            <td class="colinputdata">
                              <div class="pt-2 pb-2" id="payment">
                                <v-autocomplete
                                    class="align-right-input mt-n5 mb-n5"
                                    type="text"
                                    item-text="text"
                                    @input="calAmount()"
                                    @change="link_Bankcode_addGL(index)"
                                    v-model="items.type_debt"
                                    :items="type_debt_list"
                                    required
                                  >
                                </v-autocomplete>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle">วันที่ชำระ</td>
                            <td class="colinputdata">
                              <div class="pt-2 pb-2">
                                <input
                                  style="text-align: right;"
                                  type="date"
                                  class="form-control-statement"
                                  v-model="items.incoming_paid_date"
                                  placeholder="dd/mm/yyyy"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle">เลขที่บัญชีธนาคาร</td>
                            <td class="colinputdata">
                              <div class="pt-2 pb-2" id="payment">
                                <v-form
                                  class="form_select_wht"
                                  ref="formpayment"
                                  lazy-validation
                                >
                                  <v-autocomplete
                                    @change="check_bank_type(index) , check_statement('tran_sus') , link_Bankcode_addGL(index)"
                                    class="align-right-input mt-n5 mb-n5"
                                    type="text"
                                    item-text="text"
                                    v-model="items.payment_type_bank"
                                    :items="payment_type_list"
                                    :rules="items.type_debt !== 'Offset' ? [(v) => !!v ||'กรุณาเลือกเลขที่บัญชีธนาคาร',]: []"
                                    :error=" items.payment_type_bank == '' && select_special_code != '01' && items.type_debt !== 'Offset'"
                                    required
                                  >
                                  </v-autocomplete>
                                </v-form>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle">Bank Code</td>
                            <td class="colinputdata">
                              <div class="pt-2 pb-2">
                                <input
                                  style="text-align: right;"
                                  type="text"
                                  disabled
                                  class="form-control-statement"
                                  v-model="items.code_bank"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle">Statement No</td>
                            <td class="colinputdata">
                              <div class="pt-1 pb-1" id="payment">
                                  <v-text-field
                                    @keyup="check_statement_no(items.statement_no)"
                                    @change="search_statement_no(items.statement_no , index)"
                                    class="align-right-input mt-2 mb-n5"
                                    style="text-align: right; border-radius: 0px; font-size:14px"
                                    placeholder="กรอกข้อความ"
                                    append-icon="mdi-magnify"
                                    @click:append="search_statement_no(items.statement_no , index)"
                                    v-model="items.statement_no"
                                    :rules="items.type_debt !== 'Offset'? [(v) => !!v || 'กรุณากรอก Statement No']: []"
                                    :error="items.statement_no == '' && select_special_code != '01' && items.type_debt !== 'Offset'"
                                    outlined
                                    dense
                                  ></v-text-field>
                                <!-- <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  v-model="items.statement_no"
                                  type="text"
                                  placeholder="กรอกข้อความ"
                                  :rules="[(v) => !!v || 'กรุณากรอก Statement No']"
                                  :error="items.statement_no == ''"
                                /> -->
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="coltitle"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              ยอดชำระ
                            </td>
                            <td
                              class="colinputdata"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              <div class="pt-1 pb-1" id="payment">
                                <v-text-field
                                    class="align-right-input mt-2 mb-n3"
                                    style="text-align: right;border-radius: 0px; font-size:14px"
                                    placeholder="0.00"
                                    v-model="items.amount"
                                    :rules=" items.type_debt !== 'Offset' ? [(v) => !!v || 'กรุณากรอกยอดชำระ']: []"
                                    @input="calAmount()"
                                    @keyup="check_statement_amount(items.amount)"
                                    :error="items.amount == '' && select_special_code != '01' && items.type_debt !== 'Offset'"
                                    outlined
                                    dense
                                ></v-text-field>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="coltitle"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              ค่าธรรมเนียม
                            </td>
                            <td
                              class="colinputdata"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              <div class="pt-1 pb-1" id="payment">
                                <v-text-field
                                    class="align-right-input mt-2 mb-n3"
                                    style="text-align: right;border-radius: 0px; font-size:14px"
                                    placeholder="0.00"
                                    v-model="items.fee"
                                    @input="calFee()"
                                    @keyup="check_fee()"
                                    outlined
                                    dense
                                ></v-text-field>
                              </div>
                            </td>
                            <td class="add_delete">
                              <div>
                                <v-btn
                                  v-if="transfer_suspense.length > 1"
                                  x-small
                                  dark
                                  fab
                                  outlined
                                  color="rgb(103, 194, 93)"
                                  @click="deleteRowStatement(index)"
                                >
                                  <v-icon dark> mdi-minus </v-icon>
                                </v-btn>
                                <v-btn
                                  v-if="index == transfer_suspense.length - 1"
                                  x-small
                                  dark
                                  fab
                                  color="rgb(103, 194, 93)"
                                  @click="addRowStatement(index , '')"
                                >
                                  <v-icon dark> mdi-plus </v-icon>
                                </v-btn>
                              </div>
                            </td>
                          </tr>
                          <tr
                            class="sum-amount"
                            v-if="index == transfer_suspense.length - 1"
                          >
                            <td style="border: 1px solid #ddd;"></td>
                            <td class="coltitle-sum">
                              <span>ยอดรวมชำระ</span>
                            </td>
                            <td
                              class="colinputdata-sum"
                              style="text-align: right;"
                            >
                              <label class="pl-3">{{
                                covertNumber(items.sum_amounts)
                              }}</label>
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-data-table>
                  </v-col>
                  <!-- </v-row> -->
                  <!----------------- End ----------------->
                  <!----------------- Table Statement CHQ----------------->
                  <!-- <v-row
                    v-for="(element, index) in transfer_suspense"
                    :key="'chq' + index"
                  > -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class="pa-0"
                    v-for="(element, index) in transfer_suspense"
                    :key="'chq' + index"
                    id="tablestatement"
                  >
                    <v-data-table
                      style="width: 100%"
                      v-if="payment_type == 'CHQ'"
                      hide-default-footer
                      class="mb-0"
                    >
                      <template v-slot:body="{}">
                        <tbody>
                          <tr>
                            <td rowspan="10" class="sequence-trc">
                              {{ index + 1 }}
                            </td>
                            <td class="coltitle">ประเภทการตัดหนี้</td>
                            <td class="colinputdata">
                              <div class="pt-2 pb-2" id="payment">
                                <v-autocomplete
                                    class="align-right-input mt-n5 mb-n5"
                                    type="text"
                                    item-text="text"
                                    @input="calAmount()"
                                    @change="link_Bankcode_addGL(index)"
                                    v-model="element.type_debt"
                                    :items="type_debt_chq_list"
                                    required
                                  >
                                </v-autocomplete>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">วันที่หน้าเช็ค</td>
                            <td class="colinputdata_chq">
                              <div class="pt-2 pb-2">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  type="date"
                                  v-model="element.check_date"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">วันที่รับเช็ค</td>
                            <td class="colinputdata_chq">
                              <div class="pt-2 pb-2">
                                <input
                                  style="text-align: right;"
                                  type="date"
                                  class="form-control-statement"
                                  v-model="element.incoming_paid_date"
                                  placeholder="dd/mm/yyyy"
                                  @change="linkDate(element.incoming_paid_date , '') "
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">ธนาคารเช็ค</td>
                            <td class="colinputdata_chq">
                              <div class="pt-2 pb-2" id="payment">
                                <v-autocomplete
                                  class="align-right-input mt-n5 mb-n5"
                                  type="text"
                                  v-model="element.bank_check_list"
                                  :items="bank_list"
                                  :rules="element.type_debt !== 'Offset' ? [(v) => !!v || 'กรุณาเลือกธนาคารเช็ค',] : []"
                                  :error="element.bank_check_list == '' && select_special_code != '01' && element.type_debt !== 'Offset'"
                                  @change="bank_check(element.bank_check_list)"
                                  item-text="text"
                                >
                                </v-autocomplete>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">CHQ No</td>
                            <td class="colinputdata_chq">
                              <div class="pt-2 pb-2" id="payment">
                                <!-- <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  type="text"
                                  v-model="element.chq_no"
                                  placeholder="กรอกตัวเลข"
                                /> -->
                                <v-text-field
                                    class="align-right-input mt-2 mb-n5"
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="กรอกตัวเลข"
                                    v-model="element.chq_no"
                                    :rules="element.type_debt !== 'Offset' ? [(v) => !!v || 'กรุณากรอก CHQ No'] :[]"
                                    @input="calAmount()"
                                    @change="check_chq_no(element.chq_no)"
                                    :error="element.chq_no == '' && select_special_code != '01'&& element.type_debt !== 'Offset' "
                                    outlined
                                    dense
                                ></v-text-field>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">เลขที่บัญชีธนาคาร</td>
                            <td class="colinputdata_chq">
                              <div class="pt-2 pb-2" id="payment">
                                  <v-form class="form_select_wht" ref="formpayment" lazy-validation>
                                    <v-autocomplete
                                      @change="check_bank_type(index), check_statement('chq'), link_Bankcode_addGL(index) "
                                      class="align-right-input mt-n5 mb-n5"
                                      type="text"
                                      item-text="text"
                                      v-model="element.payment_type_bank"
                                      :items="payment_type_list"
                                      :rules="element.type_debt !== 'Offset' ? [(v) =>!!v || 'กรุณาเลือกเลขที่บัญชีธนาคาร',]:[]"
                                      :error="element.payment_type_bank == '' &&select_special_code != '01' && element.type_debt !== 'Offset'"
                                      required
                                    >
                                    </v-autocomplete>                  
                                  </v-form>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">Bank Code</td>
                            <td class="colinputdata_chq">
                              <div class="pt-2 pb-2">
                                <input
                                  style="text-align: right;"
                                  type="text"
                                  disabled
                                  class="form-control-statement"
                                  v-model="element.code_bank"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">Statement No</td>
                            <td class="colinputdata_chq">
                              <div class="pt-2 pb-2" id="payment">
                                <!-- <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  v-model="element.statement_no"
                                  type="text"
                                  placeholder="กรอกข้อความ"
                                /> -->
                                <v-text-field
                                    @keyup="check_statement_no(element.statement_no)"
                                    @change="search_statement_no(element.statement_no , index)"
                                    class="align-right-input mt-2 mb-n5"
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="กรอกข้อความ"
                                    append-icon="mdi-magnify"
                                    @click:append="search_statement_no(element.statement_no , index)"
                                    v-model="element.statement_no"
                                    :rules="element.type_debt !== 'Offset'? [(v) => !!v || 'กรุณากรอก Statement No',] : []"
                                    :error=" element.statement_no == '' && select_special_code != '01' && element.type_debt !== 'Offset'"
                                    outlined
                                    dense
                                ></v-text-field>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="coltitle_chq"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              ยอดชำระ
                            </td>
                            <td
                              class="colinputdata_chq"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              <div class="pt-2 pb-2" id="payment">
                                <v-text-field
                                    class="align-right-input mt-2 mb-n5"
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="0.00"
                                    v-model="element.amount"
                                    :rules="element.type_debt !== 'Offset'? [(v) => !!v || 'กรุณากรอกยอดชำระ'] :[]"
                                    @input="calAmount()"
                                    @keyup="check_statement_amount(element.amount)"
                                    :error="element.amount == '' && select_special_code != '01' && element.type_debt !== 'Offset'"
                                    outlined
                                    dense
                                ></v-text-field>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="coltitle_chq"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              ค่าธรรมเนียม
                            </td>
                            <td
                              class="colinputdata_chq"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              <div class="pt-2 pb-2" id="payment">
                                <v-text-field
                                    class="align-right-input mt-2 mb-n5"
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="0.00"
                                    v-model="element.fee"
                                    @input="calFee()"
                                    @keyup="check_fee()"
                                    outlined
                                    dense
                                ></v-text-field>
                              </div>
                            </td>
                            <td class="add_delete">
                              <v-btn
                                v-if="transfer_suspense.length > 1"
                                x-small
                                dark
                                outlined
                                fab
                                color="rgb(103, 194, 93)"
                                @click="deleteRowStatement(index)"
                              >
                                <v-icon dark> mdi-minus </v-icon>
                              </v-btn>
                              <v-btn
                                v-if="index == transfer_suspense.length - 1"
                                x-small
                                dark
                                fab
                                color="rgb(103, 194, 93)"
                                @click="addRowStatement(index , 'chq')"
                              >
                                <v-icon dark> mdi-plus </v-icon>
                              </v-btn>
                            </td>
                          </tr>
                          <tr
                            class="sum-amount"
                            v-if="index == transfer_suspense.length - 1"
                          >
                            <td style="border: 1px solid #ddd;"></td>
                            <td class="coltitle_chq_sum">
                              <span>ยอดรวมชำระ</span>
                            </td>
                            <td
                              class="colinputdata_chq_sum"
                              style="text-align: right;"
                            >
                              <label class="pl-3">{{
                                covertNumber(element.sum_amounts)
                              }}</label>
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-data-table>
                  </v-col>
                  <!-- </v-row> -->
                  <!----------------- End ----------------->
                  <!----------------- Table WHT ----------------->
                  <v-subheader
                    class="mt-6"
                    style="
                    font-size: 16px;
                    background-color: rgb(103, 194, 93);
                    justify-content: center;
                    color: white;
                    font-family: 'Bai_Jamjuree';
                  "
                    >WHT</v-subheader
                  >
                  <v-data-table
                    :items="customer_detail"
                    hide-default-footer
                    class="mb-6"
                    style="width: 100%;"
                  >
                    <template v-slot:body="{}">
                      <tbody>
                        <tr
                          v-for="(header, index_wht) in headers_wht_table"
                          :key="index_wht"
                        >
                          <td>
                            {{ header.text }}
                          </td>
                          <td>
                            <div v-if="header.value == 'tax_base'" class="pa-1">
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="covertNumber(tax_base)"
                              />
                            </div>
                            <div
                              id="payment"
                              class="pa-1"
                              v-if="header.value == 'tax_code'"
                            >
                              <!--
                              <select
                                v-model="tax_code"
                                @change="selectTax(tax_code)"
                                style="
                                border: 1px solid #e0e0e0;
                                border-radius: 1px;
                                width: 105%;
                                height: 40px;
                                padding-right: 10px;
                                cursor: pointer;
                                text-align: right;
                              "
                              >
                                <option></option>
                                <option value="R53-01 ค่าบริการ 1%"
                                  >R53-01 ค่าบริการ 1%</option
                                >
                                <option value="R53-04 ค่าบริการ 1.5%"
                                  >R53-04 ค่าบริการ 1.5%</option
                                >
                                <option value="R53-06 ค่าบริการ 2%"
                                  >R53-06 ค่าบริการ 2%</option
                                >
                                <option value="R53-02 ค่าบริการ 3%"
                                  >R53-02 ค่าบริการ 3%</option
                                >
                                <option value="R53-03 ค่าเช่า 5%"
                                  >R53-03 ค่าเช่า 5%</option
                                >
                              </select>
                            -->
                              <v-autocomplete
                                v-model="tax_code"
                                @change="selectTax()"
                                type="text"
                                item-text="text"
                                class="align-right-input mt-n5 mb-n5"
                                :items="tax_code_list"
                              >
                              </v-autocomplete>
                            </div>
                            <div class="pa-1" v-if="header.value == 'sum_wht'">
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="covertNumber(sum_wht)"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-data-table>
                  <!----------------- End ----------------->
                  <!---------------- Table Add. GL --------------------->
                  <v-subheader
                    style="
                    font-size: 16px;
                    background-color: rgb(103, 194, 93);
                    justify-content: center;
                    color: white;
                  "
                    >Add. GL</v-subheader
                  >
                  <table style="width: 100%" class="mb-6" id="matching">
                    <tr>
                      <th
                        v-for="(item, index_gl) in headers_addgl_table"
                        :key="index_gl"
                        class="invoice-header pa-2"
                        style="text-align: center;"
                      >
                        {{ item.text }}
                      </th>
                    </tr>
                    <tr
                      v-for="(items, index_addgl) in list_add_gl"
                      :key="index_addgl"
                    >
                      <td
                        v-if="items.order_gl == '01' && index_addgl == 0 && valid_fee == true"
                        style="width:20%;"
                        class="pl-1 pr-1 ma-0"
                        id="selectmatching"
                      >
                        <div id="addgl">
                        <v-autocomplete
                          disabled
                          type="text"
                          class="align-center-input mt-n4 mb-n5"
                          :items="add_gl"
                          item-text="id"
                          @change="
                            onchangeOrder_gl(items.order_gl, index_addgl)
                          "
                          v-model="items.order_gl"
                        >
                        </v-autocomplete>
                        </div>
                      </td>
                      <td
                        v-else
                        class="pl-1 pr-1 ma-0"
                        style="width:20%;"
                        id="selectmatching"
                      >
                        <div id="addgl">
                        <v-autocomplete
                          type="text"
                          class="align-center-input mt-n4 mb-n5"
                          :items="add_gl"
                          item-text="id"
                          @change="
                            onchangeOrder_gl(items.order_gl, index_addgl)
                          "
                          v-model="items.order_gl"
                        >
                        </v-autocomplete>
                        </div>
                      </td>
                      <td
                        v-if="items.order_gl == '01' && index_addgl == 0 && valid_fee == true"
                        class="pl-1 pr-1 ma-0"
                        style="width:55%;"
                        id="selectmatching"
                      >
                        <div id="addgl">
                        <v-autocomplete
                          disabled
                          type="text"
                          class="mt-n4 mb-n5"
                          :items="add_gl"
                          item-text="text"
                          @change="onchangeDetail_gl(items.add_gl, index_addgl)"
                          v-model="items.add_gl"
                        >
                        </v-autocomplete>
                        </div>
                      </td>
                      <td
                        v-else
                        class="pl-1 pr-1 ma-0"
                        style="width:55%;;"
                        id="selectmatching"
                      >
                        <div id="addgl">
                        <v-autocomplete
                          type="text"
                          class="mt-n4 mb-n5"
                          :items="add_gl"
                          item-text="text"
                          @change="onchangeDetail_gl(items.add_gl, index_addgl)"
                          v-model="items.add_gl"
                        >
                        </v-autocomplete>
                        </div>
                      </td>
                      <td v-if="items.order_gl == '01' && index_addgl == 0 && valid_fee == true" style="width:25%;" class="pl-1 pr-1 ma-0">
                        <v-text-field
                            disabled
                            class="align-right-input mt-2 mb-n5"
                            style="border-radius: 0px; font-size:14px"
                            placeholder="กรอกจำนวนเงิน"
                            v-model="items.add_amount"
                            :onkeypress="onchangeAddAmount(items.add_amount, 'ADD_GL')"
                            outlined
                            dense
                          ></v-text-field>
                      </td>
                      <td v-else style="width:25%;" class="pl-1 pr-1 ma-0">
                        <v-text-field
                            class="align-right-input mt-2 mb-n5"
                            style="border-radius: 0px; font-size:14px"
                            placeholder="กรอกจำนวนเงิน"
                            v-model="items.add_amount"
                            :onkeypress="onchangeAddAmount(items.add_amount, 'ADD_GL')"
                            outlined
                            dense
                          ></v-text-field>
                      </td>
                    </tr>
                    <tr style="background-color: #E1F5FE;">
                      <td style="width:150px"></td>
                      <td
                        style="width:250px; text-align: right;"
                        class="pl-1 pr-1 ma-0"
                      >
                        <strong>Total</strong>
                      </td>
                      <td
                        style="width:150px; text-align: right;"
                        class="pl-1 pr-1 ma-0"
                      >
                        <strong>{{ covertNumber(sum_add_amount) }}</strong>
                      </td>
                    </tr>
                  </table>

                  <!----------------- End ----------------->

                  <!---------------- Table Sum --------------------->
                  <v-subheader
                    style="
                    font-size: 16px;
                    background-color: rgb(103, 194, 93);
                    justify-content: center;
                    color: white;
                    font-family: 'Bai_Jamjuree';
                  "
                    >Sum</v-subheader
                  >
                  <v-data-table
                    :items="customer_detail"
                    hide-default-footer
                    style="margin-bottom: 10px; width: 100%;"
                  >
                    <template v-slot:body>
                      <tbody>
                        <tr
                          v-for="(header, index_sum) in headers_sum_table"
                          :key="index_sum"
                        >
                          <td>
                            {{ header.text }}
                          </td>
                          <td>
                            <div v-if="header.value == 'sum_wht'" class="pa-1">
                              <!-- {{ sum_wht }} -->
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="covertNumber(sum_wht)"
                              />
                            </div>
                            <div class="pa-1" v-if="header.value == 'sum_add'">
                              <!-- {{ sum_add_amount }} -->
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="covertNumber(sum_add_amount)"
                              />
                            </div>
                            <div
                              class="pa-1"
                              v-if="header.value == 'sum_amount_paid'"
                            >
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="covertNumber(new_sum_aging)"
                              />
                            </div>
                            <div
                              class="pa-1"
                              v-if="header.value == 'sum_amounts'"
                            >
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="covertNumber(sum_amounts)"
                              />
                            </div>
                            <!-- <div
                              class="pa-1"
                              v-if="
                                header.value == 'sum_balance' &&
                                  sum_add_amount == 0
                              "
                            >
                              <input
                                type="number"
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                placeholder=" 0.00"
                              />
                            </div> -->
                            <div
                              class="pa-1"
                              v-if="header.value == 'sum_balance'"
                            >
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                placeholder=" 0.00"
                                :value="
                                  covertNumber(
                                    Number(sum_amounts) +
                                      Number(sum_wht) +
                                      Number(sum_add_amount) -
                                      Number(new_sum_aging)
                                  )
                                "
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-data-table>
                  <div>
                    <b-textarea
                    placeholder="Remark :"
                    v-model="remark"
                    rows="1"
                    max-rows="900"
                    style="border-radius: 0px; margin-bottom:16px;"
                  ></b-textarea>

                  <b-textarea
                    placeholder="Remark ERP :"
                    v-model="remark_erp"
                    rows="1"
                    max-rows="900"
                    style="border-radius: 0px; font-weight: bold; font-size: 18px; color: red;"
                    
                  ></b-textarea>
                  </div>
                  
                  <!----------------- End ----------------->
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="save('Pending')"
            outlined
            :disabled="
                (check_invoice == false) || (check_receipt == false) ||
                (check_wht == true && WHT_list == '') ||
                (check_wht == true && WHT_list == '1' && files_wht.length == 0)
            "
          >
            Save Draft
          </v-btn>
          <v-btn
            v-if="transfer_suspense[0].type_debt === 'Offset'"
            color="green"
            @click="save('Matched')"
            outlined
            :disabled="(files == '' && check_code == false) || check_inv_date == false || select_special_code == '' || evidence_reporting == ''"
          >
            Matching
          </v-btn>

          <v-btn
            v-else
            color="green"
            @click="save('Matched')"
            outlined
            :disabled="
                (files == '' && check_code == false) || select_special_code == '' || (check_invoice == false) ||  (check_receipt == false) || (evidence_reporting == '' && payment_type != 'CHQ') ||
                (transfer_suspense[0].payment_type_bank == '' && select_special_code != '01') || (valid_no == false && select_special_code != '01') || 
                (valid_amount == false && select_special_code != '01') ||
                (valid_bank_check == false && select_special_code != '01') || (valid_check_chq == false && select_special_code != '01') ||
                (check_wht == true && WHT_list == '') ||
                (check_wht == true && WHT_list == '1' && files_wht.length == 0) || check_inv_date == false
            "
          >
            Matching
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog Mail ยืนยันยอด -->
    <v-dialog v-model="modal_request_mail" width="600">
      <v-card>
        <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #035891"
        >
          ยืนยันการกด Request Mail ยืนยันใบแจ้งหนี้
        </v-card-title>
        <!--
        <v-card-text
          class="mt-10"
          style="font-size:16px; font-family: 'Bai_Jamjuree'; text-align: center;"
        >
          คุณต้องการส่งข้อมูล Request Mail ยืนยันใบแจ้งหนี้ใช่หรือไม่ ?
        </v-card-text> 
       -->
       <v-row class="ml-1 mr-1">
        <v-col cols="2">
          <!--
          <v-card-text
              class="mt-7"
              style="font-size:16px; font-family: 'Bai_Jamjuree';"
            >
              Remark : 
            </v-card-text> 
          -->
          <v-subheader
            class="mt-7"
            style="font-size:16px; font-family: 'Bai_Jamjuree';"
          >
            Remark:
          </v-subheader>
        </v-col>
        <v-col cols="10">
          <v-textarea
            outlined
            class="mt-7 mr-2"
            label="รายละเอียด"
            v-model="remark_mail"
          ></v-textarea>
        </v-col>
       </v-row>
        <v-divider></v-divider>

        <v-card-actions class="mt-n3">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="(modal_request_mail = false) , (remark_mail = '')"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="#035891"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="(modal_request_mail = false), confirmRequest('mail')"
          >
            ยืนยัน
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end -->
    <!-- dialog Mail ติดตาม WHT -->
    <v-dialog v-model="modal_request_mail_wht" width="600">
      <v-card>
        <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #035891"
        >
          ยืนยันการกด Request Mail ติดตาม WHT
        </v-card-title>

        <v-card-text
          class="mt-10"
          style="font-size:16px; font-family: 'Bai_Jamjuree'; text-align: center;"
        >
          คุณต้องการส่งข้อมูล Request Mail ติดตาม WHT ใช่หรือไม่ ?
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions class="mt-n3">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="modal_request_mail_wht = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="#035891"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="
              (modal_request_mail_wht = false), confirmRequest('mail_wht')
            "
          >
            ยืนยัน
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end -->
    <!-- dialog Mail ยืนยันยอด + ติดตาม WHT -->
    <v-dialog v-model="modal_request_mail_and_wht" width="600">
      <v-card>
        <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #035891"
        >
          ยืนยันการ Request Mail
        </v-card-title>

        <v-card-text
          class="mt-10"
          style="font-size:16px; font-family: 'Bai_Jamjuree';text-align: center;"
        >
          คุณต้องการส่งข้อมูล Request Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
          ใช่หรือไม่ ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="mt-n3">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="modal_request_mail_and_wht = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="#035891"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="
              (modal_request_mail_and_wht = false),
                confirmRequest('mail_and_wht')
            "
          >
            ยืนยัน
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end -->
    <!-- dialog close -->
    <v-dialog v-model="modal_close_dialog" width="620">
      <v-card>
        <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #035891"
        >
          ยืนยันการปิด Popup Matching
        </v-card-title>

        <v-card-text
          class="mt-10"
          style="font-size:16px; font-family: 'Bai_Jamjuree';text-align: center;"
        >
          กรณีมีการกด Request Mail หรือกรอกข้อมูลในส่วนอื่นไว้
          ข้อมูลจะไม่ถูกส่งไปบันทึก
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mt-n3">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="modal_close_dialog = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="#035891"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="(modal_close_dialog = false), closeMatching()"
          >
            ยืนยัน
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end -->
    <!-- Add Files -->
    <v-dialog v-model="upload_File_Dialog" width="950">
      <v-card-title style="background-color: #035891">
        <span class="white--text" style="font-size:16px; font-family: 'Bai_Jamjuree'">แนบไฟล์หลักฐานเพิ่มเติม</span>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card
        @drop.prevent="onDrop($event)"
        @dragover.prevent="dragoverfile = true"
        @dragenter.prevent="dragoverfile = true"
        @dragleave.prevent="dragoverfile = false"
      >
        <v-card-text>
          <v-row class="d-flex flex-column" dense align="center" justify="center">
            <v-col cols="12" align="center" class="dropZone-info">
              <v-file-input
                v-model="files"
                multiple
                @change="selectFile(files)"
                append-inner-icon=""
                :clearable="false"
                label="แนบไฟล์เพิ่มเติม"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-virtual-scroll
            v-if="files.length > 0"
            :items="files"
            height="150"
            item-height="50"
          >
            <template v-slot:default="{ item }" >
              <v-list-item :key="item.name" >
                <div style="width: 1000%">
                  <v-list-item-content class="overflow-x-auto">
                    <v-list-item-title >
                      {{ item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </div>

                <v-list-item-action>
                  <v-btn @click.stop="removeFile(item.name)" icon>
                    <v-icon> mdi-close-circle </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

            </template>
          </v-virtual-scroll>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#035891"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="closeDialog"
          >
            ยืนยัน
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end Add Files -->
    <!-- Add Files WHT -->
    <v-dialog v-model="upload_File_WHT_Dialog" width="950">
      <v-card-title style="background-color: #035891">
        <span class="white--text" style="font-size:16px; font-family: 'Bai_Jamjuree'">แนบไฟล์เอกสาร WHT เพิ่มเติม</span>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeDialogWHT">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card
        @drop.prevent="onDropWHT($event)"
        @dragover.prevent="dragoverfile_WHT = true"
        @dragenter.prevent="dragoverfile_WHT = true"
        @dragleave.prevent="dragoverfile_WHT = false"
      >
        <v-card-text>
          <v-row class="d-flex flex-column" dense align="center" justify="center">
            <v-col cols="12" align="center" class="dropZone-info">
              <v-file-input
                v-model="files_wht"
                multiple
                @change="selectFileWHT(files_wht)"
                append-inner-icon=""
                :clearable="false"
                label="แนบไฟล์เพิ่มเติม"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-virtual-scroll
            v-if="files_wht.length > 0"
            :items="files_wht"
            height="150"
            item-height="50"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item.name">
                <div style="width: 1000%">
                  <v-list-item-content class="overflow-x-auto">
                    <v-list-item-title >
                      {{ item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </div>

                <v-list-item-action>
                  <v-btn @click.stop="removeFileWHT(item.name)" icon>
                    <v-icon> mdi-close-circle </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

            </template>
          </v-virtual-scroll>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#035891"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="closeDialogWHT"
          >
            ยืนยัน
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end Add Files WHT -->
  </div>
</template>
<script>
import eventBus from "../event-bus";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  props: ["payment_type"],
  data: () => ({
    fileRules: [
      (v) => !!v || "โปรดเลือกไฟล์",
      (v) => (v && v.length > 0) || "โปรดเลือกไฟล์",
    ],
    selectRules: [(v) => !!v || "โปรดเลือกประเภท"],
    invoiceRules: [
      [(v) => !!v || 'กรุณาเลือก Invoice No.'], 
      [(v) => (v && this.check_invoice == false) || 'กรุณาเลือก Invoice No.'],
    ],
    matching_dialog: false,
    finish: true,
    // add invoice
    remark_mail: '',
    data_customer: [],
    invoice_list: [],
    new_invoice_list: [],
    select_invoice: [],
    dragoverfile: false,
    dragoverfile_WHT:false,
    set_file: [],
    set_file_wht: [],
    check_invoice: true,
    valid: false,
    valid_bank_check: true,
    valid_check_chq: true,
    check_receipt: true,
    valid_no: false,
    valid_amount: false,
    valid_fee: false,
    check_req_mail: false,
    check_req_mail_WHT: false,
    upload_File_Dialog: false,
    upload_File_WHT_Dialog: false,
    // end
    headers_matching_detail: [
      {
        text: "Email",
        align: "center",
        sortable: false,
        value: "email",
        width: "50px",
      },
      {
        text: "WHT",
        align: "center",
        sortable: false,
        value: "wht",
        width: "50px",
      },
      {
        text: "Invoice No.",
        align: "center",
        sortable: false,
        value: "invoice_no",
        width: "150px",
      },
      {
        text: "Receipt No.",
        align: "center",
        sortable: false,
        value: "receipt_number",
        width: "150px",
      },
      {
        text: "Amount",
        align: "center",
        sortable: false,
        value: "amount_after_vat",
        width: "70px",
      },
      {
        text: "ยอดที่ต้องการตัดหนี้",
        align: "center",
        sortable: false,
        value: "aging",
        width: "90px",
      },
      {
        text: "",
        align: "center",
        sortable: false,
        value: "actions",
        width: "40px",
      },
    ],
    headers_detail_table: [
      {
        text: "ช่องทางการแจ้งหลักฐาน",
        align: "center",
        sortable: false,
        value: "evidence_reporting",
      },
      {
        text: "รหัสพิเศษ",
        align: "center",
        sortable: false,
        value: "special_code",
      },
      {
        text: "วันที่ตัดหนี้",
        align: "center",
        sortable: false,
        value: "rv_date",
      },
    ],
    headers_wht_table: [
      {
        text: "ฐานภาษี",
        align: "center",
        sortable: false,
        value: "tax_base",
        width: "100px",
      },
      {
        text: "รหัสภาษีหัก ณ ที่จ่าย",
        align: "center",
        sortable: false,
        value: "tax_code",
        width: "100px",
      },
      {
        text: "ยอด WHT",
        align: "center",
        sortable: false,
        value: "sum_wht",
        width: "100px",
      },
    ],
    headers_addgl_table: [
      {
        text: "ลำดับ Add. GL",
        align: "center",
        sortable: false,
        value: "order_gl",
        width: "100px",
      },
      {
        text: "Add. GL",
        align: "center",
        sortable: false,
        value: "add_gl",
        width: "100px",
      },
      {
        text: "Add Amount",
        align: "center",
        sortable: false,
        value: "add_amount",
        width: "100px",
      },
    ],
    headers_sum_table: [
      {
        text: "WHT",
        align: "center",
        sortable: false,
        value: "sum_wht",
        width: "100px",
      },
      {
        text: "Add. GL",
        align: "center",
        sortable: false,
        value: "sum_add",
        width: "100px",
      },
      {
        text: "ยอดที่ต้องชำระ",
        align: "center",
        sortable: false,
        value: "sum_amount_paid",
        width: "100px",
      },
      {
        text: "รวมยอดชำระ",
        align: "center",
        sortable: false,
        value: "sum_amounts",
        width: "100px",
      },
      {
        text: "Balance",
        align: "center",
        sortable: false,
        value: "sum_balance",
        width: "100px",
      },
    ],
    evidence_reporting_list: [
      { text: "" },
      {
        text: "Mail",
      },
      {
        text: "Mail-Confirm",
      },
      {
        text: "QR-Code",
      },
      {
        text: "Statement",
      },
      {
        text: "Suspense",
      },
      {
        text: "Online",
      },
      {
        text: "Urgent",
      },
      {
        text: "Waroom",
      },
      {
        text: "BPM",
      },
      {
        text: "CHQ",
      },
      {
        text: "เงินสด",
      },
    ],
    special_code_list: [
      { text: "" },
      {
        text: "01",
      },
      {
        text: "02",
      },
      {
        text: "03",
      },
    ],
    tax_code_list: [
      { text: "" },
      { text: "R53-01 ค่าบริการ 1%" },
      { text: "R53-04 ค่าบริการ 1.5%" },
      { text: "R53-06 ค่าบริการ 2%" },
      { text: "R53-02 ค่าบริการ 3%" },
      { text: "R53-03 ค่าเช่า 5%" },
    ],
    /*
    bank_list: [
      { text: "" },
      { text: "Bank of America, N.A(ธนาคารอเมริกา)", value: "AMERICA" },
      { text: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร", value: "BAAC" },
      { text: "ธนาคารกรุงศรีอยุธยา", value: "BAY" },
      { text: "ธนาคารกรุงเทพ", value: "BBL" },
      { text: "ธนาคารบีเอ็นพี พารีบาล์", value: "BNP" },
      { text: "ธนาคารซีไอเอ็มบีไทย", value: "CIMB" },
      { text: "ธนาคารซิตี้แบงก์", value: "CITI" },
      { text: "ธนาคารตอยซ์แบงก์", value: "Deutsche" },
      { text: "ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย", value: "EXIM" },
      { text: "ธนาคารอาคารสิงเคราะห์", value: "GHBANK" },
      { text: "ธนาคารอิสลามแห่งประเทศไทย", value: "GOV" },
      { text: "ธนาคารออมสิน", value: "GSB" },
      { text: "ธนาคารฮ่องกงและเซี่ยงไฮ้แบงกิ้งคอร์ปอเรชั่น", value: "HSBC" },
      { text: "ธนาคารไอซีบีซี", value: "ICBC" },
      { text: "JP Morgan Chase Bank", value: "J.P.MORGAN" },
      { text: "ธนาคารกสิกรไทย", value: "KBANK" },
      { text: "ธนาคาร เกียรตินาคิน", value: "KKB" },
      { text: "ธนาคารกรุงไทย", value: "KTB" },
      { text: "ธนาคารแลนด์ แอนด์ เฮ้าส์", value: "LHBANK" },
      { text: "ธนาคาร มิซูโฮ ดอร์ปอเรต จำกัด", value: "MIZUHO" },
      { text: "ธนาคาร ไทยพาณิชย์", value: "SCB" },
      { text: "สแตนตาร์ตชาร์เตอร์ด", value: "StandardChartered" },
      { text: "ธนาคาร ซูมิโตโม มิตซุย แบงกิ้งคอร์ปอเรชั่น", value: "Sumitomo" },
      { text: "ธนาคารธนชาต", value: "TANACHART" },
      { text: "ธนาคารทิสโก้", value: "TISCO" },
      { text: "ธนาคารทหารไทย", value: "TMB" },
      { text: "ธนาคารทหารไทยธนชาต", value: "TTB" },
      { text: "ธนาคารยูโอบี", value: "UOB" },
    ],
    */
   bank_list: [
      { text: "" },
      { text: "Bank of America,N.A (ธนาคารอเมริกา) - AMERICA", value: "AMERICA" },
      { text: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร - BAAC", value: "BAAC" },
      { text: "ธนาคารกรุงศรีอยุธยา - BAY", value: "BAY" },
      { text: "ธนาคารกรุงเทพ - BBL", value: "BBL" },
      { text: "ธนาคารบีเอ็นพี พารีบาส์ - BNP", value: "BNP" },
      { text: "ธนาคารซีไอเอ็มบีไทย - CIMB", value: "CIMB" },
      { text: "ธนาคารซิตี้แบงค์ - CITI", value: "CITI" },
      { text: "ธนาคารดอยซ์แบงค์ - Deutsche", value: "Deutsche" },
      { text: "ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย - EXIM", value: "EXIM" },
      { text: "ธนาคารอาคารสงเคราะห์ - GHBANK", value: "GHBANK" },
      { text: "ธนาคารอิสลามแห่งประเทศไทย - GOV", value: "GOV" },
      { text: "ธนาคารออมสิน - GSB", value: "GSB" },
      { text: "ธนาคารฮ่องกงและเซี่ยงไฮ้แบงกิ้งคอร์ปอเรชั่น - HSBC", value: "HSBC" },
      { text: "ธนาคารไอซีบีซี - ICBC", value: "ICBC" },
      { text: "JP Morgan Chase Bank", value: "J.P.MORGAN" },
      { text: "ธนาคารกสิกรไทย - KBANK", value: "KBANK" },
      { text: "ธนาคารเกียรตินาคิน - KKB", value: "KKB" },
      { text: "ธนาคารกรุงไทย - KTB", value: "KTB" },
      { text: "ธนาคารแลนด์ แอนด์ เฮ้าส์ - LHBANK", value: "LHBANK" },
      { text: "ธนาคารมิซูโฮ คอร์เปเรต - MIZUHO", value: "MIZUHO" },
      { text: "ธนาคารไทยพาณิชย์ - SCB", value: "SCB" },
      { text: "ธนาคารสแตนดาร์ดชาร์เตอร์ด ไทย - StandardChartered", value: "StandardChartered" },
      { text: "ธนาคารซูมิโตโม มิตซุย แบงกิ้ง คอร์ปอเรชั่น - Sumitomo", value: "Sumitomo" },
      { text: "ธนาคารธนชาต - TANACHART", value: "TANACHART" },
      { text: "ธนาคารไทยเครดิตเพื่อรายย่อย - TCRB", value: "TCRB" },
      { text: "ธนาคารทิสโก้ - TISCO", value: "TISCO" },
      { text: "ธนาคารทหารไทย - TMB", value: "TMB" },
      { text: "ธนาคารทหารไทยธนชาต - TTB", value: "TTB" },
      { text: "ธนาคารยูโอบี - UOB", value: "UOB" },
    ],
    payment_type_list: [
      { text: "" },
      { text: "BBL205" },
      { text: "BBL785" },
      { text: "BBL156" },
      { text: "BBL522" },
      { text: "BAY993" },
      { text: "BAY778" },
      { text: "BAY601" },
      { text: "BAY973" },
      { text: "BAY684" },
      { text: "CIMB854" },
      { text: "CIMB745" },
      { text: "Bill Payment - SCB" },
      { text: "Bill Payment - KBANK" },
      { text: "Bill Payment - BBL" },
      { text: "CHQ" },
      { text: "FACTORING" },
      { text: "GSB505" },
      { text: "GSB491" },
      { text: "KKP412" },
      { text: "KKP756" },
      { text: "KBANK579" },
      { text: "KBANK861" },
      { text: "KTB395" },
      { text: "KTB184" },
      { text: "KTB926" },
      { text: "KTB569" },
      { text: "KTB694" },
      { text: "KTB034" },
      { text: "KTB728" },
      { text: "KBANK035" },
      { text: "KBANK199" },
      { text: "KTB856" },
      { text: "QR CODE" },
      { text: "SCB376" },
      { text: "SCB009" },
      { text: "SCB750" },
      { text: "SCB540" },
      { text: "TMB958" },
      { text: "TTB174" },
      { text: "TTB958" },
      { text: "TTB907" },
      { text: "TTB553" },
      { text: "TBANK064" },
    ],
    type_debt_list: [
      { text: "Transfer" },
      { text: "Suspense" },
      { text: "Transfer-CHQ"},
      { text: "Transfer-S"},
      { text: "Transfer-CHQs"},
      { text: "Adjust JV"},
      { text: "Offset"},
    ],
    type_debt_chq_list: [
      { text: "CHQ" },
      { text: "Suspense" },
      { text: "CHQ-S"},
      { text: "Adjust JV" },
      { text: "Offset" },
    ],
    list_add_gl: [
      {
        order_gl: "",
        add_gl: "",
        add_amount: "",
      },
      {
        order_gl: "",
        add_gl: "",
        add_amount: "",
      },
      {
        order_gl: "",
        add_gl: "",
        add_amount: "",
      },
      {
        order_gl: "",
        add_gl: "",
        add_amount: "",
      },
      {
        order_gl: "",
        add_gl: "",
        add_amount: "",
      },
    ],
    // ลำดับ GL
    add_gl: [
      {
        id: "",
        text: "",
      },
      {
        id: "01",
        text: "ค่าธรรมเนียมธนาคาร",
      },
      {
        id: "02",
        text: "ปัดเศษสตางค์ (เงินขาด)",
      },
      {
        id: "03",
        text: "ปัดเศษสตางค์ (เงินเกิน)",
      },
      {
        id: "04",
        text: "ค่าปรับ",
      },
      {
        id: "05",
        text: "ค่าใช้จ่ายเบ็ดเตล็ด",
      },
      {
        id: "06",
        text: "กำไร/ขาดทุนจากอัตราแลกเปลี่ยน",
      },
      {
        id: "07",
        text: "กำไร/ขาดทุนจากอัตราแลกเปลี่ยน",
      },
      {
        id: "08",
        text: "เงินขาด Suspense - C/A TFB 052-1-07219-9",
      },
      {
        id: "09",
        text: "เงินเกิน Suspense - C/A TFB 052-1-07219-9",
      },
      {
        id: "10",
        text:
          "เงินขาด Suspense - C/A BBL 210-3-01220-5",
      },
      {
        id: "11",
        text:
          "เงินเกิน Suspense - C/A BBL 210-3-01220-5",
      },
      {
        id: "12",
        text:
          "เงินขาด Suspense - C/A BAY 034-0-40099-3",
      },
      {
        id: "13",
        text:
          "เงินเกิน Suspense - C/A BAY 034-0-40099-3",
      },
      {
        id: "14",
        text: "เงินขาด Suspense - S/A KTB 013-6-09603-4",
      },
      {
        id: "15",
        text:
          "เงินเกิน Suspense - S/A KTB 013-6-09603-4",
      },
      {
        id: "16",
        text: "เงินขาด Suspense - S/A KTB 015-1-52139-5",
      },
      {
        id: "17",
        text: "เงินเกิน Suspense - S/A KTB 015-1-52139-5",
      },
      {
        id: "18",
        text: "เงินขาด Suspense - S/A KTB 2210006821",
      },
      {
        id: "19",
        text: "เงินเกิน Suspense - S/A KTB 2210006821",
      },
      {
        id: "20",
        text: "เงินขาด Suspense - S/A KTB 323-6-01646-9",
      },
      {
        id: "21",
        text: "เงินเกิน Suspense - S/A KTB 323-6-01646-9",
      },
      {
        id: "22",
        text:
          "เงินขาด Suspense - C/A-CIMB 80-001-9685-4",
      },
      {
        id: "23",
        text:
          "เงินเกิน Suspense - C/A-CIMB 80-001-9685-4",
      },
      {
        id: "24",
        text: "เงินขาด Suspense - S/A Thanachart 115-2-35506-4",
      },
      {
        id: "25",
        text: "เงินเกิน Suspense - S/A Thanachart 115-2-35506-4",
      },
      {
        id: "26",
        text: "เงินขาด Suspense - C/A SCB 026-3-04300-9",
      },
      {
        id: "27",
        text: "เงินเกิน Suspense - C/A SCB 026-3-04300-9",
      },
      {
        id: "28",
        text: "เงินขาด Suspense - C/A KTB 015-6-05118-4",
      },
      {
        id: "29",
        text: "เงินเกิน Suspense - C/A KTB 015-6-05118-4",
      },
      {
        id: "30",
        text: "เงินขาด Suspense - S/A KTB 015-0-22692-6",
      },
      {
        id: "31",
        text: "เงินเกิน Suspense - S/A KTB 015-0-22692-6",
      },
      {
        id: "32",
        text: "เงินขาด Suspense - C/A KK 00031420000412",
      },
      {
        id: "33",
        text: "เงินเกิน Suspense - C/A KK 00031420000412",
      },
      {
        id: "34",
        text: "เงินขาด Suspense - S/A TFB 052-2-41857-9",
      },
      {
        id: "35",
        text: "เงินเกิน Suspense - S/A TFB 052-2-41857-9",
      },
      {
        id: "36",
        text: "เงินขาด Suspense - S/A BBL 210-0-25878-5",
      },
      {
        id: "37",
        text: "เงินเกิน Suspense - S/A BBL 210-0-25878-5",
      },
      {
        id: "38",
        text:
          "เงินขาด Suspense - S/A BAY 034-1-395-77-8",
      },
      {
        id: "39",
        text:
          "เงินเกิน Suspense - S/A BAY 034-1-395-77-8",
      },
      {
        id: "40",
        text: "เงินขาด Suspense - S/A KTB 2210006821",
      },
      {
        id: "41",
        text: "เงินเกิน Suspense - S/A KTB 2210006821",
      },
      {
        id: "42",
        text: "เงินขาด Suspense - S/A KTB 323-6-01646-9",
      },
      {
        id: "43",
        text: "เงินเกิน Suspense - S/A KTB 323-6-01646-9",
      },
      {
        id: "44",
        text:
          "เงินขาด Suspense - C/A-CIMB 80-001-9685-4",
      },
      {
        id: "45",
        text:
          "เงินเกิน Suspense - C/A-CIMB 80-001-9685-4",
      },
      {
        id: "46",
        text: "เงินขาด Suspense - S/A Thanachart 115-2-35506-4",
      },
      {
        id: "47",
        text: "เงินเกิน Suspense - S/A Thanachart 115-2-35506-4",
      },
      {
        id: "48",
        text: "เงินขาด Suspense - S/A SCB 026-2-89937-6",
      },
      {
        id: "49",
        text: "เงินเกิน Suspense - S/A SCB 026-2-89937-6",
      },
      {
        id: "50",
        text: "เงินขาด Suspense - S/A-TMB 053-2-50495-8",
      },
      {
        id: "51",
        text: "เงินเกิน Suspense - S/A-TMB 053-2-50495-8",
      },
      {
        id: "52",
        text: "เงินขาด Suspense - C/A TFB 052-1-07386-1",
      },
      {
        id: "53",
        text: "เงินเกิน Suspense - C/A TFB 052-1-07386-1",
      },
      {
        id: "54",
        text: "เงินขาด Suspense - C/A-KTB 221-6-02372-8",
      },
      {
        id: "55",
        text: "เงินเกิน Suspense - C/A-KTB 221-6-02372-8",
      },
      {
        id: "56",
        text: "เงินขาด Suspense - S/A-GSB 020252844491",
      },
      {
        id: "57",
        text: "เงินเกิน Suspense - S/A-GSB 020252844491",
      },
      {
        id: "58",
        text: "เงินขาด Suspense - C/A-GSB 000000806505",
      },
      {
        id: "59",
        text: "เงินเกิน Suspense - C/A-GSB 000000806505",
      },
      {
        id: "60",
        text: "เงินขาด Suspense - S/A KK 00032520001756",
      },
      {
        id: "61",
        text: "เงินเกิน Suspense - S/A KK 00032520001756",
      },
      {
        id: "62",
        text: "เงินขาด Suspense - S/A KTB 323-1-33669-4",
      },
      {
        id: "63",
        text: "เงินเกิน Suspense - S/A KTB 323-1-33669-4",
      },
      {
        id: "64",
        text: "เงินขาด Suspense - S/A KTB 013-1-61085-6",
      },
      {
        id: "65",
        text:
          "เงินเกิน Suspense - S/A KTB 013-1-61085-6",
      },
      {
        id: "66",
        text:
          "เงินขาด Suspense - S/A-CIMB 70-040-5774-5",
      },
      {
        id: "67",
        text:
          "เงินเกิน Suspense - S/A-CIMB 70-040-5774-5",
      },
      {
        id: "68",
        text: "เงินขาด Suspense - C/A-TMB 053-1-07517-4",
      },
      {
        id: "69",
        text: "เงินเกิน Suspense - C/A-TMB 053-1-07517-4",
      },
      {
        id: "70",
        text: "Defer Vat",
      },
      {
        id: "71",
        text: "เงินขาด Suspense Billing",
      },
      {
        id: "72",
        text: "เงินเกิน Suspense Billing",
      },
      {
        id: "73",
        text: "เจ้าหนี้การค้า",
      },
      {
        id: "74",
        text: "เจ้าหนี้การค้า",
      },
      {
        id: "75",
        text: "VAT",
      },
      {
        id: "76",
        text: "VAT",
      },
      {
        id: "77",
        text: "เงินเกิน Suspense - C/A-BBL 2103021156",
      },
      {
        id: "78",
        text: "เงินขาด Suspense - C/A-BBL 2103021156",
      },
      {
        id: "79",
        text: "เงินเกิน Suspense - C/A - SCB 468-077375-0",
      },
      {
        id: "80",
        text: "เงินขาด Suspense - C/A - SCB 468-077375-0",
      },
      {
        id: "81",
        text: "เงินเกิน Suspense - C/A - BAY 001-0-18260-1",
      },
      {
        id: "82",
        text: "เงินขาด Suspense - C/A - BAY 001-0-18260-1",
      },
      {
        id: "83",
        text: "เงินเกิน Suspense - S/A - BBL 2100747522",
      },
      {
        id: "84",
        text: "เงินขาด Suspense - S/A - BBL 2100747522",
      },
      {
        id: "85",
        text: "เงินเกิน Suspense - S/A - SCB 434-026854-0",
      },
      {
        id: "86",
        text: "เงินขาด Suspense - S/A - SCB 434-026854-0",
      },
      {
        id: "87",
        text: "เงินเกิน Suspense - S/A - BAY 001-9-59097-3",
      },
      {
        id: "88",
        text: "เงินขาด Suspense - S/A - BAY 001-9-59097-3",
      },
      {
        id: "89",
        text: "เงินเกิน Suspense - S/A - BAY 777-0-91268-4",
      },
      {
        id: "90",
        text: "เงินขาด Suspense - S/A - BAY 777-0-91268-4",
      },
      {
        id: "91",
        text: "Doubtful Debts",
      },
      {
        id: "92",
        text: "ค่าประกันผลงาน",
      },
      {
        id: "93",
        text: "Trade payable-related parties",
      },
      {
        id: "94",
        text: "ST loan -Non Related -factoring",
      },
      {
        id: "95",
        text: "ST loan- Non Related-Factoring",
      },
      {
        id: "96",
        text: "AR-AP Inter Clearing",
      },
      {
        id: "97",
        text: "ราชการ",
      },
      {
        id: "98",
        text: "ราชการ",
      },
      {
        id: "99",
        text: "บุคคล",
      },
      {
        id: "100",
        text: "บุคคล",
      },
      {
        id: "101",
        text: "เอกชน",
      },
      {
        id: "102",
        text: "เอกชน",
      },
      {
        id: "103",
        text: "JV",
      },
      {
        id: "104",
        text: "JV",
      },
      {
        id: "105",
        text: "Unclaim Credit",
      },
      {
        id: "106",
        text: "ค่าปรับลูกค้า",
      },
      {
        id: "107",
        text: "OPS",
      },
      {
        id: "109",
        text: "เช็คระหว่างทาง",
      },
      {
        id: "110",
        text: "ค่าเผื่อหนี้ Cr.",
      },
      {
        id: "111",
        text: "ค่าเผื่อหนี้ Dr.",
      },
      {
        id: "112",
        text: "เงินเกิน Cr.",
      },
      {
        id: "113",
        text: "เงินขาด Dr.",
      },
      {
        id: "114",
        text: "เงินเกิน ST loan- Non Related-Factoring",
      },
    ],
    invoice_no: "",
    receipt_number: "",
    amount_after_vat: "",
    amount: 0,
    agings: "",
    msg: "",
    rv_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
    // add_amount: "",
    transfer_suspense: [
      {
        type_debt: "",
        incoming_paid_date: "",
        payment_type_bank: "",
        code_bank: "",
        statement_no: "",
        amount: "",
        sequence: "",
        sum_amounts: 0,
        check_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
        bank_check_list: "",
        chq_no: "",
        fee: "",
      },
    ],
    order_gl: "",
    statement_no: "",
    tax_base: 0,
    remark: "",
    remark_erp: "",
    WHT_list: "",
    bank_check_list: "",
    customer_no: "",
    customer_name: "",
    customer_email: "",
    finance_name: "",
    sale_email: "",
    order_gl_list: "",
    order_gl_detail_list: "",
    check_inv_date: true,
    customer_detail: [],
    statement_detail: [], //statement Transfer/Suspense
    statement_detail_chq: [], //statement CHQ
    sum_amount_after_vat: 0,
    sum_aging: 0,
    new_aging: [],
    incoming_paid_date: "",
    payment_type_bank: "",
    code_bank: "",
    data_wht: [],
    data_mail: [],
    sum_wht: 0,
    sum_balance: 0,
    data_aging: [],
    // add_amount: [],
    sum_add_amount: 0,
    new_sum_aging: 0,
    // checkbox_wht: false,
    // checkbox_mail: false,
    files: [],
    files_wht: [],
    special_code: "",
    evidence_reporting: "",
    select_special_code: "",
    tax_code: "",
    checkall_mail: false,
    checkall_wht: false,
    data_invoice: [],
    data_detail_mail_wht: [],
    add_invoice: [],
    data_add_gl: [],
    data_file: [],
    data_file_wht: [],
    status_file: "",
    status_file_wht: "",
    check_mail: false,
    check_wht: false,
    check_code: false,
    sum_amounts: 0, //ยอดรวมชำระ
    offsetTop: 0,
    modal_request_mail: false, //dialog Mail ยืนยันใบแจ้งหนี้
    modal_request_mail_wht: false, // dialog Mail ติดตาม WHT
    modal_request_mail_and_wht: false, //dialog Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
    modal_close_dialog: false,
    data_tf_sp: [],
    data_chq: [],
    data_statement: [],
    check_mail_invoice: false,
    check_mail_wht: false,
    status_mail_invoice: false, //Mail ยืนยันใบแจ้งหนี้
    status_mail_wht: false, //Mail ติดตาม WHT
    status_mail_total: false, //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
    iteminvoice_no: [],
    select_inv: [],
    datatest: [],
    datacheckwht: [],
    link_bankcode: []
  }),
  mounted() {
    eventBus.$on("openMatchingDialog", this.open);
  },
  beforeDestroy() {
    eventBus.$off("openMatchingDialog");
    // bus.$off()
  },
  computed: {
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    length() {
      return 7000;
    },
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    // convert file to base64
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async getbase64Files() {
      let base64 = "";
      let new_base64 = [];
      this.data_file = [];
      for (let i = 0; i < this.files.length; i++) {
        const new_files = this.files[i];
        base64 = await this.toBase64(new_files)
        new_base64 = base64.split("base64,")
        //console.log(new_base64)
        this.data_file.push({
          name: new_files.name,
          type: new_files.type,
          data_base64: new_base64[1],
          file_id: "",
          folder_id: ""
        });
      }
      // console.log("files : ", this.data_file);
    },
    async getbase64FilesWHT() {
      let base64 = "";
      let new_base64 = [];
      this.data_file_wht = [];
      for (let i = 0; i < this.files_wht.length; i++) {
        const new_files_wht = this.files_wht[i];
        base64 = await this.toBase64(new_files_wht)
        new_base64 = base64.split("base64,")
        this.data_file_wht.push({
          name: new_files_wht.name,
          type: new_files_wht.type,
          data_base64: new_base64[1],
          file_id: "",
          folder_id: ""
        });
      }
      // console.log("files wht : ",this.data_file_wht)
    },
    
    closeDialog() {
      this.upload_File_Dialog = false
    },
    selectFile(files){
      if(this.set_file == ''){
        files.forEach((element) => {
          this.set_file.push(element)
        });
      }else{
        if(this.set_file != files){
          files.forEach((element) => {
            this.set_file.push(element)
          });
        }
      }

      if(files == ''){
        this.files = this.set_file
      } 
      
      this.files = [];
      this.files = this.set_file
    },
    removeFile(fileName) {
      const index = this.files.findIndex(
        file => file.name === fileName
      );
      if (index > -1) this.files.splice(index, 1);

      this.set_file = this.files
    },
    onDrop(e) {
      this.dragoverfile = false;
      //if (this.files.length > 0) this.files = [];
      
        e.dataTransfer.files.forEach(element =>
          this.files.push(element)
        );

        this.set_file = this.files
    },
    selectFileWHT(files_wht){
      if(this.set_file_wht == ''){
        files_wht.forEach((element) => {
          this.set_file_wht.push(element)
        });
      }else{
        if(this.set_file_wht != files_wht){
          files_wht.forEach((element) => {
            this.set_file_wht.push(element)
          });
        }
      }

      if(files_wht == ''){
        this.files_wht = this.set_file_wht
      } 
      
      this.files_wht = [];
      this.files_wht = this.set_file_wht
    },
    removeFileWHT(fileName) {
      // Find the index of the
      const index = this.files_wht.findIndex(
        file => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.files_wht.splice(index, 1);

      this.set_file_wht = this.files_wht
    },
    onDropWHT(e) {
      this.dragoverfile_WHT = false;
      //if (this.files_wht.length > 0) this.files_wht = [];
      
        e.dataTransfer.files.forEach(element =>
          this.files_wht.push(element)
        );

        this.set_file_wht = this.files_wht
    },
    closeDialogWHT() {
      this.upload_File_WHT_Dialog = false
    },
    checkSpecialCode(){
      if(this.select_special_code == "01"){
        this.check_code = true;
        // mail
        this.check_req_mail = false;
        this.status_mail_invoice = false;
        this.check_mail_invoice = false;
        //mail_wht
        this.check_req_mail_WHT = false;
        this.status_mail_wht = false;
        this.check_mail_wht = false;
        //this.files = [];
      }else{
        this.check_code = false;
      }
    },
    check_receipt_code(){
      if(this.select_special_code == "01"){
        this.check_receipt = true;
      }else if(this.select_special_code != "02" && this.customer_detail[0].receipt_number != ""){
        this.check_receipt = false;
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถทำรายการได้",
          text: 'เนื่องจากรหัสพิเศษไม่ตรงตามเงื่อนไข',
          showConfirmButton: false,
          timer: 3000,
        });
      }else if(this.select_special_code != "03" && this.customer_detail[0].receipt_number == ""){
        this.check_receipt = false;
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถทำรายการได้",
          text: 'เนื่องจากรหัสพิเศษไม่ตรงตามเงื่อนไข',
          showConfirmButton: false,
          timer: 3000,
        });
      }else{
        this.check_receipt = true;
      }
    },
    // end

    // uploadfile
    // uploadfiles(event,key){
    //   var arr_file = []
    //   var arr_wht = []
    //   if(event){
    //     if(key == 'file'){
    //       let formData = new FormData();
    //       event.forEach(element => {
    //        console.log(element)
    //         formData.append("filename",element.name);
    //         formData.append("type", element.type);
    //         formData.append("resultDocument", element);
    //         // console.log(formData.getAll('resultDocument'));
    //         arr_file.push({
    //           formData
    //         })
    //       });

    //     }else{
    //       let formDataWHT = new FormData();
    //       event.forEach(element => {
    //         formDataWHT.append("filename", element.name);
    //         formDataWHT.append("type", element.type);
    //         formDataWHT.append("resultDocument", element);
    //         arr_wht.push({
    //           formDataWHT
    //         })
    //       });
    //       console.log(arr_wht)
    //     }
    //   }
    // },
    // end
    // validate
    validate() {
      if(this.datacheckwht.length != 0){
          this.check_wht = true;
          this.$refs.form.validate();
      }else{
        this.check_wht = false;
        this.$refs.form.reset();
        //this.$refs.formfile.reset();
        this.WHT_list = "";
      }
    },
    validateselect(type) {
      if (type != 1) {
        this.files_wht = [];
      } 
    },
    checkAll(key, check) {
      let sum = 0;
      let num = '';
      if (key == "mail" && check == true) {
        // this.data_mail = [];
        this.customer_detail.forEach((element) => {
          element.checkbox_mail = true;
          this.data_mail.push({ data_mail: element });
        });
        this.check_mail = true;
      } else if (key == "mail" && check == false) {
        this.customer_detail.forEach((element) => {
          element.checkbox_mail = false;
          this.data_mail.pop({ data_mail: element });
        });
        this.check_mail = false;
      }
      if (key == "wht" && check == true) {
        this.customer_detail.forEach((element) => {
          element.checkbox_wht = true;
          this.checkbox_wht = true;
          this.data_wht.push({ invoice_no: element });
          this.datacheckwht.push(true)
        });
        this.data_wht.forEach((element) => {
          num = this.toNumber(element.invoice_no.aging)
          sum += parseFloat(num);
        });
        //this.checkall_wht =true;
        this.check_wht = true;
        this.tax_base = (sum / 1.07).toFixed(3);
        this.selectTax();
      } else if (key == "wht" && check == false) {
        this.customer_detail.forEach((element) => {
          element.checkbox_wht = false;
          this.checkbox_wht = false;
          this.data_wht.pop({ invoice_no: element });
        });
        //this.checkall_wht = false;
        this.datacheckwht = [];
        this.check_wht = false;
        this.tax_base = 0;
        this.selectTax();
      }
    },

    checkMail(item, check) {
      if (check) {
        this.check_mail = true;
        this.checkall_mail = true;
        this.data_mail.push({
          data_mail: item,
        });
        // console.log('เพิ่ม',this.data_mail);
      } else {
        this.check_mail = false;
        this.checkall_mail = false;
        this.data_mail.pop({
          data_mail: item,
        });
        // console.log('ลด',this.data_mail);
      }
    },
    // cal ฐานภาษี
    calTypeWht(item, check) {
      let sum = 0;
      let num = '';
      if (check) {
        this.check_wht = true;
        this.checkall_wht = true;
        this.data_wht.push({ invoice_no: item });
        this.datacheckwht.push(true)
        // console.log(this.data_wht)
      } else {
        let wht_data = [];
        this.data_wht.forEach((element) =>{
          if(element.invoice_no.invoice_no != item.invoice_no){
            wht_data.push(element)
          }
        })
        this.data_wht = [];
        this.data_wht = wht_data;
        this.datacheckwht.pop(true)
        if(this.data_wht.length == 0){
          this.checkall_wht = false;
          this.check_wht = false;
        }
      }
      this.data_wht.forEach((element) => {
        // console.log(element)
        num = this.toNumber(element.invoice_no.aging)
        sum += parseFloat(num);
      });
      this.tax_base = (sum / 1.07).toFixed(3);
      this.selectTax();
      // console.log(this.tax_base);
    },
    // ยอด wht
    selectTax() {
      // let cal_wht = 0
      if(this.tax_base != 0){
        if (this.tax_code == "R53-01 ค่าบริการ 1%") {
          this.sum_wht = (this.tax_base * 0.01).toFixed(2);
        } else if (this.tax_code == "R53-04 ค่าบริการ 1.5%") {
          this.sum_wht = (this.tax_base * 0.015).toFixed(2);
        } else if (this.tax_code == "R53-06 ค่าบริการ 2%") {
          this.sum_wht = (this.tax_base * 0.02).toFixed(2);
        } else if (this.tax_code == "R53-02 ค่าบริการ 3%") {
          this.sum_wht = (this.tax_base * 0.03).toFixed(2);
        } else if (this.tax_code == "R53-03 ค่าเช่า 5%") {
          this.sum_wht = (this.tax_base * 0.05).toFixed(2);
        } else {
          this.sum_wht = 0;
        }
      }else{
        this.sum_wht = 0;
      }
      
    },
    // คำนวณยอดชำระ
    calAmount() {
      let count = 0;
      // this.amount = parseFloat(this.amount).toFixed(2);
      this.transfer_suspense.forEach((element) => {
        // console.log(element.amount);
        if(element.type_debt != "Suspense" && element.type_debt != "Adjust JV"){
          if (element.amount) {
            count += parseFloat(this.toNumber(element.amount));
          }
        }
      });
      let legarr = this.transfer_suspense.length - 1;
      this.transfer_suspense[legarr].sum_amounts = count;
      this.sum_amounts = count;
    },
    calFee(){
      let count = 0;
      let new_arr = [];
      if(this.list_add_gl[0].order_gl != "01"){
        new_arr = this.list_add_gl
        new_arr.unshift(new_arr.pop())
        this.list_add_gl = new_arr
      }

      this.transfer_suspense.forEach((element) => {
        if (element.fee) {
          count += parseFloat(this.toNumber(element.fee));
        }
      });
      if(count != 0){
        this.list_add_gl[0].order_gl = "01";
        this.list_add_gl[0].add_gl = "ค่าธรรมเนียมธนาคาร";
        this.list_add_gl[0].add_amount = count.toString();
      }else{
        this.list_add_gl[0].order_gl = "";
        this.list_add_gl[0].add_gl = "";
        this.list_add_gl[0].add_amount = "";

        new_arr = this.list_add_gl
        new_arr.push(new_arr.shift())
        this.list_add_gl = new_arr
      }
      
    },
    toNumber(num){
      let new_num =''
      if(String(num).includes(',')){
        new_num = Number(num.replace(/,/g , ''))
      }else{
        new_num = Number(num)
      }
      return new_num
    
    },
    onchangeOrder_gl(item, index) {
      // console.log(item, index);
      this.add_gl.forEach((element) => {
        if (element.id == item) {
          this.list_add_gl[index].add_gl = element.text;
        }
      });
    },
    onchangeDetail_gl(item, index) {
      // console.log(item, index);
      this.add_gl.forEach((element) => {
        if (element.text == item) {
          this.list_add_gl[index].order_gl = element.id;
        }
      });
    },
    onchangeAddAmount(data, key) {
      if (key == "ADD_GL") {
        let count_add = 0;
        this.list_add_gl.forEach((element) => {
          if (element.add_amount != "") {
            count_add += Number(this.toNumber(element.add_amount));
          }
        });
        this.sum_add_amount = count_add.toFixed(2);
        // คำนวณ sum aging ในกรณีมีการกรอกข้อมูลเพิ่ม
      } else if (key == "Aging") {
        let count_aging = 0;
        this.customer_detail.forEach((element) => {
          // console.log('aging',element)
          if (element.aging != "") {
            count_aging += Number(element.aging.replace(/,/g , ''));
          }
        });
        // this.tax_base = (count_aging / 1.07).toFixed(2);
        this.sum_aging = count_aging;
        this.new_sum_aging = this.sum_aging;
        if (this.data_wht.length > 0) {
          let sum = 0;
          let num = '';
          this.data_wht.forEach((element) => {
            if (element.invoice_no.checkbox_wht == true) {
              num = this.toNumber(element.invoice_no.aging)
              sum += parseFloat(num);
            }
          });
          this.tax_base = (sum / 1.07).toFixed(3);
          // console.log(this.tax_base)
        }

        // คำนวณ sum amount ในกรณีมีการกรอกข้อมูลเพิ่ม
      } else if (key == "Amount") {
        let count_amount = 0;
        this.customer_detail.forEach((element) => {
          if (element.amount_after_vat != "") {
            count_amount += Number(element.amount_after_vat);
          }
        });
        this.sum_amount_after_vat = count_amount.toFixed(2);
      }
    },
    open(item, select_type_bank , index) {
      this.finish = false;
      this.matching_dialog = true;
      var amounts = 0;
      if (item) {
        var arr = [];
        arr = [...item];

        arr.forEach((element) => {
          this.customer_detail.push({
            ...element,
            checkbox_mail: false,
            checkbox_wht: false,
          });
        });
        this.customer_no = this.customer_detail[0].customer_no;
        this.customer_name = this.customer_detail[0].customer_name;
        this.customer_email = this.customer_detail[0].customer_email;
        this.finance_name = this.customer_detail[0].finance_name;
        this.sale_email = this.customer_detail[0].sale_email;
        /*
        if (this.customer_email != "") {
          this.checkall_mail = true;
          this.check_mail = true;
          // this.checkbox_mail = true
          this.customer_detail.forEach((element) => {
            element.checkbox_mail = true;
            this.data_mail.push({
              data_mail: element,
            });
          });
          // console.log(this.data_mail)
        }*/ if(this.customer_email == "") {
          this.checkall_mail = false;
          this.check_mail = false;
          // this.checkbox_mail = false
          this.customer_detail.forEach((element) => {
            element.checkbox_mail = false;
          });
        }
        if (this.transfer_suspense[0].incoming_paid_date == "") {
          if (arr[0].incoming_paid_date == "0001-01-01") {
            this.transfer_suspense[0].incoming_paid_date = moment(
              new Date().toJSON()
            ).format("YYYY-MM-DD");
          } else {
            this.transfer_suspense[0].incoming_paid_date = arr[0].incoming_paid_date;
            this.rv_date = arr[0].incoming_paid_date;
          }
          this.transfer_suspense[0].payment_type_bank = arr[0].payment_type;
        }
        // type debt
        if(select_type_bank == "Transfer"){
          this.transfer_suspense[0].type_debt = "Transfer"
          this.evidence_reporting = "Mail";
        }else{
          this.transfer_suspense[0].type_debt = "CHQ";
          this.evidence_reporting = "CHQ";
        }
        
        this.customer_detail.forEach((element) => {
          element.aging = Number(element.aging).toFixed(2);
          this.iteminvoice_no.push(element.invoice_no);
        });
        // console.log('data invoice', this.customer_detail)
        // data add invoice
        this.checkInvoiceDate();
        this.checkReceipt();

        if(this.customer_email != "" && this.check_receipt == true){
          if(this.customer_detail[0].receipt_number != ""){
            this.checkall_mail = false
            this.checkAll('mail' , false);
          }else{
            this.checkall_mail = true
            this.checkAll('mail' , true);
          }
        }else{
          this.checkall_mail = false
          this.checkAll('mail' , false);
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
              "/customer/filterinvoices/CusNo=" +
              this.customer_no,
            headers
          )
          .then((response) => {
            if (response.status === 200) {
              let new_invoice = [];
              //let new_invoice2 = [];
              let new_list_invoice = [];
              this.data_customer = response.data.data;
              //console.log(this.data_customer)
              this.data_customer.forEach((element) => {
                this.invoice_list.push({inv : element.invoice_no , cut : element.cut_debt , status : element.status_recheck ,aging : element.aging});
                
              })
              
              new_invoice = this.invoice_list.filter(item => !this.iteminvoice_no.includes(item))
              //new_invoice2 = new_invoice.filter(item => item.cut != 'Matching' && item.cut != 'Matched')
              new_invoice.forEach((element) =>{
                if(element.cut != 'Matching' && element.cut != 'Matched' && element.cut != 'On Process' && element.aging != "0"){
                  new_list_invoice.push(element);
                }else if(element.cut == 'Matching' && element.status == 'Partial' ){
                  new_list_invoice.push(element);
                }else if(element.cut == 'Matched' && element.status == 'Partial'){
                  new_list_invoice.push(element);
                }else if(element.cut == 'On Process' && element.status == 'Partial'){
                  new_list_invoice.push(element);
                }
              })
              //console.log(new_list_invoice)
              this.new_invoice_list = new_list_invoice
              }else{
                this.data_customer = [];
              }
          });
      }
      // Number(this.amount.toFixed(2));
      if (index == undefined) {
        this.transfer_suspense[0].payment_type_bank = this.customer_detail[0].payment_type;
        if(this.transfer_suspense[0].type_debt == "CHQ"){
          if(this.transfer_suspense[0].payment_type_bank == ""){
            this.transfer_suspense[0].payment_type_bank = "KTB395";
          }
        }

        if (this.transfer_suspense[0].payment_type_bank == "BBL205") {
          this.transfer_suspense[0].code_bank = "BBL001";
        } else if (this.transfer_suspense[0].payment_type_bank == "BBL785") {
          this.transfer_suspense[0].code_bank = "BBL002";
        } else if (this.transfer_suspense[0].payment_type_bank == "BBL156") {
          this.transfer_suspense[0].code_bank = "BBL003";
        } else if (this.transfer_suspense[0].payment_type_bank == "BBL522") {
          this.transfer_suspense[0].code_bank = "BBL004";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY993") {
          this.transfer_suspense[0].code_bank = "BAY001";
        }  else if (this.transfer_suspense[0].payment_type_bank == "BAY778") {
          this.transfer_suspense[0].code_bank = "BAY002";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY601") {
          this.transfer_suspense[0].code_bank = "BAY003";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY973") {
          this.transfer_suspense[0].code_bank = "BAY004";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY684") {
          this.transfer_suspense[0].code_bank = "BAY005";
        } else if (this.transfer_suspense[0].payment_type_bank == "CIMB854") {
          this.transfer_suspense[0].code_bank = "CIMB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "CIMB745") {
          this.transfer_suspense[0].code_bank = "CIMB002";
        } else if (
          this.transfer_suspense[0].payment_type_bank == "Bill Payment - SCB"
        ) {
          this.transfer_suspense[0].code_bank = "SCB001";
        } else if (
          this.transfer_suspense[0].payment_type_bank == "Bill Payment - KBANK"
        ) {
          this.transfer_suspense[0].code_bank = "KBANK002";
        } else if (
          this.transfer_suspense[0].payment_type_bank == "Bill Payment - BBL"
        ) {
          this.transfer_suspense[0].code_bank = "BBL001";
        } else if (this.transfer_suspense[0].payment_type_bank == "GSB505") {
          this.transfer_suspense[0].code_bank = "GSB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "GSB491") {
          this.transfer_suspense[0].code_bank = "GSB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "KKP412") {
          this.transfer_suspense[0].code_bank = "KKP001";
        } else if (this.transfer_suspense[0].payment_type_bank == "KKP756") {
          this.transfer_suspense[0].code_bank = "KKP002";
        } else if (this.transfer_suspense[0].payment_type_bank == "KBANK579") {
          this.transfer_suspense[0].code_bank = "KBANK003";
        } else if (this.transfer_suspense[0].payment_type_bank == "KBANK861") {
          this.transfer_suspense[0].code_bank = "KBANK002";
        } else if (this.transfer_suspense[0].payment_type_bank == "KBANK035") {
          this.transfer_suspense[0].code_bank = "KBANK005";
        } else if (this.transfer_suspense[0].payment_type_bank == "KBANK199") {
          this.transfer_suspense[0].code_bank = "KBANK001";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB395") {
          this.transfer_suspense[0].code_bank = "KTB003";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB184") {
          this.transfer_suspense[0].code_bank = "KTB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB926") {
          this.transfer_suspense[0].code_bank = "KTB004";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB569") {
          this.transfer_suspense[0].code_bank = "KTB005";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB694") {
          this.transfer_suspense[0].code_bank = "KTB006";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB034") {
          this.transfer_suspense[0].code_bank = "KTB007";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB728") {
          this.transfer_suspense[0].code_bank = "KTB010";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB856") {
          this.transfer_suspense[0].code_bank = "KTB008";
        } else if (this.transfer_suspense[0].payment_type_bank == "SCB376") {
          this.transfer_suspense[0].code_bank = "SCB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "SCB009") {
          this.transfer_suspense[0].code_bank = "SCB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "SCB750") {
          this.transfer_suspense[0].code_bank = "SCB003";
        } else if (this.transfer_suspense[0].payment_type_bank == "SCB540") {
          this.transfer_suspense[0].code_bank = "SCB004";
        } else if (this.transfer_suspense[0].payment_type_bank == "TMB958") {
          this.transfer_suspense[0].code_bank = "TMB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "TTB174") {
          this.transfer_suspense[0].code_bank = "TMB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "TTB958") {
          this.transfer_suspense[0].code_bank = "TMB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "TTB907") {
          this.transfer_suspense[0].code_bank = "TTB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "TTB553") {
          this.transfer_suspense[0].code_bank = "TTB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "TBANK064") {
          this.transfer_suspense[0].code_bank = "TBANK002";
        } else if (
          this.transfer_suspense[0].payment_type_bank == "CHQ" ||
          this.transfer_suspense[0].payment_type_bank == "FACTORING" ||
          this.transfer_suspense[0].payment_type_bank == "QR CODE"
        ) {
          this.transfer_suspense[0].code_bank = "";
        } else {
          this.transfer_suspense[0].code_bank = "";
        }
      } else {
        // console.log(index)
        if (this.transfer_suspense[index].payment_type_bank == "BBL205") {
          this.transfer_suspense[index].code_bank = "BBL001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BBL785"
        ) {
          this.transfer_suspense[index].code_bank = "BBL002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BBL156"
        ) {
          this.transfer_suspense[index].code_bank = "BBL003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BBL522"
        ) {
          this.transfer_suspense[index].code_bank = "BBL004";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY993"
        ) {
          this.transfer_suspense[index].code_bank = "BAY001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY778"
        ) {
          this.transfer_suspense[index].code_bank = "BAY002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY601"
        ) {
          this.transfer_suspense[index].code_bank = "BAY003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY973"
        ) {
          this.transfer_suspense[index].code_bank = "BAY004";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY684"
        ) {
          this.transfer_suspense[index].code_bank = "BAY005";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "CIMB854"
        ) {
          this.transfer_suspense[index].code_bank = "CIMB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "CIMB745"
        ) {
          this.transfer_suspense[index].code_bank = "CIMB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank ==
          "Bill Payment - SCB"
        ) {
          this.transfer_suspense[index].code_bank = "SCB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank ==
          "Bill Payment - KBANK"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK002";
        } else if (
          this.transfer_suspense[index].payment_type_bank ==
          "Bill Payment - BBL"
        ) {
          this.transfer_suspense[index].code_bank = "BBL001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "GSB505"
        ) {
          this.transfer_suspense[index].code_bank = "GSB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "GSB491"
        ) {
          this.transfer_suspense[index].code_bank = "GSB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KKP412"
        ) {
          this.transfer_suspense[index].code_bank = "KKP001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KKP756"
        ) {
          this.transfer_suspense[index].code_bank = "KKP002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KBANK579"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KBANK861"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KBANK035"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK005";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KBANK199"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB395"
        ) {
          this.transfer_suspense[index].code_bank = "KTB003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB184"
        ) {
          this.transfer_suspense[index].code_bank = "KTB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB926"
        ) {
          this.transfer_suspense[index].code_bank = "KTB004";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB569"
        ) {
          this.transfer_suspense[index].code_bank = "KTB005";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB694"
        ) {
          this.transfer_suspense[index].code_bank = "KTB006";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB034"
        ) {
          this.transfer_suspense[index].code_bank = "KTB007";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB728"
        ) {
          this.transfer_suspense[index].code_bank = "KTB010";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB856"
        ) {
          this.transfer_suspense[index].code_bank = "KTB008";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "SCB376"
        ) {
          this.transfer_suspense[index].code_bank = "SCB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "SCB009"
        ) {
          this.transfer_suspense[index].code_bank = "SCB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "SCB750"
        ) {
          this.transfer_suspense[index].code_bank = "SCB003";
        }else if (
          this.transfer_suspense[index].payment_type_bank == "SCB540"
        ) {
          this.transfer_suspense[index].code_bank = "SCB004";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TMB958"
        ) {
          this.transfer_suspense[index].code_bank = "TMB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TTB174"
        ) {
          this.transfer_suspense[index].code_bank = "TMB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TTB958"
        ) {
          this.transfer_suspense[index].code_bank = "TMB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TTB907"
        ) {
          this.transfer_suspense[index].code_bank = "TTB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TTB553"
        ) {
          this.transfer_suspense[index].code_bank = "TTB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TBANK064"
        ) {
          this.transfer_suspense[index].code_bank = "TBANK002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "CHQ" ||
          this.transfer_suspense[index].payment_type_bank == "FACTORING" ||
          this.transfer_suspense[index].payment_type_bank == "QR CODE"
        ) {
          this.transfer_suspense[index].code_bank = "";
        } else {
          this.transfer_suspense[index].code_bank = "";
        }
      }
      // คำนวน sum amount
      for (let i = 0; i < this.customer_detail.length; i++) {
        amounts += Number(this.customer_detail[i].amount_after_vat);
      }
      this.sum_amount_after_vat = amounts.toFixed(2);
    },
    check_bank_type(index){
      if (index == undefined) {
        this.transfer_suspense[0].payment_type_bank = this.customer_detail[0].payment_type;
        if (this.transfer_suspense[0].payment_type_bank == "BBL205") {
          this.transfer_suspense[0].code_bank = "BBL001";
        } else if (this.transfer_suspense[0].payment_type_bank == "BBL785") {
          this.transfer_suspense[0].code_bank = "BBL002";
        } else if (this.transfer_suspense[0].payment_type_bank == "BBL156") {
          this.transfer_suspense[0].code_bank = "BBL003";
        } else if (this.transfer_suspense[0].payment_type_bank == "BBL522") {
          this.transfer_suspense[0].code_bank = "BBL004";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY993") {
          this.transfer_suspense[0].code_bank = "BAY001";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY778") {
          this.transfer_suspense[0].code_bank = "BAY002";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY601") {
          this.transfer_suspense[0].code_bank = "BAY003";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY973") {
          this.transfer_suspense[0].code_bank = "BAY004";
        } else if (this.transfer_suspense[0].payment_type_bank == "BAY684") {
          this.transfer_suspense[0].code_bank = "BAY005";
        } else if (this.transfer_suspense[0].payment_type_bank == "CIMB854") {
          this.transfer_suspense[0].code_bank = "CIMB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "CIMB745") {
          this.transfer_suspense[0].code_bank = "CIMB002";
        } else if (
          this.transfer_suspense[0].payment_type_bank == "Bill Payment - SCB"
        ) {
          this.transfer_suspense[0].code_bank = "SCB001";
        } else if (
          this.transfer_suspense[0].payment_type_bank == "Bill Payment - KBANK"
        ) {
          this.transfer_suspense[0].code_bank = "KBANK002";
        } else if (
          this.transfer_suspense[0].payment_type_bank == "Bill Payment - BBL"
        ) {
          this.transfer_suspense[0].code_bank = "BBL001";
        } else if (this.transfer_suspense[0].payment_type_bank == "GSB505") {
          this.transfer_suspense[0].code_bank = "GSB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "GSB491") {
          this.transfer_suspense[0].code_bank = "GSB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "KKP412") {
          this.transfer_suspense[0].code_bank = "KKP001";
        } else if (this.transfer_suspense[0].payment_type_bank == "KKP756") {
          this.transfer_suspense[0].code_bank = "KKP002";
        } else if (this.transfer_suspense[0].payment_type_bank == "KBANK579") {
          this.transfer_suspense[0].code_bank = "KBANK003";
        } else if (this.transfer_suspense[0].payment_type_bank == "KBANK861") {
          this.transfer_suspense[0].code_bank = "KBANK002";
        } else if (this.transfer_suspense[0].payment_type_bank == "KBANK035") {
          this.transfer_suspense[0].code_bank = "KBANK005";
        } else if (this.transfer_suspense[0].payment_type_bank == "KBANK199") {
          this.transfer_suspense[0].code_bank = "KBANK001";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB395") {
          this.transfer_suspense[0].code_bank = "KTB003";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB184") {
          this.transfer_suspense[0].code_bank = "KTB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB926") {
          this.transfer_suspense[0].code_bank = "KTB004";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB569") {
          this.transfer_suspense[0].code_bank = "KTB005";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB694") {
          this.transfer_suspense[0].code_bank = "KTB006";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB034") {
          this.transfer_suspense[0].code_bank = "KTB007";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB728") {
          this.transfer_suspense[0].code_bank = "KTB010";
        } else if (this.transfer_suspense[0].payment_type_bank == "KTB856") {
          this.transfer_suspense[0].code_bank = "KTB008";
        } else if (this.transfer_suspense[0].payment_type_bank == "SCB376") {
          this.transfer_suspense[0].code_bank = "SCB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "SCB009") {
          this.transfer_suspense[0].code_bank = "SCB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "SCB750") {
          this.transfer_suspense[0].code_bank = "SCB003";
        } else if (this.transfer_suspense[0].payment_type_bank == "SCB540") {
          this.transfer_suspense[0].code_bank = "SCB004";
        } else if (this.transfer_suspense[0].payment_type_bank == "TMB958") {
          this.transfer_suspense[0].code_bank = "TMB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "TTB174") {
          this.transfer_suspense[0].code_bank = "TMB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "TTB958") {
          this.transfer_suspense[0].code_bank = "TMB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "TTB907") {
          this.transfer_suspense[0].code_bank = "TTB001";
        } else if (this.transfer_suspense[0].payment_type_bank == "TTB553") {
          this.transfer_suspense[0].code_bank = "TTB002";
        } else if (this.transfer_suspense[0].payment_type_bank == "TBANK064") {
          this.transfer_suspense[0].code_bank = "TBANK002";
        } else if (
          this.transfer_suspense[0].payment_type_bank == "CHQ" ||
          this.transfer_suspense[0].payment_type_bank == "FACTORING" ||
          this.transfer_suspense[0].payment_type_bank == "QR CODE"
        ) {
          this.transfer_suspense[0].code_bank = "";
        } else {
          this.transfer_suspense[0].code_bank = "";
        }
      } else {
        // console.log(index)
        if (this.transfer_suspense[index].payment_type_bank == "BBL205") {
          this.transfer_suspense[index].code_bank = "BBL001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BBL785"
        ) {
          this.transfer_suspense[index].code_bank = "BBL002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BBL156"
        ) {
          this.transfer_suspense[index].code_bank = "BBL003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BBL522"
        ) {
          this.transfer_suspense[index].code_bank = "BBL004";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY993"
        ) {
          this.transfer_suspense[index].code_bank = "BAY001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY778"
        ) {
          this.transfer_suspense[index].code_bank = "BAY002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY601"
        ) {
          this.transfer_suspense[index].code_bank = "BAY003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY973"
        ) {
          this.transfer_suspense[index].code_bank = "BAY004";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "BAY684"
        ) {
          this.transfer_suspense[index].code_bank = "BAY005";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "CIMB854"
        ) {
          this.transfer_suspense[index].code_bank = "CIMB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "CIMB745"
        ) {
          this.transfer_suspense[index].code_bank = "CIMB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank ==
          "Bill Payment - SCB"
        ) {
          this.transfer_suspense[index].code_bank = "SCB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank ==
          "Bill Payment - KBANK"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK002";
        } else if (
          this.transfer_suspense[index].payment_type_bank ==
          "Bill Payment - BBL"
        ) {
          this.transfer_suspense[index].code_bank = "BBL001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "GSB505"
        ) {
          this.transfer_suspense[index].code_bank = "GSB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "GSB491"
        ) {
          this.transfer_suspense[index].code_bank = "GSB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KKP412"
        ) {
          this.transfer_suspense[index].code_bank = "KKP001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KKP756"
        ) {
          this.transfer_suspense[index].code_bank = "KKP002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KBANK579"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KBANK861"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KBANK035"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK005";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KBANK199"
        ) {
          this.transfer_suspense[index].code_bank = "KBANK001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB395"
        ) {
          this.transfer_suspense[index].code_bank = "KTB003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB184"
        ) {
          this.transfer_suspense[index].code_bank = "KTB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB926"
        ) {
          this.transfer_suspense[index].code_bank = "KTB004";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB569"
        ) {
          this.transfer_suspense[index].code_bank = "KTB005";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB694"
        ) {
          this.transfer_suspense[index].code_bank = "KTB006";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB034"
        ) {
          this.transfer_suspense[index].code_bank = "KTB007";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB728"
        ) {
          this.transfer_suspense[index].code_bank = "KTB010";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "KTB856"
        ) {
          this.transfer_suspense[index].code_bank = "KTB008";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "SCB376"
        ) {
          this.transfer_suspense[index].code_bank = "SCB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "SCB009"
        ) {
          this.transfer_suspense[index].code_bank = "SCB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "SCB750"
        ) {
          this.transfer_suspense[index].code_bank = "SCB003";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "SCB540"
        ) {
          this.transfer_suspense[index].code_bank = "SCB004";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TMB958"
        ) {
          this.transfer_suspense[index].code_bank = "TMB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TTB174"
        ) {
          this.transfer_suspense[index].code_bank = "TMB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TTB958"
        ) {
          this.transfer_suspense[index].code_bank = "TMB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TTB907"
        ) {
          this.transfer_suspense[index].code_bank = "TTB001";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TTB553"
        ) {
          this.transfer_suspense[index].code_bank = "TTB002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "TBANK064"
        ) {
          this.transfer_suspense[index].code_bank = "TBANK002";
        } else if (
          this.transfer_suspense[index].payment_type_bank == "CHQ" ||
          this.transfer_suspense[index].payment_type_bank == "FACTORING" ||
          this.transfer_suspense[index].payment_type_bank == "QR CODE"
        ) {
          this.transfer_suspense[index].code_bank = "";
        } else {
          this.transfer_suspense[index].code_bank = "";
        }
      }
    },

    link_Bankcode_addGL(index){
      //console.log(index)
      if(this.transfer_suspense[index].type_debt == "Suspense" || this.transfer_suspense[index].type_debt == "Adjust JV"){
        
        if(this.transfer_suspense[index].code_bank != ""){
            //เช็คเพิ่ม index ที่ยังไม่มี
              let num = this.link_bankcode.length -1
              if(num >= index){
                for(let i = 0; i < this.list_add_gl.length; i++){
                  if(this.link_bankcode[index].order_gl == this.list_add_gl[i].order_gl){
                    this.list_add_gl[i].order_gl = "";
                    this.list_add_gl[i].add_gl = "";
                    this.list_add_gl[i].add_amount = "";
                    this.link_bankcode[index].order_gl = "";
                    break;
                  }
                }
              }else{
                this.link_bankcode.push({
                  index: index,
                  order_gl: "" 
                })
              }
              
          

            if(this.transfer_suspense[index].code_bank == "BAY001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "12"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A BAY 034-0-40099-3"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "12"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "BAY002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "38"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A BAY 034-1-395-77-8"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "38"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "BAY003"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "82"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A - BAY 001-0-18260-1"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "82"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "BAY004"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "88"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A - BAY 001-9-59097-3"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "88"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "BAY005"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "90"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A - BAY 777-0-91268-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "90"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "BBL001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "10"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A BBL 210-3-01220-5"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "10"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "BBL002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "36"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A BBL 210-0-25878-5"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "36"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "BBL003"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "78"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A-BBL 2103021156"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "78"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "BBL004"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "84"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A - BBL 2100747522"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "84"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "CIMB001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "22"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A-CIMB 80-001-9685-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "22"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "CIMB002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "66"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A-CIMB 70-040-5774-5"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "66"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "GSB001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "58"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A-GSB 000000806505"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "58"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "GSB002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "56"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A-GSB 020252844491"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "56"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KKP001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "32"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A KK 00031420000412"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "32"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KKP002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "60"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A KK 00032520001756"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "60"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KBANK001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "08"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A TFB 052-1-07219-9"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "08"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KBANK002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "52"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A TFB 052-1-07386-1"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "52"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KBANK003"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "34"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A TFB 052-2-41857-9"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "34"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KTB001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "28"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A KTB 015-6-05118-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "28"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KTB003"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "16"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 015-1-52139-5"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "16"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KTB004"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "30"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 015-0-22692-6"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "30"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KTB006"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "62"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 323-1-33669-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "62"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KTB007"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "14"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 013-6-09603-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "14"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KTB008"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "64"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 013-1-61085-6"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "64"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "KTB010"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "54"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A-KTB 221-6-02372-8"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "54"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "SCB001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "26"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A SCB 026-3-04300-9"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "26"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "SCB002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "48"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A SCB 026-2-89937-6"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "48"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "SCB003"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "80"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A - SCB 468-077375-0"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "80"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "SCB004"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "86"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A - SCB 434-026854-0"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "86"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "TBANK002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "24"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A Thanachart 115-2-35506-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "24"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "TMB001"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "68"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - C/A-TMB 053-1-07517-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "68"
                  break;
                }
              }
            }else if(this.transfer_suspense[index].code_bank == "TMB002"){
              for(let i = 0; i < this.list_add_gl.length; i++){
                if(this.list_add_gl[i].order_gl == ""){
                  this.list_add_gl[i].order_gl = "50"
                  this.list_add_gl[i].add_gl = "เงินขาด Suspense - S/A-TMB 053-2-50495-8"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "50"
                  break;
                }
              }
            }
        }
        else{
          let num = this.link_bankcode.length -1
              if(num >= index){
                for(let i = 0; i < this.list_add_gl.length; i++){
                  if(this.link_bankcode[index].order_gl == this.list_add_gl[i].order_gl){
                    this.list_add_gl[i].order_gl = "";
                    this.list_add_gl[i].add_gl = "";
                    this.list_add_gl[i].add_amount = "";
                    this.link_bankcode[index].order_gl = "";
                    break;
                  }
                }
              }
        }
        //console.log(this.link_bankcode)
      }
      else if (this.transfer_suspense[index].type_debt == "Offset") {
          for (let i = 0; i < this.list_add_gl.length; i++) {
              if (this.list_add_gl[i].order_gl == "") {
                  this.list_add_gl[i].order_gl = "96";
                  this.list_add_gl[i].add_gl = "AR-AP Inter Clearing";

                  let num = this.link_bankcode.length - 1;
                  if (num >= index) {
                      this.link_bankcode[index].order_gl = "96";
                  } else {
                      this.link_bankcode.push({
                          index: index,
                          order_gl: "96"
                      });
                  }
                  break;
              } else {
                this.list_add_gl[i].order_gl = "";
                this.list_add_gl[i].add_gl = "";
                this.list_add_gl[i].add_amount = "";

                // Reset link_bankcode
                let num = this.link_bankcode.length - 1;
                if (num >= index) {
                    this.link_bankcode[index].order_gl = "";
                }
            }
          }
          // console.log(this.transfer_suspense[index].type_debt == "Offset");
      }else{
        let num = this.link_bankcode.length -1
              if(num >= index){
                for(let i = 0; i < this.list_add_gl.length; i++){
                  if(this.link_bankcode[index].order_gl == this.list_add_gl[i].order_gl){
                    this.list_add_gl[i].order_gl = "";
                    this.list_add_gl[i].add_gl = "";
                    this.list_add_gl[i].add_amount = "";
                    this.link_bankcode[index].order_gl = "";
                    break;
                  }
                }
              }
      }
      
    },
    check_statement(status){
      if(status == 'tran_sus'){
        this.valid_bank_check = true;
        this.valid_check_chq = true;
      }
    },
    bank_check(item){
      if(item !== ''){
        this.valid_bank_check = true;
      }else{
        this.valid_bank_check = false;
      }
    },
    check_chq_no(item){
      if(item !== ''){
        this.valid_check_chq = true;
      }else{
        this.valid_check_chq = false;
      }
    },
    check_statement_no(item){
      if(item !== ''){
        this.valid_no = true;
      }else{
        this.valid_no = false;
      }
    },
    search_statement_no(item , index){
      let new_date = [];
      if(item != ""){
        this.axios
        .get("https://payment-be.inet.co.th:443/api/v1/statement/external/inquiry?statementRef="+item)
        .then((response) => {
              if (response.data.data) {
                //console.log(response.data.data)
                //new_date = response.data.data[0].effectiveDate;
                new_date = response.data.data[0].effectiveDate.split("T")
                this.transfer_suspense[index].incoming_paid_date = this.parseDateIn(new_date[0]);
                this.transfer_suspense[index].payment_type_bank = response.data.data[0].statementRef;
                this.transfer_suspense[index].amount = response.data.data[0].balance;

                this.valid_bank_check = true;
                this.valid_check_chq = true;
                this.valid_amount = true;
                this.check_bank_type(index);
                this.calAmount();
                this.link_Bankcode_addGL(index);
              }
            })
            .catch((error) => {
              if (error) {
                Swal.fire({
                  icon: "error",
                  title: "statement no ไม่ถูกต้อง",
                  showConfirmButton: false,
                  timer: 2000,
                });
                /*
                this.transfer_suspense[index].incoming_paid_date = "";
                this.transfer_suspense[index].payment_type_bank = "";
                this.transfer_suspense[index].amount = "";

                this.valid_bank_check = false;
                this.valid_check_chq = false;
                this.valid_amount = false;
                this.check_bank_type(index);
                this.calAmount();
                */
              }
            });
      }
    },
    check_statement_amount(item){
      if(item !== ''){
        this.valid_amount = true;
      }else{
        this.valid_amount = false;
      }
    },
    check_fee(){
      /*
      if(item !== ''){
        this.valid_fee = true;
      }else{
        this.valid_fee = false;
      }
      */
     for(let i = 0 ; i < this.transfer_suspense.length; i++){
      if(this.transfer_suspense[i].fee != ""){
        this.valid_fee = true;
        break
      }else{
        this.valid_fee = false;
      }
     }

    },
    checkInvoiceDate(){
      if(this.customer_detail != []){
        for(let i = 0; i <  this.customer_detail.length; i++){
          //console.log(this.customer_detail[i].invoice_date)
          if(this.parseDateIn(this.customer_detail[i].invoice_date) > this.rv_date){
            this.check_inv_date = false;
            this.msg = 'วันที่ตัดหนี้ต้องมากกว่า Invoice date (Invoice date วันที่ '+ this.parseDate(this.customer_detail[i].invoice_date)+")" ;
            break
          }
          else{
            this.check_inv_date = true;
            this.msg = '';
          }
        }
      }
      //console.log(this.check_inv_date)
    },
    linkDate(date , status){
      if(this.payment_type == "CHQ"){
        if(status == "rv_date"){
          for(let i = 0; i < this.transfer_suspense.length; i++){
            this.transfer_suspense[i].incoming_paid_date = date;
          }
        }else{
          this.rv_date = date
          for(let i = 0; i < this.transfer_suspense.length; i++){
            this.transfer_suspense[i].incoming_paid_date = date;
          }
        }
        this.checkInvoiceDate();
      }
    },
    // add invoice
    invoice(invoice_no,index){
      //let select_invoice = []
      this.data_customer.forEach((data) => {
        if(data.invoice_no == invoice_no){
          //select_invoice = this.new_invoice_list.filter(item => item !== invoice_no)
          for( let i = 0; i < this.customer_detail.length; i++){
            if(index == i){
              this.customer_detail[index].receipt_number = data.receipt_number;
              this.customer_detail[index].amount_after_vat = Number(
                data.amount_after_vat
              ).toFixed(2);
              this.customer_detail[index].aging = Number(data.aging).toFixed(2);
              this.customer_detail[index].cn_number = data.cn_number;
              this.customer_detail[index].invoice_date = data.invoice_date;
              this.customer_detail[index].incoming_receipt_date = data.incoming_receipt_date;
              this.customer_detail[index].incoming_paid_date = data.incoming_paid_date;
            }
          }
          //this.new_invoice_list = select_invoice  
        }
      });
      //this.select_invoice.push(invoice_no)
      
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
      

      this.checkInvoiceDate();
      this.checkReceipt();
      //this.checkLastDate();
      
    },
    checkLastDate(){
      
      if(this.customer_detail.length > 0){
        let lastElement = this.customer_detail.length - 1;
        if (this.parseDateIn(this.customer_detail[lastElement].incoming_paid_date) == "0001-01-01") {
            this.transfer_suspense[0].incoming_paid_date = moment(
              new Date().toJSON()
            ).format("YYYY-MM-DD");
          } else {
            this.transfer_suspense[0].incoming_paid_date = this.parseDateIn(this.customer_detail[lastElement].incoming_paid_date);
          }
      }
      
    },
    checkReceipt(){
      if(this.customer_detail.length != 0){
        for(let i = 0; i < this.customer_detail.length; i++ ){
          if(this.customer_detail[0].receipt_number != ""){
            if(this.customer_detail[i].receipt_number == ""){
              this.select_special_code = ""
              this.check_receipt = false;
              break;
            }else{
              this.select_special_code = "02"
              this.check_receipt = true;
            }
          }else{
            if(this.customer_detail[i].receipt_number != ""){
              this.select_special_code = ""
              this.check_receipt = false;
              break;
            }else{
              this.select_special_code = "03"
              this.check_receipt = true;
            }
          }
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
    // เพิ่มแถวกรอกข้อมูลตาราง invoice
    addRowInvoice(invoice_no) {
      this.select_invoice.push(invoice_no)
      
      /*
      let select_invoice = []
      this.new_invoice_list.forEach((data) => {
         if(data == invoice_no){
          select_invoice = this.new_invoice_list.filter(item => item !== invoice_no)
          this.new_invoice_list = select_invoice
          console.log(this.new_invoice_list)
         }
      });
      */
      var newItem = {
        invoice_no: "",
        receipt_number: "",
        amount_after_vat: "",
        aging: "",
        cn_number: "",
        incoming_receipt_date: "",
        checkbox_wht: false,
        checkbox_mail: false,
        invoice_date: "",
        temp_id: new Date().getTime(),
      };
      this.customer_detail.push(newItem);
    },
    // ลบแถวกรอกข้อมูลตาราง invoice
    deleteRowInvoice(invoice_no ,index) {
      let select_invoice_list = [] 
      var count_amount = 0;
      let sum = 0;
      let num = '';
      this.select_invoice.forEach((data) =>{
        if(data == invoice_no){
          select_invoice_list = this.select_invoice.filter(item => item !== invoice_no)
          this.select_invoice = select_invoice_list
          //console.log(this.select_invoice)
        }
      });
      this.customer_detail.splice(index, 1);
      this.customer_detail.forEach((element) => {
        if (element.amount_after_vat != "") {
          count_amount += Number(element.amount_after_vat);
        }
      });
      let wht_data = [];
      this.data_wht.forEach((element) =>{
        if(element.invoice_no.invoice_no != invoice_no){
          wht_data.push(element)
        }
      })
      this.data_wht = [];
      this.data_wht = wht_data;

      this.data_wht.forEach((element) => {
        if(element.invoice_no.checkbox_wht == true){
          num = this.toNumber(element.invoice_no.aging)
        }
        sum += parseFloat(num);
      });
      this.tax_base = (sum / 1.07).toFixed(3);
      this.sum_amount_after_vat = count_amount.toFixed(2);
      this.checkReceipt();
      //this.checkLastDate();
    },
    // เพิ่มแถวกรอกข้อมูลตาราง Statement Transfer/Suspense
    addRowStatement(index , status) {
      if(status == 'chq'){
        this.valid_bank_check = false;
        this.valid_check_chq = false;
      }else{
        this.valid_bank_check = true;
        this.valid_check_chq = true;
      }
      this.valid_amount = false;
      this.valid_no = false;
      if (this.transfer_suspense[index].payment_type_bank == "BBL205") {
        this.transfer_suspense[index].code_bank = "BBL001";
      } else if (this.transfer_suspense[index].payment_type_bank == "BBL785") {
        this.transfer_suspense[index].code_bank = "BBL002";
      } else if (this.transfer_suspense[index].payment_type_bank == "BBL156") {
        this.transfer_suspense[index].code_bank = "BBL003";
      } else if (this.transfer_suspense[index].payment_type_bank == "BBL522") {
        this.transfer_suspense[index].code_bank = "BBL004";
      } else if (this.transfer_suspense[index].payment_type_bank == "BAY993") {
        this.transfer_suspense[index].code_bank = "BAY001";
      } else if (this.transfer_suspense[index].payment_type_bank == "BAY778") {
        this.transfer_suspense[index].code_bank = "BAY002";
      } else if (this.transfer_suspense[index].payment_type_bank == "BAY601") {
        this.transfer_suspense[index].code_bank = "BAY003";
      } else if (this.transfer_suspense[index].payment_type_bank == "BAY973") {
        this.transfer_suspense[index].code_bank = "BAY004";
      } else if (this.transfer_suspense[index].payment_type_bank == "BAY684") {
        this.transfer_suspense[index].code_bank = "BAY005";
      } else if (this.transfer_suspense[index].payment_type_bank == "CIMB854") {
        this.transfer_suspense[index].code_bank = "CIMB001";
      } else if (this.transfer_suspense[index].payment_type_bank == "CIMB745") {
        this.transfer_suspense[index].code_bank = "CIMB002";
      } else if (
        this.transfer_suspense[index].payment_type_bank == "Bill Payment - SCB"
      ) {
        this.transfer_suspense[index].code_bank = "SCB001";
      } else if (
        this.transfer_suspense[index].payment_type_bank ==
        "Bill Payment - KBANK"
      ) {
        this.transfer_suspense[index].code_bank = "KBANK002";
      } else if (
        this.transfer_suspense[index].payment_type_bank == "Bill Payment - BBL"
      ) {
        this.transfer_suspense[index].code_bank = "BBL001";
      } else if (this.transfer_suspense[index].payment_type_bank == "GSB505") {
        this.transfer_suspense[index].code_bank = "GSB001";
      } else if (this.transfer_suspense[index].payment_type_bank == "GSB491") {
        this.transfer_suspense[index].code_bank = "GSB002";
      } else if (this.transfer_suspense[index].payment_type_bank == "KKP412") {
        this.transfer_suspense[index].code_bank = "KKP001";
      } else if (this.transfer_suspense[index].payment_type_bank == "KKP756") {
        this.transfer_suspense[index].code_bank = "KKP002";
      } else if (
        this.transfer_suspense[index].payment_type_bank == "KBANK579"
      ) {
        this.transfer_suspense[index].code_bank = "KBANK003";
      } else if (
        this.transfer_suspense[index].payment_type_bank == "KBANK861"
      ) {
        this.transfer_suspense[index].code_bank = "KBANK002";
      } else if (
        this.transfer_suspense[index].payment_type_bank == "KBANK035"
      ) {
        this.transfer_suspense[index].code_bank = "KBANK005";
      } else if (
        this.transfer_suspense[index].payment_type_bank == "KBANK199"
      ) {
        this.transfer_suspense[index].code_bank = "KBANK001";
      } else if (this.transfer_suspense[index].payment_type_bank == "KTB395") {
        this.transfer_suspense[index].code_bank = "KTB003";
      } else if (this.transfer_suspense[index].payment_type_bank == "KTB184") {
        this.transfer_suspense[index].code_bank = "KTB001";
      } else if (this.transfer_suspense[index].payment_type_bank == "KTB926") {
        this.transfer_suspense[index].code_bank = "KTB004";
      } else if (this.transfer_suspense[index].payment_type_bank == "KTB569") {
        this.transfer_suspense[index].code_bank = "KTB005";
      } else if (this.transfer_suspense[index].payment_type_bank == "KTB694") {
        this.transfer_suspense[index].code_bank = "KTB006";
      } else if (this.transfer_suspense[index].payment_type_bank == "KTB034") {
        this.transfer_suspense[index].code_bank = "KTB007";
      } else if (this.transfer_suspense[index].payment_type_bank == "KTB728") {
        this.transfer_suspense[index].code_bank = "KTB010";
      } else if (this.transfer_suspense[index].payment_type_bank == "KTB856") {
        this.transfer_suspense[index].code_bank = "KTB008";
      } else if (this.transfer_suspense[index].payment_type_bank == "SCB376") {
        this.transfer_suspense[index].code_bank = "SCB002";
      } else if (this.transfer_suspense[index].payment_type_bank == "SCB009") {
        this.transfer_suspense[index].code_bank = "SCB001";
      } else if (this.transfer_suspense[index].payment_type_bank == "SCB750") {
        this.transfer_suspense[index].code_bank = "SCB003";
      } else if (this.transfer_suspense[index].payment_type_bank == "SCB540") {
        this.transfer_suspense[index].code_bank = "SCB004";
      } else if (this.transfer_suspense[index].payment_type_bank == "TMB958") {
        this.transfer_suspense[index].code_bank = "TMB002";
      } else if (this.transfer_suspense[index].payment_type_bank == "TTB174") {
        this.transfer_suspense[index].code_bank = "TMB001";
      } else if (this.transfer_suspense[index].payment_type_bank == "TTB958") {
        this.transfer_suspense[index].code_bank = "TMB002";
      } else if (this.transfer_suspense[index].payment_type_bank == "TTB907") {
        this.transfer_suspense[index].code_bank = "TTB001";
      } else if (this.transfer_suspense[index].payment_type_bank == "TTB553") {
        this.transfer_suspense[index].code_bank = "TTB002";
      } else if (
        this.transfer_suspense[index].payment_type_bank == "TBANK064"
      ) {
        this.transfer_suspense[index].code_bank = "TBANK002";
      } else if (
        this.transfer_suspense[index].payment_type_bank == "CHQ" ||
        this.transfer_suspense[index].payment_type_bank == "FACTORING" ||
        this.transfer_suspense[index].payment_type_bank == "QR CODE"
      ) {
        this.transfer_suspense[index].code_bank = "";
      } else {
        this.transfer_suspense[index].code_bank = "";
      }
      //console.log(this.transfer_suspense);
      this.transfer_suspense.push({
        type_debt: this.transfer_suspense[0].type_debt,
        incoming_paid_date: this.transfer_suspense[0].incoming_paid_date,
        payment_type_bank: this.transfer_suspense[0].payment_type_bank,
        code_bank: this.transfer_suspense[index].code_bank,
        statement_no: "",
        amount: "",
        sequence: "",
        sum_amounts: "",
        check_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
        bank_check_list: "",
        chq_no: "",
        fee: "",
      });
      
      var count = 0;
      /*
      this.transfer_suspense.forEach((element) => {
        if (element.amount == "") {
          if(element.type_debt != "Suspense"){
            element.amount = 0;
            count += parseFloat(element.amount);
          }
        } else {
          if(element.type_debt != "Suspense"){
            count += parseFloat(element.amount);
          }
        }
      });
      */
     this.transfer_suspense.forEach((element) => {
        if (element.amount != "") {
          if(element.type_debt != "Suspense"){
            //element.amount = 0;
            count += parseFloat(this.toNumber(element.amount));
          }
        }
      });
      let lenarr = this.transfer_suspense.length - 1;
      this.transfer_suspense[lenarr].sum_amounts = count;
      this.sum_amounts = count;
    },
    // ลบแถวกรอกข้อมูลตาราง Statement Transfer/Suspense
    deleteRowStatement(index) {
      this.transfer_suspense.splice(index, 1);
      let count = 0;
      this.transfer_suspense.forEach((element) => {
        if(element.type_debt != "Suspense"){
          if (element.amount) {
            count += parseFloat(this.toNumber(element.amount));
          }
        }
      });
      let legarr = this.transfer_suspense.length - 1;
      this.transfer_suspense[legarr].sum_amounts = count;
      this.sum_amounts = count;
      this.calFee();
      this.check_fee();
    },
    confirmRequest(key) {
      //Mail ยืนยันใบแจ้งหนี้
      if (key == "mail") {
        if(this.data_mail.length > 0){
          this.check_req_mail = true;
          this.status_mail_invoice = true;
          this.check_mail_invoice = true;
          Swal.fire({
              icon: "success",
              title: "ส่งข้อมูล Request Mail ยืนยันใบแจ้งหนี้ สำเร็จ",
              showConfirmButton: false,
              timer: 2000,
            });
        }else{
          Swal.fire({
              icon: "error",
              title: "ส่งข้อมูล Request Mail ยืนยันใบแจ้งหนี้ ไม่สำเร็จ",
              text: "กรุณาเลือก email อย่างน้อย 1 invoice",
              showConfirmButton: false,
              timer: 4000,
            });
        }
        
      }
      //Mail ติดตาม WHT
      if (key == "mail_wht") {
        if(this.data_wht.length > 0){
          this.check_req_mail_WHT = true;
          this.status_mail_wht = true;
          this.check_mail_wht = true;
          Swal.fire({
              icon: "success",
              title: "ส่งข้อมูล Request Mail ติดตาม WHT สำเร็จ",
              showConfirmButton: false,
              timer: 2000,
            });
        }else{
          Swal.fire({
              icon: "error",
              title: "ส่งข้อมูล Request Mail ติดตาม WHT ไม่สำเร็จ",
              text: "กรุณาเลือก wht อย่างน้อย 1 invoice",
              showConfirmButton: false,
              timer: 4000,
            });
        }
        
      }
      //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
      if (key == "mail_and_wht") {
        this.status_mail_total = true;
        // if(this.customer_email == ""){
        //   this.status_mail_total = false
        //     Swal.fire({
        //       icon: "error",
        //       title: "<h4>ไม่สามารถส่ง Request Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT ได้</h4>",
        //       html: "เนื่องจากไม่มี E-mail ลูกค้า",
        //       showConfirmButton: false,
        //       timer: 3000,
        //     });
        // }else{
        //   this.status_mail_total = true
        //     Swal.fire({
        //       icon: "success",
        //       title: "Success",
        //       text: "ส่ง Request Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT เรียบร้อยแล้ว",
        //       showConfirmButton: false,
        //       timer: 3000,
        //     });
        // }
      }
      // this.data_detail_mail_wht = [];
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    parseDateIn(date) {
      return date ? moment(date).format("YYYY-MM-DD") : "";
    },
    async save(type) {
      this.finish = true;
      //var fee = 0;
      var fee = [];
      var amounts = [];
      var confirm_dates = [];
      var bank_code = [];
      var tax = "";
            if (this.data_file.length > 0) {
              this.status_file = true;
            } else {
              this.status_file = false;
            }
            if (this.data_file_wht.length > 0) {
              this.status_file_wht = true;
            } else {
              this.status_file_wht = false;
            }
            this.customer_detail.forEach((element) => {
              // console.log(element)
              this.data_invoice.push({
                invoice_no: element.invoice_no,
                receipt_number: element.receipt_number,
                amount_after_vat: Number(element.amount_after_vat),
                cn_number: element.cn_number,
                receipt_date: new Date(element.incoming_receipt_date).toJSON(),
                aging: Number(element.aging.replace(/,/g , '')),
                checkbox_wht: element.checkbox_wht,
                checkbox_mail: element.checkbox_mail,
                invoice_date: new Date(element.invoice_date).toJSON()
              });

            });

            this.list_add_gl.forEach((element) => {
              if (element.order_gl != "") {
                this.data_add_gl.push({
                  order_gl: element.order_gl,
                  add_gl: element.add_gl,
                  add_amount: Number(this.toNumber(element.add_amount)),
                });
                /*
                if(element.order_gl == '01'){
                  fee.push(element.add_amount.replace(/,/g , ''));
                }
                */
              }
              
            });
            // จัดการข้อมูลส่งไป update ตามประเภทที่เลือก
            if (this.payment_type == "CHQ") {
              this.transfer_suspense.forEach((element, index) => {
                // this.data_statement = []
                this.data_statement.push({
                  type_debt: element.type_debt,
                  check_date: new Date(element.check_date).toJSON(),
                  confirm_date: new Date(element.incoming_paid_date).toJSON(),
                  bank_check_list: element.bank_check_list,
                  chq_no: element.chq_no,
                  payment_type_bank: element.payment_type_bank,
                  code_bank: element.code_bank,
                  fee: this.toNumber(element.fee),
                  statement_no: element.statement_no,
                  amount : this.toNumber(element.amount),
                  sequence: index + 1,
                });
                confirm_dates.push(this.parseDate(element.incoming_paid_date));
                if(element.amount != ''){
                  amounts.push(this.toNumber(element.amount));
                }else{
                  amounts.push(0);
                }
                bank_code.push(element.code_bank);
                fee.push(this.toNumber(element.fee));
              });
            } else {
              this.transfer_suspense.forEach((element, index) => {
                // this.data_statement = []
                this.data_statement.push({
                  type_debt: element.type_debt,
                  confirm_date: new Date(element.incoming_paid_date).toJSON(),
                  payment_type_bank: element.payment_type_bank,
                  code_bank: element.code_bank,
                  statement_no: element.statement_no,
                  fee: this.toNumber(element.fee),
                  amount : this.toNumber(element.amount),
                  sequence: index + 1,
                });
                confirm_dates.push(this.parseDate(element.incoming_paid_date));
                if(element.amount != ''){
                  amounts.push(this.toNumber(element.amount));
                }else{
                  amounts.push(0);
                }
                bank_code.push(element.code_bank);
                fee.push(this.toNumber(element.fee));
              });
            }
            // end

            if(fee == ""){
              for(let i = 0; i < this.transfer_suspense.length; i++){
                fee.push(0);
              }
            }

            // request mail ติดตาม wht && ยืนยันใบแจ้งหนี้
            if(this.status_mail_invoice == true){
              this.data_mail.forEach((element) => {
                //console.log(element.data_mail)
                this.data_detail_mail_wht.push({
                  inv_no: element.data_mail.invoice_no, //เลขที่ Invoice
                  receipt_no: element.data_mail.receipt_number, //เลขที่ใบเสร็จ
                  receipt_date: new Date(
                    element.data_mail.incoming_receipt_date
                  ).toJSON(), //วันที่ใบเสร็จ
                  amount: amounts.join(","), //ยอดเงิน
                  cus_no: this.customer_no, //รหัสลูกค้า
                  cus_name: this.customer_name, //ชื่อลูกค้า
                  mail_cus: this.customer_email, //อีเมลลูกค้า
                  finance_ar: this.finance_name, //ชื่อกำรเงิน
                  sale_email: this.sale_email, //อีเมลเซล
                  amount_vat: String(element.data_mail.amount_after_vat), //จำนวนเงินรวม Vat
                  //fee: String(fee),
                  fee: fee.join(","),
                  bankcode: bank_code.join(","),
                  confirm_date: confirm_dates.join(","),
                  remark_mail: this.remark_mail,
                  aging: element.data_mail.aging
                });
              });
            }else if(this.status_mail_wht == true){
              this.data_wht.forEach((element) => {
                // console.log(element.data_mail)
                this.data_detail_mail_wht.push({
                  inv_no: element.invoice_no.invoice_no, //เลขที่ Invoice
                  receipt_no: element.invoice_no.receipt_number, //เลขที่ใบเสร็จ
                  receipt_date: new Date(
                    element.invoice_no.incoming_receipt_date
                  ).toJSON(), //วันที่ใบเสร็จ
                  amount: amounts.join(","), //ยอดเงิน
                  cus_no: this.customer_no, //รหัสลูกค้า
                  cus_name: this.customer_name, //ชื่อลูกค้า
                  mail_cus: this.customer_email, //อีเมลลูกค้า
                  finance_ar: this.finance_name, //ชื่อกำรเงิน
                  sale_email: this.sale_email, //อีเมลเซล
                  code: this.select_special_code,
                  amount_vat: String(element.invoice_no.amount_after_vat), //จำนวนเงินรวม Vat
                  //fee: String(fee),
                  fee: fee.join(","),
                  bankcode: bank_code.join(","),
                  confirm_date: confirm_dates.join(","),
                  remark_mail: this.remark_mail,
                  aging: element.invoice_no.aging
                });
              });
            }

            if(this.tax_base != 0){
              tax = Number(this.tax_base).toFixed(2);
            }else{
              tax = 0;
            }
            
            //console.log(this.data_detail_mail_wht);
            // end request mail ติดตาม wht && ยืนยันใบแจ้งหนี้
            await this.getbase64Files();
            await this.getbase64FilesWHT();
            
            let headers = {
              headers: {
                Authorization:
                  "Bearer " +
                  localStorage.getItem("acces_token") +
                  "," +
                  localStorage.getItem("secret"),
              },
            };
            
            var Datas = {
              request_mail: this.data_detail_mail_wht,
              statement: this.data_statement, //ข้อมูลในตาราง statement
              sum_amounts: Number(this.sum_amounts), //รวมยอดชำระ
              invoice_no: this.data_invoice, //ข้อมูลในตาราง invoice
              rv_date: new Date(this.rv_date).toJSON(), //วันที่ตัดหนี้
              sum_wht: Number(this.sum_wht),
              sum_balance: Number(
                Number(this.sum_amounts) +
                  Number(this.sum_wht) +
                  Number(this.sum_add_amount) -
                  Number(this.new_sum_aging)
              ),
              sum_add_amount: Number(this.sum_add_amount),
              add_gl: this.data_add_gl,
              sum_aging: Number(this.sum_aging),
              sum_amount_after_vat: Number(this.sum_amount_after_vat),
              type_wht: this.WHT_list,
              file: this.data_file,
              file_wht: this.data_file_wht,
              remark: this.remark,
              remark_erp: this.remark_erp,
              customer_no: this.customer_no,
              customer_name: this.customer_name,
              customer_email: this.customer_email,
              finance_name: this.finance_name,
              sale_email: this.sale_email,
              type: this.payment_type,
              tax_base: Number(tax),
              tax_code: this.tax_code,
              special_code: this.select_special_code,
              evidence_reporting: this.evidence_reporting,
              status_file: this.status_file, //ค่า true false เวลามีการเลือกไฟล์หลักฐาน
              status_file_wht: this.status_file_wht, //ค่า true false เวลามีการเลือกไฟล์ wht
              status: type,
              check_mail: this.check_mail,
              check_wht: this.check_wht,
              check_mail_invoice: this.check_mail_invoice,
              check_mail_wht: this.check_mail_wht,
              status_mail_invoice: this.status_mail_invoice, //Mail ยืนยันใบแจ้งหนี้
              status_mail_wht: this.status_mail_wht, //Mail ติดตาม WHT
              status_mail_total: this.status_mail_total, //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
            };
            //  console.log(Datas);
            
            this.axios
              .post(process.env.VUE_APP_API + "/statement", Datas, headers)
              .then((response) => {
                if(response.status == 200){
                  this.finish = false;
                  Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลเรียบร้อยแล้ว",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                }
              })
              .catch((error) => {
                this.finish = false;
                if(error){
                  Swal.fire({
                    icon: "error",
                    title: "ไม่สามารถบันทึกข้อมูลได้",
                    text: "เนื่องจาก"+" "+error.response.data.msg,
                    showConfirmButton: false,
                    timer: 4000,
                  });
                }
              });
            
            this.matching_dialog = false;
            this.$refs.form.reset();
            //this.$refs.formfile.reset();
            this.check_invoice = true;
            this.remark_mail = '',
            this.check_req_mail = false;
            this.check_req_mail_WHT = false;
            this.valid = false;
            this.valid_no = false;
            this.check_code = false,
            this.valid_check_chq = true;
            this.valid_bank_check = true;
            this.valid_amount = false;
            this.valid_fee = false;
            this.select_invoice = [];
            this.customer_detail = [];
            this.data_file_wht = [];
            this.data_file = [];
            this.data_wht = [];
            this.set_file = [];
            this.set_file_wht = [];
            this.data_invoice = [];
            this.files = [];
            this.files_wht = [];
            this.data_detail_mail_wht = [];
            this.invoice_list = [];
            this.data_customer = [];
            this.data_mail = [];
            this.datacheckwht = [];
            this.link_bankcode = [];
            (this.transfer_suspense = [
              {
                type_debt: "",
                incoming_paid_date: "",
                payment_type_bank: "",
                code_bank: "",
                statement_no: "",
                amount: "",
                sequence: "",
                sum_amounts: 0,
                check_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
                bank_check_list: "",
                chq_no: "",
                fee: "",
              },
            ]),
              (this.list_add_gl = [
                {
                  order_gl: "",
                  add_gl: "",
                  add_amount: "",
                },
                {
                  order_gl: "",
                  add_gl: "",
                  add_amount: "",
                },
                {
                  order_gl: "",
                  add_gl: "",
                  add_amount: "",
                },
                {
                  order_gl: "",
                  add_gl: "",
                  add_amount: "",
                },
                {
                  order_gl: "",
                  add_gl: "",
                  add_amount: "",
                },
              ]);
            this.WHT_list = "";
            this.select_special_code = "";
            this.evidence_reporting = "";
            this.tax_code = "";
            this.rv_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
            this.sum_amounts = "";
            this.statement_no = "";
            this.tax_base = "";
            this.sum_wht = "";
            this.remark = "";
            this.remark_erp = "";
            this.sum_add_amount = ""; //total add amount
            this.bank_check_list = "";
            this.customer_no = "";
            this.customer_name = "";
            this.customer_email = "";
            this.finance_name = "";
            this.sale_email = "";
            this.checkall_mail = false;
            this.checkall_wht = false;
            this.check_wht = false;
            this.check_inv_date =true;
            this.check_mail = false;
            (this.check_mail_invoice = false),
            (this.check_mail_wht = false),
            (this.status_mail_invoice = false), //Mail ยืนยันใบแจ้งหนี้
              (this.status_mail_wht = false), //Mail ติดตาม WHT
              (this.status_mail_total = false), //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
              (this.data_statement = []);
            this.data_add_gl = [];
            eventBus.$emit("closeMatchingDialog");
    },
    closeMatching() {
      this.$refs.form.reset();
      //this.$refs.formfile.reset();
      this.matching_dialog = false;
      this.remark_mail = '',
      this.check_invoice = true;
      this.check_req_mail = false;
      this.check_req_mail_WHT = false;
      this.valid = false;
      this.valid_no = false;
      this.valid_check_chq = true;
      this.valid_bank_check = true;
      this.check_code = false,
      this.valid_amount = false;
      this.valid_fee = false;
      this.select_invoice = [];
      this.select_invoice = [];
      this.customer_detail = [];
      this.data_file_wht = [];
      this.data_file = [];
      this.data_wht = [];
      this.set_file = [];
      this.set_file_wht = [];
      this.data_invoice = [];
      this.files = [];
      this.files_wht = [];
      this.data_detail_mail_wht = [];
      this.invoice_list = [];
      this.data_customer = [];
      this.data_mail = [];
      this.datacheckwht = [];
      this.link_bankcode = [];
      (this.transfer_suspense = [
        {
          type_debt: "",
          incoming_paid_date: "",
          payment_type_bank: "",
          code_bank: "",
          statement_no: "",
          amount: "",
          sequence: "",
          sum_amounts: 0,
          check_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
          bank_check_list: "",
          chq_no: "",
          fee: "",
        },
      ]),
        (this.list_add_gl = [
          {
            order_gl: "",
            add_gl: "",
            add_amount: "",
          },
          {
            order_gl: "",
            add_gl: "",
            add_amount: "",
          },
          {
            order_gl: "",
            add_gl: "",
            add_amount: "",
          },
          {
            order_gl: "",
            add_gl: "",
            add_amount: "",
          },
          {
            order_gl: "",
            add_gl: "",
            add_amount: "",
          },
        ]);
      this.WHT_list = "";
      this.select_special_code = "";
      this.evidence_reporting = "";
      this.tax_code = "";
      this.rv_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.sum_amounts = "";
      this.statement_no = "";
      this.tax_base = "";
      this.sum_wht = "";
      this.remark = "";
      this.remark_erp = "";
      this.sum_add_amount = ""; //total add amount
      this.bank_check_list = "";
      this.customer_no = "";
      this.customer_name = "";
      this.customer_email = "";
      this.finance_name = "";
      this.sale_email = "";
      this.checkall_mail = false;
      this.checkall_wht = false;
      this.check_wht = false;
      this.check_inv_date =true;
      this.check_mail = false;
      (this.check_mail_invoice = false),
      (this.check_mail_wht = false),
      (this.status_mail_invoice = false), //Mail ยืนยันใบแจ้งหนี้
        (this.status_mail_wht = false), //Mail ติดตาม WHT
        (this.status_mail_total = false), //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
        (this.data_statement = []);
      this.data_add_gl = [];
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
.subheader-wht {
  font-size: 16px;
  background-color: rgb(105, 180, 245);
  text-align: center;
  color: white;
}
.text-field-rvdate {
  min-height: 10px;
  height: 30px;
}
.error-boarder {
  border-color: red;
}
.invoice-header {
  border: 1px solid white;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 5px;
  margin-bottom: -15px;
  background-color: rgb(103, 194, 93);
  font-size: 16px !important;
  color: white;
}
.invoice-header-data {
  border: 1px solid white;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.table-invoice-input {
  width: 100%;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 5px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  //padding-left: 10px;
}
.table-invoice-input-2 {
  width: 100%;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 5px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  //padding-right: 10px;
}
.table-invoice-input-error {
  width: 100%;
  border: 1px solid rgb(255, 82, 82);
  border-radius: 5px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  //padding-left: 10px;
}
.invoice-table-checkbox {
  height: 30px;
}
.v-label theme--light {
  color: #ffffff !important;
}
.align-right-input input {
  text-align: right;
}
.align-center-input input {
  text-align: center;
}
.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0px !important;
}
#checkboxLabel {
  color: white;
  font-size: 16px;
  margin-left: -2px;
}
/* select and file */
form.v-form.form_select_wht {
  width: auto;
  //align-content: left;
  //margin-left: -3px;
}
form.v-form.form_file_wht {
  width: 100pc !important;
}
/* end */
.container.table_detail {
  padding: 0px;
}
td.coltitle {
  min-width: 9pc;
}
td.colinputdata {
  min-width: 20pc;
}
td.coltitle-sum {
  min-width: 9pc;
  vertical-align: middle;
}
td.colinputdata-sum {
  min-width: 20pc;
  vertical-align: middle;
}
td.coltitle_chq {
  min-width: 9pc;
}
td.colinputdata_chq {
  min-width: 20pc;
}
td.coltitle_chq_sum {
  min-width: 9pc;
  vertical-align: middle;
}
td.colinputdata_chq_sum {
  min-width: 20pc;
  padding-left: 10px;
  vertical-align: middle;
}
td.add_delete {
  padding: 5px !important;
  width: 5%;
}
td.sequence-trc {
  border: 1px solid #ddd;
  width: 2%;
}
.v-text-field--outlined.v-input--dense .v-label {
  top: 10px;
  font-size: 14px;
}
tr.sum-amount {
  background-color: #ffc000 !important;
  margin-top: 10px;
}
input.form-control-statement {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  width: 105% !important;
  border-radius: 1px;
  font-size: 14px;
}
input.form-control-statement-2 {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  width: 100% !important;
  border-radius: 1px;
  font-size: 14px;
}

tr:nth-child(even) {
  background-color: #d6eeee;
}
#matching {
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
    justify-content: center !important;
  }
}
div#payment {
  width: 104% !important;
}

#payment {
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
    padding-bottom: 5px;
    font-size: 14px !important;
  }
}
#invoice-list {
  /*
  .v-text-field.v-text-field--solo{
    align-items: center;
    display: flex;
    max-height: 80px !important;
    height: 100% !important;
    //border: 1px solid #cecece !important;
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
    margin-top: -1px;
    font-size: 13px !important;
  }*/
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
#special-code-list {
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
    font-size: 14px !important;
  }
}
#addgl {
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
    justify-content: center !important;
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
    padding-bottom: 5px;
    font-size: 14px !important;
  }
}

#tablestatement {
  .v-data-table__wrapper {
    /* overflow-x: auto !important; */
    overflow-y: hidden !important;
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
</style>
