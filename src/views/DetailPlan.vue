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
            <h3 style="font-weight:700">Detail - Plan</h3>
            <v-spacer></v-spacer>
            <!-- <v-btn
                  color="primary"
                  style="height: 40px; width: 150px; font-size: 12px"
                >
                  Upload File
                  <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                </v-btn> -->
          </v-col>

          <!-- <v-col cols="4">
            <v-card dark color="primary" style="padding: 10px">
              <v-card-title style="display: block">
                Count
                <v-spacer></v-spacer>
                <label style="font-size: 1.2vw">{{ count_list }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

          <v-col cols="4">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center;justify-content: space-between;"
                >
                  <v-icon
                    style="font-size: 28px;padding:5px;color:white;background-color:#14a1c0"
                    >mdi-file-alert-outline</v-icon
                  >
                  <label style="font-size: 1.2vw;text-align:right">Count</label>
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">
                  {{ count_list }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <!-- <v-col cols="4">
            <v-card dark color="teal" style="padding: 10px">
              <v-card-title style="display: block">
                Amount
                <v-spacer></v-spacer>
                <label style="font-size: 1.2vw">{{ amount_list }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

          <v-col cols="4">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center;justify-content: space-between;"
                >
                  <v-icon
                    style="font-size: 28px;padding:5px;color:white;background-color:#14a1c0"
                    >mdi-file-table-box-outline</v-icon
                  >
                  <label style="font-size: 1.2vw;text-align:right">Amount</label>
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">
                  {{ amount_list }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <!-- <v-col cols="4">
            <v-card color="success" dark style="padding: 10px">
              <v-card-title>
                <div style="display: block">
                  Total
                  <v-spacer></v-spacer>

                  <label style="font-size: 1.2vw">{{ total_datalist }}</label>
                </div>
              </v-card-title>
            </v-card>
          </v-col> -->

          <v-col cols="4">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div
                  class="d-flex"
                  style="align-items: center;justify-content: space-between;"
                >
                  <v-icon
                    style="font-size: 28px;padding:5px;color:white;background-color:#14a1c0"
                    >mdi-file-multiple-outline</v-icon
                  >
                  <label style="font-size: 1.2vw;text-align:right">Total</label>
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">
                  {{ total_datalist }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div>
                  <v-btn
                    outlined
                    color="indigo"
                    v-b-modal.modal-scrollable
                    @click="header_select()"
                    style="font-size: 12px"
                  >
                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                    column
                  </v-btn>
                  <button
                    class="btn refresh-btn"
                    color="primary"
                    @click="refreshData()"
                  >
                    Refresh:
                    <v-icon black>mdi-refresh</v-icon>
                  </button>
                </div>
                <!-- -------------------------------------column---------------------------------------- -->
                <b-modal
                  class="modal_column font-text-alert"
                  id="modal-scrollable"
                  title="Set Column"
                  style="width: 500px; !important"
                  @ok="Add_column()"
                  @cancel="cancel_colunm()"
                  data-backdrop="static"
                  no-close-on-backdrop
                >
                  <!-- <input class="form-control" placeholder="เลขที่ตัดหนี้" /> -->
                  <!-- <v-autocomplete
                      auto-select-first
                      clearable
                      dense
                      v-model="rv_number"
                      type="text"
                      multiple
                      label="เลขที่ตัดหนี้"
                      :items="set_column_rv(datalist, 'rv_number')"
                    ></v-autocomplete> -->
                  <!-- @change="filter(rv_number, String('rv_number'))" -->
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
                          :disabled="item.name == 'Invoice'"
                          :ripple="false"
                          v-model="item.show"
                          @input="select_column($event, item)"
                        ></v-simple-checkbox>
                      </template>
                      <!-- <template v-slot:[`item.fixed`]="{ item }">
                          <v-simple-checkbox
                            :disabled="item.name == 'Invoice Number'"
                            :ripple="false"
                            v-model="item.fixed"
                          ></v-simple-checkbox>
                        </template> -->
                    </v-data-table>
                  </div>
                  <!-- <div class="d-flex" style="width: 100%">
                      <b-button variant="outline-secondary" @click="cancel_colunm()"> Reset </b-button>
                      <div style="width: 10px"></div>
                      <b-button variant="success" @click="Add_column()"> OK </b-button>
                    </div> -->
                </b-modal>
                <!-- ---------------------------------end column---------------------------------------- -->

                <v-spacer></v-spacer>
                <v-form
                  style="display: flex; align-items: center"
                  class="search-area"
                  @submit.prevent="searchWord()"
                >
                  <v-text-field
                    v-model="search"
                    label="search"
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
                <!-- <v-btn color="red" dark class="screen" style="font-size: 12px">
                  Clear All filter</v-btn
                > -->

                <!-- <v-dialog v-model="dialog_upload" width="500" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <button
                      class="btn btn-primary"
                      v-bind="attrs"
                      v-on="on"
                      style="height: 40px; width: 170px; font-size: 14px"
                      :disabled="upload_disable == true"
                    >
                      UPLOAD FILE
                      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                    </button>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 indigo dark">
                      <div class="font-text-alert" style="color: white">
                        Upload File
                      </div>
                    </v-card-title>

                    <v-card-text>
                      <div style="height: 20px"></div>
                      <div v-if="!file.name">
                        <div
                          :class="['dropZone', dragging ? 'dropZone-over' : '']"
                          @dragenter="dragging = true"
                          @dragleave="dragging = false"
                        >
                          <div class="dropZone-info" @drag="onChange">
                            <span
                              class="fa fa-cloud-upload dropZone-title"
                            ></span>
                            <span class="dropZone-title"
                              >Drop file or click to upload</span
                            >
                            <div class="dropZone-upload-limit-info">
                              <div>extension support: Excel(.xlxs)</div>
                            </div>
                          </div>
                          <input type="file" @change="onChange" />
                        </div>
                      </div>
                      <div v-else class="dropZone-uploaded">
                        <div class="dropZone-uploaded-info">
                          <span class="dropZone-title">Uploaded</span>
                          <button
                            type="button"
                            class="btn btn-primary removeFile"
                            @click="removeFile"
                          >
                            Remove File
                          </button>
                        </div>
                      </div>

                      <div class="uploadedFile-info">
                        <div>
                          <label style="width: 77px">fileName:</label>
                          {{ file.name }}
                        </div>
                        <div>
                          <label style="width: 77px">fileSize:</label>
                          {{ (file.size / 1024).toFixed(2) }} KB
                        </div>
                        <div>
                          <label style="width: 77px">extension：</label
                          >{{ extension }}
                        </div>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" text @click="close_upload()">
                        cancel
                      </v-btn>
                      <v-btn color="primary" text @click="OK_upload()">
                        OK
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog> -->

                <!-- ----------------------------------open Due_date------------------------------------ -->

                <v-dialog v-model="dialog_due" max-width="380" persistent>
                  <v-card>
                    <div
                      class="font-text"
                      style="color: darkblue; padding: 15px; font-size: 20px"
                    >
                      Due Date
                    </div>
                    <div
                      class="font-text"
                      style="text-align: center; font-size: 16px"
                    >
                      <B>Invoice no</B> : {{ due_date_dialog.invoice_no }}
                    </div>
                    <div style="height: 10px"></div>
                    <input
                      type="date"
                      class="form-control"
                      v-model="due_date_dialog.due_date"
                      placeholder="Select Date"
                      style="width: 50%; margin: auto"
                      @click="set_default(due_date_dialog, 'due_date')"
                    />

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="close_due_date()">
                        Close
                      </v-btn>
                      <v-btn color="green darken-1" text @click="ok_due_date()">
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- ------------------------------------end Due_date---------------------------------- -->
                <!-- ----------------------------------open Confirm_date------------------------------------ -->
                <v-dialog v-model="dialog_open" max-width="380" persistent>
                  <v-card>
                    <div
                      class="font-text"
                      style="color: darkblue; padding: 15px; font-size: 20px"
                    >
                      วันที่ confirm
                    </div>
                    <div
                      class="font-text"
                      style="text-align: center; font-size: 16px"
                    >
                      <B>Invoice no</B> : {{ confirm_date_dialog.invoice_no }}
                    </div>
                    <div style="height: 10px"></div>
                    <input
                      type="date"
                      class="form-control"
                      v-model="confirm_date_dialog.confirm_date"
                      placeholder="Select Date"
                      style="width: 50%; margin: auto"
                      @click="set_default(confirm_date_dialog, 'confirm_date')"
                    />

                    <!-- @change="select($event, item)" -->
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="close_confirm()">
                        Close
                      </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="ok_confirm_date()"
                      >
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- ------------------------------------end Confirm_date---------------------------------- -->
              </v-card-title>

              <v-card-text>
                <div style="display: flex; justify-content: space-between">
                  <!-- <button
                    class="btn btn-primary mobile"
                    color="primary"
                    @click="clearFilter"
                    style="curser: pointer"
                  >
                    Clear All filter
                  </button> -->
                  <div style="display: flex;padding-bottom:10px">
                    <v-btn
                      color="primary"
                      @click="Export_Excel()"
                      style="height: 40px; width: 150px; font-size: 12px;font-weight:600"
                      :disabled="selected.length == 0"
                    >
                      Export File
                      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                    </v-btn>
                    <div style="width: 10px"></div>
                    <v-btn
                      text
                      color="teal"
                      dark
                      style="height: 40px; width: 150px; font-size: 12px;font-weight:600"
                      @click="Export_AllFile()"
                    >
                      <!-- @click="Export_AllFile()" -->
                      Export All File
                    </v-btn>
                    <div style="width: 10px"></div>
                    <v-dialog v-model="dialog_export" width="800">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          color="indigo"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          style="height: 40px; width: 170px; font-size: 12px;font-weight:600"
                        >
                          Export by Customer
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="text-h5 indigo dark">
                          <div class="font-text-alert" style="color: white">
                            Detail - Export File (by Customer)
                          </div>
                        </v-card-title>

                        <v-card-text>
                          <div>
                            <div
                              class="d-flex"
                              style="justify-content: center; align-items: baseline"
                            >
                              <v-col cols="4">
                                <v-text-field
                                  v-model="customer_search.customer_no"
                                  label="Cus No"
                                  required
                                  @change="
                                    search_Cus(customer_search.customer_no)
                                  "
                                ></v-text-field>
                              </v-col>
                              <v-col cols="7">
                                <b-input
                                  rows="1"
                                  max-rows="5"
                                  class="form-control"
                                  style="border: 1px solid #efefef; overflow: hidden"
                                  v-model="customer_search.customer_name"
                                  placeholder="Cus Name"
                                  disabled
                                />
                                <div class="font-text-alert" style="color: red">
                                  {{ text_alert }}
                                </div>
                              </v-col>

                              <v-btn
                                class="font-text-alert"
                                depressed
                                color="primary"
                                @click="add_customer(customer_search)"
                                >เพิ่ม</v-btn
                              >
                            </div>
                            <v-data-table
                              :headers="headers_cus"
                              :items="customer_list"
                              class="table_in"
                              fixed-header
                              :items-per-page="5"
                              height="260px"
                              id="modal_customer"
                            >
                              <template v-slot:[`item.action`]="{ item }">
                                <v-icon medium @click="delete_customer(item)"
                                  >mdi-minus</v-icon
                                >
                              </template>
                            </v-data-table>
                          </div>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="error" text @click="close_export_cus()">
                            cancel
                          </v-btn>
                          <v-btn
                            color="primary"
                            text
                            @click="EXport_cus()"
                            :disabled="customer_list_id.length == 0"
                          >
                            Export
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                  <label style="font-size: 12px; float: right"
                    >data show : {{ datalist.length }}</label
                  >
                </div>

                <!-- --------------------------------------table--------------------------------------------- -->
                <v-data-table
                  :headers="column_select"
                  :items="datalist"
                  :hide-default-footer="true"
                  :items-per-page="number_INC()"
                  class="table_in"
                  fixed-header
                  height="600px"
                  item-key="invoice_no"
                  id="detail_plan"
                  show-select
                  :single-select="singleSelect"
                  v-model="selected"
                >
                  <!-- ----------------------------------Filter ------------------------------------------------------ -->
                  <template v-slot:[`body.prepend`]>
                    <tr id="filterdetatil">
                      <td class="blank"></td>
                      <td class="fixed-detail">
                        <v-autocomplete
                          clearable
                          dense
                          multiple
                          v-model="invoice_no"
                          type="text"
                          :items="invoice_list"
                          label="invoice"
                          @change="filter(invoice_no, String('invoice_no'))"
                        ></v-autocomplete>
                        <!-- :items="listfilter_data(datalist, 'invoice_no')" -->
                      </td>

                      <td v-if="column_name[1].show == true">
                        <v-autocomplete
                          v-model="factoring"
                          type="text"
                          label="factoring"
                          :items="factoring_filter"
                          @change="filter(factoring, String('factoring'))"
                          auto-select-first
                          dense
                          item-text="name"
                          multiple
                          clearable
                        ></v-autocomplete>
                      </td>

                      <td v-if="column_name[2].show == true">
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
                      <td v-if="column_name[3].show == true">
                        <v-autocomplete
                          multiple
                          clearable
                          dense
                          v-model="customer_name"
                          type="text"
                          label="Cus Name"
                          :items="customer_name_list"
                          @change="filter(customer_name, String('customer_name'))"
                        ></v-autocomplete>
                        <!-- hide-no-data
                              hide-selected
                              return-object -->
                      </td>

                      <td v-if="column_name[4].show == true">
                        <input
                          class="form-control"
                          v-model="amount"
                          type="number"
                          min="0"
                          placeholder="Amount"
                          @change="filter(amount, String('amount'))"
                          :disabled="amount_blank == true"
                        />
                        <div class="d-flex">
                          <input
                            type="checkbox"
                            @change="blank_checkbox('amount')"
                            v-model="amount_blank"
                          />
                          <div style="font-size: 10px">[blank]</div>
                        </div>
                      </td>

                      <td v-if="column_name[5].show == true">
                        <v-autocomplete
                          multiple
                          clearable
                          dense
                          v-model="current_back_log"
                          type="text"
                          label="Current/BackLog"
                          :items="['[blank]', 'Current', 'BackLog']"
                          @change="
                            filter(current_back_log, String('current_back_log'))
                          "
                        ></v-autocomplete>
                      </td>
                      <td v-if="column_name[6].show == true">
                        <input
                          class="form-control"
                          type="text"
                          v-model="text_start_date"
                          label="start_date"
                          placeholder="Start date"
                          v-b-modal.modal-center-start-date
                          data-backdrop="static"
                          data-keyboard="false"
                        />
                        <!-- @click="dialog_date_bill = true" -->
                        <!-- ==============================start_date dialog===================================== -->
                        <div>
                          <b-modal
                            class="dialog_date"
                            ref="my-modal-start_date"
                            data-backdrop="static"
                            no-close-on-backdrop
                            id="modal-center-start-date"
                            centered
                            hide-footer
                            title="Start Date"
                          >
                            <cv-date-picker
                              placeholder="dd/mm/yyyy"
                              light
                              kind="range"
                              :date-end-label="dateEndLabel"
                              :cal-options="calOptions"
                              @change="
                                actionChange(start_date_range, 'start_date')
                              "
                              v-model="start_date_range"
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
                                @click="blankModal('start_date')"
                              >
                                [Blank]
                              </button>
                              <div style="width: 160px"></div>
                              <div class="d-flex">
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-danger"
                                  @click="hideModal('start_date')"
                                  >Cancel</b-button
                                >
                                <div style="width: 10px"></div>
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-primary"
                                  @click="OkFilterModal('start_date')"
                                  >OK</b-button
                                >
                              </div>
                            </div>
                          </b-modal>
                        </div>

                        <!-- ==============================end start_date dialog===================================== -->
                      </td>

                      <td v-if="column_name[7].show == true">
                        <input
                          class="form-control"
                          type="text"
                          v-model="text_end_date"
                          label="end_date"
                          placeholder="End date"
                          v-b-modal.modal-center-end-date
                          data-backdrop="static"
                          data-keyboard="false"
                        />
                        <!-- @click="dialog_date_bill = true" -->
                        <!-- ==============================end_date dialog===================================== -->
                        <div>
                          <b-modal
                            class="dialog_date"
                            ref="my-modal-end_date"
                            data-backdrop="static"
                            no-close-on-backdrop
                            id="modal-center-end-date"
                            centered
                            hide-footer
                            title="End Date"
                          >
                            <cv-date-picker
                              placeholder="dd/mm/yyyy"
                              light
                              kind="range"
                              :date-end-label="dateEndLabel"
                              :cal-options="calOptions"
                              @change="actionChange(end_date_range, 'end_date')"
                              v-model="end_date_range"
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
                                @click="blankModal('end_date')"
                              >
                                [Blank]
                              </button>
                              <div style="width: 160px"></div>
                              <div class="d-flex">
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-danger"
                                  @click="hideModal('end_date')"
                                  >Cancel</b-button
                                >
                                <div style="width: 10px"></div>
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-primary"
                                  @click="OkFilterModal('end_date')"
                                  >OK</b-button
                                >
                              </div>
                            </div>
                          </b-modal>
                        </div>

                        <!-- ==============================end end_date dialog===================================== -->
                      </td>

                      <td v-if="column_name[8].show == true">
                        <input
                          class="form-control"
                          type="text"
                          v-model="text_date_bill"
                          label="date_bill"
                          placeholder="Bill date"
                          v-b-modal.modal-center-date-bill
                          data-backdrop="static"
                          data-keyboard="false"
                        />
                        <!-- @click="dialog_date_bill = true" -->
                        <!-- ==============================date_bill dialog===================================== -->
                        <div>
                          <b-modal
                            class="dialog_date"
                            ref="my-modal-date_bill"
                            data-backdrop="static"
                            no-close-on-backdrop
                            id="modal-center-date-bill"
                            centered
                            hide-footer
                            title="วันที่วางบิล"
                          >
                            <cv-date-picker
                              placeholder="dd/mm/yyyy"
                              light
                              kind="range"
                              :date-end-label="dateEndLabel"
                              :cal-options="calOptions"
                              @change="actionChange(date_bill_range, 'date_bill')"
                              v-model="date_bill_range"
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
                                @click="blankModal('date_bill')"
                              >
                                [Blank]
                              </button>
                              <div style="width: 160px"></div>
                              <div class="d-flex">
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-danger"
                                  @click="hideModal('date_bill')"
                                  >Cancel</b-button
                                >
                                <div style="width: 10px"></div>
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-primary"
                                  @click="OkFilterModal('date_bill')"
                                  >OK</b-button
                                >
                              </div>
                            </div>
                          </b-modal>
                        </div>

                        <!-- ==============================end date_bill dialog===================================== -->
                      </td>

                      <td v-if="column_name[9].show == true">
                        <input
                          class="form-control"
                          type="text"
                          v-model="text_due_date"
                          placeholder="Due date"
                          v-b-modal.modal-center-due-date
                          data-backdrop="static"
                          data-keyboard="false"
                        />
                        <!-- @click="dialog = true" -->
                        <!-- --------------------Modal Start_Date-------------------------------------- -->
                        <div>
                          <b-modal
                            class="dialog_date"
                            ref="my-modal-due_date"
                            data-backdrop="static"
                            no-close-on-backdrop
                            id="modal-center-due-date"
                            centered
                            hide-footer
                            title="วันครบกำหนดชำระ"
                          >
                            <cv-date-picker
                              placeholder="dd/mm/yyyy"
                              light
                              kind="range"
                              :date-end-label="dateEndLabel"
                              :cal-options="calOptions"
                              @change="actionChange(due_date_range, 'due_date')"
                              v-model="due_date_range"
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
                                @click="blankModal('due_date')"
                              >
                                [Blank]
                              </button>
                              <div style="width: 160px"></div>
                              <div class="d-flex">
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-danger"
                                  @click="hideModal('due_date')"
                                  >Cancel</b-button
                                >
                                <div style="width: 10px"></div>
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-primary"
                                  @click="OkFilterModal('due_date')"
                                  >OK</b-button
                                >
                              </div>
                            </div>
                          </b-modal>
                        </div>
                        <!-- --------------------end Modal Start_Date-------------------------------------- -->
                      </td>

                      <td v-if="column_name[10].show == true">
                        <v-autocomplete
                          auto-select-first
                          dense
                          clearable
                          multiple
                          v-model="payment_type"
                          type="text"
                          label="ช่องทางการชำระเงิน"
                          :items="payment_select"
                          @change="filter(payment_type, String('payment_type'))"
                        ></v-autocomplete>
                      </td>

                      <td v-if="column_name[11].show == true">
                        <input
                          class="form-control"
                          type="text"
                          v-model="text_confirm_date"
                          label="confirm_date"
                          placeholder="วันที่ confirm"
                          v-b-modal.modal-center-confirm-date
                          data-backdrop="static"
                          data-keyboard="false"
                        />
                        <!-- @click="dialog_confirm_date = true" -->
                        <!-- ==============================confirm_date dialog===================================== -->
                        <div>
                          <b-modal
                            class="dialog_date"
                            ref="my-modal-confirm_date"
                            data-backdrop="static"
                            no-close-on-backdrop
                            id="modal-center-confirm-date"
                            centered
                            hide-footer
                            title="วันที่ confirm"
                          >
                            <cv-date-picker
                              placeholder="dd/mm/yyyy"
                              light
                              kind="range"
                              :date-end-label="dateEndLabel"
                              :cal-options="calOptions"
                              @change="
                                actionChange(confirm_date_range, 'confirm_date')
                              "
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
                                @click="blankModal('confirm_date')"
                              >
                                [Blank]
                              </button>
                              <div style="width: 160px"></div>
                              <div class="d-flex">
                                <b-button
                                  data-dismiss="modal"
                                  class="mt-3"
                                  variant="outline-danger"
                                  @click="hideModal('confirm_date')"
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

                        <!-- ==============================end confirm_date dialog===================================== -->
                      </td>

                      <td v-if="column_name[12].show == true">
                        <v-autocomplete
                          auto-select-first
                          dense
                          clearable
                          multiple
                          v-model="paid"
                          type="text"
                          label="check"
                          :items="paid_mainstatus"
                          @change="filter(paid, String('paid'))"
                        ></v-autocomplete>
                      </td>

                      <td v-if="column_name[13].show == true">
                        <v-autocomplete
                          auto-select-first
                          dense
                          multiple
                          clearable
                          v-model="re_check"
                          type="text"
                          label="Recheck"
                          :items="recheck_list"
                          @change="filter(re_check, String('recheck'))"
                        ></v-autocomplete>
                      </td>

                      <td v-if="column_name[14].show == true">
                        <input
                          class="form-control"
                          v-model="remark_warroom"
                          type="text"
                          placeholder="หมายเหตุ warroom"
                          @change="
                            filter(remark_warroom, String('remark_warroom'))
                          "
                          :disabled="remark_warroom_blank == true"
                        />
                        <div class="d-flex">
                          <input
                            type="checkbox"
                            @change="blank_checkbox('remark_warroom')"
                            v-model="remark_warroom_blank"
                          />
                          <div style="font-size: 10px">[blank]</div>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <!-- class="fixed" -->
                  <!-- -------------------------------------End Filter------------------------------------------------------------- -->
                  <template
                    v-slot:[`item.invoice_no`]="{ item }"
                    class="fixed_invoice_detail"
                  >
                    {{ item.invoice_no }}
                  </template>
                  <template v-slot:[`item.factoring`]="{ item }">
                    <select
                      disabled
                      class="style-chooser form-control"
                      v-model="item.factoring"
                      @change="factoringChange($event, item)"
                    >
                      <option value=""></option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    <!-- {{item.factoring}} -->
                  </template>
                  <template v-slot:[`item.amount`]="{ item }">
                    <v-chip style="z-index: 1" color="green" dark>
                      {{ calculateAmount(item.amount) }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.current_back_log`]="{ item }">
                    <v-chip
                      style="z-index: 1"
                      :color="getColor(item.current_back_log)"
                      dark
                    >
                      {{ item.current_back_log }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.start_date`]="{ item }">
                    <div
                      class="d-flex"
                      style="align-items: center; justify-content: center"
                    >
                      <!-- @click="set_default(item, 'confirm_date')" -->
                      <!-- <input
                        disabled
                        type="text"
                        class="form-control"
                        :value="return_confirm_date(item.start_date)"
                        placeholder="start_date"
                      /> -->
                      {{ return_confirm_date(item.start_date) }}
                    </div>
                  </template>

                  <template v-slot:[`item.end_date`]="{ item }">
                    <div
                      class="d-flex"
                      style="align-items: center; justify-content: center"
                    >
                      <!-- @click="set_default(item, 'confirm_date')" -->
                      {{ return_confirm_date(item.end_date) }}
                      <!-- <input
                        disabled
                        type="text"
                        class="form-control"
                        :value="return_confirm_date(item.end_date)"
                        placeholder="end_date"
                      /> -->
                      <!-- <button
                        class="btn"
                        style="font-size: 18px"
                        @click="clearDate('due_date', item)"
                      >
                        x
                      </button> -->
                    </div>
                  </template>

                  <template v-slot:[`item.date_bill`]="{ item }">
                    <div
                      class="d-flex"
                      style="align-items: center; justify-content: center"
                    >
                      <!-- @click="set_default(item, 'confirm_date')" -->
                      {{ return_confirm_date(item.date_bill) }}
                      <!-- <input
                        disabled
                        type="text"
                        class="form-control"
                        :value="return_confirm_date(item.date_bill)"
                        placeholder="Select Date"
                      /> -->
                      <!-- <button
                        class="btn"
                        style="font-size: 18px"
                        @click="clearDate('due_date', item)"
                      >
                        x
                      </button> -->
                    </div>
                  </template>

                  <template v-slot:[`item.due_date`]="{ item }">
                    <div
                      class="d-flex"
                      style="align-items: center; justify-content: center"
                    >
                      <!-- @click="set_default(item, 'confirm_date')" -->
                      {{ return_confirm_date(item.due_date) }}
                      <!-- <input
                        disabled
                        type="text"
                        class="form-control"
                        :value="return_confirm_date(item.due_date)"
                        placeholder="Select Date"
                        @change="select($event, item)"
                        @click="openconfirm(item, 'due_date')"
                      /> -->
                      <!-- <button
                        class="btn"
                        style="font-size: 18px"
                        @click="clearDate('due_date', item)"
                      >
                        x
                      </button> -->
                    </div>
                  </template>

                  <!-- <template v-slot:[`item.payment_type`]="{ item }">
                    <select
                      class="style-chooser form-control"
                      v-model="item.payment_type"
                      @change="select($event, item)"
                    >
                      <option value=""></option>
                      <option value="KBANK579">KBANK579</option>
                      <option value="KBANK861">KBANK861</option>
                      <option value="BBL205">BBL205</option>
                      <option value="BBL785">BBL785</option>
                      <option value="QR_CODE">QR CODE</option>
                      <option value="SCB376">SCB376</option>
                      <option value="SCB009">SCB009</option>
                      <option value="KTB395">KTB395</option>
                      <option value="KTB184">KTB184</option>
                      <option value="TMB958">TMB958</option>
                      <option value="BAY778">BAY778</option>
                      <option value="GSB491">GSB491</option>
                      <option value="CHQ">CHQ</option>
                      <option value="FACTORING">FACTORING</option>
                      <option value="TBANK064">TBANK064</option>
                      <option value="Bill_Payment_SCB">Bill Payment - SCB</option>
                      <option value="Bill_Payment_KBANK">
                        Bill Payment - KBANK
                      </option>
                      <option value="Bill_Payment_BBL">Bill Payment - BBL</option>
                    </select>
                  </template> -->

                  <template v-slot:[`item.confirm_date`]="{ item }">
                    <div
                      class="d-flex"
                      style="align-items: center; justify-content: center"
                    >
                      <!-- @click="set_default(item, 'confirm_date')" -->
                      {{ return_confirm_date(item.confirm_date) }}
                      <!-- <input
                        disabled
                        type="text"
                        class="form-control"
                        :value="return_confirm_date(item.confirm_date)"
                        placeholder="Select Date"
                        @change="select($event, item)"
                        @click="openconfirm(item, 'confirm_date')"
                      /> -->
                      <!-- <button
                        class="btn"
                        style="font-size: 18px"
                        @click="clearDate('confirm_date', item)"
                      >
                        x
                      </button> -->
                    </div>
                  </template>
                </v-data-table>
                <!-- --------------------------------------table--------------------------------------------- -->
                <div class="d-flex" style="float: right; margin-top: 20px">
                  <div
                    style="display: flex; align-items: center; margin-right: 10px"
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
                    <option value="300">300</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
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
import "carbon-components/css/carbon-components.css";
// import { BModal, VBModal } from "bootstrap-vue";
import Swal from "sweetalert2";

const orders = [
  {
    amount: null,
    confirm_date: null,
    created_at: null,
    current_back_log: null,
    customer_name: null,
    customer_no: null,
    deleted_at: null,
    date_bill: null,
    due_date: null,
    factoring: null,
    invoice_no: null,
    paid: null,
    payment_type: null,
    re_check: null,
    remark_warroom: null,
    seq: null,
    uid: null,
    updated_at: null,
  },
];

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    item_per_page: 100,
    page: 1,
    page_total: 1,

    search: "",
    finish: false,

    selected: [],
    singleSelect: false,

    dialog_export: false,
    customer_search: {
      customer_name: null,
      customer_no: null,
      deleted_at: null,
      seq: null,
      uid: null,
    },
    customer_list: [],
    customer_list_id: [],
    text_alert: "",
    headers_cus: [
      {
        text: "Cus No.",
        value: "customer_no",
        width: "100px",
        sortable: false,
      },
      {
        text: "Cus Name.",
        value: "customer_name",
        width: "200px",
        sortable: false,
      },
      { text: "ลบ", value: "action", width: "100px", sortable: false },
    ],

    dateEndLabel: "End date",
    calOptions: {
      dateFormat: "d/m/Y",
    },
    start_date_range: {
      startDate: null,
      endDate: null,
    },
    end_date_range: {
      startDate: null,
      endDate: null,
    },
    date_bill_range: {
      startDate: null,
      endDate: null,
    },
    due_date_range: {
      startDate: null,
      endDate: null,
    },
    confirm_date_range: {
      startDate: null,
      endDate: null,
    },

    invoice_list: [],
    customer_name_list: [],
    customer_no_list: [],

    factoring_filter: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
    // ===================filter variable===============================//
    amount: null,
    confirm_date: [null, null],
    current_back_log: null,
    customer_name: null,
    customer_no: null,
    end_date: [null, null],
    start_date: [null, null],
    date_bill: [null, null],
    due_date: [null, null],
    factoring: null,
    invoice_no: null,
    paid: null,
    payment_type: null,
    re_check: null,
    remark_warroom: null,
    // =============================End filter===========================//
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
      // {
      //   text: "Fixed",
      //   align: "start",
      //   value: "fixed",
      //   sortable: false,
      //   width: "50px",
      // },
    ],
    column_name: [
      {
        name: "Invoice",
        show: true,
        fixed: true,
        value: "invoice_no",
      },
      {
        name: "FACTORING",
        show: true,
        fixed: false,
        value: "factoring",
      },
      {
        name: "Customer No",
        show: true,
        fixed: false,
        value: "customer_no",
      },
      {
        name: "Customer Name",
        show: true,
        fixed: false,
        value: "customer_name",
      },
      {
        name: "Amount(Inc. VAT)",
        show: true,
        fixed: false,
        value: "amount",
      },
      {
        name: "CURRENT/BACKLOG",
        show: true,
        fixed: true,
        value: "current_back_log",
      },
      {
        name: "Start Date",
        show: true,
        fixed: false,
        value: "start_date",
      },
      {
        name: "End Date",
        show: true,
        fixed: false,
        value: "end_date",
      },
      {
        name: "วันที่วางบิล",
        show: true,
        fixed: false,
        value: "date_bill",
      },
      {
        name: "วันครบกำหนดชำระ",
        show: true,
        fixed: false,
        value: "due_date",
      },
      {
        name: "ช่องทางการชำระเงิน",
        show: true,
        fixed: false,
        value: "payment_type",
      },
      {
        name: "วันที่ confirm",
        show: true,
        fixed: false,
        value: "confirm_date",
      },
      {
        name: "Check",
        show: true,
        fixed: false,
        value: "paid",
      },
      {
        name: "Recheck",
        show: true,
        fixed: false,
        value: "recheck",
      },
      {
        name: "หมายเหตุ Warroom",
        show: true,
        fixed: false,
        value: "remark_warroom",
      },
    ],
    show_column: [],
    list_column: [],
    column_select: [],
    headers: [
      {
        text: "Invoice",
        sortable: true,
        value: "invoice_no",
        width: "250px",
        class: "invoice_detail",
      },
      {
        text: "FACTORING",
        value: "factoring",
        width: "150px",
        sortable: true,
        align: "center",
      },
      {
        text: "Customer No",
        value: "customer_no",
        width: "300px",
        sortable: true,
        align: "center",
      },
      {
        text: "Customer Name",
        value: "customer_name",
        width: "400px",
        sortable: true,
        align: "left",
      },
      {
        text: "Amount(Inc. VAT)",
        value: "amount",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "CURRENT/BACKLOG",
        value: "current_back_log",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Start Date",
        value: "start_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "End Date",
        value: "end_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่วางบิล",
        value: "date_bill",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันครบกำหนดชำระ",
        value: "due_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "ช่องทางการชำระเงิน",
        value: "payment_type",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "วันที่ confirm",
        value: "confirm_date",
        width: "250px",
        sortable: true,
        align: "center",
      },
      {
        text: "Check",
        value: "paid",
        width: "240px",
        sortable: true,
        align: "center",
      },
      {
        text: "Recheck",
        value: "re_check",
        width: "240px",
        sortable: true,
        align: "center",
      },
      {
        text: "หมายเหตุ Warroom",
        value: "remark_warroom",
        width: "400px",
        sortable: true,
        align: "left",
      },
    ],
    customer_no_blank: false,
    amount_blank: false,
    remark_warroom_blank: false,

    payment_select: [
      "[blank]",
      "KBANK579",
      "KBANK861",
      "BBL205",
      "BBL785",
      "QR CODE",
      "SCB376",
      "SCB009",
      "KTB395",
      "KTB184",
      "TMB958",
      "BAY778",
      "GSB491",
      "CHQ",
      "FACTORING",
      "TBANK064",
      "Bill Payment - SCB",
      "Bill Payment - KBANK",
      "Bill Payment - BBL",
    ],
    paid_mainstatus: [
      "[blank]",
      "เลื่อนครั้งที่ 1",
      "หนังสือทวงหนี้ครั้งที่ 1",
      "หนังสือทวงหนี้ครั้งที่ 2",
      "ปิดระบบ",
      "ผ่อนชำระ",
      "เข้าจริง",
      "Paid",
      "รอ Clearing CHQ",
    ],
    recheck_list: [
      "[blank]",
      "ตรง Due",
      "ก่อน Due",
      "เลื่อน",
      "Suspense",
      "นอกแผน",
      "รอเคลียร์เคส",
    ],
    datalist: [],
    Alldata: [],
    total_datalist: 0,
    amount_list: 0,
    count_list: 0,

    file: {
      name: "",
      size: 0,
    },
    dragging: false,
    extension: "",
    upload_disable: false,

    data_file: [],

    dialog_upload: false,
    confirm_date_dialog: orders,
    dialog_open: false,

    dialog_date_bill: false,
    date_bill_dialog: orders,
    dialog_bill: false,

    dialog_due_date: false,
    due_date_dialog: orders,
    dialog_due: false,

    dialog_start_date: false,
    dialog_start: false,

    dialog_end_date: false,
    dialog_end: false,

    text_date_bill: null,
    text_due_date: null,
    text_confirm_date: null,
    text_start_date: null,
    text_end_date: null,

    filterlist: [],
    role_status: null,
  }),
  created() {
    // this.finish = true;
    this.role_status = localStorage.getItem("role");
    if (this.role_status == "down_service") {
      this.finish = false;
      this.$router.push("/down-service");
    } else if (localStorage.getItem("acces_token")) {
      this.show_column = [];
      this.column_select = [];
      for (let index = 0; index < this.headers.length; index++) {
        this.show_column.push(this.headers[index]);
        this.column_select.push(this.headers[index]);
        this.list_column.push(this.headers[index]);
      }
      // this.list_column = this.headers;
      // this.show_column = this.list_column;
      // this.column_select = this.list_column;
      this.column_name.forEach((element) => {
        element.show = true;
      });
      this.setting_column();
      this.Init();
      this.Init_upload();
    }
  },
  watch: {},
  computed: {},
  methods: {
    searchWord() {
      this.finish = false;
      this.Init();
    },
    setting_column() {
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.show_column = [];
      this.column_select = [];
      this.list_column = [];
      for (let i = 0; i < this.headers.length; i++) {
        if (this.headers[i].value == "invoice_no") {
          this.show_column.push(this.headers[i]);
          this.column_select.push(this.headers[i]);
          this.list_column.push(this.headers[i]);
        }
      }
      this.axios
        .get(process.env.VUE_APP_API + "/setting/columns/plan", headers)
        .then((response) => {
          for (let index = 0; index < this.column_name.length; index++) {
            if (this.column_name[index].value == "amount") {
              this.column_name[index].show = response.data.amount;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "amount" &&
                  response.data.amount == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            if (this.column_name[index].value == "current_back_log") {
              this.column_name[index].show = response.data.current_back_log;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "current_back_log" &&
                  response.data.current_back_log == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            if (this.column_name[index].value == "start_date") {
              this.column_name[index].show = response.data.start_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "start_date" &&
                  response.data.start_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            if (this.column_name[index].value == "end_date") {
              this.column_name[index].show = response.data.end_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "end_date" &&
                  response.data.end_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
            if (this.column_name[index].value == "date_bill") {
              this.column_name[index].show = response.data.date_bill;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "date_bill" &&
                  response.data.date_bill == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "confirm_date") {
              this.column_name[index].show = response.data.confirm_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "confirm_date" &&
                  response.data.confirm_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "customer_name") {
              this.column_name[index].show = response.data.customer_name;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "customer_name" &&
                  response.data.customer_name == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "customer_no") {
              this.column_name[index].show = response.data.customer_no;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "customer_no" &&
                  response.data.customer_no == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "due_date") {
              this.column_name[index].show = response.data.due_date;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "due_date" &&
                  response.data.due_date == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "factoring") {
              this.column_name[index].show = response.data.factoring;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "factoring" &&
                  response.data.factoring == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "paid") {
              this.column_name[index].show = response.data.paid;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "paid" &&
                  response.data.paid == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "payment_type") {
              this.column_name[index].show = response.data.payment_type;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "payment_type" &&
                  response.data.payment_type == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "recheck") {
              this.column_name[index].show = response.data.re_check;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "re_check" &&
                  response.data.re_check == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }

            if (this.column_name[index].value == "remark_warroom") {
              this.column_name[index].show = response.data.remark_warroom;
              for (let k = 0; k < this.headers.length; k++) {
                if (
                  this.headers[k].value == "remark_warroom" &&
                  response.data.remark_warroom == true
                ) {
                  this.show_column.push(this.headers[k]);
                  this.column_select.push(this.headers[k]);
                  this.list_column.push(this.headers[k]);
                }
              }
            }
          }

          var sortt = this.headers;
          this.show_column.sort(function(a, b) {
            return sortt.indexOf(a) - sortt.indexOf(b);
          });
          this.column_select.sort(function(a, b) {
            return sortt.indexOf(a) - sortt.indexOf(b);
          });
          this.list_column.sort(function(a, b) {
            return sortt.indexOf(a) - sortt.indexOf(b);
          });
          this.finish = true;
          // this.finish = true
        
        })
        .catch((error) => {
          if (error) {
            var body_2 = {
              CustomerNo: true,
              CustomerName: true,
              InvoiceNo: true,
              Factoring: true,
              Amount: true,
              DueDate: true,
              PaymentType: true,
              ConfirmDate: true,
              Paid: true,
              Recheck: true,
              RemarkWarroom: true,
              CurrentBackLog: true,
              DateBill: true,
              StartDate: true,
              EndDate: true,
            };
            this.axios
              .post(
                process.env.VUE_APP_API + "/setting/columns/plan",
                body_2,
                headers
              )
              .then((response) => {
                if (response) {
                  // this.finish = false
                  this.setting_column();
                  // this.getInvoice()
                }
              });
          }
        });
    },
    Export_AllFile() {
      this.AllFile = "ALL";
      var url =
        process.env.VUE_APP_API +
        "/export/plan/all?secret=" +
        encodeURIComponent(localStorage.getItem("resource_key"));
      // encodeURIComponent
      window.open(url);
    },

    Export_Excel() {
      var list = Object.keys(this.selected);
      var exportlist = [];
      for (let index = 0; index < list.length; index++) {
        exportlist.push(this.selected[index].invoice_no);
      }
      // if (this.AllFile == "ALL") {
      //   exportlist = ["ALL"];
      // }
      let headers_export = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          // "content-type": "application/octet-stream",
          // Accept:
          //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
        responseType: "blob",
      };
      var body = {
        invoice_no: exportlist,
      };
      this.finish = false;
      this.axios
        .post(process.env.VUE_APP_API + "/export/plan", body, headers_export)
        .then((response) => {
          if (response.data) {
            this.finish = true;
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "detail_plan.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
        });
    },
    EXport_cus() {
      // /export/invoice/customer
      var body = {
        customer_no: this.customer_list_id,
      };
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
        .post(process.env.VUE_APP_API + "/export/plan/customer", body, headers)
        .then((response) => {
          if (response) {
            this.dialog_export = false;
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_detail_by_customer.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
            setTimeout(() => {
              this.customer_list = [];
              this.customer_list_id = [];
            }, 1000);
          }
        })
        .catch((error) => {
          if (error) {
            this.dialog_export = false;
          }
        });
    },
    close_export_cus() {
      this.dialog_export = false;
      this.customer_list = [];
      this.customer_list_id = [];
      this.customer_search.customer_name = null;
      this.customer_search.customer_no = null;
    },
    delete_customer(data) {

      for (let index = 0; index < this.customer_list.length; index++) {
        if (data.customer_no == this.customer_list[index].customer_no) {
          this.customer_list.splice(index, 1);
          this.customer_list_id.splice(index, 1);
        }
      }
    },
    search_Cus(customer) {
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
            this.text_alert = "";
          }
        })
        .catch((error) => {
          if (error) {
            this.customer_search.customer_name = null;
            this.text_alert = "ไม่พบข้อมูลลูกค้า";

            setTimeout(() => {
              this.text_alert = "";
            }, 2000);
          }
        });
    },
    add_customer(data) {
      var check_includes = false;
      for (let index = 0; index < this.customer_list.length; index++) {
        if (data.customer_no == this.customer_list[index].customer_no) {
          check_includes = true;
          break;
        }
      }
      if (
        check_includes == false &&
        this.customer_search.customer_name !== null &&
        this.text_alert !== "ไม่พบข้อมูลลูกค้า"
      ) {
        this.customer_list.push(data);
        this.customer_list_id.push(data.customer_no);
        this.customer_search = {
          customer_name: null,
          customer_no: null,
          deleted_at: null,
          seq: null,
          uid: null,
        };
        this.text_alert = "";
      } else if (check_includes == true) {
        this.text_alert = "ข้อมูลนี้มีในตารางแล้ว";
        setTimeout(() => {
          this.text_alert = "";
        }, 2000);
      } else {
        this.text_alert = "ไม่พบข้อมูลลูกค้า";
        setTimeout(() => {
          this.text_alert = "";
        }, 2000);
      }
    },
    Word() {
      this.finish = false;
      this.Init();
    },
    number_INC() {
      return Number(this.item_per_page);
    },
    item_per_page_inc() {
      if (Number(this.item_per_page) > 100) {
        this.page = 1;
      }
      this.pageChange();
    },
    pageChange() {
      this.finish = false;
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
        .post(process.env.VUE_APP_API + "/plan/filter", body, headers_filter)
        .then((response) => {
          if (response) {
            this.finish = true;
            if (
              response &&
              (response.data.data !== null || response.data.data !== undefined)
            ) {
              this.datalist = response.data.data;
              // this.Alldata = response.data.data;
              this.total_datalist = response.data.total.toLocaleString();
              this.amount_list = response.data.sum_amount.toLocaleString();
              this.count_list = response.data.count.toLocaleString();
              this.page_total = response.data.count_page;
              this.datalist.forEach((element) => {
                element.start_date = moment(element.start_date).format(
                  "YYYY-MM-DD"
                );

                element.end_date = moment(element.end_date).format(
                  "YYYY-MM-DD"
                );
                element.due_date = moment(element.due_date).format(
                  "YYYY-MM-DD"
                );

                element.date_bill = moment(element.date_bill).format(
                  "YYYY-MM-DD"
                );

                element.confirm_date = moment(element.confirm_date).format(
                  "YYYY-MM-DD"
                );

                this.invoice_list = [];
                this.customer_name_list = [];
                this.customer_no_list = [];
                this.listfilter_data("", "invoice_no");
                this.listfilter_data("", "customer_name");
              });
            } else {
              this.datalist = [];
              this.Alldata = [];
              this.total_datalist = 0;
              this.amount_list = 0;
              this.count_list = 0;
              this.page_total = 1;
              // this.datalist.forEach((element) => {
              //   element.due_date = moment(element.due_date).format("YYYY-MM-DD");

              //   element.confirm_date = moment(element.confirm_date).format(
              //     "YYYY-MM-DD"
              //   );

              this.invoice_list = [];
              this.customer_name_list = [];
              this.customer_no_list = [];
              this.listfilter_data("", "invoice_no");
              this.listfilter_data("", "customer_name");
              //  });
            }
          }
        });
    },
    actionChange(date, name) {
      if (name == "start_date") {
        this.start_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.start_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      }

      if (name == "end_date") {
        this.end_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.end_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      }
      if (name == "due_date") {
        this.due_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.due_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      }
      if (name == "date_bill") {
        this.date_bill[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.date_bill[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      } else if (name == "confirm_date") {
        this.confirm_date[0] = date.startDate
          .split("/")
          .reverse()
          .join("-");
        this.confirm_date[1] = date.endDate
          .split("/")
          .reverse()
          .join("-");
      }
    },
    hideModal(name) {
      if (name == "start_date") {
        this.$refs["my-modal-start_date"].hide();
        this.text_start_date = null;
        this.start_date_range.startDate = null;
        this.start_date_range.endDate = null;
        this.close_dialog(name);
      }
      if (name == "end_date") {
        this.$refs["my-modal-end_date"].hide();
        this.text_end_date = null;
        this.end_date_range.startDate = null;
        this.end_date_range.endDate = null;
        this.close_dialog(name);
      }
      if (name == "date_bill") {
        this.$refs["my-modal-date_bill"].hide();
        this.text_date_bill = null;
        this.date_bill_range.startDate = null;
        this.date_bill_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "due_date") {
        this.$refs["my-modal-due_date"].hide();
        this.text_due_date = null;
        this.due_date_range.startDate = null;
        this.due_date_range.endDate = null;
        this.close_dialog(name);
      } else if (name == "confirm_date") {
        this.$refs["my-modal-confirm_date"].hide();
        this.text_confirm_date = null;
        this.confirm_date_range.startDate = null;
        this.confirm_date_range.endDate = null;
        this.close_dialog(name);
      }
    },
    close_dialog(close) {
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
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/plan/filter", body, headers_filter)
        .then((response) => {
          if (response) {
            this.finish = true;
            if (
              response &&
              (response.data.data !== null || response.data.data !== undefined)
            ) {
              this.datalist = response.data.data;
              // this.Alldata = response.data.data;
              this.total_datalist = response.data.total.toLocaleString();
              this.amount_list = response.data.sum_amount.toLocaleString();
              this.count_list = response.data.count.toLocaleString();
              this.page_total = response.data.count_page;
              this.datalist.forEach((element) => {
                element.start_date = moment(element.start_date).format(
                  "YYYY-MM-DD"
                );

                element.end_date = moment(element.end_date).format(
                  "YYYY-MM-DD"
                );

                element.due_date = moment(element.due_date).format(
                  "YYYY-MM-DD"
                );
                element.date_bill = moment(element.date_bill).format(
                  "YYYY-MM-DD"
                );

                element.confirm_date = moment(element.confirm_date).format(
                  "YYYY-MM-DD"
                );

                this.invoice_list = [];
                this.customer_name_list = [];
                this.customer_no_list = [];
                this.listfilter_data("", "invoice_no");
                this.listfilter_data("", "customer_name");
              });
            } else {
              this.datalist = [];
              this.Alldata = [];
              this.total_datalist = 0;
              this.amount_list = 0;
              this.count_list = 0;
              this.page_total = 1;
              // this.datalist.forEach((element) => {
              //   element.due_date = moment(element.due_date).format("YYYY-MM-DD");

              //   element.confirm_date = moment(element.confirm_date).format(
              //     "YYYY-MM-DD"
              //   );

              this.invoice_list = [];
              this.customer_name_list = [];
              this.customer_no_list = [];
              this.listfilter_data("", "invoice_no");
              this.listfilter_data("", "customer_name");
              //  });
            }
          }
        });
      if (this.filterlist.length == 0) {
        // this.getInvoice();
        this.Init();
      }
    },
    OkFilterModal(name) {
      if (name == "start_date") {
        if (
          this.start_date[0] == "" ||
          (this.start_date[0] == null && this.start_date[1] == "") ||
          this.start_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-start_date"].hide();
          this.text_start_date =
            this.start_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.start_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.start_date, name);
        }
      }

      if (name == "end_date") {
        if (
          this.end_date[0] == "" ||
          (this.end_date[0] == null && this.end_date[1] == "") ||
          this.end_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-end_date"].hide();
          this.text_end_date =
            this.end_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.end_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.end_date, name);
        }
      }

      if (name == "date_bill") {
        if (
          this.date_bill[0] == "" ||
          (this.date_bill[0] == null && this.due_date[1] == "") ||
          this.date_bill[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-date_bill"].hide();
          this.text_date_bill =
            this.date_bill[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.date_bill[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.date_bill, name);
        }
      }
      if (name == "due_date") {
        if (
          this.due_date[0] == "" ||
          (this.due_date[0] == null && this.due_date[1] == "") ||
          this.due_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-due_date"].hide();
          this.text_due_date =
            this.due_date[0]
              .split("-")
              .reverse()
              .join("/") +
            " - " +
            this.due_date[1]
              .split("-")
              .reverse()
              .join("/");
          this.filter(this.due_date, name);
        }
      }

      if (name == "confirm_date") {
        if (
          this.confirm_date[0] == "" ||
          (this.confirm_date[0] == null && this.confirm_date[1] == "") ||
          this.confirm_date[1] == null
        ) {
          alert("กรุณาเลือกช่วงวันที่ให้ครบ");
        } else {
          this.$refs["my-modal-confirm_date"].hide();
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
      }
    },
    blankModal(name) {
      if (name == "start_date") {
        this.$refs["my-modal-start_date"].hide();
        this.start_date = ["0000-00-00"];
        this.text_start_date = "[blank]";
        this.filter(this.start_date, name);
      }

      if (name == "end_date") {
        this.$refs["my-modal-end_date"].hide();
        this.end_date = ["0000-00-00"];
        this.text_end_date = "[blank]";
        this.filter(this.end_date, name);
      }
      if (name == "date_bill") {
        this.$refs["my-modal-date_bill"].hide();
        this.date_bill = ["0000-00-00"];
        this.text_date_bill = "[blank]";
        this.filter(this.date_bill, name);
      }

      if (name == "due_date") {
        this.$refs["my-modal-due_date"].hide();
        this.due_date = ["0000-00-00"];
        this.text_due_date = "[blank]";
        this.filter(this.due_date, name);
      }

      if (name == "confirm_date") {
        this.$refs["my-modal-confirm_date"].hide();
        this.confirm_date = ["0000-00-00"];
        this.text_confirm_date = "[blank]";
        this.filter(this.confirm_date, name);
      }
    },
    Add_column() {
      this.column_select = this.list_column;

      var addColumn = {
        invoice_no: true,
        customer_name: false,
        customer_no: false,
        amount: false,
        date_bill: false,
        confirm_date: false,
        end_date: false,
        factoring: false,
        paid: false,
        payment_type: false,
        re_check: false,
        remark_warroom: false,
        start_date: false,
        current_back_log: false,
        due_date: false,
      };

      for (let index = 0; index < this.column_name.length; index++) {
        if (this.column_name[index].value == "amount") {
          addColumn.amount = this.column_name[index].show;
        }
        if (this.column_name[index].value == "current_back_log") {
          addColumn.current_back_log = this.column_name[index].show;
        }
        if (this.column_name[index].value == "customer_name") {
          addColumn.customer_name = this.column_name[index].show;
        }

        if (this.column_name[index].value == "customer_no") {
          addColumn.customer_no = this.column_name[index].show;
        }

        if (this.column_name[index].value == "factoring") {
          addColumn.factoring = this.column_name[index].show;
        }

        if (this.column_name[index].value == "date_bill") {
          addColumn.date_bill = this.column_name[index].show;
        }

        if (this.column_name[index].value == "due_date") {
          addColumn.due_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "confirm_date") {
          addColumn.confirm_date = this.column_name[index].show;
        }

        if (this.column_name[index].value == "payment_type") {
          addColumn.payment_type = this.column_name[index].show;
        }

        if (this.column_name[index].value == "paid") {
          addColumn.paid = this.column_name[index].show;
        }

        if (this.column_name[index].value == "recheck") {
          addColumn.re_check = this.column_name[index].show;
        }

        if (this.column_name[index].value == "remark_warroom") {
          addColumn.remark_warroom = this.column_name[index].show;
        }
        if (this.column_name[index].value == "start_date") {
          addColumn.start_date = this.column_name[index].show;
        }
        if (this.column_name[index].value == "end_date") {
          addColumn.end_date = this.column_name[index].show;
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
        .post(
          process.env.VUE_APP_API + "/setting/columns/plan",
          addColumn,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = false;
            this.setting_column();
          }
        });
    },
    cancel_colunm() {
      // this.show_column = [];
      // this.column_select = [];
      // for (let index = 0; index < this.headers.length; index++) {
      //   this.show_column.push(this.headers[index]);
      //   this.column_select.push(this.headers[index]);
      // }
      // this.list_column = [];
      // for (let index = 0; index < this.headers.length; index++) {
      //   this.list_column.push(this.headers[index]);
      // }
      // // this.list_column = this.headers;
      // this.show_column = this.list_column;
      // this.column_select = this.list_column;
      // this.column_name.forEach((element) => {
      //   element.show = true;
      // });
      this.setting_column();
    },
    select_column(column, item) {
      if (column == false) {
        for (let index = 0; index < this.show_column.length; index++) {
          if (item.name == this.show_column[index].text) {
            this.show_column.splice(index, 1);
          }
        }
      } else if (column == true) {
        for (let index = 0; index < this.headers.length; index++) {
          if (item.name == this.headers[index].text) {
            this.show_column.splice(index, 0, this.headers[index]);
          }
        }
      }

      this.list_column = [];

      for (let j = 0; j < this.headers.length; j++) {
        for (let g = 0; g < this.show_column.length; g++) {
          if (this.headers[j].text == this.show_column[g].text) {
            this.list_column.push(this.headers[j]);
          }
        }
      }
    },
    getColor(data) {
      if (data == "BackLog") {
        return "#0055AD";
        // #0055AD
      } else {
        return "#229DAB";
      }
    },
    header_select() {
      //  this.show_column = []
    },
    calculateAmount(data) {
      return data.toLocaleString();
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    Init_upload() {
      this.finish = true;
      this.upload_disable = false;
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.axios.get(process.env.VUE_APP_API + "/file", headers).then(
        (response) => {
          if (response.data.data !== null) {
            this.data_file = response.data.data;
            if (this.data_file !== null && this.data_file[0].check == false) {
              this.upload_disable = true;
            }
          } else {
            this.upload_disable = true;
            this.data_file = [];
          }
        },
        (error) => {
          if (error) {
            this.$router.push("/login");
          }
        }
      );
    },
    close_upload() {
      this.dialog_upload = false;
      this.removeFile();
    },
    OK_upload() {
      this.dialog_upload = false;
      this.finish = false;
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
          "Content-Type": "multipart/form-data",
        },
      };
      if (this.file.name && this.file.size != 0) {
        let data = new FormData();
        data.append("file", this.file);

        this.axios
          .post(process.env.VUE_APP_API + "/file/upload", data, headers)
          .then(
            (response) => {
              if (response) {
                this.finish = true;

                this.dialog_upload = false;
                Swal.fire({
                  icon: "success",
                  title: "Upload file เรียบร้อยแล้ว",
                  showConfirmButton: false,
                  timer: 2500,
                });
                setTimeout(() => {
                  this.removeFile();
                }, 1000);
              }
            },
            (error) => {
              if (error) {
                alert("Format ข้อมูลไม่ตรงกับในระบบ กรุณาตรวจสอบข้อมูล");
                this.finish = true;

                this.dialog_upload = false;
                setTimeout(() => {
                  this.removeFile();
                }, 1000);
              }
            }
          );
      } else {
        alert("กรุณาเลือกประเภทไฟล์ข้อมูลให้ถูกต้อง");
        this.finish = true;
        this.dialog_upload = true;
      }
    },

    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFile(files[0]);
    },
    createFile(file) {
      if (
        !file.type.match(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.*"
        )
      ) {
        alert("กรุณาเลือกไฟล์ให้ตรงกับ Extension ข้อมูล");
        this.dragging = false;
        return;
      }
      this.file = file;
      this.extension = "Excel";
      this.dragging = false;
    },
    removeFile() {
      this.file = {
        name: "",
        size: 0,
      };
      this.extension = "";
    },
    refreshData() {
      this.finish = false;
      this.search = "";
      this.customer_no_blank = false;
      this.amount_blank = false;
      this.remark_warroom_blank = false;
      this.Init();
    },
    Init() {
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

      this.datalist = [];
      this.Alldata = [];
      this.axios
        .get(
          process.env.VUE_APP_API +
            "/plan?size=" +
            this.item_per_page +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          this.text_due_date = null;
          this.text_confirm_date = null;
          this.text_date_bill = null;
          this.text_start_date = null;
          this.text_end_date = null;

          this.due_date_range.startDate = null;
          this.due_date_range.endDate = null;

          this.confirm_date_range.startDate = null;
          this.confirm_date_range.endDate = null;

          this.date_bill_range.startDate = null;
          this.date_bill_range.endDate = null;

          this.start_date_range.startDate = null;
          this.start_date_range.endDate = null;

          this.end_date_range.startDate = null;
          this.end_date_range.endDate = null;

          this.amount = null;
          this.confirm_date = [null, null];
          this.current_back_log = null;
          this.customer_name = null;
          this.customer_no = null;
          this.date_bill = [null, null];
          this.due_date = [null, null];
          this.factoring = null;
          this.invoice_no = null;
          this.paid = null;
          this.payment_type = null;
          this.re_check = null;
          this.remark_warroom = null;
          this.filterlist = [];

          if (
            response &&
            (response.data.data !== null || response.data.data !== undefined)
          ) {
            this.datalist = response.data.data;
            this.Alldata = response.data.data;
            this.total_datalist = response.data.total.toLocaleString();
            this.amount_list = response.data.sum_amount.toLocaleString();
            this.count_list = response.data.count.toLocaleString();
            this.page_total = response.data.count_page;
            this.datalist.forEach((element) => {
              element.due_date = moment(element.due_date).format("YYYY-MM-DD");
              element.start_date = moment(element.start_date).format(
                "YYYY-MM-DD"
              );
              element.end_date = moment(element.end_date).format("YYYY-MM-DD");

              element.date_bill = moment(element.date_bill).format(
                "YYYY-MM-DD"
              );

              element.confirm_date = moment(element.confirm_date).format(
                "YYYY-MM-DD"
              );

              this.invoice_list = [];
              this.customer_name_list = [];
              this.customer_no_list = [];
              this.listfilter_data("", "invoice_no");
              this.listfilter_data("", "customer_name");
              this.finish = true;
            });
          } else {
            this.datalist = [];
            this.Alldata = [];
            this.total_datalist = 0;
            this.amount_list = 0;
            this.count_list = 0;
            this.page_total = 1;
            // this.datalist.forEach((element) => {
            //   element.due_date = moment(element.due_date).format("YYYY-MM-DD");

            //   element.confirm_date = moment(element.confirm_date).format(
            //     "YYYY-MM-DD"
            //   );

            this.invoice_list = [];
            this.customer_name_list = [];
            this.customer_no_list = [];
            this.listfilter_data("", "invoice_no");
            this.listfilter_data("", "customer_name");
            this.finish = true;
            //  });
          }
        })
        .catch((error) => {
          if (error) {
            this.finish = true;
            this.$router.push("/invoice");
          }
        });
    },
    filter(filter, key) {
      this.AllFile = "";
      this.blank = [];

      var check_key = false;

      if (filter !== undefined) {
        for (let index = 0; index < this.filterlist.length; index++) {
          if (key == this.filterlist[index].key) {
            check_key = true;
          }
        }
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
        } else {
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
      } else {
        for (let index = 0; index < this.filterlist.length; index++) {
          if (key == this.filterlist[index].key) {
            this.filterlist.splice(index, 1);
          }
        }
      }

      for (let index = 0; index < this.filterlist.length; index++) {
        if (this.filterlist[index].value.length == 0) {
          this.filterlist.splice(index, 1);
        }
      }

      if (this.filterlist.length == 1) {
        if (
          this.filterlist[0].value == "" ||
          this.filterlist[0].value == undefined ||
          this.filterlist[0].value == null ||
          this.filterlist[0].value == 0
        )
          this.filterlist.splice(0, 1);
      }

      for (let index = 0; index < this.filterlist.length; index++) {
        if (this.filterlist[index].key == "factoring") {
          for (let f = 0; f < this.filterlist[index].value.length; f++) {
            if (this.filterlist[index].value[f] == "Yes") {
              this.filterlist[index].value[f] = "true";
            }
            if (this.filterlist[index].value[f] == "No") {
              this.filterlist[index].value[f] = "false";
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
      let body = {
        page: Number(this.page),
        size: Number(this.item_per_page),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/plan/filter", body, headers_filter)
        .then((response) => {
          if (response) {
            this.finish = true;
            if (
              response &&
              (response.data.data !== null || response.data.data !== undefined)
            ) {
              this.datalist = response.data.data;
              // this.Alldata = response.data.data;
              this.total_datalist = response.data.total.toLocaleString();
              this.amount_list = response.data.sum_amount.toLocaleString();
              this.count_list = response.data.count.toLocaleString();
              this.page_total = response.data.count_page;
              this.datalist.forEach((element) => {
                element.due_date = moment(element.due_date).format(
                  "YYYY-MM-DD"
                );
                element.start_date = moment(element.start_date).format(
                  "YYYY-MM-DD"
                );
                element.end_date = moment(element.end_date).format(
                  "YYYY-MM-DD"
                );
                element.date_bill = moment(element.date_bill).format(
                  "YYYY-MM-DD"
                );

                element.confirm_date = moment(element.confirm_date).format(
                  "YYYY-MM-DD"
                );

                this.invoice_list = [];
                this.customer_name_list = [];
                this.customer_no_list = [];
                this.listfilter_data("", "invoice_no");
                this.listfilter_data("", "customer_name");
              });
            } else {
              this.datalist = [];
              this.Alldata = [];
              this.total_datalist = 0;
              this.amount_list = 0;
              this.count_list = 0;
              this.page_total = 1;
              // this.datalist.forEach((element) => {
              //   element.due_date = moment(element.due_date).format("YYYY-MM-DD");

              //   element.confirm_date = moment(element.confirm_date).format(
              //     "YYYY-MM-DD"
              //   );

              this.invoice_list = [];
              this.customer_name_list = [];
              this.customer_no_list = [];
              this.listfilter_data("", "invoice_no");
              this.listfilter_data("", "customer_name");
              //  });
            }
          }
        });
      if (this.filterlist.length == 0) {
        // this.getInvoice();
        this.Init();
      }
    },
    blank_checkbox(name) {
      if (name == "customer_no") {
        if (this.customer_no_blank == true) {
          this.customer_no = "[blank]";
          this.filter("[blank]", "customer_no");
        } else {
          this.customer_no = "";
          this.filter("", "customer_no");
        }
      }
      if (name == "amount") {
        if (this.amount_blank == true) {
          this.amount = "[blank]";
          this.filter("[blank]", "amount");
        } else {
          this.amount = "";
          this.filter("", "amount");
        }
      }

      if (name == "remark_warroom") {
        if (this.remark_warroom_blank == true) {
          this.remark_warroom = "[blank]";
          this.filter("[blank]", "remark_warroom");
        } else {
          this.remark_warroom = "";
          this.filter("", "remark_warroom");
        }
      }
    },

    listfilter_data(data, name) {
      if (this.Alldata !== null) {
        if (name == "invoice_no") {
          var invoice_no = [];
          if (invoice_no.includes(["blank"]) == false) {
            invoice_no.push("[blank]");
          }
          this.Alldata.forEach((element) => {
            if (element.invoice_no !== "" || element.invoice_no !== undefined) {
              invoice_no.push(element.invoice_no);
            }
          });
          this.invoice_list = invoice_no;
          return invoice_no;
        }
        if (name == "customer_name") {
          var customer_name = [];
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
          this.customer_name_list = customer_name;
          return customer_name;
        }
        if (name == "customer_no") {
          var customer_no = [];
          if (customer_no.includes(["blank"]) == false) {
            customer_no.push("[blank]");
          }
          this.Alldata.forEach((element) => {
            if (
              element.customer_no !== "" ||
              element.customer_no !== undefined
            ) {
              customer_no.push(element.customer_no);
            }
          });
          this.customer_no_list = customer_no;
          return customer_no;
        }
      }
    },
    select(e, item) {
      console.log(e,item);
    },
    clearDate(name, item) {
      if (name == "date_bill") {
        item.date_bill = "0001-01-01";
      }
      if (name == "due_date") {
        item.due_date = "0001-01-01";
      }
      if (name == "confirm_date") {
        item.confirm_date = "0001-01-01";
      }

      this.select("", item);
    },
    set_default(item, name) {
      if (name == "confirm_date") {
        this.confirm_date_dialog.confirm_date = moment(new Date()).format(
          "YYYY-MM-DD"
        );
        // this.select("", item);
        return this.confirm_date_dialog.confirm_date;
      }

      if (name == "due_date") {
        this.due_date_dialog.due_date = moment(new Date()).format("YYYY-MM-DD");
        // this.select("", item);
        return this.due_date_dialog.due_date;
      }
    },
    return_confirm_date(item) {
      return moment(item).format("DD/MM/YYYY");
    },
    openconfirm(item, name) {
      if (name == "due_date") {
        this.dialog_due = true;
        this.due_date_dialog = item;
      }

      if (name == "confirm_date") {
        this.dialog_open = true;
        this.confirm_date_dialog = item;
      }
    },
    ok_confirm_date() {
      this.dialog_open = false;
      this.select("", this.confirm_date_dialog);
      //  return moment(this.confirm_date_dialog.confirm_date).format("YYYY-MM-DD")
    },
    close_confirm() {
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
        .get(process.env.VUE_APP_API + "/plan", headers)
        .then((response) => {
          this.datalist = response.data.data;
          this.total_datalist = response.data.total.toLocaleString();
          this.amount_list = response.data.sum_amount.toLocaleString();
          this.count_list = response.data.count.toLocaleString();
          this.page_total = response.data.count_page;

          this.dialog_open = false;
        });
    },

    ok_due_date() {
      this.dialog_due = false;
      this.select("", this.due_date_dialog);
      //  return moment(this.confirm_date_dialog.confirm_date).format("YYYY-MM-DD")
    },
    close_due_date() {
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
        .get(process.env.VUE_APP_API + "/plan", headers)
        .then((response) => {
          this.datalist = response.data.data;
          this.total_datalist = response.data.total.toLocaleString();
          this.amount_list = response.data.sum_amount.toLocaleString();
          this.count_list = response.data.count.toLocaleString();
          this.page_total = response.data.count_page;
          this.dialog_due = false;
        });
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

.font-text-alert {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-start-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-end-datel___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-date-bill___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-confirm-date___BV_modal_title_.modal-title {
  font-family: "Bai_Jamjuree" !important;
}
h5#modal-center-due-date___BV_modal_title_.modal-title {
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
// ==================================Dropzone================================//
.dropZone {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975a0;
}

.dropZone-info {
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5c5c5c;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
// =============================End Dropzone================================//

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
  font-size: 13px;
}

th.text-start.invoice_detail.sortable {
  position: sticky;
  left: 56px !important;
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

.blank {
  position: sticky;
  width: 56px;
  left: 0;
  top: auto;
  z-index: 1 !important;
  background-color: white;
  // border-right: 1px solid #cccccc;
  background: linear-gradient(
    90deg,
    rgba(253, 253, 253, 1) 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
}
::v-deep.sticky-header {
  position: sticky;
  top: var(--toolbarHeight);
}

::v-deep.v-data-table__wrapper {
  overflow: unset;
}
.fixed-detail {
  position: sticky !important;
  left: 56px !important;
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
#modal_customer {
  th.text-start {
    background-color: #ececec !important;
  }
  th.text-center {
    background-color: #ececec !important;
  }
  th.text-left {
    background-color: #ececec !important;
  }
}
#detail_plan {
  th.text-start {
    background-color: #ececec !important;
  }
  th.text-center {
    background-color: #ececec !important;
  }
  th.text-left {
    background-color: #ececec !important;
  }
  th.text-start:first-child {
    position: sticky;
    left: 0;
    z-index: 5 !important;
    font-size: 13px;
  }
  td.text-start:first-child {
    position: sticky !important;
    width: 20px !important;
    left: 0;

    top: auto;
    z-index: 2 !important;
    width: 10px;
    font-size: 13px;
  }

  tbody {
    td:not(.fixed_invoice_detail) {
      z-index: 0;
      font-size: 13px;
    }
    td.text-start {
      font-size: 13px;
      top: auto !important;
      z-index: 2 !important;
      position: sticky !important;
      left: 56px;
      top: auto;
      background-color: white;
      // border-right: 1px solid #cccccc;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
    td.text-center {
      font-size: 13px;
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
      font-size: 13px;
      position: sticky !important;
      width: 200px !important;
      left: 0 !important;
      z-index: 2 !important;
      // border-right: none !important;
      // border-right: 1px solid rgb(190, 190, 190);
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99%,
        rgba(101, 101, 101, 1) 100%
      ) !important;
    }
  }
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
  z-index: 10;
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
  font-size: 13px;
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
#filterdetatil{
.v-select__slot {
  position: relative;
  align-items: center;
  display: flex;
  max-width: 100%;
  min-width: 0;
  width: 100%;
  border: 1px solid #cecece;
  height: 100% !important;
  margin-top: 10px;
  min-height: 48px !important;
}
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
