<template>
  <v-container>
    <v-dialog
      :value="dialog"
      @input="close"
      width="500"
    >
    <v-card>
        <v-card-title class="headline">
          {{ item.document_type}}
        </v-card-title>
        <v-card-text>
          <b>ประเภท:</b> {{ item.description_document }} <br>
          <b>ผู้ขอเบิก:</b> {{ item.title }}{{ item.first_name }} {{ item.last_name }} <br>
          <b>รหัสผนักงาน:</b> {{ item.employee_id }} <br>
          <b>เลขบัญชี:</b> {{ item.bank_code }} <br>
          <b>เบอร์โทรศัพท์:</b> {{ item.tel_no }} <br>
          <b>อีเมล:</b> {{ item.email }} <br>
          <b>รายการเบิก:</b> <br>
          <div class="mx-2" v-for="(item, index) in item.schedule" :key=index>
            <b>{{ index + 1 }}.</b> {{ item.schedule }} <br>
            <b>รายละเอียด:</b> {{ item.schedule_detail }} <br>
            <b>จำนวนเงิน:</b> {{ item.schedule_amount | numeral('0,0.00') }} บาท <br>
            <b>หมายเหตุ:</b> {{ item.remark}} <br>
            <b>วันที่เบิก:</b> {{ changformat(item.schedule_date) }}
          </div>
          <b>จำนวนทั้งหมดเงิน:</b> {{ item.amount | numeral('0,0.00') }} บาท <br>
          <b>สถานะเอกสาร:</b> &nbsp;
          <v-chip v-if=" item.status === 'approve' " color="success" outlined x-small>อนุมัติ</v-chip>
          <v-chip v-if=" item.status === 'waiting' " color="warning" outlined x-small>รออนุมัติ</v-chip>
          <v-chip v-if=" item.status === 'reject' " color="error" outlined x-small>ไม่อนุมัติ</v-chip>
          <br>
          <b>รายชื่อผู้อนุมัติ:</b> <br>
          <v-row v-for="(head, index) in item.document_detail" :key=index>
            <v-col cols="6" class="my-n3">
              {{ index }}. {{ head[0].head_title }}{{ head[0].head_first_name }} {{ head[0].head_last_name }}
            </v-col>
            <v-col cols="6" class="my-n3">
              สถานะ:  
              <v-chip v-if=" head[0].status === 'approve' " color="success" outlined x-small>อนุมัติ</v-chip>
              <v-chip v-if=" head[0].status === 'waiting' " color="warning" outlined x-small>รออนุมัติ</v-chip>
              <v-chip v-if=" head[0].status === 'reject' " color="error" outlined x-small>ไม่อนุมัติ</v-chip>
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
