<style>
@import "./common.less";
</style>

<template>
  <div>
      <Button type="primary" @click="replaceAll" style="margin-bottom:5px;">全部替换</Button>
    <Card title="活动信息" class="card">
      <Row>
        <span class="a_info">建立时间:</span>
        <span class="a_info_act">{{aObj.date}}</span>
      </Row>
      <Row class="margin-top-10">
        <span class="a_info">活动名称:</span>
        <span class="a_info_act">{{aObj.title}}</span>
      </Row>
      <Row class="margin-top-10">
        <span class="a_info">图片:</span>
        <span class="a_info_act">{{aObj.sharepic}}</span>
      </Row>
    </Card>
    <Row class="margin-top-20">
      <Table :columns="tableTitle" :data="tableData">
        <template slot-scope="{row,index}" slot="name">
          <Input type="text" v-model="editObj.editName" v-if="editIndex===index"/>
          <span v-else>{{row.name}}</span>
        </template>

        <template slot-scope="{row,index}" slot="pmemo">
          <Input type="text" v-model="editObj.editPmemo" v-if="editIndex===index"/>
          <span v-else>{{row.pmemo}}</span>
        </template>

        <template slot-scope="{row,index}" slot="poi">
          <Input type="text" v-model="editObj.editPoi" v-if="editIndex===index"/>
          <span v-else>{{row.poi}}</span>
        </template>

        <template slot-scope="{row,index}" slot="latlng">
          <Input type="text" v-model="editObj.editlatlng" v-if="editIndex===index"/>
          <span v-else>{{row.latlng}}</span>
        </template>

        <template slot-scope="{row,index}" slot="memo">
          <Input type="text" v-model="editObj.editMemo" v-if="editIndex===index"/>
          <span v-else>{{row.memo}}</span>
        </template>

        <template slot-scope="{row,index}" slot="qtype">
          <!-- <Input type="text" v-model="editObj.editQtype" v-if="editIndex===index"/>
          <span v-else>{{row.qtype}} </span>-->
          <Select v-model="editObj.editQtype" style="width:100px" v-if="editIndex===index">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span v-else>{{row.qtype}}</span>
        </template>

        <template slot-scope="{row,index}" slot="answer">
          <Input type="text" v-model="editObj.editAnswer" v-if="editIndex===index"/>
          <span v-else>{{row.answer}}</span>
        </template>

        <template slot-scope="{row,index}" slot="action">
          <div v-if="editIndex===index">
            <Button @click="saveEdit(row,index)" size="small">保存</Button>
            <Button @click="cancelEdit()" size="small" style="margin-left:10px">取消</Button>
          </div>
          <div v-else>
            <Button type="primary" size="small" @click="handleEdit(row,index)">编辑</Button>
            <Button
              type="primary"
              size="small"
              @click="uploadPicture(row,index)"
              style="margin-left:4px"
            >图片</Button>
            <Button
              type="primary"
              size="small"
              @click="uploadMp3(row,index)"
              style="margin-left:4px"
            >音频</Button>
            <Button
              type="primary"
              size="small"
              @click="uploadMp4(row,index)"
              style="margin-left:4px"
            >视频</Button>
          </div>
        </template>
      </Table>
    </Row>

    <Modal title="上传图片" v-model="modal" @on-ok="ok" @on-cancel="cancel">
      <div class="demo-upload-list" v-for="item in uploadList">
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
      <Modal title="View Image" v-model="visible">
        <div class="imgLarge">
          <img :src="imgName " v-if="visible" style="width: 100%">
        </div>
      </Modal>
    </Modal>
    <Modal title="上传音频" v-model="modalAvi" @on-ok="ok" @on-cancel="cancel">
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
    </Modal>
    <Modal title="上传视频" v-model="modalMp4" @on-ok="ok" @on-cancel="cancel">
      <Upload
        ref="uploadMp4"
        :action="uploadMp4Url"
        :format="['mp4']"
        :max-size="8092"
        :on-format-error="handleFormatMp4"
        :on-exceeded-size="handleMaxSizeMp4"
        :on-success="handleSuccessMp4"
        :on-remove="handleRemoveMp4"
        :data="myparamsOfvideo"
        :default-file-list="defaultListofMp4"
        :show-upload-list="true"
        :before-upload="handleBeforeUploadMp4"
        :on-preview="linkToMp4"
      >
        <Button icon="ios-cloud-upload-outline">上传视频</Button>
      </Upload>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import { constants } from "fs";
