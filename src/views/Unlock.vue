'<template>
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
          <h1>ปลด Lock เพื่อ Upload ข้อมูล</h1>

          <v-spacer></v-spacer>
          <!-- <v-btn
                color="primary"
                style="height: 40px; width: 150px; font-size: 12px"
              >
                Upload File
                <v-icon dark> mdi-checkbox-marked-circle </v-icon>
              </v-btn> -->
        </v-col>

        <!-- <v-col cols="6">
          <v-card dark color="teal" style="padding: 10px">
            <v-card-title style="display: block">
              Factoring
              <v-spacer></v-spacer>
              <label style="font-size: 1.2vw">123</label>
            </v-card-title>
          </v-card>
        </v-col> -->
        <!-- <v-col cols="6">
          <v-card color="success" dark style="padding: 10px">
            <v-card-title>
              <div style="display: block">
                Total
                <v-spacer></v-spacer>

                <label style="font-size: 1.2vw">123</label>
              </div>
            </v-card-title>
          </v-card>
        </v-col> -->

        <div style="text-align: right">Total : {{ total_datalist }}</div>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <!-- <v-form
                style="display: flex; align-items: center"
                class="search-area"
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
              </v-form> -->

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog_upload" width="500" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <button
                    class="btn btn-primary"
                    v-bind="attrs"
                    v-on="on"
                    style="height: 40px; width: 170px; font-size: 14px"
                    :disabled="disable_btn"
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
              </v-dialog>
            </v-card-title>

            <v-card-text>
              <!-- --------------------------------------table--------------------------------------------- -->
              <v-data-table
                :headers="header"
                :items="datalist"
                class="table_in_unlock"
                fixed-header
                height="500"
                id="unlock"
              >
                <template v-slot:[`item.created_at`]="{ item }">
                  <div class="d-flex">
                    {{ parseDate(item.created_at) }}
                    <div style="color: gray; padding-left: 5px">
                      เวลา: {{ timeConvert(item.created_at) }} น.
                    </div>
                  </div>
                </template>
                <template v-slot:[`item.check`]="{ item }">
                  <v-btn
                    :disabled="item.disabled == false"
                    v-if="item.check == false"
                    style="width: 100px; height: 30px"
                    @click="unlock(item)"
                    class="white--text"
                    color="error"
                    depressed
                  >
                    <v-icon small> mdi-lock </v-icon>
                    Lock
                  </v-btn>
                  <!-- :disabled="item.disabled == true" -->
                  <v-btn
                    :disabled="item.disabled == false"
                    v-if="item.check == true"
                    style="width: 100px; height: 30px"
                    @click="unlock(item)"
                    class="white--text"
                    color="primary"
                    depressed
                  >
                    <v-icon small> mdi-lock-open </v-icon>
                    Unlock
                  </v-btn>
                </template>

                <template v-slot:[`item.action`]="{ item }">
                  <button class="btn btn-link" @click="download_file(item)">
                    click
                  </button>
                </template>
              </v-data-table>
              <!-- --------------------------------------table--------------------------------------------- -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
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

