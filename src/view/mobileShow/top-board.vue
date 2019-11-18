<template>
  <div id="top-board">
    <div class="holder">
      <ul class="top-line cell">
        <li>排名</li>
        <li>队伍</li>
        <li>财富</li>
      </ul>
      <div class v-for="(item,index) in list" :key="index">
        <ul class="line cell">
          <li >
            <template v-if="item.rank==1" >
              <img class="img" src="https://img.wondfun.com/wanba/img/gamepic/no1.png" alt />
            </template>
            <template v-else-if="item.rank==2" >
              <img class="img" src="https://img.wondfun.com/wanba/img/gamepic/no2.png" alt />
            </template>
            <template v-else>{{item.rank}}</template>
          </li>
          <li>
              <span class="minibox" :style="{background:item.color}"></span>
            <span>{{item.name}}</span>
          </li>
          <li>
            <span>{{item.score}}</span>
          </li>
        </ul>
      </div>
    </div>

    
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl } from "@/common.js";
export default {
  data() {
    return {
      list: [],
  
    };
  },

  mounted(){
    // this.$refs.cs.style.heigt=`90px`
  },
  created() {
    new WebSocket('')
    this.fetchData();
  },
  methods: {

    fetchData() {
      axios
        .post(serverUrl + "/api/index.php?act=topBoard", { aid: 1461 })
        .then(res => {
          console.log(res.data);
          if (res.data) {
            // this.list = res.data.list;
            let data = res.data.list;
            // console.log(data)
            let rank = 1;
            let count = 1;
            data[0].rank = 1;
            for (let i = 0; i < data.length - 1; i++) {
              if (data[i + 1].score == data[i].score) {
                data[i + 1].rank = rank;
                count++;
              } else {
                //rank++
                rank += count;
                count = 1;
                data[i + 1].rank = rank;
              }
            }
            this.list = data;
          }
        });
    }
  }
};
</script>

<style scoped>

.holder {
  width: 500px;
}
.top-line {
  list-style: none;
  width: 480px;
  height: 50px;
  line-height: 50px;
}
.top-line li {
  float: left;
  width: calc(100% / 3.09);
  text-align: center;
  font-size: 18px;
}
.top-line li::after {
  content: "";
  clear: both;
  display: block;
  visibility: hidden;
  width: 0;
  height: 0;
}
.line {
  list-style: none;
  width: 480px;
  height: 50px;
  line-height: 50px;
}
.line li {
  float: left;
  width: calc(100% / 3.09);
  text-align: center;
  font-size: 18px;
}
.line li::after {
  content: "";
  clear: both;
  display: block;
  visibility: hidden;
  width: 0;
  height: 0;
}
.img {
  width: 30px;
  height: 30px;
    vertical-align: middle;
}
.minibox{
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-right: 2px;
}
.cell{
    border: 1px solid;
  border-image: linear-gradient(90deg,#121a21 0, #24435d 25%, #1a93d0 50%, #24435d 75%, #121a21 100%) 0 0 30 0;
    border-image:-webkit-linear-gradient(90deg,#121a21 0, #24435d 25%, #1a93d0 50%, #24435d 75%, #121a21 100%) 0 0 30 0;
      border-image: -moz-linear-gradient(90deg,#121a21 0, #24435d 25%, #1a93d0 50%, #24435d 75%, #121a21 100%) 0 0 30 0;
        border-image: -o-linear-gradient(90deg,#121a21 0, #24435d 25%, #1a93d0 50%, #24435d 75%, #121a21 100%) 0 0 30 0;
}
</style>