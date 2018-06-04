<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress />
    <button v-if="userinfo.openId" class="btn" @click='scanBook'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>    
    <p>{{pid}}</p>
  </div>
</template>
<script>
  import qcloud from 'wafer2-client-sdk'
  import {get, showSuccess} from '@/util'
  import config from '@/config'
  import YearProgress from '@/components/YearProgress'
  export default {
    components: {
      YearProgress
    },
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登陆'
        },
        pid: ''
      }
    },
    methods: {
      scanBook () {
        wx.scanCode({
          success: (res) => {
            this.pid = res.result
            console.log(res)
          }
        })
      },
      // login () {
      //   let user = wx.getStorageSync('userInfo')
      //   if (!user) {
      //     const _self = this
      //     qcloud.setLoginUrl(config.loginUrl)
      //     console.log(config.loginUrl, config.userUrl)
      //     qcloud.login({
      //       success: function (userInfo) {
      //         qcloud.request({ 
      //           url: config.userUrl, 
      //           login: true, 
      //           success (userRes) {
      //             showSuccess('登录成功') 
      //             wx.setStorageSync('userInfo', userRes.data.data) 
      //             _self.userInfo = userRes.data.data 
      //           }
      //         }) 
      //       },
      //       fail: function (err) {
      //         console.log('登录失败', err)
      //       }
      //     })
      //   }
      // }
      login (e) { 
        let user = wx.getStorageSync('userinfo') 
        const self = this 
        if (!user) { 
          qcloud.setLoginUrl(config.loginUrl) 
          qcloud.login({ 
            success: function (userinfo) { 
              console.log(userinfo) 
              qcloud.request({ 
                url: config.userUrl, 
                login: true, 
                success (userRes) { 
                  showSuccess('登录成功') 
                  wx.setStorageSync('userinfo', userRes.data.data) 
                  self.userinfo = userRes.data.data 
                }, 
              }) 
            },
            fail: function(err){ 
              console.log(err) 
            } 
          }) 
        } 
      },
    }
  }
</script>
<style lang="scss">
  .container {
    padding: 0 30rpx;
    .userinfo {
      margin-top: 100rpx;
      text-align: center;
      img {
        width: 150rpx;
        height: 150rpx;
        margin: 20rpx;
        border-radius: 50%;
      }
    }
  }
</style>
