<template>
  <div id="app" @mousemove="operatingPage">
    <router-view/>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import {mapMutations} from 'vuex'
import {cookieTime} from '@/common.js'
import { constants } from 'crypto';
export default {
  name: 'App',
  data () {
    return {
      currentTime:new Date().getTime() //页面进入的时刻
    }
  },
  methods: {
    ...mapMutations([
      'setOpenid',
      'setUserId',
      'setAvatar',
      'setAObj'
    ]),

    operatingPage(){
      if(Cookie.get('uid')!=undefined&&Cookie.get('token')!=undefined){
 // let uid=this.$store.state.user.userId
      // let token=this.$store.state.user.token
      let uid=Cookie.get('uid')
      let token=Cookie.get('token')
      let avatar=Cookie.get('avatar')
      // let loginCookie=Cookie.get('loginCookie')
      // let avatar=Cookie.get('avatar')

      let currentTime=this.currentTime
      let lastTime=new Date().getTime()   //最后滑动鼠标的时间

      let timeOut=300000     //设置过期时间

      if((lastTime - currentTime)>timeOut){

        this.currentTime = new Date().getTime();

        // const fullPath=this.$route.fullPath   //把路由存起来，点击登录的时候跳转这个地址
        // const query=this.$Base64.encode(fullPath)

        this.$router.push({name:'login'})
        // this.setOpenid('')
        this.setUserId('')
        this.setAObj('')
        this.setAvatar('')
        console.log('cookie超时了')
      }else {
          this.currentTime = new Date().getTime()

          Cookie.set('token',token,{expires:cookieTime})
          Cookie.set('uid',uid,{expires:cookieTime})
          Cookie.set('avatar',avatar,{expires:cookieTime})

          this.setUserId(uid)

      }

      }
     
    }
  },
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
