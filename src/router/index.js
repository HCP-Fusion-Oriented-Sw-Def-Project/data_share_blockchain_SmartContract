import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index'),
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true,
},
{
  path: '/login_bit',
  component: () => import('@/views/login/index_to_bd'),
  hidden: true,
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true,
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true,
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true,
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      affix: true,
    },
  }]
},
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/profile/index'),
  //     name: 'Profile',
  //     meta: {
  //       title: 'profile',
  //       icon: 'user',
  //       noCache: true,
  //     },
  //   }]
  // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'], // you can set roles in root nav
  //   },
  //   children: [{
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'], // or you can only set roles in sub nav
  //       },
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission',
  //         // if do not set roles, means: this page does not require permission
  //       },
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'rolePermission',
  //         roles: ['admin'],
  //       },
  //     },
  //   ],
  // },
  {
    path: '/org_mgmt',
    component: Layout,
    redirect: 'noredirect',
    name: 'org_mgmt',
    meta: {
      title: '系统管理',
      icon: 'organization',
      noCache: true,
      roles: ['admin'],
    },
    children: [{
      path: 'menu_mgmt',
      component: () => import('@/views/org_mgmt/menu_mgmt'),
      name: 'menu_mgmt',
      meta: {
        title: '菜单管理',
        icon: 'menu',
        noCache: true,
      },
    },
    {
      path: 'user_mgmt',
      component: () => import('@/views/org_mgmt/user_mgmt'),
      name: 'user_mgmt',
      meta: {
        title: '用户管理',
        icon: 'user',
        noCache: true,
      },
    },
    {
      path: 'org_mgmt',
      component: () => import('@/views/org_mgmt/org_mgmt'),
      name: 'org_mgmt',
      meta: {
        title: '机构管理',
        icon: 'people',
        noCache: true,
      },
    },
    {
      path: 'permission',
      component: () => import('@/views/org_mgmt/permission'),
      name: 'permission',
      meta: {
        title: '权限管理',
        icon: 'peoples',
        noCache: true,
      },
    },
    ],
  },
  // {
  //   path: '/blockchain_search',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'blockchain_search',
  //   meta: {
  //     title: '供应链查询',
  //     noCache: true,
  //     icon: 'provide',
  //     roles: ['admin', 'provider']
  //   },
  //   children: [{
  //     path: 'search',
  //     component: () => import('@/views/blockchain_search/search'),
  //     name: 'search',
  //     meta: {
  //       title: '供应链查询',
  //       noCache: true,
  //       roles: ['admin', 'provider']
  //     }
  //   },
  //   {
  //     path: 'process',
  //     component: () => import('@/views/blockchain_search/process'),
  //     name: 'process',
  //     hidden: true,
  //     meta: {
  //       title: '供应链流程',
  //       icon: '',
  //       noCache: true,
  //       roles: ['admin', 'provider']
  //     }
  //   }, {
  //     path: 'result',
  //     component: () => import('@/views/blockchain_search/result'),
  //     name: 'result',
  //     hidden: true,
  //     meta: {
  //       title: '查询结果',
  //       icon: '',
  //       noCache: true,
  //       roles: ['admin', 'provider']
  //     }
  //   }]
  // },
  {
    path: '/data_share_manage',
    component: Layout,
    redirect: 'noredirect',
    name: 'data_share_manage',
    meta: {
      title: '数据共享管理',
      icon: 'data_share_manage',
      noCache: true,
      roles: ['admin', 'dataUser', 'provider'],
    },
    children: [{
      path: 'myShare',
      component: () => import('@/views/data_share_manage/myShare'),
      name: 'myShare',
      meta: {
        title: '数据共享',
        icon: 'data_share',
        noCache: true,
        roles: ['admin', 'provider']
      },
    },
    {
      path: 'dataList',
      component: () => import('@/views/data_share_manage/dataList'),
      name: 'dataList',
      meta: {
        title: '数据清单',
        icon: 'data_list',
        noCache: true,
        roles: ['admin', 'dataUser']
      },
    },
    {
      path: 'typeManage',
      component: () => import('@/views/data_share_manage/typeManage'),
      name: 'typeManage',
      meta: {
        title: '类别管理',
        icon: 'data_manage',
        noCache: true,
      },
    },
    {
      path: 'useExamine',
      component: () => import('@/views/data_share_manage/useExamine'),
      name: 'useExamine',
      meta: {
        title: '使用审核',
        icon: 'examine',
        noCache: true,
        roles: ['provider']
      },
    },
    {
      path: 'shareExamine',
      component: () => import('@/views/data_share_manage/shareExamine'),
      name: 'examine',
      meta: {
        title: '共享审核',
        icon: 'examine2',
        noCache: true,
        roles: ['admin']
      },
    },
    {
      path: 'myApplication',
      component: () => import('@/views/data_share_manage/myApplication'),
      name: 'myApplication',
      meta: {
        title: '我的申请',
        icon: 'list',
        noCache: true,
        roles: ['dataUser']
      },
    },
    {
      path: 'applicationHistory',
      name: 'applicationHistory',
      hidden: true,
      component: () => import('@/views/data_share_manage/applicationHistory'),
      meta: {
        title: '历史记录',
        noCache: true,
        roles: ['dataUser']
      },
    },
    {
      path: 'useHistoryRecord',
      name: 'useHistoryRecord',
      hidden: true,
      component: () => import('@/views/data_share_manage/useHistoryRecord'),
      meta: {
        title: '历史记录',
        noCache: true,
        roles: ['provider']
      },
    },
    {
      path: 'logAudit',
      name: 'logAudit',
      component: () => import('@/views/data_share_manage/logAudit'),
      meta: {
        title: '日志审计',
        icon: 'menu',
        noCache: true,
        roles: ['dataUser', 'provider']
      },
    },
    {
      path: 'algorCenter',
      name: 'algorCenter',
      component: () => import('@/views/data_share_manage/algorCenter'),
      meta: {
        title: '算法中心',
        icon: 'algor',
        noCache: true,
        roles: ['dataUser', 'admin']
      },
    },
    {
      path: 'addAlgorithmJob',
      name: 'addAlgorithmJob',
      hidden: true,
      component: () => import('@/views/data_share_manage/addAlgorithmJob'),
      meta: {
        title: '新增算法作业',
        icon: 'algorJob',
        noCache: true,
        roles: ['dataUser', 'admin']
      },
    },
    {
      path: 'myAlgorithmJob',
      name: 'myAlgorithmJob',
      component: () => import('@/views/data_share_manage/myAlgorithmJob'),
      meta: {
        title: '算法作业',
        icon: 'algorList',
        noCache: true,
        roles: ['dataUser', 'admin']
      },
    }
    ],
  },
  {
    path: '/cluster',
    component: Layout,
    redirect: 'noredirect',
    name: 'cluster',
    meta: {
      title: '聚类分析',
      icon: 'data',
      noCache: true,
      roles: ['admin', 'dataUser']
    },
    children: [{
      path: 'dataList',
      component: () => import('@/views/cluster/components/dataList'),
      name: 'Datalist',
      meta: {
        title: '聚类分析',
        icon: 'form',
        noCache: true,
        roles: ['admin', 'dataUser']
      }
    },
    {
      path: 'cluster_vis',
      component: () => import('@/views/cluster/index'),
      name: 'ClusterVis',
      meta: {
        title: '聚类可视化',
        icon: 'form',
        noCache: true,
        roles: ['admin', 'dataUser']
      },
      hidden: true
    }
    ]
  },
  {
    path: '/visualization',
    component: Layout,
    redirect: 'noredirect',
    name: 'main_vis',
    meta: {
      title: '可视化分析',
      icon: 'component',
      noCache: true,
      roles: ['admin', 'dataUser']
    },
    children: [
      // {
      //   path: 'single_vis',
      //   component: () => import('@/views/visualization/single_vis'),
      //   name: 'single_vis',
      //   meta: { title: '新建单图', icon: 'documentation', noCache: true }
      // },
      {
        path: 'dataList',
        component: () => import('@/views/visualization/dataList'),
        name: 'Datalist',
        meta: {
          title: '可视化分析',
          icon: 'form',
          noCache: true,
          roles: ['admin', 'dataUser']
        }
      },
      {
        path: 'single_vis_new',
        component: () => import('@/views/visualization/single_vis_new'),
        name: 'single_vis_new',
        meta: {
          title: '新建单图',
          icon: 'documentation',
          noCache: true,
          roles: ['admin', 'dataUser']
        },
        hidden: true
      }
    ]
  },
  {
    path: '/nanning',
    component: Layout,
    redirect: 'noredirect',
    name: 'nanning',
    meta: {
      title: '广西省南宁市数据统计',
      icon: 'component',
      noCache: true,
      roles: ['admin', 'dataUser']
    },
    children: [
      {
        path: 'industry_insurance_analysis',
        component: () => import('@/views/nanning/industry_insurance_analysis'),
        name: 'IndustryInsuranceAnalysis',
        meta: {
          title: '各产业营业收入分析',
          icon: 'form',
          noCache: true,
          roles: ['admin', 'dataUser']
        }
      },
      {
        path: 'region_insurance_analysis',
        component: () => import('@/views/nanning/region_insurance_analysis'),
        name: 'RegionInsuranceAnalysis',
        meta: {
          title: '各区域营业收入分析',
          icon: 'form',
          noCache: true,
          roles: ['admin', 'dataUser']
        }
      },
      {
        path: 'industry',
        component: () => import('@/views/nanning/industry'),
        name: 'Industry',
        meta: {
          title: '产业列表统计',
          icon: 'form',
          noCache: true,
          roles: ['admin', 'dataUser']
        }
      },
      {
        path: 'industry_warning',
        component: () => import('@/views/nanning/industry_warning'),
        name: 'IndustryWarning',
        meta: {
          title: '产业预警',
          icon: 'form',
          noCache: true,
          roles: ['admin', 'dataUser']
        }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example',
  //   },
  //   children: [{
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: {
  //         title: 'createArticle',
  //         icon: 'edit',
  //       },
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: {
  //         title: 'editArticle',
  //         noCache: true,
  //         activeMenu: '/example/list',
  //       },
  //       hidden: true,
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: {
  //         title: 'articleList',
  //         icon: 'list',
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel',
  //   },
  //   children: [{
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: {
  //         title: 'exportExcel',
  //       },
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: {
  //         title: 'selectExcel',
  //       },
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: {
  //         title: 'mergeHeader',
  //       },
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: {
  //         title: 'uploadExcel',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/tem',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: {
  //     title: '示例',
  //     icon: 'documentation',
  //   },
  //   children: [{
  //       path: 'list',
  //       name: 'list',
  //       component: () => import('@/views/tem/list'),
  //       meta: {
  //         title: '列表',
  //         icon: 'documentation',
  //       },
  //     },
  //     {
  //       path: 'form',
  //       name: 'form',
  //       component: () => import('@/views/tem/form'),
  //       meta: {
  //         title: '添加',
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