import { serverUrl ,questionType} from "@/common.js";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      tableTitle: [
        {
          key: "displayorder",
          title: "序号",
          width: 60
        },
        {
          slot: "name",
          title: "点位名称",
          width: 90
        },
        {
          slot: "pmemo",
          title: "点位说明",
          width: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          slot: "poi",
          title: "原始gps坐标",
          width: 90
        },
        {
          slot: "latlng",
          title: "腾讯地图坐标",
          width: 90
        },
        {
          slot: "memo",
          title: "任务介绍",
          width: 150,
          ellipsis: true,
          tooltip: true
        },
        {
          slot: "qtype",
          title: "问题类型",
          width: 90
        },
        {
          slot: "answer",
          title: "答案",
          width: 150
        },
        {
          slot: "action",
          title: "操作"
        }
      ],
      tableData: [],
      tableLoading: false,
      modal: false, //显示上传图片弹框
      modalAvi: false, //显示上传音频弹框
      modalMp4: false, //显示上传视频弹框
      imgName: "",

      visible: false, //控制图片大图的显示

      myparams: {}, //上传音频时传的参数
      myparamsOfvideo:{},//上传视频时传的参数

      uploadList: [], //显示的图片列表
      currentIndex: 0, //当前行在tableData中的索引
      defaultList: [], //默认的图片列表
      defaultListofMp3: [], //默认的音频
      defaultListofMp4:[],  //默认的视频
      uploadImgUrl: serverUrl + "/api/pcupload.php",
      uploadMp3Url: serverUrl + "/api/mp3upload.php",
      uploadMp4Url: serverUrl + "/api/videoupload.php",
      editIndex: -1, //当前聚焦的输入框的行数

      editObj: {
        //编辑的对象
        editName: "",
        editPmemo: "",
        editPoi: "",
        editlatlng: "",
        editMemo: "",
        editQtype: "",
        editAnswer: ""
      },

      type: ["0", "1", "2", "3", "4", "5", "6"], //问题类型
      typeList: questionType
    };
  },
  created() {
    this.initList();
  },

  computed: {
    aObj() {
      return this.$store.state.app.aObj;
    },
    openId() {
      return this.$store.state.user.userId;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    /** 活动点位列表 */
    initList() {
      console.log(this.openId);
      if (this.openId == undefined || this.openId == "") {
        this.tableData = [];
        console.log(this.tableData);
        return;
      } else {
        this.tableLoading = true;
        axios
          .post(serverUrl + "/api/pcindex.php?act=getTaskList", {
            aid: this.aObj.aid,
            openid: this.openId
          })
          .then(res => {
            if (res) {
              console.log(res.data);
              this.tableData = res.data;
              this.tableLoading = false;
            }
          });
      }
    },
    /**显示图片的大图 */
    handleView(name) {
      for (let i = 0; i < this.uploadList.length; i++) {
        if (name == this.uploadList[i].name) {
          this.imgName = this.uploadList[i].url;
        }
      }
      this.visible = true;
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
            .post(serverUrl + "/api/pcindex.php?act=delPicById", {
              picid: file.name,
              openid: this.myparams.uid
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

    /** 图片上传成功 */
    handleSuccess(res, file) {
        // console.log(res)
        // console.log(res)
      file.url = "http://www.wondfun.com/wanba/api/" + res.files.file.url;
      file.name = res.files.file.name;
      let pObj = {
        displayorder: "0",
        picid: res.files.file.picid,
        taskid: res.files.file.taskid,
        url: file.url
      };

      this.tableData[this.currentIndex].pics.push(pObj);
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
      const check = this.uploadList.length < 5;
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
      file.url = "http://www.wondfun.com/wanba/api/" + res.files.file.url;
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
      console.log(this.defaultListofMp3);
      this.$Modal.confirm({
        title: "音频删除",
        content: "确认删除该音频吗？",

        onOk: () => {
          axios
            .post("/api/pcindex.php?act=delMp3ById", {
              uid: this.myparams.uid,
              taskid: this.myparams.taskid,
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
        console.log(res)
      file.url = "http://www.wondfun.com/wanba/api/" + res.files.file.url;
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
    handleRemoveMp4(file){
        console.log(this.defaultListofMp4);
      this.$Modal.confirm({
        title: "视频删除",
        content: "确认删除该视频吗？",

        onOk: () => {
          axios
            .post("/api/pcindex.php?act=delMp4ById", {
              uid: this.myparamsOfvideo.uid,
              taskid: this.myparamsOfvideo.taskid,
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

    /**编辑行信息 */
    handleEdit(row, index) {
      console.log(row);
      this.editObj.editName = row.name;
      this.editObj.editPmemo = row.pmemo;
      this.editObj.editPoi = row.poi;
      this.editObj.editlatlng = row.latlng;
      this.editObj.editMemo = row.memo;
      this.editObj.editQtype = row.qtype;
      this.editObj.editAnswer = row.answer;
      this.editIndex = index;
    },

    /**保存编辑 */
    saveEdit(row, index) {
      // let count=0
      if (
        this.editObj.editName &&
        this.editObj.editMemo &&
        this.editObj.editQtype
      ) {
        let reg = /^[0-9]+(\.\d+)?[,][0-9]+(\.\d+)?$/;
        if (this.editObj.editPoi || this.editObj.editlatlng) {
          let str = this.editObj.editPoi || this.editObj.editlatlng;
          if (reg.test(str)) {
            let arr_tmp = str.split(",");
            if (arr_tmp[0] < 0 || arr_tmp[0] > 90) {
              this.$Modal.error({
                title: "纬度错误",
                content: "纬度范围必须在0-90之间!"
              });
              return;
            }
            if (arr_tmp[1] < 0 || arr_tmp[1] > 180) {
              this.$Modal.error({
                title: "经度错误",
                content: "经度必须在0-180之间!"
              });
              return;
            }
          } else {
            this.$Modal.error({
              title: "错误",
              content: `请输入正确的经纬度格式，例如(30,120)，注意：请用英文的逗号`
            });
            return;
          }
        } else {
          this.$Modal.error({
            title: "错误",
            content: `请至少填写'原始gps坐标'或'腾讯地图坐标'的一种`
          });
          return;
        }

        let quesType = this.editObj.editQtype;
        if (index != 24) {
          if (this.type.indexOf(quesType) != -1) {
            if (quesType == 2 || quesType == 6) {
              if (this.editObj.editAnswer) {
                if (this.editObj.editAnswer.indexOf("|") == -1) {
                  this.$Modal.error({
                    title: "错误",
                    content: `问题类型为2或6时，答案必须包含'|'`
                  });
                  return;
                }
              } else {
                this.$Modal.error({
                  title: "错误",
                  content: `问题类型为2或6时，答案不能为空`
                });
                return;
              }
            } else if (quesType == 1 || quesType == 3 || quesType == 4) {
              if (!this.editObj.editAnswer) {
                this.$Modal.error({
                  title: "错误",
                  content: "问题类型为1、3、4时，答案不能为空"
                });
                return;
              }
            }
          } else {
            this.$Modal.error({
              title: "错误",
              content: "问题类型填写错误，必须是0-6之间的一个数"
            });
            return;
          }
        }
        this.tableData[index].name = this.editObj.editName;
        this.tableData[index].pmemo = this.editObj.editPmemo;
        this.tableData[index].poi = this.editObj.editPoi;
        this.tableData[index].latlng = this.editObj.editlatlng;
        this.tableData[index].memo = this.editObj.editMemo;
        this.tableData[index].qtype = this.editObj.editQtype;
        this.tableData[index].answer = this.editObj.editAnswer;
        this.editIndex = -1;
        this.myparams.taskid = row.taskid;
        this.myparams.uid = this.openId;
        let obj = {
          uid: this.myparams.uid,
          poiObj: this.tableData[index]
        };
        console.log(obj);

        axios
          .post(serverUrl + "/api/pcindex.php?act=pcEditPoi", obj)
          .then(res => {
            if (res) {
              console.log(res.data);
            }
          });
      } else {
        this.$Modal.error({
          title: "错误",
          content: "点位名称、任务介绍、问题类型为必填项！"
        });
        return;
      }
    },
    /**取消编辑 */
    cancelEdit() {
      this.editIndex = -1;
    },

    /**上传图片 */
    uploadPicture(row, index) {
      this.modal = true;
      this.myparams.taskid = row.taskid;
      this.myparams.uid = this.openId;
      this.currentIndex = index;

      let arr = row.pics.map((item, index) => {
        return { name: item.picid, url: item.url };
      });

      setTimeout(() => {
        this.defaultList = arr; //将获取到的值赋值到 defaultList 中
        this.$nextTick(() => {
          //赋值后马上更新
          this.uploadList = this.$refs.upload.fileList;
        });
      }, 1000);
    },

    /**上传音频 */
    uploadMp3(row, index) {
      this.modalAvi = true;
      this.myparams.taskid = row.taskid;
      this.myparams.uid = this.openId;
      this.currentIndex = index;
      let a = [];
      a.push(row);
      let arr = a.map((item, index) => {
        if (item.url) {
          return { name: "试听.mp3", url: item.url };
        }
      });
      // console.log(arr)
      if (arr[0] != undefined) {
        setTimeout(() => {
          this.defaultListofMp3 = arr; //将获取到的值赋值到 defaultList 中
          this.$nextTick(() => {
            //赋值后马上更新
          });
        }, 100);
      }
    },

    /**上传视频 */
    uploadMp4(row, index) {
      this.modalMp4 = true;
    //   console.log(this.tableData);
      this.myparamsOfvideo.taskid = row.taskid;
      this.myparamsOfvideo.uid = this.openId;
      this.currentIndex = index;
      let a = [];
            a.push(row);
      let arr = a.map((item, index) => {
        if (item.url) {
          return { name: "试看.mp4", url: item.url };
        }
      });
      // console.log(arr)
      if (arr[0] != undefined) {
        setTimeout(() => {
          this.defaultListofMp4 = arr; //将获取到的值赋值到 defaultList 中
          this.$nextTick(() => {
            //赋值后马上更新
          });
        }, 100);
      }
    },
    /** 全部替换 */
    replaceAll(){
        // console.log(this.aObj)
        this.$Modal.confirm({
          title:'警告',
          content:'确认要进行此操作吗？你所有点位的任务都将被替换为系统默认任务。',
          onOk:()=>{
        axios.post(serverUrl+'/api/pcindex.php?act=replaceWithSysTasks',{aid:this.aObj.aid}).then(res=>{
            // console.log(res.data)
            if(res.data.status){
                this.tableData=res.data.tasklist
                this.$Message.success('替换成功！')
            }
        })
          },
          onCancel:()=>{}
        })

    },
    ok() {},
    cancel() {}
  }
};
</script>

<style>
</style>
