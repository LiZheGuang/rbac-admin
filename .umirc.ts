import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
    },
    {
      name: '用户',
      path: '/user',
      component: '@/layouts/index',
      routes: [
        { path: 'list', component: './Users', name: '用户列表' },
        { path: 'permission', component: './Users/permission', name: '权限系统' },
        {
          path: 'detail/:id',
          component: './Users/detail.tsx',
          name: '用户详情',
        },
        {
          path: 'role/:roleId',
          component: './Users/roleDetail.tsx',
          name: '身份详情修改',
          hideInMenu: true,
        },
        {
          path: 'addRole',
          component: './Users/roleDetail.tsx',
          name: '新建身份',
        },
      ],
    },
  ],
  npmClient: 'pnpm',
});
