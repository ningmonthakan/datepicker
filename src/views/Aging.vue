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
      <v-col
        cols="12"
        style="display: flex; align-items: center; justify-content: space-between"
      >
        <h3 class="header-text">Aging Dashboard</h3>
        <v-spacer></v-spacer>
        <div id="agin-select" class="d-flex" style="align-items: center">
          <div style="width: 80px">Type :</div>
          <select
            v-model="type"
            class="form-control"
            style="cursor: pointer"
            @change="select_type()"
          >
            <option value="INET" selected>INET</option>
            <option value="JV">JV</option>
          </select>
        </div>
      </v-col>
      <v-card>
        <v-card-text>
          <div style="display: flex; justify-content: space-between">
            <button class="btn refresh-btn" color="primary" @click="getAging()">
              Refresh:
              <v-icon black>mdi-refresh</v-icon>
            </button>
          </div>
          <div class="cover-table">
            <div class="table-invoice" style="position: relative">
              <v-data-table
                :headers="headers"
                :items="setAging"
                class="elevation-3"
                fixed-header
                hide-default-footer
                id="aging-table"
              >
                <template v-slot:[`item.cross`]="{ item }" class="invoice">
                  {{ item.cross }}
                </template>
                <template v-slot:[`item.total_curback`]="{ item }">
                  <b>{{ item.total_curback }}</b>
                </template>
                <template v-slot:[`item.total_bill`]="{ item }">
                  <b>{{ item.total_bill }}</b>
                </template>
              </v-data-table>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataAging: [],
      setAging: [],
      finish: false,
      headers: [
        {
          text: "",
          sortable: false,
          value: "cross",
          width: "180px",
          class: "invoice",
          fixed: true,
        },
        {
          text: "Current",
          value: "current",
          width: "247px",
          sortable: false,
          align: "center",
        },
        {
          text: "Backlog",
          value: "backlog",
          width: "247px",
          sortable: false,
          align: "center",
        },
         {
          text: "Blank",
          value: "blank",
          width: "247px",
          sortable: false,
          align: "center",
        },
        {
          text: "Total",
          value: "total_curback",
          width: "247px",
          sortable: false,
          align: "center",
        },
        {
          text: "ยังไม่วางบิล",
          value: "non_bill",
          width: "247px",
          sortable: false,
          align: "center",
        },
        {
          text: "วางบิลแล้ว",
          value: "bill",
          width: "247px",
          sortable: false,
          align: "center",
        },
        {
          text: "Total",
          value: "total_bill",
          width: "247px",
          sortable: false,
          align: "center",
        },
      ],
      type: "INET",
    };
  },
  created() {
    if (localStorage.getItem("acces_token")) {
      this.getAging();
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    select_type() {
      this.getAging();
    },
    getAging() {
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
        .get(process.env.VUE_APP_API + "/aging/summary/" + this.type, headers)
        .then((response) => {
          this.dataAging = response.data.data;
          this.setAging = [
            {
              cross: "จำนวนเงิน",
              current: this.dataAging.amount_current.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              }),
              backlog: this.dataAging.amount_backlog.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              }),
              blank: this.dataAging.amount_blank.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              }),
              non_bill: this.dataAging.amount_non_bill.toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              ),
              total_curback: this.dataAging.total_curback_amount.toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              ),
              bill: this.dataAging.amount_bill.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              }),
              total_bill: this.dataAging.total_bill_amount.toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              ),
            },
            {
              cross: "จำนวนลูกค้า",
              current: this.dataAging.customer_current.toLocaleString(),
              backlog: this.dataAging.customer_backlog.toLocaleString(),
              blank: this.dataAging.customer_blank.toLocaleString(),
              non_bill: this.dataAging.customer_non_bill.toLocaleString(),
              total_curback:
                this.dataAging.total_curback_customer.toLocaleString(),
              bill: this.dataAging.customer_bill.toLocaleString(),
              total_bill: this.dataAging.total_bill_customer.toLocaleString(),
            },
            {
              cross: "จำนวนใบแจ้งหนี้",
              current: this.dataAging.invoice_current.toLocaleString(),
              backlog: this.dataAging.invoice_backlog.toLocaleString(),
              blank: this.dataAging.invoice_blank.toLocaleString(),
              non_bill: this.dataAging.invoice_non_bill.toLocaleString(),
              total_curback:
                this.dataAging.total_curback_invoice.toLocaleString(),
              bill: this.dataAging.invoice_bill.toLocaleString(),
              total_bill: this.dataAging.total_bill_invoice.toLocaleString(),
            },
          ];
          this.finish = true;
        })
         .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
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

.header-text {
  font-size: 28px;
  font-family: "Bai_Jamjuree" !important;
  font-weight: 700;
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
#aging-table {
  textarea.form-control {
    resize: auto !important;
    overflow: hidden !important;
    max-height: 100000px !important;
  }

  th.text-start {
  background-color: #ececec !important;
      padding-top: 10px;
}
th.text-center {
  background-color: #ececec !important;
      padding-top: 10px;
}
th.text-left {
  background-color: #ececec !important;
      padding-top: 10px;
}

  th.text-start.invoice {
    position: sticky;
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

  th.text-start:first-child {
    background-color: rgb(203, 236, 199) !important;
    position: sticky;
    left: 0;
    z-index: 5 !important;
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
    b{
      font-weight: 600;
    }
    td.text-start {
      position: sticky !important;
      left: 56px;
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
      position: sticky !important;
      left: 0 !important;
      top: auto !important;
      z-index: 2 !important;
    }
    td:not(.fixed) {
      z-index: 0;
    }

    td.text-start:first-child {
      position: sticky !important;
      left: 0px;
      top: auto;
      z-index: 2 !important;
      background-color: rgb(248, 247, 173);
      // border-right: 1px solid #cccccc;
      background: linear-gradient(
        90deg,
        rgb(247, 246, 190) 99%,
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
</style>