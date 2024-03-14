<template>
  <div>
    <v-navigation-drawer
      width="228"
      clipped
      app
      :hide-overlay="true"
      v-model="drawer"
      style="z-index: 101"
    >
      <v-list class="text_d" flat dense rounded>
        <v-list-item-group color="primary">
          <!-- <div style="height: 10px"></div> -->
          <v-list-item
            link
            :to="'/invoice'"
          >
            <v-list-item-content>
              <v-list-item-title>Invoice</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
 
          
          <!--   <div style="height: 10px"></div>
       <v-list-item link :to="'/installment'">
            <v-list-item-content>
              <v-list-item-title>Billing</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <!-- <v-list-item 
            link :to="'/aging'"
            v-if="
              role_name != 'down_service'
            ">
            <v-list-item-content>
              <v-list-item-title>Aging</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <!-- <v-list-item
            link
            :to="'/loginvoice'"
            v-if="
              role_name != 'down_service' &&
                role_name != 'wait_down_service' &&
                role_name != 'viewer'
            "
          >
            <v-list-item-content>
              <v-list-item-title>Log Invoice</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-group >
            <!-- <template v-slot:activator :hide-overlay="true"> -->
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>หนังสือทวงหนี้</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              link
              :to="'/invoice-book-1'"
              v-if="
                role_name != 'down_service'
              "
            >
              <v-list-item-content>
                <v-list-item-title>
                  - หนังสือทวงหนี้ครั้งที่ 1</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
              :to="'/invoice-book-2'"
              v-if="
                role_name != 'down_service'
              "
            >
              <v-list-item-content>
                <v-list-item-title>
                  - หนังสือทวงหนี้ครั้งที่ 2</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
              :to="'/invoice-book-other'"
              v-if="
                role_name != 'down_service'
              "
            >
              <v-list-item-content>
                <v-list-item-title>
                  - หนังสือทวงหนี้อื่นๆ</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
              :to="'/interest'"
              v-if="
                role_name != 'down_service'
              "
            >
              <v-list-item-content>
                <v-list-item-title> - ดอกเบี้ย</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
              :to="'/down-service'"
            >
              <v-list-item-content>
                <v-list-item-title> - ปิดระบบ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
              :to="'/prosecute'"
              v-if="
                role_name != 'down_service'
              "
            >
              <v-list-item-content>
                <v-list-item-title>
                  - ส่งดำเนินคดี</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              link
              :to="'/bad-debt'"
              v-if="
                role_name != 'down_service'
              "
            >
              <v-list-item-content>
                <v-list-item-title>
                  - ตัดหนี้สูญ</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <!-- <v-list-item
              link
              :to="'/invoice-book-close'"
              v-if="
                role_name != 'down_service'
              "
            >
              <v-list-item-content>
                <v-list-item-title> - รอปิดระบบ</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            
            <v-list-item 
                link :to="'/log-invoice-book'" 
                v-if="
                role_name != 'down_service'
              ">
              <v-list-item-content>
                <v-list-item-title> - Report หนังสือทวงหนี้</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <!-- <v-list-item
            link
            :to="'/detail-plan'"
            v-if="
              role_name != 'down_service' && role_name != 'viewer'
            "
          >
            <v-list-item-content>
              <v-list-item-title>Detail Plan</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <!-- <v-list-item
            link
            :to="'/sum-plan'"
            v-if="
              role_name != 'down_service' && role_name != 'viewer'
            "
          >
            <v-list-item-content>
              <v-list-item-title>Sum Plan</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <!--           
          <v-list-item link :to="'/manage-user'" v-if="role_name == 'super_admin'">
          <v-list-item-content>
              <v-list-item-title>Manage User</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

            <v-list-item link :to="'/customer-manage'"
          v-if="role_name != 'down_service' &&
          role_name != 'wait_down_service' &&
          role_name != 'viewer'">
            <v-list-item-content>
              <v-list-item-title>Customer Manage</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-group
            v-if="
              role_name != 'down_service'
            "
          >
            <!-- <template v-slot:activator :hide-overlay="true"> -->
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Manage</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              link
              :to="'/manage-user'"
            >
              <v-list-item-content>
                <v-list-item-title> - Manage User</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="'/customer-manage'">
              <v-list-item-content>
                <v-list-item-title> - Customer Manage</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="'/calendar'">
              <v-list-item-content>
                <v-list-item-title> - Calendar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group 
            v-if="role_name != 'down_service'">
            <!-- <template v-slot:activator :hide-overlay="true"> -->
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Report Billing</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link :to="'/dashboard-report-billing'" 
              v-if="role_name != 'viewer'">
              <v-list-item-content >
                <v-list-item-title> - Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- <v-list-item link :to="'/target-billing-report'">
              <v-list-item-content>
                <v-list-item-title> - Target Billing Report </v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->

            <v-list-item link :to="'/finance-customer'">
              <v-list-item-content>
                <v-list-item-title>
                  - สรุปลูกค้าตามเจ้าหน้าที่การเงิน</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="'/log-report-due'">
              <v-list-item-content>
                <v-list-item-title> - ประวัติการชำระ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <!-- เพิ่มเมนู Log มาใหม่ -->
          <v-list-group
            v-if="
              role_name != 'down_service' &&
                role_name != 'viewer'
            "
          >
            <template v-slot:activator>
              <v-list-item-title>Log</v-list-item-title>
            </template>
            <v-list-item link :to="'/loginvoice'">
              <v-list-item-content>
                <v-list-item-title> - Log Invoice</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item link :to="'/logrequest'">
              <v-list-item-content>
                <v-list-item-title> - Log Request</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <!-- <v-list-item link :to="'/log-invoice-book'">
              <v-list-item-content>
                <v-list-item-title> - Log หนังสือทวงหนี้</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <v-list-group sub-group prepend-icon="mdi-user">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    - Log Request
                    <v-icon
                      style="float: right;"
                      class="bgicon"
                      @click="seticon"
                      >{{ sumicon }}</v-icon
                    >
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item link :to="'/request-billing'">
                <v-list-item-content>
                  <v-list-item-title>- ใบแจ้งหนี้</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link :to="'/request-receipt'">
                <v-list-item-content>
                  <v-list-item-title>- ใบเสร็จ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link :to="'/request-payment'">
                <v-list-item-content>
                  <v-list-item-title>- ติดตามการชำระ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link :to="'/request-wht'"> 
                <v-list-item-content>
                  <v-list-item-title>- เอกสาร WHT</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list-group>

           <v-list-group
            v-if="role_name != 'viewer' && role_name != 'down_service'" 
            >
            <!-- <template v-slot:activator :hide-overlay="true"> -->
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Bank Statement</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link :to="'/pending'">
              <v-list-item-content>
                <v-list-item-title> - Pending</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="'/matched'">
              <v-list-item-content>
                <v-list-item-title> - Matched</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="'/success'">
              <v-list-item-content>
                <v-list-item-title> - Success</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item link :to="'/report-bank-statement'">
              <v-list-item-content>
                <v-list-item-title> - Report Bank Statement</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="'/log-reverse'">
              <v-list-item-content>
                <v-list-item-title> - Log Reverse</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-group sub-group prepend-icon="mdi-user">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    - Dashboard RV
                    <v-icon
                      style="float: right;"
                      class="bgicon"
                      @click="seticon"
                      >{{ sumicon }}</v-icon
                    >
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item link :to="'/report-key-rv'">
                <v-list-item-content>
                  <v-list-item-title>- Report Key RV</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link :to="'/report-day2day'">
                <v-list-item-content>
                  <v-list-item-title>- Report Day2Day</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link :to="'/report-overview-rv'">
                <v-list-item-content>
                  <v-list-item-title>- Report ภาพรวม RV</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link :to="'/report-all'">
                <v-list-item-content>
                  <v-list-item-title>- Chart ภาพรวมเปรียบเทียบ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

          </v-list-group>
        <!-- สิ้นสุด -->

          <!-- <v-list-group>
            <template v-slot:activator :hide-overlay="true">
              <v-list-item-content>
                <v-list-item-title>ใบแจ้งหนี้/ใบเสร็จ</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link :to="'/preview'">
              <v-list-item-content>
                <v-list-item-title> - Preview</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="'/request-pdf'">
              <v-list-item-content>
                <v-list-item-title> - Request</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group> -->

          <!-- <v-list-item link :to="'/log-report-due'"
          v-if="role_name != 'down_service' &&
          role_name != 'wait_down_service' &&
          role_name != 'viewer'">
            <v-list-item-content>
              <v-list-item-title>ประวัติการชำระ</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <div style="height: 10px"></div>
          <v-list-item link @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import eventBus from "../event-bus";
