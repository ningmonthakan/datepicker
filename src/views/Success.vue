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
            <h3 style="font-weight:700">Success</h3>
          </v-col>
          <v-col cols="12">
            <v-card>
              <!-----------------------------Tab Mail/Saved/Reject ------------------------------------>
              <v-card-text>
                <v-tabs v-model="tab" background-color="transparent">
                  <v-tab
                    v-for="(item, index) in tab_items"
                    :key="'msr' + index"
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <!----------------------------- Tab Transfer ------------------------------------>
                  <v-tab-item>
                    <v-card-title>
                      <div>
                        <v-btn
                          outlined
                          color="indigo"
                          v-b-modal.modal-scrollable-transfer
                          style="font-size: 12px"
                        >
                          <v-icon>mdi-format-list-bulleted-square</v-icon>
                          column
                        </v-btn>
                        <!-- <button
                          class="btn refresh-btn"
                          color="primary"
                          @click="refreshDataSaved()"
                        >
                          Refresh:
                          <v-icon black>mdi-refresh</v-icon>
                        </button> -->
                      </div>
                      <!-- -------------------------------------column---------------------------------------- -->
                      <b-modal
                        class="modal_column font-text-alert"
                        id="modal-scrollable-transfer"
                        title="Set Column"
                        style="width: 500px; !important"
                        @ok="Add_column_transfer()"
                        @cancel="cancel_colunm_transfer()"
                        data-backdrop="static"
                        no-close-on-backdrop
                      >
                        <div>
                          <v-data-table
                            :headers="headers_modal"
                            :items="column_transfer"
                            fixed-header
                            height="480"
                            hide-default-footer
                            :items-per-page="50"
                            style="overflow: auto"
                          >
                            <template v-slot:[`item.show`]="{ item }">
                              <v-simple-checkbox
                                :disabled="item.name == 'Document No'"
                                :ripple="false"
                                v-model="item.show"
                                @input="select_column_transfer($event, item)"
                              ></v-simple-checkbox>
                            </template>
                          </v-data-table>
                        </div>
                      </b-modal>
                      <!-- -------------------------------------End column---------------------------------------- -->
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_transfer()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_transfer"
                          label="Document No, Cus No, Cus Name"
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
                        @click="clearFilter_transfer()"
                        class="screen"
                        style="font-size: 12px"
                      >
                        Clear All
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-btn
                        color="primary"
                        outlined
                        style="width: 150px; font-size: 12px; font-weight: 600"
                        @click="exportFileTransfer()"
                      >
                        Export All File
                        <v-icon right dark> mdi-file-download-outline </v-icon>
                      </v-btn>
                    </v-card-text>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="column_select_transfer"
                          :items="datalist_transfer"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          height="600px"
                          id="invoice_book_1"
                          :items-per-page="datalist_transfer.length"
                        >
                          <!------------------------------=- filter Transfer---------------------------------->
                          <template v-slot:[`body.prepend`]>
                            <tr id="filter_success">
                              <!-- filter document no -->
                              <td class="fixed-invoice-new">
                                <input
                                  v-model="document_no_transfer"
                                  class="form-control"
                                  @change="
                                    filter(
                                      document_no_transfer,
                                      String('document_no'),
                                      String('transfer')
                                    )
                                  "
                                  placeholder="Document No"
                                  :disabled="document_no_blank_transfer == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="
                                      blank_checkbox('document_no', 'transfer')
                                    "
                                    v-model="document_no_blank_transfer"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter date -->
                              <td v-if="column_transfer[1].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_action_date_transfer"
                                  label="date"
                                  placeholder="Date"
                                  style="font-size:14px"
                                  v-b-modal.modal-transfer-center-date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_action_date_transfer"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-transfer-center-date"
                                    centered
                                    hide-footer
                                    title="Date"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabel"
                                      :cal-options="calOptions"
                                      @change="
                                        actionChange(
                                          action_date_range_transfer,
                                          'action_date',
                                          'transfer'
                                        )
                                      "
                                      v-model="action_date_range_transfer"
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
                                        @click="
                                          blankModal('action_date', 'transfer')
                                        "
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="
                                            hideModal('action_date', 'transfer')
                                          "
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="
                                            OkFilterModal(
                                              'action_date',
                                              'transfer'
                                            )
                                          "
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter customer no -->
                              <td v-if="column_transfer[2].show == true">
                                <input
                                  v-model="customer_no_transfer"
                                  class="form-control"
                                  @change="
                                    filter(
                                      customer_no_transfer,
                                      String('customer_no'),
                                      String('transfer')
                                    )
                                  "
                                  placeholder="Cus no."
                                  :disabled="customer_no_blank_transfer == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="
                                      blank_checkbox('customer_no', 'transfer')
                                    "
                                    v-model="customer_no_blank_transfer"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter cudtomer name  -->
                              <td v-if="column_transfer[3].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="
                                    search_customer_name_transfer
                                  "
                                  v-model="customer_name_transfer"
                                  type="text"
                                  label="Cus Name"
                                  :items="customer_name_list_transfer"
                                  @change="
                                    filter(
                                      customer_name_transfer,
                                      String('customer_name'),
                                      String('transfer')
                                    )
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter วันที่ชำระ -->
                              <td v-if="column_transfer[4].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_confirm_date_transfer"
                                  label="date"
                                  placeholder="วันที่ชำระ"
                                  v-b-modal.modal-transfer-center-confirm_date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  style="font-size:14px"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_confirm_date_transfer"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-transfer-center-confirm_date"
                                    centered
                                    hide-footer
                                    title="วันที่ชำระ"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabel"
                                      :cal-options="calOptions"
                                      @change="
                                        actionChange(
                                          confirm_date_range_transfer,
                                          'confirm_date',
                                          'transfer'
                                        )
                                      "
                                      v-model="confirm_date_range_transfer"
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
                                        @click="
                                          blankModal('confirm_date', 'transfer')
                                        "
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="
                                            hideModal(
                                              'confirm_date',
                                              'transfer'
                                            )
                                          "
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="
                                            OkFilterModal(
                                              'confirm_date',
                                              'transfer'
                                            )
                                          "
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter bank -->
                              <td v-if="column_transfer[5].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="payment_type_bank_transfer"
                                  type="text"
                                  style="font-size:14px"
                                  label="ช่องทางการชำระเงิน"
                                  :items="payment_type_list"
                                  @change="
                                    filter(
                                      payment_type_bank_transfer,
                                      String('payment_type_bank'),
                                      String('transfer')
                                    )
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter รวมยอดชำระ -->
                              <td v-if="column_transfer[6].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  multiple
                                  dense
                                  v-model="sum_amounts_transfer"
                                  type="text"
                                  label="รวมยอดชำระ"
                                  :items="sum_amounts_list"
                                  @change="
                                    filter(
                                      sum_amounts_transfer,
                                      String('sum_amounts'),
                                      String('transfer')
                                    )
                                  "
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <td v-if="column_transfer[7].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="type_debt_transfer"
                                  type="text"
                                  style="font-size:14px"
                                  label="ประเภทตัดหนี้"
                                  :items="type_debt_list"
                                  @change="
                                    filter(
                                      type_debt_transfer,
                                      String('type_debt'),
                                      String('transfer')
                                    )
                                  "
                                ></v-autocomplete>
                              </td>

                              <!-- filter หลักฐานการชำระ -->
                              <td v-if="column_transfer[8].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_transfer"
                                  type="text"
                                  style="font-size:14px"
                                  label="หลักฐานการชำระ"
                                  :items="pay_list"
                                  @change="
                                    filter(
                                      status_file_transfer,
                                      String('status_file'),
                                      String('transfer')
                                    )
                                  "
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file หลักฐาน -->
                              <td v-if="column_transfer[9].show == true"></td>
                              <!-- filter wht -->
                              <td v-if="column_transfer[10].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_wht_transfer"
                                  type="text"
                                  label="WHT"
                                  style="font-size:14px"
                                  :items="wht_list"
                                  @change="
                                    filter(
                                      check_wht_transfer,
                                      String('check_wht'),
                                      String('transfer')
                                    )
                                  "
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter เอกสาร wht -->
                              <td v-if="column_transfer[11].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_wht_transfer"
                                  type="text"
                                  label="เอกสาร WHT"
                                  style="font-size:14px"
                                  :items="file_wht_list"
                                  @change="
                                    filter(
                                      status_file_wht_transfer,
                                      String('status_file_wht'),
                                      String('transfer')
                                    )
                                  "
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file wht -->
                              <td v-if="column_transfer[12].show == true"></td>
                              <!-- filter Mail WHT -->
                              <td v-if="column_transfer[13].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_mail_wht_transfer"
                                  type="text"
                                  label="Mail WHT"
                                  style="font-size:14px"
                                  :items="check_wht_list"
                                  @change="
                                    filter(
                                      check_mail_wht_transfer,
                                      String('check_mail_wht'),
                                      String('transfer')
                                    )
                                  "
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter request day -->
                              <td v-if="column_transfer[14].show == true">
                                <input
                                  class="form-control"
                                  v-model="request_day_transfer"
                                  type="text"
                                  placeholder="Mail Confirm Invoice"
                                  @change="
                                    filter(
                                      request_day_transfer,
                                      String('request_day'),
                                      String('transfer')
                                    )
                                  "
                                  :disabled="request_day_blank_transfer == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="
                                      blank_checkbox('request_day', 'transfer')
                                    "
                                    v-model="request_day_blank_transfer"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter remark -->
                              <td v-if="column_transfer[15].show == true">
                                <input
                                  class="form-control"
                                  v-model="remark_transfer"
                                  type="text"
                                  placeholder="Remark"
                                  style="font-size:14px"
                                  @change="
                                    filter(
                                      remark_transfer,
                                      String('remark'),
                                      String('transfer')
                                    )
                                  "
                                  :disabled="remark_blank_transfer == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="
                                      blank_checkbox('remark', 'transfer')
                                    "
                                    v-model="remark_blank_transfer"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter user -->
                              <td v-if="column_transfer[16].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  v-model="user_name_transfer"
                                  type="text"
                                  multiple
                                  label="User"
                                  style="font-size:14px"
                                  :items="user_name_list_transfer"
                                  @change="
                                    filter(
                                      user_name_transfer,
                                      String('action_by_name'),
                                      String('transfer')
                                    )
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter action -->
                              <td v-if="column_transfer[17].show == true"></td>
                            </tr>
                          </template>
                          <!-------------------------------- end filter Transfer------------------------------>
                          <template v-slot:[`item.document_no`]="{ item }">
                            {{ item.document_no }}
                          </template>
                          <template v-slot:[`item.action_date`]="{ item }">
                            <label
                              v-if="
                                parseDateTime(item.action_date) != '01/01/0001'
                              "
                            >
                              {{ parseDateTime(item.action_date) }}</label
                            >
                          </template>
                          <template v-slot:[`item.confirm_date`]="{ item }">
                            <label
                              v-if="
                                parseDate(item.confirm_date) != '01/01/0001'
                              "
                            >
                              {{ parseDate(item.confirm_date) }}</label
                            >
                          </template>
                          <template v-slot:[`item.sum_amounts`]="{ item }">
                            <v-chip
                              style="z-index: 1"
                              :color="getColor(item.sum_amounts)"
                              dark
                            >
                              {{ convert(item.sum_amounts) }}
                            </v-chip>
                          </template>
                          <template v-slot:[`item.status_file`]="{ item }">
                            <v-checkbox
                              v-model="item.status_file"
                              disabled
                            ></v-checkbox>
                          </template>
                          <template v-slot:[`item.file`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no, 'file')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_wht`]="{ item }">
                            <v-checkbox
                              v-model="item.check_wht"
                              disabled
                            ></v-checkbox>
                          </template>
                          <template v-slot:[`item.status_file_wht`]="{ item }">
                            <v-checkbox
                              v-model="item.status_file_wht"
                              disabled
                            ></v-checkbox>
                          </template>
                          <template v-slot:[`item.file_wht`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no, 'wht')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_mail_wht`]="{ item }">
                            <v-checkbox
                              v-model="item.check_mail_wht"
                              disabled
                            ></v-checkbox>
                          </template>
                          <template v-slot:[`item.request_day`]="{ item }">
                            {{ item.request_day }}
                          </template>
                          <template v-slot:[`item.remark`]="{ item }">
                            <b-textarea
                              placeholder="remark"
                              v-model="item.remark"
                              rows="1"
                              max-rows="1"
                              disabled
                              style="border-radius: 0px;"
                            ></b-textarea>
                          </template>
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              dark
                              style="font-size: 12px"
                              @click="Detail(item)"
                            >
                              Detail
                              <v-icon right dark
                                >mdi-chevron-double-right</v-icon
                              >
                            </v-btn>
                            <!-- <v-btn class="ma-2" small outlined fab color="indigo">
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn> -->
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
                            v-model="item_per_page_table_transfer"
                            @change="item_per_page_inc_table_transfer()"
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
                            v-model="page_table_transfer"
                            :length="page_total_table_transfer"
                            :total-visible="10"
                            @input="pageChangeTableTransfer()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- ------------------------------------End table Main ปิดระบบ--------------------------------------------- -->
                  </v-tab-item>
                  <!-----------------------------end Tab Transfer ------------------------------------>
                  <!-----------------------------Tab CHQ ------------------------------------>
                  <v-tab-item>
                    <v-card-title>
                      <div>
                        <v-btn
                          outlined
                          color="indigo"
                          v-b-modal.modal-scrollable-chq
                          style="font-size: 12px"
                        >
                          <v-icon>mdi-format-list-bulleted-square</v-icon>
                          column
                        </v-btn>
                        <!-- <button
                          class="btn refresh-btn"
                          color="primary"
                          @click="refreshDataSaved()"
                        >
                          Refresh:
                          <v-icon black>mdi-refresh</v-icon>
                        </button> -->
                      </div>
                      <!-- -------------------------------------column---------------------------------------- -->
                      <b-modal
                        class="modal_column font-text-alert"
                        id="modal-scrollable-chq"
                        title="Set Column"
                        style="width: 500px; !important"
                        @ok="Add_column_chq()"
                        @cancel="cancel_colunm_chq()"
                        data-backdrop="static"
                        no-close-on-backdrop
                      >
                        <div>
                          <v-data-table
                            :headers="headers_modal"
                            :items="column_chq"
                            fixed-header
                            height="480"
                            hide-default-footer
                            :items-per-page="50"
                            style="overflow: auto"
                          >
                            <template v-slot:[`item.show`]="{ item }">
                              <v-simple-checkbox
                                :disabled="item.name == 'Document No'"
                                :ripple="false"
                                v-model="item.show"
                                @input="select_column_chq($event, item)"
                              ></v-simple-checkbox>
                            </template>
                          </v-data-table>
                        </div>
                      </b-modal>
                      <!-- -------------------------------------End column---------------------------------------- -->
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_chq()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_chq"
                          label="Document No, Cus No, Cus Name"
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
                        @click="clearFilter_chq()"
                        class="screen"
                        style="font-size: 12px"
                      >
                        Clear All
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-btn
                        color="primary"
                        outlined
                        style="width: 150px; font-size: 12px; font-weight: 600"
                        @click="exportFileCHQ()"
                      >
                        Export All File
                        <v-icon right dark> mdi-file-download-outline </v-icon>
                      </v-btn>
                    </v-card-text>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="column_select_chq"
                          :items="datalist_chq"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          height="600px"
                          id="invoice_book_1"
                          :items-per-page="datalist_chq.length"
                        >
                          <!------------------------------=- filter CHQ---------------------------------->
                          <template v-slot:[`body.prepend`]>
                            <tr id="filter_success">
                              <!-- filter document no -->
                              <td class="fixed-invoice-new">
                                <input
                                  v-model="document_no_chq"
                                  class="form-control"
                                  @change="
                                    filter(
                                      document_no_chq,
                                      String('document_no'),
                                      String('chq')
                                    )
                                  "
                                  placeholder="Document No"
                                  :disabled="document_no_blank_chq == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="
                                      blank_checkbox('document_no', 'chq')
                                    "
                                    v-model="document_no_blank_chq"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter date -->
                              <td v-if="column_chq[1].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_action_date_chq"
                                  label="date"
                                  placeholder="Date"
                                  style="font-size:14px"
                                  v-b-modal.modal-chq-center-date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_action_date_chq"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-chq-center-date"
                                    centered
                                    hide-footer
                                    title="Date"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabel"
                                      :cal-options="calOptions"
                                      @change="
                                        actionChange(
                                          action_date_range_chq,
                                          'action_date',
                                          'chq'
                                        )
                                      "
                                      v-model="action_date_range_chq"
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
                                        @click="
                                          blankModal('action_date', 'chq')
                                        "
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="
                                            hideModal('action_date', 'chq')
                                          "
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="
                                            OkFilterModal('action_date', 'chq')
                                          "
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter customer no -->
                              <td v-if="column_chq[2].show == true">
                                <input
                                  v-model="customer_no_chq"
                                  class="form-control"
                                  @change="
                                    filter(
                                      customer_no_chq,
                                      String('customer_no'),
                                      String('chq')
                                    )
                                  "
                                  placeholder="Cus no."
                                  :disabled="customer_no_blank_chq == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="
                                      blank_checkbox('customer_no', 'chq')
                                    "
                                    v-model="customer_no_blank_chq"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter cudtomer name  -->
                              <td v-if="column_chq[3].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_customer_name_chq"
                                  v-model="customer_name_chq"
                                  type="text"
                                  label="Cus Name"
                                  :items="customer_name_list_chq"
                                  @change="
                                    filter(
                                      customer_name_chq,
                                      String('customer_name'),
                                      String('chq')
                                    )
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter วันที่ชำระ -->
                              <td v-if="column_chq[4].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_confirm_date_chq"
                                  label="date"
                                  placeholder="วันที่ชำระ"
                                  v-b-modal.modal-chq-center-confirm_date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  style="font-size:14px"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_confirm_date_chq"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-chq-center-confirm_date"
                                    centered
                                    hide-footer
                                    title="วันที่ชำระ"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabel"
                                      :cal-options="calOptions"
                                      @change="
                                        actionChange(
                                          confirm_date_range_chq,
                                          'confirm_date',
                                          'chq'
                                        )
                                      "
                                      v-model="confirm_date_range_chq"
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
                                        @click="
                                          blankModal('confirm_date', 'chq')
                                        "
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="
                                            hideModal('confirm_date', 'chq')
                                          "
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="
                                            OkFilterModal('confirm_date', 'chq')
                                          "
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter bank -->
                              <td v-if="column_chq[5].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="payment_type_bank_chq"
                                  type="text"
                                  style="font-size:14px"
                                  label="ช่องทางการชำระเงิน"
                                  :items="payment_type_list"
                                  @change="
                                    filter(
                                      payment_type_bank_chq,
                                      String('payment_type_bank'),
                                      String('chq')
                                    )
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter รวมยอดชำระ -->
                              <td v-if="column_chq[6].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  multiple
                                  dense
                                  v-model="sum_amounts_chq"
                                  type="text"
                                  label="รวมยอดชำระ"
                                  :items="sum_amounts_list"
                                  @change="
                                    filter(
                                      sum_amounts_chq,
                                      String('sum_amounts'),
                                      String('chq')
                                    )
                                  "
                                  item-text="name"
                                ></v-autocomplete>
                              </td>

                              <!-- filter ประเภทตัดหนี้ -->
                              <td v-if="column_chq[7].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  multiple
                                  dense
                                  v-model="type_debt_chq"
                                  type="text"
                                  label="ประเภทตัดหนี้"
                                  :items="type_debt_chq_list"
                                  @change="
                                    filter(
                                      type_debt_chq,
                                      String('type_debt'),String('chq'))
                                  "
                                ></v-autocomplete>
                              </td>

                              <!-- filter วันที่หน้าเช็ค  ไปดูหน้า report bank statement-->
                              <td v-if="column_chq[8].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_check_date"
                                  label="date"
                                  placeholder="วันที่หน้าเช็ค"
                                  v-b-modal.modal-chq-center-check_date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  style="font-size:14px"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_check_date"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-chq-center-check_date"
                                    centered
                                    hide-footer
                                    title="วันที่หน้าเช็ค"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabel"
                                      :cal-options="calOptions"
                                      @change="
                                        actionChange(
                                          check_date_range,
                                          'check_date',
                                          'chq'
                                        )
                                      "
                                      v-model="check_date_range"
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
                                        @click="blankModal('check_date', 'chq')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click=" hideModal('check_date', 'chq')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('check_date', 'chq') "
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>

                              <!-- filter ธนาคารเช็ค -->
                              <td v-if="column_chq[9].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  multiple
                                  dense
                                  v-model="bank_check_list"
                                  type="text"
                                  label="ธนาคารเช็ค"
                                  :items="bank_list"
                                  @change="
                                    filter(
                                      bank_check_list,
                                      String('bank_check_list'),String('chq'))
                                  "
                                ></v-autocomplete>
                              </td>

                              <!-- filter CHQ No. -->
                              <td v-if="column_chq[10].show == true">
                                <input
                                  v-model="chq_no_chq"
                                  class="form-control"
                                  @change="
                                    filter(
                                      chq_no_chq,
                                      String('chq_no'),
                                      String('chq')
                                    )
                                  "
                                  placeholder="CHQ no."
                                  :disabled="chq_no_blank_chq == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="
                                      blank_checkbox('chq_no', 'chq')
                                    "
                                    v-model="chq_no_blank_chq"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>                
                              </td>

                              <!-- filter หลักฐานการชำระ -->
                              <td v-if="column_chq[11].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_chq"
                                  type="text"
                                  style="font-size:14px"
                                  label="หลักฐานการชำระ"
                                  :items="pay_list"
                                  @change="
                                    filter(
                                      status_file_chq,
                                      String('status_file'),
                                      String('chq')
                                    )
                                  "
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file หลักฐาน -->
                              <td v-if="column_chq[12].show == true"></td>
                              <!-- filter wht -->
                              <td v-if="column_chq[13].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_wht_chq"
                                  type="text"
                                  label="WHT"
                                  style="font-size:14px"
                                  :items="wht_list"
                                  @change="
                                    filter(
                                      check_wht_chq,
                                      String('check_wht'),
                                      String('chq')
                                    )
                                  "
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter เอกสาร wht -->
                              <td v-if="column_chq[14].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_wht_chq"
                                  type="text"
                                  label="เอกสาร WHT"
                                  style="font-size:14px"
                                  :items="file_wht_list"
                                  @change="
                                    filter(
                                      status_file_wht_chq,
                                      String('status_file_wht'),
                                      String('chq')
                                    )
                                  "
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file wht -->
                              <td v-if="column_chq[15].show == true"></td>
                              <!-- filter Mail WHT -->
                              <td v-if="column_chq[16].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_mail_wht_chq"
                                  type="text"
                                  label="Mail WHT"
                                  style="font-size:14px"
                                  :items="check_wht_list"
                                  @change="
                                    filter(
                                      check_mail_wht_chq,
                                      String('check_mail_wht'),
                                      String('chq')
                                    )
                                  "
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter request day -->
                              <td v-if="column_chq[17].show == true">
                                <input
                                  class="form-control"
                                  v-model="request_day_chq"
                                  type="text"
                                  placeholder="Mail Confirm Invoice"
                                  @change="
                                    filter(
                                      request_day_chq,
                                      String('request_day'),
                                      String('chq')
                                    )
                                  "
                                  :disabled="request_day_blank_chq == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="
                                      blank_checkbox('request_day', 'chq')
                                    "
                                    v-model="request_day_blank_chq"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter remark -->
                              <td v-if="column_chq[18].show == true">
                                <input
                                  class="form-control"
                                  v-model="remark_chq"
                                  type="text"
                                  placeholder="Remark"
                                  style="font-size:14px"
                                  @change="
                                    filter(
                                      remark_chq,
                                      String('remark'),
                                      String('chq')
                                    )
                                  "
                                  :disabled="remark_blank_chq == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('remark', 'chq')"
                                    v-model="remark_blank_chq"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter user -->
                              <td v-if="column_chq[19].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  v-model="user_name_chq"
                                  type="text"
                                  multiple
                                  label="User"
                                  style="font-size:14px"
                                  :items="user_name_list_chq"
                                  @change="
                                    filter(
                                      user_name_chq,
                                      String('action_by_name'),
                                      String('chq')
                                    )
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter action -->
                              <td v-if="column_chq[20].show == true"></td>
                            </tr>
                          </template>
                          <!-------------------------------- end filter CHQ------------------------------>
                          <template v-slot:[`item.document_no`]="{ item }">
                            {{ item.document_no }}
                          </template>
                          <template v-slot:[`item.action_date`]="{ item }">
                            <label
                              v-if="
                                parseDateTime(item.action_date) != '01/01/0001'
                              "
                            >
                              {{ parseDateTime(item.action_date) }}</label
                            >
                          </template>
                          <template v-slot:[`item.confirm_date`]="{ item }">
                            <label
                              v-if="
                                parseDate(item.confirm_date) != '01/01/0001'
                              "
                            >
                              {{ parseDate(item.confirm_date) }}</label
                            >
                          </template>
                          <template v-slot:[`item.check_date_chq`]="{ item }">
                            <label
                              v-if="parseDate(item.check_date_chq) != '01/01/0001'"
                            >
                              {{ parseDate(item.check_date_chq) }}</label
                            >
                          </template>
                          <template v-slot:[`item.sum_amounts`]="{ item }">
                            <v-chip
                              style="z-index: 1"
                              :color="getColor(item.sum_amounts)"
                              dark
                            >
                              {{ convert(item.sum_amounts) }}
                            </v-chip>
                          </template>
                          <template v-slot:[`item.status_file`]="{ item }">
                            <v-checkbox
                              v-model="item.status_file"
                              disabled
                            ></v-checkbox>
                          </template>
                          <template v-slot:[`item.file`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no, 'file')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_wht`]="{ item }">
                            <v-checkbox
                              v-model="item.check_wht"
                              disabled
                            ></v-checkbox>
                          </template>
                          <template v-slot:[`item.status_file_wht`]="{ item }">
                            <v-checkbox
                              v-model="item.status_file_wht"
                              disabled
                            ></v-checkbox>
                          </template>
                          <template v-slot:[`item.file_wht`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no, 'wht')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_mail_wht`]="{ item }">
                            <v-checkbox
                              v-model="item.check_mail_wht"
                              disabled
                            ></v-checkbox>
                          </template>
                          <template v-slot:[`item.request_day`]="{ item }">
                            {{ item.request_day }}
                          </template>
                          <template v-slot:[`item.remark`]="{ item }">
                            <b-textarea
                              placeholder="remark"
                              v-model="item.remark"
                              rows="1"
                              max-rows="1"
                              disabled
                              style="border-radius: 0px;"
                            ></b-textarea>
                          </template>
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              dark
                              style="font-size: 12px"
                              @click="Detail(item)"
                            >
                              Detail
                              <v-icon right dark
                                >mdi-chevron-double-right</v-icon
                              >
                            </v-btn>
                            <!-- <v-btn class="ma-2" small outlined fab color="indigo">
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn> -->
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
                            v-model="item_per_page_table_chq"
                            @change="item_per_page_inc_table_chq()"
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
                            v-model="page_table_chq"
                            :length="page_total_table_chq"
                            :total-visible="10"
                            @input="pageChangeTableCHQ()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- ------------------------------------End table Main เปิดระบบ--------------------------------------------- -->
                  </v-tab-item>
                  <!----------------------------- end Tab CHQ ------------------------------------>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <dialog-view-file
      :file_dialog="file_dialog"
      @close_file_dialog="close_file_dialog"
      @edit_dialog="edit_dialog"
    />
    <matching-dialog
      :payment_type_bank="type_matched_success"
      @edit_dialog="edit_dialog"
    />
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
import JsonCSV from "vue-json-csv";
Vue.component("downloadCsv", JsonCSV);
import eventBus from "../event-bus";
import MatchingDialog from "../components/ViewMatchingDialog.vue";
import DialogViewFile from "../components/DialogViewFile.vue";

