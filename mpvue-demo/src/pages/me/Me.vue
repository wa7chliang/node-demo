<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress />
    <button v-if="!userinfo.openId" open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>    
    <button v-else class="btn" @click='scanBook'>添加图书</button>    
    <p>{{pid}}</p>
  </div>
</template>
<script>
  import qcloud from 'wafer2-client-sdk'
  import {showSuccess, post, showModal} from '@/util'
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
      async addBook (isbn) {
        // await里面的异步结束
        const res = await post('/weapp/addbook', {
          isbn,
          openid: this.userinfo.openId
        })
        showModal('添加成功', `${res.title}添加成功`)
      },
      scanBook () {
        wx.scanCode({
          success: (res) => {
            if (res.result) {
              this.addBook(res.result)
            }
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