export default {
  data() {
    return {
      role_name: "",
      wait_role: "",
      drawer: window.innerWidth > 1264 ? true : false,
      role: [],
      sumicon: "mdi-chevron-down",
      iconlog: 0,
    };
  },
  created() {
    this.role_name = localStorage.getItem("role");
    this.wait_role = localStorage.getItem("wait_role");
    // this.role = JSON.parse(localStorage.getItem('role'))
    // var decode_1 = atob(localStorage.getItem("role"))
    //  var decode_2 = decode_1.split('').reverse().join('')
    //  var decode_3 = atob(decode_2)
    //  console.log(decode_3)
    //    vdecode_1ar decode =atob(encode)
    //  this.role_name = decode_3
  },
  mounted() {
    eventBus.$on("click", () => {
      this.drawer = !this.drawer;
    });
  },
  methods: {
    seticon() {
      this.iconlog += 1;
      if (this.iconlog % 2 === 0) {
        this.sumicon = "mdi-chevron-down";
      } else {
        this.sumicon = "mdi-chevron-up";
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
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

.text_d {
  font-family: "Bai_Jamjuree" !important;
}
.application--is-ltr .v-list-item__icon:first-child {
  margin-right: 5px !important;
}
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 5px !important;
}
.v-item-group .theme--light .v-list-item-group .primary--text {
  margin-top: 60px !important;
}
.v-navigation-drawer .v-list:not(.v-select-list) {
  margin-top: 35px !important;
  background: inherit;
}
.v-list--dense .v-list-item .v-list-item__title {
  line-height: 1.5rem !important;
}

.v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),
.v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  top: 40px !important;
}
.v-application--is-ltr
  .v-list--dense
  .v-list-group--sub-group
  .v-list-group__header {
  padding-left: 0px;
  margin-left: -6.5%;
}
.bgicon.v-icon::after {
  background-color: #ffff;
  border-radius: 50%;
  content: "";
  display: inline-block;
  height: 100%;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: scale(1.3);
  width: 100%;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}
</style>
