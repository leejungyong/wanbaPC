<template>
    <div>
    <Table :columns="tableTitle" :data="tableData"></Table>
    </div>
</template>

<script>
import axios from 'axios'
import {serverUrl} from '@/common.js';
export default {
    data () {
        return {
            tableTitle:[
                {
                    key:'num',
                    title:'序号',
                    width:90
                },
                {
                    key:'nick',
                    title:'微信名',
                    width:240,
                    align:'center'
                },
                 {
                    key:'date',
                    title:'日期',
                    width:160
                },
                {
                    key:'content',
                    title:'投诉与建议'
                }
               
            ],
            tableData:[]
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
            axios.post(serverUrl+'/api/pcindex.php?act=getSuggestionList',{openid:this.openid,token:this.token}).then(res=>{
                console.log(res.data)
                let arr=res.data
                this.tableData=res.data
                arr.forEach((item,index)=>{
                    item.num=index+1
                })
                this.tableData=arr  
            })
        }
    },

}
</script>

<style>

</style>
