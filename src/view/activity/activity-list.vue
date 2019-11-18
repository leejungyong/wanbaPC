<style lang="less">
@import "./common.less";
</style>

<template>
  <div class="activity-list">
    <div class="refresh">
      <Button @click="refreshList" >刷新数据</Button>
      <Button @click="toNewAct" type="primary" style="margin-left: 20px;">新建活动</Button>
       <!-- <Button type="text">活动模板下载</Button> -->
       <span class="downloadExcel clearfix">
        <Button type="info" ghost to="http://img.wondfun.com/wanba/api/download/wanba_act_template.xlsx" target="_blank">活动模板下载</Button>
       </span>

    </div>
    
    <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
   <Modal
        v-model="modal"
        title="导入excel"
        @on-ok="ok"
        @on-cancel="cancel">
    <Row>
        <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
          <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
        </Upload>
        <!-- <span @click="showList">查看详情</span> -->
      </Row>
   
       <Row>
        <div class="ivu-upload-list-file" v-if="file !== null">
          <Icon type="ios-stats"></Icon>
            {{ file.name }}
          <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
        </div>
      </Row>
      <Row>
        <transition name="fade">
          <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
            <div v-if="progressPercent == 100">
              <Icon type="ios-checkmark-circle"></Icon>
              <span>成功</span>
            </div>
          </Progress>
        </transition>
      </Row>
    </Modal>

  </div>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
import excel from '@/libs/excel'
import { type } from 'os';
import { constants } from 'fs';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import {serverUrl} from '@/common.js';

