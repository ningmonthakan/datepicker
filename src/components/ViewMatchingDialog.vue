<template>
  <div class="text-center">
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
    <v-dialog
      width="110%"
      scrollable
      :value="matching_dialog"
      style="z-index:1015"
    >
      <v-card>
        <v-card-title
          v-if="this.matched_success == 'Matched'"
          class="text-h5"
          style="background-color: #035891"
        >
          <span
            class="text-h6"
            style="
                color: white;
                font-family: 'Bai_Jamjuree' !important;
            "
            >Matched : {{data_test.document_no}}</span
          >
          <v-spacer></v-spacer>
          <v-btn icon dark @click="close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-title v-else class="text-h5" style="background-color: #035891">
          <span
            class="text-h6"
            style="
                color: white;
                font-family: 'Bai_Jamjuree' !important;
            "
            >Success : {{data_test.document_no}}</span
          >
          <v-spacer></v-spacer>
          <v-btn icon dark @click="matching_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="7" sm="7" md="7" style="font-size: 16px">
                <span class="font-weight-bold">ประเภทการชำระ : </span
                >{{ data_test.type }}<br /><br />
                <span class="font-weight-bold"> Customer No. : </span>
                {{ customer_no }} <br />
                <br />
                <span class="font-weight-bold"> Customer Name : </span>
                {{ customer_name }}
              </v-col>
              <v-col cols="5" sm="5" md="5">
                <div
                  class="d-flex pt-4"
                  style="width:auto; align-content: left;"
                >
                  <div
                    style="width: 65px; font-size: 14px; color:black; font-family:'Bai_Jamjuree'"
                  >
                    หลักฐาน :
                  </div>
                  <v-btn
                    v-if="
                      role_status == 'super_admin' &&
                        matched_success == 'Matched'
                    "
                    color="rgb(103, 194, 93)"
                    class="mt-n2"
                    depressed
                    dark
                    @click="upload_File_Dialog = true"
                  >
                    ดูไฟล์หลักฐานแนบ
                  </v-btn>
                  <!-- open_file_dialog(data_test.queue_no,'file') -->

                  <v-btn
                    v-else
                    color="rgb(103, 194, 93)"
                    class="mt-n2"
                    depressed
                    dark
                    @click="open_file_dialog(data_test.queue_no, 'file')"
                  >
                    ดูไฟล์หลักฐานแนบ
                  </v-btn>
                </div>
                <div class="d-flex mt-3" style="width:auto;">
                  <div
                    style="width: 100px; font-size: 14px; color:black; font-family: 'Bai_Jamjuree'; padding-top: 10px"
                  >
                    เอกสาร WHT :
                  </div>
                  <select
                    v-if="this.matched_success == 'Matched'"
                    disabled
                    id="selectWHT"
                    class="style-chooser form-control"
                    v-model="data_test.type_wht"
                    required="required"
                    style="width: 50px; height:40px; font-size: 14px; font-family: 'Bai_Jamjuree';margin-right:20px; text-align:center;"
                  >
                    <option></option>
                    <option label="0" value="0">0</option>
                    <option label="1" value="1">1</option>
                  </select>
                  <select
                    v-else
                    id="selectWHT"
                    class="style-chooser form-control"
                    v-model="data_test.type_wht"
                    @change="dialogUpdate = true"
                    required="required"
                    style="width: 50px; height:40px; font-size: 14px; font-family: 'Bai_Jamjuree';margin-right:20px; text-align:center;"
                  >
                    <option></option>
                    <option label="0" value="0">0</option>
                    <option label="1" value="1">1</option>
                  </select>
                  <v-btn
                    color="rgb(103, 194, 93)"
                    v-if="
                      role_status == 'super_admin' &&
                        matched_success == 'Matched'
                    "
                    depressed
                    dark
                    @click="upload_File_WHT_Dialog = true"
                  >
                    ดูเอกสาร WHT แนบ
                  </v-btn>
                  <!-- @click="open_file_dialog(data_test.queue_no,'wht')" -->

                  <v-btn
                    color="rgb(103, 194, 93)"
                    v-else
                    depressed
                    dark
                    @click="open_file_dialog(data_test.queue_no, 'wht')"
                  >
                    ดูเอกสาร WHT แนบ
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7" sm="7" md="7">
                <table style="width: 100%" id="customers">
                  <tr>
                    <!-- <th
                      v-for="(item, index) in headers_matching_detail"
                      :key="index"
                      class="invoice-header pa-2"
                    >
                      {{ item.text }}
                    </th> -->
                    <th class="invoice-header">Mail</th>
                    <th class="invoice-header">WHT</th>
                    <th class="invoice-header">Invoice No.</th>
                    <th class="invoice-header">Invoice Date.</th>
                    <th class="invoice-header">Receipt No.</th>
                    <th class="invoice-header">Amount</th>
                    <th class="invoice-header">ยอดที่ต้องการตัดหนี้</th>
                  </tr>
                  <tr
                    v-for="(item, index) in data_test.invoice_no"
                    :key="'invoice' + index"
                  >
                    <!-- checkbox email -->
                    <td class="invoice-header-data">
                      <v-checkbox
                        class="ml-2"
                        disabled
                        v-model="item.checkbox_mail"
                      ></v-checkbox>
                    </td>
                    <!-- checkbox wht -->
                    <td class="invoice-header-data">
                      <v-checkbox
                        class="ml-2"
                        disabled
                        v-model="item.checkbox_wht"
                      ></v-checkbox>
                    </td>
                    <td class="invoice-header-data" style="width: 18%;">
                      <div style="text-align:center">{{ item.invoice_no }}</div>
                    </td>
                    <td class="invoice-header-data" style="width: 18%;">
                      <div style="text-align:center">
                        {{ parseDate(item.invoice_date) }}
                      </div>
                    </td>
                    <td class="invoice-header-data" style="width: 20%;">
                      <div style="text-align:center">
                        {{ item.receipt_number }}
                      </div>
                    </td>
                    <td class="invoice-header-data" style="width: 13%;">
                      <div style="text-align:right">
                        {{ convertNumber(item.amount_after_vat) }}
                      </div>
                    </td>
                    <td class="invoice-header-data">
                      <div style="text-align:right">
                        {{ convertNumber(item.aging) }}
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="invoice-header-data"
                    style="background-color:#B3E5FC"
                  >
                    <td class="invoice-header-data"></td>
                    <td class="invoice-header-data"></td>
                    <td class="pa-2 invoice-header-data">
                      <div style="text-align:center">
                        <strong>Total</strong>
                      </div>
                    </td>
                    <td class="invoice-header-data"></td>
                    <td class="invoice-header-data"></td>
                    <td class="invoice-header-data" style="text-align: center;">
                      <div style="text-align:right">
                        <strong style="text-align:right">
                          {{
                            convertNumber(data_test.sum_amount_after_vat)
                          }}</strong
                        >
                      </div>
                    </td>
                    <td
                      class="invoice-header-data"
                      style="text-align: left; padding-left:10px"
                    >
                      <div style="text-align:right">
                        <strong>{{
                          convertNumber(data_test.sum_aging)
                        }}</strong>
                      </div>
                    </td>
                  </tr>
                </table>
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
                          :key="'detail' + index"
                        >
                          <td>
                            {{ header.text }}
                          </td>
                          <td>
                            <!-- {{ items[header.value] }} -->
                            <div
                              v-if="header.value == 'evidence_reporting'"
                              class="pa-1"
                            >
                              <select
                                v-model="data_test.evidence_reporting"
                                disabled
                                style="
                                border: 1px solid #e0e0e0;
                                border-radius: 1px;
                                width: 104%;
                                height: 40px;
                                padding-right: 10px;
                                text-align:right;
                              "
                              >
                                <option></option>
                                <option value=""></option>
                                <option value="Mail">Mail</option>
                                <option value="Mail-Confirm"
                                  >Mail-Confirm</option
                                >
                                <option value="QR-Code">QR-Code</option>
                                <option value="Statement">Statement</option>
                                <option value="Suspense">Suspense</option>
                                <option value="Online">Online</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Waroom">Waroom</option>
                                <option value="BPM">BPM</option>
                                <option value="CHQ">CHQ</option>
                                <option value="เงินสด">เงินสด</option>
                              </select>
                            </div>
                            <div
                              v-if="header.value == 'special_code'"
                              class="pa-1"
                            >
                              <select
                                v-model="data_test.special_code"
                                disabled
                                style="
                                border: 1px solid #e0e0e0;
                                border-radius: 1px;
                                width: 104%;
                                height: 40px;
                                padding-right: 10px;
                                text-align:right;
                              "
                              >
                                <option></option>
                                <option value="[blank]">[blank]</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                              </select>
                              <!-- {{ items.special_code }} -->
                            </div>
                            <div v-if="header.value == 'rv_date'" class="pa-1">
                              <input
                                style="text-align: right;"
                                disabled
                                class="form-control-statement"
                                type="text"
                                placeholder="dd/mm/yyyy"
                                v-model="rv_date"
                              />
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
                    v-for="(items, index) in data_test.statement"
                    :key="'ts' + index"
                  > -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class="pa-0 "
                    v-for="(items, index) in data_test.statement"
                    :key="'ts' + index"
                    id="statement"
                  >
                    <v-data-table
                      v-if="
                        data_test.type == 'Transfer' ||
                          data_test.type == 'Suspense'
                      "
                      hide-default-footer
                      class="mb-0"
                    >
                      <template v-slot:body="{}">
                        <tbody>
                          <tr>
                            <td rowspan="7" class="sequence-trc">
                              {{ items.sequence }}
                            </td>
                            <td class="coltitle">ประเภทการตัดหนี้</td>
                            <td class="colinputdata">
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  disabled
                                  v-model="items.type_debt"
                                  type="text"
                                  placeholder="ประเภทการตัดหนี้"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle">วันที่ชำระ</td>
                            <td class="colinputdata">
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  type="text"
                                  disabled
                                  class="form-control-statement"
                                  :value="parseDate(items.confirm_date)"
                                  placeholder="dd/mm/yyyy"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle">เลขที่บัญชีธนาคาร</td>
                            <td class="colinputdata">
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  disabled
                                  v-model="items.payment_type_bank"
                                  type="text"
                                  placeholder="ช่องทางการชำระ"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle">Bank Code</td>
                            <td class="colinputdata">
                              <div class="pt-1 pb-1">
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
                            <td
                              class="colinputdata"
                              v-if="
                                role_status == 'super_admin' &&
                                  matched_success != 'Matched'
                              "
                            >
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  v-model="items.statement_no"
                                  type="text"
                                  @change="dialogUpdate = true"
                                  placeholder="กรอกข้อความ"
                                />
                              </div>
                            </td>
                            <td class="colinputdata" v-else>
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  v-model="items.statement_no"
                                  type="text"
                                  disabled
                                  placeholder="กรอกข้อความ"
                                />
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
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  :value="convertNumber(items.amount)"
                                  disabled
                                />
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
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  :value="convertNumber(items.fee)"
                                  disabled
                                />
                              </div>
                            </td>
                          </tr>
                          <tr
                            class="sum-amount"
                            v-if="index == data_test.statement.length - 1"
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
                                convertNumber(items.sum_amounts)
                              }}</label>
                            </td>
                            <!-- <td></td> -->
                          </tr>
                        </tbody>
                      </template>
                    </v-data-table>
                  </v-col>
                  <!-- </v-row> -->
                  <!----------------- End ----------------->
                  <!----------------- Table Statement CHQ----------------->
                  <!-- <v-row
                    v-for="(items, index) in data_test.statement"
                    :key="'chq' + index"
                  > -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class="pa-0"
                    v-for="(items, index) in data_test.statement"
                    :key="'chq' + index"
                    id="statement"
                  >
                    <v-data-table
                      v-if="data_test.type == 'CHQ'"
                      hide-default-footer
                      class="mb-0"
                    >
                      <template v-slot:body="{}">
                        <tbody>
                          <tr>
                            <td rowspan="10" class="sequence-trc">
                              {{ items.sequence }}
                            </td>
                            <td class="coltitle">ประเภทการตัดหนี้</td>
                            <td class="colinputdata">
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  disabled
                                  v-model="items.type_debt"
                                  type="text"
                                  placeholder="ประเภทการตัดหนี้"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">วันที่หน้าเช็ค</td>
                            <td class="colinputdata_chq">
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  type="text"
                                  :value="parseDate(items.check_date)"
                                  disabled
                                  placeholder="dd/mm/yyyy"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">วันที่รับเช็ค</td>
                            <td class="colinputdata_chq">
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  type="text"
                                  class="form-control-statement"
                                  disabled
                                  :value="parseDate(items.confirm_date)"
                                  placeholder="dd/mm/yyyy"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">ธนาคารเช็ค</td>
                            <td class="colinputdata_chq">
                              <div class="pt-1 pb-1">
                                <select
                                  v-model="items.bank_check_list"
                                  disabled
                                  style="
                                border: 1px solid #e0e0e0;
                                border-radius: 1px;
                                width: 104%;
                                height: 40px;
                                padding-right: 10px;
                                font-size:14px;
                                text-align: right;
                              "
                                >
                                  <option></option>
                                  <option value="[blank]">[blank]</option>
                                  <option value="AMERICA"
                                    >Bank of America,N.A (ธนาคารอเมริกา) -
                                    AMERICA</option
                                  >
                                  <option value="BAAC"
                                    >ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร -
                                    BAAC</option
                                  >
                                  <option value="BAY"
                                    >ธนาคารกรุงศรีอยุธยา - BAY</option
                                  >
                                  <option value="BBL"
                                    >ธนาคารกรุงเทพ - BBL</option
                                  >
                                  <option value="BNP"
                                    >ธนาคารบีเอ็นพี พารีบาส์ - BNP</option
                                  >
                                  <option value="CIMB"
                                    >ธนาคารซีไอเอ็มบีไทย - CIMB</option
                                  >
                                  <option value="CITI"
                                    >ธนาคารซิตี้แบงค์ - CITI</option
                                  >
                                  <option value="Deutsche"
                                    >ธนาคารดอยซ์แบงค์ - Deutsche</option
                                  >
                                  <option value="EXIM"
                                    >ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย
                                    - EXIM</option
                                  >
                                  <option value="GHBANK"
                                    >ธนาคารอาคารสงเคราะห์ - GHBANK</option
                                  >
                                  <option value="GOV"
                                    >ธนาคารอิสลามแห่งประเทศไทย - GOV</option
                                  >
                                  <option value="GSB"
                                    >ธนาคารออมสิน - GSB</option
                                  >
                                  <option value="HSBC"
                                    >ธนาคารฮ่องกงและเซี่ยงไฮ้แบงกิ้งคอร์ปอเรชั่น
                                    - HSBC</option
                                  >
                                  <option value="ICBC"
                                    >ธนาคารไอซีบีซี - ICBC</option
                                  >
                                  <option value="J.P.MORGAN"
                                    >JP Morgan Chase Bank</option
                                  >
                                  <option value="KBANK"
                                    >ธนาคารกสิกรไทย - KBANK</option
                                  >
                                  <option value="KKB"
                                    >ธนาคารเกียรตินาคิน - KKB</option
                                  >
                                  <option value="KTB"
                                    >ธนาคารกรุงไทย - KTB</option
                                  >
                                  <option value="LHBANK"
                                    >ธนาคารแลนด์ แอนด์ เฮ้าส์ - LHBANK</option
                                  >
                                  <option value="MIZUHO"
                                    >ธนาคารมิซูโฮ คอร์เปเรต - MIZUHO</option
                                  >
                                  <option value="SCB"
                                    >ธนาคารไทยพาณิชย์ - SCB</option
                                  >
                                  <option value="StandardChartered"
                                    >ธนาคารสแตนดาร์ดชาร์เตอร์ด ไทย -
                                    StandardChartered</option
                                  >
                                  <option value="Sumitomo"
                                    >ธนาคารซูมิโตโม มิตซุย แบงกิ้ง คอร์ปอเรชั่น
                                    - Sumitomo</option
                                  >
                                  <option value="TANACHART"
                                    >ธนาคารธนชาต - TANACHART</option
                                  >
                                  <option value="TCRB"
                                    >ธนาคารไทยเครดิตเพื่อรายย่อย - TCRB</option
                                  >
                                  <option value="TISCO"
                                    >ธนาคารทิสโก้ - TISCO</option
                                  >
                                  <option value="TMB"
                                    >ธนาคารทหารไทย - TMB</option
                                  >
                                  <option value="TTB"
                                    >ธนาคารทหารไทยธนชาต - TTB</option
                                  >
                                  <option value="UOB"
                                    >ธนาคารยูโอบี - UOB</option
                                  >
                                </select>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">CHQ No</td>
                            <td class="colinputdata_chq">
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  type="text"
                                  v-model="items.chq_no"
                                  disabled
                                  placeholder="กรอกตัวเลข"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">เลขที่บัญชีธนาคาร</td>
                            <td class="colinputdata_chq">
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  v-model="items.payment_type_bank"
                                  disabled
                                  type="text"
                                  placeholder="ช่องทางการชำระ"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="coltitle_chq">Bank Code</td>
                            <td class="colinputdata_chq">
                              <div class="pt-1 pb-1">
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
                            <td class="coltitle_chq">Statement No</td>
                            <td
                              class="colinputdata_chq"
                              v-if="
                                role_status == 'super_admin' &&
                                  matched_success != 'Matched'
                              "
                            >
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  v-model="items.statement_no"
                                  @change="dialogUpdate = true"
                                  type="text"
                                  placeholder="กรอกข้อความ"
                                />
                              </div>
                            </td>
                            <td class="colinputdata_chq" v-else>
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  v-model="items.statement_no"
                                  type="text"
                                  disabled
                                  placeholder="กรอกข้อความ"
                                />
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
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  :value="convertNumber(items.amount)"
                                  disabled
                                />
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
                              <div class="pt-1 pb-1">
                                <input
                                  style="text-align: right;"
                                  class="form-control-statement"
                                  :value="convertNumber(items.fee)"
                                  disabled
                                />
                              </div>
                            </td>
                          </tr>
                          <tr
                            class="sum-amount"
                            v-if="index == data_test.statement.length - 1"
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
                                convertNumber(items.sum_amounts)
                              }}</label>
                            </td>
                            <!-- <td></td> -->
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
                          :key="'wht' + index"
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
                                :value="convertNumber(data_test.tax_base)"
                              />
                            </div>
                            <div class="pa-1" v-if="header.value == 'tax_code'">
                              <select
                                disabled
                                v-model="data_test.tax_code"
                                style="
                                border: 1px solid #e0e0e0;
                                border-radius: 1px;
                                width: 104%;
                                height: 40px;
                                padding-right: 10px;
                                text-align: right;
                              "
                              >
                                <option></option>
                                <option value="[blank]">[blank]</option>
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
                            </div>
                            <div class="pa-1" v-if="header.value == 'sum_wht'">
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="convertNumber(data_test.sum_wht)"
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
                  <table style="width: 100%" class="mb-6">
                    <tr>
                      <th
                        v-for="(item, index) in headers_addgl_table"
                        :key="'tableag' + index"
                        class="invoice-header pa-2"
                      >
                        {{ item.text }}
                      </th>
                    </tr>
                    <tr
                      v-for="(items, index) in data_test.add_gl"
                      :key="'ag' + index"
                    >
                      <td style="width:20%;" class="pl-1 pr-1 ma-0">
                        <!-- <v-select
                          disabled
                          class="mt-n4 mb-n5 text-md-center"
                          item-text="id"
                          :items="add_gl"
                          v-model="items.order_gl"
                          style="align-items: center;"
                          >
                          <template v-slot:selection="{ item }">
                            <span class="d-flex justify-center" style="width: 100%;">
                              {{ item.id }}
                            </span>
                         </template>
                        </v-select> -->
                        <input
                          style="text-align: right; padding-right: 10px; border-radius: 0px;"
                          disabled
                          class="table-invoice-input"
                          v-model="items.order_gl"
                        />
                      </td>
                      <td style="width:55%;" class="pl-1 pr-1 ma-0">
                        <!-- <v-select
                          disabled
                          class="mt-n4 mb-n5"
                          style="width:250px"
                          item-text="text"
                          :items="add_gl"
                          v-model="items.add_gl"
                        >
                        </v-select> -->
                        <input
                          style="text-align: right; padding-right: 10px; border-radius: 0px;"
                          disabled
                          class="table-invoice-input"
                          v-model="items.add_gl"
                        />
                      </td>
                      <td style="width:25%;" class="pl-1 pr-1 ma-0">
                        <input
                          style="text-align: right; padding-right: 10px; border-radius: 0px;"
                          disabled
                          placeholder="กรอกจำนวนเงิน"
                          class="table-invoice-input"
                          :value="convertNumber(items.add_amount)"
                        />
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
                        {{ convertNumber(data_test.sum_add_amount) }}
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
                          :key="'sum' + index"
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
                                :value="convertNumber(data_test.sum_wht)"
                              />
                            </div>
                            <div class="pa-1" v-if="header.value == 'sum_add'">
                              <!-- {{ sum_add_amount }} -->
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="convertNumber(data_test.sum_add_amount)"
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
                                :value="convertNumber(data_test.sum_aging)"
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
                                :value="convertNumber(data_test.sum_amounts)"
                              />
                            </div>
                            <div
                              class="pa-1"
                              v-if="header.value == 'sum_balance'"
                            >
                              <input
                                disabled
                                style="text-align: right;"
                                class="form-control-statement"
                                :value="convertNumber(data_test.sum_balance)"
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
                    v-model="data_test.remark"
                    rows="1"
                    max-rows="900"
                    disabled
                    style="border-radius: 0px; margin-bottom:16px;"
                  ></b-textarea>

                  <b-textarea
                    placeholder="Remark ERP :"
                    v-model="data_test.remark_erp"
                    rows="1"
                    max-rows="900"
                    disabled
                    style="border-radius: 0px; font-weight: bold; font-size: 18px; color: red;"
                    
                  ></b-textarea>
                  </div>
             
                  <!----------------- End ----------------->
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <div v-if="this.matched_success == 'Matched'">
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <!--<v-btn color="error" @click="save('Reject',data_test)" outlined>
              Reject
            </v-btn>-->

            <v-btn color="error" @click="modal_reject = true" outlined>
              Reject
            </v-btn>

            <v-btn
              :disabled="role_status != 'super_admin'"
              color="green"
              @click="save('Approve', data_test)"
              outlined
            >
              Approve
            </v-btn>
          </v-card-actions>
        </div>

        <div v-if="this.matched_success == 'Success'">
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#2962FF" outlined :disabled="status_rv_number == true" @click="ReturnToPending(data_test)">
              Return To 
              <br>
              Pending 
            </v-btn>
             <v-btn color="#FFC000" outlined :disabled="status_rv_number == true" @click="ReturnToMatched(data_test)" >
              Return To 
              <br>
              Matched
            </v-btn>

            <v-btn color="error" :disabled="status_rv_number == false" @click="open_reversed()" outlined>
              Reversed
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUpdate"
      max-width="550px"
      style="z-index: 1002 !important"
    >
      <v-card class="pa-5">
        <v-card-title
          class="text-h5"
          style="
            justify-content: center;
            font-family: 'Bai_Jamjuree' !important;
          "
          >คุณแน่ใจหรือไม่ว่าต้องการแก้ไขรายการนี้ ?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel_WHT()">Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            dark
            @click="update('Approve', data_test)"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="modal_reject" width="600">
      <v-card>
        <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #035891"
        >
          ยืนยันการกด Reject
        </v-card-title>
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
              v-model="remark_reject"
              :rules="[(v) => !!v || 'กรุณากรอก Remark']"
              :error="remark_reject == ''"
              dense
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
            @click="(modal_reject = false), (remark_reject = '')"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="primary"
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            :disabled="remark_reject == ''"
            @click="(modal_reject = false), save('Reject', data_test)"
          >
            ยืนยัน
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="modal_reversed" width="650" persistent>
      <v-card>
        <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #25578D"
        >
          ยืนยันการกด Reversed
        </v-card-title>
        <v-row class="ml-1 mr-1">
          <v-col cols="4">
            <v-subheader
              class="mt-7"
              style="font-size:16px; font-family: 'Bai_Jamjuree';"
            >
              วันที่ผ่านรายการ:
            </v-subheader>
          </v-col>
          <v-col cols="8" class="mt-7">
            <input
              style="text-align: left;"
              class="form-control-reverse"
              type="date"
              v-model="posting_date"
              placeholder="dd/mm/yyyy"
            />
          </v-col>
          <v-col cols="4">
            <v-subheader style="font-size:16px; font-family: 'Bai_Jamjuree';">
              Remark:
            </v-subheader>
          </v-col>
          <v-col cols="8">
            <v-textarea
              outlined
              class="mr-2"
              label="รายละเอียด"
              v-model="remark_reversed"
              :rules="[(v) => !!v || 'กรุณากรอก Remark']"
              :error="remark_reversed == ''"
              dense
            ></v-textarea>
          </v-col>
          <v-col cols="12" align="right">
            <v-btn
              color="#7EC069"
              style="font-size: 12px; font-weight: 400"
              :disabled="checkall_invoice == false"
              @click="modal_status = true"
            >
              <span class="text-white">
                Edit Status by Invoice
              </span>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            id="scroll-target"
            style="max-height: 300px"
            class="overflow-y-auto"
          >
            <v-container
              class="table_detail"
              v-scroll:#scroll-target="onScroll"
              style="height: 100%"
            >
              <table style="width: 100%">
                <tr style="vertical-align: middle; text-align: center;">
                  <th class="status-header" style="width: 10%">
                    <v-checkbox
                      class="shrink"
                      v-model="checkall_invoice"
                      @change="checkAll(checkall_invoice)"
                      dense
                      dark
                    ></v-checkbox>
                  </th>
                  <th class="status-header" style="width: 50%">Invoice</th>
                  <th class="status-header" style="width: 40%">Status</th>
                </tr>
                <tr
                  v-for="(item, index) in invoice_detail"
                  :key="'inv' + index"
                >
                  <!-- checkbox -->
                  <td class="invoice-header-data">
                    <v-checkbox
                      v-model="item.check_invoice"
                      @change="check_invoice()"
                    ></v-checkbox>
                  </td>
                  <!-- invoice -->
                  <td class="invoice-header-data">
                    <div style="text-align:center">{{ item.invoice_no }}</div>
                  </td>
                  <!-- status -->
                  <td class="invoice-header-data">
                    <select
                      v-if="item.status != ''"
                      class="style-chooser form-control"
                      style="width: 100%;"
                      v-model="item.status"
                      @change="check_status_reverse()"
                    >
                      <option value="ลดหนี้">ลดหนี้</option>
                      <option value="ลดหนี้ใบเสร็จ">ลดหนี้ใบเสร็จ</option>
                      <option value="ลดหนี้ใบเสร็จบางส่วน"
                        >ลดหนี้ใบเสร็จบางส่วน</option
                      >
                      <option value="ยังไม่ชำระ">ยังไม่ชำระ</option>
                      <option value="ตัดหนี้ใหม่">ตัดหนี้ใหม่</option>
                      <option value="วางบิลใหม่">วางบิลใหม่</option>
                      <option value="กลับรายการ">กลับรายการ</option>
                      <option value="ออกทวงหนี้">ออกทวงหนี้</option>
                    </select>

                    <select
                      v-else
                      class="style-chooser form-control"
                      style="width: 100%; border-color: #FF5252;"
                      v-model="item.status"
                      @change="check_status_reverse()"
                    >
                      <option value="ลดหนี้">ลดหนี้</option>
                      <option value="ลดหนี้ใบเสร็จ">ลดหนี้ใบเสร็จ</option>
                      <option value="ลดหนี้ใบเสร็จบางส่วน"
                        >ลดหนี้ใบเสร็จบางส่วน</option
                      >
                      <option value="ยังไม่ชำระ">ยังไม่ชำระ</option>
                      <option value="ตัดหนี้ใหม่">ตัดหนี้ใหม่</option>
                      <option value="วางบิลใหม่">วางบิลใหม่</option>
                      <option value="กลับรายการ">กลับรายการ</option>
                      <option value="ออกทวงหนี้">ออกทวงหนี้</option>
                    </select>
                  </td>
                </tr>
              </table>
            </v-container>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-card-actions class="mt-n3">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="close_reversed()"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="primary"
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            :disabled="remark_reversed == '' || check_status == false"
            @click="(modal_reversed = false), reversed('Reversed', data_test)"
          >
            ยืนยัน
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Status -->
    <v-dialog v-model="modal_status" width="600" persistent>
      <v-card>
        <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #25578D"
        >
          Edit Status by Invoice
        </v-card-title>
        <v-row class="ml-1 mr-1">
          <v-col cols="4">
            <v-subheader style="font-size:16px; font-family: 'Bai_Jamjuree';">
              Status:
            </v-subheader>
          </v-col>
          <v-col cols="8">
            <select
              class="style-chooser form-control"
              style="width: 100%;"
              v-model="status_reversed"
            >
              <option value="ลดหนี้">ลดหนี้</option>
              <option value="ลดหนี้ใบเสร็จ">ลดหนี้ใบเสร็จ</option>
              <option value="ลดหนี้ใบเสร็จบางส่วน">ลดหนี้ใบเสร็จบางส่วน</option>
              <option value="ยังไม่ชำระ">ยังไม่ชำระ</option>
              <option value="ตัดหนี้ใหม่">ตัดหนี้ใหม่</option>
              <option value="วางบิลใหม่">วางบิลใหม่</option>
              <option value="กลับรายการ">กลับรายการ</option>
              <option value="ออกทวงหนี้">ออกทวงหนี้</option>
            </select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions class="mt-n3">
          <v-spacer></v-spacer>
          <v-btn
            color="#FA403C"
            dark
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="(modal_status = false), (status_reversed = '')"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="primary"
            style="font-size:14px; font-family: 'Bai_Jamjuree';"
            @click="(modal_status = false), invoice_status(status_reversed)"
          >
            ยืนยัน
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="upload_File_Dialog" width="950">
      <v-card-title style="background-color: #035891">
        <span
          class="white--text"
          style="font-size:16px; font-family: 'Bai_Jamjuree'"
          >แนบไฟล์หลักฐานเพิ่มเติม</span
        >
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
            <v-btn
              color="primary"
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
                  @click="
                    previewFile({
                      url: item.data_base64,
                      types: item.type,
                      check_local_file: item.check_local_file,
                    })
                  "
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="green"
                  @click="
                    downloadFile({
                      url: item.data_base64,
                      label: item.name,
                      types: item.type,
                      check_local_file: item.check_local_file,
                    })
                  "
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="deleteFile(item.name)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-card-actions
            v-if="data_file.length == 0"
            style="text-align: center;"
          >
            <v-layout row>
              <v-flex justify-center>
                <span style="font-size: 25px font-family: 'Bai_Jamjuree'"
                  >ไม่มีรายการเอกสารแนบ</span
                >
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card-text>
        <v-card-text>
          <v-row
            class="d-flex flex-column"
            dense
            align="center"
            justify="center"
          >
            <v-col cols="12" align="center" class="dropZone-info">
              <!--
              <v-icon :class="[dragoverfile ? 'mt-2, mb-6' : 'mt-5']" size="60">
                mdi-cloud-upload
              </v-icon>
              <p align="center">
                Drop your file(s) here, or click to select them.
              </p>
              -->
              <v-file-input
                v-model="uploadedFiles"
                multiple
                label="แนบไฟล์เพิ่มเติม"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-virtual-scroll
            v-if="uploadedFiles.length > 0"
            :items="uploadedFiles"
            height="150"
            item-height="50"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item.name">
                <div style="width: 1000%">
                  <v-list-item-content class="overflow-x-auto">
                    <v-list-item-title>
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
    <v-dialog v-model="upload_File_WHT_Dialog" width="950">
      <v-card-title style="background-color: #035891">
        <span
          class="white--text"
          style="font-size:16px; font-family: 'Bai_Jamjuree'"
          >แนบไฟล์เอกสาร WHT เพิ่มเติม</span
        >
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeDialogWHT">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card
        @drop.prevent="onDropWHT($event)"
        @dragover.prevent="dragoverwht = true"
        @dragenter.prevent="dragoverwht = true"
        @dragleave.prevent="dragoverwht = false"
      >
        <v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              v-if="data_file_wht.length > 0"
              @click="downloadAll(data_file_wht)"
            >
              ดาวน์โหลดเอกสารทั้งหมด
            </v-btn>
          </v-card-actions>
          <v-list>
            <v-list-item
              v-for="(item, index) in data_file_wht"
              :key="item.name"
            >
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
                  @click="
                    previewFile({
                      url: item.data_base64,
                      types: item.type,
                      check_local_file: item.check_local_file,
                    })
                  "
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="green"
                  @click="
                    downloadFile({
                      url: item.data_base64,
                      label: item.name,
                      types: item.type,
                      check_local_file: item.check_local_file,
                    })
                  "
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="deleteFileWHT(item.name)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-card-actions
            v-if="data_file_wht.length == 0"
            style="text-align: center;"
          >
            <v-layout row>
              <v-flex justify-center>
                <span style="font-size: 25px font-family: 'Bai_Jamjuree'"
                  >ไม่มีรายการเอกสารแนบ</span
                >
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card-text>
        <v-card-text>
          <v-row
            class="d-flex flex-column"
            dense
            align="center"
            justify="center"
          >
            <v-col cols="12" align="center" class="dropZone-info">
              <v-file-input
                v-model="uploadedFilesWHT"
                multiple
                label="แนบไฟล์เพิ่มเติม"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-virtual-scroll
            v-if="uploadedFilesWHT.length > 0"
            :items="uploadedFilesWHT"
            height="150"
            item-height="50"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item.name">
                <div style="width: 1000%">
                  <v-list-item-content class="overflow-x-auto">
                    <v-list-item-title>
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
          <!--
          <v-btn @click="closeDialogWHT" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          -->
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
    <dialog-view-file
      :file_dialog="file_dialog"
      @close_file_dialog="close_file_dialog"
    />
  </div>
