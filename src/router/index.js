import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/login' },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/invoice',
    children: [
      {
        name: 'Invoice',
        path: '/invoice',
        component: () => import('../views/Invoice.vue')
      },
      {
        name: 'Installment',
        path: '/installment',
        component: () => import('../views/Installment.vue')
      },
      // {
      //   name: 'Aging',
      //   path: '/aging',
      //   component: () => import('../views/Aging.vue')
      // },
      {
        name: 'InvoiceBook1',
        path: '/invoice-book-1',
        component: () => import('../views/InvoiceBook1.vue')
      },
      {
        name: 'InvoiceBook2',
        path: '/invoice-book-2',
        component: () => import('../views/InvoiceBook2.vue')
      },
      {
        name: 'InvoiceBookOther',
        path: '/invoice-book-other',
        component: () => import('../views/InvoiceBookOther.vue')
      },
      {
        name: 'Interest',
        path: '/interest',
        component: () => import('../views/Interest.vue')
      },
      {
        name: 'Prosecute',
        path: '/prosecute',
        component: () => import('../views/Prosecute.vue')
      },
      {
        name: 'BadDebt',
        path: '/bad-debt',
        component: () => import('../views/BadDebt.vue')
      },
      {
        name: 'InvoiceBookClose',
        path: '/invoice-book-close',
        component: () => import('../views/InvoiceBookClose.vue')
      },
      {
        name: 'DownService',
        path: '/down-service',
        component: () => import('../views/DownService.vue')
      },
         {
        name: 'ManageUser',
        path: '/manage-user',
        component: () => import('../views/ManageUser.vue')
      },
      // {
      //   name: 'SumPlan',
      //   path: '/sum-plan',
      //   component: () => import('../views/SumPlan.vue')
      // },
      // {
      //   name: 'DetailPlan',
      //   path: '/detail-plan',
      //   component: () => import('../views/DetailPlan.vue')
      // },
       {
        name: 'Unlock',
        path: '/unlock',
        component: () => import('../views/Unlock.vue')
      },
      {
        name: 'LogInvoice',
        path: '/loginvoice',
        component: () => import('../views/LogInvoice.vue')
      },
      {
        name: 'DashboardReportBilling',
        path: '/dashboard-report-billing',
        component: () => import('../views/DashboardReportBilling.vue')
      },
      {
        name: 'CustomerManage',
        path: '/customer-manage',
        component: () => import('../views/CustomerManage.vue')
      },
      {
        name: 'Calendar',
        path: '/calendar',
        component: () => import('../views/Calendar.vue')
      },
      {
        name: 'LogReportDue',
        path: '/log-report-due',
        component: () => import('../views/LogReportDue.vue')
      },
       {
        name: 'FinanceCustomer',
        path: '/finance-customer',
        component: () => import('../views/FinanceCustomer')
       },
       {
        name: 'Preview',
        path: '/preview',
        component: () => import('../views/Preview')
       },
        {
        name: 'RequestPDF',
        path: '/request-pdf',
        component: () => import('../views/RequestPDF')
       },
       {
        name: 'TargetBillingReport',
        path: '/target-billing-report',
        component: () => import('../views/TargetBillingReport')
       },
      //  เพิ่มมาใหม่
      {
        name: 'LogRequest',
        path: '/logrequest',
        component: () => import('../views/LogRequest.vue')
      },
      {
        name: 'LogInvoiceBook',
        path: '/log-invoice-book',
        component: () => import('../views/LogInvoiceBook.vue')
      },
      {
        name: 'RequestBilling',
        path: '/request-billing',
        component: () => import('../views/RequestBilling.vue')
      },
      {
        name: 'RequestReceipt',
        path: '/request-receipt',
        component: () => import('../views/RequestReceipt.vue')
      },
      {
        name: 'RequestPayment',
        path: '/request-payment',
        component: () => import('../views/RequestPayment.vue')
      },
      {
        name: 'RequestWHT',
        path: '/request-wht',
        component: () => import('../views/RequestWHT.vue')
      },
      {
        name: 'Pending',
        path: '/pending',
        component: () => import('../views/Pending.vue')
      },
      {
        name: 'Matched',
        path: '/matched',
        component: () => import('../views/Matched.vue')
      },
      {
        name: 'Success',
        path: '/success',
        component: () => import('../views/Success.vue')
      },
      {
        name: 'ReportBankStatement',
        path: '/report-bank-statement',
        component: () => import('../views/ReportBankStatement.vue')
      },
      {
        name: 'LogReverse',
        path: '/log-reverse',
        component: () => import('../views/LogReverse.vue')
      },
      {
        name: 'ReportKeyRV',
        path: '/report-key-rv',
        component: () => import('../views/ReportKeyRV.vue')
      },
      {
        name: 'ReportDay2Day',
        path: '/report-day2day',
        component: () => import('../views/ReportDay2Day.vue')
      },
      {
        name: 'ReportOverviewRV',
        path: '/report-overview-rv',
        component: () => import('../views/ReportOverviewRV.vue')
      },
      {
        name: 'ReportAll',
        path: '/report-all',
        component: () => import('../views/ReportAll.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('../views/Landing.vue'),
    props:route => ({ ...route.query }) //collected query after question mark ex. landing?shared_token=...
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
