const serverUrl=process.env.NODE_ENV === 'production'?'http://www.wondfun.com/wanba':''

const cookieTime=1/48

const questionType= [
    // 问题类型
    {
      value: "0",
      label: "0-人工判定"
    },
    {
      value: "1",
      label: "1-自动精确匹配"
    },
    {
      value: "2",
      label: "2-自动模糊匹配"
    },
    {
      value: "3",
      label: "3-答案包含在回答里"
    },
    {
      value: "4",
      label: "4-回答包含在答案里"
    },
    {
      value: "5",
      label: "5-教练提交管理员判定"
    },
    {
      value: "6",
      label: "6-N里多选"
    },
    {
        value:'7',
        label:'7-教练评分'
    }
  ]

export  {serverUrl,cookieTime,questionType}