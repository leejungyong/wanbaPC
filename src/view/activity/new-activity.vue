<template>
  <div id="new-activity">
    <Button @click="importFile" type="primary">文件导入</Button>
    <Cascader
      :data="cityArr"
      v-model="strArr"
      style="width:200px;display:inline-block;margin-left:25px;"
    ></Cascader>
    <Input v-model="keyword" style="width:200px;margin-left:10px;" placeholder="请输入关键字搜索" />
    <Button @click="search" style="margin-left:5px;">搜索</Button>

    <div>
      <div id="container" style="display:inline-block; width:75%;height:500px;margin-top:10px;"></div>
      <div class="right">
        <div class="poi-box">
          <div v-if="rightList.length==0" style="text-align:center;margin-top:20px;">尚未选择任何点位</div>
          <vuedraggable class="wrapper" v-model="rightList">
            <transition-group>
              <div
                v-for="(item,index) in rightList"
                :key="index"
                class="poi-item"
                @mouseover="showDel(index)"
                @mouseleave="notShowDel"
              >
                <div class="num">{{index+1}}</div>
                <div style="margin-left:30px;">
                  <div class="name">{{item.name}}</div>
                  <div>坐标 {{item.poi}}</div>
                </div>
                <div class="del" v-if="del==index">
                  <span @click="deletePoi(index)">❌</span>
                </div>
              </div>

            </transition-group>
          </vuedraggable>
          <div id='scroll' style="height: 30px;width: 100%;"></div>
        </div>
        <div class="btn-box">
          <Button @click="next" type="primary">下一步</Button>
        </div>
      </div>
    </div>
    <Modal v-model="showImport" title="文件导入" @on-ok="ok" @on-cancel="cancel">
      <row>
        <Upload action :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
          <Button
            icon="ios-cloud-upload-outline"
            :loading="uploadLoading"
            @click="handleUploadFile"
          >导入excel</Button>
        </Upload>
      </row>
      <row>
        <Upload action :before-upload="handleBeforeUpload1" accept=".kml">
          <Button
            icon="ios-cloud-upload-outline"
            :loading="uploadLoading1"
            @click="handleUploadFile"
          >导入谷歌kml轨迹</Button>
        </Upload>
      </row>
      <row>
        <Upload action :before-upload="handleBeforeUpload2" accept=".gpx">
          <Button
            icon="ios-cloud-upload-outline"
            :loading="uploadLoading2"
            @click="handleUploadFile"
          >导入gps轨迹</Button>
        </Upload>
      </row>
    </Modal>

    <Modal v-model="showInfo" title="活动信息" @on-ok="submitAct" :loading="loading">
      <p>活动名称</p>
      <Input v-model="actName" />
      <p>活动时间</p>
      <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model="actDate"></DatePicker>
    </Modal>
  </div>
</template>

<script>
import excel from "@/libs/excel";
import axios from "axios";
import { serverUrl } from "@/common.js";
import { truncateSync } from "fs";
import { constants } from "crypto";
import { setTimeout } from "timers";
import { mapMutations } from "vuex";
import city from "./city";
import vuedraggable from "vuedraggable";
import { async } from "q";

