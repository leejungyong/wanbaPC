<template>
    <div>
        <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
    </div>
</template>

<script>
import axios from 'axios'
import {serverUrl} from '@/common.js'
export default {
    data () {
        return {
            tableTitle:[
                {
                    key:'num',
                    title:'序号'
                },
                {
                    key:'title',
                    title:'线路'
                },
                {
                    key:'nick',
                    title:'申请人'
                },
                {
                    key:'date',
                    title:'申请时间'
                },
                {
                    key:'memo1',
                    title:'背景故事',
                    ellipsis: true,
                     tooltip: true
                },
                {
                    key:'memo2',
                    title:'经典玩法',
                     ellipsis: true,
                     tooltip: true
                },
                {
                    key:'memo3',
                    title:'场景介绍',
                    ellipsis: true,
                     tooltip: true
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
                                        console.log(params.row)
                                        this.$router.push({name:'线路详情',params:{applyid:params.row.id,aid:params.row.aid,title:params.row.title,nick:params.row.nick,date:params.row.date,route_desc:params.row.memo}})
                                    }
                                }
                            },'审核')
                        ])
                    }
                }
            ],
            tableData:[],
            tableLoading:false
        }
    },
    created () {
        this.fetchData()
    },
    computed: {
        openid(){
            return this.$store.state.user.userId
        },
        token(){
            return this.$store.state.user.token
        } 
    },
    methods: {
        fetchData(){
            this.tableLoading=true
            axios.get(serverUrl+'/api/pcindex.php?act=getRouteApplyList',{uid:this.openid,token:this.token}).then(res=>{
                console.log(res.data)
                let arr=res.data
                arr.forEach((item,index)=>{
                    item.num=index+1
                    item.memo1=item.memo.memo1
                    item.memo2=item.memo.memo2
                    item.memo3=item.memo.memo3
                })
                this.tableData=arr
                this.tableLoading=false
            })
        }
    },
}
</script>

<style>

</style>
