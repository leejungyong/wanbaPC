<template>
  <div id="line_detail">
    <Button type="primary" @click="pass">通过</Button>
    <Button style="margin-left:10px;" @click="reject">驳回</Button>
    <div id="container" style="width:100%;height:500px;margin-top:15px;"></div>
    <Modal v-model="showModal" :loading="loading" title="驳回理由" @on-ok="sure">
      <Input v-model="reason" placeholder="请输入驳回理由..."></Input>
    </Modal>
    <Modal v-model="showDetail" title="线路详情" @on-ok="surePass">
      <div class="line_text">线路名称：<span>{{title}}</span></div>
      <div class="line_text">申请人：<span>{{nick}} </span></div>
      <div class="line_text">申请时间：<span>{{date}} </span></div>
       <div class="line_text">背景故事：<span>{{route_desc.memo1}} </span></div>
        <div class="line_text">经典玩法：<span>{{route_desc.memo2}}</span></div>
         <div class="line_text">场景介绍：<span>{{route_desc.memo3}}</span></div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl } from "@/common.js";
import { constants } from "crypto";
import { getNewTagList, routeEqual } from "@/libs/util";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      applyid: "",
      aid: "",
      title: "",
      route_desc: "",
      nick:'',
      date:'',
      reason: "",
      list: [],
      marker: null,
      makersArray: [],
      value: "",
      showModal: false,
      loading: true,
      showDetail:false,
    };
  },
  created() {},
  mounted() {
    this.applyid = this.$route.params.applyid;
    this.aid = this.$route.params.aid;
    this.title = this.$route.params.title;
    this.route_desc = this.$route.params.route_desc;
    this.nick=this.$route.params.nick
    this.date=this.$route.params.date

    this.init();
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
    ...mapMutations(["closeTag", "setTagNavList"]),
    initMap() {
      let that = this;
      let ilatlng = that.list[4].latlng.split(",");

      //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
      //设置地图中心点
      var myLatlng = new qq.maps.LatLng(ilatlng[0], ilatlng[1]);
      //定义工厂模式函数
      var myOptions = {
        zoom: 17, //设置地图缩放级别
        center: myLatlng, //设置中心点样式
        mapTypeId: qq.maps.MapTypeId.ROADMAP //设置地图样式详情参见MapType
      };
      //获取dom元素添加地图信息
      var map = new qq.maps.Map(
        document.getElementById("container"),
        myOptions
      );

      console.log(that.list);
      that.list.map(item => {
        let latLng = item.latlng.split(",");
        let lat = latLng[0];
        let lng = latLng[1];
        var marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(lat, lng),
          map: map,
          data: item.name
        });
        //添加标注点
        var marker = new qq.maps.Label({
          position: new qq.maps.LatLng(lat, lng),
          map: map,
          content: item.displayorder + "." + item.name
        });
        let str = "";
        for (let i = 0; i < item.pics.length; i++) {
          str += `<a target="_blank " href="${
            item.pics[i].url
          }"><img style="height:auto;width:auto;max-width:100%;max-height:100%;" src="${
            item.pics[i].url
          }"/></a>`;
        }

        //    console.log(typeof item.pics[0])
        //添加点击时间
        qq.maps.event.addListener(marker, "click", function() {
          info.open();
          info.setContent(
            `<div style="white-space:nowrap;'+
                    'margin:10px;">任务名称：${item.memo}</div>
                    <div style="white-space:nowrap;'+
                    'margin:10px;">任务答案：${item.answer}</div>
                    ` +
              `<div style="width:100px;height:100px;">` +
              str +
              `</div>`
          );
          info.setPosition(new qq.maps.LatLng(lat, lng));
        });
        //添加到提示窗
        var info = new qq.maps.InfoWindow({
          map: map
        });
        // console.log(marker)
        that.makersArray.push(marker);
      });
    },
    fetchData() {
      let that = this;
      return new Promise((resolve, reject) => {
        axios
          .post(serverUrl + "/api/pcindex.php?act=getRouteDetail", {
            uid: this.openid,
            token: this.token,
            applyid: this.applyid,
            aid: this.aid
          })
          .then(res => {
            console.log(res.data);
            that.list = res.data.detail;
            let list = res.data.detail;
            resolve(list);
          });
      });
    },
    async init() {
      await this.fetchData();
      this.initMap();
    },
    pass() {

      this.showDetail=true
      //  console.log(obj)
    },

    /** 确认通过 */
    surePass(){
      let obj = {
        uid: this.openid,
        token: this.token,
        applyid: this.applyid,
        aid: this.aid,
        status: "1",
        title: this.title,
        route_desc: this.route_desc
      };
      axios
        .post(serverUrl + "/api/pcindex.php?act=reviewRouteApply", obj)
        .then(res => {
          console.log(res);
          if (res.status) {
            this.$Message.success("操作成功！");
            this.closeTag(this.$route);
          }
        });
    },
    reject() {
      this.showModal = true;
    },
    sure() {
      setTimeout(() => {
        let obj = {
          uid: this.openid,
          token: this.token,
          applyid: this.applyid,
          aid: this.aid,
          status: "-1",
          title: this.title,
          route_desc: this.route_desc,
          reason: this.reason
        };
        let that = this;
        this.loading = false;
        this.$nextTick(() => {
          if (that.reason) {
            axios
              .post(serverUrl + "/api/pcindex.php?act=reviewRouteApply", obj)
              .then(res => {
                // console.log(res)
                if (res.status) {
                  this.$Message.success("操作成功！");
                  this.closeTag(this.$route);
                }
              });
          } else {
            this.$Message.error("请填写驳回理由！");
          }
          this.loading = true;
        });
      }, 1000);
    }
  }
};
</script>

<style>

.line_text{
    margin: 10px 0;
    padding: 0 10px;
  }

</style>
