<template>
  <div>
    <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
    <Modal v-model="modal" @on-ok="sure" @on-cancel="cancel" title="题目详情" :loading="loading">
      <div class="divbox">
        <div class="item">
          <span class="itemtext">题目 :</span>
          {{quesObj.memo}}
        </div>
        <div class="item" v-if="quesObj.answer">
          <span class="itemtext">答案 :</span>
          {{quesObj.answer}}
        </div>
        <div class="item clearfix"  v-if="length>0">
          <span class="fl itemtext">图片 :</span>
          <ul class="fl picbox">
            <li v-for="(item,index) in quesObj.pics" :key="index" style="width: 50px;height:50px;float:left;margin-right:5px; ">
              <img class="pic" :src="item.url " @click="bigImage(item.url)">
            </li>
          </ul>
          <!-- <span @click="bigImage" class="bigImage">大图</span> -->
        </div>
        <div class="item clearfix" v-if="quesObj.media!='0'">
          <span class="fl itemtext">视频 :</span>
          <video :src="quesObj.url" height="150px" controls='controls' preload="preload"></video>
        </div>
        <div class="item">
          <span class="itemtext">
            <span style="color:red;">*</span> 审核意见:
          </span>
          <RadioGroup v-model="choose" @on-change="ifTextarea">
            <Radio label="pass">通过</Radio>
            <Radio label="reject">驳回</Radio>
          </RadioGroup>
          <!-- <span v-if="already">{{auditMessage}} </span> -->
          <div v-if="showTextarea" style="margin:20px 0 0 70px;">
            <Input v-model="reason" type="textarea" placeholder="驳回理由" style="width:300px;"/>
          </div>
        </div>
      </div>
    </Modal>
    <Modal v-model="visible" style="width:300px;">
        <img :src="bigimage" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl } from "@/common.js";
import { constants } from "crypto";

export default {
  data() {
    return {
      tableTitle: [
        {
          key: "num",
          title: "序号",
          width: 80
        },
        {
          key: "title",
          title: "题目",
          width: 400,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "answer",
          title: "答案",
          width: 400,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "action",
          title: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let obj = {
                        uid: this.openid,
                        token: this.token,
                        applyid: params.row.id,
                        qid: params.row.qid
                      };
                      // console.log(obj)
                      axios
                        .post(
                          serverUrl + "/api/pcindex.php?act=getQuestionDetail",
                          obj
                        )
                        .then(res => {
                          console.log(res.data)
                          this.applyid=res.data.applyid
                          this.quesObj = res.data.detail;
                          this.length=this.quesObj.pics.length
                        });
                      this.modal = true;
                    }
                  }
                },
                "审核"
              )
            ]);
          }
        }
      ],
      tableData: [],
      tableLoading: false,
      modal: false,
      loading: true,
      quesObj: {},
      applyid:'',
      choose: "",
      reason: "",
      showTextarea: false,
      bigimage:'',
      visible:false,
      length:0
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    openid() {
      return this.$store.state.user.userId;
    },
    token() {
      return this.$store.state.user.token;
    }
  },
  methods: {
    fetchData() {
      this.tableLoading = true;
      axios
        .get(serverUrl + "/api/pcindex.php?act=getSysQuestionApplyList", {
          uid: this.openid,
          token: this.token
        })
        .then(res => {
          console.log(res.data);
          let arr = res.data;
          arr.forEach((item, index) => {
            item.num = index + 1;
          });
          this.tableData = arr;
          this.tableLoading = false;
        });
    },

    /**提交审核 */
    sure() {
      if (this.choose != "") {
        let status = this.choose == "pass" ? 1 : -1;

        if (this.choose == "reject" && this.reason == "") {
          this.$Modal.error({
            title: "错误",
            content: "请填写驳回理由！"
          });
          setTimeout(() => {
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
          }, 1000);
        } else {
          let reason = this.choose == "reject" ? this.reason : "";
          let params = {
            uid: this.openid,
            token: this.token,
            applyid: this.applyid,
            qid: this.quesObj.questionid,
            status: status,
            reason:this.reason
          };
          axios
            .post(serverUrl + "/api/pcindex.php?act=reviewSysQuestionApply", params)
            .then(res => {
              console.log(res.data);
              if (res.data.status) {
                  this.$Message.success('操作成功！')
                this.modal = false;
                this.loading = false;
                 this.fetchData();
              }
            });
         
        }
      } else {
        this.$Modal.error({
          title: "错误",
          content: "请填写审核意见！"
        });
        setTimeout(() => {
          //解决modal的确定按钮关闭问题
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }, 1000);
      }
    },

    /** 取消 */
    cancel() {
      this.modal = false;
    },

    /**选择通过或驳回 */
    ifTextarea() {
      if (this.choose == "pass") {
        this.showTextarea = false;
      } else if (this.choose == "reject") {
        this.showTextarea = true;
      }
    },
    bigImage(url){
        this.bigimage=url
        this.visible=true
    },
  }
};
</script>

<style>
.divbox {
  padding: 20px 40px;
}
.divbox .item {
  margin-bottom: 15px;
}
.divbox .itemtext {
  margin-right: 15px;
}
.fl {
  float: left;
}
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.pic {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;

}
.picbox {
  list-style-type: none;
}
.bigImage {
  display: inline-block;
  color: #2d8cf0;
  cursor: pointer;
  margin-top: 30px;
  margin-left: 10px;
}
</style>
