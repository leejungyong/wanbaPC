import { getParams } from '@/libs/util'
const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return { token: USER_MAP[req.userName].token }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}

export const getUserMenus = req => {
  return [
    // 粘贴到这里就可以了
    // 需要把所有的component: () => import('@/view/**/*.vue')
    // 修改为component: 'view/**/*.vue'
    // 注意main和parent-view
    {
      path: '/activity',
      name: '活动',
      meta: {
        icon: 'md-funnel',
        // access:['admin'],
        title:'活动管理'
      },
      component: 'components/main',
      children: [
        {
          path: 'activity-list',
          name: '活动列表',
          meta: {
            icon: 'md-funnel',
            title: '活动列表'
          },
          component: 'view/activity/activity-list.vue',
        },
        {
          path: 'activity-edit',
          name: '活动编辑',
          meta: {
            hideInMenu:true,  
            notCache:true,
            icon: 'md-download',
            title: '活动编辑'
          },
          component:'view/activity/activity-edit.vue',
        }
      ]
    },
    {
      path: '/line',
      name: '线路管理',
      meta: {
        icon: 'ios-git-merge',
        // access:['admin'],
        title:'线路管理'
      },
      component: 'components/main',
      children: [
        {
          path: 'manage',
          name: '线路审核',
          meta: {
            icon: 'ios-done-all',
            title: '线路审核'
          },
          component: 'view/line/linemanage.vue',
        },
        {
          path:'line-detail',
          name:'线路详情',
          meta:{
            hideInMenu:true,
            // notCache:true,
            title:'线路详情'
          },
          component:'view/line/linedetail.vue'
        },
        {
          path: 'lineedit',
          name: '线路编辑',
          meta: {
            icon: 'md-create',
            title: '线路编辑'
          },
          component: 'view/line/lineedit.vue',
        },
      ]
    },
   
    {
      path: '/citypartner',
      name: '城市合伙人',
      meta: {
        // access:['admin'],
        title:'城市合伙人',
        icon: 'ios-man-outline',
      },
      component: 'components/main',
      children: [
        {
          path: 'apply',
          name: '合伙人申请',
          meta: {
            icon: 'ios-man-outline',
            title: '合伙人申请'
          },
          component: 'view/citypartner/citypartner.vue',
        },
        {
          path: 'edit',
          name: '合伙人编辑',
          meta: {
            icon: 'ios-man-outline',
            title: '合伙人编辑'
          },
          component: 'view/citypartner/citypartneredit.vue',
        },
      ]
    },
    {
      path: '/question',
      name: '题库',
      meta: {
        // access:['admin'],
        title:'系统题库',
        icon: 'ios-bookmarks-outline',
      },
      component: 'components/main',
      children: [
        {
          path: 'itemaudit',
          name: '题库审核',
          meta: {
            icon: 'ios-stats',
            title: '题库审核'
          },
          component: 'view/itembank/itembank.vue',
        },
        {
          path: 'editques',
          name: '题库编辑',
          meta: {
            icon: 'md-create',
            title: '题库编辑'
          },
          component: 'view/itembank/itemedit.vue',
        }
      ]
    },
    {
      path: '/system',
      name: '系统',
      meta: {
        // access:['admin'],
        title:'系统',
        icon: 'ios-settings-outline',
      },
      component: 'components/main',
      children: [
        {
          path: 'rolemanage',
          name: '角色管理',
          meta: {
            icon: 'ios-stats',
            title: '角色管理'
          },
          component: 'view/system/rolemanage.vue',
        },
        {
          path: 'settings',
          name: '系统设置',
          meta: {
            icon: 'md-create',
            title: '系统设置'
          },
          component: 'view/system/setting.vue',
        }
      ]
    },
    {
      path: '/suggest',
      name: '用户意见',
      meta: {
        // access:['admin'],
        title:'用户意见'
      },
      component: 'components/main',
      children: [
        {
          path: 'index',
          name: '投诉与建议',
          meta: {
            icon: 'ios-headset-outline',
            title: '投诉与建议'
          },
          component: 'view/suggest/suggest.vue',
        }
      ]
    }
  ]
}