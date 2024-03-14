<template>
  <v-container>
    <v-dialog
      :value="export_dialog"
      @input="close"
      width="500"
    >
    <v-card>
        <v-card-title class="headline">
         EXPORT
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
          <v-select
            v-model="company"
            label="ชื่อบริษัท"
            outlined
            :rules="[rules.company]"
            :items="company_list"
            item-text="name"
            return-object
          >
          </v-select>
          <v-row>
            <v-col>
              <v-menu
                ref="start_date_menu"
                v-model="start_date_menu"
                :close-on-content-click="false"
                :return-value.sync="start_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start_date"
                    :rules="[rules.start]"
                    label="วันเริ่มต้น"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="start_date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="start_date_menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.start_date_menu.save(start_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="end_date_menu"
                v-model="end_date_menu"
                :close-on-content-click="false"
                :return-value.sync="end_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="end_date"
                    :rules="[rules.end]"
                    label="วันสิ้นสุด"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="end_date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="end_date_menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.end_date_menu.save(end_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="export_medi()"
          >
            export
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close()"
          >
            ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ['export_dialog'],
  data: () => ({
    start_date_menu: false,
    start_date: null,
    end_date_menu: false,
    end_date: null,
    company: '',
    company_list: [],
    rules: {
      company: value => !!value || 'กรุณาเลือกบริษัท',
      start: value => !!value || 'กรุณาเลือกวันเริ่มต้น',
      end: value => !!value || 'กรุณาเลือกวันสิ้นสุด'
    },
    acces_token: '',
    account_id: '',
    secret: ''
  }),
  created () {
    this.acces_token = localStorage.getItem('acces_token')
    this.account_id = localStorage.getItem('account_id')
    this.secret = localStorage.getItem('secret')
    this.get_company()
  },
  methods: {
    get_company () {
      let headers = {
        headers: {
          Authorization: "Bearer " + this.acces_token + "," + this.secret
        }
      }
      this.axios.get(process.env.VUE_APP_API_2 + '/dashboard/medical/company', headers).then((response) => {
        this.company_list = response.data
      })
    },
    export_medi () {
      console.log(this.company)
      if(this.$refs.form.validate()) {
        let headers = {
          headers: {
            Authorization: "Bearer " + this.acces_token + "," + this.secret
          },
          responseType:"blob" 
        }
        this.axios.get(process.env.VUE_APP_API_2 + '/dashboard/medical/export?tax_no=' + this.company.tax_id + '&start_date=' + this.start_date + '&end_date=' + this.end_date, headers).then((response) => {
          const blob = new Blob([response.data], { type: response.data.type })
          const aEle = document.createElement('a') 
          const href = window.URL.createObjectURL(blob)
          aEle.href = href
          aEle.download = 'export_file'
          document.body.appendChild(aEle)
          aEle.click()
          document.body.removeChild(aEle)
          window.URL.revokeObjectURL(href)
        })
      }
    },
    close () {
      this.$refs.form.reset()
      this.$emit('close_export_dialog')
    },
  }
}
</script>
