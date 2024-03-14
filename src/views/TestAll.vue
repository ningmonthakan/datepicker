<template>
  <div>
  <!-- ================================= Loading =================================== -->
    <!-- <div
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
    </div> -->
    <!-- ================================= End Loading  ================================== -->
    <div class="text_d">
      <v-row>
        <v-col
          cols="12"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <h3 style="font-weight: 700">Invoice Dashboard</h3>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <v-card style="padding: 1px;">
            <v-card-title class="card-title" style="display: block">
              <div
                class="d-flex"
                style="align-items: center; justify-content: space-between"
              >
                <v-icon
                  class="icon-invoice"
                  style="
                    font-size: 28px;
                    padding: 5px;
                    color: white;
                    background-color: #14a1c0;
                  "
                  >mdi-file-alert-outline</v-icon
                >
                <label
                  class="text-label"
                  style="font-size: 1.2vw; text-align: right"
                  >Count Invoice</label
                >
              </div>
              <v-spacer></v-spacer>
              <div
                class="text-number"
                style="font-size: 1.2vw; text-align: right; font-weight: 700"
              >
                {{ count_invoice }}
              </div>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="3" sm="6">
          <v-card style="padding: 1px">
            <v-card-title class="card-title" style="display: block">
              <div
                class="d-flex"
                style="align-items: center; justify-content: space-between"
              >
                <v-icon
                  class="icon-invoice"
                  style="
                    font-size: 28px;
                    padding: 5px;
                    color: white;
                    background-color: #14a1c0;
                  "
                  >mdi-file-multiple-outline</v-icon
                >
                <label
                  class="text-label"
                  style="font-size: 1.2vw; text-align: right"
                  >Total Invoice</label
                >
              </div>
              <v-spacer></v-spacer>
              <div
                class="text-number"
                style="font-size: 1.2vw; text-align: right; font-weight: 700"
              >
                {{ total_count }}
              </div>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="3" sm="6">
          <v-card style="padding: 1px">
            <v-card-title class="card-title" style="display: block">
              <div
                class="d-flex"
                style="align-items: center; justify-content: space-between"
              >
                <v-icon
                  class="icon-invoice"
                  style="
                    font-size: 28px;
                    padding: 5px;
                    color: white;
                    background-color: #22cba1;
                  "
                  >mdi-file-table-box-outline</v-icon
                >
                <label
                  class="text-label"
                  style="font-size: 1.2vw; text-align: right"
                  >Amount</label
                >
              </div>
              <v-spacer></v-spacer>
              <div
                class="text-number"
                style="font-size: 1.2vw; text-align: right; font-weight: 700"
              >
                {{ sum_amount }}
              </div>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="3" sm="6">
          <v-card style="padding: 1px">
            <v-card-title class="card-title" style="display: block">
              <div
                class="d-flex"
                style="align-items: center; justify-content: space-between"
              >
                <v-icon
                  class="icon-invoice"
                  style="
                    font-size: 28px;
                    padding: 5px;
                    color: white;
                    background-color: #22cba1;
                  "
                  >mdi-file-table-box-multiple-outline</v-icon
                >
                <label
                  class="text-label"
                  style="font-size: 1.2vw; text-align: right"
                  >Total Amount</label
                >
              </div>
              <v-spacer></v-spacer>
              <div
                class="text-number"
                style="font-size: 1.2vw; text-align: right; font-weight: 700"
              >
                {{ total_amount }}
              </div>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title>
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
                style="font-size: 12px"
              >
                Refresh:<v-icon black style="font-size: 16px"
                  >mdi-refresh</v-icon
                >
              </button>              
              <v-spacer></v-spacer>
              <v-form
                @submit.prevent="searchWord()"
                style="display: flex; align-items: center"
                class="search-area"
              >
                <v-text-field 
                  class="textfield-search"
                  v-model="search"
                  label="Invoice number, Cus No, Cus Name, INET/JV"
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
                Clear All</v-btn
              >   
                 
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    finish: false,
  }),
  editbycustomerno() {
      console.log("dialog_edit_cus_no");
      this.editedIndex = -1;
      this.dialog_edit_cus_no = true;
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
.text_d {
  font-family: "Bai_Jamjuree" !important;
}
@media only screen and (max-width: 575px) {
 .textfield-search{
   width: auto !important;
 }
button.screen{
  display: none;
}
}
</style>
