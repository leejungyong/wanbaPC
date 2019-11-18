  export let activity=    {
    path: '/activity',
    name: '活动管理',
    meta: {
      icon: 'md-funnel',
      title:'activity',
    },
    component: 'components/main',
    children:[
        {
            path: 'activity-list',
            name: '我的活动',
            meta: {
              icon: 'md-funnel',
              title: 'activitylist'
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
              title: 'activityedit'
            },
            component:'view/activity/activity-edit.vue',
          },
          {
            path:'new-activity',
            name:'新建活动',
            meta:{
              hideInMenu:true,
              notCache:true,
              icon:'md-add',
              title:'newactivity'
            },
            component:'view/activity/new-activity.vue'
          }
    ]
  }

  export let myquestion={
    path:'/myquestion',
    name:'题库',
    meta:{
      icon: 'md-funnel',
      title:'myquestion'
    },
    component:'components/main',
    children:[
      {
        path: 'myquestionmanage',
        name: '我的题库',
        meta: {
          icon: 'ios-archive',
          title: 'myquestionmanage'
        },
        component: 'view/question/myquestion.vue',
      }
    ]
  }



  export let linemanage=[
    {
        path: 'manage',
        name: '线路审核',
        meta: {
          icon: 'ios-done-all',
          title: 'linemanage'
        },
        component: 'view/line/linemanage.vue',
      },
      {
        path:'line-detail',
        name:'线路详情',
        meta:{
          hideInMenu:true,
          // notCache:true,
          title:'linedetail'
        },
        component:'view/line/linedetail.vue'
      },
  ]

  export let lineedit=[
    {
        path: 'lineedit',
        name: '线路编辑',
        meta: {
          icon: 'md-create',
          title: 'lineedit'
        },
        component: 'view/line/lineedit.vue',
      },
      {
        path:'poialter',
        name:'点位修改',
        meta:{
          hideInMenu:true,
          // notCache:true,
          title:'poialter'
        },
        component:'view/line/poialter.vue'
      }
  ]
  export let line={
    path: '/line',
    name: '线路管理',
    meta: {
      icon: 'ios-git-merge',
      title:'line'
    },
    component: 'components/main',
    children:[]
  }



  export let cityPartner={
    path: '/citypartner',
    name: '城市合伙人',
    meta: {
      title:'citypartner',
      icon: 'ios-man-outline',
    },
    component: 'components/main',
    children:[]
  }

  export let cityapply=[
    {
        path: 'apply',
        name: '合伙人申请',
        meta: {
          icon: 'ios-man-outline',
          title: 'apply'
        },
        component: 'view/citypartner/citypartner.vue',
      },
      {
        path: 'edit',
        name: '合伙人编辑',
        meta: {
          icon: 'ios-man-outline',
          title: 'edit'
        },
        component: 'view/citypartner/citypartneredit.vue',
      },
  ]
  export let system= {
    path: '/system',
    name: '系统管理',
    meta: {
      title:'system',
      icon: 'ios-settings-outline',
    },
    component: 'components/main',
    children: [
    ]
  }

  export let rolemanage=[ {
    path: 'rolemanage',
    name: '角色管理',
    meta: {
      icon: 'ios-stats',
      title: 'rolemanage'
    },
    component: 'view/system/rolemanage.vue',
  }]
  export let settings=[
    {
        path: 'settings',
        name: '系统设置',
        meta: {
          icon: 'md-create',
          title: 'settings'
        },
        component: 'view/system/setting.vue',
      }
  ]
  export let question={
    path: '/question',
    name: '题库管理',
    meta: {
      title:'question',
      icon: 'ios-bookmarks-outline',
    },
    component: 'components/main',
    children: [
    ]
  }

  export let itemaudit=[
    {
        path: 'itemaudit',
        name: '题库审核',
        meta: {
          icon: 'ios-stats',
          title: 'itemaudit'
        },
        component: 'view/itembank/itembank.vue',
      },
  ]

  export let editques=[
    {
        path: 'editques',
        name: '题库编辑',
        meta: {
          icon: 'md-create',
          title: 'editques'
        },
        component: 'view/itembank/itemedit.vue',
      }
  ]
  export let suggest= {
    path: '/suggest',
    name: '用户意见',
    meta: {
      title:'suggest'
    },
    component: 'components/main',
    children: [
    ]
  }
  export let suggestindex=[
    {
        path: 'index',
        name: '投诉与建议',
        meta: {
          icon: 'ios-headset-outline',
          title: 'index'
        },
        component: 'view/suggest/suggest.vue',
      }
  ]

  export let finance={
    path:'/finance',
    name:'财务',
    meta:{
      title:'finance'
    },
    component:'components/main',
    children:[]
  }

  export let financemanage=[
    {
      path:'manage',
      name:'财务管理',
      meta:{
        icon:'logo-yen',
        title:'manage'
      },
      component:'view/finance/manage.vue'
    }
  ]

  export let user={
    path:'/user',
    name:'用户',
    meta:{
      title:'user'
    },
    component:'components/main',
    children:[]
  }

  export let usermanage=[ {
    path: 'usermanage',
    name: '用户管理',
    meta: {
      icon: 'ios-person',
      title: 'usermanage'
    },
    component: 'view/system/usermanage.vue',
  }]

