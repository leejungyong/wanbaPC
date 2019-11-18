<template>
  <div id="poialter">
      <div style="text-align:right;">
   <Button type="primary" @click="save">保存</Button> 
   <Button style="margin-left:10px;" @click="cancel">取消</Button>
      </div>

    <div id="container" style="width:100%;height:500px;margin-top:10px;"></div>
  </div>
</template>

<script>
import { serverUrl } from "@/common.js";
import axios from "axios";
// import { Promise } from 'q';
import { constants } from "crypto";
// import { resolve4 } from 'dns';
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      aid: "",
      poiList: [],
    makersArray: [],
    newPoiList:[]
    };
  },
  created() {},
  mounted() {
    this.aid = this.$route.params.aid;
    this.init();
  },
  methods: {
   ...mapMutations(['closeTag']),
    fetchData() {
      let that = this;
      return new Promise((resolve, reject) => {
        axios
          .post(serverUrl + "/api/pcindex.php?act=getRoutePoiList", {
            aid: that.aid
          })
          .then(res => {
            console.log(res.data);
            that.poiList = res.data;
            let list=res.data
            resolve(list)
          });
      });
    },

    initMap() {
      let that = this;
      let ilatlng = that.poiList[4].latlng.split(",");

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

    //   console.log(that.list);
   let arr= that.poiList.map((item) => {
        let latLng = item.latlng.split(",");
        let lat = latLng[0];
        let lng = latLng[1];
        var marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(lat, lng),
          map: map,
          draggable:true,
          data: item.name
        });
        // 添加标注点
        // var marker = new qq.maps.Label({
        //   position: new qq.maps.LatLng(lat, lng),
        //   map: map,
        //   draggable:true,
        //   content: item.displayorder + "." + item.name
        // });
                // 添加提示窗
        var info = new qq.maps.InfoWindow({
          map: map
        });
        info.open()
        info.setContent(`<div style="text-align:center;white-space:nowrap;' +
                    'margin:10px;">${item.displayorder+'.'}${item.name}</div>`)
        info.setPosition(marker.getPosition());
  
        qq.maps.event.addListener(marker, 'dragend', function() {
                var newPoi = marker.getPosition();
                let lat=newPoi.lat
                let lng=newPoi.lng
                item.latlng=lat+','+lng

                   info.open()
        info.setContent(`<div style="text-align:center;white-space:nowrap;' +
                    'margin:10px;">${item.displayorder+'.'}${item.name}</div>`)
        info.setPosition(newPoi);
                
            });   

        qq.maps.event.addListener(marker,'click',function(){
                 info.open()
        info.setContent(`<div style="text-align:center;white-space:nowrap;' +
                    'margin:10px;">${item.displayorder+'.'}${item.name}</div>`)
        info.setPosition(marker.getPosition());
        })
        // let str = "";
        // for (let i = 0; i < item.pics.length; i++) {
        //   str += `<a target="_blank " href="${
        //     item.pics[i].url
        //   }"><img style="height:auto;width:auto;max-width:100%;max-height:100%;" src="${
        //     item.pics[i].url
        //   }"/></a>`;
        // }

        // //    console.log(typeof item.pics[0])
        // //添加点击事件
        // qq.maps.event.addListener(marker, "click", function() {
        //   info.open();
        //   info.setContent(
        //     `<div style="white-space:nowrap;'+
        //             'margin:10px;">任务名称：${item.memo}</div>
        //             <div style="white-space:nowrap;'+
        //             'margin:10px;">任务答案：${item.answer}</div>
        //             ` +
        //       `<div style="width:100px;height:100px;">` +
        //       str +
        //       `</div>`
        //   );
        //   info.setPosition(new qq.maps.LatLng(lat, lng));
        // });

        // console.log(marker)
        that.makersArray.push(marker);
        return item
      });
    //   console.log(arr)
      that.newPoiList=arr
    },
     async init() {
      await this.fetchData();
      this.initMap();
    },

    /**保存点位修改 */
    save(){
        let that=this
        axios.post(serverUrl+'/api/pcindex.php?act=updateRoutePoiList',{aid:that.aid,poiList:that.newPoiList}).then(res=>{
            console.log(res.data)
            if(res.data.status){
                // this.initMap()
                this.$Message.success('修改成功！')
                this.closeTag(this.$route);
            }
        })
      
    },
    cancel(){
          this.closeTag(this.$route);
    }
  }
};
</script>

<style>
</style>
