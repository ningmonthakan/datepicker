<template>
  <v-container>
    <v-dialog
      :value="dialog"
      @input="close"
      width="500"
    >
    <v-card>
        <v-card-title class="headline">
          ใบเบิกค่ารักษาพยาบาล
        </v-card-title>

        <v-card-text>
          <b>ประเภท:</b> {{ item.description_document }} <br>
          <b>ผู้ขอเบิก:</b> {{ item.title }}{{ item.first_name }} {{ item.last_name }} <br>
          <b>รหัสผนักงาน:</b> {{ item.employee_id }} <br>
          <b>เลขบัญชี:</b> {{ item.bank_code }} <br>
          <b>เบอร์โทรศัพท์:</b> {{ item.tel_no }} <br>
          <b>อีเมล:</b> {{ item.email }} <br>
          <b>กลุ่มโรค:</b> {{ item.disease_name}} <br>
          <b>ประเภทผู้ป่วย:</b> {{ item.medical_type}} <br>
          <b>อาการผู้ป่วย:</b> {{ item.symptom}} <br>
          <b>วันที่รักษา:</b> {{ changformat(item.medical_date) }} <br>
          <b>วงเงินที่เบิกได้:</b> {{ item.reveal_amount | numeral('0,0.00') }} บาท <br>
          <b>จำนวนเงินที่เบิก:</b> {{ item.amount | numeral('0,0.00') }} บาท <br>
          <b>วันที่เบิก:</b> {{ changformat(item.schedule_date) }} <br>
          <b>เบิกให้กับ:</b> {{ item.remark }}  <br>
          <b>ชื่อคนที่ทำการเบิกให้:</b> {{ item.remark_title }}{{ item.remark_first_name }} {{ item.remark_last_name }} <br>
          <b>รายชื่อผู้อนุมัติ:</b> <br>
          <v-row v-for="(head, index) in item.medical_detail" :key=index>
            <v-col cols="6" class="my-n3">
              {{ index + 1 }}. {{ head.head_title }}{{ head.head_first_name }} {{ head.head_last_name }}
            </v-col>
            <v-col cols="6" class="my-n3">
              สถานะ:  
              <v-chip v-if=" head.status === 'approve' " color="success" outlined x-small>อนุมัติ</v-chip>
              <v-chip v-if=" head.status === 'waiting' " color="warning" outlined x-small>รออนุมัติ</v-chip>
              <v-chip v-if=" head.status === 'reject' " color="error" outlined x-small>ไม่อนุมัติ</v-chip>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
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
  props: ['dialog', 'item'],
  data: () => ({
    
  }),
  methods: {
    close () {
      this.$emit('close_dialog')
    },
     changformat (date) {
        let item_date = new Date(date)
        let day = ( '0' + item_date.getDate()).slice(-2)
        let month = ( '0' + (item_date.getMonth() + 1)).slice(-2)
        let year = item_date.getFullYear()
        return day + '/' + month + '/' + year
      },
  }
}
</script>
