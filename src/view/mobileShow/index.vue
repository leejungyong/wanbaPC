<template>
    <div id="mobile">
            <div class="poi-holder">
                <div class="poi" v-for="(item,index) in list" :key="index">
                    <template v-if="item.owner.length>0">
                        <div class="yellow common" v-if="item.ptype==1" >
                            <span v-for="(t,i) in item.owner" :key="i" class="mini-box" :style="{background:teams[t-1].color}"> </span>
                            <span class="center">{{item.displayorder}}</span>
                        </div>
                        <div class="blue common" v-else :style="{background:teams[item.owner-1].color}">
                            <span class="center" >{{item.displayorder}}</span>
                        </div>
                    </template>
                    <template v-else>
                        <div v-if="item.ptype==2" class="red common">
                            <span class="center">G</span>
                        </div>
                        <div v-else :class="[item.ptype==1?'yellow':'blue','common']">
                            <span class="center">{{item.displayorder}}</span>
                        </div>
                    </template>


                </div>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import {serverUrl} from '@/common.js'
export default {
    data(){
        return{
            list:[],
            teams:[],
            co:'#fff'
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        fetchData(){
           axios.post(serverUrl+'/api/index.php?act=actInfo',{aid:1461}).then(res=>{
               console.log(res.data)
               let tasks=res.data.task
               for (let i in tasks) {
                    //tasks[i].currentowner = tasks[i].owner 
                    let owners = tasks[i].owner ? tasks[i].owner.split(',') : []
                    tasks[i].owner = owners
                }
               this.list=tasks
               this.teams=res.data.teams
           })

            
        }
    }
}
</script>

<style scoped>
.poi-holder{
    width: 500px;
    display: flex;
    flex-wrap: wrap;
}
.poi{
    width: 70px;
    height: 70px;
    box-sizing: border-box;
    /* border: 1px solid black; */
    line-height: 70px;
    text-align: center;
}
.common{
    width: 68px;
    height: 68px;
}
.center{
    display: inline-block;
    color: #000;
}
.mini-box{
    width: 15px;
    height: 15px;
    /* display: inline-block; */
    margin:1px 4px 0 0 ;    
    float: left;
}
.mini-box::after{
    content: '';
    clear: both;
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
}
.blue{
  border: 1px solid #00a0e8;
}
.yellow{
      border: 1px solid #fff100;
}
.red{
    border: 1px solid red;
}
</style>