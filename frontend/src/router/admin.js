import AdminLayout from '@/layouts/AdminLayout.vue';
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

const adminRoutes = {
  path: '/admin',
  name: 'Admin',
  component: AdminLayout,
  children: [
    {
      path: '',
      name: 'AdminDashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    // 內容管理
    {
      path: 'content/announcements',
      name: 'AdminContentAnnouncements',
      component: Announcements,
      meta: { requiresAuth: true }
    },
    {
      path: 'content/images',
      name: 'AdminContentImages',
      component: Images,
      meta: { requiresAuth: true }
    },
    // 標會管理
    {
      path: 'bidding',
      name: 'AdminBidding',
      component: Bidding,
      meta: { requiresAuth: true }
    },
    // 會員管理
    {
      path: 'members/info',
      name: 'AdminMembersInfo',
      component: MemberInfo,
      meta: { requiresAuth: true }
    },
    {
      path: 'members/wallet',
      name: 'AdminMembersWallet',
      component: MemberWallet,
      meta: { requiresAuth: true }
    },
    {
      path: 'members/kyc',
      name: 'AdminMembersKYC',
      component: MemberKYC,
      meta: { requiresAuth: true }
    },
    // 帳務管理
    {
      path: 'accounting/deposit',
      name: 'AdminAccountingDeposit',
      component: AccountingDeposit,
      meta: { requiresAuth: true }
    },
    {
      path: 'accounting/withdraw',
      name: 'AdminAccountingWithdraw',
      component: AccountingWithdraw,
      meta: { requiresAuth: true }
    },
    {
      path: 'accounting/records',
      name: 'AdminAccountingRecords',
      component: AccountingRecords,
      meta: { requiresAuth: true }
    }
  ]
};

export default adminRoutes;
