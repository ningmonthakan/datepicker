<template>
  <div class="text-center">
    <v-dialog
      width="110%"
      scrollable
      :value="matching_dialog"
      persistent
      style="z-index:1000"
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
        <v-card-title class="text-h5" style="background-color: #035891">
          <span
            class="text-h6"
            style="
                color: white;
                font-family: 'Bai_Jamjuree' !important;
            "
            >Matching : {{data_matching.document_no}}</span
          >
          <v-spacer></v-spacer>
          <v-btn icon dark @click="(modal_close_dialog = true)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" sm="6" md="6" style="font-size: 16px">
                <span class="font-weight-bold">ประเภทการชำระ: </span
                >{{ data_matching.type }}<br /><br />
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
                    class="mt-2"
                    style="width: 25%; font-size: 14px; color:black; font-family:'Bai_Jamjuree'"
                  >
                    หลักฐาน :
                  </div>

                  <v-btn
                    v-if="files == '' && data_file == ''"
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
                    {{files.length + data_file.length}} ไฟล์
                    <v-icon right dark> mdi-file-download-outline </v-icon>
                  </v-btn>
                </div>
                <div 
                  class="d-flex" 
                  id="matching" 
                  style="width:auto;"
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
                    v-if="files_wht == '' && data_file_wht == ''"
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
                    {{files_wht.length + data_file_wht.length}} ไฟล์
                    <v-icon right dark> mdi-file-download-outline </v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="3" sm="3" md="3">
                <v-list
                  dense
                  style="text-align: center; background-color: #EBF1E9;"
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
                  <!--------------- Mail ยืนยันใบแจ้งหนี้ ---------------->
                  <v-list-item
                    v-if="customer_email == '' && check_code != true"
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
                    v-if="check_code == true"
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
                    <th class="invoice-header" style="width: 80px">
                      <v-checkbox
                        id="mail-wht"
                        class="shrink ma-0"
                        :disabled="customer_email == ''"
                        v-model="checkall_mail"
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
                        v-model="checkall_wht"
                        dense
                        dark
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
                    <th class="invoice-header pa-2" style="width: 12%;">Amount</th>
                    <th class="invoice-header pa-2">ยอดที่ต้องการตัดหนี้</th>
                    <th class="invoice-header pa-2"></th>
                  </tr>
                  <tr
                    v-for="(item, index) in data_matching.invoice_no"
                    :key="'inv' + index"
                  >
                    <!-- checkbox email -->
                    <td class="invoice-header-data">
                      <v-checkbox
                        class="ml-2"
                        :disabled="customer_email == ''"
                        v-model="item.checkbox_mail"
                        @change="checkMail(item,item.checkbox_mail)"
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

                    <td v-if="item.temp_id" style="width: 17%;">
                      <div id="invoice-list">
                          <v-autocomplete
                            class="align-center-input ml-1 mr-1"
                            dense
                            v-model="item.invoice_no"
                            type="text"
                            style="font-size:14px"
                            @change="invoice(item.invoice_no,index)"
                            :items="new_invoice_list"
                            :rules="[(v) => !!v || 'กรุณาเลือก Invoice No.', 
                                    (v) => (check_invoice == true) || 'กรุณาเลือก Invoice No. ใหม่']"
                            :error="item.invoice_no == '' "
                            item-text="inv"
                            item-value="inv"
                            required
                            hide-selected
                          ></v-autocomplete>
                      </div>
                    </td>
                    <td v-else class="invoice-header-data" style="width: 17%; text-align: center;">
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
                          style="text-align: center; height: 48px; border-radius: 0px;"
                          type="text"
                          class="table-invoice-input-error"
                          v-model="item.receipt_number"
                        />
                      </div>
                      <div v-else>
                        <input
                          @change="checkReceipt()"
                          style="text-align: center; height: 48px; border-radius: 0px;"
                          type="text"
                          class="table-invoice-input"
                          v-model="item.receipt_number"
                        />
                      </div>
                    </td>
                    <td v-else class="invoice-header-data">
                      <div v-if="check_receipt == false">
                        <input
                          @change="checkReceipt()"
                          style="text-align: center; height: 48px; border-radius: 0px;"
                          type="text"
                          class="table-invoice-input-error"
                          v-model="item.receipt_number"
                        />
                      </div>
                      <div v-else>
                        <input
                          @change="checkReceipt()"
                          style="text-align: center; height: 48px; border-radius: 0px;"
                          type="text"
                          class="table-invoice-input"
                          v-model="item.receipt_number"
                        />
                      </div>
                    </td>
                    <td v-if="item.temp_id" style="width: 12%;">
                      <input
                        type="text"
                        class="table-invoice-input"
                        style="text-align: right;  height: 48px; padding-right: 10px; border-radius: 0px;"
                        v-model="item.amount_after_vat"
                        :onkeypress="
                          onchangeAddAmount(item.amount_after_vat, 'Amount')
                        "
                      />
                    </td>
                    <td v-else class="invoice-header-data" style="width: 12%;">
                      <div style="text-align: right;">{{ convertNumber(item.amount_after_vat) }}</div>
                    </td>
                    <td v-if="item.temp_id" class="invoice-header-data" style="width:155px">
                      <input
                        style="text-align: right;  height: 48px; padding-right: 10px; border-radius: 0px;"
                        type="text"
                        class="table-invoice-input-2"
                        v-model="item.aging"
                        :onkeypress="onchangeAddAmount(item.aging, 'Aging')"
                      />
                    </td>
                    <td style="width:155px" v-else class="invoice-header-data">
                      <input
                        style="text-align: right;  height: 48px; padding-right: 10px; border-radius: 0px;"
                        type="text"
                        v-model="item.aging"
                        :onkeypress="onchangeAddAmount(item.aging, 'Aging')"
                        class="table-invoice-input-2"
                      />
                    </td>
                    <td style="width:auto;">
                      <v-btn
                        v-if="data_matching.invoice_no.length > 1"
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
                        @click="addRowInvoice(item.invoice_no ,index)"
                        v-if="index == data_matching.invoice_no.length - 1"
                        :hidden="check_invoice == false"
                      >
                        <v-icon dark> mdi-plus </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr style="background-color:#B3E5FC">
                    <td></td>
                    <td></td>
                    <td class="pl-2" style="text-align: center;"><strong>Total</strong></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: right;">
                      <strong>{{ convertNumber(sum_amount) }}</strong>
                    </td>
                    <td style="text-align: right;">
                      <strong>{{ convertNumber(sum_aging) }}</strong>
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
                  <!----------------- Table Detail Transfer/Suspense/CHQ----------------->
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
                    hide-default-footer
                    class="mb-6"
                    style="width: 100%;"
                  >
                    <template v-slot:body="{}">
                      <tbody>
                        <tr
                          v-for="(header, index) in headers_detail_table"
                          :key="index"
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
                                :error="evidence_reporting == '' && data_matching.type != 'CHQ'"
                              >
                              </v-autocomplete>
                            </div>
                            <!-- {{ items[header.value] }} -->
                            <div
                              v-if="header.value == 'special_code'"
                              class="mt-n1 mb-n1"
                              id="special-code-list"
                            >
                              <v-autocomplete
                                dense
                                type="text"
                                v-model="select_special_code"
                                @change="checkSpecialCode(),check_receipt_code()"
                                :items="special_code_list"
                                item-text="text"
                                class="align-right-input"
                                :rules="[(v) => !!v || 'กรุณาเลือกรหัสพิเศษ']"
                                :error="select_special_code == ''"
                              >
                              </v-autocomplete>
                            </div>
                            <div v-if="header.value == 'rv_date'" class="mt-2 mb-2">
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
                    >Statement
                  </v-subheader>
                  <!-- <v-row> -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class="pa-0"
                    v-for="(items, index) in data_matching.statement"
                    :key="'ts' + index"
                    id="tablestatement"
                  >
                    <v-data-table
                      class="mb-0"
                      width="100%"
                      v-if="
                        data_matching.type == 'Transfer' ||
                          data_matching.type == 'Suspense'
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
                                  v-model="items.confirm_date"
                                  placeholder="dd/mm/yyyy"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle">เลขที่บัญชีธนาคาร</td>
                            <td class="colinputdata">
                              <div class="pt-2 pb-2" id="payment">
                                <v-form class="form_select_wht" ref="formpayment" lazy-validation>
                                  <v-autocomplete
                                    type="text"
                                    item-text="text"
                                    @change="check_bank_type(index) , check_statement('tran_sus') , link_Bankcode_addGL(index)"
                                    class="align-right-input mt-n5 mb-n5"
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
                                <!-- <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  v-model="items.statement_no"
                                  type="text"
                                  placeholder="กรอกข้อความ"
                                /> -->
                                <v-text-field
                                    @keyup="check_statement_no(items.statement_no)"
                                    @change="search_statement_no(items.statement_no , index)"
                                    class="align-right-input mt-2 mb-n5"
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="กรอกข้อความ"
                                    v-model="items.statement_no"
                                    append-icon="mdi-magnify"
                                    @click:append="search_statement_no(items.statement_no , index)"
                                    :rules="items.type_debt !== 'Offset'? [(v) => !!v || 'กรุณากรอก Statement No']: []"
                                    :error="items.statement_no == '' && select_special_code != '01' && items.type_debt !== 'Offset'"
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
                              ยอดชำระ
                            </td>
                            <td
                              class="colinputdata"
                              style="border-bottom: 1px solid #ddd;"
                            >
                              <div class="pt-1 pb-1" id="payment">
                                <v-text-field
                                    class="align-right-input mt-2 mb-n3"
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="0.00"
                                    v-model="items.amount"
                                    :rules="items.type_debt !== 'Offset' ? [(v) => !!v || 'กรุณากรอกยอดชำระ'] : []"
                                    @input="calAmount()"
                                    @keyup="check_statement_amount(items.amount)"
                                    :error="items.amount == '' && select_special_code != '01' && items.type_debt !== 'Offset'"
                                    outlined
                                    dense
                                >
                                </v-text-field>
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
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="0.00"
                                    v-model="items.fee"
                                    @input="calFee()"
                                    @keyup="check_fee()"
                                    outlined
                                    dense
                                >
                                </v-text-field>
                              </div>
                            </td>
                            <td class="add_delete">
                              <v-btn
                                v-if="data_matching.statement.length > 1"
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
                                v-if="index == data_matching.statement.length - 1"
                                x-small
                                dark
                                fab
                                color="rgb(103, 194, 93)"
                                @click="addRowStatement('')"
                              >
                                <v-icon dark> mdi-plus </v-icon>
                              </v-btn>
                            </td>
                          </tr>
                          <tr
                            class="sum-amount"
                            v-if="index == data_matching.statement.length - 1"
                          >
                            <td style="border: 1px solid #ddd;"></td>
                            <td class="coltitle-sum">
                              <span>ยอดรวมชำระ</span>
                            </td>
                            <td class="colinputdata-sum" style="text-align: right;">
                              <label class="pl-3">{{
                                convertNumber(sum_amounts)
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
                  <!-- <v-row> -->
                   <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class="pa-0"
                    v-for="(element, index) in data_matching.statement"
                    :key="'chq' + index"
                    id="tablestatement"
                  >
                    <v-data-table
                      v-if="data_matching.type == 'CHQ'"
                      hide-default-footer
                      class="mb-0"
                      style="width: 100%"
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
                                  placeholder="dd/mm/yyyy"
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
                                  v-model="element.confirm_date"
                                  @change="linkDate(element.confirm_date , '')"
                                  placeholder="dd/mm/yyyy"
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
                                  :rules="element.type_debt !== 'Offset' ?[(v) => !!v || 'กรุณาเลือกธนาคารเช็ค'] : []"
                                  @change="bank_check(element.bank_check_list)"
                                  :error="element.bank_check_list == '' && select_special_code != '01' && element.type_debt !== 'Offset'"
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
                                    class="align-right-input mt-2 mb-n6"
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="กรอกตัวเลข"
                                    v-model="element.chq_no"
                                    :rules="element.type_debt !== 'Offset' ? [(v) => !!v || 'กรุณากรอก CHQ No'] : []"
                                    @input="calAmount()"
                                    @change="check_chq_no(element.chq_no)"
                                    :error="element.chq_no == '' && select_special_code != '01' && element.type_debt !== 'Offset'"
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
                                      type="text"
                                      item-text="text"
                                      @change="check_bank_type(index), check_statement('chq') , link_Bankcode_addGL(index)"
                                      class="align-right-input mt-n5 mb-n5"
                                      v-model="element.payment_type_bank"
                                      :items="payment_type_list"
                                      :rules="element.type_debt !== 'Offset' ? [v => !!v || 'กรุณาเลือกเลขที่บัญชีธนาคาร'] : []"
                                      :error="element.payment_type_bank == '' && select_special_code != '01'&& element.type_debt !== 'Offset'"
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
                              <div class="mt-3 pb-2">
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
                              <div class="pt-1 pb-1" id="payment">
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
                                    v-model="element.statement_no"
                                    append-icon="mdi-magnify"
                                    @click:append="search_statement_no(element.statement_no , index)"
                                    :rules="element.type_debt !== 'Offset' ? [(v) => !!v || 'กรุณากรอก Statement No'] : []"
                                    :error="element.statement_no == '' && select_special_code != '01' && element.type_debt !== 'Offset'"
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
                              <div class="pt-1 pb-1" id="payment">
                                <v-text-field
                                    class="align-right-input mt-2 mb-n3"
                                    style="border-radius: 0px; font-size:14px"
                                    placeholder="0.00"
                                    v-model="element.amount"
                                    :rules="element.type_debt !== 'Offset' ? [(v) => !!v || 'กรุณากรอกยอดชำระ'] : []"
                                    @keyup="check_statement_amount(element.amount)"
                                    @input="calAmount() "
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
                              <div class="pt-1 pb-1" id="payment">
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
                                v-if="data_matching.statement.length > 1"
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
                                v-if="index == data_matching.statement.length - 1"
                                x-small
                                dark
                                fab
                                color="rgb(103, 194, 93)"
                                @click="addRowStatement('')"
                              >
                                <v-icon dark> mdi-plus </v-icon>
                              </v-btn>
                            </td>
                          </tr>
                          <tr
                            class="sum-amount"
                            v-if="index == data_matching.statement.length - 1"
                          >
                            <td style="border: 1px solid #ddd;"></td>
                            <td class="coltitle_chq_sum">
                              <span>ยอดรวมชำระ</span>
                            </td>
                            <td class="colinputdata_chq_sum" style="text-align: right;">
                              <label class="pl-3">{{
                                convertNumber(sum_amounts)
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
                    hide-default-footer
                    class="mb-6"
                    style="width: 100%;"
                  >
                    <template v-slot:body="{}">
                      <tbody>
                        <tr
                          v-for="(header, index) in headers_wht_table"
                          :key="index"
                        >
                          <td>
                            {{ header.text }}
                          </td>
                          <td>
                            <div v-if="header.value == 'tax_base'" class="pa-1">
                              <input
                                style="text-align: right;"
                                disabled
                                class="form-control-statement"
                                :value="convertNumber(tax_base)"
                              />
                            </div>
                            <div class="pa-1" v-if="header.value == 'tax_code'" id="payment">
                              <!--
                              <select
                                v-model="tax_code"
                                @change="selectTax(tax_code)"
                                style="
                                border: 1px solid #e0e0e0;
                                border-radius: 1px;
                                width: 105%;
                                height: 40px;
                                padding-left: 7px;
                                cursor: pointer;
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
                                style="text-align: right;"
                                disabled
                                class="form-control-statement"
                                :value="convertNumber(sum_wht)"
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
                        v-for="(item, index) in headers_addgl_table"
                        :key="index"
                        class="invoice-header pa-2"
                        style="text-align: center;"
                      >
                        {{ item.text }}
                      </th>
                    </tr>
                    <tr v-for="(items, index) in data_matching.add_gl" :key="index">
                      <td v-if="items.order_gl == '01' && index == 0 && valid_fee == true" style="width:20%;" class="pl-1 pr-1 ma-0">
                        <div id="addgl">
                          <v-autocomplete
                            disabled
                            type="text"
                            class="align-center-input mt-n4 mb-n5"
                            style="font-size:14px"
                            :items="add_gl"
                            item-text="id"
                            @change="onchangeOrder_gl(items.order_gl, index)"
                            v-model="items.order_gl"
                          >
                          </v-autocomplete>
                        </div>
                      </td>
                      <td v-else style="width:20%;" class="pl-1 pr-1 ma-0">
                        <div id="addgl">
                          <v-autocomplete
                            type="text"
                            class="align-center-input mt-n4 mb-n5"
                            style="font-size:14px"
                            :items="add_gl"
                            item-text="id"
                            @change="onchangeOrder_gl(items.order_gl, index)"
                            v-model="items.order_gl"
                          >
                          </v-autocomplete>
                        </div>
                      </td>
                      <td v-if="items.order_gl == '01' && index == 0 && valid_fee == true" class="pl-1 pr-1 ma-0" style="width:55%;">
                        <div id="addgl">
                          <v-autocomplete
                            disabled
                            type="text"
                            class="mt-n4 mb-n5"
                            style="font-size:14px"
                            :items="add_gl"
                            item-text="text"
                            @change="onchangeDetail_gl(items.add_gl, index)"
                            v-model="items.add_gl"
                          >
                          </v-autocomplete>
                        </div>
                      </td>
                      <td v-else class="pl-1 pr-1 ma-0" style="width:55%;">
                        <div id="addgl">
                          <v-autocomplete
                            type="text"
                            class="mt-n4 mb-n5"
                            style="font-size:14px"
                            :items="add_gl"
                            item-text="text"
                            @change="onchangeDetail_gl(items.add_gl, index)"
                            v-model="items.add_gl"
                          >
                          </v-autocomplete>
                        </div>
                      </td>
                      <td v-if="items.order_gl == '01' && index == 0 && valid_fee == true" style="width:25%;" class="pl-1 pr-1 ma-0">
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
                        Total
                      </td>
                      <td
                        style="width:150px; text-align: right;"
                        class="pl-1 pr-1 ma-0"
                      >
                        {{ convertNumber(sum_add_amount) }}
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
                    hide-default-footer
                    style="margin-bottom: 10px; width: 100%;"
                  >
                    <template v-slot:body>
                      <tbody>
                        <tr
                          v-for="(header, index) in headers_sum_table"
                          :key="index"
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
                                :value="convertNumber(sum_wht)"
                              />
                            </div>
                            <div class="pa-1" v-if="header.value == 'sum_add'">
                              <!-- {{ sum_add_amount }} -->
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="convertNumber(sum_add_amount)"
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
                                :value="convertNumber(new_sum_aging)"
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
                                :value="convertNumber(sum_amounts)"
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
                                :value="
                                  convertNumber(
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
              v-if="data_matching.status_pending == 'Reversed'"
              color="red"
              @click="clear()"
              outlined
            >
              Clear
            </v-btn>
            <v-btn
              color="primary"
              @click="save('Pending')"
              outlined
              :disabled="
                (check_invoice == false) ||
                ((checkall_wht || check_wht) && (WHT_list == '')) || (check_receipt == false) ||
                ((checkall_wht || check_wht) && (WHT_list == '1' && (data_file_wht.length == '' && files_wht.length == '')))"
            >
              Save Draft
            </v-btn>
            <v-btn
              v-if="data_matching.statement[0].type_debt === 'Offset'"
              color="green"
              @click="save('Matched')"
              outlined
              :disabled=" (data_file == '' && files == '') || check_inv_date == false || select_special_code == ''|| (evidence_reporting == '' && data_matching.type != 'CHQ')  "
          >
            Matching
          </v-btn>
            <v-btn 
              v-else
              color="green" 
              @click="save('Matched')" 
              outlined
              :disabled="
                ((data_file == '' && files == '') && check_code == false) || select_special_code == '' || (check_receipt == false) || (evidence_reporting == '' && data_matching.type != 'CHQ') ||
                (check_invoice == false) || (data_matching.invoice_no[0].invoice_no == '') || check_inv_date == false ||
                (data_matching.statement[0].payment_type_bank == '' && select_special_code != '01') || 
                (valid_no == false && select_special_code != '01') || (valid_amount == false && select_special_code != '01') ||
                (valid_bank_check == false && select_special_code != '01') ||
                (valid_check_chq == false && select_special_code != '01') || 
                ((checkall_wht || check_wht) && (WHT_list == '')) || 
                ((checkall_wht || check_wht) && (WHT_list == '1' && (data_file_wht.length == '' && files_wht.length == '')))"
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
          style="font-size:16px; font-family: 'Bai_Jamjuree';text-align: center;"
        >
          คุณต้องการส่งข้อมูล Request Mail ยืนยันใบแจ้งหนี้ใช่หรือไม่ ?
        </v-card-text>
        -->
        <v-row class="ml-1 mr-1">
        <v-col cols="2">
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
          style="font-size:16px; font-family: 'Bai_Jamjuree';text-align: center;"
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
          style="font-size:16px; font-family: 'Bai_Jamjuree';"
        >
          คุณต้องการส่งข้อมูล Request Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT ใช่หรือไม่ ?
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
          กรณีมีการกด Request Mail หรือแก้ไขข้อมูลในส่วนอื่นไว้ ข้อมูลจะไม่ถูกส่งไปบันทึก
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"
              v-if="data_file.length > 0"
              @click="downloadAll(data_file)"
            >
              ดาวน์โหลดเอกสารทั้งหมด
            </v-btn>
          </v-card-actions>
          <v-list>
            <v-list-item v-for="(item, index) in data_file" :key="item.name">
              <v-list-item-content>
                <v-list-item-title>
                  {{ index + 1 }}.
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-btn 
                  icon 
                  color="primary"
                  @click=" previewFile({ 
                    url: item.data_base64,
                    types: item.type,
                    check_local_file: item.check_local_file
                  }) "
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn 
                  icon 
                  color="green"
                  @click=" downloadFile({ 
                    url: item.data_base64, 
                    label: item.name,
                    types: item.type,
                    check_local_file: item.check_local_file }) "
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
                <v-btn 
                  icon 
                  color="red"
                  @click="deleteFile(item.name)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-card-actions v-if="data_file.length  == 0" style="text-align: center;">
            <v-layout row>
              <v-flex justify-center>
                <span style="font-size: 25px font-family: 'Bai_Jamjuree'">ไม่มีรายการเอกสารแนบ</span>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card-text>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"
              v-if="data_file_wht.length > 0"
              @click="downloadAll(data_file_wht)"
            >
              ดาวน์โหลดเอกสารทั้งหมด
            </v-btn>
          </v-card-actions>
          <v-list>
            <v-list-item v-for="(item, index) in data_file_wht" :key="item.name">
              <v-list-item-content>
                <v-list-item-title>
                  {{ index + 1 }}.
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-btn 
                  icon 
                  color="primary"
                  @click=" previewFile({ 
                    url: item.data_base64,
                    types: item.type,
                    check_local_file: item.check_local_file
                  }) "
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn 
                  icon 
                  color="green"
                  @click=" downloadFile({ 
                    url: item.data_base64, 
                    label: item.name,
                    types: item.type,
                    check_local_file: item.check_local_file }) "
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
                <v-btn 
                  icon 
                  color="red"
                  @click="deleteFileWHT(item.name)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-card-actions v-if="data_file.length  == 0" style="text-align: center;">
            <v-layout row>
              <v-flex justify-center>
                <span style="font-size: 25px font-family: 'Bai_Jamjuree'">ไม่มีรายการเอกสารแนบ</span>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card-text>
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
import axios from 'axios';

