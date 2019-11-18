<template>
    <div>
         <Input icon="ios-search-outline" placeholder="请输入关键字" v-model="keyword" @on-enter="searchUser" @on-click="searchUser" style="width:200px;margin-bottom:10px;" />
        <Table :columns="tableTitle" :data="tableData" :loading="tableLoading" @on-sort-change="sort"></Table>
            <div class="pagebox">
          <Page
        :total="total"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :current="currentPage"
        :page-size="pageSize"
        show-sizer
      /> 

      <span style="float:left;margin-left: 185px;margin-top:-20px;">共{{total}}个用户</span>
    </div>
    </div>
</template>

<script>
import {serverUrl} from '@/common.js'
import axios  from 'axios'
export default {
    data () {
        return {
            tableTitle:[

                {
                    key:'nick',
                    title:'昵称',
                    width:180,
                    ellipsis:true,
                    tooltip:true,
                    sortable:true,
                    render: function (h, params) {
                        return h('div',[
                            h('img',{
                                style:{
                                    width:'30px',
                                    height:'30px',
                                    verticalAlign:'middle'
                                },
                                attrs:{
                                    src:params.row.avatar
                                }
                            }),
                            h('span',{
                                style:{
                                    display:'inline-block',
                                    marginLeft:'10px'
                                }
                            },params.row.nick)
                        ])
                    }
                },
                 {
                    key:'date',
                    title:'注册时间',
                    sortable:true
                },
                 {
                    key:'lastlogin',
                    title:'最后登录时间',
                    sortable:true
                },
                 {
                    key:'tel',
                    title:'电话',
                     sortable: true,
                     width:120
                },
                {
                    key:'point',
                    title:'点数',
                    sortable:true
                },
                {
                    key:'adminrole',
                    title:'角色',
                    sortable:true,
                    width:90    
                },
                {
                    key:'action',
                    title:'操作',
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{
                                props: {
                                    type:'primary',
                                    size:'small'
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                on:{
                                    click:()=>{

                                    }
                                }
                            },'编辑')
                        ])
                    }
                }
            ],
            tableData:[],
            tableLoading:false,
            currentPage: 1,
            pageSize: 10,
            total: null,
            keyword:'',  //关键词搜索
            column:'date',  //排序关键字
            orderby:'desc'
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        fetchData(){
            this.tableLoading=true
            axios.post(serverUrl+'/api/pcindex.php?act=getUserList',{
                column:this.column,
                orderby:this.orderby,
                keyword:this.keyword,
                currentpage:this.currentPage-1,
                pagesize:this.pageSize
            }).then(res=>{
                console.log(res.data)
                if(res.data){
                    this.total=parseInt(res.data.total)
                    let arr=res.data.list
                    arr.forEach((item,index)=>{
                        // item.num=(this.currentPage-1)*this.pageSize+index+1
                        item.date=new Date(parseInt(item.date) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
                        item.lastlogin=new Date(parseInt(item.lastlogin) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '); 
                        item.point=parseInt(item.point) 
                    })
                    this.tableData=arr
                    this.tableLoading=false
                }
            })
        },


        /** 搜索框查询 */
        searchUser(){
            this.currentPage=1
            this.tableLoading=true
            axios.post(serverUrl+'/api/pcindex.php?act=getUserList',{
                keyword:this.keyword,
                currentpage:this.currentPage-1,
                pagesize:this.pageSize
            }).then(res=>{
                console.log(res.data)
                if(res.data){
                    this.total=parseInt(res.data.total)
                    let arr=res.data.list
                    arr.forEach((item,index)=>{
                        // item.num=(this.currentPage-1)*this.pageSize+index+1
                        item.date=new Date(parseInt(item.date) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
                        item.lastlogin=new Date(parseInt(item.lastlogin) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
                    })
                    this.tableData=arr
                    this.tableLoading=false
                }
            })
        },
        /** 排序 */
        sort(column){
            console.log(column)
            this.tableLoading=true
            this.column=column.key
            this.orderby=column.order
            this.currentPage=1
            this.fetchData()
        },
        /** 点击某一页 */
    pageChange(index) {
      this.currentPage = index;
      this.fetchData();
    },
    /** 改变数量多少 */
    pageSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    }
    },

}
</script>

<style>
.pagebox {
  text-align: center;
  margin-top: 20px;
}
</style>
