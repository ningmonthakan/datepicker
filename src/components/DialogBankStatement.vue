<template>
  <v-container>
    <v-dialog
      scrollable
      :value="bank_dialog"
      @input="close"
      max-width="850px"
      max-height="270px"
      style="z-index: 1002 !important"
      content-class="vdialognew"
      id="modal_invoice_preview"
    >
      <v-card>
        <v-card-title
          class="text-h5 gray lighten-2"
          style="padding-bottom: 0px"
        >
          <div
            style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                "
            class="font-text"
          >
            <div>Bank Statement ({{ item_bank.length }})</div>

            <div
              class="d-flex"
              style="
                  padding-left: 15px;
                  align-items: center;
                  justify-content: center;
                  width: 400;
                  "
            >
              <div style="width: 200px; font-size: 14px">
                ประเภทการชำระ :
              </div>
              <select
                class="style-chooser form-control"
                v-model="select_type_bank"
              >
                <option value=""></option>
                <option value="Transfer">Transfer</option>
                <option value="CHQ">CHQ</option>
              </select>
            </div>
          </div>
        </v-card-title>

        <v-card-text style="padding: 0 24px 0px">
          <v-text-field
            v-model="search_bank_statement"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-data-table
            class="mt-2 mb-1 font-text"
            :headers="headers_bank_statement"
            :search="search_bank_statement"
            :items="item_bank"
            :items-per-page="10"
            id="selected_list_table_r"
            height="270"
            fixed-header
            item-key="invoice_no"
          >
          </v-data-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close()"
          >
            close
          </v-btn>
          <v-btn color="primary" 
          :disabled="select_type_bank == ''"
          @click="detail_bank()"
          >
            Detail
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <matching-dialog
      :payment_type="payment_matching_type"
    />
  </v-container>
</template>

<script>
import eventBus from "../event-bus";
import MatchingDialog from "./MatchingDialog.vue"
export default {
  props: ['item_bank'],
  components: {
    "matching-dialog": MatchingDialog
  },
  data: () => ({
    select_type_bank: "",
    search_bank_statement:'',
    selected_list: [],
    bank_dialog: false,
    headers_bank_statement: [
      {
        text: "Invoice No",
        align: "start",
        sortable: false,
        value: "invoice_no",
        width: "200px",
      },
      {
        text: "Customer No",
        align: "start",
        value: "customer_no",
        sortable: false,
        width: "150px",
      },
      {
        text: "Customer Name",
        align: "start",
        value: "customer_name",
        sortable: false,
        width: "250px",
      },
      {
        text: "CreditNote No",
        align: "start",
        value: "cn_number",
        sortable: false,
        width: "150px",
      },
      {
        text: "Receipt No",
        align: "left",
        value: "receipt_number",
        sortable: false,
        width: "150px",
      },
    ],
    open_matching_dialog: false,
    payment_matching_type: ''
  }),
  created() {},
  mounted(){
    eventBus.$on('openBankDialog',this.open)
  },
  methods: {
    close() {
      this.$emit('close_bank_dialog')
      this.select_type_bank = ""
      this.bank_dialog = false
    },
    beforeDestroy() {
      this.$off('openBankDialog')
    },
    open(){
      this.bank_dialog = true
      // this.$on('openBankDialog')
    },
    detail_bank(){
      // console.log("ประเภทการชำระ : ",this.select_type_bank)
      // console.log("data : " ,this.item_bank)
      // this.$emit('close_bank_dialog')
      this.bank_dialog = false
      eventBus.$emit('openMatchingDialog',this.item_bank , this.select_type_bank)
      this.payment_matching_type = this.select_type_bank
      this.select_type_bank = ""
    },
  },
};
</script>
