<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress />
    <button class="btn" @click='scanBook'>添加图书</button>
    <button v-if="!userinfo.openId" open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>    
    <p>{{pid}}</p>
  </div>
</template>
<script>
  import qcloud from 'wafer2-client-sdk'
  import {showSuccess} from '@/util'
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
      login () {
        let user = wx.getStorageSync('userinfo')
        const self = this
        if (!user) {
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success: function (userinfo) {
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  showSuccess('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                }
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      }
    },
    onShow () {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
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
