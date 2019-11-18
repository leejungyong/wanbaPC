<template>
  <div id="album">
    <button @click="autoBtn">自动播放</button>
    <div>
      <div v-for="(item,index) in list" :key="index" class="img-holder">
        <img class="img" :src="item.url" alt />
        <span> <input type="checkbox" name="" id="" :checked="item.checked" @click="checkedOne(index)"></span>
      </div>
    </div>

    <div v-if="auto" class="swiper-holder">
      <div style="height:50px;">
        <span class="close" @click="close">×</span>
      </div>
      <swiper
        :options="swiperOption"
        class="swiper-wrap"
        ref="mySwiper"
        v-if="swiperList.length!=0"
        style="width:90%;"
      >
        <swiper-slide v-for="(item,index) in swiperList" :key="index" class="slide" >
          <img :src="item.url" alt />
        </swiper-slide>
        <!-- 常见的小圆点 -->
        <!-- <div class="swiper-pagination" v-for="(item,index) in list" :key="index" slot="pagination"></div> -->
      </swiper>
    </div>

    <!-- 显示数字 -->
    <!-- <div class="number">{{imgIndex}}/{{detailimages.length}}</div> -->
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl } from "@/common.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");
export default {
  data() {
    const that = this;
    return {
      list: [],
      swiperList:[],
      imgIndex: 1,
      auto: false,
      fullscreen: false,
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 */
          disableOnInteraction: false
        },
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        grabCursor: true,
        on: {
          //滑动之后回调函数
          slideChangeTransitionStart: function() {
            /* realIndex为滚动到当前的slide索引值 */
            that.imgIndex = this.realIndex - 1;
          }
        },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      axios
        .post(serverUrl + "/api/index.php?act=getAlbum", { aid: 1461 })
        .then(res => {
          console.log(res.data);
          if (res.data) {
            let album=res.data.album.map((item,index)=>{
              item.checked=false
              return item
            })
            this.list = album;
          }
        });
    },
    checkedOne(index){
      this.list[index].checked=!this.list[index].checked
    },
    autoBtn() {

      let flag=this.list.every((item,index)=>{
        return item.checked==false
      })
      this.swiperList=[]
      if(flag){
        this.swiperList=this.list.map(item=>{return item})
      }else{
        this.list.map((item,index)=>{
          if(item.checked){
            this.swiperList.push(item)
          }
        })
      }
      
      this.auto = true;
      this.handFullScreen();
      console.log(this.swiperList)
    },
    close() {
      this.auto = false;
      this.handFullScreen();
      // this.fullscreen=false
    },
    handFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

<style scoped>
#album {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.img-holder {
  width: 150px;
  height: 200px;
  display: inline-block;
  margin: 10px;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.close {
  color: aliceblue;
  font-size: 25px;
  float: right;
  margin-right: 50px;
  cursor: pointer;
}
.swiper-holder {
  background: rgb(82, 80, 80);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.slide {
  text-align: center;
  width: 800px;
  height: 800px;
}
.slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>