</template>
<script>
import eventBus from "../event-bus";
import moment from "moment";
import Swal from "sweetalert2";
import DialogViewFile from "../components/DialogViewFile.vue";
import axios from "axios";
import JSZip from "jszip";

export default {
  // props: ["type_matched_success"],
  components: {
    "dialog-view-file": DialogViewFile,
  },
  data: () => ({
    matching_dialog: false,
    dialog_view_file: false,
    dialogUpdate: false,
    modal_reject: false,
    modal_reversed: false,
    modal_status: false,
    upload_File_Dialog: false,
    upload_File_WHT_Dialog: false,
    uploadedFiles: [],
    uploadedFilesWHT: [],
    check_file: "",
    check_file_wht: "",
    data_file: [],
    data_file_wht: [],
    invoice_detail: [],
    checkall_invoice: false,
    dragoverfile: false,
    dragoverwht: false,
    file_dialog: false,
    finish: true,
    remark_reject: "",
    remark_reversed: "",
    check_status: false,
    role_status: "",
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
    headers_detail_table_chq: [
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
      {
        text: "วันที่หน้าเช็ค",
        align: "center",
        sortable: false,
        value: "check_date",
      },
      {
        text: "วันที่รับเช็ค",
        align: "center",
        sortable: false,
        value: "confirm_date",
      },
      {
        text: "ธนาคารเช็ค",
        align: "center",
        sortable: false,
        value: "bank_check",
      },
      {
        text: "CHQ No.",
        align: "center",
        sortable: false,
        value: "chq_no",
      },
      {
        text: "เลขที่บัญชีธนาคาร",
        align: "center",
        sortable: false,
        value: "payment_type",
      },
      {
        text: "Bank Code",
        align: "center",
        sortable: false,
        value: "bank_code",
      },
      {
        text: "ยอดชำระ",
        align: "center",
        sortable: false,
        value: "amount",
      },
      {
        text: "Statement No.",
        align: "center",
        sortable: false,
        value: "statement_no",
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
    add_gl: [
      {
        id: "[blank]",
        text: "[blank]",
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
        text: "เงินขาด Suspense - C/A BBL 210-3-01220-5",
      },
      {
        id: "11",
        text: "เงินเกิน Suspense - C/A BBL 210-3-01220-5",
      },
      {
        id: "12",
        text: "เงินขาด Suspense - C/A BAY 034-0-40099-3",
      },
      {
        id: "13",
        text: "เงินเกิน Suspense - C/A BAY 034-0-40099-3",
      },
      {
        id: "14",
        text: "เงินขาด Suspense - S/A KTB 013-6-09603-4",
      },
      {
        id: "15",
        text: "เงินเกิน Suspense - S/A KTB 013-6-09603-4",
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
        text: "เงินขาด Suspense - C/A-CIMB 80-001-9685-4",
      },
      {
        id: "23",
        text: "เงินเกิน Suspense - C/A-CIMB 80-001-9685-4",
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
        text: "เงินขาด Suspense - S/A BAY 034-1-395-77-8",
      },
      {
        id: "39",
        text: "เงินเกิน Suspense - S/A BAY 034-1-395-77-8",
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
        text: "เงินขาด Suspense - C/A-CIMB 80-001-9685-4",
      },
      {
        id: "45",
        text: "เงินเกิน Suspense - C/A-CIMB 80-001-9685-4",
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
        text: "เงินเกิน Suspense - S/A KTB 013-1-61085-6",
      },
      {
        id: "66",
        text: "เงินขาด Suspense - S/A-CIMB 70-040-5774-5",
      },
      {
        id: "67",
        text: "เงินเกิน Suspense - S/A-CIMB 70-040-5774-5",
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
    amount: 0,
    rv_date: "",
    posting_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
    status_reversed: "",
    data_reverse: [],
    // add_amount: "",
    tax_base: 0,
    remark: "",
    remark_erp: "",
    customer_no: "",
    customer_name: "",
    customer_email: "",
    files: [],
    files_wht: [],
    checkall_mail: false,
    checkall_wht: false,
    data_invoice: [],
    data_add_gl: [],
    item_file: [],
    type_wht_old: "",
    data_statement_old: [],
    data_test: "",
    offsetTop: 0,
    matched_success: "",
    zip_file: [],
    zip_file_wht: [],
    data_zip_file: [],
    data_zip_file_wht: [],
    status_rv_number: true,
  }),
  created() {
    this.role_status = localStorage.getItem("role");
  },
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
      if (this.uploadedFiles.length != 0) {
        for (let i = 0; i < this.uploadedFiles.length; i++) {
          const new_files = this.uploadedFiles[i];
          base64 = await this.toBase64(new_files);
          new_base64 = base64.split("base64,");

          this.data_file.push({
            name: new_files.name,
            type: new_files.type,
            data_base64: new_base64[1],
            file_id: "",
            folder_id: this.check_file,
            queue_no_file: this.data_test.queue_no,
            check_local_file: true,
          });
        }
        await this.base64_ZipFile(this.data_file);
      } else {
        if (this.data_file != 0) {
          await this.base64_ZipFile(this.data_file);
        }
      }
    },
    async getbase64FilesWHT() {
      let base64 = "";
      let new_base64 = [];
      if (this.uploadedFilesWHT.length != 0) {
        for (let i = 0; i < this.uploadedFilesWHT.length; i++) {
          const new_files = this.uploadedFilesWHT[i];
          base64 = await this.toBase64(new_files);
          new_base64 = base64.split("base64,");

          this.data_file_wht.push({
            name: new_files.name,
            type: new_files.type,
            data_base64: new_base64[1],
            file_id: "",
            folder_id: this.check_file_wht,
            queue_no_file: this.data_test.queue_no,
            check_local_file: true,
          });
        }
        await this.base64_ZipFile_WHT(this.data_file_wht);
      } else {
        if (this.data_file_wht.length != 0) {
          await this.base64_ZipFile_WHT(this.data_file_wht);
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
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    // end
    open(item) {
      // console.log(item)
      if (item[0].status == "Matched") {
        this.matched_success = "Matched";
      } else {
        this.matched_success = "Success";
      }

      this.data_statement_old = [];
      this.data_test = item[0];
      //console.log(this.data_test)
      if (this.data_test.file) {
        this.check_file = this.data_test.file[0].folder_id;
        let new_base64 = [];
        this.data_test.file.forEach((element) => {
          if (element.check_local_file == true) {
            this.data_file.push({
              name: element.name,
              type: element.type,
              data_base64: element.data_base64,
              file_id: element.file_id,
              folder_id: element.folder_id,
              check_local_file: element.check_local_file,
              queue_no_file: element.queue_no_file,
            });
          } else {
            new_base64 = element.data_base64.split("base64,");
            this.data_file.push({
              name: element.name,
              type: element.type,
              data_base64: new_base64[1],
              file_id: element.file_id,
              folder_id: element.folder_id,
              check_local_file: true,
              queue_no_file: element.queue_no_file,
            });
          }
        });
      } else {
        this.data_file = [];
        this.check_file = "";
      }

      if (this.data_test.file_wht) {
        this.check_file_wht = this.data_test.file_wht[0].folder_id;
        let newwht_base64 = [];
        this.data_test.file_wht.forEach((element) => {
          if (element.check_local_file == true) {
            this.data_file_wht.push({
              name: element.name,
              type: element.type,
              data_base64: element.data_base64,
              file_id: element.file_id,
              folder_id: element.folder_id,
              check_local_file: element.check_local_file,
              queue_no_file: element.queue_no_file,
            });
          } else {
            newwht_base64 = element.data_base64.split("base64,");
            this.data_file_wht.push({
              name: element.name,
              type: element.type,
              data_base64: newwht_base64[1],
              file_id: element.file_id,
              folder_id: element.folder_id,
              check_local_file: true,
              queue_no_file: element.queue_no_file,
            });
          }
        });
      } else {
        this.data_file_wht = [];
        this.check_file_wht = "";
      }
      /*
      if(this.data_test.status == 'Matched'){
        //console.log(this.data_test.file);
        if(this.data_test.file != null){
          this.base64_ZipFile(this.data_test.file);

        }else if(this.data_test.file == null){
          this.data_zip_file = [];
        }

        //console.log(this.data_test.file_wht);
        if(this.data_test.file_wht != null){
          this.base64_ZipFile_WHT(this.data_test.file_wht);

        }else if(this.data_test.file_wht == null){
          this.data_zip_file_wht = [];
        }
      }else{
        this.data_zip_file = [];
        this.data_zip_file_wht = [];
      }
      */
      // console.log(this.data_test);

      this.rv_date = moment(this.data_test.rv_date).format("DD/MM/YYYY");
      this.type_wht_old = this.data_test.type_wht;
      this.customer_no = this.data_test.customer_no;
      this.customer_name = this.data_test.customer_name;
      this.customer_email = this.data_test.customer_email;
      this.matching_dialog = true;
      this.data_test.statement.forEach((element) => {
        element.sum_amounts = this.data_test.sum_amounts;
        element.confirm_date = moment(element.confirm_date).format(
          "YYYY-MM-DD"
        );
        element.check_date = moment(element.check_date).format("YYYY-MM-DD");

        this.data_statement_old.push({
          type_debt: element.type_debt,
          check_date: new Date(element.check_date).toJSON(),
          confirm_date: new Date(element.confirm_date).toJSON(),
          bank_check_list: element.bank_check_list,
          chq_no: element.chq_no,
          payment_type_bank: element.payment_type_bank,
          code_bank: element.code_bank,
          statement_no: element.statement_no,
          fee: Number(element.fee),
          amount: Number(element.amount),
          sequence: element.sequence,
          queue_no_statement: this.data_test.queue_no,
        });
      });

      this.data_test.invoice_no.forEach((element) => {
        element.aging = Number(element.aging).toFixed(2);
      });
      // add gl
      //console.log(this.data_test.add_gl)
      if (this.data_test.add_gl.length == 0) {
        for (let i = 0; i < 5; i++) {
          this.data_test.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      } else if (this.data_test.add_gl.length == 1) {
        for (let i = 0; i < 4; i++) {
          this.data_test.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      } else if (this.data_test.add_gl.length == 2) {
        for (let i = 0; i < 3; i++) {
          this.data_test.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      } else if (this.data_test.add_gl.length == 3) {
        for (let i = 0; i < 2; i++) {
          this.data_test.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      } else if (this.data_test.add_gl.length == 4) {
        for (let i = 0; i < 1; i++) {
          this.data_test.add_gl.push({
            order_gl: "",
            add_gl: "",
            add_amount: "",
          });
        }
      }

      this.check_rv_number()
      // end add gl
    },
    close() {
      this.dialogUpdate = false;
      this.matching_dialog = false;
      this.$emit("edit_dialog");
      this.remark_reject = "";
      this.remark_reversed = "";
      this.posting_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      (this.status_reversed = ""), (this.customer_no = "");
      this.customer_name = "";
      this.customer_email = "";
      this.data_test = "";
      this.data_file = [];
      this.data_file_wht = [];
      this.data_zip_file = [];
      this.data_statement_old = [];
      this.data_zip_file_wht = [];
      this.uploadedFiles = [];
      this.uploadedFilesWHT = [];
      this.data_reverse = [];
    },
    cancel_WHT() {
      this.dialogUpdate = false;
      this.data_test.type_wht = this.type_wht_old;
      //this.data_test.statement = this.data_statement_old;
      //console.log(this.data_statement_old)
      for (let i = 0; i < this.data_statement_old.length; i++) {
        if (
          this.data_statement_old[i].sequence ==
          this.data_test.statement[i].sequence
        ) {
          this.data_test.statement[i].statement_no = this.data_statement_old[
            i
          ].statement_no;
        }
      }
    },
    check_rv_number(){
      // console.log(this.data_test.reverse)
      for( let i = 0; i < this.data_test.reverse.length; i++){
        if(this.data_test.reverse[i].rv_number  == ""){
          this.status_rv_number = false;
          break;
        }else{
          this.status_rv_number = true;
        }
      }

      // console.log(this.status_rv_number)
    },
    async base64_ZipFile(items) {
      const zip = new JSZip();
      for (const item of items) {
        let urls = "";
        if (item.check_local_file == true) {
          urls = "data:" + item.type + ";base64," + item.data_base64;
        } else {
          urls = item.data_base64;
        }
        await axios
          .get(urls, { responseType: "blob" })
          .then((response) => {
            const file = new File([response.data], item.name, {
              type: response.data.type,
            });
            zip.file(file.name, file);
          })
          .catch(console.error);
      }

      const base64 = await zip.generateAsync({ type: "base64" });
      //console.log(base64)
      this.data_zip_file.push(base64);
    },
    async base64_ZipFile_WHT(items) {
      const zip = new JSZip();
      for (const item of items) {
        let urls = "";
        if (item.check_local_file == true) {
          urls = "data:" + item.type + ";base64," + item.data_base64;
        } else {
          urls = item.data_base64;
        }

        await axios
          .get(urls, { responseType: "blob" })
          .then((response) => {
            const file = new File([response.data], item.name, {
              type: response.data.type,
            });
            zip.file(file.name, file);
          })
          .catch(console.error);
      }

      const base64 = await zip.generateAsync({ type: "base64" });
      //console.log(base64)
      this.data_zip_file_wht.push(base64);
    },
    async update(type, data) {
      let Data_gl = [];
      let Data_statement = [];
      let Data_invoice = [];
      // let Data_detail = []
      let status_new = "";
      let type_new = "";
      //let status_file_wht = ""

      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.data_test.invoice_no.forEach((element) => {
        Data_invoice.push({
          invoice_no: element.invoice_no,
          receipt_number: element.receipt_number,
          amount_after_vat: Number(element.amount_after_vat),
          aging: Number(element.aging),
          cn_number: element.cn_number,
          receipt_date: element.receipt_date,
          checkbox_wht: element.checkbox_wht,
          checkbox_mail: element.checkbox_mail,
          invoice_date: new Date(element.invoice_date).toJSON(),
        });
      });

      this.data_test.add_gl.forEach((element) => {
        if (element.order_gl != "") {
          Data_gl.push({
            order_gl: element.order_gl,
            add_gl: element.add_gl,
            add_amount: element.add_amount,
            queue_no_gl: element.queue_no_gl,
          });
        }
      });
      this.data_test.statement.forEach((element) => {
        Data_statement.push({
          type_debt: element.type_debt,
          check_date: new Date(element.check_date).toJSON(),
          confirm_date: new Date(element.confirm_date).toJSON(),
          bank_check_list: element.bank_check_list,
          chq_no: element.chq_no,
          payment_type_bank: element.payment_type_bank,
          code_bank: element.code_bank,
          statement_no: element.statement_no,
          fee: Number(element.fee),
          amount: Number(element.amount),
          sequence: element.sequence,
          queue_no_statement: this.data_test.queue_no,
        });
      });

      if (type == "Reject") {
        type_new = "Pending";
        status_new = "Reject";
      } else {
        type_new = "Success";
        status_new = "";
      }

      if (data.type_wht == 1) {
        this.data_test.status_file_wht = true;
      } else {
        this.data_test.status_file_wht = false;
      }

      var Datas = {
        // request_mail: Data_detail, //request mail
        statement: Data_statement,
        sum_amounts: data.sum_amounts, //ยอดรวมชำระ
        invoice_no: Data_invoice, //ข้อมูลในตาราง invoice
        rv_date: data.rv_date, //วันที่ตัดหนี้
        sum_wht: data.sum_wht, //ตาราง Sum คอลัม wht
        sum_balance: data.sum_balance, //ตาราง Sum คอลัม Balance
        sum_add_amount: data.sum_add_amount, //ตาราง Sum คอลัม Add. GL
        add_gl: Data_gl, //ข้อมูลตาราง ADD GL
        sum_aging: data.sum_aging, //ตาราง Sum ยอดที่ต้องชำระ
        sum_amount_after_vat: data.sum_amount_after_vat, //ตาราง Sum ยอดชำระ
        type_wht: data.type_wht, //ประเภทเอกสาร wht
        file: data.file, //ไฟล์หลักฐาน
        file_wht: data.file_wht, //ไฟล์ wht
        remark: data.remark, //remark
        remark_erp:data.remark_erp,//remark_erp
        customer_no: data.customer_no, //customer no
        customer_name: data.customer_name, //customer name
        customer_email: data.customer_email, //customer email
        finance_name: data.finance_name, //ชื่อการเงิน
        sale_email: data.sale_email, //อีเมลเซล
        type: data.type, //ประเภทการชำระ
        tax_base: data.tax_base, //ฐานภาษี
        tax_code: data.tax_code, //รหัสภาษีหัก ณ ที่จ่าย
        special_code: data.special_code, //รหัสพิเศษ
        evidence_reporting: data.evidence_reporting,
        status_file: data.status_file, //ค่า true false เวลามีการเลือกไฟล์หลักฐาน
        status_file_wht: this.data_test.status_file_wht, //ค่า true false เวลามีการเลือกไฟล์ wht
        status: type_new, //status
        check_mail: data.check_mail,
        check_wht: data.check_wht,
        //ส่งค่ากลับไปเหมือนเดิม
        action_by_account_id: data.action_by_account_id,
        action_by_name: data.action_by_name,
        action_date: data.action_date,
        email_date: data.email_date,
        queue_no: data.queue_no,
        reject_date: data.reject_date,
        saved_date: data.saved_date,
        status_pending: status_new,
        document_no: data.document_no,
        status_mail_invoice: data.status_mail_invoice, //Mail ยืนยันใบแจ้งหนี้
        status_mail_wht: data.status_mail_wht, //Mail ติดตาม WHT
        status_mail_total: data.status_mail_total, //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
        request_day: this.data_test.request_day,
        request_day_cront: this.data_test.request_day_cront,
        check_mail_wht: this.data_test.check_mail_wht,
        check_mail_invoice: this.data_test.check_mail_invoice,
        que_inv_rpa: this.data_test.que_inv_rpa,
        que_total_rpa: this.data_test.que_total_rpa,
        que_wht_rpa: this.data_test.que_wht_rpa,
        remark_rejected: this.data_test.remark_rejected,
        remark_reversed: this.data_test.remark_reversed,
      };
      //console.log(Datas)

      await this.axios
        .put(
          process.env.VUE_APP_API +
            "/statement/changestatusfilewht/" +
            Number(data.queue_no),
          Datas,
          headers
        )
        .then((response) => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: "ข้อมูลถูก Approve เรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 2000,
            });
            this.dialogUpdate = false;
            this.matching_dialog = false;
          }
        })
        .catch((error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถ Approve ข้อมูลได้",
              showConfirmButton: false,
              timer: 2000,
            });
            this.dialogUpdate = false;
            this.matching_dialog = false;
          }
        });

      this.$emit("edit_dialog");
      this.status_file_wht = false;
      this.data_zip_file = [];
      this.data_zip_file_wht = [];
      this.data_statement_old = [];
      this.customer_no = "";
      this.customer_name = "";
      this.customer_email = "";
      this.data_file = [];
      this.data_file_wht = [];
    },

    async save(type, data) {
      this.finish = false;
      let Data_gl = [];
      let Data_statement = [];
      let Data_invoice = [];
      // let Data_detail = []
      let status_new = "";
      let type_new = "";
      //let status_file_wht = ""

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

      this.data_test.invoice_no.forEach((element) => {
        Data_invoice.push({
          invoice_no: element.invoice_no,
          receipt_number: element.receipt_number,
          amount_after_vat: Number(element.amount_after_vat),
          aging: Number(element.aging),
          cn_number: element.cn_number,
          receipt_date: element.receipt_date,
          checkbox_wht: element.checkbox_wht,
          checkbox_mail: element.checkbox_mail,
          invoice_date: new Date(element.invoice_date).toJSON(),
        });
      });

      this.data_test.add_gl.forEach((element) => {
        if (element.order_gl != "") {
          Data_gl.push({
            order_gl: element.order_gl,
            add_gl: element.add_gl,
            add_amount: element.add_amount,
            queue_no_gl: element.queue_no_gl,
          });
        }
      });
      this.data_test.statement.forEach((element) => {
        Data_statement.push({
          type_debt: element.type_debt,
          check_date: new Date(element.check_date).toJSON(),
          confirm_date: new Date(element.confirm_date).toJSON(),
          bank_check_list: element.bank_check_list,
          chq_no: element.chq_no,
          payment_type_bank: element.payment_type_bank,
          code_bank: element.code_bank,
          statement_no: element.statement_no,
          fee: Number(element.fee),
          amount: Number(element.amount),
          sequence: element.sequence,
          queue_no_statement: this.data_test.queue_no,
        });
      });

      if (type == "Reject") {
        type_new = "Pending";
        status_new = "Reject";
      } else {
        type_new = "Success";
        status_new = "";
      }
      var Datas = {
        // request_mail: Data_detail, //request mail
        statement: Data_statement,
        sum_amounts: data.sum_amounts, //ยอดรวมชำระ
        invoice_no: Data_invoice, //ข้อมูลในตาราง invoice
        rv_date: data.rv_date, //วันที่ตัดหนี้
        sum_wht: data.sum_wht, //ตาราง Sum คอลัม wht
        sum_balance: data.sum_balance, //ตาราง Sum คอลัม Balance
        sum_add_amount: data.sum_add_amount, //ตาราง Sum คอลัม Add. GL
        add_gl: Data_gl, //ข้อมูลตาราง ADD GL
        sum_aging: data.sum_aging, //ตาราง Sum ยอดที่ต้องชำระ
        sum_amount_after_vat: data.sum_amount_after_vat, //ตาราง Sum ยอดชำระ
        type_wht: data.type_wht, //ประเภทเอกสาร wht
        file: this.data_file, //ไฟล์หลักฐาน
        file_wht: this.data_file_wht, //ไฟล์ wht
        remark: data.remark, //remark
        remark_erp: data.remark_erp, //remark_erp
        customer_no: data.customer_no, //customer no
        customer_name: data.customer_name, //customer name
        customer_email: data.customer_email, //customer email
        finance_name: data.finance_name, //ชื่อการเงิน
        sale_email: data.sale_email, //อีเมลเซล
        type: data.type, //ประเภทการชำระ
        tax_base: data.tax_base, //ฐานภาษี
        tax_code: data.tax_code, //รหัสภาษีหัก ณ ที่จ่าย
        special_code: data.special_code, //รหัสพิเศษ
        evidence_reporting: data.evidence_reporting,
        status_file: data.status_file, //ค่า true false เวลามีการเลือกไฟล์หลักฐาน
        status_file_wht: data.status_file_wht, //ค่า true false เวลามีการเลือกไฟล์ wht
        status: type_new, //status
        check_mail: data.check_mail,
        check_wht: data.check_wht,
        //ส่งค่ากลับไปเหมือนเดิม
        action_by_account_id: data.action_by_account_id,
        action_by_name: data.action_by_name,
        action_date: data.action_date,
        email_date: data.email_date,
        queue_no: data.queue_no,
        reject_date: data.reject_date,
        saved_date: data.saved_date,
        status_pending: status_new,
        document_no: data.document_no,
        status_mail_invoice: data.status_mail_invoice, //Mail ยืนยันใบแจ้งหนี้
        status_mail_wht: data.status_mail_wht, //Mail ติดตาม WHT
        status_mail_total: data.status_mail_total, //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
        request_day: this.data_test.request_day,
        request_day_cront: this.data_test.request_day_cront,
        check_mail_wht: this.data_test.check_mail_wht,
        check_mail_invoice: this.data_test.check_mail_invoice,
        que_inv_rpa: this.data_test.que_inv_rpa,
        que_total_rpa: this.data_test.que_total_rpa,
        que_wht_rpa: this.data_test.que_wht_rpa,
        zip_file: this.data_zip_file,
        zip_file_wht: this.data_zip_file_wht,
        remark_rejected: this.data_test.remark_rejected,
        remark_reversed: this.data_test.remark_reversed,
      };
      //console.log(Datas)

      var DatasReject = {
        // request_mail: Data_detail, //request mail
        statement: Data_statement,
        sum_amounts: data.sum_amounts, //ยอดรวมชำระ
        invoice_no: Data_invoice, //ข้อมูลในตาราง invoice
        rv_date: data.rv_date, //วันที่ตัดหนี้
        sum_wht: data.sum_wht, //ตาราง Sum คอลัม wht
        sum_balance: data.sum_balance, //ตาราง Sum คอลัม Balance
        sum_add_amount: data.sum_add_amount, //ตาราง Sum คอลัม Add. GL
        add_gl: Data_gl, //ข้อมูลตาราง ADD GL
        sum_aging: data.sum_aging, //ตาราง Sum ยอดที่ต้องชำระ
        sum_amount_after_vat: data.sum_amount_after_vat, //ตาราง Sum ยอดชำระ
        type_wht: data.type_wht, //ประเภทเอกสาร wht
        file: this.data_file, //ไฟล์หลักฐาน
        file_wht: this.data_file_wht, //ไฟล์ wht
        remark: data.remark, //remark
        remark_erp: data.remark_erp,//remark_erp
        customer_no: data.customer_no, //customer no
        customer_name: data.customer_name, //customer name
        customer_email: data.customer_email, //customer email
        finance_name: data.finance_name, //ชื่อการเงิน
        sale_email: data.sale_email, //อีเมลเซล
        type: data.type, //ประเภทการชำระ
        tax_base: data.tax_base, //ฐานภาษี
        tax_code: data.tax_code, //รหัสภาษีหัก ณ ที่จ่าย
        special_code: data.special_code, //รหัสพิเศษ
        evidence_reporting: data.evidence_reporting,
        status_file: data.status_file, //ค่า true false เวลามีการเลือกไฟล์หลักฐาน
        status_file_wht: data.status_file_wht, //ค่า true false เวลามีการเลือกไฟล์ wht
        status: type_new, //status
        check_mail: data.check_mail,
        check_wht: data.check_wht,
        //ส่งค่ากลับไปเหมือนเดิม
        action_by_account_id: data.action_by_account_id,
        action_by_name: data.action_by_name,
        action_date: data.action_date,
        email_date: data.email_date,
        queue_no: data.queue_no,
        reject_date: data.reject_date,
        saved_date: data.saved_date,
        status_pending: status_new,
        document_no: data.document_no,
        status_mail_invoice: data.status_mail_invoice, //Mail ยืนยันใบแจ้งหนี้
        status_mail_wht: data.status_mail_wht, //Mail ติดตาม WHT
        status_mail_total: data.status_mail_total, //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
        request_day: this.data_test.request_day,
        request_day_cront: this.data_test.request_day_cront,
        check_mail_wht: this.data_test.check_mail_wht,
        check_mail_invoice: this.data_test.check_mail_invoice,
        que_inv_rpa: this.data_test.que_inv_rpa,
        que_total_rpa: this.data_test.que_total_rpa,
        que_wht_rpa: this.data_test.que_wht_rpa,
        status_total: this.data_test.status_total,
        remark_rejected: this.remark_reject,
      };
      //console.log(DatasReject)

      //กด Reject
      if (type == "Reject") {
        await this.axios
          .put(
            process.env.VUE_APP_API +
              "/statement/reject/" +
              Number(data.queue_no),
            DatasReject,
            headers
          )
          .then((response) => {
            if (response.status == 200) {
              this.finish = true;
              Swal.fire({
                icon: "success",
                title: "ข้อมูลถูก Reject เรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              this.matching_dialog = false;
            }
          })
          .catch((error) => {
            if (error) {
              this.finish = true;
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถ Reject ข้อมูลได้",
                showConfirmButton: false,
                timer: 2000,
              });
              this.matching_dialog = false;
            }
          });
        this.$emit("edit_dialog");
        this.uploadedFiles = [];
        this.uploadedFilesWHT = [];
        //กด Approve
      } else {
        await this.axios
          .put(
            process.env.VUE_APP_API +
              "/statement/approve/" +
              Number(data.queue_no),
            Datas,
            headers
          )
          .then((response) => {
            if (response.status == 200) {
              this.finish = true;
              Swal.fire({
                icon: "success",
                title: "ข้อมูลถูก Approve เรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              this.matching_dialog = false;
            }
          })
          .catch((error) => {
            if (error) {
              this.finish = true;
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถ Approve ข้อมูลได้",
                showConfirmButton: false,
                timer: 2000,
              });
              this.matching_dialog = false;
            }
          });
        this.$emit("edit_dialog");
        this.status_file_wht = false;
        this.data_zip_file = [];
        this.data_zip_file_wht = [];
        this.uploadedFiles = [];
        this.uploadedFilesWHT = [];
      }

      this.customer_no = "";
      this.remark_reject = "";
      this.remark_reversed = "";
      this.customer_name = "";
      this.customer_email = "";
      this.data_statement_old = [];
      this.data_file = [];
      this.data_file_wht = [];
    },
    // Reversed
    async reversed(type, data) {
      this.finish = false;
      let Data_gl = [];
      let Data_statement = [];
      let Data_invoice = [];
      var bank_code = [];
      var state_no = [];
      var inv_no = [];
      var rv_number = [];
      // let Data_detail = []
      let status_new = "";
      let type_new = "";
      let log_reverse = [];
      //let status_file_wht = ""

      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.data_test.invoice_no.forEach((element) => {
        Data_invoice.push({
          invoice_no: element.invoice_no,
          receipt_number: element.receipt_number,
          amount_after_vat: Number(element.amount_after_vat),
          aging: Number(element.aging),
          cn_number: element.cn_number,
          receipt_date: element.receipt_date,
          checkbox_wht: element.checkbox_wht,
          checkbox_mail: element.checkbox_mail,
          invoice_date: new Date(element.invoice_date).toJSON(),
        });
        inv_no.push(element.invoice_no);
      });

      this.data_test.add_gl.forEach((element) => {
        if (element.order_gl != "") {
          Data_gl.push({
            order_gl: element.order_gl,
            add_gl: element.add_gl,
            add_amount: element.add_amount,
            queue_no_gl: element.queue_no_gl,
          });
        }
      });
      this.data_test.statement.forEach((element) => {
        Data_statement.push({
          type_debt: element.type_debt,
          check_date: new Date(element.check_date).toJSON(),
          confirm_date: new Date(element.confirm_date).toJSON(),
          bank_check_list: element.bank_check_list,
          chq_no: element.chq_no,
          payment_type_bank: element.payment_type_bank,
          code_bank: element.code_bank,
          statement_no: element.statement_no,
          fee: Number(element.fee),
          amount: Number(element.amount),
          sequence: element.sequence,
          queue_no_statement: this.data_test.queue_no,
        });
        bank_code.push(element.code_bank);
        state_no.push(element.statement_no);
      });

      this.data_test.reverse.forEach((element) => {
        rv_number.push(element.rv_number);
      });

      this.data_reverse.push({
        document_no: data.document_no,
        rv_date: data.rv_date,
        customer_no: data.customer_no,
        customer_name: data.customer_name,
        posting_date: new Date(this.posting_date).toJSON(),
        //status: this.status_reversed,
        code_bank: bank_code.join(","),
        invoice_no: inv_no.join(","),
        rv_number: rv_number.join(","),
        statement_no: state_no.join(","),
      });

      this.invoice_detail.forEach((element) => {
        log_reverse.push({
          invoice_no: element.invoice_no,
          status: element.status,
        });
      });

      if (type == "Reversed") {
        type_new = "Pending";
        status_new = "Reversed";
      }

      var DatasReversed = {
        // request_mail: Data_detail, //request mail
        statement: Data_statement,
        sum_amounts: data.sum_amounts, //ยอดรวมชำระ
        invoice_no: Data_invoice, //ข้อมูลในตาราง invoice
        rv_date: data.rv_date, //วันที่ตัดหนี้
        sum_wht: data.sum_wht, //ตาราง Sum คอลัม wht
        sum_balance: data.sum_balance, //ตาราง Sum คอลัม Balance
        sum_add_amount: data.sum_add_amount, //ตาราง Sum คอลัม Add. GL
        add_gl: Data_gl, //ข้อมูลตาราง ADD GL
        sum_aging: data.sum_aging, //ตาราง Sum ยอดที่ต้องชำระ
        sum_amount_after_vat: data.sum_amount_after_vat, //ตาราง Sum ยอดชำระ
        type_wht: data.type_wht, //ประเภทเอกสาร wht
        file: data.file, //ไฟล์หลักฐาน
        file_wht: data.file_wht, //ไฟล์ wht
        remark: data.remark, //remark
        remark_erp: data.remark_erp,//remark_erp
        customer_no: data.customer_no, //customer no
        customer_name: data.customer_name, //customer name
        customer_email: data.customer_email, //customer email
        finance_name: data.finance_name, //ชื่อการเงิน
        sale_email: data.sale_email, //อีเมลเซล
        type: data.type, //ประเภทการชำระ
        tax_base: data.tax_base, //ฐานภาษี
        tax_code: data.tax_code, //รหัสภาษีหัก ณ ที่จ่าย
        special_code: data.special_code, //รหัสพิเศษ
        evidence_reporting: data.evidence_reporting,
        status_file: data.status_file, //ค่า true false เวลามีการเลือกไฟล์หลักฐาน
        status_file_wht: data.status_file_wht, //ค่า true false เวลามีการเลือกไฟล์ wht
        status: type_new, //status
        check_mail: data.check_mail,
        check_wht: data.check_wht,
        //ส่งค่ากลับไปเหมือนเดิม
        action_by_account_id: data.action_by_account_id,
        action_by_name: data.action_by_name,
        action_date: data.action_date,
        email_date: data.email_date,
        queue_no: data.queue_no,
        reject_date: data.reject_date,
        saved_date: data.saved_date,
        status_pending: status_new,
        document_no: data.document_no,
        status_mail_invoice: data.status_mail_invoice, //Mail ยืนยันใบแจ้งหนี้
        status_mail_wht: data.status_mail_wht, //Mail ติดตาม WHT
        status_mail_total: data.status_mail_total, //Mail ยืนยันใบแจ้งหนี้ + ติดตาม WHT
        request_day: this.data_test.request_day,
        request_day_cront: this.data_test.request_day_cront,
        check_mail_wht: this.data_test.check_mail_wht,
        check_mail_invoice: this.data_test.check_mail_invoice,
        que_inv_rpa: this.data_test.que_inv_rpa,
        que_total_rpa: this.data_test.que_total_rpa,
        que_wht_rpa: this.data_test.que_wht_rpa,
        remark_reversed: this.remark_reversed,
        status_total: this.data_test.status_total,
        reverse: this.data_reverse,
        log_reverse: log_reverse,
      };
      //console.log(DatasReversed)

      
      await this.axios
        .put(
          process.env.VUE_APP_API +
            "/statement/reversed/" +
            Number(data.queue_no),
          DatasReversed,
          headers
        )
        .then((response) => {
          if (response.status == 200) {
            this.finish = true;
            Swal.fire({
              icon: "success",
              title: "ข้อมูลถูก Reversed เรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 2000,
            });
            this.matching_dialog = false;
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถ Reversed ข้อมูลได้",
              showConfirmButton: false,
              timer: 2000,
            });
            this.matching_dialog = false;
          }
        });
      this.$emit("edit_dialog");
      

      this.customer_no = "";
      this.remark_reject = "";
      this.remark_reversed = "";
      this.posting_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.status_reversed = "";
      this.customer_name = "";
      this.customer_email = "";
      this.data_statement_old = [];
      this.uploadedFiles = [];
      this.uploadedFilesWHT = [];
      this.data_file = [];
      this.data_file_wht = [];
      this.data_reverse = [];
      this.invoice_detail = [];
      this.checkall_invoice = false;
    },
    
    open_reversed() {
      this.data_test.invoice_no.forEach((element) => {
        this.invoice_detail.push({
          check_invoice: false,
          invoice_no: element.invoice_no,
          status: "",
        });
      });
      //console.log(this.invoice_detail)
      this.modal_reversed = true;
    },
    checkAll(check) {
      if (check == true) {
        this.invoice_detail.forEach((element) => {
          element.check_invoice = true;
        });
      } else {
        this.invoice_detail.forEach((element) => {
          element.check_invoice = false;
        });
      }
    },
    invoice_status(status) {
      this.invoice_detail.forEach((element) => {
        if (element.check_invoice == true) {
          element.status = status;
        }
      });
      //console.log(this.invoice_detail)
      this.status_reversed = "";
      this.check_status_reverse();
    },
    check_invoice() {
      for (let i = 0; i < this.invoice_detail.length; i++) {
        if (this.invoice_detail[i].check_invoice == true) {
          this.checkall_invoice = true;
          break;
        } else {
          this.checkall_invoice = false;
        }
      }
    },
    check_status_reverse() {
      for (let i = 0; i < this.invoice_detail.length; i++) {
        if (this.invoice_detail[i].status == "") {
          this.check_status = false;
          break;
        } else {
          this.check_status = true;
        }
      }
    },
    close_reversed() {
      this.modal_reversed = false;
      this.remark_reversed = "";
      this.posting_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.status_reversed = "";
      this.invoice_detail = [];
      this.checkall_invoice = false;
    },
    // open file
    open_file_dialog(item, status) {
      this.finish = false;
      //console.log(item , status);
      this.item_file = [];
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      if (status == "file") {
        this.axios
          .get(process.env.VUE_APP_API + "/statement/file/" + item, headers)
          .then((response) => {
            if (response.status === 200) {
              this.item_file = response.data;
              this.file_dialog = true;
              eventBus.$emit("openFileDialog", this.item_file, status);
              this.finish = true;
              //console.log(this.item_file)
            } else {
              this.item_file = [];
            }
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.finish = true;
              this.$router.push("/login");
            }
          });
      } else {
        this.axios
          .get(process.env.VUE_APP_API + "/statement/filewht/" + item, headers)
          .then((response) => {
            if (response.status == 200) {
              this.item_file = response.data;
              this.file_dialog = true;
              eventBus.$emit("openFileDialog", this.item_file, status);
              this.finish = true;
              //console.log(this.item_file)
            } else {
              this.item_file = [];
            }
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.finish = true;
              this.$router.push("/login");
            }
          });
      }
    },
    close_file_dialog() {
      this.item_file = [];
      this.file_dialog = false;
    },
    closeDialog() {
      this.upload_File_Dialog = false;
    },
    removeFile(fileName) {
      // Find the index of the
      const index = this.uploadedFiles.findIndex(
        (file) => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.uploadedFiles.splice(index, 1);
    },
    onDrop(e) {
      this.dragoverfile = false;
      if (this.uploadedFiles.length > 0) this.uploadedFiles = [];

      e.dataTransfer.files.forEach((element) =>
        this.uploadedFiles.push(element)
      );
    },
    closeDialogWHT() {
      this.upload_File_WHT_Dialog = false;
    },
    removeFileWHT(fileName) {
      // Find the index of the
      const index = this.uploadedFilesWHT.findIndex(
        (file) => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.uploadedFilesWHT.splice(index, 1);
    },
    onDropWHT(e) {
      this.dragoverfile = false;
      if (this.uploadedFilesWHT.length > 0) this.uploadedFilesWHT = [];

      e.dataTransfer.files.forEach((element) =>
        this.uploadedFilesWHT.push(element)
      );
    },
    // download ทั้งหมด
    downloadAll(items) {
      for (const item of items) {
        let urls = "";
        if (item.check_local_file == true) {
          urls = "data:" + item.type + ";base64," + item.url;
        } else {
          urls = item.url;
        }

        axios
          .get(urls, { responseType: "blob" })
          .then((response) => {
            const blob = new Blob([response.data], {
              type: response.data.type,
            });
            //console.log(blob)
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = item.name;
            link.click();
            URL.revokeObjectURL(link.href);
          })
          .catch(console.error);
      }
    },

    // preview
    previewFile({ url, types, check_local_file }) {
      let urls = "";
      if (check_local_file == true) {
        urls = "data:" + types + ";base64," + url;
      } else {
        urls = url;
      }
      axios
        .get(urls, { responseType: "blob" })
        .then((response) => {
          const blob = new Blob([response.data], { type: response.data.type });
          //console.log(blob)
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          window.open(link.href, "_blank");
        })
        .catch(console.error);
    },

    // download
    downloadFile({ url, label, types, check_local_file }) {
      let urls = "";
      if (check_local_file == true) {
        urls = "data:" + types + ";base64," + url;
      } else {
        urls = url;
      }
      axios
        .get(urls, { responseType: "blob" })
        .then((response) => {
          //console.log(response.data)
          const blob = new Blob([response.data], { type: response.data.type });
          //console.log(blob)
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = label;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
    },
    // ลบไฟล์ใน modal เอกสารแนบไฟล์
    deleteFile(fileName) {
      const index = this.data_file.findIndex((file) => file.name === fileName);
      // If file is in uploaded files remove it
      if (index > -1) this.data_file.splice(index, 1);
    },
    deleteFileWHT(fileName) {
      const index = this.data_file_wht.findIndex(
        (file) => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.data_file_wht.splice(index, 1);
    },
    // end

    // ปุ่มกด Return To Matched
    async ReturnToMatched(data){
      console.log(data)
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
      let body ={
        document_no: data.document_no
      }
      await this.axios
        .post(process.env.VUE_APP_API + `/statement/returnmatched`, body, headers)
        .then((response) => {
          if (response.status == 200) {
            this.finish = true;
            Swal.fire({
              icon: "success",
              title: "ข้อมูลถูก Return To Matched เรียบร้อย",
              showConfirmButton: false,
              timer: 2000,
            });
            this.matching_dialog = false;
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถ Return To Matched ข้อมูลได้",
              showConfirmButton: false,
              timer: 2000,
            });
            this.matching_dialog = false;
          }
        });
      this.$emit("edit_dialog");
      this.customer_no = "";
      this.remark_reject = "";
      this.remark_reversed = "";
      this.posting_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.status_reversed = "";
      this.customer_name = "";
      this.customer_email = "";
      this.data_statement_old = [];
      this.uploadedFiles = [];
      this.uploadedFilesWHT = [];
      this.data_file = [];
      this.data_file_wht = [];
      this.data_reverse = [];
      this.invoice_detail = [];
      this.checkall_invoice = false;
    },
    // ปุ่มกด Return To Pending
    async ReturnToPending(data){
      console.log(data)
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
      let body ={
        document_no: data.document_no
      }
      await this.axios
        .post(process.env.VUE_APP_API + `/statement/returnpending`, body, headers)
        .then((response) => {
          if (response.status == 200) {
            this.finish = true;
            Swal.fire({
              icon: "success",
              title: "ข้อมูลถูก Return To Pending เรียบร้อย",
              showConfirmButton: false,
              timer: 2000,
            });
            this.matching_dialog = false;
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถ Return To Pending ข้อมูลได้",
              showConfirmButton: false,
              timer: 2000,
            });
            this.matching_dialog = false;
          }
        });
      this.$emit("edit_dialog");
      this.customer_no = "";
      this.remark_reject = "";
      this.remark_reversed = "";
      this.posting_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.status_reversed = "";
      this.customer_name = "";
      this.customer_email = "";
      this.data_statement_old = [];
      this.uploadedFiles = [];
      this.uploadedFilesWHT = [];
      this.data_file = [];
      this.data_file_wht = [];
      this.data_reverse = [];
      this.invoice_detail = [];
      this.checkall_invoice = false;
    }
  },
};
</script>
<style scoped>
@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
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
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: rgb(103, 194, 93);
  font-size: 16px !important;
  color: white;
  text-align: center;
}
.status-header {
  border: 1px solid white;
  background-color: #25578d;
  font-size: 16px !important;
  color: white;
  text-align: center;
}
.invoice-header-data {
  border: 1px solid #ddd;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.table-invoice-input {
  width: 100%;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 5px;
  height: 45px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
}
/* #customers td {
  border: 1px solid #ddd;
} */
.invoice-table-checkbox {
  height: 30px;
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
  margin-left: -10px;
}
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
td.sequence-trc {
  border: 1px solid #ddd;
  width: 2%;
}
div#statement.v-data-table.theme--light.v-data-table__wrapper {
  overflow-x: clip !important;
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
input.form-control-reverse {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  width: 96% !important;
  border-radius: 1px;
  font-size: 14px;
}
input.form-control {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  border-radius: 1px;
  font-size: 14px;
}
/* end */
</style>
