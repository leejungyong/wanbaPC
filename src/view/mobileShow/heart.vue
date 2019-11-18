<template>
  <div class="heart">
      <Button @click="start" type="primary">开始</Button>
 
      <div class="top">
        <div v-if="time>0" class="time">
            {{time}}
        </div>
      </div>

      <div class="team-box">
        <div v-for="(item,index) in list" :key="index"  style="display:inline-block;" class="team"> 
                <!-- <div> {{teamsMax[`max${index+1}`]}}</div> -->
                <div :ref="`cs${index+1}`" class="cs"></div>
                <div>
                    <img src="../../assets/images/bottom.png" alt="" style="height:108px;width:90px;">
                </div>
                
            </div>
      </div>
   <div class="mask" v-if="time==0">
      <div class="box">
          <div class="title">成绩</div>
          <div class="first-line">
            <div>排名</div>
            <div>队伍</div>
            <div>心流数值</div>
          </div>
          <div style="margin-top:10px;">
             <div v-for="(item,index) in list" :key="index" :class="[index%2==0?'blue':'','first-line']" >
            <div>{{index+1}}</div>
            <div>{{item.name}}</div>
            <div>{{item.max}}</div>
          </div>
          </div>
         
      </div>
   </div>

    <!-- <div ref="cs4" class="cs"></div> -->
    <!-- <div ref="cs"></div> -->
  </div>
</template>

<script>
import axios from 'axios'
import { serverUrl } from "@/common.js";
export default {
  data() {
    return {
      h: 0,
      path: "wss://www.wondfun.com:39003",
      socket: "",
      list: [
        {
          id:'1',
          name:'青龙',
          color:'green'
        },
        {
          id:'1',
          name:'青龙',
          color:'green'
        },
        {
          id:'1',
          name:'青龙',
          color:'green'
        },
        {
          id:'1',
          name:'青龙',
          color:'green'
        },{
          id:'1',
          name:'青龙',
          color:'green'
        }
      ],
      obj:{},                  //每次传输的数据
      teamArrayObj:{},      //数组对象
      teamsMax:[],
      time:5,
      timer:'',
      isShowRank:false,    //是否显示排行榜
    };
  },
  watch: {
    obj(val) {
        console.log(val)
        if(this.time<30){
              let teamid=val.teamid
        // console.log(new Date().getTime()-val.date)
                let date=new Date().getTime(),
            total=0,
            num=0
        this.teamArrayObj[`team${teamid}`].push(val)
        this.teamArrayObj[`team${teamid}`].map((item,index)=>{
            console.log(date-item.date)
            if(date-500<=item.date){
                total+=item.max
                num++
            }
        })
        let max=(total/num)*100
        let balanceMax=parseFloat((max/6).toFixed(2)) 
        if(this.teamsMax[teamid-1].max<balanceMax){
            this.teamsMax[teamid-1].max=balanceMax
        }
        this.$nextTick(() => {
          this.$refs[`cs${teamid}`][0].style.height = `${max}px`;
        });
        }
    },
    time(val){
      if(val==0){
        this.teamsMax.sort(function(a,b){
          return a.max-b.max
        })
      }
    }
  },
  created(){
    this.fetch()
      this.list.map((item,index)=>{
          this.teamArrayObj[`team${index+1}`]=[]
          
          item.max=0
          this.teamsMax[index]=item
          // this.teamsMax[index].max=0
      })
  },
  mounted() {
    this.init();
  },
  methods: {
    fetch(){
      axios.post('http://www.wondfun.com/dszd/api/pcindex.php?act=getTeams',{aid:26}).then(res=>{
        console.log(res.data)
        
      })
    },
    init: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },

    open: function() {
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      console.log(JSON.parse(msg.data));
      let data = JSON.parse(msg.data);
      let teamid = data.teamid;
      this.h = data.max * 100;
      this.obj=data
      //   console.log(h)
        //  setTimeout(() => {
  
        //      console.log(this.$refs)
        //      this.$refs[`cs${teamid}`].style.height = `${h}px`;
     
        //  }, 0);
    },
    send: function() {
      this.socket.send(params);
    },
    close: function() {
      console.log("socket已经关闭");
    },
    start(){
        this.timer=setInterval(() => {
            if(this.time>=1){
                this.time--
            }else{
                clearInterval(this.timer)
            }
            
        }, 1000);
    }
  },

  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  }
};
</script>

<style scoped>
.heart{
    position: absolute;
    height: 100%;
    width: 100%;
    background: #121a21;
    background-image: url('../../assets/images/logowan.png');
    background-position: center;
    background-repeat: no-repeat;
}
.top{
    background: url('../../assets/images/topimage.png') no-repeat center center;
    height: 160px;
    width: 100%;
    margin: 0 auto;
    color: #fcce0d;
    font-size: 30px;
    position: relative;
}
.time{
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-weight: bolder;
    margin-bottom: 5px;
}

.team-box{
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
}
.team{
   margin-left: 40px;
}
.team:first-child{
    margin-left: 0;
}
.cs {
  display: inline-block;
  height: 70px;
  width: 45px;
  border-radius: 50px;
  background: #7bd01a;
  transition: all 0.3s ease;
}

.mask{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(18, 26, 33, 0.8);
  width: 100%;
  height: 100%;
}
.mask .box{
  width: 600px;
  height: 600px;
  border-radius: 10px;
  background-color: rgba(28, 48, 67, 1);
  border: 3px solid rgba(208, 162, 88, 1);
  margin: 30px auto;
  color: #D0A258;
}
.title{
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
}
.first-line{
  display: flex;
  flex-wrap: nowrap;
  font-size: 28px;
}
.first-line div{
  text-align: center;
  flex: 1;
}
.blue{
 background: #2E4C68;
}
</style>