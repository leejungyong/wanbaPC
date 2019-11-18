<template>
  <div>
        <Input
      icon="ios-search-outline"
      placeholder="请输入关键字"
      v-model="keyword"
      @on-enter="searchUser"
      @on-click="searchUser"
      style="width:200px;margin-bottom:10px;"
    />
    <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
    <div class="pagebox">
      <Page
        :total="total"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :current="currentPage"
        :page-size="pageSize"
        show-sizer
      />

      <span style="float:left;margin-left: 185px;margin-top:-20px;">共{{total}}个题目</span>
    </div>
    <Modal v-model="showEditQues" title="编辑题目" @on-ok="clickSure" :loading="loading">
      <div style="padding:0 5px;">
        <p class="item_text">题目描述</p>
        <Input v-model="quesObj.memo"/>
        <p class="item_text">问题类型</p>
        <Select v-model="quesObj.qtype" style="width:160px" @on-change="changeOption">
          <Option v-for="item in quesTypeArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div v-if="showAnswerInput">
          <p class="item_text">答案</p>
          <Input v-model="quesObj.answer"/>
        </div>

        <p class="item_text">上传图片</p>
        <div class="demo-upload-list" v-for="(item,index) in imgList" :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :default-file-list="defaultList"
          :format="['jpg']"
          :max-size="1024"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :data="myparams"
          multiple
          type="drag"
          :action="uploadImgUrl"
          style="display: inline-block;width:58px;"
        >
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
        <p class="item_text">上传音频</p>
        <Upload
          ref="uploadMp3"
          :action="uploadMp3Url"
          :format="['mp3']"
          :max-size="8192"
          :on-format-error="handleFormatMp3"
          :on-exceeded-size="handleMaxSizeMp3"
          :on-success="handleSuccessMp3"
          :on-remove="handleRemoveMp3"
          :data="myparams"
          :default-file-list="defaultListofMp3"
          :show-upload-list="true"
          :before-upload="handleBeforeUploadMp3"
          :on-preview="linkToMp3"
        >
          <Button icon="ios-cloud-upload-outline">上传音频</Button>
        </Upload>
        <p class="item_text">上传视频</p>
        <Upload
          ref="uploadMp4"
          :action="uploadMp4Url"
          :format="['mp4']"
          :max-size="8092"
          :on-format-error="handleFormatMp4"
          :on-exceeded-size="handleMaxSizeMp4"
          :on-success="handleSuccessMp4"
          :on-remove="handleRemoveMp4"
          :data="myparams"
          :default-file-list="defaultListofMp4"
          :show-upload-list="true"
          :before-upload="handleBeforeUploadMp4"
          :on-preview="linkToMp4"
        >
          <Button icon="ios-cloud-upload-outline">上传视频</Button>
        </Upload>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl,questionType } from "@/common.js";