const default_value = [
  {
    check: "",
    created_at: "",
    disabled: true,
    employee_id: "",
    first_name_th: "",
    last_name_th: "",
    month: "",
    nick_name_th: "",
    title_th: "",
    uid: "",
    updated_at: "",
    year: "",
  },
];

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    dialog_upload: false,
    search: "",
    finish: false,

    header: [
      {
        text: "รหัสพนักงาน",
        sortable: true,
        value: "employee_id",
        width: "180px",
        class: "unlock",
      },
      {
        text: "คำนำหน้า",
        value: "title_th",
        width: "100px",
        sortable: true,
        align: "left",
      },
      {
        text: "ชื่อ",
        value: "first_name_th",
        width: "250px",
        sortable: true,
        align: "left",
      },
      {
        text: "นามสกุล",
        value: "last_name_th",
        width: "300px",
        sortable: true,
        align: "left",
      },
      {
        text: "วันที่ Upload",
        value: "created_at",
        width: "200px",
        sortable: true,
        align: "center",
      },
      {
        text: "Download",
        value: "action",
        width: "120px",
        sortable: false,
        align: "center",
      },
      {
        text: "หมายเหตุ",
        value: "check",
        width: "150px",
        sortable: false,
        align: "center",
      },
    ],
    datalist: default_value,
    total_datalist: 0,
    file: {
      name: "",
      size: 0,
    },
    dragging: false,
    extension: "",
    upload_disable: false,
    disable_btn: true,
  }),
  created() {
    this.$router.push("/invoice");
    this.Init();
  },
  watch: {},
  computed: {},
  methods: {
    download_file(item) {
      var url =
        process.env.VUE_APP_API +
        "/file/" +
        encodeURIComponent(item.uid) +
        "?secret=" +
        encodeURIComponent(localStorage.getItem("resource_key"));
      encodeURIComponent;
      window.open(url);
    },
    parseDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "";
    },
    timeConvert(time) {
      return time ? moment(time).format("HH:mm") : "";
    },

    Init() {
      this.finish = false;
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

      this.axios
        .get(process.env.VUE_APP_API + "/file", headers)
        .then((response) => {
          if (response.data.data !== null) {
            this.datalist = response.data.data;
            this.total_datalist = response.data.total;
            this.finish = true;

            for (let index = 0; index < this.datalist.length; index++) {
              //  this.datalist[index].disabled = true
              if (index == 0) {
                this.datalist[index]["disabled"] = true;
              } else if (index !== 0) {
                this.datalist[index]["disabled"] = false;
              }
            }

            this.disable_btn = this.datalist[0].check;

          } else {
            this.datalist = [];
            this.total_datalist = 0;
            this.disable_btn = true;
            this.finish = true;
          }
        })
      .catch((error) => {
          if (error) {
            this.finish = true;
            this.$router.push("/invoice");
          }
        });
    },
    unlock(item) {
      var body = {
        file_uid: item.uid,
        unlock: !item.check,
      };
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      //  body{'file_uid' uid , 'unlock' boolean}

      this.axios
        .put(process.env.VUE_APP_API + "/file/unlock", body, headers)
        .then((response) => {
          if (response) {
            this.Init();
          }
        });
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
                this.Init();
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
  },
};
</script>

<style lang="scss" >
@font-face {
  font-family: "Prompt";
  src: url("~@/assets/Prompt/Prompt-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Prompt";
  src: url("~@/assets/Prompt/Prompt-Thin.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
}
.text-h5 {
  font-family: "Prompt" !important;
}
.font-text {
  font-family: "Prompt" !important;
}
.swal2-title {
  position: relative;
  font-family: "Prompt" !important;
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
}

th.text-start.unlock.sortable {
  position: sticky;
  left: 0px !important;
  z-index: 5 !important;
  padding-top: 14px;
  // background-color: rgb(203, 236, 199) !important;
  // border-right: 1px solid #cccccc;
  // background-color: rgb(168, 255, 214) !important;
  background: linear-gradient(
    90deg,
    rgb(203, 236, 199) 99%,
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
#unlock {
th.text-start:first-child {
  position: sticky;
  left: 0;
  z-index: 5 !important;
}
.blank {
  position: sticky;
  width: 5em;
  left: 0;
  top: auto;
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
  left: 0px !important;
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
    td.text-start {
      position: sticky !important;
      left: 0;
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
      position: sticky;
      width: 20px !important;
      left: 0;
      background: linear-gradient(
        90deg,
        rgb(255, 255, 255) 99%,
        rgb(143, 143, 143) 100%
      ) !important;
      // border-right: 1px solid gray !important;
      background-color: white;
      top: auto;
      z-index: 1;
      width: 10px;
    }
  }
}

.dialog_date {
  font-family: "Prompt" !important;
}
// =========================================
.dx-list-item-content {
  font-family: "Prompt" !important;
}
.dx-editor-cell .dx-texteditor .dx-texteditor-input {
  font-family: "Prompt" !important;
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
  font-family: "Prompt" !important;
}
#gridContainer {
  height: auto;
}
.container {
  // width: 100% !important;
  font-family: "Prompt" !important;
}
.v-card-title {
  font-family: "Prompt" !important;
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
  font-family: "Prompt";
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
.table_in_unlock {
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Prompt" !important;
  z-index: 10 !important;
}
table {
  position: relative !important;
}
th.text-start {
  background-color: rgb(203, 236, 199) !important;
}
th.text-center {
  background-color: rgb(203, 236, 199) !important;
}
th.text-left {
  background-color: rgb(203, 236, 199) !important;
}
td.text-center {
  // padding: 0 !important;
  height: 100% !important;
  height: 55px;
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
  background-color: rgb(203, 236, 199) !important;
}
tr {
  background-color: white !important;
}
th {
  font-size: 14px !important;
}
input.form-control {
  font-family: "Prompt" !important;
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
</style>'