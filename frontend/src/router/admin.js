import AdminLayout from '@/layouts/AdminLayout.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
// import UserList from '@/views/admin/UserList.vue'; // 假設未來會有這個頁面

const adminRoutes = {
  path: '/admin',
  name: 'Admin',
  component: AdminLayout,
  children: [
    {
      path: '',
      name: 'AdminDashboard',
      component: Dashboard,
      meta: { requiresAuth: true } // 範例：需要驗證
    },
    // {
    //   path: 'users',
    //   name: 'AdminUsers',
    //   component: UserList,
    //   meta: { requiresAuth: true }
    // },
    // 更多後台路由可以在這裡添加
  ]
};

export default adminRoutes;