import { setTimeout } from "timers";
import { loadavg } from "os";
import { truncate } from "fs";
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
          key: "memo",
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
                      this.defaultListofMp3 = [];
                      this.defaultListofMp4 = [];
                      this.defaultList = [];
                      this.showEditQues = true;
                      this.currentIndex = params.row.num - 1;
                      this.quesObj = params.row;
                      if (
                        this.quesObj.qtype == "0" ||
                        this.quesObj.qtype == "5"
                      ) {
                        this.showAnswerInput = false;
                      } else {
                        this.showAnswerInput = true;
                      }

                      this.myparams.questionid = params.row.questionid;
                      this.myparams.openid = this.openid;

                      let arr = params.row.pics.map((item, index) => {
                        return { name: item.picid, url: item.url };
                      });
                      setTimeout(() => {
                        this.defaultList = arr;
                        this.$nextTick(() => {
                          this.imgList = this.$refs.upload.fileList;
                        });
                      }, 100);

                      let a = [];
                      a.push(params.row);
                      if (params.row.media == "1") {
                        let arr1 = a.map((item, index) => {
                          if (item.url) {
                            return { name: "试听.mp3", url: item.url };
                          }
                        });
                        // console.log(arr)
                        if (arr1[0] != undefined) {
                          setTimeout(() => {
                            this.defaultListofMp3 = arr1; //将获取到的值赋值到 defaultList 中
                            this.$nextTick(() => {
                              //赋值后马上更新
                            });
                          }, 100);
                        }
                      } else if (params.row.media == "2") {
                        let arr1 = a.map((item, index) => {
                          if (item.url) {
                            return { name: "试看.mp4", url: item.url };
                          }
                        });
                        // console.log(arr)
                        if (arr1[0] != undefined) {
                          setTimeout(() => {
                            this.defaultListofMp4 = arr1; //将获取到的值赋值到 defaultList 中
                            this.$nextTick(() => {
                              //赋值后马上更新
                            });
                          }, 1000);
                        }
                      }
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      pageSize: 10,
      total: null,
      showEditQues: false,
      keyword:'',
      quesTypeArr: questionType,
      quesObj: {
        //某一行的问题对象
        questionid: "",
        memo: "",
        qtype: "",
        pics: [],
        url: "",
        answer: ""
      },

      imgList: [], //显示的图片列表
      defaultList: [], //默认的图片列表
      defaultListofMp3: [], //默认的音频
      defaultListofMp4: [], //默认的视频
      myparams: {}, //上传图片时传的参数
      myparamsOfMp3: {},
      myparamsOfvideo: {},

      uploadImgUrl: serverUrl + "/api/pcuploadquestionpic.php",
      uploadMp3Url: serverUrl + "/api/pcuploadquestionaudio.php",
      uploadMp4Url: serverUrl + "/api/pcuploadquestionvideo.php",
      currentIndex: 0,

      showAnswerInput: false,
      loading: true
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.imgList = this.$refs.upload.fileList;
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

    //关键词搜索
    searchUser(){
      this.currentPage = 1;
      // this.tableLoading = true;
      this.fetchData()
    },
    fetchData() {
      this.tableLoading = true;
      axios
        .post(serverUrl + "/api/pcindex.php?act=getSysQuestionList", {
          uid: this.openid,
          token: this.token,
          currentpage: this.currentPage - 1,
          pagesize: this.pageSize,
          keyword:this.keyword
        })
        .then(res => {
          console.log(res.data);
          this.total = parseInt(res.data.count);
          let arr = res.data.list;
          arr.forEach((item, index) => {
            item.num = (this.currentPage - 1) * this.pageSize + index + 1;
          });
          this.tableData = arr;
          this.tableLoading = false;
        });
    },

    /** 图片上传成功 */
    handleSuccess(res, file) {
      // console.log(res)
      // console.log(file)
      file.url = res.url;
      //   file.name = res.files.file.name;
      file.name = file.name;
      let pObj = {
        displayorder: "0",
        picid: res.picid,
        // taskid: res.files.file.taskid,
        url: file.url
      };
      this.tableData[this.currentIndex].pics.push(pObj);
    },

    /** 删除图片 */
    handleRemove(file) {
      this.$Modal.confirm({
        title: "删除确认",
        content: "确认删除该图片吗？",
        onOk: () => {
          const fileList = this.$refs.upload.fileList;
          let index = fileList.indexOf(file);
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          this.tableData[this.currentIndex].pics.splice(index, 1);
          axios
            .post(serverUrl + "/api/pcindex.php?act=delSysQuestionPicById", {
              picid: file.name,
              openid: this.openid
            })
            .then(res => {
              if (res) {
                console.log(res.data);
              }
            });
        },
        onCancel: () => {}
      });
    },

    /**图片格式错误 */
    handleFormatError(file) {
      this.$Notice.warning({
        title: "图片格式错误",
        desc: "请上传jpg格式的图片！"
      });
    },
    /** 图片超出限制 */
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "图片大小超出限制",
        desc: "图片大小不能超过1M!"
      });
    },
    /**在图片上传之前，判断数量 */
    handleBeforeUpload(file) {
      const check = this.imgList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传5张图片！"
        });
      }
      return check;
    },

    /** 音频文件上传错误 */
    handleFormatMp3(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "请上传mp3格式！"
      });
    },
    /** 音频文件上传成功 */
    handleSuccessMp3(res, file) {
      console.log(res);
      console.log(file);
      file.url = res.files.file.url;
      // file.name =res.files.file.name;
      file.name = "试听.mp3";
      this.tableData[this.currentIndex].media = res.files.file.media;
      this.tableData[this.currentIndex].url = res.files.file.url;
      this.$Message.info("音频上传成功");
    },
    /**音频文件上传之前 */
    handleBeforeUploadMp3() {
      if (this.$refs.uploadMp3.fileList) {
        this.$refs.uploadMp3.fileList.shift();
      }
    },

    /**音频文件删除 */
    handleRemoveMp3(file) {
      console.log(file);
      console.log(this.defaultListofMp3);
      console.log(this.myparams.questionid);

      this.$Modal.confirm({
        title: "音频删除",
        content: "确认删除该音频吗？",

        onOk: () => {
          axios
            .post("/api/pcindex.php?act=delQuestionMp3ById", {
              uid: this.openid,
              questionid: this.myparams.questionid,
              url: file.url
            })
            .then(res => {
              if (res) {
                console.log(res.data);
                console.log("删除成功");
                this.tableData[this.currentIndex].media = "0";
                this.tableData[this.currentIndex].url = "";
                this.defaultListofMp3.name = "";
                this.defaultListofMp3.url = "";
              }
            });
        },
        onCancel: () => {}
      });
    },

    /** 限制音频大小 */
    handleMaxSizeMp3(file) {
      console.log(file);
      this.$Notice.warning({
        title: "音频大小超出限制",
        desc: "请上传小于8M的音频！"
      });
    },

    /** 点击已上传的音频链接 */
    linkToMp3(file) {
      window.open(file.url, "_blank");
    },
    /**视频格式上传错误 */
    handleFormatMp4(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "请上传mp4格式！"
      });
    },
    /** 限制视频大小 */
    handleMaxSizeMp4(file) {
      console.log(file);
      this.$Notice.warning({
        title: "视频大小超出限制",
        desc: "请上传小于8M的视频！"
      });
    },

    /** 视频文件上传成功 */
    handleSuccessMp4(res, file) {
      console.log(res);
      console.log(file);
      file.url = res.files.file.url;
      // file.name =res.files.file.name;
      file.name = "试看.mp4";
      this.tableData[this.currentIndex].media = res.files.file.media;
      this.tableData[this.currentIndex].url = res.files.file.url;
      this.$Message.info("视频上传成功");
    },

    /**视频文件上传之前 */
    handleBeforeUploadMp4() {
      if (this.$refs.uploadMp4.fileList) {
        this.$refs.uploadMp4.fileList.shift();
      }
    },

    /** 移除视频 */
    handleRemoveMp4(file) {
      console.log(this.defaultListofMp4);
      this.$Modal.confirm({
        title: "视频删除",
        content: "确认删除该视频吗？",

        onOk: () => {
          axios
            .post("/api/pcindex.php?act=delQuestionMp4ById", {
              uid: this.openid,
              questionid: this.myparams.questionid,
              url: file.url
            })
            .then(res => {
              if (res) {
                console.log(res.data);
                console.log("删除成功");
                this.tableData[this.currentIndex].media = "0";
                this.tableData[this.currentIndex].url = "";
                this.defaultListofMp4.name = "";
                this.defaultListofMp4.url = "";
              }
            });
        },
        onCancel: () => {}
      });
    },
    /** 点击已上传的视频链接 */
    linkToMp4(file) {
      window.open(file.url, "_blank");
    },

    /**点击确定，保存编辑 */
    clickSure() {
      let questiondata = {
        memo: this.quesObj.memo,
        qid: this.quesObj.questionid,
        index: this.quesObj.qtype,
        answer: this.quesObj.answer
      };
      if (questiondata.memo == "") {
        this.$Message.error("*星号为必填项！");
        setTimeout(() => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }, 500);
      } else {
        console.log(questiondata);
        if (questiondata.index == "0" || questiondata.index == "5") {
          axios
            .post(serverUrl + "/api/pcindex.php?act=newQuestion", {
              questiondata: questiondata,
              openid: this.openid
            })
            .then(res => {
            //   console.log(res.data);
              if (res.data.status) {
                this.$Message.success("保存成功!");
                this.loading = false;
                this.showEditQues = false;
              }
            });
            this.loading=true
        } else {
          if (questiondata.answer == "") {
            this.$Message.error("答案不能为空！");
            setTimeout(() => {
              this.loading = false;
              this.$nextTick(() => {
                this.loading = true;
              });
            }, 100);
          } else {
            axios
              .post(serverUrl + "/api/pcindex.php?act=newQuestion", {
                questiondata: questiondata,
                openid: this.openid
              })
              .then(res => {
                // console.log(res.data);
                if (res.data.status) {
                  this.$Message.success("保存成功!");
                  this.loading = false;
                  this.showEditQues = false;
                }
              });
              this.loading=true
          }
        }
      }
    },

    /** 问题类型改变时 */
    changeOption(value) {
      if (this.quesObj.qtype == "0" || this.quesObj.qtype == "5") {
        this.showAnswerInput = false;
        this.quesObj.answer = "";
      } else {
        this.showAnswerInput = true;
      }
    },

    pageChange(index) {
      this.currentPage = index;
      this.fetchData();
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    }
  }
};
</script>

<style>
@import "./common.less";
.pagebox {
  text-align: center;
  margin-top: 20px;
}
</style>
