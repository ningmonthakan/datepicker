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
            <h3 style="font-weight:700">Pending</h3>
          </v-col>
          <v-col cols="12">
            <v-card>
              <!-----------------------------Tab Saved/Reject/Reversed ------------------------------------>
              <v-card-text>
                <v-tabs v-model="tab" background-color="transparent">
                  <v-tab v-for="(item,index) in tab_items" :key="index">
                    {{ item.name }}
                  </v-tab>
                  <!-- <v-tab >
                    Mail
                  </v-tab>
                  <v-tab >
                    Saved
                  </v-tab>
                  <v-tab>
                    Reject
                  </v-tab> -->
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <!-----------------------------Tab Saved ------------------------------------>
                  <v-tab-item>
                    <v-card-title>
                      <div>
                        <v-btn
                          outlined
                          color="indigo"
                          v-b-modal.modal-scrollable-saved
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
                        id="modal-scrollable-saved"
                        title="Set Column"
                        style="width: 500px; !important"
                        @ok="Add_column_saved()"
                        @cancel="cancel_colunm_saved()"
                        data-backdrop="static"
                        no-close-on-backdrop
                      >
                        <div>
                          <v-data-table
                            :headers="headers_modal"
                            :items="column_name"
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
                                @input="select_column_saved($event, item)"
                              ></v-simple-checkbox>
                            </template>
                          </v-data-table>
                        </div>
                      </b-modal>
                      <!-- -------------------------------------End column---------------------------------------- -->
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_Saved()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_saved"
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
                        @click="clearFilter_Saved()"
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
                          @click="exportFileSaved()"
                        >
                          Export All File
                          <v-icon right dark> mdi-file-download-outline </v-icon>
                      </v-btn>
                      
                      <v-btn
                        class="ma-4"
                        color="success"
                        @click="add_matching()"
                        style="font-size: 12px; font-weight: 600"
                        v-if="
                          role_status == 'super_admin' ||
                          role_status == 'admin'
                        "
                      >
                        Add
                        <v-icon right dark> mdi-plus-circle </v-icon>
                      </v-btn>
                    </v-card-text>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="column_select_saved"
                          :items="datalist_saved"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          height="600px"
                          id="invoice_book_1"
                          :items-per-page="datalist_saved.length"
                        >
                        <!------------------------------=- filter Saved---------------------------------->
                          <template v-slot:[`body.prepend`]>
                            <tr id="filter_pending">
                              <!-- filter Document_no -->
                              <td class="fixed-invoice-new">
                                <input
                                  v-model="document_no_saved"
                                  class="form-control"
                                  @change="filter(document_no_saved, String('document_no'),String('saved'))"
                                  placeholder="Document No"
                                  :disabled="document_no_blank_saved == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('document_no','saved')"
                                    v-model="document_no_blank_saved"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter date -->
                              <td v-if="column_name[1].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_action_date_saved"
                                  label="date"
                                  placeholder="Date"
                                  style="font-size:14px"
                                  v-b-modal.modal-save-center-date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_action_date_saved"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-save-center-date"
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
                                      @change="actionChange(saved_action_date_range, 'action_date','saved')"
                                      v-model="saved_action_date_range"
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
                                        @click="blankModal('action_date','saved')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('action_date','saved')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('action_date','saved')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter customer no -->
                              <td v-if="column_name[2].show == true">
                                <input
                                  v-model="customer_no_saved"
                                  class="form-control"
                                  @change="filter(customer_no_saved, String('customer_no'),String('saved'))"
                                  placeholder="Cus no."
                                  :disabled="customer_no_blank_saved == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('customer_no','saved')"
                                    v-model="customer_no_blank_saved"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter cudtomer name  -->
                              <td v-if="column_name[3].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_customer_name_saved"
                                  v-model="customer_name_saved"
                                  type="text"
                                  label="Cus Name"
                                  :items="customer_name_list_saved"
                                  @change="
                                    filter(customer_name_saved, String('customer_name'),String('saved'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter วันที่ชำระ -->
                              <td v-if="column_name[4].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_confirm_date_saved"
                                  label="date"
                                  placeholder="วันที่ชำระ"
                                  v-b-modal.modal-save-center-confirm_date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  style="font-size:14px"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_confirm_date_saved"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-save-center-confirm_date"
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
                                          confirm_date_range_saved,
                                          'confirm_date',
                                          'saved'
                                        )
                                      "
                                      v-model="confirm_date_range_saved"
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
                                        @click="blankModal('confirm_date','saved')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('confirm_date','saved')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('confirm_date','saved')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter bank -->
                              <td v-if="column_name[5].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="payment_type_bank_saved"
                                  type="text"
                                  style="font-size:14px"
                                  label="ช่องทางการชำระเงิน"
                                  :items="payment_type_list"
                                  @change="
                                    filter(payment_type_bank_saved, String('payment_type_bank'),String('saved'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter รวมยอดชำระ -->
                              <td v-if="column_name[6].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  multiple
                                  dense
                                  v-model="sum_amounts_saved"
                                  type="text"
                                  label="รวมยอดชำระ"
                                  :items="sum_amounts_list"
                                  @change="filter(sum_amounts_saved, String('sum_amounts'),String('saved'))"
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter หลักฐานการชำระ -->
                              <td v-if="column_name[7].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_saved"
                                  type="text"
                                  style="font-size:14px"
                                  label="หลักฐานการชำระ"
                                  :items="pay_list"
                                  @change="filter(status_file_saved, String('status_file'),String('saved'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file หลักฐาน -->
                              <td v-if="column_name[8].show == true"></td>
                              <!-- filter wht -->
                              <td v-if="column_name[9].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_wht_saved"
                                  type="text"
                                  label="WHT"
                                  style="font-size:14px"
                                  :items="wht_list"
                                  @change="filter(check_wht_saved, String('check_wht'),String('saved'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter เอกสาร wht -->
                              <td v-if="column_name[10].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_wht_saved"
                                  type="text"
                                  label="เอกสาร WHT"
                                  style="font-size:14px"
                                  :items="file_wht_list"
                                  @change="filter(status_file_wht_saved, String('status_file_wht'),String('saved'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file wht -->
                              <td v-if="column_name[11].show == true"></td>
                              <!-- filter Mail WHT -->
                              <td v-if="column_name[12].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_mail_wht_saved"
                                  type="text"
                                  label="Mail WHT"
                                  style="font-size:14px"
                                  :items="check_wht_list"
                                  @change="filter(check_mail_wht_saved, String('check_mail_wht'),String('saved'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter request day -->
                              <td v-if="column_name[13].show == true">
                                <input
                                  class="form-control"
                                  v-model="request_day_saved"
                                  type="text"
                                  placeholder="Mail Confirm Invoice"
                                  @change="filter(request_day_saved, String('request_day'),String('saved'))"
                                  :disabled="request_day_blank_saved == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('request_day','saved')"
                                    v-model="request_day_blank_saved"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter remark -->
                              <td v-if="column_name[14].show == true">
                                <input
                                  class="form-control"
                                  v-model="remark_saved"
                                  type="text"
                                  placeholder="Remark"
                                  style="font-size:14px"
                                  @change="filter(remark_saved, String('remark'),String('saved'))"
                                  :disabled="remark_blank_saved == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('remark','saved')"
                                    v-model="remark_blank_saved"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter user -->
                              <td v-if="column_name[15].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  v-model="user_name_saved"
                                  type="text"
                                  multiple
                                  label="User"
                                  style="font-size:14px"
                                  :items="user_name_list_saved"
                                  @change="filter(user_name_saved, String('action_by_name'),String('saved'))"
                                ></v-autocomplete>
                              </td>
                              <!-- filter action -->
                              <td v-if="column_name[16].show == true"></td>
                            </tr>
                          </template>
                          <!-------------------------------- end filter Saved------------------------------>
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
                            <v-checkbox v-model="item.status_file" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.file`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no , 'file')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_wht`]="{ item }">
                            <v-checkbox v-model="item.check_wht" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.status_file_wht`]="{ item }">
                            <v-checkbox v-model="item.status_file_wht" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.file_wht`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no , 'wht')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_mail_wht`]="{ item }">
                            <v-checkbox v-model="item.check_mail_wht" disabled></v-checkbox>
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
                          <!-- edit saved -->
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              dark
                              style="font-size: 12px; margin-right: 10px;"
                              @click="editItem(item)"
                              v-if="
                                role_status == 'super_admin' ||
                                role_status == 'admin'
                              "
                            >
                              Edit
                              <v-icon right dark> mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                              color="red"
                              dark
                              style="font-size: 12px"
                              @click="deleteItem(item)"
                              v-if="
                                role_status == 'super_admin' ||
                                role_status == 'admin'
                              "
                            >
                              Delete
                              <v-icon right dark> mdi-delete</v-icon>
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
                            v-model="item_per_page_table_saved"
                            @change="item_per_page_inc_table_Saved()"
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
                            v-model="page_table_saved"
                            :length="page_total_table_saved"
                            :total-visible="10"
                            @input="pageChangeTableSaved()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                    <!-- ------------------------------------End table Main เปิดระบบ--------------------------------------------- -->
                  </v-tab-item>
                  <!----------------------------- end Tab Saved ------------------------------------>
                  <!-----------------------------Tab Reject ------------------------------------>
                  <v-tab-item>
                    <v-card-title>
                      <div>
                        <v-btn
                          outlined
                          color="indigo"
                          v-b-modal.modal-scrollable-reject
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
                        id="modal-scrollable-reject"
                        title="Set Column"
                        style="width: 500px; !important"
                        @ok="Add_column_reject()"
                        @cancel="cancel_colunm_reject()"
                        data-backdrop="static"
                        no-close-on-backdrop
                      >
                        <div>
                          <v-data-table
                            :headers="headers_modal"
                            :items="column_reject"
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
                                @input="select_column_reject($event, item)"
                              ></v-simple-checkbox>
                            </template>
                          </v-data-table>
                        </div>
                      </b-modal>
                      <!-- -------------------------------------End column---------------------------------------- -->
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_Reject()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_reject"
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
                        @click="clearFilter_Reject()"
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
                          @click="exportFileReject()"
                        >
                          Export All File
                          <v-icon right dark> mdi-file-download-outline </v-icon>
                      </v-btn>
                    </v-card-text>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="column_select_reject"
                          :items="datalist_reject"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          height="600px"
                          id="invoice_book_1"
                          :items-per-page="datalist_reject.length"
                        >
                        <!------------------------------=- filter Reject---------------------------------->
                          <template v-slot:[`body.prepend`]>
                            <tr id="filter_pending">
                              <!-- filter document_no -->
                              <td class="fixed-invoice-new">
                                <input
                                  v-model="document_no_reject"
                                  class="form-control"
                                  @change="filter(document_no_reject, String('document_no'),String('reject'))"
                                  placeholder="Document No"
                                  :disabled="document_no_blank_reject == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('document_no','reject')"
                                    v-model="document_no_blank_reject"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter date -->
                              <td v-if="column_reject[1].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_action_date_reject"
                                  label="date"
                                  placeholder="Date"
                                  style="font-size:14px"
                                  v-b-modal.modal-reject-center-date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_action_date_reject"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-reject-center-date"
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
                                      @change="actionChange(reject_action_date_range, 'action_date','reject')"
                                      v-model="reject_action_date_range"
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
                                        @click="blankModal('action_date','reject')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('action_date','reject')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('action_date','reject')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter customer no -->
                              <td v-if="column_reject[2].show == true">
                                <input
                                  v-model="customer_no_reject"
                                  class="form-control"
                                  @change="filter(customer_no_reject, String('customer_no'),String('reject'))"
                                  placeholder="Cus no."
                                  :disabled="customer_no_blank_reject == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('customer_no','reject')"
                                    v-model="customer_no_blank_reject"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter cudtomer name  -->
                              <td v-if="column_reject[3].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_customer_name_reject"
                                  v-model="customer_name_reject"
                                  type="text"
                                  label="Cus Name"
                                  :items="customer_name_list_reject"
                                  @change="
                                    filter(customer_name_reject, String('customer_name'),String('reject'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter วันที่ชำระ -->
                              <td v-if="column_reject[4].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_confirm_date_reject"
                                  label="date"
                                  placeholder="วันที่ชำระ"
                                  v-b-modal.modal-reject-center-confirm_date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  style="font-size:14px"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_confirm_date_reject"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-reject-center-confirm_date"
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
                                          confirm_date_range_reject,
                                          'confirm_date',
                                          'reject'
                                        )
                                      "
                                      v-model="confirm_date_range_reject"
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
                                        @click="blankModal('confirm_date','reject')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('confirm_date','reject')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('confirm_date','reject')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter bank -->
                              <td v-if="column_reject[5].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="payment_type_bank_reject"
                                  type="text"
                                  style="font-size:14px"
                                  label="ช่องทางการชำระเงิน"
                                  :items="payment_type_list"
                                  @change="
                                    filter(payment_type_bank_reject, String('payment_type_bank'),String('reject'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter รวมยอดชำระ -->
                              <td v-if="column_reject[6].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  multiple
                                  dense
                                  v-model="sum_amounts_reject"
                                  type="text"
                                  label="รวมยอดชำระ"
                                  :items="sum_amounts_list"
                                  @change="filter(sum_amounts_reject, String('sum_amounts'),String('reject'))"
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter หลักฐานการชำระ -->
                              <td v-if="column_reject[7].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_reject"
                                  type="text"
                                  style="font-size:14px"
                                  label="หลักฐานการชำระ"
                                  :items="pay_list"
                                  @change="filter(status_file_reject, String('status_file'),String('reject'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file หลักฐาน -->
                              <td v-if="column_reject[8].show == true"></td>
                              <!-- filter wht -->
                              <td v-if="column_reject[9].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_wht_reject"
                                  type="text"
                                  label="WHT"
                                  style="font-size:14px"
                                  :items="wht_list"
                                  @change="filter(check_wht_reject, String('check_wht'),String('reject'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter เอกสาร wht -->
                              <td v-if="column_reject[10].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_wht_reject"
                                  type="text"
                                  label="เอกสาร WHT"
                                  style="font-size:14px"
                                  :items="file_wht_list"
                                  @change="filter(status_file_wht_reject, String('status_file_wht'),String('reject'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file wht -->
                              <td v-if="column_reject[11].show == true"></td>
                              <td v-if="column_reject[12].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_mail_wht_reject"
                                  type="text"
                                  label="Mail WHT"
                                  style="font-size:14px"
                                  :items="check_wht_list"
                                  @change="filter(check_mail_wht_reject, String('check_mail_wht'),String('reject'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter request day -->
                              <td v-if="column_reject[13].show == true">
                                <input
                                  class="form-control"
                                  v-model="request_day_reject"
                                  type="text"
                                  placeholder="Mail Confirm Invoice"
                                  @change="filter(request_day_reject, String('request_day'),String('reject'))"
                                  :disabled="request_day_blank_reject == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('request_day','reject')"
                                    v-model="request_day_blank_reject"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter remark -->
                              <td v-if="column_reject[14].show == true">
                                <input
                                  class="form-control"
                                  v-model="remark_reject"
                                  type="text"
                                  placeholder="Remark"
                                  style="font-size:14px"
                                  @change="filter(remark_reject, String('remark'),String('reject'))"
                                  :disabled="remark_blank_reject == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('remark','reject')"
                                    v-model="remark_blank_reject"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter remark -->
                              <td v-if="column_reject[15].show == true">
                                <input
                                  class="form-control"
                                  v-model="remark_rejected"
                                  type="text"
                                  placeholder="Remark Reject"
                                  style="font-size:14px"
                                  @change="filter(remark_rejected, String('remark_rejected'),String('reject'))"
                                  :disabled="remark_blank_rejected == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('remark_rejected','reject')"
                                    v-model="remark_blank_rejected"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter user -->
                              <td v-if="column_reject[16].show == true">
                                <v-autocomplete
                                  auto-select-first                         
                                  dense
                                  v-model="user_name_reject"
                                  type="text"
                                  multiple
                                  label="User"
                                  style="font-size:14px"
                                  :items="user_name_list_reject"
                                  @change="filter(user_name_reject, String('action_by_name'), String('reject'))"
                                ></v-autocomplete>
                              </td>
                              <!-- filter action -->
                              <td v-if="column_reject[17].show == true"></td>
                            </tr>
                          </template>
                          <!-------------------------------- end filter Reject------------------------------>
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
                            <v-checkbox v-model="item.status_file" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.file`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no , 'file')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_wht`]="{ item }">
                            <v-checkbox v-model="item.check_wht" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.status_file_wht`]="{ item }">
                            <v-checkbox v-model="item.status_file_wht" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.file_wht`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no , 'wht')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_mail_wht`]="{ item }">
                            <v-checkbox v-model="item.check_mail_wht" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.request_day`]="{ item }">
                            {{item.request_day}}
                          </template>
                          <template v-slot:[`item.remark`]="{ item }">
                            <b-textarea
                              placeholder="remark"
                              style="border-radius: 0px;"
                              v-model="item.remark"
                              rows="1"
                              max-rows="1"
                              disabled
                            ></b-textarea>
                          </template>
                          <template v-slot:[`item.remark_rejected`]="{ item }">
                            <b-textarea
                              placeholder="remark reject"
                              style="border-radius: 0px;"
                              v-model="item.remark_rejected"
                              rows="1"
                              max-rows="1"
                              disabled
                            ></b-textarea>
                          </template>
                          <!-- edit reject -->
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              dark
                              style="font-size: 12px; margin-right: 10px;"
                              @click="editItem(item)"
                              v-if="
                                role_status == 'super_admin' ||
                                role_status == 'admin'
                              "
                            >
                              Edit
                              <v-icon right dark> mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                              color="red"
                              dark
                              style="font-size: 12px"
                              @click="deleteItem(item)"
                              v-if="
                                role_status == 'super_admin' ||
                                role_status == 'admin'
                              "
                            >
                              Delete
                              <v-icon right dark> mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <!-- end -->
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
                            v-model="item_per_page_table_reject"
                            @change="item_per_page_inc_table_reject()"
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
                            v-model="page_table_reject"
                            :length="page_total_table_reject"
                            :total-visible="10"
                            @input="pageChangeTableReject()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                  </v-tab-item>
                  <!----------------------------- end Tab Reject ------------------------------------>
                  <!-----------------------------Tab Reversed ------------------------------------>
                  <v-tab-item>
                    <v-card-title>
                      <div>
                        <v-btn
                          outlined
                          color="indigo"
                          v-b-modal.modal-scrollable-reversed
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
                        id="modal-scrollable-reversed"
                        title="Set Column"
                        style="width: 500px; !important"
                        @ok="Add_column_reversed()"
                        @cancel="cancel_colunm_reversed()"
                        data-backdrop="static"
                        no-close-on-backdrop
                      >
                        <div>
                          <v-data-table
                            :headers="headers_modal"
                            :items="column_reversed"
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
                                @input="select_column_reversed($event, item)"
                              ></v-simple-checkbox>
                            </template>
                          </v-data-table>
                        </div>
                      </b-modal>
                      <!-- -------------------------------------End column---------------------------------------- -->
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_Reversed()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_reversed"
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
                        @click="clearFilter_Reversed()"
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
                          @click="exportFileReversed()"
                        >
                          Export All File
                          <v-icon right dark> mdi-file-download-outline </v-icon>
                      </v-btn>
                    </v-card-text>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="column_select_reversed"
                          :items="datalist_reversed"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          height="600px"
                          id="invoice_book_1"
                          :items-per-page="datalist_reversed.length"
                        >
                        <!------------------------------=- filter Reversed---------------------------------->
                        <template v-slot:[`body.prepend`]>
                            <tr id="filter_pending">
                              <!-- filter document_no -->
                              <td class="fixed-invoice-new">
                                <input
                                  v-model="document_no_reversed"
                                  class="form-control"
                                  @change="filter(document_no_reversed, String('document_no'),String('reversed'))"
                                  placeholder="Document No"
                                  :disabled="document_no_blank_reversed == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('document_no','reversed')"
                                    v-model="document_no_blank_reversed"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter date -->
                              <td v-if="column_reversed[1].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_action_date_reversed"
                                  label="date"
                                  placeholder="Date"
                                  style="font-size:14px"
                                  v-b-modal.modal-reversed-center-date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_action_date_reversed"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-reversed-center-date"
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
                                      @change="actionChange(reversed_action_date_range, 'action_date','reversed')"
                                      v-model="reversed_action_date_range"
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
                                        @click="blankModal('action_date','reversed')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('action_date','reversed')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('action_date','reversed')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter customer no -->
                              <td v-if="column_reversed[2].show == true">
                                <input
                                  v-model="customer_no_reversed"
                                  class="form-control"
                                  @change="filter(customer_no_reversed, String('customer_no'),String('reversed'))"
                                  placeholder="Cus no."
                                  :disabled="customer_no_blank_reversed == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('customer_no','reversed')"
                                    v-model="customer_no_blank_reversed"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter cudtomer name  -->
                              <td v-if="column_reversed[3].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_customer_name_reversed"
                                  v-model="customer_name_reversed"
                                  type="text"
                                  label="Cus Name"
                                  :items="customer_name_list_reversed"
                                  @change="
                                    filter(customer_name_reversed, String('customer_name'),String('reversed'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter วันที่ชำระ -->
                              <td v-if="column_reversed[4].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_confirm_date_reversed"
                                  label="date"
                                  placeholder="วันที่ชำระ"
                                  v-b-modal.modal-reversed-center-confirm_date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  style="font-size:14px"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_confirm_date_reversed"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-reversed-center-confirm_date"
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
                                          confirm_date_range_reversed,
                                          'confirm_date',
                                          'reversed'
                                        )
                                      "
                                      v-model="confirm_date_range_reversed"
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
                                        @click="blankModal('confirm_date','reversed')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('confirm_date','reversed')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('confirm_date','reversed')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter bank -->
                              <td v-if="column_reversed[5].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="payment_type_bank_reversed"
                                  type="text"
                                  style="font-size:14px"
                                  label="ช่องทางการชำระเงิน"
                                  :items="payment_type_list"
                                  @change="
                                    filter(payment_type_bank_reversed, String('payment_type_bank'),String('reversed'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter รวมยอดชำระ -->
                              <td v-if="column_reversed[6].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  multiple
                                  dense
                                  v-model="sum_amounts_reversed"
                                  type="text"
                                  label="รวมยอดชำระ"
                                  :items="sum_amounts_list"
                                  @change="filter(sum_amounts_reversed, String('sum_amounts'),String('reversed'))"
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter หลักฐานการชำระ -->
                              <td v-if="column_reversed[7].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_reversed"
                                  type="text"
                                  style="font-size:14px"
                                  label="หลักฐานการชำระ"
                                  :items="pay_list"
                                  @change="filter(status_file_reversed, String('status_file'),String('reversed'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file หลักฐาน -->
                              <td v-if="column_reversed[8].show == true"></td>
                              <!-- filter wht -->
                              <td v-if="column_reversed[9].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_wht_reversed"
                                  type="text"
                                  label="WHT"
                                  style="font-size:14px"
                                  :items="wht_list"
                                  @change="filter(check_wht_reversed, String('check_wht'),String('reversed'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter เอกสาร wht -->
                              <td v-if="column_reversed[10].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="status_file_wht_reversed"
                                  type="text"
                                  label="เอกสาร WHT"
                                  style="font-size:14px"
                                  :items="file_wht_list"
                                  @change="filter(status_file_wht_reversed, String('status_file_wht'),String('reversed'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter file wht -->
                              <td v-if="column_reversed[11].show == true"></td>
                              <td v-if="column_reversed[12].show == true">
                                <v-autocomplete
                                  multiple
                                  v-model="check_mail_wht_reversed"
                                  type="text"
                                  label="Mail WHT"
                                  style="font-size:14px"
                                  :items="check_wht_list"
                                  @change="filter(check_mail_wht_reversed, String('check_mail_wht'),String('reversed'))"
                                  auto-select-first
                                  dense
                                  item-text="name"
                                ></v-autocomplete>
                              </td>
                              <!-- filter request day -->
                              <td v-if="column_reversed[13].show == true">
                                <input
                                  class="form-control"
                                  v-model="request_day_reversed"
                                  type="text"
                                  placeholder="Mail Confirm Invoice"
                                  @change="filter(request_day_reversed, String('request_day'),String('reversed'))"
                                  :disabled="request_day_blank_reversed == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('request_day','reversed')"
                                    v-model="request_day_blank_reversed"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter remark -->
                              <td v-if="column_reversed[14].show == true">
                                <input
                                  class="form-control"
                                  v-model="remark_reverse"
                                  type="text"
                                  placeholder="Remark"
                                  style="font-size:14px"
                                  @change="filter(remark_reverse, String('remark'),String('reversed'))"
                                  :disabled="remark_blank_reversed == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('remark','reversed')"
                                    v-model="remark_blank_reversed"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter remark -->
                              <td v-if="column_reversed[15].show == true">
                                <input
                                  class="form-control"
                                  v-model="remark_reversed"
                                  type="text"
                                  placeholder="Remark Reverseds"
                                  style="font-size:14px"
                                  @change="filter(remark_reversed, String('remark_reversed'),String('reversed'))"
                                  :disabled="remark_blank_reverseds == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('remark_reversed','reversed')"
                                    v-model="remark_blank_reverseds"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter Status reversed -->
                              <td v-if="column_reversed[16].show == true">
                                <v-autocomplete
                                  auto-select-first                         
                                  dense
                                  v-model="status_reversed"
                                  type="text"
                                  multiple
                                  label="Status Reversed"
                                  style="font-size:14px"
                                  :items="status_reversed_list"
                                  @change="filter(status_reversed, String('status_pending'), String('reversed'))"
                                ></v-autocomplete>
                              </td>
                              <!-- filter user -->
                              <td v-if="column_reversed[17].show == true">
                                <v-autocomplete
                                  auto-select-first                         
                                  dense
                                  v-model="user_name_reversed"
                                  type="text"
                                  multiple
                                  label="User"
                                  style="font-size:14px"
                                  :items="user_name_list_reversed"
                                  @change="filter(user_name_reversed, String('action_by_name'), String('reversed'))"
                                ></v-autocomplete>
                              </td>
                              <!-- filter action -->
                              <td v-if="column_reversed[18].show == true"></td>
                            </tr>
                          </template>
                        <!-------------------------------- end filter Reversed------------------------------>
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
                            <v-checkbox v-model="item.status_file" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.file`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no , 'file')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_wht`]="{ item }">
                            <v-checkbox v-model="item.check_wht" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.status_file_wht`]="{ item }">
                            <v-checkbox v-model="item.status_file_wht" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.file_wht`]="{ item }">
                            <v-btn
                              color="indigo"
                              dark
                              outlined
                              @click="open_file_dialog(item.queue_no , 'wht')"
                            >
                              รายการเอกสารแนบ
                            </v-btn>
                          </template>
                          <template v-slot:[`item.check_mail_wht`]="{ item }">
                            <v-checkbox v-model="item.check_mail_wht" disabled></v-checkbox>
                          </template>
                          <template v-slot:[`item.request_day`]="{ item }">
                            {{item.request_day}}
                          </template>
                          <template v-slot:[`item.remark`]="{ item }">
                            <b-textarea
                              placeholder="remark"
                              style="border-radius: 0px;"
                              v-model="item.remark"
                              rows="1"
                              max-rows="1"
                              disabled
                            ></b-textarea>
                          </template>
                          <template v-slot:[`item.remark_reversed`]="{ item }">
                            <b-textarea
                              placeholder="remark reversed"
                              style="border-radius: 0px;"
                              v-model="item.remark_reversed"
                              rows="1"
                              max-rows="1"
                              disabled
                            ></b-textarea>
                          </template>
                          <!-- edit reversed -->
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              color="primary"
                              dark
                              style="font-size: 12px; margin-right: 10px;"
                              @click="editItem(item)"
                              v-if="
                                role_status == 'super_admin' ||
                                role_status == 'admin'
                              "
                            >
                              Edit
                              <v-icon right dark> mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                              color="red"
                              dark
                              style="font-size: 12px"
                              @click="deleteItem(item)"
                              v-if="
                                role_status == 'super_admin' ||
                                role_status == 'admin'
                              "
                            >
                              Delete
                              <v-icon right dark> mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <!-- end -->
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
                            v-model="item_per_page_table_reversed"
                            @change="item_per_page_inc_table_reversed()"
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
                            v-model="page_table_reversed"
                            :length="page_total_table_reversed"
                            :total-visible="10"
                            @input="pageChangeTableReversed()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                  </v-tab-item>
                  <!----------------------------- end Tab Reversed ------------------------------------>
                  <!-----------------------------Tab Total ------------------------------------>
                  <v-tab-item>
                    <v-card-title>
                      <div>
                        <v-btn
                          outlined
                          color="indigo"
                          v-b-modal.modal-scrollable-total
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
                        id="modal-scrollable-total"
                        title="Set Column"
                        style="width: 500px; !important"
                        @ok="Add_column_total()"
                        @cancel="cancel_colunm_total()"
                        data-backdrop="static"
                        no-close-on-backdrop
                      >
                        <div>
                          <v-data-table
                            :headers="headers_modal"
                            :items="column_total"
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
                                @input="select_column_total($event, item)"
                              ></v-simple-checkbox>
                            </template>
                          </v-data-table>
                        </div>
                      </b-modal>
                      <!-- -------------------------------------End column---------------------------------------- -->
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="searchWord_Total()"
                        style="display: flex; align-items: center"
                        class="search-area"
                      >
                        <v-text-field
                          v-model="search_total"
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
                        @click="clearFilter_Total()"
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
                          @click="exportFileTotal()"
                        >
                          Export All File
                          <v-icon right dark> mdi-file-download-outline </v-icon>
                      </v-btn>
                    </v-card-text>
                    <div class="cover-table">
                      <div class="table-invoice" style="position: relative">
                        <v-data-table
                          :headers="column_select_total"
                          :items="datalist_total"
                          :hide-default-footer="true"
                          class="table_in_book1"
                          fixed-header
                          height="600px"
                          id="invoice_book_1"
                          :items-per-page="datalist_total.length"
                        >
                          <!------------------------------=- filter Total---------------------------------->
                          <template v-slot:[`body.prepend`]>
                            <tr id="filter_pending">
                              <!-- filter document_no -->
                              <td class="fixed-invoice-new">
                                <input
                                  v-model="document_no_total"
                                  class="form-control"
                                  @change="filter(document_no_total, String('document_no'),String('total'))"
                                  placeholder="Document No"
                                  :disabled="document_no_blank_total == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('document_no','total')"
                                    v-model="document_no_blank_total"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter date -->
                              <td v-if="column_total[1].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_action_date_total"
                                  label="date"
                                  placeholder="Date"
                                  style="font-size:14px"
                                  v-b-modal.modal-total-center-date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_action_date_total"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-total-center-date"
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
                                      @change="actionChange(total_action_date_range, 'action_date','total')"
                                      v-model="total_action_date_range"
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
                                        @click="blankModal('action_date','total')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('action_date','total')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('action_date','total')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter email date -->
                              <td v-if="column_total[2].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_email_date_total"
                                  label="date"
                                  placeholder="Email Date"
                                  style="font-size:14px"
                                  v-b-modal.modal-total-center-email-date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_email_date_total"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-total-center-email-date"
                                    centered
                                    hide-footer
                                    title="Email Date"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabel"
                                      :cal-options="calOptions"
                                      @change="actionChange(total_email_date_range, 'email_date','total')"
                                      v-model="total_email_date_range"
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
                                        @click="blankModal('email_date','total')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('email_date','total')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('email_date','total')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter customer no -->
                              <td v-if="column_total[3].show == true">
                                <input
                                  v-model="customer_no_total"
                                  class="form-control"
                                  @change="filter(customer_no_total, String('customer_no'),String('total'))"
                                  placeholder="Cus no."
                                  :disabled="customer_no_blank_total == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('customer_no','total')"
                                    v-model="customer_no_blank_total"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter cudtomer name  -->
                              <td v-if="column_total[4].show == true">
                                <v-autocomplete
                                  multiple
                                  dense
                                  :search-input.sync="search_customer_name_total"
                                  v-model="customer_name_total"
                                  type="text"
                                  label="Cus Name"
                                  :items="customer_name_list_total"
                                  @change="
                                    filter(customer_name_total, String('customer_name'),String('total'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter วันที่ลูกค้าชำระ -->
                              <td v-if="column_total[5].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_confirm_date_total"
                                  label="date"
                                  placeholder="วันที่ลูกค้าชำระ"
                                  v-b-modal.modal-total-center-confirm_date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  style="font-size:14px"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_confirm_date_total"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-total-center-confirm_date"
                                    centered
                                    hide-footer
                                    title="วันที่ลูกค้าชำระ"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabel"
                                      :cal-options="calOptions"
                                      @change="
                                        actionChange(
                                          confirm_date_range_total,
                                          'confirm_date',
                                          'total'
                                        )
                                      "
                                      v-model="confirm_date_range_total"
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
                                        @click="blankModal('confirm_date','total')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('confirm_date','total')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('confirm_date','total')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter ช่องทางการแจ้งหลักฐาน -->
                              <td v-if="column_total[6].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="evidence_reporting_total"
                                  type="text"
                                  style="font-size:14px"
                                  label="ช่องทางการแจ้งหลักฐาน"
                                  :items="evidence_reporting_list"
                                  @change="
                                    filter(evidence_reporting_total, String('evidence_reporting'),String('total'))
                                  "
                                ></v-autocomplete>
                              </td>
                              <!-- filter User (Save) -->
                              <td v-if="column_total[7].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  v-model="user_pending"
                                  type="text"
                                  multiple
                                  label="User"
                                  style="font-size:14px"
                                  :items="user_pending_list"
                                  @change="filter(user_pending, String('user_pending'),String('total'))"
                                ></v-autocomplete>
                              </td>
                              <!-- filter User (Matching) -->
                              <td v-if="column_total[8].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  v-model="user_matching"
                                  type="text"
                                  multiple
                                  label="User"
                                  style="font-size:14px"
                                  :items="user_matching_list"
                                  @change="filter(user_matching, String('user_matching'),String('total'))"
                                ></v-autocomplete>
                              </td>
                              <!-- filter วันที่กระทบ -->
                              <td v-if="column_total[9].show == true">
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="text_matching_submit_date_total"
                                  label="date"
                                  placeholder="วันที่กระทบ"
                                  v-b-modal.modal-total-center-matching_submit_date
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  style="font-size:14px"
                                />
                                <div>
                                  <b-modal
                                    class="dialog_date"
                                    ref="my-modal_matching_submit_date_total"
                                    data-backdrop="static"
                                    no-close-on-backdrop
                                    id="modal-total-center-matching_submit_date"
                                    centered
                                    hide-footer
                                    title="วันที่กระทบ"
                                  >
                                    <cv-date-picker
                                      placeholder="dd/mm/yyyy"
                                      light
                                      kind="range"
                                      :date-end-label="dateEndLabel"
                                      :cal-options="calOptions"
                                      @change="
                                        actionChange(
                                          matching_submit_date_range_total,
                                          'matching_submit_date',
                                          'total'
                                        )
                                      "
                                      v-model="matching_submit_date_range_total"
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
                                        @click="blankModal('matching_submit_date','total')"
                                      >
                                        [Blank]
                                      </button>
                                      <div style="width: 160px"></div>
                                      <div class="d-flex">
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-danger"
                                          @click="hideModal('matching_submit_date','total')"
                                          >Cancel</b-button
                                        >
                                        <div style="width: 10px"></div>
                                        <b-button
                                          data-dismiss="modal"
                                          class="mt-3"
                                          variant="outline-primary"
                                          @click="OkFilterModal('matching_submit_date','total')"
                                          >OK</b-button
                                        >
                                      </div>
                                    </div>
                                  </b-modal>
                                </div>
                              </td>
                              <!-- filter remark -->
                              <td v-if="column_total[10].show == true">
                                <input
                                  class="form-control"
                                  v-model="remark_total"
                                  type="text"
                                  placeholder="Remark"
                                  style="font-size:14px"
                                  @change="filter(remark_total, String('remark'),String('total'))"
                                  :disabled="remark_blank_total == true"
                                />
                                <div class="d-flex">
                                  <input
                                    type="checkbox"
                                    @change="blank_checkbox('remark','total')"
                                    v-model="remark_blank_total"
                                  />
                                  <div style="font-size: 10px">[blank]</div>
                                </div>
                              </td>
                              <!-- filter Status -->
                              <td v-if="column_total[11].show == true">
                                <v-autocomplete
                                  auto-select-first
                                  dense
                                  multiple
                                  v-model="status_total"
                                  type="text"
                                  style="font-size:14px"
                                  label="Srtatus"
                                  :items="status_list"
                                  @change="
                                    filter(status_total, String('status'),String('total'))
                                  "
                                ></v-autocomplete>
                              </td>
                            </tr>
                          </template>
                          <!-------------------------------- end filter Total------------------------------>
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

                          <template v-slot:[`item.email_date`]="{ item }">
                            <label
                              v-if="
                                parseDate(item.email_date) != '01/01/0001'
                              "
                            >
                              {{ parseDate(item.email_date) }}</label
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

                          <template v-slot:[`item.matching_submit_date`]="{ item }">
                            <label
                              v-if="
                                parseDate(item.matching_submit_date) != '01/01/0001'
                              "
                            >
                              {{ parseDate(item.matching_submit_date) }}</label
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
                            v-model="item_per_page_table_total"
                            @change="item_per_page_inc_table_Total()"
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
                            v-model="page_table_total"
                            :length="page_total_table_total"
                            :total-visible="10"
                            @input="pageChangeTableTotal()"
                          ></v-pagination>
                        </div>
                      </div>
                    </div>
                  </v-tab-item>
                  <!----------------------------- end Tab Total ------------------------------------>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    
    <!-- ------------------------------Delete-------------------------------------- -->
    <v-dialog
      v-model="dialogDelete"
      max-width="500px"
      style="z-index: 1002 !important"
    >
      <v-card class="pa-5">
        <v-card-title
          class="text-h5"
          style="
            justify-content: center;
            font-family: 'Bai_Jamjuree' !important;
          "
          >คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้ ?</v-card-title
        >
        <div style="text-align: center; font-family: 'Bai_Jamjuree' !important;" >
          <p><strong>Customer No :</strong> {{ delete_data.customer_no }}</p>
          <p><strong>Customer Name :</strong> {{ delete_data.customer_name }}</p>
          <p v-if="delete_data.document_no !== ''"><strong>Document No :</strong> {{ delete_data.document_no }}</p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogDelete = false">Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            dark
            @click="confirmDelete(delete_data.queue_no)"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- -------------------------end Delete-------------------------------------- -->
    <!---------------------------- ADD ------------------------------------->
    <v-dialog
      v-model="matching_dialog"
      max-width="900px"
      style="z-index: 1002 !important"
      @click:outside="cancelAdd()"
    >
      <v-card-title
          class="white--text"
          style="font-size:18px; font-family: 'Bai_Jamjuree';background-color: #035891"
        >
          Mail
        </v-card-title>
      <v-card class="pa-5">
        <!--
        <v-data-table hide-default-footer class="mb-6">
          <template v-slot:body="{}">
            <tbody>
              <tr
                v-for="(header, index) in headers_detail_table"
                :key="index"
              >
                <td class="detail-header" style="width: 180px; ">
                    {{ header.text }}
                </td>
                <td>
                  <div v-if="header.value == 'payment_type'" class="pa-1">
                      <select
                        v-model="payment_type_add"
                        style="
                          border: 1px solid #e0e0e0;
                          border-radius: 1px;
                          width: 100%;
                          height: 40px;
                          padding-left: 10px;
                          cursor: pointer;
                        "
                        >
                        <option></option>
                        <option value="Transfer">Transfer</option>
                        <option value="CHQ">CHQ</option>
                      </select>
                    </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
        <v-form
          ref="form"
          lazy-validation
        >
          <div class="d-flex mt-n3" style="font-family: 'Bai_Jamjuree';">
            <v-text-field
              class="ml-3"
              style="width: 85px"
              v-model="customer_search.customer_no"
              label="Customer No."
              @change="search_Cus(customer_search.customer_no)"
              :rules="rulesCus"
              required
            ></v-text-field>
            <div style="width: 10px"></div>
            <v-text-field
              class="mr-3"
              style="width: 300px"
              v-model="customer_search.customer_name"
              label="Customer Name"
              disabled
            ></v-text-field>
          </div>
        </v-form>
        -->
        <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col cols="4" class="pa-1 mt-1" style="font-size: 16px; font-family: Bai_Jamjuree;">ประเภทการชำระ</v-col>
            <v-col cols="1"></v-col>
            <v-col>
              <div>
                <select
                  v-model="payment_type_add"
                  style="
                    border: 1px solid #e0e0e0;
                    border-radius: 1px;
                    width: 100%;
                    height: 40px;
                    padding-left: 10px;
                    cursor: pointer;
                  "
                  @change="check_payment_type(payment_type_add)"
                >
                  <option></option>
                  <option value="Transfer">Transfer</option>
                  <option value="CHQ">CHQ</option>
                </select>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-7">
            <v-col cols="4" class="pa-1 mt-1" style="font-size: 16px; font-family: Bai_Jamjuree;">หลักฐานการชำระ</v-col>
            <v-col cols="1"></v-col>
            <v-col cols="2">
              <v-btn
                v-if="files == ''"
                style="width:100%; border-radius: 0px;"
                color="#FF5252"
                outlined
                class="justify-start"
                @click="upload_File_Dialog = true"
              >
                แนบไฟล์
                <v-icon right dark> mdi-file-download-outline </v-icon>
              </v-btn>
              <v-btn
                v-else
                style="width:100%; border-radius: 0px;"
                color="rgb(103, 194, 93)"
                outlined
                class="justify-start"
                @click="upload_File_Dialog = true"
              >
                {{files.length}} ไฟล์
                <v-icon right dark> mdi-file-download-outline </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2" class="pa-1 mt-1" style="font-size: 16px; font-family: Bai_Jamjuree; text-align:center;">เอกสาร WHT</v-col>
            <v-col cols="1">
              <div>
                <select
                  v-model="WHT_list"
                  style="
                    border: 1px solid #e0e0e0;
                    border-radius: 1px;
                    width: 50px; 
                    height:40px; 
                    font-size: 14px; 
                    font-family: 'Bai_Jamjuree';
                    margin-right:20px; 
                    text-align:center;"
                  @change="validateselect(WHT_list)"
                >
                  <option></option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
                
              </div>
            </v-col>
            <v-col>
              <v-btn
                v-if="files_wht == ''"
                :disabled="WHT_list != '1'"
                style="width:100%; border-radius: 0px;"
                color="#FF5252"
                outlined
                class="justify-start"
                @click="upload_File_WHT_Dialog = true"
              >
                แนบไฟล์
                <v-icon right dark> mdi-file-download-outline </v-icon>
              </v-btn>
              <v-btn
                v-else
                style="width:100%; border-radius: 0px;"
                color="rgb(103, 194, 93)"
                outlined
                class="justify-start"
                @click="upload_File_WHT_Dialog = true"
              >
                {{files_wht.length}} ไฟล์
                <v-icon right dark> mdi-file-download-outline </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-2">
            <v-col cols="4" class="pa-1" style="font-size: 16px; font-family: Bai_Jamjuree;">
              <v-text-field
                v-model="customer_search.customer_no"
                label="Customer No."
                @change="search_Cus(customer_search.customer_no)"
                :rules="rulesCus"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="1"></v-col>
            <v-col class="pa-1" style="font-size: 16px; font-family: Bai_Jamjuree;">
              <v-text-field
                v-model="customer_search.customer_name"
                label="Customer Name"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-3">
            <v-col cols="4" class="pa-1 mt-1" style="font-size: 16px; font-family: Bai_Jamjuree;">ช่องทางการแจ้งหลักฐาน</v-col>
            <v-col cols="1"></v-col>
            <v-col>
              <div>
                <select
                  v-model="evidence_reporting"
                    style="
                      border: 1px solid #e0e0e0;
                      border-radius: 1px;
                      width: 100%;
                      height: 40px;
                      padding-left: 10px;
                      cursor: pointer;
                    "
                  >
                    <option></option>
                    <option value="Mail">Mail</option>
                    <option value="Mail-Confirm">Mail-Confirm</option>
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
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-7">
            <v-col cols="4" class="pa-1 mt-2" style="font-size: 16px; font-family: Bai_Jamjuree;">Email Date</v-col>
            <v-col cols="1"></v-col>
            <v-col>
              <input
                style="text-align: left;"
                class="form-control-mail-date"
                type="date"
                v-model="mail_date"
                placeholder="dd/mm/yyyy"
              />
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-7">
            <v-col cols="4" class="pa-1 mt-2" style="font-size: 16px; font-family: Bai_Jamjuree;">วันที่ชำระ</v-col>
            <v-col cols="1"></v-col>
            <v-col>
              <input
                style="text-align: left;"
                class="form-control-mail-date"
                type="date"
                v-model="payment_date"
                placeholder="dd/mm/yyyy"
              />
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-7">
            <v-col cols="4" class="pa-1" style="font-size: 16px; font-family: Bai_Jamjuree;">Remark</v-col>
            <v-col cols="1"></v-col>
            <v-col>
              <v-textarea
                style="border-radius: 0px;"
                rows="2"
                outlined
                v-model="remark_add"
                dense
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancelAdd()" class="mb-2">Cancel</v-btn>
          <v-btn
            color="primary"
            @click="confirmAdd()"
            class="mb-2"
            :disabled="payment_type_add == '' || customer_search.customer_name == '' || evidence_reporting == ''"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---------------------------- END ADD ------------------------------------->
    <!-- Add Files -->
    <v-dialog v-model="upload_File_Dialog" width="550">
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
            <template v-slot:default="{ item }">
              <v-list-item :key="item.name">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item-content>

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
    <v-dialog v-model="upload_File_WHT_Dialog" width="550">
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
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item-content>

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
    <add-dialog
      :mail_dialog="mail_dialog"
      @close_mail_dialog="close_mail_dialog"
      @save_mail_dialog="save_mail_dialog"
    />
    <dialog-view-file
      :file_dialog="file_dialog"
      @close_file_dialog="close_file_dialog"
      @edit_dialog="edit_dialog"
    />

    <matching-dialog 
    :payment_type_bank="payment_matching_type" 
    @edit_dialog="edit_dialog"
    />

    <add-matching-dialog 
    :payment_type="payment_matching_type" 
    @edit_dialog="edit_dialog"
    />
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import Swal from "sweetalert2";
import "carbon-components/css/carbon-components.min.css";
import AddMailDialog from "../components/DialogAddMail.vue";
import JsonCSV from "vue-json-csv";
Vue.component("downloadCsv", JsonCSV);
import eventBus from "../event-bus";
import EditMatchingDialog from "../components/EditMatchingDialog.vue";
import DialogAddMatching from "../components/DialogAddMatching.vue";
import DialogViewFile from "../components/DialogViewFile.vue"

export default {
  components: {
    "add-dialog": AddMailDialog,
    "matching-dialog": EditMatchingDialog,
    "add-matching-dialog": DialogAddMatching,
    "dialog-view-file":DialogViewFile
  },
  data: () => ({
    dialog_view_file: false,
    dialogDelete: false,
    saved_data: [], // export tab saved
    reject_data: [], //export tab reject
    reversed_data: [], //export tab reversed
    finish: true,
    tab: null,
    upload_File_Dialog: false,
    upload_File_WHT_Dialog: false,
    files: [],
    files_wht: [],
    data_file: [],
    data_file_wht: [],
    set_file: [],
    set_file_wht: [],
    dragoverfile: false,
    dragoverfile_WHT:false,
    tab_items: [
      { name:"SAVED" }, 
      { name: "REJECTED" },
      { name: "REVERSED" },
      { name: "TOTAL" }
    ],
    search_saved: "",
    search_reject: "",
    search_reversed: "",
    search_total: "",

    item_per_page_table_saved: 100,
    page_table_saved: 1,
    page_total_table_saved: 1,

    item_per_page_table_reject: 100,
    page_table_reject: 1,
    page_total_table_reject: 1,

    item_per_page_table_reversed: 100,
    page_table_reversed: 1,
    page_total_table_reversed: 1,

    item_per_page_table_total: 100,
    page_table_total: 1,
    page_total_table_total: 1,

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
    headers_saved_reject: [
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
        width: "300px",
        align: "center",
        sortable: true,
      },
    ],
    headers_reject: [
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
        text: "Remark Reject",
        value: "remark_rejected",
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
        width: "300px",
        align: "center",
        sortable: true,
      },
    ],
    headers_reversed: [
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
        text: "Remark Reversed",
        value: "remark_reversed",
        width: "300px",
        align: "left",
        sortable: true,
      },
      {
        text: "Status Reversed",
        value: "status_pending",
        width: "250px",
        align: "center",
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
        width: "300px",
        align: "center",
        sortable: true,
      },
    ],
    headers_total: [
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
        text: "Email Date",
        value: "email_date",
        width: "200px",
        sortable: true,
        align: "center",
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
        text: "วันที่ลูกค้าชำระ",
        value: "confirm_date",
        width: "200px",
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
        text: "User(Save)",
        value: "user_pending",
        width: "250px",
        align: "center",
        sortable: true,
      },
      {
        text: "User(Matching)",
        value: "user_matching",
        width: "250px",
        align: "center",
        sortable: true,
      },
      {
        text: "วันที่กระทบ",
        value: "matching_submit_date",
        width: "200px",
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
        text: "Status",
        value: "status",
        width: "250px",
        align: "center",
        sortable: true,
      },
    ],
    headers_detail_table: [
      {
        text: "ประเภทชำระ",
        align: "left",
        sortable: false,
        value: "payment_type",
        width: "100px",
      },
    ],
    column_total: [
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
        name: "Email Date",
        show: true,
        fixed: true,
        value: "email_date",
      },
      {
        name: "Cus No.",
        show: true,
        fixed: true,
        value: "customer_no",
      },
      {
        name: "Cus Name.",
        show: true,
        fixed: true,
        value: "customer_name",
      },
      {
        name: "วันที่ลูกค้าชำระ",
        show: true,
        fixed: true,
        value: "confirm_date",
      },
      {
        name: "ช่องทางการแจ้งหลักฐาน",
        show: true,
        fixed: true,
        value: "evidence_reporting",
      },
      {
        name: "User (Save)",
        show: true,
        fixed: true,
        value: "user_pending",
      },
      {
        name: "User (Matching)",
        show: true,
        fixed: true,
        value: "user_matching",
      },
      {
        name: "วันที่กระทบ",
        show: true,
        fixed: true,
        value: "matching_submit_date",
      },
      {
        name: "Remark",
        show: true,
        fixed: true,
        value: "remark",
      },
      {
        name: "Status",
        show: true,
        fixed: true,
        value: "status",
      },
    ],
    column_name: [
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
        fixed: true,
        value: "customer_no",
      },
      {
        name: "Cus Name.",
        show: true,
        fixed: true,
        value: "customer_name",
      },
      {
        name: "วันที่ชำระ",
        show: true,
        fixed: true,
        value: "confirm_date",
      },
      {
        name: "Bank",
        show: true,
        fixed: true,
        value: "payment_type_bank",
      },
      {
        name: "รวมยอดชำระ",
        show: true,
        fixed: true,
        value: "sum_amounts",
      },
      {
        name: "หลักฐานการชำระ",
        show: true,
        fixed: true,
        value: "status_file",
      },
      {
        name: "File หลักฐาน",
        show: true,
        fixed: true,
        value: "file",
      },
      {
        name: "WHT",
        show: true,
        fixed: true,
        value: "check_wht",
      },
      {
        name: "เอกสาร WHT",
        show: true,
        fixed: true,
        value: "status_file_wht",
      },
      {
        name: "File WHT",
        show: true,
        fixed: true,
        value: "file_wht",
      },
      {
        name: "Mail WHT",
        show: true,
        fixed: true,
        value: "check_mail_wht",
      },
      {
        name: "Mail Confirm Invoice",
        show: true,
        fixed: true,
        value: "request_day",
      },
      {
        name: "Remark",
        show: true,
        fixed: true,
        value: "remark",
      },
      {
        name: "User",
        show: true,
        fixed: true,
        value: "action_by_name",
      },
      {
        name: "ส่งตัดหนี้",
        show: true,
        fixed: true,
        value: "action",
      },
    ],
    column_reject: [
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
        name: "Remark Reject",
        show: true,
        fixed: false,
        value: "remark_rejected",
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
    column_reversed: [
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
        fixed: true,
        value: "customer_no",
      },
      {
        name: "Cus Name.",
        show: true,
        fixed: true,
        value: "customer_name",
      },
      {
        name: "วันที่ชำระ",
        show: true,
        fixed: true,
        value: "confirm_date",
      },
      {
        name: "Bank",
        show: true,
        fixed: true,
        value: "payment_type_bank",
      },
      {
        name: "รวมยอดชำระ",
        show: true,
        fixed: true,
        value: "sum_amounts",
      },
      {
        name: "หลักฐานการชำระ",
        show: true,
        fixed: true,
        value: "status_file",
      },
      {
        name: "File หลักฐาน",
        show: true,
        fixed: true,
        value: "file",
      },
      {
        name: "WHT",
        show: true,
        fixed: true,
        value: "check_wht",
      },
      {
        name: "เอกสาร WHT",
        show: true,
        fixed: true,
        value: "status_file_wht",
      },
      {
        name: "File WHT",
        show: true,
        fixed: true,
        value: "file_wht",
      },
      {
        name: "Mail WHT",
        show: true,
        fixed: true,
        value: "check_mail_wht",
      },
      {
        name: "Mail Confirm Invoice",
        show: true,
        fixed: true,
        value: "request_day",
      },
      {
        name: "Remark",
        show: true,
        fixed: true,
        value: "remark",
      },
      {
        name: "Remark Reversed",
        show: true,
        fixed: true,
        value: "remark_reversed",
      },
      {
        name: "Status Reversed",
        show: true,
        fixed: true,
        value: "status_pending",
      },
      {
        name: "User",
        show: true,
        fixed: true,
        value: "action_by_name",
      },
      {
        name: "ส่งตัดหนี้",
        show: true,
        fixed: true,
        value: "action",
      },
    ],
    // date
    mail_date_range: {
      startDate: null,
      endDate: null,
    },
    mail_action_date_range: {
      startDate: null,
      endDate: null,
    },
    saved_action_date_range: {
      startDate: null,
      endDate: null,
    },
    reject_action_date_range: {
      startDate: null,
      endDate: null,
    },
    reversed_action_date_range: {
      startDate: null,
      endDate: null,
    },
    total_action_date_range: {
      startDate: null,
      endDate: null,
    },
    total_email_date_range: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range_mail: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range_saved: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range_reject: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range_reversed: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range_total: {
      startDate: null,
      endDate: null,
    },
    matching_submit_date_range_total: {
      startDate: null,
      endDate: null,
    },
    text_mail_date: null,
    text_action_date_mail: null,
    text_action_date_saved: null,
    text_action_date_reject: null,
    text_action_date_reversed: null,
    text_action_date_total: null,
    text_email_date_total: null,
    text_confirm_date_mail: null,
    text_confirm_date_saved: null,
    text_confirm_date_total: null,
    text_matching_submit_date_total: null,
    text_confirm_date_reject: null,
    text_confirm_date_reversed: null,
    email_date: [null, null],
    action_date_mail: [null, null],
    action_date_saved: [null, null],
    action_date_reject: [null, null],
    action_date_reversed: [null, null],
    action_date_total: [null, null],
    confirm_date_mail: [null, null],
    confirm_date_saved: [null, null],
    confirm_date_reject: [null, null],
    confirm_date_reversed: [null, null],
    confirm_date_total: [null, null],
    matching_submit_date_total: [null , null],
    email_date_total: [null, null],
    dateEndLabel: "End date",
    calOptions: {
      dateFormat: "d/m/Y",
    },
    // end
    datalist_saved: [], //ตาราง Saved
    datalist_reject: [], //ตาราง Reject
    datalist_reversed: [], //ตาราง Reversed
    datalist_total: [], //ตาราง Total
    wait_role: "",
    mail_dialog: false,
    matching_dialog: false,
    payment_type_add: "",
    WHT_list: "",
    evidence_reporting: "",
    mail_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
    payment_date: moment(new Date().toJSON()).format("YYYY-MM-DD"),
    remark_add: "",
    customer_search: {
      customer_no: "",
      customer_name: "",
    },
    sale_email: "",
    rulesCus: [],
    // filter
    remark_blank_mail: false,
    remark_blank_saved: false,
    remark_blank_reject: false,
    remark_blank_rejected: false,
    remark_blank_reversed: false,
    remark_blank_reverseds: false,
    remark_blank_total: false,
    customer_no_blank_mail: false,
    customer_no_blank_saved: false,
    customer_no_blank_reject: false,
    customer_no_blank_reversed: false,
    customer_no_blank_total: false,
    document_no_blank_saved: false,
    document_no_blank_reject: false,
    document_no_blank_reversed: false,
    document_no_blank_total: false,
    request_day_blank_mail: false,
    request_day_blank_saved: false,
    request_day_blank_reject: false,
    request_day_blank_reversed: false,
    request_day_blank_total: false,
    document_no_blank: false,
    customer_no_mail: "",
    customer_no_saved: "",
    customer_no_reject: "",
    customer_no_reversed: "",
    customer_no_total: "",
    document_no_saved: "",
    document_no_reject: "",
    document_no_reversed: "",
    document_no_total: "",
    request_day_mail: "",
    request_day_saved: "",
    request_day_total: "",
    request_day_reject: "",
    request_day_reversed: "",
    customer_name_mail: "",
    customer_name_saved: "",
    customer_name_total: "",
    customer_name_reject: "",
    customer_name_reversed: "",
    search_customer_name_mail: null,
    search_customer_name_saved: null,
    search_customer_name_total: null,
    search_customer_name_reject: null,
    search_customer_name_reversed: null,
    customer_name_list_mail: [],
    customer_name_list_saved: [],
    customer_name_list_total: [],
    customer_name_list_reject: [],
    customer_name_list_reversed: [],
    filterlist: [],
    Alldata: [],
    user_name_mail: "",
    user_name_list_mail: [],
    user_name_saved: "",
    user_name_list_saved: [],
    user_name_reject: "",
    user_name_list_reject: [],
    user_name_reversed: "",
    status_reversed: "",
    user_name_list_reversed: [],
    status_reversed_list: [
      "[blank]",
      "Reversed",
      "Clear",
    ],
    user_name_total: "",
    user_pending: "",
    user_matching: "",
    user_name_list_total: [],
    user_pending_list: [],
    user_matching_list: [],
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
    status_list: [
      "[blank]",
      "Pending",
      "Matched",
      "Success",
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
    sum_amounts_list:[
      {
        name: "0",
        value: "0",
      },
      {
        name: "มากกว่า 0",
        value: "1",
      },
    ],
    remark_mail: "",
    remark_saved: "",
    remark_total: "",
    remark_reject: "",
    remark_rejected: "",
    remark_reverse: "",
    remark_reversed: "",
    status_file_mail: "",
    status_file_saved: "",
    status_file_total: "",
    status_file_reject: "",
    status_file_reversed: "",
    status_file_wht_mail: "",
    status_file_wht_saved: "",
    status_file_wht_total: "",
    status_file_wht_reject: "",
    status_file_wht_reversed: "",
    check_mail_wht_saved: "",
    check_mail_wht_total: "",
    check_mail_wht_reject: "",
    check_mail_wht_reversed: "",
    check_wht_mail: "",
    check_wht_saved: "",
    check_wht_total: "",
    check_wht_reject: "",
    check_wht_reversed: "",
    sum_amounts_mail: "",
    sum_amounts_saved: "",
    sum_amounts_total: "",
    sum_amounts_reject: "",
    sum_amounts_reversed: "",
    payment_type_bank_mail: "",
    payment_type_bank_saved: "",
    payment_type_bank_total: "",
    evidence_reporting_total: "",
    status_total: "",
    payment_type_bank_reject: "",
    payment_type_bank_reversed: "",
    AllFile: "",
    // end
    payment_matching_type: "",
    item_file: [],
    delete_data: {
      customer_no: "",
      customer_name: "",
      queue_no: "",
      document_no: ""
    },
    tab_name : "",
    show_column_saved: [],
    column_select_saved: [],
    list_column_saved: [],
    show_column_reject: [],
    column_select_reject: [],
    list_column_reject: [],
    show_column_reversed: [],
    column_select_reversed: [],
    list_column_reversed: [],
    show_column_total: [],
    column_select_total: [],
    list_column_total: [],
  }),
  // mounted(){
  //   eventBus.$on('openBankDialog',this.open)
  // },
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
    async getAll(){
      await this.getSaved();
      await this.getReject();
      await this.getReversed();
      await this.getTotal();
      await this.setting_column_saved();
      await this.setting_column_reject();
      await this.setting_column_reversed();
      await this.setting_column_total();
    },
    // export tab Saved
    exportFileSaved() {
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
        .get(process.env.VUE_APP_API + "/export/pending/saved", headers)
        .then((response) => {
          // console.log(response)
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_pending_saved.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
      })
       
    },
    // export tab Reject
    exportFileReject() {
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
        .get(process.env.VUE_APP_API + "/export/pending/reject", headers)
        .then((response) => {
          // console.log(response)
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_pending_reject.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
      })
    },
    // export tab Reversed
    exportFileReversed(){
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
        .get(process.env.VUE_APP_API + "/export/pending/reverse", headers)
        .then((response) => {
          // console.log(response)
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_pending_reversed.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
      })
    },
    // export tab Total
    exportFileTotal(){
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
        .get(process.env.VUE_APP_API + "/export/pending/total", headers)
        .then((response) => {
          // console.log(response)
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_pending_total.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
      })
    },
    convert(item) {
      return item.toLocaleString();
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    parseDateTime(date) {
      return date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "";
    },
    // ข้อมูล Saved
    async getSaved() {
      // console.log('2')
      this.finish = false;
      this.datalist_saved = [];
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
            "/statement/getpending/Saved?size=" +
            this.item_per_page_table_saved +
            "&page=" +
            this.page_table_saved +
            "&search=" +
            String(this.search_saved),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_saved = response.data.data;
            this.Alldata = response.data.data;
            this.page_total_table_saved = response.data.count_page;
            // if(this.search_saved == ""){
            //   this.getReject();
            // }
            if (this.datalist_saved !== null) {
              this.customer_name_list_saved = [];
              this.user_name_list_saved = [];
              this.listfilter_data("", "customer_name",'saved');
              this.listfilter_data("", "action_by_name",'saved');
            }
          } else {
            this.finish = true;
            this.datalist_saved = []
            this.page_total_table_saved = 1;
            // this.getReject();
          }
        })
        .catch((error) => {
          // console.log(error.response.status)
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
    },
    refreshDataSaved() {
      this.finish = false;
      this.search_saved = "";
      this.page_table_saved = 1;
      this.getSaved();
    },
    async setting_column_saved(){
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
      this.show_column_saved = [];
      this.column_select_saved = [];
      this.list_column_saved = [];

      for (let i = 0; i < this.headers_saved_reject.length; i++) {
        if (this.headers_saved_reject[i].value == "document_no") {
          this.show_column_saved.push(this.headers_saved_reject[i]);
          this.column_select_saved.push(this.headers_saved_reject[i]);
          this.list_column_saved.push(this.headers_saved_reject[i]);
        }
      }
      this.axios
        .get(process.env.VUE_APP_API + "/setting/columns/list/statement/Pending/Saved", headers)
        .then((response) => {
          for (let index = 0; index < this.column_name.length; index++) {
            if (this.column_name[index].value == "action_date") {
              this.column_name[index].show = response.data.action_date;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "action_date" &&
                  response.data.action_date == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "customer_no") {
              this.column_name[index].show = response.data.customer_no;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "customer_no" &&
                  response.data.customer_no == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "customer_name") {
              this.column_name[index].show = response.data.customer_name;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "customer_name" &&
                  response.data.customer_name == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "confirm_date") {
              this.column_name[index].show = response.data.confirm_date;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "confirm_date" &&
                  response.data.confirm_date == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "payment_type_bank") {
              this.column_name[index].show = response.data.payment_type_bank;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "payment_type_bank" &&
                  response.data.payment_type_bank == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "sum_amounts") {
              this.column_name[index].show = response.data.sum_amounts;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "sum_amounts" &&
                  response.data.sum_amounts == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "status_file") {
              this.column_name[index].show = response.data.status_file;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "status_file" &&
                  response.data.status_file == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "file") {
              this.column_name[index].show = response.data.file;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "file" &&
                  response.data.file == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "check_wht") {
              this.column_name[index].show = response.data.check_wht;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "check_wht" &&
                  response.data.check_wht == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "status_file_wht") {
              this.column_name[index].show = response.data.status_file_wht;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "status_file_wht" &&
                  response.data.status_file_wht == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "file_wht") {
              this.column_name[index].show = response.data.file_wht;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "file_wht" &&
                  response.data.file_wht == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "check_mail_wht") {
              this.column_name[index].show = response.data.check_mail_wht;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "check_mail_wht" &&
                  response.data.check_mail_wht == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "request_day") {
              this.column_name[index].show = response.data.request_day;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "request_day" &&
                  response.data.request_day == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "remark") {
              this.column_name[index].show = response.data.remark;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "remark" &&
                  response.data.remark == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "action_by_name") {
              this.column_name[index].show = response.data.action_by_name;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "action_by_name" &&
                  response.data.action_by_name == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            if (this.column_name[index].value == "action") {
              this.column_name[index].show = response.data.action;
              for (let k = 0; k < this.headers_saved_reject.length; k++) {
                if (
                  this.headers_saved_reject[k].value == "action" &&
                  response.data.action == true
                ) {
                  this.show_column_saved.push(this.headers_saved_reject[k]);
                  this.column_select_saved.push(this.headers_saved_reject[k]);
                  this.list_column_saved.push(this.headers_saved_reject[k]);
                }
              }
            }

            var sortt = this.headers_saved_reject;
            this.show_column_saved.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.column_select_saved.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.list_column_saved.sort(function(a, b) {
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
                process.env.VUE_APP_API + "/setting/columns/statement/Pending/Saved",
                body_2,
                headers
              )
              .then((response) => {
                if (response) {
                  this.setting_column_saved();
                }
              });
          }
        })
    },
    select_column_saved(column, item) {
      if (column == false) {
        for (let index = 0; index < this.show_column_saved.length; index++) {
          if (item.name == this.show_column_saved[index].text) {
            this.show_column_saved.splice(index, 1);
          }
        }
      } else if (column == true) {
        for (let index = 0; index < this.headers_saved_reject.length; index++) {
          if (item.name == this.headers_saved_reject[index].text) {
            this.show_column_saved.splice(index, 0, this.headers_saved_reject[index]);
          }
        }
      }

      this.list_column_saved = [];

      for (let j = 0; j < this.headers_saved_reject.length; j++) {
        for (let g = 0; g < this.show_column_saved.length; g++) {
          if (this.headers_saved_reject[j].text == this.show_column_saved[g].text) {
            this.list_column_saved.push(this.headers_saved_reject[j]);
          }
        }
      }
    },
    Add_column_saved(){
      this.column_select_saved = this.list_column_saved;

      var addColumn = {
        document_no: true,
        action_date: true,
        customer_no: true,
        customer_name: true,
        confirm_date: true,
        payment_type_bank: true,
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

      for (let index = 0; index < this.column_name.length; index++) {
        if (this.column_name[index].value == "action_date") {
          addColumn.action_date = this.column_name[index].show;
        }
        if (this.column_name[index].value == "customer_no") {
          addColumn.customer_no = this.column_name[index].show;
        }
        if (this.column_name[index].value == "customer_name") {
          addColumn.customer_name = this.column_name[index].show;
        }
        if (this.column_name[index].value == "confirm_date") {
          addColumn.confirm_date = this.column_name[index].show;
        }
        if (this.column_name[index].value == "payment_type_bank") {
          addColumn.payment_type_bank = this.column_name[index].show;
        }
        if (this.column_name[index].value == "sum_amounts") {
          addColumn.sum_amounts = this.column_name[index].show;
        }
        if (this.column_name[index].value == "status_file") {
          addColumn.status_file = this.column_name[index].show;
        }
        if (this.column_name[index].value == "file") {
          addColumn.file = this.column_name[index].show;
        }
        if (this.column_name[index].value == "check_wht") {
          addColumn.check_wht = this.column_name[index].show;
        }
        if (this.column_name[index].value == "status_file_wht") {
          addColumn.status_file_wht = this.column_name[index].show;
        }
        if (this.column_name[index].value == "file_wht") {
          addColumn.file_wht = this.column_name[index].show;
        }
        if (this.column_name[index].value == "check_mail_wht") {
          addColumn.check_mail_wht = this.column_name[index].show;
        }
        if (this.column_name[index].value == "request_day") {
          addColumn.request_day = this.column_name[index].show;
        }
        if (this.column_name[index].value == "remark") {
          addColumn.remark = this.column_name[index].show;
        }
        if (this.column_name[index].value == "action_by_name") {
          addColumn.action_by_name = this.column_name[index].show;
        }
        if (this.column_name[index].value == "action") {
          addColumn.action = this.column_name[index].show;
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
          process.env.VUE_APP_API + "/setting/columns/statement/Pending/Saved",
          addColumn,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = false;
            this.setting_column_saved();
          }
        });

    },
    cancel_colunm_saved() {
      this.setting_column_saved();
    },
    async setting_column_total(){
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
      this.show_column_total = [];
      this.column_select_total = [];
      this.list_column_total = [];

      for (let i = 0; i < this.headers_total.length; i++) {
        if (this.headers_total[i].value == "document_no") {
          this.show_column_total.push(this.headers_total[i]);
          this.column_select_total.push(this.headers_total[i]);
          this.list_column_total.push(this.headers_total[i]);
        }
      }
      this.axios
        .get(process.env.VUE_APP_API + "/setting/columns/list/statement/Pending/Total", headers)
        .then((response) => {
          for (let index = 0; index < this.column_total.length; index++) {
            if (this.column_total[index].value == "action_date") {
              this.column_total[index].show = response.data.action_date;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "action_date" &&
                  response.data.action_date == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "email_date") {
              this.column_total[index].show = response.data.email_date;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "email_date" &&
                  response.data.email_date == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "customer_no") {
              this.column_total[index].show = response.data.customer_no;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "customer_no" &&
                  response.data.customer_no == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "customer_name") {
              this.column_total[index].show = response.data.customer_name;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "customer_name" &&
                  response.data.customer_name == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "confirm_date") {
              this.column_total[index].show = response.data.confirm_date;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "confirm_date" &&
                  response.data.confirm_date == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "evidence_reporting") {
              this.column_total[index].show = response.data.evidence_reporting;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "evidence_reporting" &&
                  response.data.evidence_reporting == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "user_pending") {
              this.column_total[index].show = response.data.user_pending;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "user_pending" &&
                  response.data.user_pending == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "user_matching") {
              this.column_total[index].show = response.data.user_matching;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "user_matching" &&
                  response.data.user_matching == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "matching_submit_date") {
              this.column_total[index].show = response.data.matching_submit_date;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "matching_submit_date" &&
                  response.data.matching_submit_date == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "remark") {
              this.column_total[index].show = response.data.remark;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "remark" &&
                  response.data.remark == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            if (this.column_total[index].value == "status") {
              this.column_total[index].show = response.data.status;
              for (let k = 0; k < this.headers_total.length; k++) {
                if (
                  this.headers_total[k].value == "status" &&
                  response.data.status == true
                ) {
                  this.show_column_total.push(this.headers_total[k]);
                  this.column_select_total.push(this.headers_total[k]);
                  this.list_column_total.push(this.headers_total[k]);
                }
              }
            }

            var sortt = this.headers_total;
            this.show_column_total.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.column_select_total.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.list_column_total.sort(function(a, b) {
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
              email_date: true,
              customer_no: true,
              customer_name: true,
              confirm_date: true,
              evidence_reporting: true,
              user_pending: true,
              user_matching: true,
              matching_submit_date: true,
              remark: true,
              status: true,
              
            };
            this.axios
              .put(
                process.env.VUE_APP_API + "/setting/columns/statement/Pending/Total",
                body_2,
                headers
              )
              .then((response) => {
                if (response) {
                  this.setting_column_total();
                }
              });
          }
        })
    },
    select_column_total(column, item) {
      if (column == false) {
        for (let index = 0; index < this.show_column_total.length; index++) {
          if (item.name == this.show_column_total[index].text) {
            this.show_column_total.splice(index, 1);
          }
        }
      } else if (column == true) {
        for (let index = 0; index < this.headers_total.length; index++) {
          if (item.name == this.headers_total[index].text) {
            this.show_column_total.splice(index, 0, this.headers_total[index]);
          }
        }
      }

      this.list_column_saved = [];

      for (let j = 0; j < this.headers_total.length; j++) {
        for (let g = 0; g < this.show_column_total.length; g++) {
          if (this.headers_total[j].text == this.show_column_total[g].text) {
            this.list_column_total.push(this.headers_total[j]);
          }
        }
      }
    },
    Add_column_total(){
      this.column_select_total = this.list_column_total;

      var addColumn = {
        document_no: true,
        action_date: true,
        email_date: true,
        customer_no: true,
        customer_name: true,
        confirm_date: true,
        evidence_reporting: true,
        user_pending: true,
        user_matching: true,
        matching_submit_date: true,
        remark: true,
        status: true,
      };

      for (let index = 0; index < this.column_total.length; index++) {
        if (this.column_total[index].value == "action_date") {
          addColumn.action_date = this.column_total[index].show;
        }
        if (this.column_total[index].value == "email_date") {
          addColumn.email_date = this.column_total[index].show;
        }
        if (this.column_total[index].value == "customer_no") {
          addColumn.customer_no = this.column_total[index].show;
        }
        if (this.column_total[index].value == "customer_name") {
          addColumn.customer_name = this.column_total[index].show;
        }
        if (this.column_total[index].value == "confirm_date") {
          addColumn.confirm_date = this.column_total[index].show;
        }
        if (this.column_total[index].value == "evidence_reporting") {
          addColumn.evidence_reporting = this.column_total[index].show;
        }
        if (this.column_total[index].value == "user_pending") {
          addColumn.user_pending = this.column_total[index].show;
        }
        if (this.column_total[index].value == "user_matching") {
          addColumn.user_matching = this.column_total[index].show;
        }
        if (this.column_total[index].value == "matching_submit_date") {
          addColumn.matching_submit_date = this.column_total[index].show;
        }
        if (this.column_total[index].value == "remark") {
          addColumn.remark = this.column_total[index].show;
        }
        if (this.column_total[index].value == "status") {
          addColumn.status = this.column_total[index].show;
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
          process.env.VUE_APP_API + "/setting/columns/statement/Pending/Total",
          addColumn,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = false;
            this.setting_column_total();
          }
        });

    },
    cancel_colunm_total() {
      this.setting_column_total();
    },
    async setting_column_reject(){
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
      this.show_column_reject = [];
      this.column_select_reject = [];
      this.list_column_reject = [];

      for (let i = 0; i < this.headers_reject.length; i++) {
        if (this.headers_reject[i].value == "document_no") {
          this.show_column_reject.push(this.headers_reject[i]);
          this.column_select_reject.push(this.headers_reject[i]);
          this.list_column_reject.push(this.headers_reject[i]);
        }
      }
      this.axios
        .get(process.env.VUE_APP_API + "/setting/columns/list/statement/Pending/Reject", headers)
        .then((response) => {
          for (let index = 0; index < this.column_reject.length; index++) {
            if (this.column_reject[index].value == "action_date") {
              this.column_reject[index].show = response.data.action_date;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "action_date" &&
                  response.data.action_date == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "customer_no") {
              this.column_reject[index].show = response.data.customer_no;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "customer_no" &&
                  response.data.customer_no == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "customer_name") {
              this.column_reject[index].show = response.data.customer_name;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "customer_name" &&
                  response.data.customer_name == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "confirm_date") {
              this.column_reject[index].show = response.data.confirm_date;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "confirm_date" &&
                  response.data.confirm_date == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "payment_type_bank") {
              this.column_reject[index].show = response.data.payment_type_bank;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "payment_type_bank" &&
                  response.data.payment_type_bank == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "sum_amounts") {
              this.column_reject[index].show = response.data.sum_amounts;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "sum_amounts" &&
                  response.data.sum_amounts == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "status_file") {
              this.column_reject[index].show = response.data.status_file;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "status_file" &&
                  response.data.status_file == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "file") {
              this.column_reject[index].show = response.data.file;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "file" &&
                  response.data.file == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "check_wht") {
              this.column_reject[index].show = response.data.check_wht;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "check_wht" &&
                  response.data.check_wht == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "status_file_wht") {
              this.column_reject[index].show = response.data.status_file_wht;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "status_file_wht" &&
                  response.data.status_file_wht == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "file_wht") {
              this.column_reject[index].show = response.data.file_wht;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "file_wht" &&
                  response.data.file_wht == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "check_mail_wht") {
              this.column_reject[index].show = response.data.check_mail_wht;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "check_mail_wht" &&
                  response.data.check_mail_wht == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "request_day") {
              this.column_reject[index].show = response.data.request_day;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "request_day" &&
                  response.data.request_day == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "remark") {
              this.column_reject[index].show = response.data.remark;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "remark" &&
                  response.data.remark == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "remark_rejected") {
              this.column_reject[index].show = response.data.remark_rejected;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "remark_rejected" &&
                  response.data.remark_rejected == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "action_by_name") {
              this.column_reject[index].show = response.data.action_by_name;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "action_by_name" &&
                  response.data.action_by_name == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            if (this.column_reject[index].value == "action") {
              this.column_reject[index].show = response.data.action;
              for (let k = 0; k < this.headers_reject.length; k++) {
                if (
                  this.headers_reject[k].value == "action" &&
                  response.data.action == true
                ) {
                  this.show_column_reject.push(this.headers_reject[k]);
                  this.column_select_reject.push(this.headers_reject[k]);
                  this.list_column_reject.push(this.headers_reject[k]);
                }
              }
            }

            var sortt = this.headers_reject;
            this.show_column_reject.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.column_select_reject.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.list_column_reject.sort(function(a, b) {
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
              status_file: true,
              file: true,
              check_wht: true,
              status_file_wht: true,
              file_wht: true,
              check_mail_wht: true,
              request_day: true,
              remark: true,
              remark_rejected: true,
              action_by_name: true,
              action: true,
            };
            this.axios
              .put(
                process.env.VUE_APP_API + "/setting/columns/statement/Pending/Reject",
                body_2,
                headers
              )
              .then((response) => {
                if (response) {
                  this.setting_column_reject();
                }
              });
          }
        })
    },
    select_column_reject(column, item) {
      if (column == false) {
        for (let index = 0; index < this.show_column_reject.length; index++) {
          if (item.name == this.show_column_reject[index].text) {
            this.show_column_reject.splice(index, 1);
          }
        }
      } else if (column == true) {
        for (let index = 0; index < this.headers_reject.length; index++) {
          if (item.name == this.headers_reject[index].text) {
            this.show_column_reject.splice(index, 0, this.headers_reject[index]);
          }
        }
      }

      this.list_column_reject = [];

      for (let j = 0; j < this.headers_reject.length; j++) {
        for (let g = 0; g < this.show_column_reject.length; g++) {
          if (this.headers_reject[j].text == this.show_column_reject[g].text) {
            this.list_column_reject.push(this.headers_reject[j]);
          }
        }
      }
    },
    Add_column_reject(){
      this.column_select_reject = this.list_column_reject;

      var addColumn = {
        document_no: true,
        action_date: true,
        customer_no: true,
        customer_name: true,
        confirm_date: true,
        payment_type_bank: true,
        sum_amounts: true,
        status_file: true,
        file: true,
        check_wht: true,
        status_file_wht: true,
        file_wht: true,
        check_mail_wht: true,
        request_day: true,
        remark: true,
        remark_rejected: true,
        action_by_name: true,
        action: true,
      };

      for (let index = 0; index < this.column_reject.length; index++) {
        if (this.column_reject[index].value == "action_date") {
          addColumn.action_date = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "customer_no") {
          addColumn.customer_no = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "customer_name") {
          addColumn.customer_name = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "confirm_date") {
          addColumn.confirm_date = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "payment_type_bank") {
          addColumn.payment_type_bank = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "sum_amounts") {
          addColumn.sum_amounts = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "status_file") {
          addColumn.status_file = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "file") {
          addColumn.file = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "check_wht") {
          addColumn.check_wht = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "status_file_wht") {
          addColumn.status_file_wht = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "file_wht") {
          addColumn.file_wht = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "check_mail_wht") {
          addColumn.check_mail_wht = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "request_day") {
          addColumn.request_day = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "remark") {
          addColumn.remark = this.column_reject[index].show;
        }
         if (this.column_reject[index].value == "remark_rejected") {
          addColumn.remark_rejected = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "action_by_name") {
          addColumn.action_by_name = this.column_reject[index].show;
        }
        if (this.column_reject[index].value == "action") {
          addColumn.action = this.column_reject[index].show;
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
          process.env.VUE_APP_API + "/setting/columns/statement/Pending/Reject",
          addColumn,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = false;
            this.setting_column_reject();
          }
        });

    },
    cancel_colunm_reject() {
      this.setting_column_reject();
    },
    async setting_column_reversed(){
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
      this.show_column_reversed = [];
      this.column_select_reversed = [];
      this.list_column_reversed = [];

      for (let i = 0; i < this.headers_reversed.length; i++) {
        if (this.headers_reversed[i].value == "document_no") {
          this.show_column_reversed.push(this.headers_reversed[i]);
          this.column_select_reversed.push(this.headers_reversed[i]);
          this.list_column_reversed.push(this.headers_reversed[i]);
        }
      }
      this.axios
        .get(process.env.VUE_APP_API + "/setting/columns/list/statement/Pending/Reversed", headers)
        .then((response) => {
          for (let index = 0; index < this.column_reversed.length; index++) {
            if (this.column_reversed[index].value == "action_date") {
              this.column_reversed[index].show = response.data.action_date;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "action_date" &&
                  response.data.action_date == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "customer_no") {
              this.column_reversed[index].show = response.data.customer_no;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "customer_no" &&
                  response.data.customer_no == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "customer_name") {
              this.column_reversed[index].show = response.data.customer_name;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "customer_name" &&
                  response.data.customer_name == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "confirm_date") {
              this.column_reversed[index].show = response.data.confirm_date;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "confirm_date" &&
                  response.data.confirm_date == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "payment_type_bank") {
              this.column_reversed[index].show = response.data.payment_type_bank;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "payment_type_bank" &&
                  response.data.payment_type_bank == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "sum_amounts") {
              this.column_reversed[index].show = response.data.sum_amounts;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "sum_amounts" &&
                  response.data.sum_amounts == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "status_file") {
              this.column_reversed[index].show = response.data.status_file;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "status_file" &&
                  response.data.status_file == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "file") {
              this.column_reversed[index].show = response.data.file;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "file" &&
                  response.data.file == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "check_wht") {
              this.column_reversed[index].show = response.data.check_wht;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "check_wht" &&
                  response.data.check_wht == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "status_file_wht") {
              this.column_reversed[index].show = response.data.status_file_wht;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "status_file_wht" &&
                  response.data.status_file_wht == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "file_wht") {
              this.column_reversed[index].show = response.data.file_wht;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "file_wht" &&
                  response.data.file_wht == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "check_mail_wht") {
              this.column_reversed[index].show = response.data.check_mail_wht;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "check_mail_wht" &&
                  response.data.check_mail_wht == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "request_day") {
              this.column_reversed[index].show = response.data.request_day;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "request_day" &&
                  response.data.request_day == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "remark") {
              this.column_reversed[index].show = response.data.remark;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "remark" &&
                  response.data.remark == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "remark_reversed") {
              this.column_reversed[index].show = response.data.remark_reversed;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "remark_reversed" &&
                  response.data.remark_reversed == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "status_pending") {
              this.column_reversed[index].show = response.data.status_pending;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "status_pending" &&
                  response.data.status_pending == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "action_by_name") {
              this.column_reversed[index].show = response.data.action_by_name;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "action_by_name" &&
                  response.data.action_by_name == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            if (this.column_reversed[index].value == "action") {
              this.column_reversed[index].show = response.data.action;
              for (let k = 0; k < this.headers_reversed.length; k++) {
                if (
                  this.headers_reversed[k].value == "action" &&
                  response.data.action == true
                ) {
                  this.show_column_reversed.push(this.headers_reversed[k]);
                  this.column_select_reversed.push(this.headers_reversed[k]);
                  this.list_column_reversed.push(this.headers_reversed[k]);
                }
              }
            }

            var sortt = this.headers_reversed;
            this.show_column_reversed.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.column_select_reversed.sort(function(a, b) {
              return sortt.indexOf(a) - sortt.indexOf(b);
            });
            this.list_column_reversed.sort(function(a, b) {
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
              status_file: true,
              file: true,
              check_wht: true,
              status_file_wht: true,
              file_wht: true,
              check_mail_wht: true,
              request_day: true,
              remark: true,
              remark_reversed: true,
              status_pending: true,
              action_by_name: true,
              action: true,
            };
            this.axios
              .put(
                process.env.VUE_APP_API + "/setting/columns/statement/Pending/Reversed",
                body_2,
                headers
              )
              .then((response) => {
                if (response) {
                  this.setting_column_reversed();
                }
              });
          }
        })
    },
    select_column_reversed(column, item) {
      if (column == false) {
        for (let index = 0; index < this.show_column_reversed.length; index++) {
          if (item.name == this.show_column_reversed[index].text) {
            this.show_column_reversed.splice(index, 1);
          }
        }
      } else if (column == true) {
        for (let index = 0; index < this.headers_reversed.length; index++) {
          if (item.name == this.headers_reversed[index].text) {
            this.show_column_reversed.splice(index, 0, this.headers_reversed[index]);
          }
        }
      }

      this.list_column_reversed = [];

      for (let j = 0; j < this.headers_reversed.length; j++) {
        for (let g = 0; g < this.show_column_reversed.length; g++) {
          if (this.headers_reversed[j].text == this.show_column_reversed[g].text) {
            this.list_column_reversed.push(this.headers_reversed[j]);
          }
        }
      }
    },
    Add_column_reversed(){
      this.column_select_reversed = this.list_column_reversed;

      var addColumn = {
        document_no: true,
        action_date: true,
        customer_no: true,
        customer_name: true,
        confirm_date: true,
        payment_type_bank: true,
        sum_amounts: true,
        status_file: true,
        file: true,
        check_wht: true,
        status_file_wht: true,
        file_wht: true,
        check_mail_wht: true,
        request_day: true,
        remark: true,
        remark_reversed: true,
        status_pending:true,
        action_by_name: true,
        action: true,
      };

      for (let index = 0; index < this.column_reversed.length; index++) {
        if (this.column_reversed[index].value == "action_date") {
          addColumn.action_date = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "customer_no") {
          addColumn.customer_no = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "customer_name") {
          addColumn.customer_name = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "confirm_date") {
          addColumn.confirm_date = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "payment_type_bank") {
          addColumn.payment_type_bank = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "sum_amounts") {
          addColumn.sum_amounts = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "status_file") {
          addColumn.status_file = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "file") {
          addColumn.file = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "check_wht") {
          addColumn.check_wht = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "status_file_wht") {
          addColumn.status_file_wht = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "file_wht") {
          addColumn.file_wht = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "check_mail_wht") {
          addColumn.check_mail_wht = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "request_day") {
          addColumn.request_day = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "remark") {
          addColumn.remark = this.column_reversed[index].show;
        }
         if (this.column_reversed[index].value == "remark_reversed") {
          addColumn.remark_reversed = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "status_pending") {
          addColumn.status_pending = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "action_by_name") {
          addColumn.action_by_name = this.column_reversed[index].show;
        }
        if (this.column_reversed[index].value == "action") {
          addColumn.action = this.column_reversed[index].show;
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
          process.env.VUE_APP_API + "/setting/columns/statement/Pending/Reversed",
          addColumn,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = false;
            this.setting_column_reversed();
          }
        });

    },
    cancel_colunm_reversed() {
      this.setting_column_reversed();
    },
    // ข้อมูล Reject
    async getReject() {
      // console.log('3')
      this.finish = false;
      this.datalist_reject = [];
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
            "/statement/getpending/Reject?size=" +
            this.item_per_page_table_reject +
            "&page=" +
            this.page_table_reject +
            "&search=" +
            String(this.search_reject),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_reject = response.data.data;
            this.Alldata = response.data.data;
            this.page_total_table_reject = response.data.count_page; //เดิม
            if (this.datalist_reject !== null) {
              this.customer_name_list_reject = [];
              this.user_name_list_reject = [];
              this.listfilter_data("", "customer_name",'reject');
              this.listfilter_data("", "action_by_name",'reject');
            }
          } else {
            this.finish = true;
            this.datalist_reject = []
            this.page_total_table_reject = 1;
          }
        })
        .catch((error) => {
          // console.log(error.response.status)
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
    },
    async getReversed(){
      this.finish = false;
      this.datalist_reversed = [];
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
            "/statement/getpending/Reversed?size=" +
            this.item_per_page_table_reversed +
            "&page=" +
            this.page_table_reversed +
            "&search=" +
            String(this.search_reversed),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_reversed = response.data.data;
            this.Alldata = response.data.data;
            this.page_total_table_reversed = response.data.count_page; //เดิม
            if (this.datalist_reversed !== null) {
              this.customer_name_list_reversed = [];
              this.user_name_list_reversed = [];
              this.listfilter_data("", "customer_name",'reversed');
              this.listfilter_data("", "action_by_name",'reversed');
            }
          } else {
            this.finish = true;
            this.datalist_reversed = []
            this.page_total_table_reversed = 1;
          }
        })
        .catch((error) => {
          // console.log(error.response.status)
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });

    },
    async getTotal(){
      this.finish = true;
      this.datalist_total = [];
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
            "/statement/getpending/Total?size=" +
            this.item_per_page_table_total +
            "&page=" +
            this.page_table_total +
            "&search=" +
            String(this.search_total),
          headers
        )
        .then((response) => {
          if (response.status === 200 && response.data.data !== null) {
            this.finish = true;
            this.datalist_total = response.data.data;
            this.Alldata = response.data.data;
            this.page_total_table_total = response.data.count_page; //เดิม
            if (this.datalist_total !== null) {
              this.customer_name_list_total = [];
              this.user_name_list_total = [];
              this.user_pending_list = [];
              this.user_matching_list = [];
              this.listfilter_data("", "customer_name",'total');
              this.listfilter_data("", "action_by_name",'total');
              this.listfilter_data("", "user_pending",'total');
              this.listfilter_data("", "user_matching", 'total')
            }
          } else {
            this.finish = true;
            this.datalist_total = []
            this.page_total_table_total = 1;
          }
        })
        .catch((error) => {
          // console.log(error.response.status)
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });

    },
    // filter table
    actionChange(date, name,status) {
      if (name == "action_date") {
        if(status == 'saved'){
          this.action_date_saved[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.action_date_saved[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }else if(status == 'reject'){
          this.action_date_reject[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.action_date_reject[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }else if(status == 'reversed'){
          this.action_date_reversed[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.action_date_reversed[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }else{
          this.action_date_total[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.action_date_total[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }

      } else if (name == "confirm_date") {
        if(status == 'saved') {
          this.confirm_date_saved[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.confirm_date_saved[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        } else if(status == 'reject') {
          this.confirm_date_reject[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.confirm_date_reject[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }else if(status == 'reversed'){
          this.confirm_date_reversed[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.confirm_date_reversed[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }else{
          this.confirm_date_total[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.confirm_date_total[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }
      } else if (name == "email_date") {
        if(status == 'total'){
          this.email_date_total[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.email_date_total[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }
      } else if (name == "matching_submit_date") {
        if(status == 'total'){
          this.matching_submit_date_total[0] = date.startDate
            .split("/")
            .reverse()
            .join("-");
          this.matching_submit_date_total[1] = date.endDate
            .split("/")
            .reverse()
            .join("-");
        }
      }
    },
    blankModal(name,status) {
      if (name == "action_date") {
        if(status == 'saved'){
          this.$refs["my-modal_action_date_saved"].hide();
          this.action_date_saved = ["0000-00-00"];
          this.text_action_date_saved = "[blank]";
          this.filter(this.action_date_saved, name,status);
          this.saved_action_date_range.startDate = null;
          this.saved_action_date_range.endDate = null;
        }else if(status == 'reject'){
          this.$refs["my-modal_action_date_reject"].hide();
          this.action_date_reject = ["0000-00-00"];
          this.text_action_date_reject = "[blank]";
          this.filter(this.action_date_reject, name,status);
          this.reject_action_date_range.startDate = null;
          this.reject_action_date_range.endDate = null;
        }else if(status == 'reversed'){
          this.$refs["my-modal_action_date_reversed"].hide();
          this.action_date_reversed = ["0000-00-00"];
          this.text_action_date_reversed = "[blank]";
          this.filter(this.action_date_reversed, name,status);
          this.reversed_action_date_range.startDate = null;
          this.reversed_action_date_range.endDate = null;
        }else{
          this.$refs["my-modal_action_date_total"].hide();
          this.action_date_total = ["0000-00-00"];
          this.text_action_date_total = "[blank]";
          this.filter(this.action_date_total, name,status);
          this.total_action_date_range.startDate = null;
          this.total_action_date_range.endDate = null;
        }
      }
     
      if (name == "confirm_date") {
        if(status == 'saved'){
          this.$refs["my-modal_confirm_date_saved"].hide();
          this.confirm_date_saved = ["0000-00-00"];
          this.text_confirm_date_saved = "[blank]";
          this.filter(this.confirm_date_saved, name,status);
          this.confirm_date_range_saved.startDate = null;
          this.confirm_date_range_saved.endDate = null;
        }else if(status == 'reject'){
          this.$refs["my-modal_confirm_date_reject"].hide();
          this.confirm_date_reject = ["0000-00-00"];
          this.text_confirm_date_reject = "[blank]";
          this.filter(this.confirm_date_reject, name,status);
          this.confirm_date_range_reject.startDate = null;
          this.confirm_date_range_reject.endDate = null;
        }else if(status == 'reversed'){
          this.$refs["my-modal_confirm_date_reversed"].hide();
          this.confirm_date_reversed = ["0000-00-00"];
          this.text_confirm_date_reversed = "[blank]";
          this.filter(this.confirm_date_reversed, name,status);
          this.confirm_date_range_reversed.startDate = null;
          this.confirm_date_range_reversed.endDate = null;
        }else{
          this.$refs["my-modal_confirm_date_total"].hide();
          this.confirm_date_total = ["0000-00-00"];
          this.text_confirm_date_total = "[blank]";
          this.filter(this.confirm_date_total, name,status);
          this.confirm_date_range_total.startDate = null;
          this.confirm_date_range_total.endDate = null;
        }
      }

      if (name == "email_date") {
        if(status == 'total'){
          this.$refs["my-modal_email_date_total"].hide();
          this.email_date_total = ["0000-00-00"];
          this.text_email_date_total = "[blank]";
          this.filter(this.email_date_total, name,status);
          this.total_email_date_range.startDate = null;
          this.total_email_date_range.endDate = null;
        }
      }

      if (name == "matching_submit_date") {
        if(status == 'total'){
          this.$refs["my-modal_matching_submit_date_total"].hide();
          this.matching_submit_date_total = ["0000-00-00"];
          this.text_matching_submit_date_total = "[blank]";
          this.filter(this.matching_submit_date_total, name,status);
          this.matching_submit_date_range_total.startDate = null;
          this.matching_submit_date_range_total.endDate = null;
        }
      }
    },
    hideModal(name,status) {
      if (name == "action_date") {
        if(status == 'saved'){
          this.$refs["my-modal_action_date_saved"].hide();
          this.text_action_date_saved = null;
          this.saved_action_date_range.startDate = null;
          this.saved_action_date_range.endDate = null;
          this.close_dialog(name,status);
        }else if(status == 'reject'){
          this.$refs["my-modal_action_date_reject"].hide();
          this.text_action_date_reject = null;
          this.reject_action_date_range.startDate = null;
          this.reject_action_date_range.endDate = null;
          this.close_dialog(name,status);
        }else if(status == 'reversed'){
          this.$refs["my-modal_action_date_reversed"].hide();
          this.text_action_date_reversed = null;
          this.reversed_action_date_range.startDate = null;
          this.reversed_action_date_range.endDate = null;
          this.close_dialog(name,status);
        }else{
          this.$refs["my-modal_action_date_total"].hide();
          this.text_action_date_total = null;
          this.total_action_date_range.startDate = null;
          this.total_action_date_range.endDate = null;
          this.close_dialog(name,status);
        }
      // test
      } else if (name == "confirm_date") {
        if(status == 'saved'){
          this.$refs["my-modal_confirm_date_saved"].hide();
          this.text_confirm_date_saved = null;
          this.confirm_date_range_saved.startDate = null;
          this.confirm_date_range_saved.endDate = null;
          this.close_dialog(name,status);
        }else if(status == 'reject'){
          this.$refs["my-modal_confirm_date_reject"].hide();
          this.text_confirm_date_reject = null;
          this.confirm_date_range_reject.startDate = null;
          this.confirm_date_range_reject.endDate = null;
          this.close_dialog(name,status);
        }else if(status == 'reversed'){
          this.$refs["my-modal_confirm_date_reversed"].hide();
          this.text_confirm_date_reversed = null;
          this.confirm_date_range_reversed.startDate = null;
          this.confirm_date_range_reversed.endDate = null;
          this.close_dialog(name,status);
        }else{
          this.$refs["my-modal_confirm_date_total"].hide();
          this.text_confirm_date_total = null;
          this.confirm_date_range_total.startDate = null;
          this.confirm_date_range_total.endDate = null;
          this.close_dialog(name,status);
        }
      } else if (name == "email_date") {
        if(status == 'total'){
          this.$refs["my-modal_email_date_total"].hide();
          this.text_email_date_total = null;
          this.total_email_date_range.startDate = null;
          this.total_email_date_range.endDate = null;
          this.close_dialog(name,status);
        }
      } else if (name == "matching_submit_date") {
        if(status == 'total'){
          this.$refs["my-modal_matching_submit_date_total"].hide();
          this.text_matching_submit_date_total = null;
          this.matching_submit_date_range_total.startDate = null;
          this.matching_submit_date_range_total.endDate = null;
          this.close_dialog(name,status);
        }
      }
    },
    OkFilterModal(name,status) {
      if (name == "action_date") {
        if(status == 'saved'){
          if (
            this.action_date_saved[0] == "" ||
            (this.action_date_saved[0] == null && this.action_date_saved[1] == "") ||
            this.action_date_saved[1] == null
          ) {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_action_date_saved"].hide();
            this.text_action_date_saved =
              this.action_date_saved[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.action_date_saved[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.action_date_saved, name,status);
          }
        } else if(status == 'reject'){
           if (
              this.action_date_reject[0] == "" ||
              (this.action_date_reject[0] == null && this.action_date_reject[1] == "") ||
              this.action_date_reject[1] == null
            ) {
              alert("กรุณาเลือกช่วงวันที่ให้ครบ");
            } else {
              this.$refs["my-modal_action_date_reject"].hide();
              this.text_action_date_reject =
                this.action_date_reject[0]
                  .split("-")
                  .reverse()
                  .join("/") +
                " - " +
                this.action_date_reject[1]
                  .split("-")
                  .reverse()
                  .join("/");
              this.filter(this.action_date_reject, name,status);
            }
        }else if(status == 'reversed'){
          if (
              this.action_date_reversed[0] == "" ||
              (this.action_date_reversed[0] == null && this.action_date_reversed[1] == "") ||
              this.action_date_reversed[1] == null
            ) {
              alert("กรุณาเลือกช่วงวันที่ให้ครบ");
            } else {
              this.$refs["my-modal_action_date_reversed"].hide();
              this.text_action_date_reversed =
                this.action_date_reversed[0]
                  .split("-")
                  .reverse()
                  .join("/") +
                " - " +
                this.action_date_reversed[1]
                  .split("-")
                  .reverse()
                  .join("/");
              this.filter(this.action_date_reversed, name,status);
            }
        }else{
          if (
              this.action_date_total[0] == "" ||
              (this.action_date_total[0] == null && this.action_date_total[1] == "") ||
              this.action_date_total[1] == null
            ) {
              alert("กรุณาเลือกช่วงวันที่ให้ครบ");
            } else {
              this.$refs["my-modal_action_date_total"].hide();
              this.text_action_date_total =
                this.action_date_total[0]
                  .split("-")
                  .reverse()
                  .join("/") +
                " - " +
                this.action_date_total[1]
                  .split("-")
                  .reverse()
                  .join("/");
              this.filter(this.action_date_total, name,status);
            }
        }
      }
      //test
      if (name == "confirm_date") {
        if(status == 'saved'){
          if (
          this.confirm_date_saved[0] == "" ||
          (this.confirm_date_saved[0] == null && this.confirm_date_saved[1] == "") ||
          this.confirm_date_saved[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal_confirm_date_saved"].hide();
          this.text_confirm_date_saved =
            this.confirm_date_saved[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.confirm_date_saved[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.confirm_date_saved, name,status);
        }
        } else if(status == 'reject') {
          if (this.confirm_date_reject[0] == "" ||
              (this.confirm_date_reject[0] == null && this.confirm_date_reject[1] == "") ||
              this.confirm_date_reject[1] == null)
          {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_confirm_date_reject"].hide();
            this.text_confirm_date_reject =
              this.confirm_date_reject[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.confirm_date_reject[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.confirm_date_reject, name,status);
          }
        }else if(status == 'reversed'){
          if (this.confirm_date_reversed[0] == "" ||
              (this.confirm_date_reversed[0] == null && this.confirm_date_reversed[1] == "") ||
              this.confirm_date_reversed[1] == null)
          {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_confirm_date_reversed"].hide();
            this.text_confirm_date_reversed =
              this.confirm_date_reversed[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.confirm_date_reversed[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.confirm_date_reversed, name,status);
          }
        }else{
          if (this.confirm_date_total[0] == "" ||
              (this.confirm_date_total[0] == null && this.confirm_date_total[1] == "") ||
              this.confirm_date_total[1] == null)
          {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_confirm_date_total"].hide();
            this.text_confirm_date_total =
              this.confirm_date_total[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.confirm_date_total[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.confirm_date_total, name,status);
          }
        }
      }

      if (name == "email_date") {
        if(status == 'total'){
          if (
              this.email_date_total[0] == "" ||
              (this.email_date_total[0] == null && this.email_date_total[1] == "") ||
              this.email_date_total[1] == null
            ) {
              alert("กรุณาเลือกช่วงวันที่ให้ครบ");
            } else {
              this.$refs["my-modal_email_date_total"].hide();
              this.text_email_date_total =
                this.email_date_total[0]
                  .split("-")
                  .reverse()
                  .join("/") +
                " - " +
                this.email_date_total[1]
                  .split("-")
                  .reverse()
                  .join("/");
              this.filter(this.email_date_total, name,status);
            }
        }
      }
      if (name == "matching_submit_date") {
        if(status == 'total'){
          if (this.matching_submit_date_total[0] == "" ||
              (this.matching_submit_date_total[0] == null && this.matching_submit_date_total[1] == "") ||
              this.matching_submit_date_total[1] == null)
          {
            alert("กรุณาเลือกช่วงวันที่ให้ครบ");
          } else {
            this.$refs["my-modal_matching_submit_date_total"].hide();
            this.text_matching_submit_date_total =
              this.matching_submit_date_total[0]
                .split("-")
                .reverse()
                .join("/") +
              " - " +
              this.matching_submit_date_total[1]
                .split("-")
                .reverse()
                .join("/");
            this.filter(this.matching_submit_date_total, name,status);
          }
        }
      }
    },
    close_dialog(name,status) {
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
      if(status == 'saved'){
        let body_saved = {
        page: Number(this.page_table_saved),
        size: Number(this.item_per_page_table_saved),
        status: "Pending",
        type: "Saved",
        search_text: this.filterlist,
        };
        this.axios
          .post(process.env.VUE_APP_API + "/statement/filter", body_saved, headers_filter)
          .then((response) => {
            this.finish = false;
            if (response.status === 200) {
              this.finish = true;
              this.datalist_saved = response.data.data;
              if (this.datalist_saved == undefined || this.datalist_saved == null) {
                this.finish = true;
                this.datalist_saved = [];
                this.page_total_table_saved = 1;
              } else {
                this.finish = true;
                this.datalist_saved.forEach((element) => {
                  element.confirm_date = moment(element.statement[0].confirm_date).format("YYYY-MM-DD");
                  element.payment_type_bank = element.statement[0].payment_type_bank
                });
                this.page_total_table_saved = response.data.count_page;
              }
            } else {
              this.finish = true;
              this.datalist_saved = [];
            }
            if (this.filterlist.length == 0) {
              this.setting_column_saved();
              this.getSaved();
            }
        });
      }else if(status == 'reject'){
        let body_reject = {
        page: Number(this.page_table_reject),
        size: Number(this.item_per_page_table_reject),
        status: "Pending",
        type: "Reject",
        search_text: this.filterlist,
        };
        this.axios
          .post(process.env.VUE_APP_API + "/statement/filter", body_reject, headers_filter)
          .then((response) => {
            this.finish = false;
            if (response.status === 200) {
              this.finish = true;
              this.datalist_reject = response.data.data;
              if (this.datalist_reject == undefined || this.datalist_reject == null) {
                this.finish = true;
                this.datalist_reject = [];
                this.page_total_table_reject = 1;
              } else {
                this.finish = true;
                this.datalist_reject.forEach((element) => {
                  element.confirm_date = moment(element.statement[0].confirm_date).format("YYYY-MM-DD");
                  element.payment_type_bank = element.statement[0].payment_type_bank
                });
                this.page_total_table_reject = response.data.count_page;
              }
            } else {
              this.finish = true;
              this.datalist_reject = [];
            }
            if (this.filterlist.length == 0) {
              this.setting_column_reject();
              this.getReject();
            }
          });
      }else if(status == 'reversed'){
        let body_reversed = {
        page: Number(this.page_table_reversed),
        size: Number(this.item_per_page_table_reversed),
        status: "Pending",
        type: "Reversed",
        search_text: this.filterlist,
        };
        this.axios
          .post(process.env.VUE_APP_API + "/statement/filter", body_reversed, headers_filter)
          .then((response) => {
            this.finish = false;
            if (response.status === 200) {
              this.finish = true;
              this.datalist_reversed = response.data.data;
              if (this.datalist_reversed == undefined || this.datalist_reversed == null) {
                this.finish = true;
                this.datalist_reversed = [];
                this.page_total_table_reversed = 1;
              } else {
                this.finish = true;
                this.datalist_reversed.forEach((element) => {
                  element.confirm_date = moment(element.statement[0].confirm_date).format("YYYY-MM-DD");
                  element.payment_type_bank = element.statement[0].payment_type_bank
                });
                this.page_total_table_reversed = response.data.count_page;
              }
            } else {
              this.finish = true;
              this.datalist_reversed = [];
            }
            if (this.filterlist.length == 0) {
              this.setting_column_reversed();
              this.getReversed();
            }
          });
      }else{
        let body_total = {
        page: Number(this.page_table_total),
        size: Number(this.item_per_page_table_total),
        status: "Pending",
        type: "Reversed",
        search_text: this.filterlist,
        };
        this.axios
          .post(process.env.VUE_APP_API + "/statement/filter", body_total, headers_filter)
          .then((response) => {
            this.finish = false;
            if (response.status === 200) {
              this.finish = true;
              this.datalist_total = response.data.data;
              if (this.datalist_total == undefined || this.datalist_total == null) {
                this.finish = true;
                this.datalist_total = [];
                this.page_total_table_total = 1;
              } else {
                this.finish = true;
                this.datalist_total.forEach((element) => {
                  element.confirm_date = moment(element.statement[0].confirm_date).format("YYYY-MM-DD");
                  element.payment_type_bank = element.statement[0].payment_type_bank
                });
                this.page_total_table_total = response.data.count_page;
              }
            } else {
              this.finish = true;
              this.datalist_total = [];
            }
            if (this.filterlist.length == 0) {
              this.setting_column_total();
              this.getTotal();
            }
          });
      }
    },
    blank_checkbox(name,status) {
      if (name == "document_no") {
        if(status == 'saved'){
          if (this.document_no_blank_saved == true) {
            this.document_no_saved = "[blank]";
            this.filter("blank_string", "document_no",'saved');
          } else {
            this.document_no_saved = "";
            this.filter("", "document_no",'saved');
          }
        }else if(status == 'reject'){
          if (this.document_no_blank_reject == true) {
            this.document_no_reject = "[blank]";
            this.filter("blank_string", "document_no",'reject');
          } else {
            this.document_no_reject = "";
            this.filter("", "document_no",'reject');
          }
        }else if(status == 'reversed'){
          if (this.document_no_blank_reversed == true) {
            this.document_no_reversed = "[blank]";
            this.filter("blank_string", "document_no",'reversed');
          } else {
            this.document_no_reversed = "";
            this.filter("", "document_no",'reversed');
          }
        }else{
          if (this.document_no_blank_total == true) {
            this.document_no_total = "[blank]";
            this.filter("blank_string", "document_no",'total');
          } else {
            this.document_no_total = "";
            this.filter("", "document_no",'total');
          }
        }
      }
      if (name == "customer_no") {
        if(status == 'saved'){
          if (this.customer_no_blank_saved == true) {
            this.customer_no_saved = "[blank]";
            this.filter("blank_string", "customer_no",'saved');
          } else {
            this.customer_no_saved = "";
            this.filter("", "customer_no",'saved');
          }
        }else if(status == 'reject'){
          if (this.customer_no_blank_reject == true) {
            this.customer_no_reject = "[blank]";
            this.filter("blank_string", "customer_no",'reject');
          } else {
            this.customer_no_reject = "";
            this.filter("", "customer_no",'reject');
          }
        }else if(status == 'reversed'){
          if (this.customer_no_blank_reversed == true) {
            this.customer_no_reversed = "[blank]";
            this.filter("blank_string", "customer_no",'reversed');
          } else {
            this.customer_no_reversed = "";
            this.filter("", "customer_no",'reversed');
          }
        }else{
          if (this.customer_no_blank_total == true) {
            this.customer_no_total = "[blank]";
            this.filter("blank_string", "customer_no",'total');
          } else {
            this.customer_no_total = "";
            this.filter("", "customer_no",'total');
          }
        }
      }

      if (name == "request_day") {
        if(status == 'saved'){
          if (this.request_day_blank_saved == true) {
            this.request_day_saved = "[blank]";
            this.filter("blank_string", "request_day",'saved');
          } else {
            this.request_day_saved = "";
            this.filter("", "request_day",'saved');
          }
        }else if(status == 'reject'){
          if (this.request_day_blank_reject == true) {
            this.request_day_reject = "[blank]";
            this.filter("blank_string", "request_day",'reject');
          } else {
            this.request_day_reject = "";
            this.filter("", "request_day",'reject');
          }
        }else if(status == 'reversed'){
          if (this.request_day_blank_reversed == true) {
            this.request_day_reversed = "[blank]";
            this.filter("blank_string", "request_day",'reversed');
          } else {
            this.request_day_reversed = "";
            this.filter("", "request_day",'reversed');
          }
        }else{
          if (this.request_day_blank_total == true) {
            this.request_day_total = "[blank]";
            this.filter("blank_string", "request_day",'total');
          } else {
            this.request_day_total = "";
            this.filter("", "request_day",'total');
          }
        }
      }

      if (name == "remark") {
        if(status == 'saved'){
          if (this.remark_blank_saved == true) {
            this.remark_saved = "[blank]";
            this.filter("blank_string", "remark","saved");
          } else {
            this.remark_saved = "";
            this.filter("", "remark","saved");
          }
        }else if(status == 'reject'){
          if (this.remark_blank_reject == true) {
            this.remark_reject = "[blank]";
            this.filter("blank_string", "remark","reject");
          } else {
            this.remark_reject = "";
            this.filter("", "remark","reject");
          }
        }else if(status == 'reversed'){
          if (this.remark_blank_reversed == true) {
            this.remark_reverse = "[blank]";
            this.filter("blank_string", "remark","reversed");
          } else {
            this.remark_reverse = "";
            this.filter("", "remark","reversed");
          }
        }else{
          if (this.remark_blank_total == true) {
            this.remark_total = "[blank]";
            this.filter("blank_string", "remark","total");
          } else {
            this.remark_total = "";
            this.filter("", "remark","total");
          }
        }
      }
      if(name == "remark_rejected"){
        if(status == 'reject'){
          if (this.remark_blank_rejected == true) {
            this.remark_rejected = "[blank]";
            this.filter("blank_string", "remark_rejected","reject");
          } else {
            this.remark_rejected = "";
            this.filter("", "remark_rejected","reject");
          }
        }
      }
      if(name == "remark_reversed"){
        if(status == 'reversed'){
          if (this.remark_blank_reverseds == true) {
            this.remark_reversed = "[blank]";
            this.filter("blank_string", "remark_reversed","reversed");
          } else {
            this.remark_reversed = "";
            this.filter("", "remark_reversed","reversed");
          }
        }
      }
    },
    filter(filter,key,status) {
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
      // console.log(this.filterlist.length)
      if (this.filterlist.length == 1) {
        // console.log(this.filterlist[0].value)
        if (
          this.filterlist[0].value == "" ||
          this.filterlist[0].value == undefined ||
          this.filterlist[0].value == null
          // this.filterlist[0].value == 0
        )
          this.filterlist.splice(0, 1);
          // console.log(this.filterlist)
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
      if(status == 'saved'){
        let body_saved = {
        page: Number(this.page_table_saved),
        size: Number(this.item_per_page_table_saved),
        status: "Pending",
        type: "Saved",
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/statement/filter", body_saved, headers_filter)
        .then((response) => {
          this.finish = false;
          if (response.status === 200) {
            this.finish = true;
            this.datalist_saved = response.data.data;
            if (this.datalist_saved == undefined || this.datalist_saved == null) {
              this.finish = true;
              this.datalist_saved = [];
              this.page_total_table_saved = 1;
            } else {
              this.finish = true;
              this.datalist_saved.forEach((element) => {
                element.confirm_date = moment(element.statement[0].confirm_date).format("YYYY-MM-DD");
                element.payment_type_bank = element.statement[0].payment_type_bank
              });

              this.page_total_table_saved = response.data.count_page; 
              if (this.datalist_saved !== null) {
                this.datalist_saved.forEach(() => {
                  //this.customer_name_list_saved = [];
                  //this.user_name_list_saved = [];
                  //this.listfilter_data("", "customer_name",'saved');
                  //this.listfilter_data("", "action_by_name",'saved');
                });
              }
            }
          } else {
            this.finish = true;
            this.datalist_saved = [];
          }
          if (this.filterlist.length == 0) {
            this.getSaved();
          }
        });
      }else if(status == 'reject'){
      let body_reject = {
        page: Number(this.page_table_reject),
        size: Number(this.item_per_page_table_reject),
        status: "Pending",
        type:"Reject",
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/statement/filter", body_reject, headers_filter)
        .then((response) => {
          this.finish = false;
          if (response.status === 200) {
            this.finish = true;
            this.datalist_reject = response.data.data;
            if (this.datalist_reject == undefined || this.datalist_reject == null) {
              this.finish = true;
              this.datalist_reject = [];
              this.page_total_table_reject = 1;
            } else {
              this.finish = true;
              this.datalist_reject.forEach((element) => {
                element.confirm_date = moment(element.statement[0].confirm_date).format("YYYY-MM-DD");
                element.payment_type_bank = element.statement[0].payment_type_bank
              });
              this.page_total_table_reject = response.data.count_page; 
              if (this.datalist_reject !== null) {
                this.datalist_reject.forEach(() => {
                  //this.customer_name_list_reject = [];
                  //this.user_name_list_reject = [];
                  //this.listfilter_data("", "customer_name",'reject');
                  //this.listfilter_data("", "action_by_name",'reject');
                });
              }
            }
          } else {
            this.finish = true;
            this.datalist_reject = [];
          }
          if (this.filterlist.length == 0) {
            this.getReject();
          }
        });
      }else if(status == 'reversed'){
        let body_reversed = {
        page: Number(this.page_table_reversed),
        size: Number(this.item_per_page_table_reversed),
        status: "Pending",
        type:"Reversed",
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/statement/filter", body_reversed, headers_filter)
        .then((response) => {
          this.finish = false;
          if (response.status === 200) {
            this.finish = true;
            this.datalist_reversed = response.data.data;
            if (this.datalist_reversed == undefined || this.datalist_reversed == null) {
              this.finish = true;
              this.datalist_reversed = [];
              this.page_total_table_reversed = 1;
            } else {
              this.finish = true;
              this.datalist_reversed.forEach((element) => {
                element.confirm_date = moment(element.statement[0].confirm_date).format("YYYY-MM-DD");
                element.payment_type_bank = element.statement[0].payment_type_bank
              });
              this.page_total_table_reversed = response.data.count_page; 
              if (this.datalist_reversed !== null) {
                this.datalist_reversed.forEach(() => {
                  //this.customer_name_list_reversed = [];
                  //this.user_name_list_reversed = [];
                  //this.listfilter_data("", "customer_name",'reversed');
                  //this.listfilter_data("", "action_by_name",'reversed');
                });
              }
            }
          } else {
            this.finish = true;
            this.datalist_reversed = [];
          }
          if (this.filterlist.length == 0) {
            this.getReversed();
          }
        });
      }else{
        let body_total = {
        page: Number(this.page_table_total),
        size: Number(this.item_per_page_table_total),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/statement/filter_total", body_total, headers_filter)
        .then((response) => {
          this.finish = false;
          if (response.status === 200) {
            this.finish = true;
            this.datalist_total = response.data.data;
            if (this.datalist_total == undefined || this.datalist_total == null) {
              this.finish = true;
              this.datalist_total = [];
              this.page_total_table_total = 1;
            } else {
              this.finish = true;
              this.datalist_total.forEach((element) => {
                element.confirm_date = moment(element.statement[0].confirm_date).format("YYYY-MM-DD");
                element.payment_type_bank = element.statement[0].payment_type_bank
              });
              this.page_total_table_total = response.data.count_page; 
              if (this.datalist_total !== null) {
                this.datalist_total.forEach(() => {
                  //this.customer_name_list_reversed = [];
                  //this.user_name_list_reversed = [];
                  //this.listfilter_data("", "customer_name",'reversed');
                  //this.listfilter_data("", "action_by_name",'reversed');
                });
              }
            }
          } else {
            this.finish = true;
            this.datalist_total = [];
          }
          if (this.filterlist.length == 0) {
            this.getTotal();
          }
        });
      }
    },
    listfilter_data(data, name,status) {
      // ----------------------เป็นการเก็บข้อมูล filter เพื่อส่งให้้ filter ที่เป็นการ checkbox--------------------------//
      //------------------------ส่วนใหญ่จะเป็น autocomplete ------------------------------//
      if (this.Alldata !== null) {
        if (name == "customer_name") {
          var customer_name = [];
          if(status == 'saved'){
            //let customer_name = [];
            if (customer_name.includes(["blank"]) == false) {
                customer_name.push("[blank]");
            }
            this.Alldata.forEach((element) => {
              if (element.customer_name !== "" || element.customer_name !== undefined) {
                customer_name.push(element.customer_name);
              }
            });
            this.customer_name_list_saved = customer_name;
            //return customer_name;
          }else if(status == 'reject'){
            //let customer_name = [];
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
            this.customer_name_list_reject = customer_name;
            //return customer_name;
          }else if(status == 'reversed'){
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
            this.customer_name_list_reversed = customer_name;
          }else{
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
            this.customer_name_list_total = customer_name;
          }
          return customer_name;
        }
        if (name == "action_by_name") {
          if(status == 'saved'){
            let user_name = [];
            for (let index = 0; index < this.Alldata.length; index++) {
              if (
                this.Alldata[index].action_by_name !== "" &&
                this.Alldata[index].action_by_name !== undefined &&
                user_name.includes(this.Alldata[index].action_by_name) == false
              ) {
                user_name.push(this.Alldata[index].action_by_name);
              } else if (
                this.Alldata[index].action_by_name == "" &&
                user_name.includes(this.Alldata[index].action_by_name) == false
              ) {
                user_name.push("[blank]");
              }
            }
            this.user_name_list_saved = user_name.sort();
            return user_name.sort();
          }else if(status == 'reject'){
            var user_name = [];
            for (let index = 0; index < this.Alldata.length; index++) {
              if (
                this.Alldata[index].action_by_name !== "" &&
                this.Alldata[index].action_by_name !== undefined &&
                user_name.includes(this.Alldata[index].action_by_name) == false
              ) {
                user_name.push(this.Alldata[index].action_by_name);
              } else if (
                this.Alldata[index].action_by_name == "" &&
                user_name.includes(this.Alldata[index].action_by_name) == false
              ) {
                user_name.push("[blank]");
              }
            }
            this.user_name_list_reject = user_name.sort();
            return user_name.sort();
          }else if(status == 'reversed'){
            let user_name = [];
            for (let index = 0; index < this.Alldata.length; index++) {
              if (
                this.Alldata[index].action_by_name !== "" &&
                this.Alldata[index].action_by_name !== undefined &&
                user_name.includes(this.Alldata[index].action_by_name) == false
              ) {
                user_name.push(this.Alldata[index].action_by_name);
              } else if (
                this.Alldata[index].action_by_name == "" &&
                user_name.includes(this.Alldata[index].action_by_name) == false
              ) {
                user_name.push("[blank]");
              }
            }
            this.user_name_list_reversed = user_name.sort();
            return user_name.sort();
          }else{
            let user_name = [];
            for (let index = 0; index < this.Alldata.length; index++) {
              if (
                this.Alldata[index].action_by_name !== "" &&
                this.Alldata[index].action_by_name !== undefined &&
                user_name.includes(this.Alldata[index].action_by_name) == false
              ) {
                user_name.push(this.Alldata[index].action_by_name);
              } else if (
                this.Alldata[index].action_by_name == "" &&
                user_name.includes(this.Alldata[index].action_by_name) == false
              ) {
                user_name.push("[blank]");
              }
            }
            this.user_name_list_total = user_name.sort();
            return user_name.sort();
          }
        }
        if (name == "user_pending") {
          if(status == 'total'){
            let user_name = [];
            for (let index = 0; index < this.Alldata.length; index++) {
              if (
                this.Alldata[index].user_pending !== "" &&
                this.Alldata[index].user_pending !== undefined &&
                user_name.includes(this.Alldata[index].user_pending) == false
              ) {
                user_name.push(this.Alldata[index].user_pending);
              } else if (
                this.Alldata[index].user_pending == "" &&
                user_name.includes(this.Alldata[index].user_pending) == false
              ) {
                user_name.push("[blank]");
              }
            }
            this.user_pending_list = user_name.sort();
            return user_name.sort();
          }
        }
        if (name == "user_matching") {
          if(status == 'total'){
            let user_name = [];
            for (let index = 0; index < this.Alldata.length; index++) {
              if (
                this.Alldata[index].user_matching !== "" &&
                this.Alldata[index].user_matching !== undefined &&
                user_name.includes(this.Alldata[index].user_matching) == false
              ) {
                user_name.push(this.Alldata[index].user_matching);
              } else if (
                this.Alldata[index].user_matching == "" &&
                user_name.includes(this.Alldata[index].user_matching) == false
              ) {
                user_name.push("[blank]");
              }
            }
            this.user_matching_list = user_name.sort();
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
    //     page: Number(this.page_table_mail),
    //     size: Number(this.item_per_page_table_mail),
    //     status: "Pending",
    //     search_text: this.filterlist,
    //   };
    //   this.axios
    //     .post(process.env.VUE_APP_API + "/statement/filter", body, headers_filter)
    //     .then((response) => {
    //       if (response.status === 200) {
    //         this.finish = true;
    //         this.datalist_mail = response.data.data;
    //         this.Alldata = response.data.data;
    //         if (this.datalist_mail == undefined || this.datalist_mail == null) {
    //           this.finish = true;
    //           this.datalist_mail = [];
    //           this.page_total_table_mail = 1;
    //         } else {
    //           this.finish = true;
    //           this.page_total_table_mail = response.data.count_page;
    //           if (this.datalist_mail !== null) {
    //             this.datalist_mail.forEach(() => {
    //               this.listfilter_data("", "customer_name",'');
    //               this.listfilter_data("", "document_no",'');
    //               this.listfilter_data("", "action_by_name",'');
    //             });
    //             this.finish = true;
    //             // console.log(response);
    //           }
    //         }
    //       } else {
    //         this.finish = true;
    //         this.datalist_mail = [];
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
    //     page: Number(this.page_table_mail),
    //     size: Number(this.item_per_page_table_mail),
    //     status: "Pending",
    //     search_text: this.filterlist,
    //   };
    //   this.axios
    //     .post(process.env.VUE_APP_API + "/statement/filter", body, headers_filter)
    //     .then((response) => {
    //       if (response.status === 200) {
    //         this.finish = true;
    //         this.datalist_mail = response.data.data;
    //         this.Alldata = response.data.data;
    //         if (this.datalist_mail == undefined || this.datalist_mail == null) {
    //           this.finish = true;
    //           this.datalist_mail = [];
    //         } else {
    //           this.finish = true;
    //           this.page_total_table_mail = 1 //ใหม่
    //           // this.page_total_table_mail = response.data.count_page; //เดิม
    //         }
    //       } else {
    //         this.finish = true;
    //         this.datalist_mail = [];
    //       }
    //       if (this.filterlist.length == 0) {
    //         this.finish = true;
    //         this.getData_afterClearAll();
    //       }
    //     });
    // },
    
    //file && WHT
    validateselect(type) {
      if (type != 1) {
        this.files_wht = [];
      } 
    },
    check_payment_type(type){
      if(type == "CHQ"){
        this.evidence_reporting = "CHQ";
      }else if(type == "Transfer"){
        this.evidence_reporting = "Mail";
      }else{
        this.evidence_reporting = "";
      }
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

    //  end
    // add
    add_matching() {
      this.matching_dialog = true;
    },
    cancelAdd(){
      this.matching_dialog = false;
      this.payment_type_add = "";
      this.WHT_list="";
      this.evidence_reporting = "";
      this.mail_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.payment_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
      this.remark_add = "";
      this.customer_search = {
          customer_no: "",
          customer_name: "",
        };
      this.sale_email = "";
      this.rulesCus = [];
      this.set_file = [];
      this.set_file_wht = [];
      this.files = [];
      this.files_wht = [];
    },
    async confirmAdd() {
      if(this.payment_type_add  == "Transfer"){
        var data = [{
          action_by: "",
          aging_cash: "",
          amount_before_vat: 0,
          asking_payment: "",
          asking_payment_date: "",
          base_adjust: "",
          billing_checking: "",
          billing_remark: "",
          billing_status: "",
          billing_status_remark: "",
          billing_type_detail: "",
          customer_no: this.customer_search.customer_no,    
          customer_name: this.customer_search.customer_name,
          customer_email: this.customer_search.email,
          cut_debt: "",
          date_bill: "0001-01-01",
          confirm_date: "0001-01-01",
          sale_email: this.sale_email,
          finance_name: this.customer_search.financial_name,
          type: this.payment_type_add,
          evidence_reporting: this.evidence_reporting,
          //mail_date: new Date(this.mail_date).toJSON(),
          incoming_paid_date: this.payment_date,
          remark: this.remark_add,
          invoice_no: "",
          receipt_number: "",
          amount_after_vat: 0,
          temp_id: new Date().getTime(),
          aging: 0,
          cn_number: "",
          receipt_date: "",
          invoice_date: "",
          checkbox_wht: false,
          checkbox_mail: false,
          online_payment: "",
          payment_type: "",
          rv_number: "",
          user_name: "",
          WHT_list: this.WHT_list,
          files: this.files,
          files_wht: this.files_wht,
        }]
        eventBus.$emit('addMatchingDialog',data , this.payment_type_add)
        this.payment_matching_type = this.payment_type_add
        this.matching_dialog = false;
        this.payment_type_add = "";
        this.WHT_list="";
        this.evidence_reporting = "";
        this.mail_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
        this.payment_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
        this.remark_add = "";
        this.customer_search = {
            customer_no: "",
            customer_name: "",
          };
        this.sale_email = "";
        this.rulesCus = [];
        this.set_file = [];
        this.set_file_wht = [];
        this.files = [];
        this.files_wht = [];
      }else{
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
          file: this.data_file,
          file_wht: this.data_file_wht,
          confirm_date: new Date(this.payment_date).toJSON(),
          email_date: new Date(this.mail_date).toJSON(),
          type_wht: this.WHT_list,
          remark: this.remark_add,
          customer_no: this.customer_search.customer_no,    
          customer_name: this.customer_search.customer_name,
          type: this.payment_type_add,
          evidence_reporting: this.evidence_reporting,
          status: "Success"
        }

        await this.axios
            .post(process.env.VUE_APP_API + "/statement/add_statement/chq/total", Datas, headers)
            .then((response) => {
              if(response.status == 200){
              this.finish = true;
              Swal.fire({
                icon: "success",
                title: "บันทึกข้อมูลเรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 2000,
              });
              this.matching_dialog = false;
              }
            })
            .catch((error) => {
              if(error){
                this.finish = true;
                Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถบันทึกข้อมูลได้",
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.matching_dialog = false;
              }
            });

        //console.log(Datas)

        this.payment_type_add = "";
        this.WHT_list="";
        this.evidence_reporting = "";
        this.mail_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
        this.payment_date = moment(new Date().toJSON()).format("YYYY-MM-DD");
        this.remark_add = "";
        this.customer_search = {
            customer_no: "",
            customer_name: "",
          };
        this.sale_email = "";
        this.rulesCus = [];
        this.set_file = [];
        this.set_file_wht = [];
        this.files = [];
        this.files_wht = [];
        this.data_file = [];
        this.data_file_wht = [];

        this.finish = false;
        this.getAll();
      }
      
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
              this.sale_email = response.data.data[0].sale_email
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
    save_mail_dialog() {
      this.getAll();
      // this.mail_dialog = false;
    },
    edit_dialog(){
      this.getAll();
      // this.mail_dialog = false;
    },
    close_mail_dialog() {
      this.mail_dialog = false;
    },
    // แก้ไขข้อมูลปุ่ม edit
    editItem(item) {
      this.finish = false;
      // console.log(item);
      // let data_edit = []
        var headers_edit = {
          headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
        this.axios
        .get(process.env.VUE_APP_API + "/statement/detail/"+item.queue_no, headers_edit)
        .then((response) => {
          //console.log(response.data.data)
          eventBus.$emit("openMatchingDialog", [response.data.data]);
          this.payment_matching_type = response.data.data.type;
          this.finish = true;
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.finish = true;
            this.$router.push("/login");
          }
        });
        // eventBus.$emit("openMatchingDialog", [item]);
        // this.payment_matching_type = item.type;
    },
    // ลบข้อมูลปุ่ม delete
    deleteItem(item) {
      //console.log(item)
      this.delete_data = {
        customer_no: item.customer_no,
        customer_name: item.customer_name,
        queue_no: item.queue_no,
        document_no: item.document_no
      };
      this.dialogDelete = true;
      // console.log(item);
    },
    // ลบข้อมูลในตาราง
    confirmDelete(queue_no) {
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      this.axios.post(process.env.VUE_APP_API + "/statement/delete",
            {
              queue_no: [queue_no],
            },
            headers
      )
      .then(() => {
          Swal.fire({
            icon: "success",
            title: "ลบข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogDelete = false;
          this.getAll();
        },
        (error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลได้",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
    },

    // open file
    open_file_dialog(item , status) {
      this.finish = false;
      //console.log(item , status);
      this.item_file = []
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      if(status == 'file'){
        this.axios
        .get(process.env.VUE_APP_API +"/statement/file/" + item , headers)
        .then((response) => {
          if(response.status === 200){
            this.item_file = response.data;
            this.file_dialog = true;
            eventBus.$emit('openFileDialog',this.item_file ,status)
            this.finish = true
            //console.log(this.item_file)
          }else{
            this.item_file = []
          }
        })
        .catch((error) => {
           if (error.response.status == 401) {
              this.finish = true;
              this.$router.push("/login");
            }
        });
      }else{
        this.axios
        .get(process.env.VUE_APP_API +"/statement/filewht/" + item, headers)
        .then((response) => {
          if(response.status == 200){
            this.finish = true
            this.item_file = response.data;
            this.file_dialog = true;
            eventBus.$emit('openFileDialog',this.item_file , status)
            //console.log(this.item_file)
          }else{
            this.item_file = []
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
      this.item_file = []
      this.file_dialog = false;
    },
    // end
    item_per_page_inc_table_Saved() {
      this.getSaved();
    },
    item_per_page_inc_table_reject() {
      this.getReject();
    },
    item_per_page_inc_table_reversed() {
      this.getReversed();
    },
    item_per_page_inc_table_Total() {
      this.getTotal();
    },
    pageChangeTableSaved() {
      this.getSaved();
    },
    pageChangeTableReject() {
      this.getReject();
    },
    pageChangeTableReversed() {
      this.getReversed();
    },
    pageChangeTableTotal() {
      this.getTotal();
    },
    searchWord_Saved() {
      this.page_table_saved = 1;
      this.getSaved();
    },
    clearFilter_Saved() {
      this.page_table_saved = 1;
      this.search_saved = "";
      this.getSaved();
    },
    searchWord_Reject() {
      this.page_table_reject = 1;
      this.getReject();
    },
    clearFilter_Reject() {
      this.page_table_reject = 1;
      this.search_reject = "";
      this.getReject();
    },
    searchWord_Reversed() {
      this.page_table_reversed = 1;
      this.getReversed();
    },
    clearFilter_Reversed() {
      this.page_table_reversed = 1;
      this.search_reversed = "";
      this.getReversed();
    },
    searchWord_Total() {
      this.page_table_total = 1;
      this.getTotal();
    },
    clearFilter_Total() {
      this.page_table_total = 1;
      this.search_total = "";
      this.getTotal();
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
#filter_pending{
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

// ====================mail=====================
h5#modal-mail-center-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-mail-center-confirm_date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
// ====================save=====================
h5#modal-save-center-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-save-center-confirm_date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-total-center-confirm_date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-total-center-matching_submit_date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-total-center-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-total-center-email-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
// ====================reject=====================
h5#modal-reject-center-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-reversed-center-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-reject-center-confirm_date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-reversed-center-confirm_date___BV_modal_title_.modal-title {
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
td.detail-header {
  font-size: 16px;
  font-family: "Bai_Jamjuree";
}
input.form-control-mail-date {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  width: 100% !important;
  border-radius: 1px;
  font-size: 14px;
}
#modal-scrollable-saved {
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
#modal-scrollable-total {
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
#modal-scrollable-reject {
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
#modal-scrollable-reversed {
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