export default {
  components: {
    "matching-dialog": MatchingDialog,
    "dialog-view-file": DialogViewFile,
  },
  data: () => ({
    transfer_data: [],
    chq_data: [],
    finish: true,
    tab: null,
    tab_items: ["TRANSFER", "CHQ"],
    search_transfer: "",
    search_chq: "",
    item_per_page_table_transfer: 100,
    page_table_transfer: 1,
    page_total_table_transfer: 1,

    item_per_page_table_chq: 100,
    page_table_chq: 1,
    page_total_table_chq: 1,

    show_column_transfer: [],
    column_select_transfer: [],
    list_column_transfer: [],
    show_column_chq: [],
    column_select_chq: [],
    list_column_chq: [],

    file_dialog: false,
    // ==========serach====================
    headers_modal: [
      {
        text: "Column Name",
        align: "start",
        sortable: false,
        value: "name",
        width: "200px",
      },
      {
        text: "Show",
        align: "start",
        value: "show",
        sortable: false,
        width: "50px",
      },
    ],
    headers_transfer: [
      {
        text: "Document No",
        value: "document_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      {
        text: "Date",
        value: "action_date",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer No",
        value: "customer_no",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer Name",
        value: "customer_name",
        width: "350px",
        sortable: true,
        align: "left",
      },
      {
        text: "วันที่ชำระ",
        value: "confirm_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Bank",
        value: "payment_type_bank",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "รวมยอดชำระ",
        value: "sum_amounts",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "ประเภทตัดหนี้",
        value: "type_debt",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "หลักฐานการชำระ",
        value: "status_file",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "File หลักฐาน",
        value: "file",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "WHT",
        value: "check_wht",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "เอกสาร WHT",
        value: "status_file_wht",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "File WHT",
        value: "file_wht",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mail WHT",
        value: "check_mail_wht",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mail Confirm Invoice",
        value: "request_day",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Remark",
        value: "remark",
        width: "300px",
        align: "left",
        sortable: true,
      },
      {
        text: "User",
        value: "action_by_name",
        width: "250px",
        align: "center",
        sortable: true,
      },
      {
        text: "ส่งตัดหนี้",
        value: "action",
        width: "200px",
        align: "center",
        sortable: true,
      },
    ],
    headers_chq: [
      {
        text: "Document No",
        value: "document_no",
        width: "200px",
        sortable: true,
        class: "invoice1",
      },
      {
        text: "Date",
        value: "action_date",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer No",
        value: "customer_no",
        width: "200px",
        sortable: true,
        align: "left",
      },
      {
        text: "Customer Name",
        value: "customer_name",
        width: "350px",
        sortable: true,
        align: "left",
      },
      {
        text: "วันที่ชำระ",
        value: "confirm_date",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Bank",
        value: "payment_type_bank",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "รวมยอดชำระ",
        value: "sum_amounts",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "ประเภทตัดหนี้",
        value: "type_debt",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่หน้าเช็ค",
        value: "check_date_chq",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "ธนาคารเช็ค",
        value: "bank_check_list",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "CHQ No.",
        value: "chq_no",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "หลักฐานการชำระ",
        value: "status_file",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "File หลักฐาน",
        value: "file",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "WHT",
        value: "check_wht",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "เอกสาร WHT",
        value: "status_file_wht",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "File WHT",
        value: "file_wht",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mail WHT",
        value: "check_mail_wht",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Mail Confirm Invoice",
        value: "request_day",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Remark",
        value: "remark",
        width: "300px",
        align: "left",
        sortable: true,
      },
      {
        text: "User",
        value: "action_by_name",
        width: "250px",
        align: "center",
        sortable: true,
      },
      {
        text: "ส่งตัดหนี้",
        value: "action",
        width: "200px",
        align: "center",
        sortable: true,
      },
    ],
    column_transfer: [
      {
        name: "Document No",
        show: true,
        fixed: true,
        value: "document_no",
      },
      {
        name: "Date",
        show: true,
        fixed: true,
        value: "action_date",
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
        name: "วันที่ชำระ",
        show: true,
        fixed: false,
        value: "confirm_date",
      },
      {
        name: "Bank",
        show: true,
        fixed: false,
        value: "payment_type_bank",
      },
      {
        name: "รวมยอดชำระ",
        show: true,
        fixed: false,
        value: "sum_amounts",
      },
      {
        name: "ประเภทตัดหนี้",
        show: true,
        fixed: false,
        value: "type_debt",
      },
      {
        name: "หลักฐานการชำระ",
        show: true,
        fixed: false,
        value: "status_file",
      },
      {
        name: "File หลักฐาน",
        show: true,
        fixed: false,
        value: "file",
      },
      {
        name: "WHT",
        show: true,
        fixed: false,
        value: "check_wht",
      },
      {
        name: "เอกสาร WHT",
        show: true,
        fixed: false,
        value: "status_file_wht",
      },
      {
        name: "File WHT",
        show: true,
        fixed: false,
        value: "file_wht",
      },
      {
        name: "Mail WHT",
        show: true,
        fixed: false,
        value: "check_mail_wht",
      },
      {
        name: "Mail Confirm Invoice",
        show: true,
        fixed: false,
        value: "request_day",
      },
      {
        name: "Remark",
        show: true,
        fixed: false,
        value: "remark",
      },
      {
        name: "User",
        show: true,
        fixed: false,
        value: "action_by_name",
      },
      {
        name: "ส่งตัดหนี้",
        show: true,
        fixed: false,
        value: "action",
      },
    ],
    column_chq: [
      {
        name: "Document No",
        show: true,
        fixed: true,
        value: "document_no",
      },
      {
        name: "Date",
        show: true,
        fixed: true,
        value: "action_date",
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
        name: "วันที่ชำระ",
        show: true,
        fixed: false,
        value: "confirm_date",
      },
      {
        name: "Bank",
        show: true,
        fixed: false,
        value: "payment_type_bank",
      },
      {
        name: "รวมยอดชำระ",
        show: true,
        fixed: false,
        value: "sum_amounts",
      },
      {
        name: "ประเภทตัดหนี้",
        show: true,
        fixed: false,
        value: "type_debt",
      },
      {
        name: "วันที่หน้าเช็ค",
        show: true,
        fixed: false,
        value: "check_date_chq",
      },
      {
        name: "ธนาคารเช็ค",
        show: true,
        fixed: false,
        value: "bank_check_list",
      },
      {
        name: "CHQ No.",
        show: true,
        fixed: false,
        value: "chq_no",
      },

      {
        name: "หลักฐานการชำระ",
        show: true,
        fixed: false,
        value: "status_file",
      },
      {
        name: "File หลักฐาน",
        show: true,
        fixed: false,
        value: "file",
      },
      {
        name: "WHT",
        show: true,
        fixed: false,
        value: "check_wht",
      },
      {
        name: "เอกสาร WHT",
        show: true,
        fixed: false,
        value: "status_file_wht",
      },
      {
        name: "File WHT",
        show: true,
        fixed: false,
        value: "file_wht",
      },
      {
        name: "Mail WHT",
        show: true,
        fixed: false,
        value: "check_mail_wht",
      },
      {
        name: "Mail Confirm Invoice",
        show: true,
        fixed: false,
        value: "request_day",
      },
      {
        name: "Remark",
        show: true,
        fixed: false,
        value: "remark",
      },
      {
        name: "User",
        show: true,
        fixed: false,
        value: "action_by_name",
      },
      {
        name: "ส่งตัดหนี้",
        show: true,
        fixed: false,
        value: "action",
      },
    ],
    // filter
    action_date_range_transfer: {
      startDate: null,
      endDate: null,
    },
    action_date_range_chq: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range_transfer: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range_chq: {
      startDate: null,
      endDate: null,
    },
    check_date_range: {
      startDate: null,
      endDate: null,
    },
    text_action_date_transfer: null,
    text_action_date_chq: null,
    text_confirm_date_transfer: null,
    text_confirm_date_chq: null,
    text_check_date: null,
    action_date_transfer: [null, null],
    action_date_chq: [null, null],
    check_date_chq: [null, null],
    confirm_date_transfer: [null, null],
    confirm_date_chq: [null, null],
    dateEndLabel: "End date",
    calOptions: {
      dateFormat: "d/m/Y",
    },
    remark_blank_transfer: false,
    remark_blank_chq: false,
    customer_no_blank_transfer: false,
    customer_no_blank_chq: false,
    chq_no_blank_chq: false,
    document_no_blank_transfer: false,
    document_no_blank_chq: false,
    request_day_blank_transfer: false,
    request_day_blank_chq: false,
    chq_no_chq: "",
    customer_no_transfer: "",
    customer_no_chq: "",
    document_no_transfer: "",
    document_no_chq: "",
    request_day_transfer: "",
    request_day_chq: "",
    customer_name_transfer: "",
    customer_name_chq: "",
    search_customer_name_transfer: null,
    search_customer_name_chq: null,
    customer_name_list_transfer: [],
    customer_name_list_chq: [],
    filterlist: [],
    Alldata: [],
    user_name_transfer: "",
    user_name_chq: "",
    user_name_list_transfer: [],
    user_name_list_chq: [],
    pay_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
    file_wht_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
    check_wht_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
    wht_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
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
    sum_amounts_list: [
      {
        name: "0",
        value: "0",
      },
      {
        name: "มากกว่า 0",
        value: "1",
      },
    ],
    remark_transfer: "",
    remark_chq: "",
    status_file_transfer: "",
    status_file_chq: "",
    status_file_wht_transfer: "",
    status_file_wht_chq: "",
    check_mail_wht_transfer: "",
    check_mail_wht_chq: "",
    check_wht_transfer: "",
    check_wht_chq: "",
    sum_amounts_transfer: "",
    sum_amounts_chq: "",
    payment_type_bank_transfer: "",
    payment_type_bank_chq: "",

    //filter วันที่เช็ค


    //filter ธนาคารเช็ค
    bank_check_list: "",
    bank_list: [
      "[blank]",
      "AMERICA",
      "BAAC",
      "BAY",
      "BBL",
      "BNP",
      "CIMB",
      "CITI",
      "Deutsche",
      "EXIM",
      "GHBANK",
      "GOV",
      "GSB",
      "HSBC",
      "ICBC",
      "J.P.MORGAN",
      "KBANK",
      "KKB",
      "KTB",
      "LHBANK",
      "MIZUHO",
      "SCB",
      "StandardChartered",
      "Sumitomo",
      "TANACHART",
      "TCRB",
      "TISCO",
      "TMB",
      "TTB",
      "UOB"
    ],

    type_debt_transfer: "",
    type_debt_list: [
      { text: "Transfer" },
      { text: "Suspense" },
      { text: "Adjust JV"},
      { text: "Transfer-CHQ"}
    ],
    //filter ประเภทตัดหนี้
    type_debt_chq: "",
    type_debt_chq_list: [
      { text: "CHQ" },
      { text: "Suspense" },
      { text: "Adjust JV"}
    ],
    // end
    datalist_transfer: [], //ตาราง Transfer
    datalist_chq: [], //ตาราง CHQ
    wait_role: "",
    item_file: [],
    mail_dialog: false,
    type_matched_success: "",
  }),
  created() {
    this.role_status = localStorage.getItem("role");
    this.wait_role = localStorage.getItem("wait_role");
    if (localStorage.getItem("acces_token")) {
      this.finish = false;
      this.getAll();
    } else {
      this.$router.push("/login");
    }
  },
  watch: {},
  computed: {},

  methods: {
    getColor(data) {
      if (data) {
        return "green";
      }
    },
    async getAll() {
      await this.getTransfer();
      await this.getCHQ();
      await this.setting_column_transfer();
      await this.setting_column_chq();
    },
    exportFileTransfer() {
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
        .get(process.env.VUE_APP_API + "/export/success/Transfer", headers)
        .then((response) => {
          // console.log(response)
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_success_transfer.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
        });
    },
    exportFileCHQ() {
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
        .get(process.env.VUE_APP_API + "/export/success/CHQ", headers)
        .then((response) => {
          // console.log(response)
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_success_chq.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
        });
    },
    convert(item) {
      return Number(item).toLocaleString();
    },
    select_approve(item) {
      this.modal_approve = item;
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    parseDateTime(date) {
      return date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "";
    },
    // ข้อมูล Transfer
    async getTransfer() {
      //console.log(this.search_transfer)
      this.finish = false;
      this.datalist_transfer = [];
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      await this.axios
        .get(
          process.env.VUE_APP_API +
            "/statement/getsuccess/Transfer?size=" +
            this.item_per_page_table_transfer +
            "&page=" +
            this.page_table_transfer +
            "&search=" +
            String(this.search_transfer),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_transfer = response.data.data;
            this.Alldata = response.data.data;
            this.page_total_table_transfer = response.data.count_page;
            // this.getCHQ();
            if (this.datalist_transfer !== null) {
              this.customer_name_list_transfer = [];
              this.user_name_list_transfer = [];
              this.listfilter_data("", "customer_name", "transfer");
              this.listfilter_data("", "action_by_name", "transfer");
            }
          } else {
            this.finish = true;
            this.datalist_transfer = [];
            this.page_total_table_transfer = 1;
            // this.getCHQ();
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
    },
    async setting_column_transfer(){
      this.finish = false;
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      this.show_column_transfer = [];
      this.column_select_transfer = [];
      this.list_column_transfer = [];

      for (let i = 0; i < this.headers_transfer.length; i++) {
        if (this.headers_transfer[i].value == "document_no") {
          this.show_column_transfer.push(this.headers_transfer[i]);
          this.column_select_transfer.push(this.headers_transfer[i]);
          this.list_column_transfer.push(this.headers_transfer[i]);
        }
      }
      this.axios
        .get(process.env.VUE_APP_API + "/setting/columns/list/statement/Success/Transfer", headers)
        .then((response) => {
          for (let index = 0; index < this.column_transfer.length; index++) {
            if (this.column_transfer[index].value == "action_date") {
              this.column_transfer[index].show = response.data.action_date;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "action_date" &&
                  response.data.action_date == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "customer_no") {
              this.column_transfer[index].show = response.data.customer_no;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "customer_no" &&
                  response.data.customer_no == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "customer_name") {
              this.column_transfer[index].show = response.data.customer_name;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "customer_name" &&
                  response.data.customer_name == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "confirm_date") {
              this.column_transfer[index].show = response.data.confirm_date;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "confirm_date" &&
                  response.data.confirm_date == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "payment_type_bank") {
              this.column_transfer[index].show = response.data.payment_type_bank;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "payment_type_bank" &&
                  response.data.payment_type_bank == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "sum_amounts") {
              this.column_transfer[index].show = response.data.sum_amounts;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "sum_amounts" &&
                  response.data.sum_amounts == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "type_debt") {
              this.column_transfer[index].show = response.data.type_debt;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "type_debt" &&
                  response.data.type_debt == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "status_file") {
              this.column_transfer[index].show = response.data.status_file;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "status_file" &&
                  response.data.status_file == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "file") {
              this.column_transfer[index].show = response.data.file;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "file" &&
                  response.data.file == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "check_wht") {
              this.column_transfer[index].show = response.data.check_wht;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "check_wht" &&
                  response.data.check_wht == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "status_file_wht") {
              this.column_transfer[index].show = response.data.status_file_wht;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "status_file_wht" &&
                  response.data.status_file_wht == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "file_wht") {
              this.column_transfer[index].show = response.data.file_wht;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "file_wht" &&
                  response.data.file_wht == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "check_mail_wht") {
              this.column_transfer[index].show = response.data.check_mail_wht;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "check_mail_wht" &&
                  response.data.check_mail_wht == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "request_day") {
              this.column_transfer[index].show = response.data.request_day;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "request_day" &&
                  response.data.request_day == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "remark") {
              this.column_transfer[index].show = response.data.remark;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "remark" &&
                  response.data.remark == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "action_by_name") {
              this.column_transfer[index].show = response.data.action_by_name;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "action_by_name" &&
                  response.data.action_by_name == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            if (this.column_transfer[index].value == "action") {
              this.column_transfer[index].show = response.data.action;
              for (let k = 0; k < this.headers_transfer.length; k++) {
                if (
                  this.headers_transfer[k].value == "action" &&
                  response.data.action == true
                ) {
                  this.show_column_transfer.push(this.headers_transfer[k]);
                  this.column_select_transfer.push(this.headers_transfer[k]);
                  this.list_column_transfer.push(this.headers_transfer[k]);
                }
              }
            }

            var sortt = this.headers_transfer;
            this.show_column_transfer.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.column_select_transfer.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.list_column_transfer.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.finish = true;
            }

        })
        .catch((error) => {
          this.finish = false;
          if(error){
             var body_2 = {
              document_no: true,
              action_date: true,
              customer_no: true,
              customer_name: true,
              confirm_date: true,
              payment_type_bank: true,
              type_debt: false,
              sum_amounts: true,
              status_file: true,
              file: true,
              check_wht: true,
              status_file_wht: true,
              file_wht: true,
              check_mail_wht: true,
              request_day: true,
              remark: true,
              action_by_name: true,
              action: true,
            };
            this.axios
              .put(
                process.env.VUE_APP_API + "/setting/columns/statement/Success/Transfer",
                body_2,
                headers
              )
              .then((response) => {
                if (response) {
                  this.setting_column_transfer();
                }
              });
          }
        })
    },
    select_column_transfer(column, item) {
      if (column == false) {
        for (let index = 0; index < this.show_column_transfer.length; index++) {
          if (item.name == this.show_column_transfer[index].text) {
            this.show_column_transfer.splice(index, 1);
          }
        }
      } else if (column == true) {
        for (let index = 0; index < this.headers_transfer.length; index++) {
          if (item.name == this.headers_transfer[index].text) {
            this.show_column_transfer.splice(index, 0, this.headers_transfer[index]);
          }
        }
      }

      this.list_column_transfer = [];

      for (let j = 0; j < this.headers_transfer.length; j++) {
        for (let g = 0; g < this.show_column_transfer.length; g++) {
          if (this.headers_transfer[j].text == this.show_column_transfer[g].text) {
            this.list_column_transfer.push(this.headers_transfer[j]);
          }
        }
      }
    },
    Add_column_transfer(){
      this.column_select_transfer = this.list_column_transfer;

      var addColumn = {
        document_no: true,
        action_date: true,
        customer_no: true,
        customer_name: true,
        confirm_date: true,
        payment_type_bank: true,
        type_debt: true,
        sum_amounts: true,
        status_file: true,
        file: true,
        check_wht: true,
        status_file_wht: true,
        file_wht: true,
        check_mail_wht: true,
        request_day: true,
        remark: true,
        action_by_name: true,
        action: true,
      };

      for (let index = 0; index < this.column_transfer.length; index++) {
        if (this.column_transfer[index].value == "action_date") {
          addColumn.action_date = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "customer_no") {
          addColumn.customer_no = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "customer_name") {
          addColumn.customer_name = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "confirm_date") {
          addColumn.confirm_date = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "payment_type_bank") {
          addColumn.payment_type_bank = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "sum_amounts") {
          addColumn.sum_amounts = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "type_debt") {
          addColumn.type_debt = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "status_file") {
          addColumn.status_file = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "file") {
          addColumn.file = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "check_wht") {
          addColumn.check_wht = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "status_file_wht") {
          addColumn.status_file_wht = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "file_wht") {
          addColumn.file_wht = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "check_mail_wht") {
          addColumn.check_mail_wht = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "request_day") {
          addColumn.request_day = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "remark") {
          addColumn.remark = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "action_by_name") {
          addColumn.action_by_name = this.column_transfer[index].show;
        }
        if (this.column_transfer[index].value == "action") {
          addColumn.action = this.column_transfer[index].show;
        }
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
        .put(
          process.env.VUE_APP_API + "/setting/columns/statement/Success/Transfer",
          addColumn,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = false;
            this.setting_column_transfer();
          }
        });

    },
    cancel_colunm_transfer() {
      this.setting_column_transfer();
    },
    // ข้อมูล CHQ
    async getCHQ() {
      //console.log(this.search_chq)
      this.finish = false;
      this.datalist_chq = [];
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      await this.axios
        .get(
          process.env.VUE_APP_API +
            "/statement/getsuccess/CHQ?size=" +
            this.item_per_page_table_chq +
            "&page=" +
            this.page_table_chq +
            "&search=" +
            String(this.search_chq),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_chq = response.data.data;
            this.Alldata = response.data.data;
            this.page_total_table_chq = response.data.count_page;
            if (this.datalist_chq !== null) {
              this.customer_name_list_chq = [];
              this.user_name_list_chq = [];
              this.listfilter_data("", "customer_name", "chq");
              this.listfilter_data("", "action_by_name", "chq");
            }
          } else {
            this.finish = true;
            this.datalist_chq = [];
            this.page_total_table_chq = 1;
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
    },
    async setting_column_chq(){
      this.finish = false;
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      this.show_column_chq = [];
      this.column_select_chq = [];
      this.list_column_chq = [];

      for (let i = 0; i < this.headers_chq.length; i++) {
        if (this.headers_chq[i].value == "document_no") {
          this.show_column_chq.push(this.headers_chq[i]);
          this.column_select_chq.push(this.headers_chq[i]);
          this.list_column_chq.push(this.headers_chq[i]);
        }
      }
      this.axios
        .get(process.env.VUE_APP_API + "/setting/columns/list/statement/Success/Chq", headers)
        .then((response) => {
          for (let index = 0; index < this.column_chq.length; index++) {
            if (this.column_chq[index].value == "action_date") {
              this.column_chq[index].show = response.data.action_date;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "action_date" &&
                  response.data.action_date == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "customer_no") {
              this.column_chq[index].show = response.data.customer_no;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "customer_no" &&
                  response.data.customer_no == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "customer_name") {
              this.column_chq[index].show = response.data.customer_name;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "customer_name" &&
                  response.data.customer_name == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "confirm_date") {
              this.column_chq[index].show = response.data.confirm_date;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "confirm_date" &&
                  response.data.confirm_date == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "payment_type_bank") {
              this.column_chq[index].show = response.data.payment_type_bank;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "payment_type_bank" &&
                  response.data.payment_type_bank == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "sum_amounts") {
              this.column_chq[index].show = response.data.sum_amounts;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "sum_amounts" &&
                  response.data.sum_amounts == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }
            
            if (this.column_chq[index].value == "type_debt") {
              this.column_chq[index].show = response.data.type_debt;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "type_debt" &&
                  response.data.type_debt == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "check_date_chq") {
              this.column_chq[index].show = response.data.check_date_chq;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "check_date_chq" &&
                  response.data.check_date_chq == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "bank_check_list") {
              this.column_chq[index].show = response.data.bank_check_list;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "bank_check_list" &&
                  response.data.bank_check_list == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "chq_no") {
              this.column_chq[index].show = response.data.chq_no;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "chq_no" &&
                  response.data.chq_no == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "status_file") {
              this.column_chq[index].show = response.data.status_file;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "status_file" &&
                  response.data.status_file == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "file") {
              this.column_chq[index].show = response.data.file;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "file" &&
                  response.data.file == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "check_wht") {
              this.column_chq[index].show = response.data.check_wht;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "check_wht" &&
                  response.data.check_wht == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "status_file_wht") {
              this.column_chq[index].show = response.data.status_file_wht;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "status_file_wht" &&
                  response.data.status_file_wht == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "file_wht") {
              this.column_chq[index].show = response.data.file_wht;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "file_wht" &&
                  response.data.file_wht == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "check_mail_wht") {
              this.column_chq[index].show = response.data.check_mail_wht;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "check_mail_wht" &&
                  response.data.check_mail_wht == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "request_day") {
              this.column_chq[index].show = response.data.request_day;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "request_day" &&
                  response.data.request_day == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "remark") {
              this.column_chq[index].show = response.data.remark;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "remark" &&
                  response.data.remark == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "action_by_name") {
              this.column_chq[index].show = response.data.action_by_name;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "action_by_name" &&
                  response.data.action_by_name == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            if (this.column_chq[index].value == "action") {
              this.column_chq[index].show = response.data.action;
              for (let k = 0; k < this.headers_chq.length; k++) {
                if (
                  this.headers_chq[k].value == "action" &&
                  response.data.action == true
                ) {
                  this.show_column_chq.push(this.headers_chq[k]);
                  this.column_select_chq.push(this.headers_chq[k]);
                  this.list_column_chq.push(this.headers_chq[k]);
                }
              }
            }

            var sortt = this.headers_chq;
            this.show_column_chq.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.column_select_chq.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.list_column_chq.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.finish = true;
            }

        })
        .catch((error) => {
          this.finish = false;
          if(error){
             var body_2 = {
              document_no: true,
              action_date: true,
              customer_no: true,
              customer_name: true,
              confirm_date: true,
              payment_type_bank: true,
              sum_amounts: true,
              check_date_chq: true,
              bank_check_list: true,
              type_debt: true,
              chq_no: true,
              status_file: true,
              file: true,
              check_wht: true,
              status_file_wht: true,
              file_wht: true,
              check_mail_wht: true,
              request_day: true,
              remark: true,
              action_by_name: true,
              action: true,
            };
            this.axios
              .put(
                process.env.VUE_APP_API + "/setting/columns/statement/Success/Chq",
                body_2,
                headers
              )
              .then((response) => {
                if (response) {
                  this.setting_column_chq();
                }
              });
          }
        })
    },
    select_column_chq(column, item) {
      if (column == false) {
        for (let index = 0; index < this.show_column_chq.length; index++) {
          if (item.name == this.show_column_chq[index].text) {
            this.show_column_chq.splice(index, 1);
          }
        }
      } else if (column == true) {
        for (let index = 0; index < this.headers_chq.length; index++) {
          if (item.name == this.headers_chq[index].text) {
            this.show_column_chq.splice(index, 0, this.headers_chq[index]);
          }
        }
      }

      this.list_column_chq = [];

      for (let j = 0; j < this.headers_chq.length; j++) {
        for (let g = 0; g < this.show_column_chq.length; g++) {
          if (this.headers_chq[j].text == this.show_column_chq[g].text) {
            this.list_column_chq.push(this.headers_chq[j]);
          }
        }
      }
    },
    Add_column_chq(){
      this.column_select_chq = this.list_column_chq;

      var addColumn = {
        document_no: true,
        action_date: true,
        customer_no: true,
        customer_name: true,
        confirm_date: true,
        payment_type_bank: true,
        sum_amounts: true,
        check_date_chq: true,
        bank_check_list: true,
        type_debt: true,
        chq_no: true,
        status_file: true,
        file: true,
        check_wht: true,
        status_file_wht: true,
        file_wht: true,
        check_mail_wht: true,
        request_day: true,
        remark: true,
        action_by_name: true,
        action: true,
      };

      for (let index = 0; index < this.column_chq.length; index++) {
        if (this.column_chq[index].value == "action_date") {
          addColumn.action_date = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "customer_no") {
          addColumn.customer_no = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "customer_name") {
          addColumn.customer_name = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "confirm_date") {
          addColumn.confirm_date = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "payment_type_bank") {
          addColumn.payment_type_bank = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "sum_amounts") {
          addColumn.sum_amounts = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "type_debt") {
          addColumn.type_debt = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "check_date_chq") {
          addColumn.check_date_chq = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "bank_check_list") {
          addColumn.bank_check_list = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "chq_no") {
          addColumn.chq_no = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "status_file") {
          addColumn.status_file = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "file") {
          addColumn.file = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "check_wht") {
          addColumn.check_wht = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "status_file_wht") {
          addColumn.status_file_wht = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "file_wht") {
          addColumn.file_wht = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "check_mail_wht") {
          addColumn.check_mail_wht = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "request_day") {
          addColumn.request_day = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "remark") {
          addColumn.remark = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "action_by_name") {
          addColumn.action_by_name = this.column_chq[index].show;
        }
        if (this.column_chq[index].value == "action") {
          addColumn.action = this.column_chq[index].show;
        }
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
        .put(
          process.env.VUE_APP_API + "/setting/columns/statement/Success/Chq",
          addColumn,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = false;
            this.setting_column_chq();
          }
        });

    },
    cancel_colunm_chq() {
      this.setting_column_chq();
    },
    Detail(item) {
      this.finish = false;
      var headers_detail = {
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
          process.env.VUE_APP_API + "/statement/detail/" + item.queue_no,
          headers_detail
        )
        .then((response) => {
          // console.log(response)
          eventBus.$emit("openMatchingDialog", [response.data.data]);
          this.type_matched_success = response.data.data.type;
          this.finish = true;
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
      // eventBus.$emit('openMatchingDialog',[item])
      // this.type_matched_success = item.type
    },
    // filter
    actionChange(date, name, status) {
      if (name == "action_date") {
        if (status == "transfer") {
          this.action_date_transfer[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.action_date_transfer[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        } else if (status == "chq") {
          this.action_date_chq[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.action_date_chq[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }
      } else if (name == "confirm_date") {
        if (status == "transfer") {
          this.confirm_date_transfer[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.confirm_date_transfer[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        } else if (status == "chq") {
          this.confirm_date_chq[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.confirm_date_chq[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }
      } else if (name == "check_date") {
        if (status == "chq") {
          this.check_date_chq[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.check_date_chq[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }
      }
    },
    blankModal(name, status) {
      if (name == "action_date") {
        if (status == "transfer") {
          this.$refs["my-modal_action_date_transfer"].hide();
          this.action_date_transfer = ["0000-00-00"];
          this.text_action_date_transfer = "[blank]";
          this.filter(this.action_date_transfer, name, status);
          this.action_date_range_transfer.startDate = null;
          this.action_date_range_transfer.endDate = null;
        } else if (status == "chq") {
          this.$refs["my-modal_action_date_chq"].hide();
          this.action_date_chq = ["0000-00-00"];
          this.text_action_date_chq = "[blank]";
          this.filter(this.action_date_chq, name, status);
          this.action_date_range_chq.startDate = null;
          this.action_date_range_chq.endDate = null;
        }
      }
      if (name == "confirm_date") {
        if (status == "transfer") {
          this.$refs["my-modal_confirm_date_transfer"].hide();
          this.confirm_date_transfer = ["0000-00-00"];
          this.text_confirm_date_transfer = "[blank]";
          this.filter(this.confirm_date_transfer, name, status);
          this.confirm_date_range_transfer.startDate = null;
          this.confirm_date_range_transfer.endDate = null;
        } else if (status == "chq") {
          this.$refs["my-modal_confirm_date_chq"].hide();
          this.confirm_date_chq = ["0000-00-00"];
          this.text_confirm_date = "[blank]";
          this.filter(this.confirm_date_chq, name);
          this.confirm_date_range_chq.startDate = null;
          this.confirm_date_range_chq.endDate = null;
        }
      }
      if (name == "check_date") {
        if (status == "chq") {
          this.$refs["my-modal_check_date"].hide();
          this.check_date_chq = ["0000-00-00"];
          this.text_check_date = "[blank]";
          this.filter(this.check_date_chq, name, status);
          this.check_date_range.startDate = null;
          this.check_date_range.endDate = null;
        }
      }
    },
    hideModal(name, status) {
      if (name == "action_date") {
        if (status == "transfer") {
          this.$refs["my-modal_action_date_transfer"].hide();
          this.text_action_date_transfer = null;
          this.action_date_range_transfer.startDate = null;
          this.action_date_range_transfer.endDate = null;
          this.close_dialog(name, status);
        } else if (status == "chq") {
          this.$refs["my-modal_action_date_chq"].hide();
          this.text_action_date_chq = null;
          this.action_date_range_chq.startDate = null;
          this.action_date_range_chq.endDate = null;
          this.close_dialog(name, status);
        }
      } else if (name == "confirm_date") {
        if (status == "transfer") {
          this.$refs["my-modal_confirm_date_transfer"].hide();
          this.text_confirm_date_transfer = null;
          this.confirm_date_range_transfer.startDate = null;
          this.confirm_date_range_transfer.endDate = null;
          this.close_dialog(name, status);
        } else if (status == "chq") {
          this.$refs["my-modal_confirm_date_chq"].hide();
          this.text_confirm_date_chq = null;
          this.confirm_date_range_chq.startDate = null;
          this.confirm_date_range_chq.endDate = null;
          this.close_dialog(name, status);
        }
      } else if (name == "check_date") {
        if (status == "chq") {
          this.$refs["my-modal_check_date"].hide();
          this.text_check_date = null;
          this.check_date_range.startDate = null;
          this.check_date_range.endDate = null;
          this.close_dialog(name, status);
        }
      }
    },
    OkFilterModal(name, status) {
      if (name == "action_date") {
        if (status == "transfer") {
          if (
            this.action_date_transfer[0] == "" ||
            (this.action_date_transfer[0] == null &&
              this.action_date_transfer[1] == "") ||
            this.action_date_transfer[1] == null
          ) {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_action_date_transfer"].hide();
            this.text_action_date_transfer =
              this.action_date_transfer[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.action_date_transfer[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.action_date_transfer, name, status);
          }
        } else if (status == "chq") {
          if (
            this.action_date_chq[0] == "" ||
            (this.action_date_chq[0] == null &&
              this.action_date_chq[1] == "") ||
            this.action_date_chq[1] == null
          ) {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_action_date_chq"].hide();
            this.text_action_date_chq =
              this.action_date_chq[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.action_date_chq[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.action_date_chq, name, status);
          }
        }
      }
      if (name == "confirm_date") {
        if (status == "transfer") {
          if (
            this.confirm_date_transfer[0] == "" ||
            (this.confirm_date_transfer[0] == null &&
              this.confirm_date_transfer[1] == "") ||
            this.confirm_date_transfer[1] == null
          ) {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_confirm_date_transfer"].hide();
            this.text_confirm_date_transfer =
              this.confirm_date_transfer[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.confirm_date_transfer[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.confirm_date_transfer, name, status);
          }
        } else if (status == "chq") {
          if (
            this.confirm_date_chq[0] == "" ||
            (this.confirm_date_chq[0] == null &&
              this.confirm_date_chq[1] == "") ||
            this.confirm_date_chq[1] == null
          ) {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_confirm_date_chq"].hide();
            this.text_confirm_date_chq =
              this.confirm_date_chq[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.confirm_date_chq[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.confirm_date_chq, name, status);
          }
        }
      }
      if (name == "check_date") {
        if (status == "chq") {
          if (
            this.check_date_chq[0] == "" ||
            (this.check_date_chq[0] == null && this.check_date_chq[1] == "") ||
            this.check_date_chq[1] == null
          ) {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_check_date"].hide();
            this.text_check_date =
              this.check_date_chq[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.check_date_chq[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.check_date_chq, name, status);
          }
        }
      }
    },
    blank_checkbox(name, status) {
      // console.log(status)
      if (name == "customer_no") {
        if (status == "transfer") {
          if (this.customer_no_blank_transfer == true) {
            this.customer_no_transfer = "[blank]";
            this.filter("blank_string", "customer_no", "transfer");
          } else {
            this.customer_no_transfer = "";
            this.filter("", "customer_no", "transfer");
          }
        } else if (status == "chq") {
          if (this.customer_no_blank_chq == true) {
            this.customer_no_chq = "[blank]";
            this.filter("blank_string", "customer_no", "chq");
          } else {
            this.customer_no_chq = "";
            this.filter("", "customer_no", "chq");
          }
        }
      }

      if (name == "request_day") {
        if (status == "transfer") {
          if (this.request_day_blank_transfer == true) {
            this.request_day_transfer = "[blank]";
            this.filter("blank_string", "request_day", "transfer");
          } else {
            this.request_day_transfer = "";
            this.filter("", "request_day", "transfer");
          }
        } else if (status == "chq") {
          if (this.request_day_blank_chq == true) {
            this.request_day_chq = "[blank]";
            this.filter("blank_string", "request_day", "chq");
          } else {
            this.request_day_chq = "";
            this.filter("", "request_day", "chq");
          }
        }
      }

      if (name == "remark") {
        if (status == "transfer") {
          if (this.remark_blank_transfer == true) {
            this.remark_transfer = "[blank]";
            this.filter("blank_string", "remark", "transfer");
          } else {
            this.remark_transfer = "";
            this.filter("", "remark", "transfer");
          }
        } else if (status == "chq") {
          if (this.remark_blank_chq == true) {
            this.remark_chq = "[blank]";
            this.filter("blank_string", "remark", "chq");
          } else {
            this.remark_chq = "";
            this.filter("", "remark", "chq");
          }
        }
      }
      if (name == "chq_no") {
        if (status == "chq") {
          if (this.chq_no_blank_chq == true) {
            this.chq_no_chq = "[blank]";
            this.filter("blank_string", "chq_no", "chq");
          } else {
            this.chq_no_chq = "";
            this.filter("", "chq_no", "chq");
          }
        }
      }
    },
    close_dialog(close, status) {
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
      if (status == "transfer") {
        let body_transfer = {
          page: Number(this.page_table_transfer),
          size: Number(this.item_per_page_table_transfer),
          status: "Success",
          type: "Transfer",
          search_text: this.filterlist,
        };
        this.axios
          .post(
            process.env.VUE_APP_API + "/statement/filter",
            body_transfer,
            headers_filter
          )
          .then((response) => {
            this.finish = false;
            if (response.status === 200) {
              this.finish = true;
              // this.selected = [];
              this.datalist_transfer = response.data.data;
              if (
                this.datalist_transfer == undefined ||
                this.datalist_transfer == null
              ) {
                this.finish = true;
                this.datalist_transfer = [];
                this.page_total_table_transfer = 1;
              } else {
                this.finish = true;
                this.datalist_transfer.forEach((element) => {
                  element.confirm_date = moment(
                    element.statement[0].confirm_date
                  ).format("YYYY-MM-DD");
                  element.payment_type_bank =
                    element.statement[0].payment_type_bank;
                  // element.type_debt =
                  //   element.statement[0].type_debt;
                });
                this.page_total_table_transfer = response.data.count_page;
              }
            } else {
              this.finish = true;
              this.datalist_transfer = [];
            }
            if (this.filterlist.length == 0) {
              this.setting_column_transfer();
              this.getTransfer();
            }
          });
      } else if (status == "chq") {
        let body_chq = {
          page: Number(this.page_table_chq),
          size: Number(this.item_per_page_table_chq),
          status: "Success",
          type: "CHQ",
          search_text: this.filterlist,
        };
        this.axios
          .post(
            process.env.VUE_APP_API + "/statement/filter",
            body_chq,
            headers_filter
          )
          .then((response) => {
            this.finish = false;
            if (response.status === 200) {
              this.finish = true;
              this.datalist_chq = response.data.data;
              if (this.datalist_chq == undefined || this.datalist_chq == null) {
                this.finish = true;
                this.datalist_chq = [];
                this.page_total_table_chq = 1;
              } else {
                this.finish = true;
                this.datalist_chq.forEach((element) => {
                  element.confirm_date = moment(
                    element.statement[0].confirm_date
                  ).format("YYYY-MM-DD");
                  element.payment_type_bank =
                    element.statement[0].payment_type_bank;
                  // element.type_debt =
                  //   element.statement[0].type_debt;
                });
                this.page_total_table_chq = response.data.count_page;
              }
            } else {
              this.finish = true;
              this.datalist_chq = [];
            }
            if (this.filterlist.length == 0) {
              this.setting_column_chq();
              this.getCHQ();
            }
          });
      }
    },
    filter(filter, key, status) {
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
        if (this.filterlist[index].key == "status_file") {
          for (let f = 0; f < this.filterlist[index].value.length; f++) {
            if (this.filterlist[index].value[f] == "Yes") {
              this.filterlist[index].value[f] = "true";
            }
            if (this.filterlist[index].value[f] == "No") {
              this.filterlist[index].value[f] = "false";
            }
          }
        }
        if (this.filterlist[index].key == "check_wht") {
          for (let f = 0; f < this.filterlist[index].value.length; f++) {
            if (this.filterlist[index].value[f] == "Yes") {
              this.filterlist[index].value[f] = "true";
            }
            if (this.filterlist[index].value[f] == "No") {
              this.filterlist[index].value[f] = "false";
            }
          }
        }
        if (this.filterlist[index].key == "status_file_wht") {
          for (let f = 0; f < this.filterlist[index].value.length; f++) {
            if (this.filterlist[index].value[f] == "Yes") {
              this.filterlist[index].value[f] = "true";
            }
            if (this.filterlist[index].value[f] == "No") {
              this.filterlist[index].value[f] = "false";
            }
          }
        }
        if (this.filterlist[index].key == "check_mail_wht") {
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
        if (this.filterlist[index].key == "sum_amounts") {
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
      if (status == "transfer") {
        let body = {
          page: Number(this.page_table_transfer),
          size: Number(this.item_per_page_table_transfer),
          status: "Success",
          type: "Transfer",
          search_text: this.filterlist,
        };
        this.axios
          .post(
            process.env.VUE_APP_API + "/statement/filter",
            body,
            headers_filter
          )
          .then((response) => {
            this.finish = false;
            if (response.status === 200) {
              this.finish = true;
              this.datalist_transfer = response.data.data;
              if (
                this.datalist_transfer == undefined ||
                this.datalist_transfer == null
              ) {
                this.finish = true;
                this.datalist_transfer = [];
                this.page_total_table_transfer = 1;
              } else {
                this.finish = true;
                this.page_total_table_transfer = response.data.count_page; //เดิม
                if (this.datalist_transfer !== null) {
                  this.datalist_transfer.forEach((element) => {
                    element.confirm_date = moment(
                      element.statement[0].confirm_date
                    ).format("YYYY-MM-DD");
                    element.payment_type_bank =
                      element.statement[0].payment_type_bank;
                    // element.type_debt =
                    //   element.statement[0].type_debt;
                    //this.customer_name_list_transfer = [];
                    //this.user_name_list_transfer = [];
                    //this.listfilter_data("", "customer_name",'transfer');
                    //this.listfilter_data("", "action_by_name",'transfer');
                  });
                }
              }
            } else {
              this.finish = true;
              this.datalist_transfer = [];
            }
            if (this.filterlist.length == 0) {
              this.getTransfer();
            }
          });
      } else if (status == "chq") {
        let body = {
          page: Number(this.page_table_chq),
          size: Number(this.item_per_page_table_chq),
          status: "Success",
          type: "CHQ",
          search_text: this.filterlist,
        };
        this.axios
          .post(
            process.env.VUE_APP_API + "/statement/filter",
            body,
            headers_filter
          )
          .then((response) => {
            this.finish = false;
            if (response.status === 200) {
              this.finish = true;
              this.datalist_chq = response.data.data;
              if (this.datalist_chq == undefined || this.datalist_chq == null) {
                this.finish = true;
                this.datalist_chq = [];
                this.page_total_table_chq = 1;
              } else {
                this.finish = true;
                this.page_total_table_chq = response.data.count_page; //เดิม
                if (this.datalist_chq !== null) {
                  this.datalist_chq.forEach((element) => {
                    element.confirm_date = moment(
                      element.statement[0].confirm_date
                    ).format("YYYY-MM-DD");
                    element.payment_type_bank =
                      element.statement[0].payment_type_bank;
                    // element.type_debt =
                    //   element.statement[0].type_debt;
                    //this.customer_name_list_chq = [];
                    //this.user_name_list_chq = [];
                    //this.listfilter_data("", "customer_name",'chq');
                    //this.listfilter_data("", "action_by_name",'chq');
                  });
                }
              }
            } else {
              this.finish = true;
              this.datalist_chq = [];
            }
            if (this.filterlist.length == 0) {
              this.getCHQ();
            }
          });
      }
    },
    listfilter_data(data, name, status) {
      // ----------------------เป็นการเก็บข้อมูล filter เพื่อส่งให้้ filter ที่เป็นการ checkbox--------------------------//
      //------------------------ส่วนใหญ่จะเป็น autocomplete ------------------------------//
      if (this.Alldata !== null) {
        if (name == "customer_name") {
          if (status == "transfer") {
            let customer_name = [];
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
            this.customer_name_list_transfer = customer_name;
            return customer_name;
          } else if (status == "chq") {
            let customer_name = [];
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
            this.customer_name_list_chq = customer_name;
            return customer_name;
          }
        }
        if (name == "action_by_name") {
          if (status == "transfer") {
            let user_name = [];
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
            this.user_name_list_transfer = user_name.sort();
            return user_name.sort();
          } else if (status == "chq") {
            let user_name = [];
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
            this.user_name_list_chq = user_name.sort();
            return user_name.sort();
          }
        }
      }
    },
    // ---------------------เป็นการ refresh แบบยังคงค่า search และ filter ไว้อยู่ ---------------------------------//
    // refresh_filter() {
    //   this.finish = false;
    //   var headers_filter = {
    //     headers: {
    //       Authorization:
    //         "Bearer " +
    //         localStorage.getItem("acces_token") +
    //         "," +
    //         localStorage.getItem("secret"),
    //     },
    //   };
    //   let body = {
    //     page: Number(this.page_table_transfer),
    //     size: Number(this.item_per_page_table_transfer),
    //     status: "Success",
    //     search_text: this.filterlist,
    //   };
    //   this.axios
    //     .post(process.env.VUE_APP_API + "/statement/filter", body, headers_filter)
    //     .then((response) => {
    //       if (response.status === 200) {
    //         this.finish = true;
    //         this.datalist_transfer = response.data.data;
    //         this.Alldata = response.data.data;
    //         if (this.datalist_transfer == undefined || this.datalist_transfer == null) {
    //           this.finish = true;
    //           this.datalist_transfer = [];
    //           this.page_total_table_transfer = 1;
    //         } else {
    //           this.finish = true;
    //           this.page_total_table_transfer = response.data.count_page;
    //           if (this.datalist_transfer !== null) {
    //             this.datalist_transfer.forEach(() => {
    //               this.listfilter_data("", "customer_name");
    //               this.listfilter_data("", "customer_no");
    //               this.listfilter_data("", "user_name");
    //             });
    //             this.finish = true;
    //             // console.log(response);
    //           }
    //         }
    //       } else {
    //         this.finish = true;
    //         this.datalist_transfer = [];
    //       }
    //       if (this.filterlist.length == 0) {
    //         this.finish = true;
    //         this.getData_afterClearAll();
    //       }
    //     });
    //   // }
    // },
    // change_page_filter() {
    //   this.finish = false;
    //   var headers_filter = {
    //     headers: {
    //       Authorization:
    //         "Bearer " +
    //         localStorage.getItem("acces_token") +
    //         "," +
    //         localStorage.getItem("secret"),
    //     },
    //   };
    //   let body = {
    //     page: Number(this.page_table_transfer),
    //     size: Number(this.item_per_page_table_transfer),
    //     status: "Success",
    //     search_text: this.filterlist,
    //   };
    //   this.axios
    //     .post(process.env.VUE_APP_API + "/statement/filter", body, headers_filter)
    //     .then((response) => {
    //       if (response.status === 200) {
    //         this.finish = true;
    //         this.datalist_transfer = response.data.data;
    //         this.Alldata = response.data.data;
    //         if (this.datalist_transfer == undefined || this.datalist_transfer == null) {
    //           this.finish = true;
    //           this.datalist_transfer = [];
    //           this.page_total_table_transfer = 1
    //         } else {
    //           this.finish = true;
    //           this.page_total_table_transfer = response.data.count_page;
    //         }
    //       } else {
    //         this.finish = true;
    //         this.datalist_transfer = [];
    //       }
    //       if (this.filterlist.length == 0) {
    //         this.finish = true;
    //         this.getData_afterClearAll();
    //       }
    //     });
    // },

    // end filter
    item_per_page_inc_table_transfer() {
      this.getTransfer();
    },
    item_per_page_inc_table_chq() {
      this.getCHQ();
    },
    pageChangeTableTransfer() {
      this.getTransfer();
    },
    pageChangeTableCHQ() {
      this.getCHQ();
    },
    searchWord_transfer() {
      this.page_table_transfer = 1;
      this.getTransfer();
    },
    clearFilter_transfer() {
      this.page_table_transfer = 1;
      this.search_transfer = "";
      this.getTransfer();
    },
    searchWord_chq() {
      this.page_table_chq = 1;
      this.getCHQ();
    },
    clearFilter_chq() {
      this.page_table_chq = 1;
      this.search_chq = "";
      this.getCHQ();
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
    edit_dialog() {
      this.getAll();
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
#filter_success {
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

th.text-start.invoice1_modal.sortable {
  position: sticky;
  left: 0px !important;
  z-index: 5 !important;
  padding-top: 14px;
  // border-right: 1px solid #cccccc;
  // background-color: rgb(168, 255, 214) !important;
  background: linear-gradient(
    90deg,
    rgb(199, 224, 236) 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
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

// ====================transfer=====================
h5#modal-transfer-center-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-transfer-center-confirm_date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
// ====================chq=====================
h5#modal-chq-center-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-chq-center-confirm_date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-chq-center-check_date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
// ====================supense=====================
h5#modal-supense-center-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-supense-center-confirm_date___BV_modal_title_.modal-title {
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
// #invoice-select-debt {
//   .v-select__slot {
//     position: relative;
//     align-items: center;
//     display: flex;
//     max-width: 100%;
//     min-width: 0;
//     width: 100%;
//     min-height: 48px !important;
//     height: 100% !important;
//     border-radius: 0px !important;
//     margin-top: 10px;
//   }
// }
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
.v-input--selection-controls .v-input__slot {
  cursor: pointer;
  justify-content: center !important;
}
.v-data-table__wrapper {
  overflow-x: auto !important;
  overflow-y: auto !important;
}
#modal-scrollable-transfer {
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
#modal-scrollable-chq {
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
</style>