export default {
  data() {
    return {
      uploadLoading: false,
      uploadLoading1: false,
      uploadLoading2: false,
      excelData: null,
      showImport: false,
      showInfo: false,
      poiList: [],
      rightList: [],
      kmlArr: [],
      del: null,
      actName: "",
      actDate: "",
      loading: true,
      keyword: "",
      cityArr: [],
      strArr: [],
      index: 0
    };
  },
  created(){
    // axios.get('/v1/search?boundary=region(北京,0)&page_size=20&page_index=1&keyword=美食&orderby=_distance&key=ND7BZ-DOA3Q-3MV53-G6KUV-2YTXZ-DQBJO').then(res=>{
    //   console.log(res.data)
    //   // console.log(1) 
    // })
  },
  mounted() {
    this.cityArr = city;
    this.initMap(this.index);
  },
  components: {
    vuedraggable: vuedraggable
  },
  computed: {
    openid() {
      return this.$store.state.user.userId;
    }
  },
  methods: {
    ...mapMutations(["closeTag", "setTagNavList"]),
   async search() {
      if (this.keyword == "") {
        this.$Message.error("关键词不能为空！");
      } else {
        console.log(this.strArr)
        if (this.strArr[0] == 'poi') {
          let reg = /[0-9]+,[0-9]+/g;

          if (reg.test(this.keyword)) {
            if(this.strArr[1]=='oriPoi'){
              await axios.post(serverUrl + "/api/pcindex.php?act=gpsToTXPoi",{
                poi:this.keyword
              }).then(res=>{
                if (res.status == 200) {
                      let location = res.data.locations;
                      this.keyword =
                        location[0].lat + "," + location[0].lng;
                        console.log(this.keyword)
                    }
              })
            }
            axios
              .post(serverUrl + "/api/pcindex.php?act=searchByLatlng", {
                keyword: this.keyword
              })
              .then(res => {
                if (res.status == 200) {
                  console.log(res.data);
                  let latLng =
                    res.data.result.ad_info.location.lat +
                    "," +
                    res.data.result.ad_info.location.lng;
                  this.kmlArr.push({
                    name: res.data.result.formatted_addresses.recommend,
                    latLng: latLng
                  });
                  this.index = this.poiList.length;
                  this.poiList = this.poiList.concat(this.kmlArr);
                }
                this.initMap(this.index);
                this.kmlArr = [];
              });
          } else {
            this.$Modal.confirm({
              title: "提示",
              content: "坐标搜索请输入正确格式，如 30,120 (注意逗号是英文的)",
              onOk: () => {},
              onCancel: () => {}
            });
          }
        } else if(this.strArr[0]='place') {
          let c = "";
          if (this.strArr.length == 2) {
            c = this.strArr[1];
          } else if (this.strArr.length == 3) {
            c = this.strArr[2];
          }
          axios
            .post(serverUrl + "/api/pcindex.php?act=searchPoi", {
              keyword: this.keyword,
              city: c
            })
            .then(res => {
              if (res.status == 200) {
                // console.log(res.data)
                let arr = res.data.data;
                let b = [];
                let flex = false;
                arr.map(item => {
                  let latLng = item.location.lat + "," + item.location.lng;
                  b.push({ name: item.title, latLng: latLng });
                });
                for (let i = 0; i < b.length; i++) {
                  if (this.poiList.length == 0) {
                    flex = true;
                  } else {
                    flex = this.poiList.every(item => {
                      return item.latLng != b[i].latLng;
                    });
                  }
                  if (flex) {
                    this.kmlArr.push({ name: b[i].name, latLng: b[i].latLng });
                  }
                }
                if (this.kmlArr.length > 0) {
                  this.index = this.poiList.length;
                } else {
                  this.index = this.poiList.length - 1;
                }

                this.poiList = this.poiList.concat(this.kmlArr);

                this.initMap(this.index);
                this.kmlArr = [];
              }
            });
        }else{
          this.$Message.error('请先选择搜索条件！')
        }
      }
    },
    showDel(index) {
      this.del = index;
    },
    notShowDel() {
      this.del = null;
    },
    /** 点击导入文件按钮 */
    importFile() {
      this.showImport = true;
    },
    ok() {},
    cancel() {},
    initMap(index) {
      let that = this;
      let myLatlng = null;
      if (that.poiList.length > 0) {
        //   console.log(this.index)
        //   console.log(this.poiList.length)
        let ilatlng = that.poiList[index].latLng.split(",");
        myLatlng = new qq.maps.LatLng(ilatlng[0], ilatlng[1]);
      } else {
        myLatlng = new qq.maps.LatLng(30.266826, 120.110029);
      }
      let myOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: qq.maps.MapTypeId.ROADMAP
      };

      var map = new qq.maps.Map(
        document.getElementById("container"),
        myOptions
      );

      if (that.poiList.length != 0) {
        that.poiList.map(item => {
          let latLng = item.latLng.split(",");
          let lat = latLng[0];
          let lng = latLng[1];
          var marker = new qq.maps.Marker({
            position: new qq.maps.LatLng(lat, lng),
            map: map,
            // draggable: true,
            data: item.name
          });
          //添加标注点
          var label = new qq.maps.Label({
            position: new qq.maps.LatLng(lat, lng),
            map: map,
            content: item.name
          });
          var cssA = {
                border:'none'
            };
          label.setStyle(cssA)
            var cssC = {
                color: "#ee0000",
                // fontSize: "14px",
                border:'none'
            };

          qq.maps.event.addListener(marker, "click", function(e) {
            if (that.rightList.length >= 49) {
              that.$Message.error("您已选择49个点");
            } else {
              that.rightList.push({
                name: item.name,
                poi: item.latLng
              });
              label.setStyle(cssC)
              document.getElementById("scroll").scrollIntoView();
            }
          });

          
        });
      }
    },
    handleBeforeUpload(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "xlsx" || fileExt === "xls") {
        this.readFile(file);
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" +
            file.name +
            "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。"
        });
      }
      return false;
    },
    handleBeforeUpload1(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "kml") {
        this.readFile1(file);
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" + file.name + "不是kml文件，请选择后缀为.kml的轨迹文件。"
        });
      }
      return false;
    },
    handleBeforeUpload2(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "gpx") {
        this.readFile2(file);
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" + file.name + "不是gpx文件，请选择后缀为.gpx的轨迹文件。"
        });
      }
      return false;
    },

    //读取excel文件
    async readFile(file) {
      let that = this;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = e => {
        this.uploadLoading = true;
      };
      reader.onerror = e => {
        this.$Message.error("文件读取错误");
      };

      reader.onload = async e => {
        const data = e.target.result;
        const { header, results } = excel.read(data, "array");
        let arr = [];
        // results.map(item => {
        //   arr.push({ name: item.点位名称, latLng: item.原始gps坐标 });
        // });
        let flex = true;
        // console.log(results);
        let txerr=false,yserr=false,aerr=false


        let reg = /[0-9]+,[0-9]+/;
        for (let i = 0; i < results.length; i++) {

          if (results[i].腾讯地图坐标 != undefined) {
              let f=reg.test(results[i].腾讯地图坐标)
              console.log(f)
              if(f){
                results[i].latLng = results[i].腾讯地图坐标;
              console.log(results[i].latLng)
              }else{
                txerr=true
              }
          } else {
            if (results[i].原始gps坐标 != undefined) {
                let n=reg.test(results[i].原始gps坐标)
                // console.log(n)
                if(n){
                   await axios
                  .post(serverUrl + "/api/pcindex.php?act=gpsToTXPoi", {
                    poi: results[i].原始gps坐标
                  })
                  .then(res => {
                    // console.log(res.data);
                    if (res.status == 200) {
                      let location = res.data.locations;
                      results[i].latLng =
                        location[0].lat + "," + location[0].lng;
                        console.log(results[i].latLng)
                    }
                  });
                }else{
                  yserr=true
                }
            } else{
                aerr=true
            }
           
          }
          if (this.poiList.length == 0) {
            flex = true;
          } else {
            flex = this.poiList.every(item => {
              return item.latLng != results[i].latLng;
            });
          }

          //   }
          if (flex) {
            this.kmlArr.push({
              name: results[i].点位名称,
              latLng: results[i].latLng
            });
          }
        }

        console.log(yserr)
        console.log(txerr)
        console.log(aerr)
        if(yserr){
          this.$Message.error('腾讯地图坐标格式应为 30，120(注:英文状态下的逗号')
          this.uploadLoading = false;
          this.showImport=true
          this.kmlArr = [];
        }else if(txerr){
          this.$Message.error('原始gps坐标格式应为 30，120(注:英文状态下的逗号')
          this.uploadLoading = false;
          this.showImport=true
          this.kmlArr = [];
        } else if(aerr){
          this.$Message.error("请填写原始gps坐标或腾讯地图坐标，格式应为 30，120(注:英文状态下的逗号)")
          this.uploadLoading = false;
          this.showImport=true
          this.kmlArr = [];
        }else{
          if (this.kmlArr.length > 0) {
                this.index = this.poiList.length;
              }
              this.poiList = this.poiList.concat(this.kmlArr);
              console.log(that.poiList);
              this.initMap(this.index);
              this.uploadLoading = false;
              this.showImport = false;
              this.$Message.info("文件读取成功");
              this.kmlArr = [];
        }
        // console.log(results);
   
      };
    },
    /** 读取kml文件 */
    async readFile1(file) {
      let that = this;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadstart = e => {
        this.uploadLoading1 = true;
      };
      reader.onerror = e => {
        this.$Message.error("文件读取错误");
      };

      reader.onload = async e => {
        const data = e.target.result;

        let reg = /<Placemark(([\s\S])*?)<\/Placemark>/gim;

        let placemarker = data.match(reg);

        if (placemarker.length <= 1) {
          this.$Notice.warning({
            title: "文件内容有误",
            desc: "文件中不包含点位"
          });
        } else {
          for (let i = 0; i < placemarker.length - 1; i++) {
            let regname = /<name>(.*?)<\/name>/g;
            let reglatlng = /<coordinates>(.*?)<\/coordinates>/g;

            let narr = regname.exec(placemarker[i]);
            let name = "";
            if (narr == null || narr == "") {
              name = "未命名";
            } else {
              name = narr[1];
            }
            // console.log(narr);

            let str = reglatlng.exec(placemarker[i])[1];
            let arr = str.split(",");

            let latLng = arr[1] + "," + arr[0];
            // console.log(latLng)
            await axios
              .post(serverUrl + "/api/pcindex.php?act=gpsToTXPoi", {
                poi: latLng
              })
              .then(res => {
                if (res.status == 200) {
                  let location = res.data.locations;
                  latLng = location[0].lat + "," + location[0].lng;
                  // console.log(latLng)
                  let flex = this.poiList.every(item => {
                    return item.latLng != latLng;
                  });
                  if (flex) {
                    this.kmlArr.push({ name: name, latLng: latLng });
                  }
                }
              });
          }
          if (this.kmlArr.length > 0) {
            this.index = this.poiList.length;
          }
          this.poiList = this.poiList.concat(this.kmlArr);
          console.log(this.poiList);
          this.initMap(this.index);
          this.uploadLoading1 = false;
          this.showImport = false;
          this.$Message.info("文件读取成功");
          this.kmlArr = [];
        }
      };
    },
    /** 读取gpx文件 */
    async readFile2(file) {
      let that = this;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadstart = e => {
        this.uploadLoading2 = true;
      };
      reader.onerror = e => {
        this.$Message.error("文件读取错误");
      };

      reader.onload = async e => {
        const data = e.target.result;

        let reg = /<wpt(([\s\S])*?)<\/wpt>/gim;

        let placemarker = data.match(reg);
        if (placemarker.length <= 0) {
          this.$Notice.warning({
            title: "文件内容有误",
            desc: "文件中不包含点位"
          });
        } else {
          for (let i = 0; i < placemarker.length; i++) {
            let regname = /<name>(.*?)<\/name>/g;
            let reglatlng = /<wpt(.*?)>/g;

            let name = regname.exec(placemarker[i])[1];
            let str = reglatlng.exec(placemarker[i])[1];

            let n = /[0-9]+\.[0-9]+/gi;
            let arr = str.match(n);
            let latLng = arr[0] + "," + arr[1];
            await axios
              .post(serverUrl + "/api/pcindex.php?act=gpsToTXPoi", {
                poi: latLng
              })
              .then(res => {
                if (res.status == 200) {
                  let location = res.data.locations;
                  latLng = location[0].lat + "," + location[0].lng;

                  let flex = this.poiList.every(item => {
                    return item.latLng != latLng;
                  });
                  if (flex) {
                    this.kmlArr.push({ name: name, latLng: latLng });
                  }
                }
              });

            // let flex = this.poiList.every(item => {
            //   return item.latLng != latLng;
            // });
            // if (flex) {
            //   this.kmlArr.push({ name: name, latLng: latLng });
            // }
          }
          if (this.kmlArr.length > 0) {
            this.index = this.poiList.length;
          }
          this.poiList = this.poiList.concat(this.kmlArr);
          console.log(this.poiList);
          this.initMap(this.index);
          this.uploadLoading2 = false;
          this.showImport = false;
          this.$Message.info("文件读取成功");
          this.kmlArr = [];
        }
      };
    },
    initUpload() {},
    handleUploadFile() {
      this.initUpload();
    },

    /** 下一步 */
    next() {
      if (this.rightList.length < 49) {
        this.$Message.error("还不满49个点位！");
      } else {
        this.showInfo = true;
      }
      // this.showInfo=true
    },

    /** 删除点位 */
    deletePoi(index) {
      this.rightList.splice(index, 1);
    },

    /** 提交新建活动 */
    submitAct() {
      if (this.actName == "" || this.actDate == "") {
        this.$Message.error("活动名称或活动时间不能为空！");
        this.loading = false;
      } else {
        let date = new Date(this.actDate).getTime();
        setTimeout(() => {
          this.loading = false;
          this.$nextTick(() => {
            axios
              .post(serverUrl + "/api/pcindex.php?act=pcNewAct", {
                openid: this.openid,
                actName: this.actName,
                actDate: date,
                list: this.rightList
              })
              .then(res => {
                console.log(res);
                if (res.data.status) {
                  this.showInfo = false;
                  this.$Message.success("操作成功！");
                  this.closeTag(this.$route);
                }
              });
            this.loading = true;
          });
        }, 1000);
      }
    }
  }
};
</script>

<style>
.right {
  /* display: inline-block; */
  width: 24%;
  float: right;
  margin-top: 10px;
  height: 500px;
  border: 1px solid #21a3f3;
}
.btn-box {
  text-align: center;
  width: 100%;
  position: relative;
  left: 0;
  top: 5px;
  background: transparent;
}
.poi-box {
  height: 450px;
  overflow: scroll;
  padding-bottom: 10px;
}
.poi-item {
  height: 50px;
  padding: 5px 0px 5px 20px;
}
.poi-item:hover {
  background: #dae3f4;
}
.poi-item .num {
  color: #161f29;
  float: left;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  border-radius: 50%;
  background: #e0edff;
  border: 1px solid #4e83d1;
  margin-top: 5px;
}
.poi-item .name {
  color: #4e83d1;
}
.del {
  float: right;
  margin-top: -25px;
  margin-right: 25px;
  cursor: pointer;
}
</style>
