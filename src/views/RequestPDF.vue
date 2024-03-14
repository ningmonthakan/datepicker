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
          <h3 style="font-weight: 700" class="font_style">
            Request ส่งเอกสารใบแจ้งหนี้/ใบเสร็จ
          </h3>
          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title style="padding-bottom: 2px"> </v-card-title>
            <div
              class="d-flex"
              style="padding-right: 15px; align-items: center"
            >
              <div
                class="d-flex"
                style="
                  padding-left: 15px;

                  align-items: center;
                  justify-content: center;
                  width: 220px;
                "
              >
                <label style="width: 200px">เลือกเอกสาร :</label>
                <select
                  class="style-chooser form-control"
                  v-model="select_type"
                >
                  <option value=""></option>
                  <option value="ใบแจ้งหนี้">ใบแจ้งหนี้</option>
                  <option value="ใบเสร็จ">ใบเสร็จ</option>
                </select>
              </div>
              <v-form
                @submit.prevent="SendRequest()"
                class="d-flex"
                style="
                  padding-left: 15px;
                  align-items: center;
                  justify-content: center;
                "
              >
                <input
                  :disabled="select_type == ''"
                  class="form-control"
                  type="text"
                  style="margin-left: 15px; width: 300px; margin-right: 10px"
                  @change="file_preview()"
                  id="input_preview"
                  v-model="invoice_no"
                  placeholder="Invoice Number"
                />

                <v-btn
                  color="primary darken-1"
                  outlined
                  :disabled="select_type == ''"
                  @click="SendRequest()"
                >
                  Send
                </v-btn>
              </v-form>
              &nbsp;
              <v-btn
                color="error darken-1"
                outlined
                @click="clear_file()"
                :disabled="select_type == ''"
              >
                clear
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn color="success darken-1" outlined @click="preview()">
                Preview
              </v-btn>
            </div>

            <v-card-text>
              <vue-pdf-app
                v-bind:style="{
                  display: pdf == '' ? 'none' : '',
                }"
                style="height: 100vh; z-index: 5"
                :pdf="pdf"
                :config="config"
              ></vue-pdf-app>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// import moment from "moment";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
import "carbon-components/css/carbon-components.css";
// import 'carbon-components/css/carbon-components.css';
// import { BModal, VBModal } from "bootstrap-vue";
import Swal from "sweetalert2";

// import this to use default icons for buttons

export default {
  components: {},
  // directives: { "b-modal": VBModal },
  data: () => ({
    config: {
      toolbar: {
        toolbarViewerLeft: { findbar: false },
      },
    },
    pdf: "",
    finish: false,
    select_type: "",
    invoice_no: "",
  }),
  created() {
    // this.finish = true;

    this.Init();
  },
  watch: {},
  computed: {},
  methods: {
    SendRequest() {
      console.log("event::", this.select_type);

      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      if (this.select_type == "") {
        this.invoice_no = "";
      } else if (this.select_type == "ใบเสร็จ") {
        this.axios
          .post(
            process.env.VUE_APP_API +
              "/getinvoicestatus/receipt?invoice_no=" +
              this.invoice_no,
            headers
          )
          .then((response) => {
            console.log("receipt:", response);
            if (response.data.message == "Success") {
              Swal.fire({
                icon: "success",
                title: "ส่ง request ใบเสร็จเรียบร้อย",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                this.clear_file();
              });
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถส่ง request ได้",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });
      } else if (this.select_type == "ใบแจ้งหนี้") {
        this.axios
          .post(
            process.env.VUE_APP_API +
              "/getinvoicestatus/billing?invoice_no=" +
              this.invoice_no,
            headers
          )
          .then((response) => {
            console.log("billing", response);
            if (response.data.message == "Success") {
              Swal.fire({
                icon: "success",
                title: "ส่ง request ใบแจ้งหนี้เรียบร้อย",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                this.clear_file();
              });
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถส่ง request ได้",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });
      }
    },
    file_preview() {
      console.log("invoice_no::", this.invoice_no);
    },
    clear_file() {
      this.select_type = "";
      this.invoice_no = "";
    },
    Init() {
      this.finish = true;
    },
    preview() {
      console.log("preview");
      this.$router.push("/preview");
    },
  },
};
</script>
<style lang="scss" >
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

.font_style {
  font-family: "Bai_Jamjuree" !important;
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
input.form-control {
  font-family: "Bai_Jamjuree" !important;
  padding-left: 10px;
  border: 1px solid rgb(221, 221, 221);
  height: 48px;
  border-radius: 1px;
  font-size: 13px !important;
}
.style-chooser {
  border: 1px solid rgb(224, 224, 224);
  border-radius: 1px;
  width: 100%;
  height: 48px;
  padding-left: 7px;
  cursor: pointer;
}
.pdf-app .toolbar {
  position: relative;
  left: 0;
  right: 0;
  z-index: 10;
  cursor: default;
}
.pdf-app #thumbnailView {
  padding: 10px 0px 0;
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
  animation-delay: 0.1s;
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
</style>