import AdminLayout from '@/layouts/AdminLayout.vue';
import AdminLogin from '@/views/admin/Login.vue'; // 引入新的後台登入元件
import Dashboard from '@/views/admin/Dashboard.vue';
import Announcements from '@/views/admin/content/Announcements.vue';
import Images from '@/views/admin/content/Images.vue';
import Bidding from '@/views/admin/Bidding.vue';
import MemberInfo from '@/views/admin/members/Info.vue';
import MemberWallet from '@/views/admin/members/Wallet.vue';
import MemberKYC from '@/views/admin/members/KYC.vue';
import AccountingDeposit from '@/views/admin/accounting/Deposit.vue';
import AccountingWithdraw from '@/views/admin/accounting/Withdraw.vue';
import AccountingRecords from '@/views/admin/accounting/Records.vue';

// 1. 獨立的後台登入頁路由
const adminLoginRoute = {
  path: '/admin/login',
  name: 'AdminLogin',
  component: AdminLogin,
};

// 2. 需要佈局的後台主體路由
const adminAppRoutes = {
  path: '/admin',
  component: AdminLayout,
  meta: { requiresAuth: true }, // 將權限驗證 meta 提到父層
  children: [
    {
      path: '', // 注意: 這裡的 path 是空，代表 /admin 的首頁
      name: 'AdminDashboard',
      component: Dashboard,
    },
    // 內容管理
    {
      path: 'content/announcements',
      name: 'AdminContentAnnouncements',
      component: Announcements,
    },
    {
      path: 'content/images',
      name: 'AdminContentImages',
      component: Images,
    },
    // 標會管理
    {
      path: 'bidding',
      name: 'AdminBidding',
      component: Bidding,
    },
    // 會員管理
    {
      path: 'members/info',
      name: 'AdminMembersInfo',
      component: MemberInfo,
    },
    {
      path: 'members/wallet',
      name: 'AdminMembersWallet',
      component: MemberWallet,
    },
    {
      path: 'members/kyc',
      name: 'AdminMembersKYC',
      component: MemberKYC,
    },
    // 帳務管理
    {
      path: 'accounting/deposit',
      name: 'AdminAccountingDeposit',
      component: AccountingDeposit,
    },
    {
      path: 'accounting/withdraw',
      name: 'AdminAccountingWithdraw',
      component: AccountingWithdraw,
    },
    {
      path: 'accounting/records',
      name: 'AdminAccountingRecords',
      component: AccountingRecords,
    }
  ]
};

// 導出一個包含兩個路由的陣列
export default [
  adminLoginRoute,
  adminAppRoutes
];
