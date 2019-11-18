<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <!-- <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div> -->
        <div :class="{hidden:!showCode}"> <canvas id="msg"></canvas></div>
        <div class="textNoCode" ><span>请用玩霸江湖扫描二维码登录</span></div>
        <!-- <canvas id="msg"></canvas> -->
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import QRCode from 'qrcode'
import { setTimeout, setInterval, clearInterval } from 'timers';
import { mapActions } from 'vuex'
import Cookie from 'js-cookie'
import { constants } from 'crypto';
export default {
  data () {
    return {
      value:'',
      getUrl:'',
      baseUrl:'http://www.wondfun.com/wanba/admin/#/login?',
      obj:{},
      showCode:true //显示二维码
    }
  },
  components: {
    LoginForm
  },
  created () {
     if(Cookie.get('uid')){
      this.$router.push('/activity/activity-list')
    }
    this.getUrl=window.location.href
  },
  mounted () {
    this.getQrcode()
  },
  computed: {
  },
  watch: {
    $route(to,from){
      this.getUrl=window.location.href
      this.getQrcode() 
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),

    getQrcode(){
      let that=this
      var str=this.getUrl
      var index=str.indexOf('?')
      if(index==-1){
        this.showCode=false
      }else{
      this.showCode=true
      var strSecond= str.substring(index+1,str.length)

      var arr=strSecond.split('&') //将url后的参数放入数组
      
      for(let i=0;i<arr.length;i++){  //将参数以键值对的形式存入
        let arr_tmp=arr[i].split('=')

        this.obj[decodeURIComponent(arr_tmp[0])]=decodeURIComponent(arr_tmp[1])
      }
      this.value=this.baseUrl+'&'+'uid='+ this.obj.uid+'&'+'token='+this.obj.token

      var msg=document.getElementById('msg')

      QRCode.toCanvas(msg,this.value,function(error){
        if(error){
          console.log(error)
        }
        console.log('success')
      })
      let data={uid:this.obj.uid,token:this.obj.token}
      
      let userName=this.obj.uid,password=this.obj.token

    var interval=setInterval(()=>{

          this.handleLogin({ userName, password}).then(res => {
            // this.getUserInfo().then(res => {
            //   // console.log(res)
            //   this.$router.push({
            //     name: this.$config.homeName
            //   })
            //   clearInterval(interval)
            // })
          
            console.log(res)
            // console.log(res.status)
            if(res.data.status){
              this.$router.push({
                  name: this.$config.homeName
                })
               clearInterval(interval)
            }
          })
      },5000)
      }
    },
    // handleSubmit ({ userName, password }) {
    //   this.handleLogin({ userName, password }).then(res => {
    //     this.getUserInfo().then(res => {
    //       this.$router.push({
    //         name: this.$config.homeName
    //       })
    //     })
    //   })
    // }
  }
}
</script>

<style>
#msg{
  width: 200px;
  height: 200px;
}
.ivu-card-body{
  text-align: center;
}
</style>
