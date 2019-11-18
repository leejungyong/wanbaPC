<template>
    <div class="citypartner">
        <div style="margin-bottom:15px;">
            <Select v-model="filterSelect" style="width:100px" @on-change="changeFilter">
                <Option v-for="item in filterList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>


        <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
        <Modal
            v-model="modal"
            @on-ok="sure"
            @on-cancel="cancel"
            title="申请详情"
            :loading="loading"
            >
            <div class="divbox">
            <div class="item">
               <span class="itemtext">公司名称 : </span> {{rowObj.company}}
            </div>
            <div class="item">
               <span class="itemtext">所在区域 : </span> {{rowObj.city}}
            </div>
            <div class="item">
               <span class="itemtext">详细地址 : </span> {{rowObj.address}}
            </div>
            <div class="item">
              <span class="itemtext">机构代码 : </span>  {{rowObj.orgcode}}
            </div>
            <div class="item">
               <span class="itemtext">公司法人 : </span> {{rowObj.corporate}}
            </div>
            <div class="item">
              <span class="itemtext">联系电话 : </span>  {{rowObj.tel}}
            </div>
            <div class="item">
              <span class="itemtext"> 申请时间 : </span> {{rowObj.date}}
            </div>
            <div class="item clearfix">
               <span class="fl itemtext">营业执照 : </span> 
               <div class="picbox fl" >
               <img class="pic" v-bind:src='rowObj.pic ' alt="" >
               </div>
                 <span @click="bigImage" class="bigImage">大图</span>
            </div>
            <div class="item">
                <span class="itemtext"> <span style="color:red;">*</span> 审核意见:</span>
                <RadioGroup v-model="choose" @on-change="ifTextarea" v-if="already==false">
                    <Radio label='pass' >通过</Radio>
                    <Radio label='reject'>驳回</Radio>
                </RadioGroup>
                <span v-if="already">{{auditMessage}} </span>
                <div v-if="showTextarea" style="margin:20px 0 0 70px;">
                    <Input v-model="reason" type="textarea" placeholder="驳回理由" style="width:300px;"/>
                </div>
            </div>

            </div>
           
        </Modal>
            <Modal title="营业执照" v-model="visible" style="width:300px;">
                <img :src="rowObj.pic" v-if="visible" style="width: 100%">
           </Modal>
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
                    width:60,
                },
                {
                    key:'company',
                    title:'公司名称',
                    width:240,
                    align:'center',
                    ellipsis:true,
                    tooltip:true
                },
                {
                    key:'city',
                    title:'所在区域',
                    width:160,
                    align:'center',
                    ellipsis:true,
                    tooltip:true
                },
                {
                    key:'address',
                    title:'详细地址',
                    ellipsis:true,
                    tooltip:true
                },
                {
                    key:'orgcode',
                    title:'机构代码',
                    ellipsis:true,
                    tooltip:true
                },
                {
                    key:'corporate',
                    title:'公司法人'
                },
                {
                    key:'tel',
                    title:'联系电话'
                },
                // {
                //     key:'pic',
                //     title:'营业执照'
                // },
                {
                    key:'date',
                    title:'申请时间'
                },
                {
                    key:'action',
                    title:'操作',
                    render:  (h, params)=> {
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
                                        this.modal=true
                                        this.rowObj=params.row
                                        if(params.row.status==-1){
                                            this.already=true
                                            this.auditMessage='已驳回. 理由：'+params.row.reason
                                        }else if (params.row.status==1){
                                            this.already=true
                                            this.auditMessage='已通过'
                                        }else{
                                            this.already=false
                                        }
                                    }
                                }
                            },'查看')
                        ])
                    }
                }
            ],
            tableData:[],
            tableLoading:false,
            modal:false,
            rowObj:{},
            reason:'',
            choose:'',
            showTextarea:false,  //显示驳回理由的输入框
            visible:false,
            loading:true,
            already:false,
            auditMessage:'',
            filterSelect:'0',  //筛选项
            filterList:[
                {
                    value:'0',
                    label:'待审核'
                },
                {
                    value:'1',
                    label:'已通过'
                },
                {
                    value:'-1',
                    label:'已驳回'
                }
            ]
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
            axios.post(serverUrl+"/api/pcindex.php?act=getAgentApplyList",{openid:this.openid,token:this.token,status:this.filterSelect}).then(res=>{
                console.log(res.data)
                if(res.data){
                    let arr=res.data
                    arr.forEach((item,index)=>{
                        item.num=index+1
                    })
                    this.tableData=arr
                    this.tableLoading=false
                }
            })
        },

        /** 提交审核结果 */
        sure(){
            if(!this.already){
                  if(this.choose!=''){
            let status=this.choose=='pass'?1:-1
            
            if(this.choose=='reject'&&this.reason==''){
                  this.$Modal.error({
                    title: '错误',
                    content: '请填写驳回理由！'
                });
                  setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                }, 1000);
            }else{
                let reason=this.choose=='reject'?this.reason:''
                let params={
                    openid:this.openid,
                    token:this.token,
                    id:this.rowObj.id,
                    status:status,
                    reason:reason
                }
                axios.post(serverUrl+'/api/pcindex.php?act=updateAgentApply',params).then(res=>{
                    console.log(res.data)
                    if(res.data){
                        this.modal=false
                        this.loading=false
                    }
                })
                 this.fetchData()
            }
            }else{
                  this.$Modal.error({
                    title: '错误',
                    content: '请填写审核意见！'
                });
                  setTimeout(() => {   //解决modal的确定按钮关闭问题
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                }, 1000);
            }
            }else{
                this.loading=false
            }
          
           
        },

        /** 取消 */
        cancel(){
            this.modal=false
        },

        /**选择通过或驳回 */
        ifTextarea(){
            if(this.choose=='pass'){
                this.showTextarea=false
            }else if(this.choose=='reject'){
                this.showTextarea=true  
            }
        },

        /**查看大图 */
        bigImage(){
            this.visible=true
        },

        /** 改变申请条件 */
        changeFilter(){
            this.fetchData()
        }
    }
}
</script>

<style>
.divbox{
    padding: 20px 40px;
}
.divbox .item{
    margin-bottom: 15px;
}
.divbox .itemtext{
    margin-right: 15px;
}
.fl{
    float: left;
}
.clearfix:after{
    content:"";
    height:0;
    line-height:0;
    display:block;
    visibility:hidden;
    clear:both;
}
.clearfix{
    zoom: 1;
}
.pic{
    width:auto;
    height:auto;
    max-width:100%;
    max-height:100%;
}
.picbox{
    width:50px;
    height:50px;
}
.bigImage{
    display: inline-block;
    color: #2d8cf0;
    cursor: pointer;
    margin-top: 30px;
    margin-left: 10px;
}
</style>