export default {
  name: "activity-list",
  data() {
    return {
      modal:false,
      modal2:false,
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableTitle2:[],
      tableData2:[],
      tableLoading: false,
      tableTitle: [
        {
          key: "date",
          title: "时间"
        },
        {
            key:'title',
            title:'活动名称'
        },
        {
            key:'sharepic',
            title:'图片'
        },
        {
            key:'action',
            title:'操作',
            render: (h,params)=>{
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
                                this.aid=params.row.aid
                            }
                        }
                    },'导入'),
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                axios.post(serverUrl+'/api/pcindex.php?act=getTaskList',{aid:params.row.aid,openid:this.uid}).then(res=>{
                                  if(res){
                                    console.log(res)
                                     if(res.data.length>0){
                                      this.$router.push({ name: '活动编辑'})
                                      this.setAObj(params.row)
                                      this.setOpenid(this.uid)
                                    }
                                    else if(res.data.length==0){
                                      this.$Modal.error({
                                          title:'提示',
                                          content:'请先导入活动！'
                                        })
                                    }
                                  }
                                   
                                })

                            }
                        }
                    },'编辑')
                ])
            }
        }
      ],
      tableData: [],
      uid: "",
      aid:'',
      type:['0-人工判定', '1-自动精确匹配', '2-自动模糊匹配', '3-答案包含在回答里', '4-回答包含在答案里', '5-教练提交管理员判定', '6-N里多选','7-教练评分'],

    };
  },
  created() {
      this.getList()
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    }, 

  },
  methods: {
    ...mapMutations([
      'setAObj',
      'setOpenid'
    ]),

    /** 跳转至新建活动 */
    toNewAct(){
      this.$router.push({name:'新建活动'})
    },
    refreshList(){
      // console.log('hhhhh')
      this.getList()
      console.log(this.$store.state.user.avatarImgPath)
    },
      /** 获取活动列表 */
    getList() {
      this.tableLoading=true
      this.uid = Cookie.get("uid");
      axios
        .post(serverUrl+"/api/pcindex.php?act=pcMyActData", { openid: this.uid })
        .then(res => {
         if(res){
             this.tableData=res.data.actNow
             this.tableLoading=false
         }
        });
    },
    initUpload () {
      this.file = null
      this.showProgress = false
      this.loadingProgress = 0
      this.tableData2= []
      this.tableTitle2 = []
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleRemove () {
      this.initUpload()
      this.$Message.info('上传的文件已删除！')
    },
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        // this.file = file
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
       // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
        // this.tableLoading = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round(e.loaded / e.total * 100)
      }
      reader.onerror = e => {
        this.$Message.error('文件读取出错')
      }

      reader.onload = e => {
        const data = e.target.result
        const { header, results } = excel.read(data, 'array')
    
        //判断必填项
        let flex=  results.every(item=>{
          return (
            item.点位名称!=undefined&&item.任务介绍!=undefined&&item.问题类型!=undefined
          )
        })

        let flex2=results.every(item=>{
          return (
            item.点位名称!=undefined&&item.任务介绍==undefined&&item.问题类型==undefined
          )
        })

        let count=0
        let countAnswer=0

      if(flex||flex2){
          let reg=/^[0-9]+(\.\d+)?[,][0-9]+(\.\d+)?$/
            for(let i=0;i<results.length;i++){
          //判断gps坐标
          if(results[i].原始gps坐标!=undefined||results[i].腾讯地图坐标!=undefined){
            if(results[i].原始gps坐标){
              let str=results[i].原始gps坐标
             
              if(reg.test(str)){
                let arr_tmp=str.split(',')
          
                if(arr_tmp[0]<0||arr_tmp[0]>90){
                  this.$Modal.error({
                    title:'错误',
                    content:'点位'+results[i].序号+':'+'纬度范围必须在0-90之间'
                  })
                }
                if(arr_tmp[1]<0||arr_tmp[1]>180){
                 
                  this.$Modal.error({
                    title:'错误',
                    content:'点位'+results[i].序号+':'+'经度必须在0-180之间！'
                  })
                }
                if(arr_tmp[0]>=0&&arr_tmp[0]<=90&&arr_tmp[1]>=0&&arr_tmp[1]<=180){
                   count=count+1
                }
              }else{
                    this.$Modal.error({
                    title:'错误',
                    content:'点位'+results[i].序号+':'+`请输入正确的经纬度格式，例如(30,120)，注意：请用英文的逗号`
                  })
              }
            }else if(results[i].腾讯地图坐标){
                 let str=results[i].腾讯地图坐标
                 
              if(reg.test(str)){
                let arr_tmp=str.split(',')
              
                if(arr_tmp[0]<0||arr_tmp[0]>90){ 
                  this.$Modal.error({
                    title:'错误',
                    content:'点位'+results[i].序号+':'+'纬度范围必须在0-90之间'
                  })
                }
                if(arr_tmp[1]<0||arr_tmp[1]>180){
                 
                  this.$Modal.error({
                    title:'错误',
                    content:'点位'+results[i].序号+':'+'经度必须在0-180之间！'
                  })
                }
                if(arr_tmp[0]>=0&&arr_tmp[0]<=90&&arr_tmp[1]>=0&&arr_tmp[1]<=180){
                   count=count+1
                }
              }else{
                    this.$Modal.error({
                    title:'错误',
                    content:'点位'+results[i].序号+':'+`请输入正确的经纬度格式，例如(30,120)，注意：请用英文的逗号`
                  })
              }
            }
          }else{
            this.$Modal.error({
                    title:'错误',
                    content:'点位'+results[i].序号+':'+`请至少填写'原始gps坐标'或'腾讯地图坐标'的一种`
                  })
          }
          // 判断问题类型及答案
          let quesType=results[i].问题类型
          if(!flex2){
                     if(results[i].序号!=25){
          if(this.type.indexOf(quesType)!=-1){
             if(quesType.substring(0,1)==2||quesType.substring(0,1)==6){
            let answer=results[i].答案
            if(answer!=undefined){
               if(answer.indexOf('|')==-1){
              this.$Modal.error({
                title:'错误',
                content:'点位'+results[i].序号+':'+`问题类型为2或6时，答案必须包含'|'`
              })
              countAnswer++
            }
            }else if(answer==undefined){
              this.$Modal.error({
                title:'错误',
                content:'点位'+results[i].序号+':'+`问题类型为2或6时，答案不能为空`
              })
              countAnswer++
            }
          }else if(quesType.substring(0,1)==1||quesType.substring(0,1)==3||quesType.substring(0,1)==4){
            if(results[i].答案==undefined){
              this.$Modal.error({
                 title:'错误',
                content:'点位'+results[i].序号+':'+`答案填入错误，不能为空`
              })
              countAnswer++
            }
          }
          }else{
             this.$Modal.error({
                 title:'错误',
                content:'点位'+results[i].序号+':'+`问题类型填写错误`
              })
              countAnswer++
          }
          }else if(results[i].序号==25){
          results[i].问题类型=this.type[5]
            results[i].答案=''
          }
          }
        }
      }else{
          this.$Modal.error({
                title:'错误',
                content:`请填写完整表格数据！`
          })
      }

      if(count==results.length&&countAnswer==0){
          this.file=file
        this.showProgress = true
        const tableTitle2=header.map(item=>{return {title:item,key:item}})
        this.tableData2=results
        this.tableTitle2=tableTitle2
        this.uploadLoading = false
        // this.tableLoading = false
        this.showRemoveFile = true

         this.$Message.info('文件读取成功')
      }else{
        this.file=null
        // this.showProgress=false
        this.uploadLoading = false
        // this.tableLoading = false
        this.showRemoveFile=true
        this.$Message.info('文件上传失败')
      }

      }
    },
    ok(){
        this.modal=false
        // console.log(this.tableData2)
        axios.post(serverUrl+'/api/pcindex.php?act=batchImportPos',{aid:this.aid,list:this.tableData2}).then(res=>{
            if(res.data.status){
              console.log(res.data)
                this.file = null
                this.showProgress = false
                this.loadingProgress = 0
                this.tableTitle2=res.data.tasklist
            }
        })
        
    },
    cancel(){
        this.modal=false
        this.initUpload()
    }

  }
};
</script>

<style>
</style>