export default {
  // props: ["payment_type"],
  data: () => ({
    fileRules: [
      (v) => !!v || "โปรดเลือกไฟล์",
      (v) => (v && v.length > 0) || "โปรดเลือกไฟล์",
    ],
    selectRules: [(v) => !!v || "โปรดเลือกประเภท"],
    matching_dialog: false,
    // add invoice
    data_customer: [],
    invoice_list: [],
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
        text: "01"
      },
      {
        text: "02"
      },
      {
        text: "03"
      }
    ],
    tax_code_list: [
      { text: "" },
      { text: "R53-01 ค่าบริการ 1%" },
      { text: "R53-04 ค่าบริการ 1.5%" },
      { text: "R53-06 ค่าบริการ 2%" },
      { text: "R53-02 ค่าบริการ 3%" },
      { text: "R53-03 ค่าเช่า 5%" }
    ],
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
      { text: "BBL205"},
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
      { text: "Bill Payment - KBANK"},
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
      { text: "KTB926" },
      { text: "KTB569" },
      { text: "KTB694" },
      { text: "KTB034" },
      { text: "KTB184" },
      { text: "KTB728" },
      { text: "KBANK035" },
      { text: "KBANK199" },
      { text: "KTB856" },
      { text: "QR CODE" },
      { text: "SCB376" },
      { text: "SCB750" },
      { text: "SCB540" },
      { text: "SCB009" },
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
    transfer_suspense: [
      {
        confirm_date: "",
        payment_type_bank: "",
        code_bank: "",
        statement_no: "",
        amount: "",
        sequence: "",
        check_date: "",
        bank_check_list: "",
        chq_no: "",
      },
    ],
    finish: true,
    invoice_no: "",
    receipt_number: "",
    remark_mail: '',
    amount_after_vat: "",
    amount: 0,
    agings: "",
    msg: "",
    check_date: "",
    check_file: "",
    check_file_wht: "",
    rv_date: "",
    dragoverfile: false,
    dragoverfile_WHT:false,
    set_file: [],
    set_file_wht: [],
    // add_amount: "",
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
    sum_amount: 0,
    sum_aging: 0,
    new_aging: [],
    confirm_date: "",
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
    checkbox_wht: "",
    // checkbox_mail: "",
    files: [],
    files_wht: [],
    data_file: [],
    data_file_wht: [],
    status_file: "",
    status_file_wht: "",
    chq_no: "",
    select_special_code: "",
    evidence_reporting: "",
    tax_code: "",
    checkall_mail: false,
    checkall_wht: false,
    check_mail: false,
    check_wht: false,
    check_code: false,
    data_invoice: [],
    data_detail: [],
    add_invoice: [],
    data_add_gl: [],
    textfile: "",
    textfile_wht: "",
    data_matching: "",
    sum_amounts: 0, //ยอดรวมชำระ
    offsetTop: 0,
    modal_request_mail: false, //dialog Mail ยืนยันใบแจ้งหนี้
    modal_request_mail_wht: false, // dialog Mail ติดตาม WHT
    modal_request_mail_and_wht: false, //dialog Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
    modal_close_dialog: false,
    check_mail_invoice: false,
    check_mail_wht: false,
    status_mail_invoice: false, //Mail ยืนยันใบแจ้งหนี้
    status_mail_wht: false, //Mail ติดตาม WHT
    status_mail_total: false, //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
    // data_tf_sp: [],
    // data_chq: [],
    data_statement: [],
    file_data: [],
    file_wht_data: [],
    change_file: "",
    change_wht: "",
    check_payment_type: "",
    iteminvoice_no: [],
    new_invoice_list: [],
    select_invoice: [],
    check_invoice: true,
    valid: false,
    valid_bank_check: true,
    valid_check_chq: true,
    valid_no: false,
    valid_amount: false,
    valid_fee: false,
    check_req_mail: false,
    check_req_mail_WHT: false,
    check_receipt: true,
    link_bankcode: [],
    datacheckwht: []
  }),
  mounted() {
    eventBus.$on("openMatchingDialog", this.open);
  },
  beforeDestroy() {
    eventBus.$off("openMatchingDialog");
    // bus.$off()
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
    // download ทั้งหมด
    downloadAll(items){ 
      for(const item of items){
        let urls = "";
        if(item.check_local_file == true){
          urls = "data:"+item.type+";base64,"+item.url
        }else{
          urls = item.url
        }
            
        axios.get(urls, { responseType: 'blob' }) 
          .then(response => { 
            const blob = new Blob([response.data], { type: response.data.type })
            //console.log(blob)
            const link = document.createElement('a') 
            link.href = window.URL.createObjectURL(blob)
            link.download = item.name
            link.click() 
            URL.revokeObjectURL(link.href) 
          }).catch(console.error)
      }
            
    },

    // preview
    previewFile({url , types , check_local_file}){ 
      let urls = "";
      if(check_local_file == true){
        urls = "data:"+types+";base64,"+url;
      }else{
        urls = url;
      }
      axios.get(urls, { responseType: 'blob' })
        .then(response => { 
          const blob = new Blob([response.data], { type: response.data.type })
          //console.log(blob)
          const link = document.createElement('a') 
          link.href = window.URL.createObjectURL(blob) 
          window.open(link.href, '_blank');
        }).catch(console.error)
    },

    // download
    downloadFile({ url , label , types , check_local_file}){
      let urls = "";
      if(check_local_file == true){
        urls = "data:"+types+";base64,"+url;
      }else{
        urls = url;
      }
      axios.get(urls, { responseType: 'blob' })
        .then(response => { 
          //console.log(response.data)
          const blob = new Blob([response.data], { type: response.data.type }) 
          //console.log(blob)
          const link = document.createElement('a') 
          link.href = window.URL.createObjectURL(blob) 
          link.download = label
          link.click() 
          URL.revokeObjectURL(link.href) 
        }).catch(console.error)
        
    },
    // ลบไฟล์ใน modal เอกสารแนบไฟล์
    deleteFile(fileName){
      const index = this.data_file.findIndex(
        file => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.data_file.splice(index, 1);
    },
    deleteFileWHT(fileName){
      const index = this.data_file_wht.findIndex(
        file => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.data_file_wht.splice(index, 1);
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
      }else if(this.select_special_code != "02" && this.data_matching.invoice_no[0].receipt_number != ""){
        this.check_receipt = false;
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถทำรายการได้",
          text: 'เนื่องจากรหัสพิเศษไม่ตรงตามเงื่อนไข',
          showConfirmButton: false,
          timer: 3000,
        });
      }else if(this.select_special_code != "03" && this.data_matching.invoice_no[0].receipt_number == ""){
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
    validate() {
      if(this.files_wht.length == 0){
        if(this.datacheckwht.length != 0){
            this.check_wht = true;
            this.$refs.form.validate();
        }else{
          this.check_wht = false;
          this.$refs.form.reset();
          //this.$refs.formfile.reset();
          this.WHT_list = "";
        }
      }else{
        if(this.datacheckwht.length != 0){
            this.check_wht = true;
            this.$refs.form.validate();
        }else{
          this.check_wht = false;
          this.$refs.form.reset();
          //this.$refs.formfile.reset();
          this.WHT_list = "";
        }
      }
      
    },
    validateselect(type) {
      if (type != 1) {
        this.files_wht = [];
        this.data_file_wht = [];
      }
    },
    checkAll(key, check) {
      // this.data_mail = [];
      let sum = 0;
      let num = '';
      // console.log(key, check);
      this.data_mail = [];
      if (key == "mail" && check == true) {
        this.data_matching.invoice_no.forEach((element) => {
          element.checkbox_mail = true;
          this.check_mail = true;
          this.data_mail.push({ data_mail: element });
        });
        this.check_mail = true;
        // console.log(this.data_mail)
      } else if (key == "mail" && check == false) {
        this.data_matching.invoice_no.forEach((element) => {
          element.checkbox_mail = false;
          this.check_mail = false;
          this.data_mail.pop({ data_mail: element });
        });
        this.check_mail = false;
        // console.log(this.data_mail)
      }
      if (key == "wht" && check == true) {
        this.data_matching.invoice_no.forEach((element) => {
          element.checkbox_wht = true;
          this.checkbox_wht = true;
          this.data_wht.push({ invoice_no: element });
          this.datacheckwht.push(true)
          // sum += parseFloat(element.aging);
        });
        this.data_wht.forEach((element) => {
          num = this.toNumber(element.invoice_no.aging)
          sum += parseFloat(num);
        });
        this.check_wht = true;
        this.tax_base = (sum / 1.07).toFixed(3);
        this.selectTax();
      } else if (key == "wht" && check == false) {
        this.data_matching.invoice_no.forEach((element) => {
          element.checkbox_wht = false;
          this.checkbox_wht = false;
          this.data_wht.pop({ invoice_no: element });
        });
        this.datacheckwht = [];
        this.check_wht = false;
        this.tax_base = 0;
        this.selectTax();
      }
    },
    checkMail(item,check) {
      if (check) {
        this.check_mail = true;
        this.checkall_mail = true;
        this.data_mail.push({
          data_mail:item
        })       
        // console.log('เพิ่ม',this.data_mail);
      } else {
        this.check_mail = false;
        this.checkall_mail = false;
        this.data_mail.pop({ 
          data_mail: item
        });
        // console.log('ลด',this.data_mail);
      }
    },
    // cal ฐานภาษี
    calTypeWht(item, check) {
      // console.log(item, check);
      let sum = 0;
      let num = '';
      if (check) {
        this.check_wht = true;
        this.checkall_wht = true;
        this.data_wht.push({ invoice_no: item });
        this.datacheckwht.push(true)
      } else  {
        this.datacheckwht.pop(true)
        let wht_data = [];
        this.data_wht.forEach((element) =>{
          if(element.invoice_no.invoice_no != item.invoice_no){
            wht_data.push(element)
          }
        })
        this.data_wht = [];
        this.data_wht = wht_data;
        if(this.data_wht.length == 0){
          this.checkall_wht = false;
          this.check_wht = false;
        }
      }
      this.data_wht.forEach((element) => {
        num = this.toNumber(element.invoice_no.aging);
        sum += parseFloat(num);
      });
      this.tax_base = (sum / 1.07).toFixed(3);
      this.selectTax();
      // console.log("ภาษี :", this.tax_base);
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
    numberToComma(num) {
      let new_num = Number(num).toLocaleString()
      return new_num
    },
    // คำนวณยอดชำระ
    calAmount() {
      let count = 0;
      this.data_matching.statement.forEach((element) => {
        if(element.type_debt != "Suspense" && element.type_debt != "Adjust JV"){
          if (element.amount) {
            count += parseFloat(this.toNumber(element.amount));
          }
        }
      });
      let legarr = this.data_matching.statement.length - 1;
      this.data_matching.statement[legarr].sum_amounts = count;
      this.sum_amounts = count;
    },
    calFee(){
      let count = 0;
      let new_arr = [];
      if(this.data_matching.add_gl[0].order_gl != "01"){
        new_arr = this.data_matching.add_gl
        new_arr.unshift(new_arr.pop())
        this.data_matching.add_gl = new_arr
      }

      this.data_matching.statement.forEach((element) => {
        if (element.fee) {
          count += parseFloat(this.toNumber(element.fee));
        }
      });
      //this.data_matching.add_gl[0].add_amount = count.toString();
      if(count != 0){
        this.data_matching.add_gl[0].order_gl = "01";
        this.data_matching.add_gl[0].add_gl = "ค่าธรรมเนียมธนาคาร";
        this.data_matching.add_gl[0].add_amount = count.toString();
      }else{
        this.data_matching.add_gl[0].order_gl = "";
        this.data_matching.add_gl[0].add_gl = "";
        this.data_matching.add_gl[0].add_amount = "";

        new_arr = this.data_matching.add_gl
        new_arr.push(new_arr.shift())
        this.data_matching.add_gl = new_arr
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
          this.data_matching.add_gl[index].add_gl = element.text;
        }
      });
    },
    onchangeDetail_gl(item, index) {
      // console.log(item, index);
      this.add_gl.forEach((element) => {
        if (element.text == item) {
          this.data_matching.add_gl[index].order_gl = element.id;
        }
      });
    },
    onchangeAddAmount(data, key) {
      if (key == "ADD_GL") {
        let count_add = 0;
        this.data_matching.add_gl.forEach((element) => {
          if (element.add_amount != "") {
            count_add += this.toNumber(element.add_amount);
          }
        });

        this.sum_add_amount = count_add.toFixed(2);
        // คำนวณ sum aging ในกรณีมีการกรอกข้อมูลเพิ่ม
      } else if (key == "Aging") {
        let count_aging = 0;
        this.data_matching.invoice_no.forEach((element) => {
          if (element.aging != "") {
            count_aging += Number(element.aging.replace(/,/g , ''));
          }
        });
        this.sum_aging = count_aging;
        this.new_sum_aging = this.sum_aging;
        if(this.data_wht.length > 0){
          let sum = 0
          let num = ''
          this.data_wht.forEach((element) => {
            if(element.invoice_no.checkbox_wht == true){
              num = this.toNumber(element.invoice_no.aging)
              sum += parseFloat(num)
            }
          })
          this.tax_base = (sum / 1.07).toFixed(3);
          // console.log(this.tax_base)
        }

        // คำนวณ sum amount ในกรณีมีการกรอกข้อมูลเพิ่ม
      } else if (key == "Amount") {
        let count_amount = 0;
        this.data_matching.invoice_no.forEach((element) => {
          if (element.amount_after_vat != "") {
            count_amount += Number(element.amount_after_vat);
          }
        });
        this.sum_amount = count_amount.toFixed(2);
      }
    },
    check_bank_type(index){
      if (index == undefined) {
        if (this.data_matching.statement[0].payment_type_bank == "BBL205") {
          this.data_matching.statement[0].code_bank = "BBL001";
        } else if (this.data_matching.statement[0].payment_type_bank == "BBL785") {
          this.data_matching.statement[0].code_bank = "BBL002";
        } else if (this.data_matching.statement[0].payment_type_bank == "BBL156") {
          this.data_matching.statement[0].code_bank = "BBL003";
        } else if (this.data_matching.statement[0].payment_type_bank == "BBL522") {
          this.data_matching.statement[0].code_bank = "BBL004";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY993") {
          this.data_matching.statement[0].code_bank = "BAY001";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY778") {
          this.data_matching.statement[0].code_bank = "BAY002";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY601") {
          this.data_matching.statement[0].code_bank = "BAY003";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY973") {
          this.data_matching.statement[0].code_bank = "BAY004";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY684") {
          this.data_matching.statement[0].code_bank = "BAY005";
        } else if (this.data_matching.statement[0].payment_type_bank == "CIMB854") {
          this.data_matching.statement[0].code_bank = "CIMB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "CIMB745") {
          this.data_matching.statement[0].code_bank = "CIMB002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "Bill Payment - SCB"
        ) {
          this.data_matching.statement[0].code_bank = "SCB001";
        } else if (
          this.data_matching.statement[0].payment_type_bank ==
          "Bill Payment - KBANK"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "Bill Payment - BBL"
        ) {
          this.data_matching.statement[0].code_bank = "BBL001";
        } else if (this.data_matching.statement[0].payment_type_bank == "GSB505") {
          this.data_matching.statement[0].code_bank = "GSB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "GSB491") {
          this.data_matching.statement[0].code_bank = "GSB002";
        } else if (this.data_matching.statement[0].payment_type_bank == "KKP412") {
          this.data_matching.statement[0].code_bank = "KKP001";
        } else if (this.data_matching.statement[0].payment_type_bank == "KKP756") {
          this.data_matching.statement[0].code_bank = "KKP002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "KBANK579"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK003";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "KBANK861"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "KBANK035"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK005";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "KBANK199"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK001";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB395") {
          this.data_matching.statement[0].code_bank = "KTB003";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB926") {
          this.data_matching.statement[0].code_bank = "KTB004";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB569") {
          this.data_matching.statement[0].code_bank = "KTB005";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB694") {
          this.data_matching.statement[0].code_bank = "KTB006";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB034") {
          this.data_matching.statement[0].code_bank = "KTB007";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB184") {
          this.data_matching.statement[0].code_bank = "KTB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB856") {
          this.data_matching.statement[0].code_bank = "KTB008";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB728") {
          this.data_matching.statement[0].code_bank = "KTB010";
        } else if (this.data_matching.statement[0].payment_type_bank == "SCB376") {
          this.data_matching.statement[0].code_bank = "SCB002";
        } else if (this.data_matching.statement[0].payment_type_bank == "SCB009") {
          this.data_matching.statement[0].code_bank = "SCB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "SCB750") {
          this.data_matching.statement[0].code_bank = "SCB003";
        } else if (this.data_matching.statement[0].payment_type_bank == "SCB540") {
          this.data_matching.statement[0].code_bank = "SCB004";
        } else if (this.data_matching.statement[0].payment_type_bank == "TMB958") {
          this.data_matching.statement[0].code_bank = "TMB002";
        } else if (this.data_matching.statement[0].payment_type_bank == "TTB174") {
          this.data_matching.statement[0].code_bank = "TMB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "TTB958") {
          this.data_matching.statement[0].code_bank = "TMB002";
        } else if (this.data_matching.statement[0].payment_type_bank == "TTB907") {
          this.data_matching.statement[0].code_bank = "TTB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "TTB553") {
          this.data_matching.statement[0].code_bank = "TTB002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "TBANK064"
        ) {
          this.data_matching.statement[0].code_bank = "TBANK002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "CHQ" ||
          this.data_matching.statement[0].payment_type_bank == "FACTORING" ||
          this.data_matching.statement[0].payment_type_bank == "QR CODE"
        ) {
          this.data_matching.statement[0].code_bank = "";
        } else {
          this.data_matching.statement[0].code_bank = "";
        }
      } else {
        // console.log("มีค่า");
        if (this.data_matching.statement[index].payment_type_bank == "BBL205") {
          this.data_matching.statement[index].code_bank = "BBL001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BBL785"
        ) {
          this.data_matching.statement[index].code_bank = "BBL002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BBL156"
        ) {
          this.data_matching.statement[index].code_bank = "BBL003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BBL522"
        ) {
          this.data_matching.statement[index].code_bank = "BBL004";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY993"
        ) {
          this.data_matching.statement[index].code_bank = "BAY001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY778"
        ) {
          this.data_matching.statement[index].code_bank = "BAY002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY601"
        ) {
          this.data_matching.statement[index].code_bank = "BAY003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY973"
        ) {
          this.data_matching.statement[index].code_bank = "BAY004";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY684"
        ) {
          this.data_matching.statement[index].code_bank = "BAY005";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "CIMB854"
        ) {
          this.data_matching.statement[index].code_bank = "CIMB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "CIMB745"
        ) {
          this.data_matching.statement[index].code_bank = "CIMB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank ==
          "Bill Payment - SCB"
        ) {
          this.data_matching.statement[index].code_bank = "SCB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank ==
          "Bill Payment - KBANK"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK002";
        } else if (
          this.data_matching.statement[index].payment_type_bank ==
          "Bill Payment - BBL"
        ) {
          this.data_matching.statement[index].code_bank = "BBL001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "GSB505"
        ) {
          this.data_matching.statement[index].code_bank = "GSB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "GSB491"
        ) {
          this.data_matching.statement[index].code_bank = "GSB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KKP412"
        ) {
          this.data_matching.statement[index].code_bank = "KKP001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KKP756"
        ) {
          this.data_matching.statement[index].code_bank = "KKP002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KBANK579"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KBANK861"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KBANK035"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK005";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KBANK199"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB395"
        ) {
          this.data_matching.statement[index].code_bank = "KTB003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB926"
        ) {
          this.data_matching.statement[index].code_bank = "KTB004";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB569"
        ) {
          this.data_matching.statement[index].code_bank = "KTB005";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB694"
        ) {
          this.data_matching.statement[index].code_bank = "KTB006";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB034"
        ) {
          this.data_matching.statement[index].code_bank = "KTB007";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB184"
        ) {
          this.data_matching.statement[index].code_bank = "KTB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB856"
        ) {
          this.data_matching.statement[index].code_bank = "KTB008";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB728"
        ) {
          this.data_matching.statement[index].code_bank = "KTB010";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "SCB376"
        ) {
          this.data_matching.statement[index].code_bank = "SCB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "SCB009"
        ) {
          this.data_matching.statement[index].code_bank = "SCB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "SCB750"
        ) {
          this.data_matching.statement[index].code_bank = "SCB003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "SCB540"
        ) {
          this.data_matching.statement[index].code_bank = "SCB004";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TMB958"
        ) {
          this.data_matching.statement[index].code_bank = "TMB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TTB174"
        ) {
          this.data_matching.statement[index].code_bank = "TMB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TTB958"
        ) {
          this.data_matching.statement[index].code_bank = "TMB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TTB907"
        ) {
          this.data_matching.statement[index].code_bank = "TTB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TTB553"
        ) {
          this.data_matching.statement[index].code_bank = "TTB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TBANK064"
        ) {
          this.data_matching.statement[index].code_bank = "TBANK002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "CHQ" ||
          this.data_matching.statement[index].payment_type_bank == "FACTORING" ||
          this.data_matching.statement[index].payment_type_bank == "QR CODE"
        ) {
          this.data_matching.statement[index].code_bank = "";
        } else {
          this.data_matching.statement[index].code_bank = "";
        }
      }
    },
    link_Bankcode_addGL(index){
      //console.log(index)
      if(this.data_matching.statement[index].type_debt == "Suspense" || this.data_matching.statement[index].type_debt == "Adjust JV"){
        
        if(this.data_matching.statement[index].code_bank != ""){
            //เช็คเพิ่ม index ที่ยังไม่มี
              let num = this.link_bankcode.length -1
              if(num >= index){
                for(let i = 0; i < this.data_matching.add_gl.length; i++){
                  if(this.link_bankcode[index].order_gl == this.data_matching.add_gl[i].order_gl){
                    this.data_matching.add_gl[i].order_gl = "";
                    this.data_matching.add_gl[i].add_gl = "";
                    this.data_matching.add_gl[i].add_amount = "";
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
              
          

            if(this.data_matching.statement[index].code_bank == "BAY001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "12"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A BAY 034-0-40099-3"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "12"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "BAY002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "38"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A BAY 034-1-395-77-8"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "38"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "BAY003"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "82"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A - BAY 001-0-18260-1"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "82"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "BAY004"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "88"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A - BAY 001-9-59097-3"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "88"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "BAY005"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "90"
                  this.list_addata_matching.add_gld_gl[i].add_gl = "เงินขาด Suspense - S/A - BAY 777-0-91268-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "90"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "BBL001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "10"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A BBL 210-3-01220-5"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "10"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "BBL002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "36"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A BBL 210-0-25878-5"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "36"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "BBL003"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "78"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A-BBL 2103021156"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "78"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "BBL004"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "84"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A - BBL 2100747522"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "84"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "CIMB001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "22"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A-CIMB 80-001-9685-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "22"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "CIMB002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "66"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A-CIMB 70-040-5774-5"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "66"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "GSB001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "58"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A-GSB 000000806505"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "58"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "GSB002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "56"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A-GSB 020252844491"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "56"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KKP001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "32"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A KK 00031420000412"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "32"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KKP002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "60"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A KK 00032520001756"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "60"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KBANK001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "08"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A TFB 052-1-07219-9"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "08"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KBANK002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "52"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A TFB 052-1-07386-1"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "52"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KBANK003"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "34"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A TFB 052-2-41857-9"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "34"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KTB001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "28"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A KTB 015-6-05118-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "28"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KTB003"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "16"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 015-1-52139-5"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "16"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KTB004"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "30"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 015-0-22692-6"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "30"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KTB006"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "62"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 323-1-33669-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "62"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KTB007"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "14"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 013-6-09603-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "14"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KTB008"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "64"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A KTB 013-1-61085-6"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "64"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "KTB010"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "54"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A-KTB 221-6-02372-8"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "54"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "SCB001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "26"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A SCB 026-3-04300-9"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "26"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "SCB002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "48"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A SCB 026-2-89937-6"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "48"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "SCB003"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "80"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A - SCB 468-077375-0"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "80"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "SCB004"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "86"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A - SCB 434-026854-0"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "86"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "TBANK002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "24"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A Thanachart 115-2-35506-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "24"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "TMB001"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "68"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - C/A-TMB 053-1-07517-4"
                  //this.link_bankcode[index].index = index
                  this.link_bankcode[index].order_gl = "68"
                  break;
                }
              }
            }else if(this.data_matching.statement[index].code_bank == "TMB002"){
              for(let i = 0; i < this.data_matching.add_gl.length; i++){
                if(this.data_matching.add_gl[i].order_gl == ""){
                  this.data_matching.add_gl[i].order_gl = "50"
                  this.data_matching.add_gl[i].add_gl = "เงินขาด Suspense - S/A-TMB 053-2-50495-8"
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
                for(let i = 0; i < this.data_matching.add_gl.length; i++){
                  if(this.link_bankcode[index].order_gl == this.data_matching.add_gl[i].order_gl){
                    this.data_matching.add_gl[i].order_gl = "";
                    this.data_matching.add_gl[i].add_gl = "";
                    this.data_matching.add_gl[i].add_amount = "";
                    this.link_bankcode[index].order_gl = "";
                    break;
                  }
                }
              }
        }
        //console.log(this.link_bankcode)
      }
       else if (this.data_matching.statement[index].type_debt == "Offset") {
          for (let i = 0; i < this.data_matching.add_gl.length; i++) {
              if (this.data_matching.add_gl[i].order_gl == "") {
                  this.data_matching.add_gl[i].order_gl = "96";
                  this.data_matching.add_gl[i].add_gl = "AR-AP Inter Clearing";

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
                this.data_matching.add_gl[i].order_gl = "";
                this.data_matching.add_gl[i].add_gl = "";
                this.data_matching.add_gl[i].add_amount = "";

                // Reset link_bankcode
                let num = this.link_bankcode.length - 1;
                if (num >= index) {
                    this.link_bankcode[index].order_gl = "";
                }
            }
          }
        }
      else{
        let num = this.link_bankcode.length -1
              if(num >= index){
                for(let i = 0; i < this.data_matching.add_gl.length; i++){
                  if(this.link_bankcode[index].order_gl == this.data_matching.add_gl[i].order_gl){
                    this.data_matching.add_gl[i].order_gl = "";
                    this.data_matching.add_gl[i].add_gl = "";
                    this.data_matching.add_gl[i].add_amount = "";
                    this.link_bankcode[index].order_gl = "";
                    break;
                  }
                }
              }
      }
      
    },
    open(item, edit, index) {
      this.finish = false;
      // this.data_mail = [];
      if (item) {
        this.data_matching = item[0];
        //console.log(this.data_matching)
        this.sum_amounts = this.data_matching.sum_amounts;
        // this.sum_aging = this.data_matching.sum_aging
        this.tax_base = this.data_matching.tax_base;
        this.tax_code = this.data_matching.tax_code;
        this.sum_wht = this.data_matching.sum_wht;
        this.select_special_code = this.data_matching.special_code;
        this.evidence_reporting = this.data_matching.evidence_reporting;
        this.remark = this.data_matching.remark;
        this.remark_erp = this.data_matching.remark_erp;
        this.WHT_list = this.data_matching.type_wht;
        this.customer_no = this.data_matching.customer_no;
        this.customer_name = this.data_matching.customer_name;
        this.customer_email = this.data_matching.customer_email;
        this.finance_name = this.data_matching.finance_name;
        this.sale_email = this.data_matching.sale_email;
        this.check_mail_invoice = this.data_matching.check_mail_invoice;
        this.check_mail_wht = this.data_matching.check_mail_wht;
        this.status_mail_invoice = this.data_matching.status_mail_invoice;
        this.status_mail_wht = this.data_matching.status_mail_wht;
        this.status_mail_total = this.data_matching.status_mail_total;
        this.matching_dialog = true;
        // this.new_sum_aging = this.sum_aging;

        if(this.select_special_code == "01"){
          this.check_code = true;
        }else{
          this.check_code = false;
        }

        // เช็คค่าวันที่ตัดหนี้ถ้าเป็น 0001-01-01 ให้เปลี่ยนเป็นวันที่ปัจจุบัน
        if(moment(this.data_matching.rv_date).format("YYYY-MM-DD") == '0001-01-01'){
          this.rv_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
        }else{
          this.rv_date = moment(this.data_matching.rv_date).format("YYYY-MM-DD")
        }        
        var amounts = 0;
        var aging = 0;
        // console.log(this.data_matching.file)
        // เพิ่มไฟล์
        if(this.data_matching.file){
          this.check_file = this.data_matching.file[0].folder_id;
          let new_base64 = [];
          this.data_matching.file.forEach((element) => {
            if(element.check_local_file == true){
              this.data_file.push({
                name: element.name,
                type: element.type,
                data_base64: element.data_base64,
                file_id: element.file_id,
                folder_id: element.folder_id,
                check_local_file: element.check_local_file,
                queue_no_file: element.queue_no_file
              });
            }else{
              new_base64 = element.data_base64.split("base64,")
              this.data_file.push({
                name: element.name,
                type: element.type,
                data_base64: new_base64[1],
                file_id: element.file_id,
                folder_id: element.folder_id,
                check_local_file: true,
                queue_no_file: element.queue_no_file
              })
            }
          });
          // console.log("name file : ", this.files);
        }else{
          this.data_file = [];
          this.check_file = "";
        }

        if(this.data_matching.file_wht){
          this.check_file_wht = this.data_matching.file_wht[0].folder_id;
          let newwht_base64 = [];
          this.data_matching.file_wht.forEach((element) => {
            if(element.check_local_file == true){
              this.data_file_wht.push({
                name: element.name,
                type: element.type,
                data_base64: element.data_base64,
                file_id: element.file_id,
                folder_id: element.folder_id,
                check_local_file: element.check_local_file,
                queue_no_filewht: element.queue_no_filewht
              })
            }else{
              newwht_base64 = element.data_base64.split("base64,")
              this.data_file_wht.push({
                name: element.name,
                type: element.type,
                data_base64: newwht_base64[1],
                file_id: element.file_id,
                folder_id: element.folder_id,
                check_local_file: true,
                queue_no_filewht: element.queue_no_filewht
              })
            }
            
          });
        }else{
          this.data_file_wht = [];
          this.check_file_wht = "";
        }
        // end
        
        // คำนวน sum amount
        this.data_matching.invoice_no.forEach((element) => {
          amounts += Number(element.amount_after_vat);
          aging += Number(element.aging);
          this.iteminvoice_no.push(element.invoice_no)
          if (element.checkbox_mail == true){
              this.checkall_mail = true;
              this.data_mail.push({ data_mail:element})
          } 
          if (element.checkbox_wht == true) {
            this.checkall_wht = true;
          }
          /*
          if (element.checkbox_mail == false) {
            this.checkall_mail = false;
          }
          if (element.checkbox_wht == false) {
            this.checkall_wht = false;
          }
          */
        });
        this.sum_amount = amounts;
        this.sum_aging = aging;
        this.new_sum_aging = this.sum_aging;
        if(this.data_matching.statement){
          this.data_matching.statement.forEach((element) => {
            element.sum_amounts = this.data_matching.sum_amounts;
            element.confirm_date = moment(element.confirm_date).format(
              "YYYY-MM-DD"
            );
            // เช็คค่าวันที่หน้าเช็คถ้าเป็น 0001-01-01 ให้เปลี่ยนเป็นวันที่ปัจจุบัน
            if(moment(element.check_date).format("YYYY-MM-DD") == '0001-01-01'){
              element.check_date = moment(new Date().toJSON()).format("YYYY-MM-DD")
            }else{
              element.check_date = moment(element.check_date).format("YYYY-MM-DD");
            }
            if(element.bank_check_list != ''){
              this.valid_bank_check = true;
            }
            if(element.chq_no != ''){
              this.valid_check_chq = true;
            }
            if(element.amount >= 0){
              this.valid_amount = true;
            }
            if(element.statement_no != ""){
              this.valid_no = true;
            }
            if(element.fee > 0){
              this.valid_fee = true;
            }
          });
        }
        if(this.data_matching.type == "Transfer"){
          this.data_matching.statement.forEach((element =>{
            if(element.type_debt == ""){
              element.type_debt = "Transfer"
            }
          }));
        }else{
          this.data_matching.statement.forEach((element =>{
            if(element.type_debt == ""){
              element.type_debt = "CHQ"
            }
          }));
        }
        this.checkInvoiceDate();
        // data add invoice 
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
              process.env.VUE_APP_API + "/customer/filterinvoices/CusNo="+ this.customer_no,
              headers
          )
          .then((response) => {
            if(response.status === 200){
              let new_invoice = []
              //let new_invoice2 = []
              let new_list_invoice = []
              this.data_customer = response.data.data
              /*
              this.data_matching.invoice_no.forEach((element) => {
                for(let i = 0; i < this.data_customer.length; i++){
                  if(element.invoice_no == this.data_customer[i].invoice_no){
                    element.receipt_number = this.data_customer[i].receipt_number;
                  }
                }
              });
              */
              this.data_customer.forEach((element) => {
                this.invoice_list.push({inv : element.invoice_no , cut : element.cut_debt ,aging : element.aging});
              });
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

              this.new_invoice_list = new_list_invoice
              
              }else{
                this.data_customer = [];
              }
          });
      }
      if (index == undefined) {
        if (this.data_matching.statement[0].payment_type_bank == "BBL205") {
          this.data_matching.statement[0].code_bank = "BBL001";
        } else if (this.data_matching.statement[0].payment_type_bank == "BBL785") {
          this.data_matching.statement[0].code_bank = "BBL002";
        } else if (this.data_matching.statement[0].payment_type_bank == "BBL156") {
          this.data_matching.statement[0].code_bank = "BBL003";
        } else if (this.data_matching.statement[0].payment_type_bank == "BBL522") {
          this.data_matching.statement[0].code_bank = "BBL004";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY993") {
          this.data_matching.statement[0].code_bank = "BAY001";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY778") {
          this.data_matching.statement[0].code_bank = "BAY002";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY601") {
          this.data_matching.statement[0].code_bank = "BAY003";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY973") {
          this.data_matching.statement[0].code_bank = "BAY004";
        } else if (this.data_matching.statement[0].payment_type_bank == "BAY684") {
          this.data_matching.statement[0].code_bank = "BAY005";
        } else if (this.data_matching.statement[0].payment_type_bank == "CIMB854") {
          this.data_matching.statement[0].code_bank = "CIMB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "CIMB745") {
          this.data_matching.statement[0].code_bank = "CIMB002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "Bill Payment - SCB"
        ) {
          this.data_matching.statement[0].code_bank = "SCB001";
        } else if (
          this.data_matching.statement[0].payment_type_bank ==
          "Bill Payment - KBANK"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "Bill Payment - BBL"
        ) {
          this.data_matching.statement[0].code_bank = "BBL001";
        } else if (this.data_matching.statement[0].payment_type_bank == "GSB505") {
          this.data_matching.statement[0].code_bank = "GSB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "GSB491") {
          this.data_matching.statement[0].code_bank = "GSB002";
        } else if (this.data_matching.statement[0].payment_type_bank == "KKP412") {
          this.data_matching.statement[0].code_bank = "KKP001";
        } else if (this.data_matching.statement[0].payment_type_bank == "KKP756") {
          this.data_matching.statement[0].code_bank = "KKP002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "KBANK579"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK003";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "KBANK861"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "KBANK035"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK005";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "KBANK199"
        ) {
          this.data_matching.statement[0].code_bank = "KBANK001";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB395") {
          this.data_matching.statement[0].code_bank = "KTB003";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB926") {
          this.data_matching.statement[0].code_bank = "KTB004";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB569") {
          this.data_matching.statement[0].code_bank = "KTB005";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB694") {
          this.data_matching.statement[0].code_bank = "KTB006";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB034") {
          this.data_matching.statement[0].code_bank = "KTB007";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB184") {
          this.data_matching.statement[0].code_bank = "KTB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB856") {
          this.data_matching.statement[0].code_bank = "KTB008";
        } else if (this.data_matching.statement[0].payment_type_bank == "KTB728") {
          this.data_matching.statement[0].code_bank = "KTB010";
        } else if (this.data_matching.statement[0].payment_type_bank == "SCB376") {
          this.data_matching.statement[0].code_bank = "SCB002";
        } else if (this.data_matching.statement[0].payment_type_bank == "SCB009") {
          this.data_matching.statement[0].code_bank = "SCB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "SCB750") {
          this.data_matching.statement[0].code_bank = "SCB003";
        } else if (this.data_matching.statement[0].payment_type_bank == "SCB540") {
          this.data_matching.statement[0].code_bank = "SCB004";
        } else if (this.data_matching.statement[0].payment_type_bank == "TMB958") {
          this.data_matching.statement[0].code_bank = "TMB002";
        } else if (this.data_matching.statement[0].payment_type_bank == "TTB174") {
          this.data_matching.statement[0].code_bank = "TMB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "TTB958") {
          this.data_matching.statement[0].code_bank = "TMB002";
        } else if (this.data_matching.statement[0].payment_type_bank == "TTB907") {
          this.data_matching.statement[0].code_bank = "TTB001";
        } else if (this.data_matching.statement[0].payment_type_bank == "TTB553") {
          this.data_matching.statement[0].code_bank = "TTB002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "TBANK064"
        ) {
          this.data_matching.statement[0].code_bank = "TBANK002";
        } else if (
          this.data_matching.statement[0].payment_type_bank == "CHQ" ||
          this.data_matching.statement[0].payment_type_bank == "FACTORING" ||
          this.data_matching.statement[0].payment_type_bank == "QR CODE"
        ) {
          this.data_matching.statement[0].code_bank = "";
        } else {
          this.data_matching.statement[0].code_bank = "";
        }
      } else {
        // console.log("มีค่า");
        if (this.data_matching.statement[index].payment_type_bank == "BBL205") {
          this.data_matching.statement[index].code_bank = "BBL001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BBL785"
        ) {
          this.data_matching.statement[index].code_bank = "BBL002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BBL156"
        ) {
          this.data_matching.statement[index].code_bank = "BBL003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BBL522"
        ) {
          this.data_matching.statement[index].code_bank = "BBL004";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY993"
        ) {
          this.data_matching.statement[index].code_bank = "BAY001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY778"
        ) {
          this.data_matching.statement[index].code_bank = "BAY002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY601"
        ) {
          this.data_matching.statement[index].code_bank = "BAY003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY973"
        ) {
          this.data_matching.statement[index].code_bank = "BAY004";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "BAY684"
        ) {
          this.data_matching.statement[index].code_bank = "BAY005";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "CIMB854"
        ) {
          this.data_matching.statement[index].code_bank = "CIMB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "CIMB745"
        ) {
          this.data_matching.statement[index].code_bank = "CIMB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank ==
          "Bill Payment - SCB"
        ) {
          this.data_matching.statement[index].code_bank = "SCB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank ==
          "Bill Payment - KBANK"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK002";
        } else if (
          this.data_matching.statement[index].payment_type_bank ==
          "Bill Payment - BBL"
        ) {
          this.data_matching.statement[index].code_bank = "BBL001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "GSB505"
        ) {
          this.data_matching.statement[index].code_bank = "GSB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "GSB491"
        ) {
          this.data_matching.statement[index].code_bank = "GSB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KKP412"
        ) {
          this.data_matching.statement[index].code_bank = "KKP001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KKP756"
        ) {
          this.data_matching.statement[index].code_bank = "KKP002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KBANK579"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KBANK861"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KBANK035"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK005";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KBANK199"
        ) {
          this.data_matching.statement[index].code_bank = "KBANK001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB395"
        ) {
          this.data_matching.statement[index].code_bank = "KTB003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB926"
        ) {
          this.data_matching.statement[index].code_bank = "KTB004";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB569"
        ) {
          this.data_matching.statement[index].code_bank = "KTB005";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB694"
        ) {
          this.data_matching.statement[index].code_bank = "KTB006";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB034"
        ) {
          this.data_matching.statement[index].code_bank = "KTB007";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB184"
        ) {
          this.data_matching.statement[index].code_bank = "KTB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB856"
        ) {
          this.data_matching.statement[index].code_bank = "KTB008";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "KTB728"
        ) {
          this.data_matching.statement[index].code_bank = "KTB010";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "SCB376"
        ) {
          this.data_matching.statement[index].code_bank = "SCB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "SCB009"
        ) {
          this.data_matching.statement[index].code_bank = "SCB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "SCB750"
        ) {
          this.data_matching.statement[index].code_bank = "SCB003";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "SCB540"
        ) {
          this.data_matching.statement[index].code_bank = "SCB004";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TMB958"
        ) {
          this.data_matching.statement[index].code_bank = "TMB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TTB174"
        ) {
          this.data_matching.statement[index].code_bank = "TMB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TTB958"
        ) {
          this.data_matching.statement[index].code_bank = "TMB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TTB907"
        ) {
          this.data_matching.statement[index].code_bank = "TTB001";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TTB553"
        ) {
          this.data_matching.statement[index].code_bank = "TTB002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "TBANK064"
        ) {
          this.data_matching.statement[index].code_bank = "TBANK002";
        } else if (
          this.data_matching.statement[index].payment_type_bank == "CHQ" ||
          this.data_matching.statement[index].payment_type_bank == "FACTORING" ||
          this.data_matching.statement[index].payment_type_bank == "QR CODE"
        ) {
          this.data_matching.statement[index].code_bank = "";
        } else {
          this.data_matching.statement[index].code_bank = "";
        }
      }

      // invoice
      if (this.data_matching.invoice_no[0] == undefined) {
        this.data_matching.invoice_no = [];
        // console.log("ไม่มีข้อมูล");
        this.data_matching.invoice_no.push({
          invoice_no: "",
          receipt_number: "",
          amount_after_vat: 0,
          aging: 0,
          cn_number: "",
          receipt_date: "",
          invoice_date: "",
          checkbox_wht: false,
          checkbox_mail: false,
          temp_id: new Date().getTime(),
        });
      }

      // this.data_wht = []
      if (edit != "edit") {
        // console.log("ไม่มีการแก้ไข");
        if (this.data_matching.invoice_no[0].invoice_no != "") {
          this.data_matching.invoice_no.forEach((element) => {
            element.aging = Number(element.aging).toFixed(2);
            // element.amount_after_vat = element.amount_after_vat.toFixed(2);
            if (element.checkbox_wht == true) {
              this.check_wht = true
              this.datacheckwht.push(true)
              this.data_wht.push({ invoice_no: element });
            }
          });
          // console.log(this.data_wht)
        }
      }

      this.data_matching.invoice_no.forEach((element , index) => {
        this.data_matching.invoice_no[index].aging = this.numberToComma(element.aging)
      })

      this.data_matching.statement.forEach((element , index) => {
        if(element.amount == 0){
          this.data_matching.statement[index].amount = "";
        }else{
          this.data_matching.statement[index].amount = this.numberToComma(element.amount)
        }
        
        if(element.fee == 0){
          this.data_matching.statement[index].fee = ""
        }else{
          this.data_matching.statement[index].fee = this.numberToComma(element.fee)
        }
        
      })

      // add gl
      
      this.data_matching.add_gl.forEach((element , index) => {
          this.data_matching.add_gl[index].add_amount = this.numberToComma(element.add_amount)
      })
      if (this.data_matching.add_gl.length == 0) {
        for (let i = 0; i < 5; i++) {
            this.data_matching.add_gl.push({
              order_gl: "",
              add_gl: "",
              add_amount: "",
            });
        }
      } else if (this.data_matching.add_gl.length == 1) {
        for (let i = 0; i < 4; i++) {
          this.data_matching.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      } else if (this.data_matching.add_gl.length == 2) {
        for (let i = 0; i < 3; i++) {
          this.data_matching.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      } else if (this.data_matching.add_gl.length == 3) {
        for (let i = 0; i < 2; i++) {
          this.data_matching.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      } else if (this.data_matching.add_gl.length == 4) {
        for (let i = 0; i < 1; i++) {
          this.data_matching.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      }
      // end add gl
      this.check_link_bankcode();
    },
    async getbase64Files() { 
      let base64 = "";
      let new_base64 = [];
      if(this.files.length != 0){
        for (let i = 0; i < this.files.length; i++) {
          const new_files = this.files[i];
          base64 = await this.toBase64(new_files);
          new_base64 = base64.split("base64,");
            
          this.data_file.push({
            name: new_files.name,
            type: new_files.type,
            data_base64: new_base64[1],
            file_id: "",
            folder_id: this.check_file,
            queue_no_file: this.data_matching.queue_no,
            check_local_file: true
          });
            
        }
      }
      this.files = []; 
    },
    async getbase64FilesWHT() { 
      let base64 = "";
      let new_base64 = [];
      if(this.files_wht.length != 0){
        for (let i = 0; i < this.files_wht.length; i++) {
          const new_files = this.files_wht[i];
          base64 = await this.toBase64(new_files);
          new_base64 = base64.split("base64,");
            
          this.data_file_wht.push({
            name: new_files.name,
            type: new_files.type,
            data_base64: new_base64[1],
            file_id: "",
            folder_id: this.check_file_wht,
            queue_no_filewht: this.data_matching.queue_no,
            check_local_file: true
          });
            
        }
      }
      this.files_wht = [];
      
    },
    check_link_bankcode(){
      for(let i = 0; i < this.data_matching.statement.length; i++){
        if(this.data_matching.statement[i].type_debt != "Suspense"){
          this.link_bankcode.push({
            index: i,
            order_gl: "" 
          })
        }else{
          if(this.data_matching.statement[i].code_bank == ""){
            this.link_bankcode.push({
              index: i,
              order_gl: "" 
            })
          }else{
            if(this.data_matching.statement[i].code_bank == "BAY001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "12" 
              })
            }else if(this.data_matching.statement[i].code_bank == "BAY002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "38" 
              })
            }else if(this.data_matching.statement[i].code_bank == "BAY003"){
              this.link_bankcode.push({
                index: i,
                order_gl: "82" 
              })
            }else if(this.data_matching.statement[i].code_bank == "BAY004"){
              this.link_bankcode.push({
                index: i,
                order_gl: "88" 
              })
            }else if(this.data_matching.statement[i].code_bank == "BAY005"){
              this.link_bankcode.push({
                index: i,
                order_gl: "90" 
              })
            }else if(this.data_matching.statement[i].code_bank == "BBL001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "10" 
              })
            }else if(this.data_matching.statement[i].code_bank == "BBL002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "36" 
              })
            }else if(this.data_matching.statement[i].code_bank == "BBL003"){
              this.link_bankcode.push({
                index: i,
                order_gl: "78" 
              })
            }else if(this.data_matching.statement[i].code_bank == "BBL004"){
              this.link_bankcode.push({
                index: i,
                order_gl: "84" 
              })
            }else if(this.data_matching.statement[i].code_bank == "CIMB001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "22" 
              })
            }else if(this.data_matching.statement[i].code_bank == "CIMB002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "66" 
              })
            }else if(this.data_matching.statement[i].code_bank == "GSB001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "58" 
              })
            }else if(this.data_matching.statement[i].code_bank == "GSB002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "56" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KKP001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "32" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KKP002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "60" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KBANK001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "08" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KBANK002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "52" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KBANK003"){
              this.link_bankcode.push({
                index: i,
                order_gl: "34" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KTB001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "28" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KTB003"){
              this.link_bankcode.push({
                index: i,
                order_gl: "16" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KTB004"){
              this.link_bankcode.push({
                index: i,
                order_gl: "30" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KTB006"){
              this.link_bankcode.push({
                index: i,
                order_gl: "62" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KTB007"){
              this.link_bankcode.push({
                index: i,
                order_gl: "14" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KTB008"){
              this.link_bankcode.push({
                index: i,
                order_gl: "64" 
              })
            }else if(this.data_matching.statement[i].code_bank == "KTB010"){
              this.link_bankcode.push({
                index: i,
                order_gl: "54" 
              })
            }else if(this.data_matching.statement[i].code_bank == "SCB001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "26" 
              })
            }else if(this.data_matching.statement[i].code_bank == "SCB002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "48" 
              })
            }else if(this.data_matching.statement[i].code_bank == "SCB003"){
              this.link_bankcode.push({
                index: i,
                order_gl: "80" 
              })
            }else if(this.data_matching.statement[i].code_bank == "SCB004"){
              this.link_bankcode.push({
                index: i,
                order_gl: "86" 
              })
            }else if(this.data_matching.statement[i].code_bank == "TBANK002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "24" 
              })
            }else if(this.data_matching.statement[i].code_bank == "TMB001"){
              this.link_bankcode.push({
                index: i,
                order_gl: "68" 
              })
            }else if(this.data_matching.statement[i].code_bank == "TMB002"){
              this.link_bankcode.push({
                index: i,
                order_gl: "50" 
              })
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
                new_date = response.data.data[0].effectiveDate.split("T")
                this.data_matching.statement[index].confirm_date = this.parseDateIn(new_date[0]);
                this.data_matching.statement[index].payment_type_bank = response.data.data[0].statementRef;
                this.data_matching.statement[index].amount = response.data.data[0].balance;

                this.valid_bank_check = true;
                this.valid_check_chq = true;
                this.valid_amount = true;
                this.check_bank_type(index);
                this.calAmount();
                this.link_Bankcode_addGL(index)
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
                this.data_matching.statement[index].confirm_date = "";
                this.data_matching.statement[index].payment_type_bank = "";
                this.data_matching.statement[index].amount = "";

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
      for(let i = 0 ; i < this.data_matching.statement.length; i++){
      if(this.data_matching.statement[i].fee != ""){
        this.valid_fee = true;
        break
      }else{
        this.valid_fee = false;
      }
     }
    },
    parseDateIn(date) {
      return date ? moment(date).format("YYYY-MM-DD") : "";
    },
    checkInvoiceDate(){
      
      if(this.data_matching.invoice_no != []){
        for(let i = 0; i <  this.data_matching.invoice_no.length; i++){
          
          if(this.parseDateIn(this.data_matching.invoice_no[i].invoice_date) > this.rv_date){
            this.check_inv_date = false;
            this.msg = 'วันที่ตัดหนี้ต้องมากกว่า Invoice date (Invoice date วันที่ '+ this.parseDate(this.data_matching.invoice_no[i].invoice_date)+")" ;
            break
          }else{
            this.check_inv_date = true;
            this.msg = '';
          }
          
        }
      }
      //console.log(this.check_inv_date)
    },
    linkDate(date , status){
      if(this.data_matching.type == "CHQ"){
        if(status == "rv_date"){
          //this.data_matching.statement[0].confirm_date = date;
          for(let i = 0; i < this.data_matching.statement.length; i++){
            this.data_matching.statement[i].confirm_date = date;
          }
        }else{
          this.rv_date = date;
          for(let i = 0; i < this.data_matching.statement.length; i++){
            this.data_matching.statement[i].confirm_date = date;
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
          for( let i = 0; i < this.data_matching.invoice_no.length; i++){
            if(index == i){
              this.data_matching.invoice_no[index].receipt_number = data.receipt_number;
              this.data_matching.invoice_no[index].amount_after_vat = Number(data.amount_after_vat).toFixed(2);
              this.data_matching.invoice_no[index].aging = Number(data.aging).toFixed(2);
              this.data_matching.invoice_no[index].cn_number = data.cn_number;
              this.data_matching.invoice_no[index].receipt_date = data.incoming_receipt_date;
              this.data_matching.invoice_no[index].invoice_date = data.invoice_date;
            }
          }
          //console.log(select_invoice)
          //this.new_invoice_list = select_invoice  
        }
      });

      if(this.select_invoice.length > 0){
        for(let k = 0; k < this.select_invoice.length ;  k++ ){
          if(this.select_invoice[k] == invoice_no){
            this.check_invoice = false;
            //console.log("error invoice" , this.check_invoice)
            break
          }else{
            this.check_invoice = true;
            //console.log(this.check_invoice)
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
    },
    checkReceipt(){
      if(this.data_matching.invoice_no.length != 0){
        for(let i = 0; i < this.data_matching.invoice_no.length; i++ ){
          if(this.data_matching.invoice_no[0].receipt_number != ""){
            if(this.data_matching.invoice_no[i].receipt_number == ""){
              this.check_receipt = false;
              break;
            }else{
              this.check_receipt = true;
            }
          }else{
            if(this.data_matching.invoice_no[i].receipt_number != ""){
              this.check_receipt = false;
              break;
            }else{
              this.check_receipt = true;
            }
          }
        }
        
      }
    },
    //  แปลงเลข 30000.00 => 30,000.00
    convertNumber(item) {
      return Number(item).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    // end

    // เพิ่มแถวกรอกข้อมูลตาราง invoice
    addRowInvoice(invoice_no) {
      this.select_invoice.push(invoice_no)
      // console.log(this.customer_detail);
      var newItem = {
        invoice_no: "",
        receipt_number: "",
        amount_after_vat: "",
        aging: "",
        cn_number: "",
        receipt_date: "",
        invoice_date: "",
        checkbox_wht: false,
        checkbox_mail: false,
        temp_id: new Date().getTime(),
      };
      this.data_matching.invoice_no.push(newItem);
      // console.log(this.data_matching.invoice_no);
    },
    // ลบแถวกรอกข้อมูลตาราง invoice
    deleteRowInvoice(invoice_no , index) {
      let select_invoice_list = [];
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
      this.data_matching.invoice_no.splice(index, 1);
      this.data_matching.invoice_no.forEach((element) => {
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
      this.sum_amount = count_amount.toFixed(2);
      // console.log("ภาษี :", this.tax_base);
      this.checkReceipt();
    },
    // เพิ่มแถวกรอกข้อมูลตาราง Statement Transfer/Suspense
    addRowStatement(status) {
      if(status == 'chq'){
        this.valid_bank_check = false;
        this.valid_check_chq = false;
      }else{
        this.valid_bank_check = true;
        this.valid_check_chq = true;
      }
      this.valid_amount = false;
      this.valid_no = false;
      if (this.data_matching.statement[0].payment_type_bank == "BBL205") {
        this.data_matching.statement[0].code_bank = "BBL001";
      } else if (this.data_matching.statement[0].payment_type_bank == "BBL785") {
        this.data_matching.statement[0].code_bank = "BBL002";
      } else if (this.data_matching.statement[0].payment_type_bank == "BBL156") {
        this.data_matching.statement[0].code_bank = "BBL003";
      } else if (this.data_matching.statement[0].payment_type_bank == "BBL522") {
        this.data_matching.statement[0].code_bank = "BBL004";
      } else if (this.data_matching.statement[0].payment_type_bank == "BAY993") {
        this.data_matching.statement[0].code_bank = "BAY001";
      } else if (this.data_matching.statement[0].payment_type_bank == "BAY778") {
        this.data_matching.statement[0].code_bank = "BAY002";
      } else if (this.data_matching.statement[0].payment_type_bank == "BAY601") {
        this.data_matching.statement[0].code_bank = "BAY003";
      } else if (this.data_matching.statement[0].payment_type_bank == "BAY973") {
        this.data_matching.statement[0].code_bank = "BAY004";
      } else if (this.data_matching.statement[0].payment_type_bank == "BAY684") {
        this.data_matching.statement[0].code_bank = "BAY005";
      } else if (this.data_matching.statement[0].payment_type_bank == "CIMB854") {
        this.data_matching.statement[0].code_bank = "CIMB001";
      } else if (this.data_matching.statement[0].payment_type_bank == "CIMB745") {
        this.data_matching.statement[0].code_bank = "CIMB002";
      } else if (
        this.data_matching.statement[0].payment_type_bank == "Bill Payment - SCB"
      ) {
        this.data_matching.statement[0].code_bank = "SCB001";
      } else if (
        this.data_matching.statement[0].payment_type_bank == "Bill Payment - KBANK"
      ) {
        this.data_matching.statement[0].code_bank = "KBANK002";
      } else if (
        this.data_matching.statement[0].payment_type_bank == "Bill Payment - BBL"
      ) {
        this.data_matching.statement[0].code_bank = "BBL001";
      } else if (this.data_matching.statement[0].payment_type_bank == "GSB505") {
        this.data_matching.statement[0].code_bank = "GSB001";
      } else if (this.data_matching.statement[0].payment_type_bank == "GSB491") {
        this.data_matching.statement[0].code_bank = "GSB002";
      } else if (this.data_matching.statement[0].payment_type_bank == "KKP412") {
        this.data_matching.statement[0].code_bank = "KKP001";
      } else if (this.data_matching.statement[0].payment_type_bank == "KKP756") {
        this.data_matching.statement[0].code_bank = "KKP002";
      } else if (this.data_matching.statement[0].payment_type_bank == "KBANK579") {
        this.data_matching.statement[0].code_bank = "KBANK003";
      } else if (this.data_matching.statement[0].payment_type_bank == "KBANK861") {
        this.data_matching.statement[0].code_bank = "KBANK002";
      } else if (this.data_matching.statement[0].payment_type_bank == "KBANK035") {
        this.data_matching.statement[0].code_bank = "KBANK005";
      } else if (this.data_matching.statement[0].payment_type_bank == "KBANK199") {
        this.data_matching.statement[0].code_bank = "KBANK001";
      } else if (this.data_matching.statement[0].payment_type_bank == "KTB395") {
        this.data_matching.statement[0].code_bank = "KTB003";
      } else if (this.data_matching.statement[0].payment_type_bank == "KTB926") {
        this.data_matching.statement[0].code_bank = "KTB004";
      } else if (this.data_matching.statement[0].payment_type_bank == "KTB569") {
        this.data_matching.statement[0].code_bank = "KTB005";
      } else if (this.data_matching.statement[0].payment_type_bank == "KTB694") {
        this.data_matching.statement[0].code_bank = "KTB006";
      } else if (this.data_matching.statement[0].payment_type_bank == "KTB034") {
        this.data_matching.statement[0].code_bank = "KTB007";
      } else if (this.data_matching.statement[0].payment_type_bank == "KTB184") {
        this.data_matching.statement[0].code_bank = "KTB001";
      } else if (this.data_matching.statement[0].payment_type_bank == "KTB856") {
        this.data_matching.statement[0].code_bank = "KTB008";
      } else if (this.data_matching.statement[0].payment_type_bank == "KTB728") {
        this.data_matching.statement[0].code_bank = "KTB010";
      } else if (this.data_matching.statement[0].payment_type_bank == "SCB376") {
        this.data_matching.statement[0].code_bank = "SCB002";
      } else if (this.data_matching.statement[0].payment_type_bank == "SCB009") {
        this.data_matching.statement[0].code_bank = "SCB001";
      } else if (this.data_matching.statement[0].payment_type_bank == "SCB750") {
        this.data_matching.statement[0].code_bank = "SCB003";
      } else if (this.data_matching.statement[0].payment_type_bank == "SCB540") {
        this.data_matching.statement[0].code_bank = "SCB004";
      } else if (this.data_matching.statement[0].payment_type_bank == "TMB958") {
        this.data_matching.statement[0].code_bank = "TMB002";
      } else if (this.data_matching.statement[0].payment_type_bank == "TTB174") {
        this.data_matching.statement[0].code_bank = "TMB001";
      } else if (this.data_matching.statement[0].payment_type_bank == "TTB958") {
        this.data_matching.statement[0].code_bank = "TMB002";
      } else if (this.data_matching.statement[0].payment_type_bank == "TTB907") {
        this.data_matching.statement[0].code_bank = "TTB001";
      } else if (this.data_matching.statement[0].payment_type_bank == "TTB553") {
        this.data_matching.statement[0].code_bank = "TTB002";
      } else if (this.data_matching.statement[0].payment_type_bank == "TBANK064") {
        this.data_matching.statement[0].code_bank = "TBANK002";
      } else if (
        this.data_matching.statement[0].payment_type_bank == "CHQ" ||
        this.data_matching.statement[0].payment_type_bank == "FACTORING" ||
        this.data_matching.statement[0].payment_type_bank == "QR CODE"
      ) {
        this.data_matching.statement[0].code_bank = "";
      } else {
        this.data_matching.statement[0].code_bank = "";
      }

      this.data_matching.statement.push({
        type_debt: this.data_matching.statement[0].type_debt,
        confirm_date: this.data_matching.statement[0].confirm_date,
        payment_type_bank: this.data_matching.statement[0].payment_type_bank,
        code_bank: this.data_matching.statement[0].code_bank,
        statement_no: "",
        amount: "",
        sequence: "",
        sum_amounts: "",
        check_date: "",
        bank_check_list: "",
        chq_no: "",
        fee: "",
      });

      var count = 0;
      this.data_matching.statement.forEach((element) => {
        if (element.amount != "") {
          if(element.type_debt != "Suspense"){
            count += parseFloat(this.toNumber(element.amount));
          }
        }
      });
      let lenarr = this.data_matching.statement.length - 1;
      this.data_matching.statement[lenarr].sum_amounts = count;
      this.sum_amounts = count;
    },
    // ลบแถวกรอกข้อมูลตาราง Statement Transfer/Suspense
    deleteRowStatement(index) {
      this.data_matching.statement.splice(index, 1);
      let count = 0;
      this.data_matching.statement.forEach((element) => {
        if(element.type_debt != "Suspense"){
          if (element.amount) {
            count += parseFloat(this.toNumber(element.amount));
          }
        }
      });
      let legarr = this.data_matching.statement.length - 1;
      this.data_matching.statement[legarr].sum_amounts = count;
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
          this.check_mail_wht =true;
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
        this.status_mail_total = true
        // if(this.customer_email == ""){
        //   this.status_mail_total = false
        //   Swal.fire({
        //       icon: "error",
        //       title: "<h4>ไม่สามารถส่ง Request Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT ได้</h4>",
        //       html: "เนื่องจากไม่มี E-mail ลูกค้า",
        //       showConfirmButton: false,
        //       timer: 3000,
        //     });
        // }else{
        //   this.status_mail_total = true
        //   Swal.fire({
        //     icon: "success",
        //     title: "Success",
        //     text: "ส่ง Request Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT เรียบร้อยแล้ว",
        //     showConfirmButton: false,
        //     timer: 3000,
        //   });
        // }
      }
      // this.data_detail = []; 
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    async save(type) {
      this.saveData(type)
    },
    async saveData(type){
      this.finish = true;
      let status = "";
      var fee = [];
      var amounts = [];
      var confirm_dates = [];
      var bank_code = [];
      var request_mail = [];
      var request_mail_wht = [];
      var tax = "";
      if (this.data_matching.check_wht == true) {
            this.check_wht = true;
          }
          if (this.data_matching.check_mail == true) {
            this.check_mail = true;
          }
          if (type == "Pending") {
            if (
              this.data_matching.status_pending == "Mail" ||
              this.data_matching.status_pending == "Saved" ||
              this.data_matching.status_pending == "Reject" ||
              this.data_matching.status_pending == "Reversed"
            ) {
              status = "Saved";
            }
          } else if (type == "Matched") {
            status = "";
          }

          this.data_matching.invoice_no.forEach((element) => {
            //console.log("save",element)
            this.data_invoice.push({
              invoice_no: element.invoice_no,
              receipt_number: element.receipt_number,
              amount_after_vat: Number(element.amount_after_vat),
              aging: Number(element.aging.replace(/,/g , '')),
              cn_number: element.cn_number,
              receipt_date: new Date(element.receipt_date).toJSON(),
              checkbox_wht: element.checkbox_wht,
              checkbox_mail: element.checkbox_mail,
              invoice_date: new Date(element.invoice_date).toJSON()
            });
            if(element.checkbox_mail == true){
              request_mail.push({ data_mail:element})
            }
            
            if(element.checkbox_wht == true){
              request_mail_wht.push({ invoice_no: element });
            }
          });

          this.data_matching.add_gl.forEach((element) => {
            if (element.order_gl != "") {
              this.data_add_gl.push({
                order_gl: element.order_gl,
                add_gl: element.add_gl,
                add_amount: this.toNumber(element.add_amount),
                queue_no_gl: this.data_matching.queue_no,
              });
              /*
              if(element.order_gl == '01'){
                fee.push(element.add_amount.replace(/,/g , ''));
              }
              */
            }
            /*
            if(element.order_gl == '01'){
              fee += Number(element.add_amount)
            }else{
              fee += 0
            }
            */
          });
          // จัดการข้อมูลส่งไป update ตามประเภทที่เลือก
          if(this.data_matching.type == 'CHQ'){
            this.data_matching.statement.forEach((element, index) => {
            this.data_statement.push({
              type_debt: element.type_debt,
              check_date: new Date(element.check_date).toJSON(),
              confirm_date: new Date(element.confirm_date).toJSON(),
              bank_check_list: element.bank_check_list,
              chq_no: element.chq_no,
              payment_type_bank: element.payment_type_bank,
              code_bank: element.code_bank,
              statement_no: element.statement_no,
              fee : this.toNumber(element.fee),
              //amount: Number(element.amount),
              amount : this.toNumber(element.amount),
              sequence: index + 1,
              queue_no_statement: this.data_matching.queue_no,
            });
            confirm_dates.push(this.parseDate(element.confirm_date));
            if(element.amount != ''){
                  amounts.push(this.toNumber(element.amount));
                }else{
                  amounts.push(0);
                }
            bank_code.push(element.code_bank);
            fee.push(this.toNumber(element.fee));
          });
          }else{
            this.data_matching.statement.forEach((element, index) => {
            this.data_statement.push({
              type_debt: element.type_debt,
              confirm_date: new Date(element.confirm_date).toJSON(),
              payment_type_bank: element.payment_type_bank,
              code_bank: element.code_bank,
              statement_no: element.statement_no,
              fee : this.toNumber(element.fee),
              //amount: Number(element.amount),
              amount : this.toNumber(element.amount),
              sequence: index + 1,
              queue_no_statement: this.data_matching.queue_no,
            });
            confirm_dates.push(this.parseDate(element.confirm_date));
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
            for(let i = 0; i < this.data_matching.statement.length; i++){
              fee.push(0);
            }
          }

          // request mail ติดตาม wht && ยืนยันใบแจ้งหนี้
          if(this.status_mail_invoice == true){
            request_mail.forEach((element) => {
              //console.log(element.data_mail)
              this.data_detail.push({
                inv_no: element.data_mail.invoice_no,
                receipt_no: element.data_mail.receipt_number,
                receipt_date: new Date(element.data_mail.receipt_date).toJSON(),
                amount: amounts.join(","),
                cus_no: this.customer_no,
                cus_name: this.customer_name,
                mail_cus: this.customer_email,
                finance_ar: this.finance_name,
                sale_email: this.sale_email, //อีเมลเซล
                amount_vat: String(element.data_mail.amount_after_vat), //จำนวนเงินรวม Vat
                fee: fee.join(","), //ค่าธรรมเนียม
                bankcode: bank_code.join(','),
                confirm_date: confirm_dates.join(","),
                remark_mail: this.remark_mail,
                aging: element.data_mail.aging
              });
            });
          }else if(this.status_mail_wht == true){
            request_mail_wht.forEach((element) => {
              this.data_detail.push({
                inv_no: element.invoice_no.invoice_no,
                receipt_no: element.invoice_no.receipt_number,
                receipt_date: new Date(element.invoice_no.receipt_date).toJSON(),
                amount: amounts.join(","),
                cus_no: this.customer_no,
                cus_name: this.customer_name,
                mail_cus: this.customer_email,
                finance_ar: this.finance_name,
                sale_email: this.sale_email, //อีเมลเซล
                code: this.select_special_code,
                amount_vat: String(element.invoice_no.amount_after_vat), //จำนวนเงินรวม Vat
                fee: fee.join(","), //ค่าธรรมเนียม
                bankcode: bank_code.join(','),
                confirm_date: confirm_dates.join(","),
                remark_mail: this.remark_mail,
                aging: element.invoice_no.aging
              });
            });
          }
            
          // end request mail ติดตาม wht && ยืนยันใบแจ้งหนี้
          await this.getbase64Files();
          await this.getbase64FilesWHT();

          if(this.data_file.length > 0){
            this.status_file = true;
          }else{
            this.data_file = []
            this.status_file = false;
          }

          if(this.data_file_wht.length > 0){
            this.status_file_wht = true;
          } else {
            this.data_file_wht = []
            this.status_file_wht = false;
          }

          if(this.tax_base != 0){
            tax = Number(this.tax_base).toFixed(2);
          }else{
            tax = 0;
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
          
          var Datas = {
            request_mail: this.data_detail,
            statement: this.data_statement,
            sum_amounts: Number(this.sum_amounts), //ยอดรวมชำระ
            invoice_no: this.data_invoice, //ข้อมูลในตาราง invoice
            rv_date: new Date(this.rv_date).toJSON(), //วันที่ตัดหนี้
            sum_wht: Number(this.sum_wht), //ตาราง Sum คอลัม wht
            sum_balance: Number(
              Number(this.sum_amounts) +
                Number(this.sum_wht) +
                Number(this.sum_add_amount) -
                Number(this.new_sum_aging)
            ), //ตาราง Sum คอลัม Balance
            sum_add_amount: Number(this.sum_add_amount), //ตาราง Sum คอลัม Add. GL
            add_gl: this.data_add_gl, //ข้อมูลตาราง ADD GL
            sum_aging: Number(this.sum_aging), //ตาราง Sum ยอดที่ต้องชำระ
            sum_amount_after_vat: Number(this.sum_amount), //ตาราง Sum ยอดชำระ
            type_wht: this.WHT_list, //ประเภทเอกสาร wht
            file: this.data_file, //ไฟล์หลักฐาน
            file_wht: this.data_file_wht, //ไฟล์ wht
            remark: this.remark, //remark
            remark_erp:this.remark_erp,//remark_erp
            customer_no: this.customer_no, //customer no
            customer_name: this.customer_name, //customer name
            customer_email: this.customer_email, //customer email
            finance_name: this.finance_name, //ชื่อการเงิน
            sale_email: this.sale_email, //อีเมลเซล
            type: this.data_matching.type, //ประเภทการชำระ
            tax_base: Number(tax), //ฐานภาษี
            tax_code: this.tax_code, //รหัสภาษีหัก ณ ที่จ่าย
            special_code: this.select_special_code, //รหัสพิเศษ
            evidence_reporting: this.evidence_reporting,
            status_file: this.status_file, //ค่า true false เวลามีการเลือกไฟล์หลักฐาน
            status_file_wht: this.status_file_wht, //ค่า true false เวลามีการเลือกไฟล์ wht
            status: type, //status
            check_mail: this.check_mail,
            check_wht: this.check_wht,
            //ส่งค่ากลับไปเหมือนเดิม
            // chq_no: this.data_matching.chq_no,
            action_by_account_id: this.data_matching.action_by_account_id,
            action_by_name: this.data_matching.action_by_name,
            action_date: this.data_matching.action_date,
            email_date: this.data_matching.email_date,
            queue_no: this.data_matching.queue_no,
            reject_date: this.data_matching.reject_date,
            saved_date: this.data_matching.saved_date,
            status_pending: status,
            document_no: this.data_matching.document_no,
            status_mail_invoice: this.status_mail_invoice, //Mail ยืนยันใบแจ้งหนี้
            status_mail_wht: this.status_mail_wht, //Mail ติดตาม WHT
            status_mail_total: this.status_mail_total, //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
            status_total: this.data_matching.status_total,
            que_inv_rpa: this.data_matching.que_inv_rpa,
            request_day: this.data_matching.request_day,
            request_day_cront: this.data_matching.request_day_cront,
            check_mail_wht: this.data_matching.check_mail_wht,
            check_mail_invoice: this.data_matching.check_mail_invoice,
            que_total_rpa: this.data_matching.que_total_rpa,
            que_wht_rpa: this.data_matching.que_wht_rpa,
            remark_rejected: this.data_matching.remark_rejected,
            remark_reversed: this.data_matching.remark_reversed
          };
          //console.log(Datas);
          
          if(this.data_matching.status_pending == 'Reject'){
            //console.log("Reject");
            await this.axios
            .put(
              process.env.VUE_APP_API +
                "/statement/reject/" +
                this.data_matching.queue_no,
              Datas,
              headers
            )
            .then((response) => {
              this.finish = false;
              if(response.status == 200){
                Swal.fire({
                icon: "success",
                title: "บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              }
            })
            .catch((error) => {
              if(error){
                this.finish = false;
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถบันทึกข้อมูลที่แก้ไขได้",
                  text: "เนื่องจาก"+" "+error.response.data.msg,
                  showConfirmButton: false,
                  timer: 4000,
                });
              }
            });
          }else if(this.data_matching.status_pending == 'Reversed'){
            await this.axios
            .put(
              process.env.VUE_APP_API +
                "/statement/update/" +
                this.data_matching.queue_no,
              Datas,
              headers
            )
            .then((response) => {
              if(response.status == 200){
                this.finish = false;
                Swal.fire({
                icon: "success",
                title: "บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              }
            })
            .catch((error) => {
              if(error){
                this.finish = false;
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถบันทึกข้อมูลที่แก้ไขได้",
                  text: "เนื่องจาก"+" "+error.response.data.msg,
                  showConfirmButton: false,
                  timer: 4000,
                });
              }
            });
          }
          else{
            //console.log("Mail , Saved");
            await this.axios
            .put(
              process.env.VUE_APP_API +
                "/statement/update/" +
                this.data_matching.queue_no,
              Datas,
              headers
            )
            .then((response) => {
              if(response.status == 200){
                this.finish = false;
                Swal.fire({
                icon: "success",
                title: "บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              }
            })
            .catch((error) => {
              if(error){
                this.finish = false;
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถบันทึกข้อมูลที่แก้ไขได้",
                  text: "เนื่องจาก"+" "+error.response.data.msg,
                  showConfirmButton: false,
                  timer: 4000,
                });
              }
            });
          }
          
          /*
          await this.axios
            .put(
              process.env.VUE_APP_API +
                "/statement/update/" +
                this.data_matching.queue_no,
              Datas,
              headers
            )
            .then((response) => {
              if(response.status == 200){
                Swal.fire({
                icon: "success",
                title: "บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              }
            })
            .catch((error) => {
              if(error){
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถบันทึกข้อมูลที่แก้ไขได้",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });
            */
          this.matching_dialog = false;
          this.$emit("edit_dialog");
          this.$refs.form.reset();
          //this.$refs.formfile.reset();
          this.check_invoice = true;
          this.remark_mail = '',
          this.check_req_mail = false;
          this.check_req_mail_WHT = false;
          this.valid = false;
          this.valid_no = false;
          this.valid_check_chq = true;
          this.check_code = false,
          this.valid_bank_check = true;
          this.valid_amount = false;
          this.valid_fee = false;
          this.select_invoice = [];
          this.invoice_list = [];
          this.data_customer = [];
          this.data_statement = [];
          this.data_invoice = [];
          this.set_file = [];
          this.set_file_wht = [];
          this.data_add_gl = [];
          this.files_wht = [];
          this.files = [];
          this.data_file = [];
          this.data_file_wht = [];
          this.data_detail = [];
          this.data_mail = [];
          this.data_wht = [];
          this.datacheckwht = [];
          this.link_bankcode = [];
          this.WHT_list = "";
          this.select_special_code = "";
          this.evidence_reporting = "";
          this.tax_code = "";
          this.tax_base = "";
          this.bank_check_list = "";
          this.customer_no = "";
          this.customer_name = "";
          this.customer_email = "";
          this.finance_name = "";
          this.sale_email = "";
          this.checkall_mail = false;
          this.checkall_wht = false;
          this.check_mail = false;
          this.check_wht = false;
          this.check_mail_invoice = false,
          this.check_mail_wht = false,
          this.check_inv_date =true;
          this.status_mail_invoice = false, //Mail ยืนยันใบแจ้งหนี้
          this.status_mail_wht = false, //Mail ติดตาม WHT
          this.status_mail_total= false; //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
          //this.data_matching.invoice_no = [];
    },
    async clear(){
        this.finish = true;
        let data_invoice = [];
        let headers = {
            headers: {
              Authorization:
                "Bearer " +
                localStorage.getItem("acces_token") +
                "," +
                localStorage.getItem("secret"),
            },
          };

          this.data_matching.invoice_no.forEach((element) => {
            data_invoice.push({
              invoice_no: element.invoice_no,
            });
          });

          var Datas = {
            invoice_no: data_invoice
          }

          await this.axios
            .put(
              process.env.VUE_APP_API +
                "/statement/clear/" +
                this.data_matching.queue_no,
              Datas,
              headers
            )
            .then((response) => {
              this.finish = false;
              if(response.status == 200){
                Swal.fire({
                icon: "success",
                title: "บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              }
            })
            .catch((error) => {
              if(error){
                this.finish = false;
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถบันทึกข้อมูลที่แก้ไขได้",
                  text: "เนื่องจาก"+" "+error.response.data.msg,
                  showConfirmButton: false,
                  timer: 4000,
                });
              }
            });

          this.matching_dialog = false;
          this.$emit("edit_dialog");
          this.$refs.form.reset();
          //this.$refs.formfile.reset();
          this.check_invoice = true;
          this.remark_mail = '',
          this.check_req_mail = false;
          this.check_req_mail_WHT = false;
          this.valid = false;
          this.valid_no = false;
          this.valid_check_chq = true;
          this.check_code = false,
          this.valid_bank_check = true;
          this.valid_amount = false;
          this.valid_fee = false;
          this.select_invoice = [];
          this.invoice_list = [];
          this.data_customer = [];
          this.data_statement = [];
          this.data_invoice = [];
          this.set_file = [];
          this.set_file_wht = [];
          this.data_add_gl = [];
          this.files_wht = [];
          this.files = [];
          this.data_file = [];
          this.data_file_wht = [];
          this.data_detail = [];
          this.data_mail = [];
          this.data_wht = [];
          this.datacheckwht = [];
          this.link_bankcode = [];
          this.WHT_list = "";
          this.select_special_code = "";
          this.evidence_reporting = "";
          this.tax_code = "";
          this.tax_base = "";
          this.bank_check_list = "";
          this.customer_no = "";
          this.customer_name = "";
          this.customer_email = "";
          this.finance_name = "";
          this.sale_email = "";
          this.checkall_mail = false;
          this.checkall_wht = false;
          this.check_mail = false;
          this.check_wht = false;
          this.check_mail_invoice = false,
          this.check_mail_wht = false,
          this.check_inv_date =true;
          this.status_mail_invoice = false, //Mail ยืนยันใบแจ้งหนี้
          this.status_mail_wht = false, //Mail ติดตาม WHT
          this.status_mail_total= false; //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
          //this.data_matching.invoice_no = [];
    },
    closeMatching() {
      this.$refs.form.reset();
      // this.$emit("edit_dialog");
      //this.$refs.formfile.reset();
      this.matching_dialog = false;
      this.check_invoice = true;
      this.remark_mail = '',
      this.check_req_mail = false;
      this.check_req_mail_WHT = false;
      this.valid = false;
      this.valid_no = false;
      this.valid_check_chq = true;
      this.valid_bank_check = true;
      this.valid_amount = false;
      this.valid_fee = false;
      this.check_code = false,
      this.link_bankcode =[];
      this.select_invoice = [];
      this.invoice_list = [];
      this.data_customer = [];
      this.data_statement = [];
      this.data_invoice = [];
      this.data_add_gl = [];
      this.files_wht = [];
      this.files = [];
      this.set_file = [];
      this.set_file_wht = [];
      this.data_file = [];
      this.data_file_wht = [];
      this.data_detail = [];
      this.data_mail = [];
      this.data_wht = [];
      this.datacheckwht = [];
      this.WHT_list = "";
      this.select_special_code = "";
      this.evidence_reporting = "";
      this.tax_code = "";
      this.tax_base = "";
      this.bank_check_list = "";
      this.customer_no = "";
      this.customer_name = "";
      this.customer_email = "";
      this.finance_name = "";
      this.sale_email = "";
      this.checkall_mail = false;
      this.checkall_wht = false;
      this.check_mail = false;
      this.check_wht = false;
      this.check_mail_invoice = false,
      this.check_mail_wht = false,
      this.check_inv_date =true;
      this.status_mail_invoice = false, //Mail ยืนยันใบแจ้งหนี้
      this.status_mail_wht = false, //Mail ติดตาม WHT
      this.status_mail_total= false; //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
      //this.data_matching.invoice_no = [];
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
  padding-left: 0px;
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
.align-right-input input {
  text-align: right;
}
.align-center-input input {
  text-align: center;
}
.v-label theme--light {
  color: #ffffff !important;
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
td.sequence-trc{
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
  width: 104% !important;
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
  background-color: #D6EEEE;
}
#matching{
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
}
div#payment {
  width: 105% !important;
}
#payment{
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
    padding-inline: 10px;
    padding-bottom: 5px;
    font-size: 14px !important;
  }
}

#invoice-list{
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
#addgl{
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
    padding-inline: 10px;
    padding-bottom: 5px;
    font-size: 14px !important;
  }
}
#special-code-list{
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
    padding-inline: 10px;
    padding-bottom: 8px;
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
